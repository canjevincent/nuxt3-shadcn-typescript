import { authSchema } from "~/utils/validations";
import db from '~/utils/db'

export default defineEventHandler(async(event) => {
  
  const { password, email } = await readValidatedBody(event, (body) => authSchema.parse(body))

  const existingUser = await db.user.findUnique({
    where: {
      email,
    }
  });

  // if user does not exist 
  if (!existingUser) {
    throw createError({
        statusCode: 400,
        statusMessage: 'User Not Found'
    });
  }   
  
  // if user exist but does not have a hashed password
  if (!existingUser.hashedPassword) {
    
    const connectedOAuthAccount = await db.oauthAccount.findFirst({
      where: {
        userId: existingUser.id
      }
    });

    if (connectedOAuthAccount) {

      const oAuthProvider = connectedOAuthAccount.providerId;

      throw createError({
        statusCode: 400,
        statusMessage: `Account connected with ${oAuthProvider}. Please continue with ${oAuthProvider}`
      });
    }

  }

  // if user exist verify the input password and the current hashed password from db
  if (existingUser.hashedPassword) {
    const isPasswordCorrect = await verifyPassword(existingUser.hashedPassword, password);

    if (!isPasswordCorrect) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid Credentials'
      });
    }
  }

  const transformedUser = sanitizeUser(existingUser);

  if (transformedUser) {
    // setUserSession is a built in function to store data on the local storage
    await setUserSession(event, {
      user: transformedUser
    })

  }

  return transformedUser

  // return sendRedirect(event, '/'); - redirect to the specific page

  // setResponseStatus(event, 20); error handling

  // return sanitizeUser(user); - return the user object

});
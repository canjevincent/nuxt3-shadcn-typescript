import { authSchema } from "~/utils/validations";
import db from '~/utils/db'

export default defineEventHandler(async(event) => {
  
  const { name, password, email } = await readValidatedBody(event, (body) => authSchema.parse(body))

  const existingUser = await db.user.findUnique({
    where: {
      email,
    }
  });

  if (existingUser) {
    throw createError({
        statusCode: 404,
        statusMessage: 'User already exist'
    });
  }   

  const hashedPassword = await hashPassword(password);

  const user = await db.user.create({
    data: {
      email,
      hashedPassword,
      name
    }
  });

  const transformedUser = sanitizeUser(user);

  if (transformedUser) {
    // setUserSession is a built in function to store data on the local storage
    await setUserSession(event, {
      // there's something wrong with the types, fix it later
      user: transformedUser
    })

  }

  return transformedUser;
  // return sendRedirect(event, '/'); - redirect to the specific page

  // setResponseStatus(event, 20); - error handling

  // return sanitizeUser(user); - return the user object

});
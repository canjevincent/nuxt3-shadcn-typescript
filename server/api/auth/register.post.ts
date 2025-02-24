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
        statusCode: 400,
        statusMessage: 'User already exist'
    });
  }   

  const hashedPassword = await hashPassword()

});
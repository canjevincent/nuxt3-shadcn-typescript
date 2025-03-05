import { sizeSchema } from "~/utils/validations";
import db from '~/utils/db';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);
  if(session.user && session.user.role === 'ADMIN') {
    
    const { name, value } = await readValidatedBody(event, (body) => sizeSchema.parse(body)); 
    const size = await db.size.update({
      where: {
        id: event.context.params?.sizeId
      },
      data: {
        name,
        value
      }
    });

    return size;

  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized. You don't have admin access.",
    });
  }
});
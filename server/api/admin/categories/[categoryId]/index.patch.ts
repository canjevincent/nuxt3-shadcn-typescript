import { categorySchema } from "~/utils/validations";
import db from '~/utils/db';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);
  if(session.user && session.user.role === 'ADMIN') {
    
    const { name } = await readValidatedBody(event, (body) => categorySchema.parse(body)); 
    const category = await db.category.update({
      where: {
        id: event.context.params?.categoryId
      },
      data: {
        name
      }
    });

    return category;

  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized. You don't have admin access.",
    });
  }
});
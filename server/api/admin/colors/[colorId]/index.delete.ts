import { colorSchema } from "~/utils/validations";
import db from '~/utils/db';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);
  if(session.user && session.user.role === 'ADMIN') {
    
    const color = await db.color.delete({
      where: {
        id: event.context.params?.colorId
      }
    });

    return color;

  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized. You don't have admin access.",
    });
  }
});
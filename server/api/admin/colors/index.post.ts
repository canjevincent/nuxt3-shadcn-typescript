import { colorSchema } from "~/utils/validations";
import db from '~/utils/db';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);
  if(session.user && session.user.role === 'ADMIN') {
    
    const { name, value } = await readValidatedBody(event, (body) => colorSchema.parse(body));

    const color = await db.color.create({
      data: {
        name,
        value,
        userId: session.user.id
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
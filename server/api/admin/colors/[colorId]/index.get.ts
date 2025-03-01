import db from '~/utils/db';

export default defineEventHandler(async (event) => {
  const color = await db.color.findUnique({
    where: {
      id: event.context.params?.colorId
    }
  });
  return color;
});
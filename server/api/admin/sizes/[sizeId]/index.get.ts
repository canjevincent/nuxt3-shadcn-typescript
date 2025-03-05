import db from '~/utils/db';

export default defineEventHandler(async (event) => {
  const size = await db.size.findUnique({
    where: {
      id: event.context.params?.sizeId
    }
  });
  return size;
});
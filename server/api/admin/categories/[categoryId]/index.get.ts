import db from '~/utils/db';

export default defineEventHandler(async (event) => {
  const category = await db.category.findUnique({
    where: {
      id: event.context.params?.categoryId
    }
  });
  return category;
});
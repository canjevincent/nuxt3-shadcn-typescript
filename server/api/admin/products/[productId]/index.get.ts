import db from '~/utils/db';

export default defineEventHandler(async (event) => {
  const product = await db.product.findUnique({
    where: {
      id: event.context.params?.productId
    },
    include: {
      images: true,
      category: true,
      size: true,
    }
  });
  return product;
});
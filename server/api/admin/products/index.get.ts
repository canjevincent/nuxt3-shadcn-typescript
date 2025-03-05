import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      images: true,
      category: true,
      color: true,
      size: true
    }
  });
  return products;
});
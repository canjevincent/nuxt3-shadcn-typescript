import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const sizes = await db.size.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return sizes;
});
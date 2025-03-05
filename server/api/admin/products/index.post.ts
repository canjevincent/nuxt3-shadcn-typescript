import { productSchema } from "~/utils/validations";
import db from '~/utils/db';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);
  if(session.user && session.user.role === 'ADMIN') {
    
    const { 
      name, 
      categoryId,
      sizeId,
      colorId,
      images,
      isArchived,
      isFeatured,
      price
    } = await readValidatedBody(event, (body) => productSchema.parse(body));

    const product = await db.product.create({
      data: {
        name, 
        categoryId,
        sizeId,
        colorId,
        images: {
          createMany: {
            data: [
              ...images.map(img => img)
            ]
          }
        },
        isArchived,
        isFeatured,
        price,
        userId: session.user.id
      }
    });

    return product;

  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized. You don't have admin access.",
    });
  }
});
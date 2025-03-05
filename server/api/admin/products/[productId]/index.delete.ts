import { productSchema } from "~/utils/validations";
import db from '~/utils/db';
import { getResourceName } from "~/utils/index";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);
  if(session.user && session.user.role === 'ADMIN') {
    
    const product = await db.product.findUnique({
      where: {
        userId: session.user.id,
        id: event.context.params?.productId
      },
      include: {
        images: true,
      }
    });

    if(!product){
      throw createError({
        statusCode: 404,
        statusMessage: "No Product Found",
      })
    }
    // Delete Cloudinary Resources
    for (const image of product.images){
      const name = getResourceName(image.url);
      if (name) {
        await deleteResourceFromCloudinary(name)
      }
    }

    const deleteProduct = await db.product.delete({
      where: {
        id: event.context.params?.productId,
        userId: session.user.id,
      },
      include: {
        images: true,
      }
    });

    return deleteProduct;

  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized. You don't have admin access.",
    });
  }
});
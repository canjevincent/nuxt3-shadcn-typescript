import { deleteResourceFromCloudinary } from "~/server/utils/cloudinary";

export default defineEventHandler(async (event) => {
  console.log(event)
  await requireUserSession(event);
  const session = await getUserSession(event);
  if(session.user && session.user.role === 'ADMIN') {
    const resourceName = getRouterParams(event, 'resourceName')
    if (resourceName) {
      await deleteResourceFromCloudinary(resourceName.resourceName);
    }  
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized. You don't have admin access.",
    });
  }

});
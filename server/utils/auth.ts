import { type User } from '@prisma/client';

// remove password from returning object
export const sanitizeUser = (user: User) => {
  if(!user) return null;

  // @ts-ignore
  // fix it later
  delete user.hashedPassword;

  return user;
}


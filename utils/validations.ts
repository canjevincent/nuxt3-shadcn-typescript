import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(255).default('').optional()
});

export const categorySchema = z.object({
  name: z.string().min(1)
});

export const colorSchema = z.object({
  name: z.string().min(1, { message: 'Color name is required' }),
  value: z.string().min(1, { message: 'Color code is required' }).default('#000000'),
});

export const sizeSchema = z.object({
  name: z.string().min(1, { message: 'Size name is required' }),
  value: z.string().min(1, { message: 'Size code is required' }),
});

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  images: z.object({ url: z.string() }).array().min(1,{ message:'Product image is required' }),
  price: z.coerce.number().min(1, { message: 'Product price is required' }),
  categoryId: z.string().min(1, { message: 'Product category is required' }),
  colorId: z.string().min(1, { message: 'Product color is required' }),
  sizeId: z.string().min(1,{ message: 'Product size is required'}),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional()
});
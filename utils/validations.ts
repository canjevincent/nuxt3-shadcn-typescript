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
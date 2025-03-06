import type { Product, Category, Size, Color, Image } from '@prisma/client'

export type APIError = {
  statusCode: number
  statusMessage: string
  message: string
  data?: Record<string, string>
}

export type RouteParams = {
  categoryId: string
  colorId: string
  productId: string
  sizeId: string
}

export type SafeProduct = Product & {
  category: Category
  size: Size
  color: Color
  images: Image[]
}
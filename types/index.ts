export type APIError = {
  statusCode: number,
  statusMessage: string,
  message: string,
  data?: Record<string, string>
}

export type RouteParams = {
  categoryId: string,
  colorId: string,
  productId: string,
  sizeId: string,
}
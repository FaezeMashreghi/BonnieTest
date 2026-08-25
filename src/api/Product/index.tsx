const BASE_URL = 'https://dummyjson.com/products'

export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  stock: number
  thumbnail: string
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type ProductCategory = {
  slug: string
  name: string
}

export async function getProducts(
  limit: number,
  skip: number,
  signal?: AbortSignal,
  category?: string,
  ratingOrder?: 'asc' | 'desc',
): Promise<ProductsResponse> {
  const url = category ? `${BASE_URL}/category/${category}` : BASE_URL
  const sortParams = ratingOrder ? `&sortBy=rating&order=${ratingOrder}` : ''
  const response = await fetch(`${url}?limit=${limit}&skip=${skip}${sortParams}`, { signal })
  return response.json()
}

export async function getCategories(signal?: AbortSignal): Promise<ProductCategory[]> {
  const response = await fetch(`${BASE_URL}/categories`, { signal })
  return response.json()
}


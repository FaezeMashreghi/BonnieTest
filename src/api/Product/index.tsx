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

export async function getProducts(limit: number, skip: number, signal?: AbortSignal): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`, { signal })
  return response.json()
}

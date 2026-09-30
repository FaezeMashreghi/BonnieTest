import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCategories, getProducts } from '.'

const mockFetch = (data: unknown) => {
  const fetchMock = vi.fn().mockResolvedValue({ json: () => Promise.resolve(data) })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getProducts', () => {
  it('requests products with limit and skip', async () => {
    const fetchMock = mockFetch({ products: [], total: 0, skip: 0, limit: 10 })

    const result = await getProducts(10, 20)

    expect(fetchMock).toHaveBeenCalledWith('https://dummyjson.com/products?limit=10&skip=20', { signal: undefined })
    expect(result.total).toBe(0)
  })

  it('uses the category endpoint and rating sort when given', async () => {
    const fetchMock = mockFetch({ products: [], total: 0, skip: 0, limit: 10 })

    await getProducts(10, 0, undefined, 'beauty', 'desc')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://dummyjson.com/products/category/beauty?limit=10&skip=0&sortBy=rating&order=desc',
      { signal: undefined },
    )
  })
})

describe('getCategories', () => {
  it('returns the categories list', async () => {
    const categories = [{ slug: 'beauty', name: 'Beauty' }]
    mockFetch(categories)

    await expect(getCategories()).resolves.toEqual(categories)
  })
})

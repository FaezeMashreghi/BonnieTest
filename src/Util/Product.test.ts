import { describe, expect, it } from 'vitest'
import type { Product } from '../api/Product'
import { productColumns } from './Product'

describe('productColumns', () => {
  it('formats price with a dollar sign and two decimals', () => {
    const priceColumn = productColumns.find((column) => column.key === 'price')
    const product = { price: 9.5 } as Product

    expect(priceColumn?.render?.(product)).toBe('$9.50')
  })
})

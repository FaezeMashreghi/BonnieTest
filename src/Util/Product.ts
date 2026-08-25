import type { TableColumn } from '../Components/Table'
import type { SelectBoxOption } from '../Components/SelectBox'
import type { Product } from '../api/Product'

export const productColumns: TableColumn<Product>[] = [
  { key: 'id', header: 'ID' },
  { key: 'title', header: 'Title' },
  { key: 'category', header: 'Category' },
  { key: 'price', header: 'Price', align: 'right', render: (row) => `$${row.price.toFixed(2)}` },
  { key: 'rating', header: 'Rating', align: 'right' },
  { key: 'stock', header: 'Stock', align: 'right' },
]

export const ratingOrderOptions: SelectBoxOption[] = [
  { label: 'Default order', value: '' },
  { label: 'High to low', value: 'desc' },
  { label: 'Low to high', value: 'asc' },
]

import { useEffect, useState } from 'react'
import Table from '../../Components/Table'
import type { TableColumn } from '../../Components/Table'
import Pagination from '../../Components/Pagination'
import Loading from '../../Components/Loading'
import { getProducts } from '../../api/Product'
import type { Product } from '../../api/Product'

const productColumns: TableColumn<Product>[] = [
  { key: 'id', header: 'ID' },
  { key: 'title', header: 'Title' },
  { key: 'category', header: 'Category' },
  { key: 'price', header: 'Price', align: 'right', render: (row) => `$${row.price.toFixed(2)}` },
  { key: 'rating', header: 'Rating', align: 'right' },
  { key: 'stock', header: 'Stock', align: 'right' },
]

function Dashboard() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const skip = (page - 1) * perPage
    getProducts(perPage, skip)
      .then((response) => {
        setProducts(response.products)
        setTotal(response.total)
      })
      .catch(() => setError('Could not load products. Please try again.'))
      .finally(() => setLoading(false))
  }, [page, perPage])

  const pageCount = Math.max(1, Math.ceil(total / perPage))

  return (
    <div className="min-h-screen bg-surface p-8 text-ink">
      <div className={`relative ${products.length === 0 ? 'min-h-[220px]' : ''}`}>
        <div className={`transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
          <Table columns={productColumns} data={products} getRowKey={(row) => row.id} emptyMessage="No products found." />
        </div>
        {loading && <Loading />}
      </div>
      {error && (
        <p className="mt-2 rounded-[8px] border border-danger bg-white px-4 py-2.5 text-xs text-danger">{error}</p>
      )}
      <div className="mt-3">
        <Pagination
          page={page}
          pageCount={pageCount}
          perPage={perPage}
          perPageOptions={[10, 20, 50]}
          onPageChange={setPage}
          onPerPageChange={(value) => {
            setPerPage(value)
            setPage(1)
          }}
        />
      </div>
    </div>
  )
}

export default Dashboard

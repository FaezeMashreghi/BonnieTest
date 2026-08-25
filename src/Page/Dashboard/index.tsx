import { useEffect, useState } from 'react'
import Table from '../../Components/Table'
import Pagination from '../../Components/Pagination'
import Loading from '../../Components/Loading'
import SelectBox from '../../Components/SelectBox'
import type { SelectBoxOption } from '../../Components/SelectBox'
import { getProducts, getCategories } from '../../api/Product'
import type { Product } from '../../api/Product'
import { productColumns, ratingOrderOptions } from '../../Util/Product'

function Dashboard() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [category, setCategory] = useState('')
  const [categoryOptions, setCategoryOptions] = useState<SelectBoxOption[]>([{ label: 'All categories', value: '' }])
  const [ratingOrder, setRatingOrder] = useState<'' | 'asc' | 'desc'>('')
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    getCategories(controller.signal)
      .then((response) => {
        setCategoryOptions([
          { label: 'All categories', value: '' },
          ...response.map((item) => ({ label: item.name, value: item.slug })),
        ])
      })
      .catch(() => {})

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    const skip = (page - 1) * perPage
    getProducts(perPage, skip, controller.signal, category || undefined, ratingOrder || undefined)
      .then((response) => {
        setProducts(response.products)
        setTotal(response.total)
      })
      .catch(() => {
        if (!controller.signal.aborted) setError('Could not load products. Please try again.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [page, perPage, category, ratingOrder])

  const pageCount = Math.max(1, Math.ceil(total / perPage))

  function handleCategoryChange(value: string) {
    setCategory(value)
    setPage(1)
  }

  function handlePerPageChange(value: number) {
    setPerPage(value)
    setPage(1)
  }

  function handleRatingOrderChange(value: string) {
    setRatingOrder(value as '' | 'asc' | 'desc')
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-surface p-8 text-ink">
      <div className="mb-3 flex flex-wrap gap-3">
        <SelectBox
          label="Category"
          value={category}
          options={categoryOptions}
          onChange={handleCategoryChange}
        />
        <SelectBox
          label="Sort by rating"
          value={ratingOrder}
          options={ratingOrderOptions}
          onChange={handleRatingOrderChange}
        />
      </div>
      <div className={`relative ${products.length === 0 ? 'min-h-[220px]' : ''}`}>
        <div className={`transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
          <Table columns={productColumns} data={products} getRowKey={(row) => row.id} emptyMessage="No products found." />
        </div>
        {loading && <Loading />}
      </div>
      {error && (
        <p role="alert" className="mt-2 rounded-[8px] border border-danger bg-white px-4 py-2.5 text-xs text-danger">{error}</p>
      )}
      <div className="mt-3">
        <Pagination
          page={page}
          pageCount={pageCount}
          perPage={perPage}
          perPageOptions={[10, 20, 50]}
          onPageChange={setPage}
          onPerPageChange={handlePerPageChange}
        />
      </div>
    </div>
  )
}

export default Dashboard

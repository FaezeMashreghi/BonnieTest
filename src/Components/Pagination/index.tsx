import SelectBox from '../SelectBox'

type PaginationProps = {
  page: number
  pageCount: number
  perPage: number
  perPageOptions?: number[]
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
}

export default function Pagination({
  page,
  pageCount,
  perPage,
  perPageOptions = [10, 20, 50],
  onPageChange,
  onPerPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3 text-xs text-label">
      <SelectBox
        label="Rows per page"
        value={String(perPage)}
        options={perPageOptions.map((option) => ({ label: String(option), value: String(option) }))}
        onChange={(value) => onPerPageChange(Number(value))}
      />

      <div className="flex items-center gap-3">
        <span className="font-semibold text-muted">Page {page} of {pageCount}</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="rounded-[6px] border border-border-light bg-white px-3 py-1.5 text-xs font-bold text-label-strong disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}
            className="rounded-[6px] border border-border-light bg-white px-3 py-1.5 text-xs font-bold text-label-strong disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

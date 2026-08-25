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
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e2e8ec] px-5 py-3 text-[12px] text-[#65727c]">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#7f8b93]">Rows per page</span>
        <select
          value={perPage}
          onChange={(event) => onPerPageChange(Number(event.target.value))}
          className="rounded-[6px] border border-[#e1e7ea] bg-white px-2 py-1.5 text-[12px] font-bold text-[#52606a] outline-none"
        >
          {perPageOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-semibold text-[#7f8b93]">Page {page} of {pageCount}</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="rounded-[6px] border border-[#e1e7ea] bg-white px-3 py-1.5 text-[12px] font-bold text-[#52606a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}
            className="rounded-[6px] border border-[#e1e7ea] bg-white px-3 py-1.5 text-[12px] font-bold text-[#52606a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

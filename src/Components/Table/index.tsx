import type { ReactNode } from 'react'

export type TableColumn<T> = {
  key: string
  header: string
  align?: 'left' | 'center' | 'right'
  render?: (row: T) => ReactNode
}

type TableProps<T> = {
  columns: TableColumn<T>[]
  data: T[]
  getRowKey: (row: T, index: number) => string | number
}

function alignClass(align?: 'left' | 'center' | 'right') {
  return align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
}

export default function Table<T>({ columns, data, getRowKey }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-[12px] border border-[#e2e8ec] bg-white">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-[#e2e8ec] bg-[#f7f9fa]">
            {columns.map((column) => (
              <th key={column.key} className={`px-5 py-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#7f8b93] ${alignClass(column.align)}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={getRowKey(row, index)} className="border-b border-[#edf0f2] last:border-0 hover:bg-[#f7f9fa]">
              {columns.map((column) => (
                <td key={column.key} className={`px-5 py-3.5 text-[#3a444c] ${alignClass(column.align)}`}>
                  {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

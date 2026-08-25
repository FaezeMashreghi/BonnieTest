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
  emptyMessage?: string
}

function alignClass(align?: 'left' | 'center' | 'right') {
  return align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
}

export default function Table<T>({ columns, data, getRowKey, emptyMessage = 'No results found.' }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-[12px] border border-border bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-muted">
            {columns.map((column) => (
              <th key={column.key} className={`px-5 py-3 text-2xs font-bold uppercase tracking-[0.06em] text-muted ${alignClass(column.align)}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-8 text-center text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={getRowKey(row, index)} className="border-b border-border-subtle last:border-0 hover:bg-surface-muted">
                {columns.map((column) => (
                  <td key={column.key} className={`px-5 py-3.5 text-body ${alignClass(column.align)}`}>
                    {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

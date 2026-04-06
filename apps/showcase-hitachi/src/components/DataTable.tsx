import type { ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Column<T = any> {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableProps<T = any> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  selectedId?: string
  getRowId?: (row: T) => string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T = any>({
  columns,
  data,
  onRowClick,
  selectedId,
  getRowId,
}: DataTableProps<T>) {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: '#30363d', backgroundColor: '#1c2128' }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #30363d', backgroundColor: '#161b22' }}>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: '#8d96a0' }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              const rowId = getRowId ? getRowId(row) : String(idx)
              const isSelected = selectedId === rowId
              return (
                <tr
                  key={rowId}
                  onClick={() => onRowClick?.(row)}
                  className="transition-colors"
                  style={{
                    borderBottom: idx < data.length - 1 ? '1px solid #21262d' : undefined,
                    backgroundColor: isSelected ? '#e8000d18' : undefined,
                    cursor: onRowClick ? 'pointer' : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      ;(e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#ffffff08'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      ;(e.currentTarget as HTMLTableRowElement).style.backgroundColor = ''
                    }
                  }}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-4 py-3"
                      style={{ color: '#e6edf3' }}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key as string] ?? '')}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

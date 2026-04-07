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

const thStyle: React.CSSProperties = {
  padding: '10px 16px',
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#8d96a0',
  backgroundColor: '#161b22',
  whiteSpace: 'nowrap',
}

const tdStyle: React.CSSProperties = {
  padding: '10px 16px',
  textAlign: 'left',
  fontSize: 13,
  color: '#e6edf3',
  verticalAlign: 'middle',
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
      style={{
        borderRadius: 12,
        border: '1px solid #30363d',
        backgroundColor: '#1c2128',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          overflowX: 'auto',
          overflowY: 'auto',
          maxHeight: 420,
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #30363d' }}>
              {columns.map((col) => (
                <th key={String(col.key)} style={thStyle}>
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
                  style={{
                    borderBottom: idx < data.length - 1 ? '1px solid #21262d' : undefined,
                    backgroundColor: isSelected ? '#e8000d18' : 'transparent',
                    cursor: onRowClick ? 'pointer' : undefined,
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      ;(e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#ffffff08'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      ;(e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                        'transparent'
                    }
                  }}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} style={tdStyle}>
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

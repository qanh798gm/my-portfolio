import { cargoItems, type CargoItem } from '../data/logistics-data'
import { DataTable } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'

const columns = [
  { key: 'id', header: 'Cargo ID' },
  { key: 'description', header: 'Description' },
  { key: 'weight', header: 'Weight' },
  { key: 'origin', header: 'Origin' },
  { key: 'destination', header: 'Destination' },
  { key: 'scheduleId', header: 'Schedule' },
  {
    key: 'status',
    header: 'Status',
    render: (row: CargoItem) => <StatusBadge status={row.status} />,
  },
]

const STATUS_COLORS: Record<string, string> = {
  'In Transit': '#388bfd',
  Delivered: '#3fb950',
  Loaded: '#8d96a0',
  Pending: '#d29922',
}

export function CargoPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: '#484f58', margin: 0 }}>
          {cargoItems.length} cargo items tracked
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          {(['In Transit', 'Delivered', 'Loaded', 'Pending'] as const).map((s) => {
            const count = cargoItems.filter((c) => c.status === s).length
            const color = STATUS_COLORS[s]
            return (
              <span key={s} style={{ borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 500, backgroundColor: `${color}18`, color, border: `1px solid ${color}33` }}>
                {count} {s}
              </span>
            )
          })}
        </div>
      </div>
      <DataTable<CargoItem> columns={columns} data={cargoItems} getRowId={(row) => row.id} />
    </div>
  )
}

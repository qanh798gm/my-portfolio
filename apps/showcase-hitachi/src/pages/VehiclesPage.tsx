import { vehicles, type Vehicle } from '../data/logistics-data'
import { DataTable } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'

const columns = [
  { key: 'id', header: 'Vehicle ID' },
  { key: 'type', header: 'Type' },
  { key: 'plate', header: 'Plate No.' },
  { key: 'driver', header: 'Driver' },
  { key: 'capacity', header: 'Capacity' },
  {
    key: 'status',
    header: 'Status',
    render: (row: Vehicle) => <StatusBadge status={row.status} />,
  },
  { key: 'lastLocation', header: 'Last Location' },
]

const STATUS_COLORS: Record<string, string> = {
  'On Route': '#388bfd',
  Available: '#3fb950',
  Maintenance: '#d29922',
}

export function VehiclesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: '#484f58', margin: 0 }}>
          {vehicles.length} vehicles in fleet
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          {(['On Route', 'Available', 'Maintenance'] as const).map((s) => {
            const count = vehicles.filter((v) => v.status === s).length
            const color = STATUS_COLORS[s]
            return (
              <span key={s} style={{ borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 500, backgroundColor: `${color}18`, color, border: `1px solid ${color}33` }}>
                {count} {s}
              </span>
            )
          })}
        </div>
      </div>
      <DataTable<Vehicle> columns={columns} data={vehicles} getRowId={(row) => row.id} />
    </div>
  )
}

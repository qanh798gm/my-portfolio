import { useState } from 'react'
import { schedules, type Schedule } from '../data/logistics-data'
import { DataTable } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'

const columns = [
  { key: 'id', header: '#' },
  { key: 'route', header: 'Route' },
  {
    key: 'origin',
    header: 'Origin → Destination',
    render: (row: Schedule) => (
      <span style={{ color: '#e6edf3' }}>
        {row.origin} <span style={{ color: '#484f58' }}>→</span> {row.destination}
      </span>
    ),
  },
  { key: 'departure', header: 'Departure' },
  {
    key: 'status',
    header: 'Status',
    render: (row: Schedule) => <StatusBadge status={row.status} />,
  },
  { key: 'driver', header: 'Driver' },
  { key: 'vehicleId', header: 'Vehicle' },
]

export function SchedulesPage() {
  const [selected, setSelected] = useState<Schedule | null>(null)

  const handleRowClick = (row: Schedule) => {
    setSelected((prev) => (prev?.id === row.id ? null : row))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: '#484f58', margin: 0 }}>
          {schedules.length} schedules total · Click a row to view route on map
        </p>
        <span style={{ borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 500, backgroundColor: '#e8000d18', color: '#e8000d', border: '1px solid #e8000d33', cursor: 'pointer' }}>
          + New Schedule
        </span>
      </div>

      {/* Table + Map layout */}
      <div style={{ display: 'flex', gap: 16, flexWrap: selected ? 'nowrap' : undefined }}>
        <div style={{ flex: selected ? '0 0 50%' : '1 1 100%', minWidth: 0 }}>
          <DataTable<Schedule>
            columns={columns}
            data={schedules}
            onRowClick={handleRowClick}
            selectedId={selected?.id}
            getRowId={(row) => row.id}
          />
        </div>

        {selected && (
          <div style={{ flex: '0 0 50%', minWidth: 0, borderRadius: 12, border: '1px solid #30363d', backgroundColor: '#1c2128', overflow: 'hidden', minHeight: 380, display: 'flex', flexDirection: 'column' }}>
            {/* Map header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', padding: '12px 16px' }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3', margin: 0 }}>{selected.route}</p>
                <p style={{ fontSize: 12, color: '#484f58', margin: 0 }}>{selected.origin} → {selected.destination} · {selected.driver}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <StatusBadge status={selected.status} />
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#484f58', fontSize: 14, padding: 4 }} aria-label="Close map">✕</button>
              </div>
            </div>
            {/* Google Maps embed */}
            <div style={{ flex: 1, position: 'relative' }}>
              <iframe
                title={`Map: ${selected.destination}`}
                src={`https://maps.google.com/maps?q=${selected.mapQuery}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                style={{ width: '100%', height: '100%', minHeight: 320, border: 'none', filter: 'invert(0.9) hue-rotate(180deg) saturate(0.7)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ position: 'absolute', bottom: 12, left: 12, borderRadius: 8, padding: '6px 12px', fontSize: 12, backgroundColor: '#0d1117cc', color: '#e6edf3', border: '1px solid #30363d' }}>
                📍 {selected.destination}
              </div>
            </div>
          </div>
        )}
      </div>

      {!selected && (
        <p style={{ textAlign: 'center', fontSize: 12, color: '#484f58' }}>
          ↑ Click any schedule row above to view the destination on the map
        </p>
      )}
    </div>
  )
}

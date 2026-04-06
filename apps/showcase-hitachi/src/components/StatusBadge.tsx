import type { ScheduleStatus, VehicleStatus, CargoStatus } from '../data/logistics-data'

type AnyStatus = ScheduleStatus | VehicleStatus | CargoStatus

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  // Schedule
  'On-Time':   { bg: '#1a3a24', text: '#3fb950', dot: '#3fb950' },
  'Completed': { bg: '#1a2e1a', text: '#3fb950', dot: '#3fb950' },
  'In Transit':{ bg: '#0d2149', text: '#388bfd', dot: '#388bfd' },
  'Delayed':   { bg: '#3d1c1c', text: '#f85149', dot: '#f85149' },
  // Vehicle
  'Available':   { bg: '#1a3a24', text: '#3fb950', dot: '#3fb950' },
  'On Route':    { bg: '#0d2149', text: '#388bfd', dot: '#388bfd' },
  'Maintenance': { bg: '#3d2e0a', text: '#d29922', dot: '#d29922' },
  // Cargo
  'Loaded':    { bg: '#0d2149', text: '#388bfd', dot: '#388bfd' },
  'Delivered': { bg: '#1a3a24', text: '#3fb950', dot: '#3fb950' },
  'Pending':   { bg: '#2a2a2a', text: '#8d96a0', dot: '#8d96a0' },
}

interface StatusBadgeProps {
  status: AnyStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = STATUS_STYLES[status] ?? { bg: '#2a2a2a', text: '#8d96a0', dot: '#8d96a0' }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 9999,
        padding: '2px 10px',
        fontSize: 12,
        fontWeight: 500,
        backgroundColor: styles.bg,
        color: styles.text,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: styles.dot,
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
      {status}
    </span>
  )
}

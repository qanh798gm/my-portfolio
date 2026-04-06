interface KpiCardProps {
  label: string
  value: string | number
  delta: string
  trend: 'up' | 'down' | 'neutral'
  icon: string
}

export function KpiCard({ label, value, delta, trend, icon }: KpiCardProps) {
  const trendColor =
    trend === 'up' ? '#3fb950' : trend === 'down' ? '#f85149' : '#8d96a0'
  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'

  return (
    <div
      style={{
        borderRadius: 12,
        border: '1px solid #30363d',
        padding: 20,
        backgroundColor: '#1c2128',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#8d96a0',
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 20, lineHeight: 1 }} aria-hidden="true">
          {icon}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: '#e6edf3', lineHeight: 1 }}>
          {value}
        </span>
        <span style={{ fontSize: 13, fontWeight: 500, color: trendColor, marginBottom: 2 }}>
          {trendArrow} {delta}
        </span>
      </div>
      <p style={{ marginTop: 6, fontSize: 11, color: '#484f58', margin: '6px 0 0' }}>
        vs. last week
      </p>
    </div>
  )
}

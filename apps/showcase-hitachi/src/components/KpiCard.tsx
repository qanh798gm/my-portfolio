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
      className="rounded-xl border p-5"
      style={{
        backgroundColor: '#1c2128',
        borderColor: '#30363d',
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#8d96a0' }}>
          {label}
        </span>
        <span className="text-xl" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold" style={{ color: '#e6edf3' }}>
          {value}
        </span>
        <span className="mb-0.5 text-sm font-medium" style={{ color: trendColor }}>
          {trendArrow} {delta}
        </span>
      </div>
      <p className="mt-1 text-xs" style={{ color: '#484f58' }}>
        vs. last week
      </p>
    </div>
  )
}

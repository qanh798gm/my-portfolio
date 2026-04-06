import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: '▦', end: true },
  { to: '/schedules', label: 'Schedules', icon: '📋', end: false },
  { to: '/vehicles', label: 'Vehicles', icon: '🚛', end: false },
  { to: '/cargo', label: 'Cargo', icon: '📦', end: false },
]

export function HitachiSidebar() {
  return (
    <aside
      className="flex h-full w-56 shrink-0 flex-col border-r"
      style={{ backgroundColor: '#0d1117', borderColor: '#21262d' }}
    >
      {/* Logo area */}
      <div
        className="flex h-14 items-center gap-3 border-b px-4"
        style={{ borderColor: '#21262d' }}
      >
        <div
          className="flex h-7 w-7 items-center justify-center rounded font-bold text-sm"
          style={{ backgroundColor: '#e8000d', color: '#fff' }}
        >
          H
        </div>
        <div>
          <p style={{ color: '#e6edf3', fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>
            Hitachi
          </p>
          <p style={{ color: '#484f58', fontSize: 11, lineHeight: 1.2 }}>
            LogiTrack
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.15s',
              backgroundColor: isActive ? '#e8000d18' : 'transparent',
              color: isActive ? '#e8000d' : '#8d96a0',
              borderLeft: isActive ? '2px solid #e8000d' : '2px solid transparent',
            })}
          >
            <span style={{ fontSize: 16 }} aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #21262d', padding: '12px 16px' }}>
        <p style={{ color: '#484f58', fontSize: 11 }}>v2.4.1 — Demo Mode</p>
      </div>
    </aside>
  )
}

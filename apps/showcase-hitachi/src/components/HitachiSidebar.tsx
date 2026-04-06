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
      style={{
        display: 'flex',
        height: '100%',
        width: 200,
        flexShrink: 0,
        flexDirection: 'column',
        borderRight: '1px solid #21262d',
        backgroundColor: '#0d1117',
      }}
    >
      {/* Logo area */}
      <div
        style={{
          display: 'flex',
          height: 56,
          alignItems: 'center',
          gap: 12,
          borderBottom: '1px solid #21262d',
          padding: '0 16px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            height: 28,
            width: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 13,
            backgroundColor: '#e8000d',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          H
        </div>
        <div>
          <p style={{ color: '#e6edf3', fontSize: 12, fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
            Hitachi
          </p>
          <p style={{ color: '#484f58', fontSize: 11, lineHeight: 1.2, margin: 0 }}>
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
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.15s',
              backgroundColor: isActive ? '#e8000d18' : 'transparent',
              color: isActive ? '#e8000d' : '#8d96a0',
              borderLeft: isActive ? '2px solid #e8000d' : '2px solid transparent',
            })}
          >
            <span style={{ fontSize: 15, lineHeight: 1 }} aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #21262d', padding: '10px 16px', flexShrink: 0 }}>
        <p style={{ color: '#484f58', fontSize: 11, margin: 0 }}>v2.4.1 — Demo Mode</p>
      </div>
    </aside>
  )
}

import { NavLink } from 'react-router-dom'
import { colors } from '../../utils/theme'

const NAV_ITEMS = [
  { to: '/', label: 'Trading', icon: '◈', end: true },
  { to: '/portfolio', label: 'Portfolio', icon: '◉', end: false },
  { to: '/markets', label: 'Markets', icon: '◎', end: false },
]

export function AquariuxSidebar() {
  return (
    <aside
      style={{
        display: 'flex',
        height: '100%',
        width: 200,
        flexShrink: 0,
        flexDirection: 'column',
        borderRight: `1px solid ${colors.bgBorder}`,
        backgroundColor: colors.bgSecondary,
      }}
    >
      {/* Logo area */}
      <div
        style={{
          display: 'flex',
          height: 56,
          alignItems: 'center',
          gap: 12,
          borderBottom: `1px solid ${colors.bgBorder}`,
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
            background: `linear-gradient(135deg, ${colors.brandPrimary}, ${colors.brandAccent})`,
            color: '#fff',
            flexShrink: 0,
          }}
        >
          A
        </div>
        <div>
          <p
            style={{
              color: colors.textPrimary,
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Aquariux
          </p>
          <p style={{ color: colors.textMuted, fontSize: 11, lineHeight: 1.2, margin: 0 }}>
            Trade Pro
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}
      >
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
              backgroundColor: isActive ? `${colors.brandPrimary}22` : 'transparent',
              color: isActive ? colors.brandPrimary : colors.textSecondary,
              border: isActive ? `1px solid ${colors.brandPrimary}44` : '1px solid transparent',
            })}
          >
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: `1px solid ${colors.bgBorder}`,
          fontSize: 11,
          color: colors.textMuted,
        }}
      >
        <div style={{ marginBottom: 4 }}>Demo Mode</div>
        <div style={{ color: colors.brandPrimary }}>● Live Data</div>
      </div>
    </aside>
  )
}

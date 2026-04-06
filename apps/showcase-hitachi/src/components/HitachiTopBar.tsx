import { useLocation } from 'react-router-dom'

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Overview & KPIs' },
  '/schedules': { title: 'Schedule Management', subtitle: 'Active routes & dispatch' },
  '/vehicles': { title: 'Vehicle Management', subtitle: 'Fleet status & tracking' },
  '/cargo': { title: 'Cargo Management', subtitle: 'Shipment inventory' },
}

const DEFAULT_PAGE = { title: 'Dashboard', subtitle: 'Overview & KPIs' }

export function HitachiTopBar() {
  const { pathname } = useLocation()
  const page = PAGE_TITLES[pathname] ?? DEFAULT_PAGE

  return (
    <header
      style={{
        display: 'flex',
        height: 56,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #21262d',
        backgroundColor: '#0d1117',
        padding: '0 24px',
      }}
    >
      {/* Page title */}
      <div>
        <h1 style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3', margin: 0 }}>
          {page.title}
        </h1>
        <p style={{ fontSize: 12, color: '#484f58', margin: 0 }}>
          {page.subtitle}
        </p>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Date badge */}
        <span
          style={{
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 12,
            backgroundColor: '#161b22',
            color: '#8d96a0',
            border: '1px solid #30363d',
          }}
        >
          Dec 24, 2019
        </span>

        {/* User avatar */}
        <div
          style={{
            display: 'flex',
            height: 32,
            width: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            fontSize: 12,
            fontWeight: 700,
            backgroundColor: '#e8000d22',
            color: '#e8000d',
            border: '1px solid #e8000d44',
          }}
        >
          AD
        </div>
      </div>
    </header>
  )
}

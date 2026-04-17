import { useLocation } from 'react-router-dom'
import { colors } from '../../utils/theme'

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Trading Terminal', subtitle: 'Live multi-asset trading' },
  '/portfolio': { title: 'Portfolio', subtitle: 'Assets, positions & history' },
  '/markets': { title: 'Markets', subtitle: 'Real-time market overview' },
}

const DEFAULT_PAGE = { title: 'Trading Terminal', subtitle: 'Live multi-asset trading' }

interface AquariuxTopBarProps {
  connectionStatus?: 'connected' | 'connecting' | 'disconnected'
}

export function AquariuxTopBar({ connectionStatus = 'connected' }: AquariuxTopBarProps) {
  const { pathname } = useLocation()
  const page = PAGE_TITLES[pathname] ?? DEFAULT_PAGE

  const statusColor =
    connectionStatus === 'connected'
      ? colors.success
      : connectionStatus === 'connecting'
        ? colors.warning
        : colors.danger

  const statusLabel =
    connectionStatus === 'connected'
      ? 'Connected'
      : connectionStatus === 'connecting'
        ? 'Connecting...'
        : 'Disconnected'

  return (
    <header
      style={{
        display: 'flex',
        height: 56,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${colors.bgBorder}`,
        backgroundColor: colors.bgSecondary,
        padding: '0 24px',
      }}
    >
      {/* Page title */}
      <div>
        <h1
          style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: 0 }}
        >
          {page.title}
        </h1>
        <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>{page.subtitle}</p>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Connection status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 12,
            backgroundColor: colors.bgSurface,
            color: statusColor,
            border: `1px solid ${colors.bgBorder}`,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: statusColor,
            }}
          />
          {statusLabel}
        </div>

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
            backgroundColor: `${colors.brandPrimary}22`,
            color: colors.brandPrimary,
            border: `1px solid ${colors.brandPrimary}44`,
          }}
        >
          AD
        </div>
      </div>
    </header>
  )
}

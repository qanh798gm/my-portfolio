import { useMemo, useState } from 'react'
import { AssetDistribution } from '../components/portfolio/AssetDistribution'
import { PnLSummary } from '../components/portfolio/PnLSummary'
import {
  OpenPositionsTable,
  PendingOrdersTable,
  TradeHistoryTable,
} from '../components/portfolio/PortfolioTables'
import {
  MOCK_OPEN_POSITIONS,
  MOCK_PENDING_ORDERS,
  MOCK_TRADE_HISTORY,
} from '../data/mock-portfolio'
import { colors } from '../utils/theme'

type Tab = 'positions' | 'pending' | 'history'

export function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<Tab>('positions')

  const table = useMemo(() => {
    if (activeTab === 'positions') return <OpenPositionsTable rows={MOCK_OPEN_POSITIONS} />
    if (activeTab === 'pending') return <PendingOrdersTable rows={MOCK_PENDING_ORDERS} />
    return <TradeHistoryTable rows={MOCK_TRADE_HISTORY} />
  }, [activeTab])

  const tabLabel: Record<Tab, string> = {
    positions: 'Open Positions',
    pending: 'Pending Orders',
    history: 'Trade History',
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gap: 10,
        height: '100%',
        minHeight: 0,
        padding: 10,
        backgroundColor: colors.bgPrimary,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(360px, 1.2fr) minmax(360px, 1fr)', gap: 10 }}>
        <AssetDistribution />
        <PnLSummary />
      </div>

      <section
        style={{
          border: `1px solid ${colors.bgBorder}`,
          backgroundColor: colors.bgSecondary,
          borderRadius: 12,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            borderBottom: `1px solid ${colors.bgBorder}`,
            padding: 8,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            {(['positions', 'pending', 'history'] as const).map((tab) => {
              const active = activeTab === tab
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    border: `1px solid ${active ? colors.brandPrimary : colors.bgBorder}`,
                    backgroundColor: active ? `${colors.brandPrimary}22` : colors.bgPrimary,
                    color: active ? colors.brandPrimary : colors.textSecondary,
                    borderRadius: 8,
                    padding: '7px 10px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {tabLabel[tab]}
                </button>
              )
            })}
          </div>

          <div style={{ color: colors.textMuted, fontSize: 11 }}>{tabLabel[activeTab]}</div>
        </div>

        <div style={{ overflow: 'auto', minHeight: 0 }}>{table}</div>
      </section>
    </div>
  )
}

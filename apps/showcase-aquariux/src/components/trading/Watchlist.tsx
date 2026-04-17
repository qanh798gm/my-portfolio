import { SYMBOLS_BY_ID } from '../../data/symbols'
import { useTradingStore } from '../../stores/trading-store'
import { formatPercent, formatPrice, getDecimals } from '../../utils/format'
import { colors } from '../../utils/theme'

export function Watchlist() {
  const watchlistIds = useTradingStore((s) => s.watchlistIds)
  const selectedSymbolId = useTradingStore((s) => s.selectedSymbolId)
  const setSelectedSymbolId = useTradingStore((s) => s.setSelectedSymbolId)
  const priceMap = useTradingStore((s) => s.priceMap)

  return (
    <aside
      style={{
        width: 260,
        flexShrink: 0,
        borderRight: `1px solid ${colors.bgBorder}`,
        backgroundColor: colors.bgSecondary,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <div
        style={{
          padding: '12px 14px',
          borderBottom: `1px solid ${colors.bgBorder}`,
          fontSize: 12,
          color: colors.textMuted,
          fontWeight: 600,
          letterSpacing: 0.3,
        }}
      >
        WATCHLIST
      </div>

      <div style={{ overflowY: 'auto', minHeight: 0 }}>
        {watchlistIds.map((symbolId) => {
          const symbol = SYMBOLS_BY_ID.get(symbolId)
          if (!symbol) return null

          const ticker = priceMap[symbolId]
          const isActive = selectedSymbolId === symbolId
          const change = ticker?.changePercent ?? 0
          const price = ticker?.price ?? 0

          return (
            <button
              key={symbolId}
              type="button"
              onClick={() => setSelectedSymbolId(symbolId)}
              style={{
                width: '100%',
                border: 'none',
                borderBottom: `1px solid ${colors.bgBorder}`,
                backgroundColor: isActive ? `${colors.brandPrimary}18` : 'transparent',
                padding: '10px 12px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 8,
              }}
            >
              <div>
                <div style={{ color: colors.textPrimary, fontSize: 13, fontWeight: 600 }}>{symbol.symbol}</div>
                <div style={{ color: colors.textMuted, fontSize: 11 }}>{symbol.displayName}</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ color: colors.textSecondary, fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>
                  {price > 0 ? formatPrice(price, getDecimals(price)) : '--'}
                </div>
                <div
                  style={{
                    color: change >= 0 ? colors.success : colors.danger,
                    fontSize: 11,
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatPercent(change, 2)}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}

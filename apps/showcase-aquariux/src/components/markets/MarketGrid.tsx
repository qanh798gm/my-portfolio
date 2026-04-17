import { useMemo, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { MOCK_OPEN_POSITIONS } from '../../data/mock-portfolio'
import { SYMBOLS, SYMBOLS_BY_ID } from '../../data/symbols'
import { useTradingStore } from '../../stores/trading-store'
import { formatPercent, formatPrice, getDecimals } from '../../utils/format'
import { colors } from '../../utils/theme'

interface RowItem {
  symbolId: string
  label: string
  price: number
  changePercent: number
}

function sortByChangeDesc(a: RowItem, b: RowItem): number {
  return b.changePercent - a.changePercent
}

function sortByChangeAsc(a: RowItem, b: RowItem): number {
  return a.changePercent - b.changePercent
}

function MarketList({ title, rows }: { title: string; rows: RowItem[] }) {
  const parentRef = useRef<HTMLDivElement | null>(null)

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 8,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <section
      style={{
        border: `1px solid ${colors.bgBorder}`,
        backgroundColor: colors.bgSecondary,
        borderRadius: 12,
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        minHeight: 230,
      }}
    >
      <div
        style={{
          padding: '9px 11px',
          borderBottom: `1px solid ${colors.bgBorder}`,
          color: colors.textMuted,
          fontSize: 11,
          letterSpacing: 0.25,
          fontWeight: 700,
        }}
      >
        {title}
      </div>

      <div ref={parentRef} style={{ overflow: 'auto', minHeight: 0 }}>
        <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
          {items.map((item) => {
            const row = rows[item.index]
            const positive = row.changePercent >= 0
            return (
              <div
                key={item.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: item.size,
                  transform: `translateY(${item.start}px)`,
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  borderBottom: `1px solid ${colors.bgBorder}`,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: colors.textPrimary,
                      fontSize: 12,
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.label}
                  </div>
                  <div
                    style={{
                      color: colors.textMuted,
                      fontSize: 11,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {row.price > 0 ? formatPrice(row.price, getDecimals(row.price)) : '--'}
                  </div>
                </div>

                <div
                  style={{
                    color: positive ? colors.success : colors.danger,
                    fontSize: 11,
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatPercent(row.changePercent, 2)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function MarketGrid() {
  const priceMap = useTradingStore((s) => s.priceMap)
  const favouriteIds = useTradingStore((s) => s.favouriteIds)

  const allRows = useMemo<RowItem[]>(() => {
    return SYMBOLS.map((s) => {
      const ticker = priceMap[s.id]
      return {
        symbolId: s.id,
        label: s.symbol,
        price: ticker?.price ?? 0,
        changePercent: ticker?.changePercent ?? 0,
      }
    })
  }, [priceMap])

  const topGainers = useMemo(() => [...allRows].sort(sortByChangeDesc).slice(0, 30), [allRows])
  const topLosers = useMemo(() => [...allRows].sort(sortByChangeAsc).slice(0, 30), [allRows])

  const favourites = useMemo(() => {
    return favouriteIds
      .map((id) => {
        const s = SYMBOLS_BY_ID.get(id)
        const t = priceMap[id]
        if (!s) return null
        return {
          symbolId: id,
          label: s.symbol,
          price: t?.price ?? 0,
          changePercent: t?.changePercent ?? 0,
        }
      })
      .filter((x): x is RowItem => x !== null)
  }, [favouriteIds, priceMap])

  const openPositions = useMemo(() => {
    return MOCK_OPEN_POSITIONS.map((p) => {
      const s = SYMBOLS_BY_ID.get(p.symbolId)
      const t = priceMap[p.symbolId]
      return {
        symbolId: p.symbolId,
        label: s?.symbol ?? p.symbolId,
        price: t?.price ?? p.markPrice,
        changePercent: t?.changePercent ?? ((p.markPrice - p.entryPrice) / p.entryPrice) * 100,
      }
    })
  }, [priceMap])

  const mostTraded = useMemo(() => {
    return [...allRows]
      .map((row) => ({ ...row, weight: Math.abs((priceMap[row.symbolId]?.volume ?? 0) * row.price) }))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 30)
      .map(({ weight: _weight, ...row }) => row)
  }, [allRows, priceMap])

  const myWatchlist = useMemo(() => {
    const ids = useTradingStore.getState().watchlistIds
    return ids
      .map((id) => {
        const s = SYMBOLS_BY_ID.get(id)
        const t = priceMap[id]
        if (!s) return null
        return {
          symbolId: id,
          label: s.symbol,
          price: t?.price ?? 0,
          changePercent: t?.changePercent ?? 0,
        }
      })
      .filter((x): x is RowItem => x !== null)
  }, [priceMap])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 10,
        height: '100%',
        minHeight: 0,
      }}
    >
      <MarketList title="TOP GAINERS" rows={topGainers} />
      <MarketList title="TOP LOSERS" rows={topLosers} />
      <MarketList title="MY FAVOURITES" rows={favourites} />
      <MarketList title="OPEN POSITIONS" rows={openPositions} />
      <MarketList title="MOST TRADED" rows={mostTraded} />
      <MarketList title="MY WATCHLIST" rows={myWatchlist} />
    </div>
  )
}

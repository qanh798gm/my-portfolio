import { useEffect, useMemo, useRef } from 'react'
import { AreaSeries, createChart, type IChartApi, type ISeriesApi, type UTCTimestamp } from 'lightweight-charts'
import { SYMBOLS_BY_ID } from '../../data/symbols'
import { useTradingStore } from '../../stores/trading-store'
import { formatPercent, formatPrice, getDecimals } from '../../utils/format'
import { colors } from '../../utils/theme'

interface Point {
  time: UTCTimestamp
  value: number
}

function buildSeedSeries(basePrice: number): Point[] {
  const now = Math.floor(Date.now() / 1000)
  const points: Point[] = []
  let current = basePrice

  for (let i = 60; i >= 0; i -= 1) {
    const drift = (Math.random() - 0.5) * basePrice * 0.0025
    current = Math.max(0.00001, current + drift)
    points.push({
      time: (now - i * 60) as UTCTimestamp,
      value: current,
    })
  }

  return points
}

export function PriceChart() {
  const selectedSymbolId = useTradingStore((s) => s.selectedSymbolId)
  const priceMap = useTradingStore((s) => s.priceMap)

  const symbol = SYMBOLS_BY_ID.get(selectedSymbolId)
  const ticker = selectedSymbolId ? priceMap[selectedSymbolId] : undefined

  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Area'> | null>(null)

  const initialPrice = useMemo(() => {
    if (ticker?.price) return ticker.price
    return 100
  }, [ticker?.price])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const chart = createChart(el, {
      layout: {
        background: { color: colors.bgPrimary },
        textColor: colors.textMuted,
      },
      grid: {
        vertLines: { color: colors.bgBorder },
        horzLines: { color: colors.bgBorder },
      },
      rightPriceScale: {
        borderColor: colors.bgBorder,
      },
      timeScale: {
        borderColor: colors.bgBorder,
        timeVisible: true,
        secondsVisible: false,
      },
      autoSize: true,
      crosshair: {
        vertLine: { color: colors.bgBorder },
        horzLine: { color: colors.bgBorder },
      },
    })

    const series = chart.addSeries(AreaSeries, {
      lineColor: colors.brandPrimary,
      topColor: `${colors.brandPrimary}44`,
      bottomColor: `${colors.brandPrimary}05`,
      lineWidth: 2,
    })

    series.setData(buildSeedSeries(initialPrice))
    chart.timeScale().fitContent()

    chartRef.current = chart
    seriesRef.current = series

    const resizeObserver = new ResizeObserver(() => chart.applyOptions({ width: el.clientWidth, height: el.clientHeight }))
    resizeObserver.observe(el)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [initialPrice, selectedSymbolId])

  useEffect(() => {
    if (!ticker?.price || !seriesRef.current) return

    seriesRef.current.update({
      time: Math.floor(Date.now() / 1000) as UTCTimestamp,
      value: ticker.price,
    })
  }, [ticker?.price])

  return (
    <section style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div
        style={{
          padding: '10px 14px',
          borderBottom: `1px solid ${colors.bgBorder}`,
          backgroundColor: colors.bgSecondary,
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ color: colors.textPrimary, fontSize: 15, fontWeight: 700 }}>{symbol?.symbol ?? '--'}</div>
          <div style={{ color: colors.textMuted, fontSize: 12 }}>{symbol?.displayName ?? 'No symbol selected'}</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ color: colors.textSecondary, fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>
            {ticker?.price ? formatPrice(ticker.price, getDecimals(ticker.price)) : '--'}
          </div>
          <div
            style={{
              color: (ticker?.changePercent ?? 0) >= 0 ? colors.success : colors.danger,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {formatPercent(ticker?.changePercent ?? 0, 2)}
          </div>
        </div>
      </div>

      <div ref={containerRef} style={{ flex: 1, minHeight: 320, backgroundColor: colors.bgPrimary }} />
    </section>
  )
}

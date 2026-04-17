import { useEffect } from 'react'
import { SYMBOLS } from '../data/symbols'
import { useTradingStore } from '../stores/trading-store'
import type { MarketTicker } from '../types/market'

const BINANCE_STREAM_URL = 'wss://stream.binance.com:9443/ws/!miniTicker@arr'

interface BinanceMiniTicker {
  s: string // symbol, e.g. BTCUSDT
  c: string // close price
  o: string // open price
  h: string // high
  l: string // low
  v: string // volume
}

const SYMBOL_BY_BINANCE = new Map(
  SYMBOLS.filter((s) => s.binanceStream).map((s) => [s.binanceStream!.toUpperCase(), s.id])
)

function toMarketTicker(item: BinanceMiniTicker): MarketTicker | null {
  const symbolId = SYMBOL_BY_BINANCE.get(item.s)
  if (!symbolId) return null

  const price = Number(item.c)
  const open = Number(item.o)
  if (!Number.isFinite(price) || !Number.isFinite(open) || open === 0) return null

  const changePercent = ((price - open) / open) * 100

  return {
    symbolId,
    price,
    changePercent,
    volume: Number(item.v),
    high24h: Number(item.h),
    low24h: Number(item.l),
    timestamp: Date.now(),
    source: 'binance',
  }
}

export function useBinanceWs() {
  const upsertManyTickers = useTradingStore((s) => s.upsertManyTickers)
  const setBinanceStatus = useTradingStore((s) => s.setBinanceStatus)

  useEffect(() => {
    let ws: WebSocket | null = null
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null
    let unmounted = false

    const connect = () => {
      if (unmounted) return

      setBinanceStatus('connecting')
      ws = new WebSocket(BINANCE_STREAM_URL)

      ws.onopen = () => {
        setBinanceStatus('connected')
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as BinanceMiniTicker[]
          if (!Array.isArray(data)) return

          const mapped = data.map(toMarketTicker).filter((x): x is MarketTicker => x !== null)
          if (mapped.length > 0) {
            upsertManyTickers(mapped)
          }
        } catch {
          // Ignore malformed payloads
        }
      }

      ws.onerror = () => {
        setBinanceStatus('disconnected')
      }

      ws.onclose = () => {
        setBinanceStatus('disconnected')
        if (!unmounted) {
          reconnectTimer = setTimeout(connect, 3000)
        }
      }
    }

    connect()

    return () => {
      unmounted = true
      if (reconnectTimer) clearTimeout(reconnectTimer)
      if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        ws.close()
      }
    }
  }, [setBinanceStatus, upsertManyTickers])
}

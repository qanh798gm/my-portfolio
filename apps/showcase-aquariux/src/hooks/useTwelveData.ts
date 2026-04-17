import { useEffect } from 'react'
import { NON_CRYPTO_SYMBOLS } from '../data/symbols'
import { useTradingStore } from '../stores/trading-store'
import type { MarketTicker, SymbolDefinition } from '../types/market'

const TWELVE_BASE_URL = 'https://api.twelvedata.com/price'
const POLL_MS = 30_000

function getApiKey(): string {
  if (typeof process === 'undefined') return ''
  return process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY ?? ''
}

function generateMockTicker(symbol: SymbolDefinition, prevPrice?: number): MarketTicker {
  const baseByAsset: Record<SymbolDefinition['assetClass'], number> = {
    crypto: 50000,
    stock: 200,
    etf: 450,
    forex: 1.1,
    futures: 5200,
  }

  const base = prevPrice ?? baseByAsset[symbol.assetClass] ?? 100
  const drift = (Math.random() - 0.5) * base * 0.0025 // +/-0.125%
  const price = Math.max(0.00001, base + drift)
  const changePercent = ((price - base) / base) * 100

  return {
    symbolId: symbol.id,
    price,
    changePercent,
    timestamp: Date.now(),
    source: 'mock',
  }
}

async function fetchTwelvePrice(symbol: SymbolDefinition, apiKey: string): Promise<number | null> {
  if (!symbol.twelveSymbol) return null

  const url = `${TWELVE_BASE_URL}?symbol=${encodeURIComponent(symbol.twelveSymbol)}&apikey=${encodeURIComponent(apiKey)}`
  const res = await fetch(url)
  if (!res.ok) return null

  const json = (await res.json()) as { price?: string; status?: string; message?: string }
  if (json.status === 'error') return null

  const price = Number(json.price)
  return Number.isFinite(price) ? price : null
}

export function useTwelveData() {
  const upsertManyTickers = useTradingStore((s) => s.upsertManyTickers)
  const setTwelveStatus = useTradingStore((s) => s.setTwelveStatus)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    let unmounted = false

    const poll = async () => {
      if (unmounted) return

      const apiKey = getApiKey()
      const hasApi = Boolean(apiKey)
      setTwelveStatus('connecting')

      try {
        const tickers: MarketTicker[] = []
        const currentPriceMap = useTradingStore.getState().priceMap

        if (hasApi) {
          // Keep requests small for free tier limits
          const targets = NON_CRYPTO_SYMBOLS.slice(0, 8)

          for (const symbol of targets) {
            const prev = currentPriceMap[symbol.id]?.price
            const fetched = await fetchTwelvePrice(symbol, apiKey)
            if (fetched !== null) {
              const base = prev ?? fetched
              const changePercent = base === 0 ? 0 : ((fetched - base) / base) * 100

              tickers.push({
                symbolId: symbol.id,
                price: fetched,
                changePercent,
                timestamp: Date.now(),
                source: 'twelve',
              })
            } else {
              tickers.push(generateMockTicker(symbol, prev))
            }
          }
        } else {
          // No key configured -> mock fallback for non-crypto assets
          for (const symbol of NON_CRYPTO_SYMBOLS) {
            tickers.push(generateMockTicker(symbol, currentPriceMap[symbol.id]?.price))
          }
        }

        upsertManyTickers(tickers)
        setTwelveStatus('connected')
      } catch {
        setTwelveStatus('disconnected')
      } finally {
        if (!unmounted) {
          timer = setTimeout(poll, POLL_MS)
        }
      }
    }

    poll()

    return () => {
      unmounted = true
      if (timer) clearTimeout(timer)
    }
  }, [setTwelveStatus, upsertManyTickers])
}

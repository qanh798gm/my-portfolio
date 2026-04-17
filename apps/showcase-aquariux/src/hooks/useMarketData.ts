import { useMemo } from 'react'
import { useBinanceWs } from './useBinanceWs'
import { useTwelveData } from './useTwelveData'
import { useTradingStore } from '../stores/trading-store'

export function useMarketData() {
  useBinanceWs()
  useTwelveData()

  const priceMap = useTradingStore((s) => s.priceMap)
  const binanceStatus = useTradingStore((s) => s.binanceStatus)
  const twelveStatus = useTradingStore((s) => s.twelveStatus)

  const connectionStatus = useMemo(() => {
    if (binanceStatus === 'connected' || twelveStatus === 'connected') return 'connected' as const
    if (binanceStatus === 'connecting' || twelveStatus === 'connecting') return 'connecting' as const
    return 'disconnected' as const
  }, [binanceStatus, twelveStatus])

  return {
    priceMap,
    binanceStatus,
    twelveStatus,
    connectionStatus,
  }
}

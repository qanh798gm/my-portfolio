import { create } from 'zustand'
import { DEFAULT_FAVOURITE_IDS, DEFAULT_WATCHLIST_IDS } from '../data/symbols'
import type { ConnectionStatus, MarketTicker } from '../types/market'

interface TradingState {
  selectedSymbolId: string
  watchlistIds: string[]
  favouriteIds: string[]
  priceMap: Record<string, MarketTicker>
  binanceStatus: ConnectionStatus
  twelveStatus: ConnectionStatus
  setSelectedSymbolId: (symbolId: string) => void
  toggleFavourite: (symbolId: string) => void
  upsertTicker: (ticker: MarketTicker) => void
  upsertManyTickers: (tickers: MarketTicker[]) => void
  setBinanceStatus: (status: ConnectionStatus) => void
  setTwelveStatus: (status: ConnectionStatus) => void
}

export const useTradingStore = create<TradingState>((set) => ({
  selectedSymbolId: DEFAULT_WATCHLIST_IDS[0],
  watchlistIds: DEFAULT_WATCHLIST_IDS,
  favouriteIds: DEFAULT_FAVOURITE_IDS,
  priceMap: {},
  binanceStatus: 'connecting',
  twelveStatus: 'connecting',

  setSelectedSymbolId: (symbolId) => set({ selectedSymbolId: symbolId }),

  toggleFavourite: (symbolId) =>
    set((state) => {
      const exists = state.favouriteIds.includes(symbolId)
      return {
        favouriteIds: exists
          ? state.favouriteIds.filter((id) => id !== symbolId)
          : [...state.favouriteIds, symbolId],
      }
    }),

  upsertTicker: (ticker) =>
    set((state) => ({
      priceMap: {
        ...state.priceMap,
        [ticker.symbolId]: ticker,
      },
    })),

  upsertManyTickers: (tickers) =>
    set((state) => {
      const merged = { ...state.priceMap }
      for (const ticker of tickers) {
        merged[ticker.symbolId] = ticker
      }
      return { priceMap: merged }
    }),

  setBinanceStatus: (status) => set({ binanceStatus: status }),
  setTwelveStatus: (status) => set({ twelveStatus: status }),
}))

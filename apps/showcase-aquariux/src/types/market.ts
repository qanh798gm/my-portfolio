export type AssetClass = 'crypto' | 'stock' | 'etf' | 'forex' | 'futures'

export interface SymbolDefinition {
  id: string
  symbol: string
  displayName: string
  assetClass: AssetClass
  exchange?: string
  decimals: number
  binanceStream?: string
  twelveSymbol?: string
}

export interface MarketTicker {
  symbolId: string
  price: number
  changePercent: number
  volume?: number
  high24h?: number
  low24h?: number
  timestamp: number
  source: 'binance' | 'twelve' | 'mock'
}

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected'

export interface PositionRecord {
  id: string
  symbolId: string
  side: 'buy' | 'sell'
  quantity: number
  entryPrice: number
  markPrice: number
  openedAt: string
}

export interface PendingOrderRecord {
  id: string
  symbolId: string
  side: 'buy' | 'sell'
  orderType: 'market' | 'limit'
  quantity: number
  limitPrice?: number
  status: 'pending' | 'partially-filled'
  createdAt: string
}

export interface TradeHistoryRecord {
  id: string
  symbolId: string
  side: 'buy' | 'sell'
  orderType: 'market' | 'limit'
  quantity: number
  executionPrice: number
  fee: number
  pnl: number
  executedAt: string
}

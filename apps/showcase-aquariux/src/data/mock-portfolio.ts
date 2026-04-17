import type { PendingOrderRecord, PositionRecord, TradeHistoryRecord } from '../types/market'

export const MOCK_OPEN_POSITIONS: PositionRecord[] = [
  {
    id: 'pos-1',
    symbolId: 'btc-usdt',
    side: 'buy',
    quantity: 0.25,
    entryPrice: 61250,
    markPrice: 61890,
    openedAt: '2026-04-12T03:20:00Z',
  },
  {
    id: 'pos-2',
    symbolId: 'aapl',
    side: 'buy',
    quantity: 40,
    entryPrice: 198.12,
    markPrice: 201.45,
    openedAt: '2026-04-10T09:05:00Z',
  },
  {
    id: 'pos-3',
    symbolId: 'eur-usd',
    side: 'sell',
    quantity: 25000,
    entryPrice: 1.0921,
    markPrice: 1.0898,
    openedAt: '2026-04-14T14:32:00Z',
  },
]

export const MOCK_PENDING_ORDERS: PendingOrderRecord[] = [
  {
    id: 'ord-1',
    symbolId: 'eth-usdt',
    side: 'buy',
    orderType: 'limit',
    quantity: 1.2,
    limitPrice: 3120,
    status: 'pending',
    createdAt: '2026-04-16T07:10:00Z',
  },
  {
    id: 'ord-2',
    symbolId: 'tsla',
    side: 'sell',
    orderType: 'limit',
    quantity: 15,
    limitPrice: 242.5,
    status: 'partially-filled',
    createdAt: '2026-04-16T08:45:00Z',
  },
]

export const MOCK_TRADE_HISTORY: TradeHistoryRecord[] = [
  {
    id: 'trd-1',
    symbolId: 'sol-usdt',
    side: 'buy',
    orderType: 'market',
    quantity: 35,
    executionPrice: 146.42,
    fee: 1.28,
    pnl: 74.9,
    executedAt: '2026-04-16T04:22:00Z',
  },
  {
    id: 'trd-2',
    symbolId: 'spy',
    side: 'buy',
    orderType: 'market',
    quantity: 20,
    executionPrice: 508.11,
    fee: 0.8,
    pnl: -22.4,
    executedAt: '2026-04-15T13:11:00Z',
  },
  {
    id: 'trd-3',
    symbolId: 'usd-jpy',
    side: 'sell',
    orderType: 'limit',
    quantity: 15000,
    executionPrice: 154.22,
    fee: 2.1,
    pnl: 49.35,
    executedAt: '2026-04-15T02:30:00Z',
  },
]

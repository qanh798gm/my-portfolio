import type { SymbolDefinition } from '../types/market'

export const SYMBOLS: SymbolDefinition[] = [
  // Crypto
  {
    id: 'btc-usdt',
    symbol: 'BTC/USDT',
    displayName: 'Bitcoin',
    assetClass: 'crypto',
    exchange: 'Binance',
    decimals: 2,
    binanceStream: 'btcusdt',
  },
  {
    id: 'eth-usdt',
    symbol: 'ETH/USDT',
    displayName: 'Ethereum',
    assetClass: 'crypto',
    exchange: 'Binance',
    decimals: 2,
    binanceStream: 'ethusdt',
  },
  {
    id: 'sol-usdt',
    symbol: 'SOL/USDT',
    displayName: 'Solana',
    assetClass: 'crypto',
    exchange: 'Binance',
    decimals: 3,
    binanceStream: 'solusdt',
  },
  {
    id: 'bnb-usdt',
    symbol: 'BNB/USDT',
    displayName: 'BNB',
    assetClass: 'crypto',
    exchange: 'Binance',
    decimals: 3,
    binanceStream: 'bnbusdt',
  },

  // Stocks
  {
    id: 'aapl',
    symbol: 'AAPL',
    displayName: 'Apple Inc.',
    assetClass: 'stock',
    exchange: 'NASDAQ',
    decimals: 2,
    twelveSymbol: 'AAPL',
  },
  {
    id: 'tsla',
    symbol: 'TSLA',
    displayName: 'Tesla',
    assetClass: 'stock',
    exchange: 'NASDAQ',
    decimals: 2,
    twelveSymbol: 'TSLA',
  },
  {
    id: 'nvda',
    symbol: 'NVDA',
    displayName: 'NVIDIA',
    assetClass: 'stock',
    exchange: 'NASDAQ',
    decimals: 2,
    twelveSymbol: 'NVDA',
  },
  {
    id: 'msft',
    symbol: 'MSFT',
    displayName: 'Microsoft',
    assetClass: 'stock',
    exchange: 'NASDAQ',
    decimals: 2,
    twelveSymbol: 'MSFT',
  },

  // ETFs
  {
    id: 'spy',
    symbol: 'SPY',
    displayName: 'SPDR S&P 500 ETF',
    assetClass: 'etf',
    exchange: 'NYSE Arca',
    decimals: 2,
    twelveSymbol: 'SPY',
  },
  {
    id: 'qqq',
    symbol: 'QQQ',
    displayName: 'Invesco QQQ',
    assetClass: 'etf',
    exchange: 'NASDAQ',
    decimals: 2,
    twelveSymbol: 'QQQ',
  },
  {
    id: 'vti',
    symbol: 'VTI',
    displayName: 'Vanguard Total Stock Market ETF',
    assetClass: 'etf',
    exchange: 'NYSE Arca',
    decimals: 2,
    twelveSymbol: 'VTI',
  },

  // Forex
  {
    id: 'eur-usd',
    symbol: 'EUR/USD',
    displayName: 'Euro vs US Dollar',
    assetClass: 'forex',
    exchange: 'FX',
    decimals: 5,
    twelveSymbol: 'EUR/USD',
  },
  {
    id: 'usd-jpy',
    symbol: 'USD/JPY',
    displayName: 'US Dollar vs Japanese Yen',
    assetClass: 'forex',
    exchange: 'FX',
    decimals: 3,
    twelveSymbol: 'USD/JPY',
  },
  {
    id: 'gbp-usd',
    symbol: 'GBP/USD',
    displayName: 'British Pound vs US Dollar',
    assetClass: 'forex',
    exchange: 'FX',
    decimals: 5,
    twelveSymbol: 'GBP/USD',
  },

  // Futures (delayed/mock via Twelve if available)
  {
    id: 'es',
    symbol: 'ES',
    displayName: 'E-mini S&P 500',
    assetClass: 'futures',
    exchange: 'CME',
    decimals: 2,
    twelveSymbol: 'ES',
  },
  {
    id: 'nq',
    symbol: 'NQ',
    displayName: 'E-mini Nasdaq-100',
    assetClass: 'futures',
    exchange: 'CME',
    decimals: 2,
    twelveSymbol: 'NQ',
  },
]

export const SYMBOLS_BY_ID = new Map(SYMBOLS.map((s) => [s.id, s]))

export const CRYPTO_SYMBOLS = SYMBOLS.filter((s) => s.assetClass === 'crypto')
export const NON_CRYPTO_SYMBOLS = SYMBOLS.filter((s) => s.assetClass !== 'crypto')

export const DEFAULT_WATCHLIST_IDS = [
  'btc-usdt',
  'eth-usdt',
  'sol-usdt',
  'aapl',
  'tsla',
  'spy',
  'eur-usd',
  'usd-jpy',
]

export const DEFAULT_FAVOURITE_IDS = ['btc-usdt', 'eth-usdt', 'aapl', 'eur-usd']

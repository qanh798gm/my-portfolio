# Phase 2 — Aquariux Trading Platform Plan

> **Branch:** `feat/phase-2-aquariux-showcase`
> **App:** `apps/showcase-aquariux` (Vite + React + Module Federation)
> **Port:** 5002
> **Theme:** Dark fintech (aquariux-dark tokens only)

---

## Overview

A simplified multi-asset trading platform demo with 3 pages: Trading, Portfolio, and Markets. Uses **Binance WebSocket** for real-time crypto and **Twelve Data REST API** (free tier, delayed) for stocks/ETFs/forex. Architecture mirrors `showcase-hitachi` — same MF pattern, `MemoryRouter`, inline styles.

---

## Architecture

```
apps/showcase-aquariux/
├── vite.config.ts              ← MF: expose ./AquariuxApp, port 5002
├── src/
│   ├── main.tsx                ← standalone entry
│   ├── AquariuxApp.tsx         ← MemoryRouter + Routes + layout shell
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AquariuxSidebar.tsx    ← nav: Trading, Portfolio, Markets
│   │   │   └── AquariuxTopBar.tsx     ← dynamic title + connection status
│   │   ├── trading/
│   │   │   ├── Watchlist.tsx          ← symbol list with live prices
│   │   │   ├── PriceChart.tsx         ← TradingView Lightweight Charts
│   │   │   └── TradeForm.tsx          ← buy/sell form with mock submit
│   │   ├── portfolio/
│   │   │   ├── AssetDistribution.tsx  ← pie/donut chart
│   │   │   ├── PnLSummary.tsx         ← profit/loss cards
│   │   │   ├── OpenPositions.tsx      ← table
│   │   │   ├── PendingOrders.tsx      ← table
│   │   │   └── TradeHistory.tsx       ← table
│   │   └── markets/
│   │       └── MarketGrid.tsx         ← 4+ category boxes with virtualized lists
│   ├── pages/
│   │   ├── TradingPage.tsx            ← watchlist | chart | trade form
│   │   ├── PortfolioPage.tsx          ← assets + tables
│   │   └── MarketsPage.tsx            ← category boxes grid
│   ├── hooks/
│   │   ├── useBinanceWs.ts           ← Binance WebSocket for crypto tickers
│   │   ├── useTwelveData.ts          ← Twelve Data REST polling for stocks/forex
│   │   └── useMarketData.ts          ← unified hook combining both sources
│   ├── data/
│   │   ├── symbols.ts                ← symbol definitions per asset class
│   │   └── mock-portfolio.ts         ← fake positions, orders, history
│   ├── stores/
│   │   └── trading-store.ts          ← Zustand: selected symbol, prices, watchlist
│   └── utils/
│       ├── format.ts                 ← price/percent formatters
│       └── theme.ts                  ← aquariux-dark token CSS vars helper
```

---

## Page Layouts

### Page 1 — Trading (Home)

```
┌──────────────────────────────────────────────────┐
│ Sidebar │  TopBar                                 │
│         │─────────────────────────────────────────│
│ Trading │ Watchlist │    Price Chart    │ Trade    │
│ Portf.  │ ──────── │                   │ Form     │
│ Markets │ BTC/USDT │                   │ ──────── │
│         │ ETH/USDT │   TradingView     │ Buy/Sell │
│         │ AAPL     │   Lightweight     │ Amount   │
│         │ TSLA     │   Charts          │ Price    │
│         │ EUR/USD  │                   │ Total    │
│         │ ...      │                   │ [Submit] │
└──────────────────────────────────────────────────┘
```

- **Watchlist** (~200px): Scrollable symbol list grouped by asset class. Shows symbol, last price, 24h change %. Clicking selects the active symbol.
- **Chart** (flex: 1): TradingView Lightweight Charts. Loads candle data from Twelve Data historical endpoint for stocks, Binance klines for crypto.
- **Trade Form** (~280px): Market/Limit toggle, Buy/Sell tabs, quantity input, mock order submission with toast feedback.

### Page 2 — Portfolio

```
┌──────────────────────────────────────────────────┐
│ Sidebar │  TopBar                                 │
│         │─────────────────────────────────────────│
│         │ [Donut Chart]  │  PnL Summary Cards     │
│         │ Asset Distrib. │  Total | Today | Unreal │
│         │────────────────┴────────────────────────│
│         │ Tabs: Open Positions | Pending | History │
│         │ ┌──────────────────────────────────────┐│
│         │ │ DataTable with sortable columns      ││
│         │ │ ...                                  ││
│         │ └──────────────────────────────────────┘│
└──────────────────────────────────────────────────┘
```

All data is mock. Tables reuse the `DataTable` pattern from Hitachi.

### Page 3 — Markets

```
┌──────────────────────────────────────────────────┐
│ Sidebar │  TopBar                                 │
│         │─────────────────────────────────────────│
│         │ ┌─Top Gainers──┐ ┌─Top Losers───┐      │
│         │ │ virtualized  │ │ virtualized  │      │
│         │ │ list         │ │ list         │      │
│         │ └──────────────┘ └──────────────┘      │
│         │ ┌─My Favourites┐ ┌─Open Positions┐     │
│         │ │ virtualized  │ │ virtualized   │     │
│         │ │ list         │ │ list          │     │
│         │ └──────────────┘ └───────────────┘     │
│         │ ┌─Most Traded──┐ ┌─New Listings──┐     │
│         │ │ virtualized  │ │ virtualized   │     │
│         │ │ list         │ │ list          │     │
│         │ └──────────────┘ └───────────────┘     │
└──────────────────────────────────────────────────┘
```

6 category boxes in a 2×3 or 3×2 grid. Each box has a header + virtualized list (using `@tanstack/react-virtual`) showing symbol, price, change%. Real-time updates flash green/red.

---

## Data Sources

| Asset Class | Source | Method | Auth |
|-------------|--------|--------|------|
| Crypto | Binance WebSocket | `wss://stream.binance.com:9443/ws/!miniTicker@arr` | None |
| Stocks | Twelve Data REST | `GET /time_series?symbol=AAPL&interval=1day` | Free API key |
| ETFs | Twelve Data REST | Same endpoint, ETF symbols | Free API key |
| Forex | Twelve Data REST | `GET /time_series?symbol=EUR/USD` | Free API key |

- **Binance WS**: streams all crypto tickers in one connection. No rate limit.
- **Twelve Data free tier**: 8 requests/min, 800/day. We poll every 30s for active symbol only. Cache aggressively.
- Candle/OHLCV data: Binance REST for crypto, Twelve Data for others.

---

## Key Dependencies (new)

| Package | Purpose |
|---------|---------|
| `lightweight-charts` | TradingView charting library |
| `zustand` | State management for prices, selected symbol |
| `@tanstack/react-virtual` | Virtualized lists for Markets page |
| `react-router-dom` | Internal routing (MemoryRouter) |

---

## Implementation Phases (commit batches)

### Batch 1 — Scaffold + Layout
- Create `apps/showcase-aquariux` from hitachi template
- Vite config with MF (port 5002, expose `./AquariuxApp`)
- `AquariuxApp.tsx` with MemoryRouter, sidebar, topbar
- 3 empty page stubs
- Wire into shell (mf-loader, next.config, showcase page)
- Dark theme CSS vars from aquariux-dark tokens

### Batch 2 — Data Layer
- `useBinanceWs` hook — connect to mini ticker stream
- `useTwelveData` hook — REST polling with cache
- `useMarketData` unified hook
- Zustand store: selected symbol, price map, watchlist, favourites
- Symbol definitions file (crypto, stocks, ETFs, forex)
- Mock portfolio data

### Batch 3 — Trading Page
- Watchlist component with live prices
- TradingView Lightweight Charts integration
- Trade form (buy/sell, market/limit, mock submit)
- Wire together in TradingPage layout

### Batch 4 — Portfolio Page
- Asset distribution donut chart (Recharts)
- PnL summary cards
- Open positions / pending orders / trade history tables
- Tab switching

### Batch 5 — Markets Page
- MarketGrid with 6 category boxes
- Virtualized lists with `@tanstack/react-virtual`
- Real-time price flash animation
- Category filtering (Top Gainers/Losers calculated from price data)

### Batch 6 — Polish + Integration
- Connection status indicator
- Error/loading states
- Responsive adjustments
- Shell integration testing
- Build verification

---

## Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Theme | Dark only (aquariux-dark) | Demo focus, consistent with Hitachi dark |
| Styling | Inline styles | Same as Hitachi — avoids Tailwind-in-Vite issues with MF |
| Routing | MemoryRouter | Same as Hitachi — no URL conflicts with shell |
| State | Zustand | Lightweight, fits micro-app scope |
| Charts | TradingView Lightweight Charts | Purpose-built for financial data, free |
| Virtualization | @tanstack/react-virtual | Best-in-class, headless |
| Crypto data | Binance WebSocket | Real-time, free, no auth |
| Stocks/forex | Twelve Data REST | Free tier, multi-asset, delayed OK |

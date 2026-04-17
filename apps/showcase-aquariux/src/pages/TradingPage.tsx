import { PriceChart } from '../components/trading/PriceChart'
import { TradeForm } from '../components/trading/TradeForm'
import { Watchlist } from '../components/trading/Watchlist'
import { colors } from '../utils/theme'

export function TradingPage() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: colors.bgPrimary,
        minHeight: 0,
      }}
    >
      <Watchlist />
      <PriceChart />
      <TradeForm />
    </div>
  )
}

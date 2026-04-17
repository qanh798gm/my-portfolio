import { MarketGrid } from '../components/markets/MarketGrid'
import { colors } from '../utils/theme'

export function MarketsPage() {
  return (
    <div
      style={{
        height: '100%',
        minHeight: 0,
        backgroundColor: colors.bgPrimary,
        padding: 10,
      }}
    >
      <MarketGrid />
    </div>
  )
}

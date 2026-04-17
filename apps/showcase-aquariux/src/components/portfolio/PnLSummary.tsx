import { MOCK_OPEN_POSITIONS, MOCK_TRADE_HISTORY } from '../../data/mock-portfolio'
import { colors } from '../../utils/theme'

function calcUnrealizedPnl(): number {
  return MOCK_OPEN_POSITIONS.reduce((acc, p) => {
    const direction = p.side === 'buy' ? 1 : -1
    return acc + (p.markPrice - p.entryPrice) * p.quantity * direction
  }, 0)
}

function calcRealizedPnl(): number {
  return MOCK_TRADE_HISTORY.reduce((acc, t) => acc + t.pnl, 0)
}

function calcNotional(): number {
  return MOCK_OPEN_POSITIONS.reduce((acc, p) => acc + Math.abs(p.quantity * p.markPrice), 0)
}

interface CardProps {
  title: string
  value: string
  tone?: 'neutral' | 'positive' | 'negative'
}

function PnlCard({ title, value, tone = 'neutral' }: CardProps) {
  const toneColor =
    tone === 'positive' ? colors.success : tone === 'negative' ? colors.danger : colors.textPrimary

  return (
    <div
      style={{
        border: `1px solid ${colors.bgBorder}`,
        backgroundColor: colors.bgSecondary,
        borderRadius: 12,
        padding: 12,
      }}
    >
      <div style={{ color: colors.textMuted, fontSize: 11 }}>{title}</div>
      <div style={{ color: toneColor, fontSize: 18, fontWeight: 700, marginTop: 6 }}>{value}</div>
    </div>
  )
}

export function PnLSummary() {
  const unrealized = calcUnrealizedPnl()
  const realized = calcRealizedPnl()
  const net = unrealized + realized
  const notional = calcNotional()

  const fmt = (v: number) => `${v >= 0 ? '+' : '-'}$${Math.abs(v).toLocaleString('en-US', { maximumFractionDigits: 2 })}`

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
      <PnlCard title="Net P/L" value={fmt(net)} tone={net >= 0 ? 'positive' : 'negative'} />
      <PnlCard
        title="Unrealized P/L"
        value={fmt(unrealized)}
        tone={unrealized >= 0 ? 'positive' : 'negative'}
      />
      <PnlCard title="Realized P/L" value={fmt(realized)} tone={realized >= 0 ? 'positive' : 'negative'} />
      <PnlCard
        title="Open Notional"
        value={`$${notional.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
      />
    </section>
  )
}

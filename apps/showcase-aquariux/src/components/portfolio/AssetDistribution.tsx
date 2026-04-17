import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { MOCK_OPEN_POSITIONS } from '../../data/mock-portfolio'
import { SYMBOLS_BY_ID } from '../../data/symbols'
import { colors } from '../../utils/theme'

interface SliceData {
  name: string
  value: number
  color: string
}

const SLICE_COLORS = [
  colors.brandPrimary,
  colors.brandAccent,
  colors.success,
  colors.warning,
  '#8b5cf6',
  '#f97316',
]

function buildData(): SliceData[] {
  const totals = new Map<string, number>()

  for (const position of MOCK_OPEN_POSITIONS) {
    const symbol = SYMBOLS_BY_ID.get(position.symbolId)
    const label = symbol?.symbol ?? position.symbolId
    const value = Math.abs(position.quantity * position.markPrice)
    totals.set(label, (totals.get(label) ?? 0) + value)
  }

  return Array.from(totals.entries()).map(([name, value], idx) => ({
    name,
    value,
    color: SLICE_COLORS[idx % SLICE_COLORS.length],
  }))
}

export function AssetDistribution() {
  const data = buildData()
  const total = data.reduce((acc, d) => acc + d.value, 0)

  return (
    <section
      style={{
        border: `1px solid ${colors.bgBorder}`,
        backgroundColor: colors.bgSecondary,
        borderRadius: 12,
        minHeight: 280,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '10px 12px',
          borderBottom: `1px solid ${colors.bgBorder}`,
          fontSize: 12,
          color: colors.textMuted,
          fontWeight: 600,
          letterSpacing: 0.3,
        }}
      >
        ASSET DISTRIBUTION
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 8, padding: 8, flex: 1 }}>
        <div style={{ minHeight: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={88}
                stroke="none"
                isAnimationActive={false}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: colors.bgSurface,
                  border: `1px solid ${colors.bgBorder}`,
                  color: colors.textPrimary,
                  borderRadius: 8,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'grid', alignContent: 'start', gap: 8, padding: '6px 4px' }}>
          <div style={{ color: colors.textMuted, fontSize: 11 }}>Total Exposure</div>
          <div style={{ color: colors.textPrimary, fontSize: 18, fontWeight: 700 }}>
            ${total.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </div>

          <div style={{ display: 'grid', gap: 6, marginTop: 8 }}>
            {data.map((d) => {
              const pct = total > 0 ? (d.value / total) * 100 : 0
              return (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: d.color, flexShrink: 0 }} />
                    <span style={{ color: colors.textSecondary, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {d.name}
                    </span>
                  </div>
                  <span style={{ color: colors.textMuted, fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>
                    {pct.toFixed(1)}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

import { SYMBOLS_BY_ID } from '../../data/symbols'
import { formatPrice } from '../../utils/format'
import { colors } from '../../utils/theme'
import type { PendingOrderRecord, PositionRecord, TradeHistoryRecord } from '../../types/market'

function cellStyle(align: 'left' | 'right' = 'left'): React.CSSProperties {
  return {
    padding: '8px 10px',
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: align,
    borderBottom: `1px solid ${colors.bgBorder}`,
    fontVariantNumeric: 'tabular-nums',
  }
}

function headStyle(align: 'left' | 'right' = 'left'): React.CSSProperties {
  return {
    ...cellStyle(align),
    color: colors.textMuted,
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: 0.25,
    backgroundColor: colors.bgSecondary,
    position: 'sticky',
    top: 0,
    zIndex: 1,
  }
}

export function OpenPositionsTable({ rows }: { rows: PositionRecord[] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={headStyle()}>Symbol</th>
          <th style={headStyle()}>Side</th>
          <th style={headStyle('right')}>Qty</th>
          <th style={headStyle('right')}>Entry</th>
          <th style={headStyle('right')}>Mark</th>
          <th style={headStyle('right')}>Unrealized</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const s = SYMBOLS_BY_ID.get(r.symbolId)
          const direction = r.side === 'buy' ? 1 : -1
          const pnl = (r.markPrice - r.entryPrice) * r.quantity * direction
          return (
            <tr key={r.id}>
              <td style={cellStyle()}>{s?.symbol ?? r.symbolId}</td>
              <td style={{ ...cellStyle(), color: r.side === 'buy' ? colors.success : colors.danger, textTransform: 'uppercase', fontWeight: 700 }}>
                {r.side}
              </td>
              <td style={cellStyle('right')}>{r.quantity.toLocaleString()}</td>
              <td style={cellStyle('right')}>{formatPrice(r.entryPrice, 4)}</td>
              <td style={cellStyle('right')}>{formatPrice(r.markPrice, 4)}</td>
              <td style={{ ...cellStyle('right'), color: pnl >= 0 ? colors.success : colors.danger, fontWeight: 700 }}>
                {pnl >= 0 ? '+' : '-'}${Math.abs(pnl).toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export function PendingOrdersTable({ rows }: { rows: PendingOrderRecord[] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={headStyle()}>Symbol</th>
          <th style={headStyle()}>Side</th>
          <th style={headStyle()}>Type</th>
          <th style={headStyle('right')}>Qty</th>
          <th style={headStyle('right')}>Limit</th>
          <th style={headStyle()}>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const s = SYMBOLS_BY_ID.get(r.symbolId)
          return (
            <tr key={r.id}>
              <td style={cellStyle()}>{s?.symbol ?? r.symbolId}</td>
              <td style={{ ...cellStyle(), color: r.side === 'buy' ? colors.success : colors.danger, textTransform: 'uppercase', fontWeight: 700 }}>
                {r.side}
              </td>
              <td style={cellStyle()}>{r.orderType.toUpperCase()}</td>
              <td style={cellStyle('right')}>{r.quantity.toLocaleString()}</td>
              <td style={cellStyle('right')}>{r.limitPrice ? formatPrice(r.limitPrice, 4) : '--'}</td>
              <td style={cellStyle()}>{r.status}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export function TradeHistoryTable({ rows }: { rows: TradeHistoryRecord[] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={headStyle()}>Symbol</th>
          <th style={headStyle()}>Side</th>
          <th style={headStyle()}>Type</th>
          <th style={headStyle('right')}>Qty</th>
          <th style={headStyle('right')}>Exec Price</th>
          <th style={headStyle('right')}>Fee</th>
          <th style={headStyle('right')}>P/L</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const s = SYMBOLS_BY_ID.get(r.symbolId)
          return (
            <tr key={r.id}>
              <td style={cellStyle()}>{s?.symbol ?? r.symbolId}</td>
              <td style={{ ...cellStyle(), color: r.side === 'buy' ? colors.success : colors.danger, textTransform: 'uppercase', fontWeight: 700 }}>
                {r.side}
              </td>
              <td style={cellStyle()}>{r.orderType.toUpperCase()}</td>
              <td style={cellStyle('right')}>{r.quantity.toLocaleString()}</td>
              <td style={cellStyle('right')}>{formatPrice(r.executionPrice, 4)}</td>
              <td style={cellStyle('right')}>${r.fee.toFixed(2)}</td>
              <td style={{ ...cellStyle('right'), color: r.pnl >= 0 ? colors.success : colors.danger, fontWeight: 700 }}>
                {r.pnl >= 0 ? '+' : '-'}${Math.abs(r.pnl).toFixed(2)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

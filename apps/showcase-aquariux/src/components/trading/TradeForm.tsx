import { useMemo, useState } from 'react'
import { SYMBOLS_BY_ID } from '../../data/symbols'
import { useTradingStore } from '../../stores/trading-store'
import { formatPrice, getDecimals } from '../../utils/format'
import { colors } from '../../utils/theme'

type Side = 'buy' | 'sell'
type OrderType = 'market' | 'limit'

export function TradeForm() {
  const selectedSymbolId = useTradingStore((s) => s.selectedSymbolId)
  const ticker = useTradingStore((s) => s.priceMap[selectedSymbolId])

  const [side, setSide] = useState<Side>('buy')
  const [orderType, setOrderType] = useState<OrderType>('market')
  const [quantity, setQuantity] = useState('')
  const [limitPrice, setLimitPrice] = useState('')
  const [message, setMessage] = useState('')

  const symbol = SYMBOLS_BY_ID.get(selectedSymbolId)

  const refPrice = useMemo(() => {
    if (orderType === 'limit') {
      const v = Number(limitPrice)
      if (Number.isFinite(v) && v > 0) return v
    }
    return ticker?.price ?? 0
  }, [limitPrice, orderType, ticker?.price])

  const total = useMemo(() => {
    const qty = Number(quantity)
    if (!Number.isFinite(qty) || qty <= 0 || !refPrice) return 0
    return qty * refPrice
  }, [quantity, refPrice])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const qty = Number(quantity)
    if (!Number.isFinite(qty) || qty <= 0) {
      setMessage('Enter a valid quantity')
      return
    }

    if (orderType === 'limit') {
      const lp = Number(limitPrice)
      if (!Number.isFinite(lp) || lp <= 0) {
        setMessage('Enter a valid limit price')
        return
      }
    }

    setMessage(`${side.toUpperCase()} ${qty} ${symbol?.symbol ?? ''} (${orderType}) submitted`) 
    setQuantity('')
    if (orderType === 'limit') setLimitPrice('')
  }

  return (
    <aside
      style={{
        width: 300,
        flexShrink: 0,
        borderLeft: `1px solid ${colors.bgBorder}`,
        backgroundColor: colors.bgSecondary,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '12px 14px',
          borderBottom: `1px solid ${colors.bgBorder}`,
          fontSize: 12,
          color: colors.textMuted,
          fontWeight: 600,
          letterSpacing: 0.3,
        }}
      >
        TRADE FORM
      </div>

      <form onSubmit={handleSubmit} style={{ padding: 14, display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {(['buy', 'sell'] as const).map((v) => {
            const active = side === v
            return (
              <button
                key={v}
                type="button"
                onClick={() => setSide(v)}
                style={{
                  border: `1px solid ${active ? (v === 'buy' ? colors.success : colors.danger) : colors.bgBorder}`,
                  backgroundColor: active
                    ? v === 'buy'
                      ? `${colors.success}22`
                      : `${colors.danger}22`
                    : colors.bgPrimary,
                  color: active ? (v === 'buy' ? colors.success : colors.danger) : colors.textSecondary,
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                {v}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {(['market', 'limit'] as const).map((v) => {
            const active = orderType === v
            return (
              <button
                key={v}
                type="button"
                onClick={() => setOrderType(v)}
                style={{
                  border: `1px solid ${active ? colors.brandPrimary : colors.bgBorder}`,
                  backgroundColor: active ? `${colors.brandPrimary}22` : colors.bgPrimary,
                  color: active ? colors.brandPrimary : colors.textSecondary,
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                {v}
              </button>
            )
          })}
        </div>

        <div>
          <label style={{ display: 'block', color: colors.textMuted, fontSize: 11, marginBottom: 6 }}>
            Symbol
          </label>
          <div
            style={{
              border: `1px solid ${colors.bgBorder}`,
              backgroundColor: colors.bgPrimary,
              borderRadius: 8,
              padding: '9px 10px',
              color: colors.textPrimary,
              fontSize: 13,
            }}
          >
            {symbol?.symbol ?? '--'}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', color: colors.textMuted, fontSize: 11, marginBottom: 6 }}>
            Quantity
          </label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0.00"
            inputMode="decimal"
            style={{
              width: '100%',
              border: `1px solid ${colors.bgBorder}`,
              backgroundColor: colors.bgPrimary,
              color: colors.textPrimary,
              borderRadius: 8,
              padding: '9px 10px',
              fontSize: 13,
              outline: 'none',
            }}
          />
        </div>

        {orderType === 'limit' && (
          <div>
            <label style={{ display: 'block', color: colors.textMuted, fontSize: 11, marginBottom: 6 }}>
              Limit Price
            </label>
            <input
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              placeholder={ticker?.price ? String(ticker.price) : '0.00'}
              inputMode="decimal"
              style={{
                width: '100%',
                border: `1px solid ${colors.bgBorder}`,
                backgroundColor: colors.bgPrimary,
                color: colors.textPrimary,
                borderRadius: 8,
                padding: '9px 10px',
                fontSize: 13,
                outline: 'none',
              }}
            />
          </div>
        )}

        <div
          style={{
            border: `1px solid ${colors.bgBorder}`,
            backgroundColor: colors.bgPrimary,
            borderRadius: 8,
            padding: 10,
            display: 'grid',
            gap: 4,
            fontSize: 12,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textMuted }}>
            <span>Ref Price</span>
            <span>{refPrice ? formatPrice(refPrice, getDecimals(refPrice)) : '--'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary }}>
            <span>Est. Total</span>
            <span style={{ fontWeight: 700 }}>{total ? formatPrice(total, 2) : '--'}</span>
          </div>
        </div>

        <button
          type="submit"
          style={{
            border: 'none',
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            color: '#fff',
            backgroundColor: side === 'buy' ? colors.success : colors.danger,
          }}
        >
          Submit {side.toUpperCase()} Order
        </button>

        {message && <div style={{ color: colors.textMuted, fontSize: 11 }}>{message}</div>}
      </form>
    </aside>
  )
}

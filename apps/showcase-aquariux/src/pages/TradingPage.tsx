import { colors } from '../utils/theme'

export function TradingPage() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: colors.bgPrimary,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          color: colors.textMuted,
          fontSize: 14,
        }}
      >
        Trading Page — Coming in Batch 3
      </div>
    </div>
  )
}

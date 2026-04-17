/** Format a number as a price string, e.g. 1234.56 → "1,234.56" */
export function formatPrice(value: number, decimals = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** Format a percentage change, e.g. 2.34 → "+2.34%" */
export function formatPercent(value: number, decimals = 2): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

/** Format a large number with K/M/B suffix, e.g. 1234567 → "1.23M" */
export function formatVolume(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`
  return value.toFixed(2)
}

/** Auto-detect appropriate decimal places for a price */
export function getDecimals(price: number): number {
  if (price >= 1000) return 2
  if (price >= 1) return 4
  if (price >= 0.01) return 5
  return 8
}

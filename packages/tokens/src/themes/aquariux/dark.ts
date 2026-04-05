import type { ThemeTokens } from '../../types'
import { baseTypography, baseSpacing, baseRadius, baseTransition } from '../../base'

/** Default dark fintech theme — primary Aquariux brand */
export const aquariuxDarkTheme: ThemeTokens = {
  name: 'aquariux-dark',
  colors: {
    background: {
      primary: '#0a0e1a',
      secondary: '#111827',
      surface: '#1a2235',
      border: '#253047',
    },
    text: {
      primary: '#f0f4ff',
      secondary: '#94a3b8',
      muted: '#475569',
      inverse: '#0a0e1a',
    },
    brand: {
      primary: '#3b82f6',
      primaryHover: '#60a5fa',
      accent: '#06b6d4',
      accentHover: '#22d3ee',
    },
    status: {
      success: '#10b981',
      successMuted: '#052e16',
      danger: '#ef4444',
      dangerMuted: '#2d0a0a',
      warning: '#f59e0b',
      warningMuted: '#2d1a00',
      info: '#3b82f6',
      infoMuted: '#0a1a3d',
    },
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  radius: baseRadius,
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.5)',
    md: '0 4px 12px rgba(0,0,0,0.6)',
    lg: '0 8px 24px rgba(0,0,0,0.7)',
    xl: '0 16px 48px rgba(0,0,0,0.8)',
  },
  transition: baseTransition,
}

import type { ThemeTokens } from '../../types'
import { baseTypography, baseSpacing, baseRadius, baseTransition } from '../../base'

/**
 * Branded client theme — simulates a white-label client's custom brand.
 * Uses a teal/gold palette to represent a fictional Middle East fintech client.
 */
export const aquariuxBrandedTheme: ThemeTokens = {
  name: 'aquariux-branded',
  colors: {
    background: {
      primary: '#0c1220',
      secondary: '#121e30',
      surface: '#1a2d44',
      border: '#243d58',
    },
    text: {
      primary: '#f0ede6',
      secondary: '#a89f8e',
      muted: '#5c5448',
      inverse: '#0c1220',
    },
    brand: {
      primary: '#d4a017',
      primaryHover: '#e6b420',
      accent: '#00b09b',
      accentHover: '#00c9ae',
    },
    status: {
      success: '#00b09b',
      successMuted: '#00291f',
      danger: '#e05252',
      dangerMuted: '#2d0a0a',
      warning: '#d4a017',
      warningMuted: '#2d2000',
      info: '#4a9eff',
      infoMuted: '#0a1a3d',
    },
    overlay: 'rgba(0, 0, 0, 0.65)',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  radius: baseRadius,
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.5)',
    md: '0 4px 12px rgba(0,0,0,0.6)',
    lg: '0 8px 24px rgba(212,160,23,0.15)',
    xl: '0 16px 48px rgba(0,0,0,0.8)',
  },
  transition: baseTransition,
}

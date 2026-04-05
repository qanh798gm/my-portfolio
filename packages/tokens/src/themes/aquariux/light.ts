import type { ThemeTokens } from '../../types'
import { baseTypography, baseSpacing, baseRadius, baseTransition } from '../../base'

/** Light professional theme — for clients preferring clean/white UI */
export const aquariuxLightTheme: ThemeTokens = {
  name: 'aquariux-light',
  colors: {
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      surface: '#f1f5f9',
      border: '#e2e8f0',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#94a3b8',
      inverse: '#ffffff',
    },
    brand: {
      primary: '#2563eb',
      primaryHover: '#1d4ed8',
      accent: '#0891b2',
      accentHover: '#0e7490',
    },
    status: {
      success: '#16a34a',
      successMuted: '#dcfce7',
      danger: '#dc2626',
      dangerMuted: '#fee2e2',
      warning: '#ca8a04',
      warningMuted: '#fef9c3',
      info: '#2563eb',
      infoMuted: '#dbeafe',
    },
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  radius: baseRadius,
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.07)',
    md: '0 4px 12px rgba(0,0,0,0.1)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
    xl: '0 16px 48px rgba(0,0,0,0.15)',
  },
  transition: baseTransition,
}

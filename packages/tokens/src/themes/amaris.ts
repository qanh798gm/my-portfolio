import type { ThemeTokens } from '../types'
import { baseTypography, baseSpacing, baseRadius, baseTransition } from '../base'

export const amarisTheme: ThemeTokens = {
  name: 'amaris',
  colors: {
    background: {
      primary: '#ffffff',
      secondary: '#f8f9fc',
      surface: '#f1f3f9',
      border: '#e2e8f0',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
      muted: '#a0aec0',
      inverse: '#ffffff',
    },
    brand: {
      primary: '#5b21b6',
      primaryHover: '#4c1d95',
      accent: '#7c3aed',
      accentHover: '#6d28d9',
    },
    status: {
      success: '#059669',
      successMuted: '#d1fae5',
      danger: '#dc2626',
      dangerMuted: '#fee2e2',
      warning: '#d97706',
      warningMuted: '#fef3c7',
      info: '#2563eb',
      infoMuted: '#dbeafe',
    },
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  radius: baseRadius,
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.1)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
    xl: '0 16px 48px rgba(0,0,0,0.15)',
  },
  transition: baseTransition,
}

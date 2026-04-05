import type { ThemeTokens } from '../types'
import { baseTypography, baseSpacing, baseRadius, baseTransition } from '../base'

export const gmoTheme: ThemeTokens = {
  name: 'gmo',
  colors: {
    background: {
      primary: '#080b0e',
      secondary: '#0e1318',
      surface: '#141a22',
      border: '#1e2732',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
      muted: '#475569',
      inverse: '#080b0e',
    },
    brand: {
      primary: '#00d4aa',
      primaryHover: '#00f0c0',
      accent: '#f7931a',
      accentHover: '#ffaa33',
    },
    status: {
      success: '#00c853',
      successMuted: '#003d1a',
      danger: '#ff3d57',
      dangerMuted: '#3d0010',
      warning: '#ffab00',
      warningMuted: '#3d2800',
      info: '#2979ff',
      infoMuted: '#001a3d',
    },
    overlay: 'rgba(0, 0, 0, 0.75)',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  radius: baseRadius,
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.6)',
    md: '0 4px 12px rgba(0,0,0,0.7)',
    lg: '0 8px 24px rgba(0,0,0,0.8)',
    xl: '0 16px 48px rgba(0,0,0,0.9)',
  },
  transition: baseTransition,
}

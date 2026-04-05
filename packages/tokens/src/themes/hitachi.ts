import type { ThemeTokens } from '../types'
import { baseTypography, baseSpacing, baseRadius, baseTransition } from '../base'

export const hitachiTheme: ThemeTokens = {
  name: 'hitachi',
  colors: {
    background: {
      primary: '#0d1117',
      secondary: '#161b22',
      surface: '#1c2128',
      border: '#30363d',
    },
    text: {
      primary: '#e6edf3',
      secondary: '#8d96a0',
      muted: '#484f58',
      inverse: '#0d1117',
    },
    brand: {
      primary: '#e8000d',
      primaryHover: '#ff1a1a',
      accent: '#f78166',
      accentHover: '#ff8c72',
    },
    status: {
      success: '#3fb950',
      successMuted: '#1a3a24',
      danger: '#f85149',
      dangerMuted: '#3d1c1c',
      warning: '#d29922',
      warningMuted: '#3d2e0a',
      info: '#388bfd',
      infoMuted: '#0d2149',
    },
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
  typography: baseTypography,
  spacing: baseSpacing,
  radius: baseRadius,
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.4)',
    md: '0 4px 12px rgba(0,0,0,0.5)',
    lg: '0 8px 24px rgba(0,0,0,0.6)',
    xl: '0 16px 48px rgba(0,0,0,0.7)',
  },
  transition: baseTransition,
}

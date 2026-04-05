export interface ColorScale {
  primary: string
  secondary: string
  surface: string
  border: string
}

export interface TextScale {
  primary: string
  secondary: string
  muted: string
  inverse: string
}

export interface BrandScale {
  primary: string
  primaryHover: string
  accent: string
  accentHover: string
}

export interface StatusColors {
  success: string
  successMuted: string
  danger: string
  dangerMuted: string
  warning: string
  warningMuted: string
  info: string
  infoMuted: string
}

export interface ThemeTokens {
  name: string
  colors: {
    background: ColorScale
    text: TextScale
    brand: BrandScale
    status: StatusColors
    overlay: string
  }
  typography: {
    fontFamily: {
      sans: string
      mono: string
    }
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      '4xl': string
    }
    fontWeight: {
      normal: string
      medium: string
      semibold: string
      bold: string
    }
    lineHeight: {
      tight: string
      normal: string
      relaxed: string
    }
  }
  spacing: {
    '0': string
    '1': string
    '2': string
    '3': string
    '4': string
    '5': string
    '6': string
    '8': string
    '10': string
    '12': string
    '16': string
    '20': string
    '24': string
  }
  radius: {
    none: string
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  shadow: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  transition: {
    fast: string
    normal: string
    slow: string
  }
}

export type ThemeName =
  | 'hitachi'
  | 'gmo'
  | 'amaris'
  | 'aquariux-dark'
  | 'aquariux-light'
  | 'aquariux-branded'

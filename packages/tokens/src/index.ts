// Types
export type {
  ThemeTokens,
  ThemeName,
  ColorScale,
  TextScale,
  BrandScale,
  StatusColors,
} from './types'

// Base primitives
export { baseTypography, baseSpacing, baseRadius, baseTransition } from './base'

// Utilities
export { tokensToCssVars, applyTheme } from './utils'

// Themes
export { hitachiTheme } from './themes/hitachi'
export { gmoTheme } from './themes/gmo'
export { amarisTheme } from './themes/amaris'
export { aquariuxDarkTheme, aquariuxLightTheme, aquariuxBrandedTheme } from './themes/aquariux'

// Theme map for convenient lookup
import { hitachiTheme } from './themes/hitachi'
import { gmoTheme } from './themes/gmo'
import { amarisTheme } from './themes/amaris'
import { aquariuxDarkTheme, aquariuxLightTheme, aquariuxBrandedTheme } from './themes/aquariux'
import type { ThemeName, ThemeTokens } from './types'

export const themeMap: Record<ThemeName, ThemeTokens> = {
  hitachi: hitachiTheme,
  gmo: gmoTheme,
  amaris: amarisTheme,
  'aquariux-dark': aquariuxDarkTheme,
  'aquariux-light': aquariuxLightTheme,
  'aquariux-branded': aquariuxBrandedTheme,
}

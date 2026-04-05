import type { ThemeTokens } from './types'

/**
 * Converts a ThemeTokens object into a flat CSS custom properties object.
 * Usage: inject the result into a :root or scoped selector.
 */
export function tokensToCssVars(tokens: ThemeTokens): Record<string, string> {
  return {
    // Background
    '--color-bg-primary': tokens.colors.background.primary,
    '--color-bg-secondary': tokens.colors.background.secondary,
    '--color-bg-surface': tokens.colors.background.surface,
    '--color-bg-border': tokens.colors.background.border,
    // Text
    '--color-text-primary': tokens.colors.text.primary,
    '--color-text-secondary': tokens.colors.text.secondary,
    '--color-text-muted': tokens.colors.text.muted,
    '--color-text-inverse': tokens.colors.text.inverse,
    // Brand
    '--color-brand-primary': tokens.colors.brand.primary,
    '--color-brand-primary-hover': tokens.colors.brand.primaryHover,
    '--color-brand-accent': tokens.colors.brand.accent,
    '--color-brand-accent-hover': tokens.colors.brand.accentHover,
    // Status
    '--color-success': tokens.colors.status.success,
    '--color-success-muted': tokens.colors.status.successMuted,
    '--color-danger': tokens.colors.status.danger,
    '--color-danger-muted': tokens.colors.status.dangerMuted,
    '--color-warning': tokens.colors.status.warning,
    '--color-warning-muted': tokens.colors.status.warningMuted,
    '--color-info': tokens.colors.status.info,
    '--color-info-muted': tokens.colors.status.infoMuted,
    '--color-overlay': tokens.colors.overlay,
    // Typography
    '--font-sans': tokens.typography.fontFamily.sans,
    '--font-mono': tokens.typography.fontFamily.mono,
    // Radius
    '--radius-sm': tokens.radius.sm,
    '--radius-md': tokens.radius.md,
    '--radius-lg': tokens.radius.lg,
    '--radius-xl': tokens.radius.xl,
    '--radius-full': tokens.radius.full,
    // Shadow
    '--shadow-sm': tokens.shadow.sm,
    '--shadow-md': tokens.shadow.md,
    '--shadow-lg': tokens.shadow.lg,
    '--shadow-xl': tokens.shadow.xl,
    // Transition
    '--transition-fast': tokens.transition.fast,
    '--transition-normal': tokens.transition.normal,
    '--transition-slow': tokens.transition.slow,
  }
}

/**
 * Applies theme tokens as CSS custom properties to a DOM element.
 * Call on the showcase root element when a showcase mounts.
 */
export function applyTheme(element: HTMLElement, tokens: ThemeTokens): void {
  const vars = tokensToCssVars(tokens)
  Object.entries(vars).forEach(([key, value]) => {
    element.style.setProperty(key, value)
  })
  element.setAttribute('data-theme', tokens.name)
}

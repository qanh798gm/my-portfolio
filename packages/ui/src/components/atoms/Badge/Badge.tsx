import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../../utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] border border-[var(--color-bg-border)]',
        brand: 'bg-[var(--color-brand-primary)] text-white',
        success: 'bg-[var(--color-success-muted)] text-[var(--color-success)]',
        danger: 'bg-[var(--color-danger-muted)] text-[var(--color-danger)]',
        warning: 'bg-[var(--color-warning-muted)] text-[var(--color-warning)]',
        info: 'bg-[var(--color-info-muted)] text-[var(--color-info)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

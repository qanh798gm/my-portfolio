import type * as React from 'react'
import { cn } from '../../../utils/cn'

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
}

function Spinner({ size = 'md', label = 'Loading…', className, ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'inline-block animate-spin rounded-full border-current border-t-transparent',
        sizeMap[size],
        className
      )}
      {...props}
    />
  )
}

export { Spinner }

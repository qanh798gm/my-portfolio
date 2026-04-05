import type { Metadata } from 'next'
import { ShowcasePlaceholder } from '@/components/showcase/ShowcasePlaceholder'

export const metadata: Metadata = {
  title: 'GMO Runsystem Showcase',
  description: 'Cryptocurrency trading platform — order book, candlestick charts, real-time feeds.',
}

export default function GmoShowcasePage() {
  return <ShowcasePlaceholder companyId="gmo" />
}

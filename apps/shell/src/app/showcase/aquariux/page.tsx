import type { Metadata } from 'next'
import { ShowcasePlaceholder } from '@/components/showcase/ShowcasePlaceholder'

export const metadata: Metadata = {
  title: 'Aquariux Fintech Showcase',
  description: 'Multi-asset white-label trading platform with live Binance WebSocket market data.',
}

export default function AquariuxShowcasePage() {
  return <ShowcasePlaceholder companyId="aquariux" />
}

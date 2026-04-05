import type { Metadata } from 'next'
import { ShowcasePlaceholder } from '@/components/showcase/ShowcasePlaceholder'

export const metadata: Metadata = {
  title: 'Hitachi Vantara Showcase',
  description: 'Enterprise logistics dashboards — admin panels, KPI charts, and interactive maps.',
}

export default function HitachiShowcasePage() {
  return <ShowcasePlaceholder companyId="hitachi" />
}

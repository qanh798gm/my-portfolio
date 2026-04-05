import type { Metadata } from 'next'
import { ShowcasePlaceholder } from '@/components/showcase/ShowcasePlaceholder'

export const metadata: Metadata = {
  title: 'Amaris Consulting Showcase',
  description: 'Internal ERP ecosystem built with micro-frontend architecture using single-spa.',
}

export default function AmarisShowcasePage() {
  return <ShowcasePlaceholder companyId="amaris" />
}

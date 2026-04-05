export interface CareerEntry {
  id: string
  company: string
  role: string
  period: { start: string; end: string | 'Present' }
  location: string
  tags: string[]
  highlights: string[]
  showcaseRoute: string
  accentColor: string
  logo: string
  isCurrentRole?: boolean
}

export const careerData: CareerEntry[] = [
  {
    id: 'aquariux',
    company: 'Tech JDI × Aquariux Fintech',
    role: 'Frontend Engineer',
    period: { start: 'Jun 2024', end: 'Present' },
    location: 'Ho Chi Minh City (Remote → Singapore HQ)',
    accentColor: '#3b82f6',
    logo: '/assets/logos/aquariux.svg',
    showcaseRoute: '/showcase/aquariux',
    isCurrentRole: true,
    tags: ['React', 'TypeScript', 'React Native', 'WebSocket', 'White-label', 'Multi-tenant'],
    highlights: [
      'Multi-asset white-label trading platform for ~20 enterprise fintech clients across SEA & Middle East',
      'Single-codebase multi-tenant frontend — client-specific customization, low operational cost',
      'Built lightweight UI component library with styled-components, reused across trading & wallet products',
      'Optimized real-time data rendering for live market feeds (memoization, virtualization, re-render control)',
      'Tech focal point for Vietnam squad (5 engineers) — daily ops, code reviews, mentorship',
    ],
  },
  {
    id: 'amaris',
    company: 'Amaris Consulting',
    role: 'Frontend Engineer',
    period: { start: 'Mar 2022', end: 'May 2024' },
    location: 'Ho Chi Minh City',
    accentColor: '#7c3aed',
    logo: '/assets/logos/amaris.svg',
    showcaseRoute: '/showcase/amaris',
    tags: ['Vue 3', 'TypeScript', 'Micro-frontends', 'single-spa', 'Azure', 'ERP'],
    highlights: [
      'Internal ERP ecosystem for Amaris employees globally — reduced dependency on ~50 third-party tools',
      'Micro-frontend architecture (single-spa) — shared templates enabling 80–90% reuse across ERP modules',
      'Contributed to architectural decisions and technical documentation alongside lead architect',
      'Supported rollout of ~10 ERP modules across time management, payroll, comms, and learning verticals',
      'Cross-regional collaboration across Europe and Asia within Microsoft Azure ecosystem',
    ],
  },
  {
    id: 'gmo',
    company: 'GMO-Z.com Runsystem',
    role: 'Frontend Engineer',
    period: { start: 'Jan 2021', end: 'Feb 2022' },
    location: 'Ho Chi Minh City',
    accentColor: '#00d4aa',
    logo: '/assets/logos/gmo.svg',
    showcaseRoute: '/showcase/gmo',
    tags: ['Angular', 'Vue 2', 'TypeScript', 'Crypto', 'Real Estate'],
    highlights: [
      'Crypto trading platform for Thai GMO-Z.com — top emerging crypto exchange during 2021 market peak',
      'Real estate rental & leasing application for the Japanese market',
      'Angular for crypto platform, Vue 2 for real estate app',
    ],
  },
  {
    id: 'hitachi',
    company: 'Hitachi Vantara',
    role: 'Frontend Engineer',
    period: { start: 'Aug 2019', end: 'Dec 2020' },
    location: 'Ho Chi Minh City',
    accentColor: '#e8000d',
    logo: '/assets/logos/hitachi.svg',
    showcaseRoute: '/showcase/hitachi',
    tags: ['React', 'Angular', 'TypeScript', 'Logistics', 'Enterprise Dashboard'],
    highlights: [
      'Enterprise admin dashboards for logistics & management systems across Thailand, Singapore, and Japan',
      'React and Angular UI features for outsourced enterprise client projects',
      'Large enterprise environment — code quality, delivery discipline, cross-team collaboration',
    ],
  },
]

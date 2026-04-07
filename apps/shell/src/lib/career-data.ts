export interface CareerEntry {
  id: string
  company: string
  shortName: string
  role: string
  period: { start: string; end: string | 'Present' }
  location: string
  description: string
  tags: string[]
  highlights: string[]
  showcaseRoute: string
  accentColor: string
  logo: string
  /** Optional CSS filter applied to the logo <img> — e.g. 'invert(1)' for dark logos on dark bg */
  logoFilter?: string
  isCurrentRole?: boolean
}

export const careerData: CareerEntry[] = [
  {
    id: 'hitachi',
    company: 'Hitachi Vantara',
    shortName: 'Hitachi',
    role: 'Frontend Engineer',
    period: { start: 'Aug 2019', end: 'Dec 2020' },
    location: 'Ho Chi Minh City',
    description:
      'Enterprise admin dashboards for logistics and fleet management systems deployed across Thailand, Singapore, and Japan. First professional role — built strong foundations in React and Angular, code quality discipline, and large-scale enterprise delivery processes.',
    accentColor: '#B82323',
    logo: '/assets/logos/hitachi_white.svg',
    showcaseRoute: '/showcase/hitachi',
    tags: ['React', 'Angular', 'TypeScript', 'Logistics', 'Enterprise Dashboard'],
    highlights: [
      'Enterprise admin dashboards for logistics & management systems across Thailand, Singapore, and Japan',
      'React and Angular UI features for outsourced enterprise client projects',
      'Large enterprise environment — code quality, delivery discipline, cross-team collaboration',
    ],
  },
  {
    id: 'gmo',
    company: 'GMO-Z.com Runsystem',
    shortName: 'GMO',
    role: 'Frontend Engineer',
    period: { start: 'Jan 2021', end: 'Feb 2022' },
    location: 'Ho Chi Minh City',
    description:
      'Crypto trading platform for Thai GMO-Z.com during the 2021 bull market peak, and a real estate rental & leasing application for the Japanese market. Two distinct products, two frameworks — Angular for the high-frequency trading UI, Vue 2 for the real estate portal.',
    accentColor: '#3B82F6',
    logo: '/assets/logos/gmo.svg',
    showcaseRoute: '/showcase/gmo',
    tags: ['Angular', 'Vue 2', 'TypeScript', 'Crypto', 'Real Estate', 'RxJS'],
    highlights: [
      'Crypto trading platform for Thai GMO-Z.com — top emerging crypto exchange during 2021 market peak',
      'Real estate rental & leasing application for the Japanese market',
      'Angular for crypto platform, Vue 2 for real estate app',
    ],
  },
  {
    id: 'amaris',
    company: 'Amaris Consulting',
    shortName: 'Amaris',
    role: 'Frontend Engineer',
    period: { start: 'Mar 2022', end: 'May 2025' },
    location: 'Ho Chi Minh City',
    description:
      'Internal ERP ecosystem for Amaris employees globally, replacing ~50 third-party tools with a unified micro-frontend platform. Built on single-spa with shared template architecture that enabled 80–90% module reuse across HR, payroll, time management, and learning verticals.',
    accentColor: '#d4a99a',
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
    id: 'aquariux',
    company: 'Tech JDI × Aquariux Fintech',
    shortName: 'Aquariux',
    role: 'Frontend Engineer',
    period: { start: 'Jun 2024', end: 'Present' },
    location: 'Ho Chi Minh City · Remote → Singapore HQ',
    description:
      'Multi-asset white-label trading platform serving ~20 enterprise fintech clients across SEA and the Middle East. Single-codebase multi-tenant architecture with per-client theme customization, real-time market data, and cross-platform delivery (web + React Native).',
    accentColor: '#8B5CF6',
    logo: '/assets/logos/aquariux.svg',
    showcaseRoute: '/showcase/aquariux',
    isCurrentRole: true,
    tags: [
      'React',
      'TypeScript',
      'React Native',
      'WebSocket',
      'White-label',
      'Multi-tenant',
      'styled-components',
    ],
    highlights: [
      'Multi-asset white-label trading platform for ~20 enterprise fintech clients across SEA & Middle East',
      'Single-codebase multi-tenant frontend — client-specific customization, low operational cost',
      'Built lightweight UI component library with styled-components, reused across trading & wallet products',
      'Optimized real-time data rendering for live market feeds (memoization, virtualization, re-render control)',
      'Tech focal point for Vietnam squad (5 engineers) — daily ops, code reviews, mentorship',
    ],
  },
]

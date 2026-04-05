import type { Metadata } from 'next'
import Link from 'next/link'
import { careerData } from '@/lib/career-data'

export const metadata: Metadata = {
  title: 'About',
  description: 'Skills, certifications, and technical background of Anh Quoc Do.',
}

const skills = {
  'Languages & Frameworks': [
    'JavaScript',
    'TypeScript',
    'React 18',
    'Vue 3',
    'Angular',
    'React Native',
  ],
  'Architecture & Patterns': [
    'Micro-frontends (single-spa, Module Federation)',
    'Monorepo (Turborepo, pnpm)',
    'Design System Architecture',
    'Real-time Data Handling',
  ],
  'Build & Tooling': [
    'Vite',
    'Rspack / Webpack',
    'Next.js',
    'Storybook',
    'Vitest / Jest',
    'ESLint / Prettier',
  ],
  'State & Data': ['Zustand', 'React Query / TanStack Query', 'WebSocket', 'REST API'],
  'Cloud & DevOps': ['Microsoft Azure', 'AWS', 'GitHub Actions', 'CI/CD Pipelines', 'Vercel'],
}

const certifications = [
  {
    name: 'Azure Solutions Architect Expert (AZ-305)',
    issuer: 'Microsoft Certified',
    year: '2024',
  },
  {
    name: 'Bachelor of Computer Science in Computing',
    issuer: 'University of Greenwich',
    year: '2020',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-4 text-4xl font-bold text-[var(--color-text-primary)]">About</h1>
      <p className="mb-16 text-[var(--color-text-secondary)]">
        Frontend Engineer with 6 years of experience specialising in complex, data-intensive
        applications — trading platforms, ERP ecosystems, and enterprise dashboards.
      </p>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold text-[var(--color-text-primary)]">Skills</h2>
        <div className="space-y-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-medium text-[var(--color-brand-primary)]">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] px-3 py-1 text-xs text-[var(--color-text-secondary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold text-[var(--color-text-primary)]">
          Education & Certifications
        </h2>
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-start justify-between rounded-xl border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-5"
            >
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">{cert.name}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{cert.issuer}</p>
              </div>
              <span className="text-xs text-[var(--color-text-muted)]">{cert.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Companies */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold text-[var(--color-text-primary)]">Companies</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {careerData.map((entry) => (
            <Link
              key={entry.id}
              href={entry.showcaseRoute}
              className="group rounded-xl border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-5 transition-all hover:border-[var(--color-brand-primary)]"
            >
              <p className="mb-1 font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)]">
                {entry.company}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {entry.period.start} — {entry.period.end}
              </p>
              <p className="mt-3 text-xs text-[var(--color-brand-accent)]">View showcase →</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

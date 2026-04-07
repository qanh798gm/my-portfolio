'use client'

import { motion } from 'framer-motion'

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      'React',
      'TypeScript',
      'Vue 3',
      'Angular',
      'Next.js',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
    ],
  },
  {
    category: 'Architecture',
    skills: [
      'Micro-frontends',
      'Module Federation',
      'single-spa',
      'Monorepo (Turborepo)',
      'Design Systems',
    ],
  },
  {
    category: 'Real-time & Data',
    skills: ['WebSocket', 'React Query', 'Zustand', 'RxJS', 'Recharts', 'TradingView Charts'],
  },
  {
    category: 'Mobile',
    skills: ['React Native', 'Expo'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['Azure', 'AWS', 'GitHub Actions', 'Docker', 'Vercel'],
  },
  {
    category: 'Testing',
    skills: ['Vitest', 'React Testing Library', 'Jest', 'Storybook'],
  },
]

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 text-3xl font-bold text-[var(--color-text-primary)]">About</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">The engineer behind the code</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
              Hi, I&apos;m Anh (Đỗ Quốc Anh)
            </h3>
            <div className="space-y-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              <p>
                Frontend engineer based in Ho Chi Minh City with 7 years of experience building
                production-grade interfaces for trading platforms, enterprise ERPs, and data-heavy
                dashboards.
              </p>
              <p>
                I care about code that scales — architectures that teams can understand and extend,
                UIs that stay fast under real data, and systems that don&apos;t become a maintenance
                nightmare. I&apos;ve worked across fintech, consulting, logistics, and crypto,
                always embedded in product teams rather than isolated delivery.
              </p>
              <p>
                Outside of work I&apos;m building Bliff, an AI interview coach for developers, and
                exploring how LLMs can meaningfully reduce the anxiety around technical hiring.
              </p>
            </div>

            {/* Certification */}
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] px-3 py-2">
                <span className="text-lg" aria-hidden="true">
                  🏅
                </span>
                <div>
                  <p className="text-xs font-medium text-[var(--color-text-primary)]">
                    Microsoft Certified
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Azure Solutions Architect Expert (AZ-305)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            {skillGroups.map((group) => (
              <div key={group.category}>
                <p className="mb-2 text-xs font-semibold tracking-wider text-[var(--color-text-muted)] uppercase">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] px-2.5 py-0.5 text-xs text-[var(--color-text-secondary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'

const techHighlights = [
  'React / TypeScript',
  'Vue 3 / Angular',
  'Micro-frontends',
  'Module Federation',
  'WebSocket / Real-time',
  'Next.js / Vite',
  'Tailwind CSS',
  'Azure / AWS',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-24">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: 'var(--color-brand-primary)' }}
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Availability badge */}
        <motion.div variants={itemVariants}>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"
              aria-hidden="true"
            />
            Open to new opportunities
          </span>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 font-mono text-5xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-6xl"
        >
          {'<AnhDo />'}
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          className="mb-3 text-xl font-medium text-[var(--color-brand-primary)]"
        >
          Frontend Engineer
        </motion.p>

        {/* Location */}
        <motion.p
          variants={itemVariants}
          className="mb-8 text-sm text-[var(--color-text-muted)]"
        >
          Ho Chi Minh City, Vietnam
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]"
        >
          6 years building trading platforms, ERP ecosystems, and enterprise dashboards across
          fintech, logistics, and consulting — specialising in React, TypeScript, and
          micro-frontend architecture.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mb-16 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#timeline"
            className="rounded-lg bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-hover)]"
          >
            View Career Timeline
          </a>
          <a
            href="/assets/cv-anh-quoc-do.pdf"
            download
            className="rounded-lg border border-[var(--color-bg-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-brand-primary)] hover:text-[var(--color-text-primary)]"
          >
            Download CV
          </a>
        </motion.div>

        {/* Tech tags */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2"
        >
          {techHighlights.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

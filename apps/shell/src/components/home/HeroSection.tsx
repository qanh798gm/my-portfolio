'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: 'var(--color-brand-primary)' }}
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Brand name */}
        <motion.h1
          variants={itemVariants}
          className="mb-2 font-mono text-5xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-6xl"
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
        <motion.p variants={itemVariants} className="mb-8 text-sm text-[var(--color-text-muted)]">
          Ho Chi Minh City, Vietnam
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]"
        >
          7 years building trading platforms, ERP ecosystems, and enterprise dashboards across
          fintech, logistics, and consulting — specialising in React, Vue, TypeScript, and micro-frontend
          architecture.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#timeline"
            className="rounded-lg bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-hover)]"
          >
            View Career Timeline
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

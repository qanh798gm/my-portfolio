'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { CareerEntry } from '@/lib/career-data'

interface ShowcasePanelProps {
  entry: CareerEntry
}

export function ShowcasePanel({ entry }: ShowcasePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="overflow-hidden rounded-2xl border bg-[var(--color-bg-surface)]"
      style={{ borderColor: `${entry.accentColor}44` }}
    >
      {/* Accent top bar */}
      <div className="h-1 w-full" style={{ backgroundColor: entry.accentColor }} />

      <div className="p-8">
        {/* Company header */}
        <div className="mb-6 flex flex-wrap items-start gap-6">
          {/* Logo */}
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border bg-[var(--color-bg-primary)] p-2"
            style={{ borderColor: `${entry.accentColor}44` }}
          >
            <Image
              src={entry.logo}
              alt={entry.company}
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </div>

          {/* Company info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                {entry.company}
              </h3>
              {entry.isCurrentRole && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${entry.accentColor}22`,
                    color: entry.accentColor,
                  }}
                >
                  Current
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm font-medium" style={{ color: entry.accentColor }}>
              {entry.role}
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              {entry.period.start} — {entry.period.end} · {entry.location}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {entry.description}
        </p>

        {/* Tech stack chips */}
        <div className="mb-8 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-2.5 py-0.5 text-xs"
              style={{
                borderColor: `${entry.accentColor}44`,
                color: entry.accentColor,
                backgroundColor: `${entry.accentColor}11`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Demo area */}
        <DemoPlaceholder entry={entry} />
      </div>
    </motion.div>
  )
}

// ─── Demo placeholder ─────────────────────────────────────────────────────────

function DemoPlaceholder({ entry }: { entry: CareerEntry }) {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed"
      style={{ borderColor: `${entry.accentColor}44` }}
    >
      <div
        className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: `${entry.accentColor}22` }}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          style={{ color: entry.accentColor }}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-[var(--color-text-secondary)]">
        {entry.shortName} demo coming soon
      </p>
      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
        Interactive showcase in development
      </p>
    </div>
  )
}

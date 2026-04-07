'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { careerData, type CareerEntry } from '@/lib/career-data'
import { ShowcasePanel } from './ShowcasePanel'

export function CareerTimeline() {
  const [activeId, setActiveId] = useState<string>(careerData[careerData.length - 1]!.id)

  const activeEntry = careerData.find((e) => e.id === activeId) ?? careerData[0]!

  return (
    <section id="timeline" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 text-3xl font-bold text-[var(--color-text-primary)]">
            Career Timeline
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            6 years across fintech, ERP, crypto, and enterprise logistics
          </p>
        </motion.div>

        {/* Horizontal timeline switcher */}
        <motion.div
          className="relative mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Connecting line */}
          <div
            className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2"
            style={{ backgroundColor: 'var(--color-bg-border)' }}
            aria-hidden="true"
          />

          <ol className="relative flex items-center justify-between gap-2">
            {careerData.map((entry) => (
              <TimelineMilestone
                key={entry.id}
                entry={entry}
                isActive={activeId === entry.id}
                onClick={() => setActiveId(entry.id)}
              />
            ))}
          </ol>
        </motion.div>

        {/* Showcase panel — AnimatePresence for smooth swap */}
        <AnimatePresence mode="wait">
          <ShowcasePanel key={activeEntry.id} entry={activeEntry} />
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Timeline milestone dot + label ───────────────────────────────────────────

interface MilestoneProps {
  entry: CareerEntry
  isActive: boolean
  onClick: () => void
}

function TimelineMilestone({ entry, isActive, onClick }: MilestoneProps) {
  return (
    <li className="flex flex-1 flex-col items-center">
      <button
        onClick={onClick}
        className="group flex cursor-pointer flex-col items-center gap-3 focus:outline-none"
        aria-pressed={isActive}
        aria-label={`View ${entry.shortName} showcase`}
      >
        {/* Logo / dot */}
        <div
          className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 bg-[var(--color-bg-surface)] transition-all duration-300"
          style={{
            borderColor: isActive ? entry.accentColor : 'var(--color-bg-border)',
            boxShadow: isActive ? `0 0 16px ${entry.accentColor}55` : 'none',
          }}
        >
          <Image
            src={entry.logo}
            alt={entry.shortName}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          {/* Active pulse ring */}
          {isActive && (
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${entry.accentColor}` }}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Company name + period */}
        <div className="text-center">
          <p
            className="text-xs font-semibold transition-colors duration-200"
            style={{ color: isActive ? entry.accentColor : 'var(--color-text-muted)' }}
          >
            {entry.shortName}
          </p>
          <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
            {entry.period.start} - {entry.period.end}
          </p>
        </div>
      </button>
    </li>
  )
}

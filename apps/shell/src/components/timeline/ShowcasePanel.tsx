'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { CareerEntry } from '@/lib/career-data'
import { loadHitachiModule, loadAquariuxModule } from '@/lib/mf-loader'

interface ShowcasePanelProps {
  entry: CareerEntry
}

// ─── IDs of companies that have a live MF-powered demo ─────────────────────────
const LIVE_MF_APPS = new Set(['hitachi', 'aquariux'])

// ─── Main component ────────────────────────────────────────────────────────────

export function ShowcasePanel({ entry }: ShowcasePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeInOut' as const }}
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
        {LIVE_MF_APPS.has(entry.id) ? (
          <MFDemoArea entry={entry} />
        ) : (
          <DemoPlaceholder entry={entry} />
        )}
      </div>
    </motion.div>
  )
}

// ─── MF Demo Area (runtime import via useEffect) ───────────────────────────────

/**
 * Loads a Module Federation remote component at runtime using useEffect,
 * which bypasses webpack's static module graph entirely.
 * The import string is constructed at runtime to prevent any build-time resolution.
 */
function MFDemoArea({ entry }: { entry: CareerEntry }) {
  const [AppComponent, setAppComponent] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    setError(null)
    setAppComponent(null)

    const load = async () => {
      try {
        if (entry.id === 'hitachi') {
          const mod = await loadHitachiModule<{ HitachiApp: React.ComponentType }>('./HitachiApp')
          if (mod?.HitachiApp) {
            setAppComponent(() => mod.HitachiApp)
            return
          }
        }

        if (entry.id === 'aquariux') {
          const mod = await loadAquariuxModule<{ AquariuxApp: React.ComponentType }>('./AquariuxApp')
          if (mod?.AquariuxApp) {
            setAppComponent(() => mod.AquariuxApp)
            return
          }
        }

        setError(`Demo module is not configured for ${entry.shortName}.`)
      } catch (err: unknown) {
        console.error(`[MF] Failed to load ${entry.id} app:`, err)
        if (entry.id === 'hitachi') {
          setError('Demo failed to load. Make sure the showcase-hitachi server is running on port 5001.')
          return
        }

        if (entry.id === 'aquariux') {
          setError('Demo failed to load. Make sure the showcase-aquariux server is running on port 5002.')
          return
        }

        setError(`Demo failed to load for ${entry.shortName}.`)
      }
    }

    load()
  }, [entry.id, entry.shortName])

  if (error) {
    return (
      <div
        className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed"
        style={{ borderColor: `${entry.accentColor}44` }}
      >
        <p className="text-sm text-red-400">⚠ {error}</p>
      </div>
    )
  }

  if (!AppComponent) {
    return <AppLoadingFallback accentColor={entry.accentColor} label={entry.shortName} />
  }

  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: `${entry.accentColor}44`, minHeight: 600 }}
    >
      {/* Label bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${entry.accentColor}33`,
          backgroundColor: `${entry.accentColor}12`,
          padding: '6px 12px',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 500, color: entry.accentColor }}>
          🖥️ Live Demo — {entry.shortName}{' '}
          {entry.id === 'hitachi'
            ? 'Logistics Dashboard'
            : entry.id === 'aquariux'
              ? 'Trading Platform'
              : 'Application'}
        </span>
        <Link
          href={entry.showcaseRoute}
          title="Toggle full screen"
          aria-label="Open full screen"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 6,
            border: `1px solid ${entry.accentColor}44`,
            backgroundColor: `${entry.accentColor}18`,
            color: entry.accentColor,
            textDecoration: 'none',
            transition: 'background-color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = `${entry.accentColor}33`
            el.style.borderColor = `${entry.accentColor}88`
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = `${entry.accentColor}18`
            el.style.borderColor = `${entry.accentColor}44`
          }}
        >
          {/* Expand / enter-fullscreen icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
        </Link>
      </div>

      {/* Federated micro-app */}
      <div style={{ height: 580 }}>
        <AppComponent />
      </div>
    </div>
  )
}

// ─── Fallback placeholder (coming soon) ────────────────────────────────────────

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

function AppLoadingFallback({ accentColor, label }: { accentColor: string; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        height: 600,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d1117',
        borderRadius: 12,
        border: `1px solid ${accentColor}33`,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 36,
            height: 36,
            border: `3px solid #21262d`,
            borderTopColor: accentColor,
            borderRadius: '50%',
            animation: 'mf-spin 0.7s linear infinite',
            margin: '0 auto 10px',
          }}
        />
        <style>{`@keyframes mf-spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#484f58', fontSize: 12 }}>Loading {label} demo…</p>
      </div>
    </div>
  )
}

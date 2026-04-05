import Link from 'next/link'
import { careerData } from '@/lib/career-data'

interface ShowcasePlaceholderProps {
  companyId: string
}

export function ShowcasePlaceholder({ companyId }: ShowcasePlaceholderProps) {
  const entry = careerData.find((e) => e.id === companyId)
  if (!entry) return null

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <Link href="/" className="hover:text-[var(--color-text-secondary)]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-secondary)]">{entry.company}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div
          className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
          style={{ backgroundColor: `${entry.accentColor}22`, color: entry.accentColor }}
        >
          {entry.period.start} — {entry.period.end}
        </div>
        <h1 className="mb-2 text-4xl font-bold text-[var(--color-text-primary)]">
          {entry.company}
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          {entry.role} · {entry.location}
        </p>
      </div>

      {/* Tags */}
      <div className="mb-12 flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Coming soon placeholder */}
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-12 text-center">
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl"
          style={{ backgroundColor: `${entry.accentColor}22`, color: entry.accentColor }}
          aria-hidden="true"
        >
          🚧
        </div>
        <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-primary)]">
          Showcase coming soon
        </h2>
        <p className="max-w-sm text-sm text-[var(--color-text-muted)]">
          The interactive demo for {entry.company} is being built. Check back soon to see a
          simulated UI of the real products built here.
        </p>
      </div>

      {/* Highlights */}
      <section className="mt-12">
        <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">
          Key Contributions
        </h2>
        <ul className="space-y-3">
          {entry.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-[var(--color-text-secondary)]">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: entry.accentColor }}
                aria-hidden="true"
              />
              {h}
            </li>
          ))}
        </ul>
      </section>

      {/* Back */}
      <div className="mt-12">
        <Link
          href="/#timeline"
          className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          ← Back to timeline
        </Link>
      </div>
    </div>
  )
}

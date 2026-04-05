import Link from 'next/link'
import { careerData } from '@/lib/career-data'

export function CareerTimeline() {
  return (
    <section id="timeline" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="mb-4 text-center text-3xl font-bold text-[var(--color-text-primary)]">
        Career Timeline
      </h2>
      <p className="mb-16 text-center text-sm text-[var(--color-text-secondary)]">
        6 years across fintech, ERP, crypto, and enterprise logistics
      </p>

      <ol className="relative border-l border-[var(--color-bg-border)]">
        {careerData.map((entry) => (
          <li key={entry.id} className="mb-12 ml-8">
            {/* Timeline dot */}
            <span
              className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-[var(--color-bg-primary)]"
              style={{ backgroundColor: entry.accentColor }}
              aria-hidden="true"
            >
              {entry.isCurrentRole && (
                <span
                  className="absolute h-3 w-3 animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: entry.accentColor }}
                />
              )}
            </span>

            {/* Card */}
            <div className="rounded-xl border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-6 transition-shadow hover:shadow-lg">
              {/* Header */}
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {entry.role}
                  </h3>
                  <p className="font-medium" style={{ color: entry.accentColor }}>
                    {entry.company}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    {entry.period.start} — {entry.period.end} · {entry.location}
                  </p>
                </div>

                {entry.isCurrentRole && (
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-medium"
                    style={{ backgroundColor: `${entry.accentColor}22`, color: entry.accentColor }}
                  >
                    Current
                  </span>
                )}
              </div>

              {/* Highlights */}
              <ul className="mb-4 space-y-1.5">
                {entry.highlights.slice(0, 3).map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2 text-sm text-[var(--color-text-secondary)]"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: entry.accentColor }}
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--color-bg-border)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={entry.showcaseRoute}
                className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                style={{ color: entry.accentColor }}
              >
                View showcase demo
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

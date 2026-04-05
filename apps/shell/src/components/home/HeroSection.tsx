const stats = [
  { label: 'Years Experience', value: '6+' },
  { label: 'Enterprise Clients', value: '20+' },
  { label: 'ERP Modules Shipped', value: '10+' },
  { label: 'Certifications', value: 'AZ-305' },
]

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

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-24">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: 'var(--color-brand-primary)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Role badge */}
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"
            aria-hidden="true"
          />
          Open to new opportunities
        </span>

        {/* Name */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-6xl">
          Anh Quoc Do
        </h1>

        {/* Title */}
        <p className="mb-3 text-xl font-medium text-[var(--color-brand-primary)]">
          Frontend Engineer
        </p>

        {/* Location */}
        <p className="mb-8 text-sm text-[var(--color-text-muted)]">
          Ho Chi Minh City, Vietnam · 6 years experience
        </p>

        {/* Tagline */}
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
          I build trading platforms, ERP ecosystems, and enterprise dashboards that millions of
          users depend on. Specialising in React, TypeScript, micro-frontend architecture, and
          real-time data interfaces.
        </p>

        {/* CTAs */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
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
        </div>

        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] px-4 py-5"
            >
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">{stat.value}</p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {techHighlights.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

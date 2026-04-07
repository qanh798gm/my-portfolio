import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Anh Quoc Do.',
}

const contacts = [
  { label: 'Email', value: 'q.anh798gm@gmail.com', href: 'mailto:q.anh798gm@gmail.com' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/anh798gm',
    href: 'https://www.linkedin.com/in/anh798gm/',
  },
  { label: 'GitHub', value: 'github.com/qanh798gm', href: 'https://github.com/qanh798gm' },
  { label: 'Phone', value: '+84 0339 336 088', href: 'tel:+840339336088' },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="mb-4 text-4xl font-bold text-[var(--color-text-primary)]">Contact</h1>
      <p className="mb-12 text-[var(--color-text-secondary)]">
        Feel free to reach out via any channel below.
      </p>

      <div className="mb-10 space-y-4">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-5 transition-all hover:border-[var(--color-brand-primary)]"
          >
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              {c.label}
            </span>
            <span className="text-sm text-[var(--color-brand-primary)]">{c.value}</span>
          </a>
        ))}
      </div>

      <a
        href="/assets/cv-anh-quoc-do.pdf"
        download
        className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--color-brand-primary)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-hover)]"
      >
        Download CV (PDF)
      </a>
    </div>
  )
}

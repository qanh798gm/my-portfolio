import Link from 'next/link'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/anhdo95' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/anhdo95' },
  { label: 'Email', href: 'mailto:q.anh798gm@gmail.com' },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-bg-border)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-xs text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Anh Quoc Do · Built with Next.js, Turborepo, and ☕
        </p>

        <ul className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

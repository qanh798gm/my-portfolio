const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/anhdo95' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/anhdo95' },
  { label: 'Email', href: 'mailto:doquocanh.work@gmail.com' },
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
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/#timeline', label: 'Timeline' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-bg-border)] bg-[var(--color-bg-primary)] backdrop-blur-md [background-color:color-mix(in_srgb,var(--color-bg-primary)_80%,transparent)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Name */}
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-wide text-[var(--color-brand-primary)] transition-colors hover:text-[var(--color-brand-accent)]"
        >
          {'<AnhDo />'}
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={[
                  'text-sm transition-colors',
                  pathname === link.href
                    ? 'font-medium text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                ].join(' ')}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/assets/cv-anh-quoc-do.pdf"
          download
          className="rounded-md border border-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-medium text-[var(--color-brand-primary)] transition-colors hover:bg-[var(--color-brand-primary)] hover:text-white"
        >
          Download CV
        </a>
      </nav>
    </header>
  )
}

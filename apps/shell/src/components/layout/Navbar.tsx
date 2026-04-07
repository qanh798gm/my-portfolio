'use client'

import Link from 'next/link'

const navLinks = [
  { href: '#timeline', label: 'Timeline' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-bg-border)] [background-color:color-mix(in_srgb,var(--color-bg-primary)_80%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-wide text-[var(--color-brand-primary)] transition-colors hover:text-[var(--color-brand-accent)]"
        >
          {'<AnhDo />'}
        </Link>

        {/* Anchor links */}
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {link.label}
              </a>
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

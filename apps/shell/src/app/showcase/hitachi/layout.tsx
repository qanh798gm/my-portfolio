import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hitachi Vantara Showcase — Logistics Admin Dashboard',
  description:
    'Demo admin dashboard for logistics and schedule management. Built with React, Recharts, and Hitachi brand design tokens.',
}

/**
 * Layout for the Hitachi showcase sub-route.
 * The full UI (sidebar, topbar, pages) is rendered by the federated HitachiApp
 * micro-frontend from apps/showcase-hitachi. This layout just provides a
 * full-height dark container so the federated app fills the space correctly.
 */
export default function HitachiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: '100%',
        minHeight: 640,
        backgroundColor: '#0d1117',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

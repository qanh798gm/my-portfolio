import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aquariux Showcase — Trading Platform',
  description:
    'Multi-asset trading terminal demo with real-time crypto prices via Binance WebSocket and Twelve Data. Built with React, TradingView Lightweight Charts, and Aquariux design tokens.',
}

/**
 * Layout for the Aquariux showcase sub-route.
 * The full UI (sidebar, topbar, pages) is rendered by the federated AquariuxApp
 * micro-frontend from apps/showcase-aquariux. This layout provides a
 * full-height dark container so the federated app fills the space correctly.
 */
export default function AquariuxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: '100%',
        minHeight: 640,
        backgroundColor: '#0a0e1a',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

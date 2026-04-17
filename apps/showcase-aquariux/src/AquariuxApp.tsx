import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AquariuxSidebar } from './components/layout/AquariuxSidebar'
import { AquariuxTopBar } from './components/layout/AquariuxTopBar'
import { TradingPage } from './pages/TradingPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { MarketsPage } from './pages/MarketsPage'
import { colors } from './utils/theme'

/**
 * AquariuxApp — self-contained multi-asset trading platform demo.
 *
 * Uses MemoryRouter so it:
 * 1. Works standalone on port 5002 (no URL conflicts)
 * 2. Works when mounted inside the Next.js shell via Module Federation
 *    (the shell's browser router isn't hijacked)
 */
export function AquariuxApp() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <div
        style={{
          display: 'flex',
          height: '100%',
          minHeight: 600,
          overflow: 'hidden',
          backgroundColor: colors.bgPrimary,
          color: colors.textPrimary,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Left sidebar */}
        <AquariuxSidebar />

        {/* Main content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Top bar */}
          <AquariuxTopBar />

          {/* Page content */}
          <main
            style={{
              flex: 1,
              overflowY: 'auto',
              backgroundColor: colors.bgPrimary,
              minHeight: 0,
            }}
          >
            <Routes>
              <Route path="/" element={<TradingPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/markets" element={<MarketsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </MemoryRouter>
  )
}

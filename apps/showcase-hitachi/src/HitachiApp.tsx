import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { HitachiSidebar } from './components/HitachiSidebar'
import { HitachiTopBar } from './components/HitachiTopBar'
import { DashboardPage } from './pages/DashboardPage'
import { SchedulesPage } from './pages/SchedulesPage'
import { VehiclesPage } from './pages/VehiclesPage'
import { CargoPage } from './pages/CargoPage'

/**
 * HitachiApp — self-contained logistics admin dashboard.
 *
 * Uses MemoryRouter so it:
 * 1. Works standalone on port 5001 (no URL conflicts)
 * 2. Works when mounted inside the Next.js shell via Module Federation
 *    (the shell's browser router isn't hijacked)
 */
export function HitachiApp() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <div
        style={{
          display: 'flex',
          height: '100%',
          minHeight: 600,
          overflow: 'hidden',
          backgroundColor: '#0d1117',
          color: '#e6edf3',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Left sidebar */}
        <HitachiSidebar />

        {/* Main content area */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, overflow: 'hidden' }}>
          {/* Top bar */}
          <HitachiTopBar />

          {/* Page content */}
          <main style={{ flex: 1, overflowY: 'auto', padding: 24, backgroundColor: '#0d1117' }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/schedules" element={<SchedulesPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/cargo" element={<CargoPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </MemoryRouter>
  )
}

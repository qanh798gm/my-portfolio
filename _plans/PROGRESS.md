# Portfolio App — Progress Tracker

> **Entry point for AI sessions.** Read this file first to understand the current state of the project before doing any work. Update this file after every meaningful change.

---

## Quick Status

| Item          | Status                        |
| ------------- | ----------------------------- |
| Overall Phase | Phase 1 — Foundation Complete |
| Last Updated  | 2026-04-05                    |
| Live URL      | Not deployed yet              |
| GitHub Repo   | Not created yet               |

---

## Phase Checklist

### Phase 0 — Planning ✅ Complete

- [x] JD.md written (background/experience)
- [x] PORTFOLIO_PLAN.md written (full architecture + decisions)
- [x] PROGRESS.md created (this file)
- [x] GIT_CONVENTIONS.md created

### Phase 1 — Foundation ✅ Complete

- [x] Init pnpm monorepo with Turborepo
- [x] Scaffold `packages/config` (shared ESLint + TypeScript configs)
- [x] Scaffold `packages/tokens` (`@portfolio/tokens`) — 6 themes defined
- [x] Scaffold `packages/ui` (`@portfolio/ui`) — Button, Badge, Spinner atoms
- [x] Scaffold `apps/shell` (Next.js 14, App Router, TypeScript)
- [x] Shell: global layout (Navbar, Footer)
- [x] Shell: Hero section (name, role, location, key stats)
- [x] Shell: Career Timeline component with all 4 companies
- [x] Shell: About, Contact, 4 showcase placeholder pages
- [x] Shell builds successfully (`next build` ✓)
- [x] Fix Tailwind CSS v4 cascade issue — wrap custom `*` reset in `@layer base`; remove `autoprefixer` from PostCSS (incompatible with `@tailwindcss/postcss` v4); add `@source` directives for monorepo scanning
- [ ] Deploy shell skeleton to Vercel

### Phase 2 — Hitachi Showcase ⏳ Not Started

- [ ] Scaffold `apps/showcase-hitachi` (Vite + React)
- [ ] Hitachi design tokens (dark navy + orange)
- [ ] Logistics map (React Leaflet, fake APAC shipment data)
- [ ] Admin dashboard (KPI cards + Recharts bar/line charts)
- [ ] Data table with fake fleet/logistics entries
- [ ] Wire into shell via `@module-federation/vite`

### Phase 3 — GMO Showcase ⏳ Not Started

- [ ] Scaffold `apps/showcase-gmo` (Vite + React)
- [ ] GMO design tokens (deep black + green/red)
- [ ] Candlestick chart (TradingView Lightweight Charts, fake OHLCV)
- [ ] Order book panel (simulated bid/ask updates)
- [ ] Trade history feed (animated rows)
- [ ] Market ticker strip
- [ ] Wire into shell

### Phase 4 — Amaris Showcase ⏳ Not Started

- [ ] Scaffold `apps/showcase-amaris` (Vite + React)
- [ ] Amaris design tokens (white + blue/purple)
- [ ] ERP portal shell with sidebar navigation
- [ ] Time management module (calendar + leave request form)
- [ ] Payroll module (earnings chart + payslip card)
- [ ] Template demo: blank template vs filled module
- [ ] Wire into shell

### Phase 5 — Aquariux Showcase ⏳ Not Started

- [ ] Scaffold `apps/showcase-aquariux` (Vite + React)
- [ ] 3-variant token system (dark fintech / light professional / branded)
- [ ] Binance WebSocket integration (live BTC/ETH feeds)
- [ ] TradingView chart with live Kline WebSocket data
- [ ] Order panel + positions table
- [ ] Asset switcher (BTC/USDT, ETH/USDT, EUR/USD)
- [ ] White-label theme switcher (3 client brand demos)
- [ ] Wire into shell

### Phase 6 — Polish and Launch ⏳ Not Started

- [ ] About page: skills matrix, certifications (AZ-305), tech radar
- [ ] Contact page + CV download button (PDF placeholder)
- [ ] SEO: meta tags, Open Graph images
- [ ] README with architecture diagram + live demo link
- [ ] Storybook public deployment
- [ ] Final Vercel deployment review

---

## Architecture Snapshot

```
my-portfolio/                    ← pnpm monorepo + Turborepo
├── apps/
│   ├── shell/                   ← Next.js 14 App Router (main entry)
│   ├── showcase-hitachi/        ← Vite + React micro-app
│   ├── showcase-gmo/            ← Vite + React micro-app
│   ├── showcase-amaris/         ← Vite + React micro-app
│   └── showcase-aquariux/       ← Vite + React micro-app (live WS data)
└── packages/
    ├── ui/                      ← @portfolio/ui (shared component lib)
    ├── tokens/                  ← @portfolio/tokens (per-app design tokens)
    ├── hooks/                   ← @portfolio/hooks (shared React hooks)
    └── config/                  ← shared ESLint/TS/Vite configs
```

---

## Key Technical Decisions (Summary)

| Decision       | Choice                                      |
| -------------- | ------------------------------------------- |
| Shell          | Next.js 14, App Router, TypeScript          |
| Micro-apps     | Vite + React + `@module-federation/vite`    |
| Monorepo       | pnpm workspaces + Turborepo                 |
| UI Library     | `@portfolio/ui`, atomic design, Storybook 8 |
| Design Tokens  | CSS custom properties, per-app themes       |
| Charts         | TradingView Lightweight Charts + Recharts   |
| Maps           | React Leaflet + OpenStreetMap               |
| Real-time data | Binance public WebSocket (no backend)       |
| State          | Zustand per micro-app + React Query         |
| Styling        | Tailwind CSS v4                             |
| Testing        | Vitest + React Testing Library              |
| Deployment     | Vercel free subdomain                       |
| CI/CD          | GitHub Actions                              |
| Git flow       | Trunk-based (main branch)                   |
| Commit format  | `feat(phase-[num]): message`                |

---

## Reference Files

| File                                               | Purpose                                             |
| -------------------------------------------------- | --------------------------------------------------- |
| [`plans/PORTFOLIO_PLAN.md`](./PORTFOLIO_PLAN.md)   | Full architecture, component details, data strategy |
| [`plans/PROGRESS.md`](./PROGRESS.md)               | This file — current progress tracker                |
| [`plans/GIT_CONVENTIONS.md`](./GIT_CONVENTIONS.md) | Git flow and commit format rules                    |
| [`JD.md`](../JD.md)                                | Owner's background and experience                   |

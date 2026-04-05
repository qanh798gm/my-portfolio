# Portfolio App — Progress Tracker

> **Entry point for AI sessions.** Read this file first to understand the current state of the project before doing any work. Update this file after every meaningful change.

---

## Quick Status

| Item          | Status                        |
| ------------- | ----------------------------- |
| Overall Phase | Phase 1 — Foundation Complete ✅ |
| Last Updated  | 2026-04-05                    |
| Live URL      | Not deployed yet              |
| GitHub Repo   | https://github.com/qanh798gm  |

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
- [x] Scaffold `apps/shell` (Next.js 15, App Router, TypeScript, React 19)
- [x] Shell: global layout (Navbar, Footer)
- [x] Shell: Fix Tailwind CSS v4 cascade issue (remove `autoprefixer`, add `@source` directives)
- [x] Shell: Refactor to single-page layout — Hero → About → Timeline → PersonalProjects → Contact
- [x] Shell: Hero — simplified copy, `<AnhDo />` brand, Framer Motion stagger fade-in, tech tags removed (redundant with About)
- [x] Shell: Career Timeline — horizontal switcher (oldest→newest, left→right), company logos, `AnimatePresence` panel swap, Aquariux selected by default
- [x] Shell: ShowcasePanel — branded company header, tech chips, demo placeholder per company
- [x] Shell: Personal Projects section — Bliff AI coach card centered (in-progress, private)
- [x] Shell: About section — bio, skills matrix by category, AZ-305 cert badge
- [x] Shell: Contact section — email, GitHub, LinkedIn, phone with icons
- [x] Shell: Navbar — anchor links (`#about`, `#timeline`, `#projects`, `#contact`)
- [x] Shell: Brand colors — Aquariux `#8B5CF6`, Amaris `#d4a99a`, GMO `#3B82F6`, Hitachi `#B82323`
- [x] Shell: Hitachi white SVG fixed — explicit `fill="black"` on path replaced, now renders white
- [x] Shell: Contact info updated — email `q.anh798gm@gmail.com`, GitHub `qanh798gm`, LinkedIn `anh798gm`, phone `+84 0339 336 088`
- [x] Shell: Upgrade Next.js 14 → 15, React 18 → 19 (ESLint v9 flat config compatibility)
- [x] Shell: ESLint configured with flat config (`eslint.config.mjs`), lint script migrated to `eslint src`
- [x] Shell: `--turbopack` flag added to dev script
- [x] Shell: `src/types/css.d.ts` added — resolves TS side-effect import warning for CSS files
- [x] Shell builds successfully (`next build` ✓), typecheck ✓, lint ✓
- [ ] Deploy shell to Vercel

### Phase 2 — Hitachi Showcase ⏳ Not Started

- [ ] Scaffold `apps/showcase-hitachi` (Vite + React)
- [ ] Hitachi design tokens (dark navy + red)
- [ ] Logistics map (React Leaflet, fake APAC shipment data)
- [ ] Admin dashboard (KPI cards + Recharts bar/line charts)
- [ ] Data table with fake fleet/logistics entries
- [ ] Wire into shell via `@module-federation/vite`

### Phase 3 — GMO Showcase ⏳ Not Started

- [ ] Scaffold `apps/showcase-gmo` (Vite + React)
- [ ] GMO design tokens (deep black + blue)
- [ ] Candlestick chart (TradingView Lightweight Charts, fake OHLCV)
- [ ] Order book panel (simulated bid/ask updates)
- [ ] Trade history feed (animated rows)
- [ ] Market ticker strip
- [ ] Wire into shell

### Phase 4 — Amaris Showcase ⏳ Not Started

- [ ] Scaffold `apps/showcase-amaris` (Vite + React)
- [ ] Amaris design tokens (white + blush)
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

- [ ] SEO: meta tags, Open Graph images
- [ ] README with architecture diagram + live demo link
- [ ] CV download button (PDF placeholder)
- [ ] Storybook public deployment
- [ ] Final Vercel deployment review

---

## Architecture Snapshot

```
my-portfolio/                    ← pnpm monorepo + Turborepo
├── apps/
│   ├── shell/                   ← Next.js 15 App Router (main entry, single-page)
│   ├── showcase-hitachi/        ← Vite + React micro-app (planned)
│   ├── showcase-gmo/            ← Vite + React micro-app (planned)
│   ├── showcase-amaris/         ← Vite + React micro-app (planned)
│   └── showcase-aquariux/       ← Vite + React micro-app (planned, live WS data)
└── packages/
    ├── ui/                      ← @portfolio/ui (shared component lib)
    ├── tokens/                  ← @portfolio/tokens (per-app design tokens)
    └── config/                  ← shared ESLint/TS configs
```

### Shell Page Structure (single-page)

```
/  (home)
├── <Navbar />               ← sticky, anchor links
├── <HeroSection />          ← name, role, tagline, CTAs
├── <AboutSection />         ← bio, skills matrix, AZ-305 cert
├── <CareerTimeline />       ← horizontal switcher (oldest→newest), ShowcasePanel
├── <PersonalProjects />     ← Bliff card (AI interview coach, in-progress)
├── <ContactSection />       ← email, GitHub, LinkedIn, phone
└── <Footer />
```

---

## Key Technical Decisions

| Decision              | Choice                                                      |
| --------------------- | ----------------------------------------------------------- |
| Shell                 | Next.js 15, App Router, React 19, TypeScript                |
| Styling               | Tailwind CSS v4 (`@tailwindcss/postcss`, no autoprefixer)   |
| Animation             | Framer Motion (`AnimatePresence`, `whileInView` scroll fx)  |
| Micro-apps            | Vite + React + `@module-federation/vite` (Phase 2+)         |
| Monorepo              | pnpm workspaces + Turborepo                                 |
| UI Library            | `@portfolio/ui`, atomic design                              |
| Design Tokens         | CSS custom properties, per-app themes (`@portfolio/tokens`) |
| Charts                | TradingView Lightweight Charts + Recharts (Phase 2+)        |
| Real-time data        | Binance public WebSocket (Phase 5)                          |
| State                 | Zustand per micro-app + React Query (Phase 2+)              |
| Testing               | Vitest + React Testing Library                              |
| Deployment            | Vercel free subdomain                                       |
| CI/CD                 | GitHub Actions                                              |
| Git flow              | Trunk-based (main branch)                                   |
| Commit format         | `feat(phase-[num]): message`                                |

---

## Reference Files

| File                                               | Purpose                                             |
| -------------------------------------------------- | --------------------------------------------------- |
| [`_plans/PORTFOLIO_PLAN.md`](./PORTFOLIO_PLAN.md)  | Full architecture, component details, data strategy |
| [`_plans/PROGRESS.md`](./PROGRESS.md)              | This file — current progress tracker                |
| [`_plans/GIT_CONVENTIONS.md`](./GIT_CONVENTIONS.md)| Git flow and commit format rules                    |

# Portfolio App — Progress Tracker

> **Entry point for AI sessions.** Read this file first to understand the current state of the project before doing any work. Update this file after every meaningful change.

---

## Quick Status

| Item          | Status                                      |
| ------------- | ------------------------------------------- |
| Overall Phase | Phase 1.5 — Dependency Upgrades ✅ Complete |
| Last Updated  | 2026-04-07                                  |
| Live URL      | Not deployed yet                            |
| GitHub Repo   | https://github.com/qanh798gm                |

---

## Phase Checklist

### Phase 0 — Planning ✅ Complete

- [x] JD.md written (background/experience)
- [x] PORTFOLIO_PLAN.md written (full architecture + decisions)
- [x] PROGRESS.md created (this file)
- [x] GIT_CONVENTIONS.md created

### Phase 1 — Foundation + Hitachi MF Showcase ✅ Complete

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

### Phase 1b — Hitachi MF Showcase ✅ Complete

> **Architecture Decision:** `apps/showcase-hitachi` is a standalone **Vite + React** app that exposes
> `HitachiApp` via **Module Federation** (`@module-federation/vite`). The shell consumes it using
> `@module-federation/enhanced/webpack` with `next/dynamic({ ssr: false })` so server-side rendering
> never tries to resolve the federated remote.
>
> **Embedding approach:** `HitachiApp` mounts inline in `ShowcasePanel` via MF — no iframe, no page
> navigation, no extra click. The app uses `MemoryRouter` internally so its routing is self-contained
> and doesn't interfere with the shell's Next.js router.
>
> **Why not `@module-federation/nextjs-mf`:** Explicitly does not support App Router (only Pages Router).
> **Why not iframe:** Shell layout bleeds in; internal navigation breaks.

- [x] Scaffold `apps/showcase-hitachi` — Vite + React + TypeScript, port 5001
- [x] Add `recharts` + `react-router-dom` dependencies
- [x] Configure `@module-federation/vite` — expose `./HitachiApp` as `showcase_hitachi`
- [x] Create fake data module (`src/data/logistics-data.ts`) — 12 schedules, 10 vehicles, 15 cargo items, chart data
- [x] Create `HitachiSidebar` component — NavLink-based nav with active state
- [x] Create `HitachiTopBar` component — `useLocation()` dynamic title + user avatar
- [x] Create shared UI components — `KpiCard`, `DataTable` (generic), `StatusBadge`
- [x] Create `HitachiApp.tsx` root — `MemoryRouter` + `Routes` for Dashboard/Schedules/Vehicles/Cargo
- [x] Dashboard page — 4 KPI cards + Recharts Bar + Line + Pie/Donut charts + ops summary
- [x] Schedules page — table + Google Maps iframe toggle on row click
- [x] Vehicles page — fleet data table with status pills
- [x] Cargo page — cargo inventory table with status pills
- [x] Configure shell `next.config.mjs` — `@module-federation/enhanced/webpack`, register `showcase_hitachi` remote
- [x] `ShowcasePanel.tsx` — `next/dynamic({ ssr: false })` mounts `HitachiApp` inline for Hitachi
- [x] Shell `/showcase/hitachi` route — `next/dynamic({ ssr: false })` full-screen standalone view
- [x] Build passes: `showcase-hitachi` Vite build ✓ (`remoteEntry.js` generated); shell `next build` ✓ (13 pages)
- [x] Fix preamble error — `@vitejs/plugin-react-swc` → `@vitejs/plugin-react`; `react()` before `federation()` in `vite.config.ts`
- [x] Fix preamble runtime — `mf-loader.ts` sets `window.__vite_plugin_react_preamble_installed__` + stubs before loading remote
- [x] Fix MF import — `new Function('url', 'return import(url)')` prevents webpack static bundling of cross-origin import
- [x] Fix table alignment + scroll — all `DataTable` / `KpiCard` / `StatusBadge` / `HitachiSidebar` cells use inline styles (no Tailwind in Vite app)
- [x] Fix data encoding — route values mojibake (`â†'` → `->`) in `logistics-data.ts`
- [x] Fullscreen UX — icon-only SVG expand/compress buttons with `title` tooltip (no text)
- [x] Add `eslint.config.mjs` + ESLint devDeps to `showcase-hitachi`; `pnpm lint` 5/5 clean

### Phase 1.5 — Dependency Upgrades ✅ Complete

> **Goal:** Bring all critical dependencies to latest stable before continuing with new showcases.
> Branch: `chore/phase-1.5-dep-upgrades`

- [x] Upgrade Next.js 15 → 16 (shell) — React 19 compatible, Node >=20.9 required ✅
- [x] Upgrade TypeScript 5.7 → 6.0 (root + all packages) — peer warning from `@module-federation/enhanced` (declaration only, not a runtime issue) ✅
- [x] Upgrade Vite 6 → 8 (showcase-hitachi) + `@vitejs/plugin-react` 4 → 6 + `@module-federation/vite` 1.6 → 1.14 ✅
- [x] Upgrade ESLint 9.20 → 9.39.4 (latest 9.x, stayed on 9 — `eslint-plugin-react` doesn't support ESLint 10 yet) ✅
- [x] Upgrade `typescript-eslint` 8.24 → 8.58, `eslint-plugin-react-hooks` 5.1 → 5.2, `eslint-plugin-react` → 7.37.5 ✅
- [x] Upgrade framer-motion 11 → 12 — fixed `ease` type narrowing (`'easeOut' as const` in `Variants`) ✅
- [x] Upgrade Vitest 3 → 4.1 (packages/ui) ✅
- [x] Upgrade react + react-dom 19.0 → 19.2, react-router-dom 7.5 → 7.14, recharts 2 → 3 (hitachi) ✅
- [x] Upgrade Storybook 8 → 10 (`storybook`, `@storybook/react`, `@storybook/react-vite`, `@storybook/addon-a11y`) — removed `@storybook/addon-essentials` + `@storybook/addon-interactions` (merged into core in v10) ✅
- [x] Upgrade Tailwind CSS 4.0 → 4.2.2, `@tailwindcss/postcss` 4.0 → 4.2.2 ✅
- [x] Upgrade Turbo 2.3 → 2.9, Prettier 3.4 → 3.8, `prettier-plugin-tailwindcss` 0.6 → 0.7 ✅
- [x] Fix: exclude `src/test-setup.ts` from `packages/ui` tsconfig + eslint (not part of library types) ✅
- [x] Fix: `packages/ui` peerDependencies updated to `^18.3.1 || ^19.0.0` ✅
- [x] All packages typecheck ✓, lint ✓, build ✓ after upgrades
- [x] Fix: Next.js 16 defaults to Turbopack — added `turbopack: {}` to `next.config.mjs` to silence "webpack config present but no turbopack config" error (MF still uses webpack; no Turbopack equivalent for Module Federation yet)
- [x] Remove "Open to new opportunities" from `HeroSection.tsx` and `contact/page.tsx`
- [x] Add Vietnamese full name line in `HeroSection.tsx` below `<AnhDo />`

### Phase 2 — GMO Showcase ⏳ Not Started

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
│   ├── shell/                   ← Next.js 16 App Router (main entry, single-page)
│   │                               Consumer: @module-federation/enhanced/webpack
│   │                               Remotes: showcase_hitachi (port 5001)
│   ├── showcase-hitachi/        ← Vite + React MF remote ✅ (port 5001)
│   │                               Exposes: ./HitachiApp via @module-federation/vite
│   ├── showcase-gmo/            ← Vite + React micro-app (planned)
│   ├── showcase-amaris/         ← Vite + React micro-app (planned)
│   └── showcase-aquariux/       ← Vite + React micro-app (planned, live WS data)
└── packages/
    ├── ui/                      ← @portfolio/ui (shared component lib)
    ├── tokens/                  ← @portfolio/tokens (per-app design tokens)
    └── config/                  ← shared ESLint/TS configs
```

### Module Federation Pattern

```
showcase-hitachi (Vite remote, port 5001)
  vite.config.ts: federation({ name: 'showcase_hitachi', exposes: { './HitachiApp': ... } })
  → dist/remoteEntry.js

shell (Next.js consumer)
  next.config.mjs: ModuleFederationPlugin({ remotes: { showcase_hitachi: '...@.../remoteEntry.js' } })
  ShowcasePanel.tsx: next/dynamic(() => import('showcase_hitachi/HitachiApp'), { ssr: false })
  → Loads HitachiApp at runtime in the browser; zero SSR interference
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

| Decision       | Choice                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| Shell          | Next.js **16**, App Router, React **19.2**, TypeScript **6**                                            |
| Styling        | Tailwind CSS **v4.2** (`@tailwindcss/postcss`, no autoprefixer)                                         |
| Animation      | Framer Motion **v12** (`AnimatePresence`, `whileInView` scroll fx)                                      |
| Micro-apps     | Vite **8** + React + `@module-federation/vite` **1.14**                                                 |
| Monorepo       | pnpm workspaces + Turborepo **2.9**                                                                     |
| UI Library     | `@portfolio/ui`, atomic design, Storybook **10**                                                        |
| Design Tokens  | CSS custom properties, per-app themes (`@portfolio/tokens`)                                             |
| Charts         | Recharts **v3** (bar/line/pie) — Hitachi dashboard ✅; TradingView Lightweight Charts (Phase 3+)        |
| Real-time data | Binance public WebSocket (Phase 5)                                                                      |
| State          | Zustand per micro-app + React Query (Phase 2+)                                                          |
| Testing        | Vitest **4** + React Testing Library                                                                    |
| ESLint         | ESLint **9.39.x** flat config, `typescript-eslint` **8.58**, stayed on v9 (react plugins not v10-ready) |
| Deployment     | Vercel free subdomain                                                                                   |
| CI/CD          | GitHub Actions                                                                                          |
| Git flow       | Trunk-based (main branch)                                                                               |
| Commit format  | `feat(phase-[num]): message`                                                                            |

---

## Lessons Learned

### Phase 2 — Hitachi MF Showcase

| #   | Lesson                                                                                                                                                                                                                                               | Fix Applied                                                                                                                                                                                                        |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **`@vitejs/plugin-react-swc` breaks MF preamble** — SWC plugin does not inject the React Fast Refresh preamble into Module Federation virtual entry points, causing "can't detect preamble" error at runtime.                                        | Switch to `@vitejs/plugin-react` (Babel). Place `react()` plugin **before** `federation()` in `vite.config.ts` so Babel transforms exposed files first.                                                            |
| 2   | **Preamble flag not on `window` when loading cross-origin MF module** — The shell (Next.js/webpack) loads the remote's component files but `window.__vite_plugin_react_preamble_installed__` was never set by the remote's Vite server on this page. | In `mf-loader.ts`: before loading the container, check if the remote is a Vite dev server (HEAD `/@react-refresh`), then set `window.__vite_plugin_react_preamble_installed__ = true` + no-op stubs synchronously. |
| 3   | **webpack static bundling breaks cross-origin `import()`** — Using `import(remoteUrl)` directly is intercepted and statically analyzed by webpack, preventing runtime resolution.                                                                    | Wrap in `new Function('url', 'return import(url)')` to produce a fully dynamic import that webpack cannot statically resolve.                                                                                      |
| 4   | **Tailwind CSS classes silently ignored in Vite micro-apps** — The Vite micro-app has no Tailwind configured, so `className="px-4 py-3 text-left"` etc. produce zero CSS — components appear with no padding/alignment.                              | Never use `className` with Tailwind utilities in micro-apps unless Tailwind is explicitly configured. Use 100% inline `style` props for all micro-app components.                                                  |
| 5   | **Data file encoding mojibake** — Special Unicode characters (like `→`) saved in a file with wrong encoding appear as garbled sequences (`â†'`) at runtime.                                                                                          | Use plain ASCII equivalents (`->`) for display text in data files, or ensure file is saved as UTF-8 without BOM. Check file encoding when characters look garbled.                                                 |
| 6   | **Missing `eslint.config.mjs` in new Vite apps** — Turborepo's `pnpm lint` runs ESLint in each workspace package; if the config file is absent, ESLint v9 errors immediately.                                                                        | Always create `eslint.config.mjs` when scaffolding a new Vite app and add all required ESLint devDependencies to its `package.json`.                                                                               |
| 7   | **Fullscreen toggle needs icon UX** — A text link "Open full screen" and "← Back" is verbose and breaks the app chrome.                                                                                                                              | Use SVG icon-only buttons (expand/compress icons) with `title` tooltip. No text needed.                                                                                                                            |

---

## Reference Files

| File                                                | Purpose                                             |
| --------------------------------------------------- | --------------------------------------------------- |
| [`_plans/PORTFOLIO_PLAN.md`](./PORTFOLIO_PLAN.md)   | Full architecture, component details, data strategy |
| [`_plans/PROGRESS.md`](./PROGRESS.md)               | This file — current progress tracker                |
| [`_plans/GIT_CONVENTIONS.md`](./GIT_CONVENTIONS.md) | Git flow and commit format rules                    |

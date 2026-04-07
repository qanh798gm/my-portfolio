# Git Conventions

## Git Flow

**Trunk-based development** — all work goes directly to `main`.

- No long-lived feature branches
- Small, focused commits directly to `main`
- Each commit should leave the app in a working state
- Use draft PRs only for large experimental changes (optional)

---

## Commit Format

```
feat(phase-[num]): [short description]
fix(phase-[num]): [short description]
```

### Examples

```
feat(phase-1): init pnpm monorepo with Turborepo
feat(phase-1): scaffold @portfolio/tokens base theme
feat(phase-1): add Button and Badge atoms to @portfolio/ui
feat(phase-1): scaffold shell Next.js app with global layout
feat(phase-1): implement CareerTimeline component
feat(phase-2): scaffold showcase-hitachi Vite app
feat(phase-2): add logistics map with fake APAC shipment data
feat(phase-3): add order book panel with simulated updates
feat(phase-5): integrate Binance WebSocket for live BTC feed
feat(phase-6): add SEO meta tags and Open Graph images
fix(phase-2): correct map bounds for Singapore warehouse markers
chore: update pnpm lockfile
docs: update PROGRESS.md after phase 1 completion
```

### Commit Type Prefixes

| Prefix              | When to use                                  |
| ------------------- | -------------------------------------------- |
| `feat(phase-N)`     | New feature or component in a specific phase |
| `fix(phase-N)`      | Bug fix scoped to a phase                    |
| `chore`             | Tooling, config, meta files (no phase needed — e.g. `chore: add obsidian vault plan`) |
| `docs`              | Updates to markdown files, comments          |
| `refactor(phase-N)` | Code restructure without behavior change     |
| `style`             | Formatting, lint fixes only                  |
| `test`              | Adding or updating tests                     |

---

## Branch Strategy

| Branch | Purpose                                  |
| ------ | ---------------------------------------- |
| `main` | Production-ready, auto-deploys to Vercel |

> No `develop`, `release`, or long-lived feature branches. Keep it simple.

---

## Progress Tracking Rule

**After every phase completion**, update [`plans/PROGRESS.md`](./PROGRESS.md):

1. Mark completed checklist items with `[x]`
2. Update the **Quick Status** table at the top
3. Commit with: `docs: update PROGRESS.md after phase N completion`

This ensures any future AI session can read `PROGRESS.md` as the single source of truth for project state.

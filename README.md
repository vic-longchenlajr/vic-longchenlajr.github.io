# FS3 — Fire Suppression Software Suite

Internal software hub for Victaulic Fire Suppression Technology. Serves as the central console linking engineering tools, interactive presentations, and documentation under a unified interface. Deployed to GitHub Pages with automated version syncing from all connected application repositories.

---

## Features

### Tool console

- Centralized registry of 8 tools across 3 categories (Configuration & Sales, Engineering, Resources)
- Command palette (Ctrl+K) with real-time search, category filtering, and keyboard navigation
- Status indicators per tool: active, beta, alpha
- Automated version syncing from org repos at build time via GitHub API

### Landing experience

- 5-step horizontal scroll engine with step-based navigation (one scroll = one step)
- Animated particle hero cycling between "FS3" and "Fire / Suppression / Software / Suite"
- Rolling digit counters and floating tool names that organize into categorized rows on scroll
- Minimal 48px TopBar with logo hover dissolve effect

### Presentation engine

- JSON-driven slide definitions with 10 layout types: Hero, Flow, Comparison, Transform, Grid, Highlight, Metrics, Board, Demo, and custom component slots
- Slide chrome: sidebar navigation, mobile progress indicator, speaker notes overlay
- 2 presentations shipped: Lunch & Learn (engineering platforms) and AI User Group Session 2 (AI workflows)

### Documentation

- Engineering Capability Summary with cross-functional impact metrics
- Software Development Best Practices covering 13 sections (project lifecycle, directory standards, commit conventions, decision tables)

### Project timeline

- Chronological record of 12 engineering projects with expandable detail cards
- Scroll-driven spine animation and intersection observer entrance effects
- Direct launch links to deployed applications

## Technology stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Next.js 16 (App Router, static export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + CSS Modules |
| Linting | ESLint 9 |
| CI/CD | GitHub Actions + GitHub Pages |
| Version sync | Custom pre-build script (`scripts/sync-versions.mjs`) |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the application.

### Production build

```bash
npm run build
```

Generates a static export to the `out/` directory for deployment to any static host.

## Build and release

FS3 deploys automatically on push to `main` via GitHub Actions. The workflow runs a version sync step before building that fetches the current version from each connected tool's `package.json` in the org repos and patches `lib/tools.ts`.

### Requirements

- `ORG_TOKEN` repository secret: a GitHub PAT with read access to private repos in `Victaulic-Engineering-Tech-Solutions`

### Deployment

| Environment | URL |
|-------------|-----|
| Production | https://vic-longchenlajr.github.io/ |

### Connected applications

| Tool | Org repo | Deploy URL |
|------|----------|------------|
| Vortex Project Builder | `vortex-project-builder` | https://victaulic-engineering-tech-solutions.github.io/vortex-project-builder/ |
| VicFlex Bracket Filter | `vicflex-bracket-filter` | https://victaulic-engineering-tech-solutions.github.io/vicflex-bracket-filter/ |
| LP Resource Dashboard | `resource-dashboard` | https://victaulic-engineering-tech-solutions.github.io/resource-dashboard/ |
| VicForge | `vicforge` | https://victaulic-engineering-tech-solutions.github.io/vicforge/ |
| Product Request Pipeline | `product-request-pipeline` | https://victaulic-engineering-tech-solutions.github.io/product-request-pipeline/ |
| SprayTrace | `spray-trace` | https://victaulic-engineering-tech-solutions.github.io/spray-trace/ |

## Project structure

```
app/
  layout.tsx                    Root layout, metadata, TopBar, CommandPalette
  page.tsx                      Landing page (HorizontalScroll)
  not-found.tsx                 404 fallback
  documentation/                Documentation hub and articles
    summary/                    Engineering capability summary
    bestpractices/              Software development best practices
  presentations/                Presentation hub and decks
    lunchandlearn/              Lunch & Learn deck + custom slides
    ai-user-group-session-2/    AI User Group Session 2 deck
  projects/                     Project timeline

components/
  TopBar.tsx                    Fixed navigation bar with search trigger
  CommandPalette.tsx            Ctrl+K tool search palette
  landing/                      Landing page panels (ParticleHero, MergedStatsPanel, CTAPanel)
  ui/                           Reusable UI utilities (particle-text-effect)
  PresentationEngine/           JSON-driven presentation system
    chrome/                     Sidebar, MobileProgress, NotesOverlay
    layouts/                    10 slide layout types
    shells/                     SlideShell, SlideHeader, ProgressDots, TakeawayBand

lib/
  tools.ts                      Tool registry and category definitions

scripts/
  sync-versions.mjs             Pre-build version sync from org repos
```

## Repository information

| Field | Value |
|-------|-------|
| Version | 1.6.0 |
| Repository | fs3.github.io |
| Maintainer | Fire Suppression Engineering — Easton, PA |
| License | Proprietary — Victaulic Company. Internal use only. |

## Engineering disclaimer

This tool is intended to assist qualified engineers and estimators during system configuration and estimation. Final system designs must be reviewed and approved in accordance with applicable codes, standards, and Victaulic engineering guidance.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

(c) 2026 Victaulic Company. All rights reserved.

# Changelog


## v1.3.0 — 2026-05-04

### Documentation — Fire Vault Tutorial (Pilot-Ready)
- Promoted Fire Vault tutorial status from **Draft → Pilot Ready**, updated "Last Updated" to May 2026
- Added `ops/` directory (briefing.md, prompts.md) to the personal vault directory structure section
- Updated data flow description to reflect ops regeneration and meeting template pre-generation
- Updated Prerequisites callout: `ops/briefing.md` described as passive daily view
- Onboarding section: specified one-business-day turnaround, added concrete action for Step 3, added network block note, contextualized download link
- Installation: added new **Step 5** for pointing Obsidian at the `FIRE_VAULT` directory
- Getting Started: INIT step now notes it creates a desktop shortcut; Verification step lists `ops/` files as expected output
- Daily Workflow: added morning `prompts.md` note, EOD next-workday journal note, and meeting template generation from any check-in
- Troubleshooting: removed separator row, added shortcut recreation row
- Alignment fixes: removed inaccurate briefing/prompts regeneration claims; reframed query instructions as conversational
- Fixed `audit-prompt.md` download URL (missing leading slash caused 404)

### Tool Registry — Version Sync
- **Vortex Project Builder**: v2.2.0 → v2.3.1 (updated 2026-04-23)
- **VicFlex Bracket Filter**: v1.1.0 → v1.2.1 (updated 2026-04-14)
- **LP Resource Dashboard**: v1.3.0 → v1.3.2 (updated 2026-04-17)
- **VicForge**: v0.3.0 → v0.6.0 (updated 2026-04-23)
- **Product Request Pipeline**: v0.1.0 → v0.2.1


## v1.2.0 - 2026-04-23

### Documentation — Personal Vault Guide
- Added new documentation page at `/documentation/guide-personal-vault` — full 9-section guide covering Introduction, Core Idea, Vault Architecture, CLAUDE.md Schema, Daily Workflows, Building Your Own, Adoption Levels, Customization Guide, and Tips from Practice
- Page follows the Fire Vault tutorial pattern: scroll-spy TOC sidebar, mobile TOC toggle, `IntersectionObserver` active section tracking, `registerSection` callback ref
- Added purple (#a78bfa) accent system to distinguish from the orange Fire Vault tutorial — includes blockquote, callout, download card, and pill-style download button CSS variants
- Added Obsidian download callout (purple "Recommended" variant) with direct link to Obsidian v1.12.7 Windows installer
- Added download card component in "Building Your Own" section with starter CLAUDE.md template download (saves as `CLAUDE.md`)
- Added Personal Vault card (purple accent, "Guide" label) to the Documentation hub

### Downloads
- Created `public/downloads/` directory to consolidate downloadable assets
- Added `public/downloads/starter-claude-md.md` — complete vault schema template with auto-initialize workflow
- Relocated `public/audit-prompt.md` to `public/downloads/audit-prompt.md`
- Updated Fire Vault tutorial audit prompt download path to `downloads/audit-prompt.md`

### Presentations
- Updated Lunch & Learn card title to "From Problem to Platform: Building Customer-Facing Tools in Engineering"
- Changed Lunch & Learn card affordance to "Coming Soon" and updated date to June 2026
- Commented out AI User Group Session 2 card (not yet ready for external visibility)
- Added Lunch & Learn presentation outline draft (`app/presentations/lunchandlearn/outline.md`) — 9-section talk structure with timing estimates and open decisions for early June 2026

### Internal
- Added Claude prompt files (`.claude/prompts/`) for reproducible page builds
- Updated Claude local settings with additional build-related bash permissions


## v1.1.0 — 2026-04-20

### Documentation
- Added Fire Vault tutorial page (`/documentation/tutorial-fire-vault`) with step-by-step configuration and commissioning guide
- Added Fire Vault card to the Documentation hub

### Presentation Engine — Layout Enhancements
- **HeroLayout**: Added anchor stat display (`stat` + `statLabel` fields)
- **GridLayout**: Added `callout` support for emphasizing a key takeaway beneath the tile grid
- **HighlightLayout**: Added secondary metric support (`secondaryMetric` + `secondaryMetricLabel`)
- **MetricsLayout**: Added milestone `status` field with color-coded indicators (shipped, current, planned, exploratory)
- **BoardLayout**: Board items now accept object format with `title` + `description` (in addition to plain strings)
- Added CSS for all new layout features (hero stat bar, grid callout, highlight secondary, milestone status dots, board item descriptions)

### Lunch & Learn Presentation
- Rewrote speaker notes with delivery coaching cues and audience engagement prompts
- Replaced generic bullet points with specific Victaulic workflow examples across all flow stages
- Added anchor stat ("400+ hours eliminated") to hero slide
- Updated milestone statuses and added secondary metrics to highlight slides
- Increased PlatformOrchestration stage 4 pause and added unified output caption
- Increased ProcessLoop auto-advance interval from 8s to 12s for readability

### Org Migration
- Updated all external tool URLs from `victaulic-global-process-technology` to `victaulic-engineering-tech-solutions` across tool registry, projects page, README, and version sync script


All notable changes to this project are documented here.

## v1.0.1 — 2026-04-09

### Release Engine
- Added local `npm run release` script with version-changelog validation
- Validates package.json version against CHANGELOG.md before releasing (auto-sync, scaffold, or prompt)
- Moved tool version sync from CI workflow to local release flow so updates are committed to source

### Version Sync
- Added `sync-versions.mjs` to fetch live versions from org repos via GitHub API
- Syncs version and last commit date for all 6 external tools into `lib/tools.ts`

### Landing Page
- Added version number display (top-right corner, pulled from package.json at build time)
- Version fades out when scrolling past the hero panel

### Fixes
- Updated Resource Dashboard URL path
- Updated external app links in README

## v1.0.0 — 2026-04-06

### FS³ Rebrand
- Pivoted from personal portfolio to **FS³ — Fire Suppression Software Suite**, a team-facing software hub
- Renamed package from `portfolio` to `fs3`, version bumped to `1.0.0`
- Updated site metadata: title, description, favicon context

### Landing Page — Cinematic Horizontal Scroll
- Built 4-panel horizontal scroll engine with step-based navigation (one scroll = one step)
- **Panel 1 — Particle Hero**: Adapted 21st.dev `ParticleTextEffect` with two-phase animation cycling between "FS³" and stacked "FIRE / SUPPRESSION / SOFTWARE / SUITE" in orange particle palette
- **Panel 2 — Merged Stats + Suite**: Mission statement with rolling digit counters (6 Tools, 3 Product Lines), floating tool names that organize into categorized rows on scroll, with staggered settle and interactive detail phase
- **Panel 3 — CTA**: "Jump in" prompt with Ctrl+K keyboard badges
- Added scroll hint ("Scroll to explore") with fade-out, orange progress bar at bottom
- Particle canvas pauses when off-screen, resumes when scrolling back

### Navigation — TopBar + Command Palette
- Replaced dropdown Navbar with minimal 48px dark TopBar (`#111`) persistent on all routes
- Added FS³ logo with hover dissolve effect expanding to "Fire Suppression Software Suite"
- Built `CommandPalette` overlay triggered by Ctrl+K or search bar click
- Command palette features: real-time search, category filter tabs, grouped results, internal/external link handling, keyboard hints footer
- TopBar fades in on landing page after scrolling past hero

### Tool Registry
- Created centralized tool registry (`lib/tools.ts`) as single source of truth for all 8 tools
- Added `type: 'internal' | 'external'` field for navigation behavior
- Added `alpha` status designation alongside existing `beta` and `active`
- Status badge colors: amber for Beta, purple for Alpha (distinct from category accents)

### Interior Pages — Dark Theme
- Restyled Documentation hub with dark cards, breadcrumb navigation, accent bars, "Read ›" affordance
- Restyled Presentations hub with stacked dark cards, session badges, metadata rows, "View ›" affordance
- Converted Summary article page to full dark theme (TOC sidebar, evidence lists, section headings)
- Converted Best Practices article page to full dark theme (all 13 sections: project cards, lifecycle diagram, directory trees, decision tables, tech stack grid, commit types, checklists, callouts, label badges, glossary, README preview)
- Removed banner headers and orange top accent bars from hub pages
- Hidden overflow on hub pages to eliminate double scrollbars

### Presentation Engine
- Adjusted container and slide heights to account for 48px TopBar (`calc(100vh - 48px)`)
- Added body scroll lock when presentations are mounted to prevent double scrollbars
- Updated sidebar positioning to align with TopBar instead of old Navbar

### Styling
- Activated Tailwind CSS v4 (theme + utilities layers, no preflight) for new components
- Existing pages retain CSS Modules — dual styling system by design
- Removed unused Tailwind preflight to protect legacy CSS Module styles

### Cleanup
- Deleted orphaned `/summary` route (duplicated `/documentation/summary`)
- Deleted old `Navbar.tsx` and `Navbar.module.css`
- Deleted unused `home.module.css`
- Removed dead `npm start` script (irrelevant for static export)

## v0.2.0 — 2026-04-01

### Presentation Engine
- Added reusable PresentationEngine component (`components/PresentationEngine/`) with JSON-driven slide definitions
- Added layout system with Hero, Comparison, Demo, Flow, Grid, Highlight, Metrics, Board, and Transform layouts
- Added slide chrome (Sidebar, MobileProgress, NotesOverlay) and shell components (SlideShell, SlideHeader, ProgressDots, TakeawayBand)
- Refactored Lunch & Learn presentation to use the new PresentationEngine with extracted custom slides (PlatformOrchestration, ProcessLoop)
- Added `presentation.json` data file for Lunch & Learn slide definitions

### Presentations
- Added AI User Group Session 2 presentation ("From Guidelines to Workflows") powered by PresentationEngine
- Updated presentations index page with card-based layout using CSS Modules
- Added `presentations.module.css` for presentations listing styles

### Documentation
- Added Documentation section with index page (`/documentation`)
- Added Engineering Capability Summary page (`/documentation/summary`)
- Added Software Development Best Practices page (`/documentation/bestpractices`)

### Home Page
- Redesigned home page with CSS Modules (`home.module.css`), replacing inline styles
- Added header stats section (Active Projects, Total Projects, Presentations)
- Replaced "Skillset Summary" card with "Documentation" card
- Removed Navigation Guide section for a cleaner layout
- Converted page to server component (removed `'use client'`)

### Navigation
- Added Documentation dropdown to navbar with Summary and Best Practices links
- Added AI User Group Session 2 to Presentations dropdown
- Added Product Request Pipeline to Projects dropdown
- Updated navbar to hide on AI User Group Session 2 presentation route

### Projects
- Restyled project timeline page with updated CSS Modules (`projects.module.css`)

### General
- Updated README with revised feature descriptions and tech stack table
- Updated Next.js environment type declarations

## v0.1.0 — 2026-03-07

### General

- Initial development build
- Added interactive Lunch and Learn presentation engine
- Added workflow friction visualization with animated risk compounding
- Added process loop with interactive circular navigation
- Added system architecture comparison views
- Added live demo mode for transitioning to software demonstration
- Added professional summary page with project roadmap and impact metrics

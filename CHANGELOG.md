# Changelog

All notable changes to this project are documented here.

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

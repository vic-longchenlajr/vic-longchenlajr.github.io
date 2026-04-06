# FS³ — Fire Suppression Software Suite

## Build Specification & Implementation Plan

**Prepared:** April 6, 2026
**Status:** Draft — for review with Robert Ballard (Director, Fire Suppression Technology)

---

## 1. Executive Summary

FS³ is a pivot of the existing engineering portfolio site into a team-facing software suite hub. Instead of "here's what I built," it becomes "here's what the team can use." One URL, one landing experience, organized access to every internal tool built by Fire Suppression Technology.

The existing Next.js 16 portfolio site (App Router, static export, GitHub Pages) becomes the FS³ shell. Interior pages — presentations, documentation — remain largely intact. The home page, navigation, and framing change entirely.

**Key ask:** Approve the pivot and support privatizing the GitHub repo once FS³ becomes the team's official tool distribution point.

---

## 2. What Changes

### Replaced

- **Home page** → Cinematic horizontal-scroll landing with particle text animation
- **Navigation** → Minimal top bar with ⌘K command palette (replaces Navbar with dropdowns)
- **Framing** → Tools organized by product line, not personal timeline
- **Branding** → "FS³ — Fire Suppression Software Suite" replaces portfolio branding

### Stays

- PresentationEngine and all slide layouts — untouched
- Documentation pages (summary, best practices) — untouched
- Static export / GitHub Pages deployment pipeline — untouched
- Individual tool codebases (SprayTrace, Vortex, VicForge, etc.) — separate repos, linked from FS³

### Removed

- Orphaned `/summary` route (duplicates `/documentation/summary`)
- Personal portfolio hero (name, project counts, "portfolio overview" framing)
- Project timeline in its current form (replaced by tool directory / changelog)
- Dead `next start` script (irrelevant for static export)

### Styling Strategy — Dual System (Intentional)

New components (TopBar, CommandPalette, landing panels, ParticleHero) use **Tailwind CSS**. Surviving pages (PresentationEngine, documentation, best practices) keep **CSS Modules**. Both systems coexist — Tailwind is already in PostCSS config, CSS Modules work natively in Next.js. Ensure Tailwind's preflight/reset does not stomp existing CSS Module styles. Full migration of legacy pages to Tailwind is not on the roadmap — it would be a Phase 4+ effort with zero user-facing benefit.

### Theme Strategy — Dark Chrome, Per-Page Content

The TopBar is always dark (`#111` background) as a consistent chrome layer across all pages. The landing page is fully dark. Interior pages (documentation, best practices, presentation hubs) keep their existing light backgrounds beneath the dark TopBar. Presentations are already dark and full-screen. Dark tokens are scoped to the landing page and TopBar components — do not modify `globals.css` tokens. Interior pages can migrate to dark individually in Phase 2+ if desired.

---

## 3. The Suite — Tool Inventory

### Engineering

| Tool | Description | Status | Version |
|------|-------------|--------|---------|
| **SprayTrace** | Deflector iteration tracking & distribution test analysis. IndexedDB/Dexie.js client-side app. | Beta | v0.9.x |
| **Product Request Pipeline** | Special build order form & packing slip generator for Leland facility requests. | Active | v1.0.0 |

### Configuration & Sales

| Tool | Description | Status | Version |
|------|-------------|--------|---------|
| **Vortex Project Builder** | Multi-system fire suppression configuration, real-time pricing, and BOM generation. | Active | v2.0 |
| **VicFlex Bracket Filter** | Bracket selection and compatibility lookup tool. | Active | v1.2 |

### Team Resources

| Tool | Description | Status | Version |
|------|-------------|--------|---------|
| **VicForge** | Engineering & lab management dashboard — project tracking, timesheets, test request workflows, capacity analytics, part code builder. Next.js 16, Dexie, Recharts. | Active | v0.2.0 |
| **LP Resource Dashboard** | Resource planning and allocation dashboard. | Active | v1.1 |
| **Presentations** | AI User Group sessions and engineering case study slide decks via custom PresentationEngine. | Active | S2 |
| **Documentation** | Software development standards, best practices, and portfolio summary. | Active | — |

---

## 4. Landing Page — Horizontal Scroll Experience

The landing page is a full-viewport horizontal scroll experience. Vertical scroll input (mouse wheel, trackpad, touch swipe) translates to horizontal panel movement. No visible scrollbars. An orange progress bar along the bottom indicates scroll position.

### Panel Sequence (4 panels, each 100vw)

---

### Panel 1 — Particle Text Hero

Full-viewport black canvas with animated particle text effect.

**Animation cycle:**

- **Phase A (hold ~4 seconds):** Particles form **"FS³"** — large, centered, bold 800-weight. Font size responsive: `min(130px, 18vw)`.
- **Phase B (hold ~4.5 seconds):** Particles dissolve and reform into left-aligned stacked text:

```
FIRE
SUPPRESSION
SOFTWARE
SUITE
```

- Left-aligned at ~12% from left edge
- Vertically centered
- Bold 800-weight
- Tight line height: 1.08× font size
- Font size responsive: `min(68px, 11.5vw)`

**Cycles continuously** between Phase A and Phase B.

**Particle system specs:**

- Color palette (orange family only):
  - `rgb(232, 119, 34)` — primary Victaulic orange
  - `rgb(245, 155, 60)` — warm amber
  - `rgb(215, 100, 22)` — deep orange
  - `rgb(255, 175, 90)` — light amber
  - `rgb(200, 85, 18)` — burnt orange
- Each phase transition picks a random color from the palette
- Per-particle color variation: ±35 on each RGB channel from the selected base
- Pixel sampling step: 4 (controls particle density)
- Particle size: 1.2–2.4px random
- Max speed: 3–8 random per particle
- Max steering force: 4% of max speed
- Color blend rate: 0.005–0.03 random per particle
- Motion blur: `rgba(0, 0, 0, 0.12)` fill per frame
- Canvas resolution: container size × devicePixelRatio (capped at 2×)
- Kill behavior: excess particles fly to random positions outside viewport, removed when out of bounds

**Scroll hint:** Bottom-right corner, "SCROLL TO EXPLORE" in uppercase 10px text with right-chevron SVG. Fades out once user scrolls past 50px.

**Reference implementation:** 21st.dev `ParticleTextEffect` component (see Section 8). Adapt from the shadcn/Tailwind version to the FS³ codebase.

---

### Panel 2 — Stats + Description

Left-aligned content, vertically centered.

**Stats row (animate on scroll-enter):**

```
6          |  3
Tools         Product Lines
```

- Numbers: 48px, font-weight 800, `#E87722` (orange)
- Labels: 14px, font-weight 500, `#888`
- Vertical divider: 1px × 32px, `#222`
- Counter animation: numbers count up from 0 over 800ms with ease-out cubic

**Description (fades in after stats, 200ms delay):**

> Internal software tools for Victaulic Fire Suppression Technology — optimizing workflows from new product development through system design and ordering.

- 15px, `#999`, line-height 1.7
- Max-width: 440px
- Entrance animation: opacity 0→1 + translateY(12px→0) over 600ms ease-out

---

### Panel 3 — The Suite

Three category cards with staggered entrance animations.

**Section label:** "THE SUITE" — 11px, `#555`, uppercase, letter-spacing 2px

**Card design:**

- Background: `#0A0A0A`
- Border: 1px solid `#222`, border-radius 10px
- Padding: 20px
- Left accent bar on category label: 3px × 16px, category color

**Category accent colors:**

- Engineering: `#E87722` (orange)
- Configuration & Sales: `#85B7EB` (blue)
- Team Resources: `#5DCAA5` (teal)

**Card entrance:** staggered — card 1 at 0ms, card 2 at 100ms, card 3 at 200ms. Each: opacity 0→1 + translateY(16px→0) over 500ms ease-out. Triggered when scroll position enters Panel 3 zone.

**Tool listing within each card:**

- Tool name: 14px, `#D4D4D4`, font-weight 500
- Tool description: 11px, `#555`
- Each tool is a clickable link to its live deployment

---

### Panel 4 — CTA / Command Palette Prompt

Centered content. Entrance animations staggered.

```
Jump in.                          (22px, #D4D4D4, weight 600)
Press ⌘K anywhere to open         (13px, #555)
the command palette.

         [ ⌘ ] [ K ]             (styled keyboard shortcut badges)
```

**Badge styling:** 18px monospace, `#666` text, `#111` background, 1px solid `#333`, border-radius 6px, padding 6px 14px.

---

## 5. Navigation — Command Palette

### Top Bar (persistent on ALL routes, including presentations)

- Height: 48px
- Background: `#111` with 1px solid `#2A2A2A` bottom border
- Left: FS³ mark — "FS" in `#E87722` bold 17px + superscript "3" in 10px. Clickable → home.
- Center-right: Search trigger bar — `#222` background, 1px `#2A2A2A` border, border-radius 6px. Contains: search icon, "Jump to tool..." placeholder in `#707070`, ⌘K shortcut badges. Clickable → opens palette.
- **Does NOT hide on presentation routes** (unlike the old Navbar). The 48px height is minimal enough to coexist with the PresentationEngine's own sidebar chrome, and having ⌘K always accessible is useful for jumping between tools during live demos.

### Command Palette Overlay

**Trigger:** Click search bar, click FS³ mark, or press ⌘K / Ctrl+K.

**Overlay:** Absolute positioned, `rgba(0,0,0,0.6)` backdrop with blur. Click outside to close.

**Palette panel:** max-width 580px, centered. `#181818` background, 1px `#333` border, border-radius 10px.

**Search input:** Top row — orange search icon, text input, `esc` badge.

**Category filter tabs:** "All", "Engineering", "Configuration", "Team" — category accent color when active, `#2A2A2A` border when inactive.

**Results list:** Grouped by category with:

- Category header: 10px, accent color, uppercase
- Tool rows with hover state (background + left border accent)
  - Name: 14px, `#F0F0F0`, weight 500
  - Description: 12px, `#707070`
  - Version: 11px monospace, `#999`
  - Status badge: 10px, teal for Beta, muted for Active
  - External link icon: 14px, `#707070`, 40% opacity

**Footer:** `#111` background. Keyboard hints + tool count.

**Filtering:** Real-time across names, descriptions, categories. Combines with tab filter.

---

## 6. Scroll Engine — Technical Spec

### Horizontal scroll translation

```typescript
container.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
  scrollX = clamp(0, maxScroll, scrollX + delta * 1.2);
  track.style.transform = `translateX(${-scrollX}px)`;
}, { passive: false });
```

### Touch support

```typescript
container.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartScroll = scrollX;
});
container.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const dx = touchStartX - e.touches[0].clientX;
  scrollX = clamp(0, maxScroll, touchStartScroll + dx);
  update();
}, { passive: false });
```

### Scroll-triggered behaviors

| Trigger Point | Behavior |
|---------------|----------|
| `scrollX > panelW × 0.6` | FS³ mark fades in at top-left (pinned) |
| `scrollX > 50` | Scroll hint fades out |
| `scrollX > panelW × 0.5` | Stats counter animation fires |
| `scrollX > panelW × 0.7` | Description text fades in |
| `scrollX > panelW × 1.4` | Category cards stagger in |
| `scrollX > panelW × 2.3` | CTA content fades in |

### FS³ mark pin

During Panel 1, FS³ is rendered by the particle canvas. Once scrolled past 60% of Panel 1, a small static "FS³" mark fades into top-left (position: fixed). Opacity 0→1 over 150px of scroll. Persists on all interior pages.

### Progress bar

- Fixed bottom, full width, 2px height
- Track: `#111`, fill: `#E87722`
- Width: `(scrollX / maxScroll) × 100%`

### Performance

- Particle canvas pauses or drops to low frame rate once scrolled past Panel 1
- Entrance animations use CSS transitions, not JS
- `requestAnimationFrame` with visibility check on canvas

---

## 7. Existing Codebase Integration

### Current architecture

- **Framework:** Next.js 16.1.6 (App Router), React 19, TypeScript
- **Build:** Static export — no server
- **Styling:** CSS Modules + CSS custom properties (Tailwind installed but unused)
- **Fonts:** Geist Sans + Geist Mono
- **Deploy:** GitHub Pages

### Migration plan

**Phase 1 — Home page replacement (this spec)**

1. Replace `app/page.tsx` with horizontal scroll landing page
2. Replace `components/Navbar.tsx` with FS³ top bar + command palette
3. Create new components:
   - `components/ParticleHero.tsx` — adapted from 21st.dev
   - `components/HorizontalScroll.tsx` — scroll engine wrapper
   - `components/CommandPalette.tsx` — search overlay
   - `components/StatsSection.tsx` — counter animation + description
   - `components/SuiteCards.tsx` — category tool cards
4. Update `app/layout.tsx` — new top bar
5. Delete orphaned `app/summary/page.tsx`
6. **Adopt Tailwind** — already in devDeps, VicForge uses it, particle component uses it

**Phase 2 — Interior page updates**

1. Presentation hub + documentation hub → match FS³ visual language
2. Add changelog / release log page (replaces project timeline)
3. Command palette accessible from all pages

**Phase 3 — Polish**

1. Mobile responsive (vertical fallback or reduced animation)
2. Full keyboard nav in palette (↑↓ ↵ esc)
3. Particle hero GPU optimization (pause off-screen)
4. Page transition animations

### New file structure

```
app/
  page.tsx                          ← REPLACE (horizontal scroll landing)
  layout.tsx                        ← MODIFY (new top bar)
  summary/page.tsx                  ← DELETE (orphaned)

components/
  Navbar.tsx                        ← DELETE (replaced)
  TopBar.tsx                        ← NEW
  CommandPalette.tsx                ← NEW
  ui/
    particle-text-effect.tsx        ← NEW (from 21st.dev, adapted)
  landing/
    HorizontalScroll.tsx            ← NEW
    ParticleHero.tsx                ← NEW (wraps particle-text-effect)
    StatsPanel.tsx                  ← NEW
    SuitePanel.tsx                  ← NEW
    CTAPanel.tsx                    ← NEW

lib/
  tools.ts                          ← NEW (tool registry)
```

### Tool registry (`lib/tools.ts`)

Single source of truth for all tool metadata. Command palette, suite cards, and any future pages read from this.

**Navigation behavior:** Tools with `type: 'external'` open in a new tab (`target="_blank"`). Tools with `type: 'internal'` use client-side Next.js navigation. The command palette renders both identically but handles click behavior differently.

**URLs:** External tools are deployed as separate GitHub Pages repos at sibling paths. The placeholder `{BASE}` below should be replaced with the actual GitHub Pages base URL (e.g., `https://{username}.github.io`). Exact production URLs will be confirmed before build.

```typescript
export interface Tool {
  name: string;
  description: string;
  version: string;
  status: 'active' | 'beta' | 'planned';
  category: 'engineering' | 'configuration' | 'resources';
  type: 'internal' | 'external';
  url: string;
  updatedAt: string;
}

export const CATEGORIES = {
  engineering: { label: 'Engineering', accent: '#E87722' },
  configuration: { label: 'Configuration & Sales', accent: '#85B7EB' },
  resources: { label: 'Team Resources', accent: '#5DCAA5' },
} as const;

export const TOOLS: Tool[] = [
  {
    name: 'SprayTrace',
    description: 'Deflector iteration tracking & distribution test analysis',
    version: 'v0.9.2',
    status: 'beta',
    category: 'engineering',
    type: 'external',
    url: '{BASE}/spray-trace/',
    updatedAt: '2026-04-03',
  },
  {
    name: 'Product Request Pipeline',
    description: 'Special build order form & packing slip generator for Leland',
    version: 'v1.0.0',
    status: 'active',
    category: 'engineering',
    type: 'external',
    url: '{BASE}/product-request-pipeline/',
    updatedAt: '2026-04-01',
  },
  {
    name: 'Vortex Project Builder',
    description: 'Multi-system configuration, real-time pricing & BOM generation',
    version: 'v2.0',
    status: 'active',
    category: 'configuration',
    type: 'external',
    url: '{BASE}/vortex-project-builder/',
    updatedAt: '2026-03-28',
  },
  {
    name: 'VicFlex Bracket Filter',
    description: 'Bracket selection and compatibility lookup',
    version: 'v1.2',
    status: 'active',
    category: 'configuration',
    type: 'external',
    url: '{BASE}/vicflex-bracket-filter/',
    updatedAt: '2026-03-15',
  },
  {
    name: 'VicForge',
    description: 'Engineering & lab management — projects, timesheets, analytics, part codes',
    version: 'v0.2.0',
    status: 'active',
    category: 'resources',
    type: 'external',
    url: '{BASE}/vicforge/',
    updatedAt: '2026-04-06',
  },
  {
    name: 'LP Resource Dashboard',
    description: 'Resource planning and allocation',
    version: 'v1.1',
    status: 'active',
    category: 'resources',
    type: 'external',
    url: '{BASE}/lp-resource-dashboard/',
    updatedAt: '2026-03-20',
  },
  {
    name: 'Presentations',
    description: 'AI User Group sessions & engineering case studies',
    version: 'S2',
    status: 'active',
    category: 'resources',
    type: 'internal',
    url: '/presentations',
    updatedAt: '2026-03-12',
  },
  {
    name: 'Documentation',
    description: 'Standards, best practices & capability summary',
    version: '—',
    status: 'active',
    category: 'resources',
    type: 'internal',
    url: '/documentation',
    updatedAt: '2026-03-10',
  },
];
```

---

## 8. Reference — Particle Text Effect (21st.dev)

The `ParticleTextEffect` component from 21st.dev is the foundation for the hero animation. The full source (`particle-text-effect.tsx`) is a pure React + canvas component with zero external dependencies beyond React. It includes the `Particle` class with steering behavior, color blending, offscreen canvas text rasterization, and word cycling logic. The component was provided alongside this spec as a separate code document — copy to `components/ui/particle-text-effect.tsx` and adapt per the modifications below.

**Key modifications needed for FS³:**

1. **Words/phases:** Replace single-word cycling with two-phase system:
   - Phase A: single centered "FS³" (use offscreen canvas `textAlign: 'center'`)
   - Phase B: four-line left-aligned stack (use offscreen canvas `textAlign: 'left'` with manual Y positioning per line)
2. **Colors:** Replace `Math.random() * 255` RGB with selection from the orange palette array
3. **Canvas sizing:** Replace fixed `1000×500` with responsive container dimensions × `Math.min(devicePixelRatio, 2)`
4. **Font rendering:** Replace `"bold 100px Arial"` with responsive size using Geist Sans or Helvetica Neue
5. **Pixel step:** Reduce from 6 to 4 for higher density
6. **Hold timing:** Phase A ~200 frames, Phase B ~260 frames (at 60fps)
7. **Background:** Keep `rgba(0, 0, 0, 0.1)` for motion blur trail
8. **Mouse interaction:** Keep right-click-to-destroy as easter egg

---

## 9. Design Tokens

```css
/* Backgrounds */
--fs3-bg-primary: #000000;
--fs3-bg-surface: #0A0A0A;
--fs3-bg-elevated: #111111;
--fs3-bg-overlay: #181818;
--fs3-bg-hover: #2A2A2A;

/* Borders */
--fs3-border-subtle: #222222;
--fs3-border-default: #2A2A2A;
--fs3-border-strong: #333333;

/* Text */
--fs3-text-primary: #F0F0F0;
--fs3-text-secondary: #D4D4D4;
--fs3-text-muted: #999999;
--fs3-text-dim: #707070;
--fs3-text-faint: #555555;

/* Category accents */
--fs3-accent-orange: #E87722;
--fs3-accent-blue: #85B7EB;
--fs3-accent-teal: #5DCAA5;

/* Particle palette */
--fs3-particle-1: rgb(232, 119, 34);
--fs3-particle-2: rgb(245, 155, 60);
--fs3-particle-3: rgb(215, 100, 22);
--fs3-particle-4: rgb(255, 175, 90);
--fs3-particle-5: rgb(200, 85, 18);
```

---

## 10. Talking Points for Robert

**The pitch:**

> "The portfolio page has been useful for tracking my work, but I think it can do more. I want to pivot it into FS³ — a team-facing software hub where anyone on the team can find and access every tool we've built. One URL, organized by workflow, with live links and version info."

**What already exists:**

- 6 tools actively deployed and in use (8 entries including presentations and documentation)
- Brendan and his team already using Vortex pre-launch
- SprayTrace in active development with Justin
- AI User Group presentations already hosted on the site
- VicForge lab management dashboard at v0.2.0

**What changes:**

- Landing page becomes a product showcase, not a personal portfolio
- Navigation modernized with command palette
- Tools organized by category (Engineering, Config & Sales, Team Resources)
- The site becomes the official distribution point for Fire Suppression Technology software

**The ask:**

- Approval to pivot the framing from portfolio to team resource
- Support for privatizing the GitHub repo once the team is directed to the URL
- Continued time allocation for building and maintaining the suite

**Why it matters:**

- Gives Robert a single link to share with leadership: "Here's what my team is building"
- New team members get oriented immediately — every tool, documented, with live links
- Creates accountability and visibility for the software initiative
- Positions the team as a technology leader within Victaulic engineering

---

## 11. Implementation Priority

| Priority | Task | Effort |
|----------|------|--------|
| **P0** | Particle hero component (adapt 21st.dev) | 1 day |
| **P0** | Horizontal scroll engine | 1 day |
| **P0** | Command palette component | 0.5 day |
| **P0** | Top bar replacement | 0.5 day |
| **P0** | Home page assembly (all 4 panels) | 0.5 day |
| **P1** | Tool registry + live links | 0.5 day |
| **P1** | Interior page visual updates | 1 day |
| **P1** | Responsive / mobile handling | 1 day |
| **P2** | Changelog page | 0.5 day |
| **P2** | Full keyboard nav in palette | 0.5 day |
| **P2** | Performance optimization | 0.5 day |

**Estimated total:** ~7–8 days of focused development with Claude Code.
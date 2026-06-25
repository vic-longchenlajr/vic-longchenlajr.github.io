# Presentation HTML Export — Design

**Date:** 2026-06-25
**Status:** Approved (design phase)
**Author:** Chenla Long Jr (with Claude)

## Problem

The presentation engine (`components/PresentationEngine`) renders decks as a live
React app (Next.js static export, `output: 'export'`) with framer-motion
animations, custom SVG slides, and keyboard navigation. There is no way to share
a deck with a reviewer without sending them a live link into the project.

We want a button **on the deck itself** that generates a single, self-contained
`.html` file the user can email to anyone. The reviewer opens it offline and reads
through all slides.

## Decisions

These were settled during brainstorming and are fixed for this spec:

1. **Fidelity: faithful static read-through.** The exported file shows every slide
   with all content and visuals in their **final state**. Animations are *not*
   replayed; there is no live React or framer-motion in the output. The reviewer
   scrolls / arrow-keys through the slides.
2. **Button location: on the deck**, not the index/cards page. The capture needs
   the live rendered deck in the DOM, and the deck is where the user is when they
   decide to share.
3. **Capture mechanism: step-and-capture (Approach A).** Walk the engine through
   every slide, force final visual state, grab each slide's rendered HTML. Reuses
   the engine's existing single-active-slide machinery. (Rejected: an offscreen
   "render all slides at once" mode — more invasive, no fidelity gain.)
4. **Fonts inlined.** The deck's `next/font/google` fonts (Geist, Geist Mono,
   Caveat) are fetched as woff2 and embedded as base64 `@font-face` data URIs so
   the file renders correctly offline, including the Caveat handwriting accent.

## Non-goals

- Replaying animations in the exported file (that was the "full interactive clone"
  option, explicitly not chosen).
- A PDF export.
- An export button on the presentations index/cards page.
- Exporting decks other than via the live deck page. (Any deck rendered by the
  engine gets the button automatically, but there is no batch/library export.)

## Context: what we're capturing

- Engine entry: `components/PresentationEngine/PresentationEngine.tsx`. It owns
  `currentSlideIndex` and `setCurrentSlideIndex`, mounts **only the active slide's
  content** (inactive slides render an empty `SlideShell`), and tracks the active
  slide via an IntersectionObserver on `.slide` elements inside `containerRef`.
- Slides are defined in `presentation.json` (meta + slides) plus custom components
  (e.g. `app/presentations/lunchandlearn/slides/*`). Slides are **SVG + CSS with no
  raster images** — fonts are the only binary asset.
- Styling is CSS Modules (hashed class names) already present in the loaded
  document's stylesheets. Captured markup and collected CSS share the same hashes,
  so they stay consistent.
- A `reduce` flag already threads through the engine and motion components
  (currently hard-coded `false`). Motion components read it to shorten/skip
  animation. We extend this idea with an explicit "settled/export" state rather
  than relying on `reduce` alone (which still animates ~0.25s).

## Architecture

New module: `components/PresentationEngine/export/`

- `exportToHtml.ts` — the orchestrator. Pure-ish async function driven by the
  engine. Responsibilities:
  1. **Step + capture.** Given the slide count, a `goToSlide(index)` callback, a
     way to read the rendered slide element, and a settle signal, iterate
     `0..N-1`: go to slide `i`, wait until it is mounted and in final visual
     state, capture the `SlideShell` element's `outerHTML`. Restore the original
     slide index when done.
  2. **Collect CSS.** Iterate `document.styleSheets`, read `cssRules`
     (try/catch per sheet — skip any that throw on cross-origin access),
     concatenate into one stylesheet string.
  3. **Inline fonts.** Find `@font-face` rules whose `src` points at
     same-origin font files (`/_next/static/media/*.woff2`). Fetch each once
     (dedupe by URL), convert to a base64 `data:` URI, rewrite the `src` url() to
     the data URI in the collected CSS.
  4. **Assemble** a standalone HTML document (see "Output document" below).
  5. **Download** via `Blob` + a temporary `<a download>` named from the deck
     title (slugified), e.g. `lunch-and-learn.html`.
- `exportTemplate.ts` — builds the final HTML string: `<!doctype html>`, `<head>`
  with `<meta charset>`, title, the inlined `<style>` (collected app CSS with
  fonts as data URIs + a small export-only nav/layout stylesheet), and `<body>`
  with the scroll-snap container of captured slides + an inline `<script>` for
  navigation. Kept as a separate file so the template is readable and testable
  in isolation.
- `exportNav.ts` (or an inline string constant in `exportTemplate.ts`) — the tiny
  vanilla-JS navigator embedded in the output: arrow-key / space paging that
  `scrollIntoView`s the next/prev slide, a slide counter, and scroll-snap. No
  React, no framer-motion.

### Engine wiring

- `PresentationEngine.tsx` gains:
  - An `isExporting` state (drives the progress indicator and the
    settled/final-state capture mode).
  - An `exportDeck()` handler that calls `exportToHtml(...)`, passing
    `slides.length`, a `goToSlide` that sets `currentSlideIndex` directly (not the
    smooth-scroll path, so capture is deterministic), an accessor for the active
    `SlideShell` DOM node, and the deck title from `meta`.
  - Forcing final visual state during export: while `isExporting`, slides mount in
    a "settled" mode (final state immediately, no entrance animation). Mechanism:
    pass a `settled` / `forceVisible` prop down through `renderSlideContent` →
    layouts and custom components, OR drive it via the existing `reduce`/isVisible
    path set to an instant-final variant. The implementation plan picks the exact
    threading; the requirement is: **during capture, the slide is in its end
    state with no in-flight animation.**
- New chrome component `components/PresentationEngine/chrome/ExportButton.tsx`:
  small, unobtrusive control (bottom corner), shows a normal state, an in-progress
  state (e.g. "Exporting… 4/11"), and returns to normal on completion. Styled to
  match existing chrome (`PresentationEngine.module.css`).
- Keyboard: extend the existing `handleKeyDown` in the engine so `e` / `E`
  triggers `exportDeck()` (guarded so it does not fire while already exporting).
  Existing keys (arrows, space, `n`) are unchanged.

## Output document

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" ... />
    <title>{deck title}</title>
    <style>
      /* 1. inlined @font-face with base64 woff2 data URIs */
      /* 2. collected app/CSS-module rules (hashed classes intact) */
      /* 3. export-only layout + nav styles (scroll-snap container, counter) */
    </style>
  </head>
  <body>
    <div id="export-deck">  <!-- scroll-snap vertical container -->
      <section class="export-slide" data-index="0"> {captured slide 0 HTML} </section>
      ...
    </div>
    <div id="export-counter">1 / 11</div>
    <script> /* arrow/space paging, counter update via scroll position */ </script>
  </body>
</html>
```

- Live engine chrome that depends on React (Sidebar nav callbacks, NotesOverlay
  toggle, MobileProgress, PresentationHeader animation) is **not** carried into the
  output. The output's own minimal nav replaces it. If a static sidebar/title is
  desired later, that is a follow-up — out of scope here.
- The captured slide markup is the `SlideShell` content; the export wraps each in
  an `.export-slide` section that provides scroll-snap alignment matching the
  live deck's full-viewport slides.

## Data flow

```
User on deck → clicks Export button (or presses E)
   → engine.exportDeck()
      → isExporting = true (button shows progress; slides render settled)
      → exportToHtml():
          for i in 0..N-1: goToSlide(i) → await settle → capture outerHTML
          collect CSS from document.styleSheets
          inline fonts (fetch woff2 → base64 → rewrite url())
          assemble HTML string (exportTemplate)
          Blob → <a download="lunch-and-learn.html"> → click
      → restore original slide index; isExporting = false
   → browser downloads the single .html file
```

## Error handling

- **Cross-origin / inaccessible stylesheet:** wrap each `styleSheet.cssRules`
  access in try/catch; skip sheets that throw (cannot read rules). The deck's own
  CSS (CSS Modules + next/font) is same-origin and accessible.
- **Font fetch failure:** if a woff2 fetch fails, leave that `@font-face`'s
  original `url()` in place (the file may still resolve when opened from the same
  origin) and continue — do not abort the whole export. Log a console warning.
- **Slide capture failure:** if a slide's element is missing at capture time
  (timing), retry once after an additional frame; if still missing, skip that
  slide and continue, and surface a console warning naming the slide id. The
  export should never hang.
- **Always restore state:** wrap stepping in try/finally so the engine returns to
  the user's original slide and `isExporting=false` even if an error is thrown.

## Testing / verification

Verification is primarily manual (this is a browser-DOM/serialization feature),
with targeted unit coverage on the pure pieces:

1. **Unit (pure functions):**
   - CSS collection + font-url rewriting: given a fake set of `cssRules`-like
     strings and a URL→base64 map, the rewriter replaces same-origin font
     `url()`s with data URIs and leaves others untouched.
   - Template assembly: given captured slide HTML fragments + a CSS string +
     title, `exportTemplate` produces a valid single document containing each
     fragment, one `<style>`, the nav script, and the correct `<title>`.
   - Slug/filename derivation from deck title.
2. **Manual (success criteria):**
   - Open `/presentations/lunchandlearn`, click Export → a single `.html`
     downloads.
   - Open the downloaded file **with no dev server running / network off**:
     - all 11 slides present, in order;
     - SVG charts (e.g. ImpactCurve, ImpactRecovery, ChartFrame) shown in final
       drawn state;
     - Caveat handwriting font renders (proves font inlining);
     - arrow keys / space page through slides; counter updates;
     - file size in the ~200-600 KB range (sanity check, not a hard gate).
   - After export, the live deck is back on the slide the user started from and
     remains fully interactive.

## File size expectation

SVG markup + CSS + inlined woff2 fonts → a few hundred KB. Target ~200-600 KB.
Not a hard gate, but a large overage (multiple MB) signals fonts/CSS were
over-collected and should be investigated.

## Out of scope / future

- Static sidebar or animated title in the export.
- Index/cards-page export trigger.
- PDF export.
- Per-slide selective export.
```

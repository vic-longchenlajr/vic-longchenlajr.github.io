# Presentation HTML Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a button (and `E` shortcut) on the live presentation that downloads the deck as one self-contained, offline-openable `.html` file showing every slide in its final visual state.

**Architecture:** A client-side exporter steps the engine through every slide (each settles to its final, post-animation state), clones each slide section plus the persistent header into static markup, collects the page's CSS, inlines the woff2 fonts as base64 data URIs, and assembles a single HTML document with a tiny vanilla-JS scroll/keyboard navigator. No React or framer-motion ships in the output.

**Tech Stack:** Next.js 16 (static export), React 19, TypeScript, CSS Modules, framer-motion (live deck only). No test runner — verification is `npx tsc --noEmit` + `npm run lint` + a manual browser checklist.

**Verification model (per design decision):** This project has no test framework and the feature's real correctness is only observable in a browser. Each task ends with a typecheck/lint gate; the feature-level acceptance is the manual browser checklist in Task 6. Do **not** add a test runner.

---

## File Structure

- **Create** `components/PresentationEngine/export/exportTemplate.ts` — pure helpers: `slugify()`, the embedded nav script + export-override CSS constants, and `buildExportHtml()` that assembles the final document string. No DOM/browser APIs beyond string building.
- **Create** `components/PresentationEngine/export/exportToHtml.ts` — the browser-side orchestrator: `collectCss()`, `inlineFonts()`, slide/header capture by stepping the engine, and `exportDeckToHtml()` which ties it together and triggers the download.
- **Create** `components/PresentationEngine/chrome/ExportButton.tsx` — small unobtrusive control, idle vs in-progress label.
- **Modify** `components/PresentationEngine/PresentationEngine.module.css` — append `.exportButton` styles (and progress state).
- **Modify** `components/PresentationEngine/PresentationEngine.tsx` — `exporting`/`progress` state, `handleExport` handler, `E` key binding, render `<ExportButton>`.

Reference (read-only, for context): `SlideShell.tsx` (renders `<section data-index>` with hashed `.slide` class), `chrome/PresentationHeader.tsx` (persistent `.persistentHeader`, holds each slide's title/subtitle/breadcrumb), `app/layout.tsx` (font variables live on `<body className>`).

---

### Task 1: Pure template module (`exportTemplate.ts`)

**Files:**
- Create: `components/PresentationEngine/export/exportTemplate.ts`

- [ ] **Step 1: Write the module**

```ts
// Pure string-building helpers for the HTML export. No DOM access here beyond
// what the caller passes in — keeps this unit easy to reason about.

export interface ExportTemplateInput {
    /** Deck title — used for <title> and the download filename. */
    title: string;
    /** Live <html> className (carries data-theme via attribute, copied separately). */
    htmlClassName: string;
    /** Live <body> className — carries the next/font CSS-variable classes. */
    bodyClassName: string;
    /** Live .presentationContainer className — gives the export scroll-snap + color pinning for free. */
    containerClassName: string;
    /** All collected CSS (rules + inlined @font-face data URIs), one string. */
    css: string;
    /** Each slide section's outerHTML, in order, with the per-slide header already baked in. */
    slidesHtml: string[];
}

/** Turn a deck title into a safe, readable filename stem. */
export function slugify(title: string): string {
    const base = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return base || 'presentation';
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Export-only overrides. The cloned sections keep the deck's hashed CSS-module
// classes (collected verbatim), so we only neutralize chrome that assumed a
// fixed topbar/sidebar and re-anchor the persistent header inside each section.
const EXPORT_OVERRIDE_CSS = `
:root { --topbar-height: 0px; --sidebar-space: 0px; }
html, body { margin: 0; padding: 0; height: 100%; }
/* The export scroll container reuses .presentationContainer (scroll-snap, color
   pinning); with --topbar-height:0 it fills the viewport. */
#export-deck { height: 100vh; margin-top: 0; }
/* The persistent header is cloned INTO each section; re-anchor it to the section
   instead of the (now absent) fixed viewport chrome. */
[data-export-header] { position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; }
`;

// Tiny vanilla navigator: arrow/space/PageUp-Down paging. Scroll-snap + sizing
// come from the reused container class, so this only moves focus between slides.
const NAV_SCRIPT = `
(function () {
  var root = document.getElementById('export-deck');
  if (!root) return;
  var slides = Array.prototype.slice.call(root.querySelectorAll('[data-index]'));
  var i = 0;
  function go(n) { i = Math.max(0, Math.min(slides.length - 1, n)); if (slides[i]) slides[i].scrollIntoView({ behavior: 'smooth' }); }
  document.addEventListener('keydown', function (e) {
    if (['ArrowDown', 'ArrowRight', ' ', 'PageDown'].indexOf(e.key) >= 0) { e.preventDefault(); go(i + 1); }
    else if (['ArrowUp', 'ArrowLeft', 'PageUp'].indexOf(e.key) >= 0) { e.preventDefault(); go(i - 1); }
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) i = parseInt(en.target.getAttribute('data-index') || '0', 10); });
    }, { root: root, threshold: 0.6 });
    slides.forEach(function (s) { io.observe(s); });
  }
})();
`;

/** Assemble the complete, self-contained HTML document. */
export function buildExportHtml(input: ExportTemplateInput): string {
    const { title, htmlClassName, bodyClassName, containerClassName, css, slidesHtml } = input;
    return `<!doctype html>
<html lang="en" data-theme="dark"${htmlClassName ? ` class="${htmlClassName}"` : ''}>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<style>
${css}
${EXPORT_OVERRIDE_CSS}
</style>
</head>
<body class="${bodyClassName}">
<div id="export-deck" class="${containerClassName}">
${slidesHtml.join('\n')}
</div>
<script>${NAV_SCRIPT}</script>
</body>
</html>`;
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS (no errors referencing `exportTemplate.ts`). The file imports nothing project-specific, so this also confirms the new folder resolves.

- [ ] **Step 3: Commit**

```bash
git add components/PresentationEngine/export/exportTemplate.ts
git commit -m "feat(presentation): export HTML template + slug/nav helpers"
```

---

### Task 2: Browser-side exporter (`exportToHtml.ts`)

**Files:**
- Create: `components/PresentationEngine/export/exportToHtml.ts`

- [ ] **Step 1: Write the module**

```ts
import { buildExportHtml, slugify } from './exportTemplate';

// Single settle delay per slide (ms). Must comfortably exceed the longest slide
// animation so capture happens AFTER it lands — the chart slides run a ~4.4s
// reveal schedule, so 4800ms is the safe floor. Stepping 11 slides ≈ ~53s; the
// in-progress button label keeps that legible to the user.
const CAPTURE_SETTLE_MS = 4800;

export interface ExportConfig {
    /** The .presentationContainer element (engine's containerRef.current). */
    container: HTMLElement;
    /** Selector for slide sections, e.g. `.${styles.slide}`. */
    slideSelector: string;
    /** Selector for the persistent header, e.g. `.${styles.persistentHeader}`. */
    headerSelector: string;
    /** Number of slides in the deck. */
    slideCount: number;
    /** Deck title for <title> + filename. */
    title: string;
    /** Called as each slide begins capturing (1-based), for progress UI. */
    onProgress?: (current: number) => void;
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Concatenate every readable stylesheet's rules. Cross-origin sheets throw on
 *  cssRules access — skip those; the deck's own CSS is same-origin. */
function collectCss(): string {
    let out = '';
    for (const sheet of Array.from(document.styleSheets)) {
        try {
            const rules = sheet.cssRules;
            if (!rules) continue;
            for (const rule of Array.from(rules)) out += rule.cssText + '\n';
        } catch {
            // Cross-origin / inaccessible stylesheet — cannot read rules; skip.
        }
    }
    return out;
}

/** ArrayBuffer → base64 without blowing the call stack on large fonts. */
function bufferToBase64(buf: ArrayBuffer): string {
    const bytes = new Uint8Array(buf);
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
    }
    return btoa(binary);
}

/** Fetch every woff/woff2 referenced in the CSS and rewrite its url() to a
 *  base64 data URI so the file renders offline. Font fetch failures are
 *  non-fatal: leave the original url() in place and continue. */
async function inlineFonts(css: string): Promise<string> {
    const urlRe = /url\(\s*(['"]?)([^'")]+\.woff2?)\1\s*\)/g;
    const urls = new Set<string>();
    let m: RegExpExecArray | null;
    while ((m = urlRe.exec(css)) !== null) urls.add(m[2]);

    const dataUris = new Map<string, string>();
    await Promise.all(
        Array.from(urls).map(async (url) => {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`status ${res.status}`);
                const buf = await res.arrayBuffer();
                const mime = url.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
                dataUris.set(url, `data:${mime};base64,${bufferToBase64(buf)}`);
            } catch (err) {
                console.warn(`[export] font inline failed for ${url}; leaving original url()`, err);
            }
        })
    );

    return css.replace(urlRe, (full, _q: string, url: string) =>
        dataUris.has(url) ? `url(${dataUris.get(url)})` : full
    );
}

/** Step through every slide, settle, and clone section + header into static
 *  markup. Returns each section's outerHTML with the header baked in. */
async function captureSlides(cfg: ExportConfig): Promise<string[]> {
    const { container, headerSelector, slideCount, onProgress } = cfg;
    const header = container.querySelector(headerSelector) as HTMLElement | null;
    const out: string[] = [];

    for (let i = 0; i < slideCount; i++) {
        let section = container.querySelector(`[data-index="${i}"]`) as HTMLElement | null;
        if (section) section.scrollIntoView({ behavior: 'auto' });
        onProgress?.(i + 1);
        await wait(CAPTURE_SETTLE_MS);

        // Re-query after settle in case React remounted the node.
        section = container.querySelector(`[data-index="${i}"]`) as HTMLElement | null;
        if (!section) {
            console.warn(`[export] slide index ${i} not found at capture time; skipping`);
            continue;
        }

        const clone = section.cloneNode(true) as HTMLElement;
        if (header) {
            const headerClone = header.cloneNode(true) as HTMLElement;
            headerClone.setAttribute('data-export-header', '');
            clone.insertBefore(headerClone, clone.firstChild);
        }
        out.push(clone.outerHTML);
    }
    return out;
}

function downloadHtml(html: string, filename: string): void {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/** Capture the live deck and download it as one self-contained HTML file.
 *  Always restores the original scroll position (try/finally in the caller). */
export async function exportDeckToHtml(cfg: ExportConfig): Promise<void> {
    const slidesHtml = await captureSlides(cfg);
    let css = collectCss();
    css = await inlineFonts(css);

    const html = buildExportHtml({
        title: cfg.title,
        htmlClassName: document.documentElement.className,
        bodyClassName: document.body.className,
        containerClassName: cfg.container.className,
        css,
        slidesHtml,
    });

    downloadHtml(html, `${slugify(cfg.title)}.html`);
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS. Confirms the `buildExportHtml`/`slugify` import signatures match Task 1 and DOM types resolve.

- [ ] **Step 3: Commit**

```bash
git add components/PresentationEngine/export/exportToHtml.ts
git commit -m "feat(presentation): client-side deck capture + font inlining"
```

---

### Task 3: ExportButton chrome component

**Files:**
- Create: `components/PresentationEngine/chrome/ExportButton.tsx`
- Modify: `components/PresentationEngine/PresentationEngine.module.css` (append styles)

- [ ] **Step 1: Write the component**

```tsx
'use client';

import styles from '../PresentationEngine.module.css';

interface ExportButtonProps {
    exporting: boolean;
    progress: { current: number; total: number } | null;
    onExport: () => void;
}

// Unobtrusive bottom-corner control. Shows a static label idle, and a live
// "Exporting… n/total" while a capture is in flight (button disabled).
export const ExportButton = ({ exporting, progress, onExport }: ExportButtonProps) => (
    <button
        type="button"
        className={styles.exportButton}
        onClick={onExport}
        disabled={exporting}
        aria-label="Export presentation to a shareable HTML file"
        title="Export to HTML (E)"
    >
        {exporting && progress
            ? `Exporting… ${progress.current}/${progress.total}`
            : '↓ Export'}
    </button>
);
```

- [ ] **Step 2: Append styles to `PresentationEngine.module.css`**

Add at the END of the file:

```css
/* ---- Export button (chrome) ---- */
.exportButton {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 50;
    padding: 8px 14px;
    font-size: var(--fs-label);
    font-family: var(--font-geist-mono, monospace);
    letter-spacing: 0.02em;
    color: var(--brand-black, #1a1a1a);
    background: #ffffff;
    border: 1px solid var(--border, #D8D2C8);
    border-radius: 2px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.exportButton:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}
.exportButton:disabled {
    opacity: 0.7;
    cursor: progress;
}
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: PASS. (`ExportButton` is unused until Task 4 — that's fine for typecheck; if lint flags an unused export, it is resolved when Task 4 imports it. Do not delete it.)

- [ ] **Step 4: Commit**

```bash
git add components/PresentationEngine/chrome/ExportButton.tsx components/PresentationEngine/PresentationEngine.module.css
git commit -m "feat(presentation): ExportButton chrome + styles"
```

---

### Task 4: Wire export into the engine

**Files:**
- Modify: `components/PresentationEngine/PresentationEngine.tsx`

- [ ] **Step 1: Add imports**

At the top with the other chrome imports (after the `NotesOverlay` import line), add:

```tsx
import { ExportButton } from './chrome/ExportButton';
import { exportDeckToHtml } from './export/exportToHtml';
```

- [ ] **Step 2: Add export state**

Immediately after the `const [showNotes, setShowNotes] = useState(false);` line, add:

```tsx
    const [exporting, setExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState<{ current: number; total: number } | null>(null);
```

- [ ] **Step 3: Add the export handler**

After the `scrollToSlide` `useCallback` block (before the first `useEffect`), add:

```tsx
    const handleExport = useCallback(async () => {
        if (exporting || !containerRef.current) return;
        const originalScroll = containerRef.current.scrollTop;
        setExporting(true);
        setExportProgress({ current: 0, total: slides.length });
        try {
            await exportDeckToHtml({
                container: containerRef.current,
                slideSelector: `.${styles.slide}`,
                headerSelector: `.${styles.persistentHeader}`,
                slideCount: slides.length,
                title: meta.title,
                onProgress: (current) => setExportProgress({ current, total: slides.length }),
            });
        } finally {
            containerRef.current?.scrollTo({ top: originalScroll, behavior: 'auto' });
            setExporting(false);
            setExportProgress(null);
        }
    }, [exporting, slides.length, meta.title]);
```

- [ ] **Step 4: Bind the `E` key**

In the keyboard `useEffect`, extend `handleKeyDown`. Change the existing notes branch so the chain reads:

```tsx
            } else if (e.key.toLowerCase() === 'n') {
                setShowNotes(prev => !prev);
            } else if (e.key.toLowerCase() === 'e' && !exporting) {
                e.preventDefault();
                handleExport();
            }
```

Then update that effect's dependency array from `[currentSlideIndex, scrollToSlide]` to:

```tsx
    }, [currentSlideIndex, scrollToSlide, exporting, handleExport]);
```

- [ ] **Step 5: Render the button**

Directly after the `<MobileProgress ... />` element in the returned JSX, add:

```tsx
            <ExportButton
                exporting={exporting}
                progress={exportProgress}
                onExport={handleExport}
            />
```

- [ ] **Step 6: Typecheck + lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: PASS, no unused-variable warnings (ExportButton/exportDeckToHtml are now used).

- [ ] **Step 7: Commit**

```bash
git add components/PresentationEngine/PresentationEngine.tsx
git commit -m "feat(presentation): wire Export button + E shortcut into engine"
```

---

### Task 5: Production build gate

**Files:** none (verification only)

- [ ] **Step 1: Build the static export**

Run: `npm run build`
Expected: build succeeds with no type or lint errors. This confirms the new module survives `output: 'export'` and that nothing referenced a server-only API. If the build fails, fix the reported file before proceeding.

- [ ] **Step 2: Commit (only if build surfaced a fix)**

```bash
git add -A
git commit -m "fix(presentation): resolve build issues for HTML export"
```

(Skip if the build was already clean.)

---

### Task 6: Manual browser verification (feature acceptance)

**Files:** none (manual checklist — this is the real acceptance gate)

- [ ] **Step 1: Run the dev server and open the deck**

Run: `npm run dev`
Open: `http://localhost:3000/presentations/lunchandlearn`

- [ ] **Step 2: Trigger export**

Click the **↓ Export** button (bottom-right) — or press **E**. Expected: the button shows `Exporting… n/11` and advances; after the run a file named `automating-engineering-workflows-with-custom-software.html` (slug of the deck title) downloads. The deck returns to the slide you started on and stays interactive.

- [ ] **Step 3: Open the exported file OFFLINE**

Stop the dev server (or disable network), then open the downloaded `.html` directly from disk in a browser. Verify:
- All 11 slides present, in order.
- SVG charts (ImpactCurve, ImpactRecovery, ChartFrame) render in their **final drawn state**.
- The **Caveat** handwriting accent renders correctly (proves font inlining — if it falls back to a system font, fonts did not inline).
- Each non-hero slide shows its **title/subtitle/breadcrumb** in the header band (proves the header was baked into each section).
- Arrow keys / Space / PageDown page through the slides.

- [ ] **Step 4: Sanity-check file size**

Check the downloaded file size. Expected roughly a few hundred KB (~200–600 KB target; somewhat higher is acceptable since all site stylesheets are collected). If it is multiple MB, investigate whether fonts were double-inlined or an unexpected asset was pulled in — note findings, but this is not a hard gate.

- [ ] **Step 5: Reconcile the design doc**

Confirm the implemented behavior matches `docs/superpowers/specs/2026-06-25-presentation-html-export-design.md`. The one intentional refinement to record: the persistent header **is** baked into each exported section (the spec originally floated dropping all live chrome) so slide titles are preserved. If the spec still reads as "drop the header," update that section to match.

- [ ] **Step 6: Final commit (if Step 5 required doc edits)**

```bash
git add docs/superpowers/specs/2026-06-25-presentation-html-export-design.md
git commit -m "docs: reconcile export spec with baked-in header decision"
```

---

## Self-Review Notes

- **Spec coverage:** faithful static read-through (Tasks 1–2 capture final state) ✓; button on deck + `E` (Tasks 3–4) ✓; step-and-capture mechanism (Task 2 `captureSlides`) ✓; inlined fonts (Task 2 `inlineFonts`) ✓; single-file download (Task 2 `downloadHtml`) ✓; error handling — cross-origin sheets skipped, font failures non-fatal, missing slide skipped, scroll restored in `finally` ✓. Header preservation is an explicit improvement over the spec's original "drop chrome," reconciled in Task 6.
- **Type consistency:** `ExportConfig`/`ExportTemplateInput` field names are used identically across `exportToHtml.ts`, `exportTemplate.ts`, and the engine wiring; `exportDeckToHtml`, `buildExportHtml`, `slugify` signatures match their call sites.
- **No test runner introduced**, per the chosen verification model.
- **Known tradeoff:** `CAPTURE_SETTLE_MS = 4800` makes a full export ~50s; the progress label is the mitigation. Tunable in one place if a faster settle proves reliable.

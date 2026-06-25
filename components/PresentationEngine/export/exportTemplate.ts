// Pure string-building helpers for the HTML export. No DOM access here beyond
// what the caller passes in — keeps this unit easy to reason about.

export interface ExportTemplateInput {
    /** Deck title — used for <title> and the download filename. */
    title: string;
    /** Live <html> className. The deck pins its own colors regardless of site theme, so the exported <html> is intentionally fixed to data-theme="dark". */
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
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
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

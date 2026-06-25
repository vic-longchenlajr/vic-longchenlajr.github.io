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
    /** Called immediately before each slide's settle period begins (1-based), so the progress label updates without waiting. */
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
    const { container, slideSelector, headerSelector, slideCount, onProgress } = cfg;
    // The header is one persistent element whose text updates to the active slide.
    // Query the node once, but clone it fresh each iteration AFTER settle so each
    // clone captures that slide's header content.
    const header = container.querySelector(headerSelector) as HTMLElement | null;
    const out: string[] = [];

    for (let i = 0; i < slideCount; i++) {
        let section = container.querySelector(`${slideSelector}[data-index="${i}"]`) as HTMLElement | null;
        if (section) section.scrollIntoView({ behavior: 'auto' });
        onProgress?.(i + 1);
        await wait(CAPTURE_SETTLE_MS);

        // Re-query after settle in case React remounted the node.
        section = container.querySelector(`${slideSelector}[data-index="${i}"]`) as HTMLElement | null;
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

import type { Variants } from 'framer-motion';

// Shared motion vocabulary for the presentation engine.
//
// Easing matches the deck's existing CSS feel — cubic-bezier(0.19, 1, 0.22, 1),
// an expo-out curve that decelerates hard into place. Most entrances are driven
// off the slide's `isVisible` prop (animate={isVisible ? 'show' : 'hidden'}, or
// an explicit animate object) so the sequence REPLAYS each time the slide
// re-enters the viewport.
//
// Timings here are intentionally unhurried — this reads on a projector across a
// room, so entrances favor a deliberate, polished pace over speed.
export const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

// Default durations (seconds). Reduced-motion collapses to a quick fade.
export const DUR = 0.8;

// A parent that staggers its children in. Children must use the `hidden`/`show`
// variant names below (or their own pair) and be `motion.*` elements.
export function staggerContainer(stagger = 0.12, delayChildren = 0.1): Variants {
    return {
        hidden: {},
        show: {
            transition: { staggerChildren: stagger, delayChildren },
        },
    };
}

// Fade up into place (enters from below).
export function fadeUp(reduce = false, distance = 18): Variants {
    return {
        hidden: { opacity: 0, y: reduce ? 0 : distance },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: reduce ? 0.25 : DUR, ease: EASE },
        },
    };
}

// Float in from the top (enters from above, settling downward).
export function floatDown(reduce = false, distance = 18): Variants {
    return {
        hidden: { opacity: 0, y: reduce ? 0 : -distance },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: reduce ? 0.25 : DUR, ease: EASE },
        },
    };
}

// Slide in horizontally. Positive distance enters from the right; negative from
// the left (so `slideIn(reduce, -24)` reads as "float in left to right").
export function slideIn(reduce = false, distance = 24): Variants {
    return {
        hidden: { opacity: 0, x: reduce ? 0 : distance },
        show: {
            opacity: 1,
            x: 0,
            transition: { duration: reduce ? 0.25 : DUR, ease: EASE },
        },
    };
}

// Plain fade, optionally delayed.
export function fadeIn(reduce = false, delay = 0): Variants {
    return {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { duration: reduce ? 0.25 : 0.7, ease: EASE, delay },
        },
    };
}

// Wipe-reveal left to right (content uncovered from left edge to right). Used
// for "slide to reveal" beats. Reduced-motion falls back to a plain fade.
export function wipeReveal(reduce = false): Variants {
    if (reduce) {
        return {
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.25, ease: EASE } },
        };
    }
    return {
        hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        show: {
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            transition: { duration: 0.7, ease: EASE },
        },
    };
}

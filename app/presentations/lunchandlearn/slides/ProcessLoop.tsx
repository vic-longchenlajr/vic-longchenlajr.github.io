'use client';

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lightbulb,
    Search,
    Blocks,
    FlaskConical,
    Rocket,
    Repeat,
    type LucideIcon,
} from 'lucide-react';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';
import { Typewriter } from '@/components/PresentationEngine/Typewriter';
import type { SlideComponentProps } from '@/components/PresentationEngine';

interface Step {
    Icon: LucideIcon;
    title: string;
    desc: string;
    stakeholders: string[];
}

// Six phases. Steps 1-2 (Validate, Immerse) run once; steps 3-6 (Architect →
// Prototype → Deploy → Feedback) are the loop that repeats — the return arc
// below the rail bends from Feedback back to Architect, not back to the start.
const steps: Step[] = [
    {
        Icon: Lightbulb,
        title: 'Validate',
        desc: 'Is it worth building? Validate the value, scope, and who it touches.',
        stakeholders: ['Product Mgmt', 'Project Engr'],
    },
    {
        Icon: Search,
        title: 'Immerse',
        desc: 'Learn the real workflow, constraints, edge cases, and domain.',
        stakeholders: ['Project Engr', 'Applications Engr', 'End Users'],
    },
    {
        Icon: Blocks,
        title: 'Architect',
        desc: 'Plan and design the build — and, on every loop, the updates.',
        stakeholders: ['Project Engr', 'IT'],
    },
    {
        Icon: FlaskConical,
        title: 'Prototype',
        desc: 'Build it — a minimal, working version to put in real hands.',
        stakeholders: ['Project Engr', 'Applications Engr'],
    },
    {
        Icon: Rocket,
        title: 'Deploy',
        desc: 'Put it in front of testers so they can actually use it.',
        stakeholders: ['Internal Testing Group', 'IT'],
    },
    {
        Icon: Repeat,
        title: 'Feedback',
        desc: 'Collect it — then loop right back to Architect and go deeper.',
        stakeholders: ['Test Group', 'Product Mgmt'],
    },
];

// The iteration loop runs between Feedback (last) and Architect.
const LOOP_FROM = steps.length - 1; // Feedback
const LOOP_TO = 2; // Architect

// The detail card: types the phase label + title simultaneously, then floats in
// the description, then the stakeholder pills. Remounts per phase, so the
// internal sequence replays on every phase change.
function PhaseDetail({ step, index, reduce }: { step: Step; index: number; reduce: boolean }) {
    const [headDone, setHeadDone] = useState(false);
    const phaseLabel = `PHASE ${String(index + 1).padStart(2, '0')}`;

    const descAnim = {
        initial: { opacity: 0, y: reduce ? 0 : -16 },
        animate: headDone ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -16 },
        transition: { duration: reduce ? 0.2 : 0.7, ease: EASE },
    };
    const tagsAnim = {
        initial: { opacity: 0, y: reduce ? 0 : -14 },
        animate: headDone ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -14 },
        transition: { duration: reduce ? 0.2 : 0.6, ease: EASE, delay: reduce ? 0 : 0.35 },
    };

    return (
        <>
            <div className={styles.detailIndex}>
                <Typewriter text={phaseLabel} active reduce={reduce} speedMs={40} startDelayMs={450} showCursor={false} />
            </div>
            <h3 className={styles.detailTitle}>
                <Typewriter text={step.title} active reduce={reduce} speedMs={48} startDelayMs={450} onDone={() => setHeadDone(true)} />
            </h3>
            <motion.p className={styles.detailDesc} {...descAnim}>{step.desc}</motion.p>
            <motion.div className={styles.detailTags} {...tagsAnim}>
                {step.stakeholders.map((tag) => (
                    <span key={tag} className={`${styles.detailTag} ${styles.tagStakeholder}`}>{tag}</span>
                ))}
            </motion.div>
        </>
    );
}

// Geometry of the return arc, measured from the live DOM so it lines up with the
// node centers regardless of how flexbox distributed the connectors.
interface ArcGeo {
    w: number;
    h: number;
    fromX: number;
    toX: number;
}

export default function ProcessLoop({ isVisible }: SlideComponentProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    // Rail finishes drawing before the detail card reveals.
    const [railDone, setRailDone] = useState(false);
    const [arc, setArc] = useState<ArcGeo | null>(null);

    const railRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const reduce = false; // run animations regardless of OS reduced-motion

    const nodeGap = 0.35;
    const detailStart = 2.4;
    const ARC_H = 60;

    // The loop arc is the climax — it draws only once the presenter clicks
    // through to Feedback (the last node), so the motion lands on the spoken
    // "…and it goes right back to Architect."
    const arcActive = activeIndex === LOOP_FROM;

    useEffect(() => {
        if (!isVisible) {
            setRailDone(false);
            setActiveIndex(0);
            return;
        }
        if (reduce) {
            setRailDone(true);
            return;
        }
        const t = setTimeout(() => setRailDone(true), detailStart * 1000);
        return () => clearTimeout(t);
    }, [isVisible, reduce]);

    // Arrow keys step through phases; at the ends we DON'T consume the event, so
    // it reaches the engine's window listener and moves to the prev/next slide.
    // Capture phase + stopImmediatePropagation means we win over that listener
    // only on the steps we actually handle.
    useEffect(() => {
        if (!isVisible) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' && activeIndex < steps.length - 1) {
                e.preventDefault();
                e.stopImmediatePropagation();
                setActiveIndex((i) => Math.min(steps.length - 1, i + 1));
            } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
                e.preventDefault();
                e.stopImmediatePropagation();
                setActiveIndex((i) => Math.max(0, i - 1));
            }
        };
        window.addEventListener('keydown', onKey, { capture: true });
        return () => window.removeEventListener('keydown', onKey, { capture: true });
    }, [isVisible, activeIndex]);

    // Measure node centers (via offsetLeft — layout-based, so the active node's
    // scale transform doesn't skew it) and recompute on resize.
    useLayoutEffect(() => {
        const measure = () => {
            const rail = railRef.current;
            const from = nodeRefs.current[LOOP_FROM];
            const to = nodeRefs.current[LOOP_TO];
            if (!rail || !from || !to) return;
            const centerOf = (n: HTMLButtonElement) => n.offsetLeft + n.offsetWidth / 2;
            setArc({ w: rail.offsetWidth, h: ARC_H, fromX: centerOf(from), toX: centerOf(to) });
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (railRef.current) ro.observe(railRef.current);
        return () => ro.disconnect();
    }, [isVisible]);

    // Presenter advances phases by clicking the rail nodes — no auto-advance.
    const select = (i: number) => setActiveIndex(i);

    const activeStep = steps[activeIndex];

    const nodeAnim = (i: number) => ({
        initial: { opacity: 0, scale: reduce ? 1 : 0.6 },
        animate: isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: reduce ? 1 : 0.6 },
        transition: { delay: reduce ? 0 : i * nodeGap, duration: reduce ? 0.25 : 0.5, ease: EASE },
    });
    const connAnim = (delay: number) => ({
        initial: { opacity: reduce ? 0 : 1, scaleX: reduce ? 1 : 0 },
        animate: isVisible ? { opacity: 1, scaleX: 1 } : { opacity: reduce ? 0 : 1, scaleX: reduce ? 1 : 0 },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : 0.4, ease: EASE },
    });

    // The return path: down from Feedback, left across, up into Architect.
    const arcPath = arc ? `M ${arc.fromX} 4 V ${arc.h - 16} H ${arc.toX} V 6` : '';

    return (
        <div className={styles.processWrapper}>
            <div className={styles.railZone}>
                {/* Phase rail: each button + the line to its right draw in sequence */}
                <div className={styles.phaseRail} ref={railRef}>
                    {steps.map((step, i) => (
                        <Fragment key={i}>
                            {i > 0 && (
                                <motion.div
                                    className={`${styles.railConnector} ${i <= activeIndex ? styles.railConnectorFilled : ''}`}
                                    style={{ transformOrigin: 'left center' }}
                                    {...connAnim((i - 1) * nodeGap + 0.18)}
                                />
                            )}
                            <motion.button
                                type="button"
                                ref={(el) => { nodeRefs.current[i] = el; }}
                                className={`${styles.railNode} ${i === activeIndex ? styles.railNodeActive : ''} ${i < activeIndex ? styles.railNodeDone : ''} ${arcActive && i === LOOP_TO ? styles.railNodeLoopTarget : ''}`}
                                {...nodeAnim(i)}
                                onClick={() => select(i)}
                            >
                                <span className={styles.railNodeIcon}>
                                    <step.Icon strokeWidth={2} />
                                </span>
                                <span className={styles.railNodeLabel}>{step.title}</span>
                            </motion.button>
                        </Fragment>
                    ))}
                </div>

                {/* Return arc: bends from Feedback (6) back to Architect (3).
                    Draws only when the presenter reaches the Feedback node. */}
                {arc && (
                    <div className={styles.returnArc} style={{ height: arc.h }}>
                        <svg
                            className={styles.returnArcSvg}
                            width={arc.w}
                            height={arc.h}
                            viewBox={`0 0 ${arc.w} ${arc.h}`}
                            fill="none"
                            aria-hidden="true"
                        >
                            <motion.path
                                d={arcPath}
                                className={styles.returnArcPath}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={arcActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                                transition={{ duration: reduce ? 0.2 : 0.85, ease: EASE }}
                            />
                            <motion.path
                                d={`M ${arc.toX - 6} 14 L ${arc.toX} 4 L ${arc.toX + 6} 14`}
                                className={styles.returnArcHead}
                                initial={{ opacity: 0 }}
                                animate={arcActive ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: reduce ? 0 : 0.85, duration: 0.3, ease: EASE }}
                            />
                        </svg>
                        <motion.span
                            className={styles.returnArcLabel}
                            style={{ left: (arc.fromX + arc.toX) / 2, top: arc.h - 16 }}
                            initial={{ opacity: 0 }}
                            animate={arcActive ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: reduce ? 0 : 0.6, duration: 0.5, ease: EASE }}
                        >
                            ↺ returns to Architect
                        </motion.span>
                    </div>
                )}
            </div>

            {/* Detail card: floats in after the rail, then types + reveals */}
            <div className={styles.detailFrame}>
                {railDone && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            className={styles.detailPanel}
                            initial={{ opacity: 0, y: reduce ? 0 : -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                            transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE }}
                        >
                            <PhaseDetail step={activeStep} index={activeIndex} reduce={reduce} />
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

'use client';

import { Fragment, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lightbulb,
    Search,
    Blocks,
    FlaskConical,
    Repeat,
    Rocket,
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
    value: string[];
}

const steps: Step[] = [
    {
        Icon: Lightbulb,
        title: 'Discovery',
        desc: 'Validate value, scope, and cross-department impact before building.',
        stakeholders: ['Product Mgmt', 'Project Engr'],
        value: ['Strategic Alignment', 'Risk Reduction'],
    },
    {
        Icon: Search,
        title: 'Immersion',
        desc: 'Map real use cases, constraints, and edge conditions.',
        stakeholders: ['Project Engr', 'Applications Engr', 'Customer Care', 'End Users'],
        value: ['Use-Case Clarity', 'Requirement Confidence'],
    },
    {
        Icon: Blocks,
        title: 'Architecture',
        desc: 'Define data models, rules, system boundaries, and visibility.',
        stakeholders: ['Project Engr', 'IT'],
        value: ['Scalable Framework', 'Standards Enforcement'],
    },
    {
        Icon: FlaskConical,
        title: 'Prototype',
        desc: 'Prove feasibility with a minimal, validated build.',
        stakeholders: ['Project Engr', 'Applications Engr'],
        value: ['Feasibility Validation', 'Accelerated Learning'],
    },
    {
        Icon: Repeat,
        title: 'Validation Sprints',
        desc: 'Pressure-test assumptions and iterate through structured feedback.',
        stakeholders: ['Internal Testing Group', 'Product Mgmt'],
        value: ['Accuracy', 'Operational Confidence'],
    },
    {
        Icon: Rocket,
        title: 'Deploy & Sustain',
        desc: 'Release, align stakeholders, and continuously improve.',
        stakeholders: ['Sales', 'Marketing', 'Legal', 'IT', 'Customer Care'],
        value: ['Adoption', 'Continuous Improvement'],
    },
];

interface Principle {
    title: string;
    description: string;
}

// The detail card: types the phase label + title simultaneously, then floats in
// the description, then the pills (all together). Remounts per phase, so the
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
                {step.value.map((tag) => (
                    <span key={tag} className={`${styles.detailTag} ${styles.tagValue}`}>{tag}</span>
                ))}
            </motion.div>
        </>
    );
}

export default function ProcessLoop({ content, isVisible }: SlideComponentProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoAdvance, setAutoAdvance] = useState(true);
    // Rail finishes drawing before the detail card + principles reveal.
    const [railDone, setRailDone] = useState(false);

    const principles = (content?.principles as Principle[]) || [];
    const principlesTitle = (content?.principlesTitle as string) || '';

    const reduce = false; // run animations regardless of OS reduced-motion

    const nodeGap = 0.35;
    const detailStart = 2.4;
    const principleTitleAt = detailStart + 0.4;
    const principleStart = principleTitleAt + 0.4;
    const principleGap = 0.62; // > wipe duration, so each fires after the prior

    useEffect(() => {
        if (!isVisible) {
            setRailDone(false);
            return;
        }
        if (reduce) {
            setRailDone(true);
            return;
        }
        const t = setTimeout(() => setRailDone(true), detailStart * 1000);
        return () => clearTimeout(t);
    }, [isVisible, reduce]);

    useEffect(() => {
        // Only cycle once the rail has drawn and the slide is on screen.
        if (!autoAdvance || !isVisible || !railDone) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % steps.length);
        }, 9000);
        return () => clearInterval(interval);
    }, [autoAdvance, isVisible, railDone]);

    const select = (i: number) => {
        setAutoAdvance(false);
        setActiveIndex(i);
    };

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
    const downIn = (delay: number, dur = 0.7) => ({
        initial: { opacity: 0, y: reduce ? 0 : -16 },
        animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -16 },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });
    const wipe = (delay: number, dur = 0.55) => {
        const hidden = reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 100% 0 0)' };
        const shown = reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0% 0 0)' };
        return {
            initial: hidden,
            animate: isVisible ? shown : hidden,
            transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
        };
    };

    return (
        <div className={styles.processWrapper}>
            {/* Phase rail: each button + the line to its right draw in sequence */}
            <div className={styles.phaseRail}>
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
                            className={`${styles.railNode} ${i === activeIndex ? styles.railNodeActive : ''} ${i < activeIndex ? styles.railNodeDone : ''}`}
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
                <motion.div
                    className={styles.railConnector}
                    style={{ transformOrigin: 'left center' }}
                    {...connAnim(5 * nodeGap + 0.18)}
                />
                <motion.span className={styles.railLoop} title="The cycle repeats" {...nodeAnim(6)}>↺</motion.span>
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

            {principles.length > 0 && (
                <div className={styles.principlesStrip}>
                    {principlesTitle && (
                        <motion.span className={styles.principlesTitle} {...downIn(principleTitleAt)}>
                            {principlesTitle}
                        </motion.span>
                    )}
                    <div className={styles.principlesChips}>
                        {principles.map((p, i) => (
                            <motion.div key={p.title} className={styles.principleChip} {...wipe(principleStart + i * principleGap)}>
                                <span className={styles.principleChipTitle}>{p.title}</span>
                                <span className={styles.principleChipDesc}>{p.description}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

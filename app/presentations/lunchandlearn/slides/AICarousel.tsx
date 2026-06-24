'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';
import type { SlideComponentProps } from '@/components/PresentationEngine';

interface Artifact {
    label: string;
    items: string[];
    loop?: string;   // loop-back marker shown on the final artifact
}

interface Tool {
    phase: string;
    tool: string;
    skill?: string;   // when set, `tool` is the product (Claude Code) and this is the skill
    desc: string;
}

// Slide: the AI pipeline as a walkable carousel. The chain is flat —
//   artifact → tool → artifact → tool → … — and each tool consumes the artifact
// on its left and produces the one on its right, so every output IS the next
// tool's input. One tool fills the stage at a time, which buys room for real
// detail. Step with the on-screen arrows or the ←/→ keys; at the ends the arrow
// KEYS fall through to the engine's own handler so they advance the slide.
export default function AICarousel({ content, isVisible }: SlideComponentProps) {
    const artifacts = (content?.artifacts as Artifact[]) || [];
    const tools = (content?.tools as Tool[]) || [];
    const last = tools.length - 1;

    const [step, setStep] = useState(0);

    // Restart the walk-through whenever the slide (re)enters the viewport.
    useEffect(() => {
        if (isVisible) setStep(0);
    }, [isVisible]);

    const go = useCallback((delta: number) => {
        setStep((s) => Math.min(last, Math.max(0, s + delta)));
    }, [last]);

    // Arrow keys step within the carousel; at the ends we DON'T consume the
    // event, so it bubbles to the engine's window listener and changes slides.
    // Capture phase + stopImmediatePropagation lets us win over that listener
    // only on the steps we actually handle.
    useEffect(() => {
        if (!isVisible) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' && step < last) {
                e.preventDefault();
                e.stopImmediatePropagation();
                go(1);
            } else if (e.key === 'ArrowLeft' && step > 0) {
                e.preventDefault();
                e.stopImmediatePropagation();
                go(-1);
            }
        };
        window.addEventListener('keydown', onKey, { capture: true });
        return () => window.removeEventListener('keydown', onKey, { capture: true });
    }, [isVisible, step, last, go]);

    if (!tools.length) return null;

    const tool = tools[step];
    const input = artifacts[step];
    const output = artifacts[step + 1];

    // Entrance choreography, replayed for every tool and on every scroll-in:
    // the tool card slides gently down into place first; then the input and
    // output slide OUT from behind it (it sits on a higher z-index) to their
    // spots, together. On exit they retract back behind the tool, then the tool
    // slides down and out so the next one can drop into its place. Children carry
    // explicit delays rather than a container stagger, so the artifacts move in
    // unison.
    const REVEAL = 0.4;       // artifacts emerge after the tool starts revealing
    const TUCK = 150;         // px the artifacts sit translated behind the tool

    const container: Variants = { hidden: {}, show: {}, exit: {} };
    const toolV: Variants = {
        hidden: { opacity: 0, y: -40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
        exit: { opacity: 0, y: 40, transition: { duration: 0.3, ease: EASE, delay: 0.22 } },
    };
    const inputV: Variants = {
        hidden: { opacity: 0, x: TUCK },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE, delay: REVEAL } },
        exit: { opacity: 0, x: TUCK, transition: { duration: 0.3, ease: EASE } },
    };
    const outputV: Variants = {
        hidden: { opacity: 0, x: -TUCK },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE, delay: REVEAL } },
        exit: { opacity: 0, x: -TUCK, transition: { duration: 0.3, ease: EASE } },
    };
    const flowV: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.35, ease: EASE, delay: REVEAL + 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.2, ease: EASE } },
    };

    const renderArtifact = (a: Artifact, kind: 'in' | 'out', variants: Variants) => (
        <motion.div
            className={`${styles.aicArtifact} ${kind === 'out' ? styles.aicArtifactOut : ''}`}
            variants={variants}
        >
            <span className={styles.aicArtifactKind}>{kind === 'in' ? 'INPUT' : 'OUTPUT'}</span>
            <span className={styles.aicArtifactLabel}>{a.label}</span>
            <ul className={styles.aicArtifactItems}>
                {a.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
            {a.loop && <span className={styles.aicArtifactLoop}>{a.loop}</span>}
        </motion.div>
    );

    return (
        <div className={styles.aicWrap}>
            <div className={styles.aicStage}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        className={styles.aicRow}
                        variants={container}
                        initial="hidden"
                        animate={isVisible ? 'show' : 'hidden'}
                        exit="exit"
                    >
                        {renderArtifact(input, 'in', inputV)}
                        <motion.span className={styles.aicFlow} variants={flowV}>▶</motion.span>
                        <motion.div className={styles.aicTool} variants={toolV}>
                            <span className={styles.aicToolPhase}>{tool.phase}</span>
                            <span className={styles.aicToolHead}>
                                <span className={styles.aicToolName}>{tool.tool}</span>
                                {tool.skill && (
                                    <span className={`${styles.aicToolSkill} ${tool.skill.length > 16 ? styles.aicToolSkillLong : ''}`}>
                                        {tool.skill}
                                    </span>
                                )}
                            </span>
                            <p className={styles.aicToolDesc}>{tool.desc}</p>
                        </motion.div>
                        <motion.span className={styles.aicFlow} variants={flowV}>▶</motion.span>
                        {renderArtifact(output, 'out', outputV)}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className={styles.aicDots}>
                {tools.map((t, i) => (
                    <button
                        type="button"
                        key={t.skill ?? t.tool}
                        className={`${styles.aicDot} ${i === step ? styles.aicDotActive : ''}`}
                        onClick={() => setStep(i)}
                        aria-label={`Go to ${t.skill ?? t.tool}`}
                    />
                ))}
            </div>
        </div>
    );
}

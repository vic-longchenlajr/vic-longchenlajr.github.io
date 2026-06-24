'use client';

import { motion } from 'framer-motion';
import { FileSpreadsheet, BrainCircuit, Files, Repeat, Shuffle } from 'lucide-react';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';
import type { SlideComponentProps } from '@/components/PresentationEngine';

// Closing slide: a recap turned outward at the audience — the signals to watch
// for in their own work, and the process to approach them — then an open
// question that invites a live, think-it-through-together Q&A. No self-promotion.
const SIGNAL_ICONS = [FileSpreadsheet, BrainCircuit, Files, Repeat, Shuffle];

export default function ClosingSignals({ content, isVisible }: SlideComponentProps) {
    const signalsLabel = (content?.signalsLabel as string) || 'The signals — in your work';
    const signals = (content?.signals as string[]) || [];
    const processLabel = (content?.processLabel as string) || 'The process — simplified';
    const steps = (content?.steps as string[]) || [];
    const openQuestion = (content?.openQuestion as string) || '';
    const openInvite = (content?.openInvite as string) || '';
    const reframe = (content?.reframe as string) || '';

    const reduce = false; // run animations regardless of OS reduced-motion

    // Timeline (seconds): signals + phases recap together → open question → reframe.
    const recapAt = 0.5;
    const itemStagger = 0.2;
    const recapDone = recapAt + Math.max(signals.length, steps.length) * itemStagger;
    const openAt = recapDone + 0.3;
    const inviteAt = openAt + 0.4;
    const reframeAt = inviteAt + 0.5;

    const downIn = (delay: number, dur = 0.6, dist = 14) => ({
        initial: { opacity: 0, y: reduce ? 0 : -dist },
        animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -dist },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });

    return (
        <div className={styles.closerContainer}>
            <div className={styles.closerRecap}>
                {/* The signals, turned on the audience */}
                <div className={styles.closerSignals}>
                    <motion.span className={`${styles.mirrorColLabel} ${styles.signalLabel}`} {...downIn(0)}>{signalsLabel}</motion.span>
                    {signals.map((s, i) => {
                        const Icon = SIGNAL_ICONS[i % SIGNAL_ICONS.length];
                        return (
                            <motion.div
                                key={i}
                                className={styles.closerSignalCell}
                                {...downIn(recapAt + i * itemStagger, 0.6)}
                                whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.3, ease: EASE } }}
                            >
                                <span className={styles.closerSignalIcon}>
                                    <Icon strokeWidth={2} aria-hidden="true" />
                                </span>
                                <span className={styles.closerSignalText}>{s}</span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* The process, recapped as a plain-language numbered list */}
                <div className={styles.closerProcess}>
                    <motion.span className={`${styles.mirrorColLabel} ${styles.targetLabel}`} {...downIn(0)}>{processLabel}</motion.span>
                    <ol className={styles.closerSteps}>
                        {steps.map((s, i) => (
                            <motion.li key={i} className={styles.closerStep} {...downIn(recapAt + i * itemStagger, 0.5)}>
                                <span className={styles.closerStepNum}>{i + 1}</span>
                                <span className={styles.closerStepText}>{s}</span>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>

            {/* The open question — the live, think-it-through invitation */}
            {openQuestion && (
                <div className={styles.closerOpen}>
                    <motion.p className={styles.closerOpenQuestion} {...downIn(openAt, 0.7, 10)}>{openQuestion}</motion.p>
                    {openInvite && (
                        <motion.p className={styles.closerOpenInvite} {...downIn(inviteAt, 0.7, 10)}>{openInvite}</motion.p>
                    )}
                </div>
            )}

            {reframe && <motion.p className={styles.closerReframe} {...downIn(reframeAt, 0.7, 10)}>{reframe}</motion.p>}
        </div>
    );
}

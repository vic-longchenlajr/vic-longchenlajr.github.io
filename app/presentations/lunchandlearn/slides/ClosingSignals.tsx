'use client';

import { motion } from 'framer-motion';
import { FileSpreadsheet, BrainCircuit, Files, Repeat, Shuffle, CircleCheck } from 'lucide-react';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';
import type { SlideComponentProps } from '@/components/PresentationEngine';

// Closing slide: the Signals -> Target mirror from the demos, turned outward at
// the audience and converging to a real call to action. Bookends slide 3.
const SIGNAL_ICONS = [FileSpreadsheet, BrainCircuit, Files, Repeat, Shuffle];

export default function ClosingSignals({ content, isVisible }: SlideComponentProps) {
    const signalsLabel = (content?.signalsLabel as string) || 'The signals';
    const signals = (content?.signals as string[]) || [];
    const targetLabel = (content?.targetLabel as string) || 'Sound familiar?';
    const targetKey = (content?.targetKey as string) || '';
    const targetText = (content?.targetText as string) || '';
    const contactEmail = (content?.contactEmail as string) || '';
    const reframe = (content?.reframe as string) || '';

    const reduce = false; // run animations regardless of OS reduced-motion

    // Timeline (seconds).
    const signalsAt = 0.6;
    const signalStagger = 0.25;
    const arrowAt = signalsAt + signals.length * signalStagger + 0.2;
    const targetLabelAt = arrowAt + 0.4;
    const targetCardAt = targetLabelAt + 0.45;
    const reframeAt = targetCardAt + 0.6;

    const downIn = (delay: number, dur = 0.7, dist = 14) => ({
        initial: { opacity: 0, y: reduce ? 0 : -dist },
        animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -dist },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });
    const leftIn = (delay: number, dur = 0.7, dist = 24) => ({
        initial: { opacity: 0, x: reduce ? 0 : -dist },
        animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: reduce ? 0 : -dist },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });
    const wipe = (delay: number, dur = 0.7) => {
        const hidden = reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 100% 0 0)' };
        const shown = reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0% 0 0)' };
        return {
            initial: hidden,
            animate: isVisible ? shown : hidden,
            transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
        };
    };

    return (
        <div className={styles.closerContainer}>
            <div className={styles.closerMirror}>
                <div className={styles.closerSignals}>
                    <motion.span className={`${styles.mirrorColLabel} ${styles.signalLabel}`} {...downIn(0)}>{signalsLabel}</motion.span>
                    {signals.map((s, i) => {
                        const Icon = SIGNAL_ICONS[i % SIGNAL_ICONS.length];
                        return (
                            <motion.div
                                key={i}
                                className={styles.closerSignalCell}
                                {...downIn(signalsAt + i * signalStagger, 0.6)}
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

                <motion.div className={styles.closerArrow} aria-hidden="true" {...leftIn(arrowAt, 0.6)}>▶</motion.div>

                <div className={styles.closerTargetCol}>
                    <motion.span className={`${styles.mirrorColLabel} ${styles.targetLabel}`} {...wipe(targetLabelAt)}>{targetLabel}</motion.span>
                    <motion.div className={styles.closerTarget} {...wipe(targetCardAt)}>
                        <span className={styles.closerTargetIcon}>
                            <CircleCheck strokeWidth={2} aria-hidden="true" />
                        </span>
                        {targetKey && <span className={styles.closerTargetKey}>{targetKey}</span>}
                        {targetText && (
                            <span className={styles.closerTargetText}>
                                {targetText}{' '}
                                {contactEmail && (
                                    <a className={styles.closerEmail} href={`mailto:${contactEmail}`}>
                                        {contactEmail}
                                    </a>
                                )}
                            </span>
                        )}
                    </motion.div>
                </div>
            </div>

            {reframe && <motion.p className={styles.closerReframe} {...downIn(reframeAt, 0.7, 10)}>{reframe}</motion.p>}
        </div>
    );
}

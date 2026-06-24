'use client';

import { motion } from 'framer-motion';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';
import type { SlideComponentProps } from '@/components/PresentationEngine';

interface Turn {
    role: 'grill' | 'me';
    text: string;
}

// grill-me artifact slide. The rough idea I walk in with floats in first, then a
// badge stands in for the (long) interview, then ONE representative exchange and
// the SPEC it produced — the stealable payoff. The session length is shown as a
// counter, not reproduced as text.
export default function GrillMe({ content, isVisible }: SlideComponentProps) {
    const lead = (content?.lead as string) || '';
    const askLabel = (content?.askLabel as string) || 'THE ROUGH IDEA I WALKED IN WITH';
    const ask = (content?.ask as string) || '';
    const questionCount = (content?.questionCount as number) ?? 0;
    const questionNote = (content?.questionNote as string) || 'questions, one at a time';
    const exchangeLabel = (content?.exchangeLabel as string) || 'ONE OF THEM';
    const turns = (content?.turns as Turn[]) || [];
    const outcome = (content?.outcome as string) || '';
    const footnote = (content?.footnote as string) || '';

    const reduce = false; // run animations regardless of OS reduced-motion

    // Timeline (seconds): lead → ask → counter → exchange turns → SPEC → footnote.
    const askAt = 0.4;
    const counterAt = askAt + 0.6;
    const panelAt = counterAt + 0.5;
    const turnStart = panelAt + 0.45;
    const turnGap = 0.5;
    const outcomeAt = turnStart + turns.length * turnGap + 0.2;

    const downIn = (delay: number, dur = 0.6, y = -16) => ({
        initial: { opacity: 0, y: reduce ? 0 : y },
        animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : y },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });
    const leftIn = (delay: number, x = -24) => ({
        initial: { opacity: 0, x: reduce ? 0 : x },
        animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: reduce ? 0 : x },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : 0.5, ease: EASE },
    });

    return (
        <div className={styles.grillContainer}>
            {lead && <motion.p className={styles.grillLead} {...downIn(0, 0.6)}>{lead}</motion.p>}

            {/* The casual, vague ask I start with */}
            {ask && (
                <motion.div className={styles.grillAsk} {...downIn(askAt, 0.6, -18)}>
                    <span className={styles.grillAskLabel}>{askLabel}</span>
                    <span className={styles.grillAskText}>&ldquo;{ask}&rdquo;</span>
                </motion.div>
            )}

            {/* The interview, rendered as a counter rather than reproduced */}
            {questionCount > 0 && (
                <motion.div className={styles.grillCounter} {...downIn(counterAt, 0.5, -10)}>
                    <span className={styles.grillCounterArrow} aria-hidden="true">↓</span>
                    <span className={styles.grillCounterText}>
                        grill-me · <strong>{questionCount} {questionNote}</strong>
                    </span>
                </motion.div>
            )}

            {/* One representative exchange + the SPEC it produced */}
            <motion.div className={styles.grillPanel} {...downIn(panelAt, 0.6, -16)}>
                <div className={styles.grillPanelBar}>
                    <span className={styles.grillPanelDot} aria-hidden="true" />
                    <span className={styles.grillPanelLabel}>{exchangeLabel}</span>
                </div>

                <div className={styles.grillTranscript}>
                    {turns.map((t, i) => (
                        <motion.div
                            key={i}
                            className={`${styles.grillTurn} ${t.role === 'grill' ? styles.grillTurnGrill : styles.grillTurnMe}`}
                            {...leftIn(turnStart + i * turnGap)}
                        >
                            <span className={styles.grillTurnWho}>{t.role === 'grill' ? 'grill-me' : 'me'}</span>
                            <span className={styles.grillTurnText}>{t.text}</span>
                        </motion.div>
                    ))}
                </div>

                {outcome && (
                    <motion.div className={styles.grillOutcome} {...downIn(outcomeAt, 0.6)}>
                        {outcome}
                    </motion.div>
                )}
            </motion.div>

            {footnote && (
                <motion.p className={styles.grillFootnote} {...downIn(outcomeAt + 0.4, 0.6)}>{footnote}</motion.p>
            )}
        </div>
    );
}

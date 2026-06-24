'use client';

import { motion } from 'framer-motion';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';
import type { SlideComponentProps } from '@/components/PresentationEngine';

interface Item {
    k: string;
    v: string;
}

interface Pair {
    signal: Item;
    target: Item;
}

interface Source {
    badge: string;
    title: string;
    href: string;
    external?: boolean;
}

interface Origin {
    setup?: string;
    bullets?: string[];
    sources?: Source[];
}

// Shared layout for the two collapsed case-study slides (VicFlex, Vortex). An
// optional origin block (the compressed backstory — bullets, or openable source
// chips) floats in first; then the column labels float down together and each
// Signal → Target row resolves left-to-right; then the launch button drops in.
// VicFlex passes tempo:"fast".
export default function DemoLaunch({ content, isVisible }: SlideComponentProps) {
    const link = (content?.link as string) || '#';
    const launchLabel = (content?.launchLabel as string) || 'LAUNCH';
    const signalsLabel = (content?.signalsLabel as string) || 'THE SIGNALS';
    const targetLabel = (content?.targetLabel as string) || 'THE TARGET';
    const pairs = (content?.pairs as Pair[]) || [];
    const origin = (content?.origin as Origin) || null;
    const fast = (content?.tempo as string) === 'fast';

    const reduce = false; // run animations regardless of OS reduced-motion

    // Origin reveals first; the mirror timeline starts after it has landed.
    const hasOrigin = !!(origin && (origin.setup || origin.bullets?.length || origin.sources?.length));
    const mirrorOffset = hasOrigin ? (fast ? 0.45 : 0.6) : 0;

    // Timeline (seconds).
    const rowStart = (fast ? 0.5 : 0.75) + mirrorOffset;
    const rowGap = fast ? 0.58 : 0.9;
    const arrowOffset = fast ? 0.18 : 0.3;
    const targetOffset = fast ? 0.34 : 0.55;
    const eltDur = fast ? 0.45 : 0.6;
    const launchAt = rowStart + Math.max(0, pairs.length - 1) * rowGap + targetOffset + eltDur + 0.25;

    const leftIn = (delay: number, x = -28, dur = eltDur) => ({
        initial: { opacity: 0, x: reduce ? 0 : x },
        animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: reduce ? 0 : x },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });
    const downIn = (delay: number, dur = 0.7) => ({
        initial: { opacity: 0, y: reduce ? 0 : -16 },
        animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -16 },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });
    const wipe = (delay: number, dur = 0.5) => {
        const hidden = reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 100% 0 0)' };
        const shown = reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0% 0 0)' };
        return {
            initial: hidden,
            animate: isVisible ? shown : hidden,
            transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
        };
    };

    return (
        <div className={styles.launchContainer}>
            {hasOrigin && (
                <div className={styles.demoOrigin}>
                    {origin?.setup && (
                        <motion.p className={styles.demoOriginSetup} {...downIn(0, 0.6)}>{origin.setup}</motion.p>
                    )}
                    {!!origin?.bullets?.length && (
                        <ul className={styles.demoOriginBullets}>
                            {origin.bullets.map((b, i) => (
                                <motion.li key={i} className={styles.demoOriginBullet} {...downIn(0.18 + i * 0.12, 0.5)}>{b}</motion.li>
                            ))}
                        </ul>
                    )}
                    {!!origin?.sources?.length && (
                        <div className={styles.demoSources}>
                            {origin.sources.map((s, i) => (
                                <motion.a
                                    key={i}
                                    className={styles.demoSourceChip}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...downIn(0.18 + i * 0.1, 0.5)}
                                >
                                    <span className={styles.demoSourceChipBadge}>{s.badge}</span>
                                    {s.title}
                                    <span className={styles.demoSourceChipOpen}>{s.external ? '↗' : '↓'}</span>
                                </motion.a>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className={styles.mirror}>
                <div className={styles.mirrorHeader}>
                    <motion.div className={`${styles.mirrorColLabel} ${styles.signalLabel}`} {...downIn(mirrorOffset)}>{signalsLabel}</motion.div>
                    <div className={styles.mirrorArrowSpacer} />
                    <motion.div className={`${styles.mirrorColLabel} ${styles.targetLabel}`} {...downIn(mirrorOffset)}>{targetLabel}</motion.div>
                </div>

                {pairs.map((pair, i) => {
                    const base = rowStart + i * rowGap;
                    return (
                        <div key={i} className={styles.mirrorRow}>
                            <motion.div className={`${styles.mirrorCell} ${styles.signalCell}`} {...leftIn(base)}>
                                <span className={styles.cellKey}>{pair.signal.k}</span>
                                <span className={styles.cellVal}>{pair.signal.v}</span>
                            </motion.div>
                            <motion.div className={styles.mirrorArrow} aria-hidden="true" {...wipe(base + arrowOffset)} />
                            <motion.div className={`${styles.mirrorCell} ${styles.targetCell}`} {...leftIn(base + targetOffset, -16)}>
                                <span className={styles.cellKey}>{pair.target.k}</span>
                                <span className={styles.cellVal}>{pair.target.v}</span>
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            <motion.div className={styles.launchFooter} {...downIn(launchAt, 0.6)}>
                <a
                    className={styles.launchButton}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className={styles.launchButtonIcon}>▶</span> {launchLabel}
                </a>
            </motion.div>
        </div>
    );
}

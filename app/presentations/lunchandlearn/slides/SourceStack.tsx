'use client';

import { motion } from 'framer-motion';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';
import type { SlideComponentProps } from '@/components/PresentationEngine';

interface Source {
    title: string;
    sub: string;
    badge: string;
    href: string;
    external?: boolean;
}

interface Punchline {
    stat: string;
    label: string;
}

// Resting "tossed on a desk" angles + offsets, one per card.
const REST = [
    { rotate: -3, y: 10 },
    { rotate: 2.5, y: -8 },
    { rotate: -2, y: 12 },
    { rotate: 3, y: -4 },
];

// Slide 4 "old way": the setup floats in from the top, then each real artifact
// slides in from the left one after the next (as if handed over from the prior
// one), settling onto its tilt. Once all four are down, the punchline wipes open
// left-to-right.
export default function SourceStack({ content, isVisible }: SlideComponentProps) {
    const setup = (content?.setup as string) || '';
    const sources = (content?.sources as Source[]) || [];
    const punchline = (content?.punchline as Punchline) || { stat: '', label: '' };

    const reduce = false; // run animations regardless of OS reduced-motion

    const cardStart = 0.7;
    const cardStagger = 0.45;
    const punchAt = cardStart + sources.length * cardStagger + 0.3;

    const setupAnim = {
        initial: { opacity: 0, y: reduce ? 0 : -18 },
        animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -18 },
        transition: { duration: reduce ? 0.25 : 0.8, ease: EASE },
    };

    const cardAnim = (i: number) => {
        const rest = REST[i % REST.length];
        const hidden = { opacity: 0, x: reduce ? 0 : -44, rotate: 0, y: 0 };
        return {
            initial: hidden,
            animate: isVisible
                ? { opacity: 1, x: 0, rotate: reduce ? 0 : rest.rotate, y: reduce ? 0 : rest.y }
                : hidden,
            transition: { delay: reduce ? 0 : cardStart + i * cardStagger, duration: reduce ? 0.25 : 0.6, ease: EASE },
        };
    };

    const punchHidden = reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 100% 0 0)' };
    const punchShown = reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0% 0 0)' };
    const punchAnim = {
        initial: punchHidden,
        animate: isVisible ? punchShown : punchHidden,
        transition: { delay: reduce ? 0 : punchAt, duration: reduce ? 0.25 : 0.7, ease: EASE },
    };

    return (
        <div className={styles.sourceStackContainer}>
            {setup && <motion.p className={styles.sourceSetup} {...setupAnim}>{setup}</motion.p>}

            <div className={styles.sourceScatter}>
                {sources.map((s, i) => (
                    <motion.a
                        key={i}
                        className={styles.sourceCard}
                        {...cardAnim(i)}
                        whileHover={reduce ? undefined : {
                            rotate: 0,
                            y: -10,
                            scale: 1.03,
                            transition: { duration: 0.35, ease: EASE },
                        }}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={styles.sourceBadge}>{s.badge}</span>
                        <span className={styles.sourceTitle}>{s.title}</span>
                        <span className={styles.sourceSub}>{s.sub}</span>
                        <span className={styles.sourceOpen}>
                            {s.external ? 'Open ↗' : 'Open ↓'}
                        </span>
                    </motion.a>
                ))}
            </div>

            {punchline?.stat && (
                <motion.div className={styles.sourcePunchline} {...punchAnim}>
                    <span className={styles.sourcePunchStat}>{punchline.stat}</span>
                    <span className={styles.sourcePunchLabel}>{punchline.label}</span>
                </motion.div>
            )}
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';

interface Point {
    label: string;
    text: string;
}

interface ChartContextProps {
    heading?: string;
    points?: Point[];
    isVisible?: boolean;
    reduce?: boolean;
    // Seconds: the context reveals after the chart has finished drawing its data.
    startDelay?: number;
}

// The reasoning column beside an impact chart. The heading and each point reveal
// in sequence once the chart's curves have landed, so the eye reads the chart
// first, then walks down the derivation.
export default function ChartContext({
    heading,
    points = [],
    isVisible = true,
    reduce = false,
    startDelay = 2.8,
}: ChartContextProps) {
    const headingAt = startDelay;
    const pointAt = startDelay + 0.35;
    const pointGap = 0.45;

    const reveal = (delay: number, dur = 0.6) => ({
        initial: { opacity: 0, x: reduce ? 0 : 18 },
        animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: reduce ? 0 : 18 },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });

    return (
        <div className={styles.chartContext}>
            {heading && (
                <motion.h4 className={styles.chartContextHeading} {...reveal(headingAt, 0.5)}>
                    {heading}
                </motion.h4>
            )}
            <ul className={styles.chartContextList}>
                {points.map((p, i) => (
                    <motion.li key={i} className={styles.chartContextItem} {...reveal(pointAt + i * pointGap)}>
                        <span className={styles.chartContextLabel}>{p.label}</span>
                        <span className={styles.chartContextText}>{p.text}</span>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}

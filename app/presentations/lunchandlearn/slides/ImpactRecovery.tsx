'use client';

import { motion } from 'framer-motion';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';
import { VW, VH, FM, PLOT_W, PLOT_H, fx, fy, ChartFrame, chartSchedule } from './ChartFrame';

interface ImpactRecoveryProps {
    title?: string;
    xLabel?: string;
    yLabel?: string;
    newLabel?: string;
    recoveredLabel?: string;
    endpointLabel?: string;
    caption?: string;
    basis?: string;
    total?: number;
    toolHours?: number;
    isVisible?: boolean;
    reduce?: boolean;
    startDelay?: number;
    clipId?: string;
}

const SAMPLES = 48;

export default function ImpactRecovery({
    title,
    xLabel = 'WEEKS',
    yLabel = 'HOURS',
    newLabel = 'With the tool',
    recoveredLabel = 'recovered',
    endpointLabel,
    caption,
    basis,
    total = 156,
    toolHours = 9,
    isVisible = true,
    reduce: reduceProp,
    startDelay = 0,
    clipId = 'recoverySavings',
}: ImpactRecoveryProps) {
    // Animations run regardless of OS reduced-motion (per request).
    const reduce = reduceProp ?? false;

    const oldF = (x: number) => x;
    const newF = (x: number) => (toolHours / total) * x;

    const sample = (f: (x: number) => number): [number, number][] =>
        Array.from({ length: SAMPLES + 1 }, (_, i) => {
            const x = i / SAMPLES;
            return [fx(x), fy(f(x))];
        });
    const toLine = (pts: [number, number][]) =>
        pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

    const oldPts = sample(oldF);
    const newPts = sample(newF);
    const areaPath =
        toLine(oldPts) +
        [...newPts].reverse().map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') +
        ' Z';

    const mx = 0.6;
    const recY = fy((oldF(mx) + newF(mx)) / 2);
    const oldEnd = oldPts[oldPts.length - 1];
    const newEnd = newPts[newPts.length - 1];
    const flag = endpointLabel || `${total} hrs`;

    const t = chartSchedule(startDelay);

    const fade = (delay: number, dur = 0.5, to = 1) => ({
        initial: { opacity: 0 },
        animate: { opacity: isVisible ? to : 0 },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });
    const draw = (delay: number, dur = 0.8) => ({
        initial: { pathLength: 0 },
        animate: { pathLength: isVisible ? 1 : 0 },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.3 : dur, ease: EASE },
    });

    return (
        <div className={styles.chartPanel}>
            {title && (
                <motion.h4
                    className={styles.chartTitle}
                    initial={{ opacity: 0, y: reduce ? 0 : -12 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -12 }}
                    transition={{ delay: reduce ? 0 : t.axes, duration: reduce ? 0.25 : 0.6, ease: EASE }}
                >
                    {title}
                </motion.h4>
            )}

            <svg viewBox={`0 0 ${VW} ${VH}`} className={styles.chartSvg} role="img" aria-label={title || 'Engineering hours recovered over the year'}>
                <defs>
                    <clipPath id={clipId}>
                        <motion.rect
                            x={FM.left}
                            y={FM.top}
                            height={PLOT_H}
                            initial={{ width: 0 }}
                            animate={{ width: isVisible ? PLOT_W : 0 }}
                            transition={{ delay: reduce ? 0 : t.diff, duration: reduce ? 0.25 : 0.7, ease: EASE }}
                        />
                    </clipPath>
                </defs>

                <ChartFrame
                    yLabel={yLabel}
                    xLabel={xLabel}
                    isVisible={isVisible}
                    reduce={reduce}
                    axesDelay={t.axes}
                    yLabelDelay={t.yLabel}
                    xLabelDelay={t.xLabel}
                />

                <path d={areaPath} className={styles.savingsArea} clipPath={`url(#${clipId})`} />
                <motion.text x={fx(mx)} y={recY} className={styles.savingsLabel} textAnchor="middle" {...fade(t.diff + 0.3, 0.6, 0.9)}>
                    {recoveredLabel}
                </motion.text>

                <motion.path d={toLine(oldPts)} className={`${styles.curvePath} ${styles.curveOld}`} {...draw(t.blackDraw)} />
                <motion.path d={toLine(newPts)} className={`${styles.curvePath} ${styles.curveNew}`} {...draw(t.orangeDraw)} />

                <motion.circle cx={oldEnd[0]} cy={oldEnd[1]} r={5} className={`${styles.endDot} ${styles.endDotOld}`} {...fade(t.blackLabel, 0.4)} />
                <motion.text x={oldEnd[0]} y={oldEnd[1] - 10} textAnchor="end" className={styles.recoveryTotal} {...fade(t.blackLabel, 0.5)}>
                    {flag}
                </motion.text>

                <motion.circle cx={newEnd[0]} cy={newEnd[1]} r={5} className={`${styles.endDot} ${styles.endDotNew}`} {...fade(t.orangeLabel, 0.4)} />
                <motion.text x={newEnd[0]} y={newEnd[1] - 14} textAnchor="end" className={`${styles.endLabel} ${styles.endLabelNew}`} {...fade(t.orangeLabel, 0.5)}>
                    {newLabel}
                </motion.text>
            </svg>

            {basis && (
                <motion.p
                    className={styles.recoveryBasis}
                    initial={{ opacity: 0, y: reduce ? 0 : -14 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -14 }}
                    transition={{ delay: reduce ? 0 : t.caption, duration: reduce ? 0.25 : 0.7, ease: EASE }}
                >
                    {basis}
                </motion.p>
            )}
            {caption && (
                <motion.p
                    className={styles.chartCaption}
                    initial={{ opacity: 0, y: reduce ? 0 : -14 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -14 }}
                    transition={{ delay: reduce ? 0 : t.caption + 0.15, duration: reduce ? 0.25 : 0.7, ease: EASE }}
                >
                    {caption}
                </motion.p>
            )}
        </div>
    );
}

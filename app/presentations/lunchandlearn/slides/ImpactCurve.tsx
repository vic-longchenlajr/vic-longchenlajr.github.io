'use client';

import { motion } from 'framer-motion';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';
import { VW, VH, FM, PLOT_W, PLOT_H, fx, fy, ChartFrame, chartSchedule } from './ChartFrame';

interface ImpactCurveProps {
    title?: string;
    xLabel?: string;
    yLabel?: string;
    oldLabel?: string;
    newLabel?: string;
    caption?: string;
    isVisible?: boolean;
    reduce?: boolean;
    startDelay?: number;
    clipId?: string;
}

// Illustrative model — we assert the SHAPE, not measured values (no numeric ticks).
const oldF = (x: number) => 0.34 + 0.14 * x + 0.52 * x * x;
const newF = (x: number) => 0.06 + 0.1 * x;

const SAMPLES = 48;
const sample = (f: (x: number) => number): [number, number][] =>
    Array.from({ length: SAMPLES + 1 }, (_, i) => {
        const x = i / SAMPLES;
        return [fx(x), fy(f(x))];
    });

const toLine = (pts: [number, number][]) =>
    pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

export default function ImpactCurve({
    title,
    xLabel,
    yLabel = 'EFFORT',
    oldLabel = 'Old method',
    newLabel = 'Vortex Builder',
    caption,
    isVisible = true,
    reduce: reduceProp,
    startDelay = 0,
    clipId = 'curveSavings',
}: ImpactCurveProps) {
    // Animations run regardless of OS reduced-motion (per request).
    const reduce = reduceProp ?? false;

    const oldPts = sample(oldF);
    const newPts = sample(newF);

    const areaPath =
        toLine(oldPts) +
        [...newPts].reverse().map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') +
        ' Z';

    const sxv = 0.6;
    const savingsY = fy((oldF(sxv) + newF(sxv)) / 2);
    const oldEnd = oldPts[oldPts.length - 1];
    const newEnd = newPts[newPts.length - 1];

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

            <svg viewBox={`0 0 ${VW} ${VH}`} className={styles.chartSvg} role="img" aria-label={title || 'Effort versus complexity'}>
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

                {/* Diff region slides open left-to-right via the animated clip */}
                <path d={areaPath} className={styles.savingsArea} clipPath={`url(#${clipId})`} />
                <motion.text x={fx(sxv)} y={savingsY} className={styles.savingsLabel} textAnchor="middle" {...fade(t.diff + 0.3, 0.6, 0.9)}>
                    your savings
                </motion.text>

                <motion.path d={toLine(oldPts)} className={`${styles.curvePath} ${styles.curveOld}`} {...draw(t.blackDraw)} />
                <motion.path d={toLine(newPts)} className={`${styles.curvePath} ${styles.curveNew}`} {...draw(t.orangeDraw)} />

                <motion.circle cx={oldEnd[0]} cy={oldEnd[1]} r={5} className={`${styles.endDot} ${styles.endDotOld}`} {...fade(t.blackLabel, 0.4)} />
                <motion.text x={oldEnd[0]} y={oldEnd[1] - 12} textAnchor="end" className={`${styles.endLabel} ${styles.endLabelOld}`} {...fade(t.blackLabel, 0.5)}>
                    {oldLabel}
                </motion.text>

                <motion.circle cx={newEnd[0]} cy={newEnd[1]} r={5} className={`${styles.endDot} ${styles.endDotNew}`} {...fade(t.orangeLabel, 0.4)} />
                <motion.text x={newEnd[0]} y={newEnd[1] - 14} textAnchor="end" className={`${styles.endLabel} ${styles.endLabelNew}`} {...fade(t.orangeLabel, 0.5)}>
                    {newLabel}
                </motion.text>
            </svg>

            {caption && (
                <motion.p
                    className={styles.chartCaption}
                    initial={{ opacity: 0, y: reduce ? 0 : -14 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -14 }}
                    transition={{ delay: reduce ? 0 : t.caption, duration: reduce ? 0.25 : 0.7, ease: EASE }}
                >
                    {caption}
                </motion.p>
            )}
        </div>
    );
}

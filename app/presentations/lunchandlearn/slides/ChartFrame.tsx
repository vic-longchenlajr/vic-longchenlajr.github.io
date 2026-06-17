'use client';

import { motion } from 'framer-motion';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';

// Shared frame for the two impact charts so they render as one system:
// identical viewBox, margins, baseline, top line, and dashed gridlines.
export const VW = 460;
export const VH = 300;
export const FM = { top: 22, right: 18, bottom: 46, left: 42 };
export const PLOT_W = VW - FM.left - FM.right;
export const PLOT_H = VH - FM.top - FM.bottom;
export const BASE_Y = FM.top + PLOT_H;

// t, v are 0..1 within the plot area.
export const fx = (t: number) => FM.left + t * PLOT_W;
export const fy = (v: number) => FM.top + (1 - v) * PLOT_H;

const GRID = [0.25, 0.5, 0.75, 1];

// One shared reveal schedule (seconds) so both charts sequence identically. `S`
// is the chart's start offset (Vortex = 0, VicFlex starts after the divider).
export function chartSchedule(S = 0) {
    return {
        axes: S + 0,
        blackDraw: S + 0.4,
        blackLabel: S + 1.2,
        orangeDraw: S + 1.4,
        orangeLabel: S + 2.2,
        diff: S + 2.5,
        yLabel: S + 3.2,
        xLabel: S + 3.45,
        caption: S + 3.7,
        end: S + 4.4,
    };
}

interface ChartFrameProps {
    yLabel?: string;
    xLabel?: string;
    isVisible?: boolean;
    reduce?: boolean;
    // Axes drop in first; the axis labels float in much later in the sequence.
    axesDelay?: number;
    yLabelDelay?: number;
    xLabelDelay?: number;
}

export function ChartFrame({
    yLabel,
    xLabel,
    isVisible = true,
    reduce = false,
    axesDelay = 0,
    yLabelDelay = 0,
    xLabelDelay = 0,
}: ChartFrameProps) {
    const drop = (delay: number, dur = 0.6) => ({
        initial: { opacity: 0, y: reduce ? 0 : -10 },
        animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -10 },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });
    const fromLeft = (delay: number, dur = 0.6) => ({
        initial: { opacity: 0, x: reduce ? 0 : -12 },
        animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: reduce ? 0 : -12 },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });

    return (
        <>
            <motion.g {...drop(axesDelay)}>
                {GRID.map((v, i) => (
                    <line key={i} x1={FM.left} y1={fy(v)} x2={FM.left + PLOT_W} y2={fy(v)} className={styles.chartGrid} />
                ))}
                <line x1={FM.left} y1={FM.top} x2={FM.left} y2={BASE_Y} className={styles.chartAxis} />
                <line x1={FM.left} y1={BASE_Y} x2={FM.left + PLOT_W} y2={BASE_Y} className={styles.chartAxis} />
            </motion.g>

            {yLabel && (
                <motion.g {...fromLeft(yLabelDelay)}>
                    <text
                        x={14}
                        y={FM.top + PLOT_H / 2}
                        textAnchor="middle"
                        transform={`rotate(-90 14 ${FM.top + PLOT_H / 2})`}
                        className={styles.chartAxisLabel}
                    >
                        {yLabel}
                    </text>
                </motion.g>
            )}
            {xLabel && (
                <motion.text
                    x={FM.left + PLOT_W / 2}
                    y={VH - 10}
                    textAnchor="middle"
                    className={styles.chartAxisLabel}
                    {...drop(xLabelDelay)}
                >
                    {xLabel}
                </motion.text>
            )}
        </>
    );
}

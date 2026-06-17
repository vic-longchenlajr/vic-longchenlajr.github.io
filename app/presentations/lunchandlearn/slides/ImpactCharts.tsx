'use client';

import { motion } from 'framer-motion';
import styles from './slides.module.css';
import { EASE } from '@/components/PresentationEngine/motion';
import type { SlideComponentProps } from '@/components/PresentationEngine';
import ImpactCurve from './ImpactCurve';
import ImpactRecovery from './ImpactRecovery';
import { chartSchedule } from './ChartFrame';

interface CurveContent {
    title?: string;
    xLabel?: string;
    yLabel?: string;
    oldLabel?: string;
    newLabel?: string;
    caption?: string;
}

interface RecoveryContent {
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
}

// Slide 8 impact: the Vortex curve builds fully, the central divider draws
// top-to-bottom, then the VicFlex recovery curve repeats the same sequence.
export default function ImpactCharts({ content, isVisible }: SlideComponentProps) {
    const curve = (content?.curve as CurveContent) || {};
    const recovery = (content?.recovery as RecoveryContent) || {};

    const reduce = false; // run animations regardless of OS reduced-motion

    const dividerAt = chartSchedule(0).end; // after Vortex finishes
    const dividerDur = 0.5;
    const vicflexStart = dividerAt + dividerDur + 0.1;

    return (
        <div className={styles.impactChartsContainer}>
            <ImpactCurve {...curve} isVisible={isVisible} reduce={reduce} startDelay={0} clipId="vortexSavings" />

            <motion.div
                className={styles.chartDivider}
                initial={{ scaleY: reduce ? 1 : 0, opacity: reduce ? 0 : 1 }}
                animate={isVisible ? { scaleY: 1, opacity: 1 } : { scaleY: reduce ? 1 : 0, opacity: reduce ? 0 : 1 }}
                transition={{ delay: reduce ? 0 : dividerAt, duration: reduce ? 0.25 : dividerDur, ease: EASE }}
            />

            <ImpactRecovery {...recovery} isVisible={isVisible} reduce={reduce} startDelay={vicflexStart} clipId="vicflexSavings" />
        </div>
    );
}

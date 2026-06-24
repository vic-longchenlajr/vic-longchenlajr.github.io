'use client';

import styles from './slides.module.css';
import type { SlideComponentProps } from '@/components/PresentationEngine';
import ImpactCurve from './ImpactCurve';
import ChartContext from './ChartContext';

interface Point {
    label: string;
    text: string;
}

// Slide: Vortex effort-vs-complexity curve. Two-column split — the illustrative
// curve on the left, the "how the curve is shaped" reasoning on the right.
export default function VortexImpact({ content, isVisible }: SlideComponentProps) {
    const c = content || {};
    const context = (c.context as { heading?: string; points?: Point[] }) || {};
    return (
        <div className={styles.impactSplit}>
            <div className={styles.impactSplitChart}>
                <ImpactCurve
                    xLabel={c.xLabel as string}
                    yLabel={c.yLabel as string}
                    oldLabel={c.oldLabel as string}
                    newLabel={c.newLabel as string}
                    isVisible={isVisible}
                    startDelay={0}
                    clipId="vortexSavings"
                />
            </div>
            <ChartContext
                heading={context.heading}
                points={context.points}
                isVisible={isVisible}
                startDelay={2.8}
            />
        </div>
    );
}

'use client';

import styles from './slides.module.css';
import type { SlideComponentProps } from '@/components/PresentationEngine';
import ImpactRecovery from './ImpactRecovery';
import ChartContext from './ChartContext';

interface Point {
    label: string;
    text: string;
}

// Slide: VicFlex engineering hours recovered. Two-column split — the measured
// recovery chart on the left, the "how we measured it" derivation on the right.
export default function VicflexImpact({ content, isVisible }: SlideComponentProps) {
    const c = content || {};
    const context = (c.context as { heading?: string; points?: Point[] }) || {};
    return (
        <div className={styles.impactSplit}>
            <div className={styles.impactSplitChart}>
                <ImpactRecovery
                    xLabel={c.xLabel as string}
                    yLabel={c.yLabel as string}
                    newLabel={c.newLabel as string}
                    recoveredLabel={c.recoveredLabel as string}
                    endpointLabel={c.endpointLabel as string}
                    total={c.total as number}
                    toolHours={c.toolHours as number}
                    isVisible={isVisible}
                    startDelay={0}
                    clipId="vicflexSavings"
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

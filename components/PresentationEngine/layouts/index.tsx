import type { SlideDefinition } from '../types';
import { HeroLayout } from './HeroLayout';
import { FlowLayout } from './FlowLayout';
import { ComparisonLayout } from './ComparisonLayout';
import { TransformLayout } from './TransformLayout';
import { GridLayout } from './GridLayout';
import { HighlightLayout } from './HighlightLayout';
import { MetricsLayout } from './MetricsLayout';
import { BoardLayout } from './BoardLayout';
import { DemoLayout } from './DemoLayout';

type LayoutStyles = Record<string, string>;

export function resolveLayout(
    slide: SlideDefinition,
    isVisible: boolean,
    engineStyles: LayoutStyles
): React.ReactNode {
    const content = slide.content || {};

    switch (slide.layout) {
        case 'hero':
            return <HeroLayout slide={slide} content={content} />;
        case 'flow':
            return <FlowLayout content={content} isVisible={isVisible} engineStyles={engineStyles} />;
        case 'comparison':
            return <ComparisonLayout content={content} />;
        case 'transform':
            return <TransformLayout content={content} isVisible={isVisible} engineStyles={engineStyles} />;
        case 'grid':
            return <GridLayout content={content} />;
        case 'highlight':
            return <HighlightLayout content={content} />;
        case 'metrics':
            return <MetricsLayout content={content} />;
        case 'board':
            return <BoardLayout content={content} />;
        case 'demo':
            return <DemoLayout content={content} />;
        default:
            return (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>No layout template for: <strong>{slide.layout}</strong></p>
                    <p>Use a custom component via the <code>component</code> field.</p>
                </div>
            );
    }
}

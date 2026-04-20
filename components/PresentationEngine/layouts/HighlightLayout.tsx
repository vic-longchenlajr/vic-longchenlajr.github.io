import layoutStyles from './layouts.module.css';

interface HighlightLayoutProps {
    content: Record<string, unknown>;
}

export const HighlightLayout = ({ content }: HighlightLayoutProps) => {
    const problemTitle = (content.problemTitle as string) || 'High-Frequency Bottleneck';
    const problemDesc = (content.problemDescription as string) || '';
    const metric = (content.metric as string) || '';
    const metricLabel = (content.metricLabel as string) || '';
    const secondaryMetric = content.secondaryMetric as string | undefined;
    const secondaryMetricLabel = content.secondaryMetricLabel as string | undefined;
    const results = (content.results as string[]) || [];

    return (
        <div className={layoutStyles.highlightContainer}>
            <div className={layoutStyles.highlightProblem}>
                <h4>{problemTitle}</h4>
                <p>{problemDesc}</p>
            </div>
            <div className={layoutStyles.highlightImpact}>
                <div className={layoutStyles.highlightMetric}>{metric}</div>
                <div className={layoutStyles.highlightMetricLabel}>{metricLabel}</div>
                {secondaryMetric && (
                    <div className={layoutStyles.highlightSecondary}>
                        <div className={layoutStyles.highlightSecondaryMetric}>{secondaryMetric}</div>
                        {secondaryMetricLabel && (
                            <div className={layoutStyles.highlightSecondaryLabel}>{secondaryMetricLabel}</div>
                        )}
                    </div>
                )}
            </div>
            <div className={layoutStyles.highlightResult}>
                <ul>
                    {results.map((r, i) => (
                        <li key={i}>{r}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

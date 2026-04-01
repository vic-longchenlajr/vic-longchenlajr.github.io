import layoutStyles from './layouts.module.css';

interface KPI {
    label: string;
    value: string;
    sub: string;
    type?: string;
}

interface Milestone {
    label: string;
    date: string;
}

interface MetricsLayoutProps {
    content: Record<string, unknown>;
}

export const MetricsLayout = ({ content }: MetricsLayoutProps) => {
    const kpis = (content.kpis as KPI[]) || [];
    const milestones = (content.milestones as Milestone[]) || [];

    return (
        <div className={layoutStyles.metricsContainer}>
            <div className={layoutStyles.metricsGrid}>
                {kpis.map((k, i) => (
                    <div key={i} className={layoutStyles.metricCard}>
                        {k.type && <div className={layoutStyles.metricType}>{k.type}</div>}
                        <div className={layoutStyles.metricValue}>{k.value}</div>
                        <div className={layoutStyles.metricLabel}>{k.label}</div>
                        <div className={layoutStyles.metricSub}>{k.sub}</div>
                    </div>
                ))}
            </div>
            {milestones.length > 0 && (
                <div className={layoutStyles.milestoneContainer}>
                    {milestones.map((m, i) => (
                        <div key={i} className={layoutStyles.milestone}>
                            <div className={layoutStyles.milestoneLabel}>{m.label}</div>
                            <div className={layoutStyles.milestoneDate}>{m.date}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

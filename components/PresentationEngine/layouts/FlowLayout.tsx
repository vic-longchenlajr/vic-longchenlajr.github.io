import layoutStyles from './layouts.module.css';

interface FlowStage {
    title: string;
    bullets: string[];
}

interface FlowLayoutProps {
    content: Record<string, unknown>;
    isVisible: boolean;
    engineStyles: Record<string, string>;
}

export const FlowLayout = ({ content }: FlowLayoutProps) => {
    const stages = (content.stages as FlowStage[]) || [];
    const caption = (content.caption as string) || '';

    return (
        <div className={layoutStyles.flowContainer}>
            <div className={layoutStyles.flowStages}>
                {stages.map((stage, i) => (
                    <div key={i} className={layoutStyles.flowStage}>
                        <div className={layoutStyles.flowStageHeader}>
                            {stage.title}
                            {i < stages.length - 1 && <div className={layoutStyles.flowStageArrow}>→</div>}
                        </div>
                        <ul className={layoutStyles.flowBullets}>
                            {stage.bullets.map((b, j) => (
                                <li key={j}>{b}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {caption && <div className={layoutStyles.flowCaption}>{caption}</div>}
        </div>
    );
};

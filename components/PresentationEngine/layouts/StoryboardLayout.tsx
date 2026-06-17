import layoutStyles from './layouts.module.css';

interface StoryStep {
    title: string;
    detail?: string;
}

interface StoryboardLayoutProps {
    content: Record<string, unknown>;
}

export const StoryboardLayout = ({ content }: StoryboardLayoutProps) => {
    const setup = (content.setup as string) || '';
    const steps = (content.steps as StoryStep[]) || [];
    const punchline = content.punchline as { stat?: string; label?: string } | undefined;

    return (
        <div className={layoutStyles.storyboardContainer}>
            {setup && <p className={layoutStyles.storyboardSetup}>{setup}</p>}

            <div className={layoutStyles.storyboardTrack}>
                {steps.map((step, i) => (
                    <div key={i} className={layoutStyles.storyboardStep}>
                        <div className={layoutStyles.storyboardNum}>
                            {String(i + 1).padStart(2, '0')}
                        </div>
                        <div className={layoutStyles.storyboardStepBody}>
                            <div className={layoutStyles.storyboardStepTitle}>{step.title}</div>
                            {step.detail && (
                                <div className={layoutStyles.storyboardStepDetail}>{step.detail}</div>
                            )}
                        </div>
                        {i < steps.length - 1 && (
                            <div className={layoutStyles.storyboardArrow}>→</div>
                        )}
                    </div>
                ))}
            </div>

            {punchline && (
                <div className={layoutStyles.storyboardPunchline}>
                    {punchline.stat && (
                        <span className={layoutStyles.storyboardPunchStat}>{punchline.stat}</span>
                    )}
                    {punchline.label && (
                        <span className={layoutStyles.storyboardPunchLabel}>{punchline.label}</span>
                    )}
                </div>
            )}
        </div>
    );
};

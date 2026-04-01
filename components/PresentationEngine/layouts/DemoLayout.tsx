import layoutStyles from './layouts.module.css';

interface DemoLayoutProps {
    content: Record<string, unknown>;
}

export const DemoLayout = ({ content }: DemoLayoutProps) => {
    const steps = (content.steps as string[]) || [];
    const activeStep = (content.activeStep as number) || 1;
    const title = (content.title as string) || 'DEMO MODE ACTIVE';
    const description = (content.description as string) || 'Interactive platform view ready for live walkthrough.';
    const buttonLabel = (content.buttonLabel as string) || 'LAUNCH';
    const icon = (content.icon as string) || '🏗️';

    return (
        <div className={layoutStyles.demoContainer}>
            <div className={layoutStyles.demoStepper}>
                {steps.map((step, i) => (
                    <div
                        key={step}
                        className={`${layoutStyles.demoStep} ${i + 1 === activeStep ? layoutStyles.demoStepActive : ''}`}
                    >
                        STEP {String(i + 1).padStart(2, '0')}: {step}
                    </div>
                ))}
            </div>
            <div className={layoutStyles.demoPreview}>
                <div className={layoutStyles.demoPreviewInner}>
                    <div className={layoutStyles.demoIcon}>{icon}</div>
                    <h3>{title}</h3>
                    <p className={layoutStyles.demoDesc}>{description}</p>
                    <button className={layoutStyles.demoButton}>{buttonLabel}</button>
                </div>
            </div>
        </div>
    );
};

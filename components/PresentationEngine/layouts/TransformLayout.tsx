import layoutStyles from './layouts.module.css';

interface TransformLayoutProps {
    content: Record<string, unknown>;
    isVisible: boolean;
    engineStyles: Record<string, string>;
}

export const TransformLayout = ({ content, isVisible }: TransformLayoutProps) => {
    const beforeLabel = (content.beforeLabel as string) || 'BEFORE';
    const afterLabel = (content.afterLabel as string) || 'AFTER';
    const centerLabel = (content.centerLabel as string) || '';
    const beforeItems = (content.beforeItems as string[]) || [];
    const centerItems = (content.centerItems as string[]) || [];
    const afterItems = (content.afterItems as string[]) || [];
    const beforeCaption = (content.beforeCaption as string) || '';
    const centerCaption = (content.centerCaption as string) || '';
    const afterCaption = (content.afterCaption as string) || '';

    const visClass = isVisible ? layoutStyles.visible : '';

    return (
        <div className={layoutStyles.transformFlow}>
            {/* Before */}
            <div className={layoutStyles.transformCol}>
                <h4 className={layoutStyles.transformColLabel}>{beforeLabel}</h4>
                <div className={`${layoutStyles.transformStack} ${visClass}`}>
                    {beforeItems.map((item, i) => (
                        <div key={i} className={layoutStyles.transformCard}>{item}</div>
                    ))}
                </div>
                {beforeCaption && <div className={layoutStyles.transformCaption}>{beforeCaption}</div>}
            </div>

            <div className={layoutStyles.transformArrow}>→</div>

            {/* Center */}
            <div className={layoutStyles.transformCol}>
                <h4 className={layoutStyles.transformColLabel}>{centerLabel}</h4>
                <div className={`${layoutStyles.transformEngine} ${visClass}`}>
                    <div className={layoutStyles.transformEngineHeader}>VALIDATION ENGINE</div>
                    <div className={layoutStyles.transformEngineBody}>
                        {centerItems.map((item, i) => (
                            <div key={i} className={layoutStyles.transformEngineModule}>{item}</div>
                        ))}
                    </div>
                </div>
                {centerCaption && <div className={layoutStyles.transformCaption}>{centerCaption}</div>}
            </div>

            <div className={layoutStyles.transformArrow}>→</div>

            {/* After */}
            <div className={layoutStyles.transformCol}>
                <h4 className={layoutStyles.transformColLabel}>{afterLabel}</h4>
                <div className={layoutStyles.transformOutputStack}>
                    {afterItems.map((item, i) => (
                        <div key={i} className={`${layoutStyles.transformOutputTile} ${visClass}`}>
                            <span className={layoutStyles.transformCheck}>✓</span>
                            {item}
                        </div>
                    ))}
                </div>
                {afterCaption && <div className={layoutStyles.transformCaption}>{afterCaption}</div>}
            </div>
        </div>
    );
};

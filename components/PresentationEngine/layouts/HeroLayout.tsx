import type { SlideDefinition } from '../types';
import layoutStyles from './layouts.module.css';

interface HeroLayoutProps {
    slide: SlideDefinition;
    content: Record<string, unknown>;
}

export const HeroLayout = ({ slide, content }: HeroLayoutProps) => {
    const heading = (content.heading as string) || slide.title;
    const tagline = (content.tagline as string) || slide.subtitle || '';
    const stat = content.stat as string | undefined;
    const statLabel = content.statLabel as string | undefined;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                maxWidth: 800,
                margin: '0 auto'
            }}>
                <h1 style={{ marginBottom: 20 }}>{heading}</h1>
                {tagline && (
                    <p style={{
                        fontSize: '1.2rem',
                        opacity: 0.85,
                        color: 'white',
                        fontWeight: 600,
                    }}>
                        {tagline}
                    </p>
                )}
                {stat && (
                    <div className={layoutStyles.heroStat}>
                        <span className={layoutStyles.heroStatValue}>{stat}</span>
                        {statLabel && <span className={layoutStyles.heroStatLabel}>{statLabel}</span>}
                    </div>
                )}
            </div>
        </div>
    );
};

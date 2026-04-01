import type { SlideDefinition } from '../types';

interface HeroLayoutProps {
    slide: SlideDefinition;
    content: Record<string, unknown>;
}

export const HeroLayout = ({ slide, content }: HeroLayoutProps) => {
    const heading = (content.heading as string) || slide.title;
    const tagline = (content.tagline as string) || slide.subtitle || '';

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
            </div>
        </div>
    );
};

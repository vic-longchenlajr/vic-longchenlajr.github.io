import styles from '../PresentationEngine.module.css';
import { SlideHeader } from './SlideHeader';
import { TakeawayBand } from './TakeawayBand';
import type { SlideDefinition } from '../types';

interface SlideShellProps {
    slide: SlideDefinition;
    index: number;
    total: number;
    isVisible: boolean;
    layoutClassName?: string;
    children: React.ReactNode;
}

export const SlideShell = ({
    slide,
    index,
    total,
    isVisible,
    layoutClassName,
    children
}: SlideShellProps) => {
    const showFooter = !slide.hideTakeaway && !!slide.takeaway;
    const showHeader = index > 0;

    const classNames = [
        styles.slide,
        layoutClassName || '',
        isVisible ? styles.visible : '',
        showFooter ? styles.hasFooter : styles.noFooter,
        !showHeader ? styles.noHeader : ''
    ].filter(Boolean).join(' ');

    return (
        <section data-index={index} className={classNames}>
            {showHeader && (
                <SlideHeader
                    title={slide.title}
                    subtitle={slide.subtitle}
                    breadcrumb={slide.breadcrumb}
                    index={index}
                    total={total}
                />
            )}
            <main className={styles.mainZone}>
                <div className={`${styles.animateIn} ${styles.mainInner}`}>
                    {children}
                </div>
            </main>
            {showFooter && <TakeawayBand text={slide.takeaway!} />}
        </section>
    );
};

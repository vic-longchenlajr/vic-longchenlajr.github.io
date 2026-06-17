import styles from '../PresentationEngine.module.css';
import { TakeawayBand } from './TakeawayBand';
import type { SlideDefinition } from '../types';

interface SlideShellProps {
    slide: SlideDefinition;
    index: number;
    total: number;
    framedFooter?: boolean;
    layoutClassName?: string;
    children: React.ReactNode;
}

export const SlideShell = ({
    slide,
    index,
    framedFooter = false,
    layoutClassName,
    children
}: SlideShellProps) => {
    // framedFooter mode: keep the gradient band as a frame on every content
    // slide, but never render takeaway text. Otherwise: show the takeaway band
    // only when the slide has a takeaway and it isn't hidden.
    const showFooter = framedFooter ? index > 0 : (!slide.hideTakeaway && !!slide.takeaway);
    const showHeader = index > 0;

    // These layouts (and all custom components) own their entrance animation via
    // framer-motion, so the shell's container fade-up would double up — skip it.
    const selfAnimated = ['hero', 'intro', 'grid', 'custom'].includes(slide.layout);

    const classNames = [
        styles.slide,
        layoutClassName || '',
        showFooter ? styles.hasFooter : styles.noFooter,
        !showHeader ? styles.noHeader : ''
    ].filter(Boolean).join(' ');

    return (
        <section data-index={index} className={classNames}>
            {/* The header chrome is now persistent (rendered once by the engine);
                each slide just reserves the header-row space + divider line. */}
            {showHeader && <div className={styles.headerZone} aria-hidden="true" />}
            <main className={styles.mainZone}>
                <div className={selfAnimated ? styles.mainInner : `${styles.animateIn} ${styles.mainInner}`}>
                    {children}
                </div>
            </main>
            {showFooter && (framedFooter
                ? <div className={styles.footerZone} aria-hidden="true" />
                : <TakeawayBand text={slide.takeaway!} />
            )}
        </section>
    );
};

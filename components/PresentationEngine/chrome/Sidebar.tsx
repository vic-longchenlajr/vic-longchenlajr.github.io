import styles from '../PresentationEngine.module.css';
import type { PresentationMeta, SlideDefinition } from '../types';

interface SidebarProps {
    meta: PresentationMeta;
    slides: SlideDefinition[];
    currentIndex: number;
    onNavigate: (index: number) => void;
}

export const Sidebar = ({ meta, slides, currentIndex, onNavigate }: SidebarProps) => (
    <aside className={styles.sidebarTracker}>
        <div className={styles.sidebarHeader}>
            <h4 className={styles.sidebarTitle}>{meta.sidebarTitle || meta.title}</h4>
            {meta.sidebarSubtitle && (
                <p className={styles.sidebarSubtitle}>{meta.sidebarSubtitle}</p>
            )}
            {meta.presenter && (
                <p className={styles.sidebarPresenter}>
                    Presenter: {meta.presenter}{meta.department ? ` - ${meta.department}` : ''}
                </p>
            )}
        </div>
        {slides.map((slide, index) => (
            <div
                key={slide.id}
                className={`${styles.progressItem} ${index === currentIndex ? styles.activeProgress : ''}`}
                onClick={() => onNavigate(index)}
            >
                <span className={styles.progressIndex}>
                    {String(index + 1).padStart(2, '0')}
                </span>
                {slide.title}
            </div>
        ))}
        <div className={styles.sidebarFooter}>
            Press &apos;N&apos; for presenter notes
        </div>
    </aside>
);

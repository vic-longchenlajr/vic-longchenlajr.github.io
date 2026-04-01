import styles from '../PresentationEngine.module.css';
import { ProgressDots } from './ProgressDots';

interface SlideHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumb: string;
    index: number;
    total: number;
}

export const SlideHeader = ({ title, subtitle, breadcrumb, index, total }: SlideHeaderProps) => (
    <div className={styles.headerZone}>
        <div className={styles.animateIn}>
            <h2 className={styles.headerTitle}>{title}</h2>
            {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
        </div>
        <div className={`${styles.animateIn} ${styles.headerInfo}`}>
            <div className={styles.breadcrumb}>{breadcrumb}</div>
            <ProgressDots current={index} total={total} />
        </div>
    </div>
);

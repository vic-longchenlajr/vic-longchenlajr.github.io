import styles from '../PresentationEngine.module.css';

interface MobileProgressProps {
    currentIndex: number;
    total: number;
    currentTitle: string;
}

export const MobileProgress = ({ currentIndex, total, currentTitle }: MobileProgressProps) => (
    <div className={styles.mobileProgress}>
        <div className={styles.mobileProgressTrack}>
            <div
                className={styles.mobileProgressFill}
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
        </div>
        <div className={styles.mobileProgressLabel}>
            {currentTitle}
        </div>
    </div>
);

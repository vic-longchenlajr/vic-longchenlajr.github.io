import styles from '../PresentationEngine.module.css';

interface ProgressDotsProps {
    current: number;
    total: number;
}

export const ProgressDots = ({ current, total }: ProgressDotsProps) => (
    <div className={styles.progressDots}>
        {Array.from({ length: total }).map((_, i) => (
            <div
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            />
        ))}
        <span className={styles.dotCounter}>
            {String(current + 1).padStart(2, '0')} / {total}
        </span>
    </div>
);

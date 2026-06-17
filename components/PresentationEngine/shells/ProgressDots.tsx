import styles from '../PresentationEngine.module.css';

interface ProgressDotsProps {
    current: number;
    total: number;
}

export const ProgressDots = ({ current, total }: ProgressDotsProps) => (
    <div className={styles.progressDots}>
        {Array.from({ length: total }).map((_, i) => {
            const state =
                i < current ? styles.dotPast : i === current ? styles.dotActive : styles.dotFuture;
            return <div key={i} className={`${styles.dot} ${state}`} />;
        })}
        <span className={styles.dotCounter}>
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
    </div>
);

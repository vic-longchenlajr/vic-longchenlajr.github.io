import styles from '../PresentationEngine.module.css';

interface TakeawayBandProps {
    text: string;
}

export const TakeawayBand = ({ text }: TakeawayBandProps) => (
    <div className={styles.footerZone}>
        <div className={`${styles.animateIn} ${styles.footerInner}`}>
            <div className={styles.takeawayBadge}>TAKEAWAY</div>
            <p className={styles.takeawayText}>{text}</p>
        </div>
    </div>
);

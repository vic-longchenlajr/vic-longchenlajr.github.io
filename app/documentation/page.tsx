import Link from 'next/link';
import styles from './documentation.module.css';

export default function DocumentationPage() {
    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <div className={styles.headerInner}>
                    <h1 className={styles.pageTitle}>Documentation</h1>
                    <p className={styles.pageSubtitle}>
                        Software development documentation, procedures, and best practices for the
                        Fire Suppression Technology team.
                    </p>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.cardGrid}>
                    <Link href="/documentation/summary" className={styles.card}>
                        <div className={styles.cardLabel}>Portfolio</div>
                        <h2 className={styles.cardTitle}>Summary</h2>
                        <p className={styles.cardDesc}>Executive summary and engineering portfolio pillars.</p>
                    </Link>
                    <Link href="/documentation/bestpractices" className={styles.card}>
                        <div className={styles.cardLabel}>Standards</div>
                        <h2 className={styles.cardTitle}>Best Practices</h2>
                        <p className={styles.cardDesc}>Software development procedures and standards.</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}

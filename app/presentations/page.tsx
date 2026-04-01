import Link from 'next/link';
import styles from './presentations.module.css';

export default function PresentationsPage() {
    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <div className={styles.headerInner}>
                    <h1 className={styles.pageTitle}>Presentations</h1>
                    <p className={styles.pageSubtitle}>
                        Technical deep-dives and engineering case studies
                    </p>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.cardList}>
                    <Link href="/presentations/ai-user-group-session-2" className={styles.card}>
                        <div className={styles.cardLabel}>AI User Group</div>
                        <h3 className={styles.cardTitle}>
                            Session 2 &mdash; From Guidelines to Workflows
                        </h3>
                        <p className={styles.cardDesc}>
                            Shifting from AI policy to practice. Real workflows, practical techniques, and
                            hands-on demonstrations of AI-assisted engineering development.
                        </p>
                    </Link>

                    <Link href="/presentations/lunchandlearn" className={styles.card}>
                        <div className={styles.cardLabel}>Engineering Lunch &amp; Learn</div>
                        <h3 className={styles.cardTitle}>
                            From Workflow Friction to Validated Systems
                        </h3>
                        <p className={styles.cardDesc}>
                            Cross-functional engineering workflows translated into reliable, scalable software
                            platforms. Explore the process, principles, and impact of building internal
                            engineering tools.
                        </p>
                    </Link>
                </div>
            </main>
        </div>
    );
}

import Link from 'next/link';
import styles from './home.module.css';

export default function Home() {
    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <div className={styles.headerInner}>
                    <h1 className={styles.pageTitle}>Chenla Long, Jr.</h1>
                    <p className={styles.pageSubtitle}>
                        Building scalable engineering systems that reduce operational risk and accelerate technical
                        decision-making across the fire protection lifecycle.
                    </p>
                    <div className={styles.headerStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>5</span>
                            <span className={styles.statLabel}>Active Projects</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>11</span>
                            <span className={styles.statLabel}>Total Projects</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>2</span>
                            <span className={styles.statLabel}>Presentations</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.mainContent}>
                <section className={styles.overview}>
                    <h2 className={styles.overviewTitle}>Portfolio Overview</h2>
                    <p className={styles.overviewText}>
                        This portfolio documents my work architecting configuration-driven software platforms
                        that bridge hardware R&D, lab testing, and global sales engineering at Victaulic.
                    </p>
                    <p className={styles.overviewSubtext}>
                        Navigate through the sections below to explore my project timeline, documentation,
                        and technical presentations.
                    </p>
                </section>

                <div className={styles.cardGrid}>
                    <Link href="/projects" className={`${styles.card} ${styles.cardOrange}`}>
                        <div className={`${styles.cardLabel} ${styles.cardLabelOrange}`}>Interactive Timeline</div>
                        <h3 className={styles.cardTitle}>Projects</h3>
                        <p className={styles.cardDesc}>
                            Explore my complete project history with an interactive timeline.
                            Navigate through each project to see problems solved, solutions delivered, and impact created.
                        </p>
                    </Link>

                    <Link href="/documentation" className={`${styles.card} ${styles.cardBlue}`}>
                        <div className={`${styles.cardLabel} ${styles.cardLabelBlue}`}>Standards &amp; Practices</div>
                        <h3 className={styles.cardTitle}>Documentation</h3>
                        <p className={styles.cardDesc}>
                            Engineering capability summary organized by domain, and standardized software development
                            practices for the Fire Suppression Technology team.
                        </p>
                    </Link>

                    <Link href="/presentations" className={`${styles.card} ${styles.cardBlack}`}>
                        <div className={`${styles.cardLabel} ${styles.cardLabelBlack}`}>Deep Dives</div>
                        <h3 className={styles.cardTitle}>Presentations</h3>
                        <p className={styles.cardDesc}>
                            Full-screen technical presentations covering AI-assisted development workflows
                            and engineering system case studies.
                        </p>
                    </Link>
                </div>
            </main>
        </div>
    );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './documentation.module.css';

export const metadata: Metadata = { title: 'Documentation' };

export default function DocumentationPage() {
    return (
        <div className={styles.page}>
            <main className={styles.mainContent}>
                <nav className={styles.breadcrumb}>
                    <Link href="/" className={styles.breadcrumbLink}>FS³</Link>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2" style={{ stroke: "var(--text-faint)" }}><polyline points="9 18 15 12 9 6" /></svg>
                    <span className={styles.breadcrumbCurrent}>Documentation</span>
                </nav>

                <h1 className={styles.pageTitle}>Documentation</h1>
                <p className={styles.pageSubtitle}>
                    Software development documentation, procedures, and best practices for the
                    Fire Suppression Technology team.
                </p>

                <div className={styles.cardGrid}>
                    <Link href="/documentation/summary" className={styles.card}>
                        <div className={styles.cardLabelRow}>
                            <span className={styles.cardAccent} style={{ background: '#E87722' }} />
                            <span className={styles.cardLabel} style={{ color: '#E87722' }}>Portfolio</span>
                        </div>
                        <h2 className={styles.cardTitle}>Summary</h2>
                        <p className={styles.cardDesc}>Executive summary and engineering portfolio pillars.</p>
                        <span className={styles.cardAffordance}>Read ›</span>
                    </Link>
                    <Link href="/documentation/bestpractices" className={styles.card}>
                        <div className={styles.cardLabelRow}>
                            <span className={styles.cardAccent} style={{ background: '#5DCAA5' }} />
                            <span className={styles.cardLabel} style={{ color: '#5DCAA5' }}>Standards</span>
                        </div>
                        <h2 className={styles.cardTitle}>Best Practices</h2>
                        <p className={styles.cardDesc}>Software development procedures and standards.</p>
                        <span className={styles.cardAffordance}>Read ›</span>
                    </Link>
                    <Link href="/documentation/guide-fire-vault" className={styles.card}>
                        <div className={styles.cardLabelRow}>
                            <span className={styles.cardAccent} style={{ background: '#4db8e0' }} />
                            <span className={styles.cardLabel} style={{ color: '#4db8e0' }}>GUIDE</span>
                        </div>
                        <h2 className={styles.cardTitle}>Fire Vault</h2>
                        <p className={styles.cardDesc}>Comprehensive user guide for the Fire Vault, a workflow automation system powered by Claude Code processed journal entries.</p>
                        <span className={styles.cardAffordance}>Read ›</span>
                    </Link>
                    <Link href="/documentation/guide-personal-vault" className={styles.card}>
                        <div className={styles.cardLabelRow}>
                            <span className={styles.cardAccent} style={{ background: '#a78bfa' }} />
                            <span className={styles.cardLabel} style={{ color: '#a78bfa' }}>Guide</span>
                        </div>
                        <h2 className={styles.cardTitle}>Personal Vault</h2>
                        <p className={styles.cardDesc}>Build a personal knowledge system with Obsidian and Claude Code.</p>
                        <span className={styles.cardAffordance}>Read ›</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}

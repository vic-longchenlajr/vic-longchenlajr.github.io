import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './presentations.module.css';

export const metadata: Metadata = { title: 'Presentations' };

export default function PresentationsPage() {
    return (
      <div className={styles.page}>
        <main className={styles.mainContent}>
          <nav className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>
              FS³
            </Link>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className={styles.breadcrumbCurrent}>Presentations</span>
          </nav>

          <h1 className={styles.pageTitle}>Presentations</h1>
          <p className={styles.pageSubtitle}>
            Technical deep-dives and engineering case studies
          </p>

          <div className={styles.cardList}>
            {/* <Link href="/presentations/ai-user-group-session-2" className={styles.card}>
                        <div className={styles.cardBody}>
                            <div className={styles.cardLabelRow}>
                                <span className={styles.cardAccent} style={{ background: '#E87722' }} />
                                <span className={styles.cardLabel} style={{ color: '#E87722' }}>AI User Group</span>
                                <span className={styles.sessionBadge}>Session 2</span>
                            </div>
                            <h3 className={styles.cardTitle}>From Guidelines to Workflows</h3>
                            <p className={styles.cardDesc}>
                                Shifting from AI policy to practice. Real workflows, practical techniques, and
                                hands-on demonstrations of AI-assisted engineering development.
                            </p>
                            <div className={styles.cardMeta}>11 slides · Mar 2026</div>
                        </div>
                        <span className={styles.cardAffordance}>View ›</span>
                    </Link> */}

            <Link href="/presentations/lunchandlearn" className={styles.card}>
              <div className={styles.cardBody}>
                <div className={styles.cardLabelRow}>
                  <span
                    className={styles.cardAccent}
                    style={{ background: "#5DCAA5" }}
                  />
                  <span
                    className={styles.cardLabel}
                    style={{ color: "#5DCAA5" }}
                  >
                    Engineering Lunch &amp; Learn
                  </span>
                </div>
                <h3 className={styles.cardTitle}>
                  Automating Engineering Workflows With Custom Software
                </h3>
                <p className={styles.cardDesc}>
                  A systematic approach to converting tribal knowledge into
                  powerful, reliable internal tools. Explore the process,
                  principles, and impact of building internal engineering
                  software.
                </p>
                <div className={styles.cardMeta}>11 slides · June 2026</div>
              </div>
              <span className={styles.cardAffordance}>View ›</span>
            </Link>
          </div>
        </main>
      </div>
    );
}

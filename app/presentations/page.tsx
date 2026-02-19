'use client';

import Link from 'next/link';

export default function PresentationsPage() {
    return (
        <div className="container">
            <header>
                <h1>Presentations</h1>
                <div className="value-statement">
                    Technical deep-dives and engineering case studies
                </div>
            </header>

            <main style={{ padding: '40px 0' }}>
                <section style={{
                    background: 'white',
                    padding: '45px',
                    border: '1px solid var(--border)',
                    boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.03)',
                    marginBottom: '40px'
                }}>
                    <h2 style={{
                        fontSize: '1.6rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        borderLeft: '8px solid var(--brand-orange)',
                        paddingLeft: '20px',
                        marginBottom: '25px',
                        fontWeight: 800
                    }}>Available Presentations</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Lunch & Learn */}
                        <Link href="/presentations/lunchandlearn" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                background: 'var(--bg-sidebar)',
                                border: '1px solid var(--border)',
                                padding: '30px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--brand-orange)';
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.background = 'var(--bg-sidebar)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                <div style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 900,
                                    color: 'var(--brand-orange)',
                                    letterSpacing: '0.15em',
                                    marginBottom: '10px'
                                }}>ENGINEERING SYSTEMS</div>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    marginBottom: '12px',
                                    color: 'var(--brand-black)'
                                }}>From Workflow Friction to Validated Systems</h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                                    Cross-functional engineering workflows translated into reliable, scalable software platforms.
                                    Explore the process, principles, and impact of building internal engineering tools.
                                </p>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* Back Navigation */}
                <div style={{ textAlign: 'center' }}>
                    <Link href="/" style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        border: '2px solid var(--brand-black)',
                        color: 'var(--brand-black)',
                        textDecoration: 'none',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--brand-black)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--brand-black)';
                        }}>
                        ← Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
}

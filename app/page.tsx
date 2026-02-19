'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>Chenla Long, Jr.</h1>
        <div className="value-statement">
          Building scalable engineering systems that reduce operational risk and accelerate technical
          decision-making across the fire protection lifecycle.
        </div>
      </header>

      <main style={{ padding: '40px 0' }}>
        {/* Site Overview */}
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
          }}>Portfolio Overview</h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '20px' }}>
            This portfolio documents my work architecting configuration-driven software platforms
            that bridge hardware R&D, lab testing, and global sales engineering at Victaulic.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
            Navigate through the sections below to explore my project timeline, technical capabilities,
            and engineering philosophy.
          </p>
        </section>

        {/* Navigation Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* Projects Card */}
          <Link href="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: 'white',
              border: '1px solid var(--border)',
              padding: '35px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              height: '100%',
              boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.03)'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-orange)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0, 0, 0, 0.03)';
              }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 900,
                color: 'var(--brand-orange)',
                letterSpacing: '0.15em',
                marginBottom: '15px'
              }}>INTERACTIVE TIMELINE</div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: '15px',
                color: 'var(--brand-black)'
              }}>Project Timeline</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Explore my complete project history with an interactive presentation-style timeline.
                Navigate through each project to see problems solved, solutions delivered, and impact created.
              </p>
            </div>
          </Link>

          {/* Summary Card */}
          <Link href="/summary" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: 'white',
              border: '1px solid var(--border)',
              padding: '35px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              height: '100%',
              boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.03)'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-blue)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0, 0, 0, 0.03)';
              }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 900,
                color: 'var(--brand-blue)',
                letterSpacing: '0.15em',
                marginBottom: '15px'
              }}>CAPABILITY PILLARS</div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: '15px',
                color: 'var(--brand-black)'
              }}>Skillset Summary</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Review my core technical capabilities organized by engineering domain.
                See how individual projects contribute to broader platform capabilities.
              </p>
            </div>
          </Link>

          {/* Presentations Card */}
          <Link href="/presentations" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: 'white',
              border: '1px solid var(--border)',
              padding: '35px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              height: '100%',
              boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.03)'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-black)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0, 0, 0, 0.03)';
              }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 900,
                color: 'var(--brand-black)',
                letterSpacing: '0.15em',
                marginBottom: '15px'
              }}>DEEP DIVES</div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: '15px',
                color: 'var(--brand-black)'
              }}>Presentations</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Access detailed technical presentations and deep-dive content on specific
                engineering systems and methodologies.
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Help */}
        <section style={{
          background: 'var(--bg-sidebar)',
          padding: '35px',
          border: '1px solid var(--border)',
          borderTop: '4px solid var(--brand-black)'
        }}>
          <h3 style={{
            fontSize: '0.85rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--brand-orange)',
            marginBottom: '20px'
          }}>Navigation Guide</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
                📊 Project Timeline
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Use arrow keys (↑/↓) to navigate between projects. Each project shows problem, solution, and current status.
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
                🎯 Skillset Summary
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Click project names to jump directly to that project in the timeline (opens in new tab).
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
                🎤 Presentations
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Full-screen presentation mode with detailed technical walkthroughs and case studies.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

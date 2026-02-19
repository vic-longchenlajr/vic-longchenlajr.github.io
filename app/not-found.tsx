'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - var(--navbar-height))',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--brand-orange)', marginBottom: '0.5rem' }}>
        404
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        This page doesn&apos;t exist.
      </p>
      <Link href="/" style={{
        padding: '0.75rem 2rem',
        backgroundColor: 'var(--brand-orange)',
        color: '#fff',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 600,
      }}>
        Back to Home
      </Link>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from './providers/ThemeProvider';
import styles from './topbar.module.css';

function SunIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

function openPalette() {
    window.dispatchEvent(new Event('open-command-palette'));
}

export default function TopBar() {
    const pathname = usePathname();
    const isLanding = pathname === '/';
    const [logoHovered, setLogoHovered] = useState(false);
    const { theme, toggle } = useTheme();

    return (
        <>
            <nav
                id="fs3-topbar"
                className={`${styles.nav}${isLanding ? ` ${styles.navLanding}` : ''}`}
            >
                {/* ── Logo ───────────────────────────────────────────── */}
                <Link
                    href="/"
                    className={styles.logo}
                    onMouseEnter={() => setLogoHovered(true)}
                    onMouseLeave={() => setLogoHovered(false)}
                >
                    <span
                        className={styles.logoCollapsed}
                        style={{
                            opacity: logoHovered ? 0 : 1,
                            filter: logoHovered ? 'blur(6px)' : 'blur(0)',
                            transition: 'opacity 0.2s ease, filter 0.25s ease',
                        }}
                    >
                        FS<sup style={{ fontSize: 10, verticalAlign: 'super' }}>3</sup>
                    </span>
                    <span
                        className={styles.logoExpanded}
                        style={{
                            opacity: logoHovered ? 1 : 0,
                            filter: logoHovered ? 'blur(0)' : 'blur(6px)',
                            transition: 'opacity 0.3s ease 0.08s, filter 0.3s ease 0.08s',
                        }}
                    >
                        Fire Suppression Software Suite
                    </span>
                </Link>

                {/* ── Search trigger ─────────────────────────────────── */}
                <button onClick={openPalette} className={styles.searchBtn}>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span className={styles.searchLabel}>Jump to tool...</span>
                    <span className={styles.kbdGroup}>
                        <kbd className={styles.kbd}>Ctrl</kbd>
                        <kbd className={styles.kbd}>K</kbd>
                    </span>
                </button>

                {/* ── Theme toggle ────────────────────────────────────── */}
                <button
                    onClick={toggle}
                    className={styles.themeToggle}
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
            </nav>

            {/* Spacer so page content doesn't sit under the fixed bar */}
            {!isLanding && <div className={styles.spacer} />}
        </>
    );
}

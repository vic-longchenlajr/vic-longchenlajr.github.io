'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
    theme: Theme;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(t: Theme) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('fs3-theme', t); } catch { /* private browsing */ }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const themeRef = useRef<Theme>('dark');

    // Sync state ref on every render so toggle always reads the current value
    themeRef.current = theme;

    useEffect(() => {
        // Read saved theme on mount; fall back to DOM attribute set by anti-FOUC script
        try {
            const saved = localStorage.getItem('fs3-theme') as Theme | null;
            const dom = document.documentElement.dataset.theme as Theme | undefined;
            const resolved = (saved === 'light' || saved === 'dark')
                ? saved
                : (dom === 'light' || dom === 'dark')
                    ? dom
                    : 'dark';
            if (resolved !== 'dark') {
                setTheme(resolved);
                document.documentElement.dataset.theme = resolved;
            }
        } catch { /* localStorage unavailable */ }
    }, []);

    const toggle = useCallback(() => {
        const next: Theme = themeRef.current === 'dark' ? 'light' : 'dark';
        themeRef.current = next;
        setTheme(next);
        applyTheme(next);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}

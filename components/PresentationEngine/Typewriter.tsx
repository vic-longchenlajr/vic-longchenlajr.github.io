'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
    text: string;
    // Gate typing on visibility — when false the effect resets so it replays.
    active: boolean;
    speedMs?: number;     // per-character interval
    startDelayMs?: number;
    reduce?: boolean;     // prefers-reduced-motion → render instantly
    onDone?: () => void;
    className?: string;
    showCursor?: boolean;
}

// Types `text` out one character at a time once `active` is true. Resets when
// inactive so the animation replays each time its slide re-enters view.
export function Typewriter({
    text,
    active,
    speedMs = 42,
    startDelayMs = 0,
    reduce = false,
    onDone,
    className,
    showCursor = true,
}: TypewriterProps) {
    const [count, setCount] = useState(0);
    const onDoneRef = useRef(onDone);
    onDoneRef.current = onDone;

    useEffect(() => {
        if (!active) {
            setCount(0);
            return;
        }
        if (reduce) {
            setCount(text.length);
            onDoneRef.current?.();
            return;
        }
        let i = 0;
        let interval: ReturnType<typeof setInterval>;
        const start = setTimeout(() => {
            interval = setInterval(() => {
                i += 1;
                setCount(i);
                if (i >= text.length) {
                    clearInterval(interval);
                    onDoneRef.current?.();
                }
            }, speedMs);
        }, startDelayMs);
        return () => {
            clearTimeout(start);
            clearInterval(interval);
        };
    }, [active, text, speedMs, startDelayMs, reduce]);

    const done = count >= text.length;

    return (
        <span className={className} aria-label={text}>
            <span aria-hidden="true">{text.slice(0, count)}</span>
            {showCursor && !reduce && (
                <span
                    aria-hidden="true"
                    style={{
                        display: 'inline-block',
                        marginLeft: '0.04em',
                        opacity: done ? 0 : 1,
                        transition: 'opacity 0.3s',
                        fontWeight: 400,
                    }}
                >
                    |
                </span>
            )}
        </span>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { SlideDefinition } from '../types';
import { EASE } from '../motion';
import { Typewriter } from '../Typewriter';
import layoutStyles from './layouts.module.css';

interface HeroLayoutProps {
    slide: SlideDefinition;
    content: Record<string, unknown>;
    isVisible?: boolean;
}

export const HeroLayout = ({ slide, content, isVisible = true }: HeroLayoutProps) => {
    const heading = (content.heading as string) || slide.title;
    const tagline = (content.tagline as string) || slide.subtitle || '';
    const stat = content.stat as string | undefined;
    const statLabel = content.statLabel as string | undefined;
    const reduce = false; // run animations regardless of OS reduced-motion

    // The title types out; once it finishes, the tagline floats in from the top.
    const [titleDone, setTitleDone] = useState(false);
    useEffect(() => {
        if (!isVisible) setTitleDone(false);
    }, [isVisible]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                maxWidth: 800,
                margin: '0 auto'
            }}>
                <h1 style={{ marginBottom: 20 }}>
                    <Typewriter
                        text={heading}
                        active={isVisible}
                        reduce={reduce}
                        speedMs={45}
                        onDone={() => setTitleDone(true)}
                    />
                </h1>
                {tagline && (
                    <motion.p
                        initial={{ opacity: 0, y: reduce ? 0 : -16 }}
                        animate={titleDone ? { opacity: 0.85, y: 0 } : { opacity: 0, y: reduce ? 0 : -16 }}
                        transition={{ duration: reduce ? 0.25 : 0.8, ease: EASE }}
                        style={{
                            fontSize: 'clamp(0.9rem, 2.4cqmin, 1.3rem)',
                            color: 'white',
                            fontWeight: 600,
                            lineHeight: 1.5,
                        }}
                    >
                        {tagline}
                    </motion.p>
                )}
                {stat && (
                    <motion.div
                        className={layoutStyles.heroStat}
                        initial={{ opacity: 0, y: reduce ? 0 : -16 }}
                        animate={titleDone ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -16 }}
                        transition={{ duration: reduce ? 0.25 : 0.8, ease: EASE, delay: reduce ? 0 : 0.15 }}
                    >
                        <span className={layoutStyles.heroStatValue}>{stat}</span>
                        {statLabel && <span className={layoutStyles.heroStatLabel}>{statLabel}</span>}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

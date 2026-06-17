'use client';

import { motion } from 'framer-motion';
import { EASE } from '../motion';
import layoutStyles from './layouts.module.css';

interface IntroLayoutProps {
    content: Record<string, unknown>;
    isVisible?: boolean;
}

export const IntroLayout = ({ content, isVisible = true }: IntroLayoutProps) => {
    const name = (content.name as string) || '';
    const role = (content.role as string) || '';
    const meta = (content.meta as string) || '';
    const education = (content.education as string) || '';
    const positioning = (content.positioning as string) || '';
    const focusLabel = (content.focusLabel as string) || 'What I Do';
    const focus = (content.focus as string[]) || [];
    const recentLabel = (content.recentLabel as string) || 'Recent Work';
    const recent = (content.recent as string[]) || [];

    const reduce = false; // run animations regardless of OS reduced-motion

    // Explicit timeline (seconds). The two columns are strictly sequential:
    // every "What I've Done" bullet lands before "Current Goals" begins.
    const leftIn = (delay: number, dur = 0.8) => ({
        initial: { opacity: 0, x: reduce ? 0 : -28 },
        animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: reduce ? 0 : -28 },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });
    const downIn = (delay: number, dur = 0.7) => ({
        initial: { opacity: 0, y: reduce ? 0 : -18 },
        animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : -18 },
        transition: { delay: reduce ? 0 : delay, duration: reduce ? 0.25 : dur, ease: EASE },
    });

    const bulletStagger = 0.28;
    const focusTitleAt = 1.5;
    const focusBulletsAt = focusTitleAt + 0.5;
    const recentTitleAt = focusBulletsAt + focus.length * bulletStagger + 0.4;
    const recentBulletsAt = recentTitleAt + 0.5;

    return (
        <div className={layoutStyles.introContainer}>
            <div className={layoutStyles.introIdentity}>
                <motion.div className={layoutStyles.introBar} {...leftIn(0.85, 0.6)} />
                <motion.div className={layoutStyles.introIdentityInner} {...leftIn(0, 0.8)}>
                    {name && <div className={layoutStyles.introName}>{name}</div>}
                    {role && <div className={layoutStyles.introRole}>{role}</div>}
                    {meta && <div className={layoutStyles.introMeta}>{meta}</div>}
                    {education && <div className={layoutStyles.introMeta}>{education}</div>}
                    {positioning && <p className={layoutStyles.introPositioning}>{positioning}</p>}
                </motion.div>
            </div>

            <div className={layoutStyles.introWork}>
                {focus.length > 0 && (
                    <div className={layoutStyles.introWorkGroup}>
                        <motion.div className={layoutStyles.introWorkLabel} {...downIn(focusTitleAt)}>{focusLabel}</motion.div>
                        <ul className={layoutStyles.introList}>
                            {focus.map((point, i) => (
                                <motion.li key={i} {...leftIn(focusBulletsAt + i * bulletStagger, 0.6)}>{point}</motion.li>
                            ))}
                        </ul>
                    </div>
                )}
                {recent.length > 0 && (
                    <div className={layoutStyles.introWorkGroup}>
                        <motion.div className={layoutStyles.introWorkLabel} {...downIn(recentTitleAt)}>{recentLabel}</motion.div>
                        <ul className={layoutStyles.introList}>
                            {recent.map((point, i) => (
                                <motion.li key={i} {...leftIn(recentBulletsAt + i * bulletStagger, 0.6)}>{point}</motion.li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

'use client';

import { motion } from 'framer-motion';
import { EASE } from './motion';

interface WipeTextProps {
    text: string;
    className?: string;
    reduce?: boolean;
}

// Word-staggered text used in the persistent header. Words fade in left-to-right
// on enter and fade out left-to-right on exit, so swapping the header content
// reads as a directional wipe. Designed to be the direct child of an
// <AnimatePresence mode="wait"> keyed by slide index.
export function WipeText({ text, className, reduce = false }: WipeTextProps) {
    const words = text.split(' ');

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: 0.04 } },
        exit: { transition: { staggerChildren: reduce ? 0 : 0.035 } },
    };
    const word = {
        hidden: { opacity: 0, x: reduce ? 0 : -8 },
        show: { opacity: 1, x: 0, transition: { duration: reduce ? 0.2 : 0.45, ease: EASE } },
        exit: { opacity: 0, x: reduce ? 0 : 8, transition: { duration: reduce ? 0.15 : 0.3, ease: EASE } },
    };

    return (
        <motion.span
            className={className}
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{ display: 'inline-flex', flexWrap: 'wrap', columnGap: '0.3em', rowGap: '0.1em' }}
        >
            {words.map((w, i) => (
                <motion.span key={i} variants={word} style={{ display: 'inline-block' }}>
                    {w}
                </motion.span>
            ))}
        </motion.span>
    );
}

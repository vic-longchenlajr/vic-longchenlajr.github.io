'use client';

import { AnimatePresence, motion } from 'framer-motion';
import styles from '../PresentationEngine.module.css';
import { WipeText } from '../WipeText';
import { ProgressDots } from '../shells/ProgressDots';
import { EASE } from '../motion';
import type { SlideDefinition } from '../types';

interface PresentationHeaderProps {
    slides: SlideDefinition[];
    currentIndex: number;
    reduce: boolean;
}

// Persistent header chrome. The title/subtitle (left) and breadcrumb (right)
// wipe out and in left-to-right when the slide changes, while the progress dots
// and counter update in place. Hidden on the hero (index 0), which is full-bleed.
export function PresentationHeader({ slides, currentIndex, reduce }: PresentationHeaderProps) {
    const slide = slides[currentIndex];
    const visible = currentIndex > 0;

    return (
        <motion.div
            className={styles.persistentHeader}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ pointerEvents: visible ? 'auto' : 'none' }}
            aria-hidden={!visible}
        >
            <div className={styles.persistentHeaderLeft}>
                <AnimatePresence mode="wait">
                    <WipeText key={`t${currentIndex}`} text={slide.title} className={styles.headerTitle} reduce={reduce} />
                </AnimatePresence>
                {slide.subtitle && (
                    <AnimatePresence mode="wait">
                        <WipeText key={`s${currentIndex}`} text={slide.subtitle} className={styles.headerSubtitle} reduce={reduce} />
                    </AnimatePresence>
                )}
            </div>

            <div className={styles.persistentHeaderRight}>
                <AnimatePresence mode="wait">
                    <WipeText key={`b${currentIndex}`} text={slide.breadcrumb} className={styles.breadcrumb} reduce={reduce} />
                </AnimatePresence>
                <ProgressDots current={currentIndex} total={slides.length} />
            </div>
        </motion.div>
    );
}

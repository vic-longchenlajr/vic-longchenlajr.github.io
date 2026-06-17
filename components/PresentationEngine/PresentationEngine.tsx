'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './PresentationEngine.module.css';
import { Sidebar } from './chrome/Sidebar';
import { PresentationHeader } from './chrome/PresentationHeader';
import { MobileProgress } from './chrome/MobileProgress';
import { NotesOverlay } from './chrome/NotesOverlay';
import { SlideShell } from './shells/SlideShell';
import { resolveLayout } from './layouts';
import type { PresentationEngineProps, SlideDefinition } from './types';

export function PresentationEngine({
    meta,
    slides,
    components = {},
    hideNavbar = false
}: PresentationEngineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [showNotes, setShowNotes] = useState(false);
    // Animations run regardless of the OS "reduce motion" setting (per request).
    // This also keeps SSR/CSR deterministic — useReducedMotion() differs between
    // server and client and was causing hydration mismatches.
    const reduce = false;

    const scrollToSlide = useCallback((index: number) => {
        if (index >= 0 && index < slides.length) {
            document.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [slides.length]);

    // Lock body scroll while presentation is mounted
    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, []);

    // Intersection Observer — track which slide is the active (snapped) one.
    // Only the active slide's content is mounted (see render below), so each
    // slide remounts fresh — and replays its entrance from the start — every
    // time it becomes active, with no stale in-flight animation or timer state.
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        setCurrentSlideIndex(index);
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: 0.6
            }
        );

        containerRef.current.querySelectorAll(`.${styles.slide}`).forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [slides.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowDown', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
                scrollToSlide(currentSlideIndex + 1);
            } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
                e.preventDefault();
                scrollToSlide(currentSlideIndex - 1);
            } else if (e.key.toLowerCase() === 'n') {
                setShowNotes(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlideIndex, scrollToSlide]);

    const currentSlide = slides[currentSlideIndex];

    const renderSlideContent = (slide: SlideDefinition, isVisible: boolean) => {
        // 1. Custom component referenced by name
        if (slide.component && components[slide.component]) {
            const CustomComponent = components[slide.component];
            return <CustomComponent content={slide.content} isVisible={isVisible} />;
        }

        // 2. Built-in layout template
        return resolveLayout(slide, isVisible, styles);
    };

    const getLayoutClassName = (slide: SlideDefinition): string | undefined => {
        if (slide.layout === 'hero') return styles.heroSlide;
        return undefined;
    };

    return (
        <div
            ref={containerRef}
            className={styles.presentationContainer}
        >
            <MobileProgress
                currentIndex={currentSlideIndex}
                total={slides.length}
                currentTitle={currentSlide.title}
            />

            <Sidebar
                meta={meta}
                slides={slides}
                currentIndex={currentSlideIndex}
                onNavigate={scrollToSlide}
            />

            <PresentationHeader
                slides={slides}
                currentIndex={currentSlideIndex}
                reduce={reduce}
            />

            {slides.map((slide, index) => {
                const active = index === currentSlideIndex;
                return (
                    <SlideShell
                        key={slide.id}
                        slide={slide}
                        index={index}
                        total={slides.length}
                        framedFooter={meta.framedFooter}
                        layoutClassName={getLayoutClassName(slide)}
                    >
                        {/* Mount the content only while active. Leaving the slide
                            unmounts it; returning mounts it fresh so the entrance
                            animation always restarts from the beginning. */}
                        {active ? renderSlideContent(slide, true) : null}
                    </SlideShell>
                );
            })}

            {showNotes && currentSlide.notes && (
                <NotesOverlay notes={currentSlide.notes} />
            )}
        </div>
    );
}

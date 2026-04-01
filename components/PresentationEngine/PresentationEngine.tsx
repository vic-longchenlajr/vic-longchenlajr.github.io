'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './PresentationEngine.module.css';
import { Sidebar } from './chrome/Sidebar';
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
    const [visibleSlides, setVisibleSlides] = useState<Set<number>>(new Set([0]));
    const [showNotes, setShowNotes] = useState(false);

    const scrollToSlide = useCallback((index: number) => {
        if (index >= 0 && index < slides.length) {
            document.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [slides.length]);

    // Intersection Observer — track which slide is in view
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        setCurrentSlideIndex(index);
                        setVisibleSlides(prev => new Set(prev).add(index));
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: 0.5
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

            {slides.map((slide, index) => (
                <SlideShell
                    key={slide.id}
                    slide={slide}
                    index={index}
                    total={slides.length}
                    isVisible={visibleSlides.has(index)}
                    layoutClassName={getLayoutClassName(slide)}
                >
                    {renderSlideContent(slide, visibleSlides.has(index))}
                </SlideShell>
            ))}

            {showNotes && currentSlide.notes && (
                <NotesOverlay notes={currentSlide.notes} />
            )}
        </div>
    );
}

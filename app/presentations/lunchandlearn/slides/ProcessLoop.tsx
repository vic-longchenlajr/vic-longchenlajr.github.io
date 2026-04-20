'use client';

import { useEffect, useState } from 'react';
import styles from './slides.module.css';
import type { SlideComponentProps } from '@/components/PresentationEngine';

const steps = [
    {
        icon: '💡',
        title: 'Discovery',
        desc: 'Validate value, scope, and cross-department impact before building.',
        stakeholders: ['Product Management', 'Project Engineering'],
        value: ['Strategic Alignment', 'Risk Reduction']
    },
    {
        icon: '🔍',
        title: 'Immersion',
        desc: 'Map real use cases, constraints, and edge conditions.',
        stakeholders: ['Project Engineering', 'Applications Engineering', 'Customer Care', 'End Users'],
        value: ['Use-Case Clarity', 'Requirement Confidence']
    },
    {
        icon: '🧱',
        title: 'Architecture',
        desc: 'Define data models, rules, system boundaries, and visibility.',
        stakeholders: ['Project Engineering', 'IT'],
        value: ['Scalable Framework', 'Standards Enforcement']
    },
    {
        icon: '🧪',
        title: 'Prototype',
        desc: 'Prove feasibility with a minimal, validated build.',
        stakeholders: ['Project Engineering', 'Applications Engineering'],
        value: ['Feasibility Validation', 'Accelerated Learning']
    },
    {
        icon: '🔁',
        title: 'Validation Sprints',
        desc: 'Pressure-test assumptions and iterate through structured feedback.',
        stakeholders: ['Internal Testing Group', 'Product Management'],
        value: ['Accuracy', 'Operational Confidence']
    },
    {
        icon: '🚀',
        title: 'Deploy & Sustain',
        desc: 'Release, align stakeholders, and continuously improve.',
        stakeholders: ['Sales', 'Marketing', 'Legal', 'IT', 'Customer Care'],
        value: ['Adoption', 'Continuous Improvement']
    }
];

export default function ProcessLoop(_props: SlideComponentProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cumulativeIndex, setCumulativeIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % steps.length);
            setCumulativeIndex((prev) => prev + 1);
        }, 12000);
        return () => clearInterval(interval);
    }, [isHovered]);

    const handleNodeClick = (index: number) => {
        const diff = (index - activeIndex + steps.length) % steps.length;
        if (diff !== 0) {
            setCumulativeIndex(prev => prev + diff);
            setActiveIndex(index);
        }
    };

    const activeStep = steps[activeIndex];

    return (
        <div className={styles.processLoopContainer}>
            <div className={styles.loopLeft}>
                <div className={styles.circularWrapper}>
                    <svg className={styles.loopSvg} viewBox="0 0 440 440">
                        <circle cx="220" cy="220" r="170" className={styles.svgTrack} />
                        <circle
                            cx="220" cy="220" r="170"
                            className={styles.svgHighlight}
                            style={{
                                transform: `rotate(${(cumulativeIndex * 60) - 150}deg)`,
                                transformOrigin: 'center'
                            }}
                        />
                    </svg>

                    {steps.map((step, i) => {
                        const angle = i * 60;
                        const radius = 170;
                        const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                        const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                        return (
                            <div
                                key={i}
                                className={`${styles.loopNode} ${activeIndex === i ? styles.nodeActive : ''}`}
                                style={{
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`
                                }}
                                onMouseEnter={() => {
                                    handleNodeClick(i);
                                    setIsHovered(true);
                                }}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className={styles.nodeIcon}>{step.icon}</div>
                                <div className={styles.nodeLabel}>{step.title}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.loopRight}>
                <div key={activeIndex} className={styles.detailPanel}>
                    <div className={styles.detailIndex}>PHASE {String(activeIndex + 1).padStart(2, '0')}</div>
                    <h3 className={styles.detailTitle}>{activeStep.title}</h3>
                    <p className={styles.detailDesc}>{activeStep.desc}</p>
                    <div className={styles.detailTags}>
                        {activeStep.stakeholders.map(tag => (
                            <span key={tag} className={`${styles.detailTag} ${styles.tagStakeholder}`}>{tag}</span>
                        ))}
                        {activeStep.value.map(tag => (
                            <span key={tag} className={`${styles.detailTag} ${styles.tagValue}`}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

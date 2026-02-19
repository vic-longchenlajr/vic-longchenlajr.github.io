'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './projects.module.css';

interface Project {
    id: string;
    date: string;
    title: string;
    subtitle?: string;
    status: 'current' | 'completed';
    problem: string;
    solution: string;
    role: string;
    appUrl?: string;
    repoUrl?: string;
}

const projects: Project[] = [
    {
        id: 'vortex-v2',
        date: 'May 2025 – Present',
        title: 'Vortex Project Builder',
        subtitle: '(Vortex Configuration - V2)',
        status: 'current',
        problem: 'Single-system tools could not scale to multi-system, multi-enclosure projects without reintroducing manual coordination and error risk.',
        solution: 'Evolved the estimator into a project-based platform supporting multiple engineered and pre-engineered systems with independent configuration and BOMs—while preserving usability under significantly increased complexity.',
        role: 'Engineer 1',
        appUrl: '/vortex-project-builder/',
    },
    {
        id: 'vortex-v1',
        date: 'Sep 2023 – Present',
        title: 'Vortex Estimator Tool',
        subtitle: '(Vortex Configuration - V1)',
        status: 'current',
        problem: 'Hand calculations and spreadsheets produced slow, inconsistent system estimates.',
        solution: 'Replaced manual sizing with a standardized single-system, multi-zone calculator—establishing a trusted baseline for feasibility, pricing, and configuration accuracy.',
        role: 'Engineer 1'
    },
    {
        id: 'vicflex',
        date: 'Early 2025 – Present',
        title: 'VicFlex Bracket Filter',
        status: 'current',
        problem: 'Sales relied on engineering to manually validate bracket compatibility in SolidWorks.',
        solution: 'Delivered an internal sales tool with validated compatible options, constraints, distance ranges, and visuals—reducing engineering interruptions and improving response time.',
        role: 'Engineer 1'
    },
    {
        id: 'daq',
        date: 'Dec 2025',
        title: 'Scalable DAQ (Bechtel Customer Testing)',
        status: 'completed',
        problem: 'Discharge testing needs varied by campaign, repeatedly consuming lab resources to build custom DAQ systems.',
        solution: 'Designed a configuration-driven DAQ platform that scales across sensor types and test needs—preserving lab capacity and supporting evolving requirements ahead of UL listing efforts.',
        role: 'Engineer 1'
    },
    {
        id: 'research',
        date: '2024 – 2025',
        title: 'RG5200i Innovation Research (AI / LiDAR)',
        status: 'completed',
        problem: 'Pipe alignment verification relied on manual inspection, with uncertainty around real-time vision feasibility.',
        solution: 'Conducted feasibility research using ML (YOLOv5) and LiDAR approaches for pipe detection/alignment—reducing uncertainty and informing downstream tool development.',
        role: 'Engineer 1'
    },
    {
        id: 'ul-formatter',
        date: 'Mar 2024 – 2025',
        title: 'UL Formatter (v1.4)',
        status: 'completed',
        problem: 'Manual transcription of sensor data into UL reports was time-intensive and error-prone.',
        solution: 'Automated UL-compliant certification documents directly from raw test data—improving consistency, auditability, and confidence in reported results.',
        role: 'Engineer 1'
    },
    {
        id: 'bom-prototype',
        date: 'May 2023 – Dec 2023',
        title: 'Vortex BOM Application',
        subtitle: '(Vortex Configuration - Prototype)',
        status: 'completed',
        problem: 'Vortex system calculations were difficult to reason about and validate early in the design process.',
        solution: 'Built a prototype to learn calculation methods and prove feasibility—directly informing the later public Vortex Estimator Tool.',
        role: 'Intern'
    },
    {
        id: 'stepper-motor',
        date: 'May 2023 – Dec 2023',
        title: 'Stepper Motor Control Loop (Cost Reduction Research)',
        status: 'completed',
        problem: 'The existing MDrive motor solution met requirements but carried high component cost.',
        solution: 'Implemented a PID-based C++ control loop to evaluate an in-house alternative—targeting cost reduction at the component and panel/system level.',
        role: 'Intern'
    },
    {
        id: 'rd-support',
        date: 'May 2023 – Dec 2023',
        title: 'Vortex R&D & Test DAQ Support',
        status: 'completed',
        problem: 'R&D testing required repeatable sensor setup and reliable data collection across changing test needs.',
        solution: 'Configured sensors and wiring, operated existing DAQ programs, and collected/reported data to support engineered and pre-engineered system development.',
        role: 'Intern'
    }
];

export default function ProjectsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Arrow key navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' && currentIndex < projects.length - 1) {
                e.preventDefault();
                const nextSection = containerRef.current?.children[currentIndex + 1] as HTMLElement;
                nextSection?.scrollIntoView({ behavior: 'smooth' });
                setCurrentIndex(currentIndex + 1);
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                const prevSection = containerRef.current?.children[currentIndex - 1] as HTMLElement;
                prevSection?.scrollIntoView({ behavior: 'smooth' });
                setCurrentIndex(currentIndex - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    // Scroll tracking
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const sections = Array.from(containerRef.current.children) as HTMLElement[];
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY;
                const sectionBottom = sectionTop + rect.height;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    setCurrentIndex(index);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hash navigation
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const index = projects.findIndex(p => p.id === id);
            if (index !== -1) {
                setTimeout(() => {
                    const section = containerRef.current?.children[index] as HTMLElement;
                    section?.scrollIntoView({ behavior: 'smooth' });
                    setCurrentIndex(index);
                }, 100);
            }
        }
    }, []);

    return (
        <div className={styles.pageContainer}>
            {/* Main Content - 70% */}
            <div className={styles.mainContent} ref={containerRef}>
                {projects.map((project, index) => (
                    <section
                        key={project.id}
                        id={project.id}
                        className={`${styles.projectSection} ${index === currentIndex ? styles.active : ''}`}
                    >
                        <div className={styles.projectCard}>
                            <div className={styles.projectHeader}>
                                <div className={styles.projectDate}>{project.date}</div>
                                <h2 className={styles.projectTitle}>
                                    {project.title}
                                    {project.subtitle && <span className={styles.projectSubtitle}>{project.subtitle}</span>}
                                    <span className={`${styles.statusBadge} ${styles[`status${project.status.charAt(0).toUpperCase() + project.status.slice(1)}`]}`}>
                                        {project.status}
                                    </span>
                                </h2>
                            </div>

                            <div className={styles.projectContent}>
                                <div className={styles.contentBlock}>
                                    <div className={styles.contentLabel}>Problem:</div>
                                    <p className={styles.contentText}>{project.problem}</p>
                                </div>

                                <div className={styles.contentBlock}>
                                    <div className={styles.contentLabel}>Solution:</div>
                                    <p className={styles.contentText}>{project.solution}</p>
                                </div>
                            </div>

                            {(project.appUrl || project.repoUrl) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    {project.appUrl && (
                                        <a
                                            href={project.appUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.6rem 1.2rem',
                                                backgroundColor: 'var(--brand-orange)',
                                                color: '#ffffff',
                                                borderRadius: '6px',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                transition: 'opacity 0.2s',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                                        >
                                            Launch App →
                                        </a>
                                    )}
                                    {project.repoUrl && (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.6rem 1.2rem',
                                                backgroundColor: 'transparent',
                                                color: 'var(--text-muted)',
                                                border: '1px solid var(--border)',
                                                borderRadius: '6px',
                                                textDecoration: 'none',
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                            }}
                                        >
                                            View Code
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className={styles.projectFooter}>
                                <div className={styles.projectIndex}>
                                    {String(index + 1).padStart(2, '0')} / {projects.length}
                                </div>
                                <div className={styles.navHint}>
                                    Use ↑ ↓ arrow keys to navigate
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Timeline Sidebar - 30% */}
            <aside className={styles.timelineSidebar}>
                <div className={styles.sidebarHeader}>
                    <h3>Project Timeline</h3>
                    <div className={styles.progressIndicator}>
                        {currentIndex + 1} of {projects.length}
                    </div>
                </div>

                <div className={styles.timeline}>
                    {/* Engineer 1 Section */}
                    <div className={styles.roleSection}>
                        <div className={styles.roleHeader}>Engineer 1 (Jan 2024 – Present)</div>
                        {projects
                            .filter(p => p.role === 'Engineer 1')
                            .map((project, idx) => {
                                const globalIndex = projects.findIndex(p => p.id === project.id);
                                return (
                                    <div
                                        key={project.id}
                                        className={`${styles.timelineItem} ${globalIndex === currentIndex ? styles.timelineActive : ''}`}
                                        onClick={() => {
                                            const section = containerRef.current?.children[globalIndex] as HTMLElement;
                                            section?.scrollIntoView({ behavior: 'smooth' });
                                            setCurrentIndex(globalIndex);
                                        }}
                                    >
                                        <div className={styles.timelineDot} />
                                        <div className={styles.timelineContent}>
                                            <div className={styles.timelineDate}>{project.date}</div>
                                            <div className={styles.timelineTitle}>{project.title}</div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    {/* Intern Section */}
                    <div className={styles.roleSection}>
                        <div className={styles.roleHeader}>Intern (May 2023 – Dec 2023)</div>
                        {projects
                            .filter(p => p.role === 'Intern')
                            .map((project) => {
                                const globalIndex = projects.findIndex(p => p.id === project.id);
                                return (
                                    <div
                                        key={project.id}
                                        className={`${styles.timelineItem} ${globalIndex === currentIndex ? styles.timelineActive : ''}`}
                                        onClick={() => {
                                            const section = containerRef.current?.children[globalIndex] as HTMLElement;
                                            section?.scrollIntoView({ behavior: 'smooth' });
                                            setCurrentIndex(globalIndex);
                                        }}
                                    >
                                        <div className={styles.timelineDot} />
                                        <div className={styles.timelineContent}>
                                            <div className={styles.timelineDate}>{project.date}</div>
                                            <div className={styles.timelineTitle}>{project.title}</div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </aside>
        </div>
    );
}

'use client';

import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import styles from './projects.module.css';

interface Project {
    id: string;
    date: string;
    title: string;
    subtitle?: string;
    status: 'current' | 'completed';
    summary: string;
    problem: string;
    solution: string;
    role: string;
    appUrl?: string;
    repoUrl?: string;
}

const projects: Project[] = [
    {
        id: 'product-request-pipeline',
        date: 'Apr 2026 – Present',
        title: 'Product Request Pipeline',
        status: 'current',
        summary:
            'Internal tool for managing and tracking product engineering order requests through a structured pipeline.',
        problem:
            'Product engineering order requests were tracked manually, making it difficult to monitor status, prioritize work, and maintain visibility across the team.',
        solution:
            'Built a structured request pipeline tool that provides centralized tracking, status visibility, and workflow management for product engineering orders.',
        role: 'Engineer 1',
        appUrl: '/product-request-pipeline/',
    },
    {
        id: 'vortex-v2',
        date: 'May 2025 – Present',
        title: 'Vortex Project Builder',
        subtitle: 'Vortex Configuration - V2',
        status: 'current',
        summary:
            'Multi-system project platform with independent configuration, real-time pricing, and BOM generation.',
        problem:
            'Single-system tools could not scale to multi-system, multi-enclosure projects without reintroducing manual coordination and error risk.',
        solution:
            'Evolved the estimator into a project-based platform supporting multiple engineered and pre-engineered systems with independent configuration and BOMs—while preserving usability under significantly increased complexity.',
        role: 'Engineer 1',
        appUrl: '/vortex-project-builder/',
    },
    {
        id: 'vortex-v1',
        date: 'Sep 2023 – Present',
        title: 'Vortex Estimator Tool',
        subtitle: 'Vortex Configuration - V1',
        status: 'current',
        summary:
            'Standardized single-system calculator replacing manual sizing for feasibility, pricing, and configuration.',
        problem:
            'Hand calculations and spreadsheets produced slow, inconsistent system estimates.',
        solution:
            'Replaced manual sizing with a standardized single-system, multi-zone calculator—establishing a trusted baseline for feasibility, pricing, and configuration accuracy.',
        role: 'Engineer 1',
    },
    {
        id: 'resource-dashboard',
        date: 'Feb 2026 – Present',
        title: 'LP Resource Dashboard',
        status: 'current',
        summary:
            'Live utilization dashboard for engineering leadership with NPD/Sustaining allocation and capacity insights.',
        problem:
            "LiquidPlanner's native dashboards provided basic timesheet tracking but lacked the depth of insight engineering leadership needed — no clear picture of team utilization trends, project health, or forward-looking capacity against prioritized work.",
        solution:
            'Built a live resource dashboard that ingests LiquidPlanner timesheet data and surfaces utilization metrics, NPD vs. Sustaining allocation, and capacity planning insights across multiple stakeholder views — from director-level operations to VP-level strategic planning.',
        role: 'Engineer 1',
        appUrl: '/resource-dashboard/',
    },
    {
        id: 'spray-trace',
        date: 'Mar 2026 – Present',
        title: 'SprayTrace',
        status: 'current',
        summary:
            'Iteration-tracking tool with heatmap visualizations and FM/UL standards-based evaluation.',
        problem:
            'Deflector development iterations and distribution test results were tracked in scattered spreadsheets — making it difficult to search history, compare performance, or evaluate pass/fail against FM and UL standards.',
        solution:
            'Built a structured iteration-tracking tool with heatmap visualizations and standards-based evaluation — giving engineers a searchable history of every deflector design and its test results in one place.',
        role: 'Engineer 1',
        appUrl: '/spray-trace/',
    },
    {
        id: 'vicflex',
        date: 'Early 2025 – Present',
        title: 'VicFlex Bracket Filter',
        status: 'current',
        summary:
            'Self-service bracket compatibility tool for Sales with validated options, constraints, and visuals.',
        problem:
            'Sales relied on engineering to manually validate bracket compatibility in SolidWorks.',
        solution:
            'Delivered an internal sales tool with validated compatible options, constraints, distance ranges, and visuals—reducing engineering interruptions and improving response time.',
        role: 'Engineer 1',
        appUrl: '/vicflex-bracket-filter/',
    },
    {
        id: 'daq',
        date: 'Dec 2025',
        title: 'Scalable DAQ Platform',
        subtitle: 'Bechtel Customer Testing',
        status: 'completed',
        summary:
            'Configuration-driven DAQ architecture that scales across sensor types and campaign requirements.',
        problem:
            'Discharge testing needs varied by campaign, repeatedly consuming lab resources to build custom DAQ systems.',
        solution:
            'Designed a configuration-driven DAQ platform that scales across sensor types and test needs—preserving lab capacity and supporting evolving requirements ahead of UL listing efforts.',
        role: 'Engineer 1',
    },
    {
        id: 'research',
        date: '2024 – 2025',
        title: 'RG5200i Innovation Research',
        subtitle: 'AI / LiDAR Pipe Detection',
        status: 'completed',
        summary:
            'Feasibility research using ML (YOLOv5) and LiDAR for automated pipe alignment verification.',
        problem:
            'Pipe alignment verification relied on manual inspection, with uncertainty around real-time vision feasibility.',
        solution:
            'Conducted feasibility research using ML (YOLOv5) and LiDAR approaches for pipe detection/alignment—reducing uncertainty and informing downstream tool development.',
        role: 'Engineer 1',
    },
    {
        id: 'ul-formatter',
        date: 'Mar 2024 – 2025',
        title: 'UL Formatter',
        subtitle: 'v1.4',
        status: 'completed',
        summary:
            'Automated UL-compliant certification documents directly from raw test data.',
        problem:
            'Manual transcription of sensor data into UL reports was time-intensive and error-prone.',
        solution:
            'Automated UL-compliant certification documents directly from raw test data—improving consistency, auditability, and confidence in reported results.',
        role: 'Engineer 1',
    },
    {
        id: 'bom-prototype',
        date: 'May 2023 – Dec 2023',
        title: 'Vortex BOM Application',
        subtitle: 'Vortex Configuration - Prototype',
        status: 'completed',
        summary:
            'Early prototype to learn calculation methods and prove feasibility for Vortex system estimation.',
        problem:
            'Vortex system calculations were difficult to reason about and validate early in the design process.',
        solution:
            'Built a prototype to learn calculation methods and prove feasibility—directly informing the later public Vortex Estimator Tool.',
        role: 'Intern',
    },
    {
        id: 'stepper-motor',
        date: 'May 2023 – Dec 2023',
        title: 'Stepper Motor Control Loop',
        subtitle: 'Cost Reduction Research',
        status: 'completed',
        summary:
            'PID-based C++ control loop evaluating in-house motor alternatives for component cost reduction.',
        problem:
            'The existing MDrive motor solution met requirements but carried high component cost.',
        solution:
            'Implemented a PID-based C++ control loop to evaluate an in-house alternative—targeting cost reduction at the component and panel/system level.',
        role: 'Intern',
    },
    {
        id: 'rd-support',
        date: 'May 2023 – Dec 2023',
        title: 'Vortex R&D & Test DAQ Support',
        status: 'completed',
        summary:
            'Sensor configuration, data collection, and reporting for engineered system development testing.',
        problem:
            'R&D testing required repeatable sensor setup and reliable data collection across changing test needs.',
        solution:
            'Configured sensors and wiring, operated existing DAQ programs, and collected/reported data to support engineered and pre-engineered system development.',
        role: 'Intern',
    },
];

export default function ProjectsPage() {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
    const timelineRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Map<string, HTMLElement>>(new Map());

    // Scroll progress for spine fill
    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;
            const rect = timelineRef.current.getBoundingClientRect();
            const timelineTop = rect.top + window.scrollY;
            const timelineHeight = rect.height;
            const scrolled = window.scrollY + window.innerHeight * 0.5 - timelineTop;
            const progress = Math.max(0, Math.min(100, (scrolled / timelineHeight) * 100));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection observer for node entrance animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleNodes((prev) => new Set(prev).add(entry.target.id));
                    }
                });
            },
            { threshold: 0.1 },
        );

        nodeRefs.current.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Hash navigation
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const el = nodeRefs.current.get(id);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setExpandedId(id);
                }, 100);
            }
        }
    }, []);

    const registerNode = useCallback(
        (id: string) => (el: HTMLElement | null) => {
            if (el) nodeRefs.current.set(id, el);
        },
        [],
    );

    const toggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    const internStartIndex = projects.findIndex((p) => p.role === 'Intern');

    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <div className={styles.headerInner}>
                    <h1 className={styles.pageTitle}>Project Timeline</h1>
                    <p className={styles.pageSubtitle}>
                        A chronological record of engineering projects — from early prototyping through
                        production-scale platforms.
                    </p>
                    <div className={styles.headerStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>
                                {projects.filter((p) => p.status === 'current').length}
                            </span>
                            <span className={styles.statLabel}>Active</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>
                                {projects.filter((p) => p.status === 'completed').length}
                            </span>
                            <span className={styles.statLabel}>Completed</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>{projects.length}</span>
                            <span className={styles.statLabel}>Total</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className={styles.timeline} ref={timelineRef}>
                {/* Spine background + animated fill */}
                <div className={styles.spine} />
                <div className={styles.spineFill} style={{ height: `${scrollProgress}%` }} />

                {/* Start marker */}
                <div className={styles.timelineMarker}>
                    <div className={styles.markerDot} />
                    <span className={styles.markerLabel}>Present</span>
                </div>

                {/* Role: Engineer 1 */}
                <div className={styles.roleMarker}>
                    <div className={styles.roleInner}>
                        <span className={styles.roleLabel}>Engineer 1</span>
                        <span className={styles.rolePeriod}>Jan 2024 – Present</span>
                    </div>
                </div>

                {projects.map((project, index) => {
                    const isLeft = index % 2 === 0;
                    const isVisible = visibleNodes.has(project.id);
                    const isExpanded = expandedId === project.id;

                    return (
                        <Fragment key={project.id}>
                            {index === internStartIndex && (
                                <div className={styles.roleMarker}>
                                    <div className={styles.roleInner}>
                                        <span className={styles.roleLabel}>Intern</span>
                                        <span className={styles.rolePeriod}>May – Dec 2023</span>
                                    </div>
                                </div>
                            )}

                            <div
                                id={project.id}
                                ref={registerNode(project.id)}
                                className={[
                                    styles.node,
                                    isLeft ? styles.nodeLeft : styles.nodeRight,
                                    isVisible ? styles.nodeVisible : '',
                                    isExpanded ? styles.nodeExpanded : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                                style={{ transitionDelay: isVisible ? '0ms' : `${(index % 3) * 100}ms` }}
                                onClick={() => toggleExpand(project.id)}
                            >
                                <div className={styles.connector} />
                                <div
                                    className={[
                                        styles.dot,
                                        project.status === 'current' ? styles.dotCurrent : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                />

                                <div
                                    className={[
                                        styles.card,
                                        project.status === 'current' ? styles.cardCurrent : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                >
                                    {/* Index number */}
                                    <span className={styles.cardIndex}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    <div className={styles.cardMeta}>
                                        <span className={styles.cardDate}>{project.date}</span>
                                        <span
                                            className={[
                                                styles.statusPill,
                                                project.status === 'current'
                                                    ? styles.statusCurrent
                                                    : styles.statusCompleted,
                                            ].join(' ')}
                                        >
                                            {project.status}
                                        </span>
                                    </div>

                                    <h3 className={styles.cardTitle}>{project.title}</h3>
                                    {project.subtitle && (
                                        <span className={styles.cardSubtitle}>{project.subtitle}</span>
                                    )}

                                    <p className={styles.cardSummary}>{project.summary}</p>

                                    {/* Expand chevron */}
                                    <div className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}>
                                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                                            <path
                                                d="M1 1L7 7L13 1"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="square"
                                            />
                                        </svg>
                                    </div>

                                    {/* Expandable detail */}
                                    <div className={`${styles.detail} ${isExpanded ? styles.detailOpen : ''}`}>
                                        <div className={styles.detailDivider} />
                                        <div className={styles.detailBlock}>
                                            <span className={styles.detailLabel}>Problem</span>
                                            <p className={styles.detailText}>{project.problem}</p>
                                        </div>
                                        <div className={styles.detailBlock}>
                                            <span className={styles.detailLabel}>Solution</span>
                                            <p className={styles.detailText}>{project.solution}</p>
                                        </div>
                                        {project.appUrl && (
                                            <a
                                                href={project.appUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.launchBtn}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Launch App &rarr;
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    );
                })}

                {/* End marker */}
                <div className={styles.timelineMarker}>
                    <div className={`${styles.markerDot} ${styles.markerDotEnd}`} />
                    <span className={styles.markerLabel}>2023</span>
                </div>
            </div>
        </div>
    );
}

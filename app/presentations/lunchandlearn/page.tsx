'use client';

import { useEffect, useRef, useState, useMemo, Fragment } from 'react';
import styles from './Presentation.module.css';
import Navbar from '@/components/Navbar';

// --- Types ---

type SlideLayout =
    | 'hero'
    | 'painBoard'
    | 'processLoop'
    | 'productComplexity'
    | 'ruleEngineEvolution'
    | 'platformOrchestration'
    | 'microAutomation'
    | 'principlesGrid'
    | 'scoreboard'
    | 'backlogBoard'
    | 'guidedDemo';

interface SlideData {
    id: string;
    title: string;
    subtitle?: string;
    breadcrumb: string;
    takeaway?: string;
    hideTakeaway?: boolean;
    summary: string;
    intent: string;
    layout: SlideLayout;
    content: React.ReactNode;
}

// --- Structural Components ---

const ProgressDots = ({ current, total }: { current: number, total: number }) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
            <div
                key={i}
                style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: i === current ? 'var(--brand-orange)' : 'var(--border)',
                    transition: 'all 0.3s ease',
                    transform: i === current ? 'scale(1.4)' : 'none'
                }}
            />
        ))}
        <span style={{ fontSize: '0.65rem', fontWeight: 800, marginLeft: '8px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            {String(current + 1).padStart(2, '0')} / {total}
        </span>
    </div>
);

const SlideHeader = ({ title, subtitle, breadcrumb, index, total }: { title: string, subtitle?: string, breadcrumb: string, index: number, total: number }) => (
    <div className={styles.headerZone}>
        <div className={styles.animateIn}>
            <h2 style={{ margin: 0, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>{title}</h2>
            {subtitle && <p style={{ margin: '2px 0 0 0', fontSize: '0.81rem', color: 'var(--brand-orange)', fontWeight: 800 }}>{subtitle}</p>}
        </div>
        <div className={`${styles.animateIn} ${styles.headerInfo}`}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', fontWeight: 900 }}>
                {breadcrumb}
            </div>
            <ProgressDots current={index} total={total} />
        </div>
    </div>
);

const TakeawayBand = ({ text }: { text: string }) => (
    <div className={styles.footerZone}>
        <div className={styles.animateIn} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{
                background: 'var(--brand-orange)',
                color: 'var(--brand-black)',
                padding: '4px 12px',
                fontWeight: 900,
                fontSize: '0.75rem',
                letterSpacing: '0.05em'
            }}>
                TAKEAWAY
            </div>
            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.01em' }}>{text}</p>
        </div>
    </div>
);

const SlideShell = ({
    slide,
    index,
    total,
    isVisible,
    children
}: {
    slide: SlideData,
    index: number,
    total: number,
    isVisible: boolean,
    children: React.ReactNode
}) => {
    const showFooter = !slide.hideTakeaway && !!slide.takeaway;
    const showHeader = index > 0; // Hide header on Hero slide to make room for Navbar

    return (
        <section
            data-index={index}
            className={`${styles.slide} ${styles[slide.layout]} ${isVisible ? styles.visible : ''} ${showFooter ? styles.hasFooter : styles.noFooter} ${!showHeader ? styles.noHeader : ''}`}
        >
            {showHeader && (
                <SlideHeader title={slide.title}
                    subtitle={slide.subtitle}
                    breadcrumb={slide.breadcrumb}
                    index={index}
                    total={total}
                />
            )}
            <main className={styles.mainZone}>
                <div className={`${styles.animateIn} ${styles.mainInner}`}>{children}</div>
            </main>

            {showFooter && <TakeawayBand text={slide.takeaway!} />}
        </section>
    );
};

// --- Specialized Layout Content ---

const WorkflowFriction = () => (
    <div className={styles.workflowContainer}>
        <div className={styles.workflowStages}>
            {[
                {
                    title: 'DESIGN',
                    bullets: [
                        'Manual constraint interpretation',
                        'Training-dependent outcomes',
                        'Logic spread across multiple files'
                    ]
                },
                {
                    title: 'VALIDATION',
                    bullets: [
                        'Late-stage rule discovery',
                        'Cross-zone or compliance mismatches',
                        'Rework after calculation'
                    ]
                },
                {
                    title: 'QUOTING',
                    bullets: [
                        'Pricing + partcode reconciliation',
                        'Engineering dependency for confirmation',
                        'Slower turnaround'
                    ]
                },
                {
                    title: 'DELIVERY',
                    bullets: [
                        'Inconsistent BOM documentation',
                        'Audit variance',
                        'Output standardization gaps'
                    ]
                }
            ].map((stage, i) => (
                <div key={i} className={`${styles.workflowStage} ${styles[`delay${i + 1}`]}`}>
                    <div className={styles.stageHeader}>
                        {stage.title}
                        {i < 3 && <div className={styles.stageArrow}>→</div>}
                    </div>
                    <ul className={styles.stageBullets}>
                        {stage.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        <div className={styles.workflowCaption}>
            “Fragmented logic shifts validation downstream and multiplies risk.”
        </div>
    </div>
);


const ProcessLoop = () => {
    const steps = [
        {
            icon: '💡',
            title: 'Discovery',
            desc: 'Validate value, scope, and cross-department impact before building.',
            stakeholders: [
                'Product Management',
                'Project Engineering',
            ],
            value: [
                'Strategic Alignment',
                'Risk Reduction'
            ]
        },
        {
            icon: '🔍',
            title: 'Immersion',
            desc: 'Map real use cases, constraints, and edge conditions.',
            stakeholders: [
                'Project Engineering',
                'Applications Engineering',
                'Customer Care',
                'End Users'
            ],
            value: [
                'Use-Case Clarity',
                'Requirement Confidence'
            ]
        },
        {
            icon: '🧱',
            title: 'Architecture',
            desc: 'Define data models, rules, system boundaries, and visibility.',
            stakeholders: [
                'Project Engineering',
                'IT',
            ],
            value: [
                'Scalable Framework',
                'Standards Enforcement'
            ]
        },
        {
            icon: '🧪',
            title: 'Prototype',
            desc: 'Prove feasibility with a minimal, validated build.',
            stakeholders: [
                'Project Engineering',
                'Applications Engineering'
            ],
            value: [
                'Feasibility Validation',
                'Accelerated Learning'
            ]
        },
        {
            icon: '🔁',
            title: 'Validation Sprints',
            desc: 'Pressure-test assumptions and iterate through structured feedback.',
            stakeholders: [
                'Internal Testing Group',
                'Product Management',],
            value: [
                'Accuracy',
                'Operational Confidence'
            ]
        },
        {
            icon: '🚀',
            title: 'Deploy & Sustain',
            desc: 'Release, align stakeholders, and continuously improve.',
            stakeholders: [
                'Sales',
                'Marketing',
                'Legal',
                'IT',
                'Customer Care'
            ],
            value: [
                'Adoption',
                'Continuous Improvement'
            ]
        }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [cumulativeIndex, setCumulativeIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % steps.length);
            setCumulativeIndex((prev) => prev + 1);
        }, 8000);
        return () => clearInterval(interval);
    }, [isHovered, steps.length]);

    const handleNodeClick = (index: number) => {
        // Calculate the shortest forward distance to the clicked node
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
                    {/* SVG Circular Track and Dynamic Highlight */}
                    <svg className={styles.loopSvg} viewBox="0 0 440 440">
                        {/* Base track */}
                        <circle
                            cx="220"
                            cy="220"
                            r="170"
                            className={styles.svgTrack}
                        />
                        {/* Interactive Highlight Segment (120 degrees = from prev to next) */}
                        <circle
                            cx="220"
                            cy="220"
                            r="170"
                            className={styles.svgHighlight}
                            style={{
                                transform: `rotate(${(cumulativeIndex * 60) - 150}deg)`,
                                transformOrigin: 'center'
                            }}
                        />
                    </svg>

                    {steps.map((step, i) => {
                        const angle = i * 60; // 0deg is top
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
};

// --- Slide 4: Product Complexity ---

const ProductComplexity = () => (
    <div className={styles.productComplexity}>
        {/* Left: Vortex */}
        <section className={styles.productCard}>
            <div className={styles.productHeader}>
                <div className={styles.productBadge}>SYSTEM CASE A</div>
                <h3 className={styles.productTitle}>VORTEX HYBRID SYSTEM</h3>
                <p className={styles.productSub}>
                    Hybrid dual-agent suppression for mission-critical applications.
                </p>
            </div>

            <div className={styles.productSections}>
                <div className={styles.productSection}>
                    <div className={styles.sectionLabel}>Core Capability</div>
                    <ul className={styles.productList}>
                        <li>Hybrid media discharge (atomized water + nitrogen)</li>
                        <li>Effective in water-sensitive + energized environments</li>
                        <li>Environmentally safe, minimal asset damage</li>
                    </ul>
                </div>

                <div className={styles.productSection}>
                    <div className={styles.sectionLabel}>System Complexity</div>
                    <ul className={styles.productList}>
                        <li>Full system design required before sizing + pricing</li>
                        <li>Logic, partcodes, and pricing fragmented across spreadsheets</li>
                        <li>Method-specific agency rules layered onto constraints</li>
                        <li>Training-dependent design expertise</li>
                    </ul>
                </div>

                <div className={styles.productSection}>
                    <div className={styles.sectionLabel}>Where Friction Appears</div>
                    <div className={styles.frictionChips}>
                        {[
                            'Engineering Bottlenecks',
                            'Spreadsheet Variance',
                            'Human Data Entry Error',
                            'Exponential Design Time'
                        ].map((t) => (
                            <span key={t} className={styles.frictionChip}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        {/* Right: VicFlex */}
        <section className={styles.productCard}>
            <div className={styles.productHeader}>
                <div className={styles.productBadge}>SYSTEM CASE B</div>
                <h3 className={styles.productTitle}>VICFLEX FLEXIBLE FITTINGS</h3>
                <p className={styles.productSub}>
                    Modular sprinkler connection system across diverse install conditions.
                </p>
            </div>

            <div className={styles.productSections}>
                <div className={styles.productSection}>
                    <div className={styles.sectionLabel}>Core Capability</div>
                    <ul className={styles.productList}>
                        <li>Modular flexible sprinkler connectivity</li>
                        <li>Engineered assemblies for multiple ceiling types</li>
                        <li>Accelerated installation vs traditional pipe</li>
                    </ul>
                </div>

                <div className={styles.productSection}>
                    <div className={styles.sectionLabel}>System Complexity</div>
                    <ul className={styles.productList}>
                        <li>Large compatibility matrix across product lines</li>
                        <li>High configuration variability per application</li>
                        <li>Application-specific constraints (layout, hazard, ceiling)</li>
                        <li>Repetitive but non-identical design requests</li>
                    </ul>
                </div>

                <div className={styles.productSection}>
                    <div className={styles.sectionLabel}>Where Friction Appears</div>
                    <div className={styles.frictionChips}>
                        {[
                            'Engineering Gatekeeping',
                            'Sales Information Gaps',
                            'Quoting Delays',
                            'Lost Velocity'
                        ].map((t) => (
                            <span key={t} className={styles.frictionChip}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
);
const RuleEngineEvolution = () => (
    <div className={styles.judgmentFlow}>
        {/* LEFT: Fragmentation */}
        <div className={styles.flowCol}>

            <h4 className={styles.colLabel}>BEFORE</h4>

            <div className={styles.sheetStack}>
                <div className={styles.sheetCard}>Pricing</div>
                <div className={styles.sheetCard}>Partcodes</div>
                <div className={styles.sheetCard}>
                    Calculation Logic
                </div>
                <div className={styles.sheetCard}>Design Reviews</div>

            </div>
            <div className={styles.tinyCaption}>Fragmented design workflow</div>
        </div>

        <div className={styles.flowArrow}>→</div>

        {/* CENTER: Rules Engine */}
        <div className={styles.flowCol}>
            <h4 className={styles.colLabel}>Vortex Estimator Tool → Vortex Configurator</h4>
            <div className={styles.engineCard}>
                <div className={styles.engineHeader}>VALIDATION ENGINE</div>
                <div className={styles.engineBody}>
                    <div className={styles.engineModule}>Centralizes design logic</div>
                    <div className={styles.engineModule}>Enforces constraints at input</div>
                    <div className={styles.engineModule}>Applies method-specific compliance </div>
                    <div className={styles.engineModule}>Links calculations to partcodes + pricing</div>
                    <div className={styles.engineModule}>Generates standardized outputs </div>
                </div>
            </div>
            <div className={styles.tinyCaption}>Validation moved upstream</div>
        </div>

        <div className={styles.flowArrow}>→</div>

        {/* RIGHT: Standardized Outputs */}
        <div className={styles.flowCol}>
            <h4 className={styles.colLabel}>AFTER</h4>
            <div className={styles.outputStack}>
                {[
                    'Consistent Results',
                    'Faster Validation',
                    'Reduced Rework',
                    'Lower Risk'
                ].map((item) => (
                    <div
                        key={item}
                        className={styles.outputTile}
                    >
                        <span className={styles.checkIcon}>✓</span>
                        {item}
                    </div>
                ))}
            </div>
            <div className={styles.tinyCaption}>Standardized results at scale</div>

        </div>
    </div>
);
const PlatformModelComparison = () => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Stages: 0:Start, 1-3:Before, 4:Pause (Before done), 5-9:After, 10:Hold (After done)
        let timeout: NodeJS.Timeout;

        const duration = stage === 4 ? 3000 : // Pause after "Before"
            stage === 10 ? 12000 : // Long pause before loop restarts
                1500; // Normal step duration

        timeout = setTimeout(() => {
            setStage((prev) => (prev + 1) % 11);
        }, duration);

        return () => clearTimeout(timeout);
    }, [stage]);

    const isVisible = (s: number) => stage >= s;
    const isAfterActive = stage >= 5;

    return (
        <div className={styles.comparisonContainer}>
            <div className={styles.modelSplit}>
                {/* TOP ROW: BEFORE */}
                <div className={`${styles.comparisonRow} ${styles.beforeRow} ${stage >= 1 && stage < 5 ? styles.activeRow : ''}`}>
                    <div className={styles.rowLabel}>Independent System Calculations</div>
                    <div className={styles.flowCanvas}>
                        <div className={styles.flowRow}>
                            <div className={styles.convergence} style={{ flexDirection: 'row', gap: '4px' }}>
                                <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(1) ? styles.visible : ''}`}>Zone A</div>
                                <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(1) ? styles.visible : ''}`}>Zone B</div>
                            </div>
                            <div className={`${styles.connector} ${isVisible(2) ? styles.visible : ''}`}>→</div>
                            <div className={`${styles.node} ${isVisible(2) ? styles.visible : ''} ${isVisible(2) && !isAfterActive ? styles.active : ''}`}>System 1</div>
                            <div className={`${styles.connector} ${isVisible(3) ? styles.visible : ''}`}>→</div>
                            <div className={`${styles.node} ${styles.nodeOutput} ${isVisible(3) ? styles.visible : ''}`}>Output 1</div>
                        </div>
                        <div className={styles.flowRow}>
                            <div className={styles.convergence} style={{ flexDirection: 'row', gap: '4px' }}>
                                <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(1) ? styles.visible : ''}`}>Zone C</div>
                                <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(1) ? styles.visible : ''}`}>Zone D</div>
                            </div>
                            <div className={`${styles.connector} ${isVisible(2) ? styles.visible : ''}`}>→</div>
                            <div className={`${styles.node} ${isVisible(2) ? styles.visible : ''} ${isVisible(2) && !isAfterActive ? styles.active : ''}`}>System 2</div>
                            <div className={`${styles.connector} ${isVisible(3) ? styles.visible : ''}`}>→</div>
                            <div className={`${styles.node} ${styles.nodeOutput} ${isVisible(3) ? styles.visible : ''}`}>Output 2</div>
                        </div>                                      </div>
                    <div className={styles.rowCaption}>“Multiple system-level outputs. Manual project reconciliation.”</div>
                </div>

                {/* BOTTOM ROW: AFTER */}
                <div className={`${styles.comparisonRow} ${styles.afterRow} ${stage >= 5 ? styles.activeRow : ''}`}>
                    <div className={styles.rowLabel}>Project-Level Hierarchy</div>

                    <div className={styles.hierarchyGrid}>
                        {/* ROWS 1-4 GENERATION */}
                        {['A', 'B', 'C', 'D'].map((zoneChar, i) => {
                            const row = i + 1;
                            const enc1 = String.fromCharCode(65 + i * 2);     // A, C, E, G
                            const enc2 = String.fromCharCode(65 + i * 2 + 1); // B, D, F, H

                            return (
                                <Fragment key={zoneChar}>
                                    {/* Column 1: Enc 1 */}
                                    <div className={styles.gridCell} style={{ gridColumn: 1, gridRow: row }}>
                                        <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(5) ? styles.visible : ''}`}>
                                            Enc {enc1}
                                        </div>
                                    </div>

                                    {/* Column 2: Enc 2 */}
                                    <div className={styles.gridCell} style={{ gridColumn: 3, gridRow: row }}>
                                        <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(5) ? styles.visible : ''}`}>
                                            Enc {enc2}
                                        </div>
                                    </div>

                                    {/* Arrow 2 */}
                                    <div className={`${styles.gridConnector} ${isVisible(6) ? styles.visible : ''}`} style={{ gridColumn: 4, gridRow: row }}>→</div>

                                    {/* Column 3: Zone */}
                                    <div className={styles.gridCell} style={{ gridColumn: 5, gridRow: row }}>
                                        <div className={`${styles.node} ${styles.nodeSmall} ${isVisible(6) ? styles.visible : ''}`}>
                                            Zone {zoneChar}
                                        </div>
                                    </div>

                                </Fragment>
                            );
                        })}
                        {/* Arrow 3 (Feeding System) */}
                        <div className={`${styles.gridConnector} ${isVisible(7) ? styles.visible : ''}`} style={{ gridColumn: 6, gridRow: '1 / span 2' }}>→</div>

                        {/* SYSTEM NODES (Spanning 2 Rows) */}
                        {/* System 1 (Rows 1-2) */}
                        <div className={`${styles.systemNodeGroup} ${isVisible(7) ? styles.active : ''}`} style={{ gridRow: '1 / span 2' }}>
                            <div className={`${styles.node} ${isVisible(7) ? styles.visible : ''}`}>
                                System 1
                            </div>
                        </div>

                        {/* Arrow 3 (Feeding System) */}
                        <div className={`${styles.gridConnector} ${isVisible(7) ? styles.visible : ''}`} style={{ gridColumn: 6, gridRow: '3 / span 2' }}>→</div>
                        {/* System 2 (Rows 3-4) */}
                        <div className={`${styles.systemNodeGroup} ${isVisible(7) ? styles.active : ''}`} style={{ gridRow: '3 / span 2' }}>
                            <div className={`${styles.node} ${isVisible(7) ? styles.visible : ''}`}>
                                System 2
                            </div>
                        </div>

                        {/* Arrow 4 (System -> Project) - Spanned Connector */}
                        <div className={`${styles.gridConnector} ${isVisible(8) ? styles.visible : ''}`} style={{ gridColumn: 8, gridRow: '1 / span 4' }}>→</div>

                        {/* PROJECT NODE (Spans 4 Rows) */}
                        <div className={styles.projectNodeGroup}>
                            <div className={`${styles.node} ${styles.nodeLarge} ${isVisible(8) ? styles.visible : ''} ${isVisible(8) ? styles.active : ''}`}>
                                PROJECT
                            </div>
                        </div>

                        {/* Arrow 5 (Project -> Output) */}
                        <div className={`${styles.gridConnector} ${isVisible(9) ? styles.visible : ''}`} style={{ gridColumn: 10, gridRow: '1 / span 4' }}>→</div>

                        {/* OUTPUT NODE (Spans 4 Rows) */}
                        <div className={styles.outputNodeGroup}>
                            <div className={`${styles.node} ${styles.nodeLarge} ${styles.nodeUnified} ${isVisible(9) ? styles.visible : ''}`}>
                                UNIFIED OUTPUT
                            </div>
                        </div>

                    </div>

                    <div className={styles.rowCaption}>“”</div>
                </div>
            </div>

            <div className={styles.capabilityPanel}>
                <h3 className={styles.capabilityTitle}>PLATFORM ORCHESTRATION</h3>
                <ul className={styles.capabilityList}>
                    <li><strong>Model:</strong> enclosure → zone → system → project modeling</li>
                    <li><strong>Validate:</strong> cross-system validation logic</li>
                    <li><strong>Aggregate:</strong> centralized BOM aggregation</li>
                    <li><strong>Standardize:</strong> project-level documentation</li>
                    <li><strong>Guide:</strong> warnings, tutorials, error codes</li>
                </ul>
                <p className={styles.capabilityCaption}>Scaling from system validation to project-wide coordination.</p>
            </div>
        </div>
    );
};
const MicroAutomation = () => (
    <div className={styles.microContainer}>

        <div className={styles.microProblem}>
            <h4>High-Frequency Bottleneck</h4>
            <p>
                Engineers repeatedly filtered bracket compatibility
                across matrices and PDF references.
            </p>
        </div>

        <div className={styles.microImpact}>
            <div className={styles.microMetric}>
                40+ Repetitions
            </div>
            <div className={styles.microMetricLabel}>
                Per Project
            </div>
        </div>

        <div className={styles.microResult}>
            <ul>
                <li>Instant compatible outputs</li>
                <li>Zero interpretation risk</li>
                <li>No engineering gatekeeping</li>
            </ul>
        </div>

    </div>
);

const PrinciplesGrid = () => (
    <div className={styles.principlesItems}>
        {[
            { icon: '🛡️', title: 'Validate Early', desc: 'Stop errors at the point of entry.' },
            { icon: '🔗', title: 'Encode Rules', desc: 'Translate manuals into logic constraints.' },
            { icon: '✂️', title: 'Cut Handoffs', desc: 'Single data entry from sales to build.' },
            { icon: '📏', title: 'Standardize', desc: 'Uniform outputs for every stakeholder.' },
            { icon: '🏛️', title: 'Institutionalize', desc: 'Memory lives in code, not individuals.' },
            { icon: '🎯', title: 'High Coherence', desc: 'Pricing and config always match.' }
        ].map((p, i) => (
            <div key={i} className={styles.principleTile}>
                <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{p.icon}</div>
                <h4>{p.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.desc}</p>
            </div>
        ))}
    </div>
);

const Scoreboard = () => (
    <div className={styles.scoreboard}>
        <div className={styles.impactGrid}>
            {[
                { label: 'TIME SAVED', val: '400h+', sub: 'Annual / Lab Ops', type: 'Estimated' },
                { label: 'RISK REDUCTION', val: '80%', sub: 'Logic Regressions', type: 'Observed' },
                { label: 'CONSISTENCY', val: '100%', sub: 'Output Formats', type: 'Qualitative' }
            ].map((k, i) => (
                <div key={i} className={styles.statCard} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '10px' }}>{k.type}</div>
                    <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--brand-orange)' }}>{k.val}</div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{k.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--brand-blue)' }}>{k.sub}</div>
                </div>
            ))}
        </div>
        <div className={styles.milestoneContainer}>
            {['V1 Launch', 'Builder Beta', 'Global Release', 'AI Integration'].map((m, i) => (
                <div key={i} className={styles.milestone}>
                    <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>{m}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Q{i + 1} 2026</div>
                </div>
            ))}
        </div>
    </div>
);

const BacklogBoard = () => (
    <div className={styles.backlogGrid}>
        {[
            { title: 'High Value / Easy', items: ['Auto-partcode Gen', 'Margin Guardrails'] },
            { title: 'High Value / Hard', items: ['3D Zone Preview', 'ERP Direct Sync'] },
            { title: 'Needs Discovery', items: ['Field Image Ingestion', 'Mobile App Sync'] }
        ].map((col, i) => (
            <div key={i} className={styles.backlogColumn}>
                <h4>{col.title}</h4>
                {col.items.map(item => (
                    <div key={item} className={styles.backlogItem}>
                        <div style={{ fontWeight: 800 }}>{item}</div>
                    </div>
                ))}
            </div>
        ))}
    </div>
);

const GuidedDemo = () => (
    <div className={styles.demoLayout}>
        <div className={styles.stepper}>
            {['Load Preset', 'Define Zones', 'Resolve Warnings', 'Export BOM'].map((step, i) => (
                <div key={step} className={`${styles.step} ${i === 1 ? styles.stepActive : ''}`}>
                    STEP 0{i + 1}: {step}
                </div>
            ))}
        </div>
        <div style={{ background: 'var(--brand-black)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', padding: '40px' }}>
            <div className={styles.animateIn}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏗️</div>
                <h3>DEMO MODE ACTIVE</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Interactive platform view ready for live walkthrough.</p>
                <button style={{ background: 'var(--brand-orange)', color: 'var(--brand-black)', border: 'none', padding: '10px 20px', fontWeight: 900, marginTop: '20px' }}>LAUNCH BUILDER</button>
            </div>
        </div>
    </div>
);

// --- Main Page ---

export default function LunchAndLearnPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState<Set<number>>(new Set([0]));
    const [showNotes, setShowNotes] = useState(false);

    const slides: SlideData[] = useMemo(() => [
        {
            id: 'hero',
            title: 'Delivering Engineering Software Solutions',
            subtitle: 'Reducing risk and scaling knowledge across the product lifecycle',
            breadcrumb: 'CONTEXT',
            takeaway:
                'When workflow rules are encoded into systems, risk drops and efficiency scales.',
            summary:
                'Introduce the talk as a cross-functional, systems-driven approach to reducing manual friction and operational risk.',
            intent:
                'Establish positioning as a strategic, cross-department systems builder.',
            layout: 'hero',
            hideTakeaway: true,
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Local Navbar - Scrolls away with this slide */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }}>
                        <Navbar />
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                        <h1 style={{ marginBottom: 20 }}>
                            FROM WORKFLOW FRICTION
                            TO VALIDATED SYSTEMS
                        </h1>

                        <p
                            style={{
                                fontSize: '1.2rem',
                                opacity: 0.85,
                                color: 'white',
                                fontWeight: 600,
                            }}
                        >
                            Cross-functional engineering workflows translated into reliable,
                            scalable software platforms.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'pain',
            title: 'Where Risk Enters the Workflow',
            subtitle: 'When system logic is fragmented, friction appears at every stage of design and delivery.',
            breadcrumb: 'FRICTION',
            takeaway:
                'When validation happens late, friction multiplies across the workflow.',
            summary:
                'Show where risk enters the engineering workflow when complex systems are designed using fragmented logic.',
            intent:
                'Demonstrate that "friction" is a structural workflow problem, not just an organizational one.',
            layout: 'painBoard',
            content: <WorkflowFriction />
        },
        {
            id: '3',
            title: 'How I Build Internal Platforms',
            subtitle: 'A cross-functional workflow from concept → deployment.',
            breadcrumb: 'Systems',
            takeaway: 'Alignment + validation + iteration is what makes tools scalable.',
            summary:
                'I follow a formal product lifecycle even for internal tools. This includes immersion with project engineers, prototyping with calc designers, and validation sprints with test groups.',
            intent:
                'Demonstrate operational rigor and empathy for the end-user (engineer/designer).',
            layout: 'processLoop',
            content: <ProcessLoop />
        },
        {
            id: 'systems-practice',
            title: 'Powerful Products. Complex Systems.',
            subtitle: 'Engineering excellence introduces configuration complexity.',
            breadcrumb: 'SYSTEMS → APPLICATION',
            takeaway: 'As product capability increases, structured tooling becomes necessary to reduce risk and variability.',
            summary:
                'Increased product capability naturally results in system-level configuration density. Structured engineering platforms are necessary to translate this complexity into consistent, risk-mitigated outputs.',
            intent: 'Demonstrate product depth understanding and set up case studies as necessary solutions—not optional tools.',
            layout: 'productComplexity',
            content: <ProductComplexity />
        },
        {
            id: 'configurator',
            title: 'Encoding Engineering Judgment',
            subtitle: 'Case Study 1: From manual variance to rule-based validation',
            breadcrumb: 'SYSTEMS → CASE STUDIES',
            takeaway:
                'When requirements become code, outputs become consistent — and risk shifts upstream.',
            summary:
                'Demonstrates the transition from spreadsheet-based logic to an encoded rules engine with real-time validation and standardized outputs.',
            intent:
                'Prove that automation here means structural risk reduction, not just calculation speed.',
            layout: 'ruleEngineEvolution',
            content: <RuleEngineEvolution />
        },
        {
            id: 'builder',
            title: 'From Tool to Platform',
            subtitle: 'Project-Level Orchestration',
            breadcrumb: 'SCALING CAPABILITY',
            takeaway: 'Project-level hierarchy turns many enclosures into one consistent BOM and documentation set.',
            summary: 'Shows how enclosure → zone → system → project aggregation enables cross-zone validation and standardized outputs.',
            intent: 'Highlight the shift from single-system validation to project-wide coordination and repeatable deliverables.',
            layout: 'platformOrchestration',
            content: <PlatformModelComparison />
        },
        {
            id: 'bracket',
            title: 'Small Automation, Big Leverage',
            subtitle: 'Case Study 3: Eliminating a high-frequency bottleneck',
            breadcrumb: 'SYSTEMS → CASE STUDIES',
            takeaway:
                'Automating the decisions made 40 times creates more impact than optimizing the ones made once.',
            summary:
                'Illustrates how targeted automation of repetitive calculations reduces engineering gatekeeping and accelerates quoting.',
            intent:
                'Show that structured thinking scales from large platforms down to small, high-frequency workflows.',
            layout: 'microAutomation',
            content: <MicroAutomation />
        },

        {
            id: 'principles',
            title: 'The Automation Playbook',
            subtitle: 'Principles that guide the work',
            breadcrumb: 'Approach → Principles → Future',
            takeaway: 'The goal is to make the correct way the easy way.',
            summary: 'Synthesize lessons into repeatable approach.',
            intent: 'Elevate from "tools" to "systems".',
            layout: 'principlesGrid',
            content: <PrinciplesGrid />
        },
        {
            id: 'impact',
            title: 'Impact You Can Feel',
            subtitle: 'Reliability, Speed, & Consistency',
            breadcrumb: 'Approach → Principles → Future',
            takeaway: 'Automation isn’t about flash—it’s about workflow reliability.',
            summary: 'Make impact concrete with KPIs.',
            intent: 'Translate work into business benefits.',
            layout: 'scoreboard',
            content: <Scoreboard />
        },
        {
            id: 'next',
            title: 'What should we automate next?',
            subtitle: 'Turn friction into a backlog',
            breadcrumb: 'Approach → Principles → Future',
            takeaway: 'If a workflow is repetitive and rule-based, it’s a candidate for code.',
            summary: 'Invite collaboration on future friction.',
            intent: 'Spark discussion and generate projects.',
            layout: 'backlogBoard',
            content: <BacklogBoard />
        },
        {
            id: 'demo',
            title: 'Guided Demo Mode',
            subtitle: 'Vortex Builder v2.4 Live Preview',
            breadcrumb: 'Live Demo',
            takeaway: 'From input to design-ready output—without spreadsheet archaeology.',
            summary: 'Deterministic demo mode end-to-end.',
            intent: 'End with tangible experience of improvements.',
            layout: 'guidedDemo',
            content: <GuidedDemo />
        }
    ], []);

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
    }, [currentSlideIndex, slides.length]);

    const scrollToSlide = (index: number) => {
        if (index >= 0 && index < slides.length) {
            document.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const currentSlide = slides[currentSlideIndex];

    return (
        <div
            ref={containerRef}
            className={styles.presentationContainer}
        >
            {/* Mobile Progress Bar */}
            <div className={styles.mobileProgress}>
                <div style={{ width: '100%', height: '4px', background: 'var(--border)', position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${((currentSlideIndex + 1) / slides.length) * 100}%`,
                        background: 'var(--brand-orange)',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
                <div style={{ marginLeft: '15px', fontSize: '0.65rem', fontWeight: 900, color: 'var(--brand-orange)', whiteSpace: 'nowrap' }}>
                    {currentSlide.title}
                </div>
            </div>

            {/* Sidebar Tracker */}
            <aside className={styles.sidebarTracker}>
                <div style={{ paddingBottom: '20px', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--brand-orange)', letterSpacing: '0.1em' }}>LUNCH & LEARN</h4>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--brand-black)' }}>From Workflow Friction to Validated Systems</p>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--brand-orange)' }}>Presenter: Chenla Long, Jr - Fire Suppression Technology</p>
                </div>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`${styles.progressItem} ${index === currentSlideIndex ? styles.activeProgress : ''}`}
                        onClick={() => scrollToSlide(index)}
                    >
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginRight: '8px', opacity: 0.5 }}>{String(index + 1).padStart(2, '0')}</span>
                        {slide.title}
                    </div>
                ))}
                <div style={{ marginTop: 'auto', paddingTop: '20px', fontSize: '0.6rem', color: 'var(--text-muted)', opacity: 0.5 }}>
                    Press 'N' for presenter notes
                </div>
            </aside>

            {/* Slides */}
            {slides.map((slide, index) => (
                <SlideShell
                    key={slide.id}
                    slide={slide}
                    index={index}
                    total={slides.length}
                    isVisible={visibleSlides.has(index)}
                >
                    {slide.content}
                </SlideShell>
            ))}

            {/* Presenter Notes */}
            {showNotes && (
                <div className={styles.notesOverlay}>
                    <div style={{ color: 'var(--brand-orange)', marginBottom: '12px', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em' }}>PRESENTER NOTES</div>
                    <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: 'white', fontSize: '0.65rem', display: 'block', marginBottom: '4px' }}>INTENT:</strong>
                        <div style={{ opacity: 0.9 }}>{currentSlide.intent}</div>
                    </div>
                    <div>
                        <strong style={{ color: 'white', fontSize: '0.65rem', display: 'block', marginBottom: '4px' }}>SUMMARY:</strong>
                        <div style={{ opacity: 0.9 }}>{currentSlide.summary}</div>
                    </div>
                    <div style={{ marginTop: '20px', fontSize: '0.6rem', opacity: 0.5 }}>Press 'N' to close</div>
                </div>
            )}
        </div>
    );
}

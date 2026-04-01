'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './summary.module.css';

const SECTIONS = [
    { id: 'executive-summary', label: 'Executive Summary' },
    { id: 'pillar-automation', label: 'System Automation & Estimation' },
    { id: 'pillar-test-data', label: 'Test & Data Infrastructure' },
    { id: 'pillar-enablement', label: 'Enablement & Modernization' },
    { id: 'pillar-innovation', label: 'Innovation Research' },
    { id: 'pillar-decision-support', label: 'Decision Support & Field Tools' },
];

export default function SummaryPage() {
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
    const [mobileTocOpen, setMobileTocOpen] = useState(false);
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

    // Scroll spy
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) {
                    const top = visible.reduce((a, b) =>
                        a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
                    );
                    setActiveSection(top.target.id);
                }
            },
            { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
        );

        sectionRefs.current.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const registerSection = useCallback((id: string) => (el: HTMLElement | null) => {
        if (el) sectionRefs.current.set(id, el);
    }, []);

    const scrollTo = (id: string) => {
        sectionRefs.current.get(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileTocOpen(false);
    };

    return (
        <div className={styles.pageContainer}>
            {/* Mobile TOC */}
            <div className={styles.mobileToc}>
                <button className={styles.mobileTocToggle} onClick={() => setMobileTocOpen(!mobileTocOpen)}>
                    <span>Contents</span>
                    <span className={`${styles.mobileTocArrow} ${mobileTocOpen ? styles.mobileTocArrowOpen : ''}`}>
                        &#9660;
                    </span>
                </button>
                {mobileTocOpen && (
                    <div className={styles.mobileTocDropdown}>
                        <ul className={styles.mobileTocList}>
                            {SECTIONS.map((s) => (
                                <li
                                    key={s.id}
                                    className={`${styles.mobileTocItem} ${activeSection === s.id ? styles.mobileTocItemActive : ''}`}
                                    onClick={() => scrollTo(s.id)}
                                >
                                    {s.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Page Header */}
                <header className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Software Portfolio Summary</h1>
                    <p className={styles.pageSubtitle}>
                        Cross-functional tools built to reduce friction, standardize decisions, and scale engineering knowledge.
                    </p>
                    <div className={styles.pageMeta}>
                        <span className={styles.metaItem}>Author <span className={styles.metaValue}>Chenla Long, Jr</span></span>
                        <span className={styles.metaItem}>Status <span className={styles.metaValue}>Draft</span></span>
                        <span className={styles.metaItem}>Last Updated <span className={styles.metaValue}>March 2026</span></span>
                    </div>
                </header>

                {/* Executive Summary */}
                <section id="executive-summary" ref={registerSection('executive-summary')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Executive Summary</h2>
                    <p className={styles.sectionIntro}>
                        My work at Victaulic occupies a unique, cross-functional niche that bridges the gap between hardware
                        R&D, lab testing, and global sales application engineering. By architecting centralized,
                        configuration-driven software platforms, I enable the organization to scale its technical
                        capabilities without incremental headcount.
                    </p>
                </section>

                {/* PILLAR 1: Engineering System Automation & Estimation */}
                <section id="pillar-automation" ref={registerSection('pillar-automation')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Engineering System Automation &amp; Estimation</h2>
                    <p className={styles.sectionIntro}>
                        Accelerating complex system design through the codification of tribal engineering knowledge into real-time validation engines.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What Was Enabled</h3>
                        <p className={styles.bodyText}>
                            Vortex project estimation was historically a manual, spreadsheet-driven process. I progressively automated this workflow by codifying engineering knowledge into software.
                        </p>
                        <p className={styles.bodyText}>
                            What once required days&mdash;or even a week&mdash;of manual calculations can now be reduced to a five-minute conversation to determine system requirements. The Project Builder unifies calculations, standards compliance, real-time pricing, and system-specific BOM generation into a single customer-facing workflow.
                        </p>
                        <p className={styles.bodyText}>
                            Development required close collaboration across engineering, project management, customer care, IT, and packaging, and includes full ownership of the real-time pricing database that powers all estimation outputs.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Evidence</h3>
                        <ul className={styles.evidenceList}>
                            <li className={styles.evidenceItem}>
                                <Link href="/projects#vortex-v2" target="_blank" className={styles.evidenceLink}>
                                    <span className={styles.evidenceTitle}>Vortex Project Builder</span>
                                    <span className={styles.evidenceDesc}>Customer-facing platform for configuring and submitting complex multi-system projects</span>
                                </Link>
                            </li>
                            <li className={styles.evidenceItem}>
                                <Link href="/projects#vortex-v1" target="_blank" className={styles.evidenceLink}>
                                    <span className={styles.evidenceTitle}>Vortex Configurator</span>
                                    <span className={styles.evidenceDesc}>Production tool that replaced manual hand-sizing for single-system estimates and pricing</span>
                                </Link>
                            </li>
                            <li className={styles.evidenceItem}>
                                <Link href="/projects#bom-prototype" target="_blank" className={styles.evidenceLink}>
                                    <span className={styles.evidenceTitle}>Vortex Estimator Tool</span>
                                    <span className={styles.evidenceDesc}>Early prototype used to formalize calculation logic and BOM traceability</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* PILLAR 2: Scalable Test & Data Infrastructure */}
                <section id="pillar-test-data" ref={registerSection('pillar-test-data')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Scalable Test &amp; Data Infrastructure</h2>
                    <p className={styles.sectionIntro}>
                        Increasing R&D throughput and confidence by replacing one-off test builds with reusable, configuration-driven data systems.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What Was Enabled</h3>
                        <p className={styles.bodyText}>
                            R&D and customer testing historically relied on project-specific DAQ builds that limited lab throughput and consumed engineering capacity. Test setups were often tightly coupled to individual campaigns, making reuse, comparison, and certification workflows difficult to scale.
                        </p>
                        <p className={styles.bodyText}>
                            I architected a <strong>configuration-driven DAQ platform</strong> that decouples test logic from hardware wiring and sensor selection. This approach enables the same core system to scale across customer campaigns, internal R&D testing, and future certification cycles without requiring custom rebuilds.
                        </p>
                        <p className={styles.bodyText}>
                            In parallel, I automated certification data pipelines to eliminate manual transcription. The <strong>UL Formatter</strong> pulls results directly from raw test outputs, producing auditable, repeatable reports and significantly reducing the risk of human error in high-stakes certification workflows.
                        </p>
                        <p className={styles.bodyText}>
                            Together, these systems preserve critical lab capacity, improve repeatability, and increase confidence in data used for customer decisions and regulatory submissions.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Evidence</h3>
                        <ul className={styles.evidenceList}>
                            <li className={styles.evidenceItem}>
                                <Link href="/projects#daq" target="_blank" className={styles.evidenceLink}>
                                    <span className={styles.evidenceTitle}>Scalable DAQ Platform (Bechtel Customer Testing)</span>
                                    <span className={styles.evidenceDesc}>Reusable, configuration-driven LabVIEW architecture for campaign-based testing</span>
                                </Link>
                            </li>
                            <li className={styles.evidenceItem}>
                                <Link href="/projects#rd-support" target="_blank" className={styles.evidenceLink}>
                                    <span className={styles.evidenceTitle}>Vortex R&D &amp; Test DAQ Support</span>
                                    <span className={styles.evidenceDesc}>Ongoing lab infrastructure supporting internal development and validation</span>
                                </Link>
                            </li>
                            <li className={styles.evidenceItem}>
                                <Link href="/projects#ul-formatter" target="_blank" className={styles.evidenceLink}>
                                    <span className={styles.evidenceTitle}>UL Formatter</span>
                                    <span className={styles.evidenceDesc}>Automated certification reporting pipeline sourced directly from raw test data</span>
                                </Link>
                            </li>
                            <li className={styles.evidenceItem}>
                                <span className={styles.evidenceTitle}>Test Sheet Automation</span>
                                <span className={styles.evidenceDesc}>Self-service utilities for standardized lab validation and data review</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* PILLAR 3: Engineering Enablement & Workflow Modernization */}
                <section id="pillar-enablement" ref={registerSection('pillar-enablement')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Engineering Enablement &amp; Workflow Modernization</h2>
                    <p className={styles.sectionIntro}>
                        Reducing operational risk and knowledge silos by establishing durable, version-controlled engineering software practices.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What Was Enabled</h3>
                        <p className={styles.bodyText}>
                            As internally developed engineering tools expanded in scope and impact, the limitations of spreadsheet-based distribution and ad-hoc file sharing became a growing source of risk. Updates were difficult to track, logic changes were hard to audit, and long-term ownership was unclear.
                        </p>
                        <p className={styles.bodyText}>
                            I advised and supported the team in adopting <strong>Git and GitHub</strong> as a modern version-control foundation for engineering software. This included guiding best practices around repository structure, change tracking, and collaborative workflows, while working alongside others who executed the implementation.
                        </p>
                        <p className={styles.bodyText}>
                            In coordination with IT, I also helped establish a controlled publishing path for internal engineering tools. This ensured that deployed applications are <strong>traceable, maintainable, and resilient to personnel changes</strong>, significantly reducing the long-term &quot;bus factor&quot; associated with legacy workflows.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Evidence</h3>
                        <ul className={styles.evidenceList}>
                            <li className={styles.evidenceItem}>
                                <span className={styles.evidenceTitle}>Git &amp; GitHub Adoption</span>
                                <span className={styles.evidenceDesc}>Advisory leadership on version control strategy and best practices</span>
                            </li>
                            <li className={styles.evidenceItem}>
                                <span className={styles.evidenceTitle}>IT Domain Integration</span>
                                <span className={styles.evidenceDesc}>Controlled publishing and distribution model for internal engineering tools</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* PILLAR 4: Innovation Research & Technical Risk Reduction */}
                <section id="pillar-innovation" ref={registerSection('pillar-innovation')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Innovation Research &amp; Technical Risk Reduction</h2>
                    <p className={styles.sectionIntro}>
                        Reducing uncertainty in future hardware and tooling investments through targeted feasibility research and low-level prototyping.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What Was Enabled</h3>
                        <p className={styles.bodyText}>
                            To inform future tool and automation investments, I conducted feasibility research into computer vision, LiDAR, and embedded control systems. This work focused on evaluating technical viability before committing to production development.
                        </p>
                        <p className={styles.bodyText}>
                            Through <strong>RG5200i Pipe Detection Research</strong>, I explored both machine learning&ndash;based approaches and LiDAR point-cloud workflows to detect pipe geometry and alignment. This included training and evaluating detection models as well as assessing the practical limits of point-cloud&ndash;based analysis in industrial environments.
                        </p>
                        <p className={styles.bodyText}>
                            Separately, I conducted <strong>Stepper Motor Control Loop Research</strong> to evaluate low-level motion control as a potential in-house alternative for future systems. This effort focused on <strong>C++ development, embedded control logic, and direct board-level communication</strong>, expanding internal understanding of real-time control constraints without committing to productization.
                        </p>
                        <p className={styles.bodyText}>
                            These efforts reduced technical uncertainty, expanded internal capability, and provided concrete data to inform future investment decisions.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Evidence</h3>
                        <ul className={styles.evidenceList}>
                            <li className={styles.evidenceItem}>
                                <Link href="/projects#research" target="_blank" className={styles.evidenceLink}>
                                    <span className={styles.evidenceTitle}>RG5200i Pipe Detection Research</span>
                                    <span className={styles.evidenceDesc}>ML-based and LiDAR-based feasibility exploration for pipe detection</span>
                                </Link>
                            </li>
                            <li className={styles.evidenceItem}>
                                <Link href="/projects#stepper-motor" target="_blank" className={styles.evidenceLink}>
                                    <span className={styles.evidenceTitle}>Stepper Motor Control Loop Research</span>
                                    <span className={styles.evidenceDesc}>C++ embedded control and board communication feasibility study</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* PILLAR 5: Decision Support & Field Enablement Tools */}
                <section id="pillar-decision-support" ref={registerSection('pillar-decision-support')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Decision Support &amp; Field Enablement Tools</h2>
                    <p className={styles.sectionIntro}>
                        Accelerating Sales and Field response times by removing recurring engineering bottlenecks from high-frequency decision workflows.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What Was Enabled</h3>
                        <p className={styles.bodyText}>
                            Sales and Field teams frequently require rapid confirmation of product compatibility, installation constraints, and system fit. Historically, these questions interrupted engineering teams and relied on manual lookups, informal guidance, or ad-hoc validation.
                        </p>
                        <p className={styles.bodyText}>
                            I delivered <strong>self-service decision support tools</strong> that decouple routine compatibility checks from engineering availability. By automating the extraction and validation of configuration constraints, these tools provide immediate, data-backed answers while preserving engineering capacity for higher-complexity work.
                        </p>
                        <p className={styles.bodyText}>
                            The <strong>VicFlex Bracket Filter</strong> transforms SolidWorks-derived compatibility data into an intuitive configuration workflow, allowing Sales and Field users to verify valid combinations with visual confirmation. This improves response time, reduces error risk, and increases customer confidence through validated constraints rather than informal guidance.
                        </p>
                        <p className={styles.bodyText}>
                            Collectively, these tools <strong>reduce recurring workflow interruptions</strong>, shorten sales cycles, and ensure consistent application of engineering rules across customer-facing interactions.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Evidence</h3>
                        <ul className={styles.evidenceList}>
                            <li className={styles.evidenceItem}>
                                <Link href="/projects#vicflex" target="_blank" className={styles.evidenceLink}>
                                    <span className={styles.evidenceTitle}>VicFlex Bracket Filter</span>
                                    <span className={styles.evidenceDesc}>Automated compatibility configuration and validation system</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>

            {/* TOC Sidebar */}
            <aside className={styles.tocSidebar}>
                <h3 className={styles.tocHeader}>Contents</h3>
                <ul className={styles.tocList}>
                    {SECTIONS.map((s) => (
                        <li key={s.id}>
                            <div
                                className={`${styles.tocItem} ${activeSection === s.id ? styles.tocItemActive : ''}`}
                                onClick={() => scrollTo(s.id)}
                            >
                                <span className={styles.tocLink}>{s.label}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}

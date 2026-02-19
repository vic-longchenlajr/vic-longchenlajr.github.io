'use client';

import Link from 'next/link';
import styles from './summary.module.css';

export default function SummaryPage() {
    return (
        <div className="container">
            <header>
                <h1>Chenla Long, Jr.</h1>
                <div className="value-statement">
                    Building scalable engineering systems that reduce operational risk and accelerate technical
                    decision-making across the fire protection lifecycle.
                </div>
            </header>

            <main className={styles.mainContent}>
                {/* Executive Summary */}
                <section className={styles.section}>
                    <h2>Executive Summary</h2>
                    <div className={styles.execSummary}>
                        <p>
                            My work at Victaulic occupies a unique, cross-functional niche that bridges the gap between hardware
                            R&D, lab testing, and global sales application engineering. By architecting centralized,
                            configuration-driven software platforms, I enable the organization to scale its technical
                            capabilities without incremental headcount.
                        </p>
                    </div>
                </section>

                {/* PILLAR 1: Engineering System Automation & Estimation */}
                <section className={styles.section}>
                    <div className={styles.pillarMeta}>
                        <h2>Engineering System Automation &amp; Estimation</h2>
                        <span className={styles.pillarValue}>
                            Accelerating complex system design through the codification of tribal engineering knowledge into real-time validation engines.
                        </span>
                    </div>

                    <div className={styles.enabledContent}>
                        <span className={styles.enabledLabel}>What was enabled</span>
                        <p>
                            Vortex project estimation was historically a manual, spreadsheet-driven process. I progressively automated this workflow by codifying engineering knowledge into software.
                        </p>
                        <p>
                            What once required days—or even a week—of manual calculations can now be reduced to a five-minute conversation to determine system requirements. The Project Builder unifies calculations, standards compliance, real-time pricing, and system-specific BOM generation into a single customer-facing workflow.
                        </p>
                        <p>
                            Development required close collaboration across engineering, project management, customer care, IT, and packaging, and includes full ownership of the real-time pricing database that powers all estimation outputs.
                        </p>
                    </div>

                    <ul className={styles.evidenceList}>
                        <li className={styles.evidenceItem}>
                            <Link href="/projects#vortex-v2" target="_blank" className={styles.evidenceLink}>
                                <span className={styles.evidenceTitle}>Vortex Project Builder</span>
                                (Customer-facing platform for configuring and submitting complex multi-system projects)
                            </Link>
                        </li>
                        <li className={styles.evidenceItem}>
                            <Link href="/projects#vortex-v1" target="_blank" className={styles.evidenceLink}>
                                <span className={styles.evidenceTitle}>Vortex Configurator</span>
                                (Production tool that replaced manual hand-sizing for single-system estimates and pricing)
                            </Link>
                        </li>
                        <li className={styles.evidenceItem}>
                            <Link href="/projects#bom-prototype" target="_blank" className={styles.evidenceLink}>
                                <span className={styles.evidenceTitle}>Vortex Estimator Tool</span>
                                (Early prototype used to formalize calculation logic and BOM traceability)
                            </Link>
                        </li>
                    </ul>
                </section>

                {/* PILLAR 2: Scalable Test & Data Infrastructure */}
                <section className={styles.section}>
                    <div className={styles.pillarMeta}>
                        <h2>Scalable Test &amp; Data Infrastructure</h2>
                        <span className={styles.pillarValue}>
                            Increasing R&D throughput and confidence by replacing one-off test builds with reusable, configuration-driven data systems.
                        </span>
                    </div>

                    <div className={styles.enabledContent}>
                        <span className={styles.enabledLabel}>What was enabled</span>
                        <p>
                            R&D and customer testing historically relied on project-specific DAQ builds that limited lab throughput and consumed engineering capacity. Test setups were often tightly coupled to individual campaigns, making reuse, comparison, and certification workflows difficult to scale.
                        </p>
                        <p>
                            I architected a <strong>configuration-driven DAQ platform</strong> that decouples test logic from hardware wiring and sensor selection. This approach enables the same core system to scale across customer campaigns, internal R&D testing, and future certification cycles without requiring custom rebuilds.
                        </p>
                        <p>
                            In parallel, I automated certification data pipelines to eliminate manual transcription. The <strong>UL Formatter</strong> pulls results directly from raw test outputs, producing auditable, repeatable reports and significantly reducing the risk of human error in high-stakes certification workflows.
                        </p>
                        <p>
                            Together, these systems preserve critical lab capacity, improve repeatability, and increase confidence in data used for customer decisions and regulatory submissions.
                        </p>
                    </div>

                    <ul className={styles.evidenceList}>
                        <li className={styles.evidenceItem}>
                            <Link href="/projects#daq" target="_blank" className={styles.evidenceLink}>
                                <span className={styles.evidenceTitle}>Scalable DAQ Platform<br />(Bechtel Customer Testing)</span>
                                (Reusable, configuration-driven LabVIEW architecture for campaign-based testing)
                            </Link>
                        </li>
                        <li className={styles.evidenceItem}>
                            <Link href="/projects#rd-support" target="_blank" className={styles.evidenceLink}>
                                <span className={styles.evidenceTitle}>Vortex R&D &amp; Test DAQ Support</span>
                                (Ongoing lab infrastructure supporting internal development and validation)
                            </Link>
                        </li>
                        <li className={styles.evidenceItem}>
                            <Link href="/projects#ul-formatter" target="_blank" className={styles.evidenceLink}>
                                <span className={styles.evidenceTitle}>UL Formatter</span>
                                (Automated certification reporting pipeline sourced directly from raw test data)
                            </Link>
                        </li>
                        <li className={styles.evidenceItem}>
                            <span className={styles.evidenceTitle}>Test Sheet Automation</span>
                            (Self-service utilities for standardized lab validation and data review)
                        </li>
                    </ul>
                </section>

                {/* PILLAR 3: Engineering Enablement & Workflow Modernization */}
                <section className={styles.section}>
                    <div className={styles.pillarMeta}>
                        <h2>Engineering Enablement &amp; Workflow Modernization</h2>
                        <span className={styles.pillarValue}>
                            Reducing operational risk and knowledge silos by establishing durable, version-controlled engineering software practices.
                        </span>
                    </div>

                    <div className={styles.enabledContent}>
                        <span className={styles.enabledLabel}>What was enabled</span>
                        <p>
                            As internally developed engineering tools expanded in scope and impact, the limitations of spreadsheet-based distribution and ad-hoc file sharing became a growing source of risk. Updates were difficult to track, logic changes were hard to audit, and long-term ownership was unclear.
                        </p>
                        <p>
                            I advised and supported the team in adopting <strong>Git and GitHub</strong> as a modern version-control foundation for engineering software. This included guiding best practices around repository structure, change tracking, and collaborative workflows, while working alongside others who executed the implementation.
                        </p>
                        <p>
                            In coordination with IT, I also helped establish a controlled publishing path for internal engineering tools. This ensured that deployed applications are <strong>traceable, maintainable, and resilient to personnel changes</strong>, significantly reducing the long-term "bus factor" associated with legacy workflows.
                        </p>
                    </div>

                    <ul className={styles.evidenceList}>
                        <li className={styles.evidenceItem}>
                            <span className={styles.evidenceTitle}>Git &amp; GitHub Adoption</span>
                            (Advisory leadership on version control strategy and best practices)
                        </li>
                        <li className={styles.evidenceItem}>
                            <span className={styles.evidenceTitle}>IT Domain Integration</span>
                            (Controlled publishing and distribution model for internal engineering tools)
                        </li>
                    </ul>
                </section>

                {/* PILLAR 4: Innovation Research & Technical Risk Reduction */}
                <section className={styles.section}>
                    <div className={styles.pillarMeta}>
                        <h2>Innovation Research &amp; Technical Risk Reduction</h2>
                        <span className={styles.pillarValue}>
                            Reducing uncertainty in future hardware and tooling investments through targeted feasibility research and low-level prototyping.
                        </span>
                    </div>

                    <div className={styles.enabledContent}>
                        <span className={styles.enabledLabel}>What was enabled</span>
                        <p>
                            To inform future tool and automation investments, I conducted feasibility research into computer vision, LiDAR, and embedded control systems. This work focused on evaluating technical viability before committing to production development.
                        </p>
                        <p>
                            Through <strong>RG5200i Pipe Detection Research</strong>, I explored both machine learning–based approaches and LiDAR point-cloud workflows to detect pipe geometry and alignment. This included training and evaluating detection models as well as assessing the practical limits of point-cloud–based analysis in industrial environments.
                        </p>
                        <p>
                            Separately, I conducted <strong>Stepper Motor Control Loop Research</strong> to evaluate low-level motion control as a potential in-house alternative for future systems. This effort focused on <strong>C++ development, embedded control logic, and direct board-level communication</strong>, expanding internal understanding of real-time control constraints without committing to productization.
                        </p>
                        <p>
                            These efforts reduced technical uncertainty, expanded internal capability, and provided concrete data to inform future investment decisions.
                        </p>
                    </div>

                    <ul className={styles.evidenceList}>
                        <li className={styles.evidenceItem}>
                            <Link href="/projects#research" target="_blank" className={styles.evidenceLink}>
                                <span className={styles.evidenceTitle}>RG5200i Pipe Detection Research</span>
                                (ML-based and LiDAR-based feasibility exploration for pipe detection)
                            </Link>
                        </li>
                        <li className={styles.evidenceItem}>
                            <Link href="/projects#stepper-motor" target="_blank" className={styles.evidenceLink}>
                                <span className={styles.evidenceTitle}>Stepper Motor Control Loop Research</span>
                                (C++ embedded control and board communication feasibility study)
                            </Link>
                        </li>
                    </ul>
                </section>

                {/* PILLAR 5: Decision Support & Field Enablement Tools */}
                <section className={styles.section}>
                    <div className={styles.pillarMeta}>
                        <h2>Decision Support &amp; Field Enablement Tools</h2>
                        <span className={styles.pillarValue}>
                            Accelerating Sales and Field response times by removing recurring engineering bottlenecks from high-frequency decision workflows.
                        </span>
                    </div>

                    <div className={styles.enabledContent}>
                        <span className={styles.enabledLabel}>What was enabled</span>
                        <p>
                            Sales and Field teams frequently require rapid confirmation of product compatibility, installation constraints, and system fit. Historically, these questions interrupted engineering teams and relied on manual lookups, informal guidance, or ad-hoc validation.
                        </p>
                        <p>
                            I delivered <strong>self-service decision support tools</strong> that decouple routine compatibility checks from engineering availability. By automating the extraction and validation of configuration constraints, these tools provide immediate, data-backed answers while preserving engineering capacity for higher-complexity work.
                        </p>
                        <p>
                            The <strong>VicFlex Bracket Filter</strong> transforms SolidWorks-derived compatibility data into an intuitive configuration workflow, allowing Sales and Field users to verify valid combinations with visual confirmation. This improves response time, reduces error risk, and increases customer confidence through validated constraints rather than informal guidance.
                        </p>
                        <p>
                            Collectively, these tools <strong>reduce recurring workflow interruptions</strong>, shorten sales cycles, and ensure consistent application of engineering rules across customer-facing interactions.
                        </p>
                    </div>

                    <ul className={styles.evidenceList}>
                        <li className={styles.evidenceItem}>
                            <Link href="/projects#vicflex" target="_blank" className={styles.evidenceLink}>
                                <span className={styles.evidenceTitle}>VicFlex Bracket Filter</span>
                                (Automated compatibility configuration and validation system)
                            </Link>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}

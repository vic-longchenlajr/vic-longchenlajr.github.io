'use client';

import styles from './tutorial-fire-vault.module.css';

interface Props {
    registerSection: (id: string) => (el: HTMLElement | null) => void;
}

export default function ArchitectureTab({ registerSection }: Props) {
    return (
        <>
            {/* ---- The Three Layers ---- */}
            <section id="arch-layers" ref={registerSection('arch-layers')} className={styles.section}>
                <h2 className={styles.sectionTitle}>The Three Layers</h2>
                <p className={styles.sectionIntro}>
                    The Fire Vault runs across three layers: your local machine, the Anthropic API,
                    and the corporate GitHub organization. Understanding where data lives is the
                    foundation for trusting the system.
                </p>

                <div className={styles.layerGrid}>
                    {/* Layer 1 — Local Machine */}
                    <div className={`${styles.layerCard} ${styles.layerCardLocal}`}>
                        <div className={styles.layerBadge}>Layer 1</div>
                        <div className={styles.layerName}>Local Machine</div>
                        <div className={styles.layerRole}>Obsidian Vault — Persistent Memory</div>
                        <div className={styles.layerComponents}>
                            <div className={styles.layerComponent}>
                                <div className={styles.layerComponentName}>journal/</div>
                                <div className={styles.layerComponentDesc}>
                                    Daily notes in plain language — tasks, blockers, meeting context,
                                    project updates. No formatting required.
                                </div>
                                <span className={`${styles.layerTag} ${styles.layerTagPrivate}`}>
                                    Private · Never Committed
                                </span>
                            </div>
                            <div className={styles.layerComponent}>
                                <div className={styles.layerComponentName}>CLAUDE.md</div>
                                <div className={styles.layerComponentDesc}>
                                    Team operating manual. Functions as the LLM system prompt — defines
                                    workflows, file schemas, git conventions, and per-person rules.
                                </div>
                            </div>
                            <div className={styles.layerComponent}>
                                <div className={styles.layerComponentName}>Personal config</div>
                                <div className={styles.layerComponentDesc}>
                                    Per-member workflow file from a one-time audit. Sets check-in
                                    rhythm, prompt structure, and processing preferences.
                                </div>
                            </div>
                            <div className={styles.layerComponent}>
                                <div className={styles.layerComponentName}>Claude Code</div>
                                <div className={styles.layerComponentDesc}>
                                    Local agent. Reads vault, calls Anthropic API, writes structured
                                    outputs, runs git. Every action is logged and user-visible.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Layer 2 — Anthropic API */}
                    <div className={`${styles.layerCard} ${styles.layerCardApi}`}>
                        <div className={styles.layerBadge}>Layer 2</div>
                        <div className={styles.layerName}>Anthropic API</div>
                        <div className={styles.layerRole}>api.anthropic.com — Ephemeral Processing</div>
                        <div className={styles.layerComponents}>
                            <div className={styles.layerComponent}>
                                <div className={styles.layerComponentName}>Data handling</div>
                                <div className={styles.layerComponentDesc}>
                                    Team / Enterprise plan. Anthropic does not retain or train on
                                    customer API data. Requests are processed and discarded.
                                </div>
                                <span className={`${styles.layerTag} ${styles.layerTagEphemeral}`}>
                                    No Retention · No Training
                                </span>
                            </div>
                            <div className={styles.layerComponent}>
                                <div className={styles.layerComponentName}>What is sent</div>
                                <div className={styles.layerComponentDesc}>
                                    Task notes, project status, meeting summaries, blockers. Equivalent
                                    to what engineers already type into Claude.ai — except scoped
                                    and governed.
                                </div>
                            </div>
                            <div className={styles.layerComponent}>
                                <div className={styles.layerComponentName}>What is NOT sent</div>
                                <div className={styles.layerComponentDesc}>
                                    Engineering IP, CAD files, test data, product specifications,
                                    customer data, NFPA/UL submissions.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Layer 3 — GitHub Org */}
                    <div className={`${styles.layerCard} ${styles.layerCardGithub}`}>
                        <div className={styles.layerBadge}>Layer 3</div>
                        <div className={styles.layerName}>GitHub Org</div>
                        <div className={styles.layerRole}>Victaulic-Engineering-Tech-Solutions — Sync Layer</div>
                        <div className={styles.layerComponents}>
                            <div className={styles.layerComponent}>
                                <div className={styles.layerComponentName}>Access control</div>
                                <div className={styles.layerComponentDesc}>
                                    Active Directory group (APP_Github_EngineeringTechnology). SSO
                                    enforced. Configured April 29 — James Leander and Kyle Myer.
                                </div>
                                <span className={`${styles.layerTag} ${styles.layerTagSso}`}>
                                    SSO · AD Gated
                                </span>
                            </div>
                            <div className={styles.layerComponent}>
                                <div className={styles.layerComponentName}>Committed content</div>
                                <div className={styles.layerComponentDesc}>
                                    status.md, daily rollups, meeting outcomes, ops briefings. Raw
                                    notes excluded at the repository level — not just by policy.
                                </div>
                            </div>
                            <div className={styles.layerComponent}>
                                <div className={styles.layerComponentName}>Audit trail</div>
                                <div className={styles.layerComponentDesc}>
                                    Full git history. Structured commits per person, per date.
                                    Queryable by IT without additional tooling.
                                </div>
                                <span className={`${styles.layerTag} ${styles.layerTagAudit}`}>
                                    Full Audit Trail
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- Data Flow ---- */}
            <section id="arch-data-flow" ref={registerSection('arch-data-flow')} className={styles.section}>
                <h2 className={styles.sectionTitle}>Data Flow</h2>
                <p className={styles.sectionIntro}>
                    What happens when you check in — from your words in Obsidian to the shared
                    repository, in five steps.
                </p>

                <div className={styles.flowBar}>
                    <div className={styles.flowSteps}>
                        <div className={styles.flowStep}>
                            <div className={styles.flowNum}>01</div>
                            <div className={styles.flowText}>
                                Engineer writes daily journal in Obsidian — plain language
                            </div>
                        </div>
                        <div className={styles.flowSep}>›</div>
                        <div className={styles.flowStep}>
                            <div className={styles.flowNum}>02</div>
                            <div className={styles.flowText}>
                                Claude Code reads the vault and sends context to Anthropic API
                            </div>
                        </div>
                        <div className={styles.flowSep}>›</div>
                        <div className={styles.flowStep}>
                            <div className={styles.flowNum}>03</div>
                            <div className={styles.flowText}>
                                API returns structured output — status, rollup, action items
                            </div>
                        </div>
                        <div className={styles.flowSep}>›</div>
                        <div className={styles.flowStep}>
                            <div className={styles.flowNum}>04</div>
                            <div className={styles.flowText}>
                                Claude Code writes files locally and commits to GitHub org
                            </div>
                        </div>
                        <div className={styles.flowSep}>›</div>
                        <div className={styles.flowStep}>
                            <div className={styles.flowNum}>05</div>
                            <div className={styles.flowText}>
                                Team visibility — status, blockers, action items queryable anytime
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- Privacy & Governance ---- */}
            <section id="arch-governance" ref={registerSection('arch-governance')} className={styles.section}>
                <h2 className={styles.sectionTitle}>Privacy &amp; Governance</h2>
                <p className={styles.sectionIntro}>
                    Two guarantees that underpin the system — one technical, one operational.
                </p>

                <div className={styles.govGrid}>
                    <div className={`${styles.govCard} ${styles.govCardPrivacy}`}>
                        <div className={styles.calloutLabel}>Privacy Guarantee</div>
                        <p className={styles.calloutText}>
                            Raw journal notes never leave the local machine.{' '}
                            <code className={styles.inlineCode}>*/journal/**</code> is excluded from
                            git at the repository level — a technical control, not just policy.
                        </p>
                    </div>
                    <div className={`${styles.govCard} ${styles.govCardAudit}`}>
                        <div className={styles.calloutLabel}>Governance</div>
                        <p className={styles.calloutText}>
                            Every check-in produces a structured commit in the corporate GitHub org.
                            Full activity log per person, per date — visible to IT at any time
                            without additional tooling.
                        </p>
                    </div>
                </div>
            </section>

            {/* ---- Phase 2 ---- */}
            <section id="arch-phase2" ref={registerSection('arch-phase2')} className={styles.section}>
                <h2 className={styles.sectionTitle}>Phase 2</h2>
                <p className={styles.sectionIntro}>
                    The pilot workflow becomes the blueprint for a scalable internal tool.
                </p>

                <div className={styles.phase2Card}>
                    <div className={styles.phase2Label}>Phase 2 →</div>
                    <p className={styles.phase2Text}>
                        <strong>Internal tool:</strong> Web frontend calling the Claude API directly —
                        Victaulic-hosted, Microsoft SSO, accessible from any browser. No per-seat license
                        required at scale. The pilot workflow becomes the blueprint.
                    </p>
                </div>
            </section>
        </>
    );
}

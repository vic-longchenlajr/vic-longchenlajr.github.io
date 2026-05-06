'use client';

import styles from './tutorial-fire-vault.module.css';

interface Props {
    registerSection: (id: string) => (el: HTMLElement | null) => void;
}

export default function PmnTab({ registerSection }: Props) {
    return (
        <>
            {/* ---- The Daily Cycle ---- */}
            <section id="pmn-cycle" ref={registerSection('pmn-cycle')} className={styles.section}>
                <h2 className={styles.sectionTitle}>The Daily Cycle</h2>
                <p className={styles.sectionIntro}>
                    The vault does not just capture today — it compounds. Each check-in reads from
                    yesterday&apos;s context, processes today&apos;s work, and pre-builds tomorrow&apos;s
                    starting point. The system never starts from scratch.
                </p>

                <div className={styles.pmnCycleWrap}>
                    <svg viewBox="0 0 920 510" xmlns="http://www.w3.org/2000/svg" fontFamily="inherit" style={{ width: '100%', height: 'auto', display: 'block' }}>
                        <defs>
                            <marker id="pmnAh" markerWidth="9" markerHeight="7" refX="8.5" refY="3.5" orient="auto">
                                <polygon points="0 0, 9 3.5, 0 7" fill="#505050"/>
                            </marker>
                        </defs>

                        {/* Dashed connector lines — corner nodes to CLAUDE.md */}
                        <line x1="232" y1="102" x2="323" y2="242" stroke="#2A2A2A" strokeWidth="1.5" strokeDasharray="4 5"/>
                        <line x1="688" y1="102" x2="597" y2="242" stroke="#2A2A2A" strokeWidth="1.5" strokeDasharray="4 5"/>
                        <line x1="688" y1="390" x2="597" y2="282" stroke="#2A2A2A" strokeWidth="1.5" strokeDasharray="4 5"/>
                        <line x1="232" y1="390" x2="323" y2="282" stroke="#2A2A2A" strokeWidth="1.5" strokeDasharray="4 5"/>

                        {/* Cycle arrows */}
                        <line x1="232" y1="72" x2="686" y2="72" stroke="#3A3A3A" strokeWidth="2" markerEnd="url(#pmnAh)"/>
                        <line x1="808" y1="158" x2="808" y2="336" stroke="#3A3A3A" strokeWidth="2" markerEnd="url(#pmnAh)"/>
                        <line x1="686" y1="362" x2="232" y2="362" stroke="#3A3A3A" strokeWidth="2" markerEnd="url(#pmnAh)"/>
                        <line x1="110" y1="336" x2="110" y2="158" stroke="#3A3A3A" strokeWidth="2" markerEnd="url(#pmnAh)"/>

                        {/* Arrow labels */}
                        <text x="460" y="40" textAnchor="middle" fontSize="11" fill="#505050">Engineer writes in Obsidian</text>
                        <text x="460" y="56" textAnchor="middle" fontSize="11" fill="#505050">Claude Code processes via Anthropic API</text>
                        <text x="862" y="247" textAnchor="middle" fontSize="11" fill="#505050" transform="rotate(-90 862 247)">structured outputs written</text>
                        <text x="460" y="384" textAnchor="middle" fontSize="11" fill="#505050">Committed to GitHub org</text>
                        <text x="460" y="398" textAnchor="middle" fontSize="11" fill="#505050">Next-day prompts pre-built at EOD</text>
                        <text x="55" y="247" textAnchor="middle" fontSize="11" fill="#505050" transform="rotate(90 55 247)">pre-loaded next morning</text>

                        {/* journal/ node — top-left */}
                        <rect x="52" y="48" width="180" height="108" rx="11" fill="#0D1A2E"/>
                        <text fill="white" textAnchor="middle">
                            <tspan x="142" y="80" fontSize="15" fontWeight="700">journal/</tspan>
                            <tspan x="142" dy="20" fontSize="11" fillOpacity="0.7">Written daily in Obsidian</tspan>
                            <tspan x="142" dy="15" fontSize="10" fillOpacity="0.55">No structure required</tspan>
                        </text>
                        <rect x="82" y="122" width="120" height="16" rx="3" fill="#7F1D1D"/>
                        <text x="142" y="133" textAnchor="middle" fontSize="9" fontWeight="800" fill="white">PRIVATE · GITIGNORED</text>

                        {/* Claude Code node — top-right */}
                        <rect x="688" y="48" width="180" height="108" rx="11" fill="#1A1A1A"/>
                        <text fill="white" textAnchor="middle">
                            <tspan x="778" y="80" fontSize="15" fontWeight="700">Claude Code</tspan>
                            <tspan x="778" dy="20" fontSize="11" fillOpacity="0.7">Reads vault · calls API</tspan>
                            <tspan x="778" dy="15" fontSize="10" fillOpacity="0.55">Structures output · runs git</tspan>
                        </text>
                        <rect x="698" y="122" width="160" height="16" rx="3" fill="rgba(255,255,255,0.06)"/>
                        <text x="778" y="133" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.35)">LOCAL AGENT · USER-VISIBLE</text>

                        {/* outputs node — bottom-right */}
                        <rect x="688" y="336" width="180" height="108" rx="11" fill="#0A1A10"/>
                        <text fill="white" textAnchor="middle">
                            <tspan x="778" y="368" fontSize="13" fontWeight="700">status · rollups</tspan>
                            <tspan x="778" dy="18" fontSize="13" fontWeight="700">meetings · ops/</tspan>
                            <tspan x="778" dy="15" fontSize="10" fillOpacity="0.55">Committed to GitHub org</tspan>
                        </text>
                        <rect x="710" y="407" width="136" height="16" rx="3" fill="rgba(255,255,255,0.06)"/>
                        <text x="778" y="418" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.35)">TEAM VISIBLE</text>

                        {/* ops/prompts.md node — bottom-left */}
                        <rect x="52" y="336" width="180" height="108" rx="11" fill="#150D26"/>
                        <text fill="white" textAnchor="middle">
                            <tspan x="142" y="368" fontSize="14" fontWeight="700">ops/prompts.md</tspan>
                            <tspan x="142" dy="19" fontSize="11" fillOpacity="0.7">Pre-built end of each day</tspan>
                            <tspan x="142" dy="15" fontSize="10" fillOpacity="0.55">Carryover · follow-ups · plan</tspan>
                        </text>
                        <rect x="76" y="407" width="132" height="16" rx="3" fill="rgba(255,255,255,0.06)"/>
                        <text x="142" y="418" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.35)">SEEDS TOMORROW</text>

                        {/* CLAUDE.md center node */}
                        <rect x="323" y="202" width="274" height="80" rx="11" fill="#111827" stroke="#2A2A2A" strokeWidth="1.5"/>
                        <text fill="white" textAnchor="middle">
                            <tspan x="460" y="228" fontSize="15" fontWeight="800">CLAUDE.md</tspan>
                            <tspan x="460" dy="18" fontSize="11" fillOpacity="0.65">Team operating context</tspan>
                            <tspan x="460" dy="14" fontSize="10" fillOpacity="0.5">System prompt — present every session</tspan>
                        </text>
                    </svg>
                    <p className={styles.pmnCycleCaption}>
                        Each loop through this cycle adds one day&apos;s context to the vault.
                        Understanding compounds with every check-in.
                    </p>
                </div>
            </section>

            {/* ---- Visibility Spectrum ---- */}
            <section id="pmn-spectrum" ref={registerSection('pmn-spectrum')} className={styles.section}>
                <h2 className={styles.sectionTitle}>Visibility Spectrum</h2>
                <p className={styles.sectionIntro}>
                    Every layer of the vault has a defined privacy level. Raw input stays local.
                    Processed outputs are team-visible. Team synthesis is generated by SYNC —
                    never edited directly.
                </p>

                <div className={styles.pmnSpectrumWrap}>
                    <div className={styles.pmnSpectrumRow}>
                        <div className={styles.pmnSpectrumEndLabel}>Private</div>
                        <div className={styles.pmnBlocks}>
                            <div className={`${styles.pmnBlock} ${styles.pmnBlockJournal}`}>
                                <div className={styles.pmnBlockEyebrow}>Layer 1 — Input</div>
                                <div className={styles.pmnBlockName}>journal/</div>
                                <div className={styles.pmnBlockDesc}>Raw daily writing. Never committed. Local machine only.</div>
                                <div className={styles.pmnBlockItems}>
                                    <div className={styles.pmnBlockItem}>Plain language, unstructured</div>
                                    <div className={styles.pmnBlockItem}>Carryover pre-loaded from yesterday</div>
                                    <div className={styles.pmnBlockItem}>.gitignored — technical control</div>
                                </div>
                            </div>
                            <div className={styles.pmnArrowCol}>→</div>
                            <div className={`${styles.pmnBlock} ${styles.pmnBlockPersonal}`}>
                                <div className={styles.pmnBlockEyebrow}>Layer 2 — Personal</div>
                                <div className={styles.pmnBlockName}>status · rollups · meetings</div>
                                <div className={styles.pmnBlockDesc}>Processed, structured, committed. Personal but team-visible.</div>
                                <div className={styles.pmnBlockItems}>
                                    <div className={styles.pmnBlockItem}>Current projects and blockers</div>
                                    <div className={styles.pmnBlockItem}>Daily work summaries</div>
                                    <div className={styles.pmnBlockItem}>Meeting outcomes</div>
                                </div>
                            </div>
                            <div className={styles.pmnArrowCol}>→</div>
                            <div className={`${styles.pmnBlock} ${styles.pmnBlockSynthesized}`}>
                                <div className={styles.pmnBlockEyebrow}>Layer 3 — Synthesized</div>
                                <div className={styles.pmnBlockName}>ops/briefing ops/prompts</div>
                                <div className={styles.pmnBlockDesc}>AI-regenerated each check-in. Readable in Obsidian without Claude.</div>
                                <div className={styles.pmnBlockItems}>
                                    <div className={styles.pmnBlockItem}>Cross-project snapshot</div>
                                    <div className={styles.pmnBlockItem}>Open action items surfaced</div>
                                    <div className={styles.pmnBlockItem}>Next-day prompts generated</div>
                                </div>
                            </div>
                            <div className={styles.pmnArrowCol}>→</div>
                            <div className={`${styles.pmnBlock} ${styles.pmnBlockTeam}`}>
                                <div className={styles.pmnBlockEyebrow}>Layer 4 — Team</div>
                                <div className={styles.pmnBlockName}>_projects _ops</div>
                                <div className={styles.pmnBlockDesc}>Generated by team SYNC. Never edited directly.</div>
                                <div className={styles.pmnBlockItems}>
                                    <div className={styles.pmnBlockItem}>Per-project status, all contributors</div>
                                    <div className={styles.pmnBlockItem}>Consolidated blockers</div>
                                    <div className={styles.pmnBlockItem}>Leadership-readable briefing</div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.pmnSpectrumEndLabel} ${styles.pmnSpectrumEndLabelRight}`}>Team</div>
                    </div>
                </div>
            </section>

            {/* ---- What the Vault Knows ---- */}
            <section id="pmn-compounds" ref={registerSection('pmn-compounds')} className={styles.section}>
                <h2 className={styles.sectionTitle}>What the Vault Knows</h2>
                <p className={styles.sectionIntro}>
                    The system gets more useful over time. Early check-ins capture the basics.
                    By month three, the vault holds institutional knowledge that would otherwise
                    live only in people&apos;s heads.
                </p>

                <div className={styles.compoundsGrid}>
                    <div className={`${styles.compoundCard} ${styles.compoundCardW1}`}>
                        <div className={styles.compoundPeriod}>Week 1</div>
                        <div className={styles.compoundHeadline}>Starting context</div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotW1}`}/>
                            Current project list and status
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotW1}`}/>
                            This week&apos;s tasks and blockers
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotW1}`}/>
                            Active waiting items established
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotW1}`}/>
                            First meeting outcomes captured
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotW1}`}/>
                            Personal check-in rhythm calibrated
                        </div>
                    </div>

                    <div className={`${styles.compoundCard} ${styles.compoundCardM1}`}>
                        <div className={styles.compoundPeriod}>Month 1</div>
                        <div className={styles.compoundHeadline}>Project history</div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotM1}`}/>
                            Full project timelines visible
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotM1}`}/>
                            Cross-project patterns emerging
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotM1}`}/>
                            Long-running blockers auto-flagged
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotM1}`}/>
                            Decisions catalogued with rationale
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotM1}`}/>
                            Team visibility active via SYNC
                        </div>
                    </div>

                    <div className={`${styles.compoundCard} ${styles.compoundCardM3}`}>
                        <div className={styles.compoundPeriod}>Month 3+</div>
                        <div className={styles.compoundHeadline}>Institutional knowledge</div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotM3}`}/>
                            Historical decisions searchable
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotM3}`}/>
                            New members onboard from vault context
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotM3}`}/>
                            Project velocity visible to leadership
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotM3}`}/>
                            Recurring blockers identified
                        </div>
                        <div className={styles.compoundItem}>
                            <div className={`${styles.compoundDot} ${styles.compoundDotM3}`}/>
                            Knowledge stays when people leave
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

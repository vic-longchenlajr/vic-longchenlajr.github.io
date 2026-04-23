'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './guide-personal-vault.module.css';

const SECTIONS = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'core-idea', label: 'The Core Idea' },
    { id: 'architecture', label: 'Vault Architecture' },
    { id: 'the-schema', label: 'The CLAUDE.md Schema' },
    { id: 'workflows', label: 'Daily Workflows' },
    { id: 'build-your-own', label: 'Building Your Own' },
    { id: 'adoption-levels', label: 'Adoption Levels' },
    { id: 'customization', label: 'Customization Guide' },
    { id: 'tips', label: 'Tips from Practice' },
];

const DOWNLOADS = {
    obsidian: 'https://github.com/obsidianmd/obsidian-releases/releases/download/v1.12.7/Obsidian-1.12.7.exe',
    starterSchema: '/downloads/starter-claude-md.md',
};

export default function GuidePersonalVaultPage() {
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
    const [mobileTocOpen, setMobileTocOpen] = useState(false);
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

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
                <header className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Guide: Personal Vault</h1>
                    <p className={styles.pageSubtitle}>
                        Build a personal knowledge management system with Obsidian and Claude Code.
                        How it works, why it works, and how to make it your own.
                    </p>
                    <div className={styles.pageMeta}>
                        <span className={styles.metaItem}>Author <span className={styles.metaValue}>Chenla Long, Jr</span></span>
                        <span className={styles.metaItem}>Status <span className={styles.metaValue}>Release</span></span>
                        <span className={styles.metaItem}>Last Updated <span className={styles.metaValue}>April 2026</span></span>
                    </div>
                </header>

                {/* ---- Introduction ---- */}
                <section id="introduction" ref={registerSection('introduction')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Introduction</h2>
                    <p className={styles.sectionIntro}>
                        You already use Claude Code to write and ship software. This guide shows you how to use
                        it for something else: building a persistent, structured knowledge system around your daily
                        work &mdash; one that remembers what you did, tracks what you&apos;re working on, and surfaces
                        what you should focus on next.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>How It Works</h3>
                        <p className={styles.bodyText}>
                            The system is simple. You create a folder of markdown files. You write a schema
                            file (<code className={styles.inlineCode}>CLAUDE.md</code>) that tells Claude Code
                            how the folder is organized and what workflows to follow. You write naturally in a
                            daily journal. Claude Code reads your writing, extracts the structured information,
                            updates your project files, and generates operational dashboards &mdash; all without
                            you filling out a single form.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What You&apos;ll Have</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>A daily journal where you write freely and Claude Code processes your entries into structured project data</li>
                            <li className={styles.bulletItem}>Living project status files that stay current from your journal entries alone</li>
                            <li className={styles.bulletItem}>A morning briefing with personalized prompts per project &mdash; surfacing stale items, blockers, and yesterday&apos;s intentions</li>
                            <li className={styles.bulletItem}>Meeting templates auto-generated from your journal, with action items routed to the right projects after processing</li>
                            <li className={styles.bulletItem}>Decision records, changelogs, and a searchable wiki that grows over time</li>
                            <li className={styles.bulletItem}>An append-only activity log that gives you a complete timeline of everything that happened</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Who This Is For</h3>
                        <p className={styles.bodyText}>
                            Developers and engineers who already have Claude Code installed and want to extend it
                            beyond code into daily workflow management. You should be comfortable with markdown,
                            file systems, and the command line. No additional tools are required beyond Claude Code
                            and a text editor &mdash; though{' '}
                            <a href="https://obsidian.md" className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Obsidian</a>{' '}
                            makes browsing the vault significantly better. Obsidian is a free markdown editor that
                            renders your vault files with linked navigation, graph visualization, and live preview.
                            It&apos;s optional &mdash; any text editor works &mdash; but it turns the vault from a
                            folder of files into a browsable knowledge base.
                        </p>
                    </div>

                    <div className={styles.calloutPurple}>
                        <div className={styles.calloutPurpleLabel}>Recommended</div>
                        <p className={styles.calloutText}>
                            Download Obsidian (free) &mdash; it turns your vault from a folder of files into a browsable
                            knowledge base with linked navigation and graph visualization. Not required, but strongly recommended.
                        </p>
                        <p className={styles.calloutText} style={{ marginTop: 10 }}>
                            <a href={DOWNLOADS.obsidian} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Download Obsidian for Windows</a>
                        </p>
                    </div>

                    <div className={styles.callout}>
                        <div className={styles.calloutLabel}>Time Investment</div>
                        <p className={styles.calloutText}>
                            5&ndash;10 minutes of writing per day (morning plan + end-of-day notes). Claude Code handles the rest.
                            This guide documents a real system built and used daily since April 9, 2026. Everything here
                            comes from practice &mdash; what worked, what evolved, and what we&apos;d do differently.
                        </p>
                    </div>
                </section>

                {/* ---- The Core Idea ---- */}
                <section id="core-idea" ref={registerSection('core-idea')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>The Core Idea</h2>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Inspiration &mdash; Karpathy&apos;s LLM Wiki</h3>
                        <p className={styles.bodyText}>
                            This system is inspired by{' '}
                            <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Andrej Karpathy&apos;s LLM Wiki pattern</a>{' '}
                            &mdash; a concept for building personal knowledge bases using LLMs. Karpathy (co-founder
                            of OpenAI, former Sr. Director of AI at Tesla) described the core insight:
                        </p>
                        <div className={styles.blockquote}>
                            Most people&apos;s experience with LLMs and documents looks like RAG: you upload a collection
                            of files, the LLM retrieves relevant chunks at query time, and generates an answer.
                            This works, but the LLM is rediscovering knowledge from scratch on every question.
                            There&apos;s no accumulation.
                        </div>
                        <p className={styles.bodyText}>
                            His alternative: instead of retrieving from raw documents at query time, the LLM{' '}
                            <strong>incrementally builds and maintains a persistent wiki</strong> &mdash; a structured,
                            interlinked collection of markdown files. When you add new information, the LLM doesn&apos;t
                            just index it for later. It reads it, extracts the key information, and integrates it into
                            the existing wiki &mdash; updating entity pages, revising summaries, noting contradictions,
                            strengthening the evolving synthesis.
                        </p>
                        <p className={styles.bodyText}>
                            The three-layer architecture Karpathy describes:
                        </p>
                        <ol className={styles.numberedList}>
                            <li className={styles.numberedItem}><strong>Raw sources</strong> &mdash; your curated documents. Immutable. The LLM reads but never modifies.</li>
                            <li className={styles.numberedItem}><strong>The wiki</strong> &mdash; LLM-generated markdown files. Summaries, entities, concepts, analyses. The LLM owns this layer entirely.</li>
                            <li className={styles.numberedItem}><strong>The schema</strong> &mdash; a <code className={styles.inlineCode}>CLAUDE.md</code> file that tells the LLM how the wiki is structured, what conventions to follow, and what workflows to execute. You and the LLM co-evolve this over time.</li>
                        </ol>
                        <div className={styles.blockquote}>
                            &ldquo;Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.&rdquo;
                            <div className={styles.blockquoteAttribution}>&mdash; Andrej Karpathy</div>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What We Added &mdash; The Developer Cockpit</h3>
                        <p className={styles.bodyText}>
                            Karpathy&apos;s pattern is designed for research and knowledge accumulation. We adapted it
                            for <strong>daily engineering work</strong> &mdash; managing multiple active software projects,
                            tracking tasks across meetings, and maintaining living documentation that stays current with
                            your codebase.
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Daily journaling with structured check-ins.</strong> You write naturally (morning plan, midday notes, end-of-day reflection). Claude Code processes your writing below a separator &mdash; extracting task updates, routing action items, flagging decisions &mdash; without ever modifying your original text.</li>
                            <li className={styles.bulletItem}><strong>Project status files.</strong> Living documents per project with version, stack, active tasks, blocked items, recently completed, architecture notes, and key people. Updated automatically from your journal entries.</li>
                            <li className={styles.bulletItem}><strong>Codebase sync.</strong> Claude Code walks your actual project directories, validates checkpoint assertions against real code, detects version drift, and writes semantic changelogs.</li>
                            <li className={styles.bulletItem}><strong>Meeting processing.</strong> Templates auto-generated when your journal mentions meetings. You write notes during/after the meeting. Claude Code extracts decisions, action items, and follow-ups &mdash; routing them to the correct project status files.</li>
                            <li className={styles.bulletItem}><strong>Operational dashboards.</strong> A morning briefing regenerated each check-in showing cross-project status, and personalized prompts that reference yesterday&apos;s intentions and surface stale items.</li>
                            <li className={styles.bulletItem}><strong>Decision records.</strong> Significant choices filed with context, rationale, alternatives considered, and consequences &mdash; linked to parent projects.</li>
                            <li className={styles.bulletItem}><strong>Confirm-before-writing protocol.</strong> Claude Code never writes to vault files without showing you a structured summary of all proposed changes and getting explicit approval.</li>
                        </ul>
                        <p className={styles.bodyText}>
                            The result is a system where <strong>5 minutes of natural writing per day produces structured,
                            queryable project intelligence</strong> across all your active work.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>The Fundamental Contract</h3>
                        <p className={styles.bodyText}>
                            The entire system rests on one idea: <strong>CLAUDE.md is a contract between you and the LLM.</strong>
                        </p>
                        <p className={styles.bodyText}>
                            Claude Code automatically reads any <code className={styles.inlineCode}>CLAUDE.md</code> file
                            in your working directory at the start of every session. This is a built-in feature &mdash;
                            no configuration needed. Whatever instructions you put in CLAUDE.md, Claude Code follows them.
                            It defines the folder structure, the page formats, the workflows, and the interaction rules.
                            When the system needs to change, you update the contract together.
                        </p>
                        <p className={styles.bodyText}>
                            Key principles embedded in the contract:
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>The vault is the product &mdash; chat is ephemeral.</strong> Conversations disappear. The vault persists. Everything worth keeping gets filed.</li>
                            <li className={styles.bulletItem}><strong>Human voice is sacred.</strong> Claude Code never modifies your journal text. It only appends processing below a separator line.</li>
                            <li className={styles.bulletItem}><strong>Natural language in, structured data out.</strong> You never fill forms. You write naturally. Claude Code does the structuring.</li>
                            <li className={styles.bulletItem}><strong>Contradictions are valuable.</strong> Flag them, don&apos;t resolve them. Conflicting information is a signal worth preserving.</li>
                            <li className={styles.bulletItem}><strong>Don&apos;t fabricate.</strong> Only document what&apos;s real. No hallucinated tasks, no invented status updates.</li>
                        </ul>
                    </div>
                </section>

                {/* ---- Vault Architecture ---- */}
                <section id="architecture" ref={registerSection('architecture')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Vault Architecture</h2>
                    <p className={styles.sectionIntro}>
                        The vault is a folder of markdown files with a defined structure. Here&apos;s the layout
                        that emerged from daily use:
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Directory Structure</h3>
                        <div className={styles.codeBlock}>
                            <code>Vault/</code><br />
                            <code>├── CLAUDE.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# The schema — your contract with Claude Code</code><br />
                            <code>├── index.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Content catalog — every page listed</code><br />
                            <code>├── log.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Chronological activity log (append-only)</code><br />
                            <code>├── raw/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Immutable source documents (you curate)</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;└── assets/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Images, PDFs, attachments</code><br />
                            <code>├── wiki/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# LLM-generated knowledge pages</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;├── entities/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# People, organizations, products</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;├── concepts/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Ideas, frameworks, methodologies</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;├── sources/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# One summary page per ingested source</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;└── analyses/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Query results, comparisons, syntheses</code><br />
                            <code>├── projects/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# One folder per active project</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;└── &lt;project-slug&gt;/</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── status.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Living state — version, tasks, blockers</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── checkpoints.md&nbsp;# Structural contracts for codebase audit</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── decisions/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# One file per significant design decision</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── changelog/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Daily entries from sync workflow</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── meetings/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Meeting notes — you write, Claude processes</code><br />
                            <code>├── journal/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Daily work journal</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;└── YYYY-MM-DD.md</code><br />
                            <code>└── ops/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Operational outputs (regenerated, not edited)</code><br />
                            <code>&nbsp;&nbsp;&nbsp;&nbsp;├── briefing.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Cross-project status dashboard</code><br />
                            <code>&nbsp;&nbsp;&nbsp;&nbsp;└── prompts.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Today&apos;s personalized check-in questions</code>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Ownership Rules</h3>
                        <p className={styles.bodyText}>
                            Every layer has a clear owner. This is critical &mdash; ambiguous ownership leads to conflicts.
                        </p>
                        <table className={styles.troubleshootingTable}>
                            <thead>
                                <tr>
                                    <th>Layer</th>
                                    <th>Owner</th>
                                    <th>Rule</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code className={styles.inlineCode}>raw/</code></td>
                                    <td>You</td>
                                    <td><strong>Immutable</strong> &mdash; Claude reads but never modifies</td>
                                </tr>
                                <tr>
                                    <td><code className={styles.inlineCode}>wiki/</code></td>
                                    <td>Claude</td>
                                    <td><strong>LLM-owned</strong> &mdash; creates, updates, maintains</td>
                                </tr>
                                <tr>
                                    <td><code className={styles.inlineCode}>projects/*/status.md</code></td>
                                    <td>Claude</td>
                                    <td><strong>Updated</strong> from journal entries, sync results, and audits</td>
                                </tr>
                                <tr>
                                    <td><code className={styles.inlineCode}>projects/*/decisions/</code></td>
                                    <td>Both</td>
                                    <td><strong>You write or approve</strong> &mdash; Claude files, formats, and flags candidates</td>
                                </tr>
                                <tr>
                                    <td><code className={styles.inlineCode}>projects/*/meetings/</code></td>
                                    <td>Both</td>
                                    <td><strong>You write notes above separator</strong> &mdash; Claude processes below</td>
                                </tr>
                                <tr>
                                    <td><code className={styles.inlineCode}>journal/</code></td>
                                    <td>You</td>
                                    <td><strong>Your voice preserved verbatim</strong> &mdash; Claude only appends below separator</td>
                                </tr>
                                <tr>
                                    <td><code className={styles.inlineCode}>ops/</code></td>
                                    <td>Claude</td>
                                    <td><strong>Regenerated</strong> &mdash; always derived, never manually edited</td>
                                </tr>
                                <tr>
                                    <td><code className={styles.inlineCode}>CLAUDE.md</code></td>
                                    <td>Both</td>
                                    <td><strong>Co-evolved</strong> &mdash; you and Claude refine it together</td>
                                </tr>
                                <tr>
                                    <td><code className={styles.inlineCode}>log.md</code></td>
                                    <td>Claude</td>
                                    <td><strong>Append-only</strong> &mdash; never edit past entries</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>The Separator Pattern</h3>
                        <p className={styles.bodyText}>
                            The separator pattern is the key innovation for journal and meeting files.
                            Everything above the line is yours &mdash; Claude Code never touches it. Everything below
                            is Claude&apos;s structured extraction from your natural language.
                        </p>
                        <div className={styles.codeBlock}>
                            <code>## Morning — what&apos;s the plan?</code><br />
                            <code>(You write freely here — whatever you want, however you want)</code><br />
                            <br />
                            <code>---</code><br />
                            <code>&lt;!-- LLM PROCESSING — do not edit above this line --&gt;</code><br />
                            <br />
                            <code>## Extracted updates</code><br />
                            <code>(Claude Code writes structured processing here)</code>
                        </div>
                        <p className={styles.bodyText}>
                            The <code className={styles.inlineCode}>&lt;!-- LLM PROCESSING --&gt;</code> line is
                            an HTML comment &mdash; invisible when rendered in Obsidian or any markdown viewer, but
                            Claude Code uses it as a boundary marker. This preserves your authentic voice while still
                            producing machine-readable project data.
                        </p>
                    </div>
                </section>

                {/* ---- The CLAUDE.md Schema ---- */}
                <section id="the-schema" ref={registerSection('the-schema')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>The CLAUDE.md Schema</h2>
                    <p className={styles.sectionIntro}>
                        The schema is the brain of the system. It&apos;s a single markdown file that tells Claude Code
                        everything it needs to know about your vault. Here&apos;s what each section does and why it exists.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Architecture &amp; Page Formats</h3>
                        <p className={styles.bodyText}>
                            The folder tree and ownership table shown above. Claude Code reads this to understand
                            where things go and who owns what. Without this, it would guess &mdash; and guess wrong.
                        </p>
                        <p className={styles.bodyText}>
                            Templates for every page type include required frontmatter (YAML metadata at the top of
                            each file), section structure, and concrete examples so Claude Code produces consistent output.
                            Page types used daily:
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Journal entries</strong> &mdash; morning/midday/eod sections with separator</li>
                            <li className={styles.bulletItem}><strong>Project status</strong> &mdash; version, stack, active/blocked/completed tasks, architecture, key files, key people</li>
                            <li className={styles.bulletItem}><strong>Meeting notes</strong> &mdash; agenda, notes, with LLM processing for decisions, action items, follow-ups</li>
                            <li className={styles.bulletItem}><strong>Decision records</strong> &mdash; context, decision, rationale, alternatives, consequences</li>
                            <li className={styles.bulletItem}><strong>Changelog entries</strong> &mdash; semantic description of changes, files touched, source commits</li>
                            <li className={styles.bulletItem}><strong>Checkpoints</strong> &mdash; mechanically verifiable assertions about your codebase</li>
                        </ul>
                        <p className={styles.bodyText}>
                            Page types for knowledge accumulation (Karpathy&apos;s wiki layer):
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Source summaries</strong> &mdash; key takeaways, entities mentioned, concepts referenced, contradictions</li>
                            <li className={styles.bulletItem}><strong>Entity pages</strong> &mdash; people, orgs, products with key facts and cross-references</li>
                            <li className={styles.bulletItem}><strong>Concept pages</strong> &mdash; ideas, frameworks, methodologies with sources and open questions</li>
                            <li className={styles.bulletItem}><strong>Analysis pages</strong> &mdash; query results, comparisons, syntheses worth preserving</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Naming Conventions</h3>
                        <p className={styles.bodyText}>Consistent naming makes the vault navigable:</p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>Files: lowercase, hyphens &mdash; <code className={styles.inlineCode}>wiki/concepts/k-factor.md</code></li>
                            <li className={styles.bulletItem}>Journal: ISO date &mdash; <code className={styles.inlineCode}>journal/2026-04-09.md</code></li>
                            <li className={styles.bulletItem}>Decisions: sequential number + slug &mdash; <code className={styles.inlineCode}>decisions/001-indexeddb-over-localstorage.md</code></li>
                            <li className={styles.bulletItem}>Meetings: ISO date + topic &mdash; <code className={styles.inlineCode}>meetings/2026-04-10-release-alignment.md</code></li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Cross-referencing Rules</h3>
                        <p className={styles.bodyText}>
                            Every wiki page links to at least one other page. Source summaries link to all entities
                            and concepts they mention. Entity and concept pages back-link to sources. This builds the
                            graph that makes the vault queryable.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Interaction Protocol</h3>
                        <p className={styles.bodyText}>The behavioral contract:</p>
                        <ol className={styles.numberedList}>
                            <li className={styles.numberedItem}>Every session starts by reading <code className={styles.inlineCode}>CLAUDE.md</code>, <code className={styles.inlineCode}>index.md</code>, and tail of <code className={styles.inlineCode}>log.md</code></li>
                            <li className={styles.numberedItem}>Confirm before writing &mdash; Claude shows proposed changes and waits for approval</li>
                            <li className={styles.numberedItem}>Human voice is sacred &mdash; never modify journal text above separator</li>
                            <li className={styles.numberedItem}>The vault is the product &mdash; chat is ephemeral</li>
                            <li className={styles.numberedItem}>Natural language in, structured data out</li>
                            <li className={styles.numberedItem}>Don&apos;t fabricate &mdash; only document what&apos;s real</li>
                        </ol>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Domain Context &amp; Evolution</h3>
                        <p className={styles.bodyText}>
                            Your role, domain, terminology, collaborators, and development patterns. This section is
                            what makes your vault <em>yours</em> &mdash; Claude Code tailors its processing to your
                            specific context. An engineer&apos;s vault looks different from a manager&apos;s vault,
                            which looks different from a researcher&apos;s vault.
                        </p>
                        <p className={styles.bodyText}>
                            The evolution section tracks how the schema has changed over time. The original system went
                            through 5 iterations in two weeks &mdash; each driven by real friction:
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>Added meeting notes system after the first day with meetings</li>
                            <li className={styles.bulletItem}>Refactored check-ins into independent triggers when forced ordering felt rigid</li>
                            <li className={styles.bulletItem}>Added confirm-before-writing protocol after Claude made updates we didn&apos;t agree with</li>
                            <li className={styles.bulletItem}>Added weekend-skip logic after EOD created a Saturday journal on a Friday</li>
                            <li className={styles.bulletItem}>Added day-of-week computation after Claude assumed the wrong day</li>
                        </ul>
                        <p className={styles.bodyText}>
                            Every change came from using the system and hitting an edge case. Expect your schema to
                            evolve the same way.
                        </p>
                    </div>
                </section>

                {/* ---- Daily Workflows ---- */}
                <section id="workflows" ref={registerSection('workflows')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Daily Workflows</h2>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Morning Check-in</h3>
                        <p className={styles.bodyText}>
                            Claude Code reads your previous journal and all active project status files. It generates
                            personalized questions per project referencing yesterday&apos;s intentions, stale blocked
                            items, and inactive items. You write in the morning section of your journal &mdash; just
                            write naturally. Claude Code processes below the separator: extracts task updates, updates
                            project status files, flags decision candidates, generates meeting templates, and regenerates
                            the briefing.
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>checkin morning</p>
                                <p className={styles.commandAliases}>
                                    <span className={styles.commandAliasLabel}>How to run: </span>
                                    <span className={styles.commandAlias}>Open your terminal in the vault directory, launch Claude Code, and type <code className={styles.inlineCode}>checkin morning</code>.</span>
                                </p>
                            </div>
                        </div>
                        <p className={styles.bodyText}>
                            <strong>What this looks like in practice:</strong> You open your journal and write something like:
                        </p>
                        <div className={styles.codeBlock}>
                            <code>## Morning — what&apos;s the plan?</code><br />
                            <code>Vortex - need to draft highlights for mikaylah and fix the</code><br />
                            <code>bulk tube refill adapter bug</code><br />
                            <code>VicForge - Jeff scheduled kickoff meeting monday 2-3pm,</code><br />
                            <code>want to have scope ready before</code><br />
                            <code>no meetings today, just heads down coding</code>
                        </div>
                        <p className={styles.bodyText}>
                            You run <code className={styles.inlineCode}>checkin morning</code>. Claude Code proposes
                            changes. You approve. Below the separator in your journal, it writes:
                        </p>
                        <div className={styles.codeBlock}>
                            <code>## Extracted updates</code><br />
                            <br />
                            <code>### Vortex Project Builder — Launch Path (7 days to 5/1)</code><br />
                            <code>- <strong>Mikaylah Tool Highlights:</strong> Drafting this morning.</code><br />
                            <code>&nbsp;&nbsp;Day 4 of carrying — critical path.</code><br />
                            <code>- <strong>Bulk tube refill adapter:</strong> Implementing today.</code><br />
                            <code>&nbsp;&nbsp;Resolves design question from 4/22.</code><br />
                            <br />
                            <code>### VicForge — Major Direction Change</code><br />
                            <code>- <strong>Jeff Cosgrove scheduled kickoff meeting:</strong></code><br />
                            <code>&nbsp;&nbsp;Monday 4/27, 2-3pm.</code><br />
                            <code>- <strong>Chenla wants to come prepared:</strong></code><br />
                            <code>&nbsp;&nbsp;Scope of work and phases before meeting.</code><br />
                            <br />
                            <code>## Task movements</code><br />
                            <code>- Vortex `Mikaylah Tool Highlights` → actively working (day 4)</code><br />
                            <code>- Vortex `Bulk tube refill adapter` → implementing today</code><br />
                            <code>- VicForge `Refine scope for Jeff&apos;s 4/27 kickoff` → new task</code>
                        </div>
                        <p className={styles.bodyText}>
                            Meanwhile, it also updated two project status files with new tasks, created a meeting
                            template for Jeff&apos;s kickoff with a pre-populated agenda, and regenerated the morning
                            briefing. All from three lines of natural writing.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Midday Check-in</h3>
                        <p className={styles.bodyText}>
                            Write quick notes in the midday section &mdash; what happened, what changed, what came up.
                            Claude Code processes: extracts new tasks, bug reports, version bumps, status changes.
                            Updates project status files and regenerates the briefing.
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>checkin midday</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>End-of-Day Check-in</h3>
                        <p className={styles.bodyText}>
                            Write what actually happened &mdash; what shipped, what didn&apos;t, what surprised you.
                            Claude Code compares morning plan vs. actual outcomes, sweeps for unprocessed meeting notes,
                            generates changelog entries for projects with code changes, updates all affected project
                            status files, and creates tomorrow&apos;s journal and morning prompts (skipping weekends
                            on Fridays).
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>checkin eod</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Meeting Processing</h3>
                        <p className={styles.bodyText}>
                            Before the meeting, Claude Code generates a template with an agenda pulled from your
                            journal context. During or after the meeting, you write notes above the separator.
                            You trigger processing &mdash; Claude Code extracts decisions, action items, key information,
                            and follow-ups. Action items are routed to the correct project status files &mdash; even
                            across multiple projects. Significant decisions are flagged as candidates for formal decision records.
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>checkin meeting [name]</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Codebase Sync</h3>
                        <p className={styles.bodyText}>
                            Claude Code reads each project&apos;s <code className={styles.inlineCode}>checkpoints.md</code> &mdash;
                            mechanically verifiable assertions about your codebase. It walks the actual project directory
                            on your filesystem, validates every assertion against real code, reads git log since last sync,
                            writes semantic changelog entries, and flags checkpoint drift &mdash; things that changed in
                            the code but not in the vault.
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>sync</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Knowledge Operations</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Ingest</strong> &mdash; Drop a document into <code className={styles.inlineCode}>raw/</code> and say &ldquo;ingest.&rdquo; Claude reads it, discusses key takeaways with you, creates wiki pages, cross-references with existing knowledge.</li>
                            <li className={styles.bulletItem}><strong>Query</strong> &mdash; Ask questions against the vault. Claude reads the index, finds relevant pages, synthesizes an answer with citations. Good answers get filed as analysis pages.</li>
                            <li className={styles.bulletItem}><strong>Lint</strong> &mdash; Health check. Finds contradictions, stale pages, orphan pages, unprocessed entries, index drift.</li>
                        </ul>
                    </div>
                </section>

                {/* ---- Building Your Own ---- */}
                <section id="build-your-own" ref={registerSection('build-your-own')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Building Your Own</h2>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>The Easy Way &mdash; Starter CLAUDE.md</h3>
                        <p className={styles.bodyText}>
                            We created a starter CLAUDE.md file that bootstraps the entire system through a
                            conversation. Here&apos;s all you do:
                        </p>
                        <ol className={styles.numberedList}>
                            <li className={styles.numberedItem}>Open Obsidian and create a new vault (or create a new folder).</li>
                            <li className={styles.numberedItem}>Download the starter CLAUDE.md and copy it into your vault folder as <code className={styles.inlineCode}>CLAUDE.md</code>.</li>
                            <li className={styles.numberedItem}>Open Claude Code from inside the vault folder and say: <code className={styles.inlineCode}>initialize</code></li>
                            <li className={styles.numberedItem}>Claude Code will conduct a conversational interview covering your role, projects, daily rhythm, tools, pain points, domain language, collaborators, and adoption level.</li>
                            <li className={styles.numberedItem}>After the interview, Claude presents a summary and proposed vault structure. On your approval, it scaffolds everything &mdash; directories, personalized CLAUDE.md, index, log, journal, ops files, and project skeletons.</li>
                            <li className={styles.numberedItem}>Write your first morning journal entry and run <code className={styles.inlineCode}>checkin morning</code>. Your vault is running.</li>
                        </ol>
                        <div className={styles.downloadCard}>
                            <div className={styles.downloadCardLabel}>Starter Template</div>
                            <p className={styles.downloadCardText}>
                                The complete vault schema with auto-initialize workflow. Drop this single file into
                                an empty Obsidian vault and say &ldquo;initialize&rdquo; to Claude Code.
                            </p>
                            <a href={DOWNLOADS.starterSchema} className={styles.downloadButton} download="CLAUDE.md">
                                Download starter CLAUDE.md
                            </a>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>The Manual Way</h3>
                        <p className={styles.bodyText}>
                            If you prefer to build it yourself step by step:
                        </p>
                        <ol className={styles.numberedList}>
                            <li className={styles.numberedItem}><strong>Create the vault folder</strong> and basic directory structure.</li>
                            <li className={styles.numberedItem}><strong>Write your CLAUDE.md</strong> using the starter file as a reference but filling in sections manually. At minimum you need: Architecture, Journal page format, Check-in workflow, Interaction Protocol, and Domain Context.</li>
                            <li className={styles.numberedItem}><strong>Create <code className={styles.inlineCode}>index.md</code></strong> (empty catalog) and <strong><code className={styles.inlineCode}>log.md</code></strong> (empty log).</li>
                            <li className={styles.numberedItem}><strong>For each project,</strong> create a folder under <code className={styles.inlineCode}>projects/</code> with subdirectories. Then open Claude Code from inside that project&apos;s source directory and ask it to audit the codebase and generate status and checkpoint files for your vault.</li>
                            <li className={styles.numberedItem}><strong>Write your first journal entry</strong> and run <code className={styles.inlineCode}>checkin morning</code>.</li>
                        </ol>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Iterating the Schema</h3>
                        <p className={styles.bodyText}>
                            After a few days of use, you&apos;ll notice workflows that need steps added or removed,
                            page formats that need fields you didn&apos;t anticipate, naming conventions that feel wrong,
                            and domain terminology Claude Code doesn&apos;t know. Update <code className={styles.inlineCode}>CLAUDE.md</code>.
                            This is normal. The schema is a living document. The original system changed 5 times in the
                            first two weeks. The friction is the signal &mdash; if something feels manual or repetitive,
                            encode it in the schema.
                        </p>
                    </div>
                </section>

                {/* ---- Adoption Levels ---- */}
                <section id="adoption-levels" ref={registerSection('adoption-levels')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Adoption Levels</h2>
                    <p className={styles.sectionIntro}>
                        You don&apos;t have to use everything. Pick the level that fits your current needs and expand later.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Minimal &mdash; Journal + CLAUDE.md</h3>
                        <p className={styles.bodyText}>
                            <strong>What you get:</strong> A daily journal with structured processing. Morning prompts
                            that surface what you planned vs. what happened. A single briefing file showing your current state.
                        </p>
                        <p className={styles.bodyText}>
                            <strong>What you write:</strong> CLAUDE.md (schema) and journal entries (morning + EOD).
                        </p>
                        <p className={styles.bodyText}>
                            <strong>What Claude Code maintains:</strong>{' '}
                            <code className={styles.inlineCode}>ops/briefing.md</code>,{' '}
                            <code className={styles.inlineCode}>ops/prompts.md</code>, and journal processing below separator.
                        </p>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Time</div>
                            <p className={styles.calloutText}>
                                ~5 minutes/day writing. Good starting point to see if the workflow clicks.
                            </p>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Standard &mdash; + Project Tracking + Ops Dashboards</h3>
                        <p className={styles.bodyText}>
                            <strong>What you add:</strong> Project status files, meeting processing, decision records, changelogs.
                        </p>
                        <p className={styles.bodyText}>
                            <strong>What you get:</strong> Living project documentation that stays current from your journal
                            alone. Meeting notes that auto-route action items. Decision records that capture the &ldquo;why&rdquo;
                            behind choices. Changelogs that describe what changed semantically.
                        </p>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Time</div>
                            <p className={styles.calloutText}>
                                Same 5&ndash;10 minutes writing. Claude Code does more processing per check-in.
                            </p>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Full &mdash; + Wiki + Analyses + Codebase Sync</h3>
                        <p className={styles.bodyText}>
                            <strong>What you add:</strong> The knowledge wiki layer (entities, concepts, sources, analyses),
                            the ingest workflow, codebase sync with checkpoints, and the lint health check.
                        </p>
                        <p className={styles.bodyText}>
                            <strong>What you get:</strong> A compounding knowledge base that cross-references everything.
                            Codebase audits that catch drift between your documentation and your actual code. Analysis pages
                            that preserve your best thinking. A complete system that covers knowledge management, project
                            management, and codebase documentation.
                        </p>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Time</div>
                            <p className={styles.calloutText}>
                                Same daily writing. Additional time when ingesting sources or running syncs.
                                This is the full system described in this guide.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---- Customization Guide ---- */}
                <section id="customization" ref={registerSection('customization')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Customization Guide</h2>
                    <p className={styles.sectionIntro}>
                        The vault structure is role-neutral, but the domain context section of CLAUDE.md is where
                        you make it yours.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Adapting for Your Role</h3>
                        <p className={styles.bodyText}>
                            <strong>If you&apos;re a developer</strong> (like the original system):
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>Project status files with version, stack, active tasks, architecture notes, key files</li>
                            <li className={styles.bulletItem}>Checkpoints for codebase sync</li>
                            <li className={styles.bulletItem}>Changelogs from git history</li>
                            <li className={styles.bulletItem}>Technical decision records</li>
                        </ul>
                        <p className={styles.bodyText}>
                            <strong>If you&apos;re a manager:</strong>
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>Replace &ldquo;Active tasks&rdquo; with &ldquo;Direct reports&rdquo; or &ldquo;Team initiatives&rdquo;</li>
                            <li className={styles.bulletItem}>Add a &ldquo;1:1 notes&rdquo; page type alongside meetings</li>
                            <li className={styles.bulletItem}>Emphasize the ops dashboards &mdash; briefing becomes your team status report</li>
                            <li className={styles.bulletItem}>Use the wiki layer for tracking organizational knowledge (who owns what, process docs, stakeholder maps)</li>
                        </ul>
                        <p className={styles.bodyText}>
                            <strong>If you&apos;re a researcher:</strong>
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>The wiki layer (Karpathy&apos;s original pattern) becomes primary</li>
                            <li className={styles.bulletItem}>Source ingestion is your main workflow</li>
                            <li className={styles.bulletItem}>Analysis pages capture your evolving synthesis</li>
                            <li className={styles.bulletItem}>Project status files track research threads instead of software projects</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What to Change in CLAUDE.md</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Page formats</strong> &mdash; Add, remove, or modify templates for the types of pages you actually create</li>
                            <li className={styles.bulletItem}><strong>Workflows</strong> &mdash; Change the check-in cadence (maybe you only do morning + EOD, no midday). Add workflows for your specific recurring tasks.</li>
                            <li className={styles.bulletItem}><strong>Naming conventions</strong> &mdash; Match your existing habits. If you use a different date format or folder structure, encode it.</li>
                            <li className={styles.bulletItem}><strong>Domain context</strong> &mdash; This is the section that changes most between users. Your role, your projects, your terminology, your collaborators, your tools.</li>
                            <li className={styles.bulletItem}><strong>Interaction protocol</strong> &mdash; Adjust the confirm-before-writing behavior if you want more or less friction. Some people prefer Claude Code to just execute; others want to review every change.</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Adding Your Own Workflows</h3>
                        <p className={styles.bodyText}>
                            The workflow system is extensible. If you have a recurring task that follows a pattern,
                            encode it in the schema:
                        </p>
                        <div className={styles.codeBlock}>
                            <code>### 4.X YOUR_WORKFLOW — Description</code><br />
                            <br />
                            <code>**Trigger:** Human says &quot;your-trigger-word.&quot;</code><br />
                            <br />
                            <code>1. Step one</code><br />
                            <code>2. Step two</code><br />
                            <code>3. Step three</code><br />
                            <br />
                            <code>**Output:** What gets produced.</code>
                        </div>
                        <p className={styles.bodyText}>
                            Claude Code will follow it exactly.
                        </p>
                    </div>
                </section>

                {/* ---- Tips from Practice ---- */}
                <section id="tips" ref={registerSection('tips')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Tips from Practice</h2>
                    <p className={styles.sectionIntro}>
                        Lessons from two weeks of daily use (April 9&ndash;24, 2026), managing 7 active software
                        projects with this system.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What Works Well</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Write fast, process later.</strong> Don&apos;t try to be structured in your journal. Write stream-of-consciousness. Claude Code is very good at extracting structure from natural language. The less you think about format, the more authentic your entries are &mdash; and the more useful the processing becomes.</li>
                            <li className={styles.bulletItem}><strong>The morning prompts are the highest-value feature.</strong> After a few days, the prompts start referencing specific stale items by age (&ldquo;skills matrix list &mdash; day 4&rdquo;), yesterday&apos;s unfinished intentions, and approaching deadlines. This is the compound interest of the vault &mdash; it remembers what you forgot.</li>
                            <li className={styles.bulletItem}><strong>Meetings are where the vault shines.</strong> Before this system, action items from meetings lived in email chains and memory. Now they&apos;re extracted, routed to projects, and surfaced in morning prompts until completed. Nothing falls through cracks.</li>
                            <li className={styles.bulletItem}><strong>The confirm-before-writing protocol is essential.</strong> We added it on day 2 after Claude Code made some updates we didn&apos;t agree with. Now it shows a structured summary of every proposed change before writing. This gives you a review step and builds trust in the system.</li>
                            <li className={styles.bulletItem}><strong>The schema evolves faster than you expect.</strong> We went from v2.0 to v2.5 in two weeks. Each version was driven by real friction. Treat the schema as living code. Refactor it.</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Common Pitfalls</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Don&apos;t over-engineer the schema on day one.</strong> Start with journal + project status + check-ins. Add complexity as you need it. We didn&apos;t add meeting processing until day 2, decision records until day 6, or codebase sync until day 8.</li>
                            <li className={styles.bulletItem}><strong>Don&apos;t skip the domain context section.</strong> Without it, Claude Code processes your journal generically. With it, Claude Code understands your terminology, knows your collaborators by name, and can make contextual judgments about what matters.</li>
                            <li className={styles.bulletItem}><strong>Don&apos;t forget to update the schema when something breaks.</strong> If Claude Code does something wrong, the fix usually belongs in CLAUDE.md, not in a one-off correction. Encode the fix so it never happens again.</li>
                            <li className={styles.bulletItem}><strong>Don&apos;t treat the vault as a task manager.</strong> It&apos;s a knowledge system that happens to track tasks. The tasks emerge from your journal writing &mdash; they&apos;re not the primary input. If you start writing tasks directly into status files instead of journaling about your work, you lose the natural language processing that makes the system valuable.</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>The Compound Effect</h3>
                        <p className={styles.bodyText}>
                            After two weeks of daily use:
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>7 projects fully documented with living status files</li>
                            <li className={styles.bulletItem}>22 active tasks tracked with context, not just titles</li>
                            <li className={styles.bulletItem}>5 meetings processed with action items auto-routed</li>
                            <li className={styles.bulletItem}>3 decision records capturing rationale for key choices</li>
                            <li className={styles.bulletItem}>4 analysis pages preserving strategic thinking</li>
                            <li className={styles.bulletItem}>9 changelog entries with semantic descriptions</li>
                            <li className={styles.bulletItem}>A complete activity log spanning every check-in, ingest, sync, and update</li>
                        </ul>
                        <p className={styles.bodyText}>
                            None of this required manual data entry. It all flowed from ~10 minutes of natural writing
                            per day, processed by Claude Code following the CLAUDE.md contract.
                        </p>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Key Takeaway</div>
                            <p className={styles.calloutText}>
                                The vault is the product. The chat disappears. The knowledge stays.
                            </p>
                        </div>
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

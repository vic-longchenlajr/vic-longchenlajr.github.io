'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './tutorial-fire-vault.module.css';

const SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'prerequisites', label: 'Prerequisites' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'installation', label: 'Installation' },
    { id: 'architecture', label: 'System Architecture' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'daily-workflow', label: 'Daily Workflow' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
    { id: 'reference', label: 'Reference' },
];

const DOWNLOADS = {
    claude: 'https://claude.ai/redirect/claudedotcom.v1.0839cf8b-0f5d-47fb-b16f-33e54960ec44/api/desktop/win32/x64/setup/latest/redirect',
    git: 'https://github.com/git-for-windows/git/releases/download/v2.53.0.windows.3/Git-2.53.0.3-64-bit.exe',
    obsidian: 'https://github.com/obsidianmd/obsidian-releases/releases/download/v1.12.7/Obsidian-1.12.7.exe',
    auditPrompt: '/audit-prompt.md',
};

export default function TutorialFireVaultPage() {
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
                    <h1 className={styles.pageTitle}>Tutorial: Fire Vault</h1>
                    <p className={styles.pageSubtitle}>
                        Getting started with the Fire Vault workflow automation system.
                        From installation through your first check-in.
                    </p>
                    <div className={styles.pageMeta}>
                        <span className={styles.metaItem}>Author <span className={styles.metaValue}>Chenla Long, Jr</span></span>
                        <span className={styles.metaItem}>Status <span className={styles.metaValue}>Draft</span></span>
                        <span className={styles.metaItem}>Last Updated <span className={styles.metaValue}>April 2026</span></span>
                    </div>
                </header>

                {/* ---- Overview ---- */}
                <section id="overview" ref={registerSection('overview')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Overview</h2>
                    <p className={styles.sectionIntro}>
                        The Fire Vault is a team-wide knowledge management system that turns your everyday
                        work — meeting notes, status updates, end-of-day summaries — into structured, queryable
                        project data. Think of it as a team memory that anyone can ask questions to.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What It Does for You</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>Generates personalized daily prompts surfacing your priorities, blockers, and stale items</li>
                            <li className={styles.bulletItem}>Automatically tracks task movements across your projects from your natural-language check-ins</li>
                            <li className={styles.bulletItem}>Maintains living project status files that stay current without manual updates</li>
                            <li className={styles.bulletItem}>Lets you query your projects in plain English: &ldquo;What am I blocked on?&rdquo;, &ldquo;What happened last week?&rdquo;</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>What It Does for the Team</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>Consolidated project optics — leadership can request a weekly update generated from everyone&apos;s data</li>
                            <li className={styles.bulletItem}>Knowledge continuity — if someone is out, their project state is documented and queryable</li>
                            <li className={styles.bulletItem}>Reduced manual reporting — no more chasing status updates via email or assembling reports from scratch</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Privacy</h3>
                        <p className={styles.bodyText}>
                            Your raw journal entries are private. They stay on your machine and are never
                            uploaded to the shared repository. What gets shared with the team is the processed
                            output: your project status, daily rollups, and meeting outcomes. Write honestly
                            in your journal — the team sees the structured results, not your raw notes.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Intended Audience</h3>
                        <p className={styles.bodyText}>
                            All engineers on the Fire Suppression Technology team. No coding or technical background is
                            required. You write naturally, the system structures it for you.
                        </p>
                    </div>

                    <div className={styles.callout}>
                        <div className={styles.calloutLabel}>Alignment</div>
                        <p className={styles.calloutText}>
                            This initiative directly supports two 2026 Engineering Non-financial Objectives:
                            Standardization &amp; Knowledge Management, and Digital Transformation (Artificial Intelligence).
                        </p>
                    </div>
                </section>

                {/* ---- Prerequisites ---- */}
                <section id="prerequisites" ref={registerSection('prerequisites')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Prerequisites</h2>
                    <p className={styles.sectionIntro}>
                        Three applications are required. Download links are provided below. If you do not have
                        permission to install any of these, contact Chenla Long or Sebastian Czajka (IT).
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Required Software</h3>
                        <table className={styles.troubleshootingTable}>
                            <thead>
                                <tr>
                                    <th>Software</th>
                                    <th>Purpose</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Claude</td>
                                    <td>Where you check in and interact with the vault — your active interface</td>
                                    <td><a href={DOWNLOADS.claude} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Download for Windows</a></td>
                                </tr>
                                <tr>
                                    <td>Git</td>
                                    <td>Runs in the background — keeps your vault synced with the team (you never use this directly)</td>
                                    <td><a href={DOWNLOADS.git} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Download for Windows</a></td>
                                </tr>
                                <tr>
                                    <td>Obsidian</td>
                                    <td>Where you browse and read your vault — a viewer for your files, status, and prompts</td>
                                    <td><a href={DOWNLOADS.obsidian} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Download for Windows</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.callout}>
                        <div className={styles.calloutLabel}>How These Fit Together</div>
                        <p className={styles.calloutText}>
                            <strong>Claude</strong> is where you do your work — you talk to it, it processes your check-ins and
                            updates your vault. <strong>Obsidian</strong> is where you read the results — browse your
                            project status, prompts, and meeting outcomes. <strong>Git</strong> just needs to be installed — Claude
                            handles all the syncing automatically. You will never need to run a Git command.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Required Access</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>Claude license with Claude Code enabled — contact Sebastian Czajka (IT) if you don&apos;t have one</li>
                            <li className={styles.bulletItem}>GitHub account with access to the <code className={styles.inlineCode}>Victaulic-Engineering-Tech-Solutions</code> organization</li>
                        </ul>
                    </div>

                    <div className={styles.callout}>
                        <div className={styles.calloutLabel}>Note</div>
                        <p className={styles.calloutText}>
                            Claude Code is enabled inside your Claude desktop app — it is not a separate install.
                            Once you have a Claude license, Claude Code can be toggled on in the app settings.
                        </p>
                    </div>
                </section>

                {/* ---- Onboarding ---- */}
                <section id="onboarding" ref={registerSection('onboarding')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Onboarding</h2>
                    <p className={styles.sectionIntro}>
                        Before you install anything, the first step is a workflow audit. This is how the
                        system learns how you work so it can be configured for you specifically.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Step 1: Workflow Audit</h3>
                        <p className={styles.bodyText}>
                            Chenla will send you a prompt to paste into a Claude session. This starts a guided
                            conversation about how you work today — your daily rhythm, how you track tasks,
                            meeting habits, communication preferences, and what you would want the system to
                            do for you. It takes about 15 to 20 minutes.
                        </p>
                        <p className={styles.bodyText}>
                            There are no wrong answers. If you don&apos;t take notes, say so. If you track everything
                            in your head, that is useful to know. The goal is to understand your workflow so the
                            system can meet you where you are — not the other way around.
                        </p>
                        <p className={styles.bodyText}>
                            When the conversation is done, send the full output back to Chenla. You can use
                            Claude on the web at{' '}
                            <a href="https://claude.ai" className={styles.downloadLink} target="_blank" rel="noopener noreferrer">claude.ai</a>{' '}
                            for this step — no software install required yet.
                        </p>
                        <p className={styles.bodyText}>
                            <a href={DOWNLOADS.auditPrompt} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Download the Workflow Audit Prompt</a>
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Step 2: Wait for Your CLAUDE.md</h3>
                        <p className={styles.bodyText}>
                            After receiving your audit output, Chenla generates your personal{' '}
                            <code className={styles.inlineCode}>CLAUDE.md</code> and places it in your directory
                            in the vault. This file tells Claude how you work: your check-in cadence, what
                            format you prefer, which prompts to ask you, and how to process your entries.
                            Chenla will let you know when it is ready.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Step 3: Review Your CLAUDE.md</h3>
                        <p className={styles.bodyText}>
                            Read your generated <code className={styles.inlineCode}>CLAUDE.md</code> and flag anything that
                            does not match how you actually work. This is a living document — it will be
                            refined over time as you use the system. If something feels off later, just tell
                            Claude and it will adjust.
                        </p>
                    </div>

                    <div className={styles.callout}>
                        <div className={styles.calloutLabel}>Important</div>
                        <p className={styles.calloutText}>
                            Your <code className={styles.inlineCode}>CLAUDE.md</code> is the single most important file in
                            your directory. It controls your entire experience — your check-in rhythm, your
                            prompts, how your input is processed. If the system is not working the way you want,
                            the fix is almost always in your <code className={styles.inlineCode}>CLAUDE.md</code>.
                        </p>
                    </div>
                </section>

                {/* ---- Installation ---- */}
                <section id="installation" ref={registerSection('installation')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Installation</h2>
                    <p className={styles.sectionIntro}>
                        Once your CLAUDE.md is ready, install the required software and get connected to the vault.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Step 1: Install Claude</h3>
                        <ol className={styles.numberedList}>
                            <li className={styles.numberedItem}><a href={DOWNLOADS.claude} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Download Claude for Windows</a></li>
                            <li className={styles.numberedItem}>Run the installer and follow the prompts</li>
                            <li className={styles.numberedItem}>Sign in with your Anthropic account</li>
                            <li className={styles.numberedItem}>Open Settings and enable Claude Code</li>
                        </ol>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Step 2: Install Git</h3>
                        <ol className={styles.numberedList}>
                            <li className={styles.numberedItem}><a href={DOWNLOADS.git} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Download Git for Windows</a></li>
                            <li className={styles.numberedItem}>Run the installer — default settings are fine for all prompts</li>
                        </ol>
                        <p className={styles.bodyText}>
                            That&apos;s it. Git needs to be on your machine so Claude can sync your vault with the team
                            in the background. You will never need to open Git or run any Git commands — Claude handles
                            all of that automatically during your check-ins.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Step 3: Install Obsidian</h3>
                        <ol className={styles.numberedList}>
                            <li className={styles.numberedItem}><a href={DOWNLOADS.obsidian} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Download Obsidian for Windows</a></li>
                            <li className={styles.numberedItem}>Run the installer and follow the prompts</li>
                            <li className={styles.numberedItem}>When Obsidian opens, select &ldquo;Open folder as vault&rdquo; — you will point it to the FIRE_VAULT directory after cloning (next step)</li>
                        </ol>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Step 4: Get the Fire Vault Repository</h3>
                        <p className={styles.bodyText}>
                            Chenla will help you get a copy of the Fire Vault repository on your machine during
                            your onboarding session. Once it&apos;s set up, open Obsidian and select the{' '}
                            <code className={styles.inlineCode}>FIRE_VAULT</code> folder as your vault. You should
                            see the team directory structure in the sidebar.
                        </p>
                    </div>

                    <div className={styles.callout}>
                        <div className={styles.calloutLabel}>Important</div>
                        <p className={styles.calloutText}>
                            If you run into any issues getting connected to the repository, contact Chenla Long.
                            You will need a GitHub account with access to the Victaulic organization.
                        </p>
                    </div>
                </section>

                {/* ---- System Architecture ---- */}
                <section id="architecture" ref={registerSection('architecture')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>System Architecture</h2>
                    <p className={styles.sectionIntro}>
                        The Fire Vault is a shared Git repository with a structured directory layout.
                        Each engineer has a personal directory. The team-level root ties everything together.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Repository Structure</h3>
                        <div className={styles.codeBlock}>
                            <code>FIRE_VAULT/</code><br />
                            <code>├── CLAUDE.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Team-level operating manual</code><br />
                            <code>├── _admin/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Admin resources (audit prompt)</code><br />
                            <code>├── _ops/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Team-level consolidated optics</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;├── briefing.md&nbsp;&nbsp;&nbsp;&nbsp;# Cross-team status dashboard</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;└── weekly/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Weekly rollup reports</code><br />
                            <code>├── _projects/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Shared project-level data</code><br />
                            <code>├── _wiki/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Shared knowledge base</code><br />
                            <code>├── clong/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Chenla Long</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;├── status.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Personal project status</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;├── journal/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Daily journal entries</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;├── meetings/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Meeting notes</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;└── rollups/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Personal summaries</code><br />
                            <code>├── bsloan/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Brian Sloan</code><br />
                            <code>├── rballard/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Robert Ballard</code><br />
                            <code>├── &lt;username&gt;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Your personal directory</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;├── status.md</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;├── journal/</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;├── meetings/</code><br />
                            <code>│&nbsp;&nbsp;&nbsp;└── rollups/</code><br />
                            <code>└── ...</code>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>How CLAUDE.md Works</h3>
                        <p className={styles.bodyText}>
                            <code className={styles.inlineCode}>CLAUDE.md</code> is the operating manual that tells Claude how to behave.
                            There are two levels:
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Team-level</strong> (root <code className={styles.inlineCode}>CLAUDE.md</code>) — defines shared conventions, vault architecture, synchronization rules, and how team optics are generated. Everyone inherits this.</li>
                            <li className={styles.bulletItem}><strong>Personal-level</strong> (your directory&apos;s <code className={styles.inlineCode}>CLAUDE.md</code>) — defines your specific workflow: check-in cadence, input format, projects you own, people you work with, and how you prefer to interact with the system.</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Data Flow</h3>
                        <p className={styles.bodyText}>
                            When you check in, the following happens automatically:
                        </p>
                        <ol className={styles.numberedList}>
                            <li className={styles.numberedItem}>You write in your journal — meeting notes, plans, or an end-of-day summary</li>
                            <li className={styles.numberedItem}>Claude reads your entry and extracts tasks, decisions, and updates</li>
                            <li className={styles.numberedItem}>Task movements are routed to the correct project status files</li>
                            <li className={styles.numberedItem}>Your daily briefing and prompts are regenerated</li>
                            <li className={styles.numberedItem}>Changes are committed and synced to the shared repository</li>
                        </ol>
                        <p className={styles.bodyText}>
                            You write naturally. The system handles the structure.
                        </p>
                    </div>
                </section>

                {/* ---- Getting Started ---- */}
                <section id="getting-started" ref={registerSection('getting-started')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Getting Started</h2>
                    <p className={styles.sectionIntro}>
                        With your software installed and your CLAUDE.md in place, it is time to bring
                        your vault online.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Running INIT</h3>
                        <p className={styles.bodyText}>
                            Open Claude Code in your personal directory within the FIRE_VAULT repository.
                            Tell Claude to initialize your vault:
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>init</p>
                                <p className={styles.commandAliases}>
                                    <span className={styles.commandAliasLabel}>Also works: </span>
                                    <span className={styles.commandAlias}>&ldquo;initialize my vault&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;set up my vault&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;run init&rdquo;</span>
                                </p>
                            </div>
                        </div>
                        <p className={styles.bodyText}>
                            Claude will have a short conversation with you about your active projects, who you
                            work with, and what you are currently waiting on. From that conversation, it creates
                            your <code className={styles.inlineCode}>status.md</code> file populated with real
                            project data and sets up your directory structure. This is a one-time setup step
                            that takes about 5 to 10 minutes. After INIT, your vault is ready for your first check-in.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Your First Check-in</h3>
                        <p className={styles.bodyText}>
                            Open your journal for today and write. It can be a morning plan, meeting notes,
                            or just a dump of what you did. Write naturally — do not worry about formatting.
                            When you are ready, tell Claude to check in:
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>checkin morning</p>
                                <p className={styles.commandAliases}>
                                    <span className={styles.commandAliasLabel}>Also works: </span>
                                    <span className={styles.commandAlias}>&ldquo;morning checkin&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;check in for the morning&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;morning check-in&rdquo;</span>
                                </p>
                            </div>
                        </div>
                        <p className={styles.bodyText}>
                            Claude will read your entry, extract tasks and updates, route them to the
                            correct project status files, and regenerate your briefing. Here is an example
                            of what the interaction looks like:
                        </p>
                        <div className={styles.codeBlock}>
                            <code><strong>You:</strong> Spent the morning on the 300BAR test report. Had a</code><br />
                            <code>meeting with Brendan about ARV sizing — decided to defer the</code><br />
                            <code>1.5 inch to gen 2. Still waiting on Daniel for the trim kit</code><br />
                            <code>pricing. After lunch I&apos;ll work on the error flags.</code><br />
                            <br />
                            <code><strong>Claude:</strong> Got it. Here&apos;s what I captured:</code><br />
                            <code>&nbsp;&nbsp;- 300BAR test report — in progress</code><br />
                            <code>&nbsp;&nbsp;- ARV meeting with Brendan — decision: 1.5&quot; deferred to gen 2</code><br />
                            <code>&nbsp;&nbsp;- Waiting on Daniel Wake — trim kit pricing</code><br />
                            <code>&nbsp;&nbsp;- Afternoon plan: error flags implementation</code><br />
                            <code>I&apos;ll update your status and route the ARV decision. Anything</code><br />
                            <code>I missed?</code>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Verification</h3>
                        <p className={styles.bodyText}>
                            After your first check-in, open Obsidian and browse your directory. In the
                            sidebar, expand your folder. You should see:
                        </p>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><code className={styles.inlineCode}>status.md</code> — your project status, now populated with the tasks and updates you mentioned</li>
                            <li className={styles.bulletItem}><code className={styles.inlineCode}>rollups/</code> — contains your first daily rollup with a summary of your check-in and time allocation</li>
                            <li className={styles.bulletItem}><code className={styles.inlineCode}>journal/</code> — your raw journal entry with Claude&apos;s processing appended below the separator</li>
                        </ul>
                        <p className={styles.bodyText}>
                            Click on <code className={styles.inlineCode}>status.md</code> to see your current
                            project state. Click on today&apos;s rollup to see the structured summary of what you
                            reported. If everything looks right, you are live. The system improves the more you
                            use it. After one week of check-ins, you will have a queryable database of everything
                            you worked on.
                        </p>
                    </div>
                </section>

                {/* ---- Daily Workflow ---- */}
                <section id="daily-workflow" ref={registerSection('daily-workflow')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Daily Workflow</h2>
                    <p className={styles.sectionIntro}>
                        The vault is designed around flexible check-ins. Your personal{' '}
                        <code className={styles.inlineCode}>CLAUDE.md</code> defines your rhythm — some
                        people check in once a day at end-of-day, others check in morning and evening, others
                        add a midday update. The options below are the full menu, not the expectation. Your
                        configuration determines what works for you.
                    </p>

                    <div className={styles.callout}>
                        <div className={styles.calloutLabel}>Daily Rollups</div>
                        <p className={styles.calloutText}>
                            Each check-in produces a <strong>daily rollup</strong> — a structured summary of what you
                            completed, what is in progress, what is blocked, and what is planned for tomorrow. This is
                            the team-visible output of your check-in. It includes a <strong>time allocation
                            breakdown</strong> formatted for direct transfer to LiquidPlanner, so your LP timesheet
                            entry becomes a copy-paste instead of a reconstruction from memory.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Morning Check-in</h3>
                        <p className={styles.bodyText}>
                            Write your plan for the day in the morning section of your journal. What are you
                            working on? Any meetings? What is carrying from yesterday? Claude reads your
                            previous journal and project status to generate personalized prompts that surface
                            priorities, stale items, and things you might have forgotten.
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>checkin morning</p>
                                <p className={styles.commandAliases}>
                                    <span className={styles.commandAliasLabel}>Also works: </span>
                                    <span className={styles.commandAlias}>&ldquo;morning checkin&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;morning check-in&rdquo;</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Midday Check-in (Optional)</h3>
                        <p className={styles.bodyText}>
                            If your morning plan changed — new information came in, a meeting produced
                            action items, a bug surfaced — write it in the midday section. Claude will
                            update your project status files with any new tasks or information.
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>checkin midday</p>
                                <p className={styles.commandAliases}>
                                    <span className={styles.commandAliasLabel}>Also works: </span>
                                    <span className={styles.commandAlias}>&ldquo;midday checkin&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;midday check-in&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;check in midday&rdquo;</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>End-of-Day Check-in</h3>
                        <p className={styles.bodyText}>
                            Write what actually happened. Claude compares your morning plan against your
                            actual outcomes, archives completed tasks, flags items that need to carry forward,
                            and generates tomorrow&apos;s journal and prompts.
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>checkin eod</p>
                                <p className={styles.commandAliases}>
                                    <span className={styles.commandAliasLabel}>Also works: </span>
                                    <span className={styles.commandAlias}>&ldquo;end of day checkin&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;eod check-in&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;check in end of day&rdquo;</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Meeting Notes</h3>
                        <p className={styles.bodyText}>
                            When you take meeting notes, write them in your journal or in a dedicated meeting
                            file. Tell Claude to process a specific meeting when you are done:
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>checkin meeting [name]</p>
                                <p className={styles.commandAliases}>
                                    <span className={styles.commandAliasLabel}>Also works: </span>
                                    <span className={styles.commandAlias}>&ldquo;process the meeting notes&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;process the [name] meeting&rdquo;</span>
                                </p>
                            </div>
                        </div>
                        <p className={styles.bodyText}>
                            Claude extracts decisions, action items, and follow-ups, then routes them
                            to the correct project status files. You do not need to manually file anything.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Querying Your Vault</h3>
                        <p className={styles.bodyText}>
                            At any time, you can ask Claude questions about your projects in plain English.
                            There is no special command — just ask:
                        </p>
                        <div className={styles.commandBlock}>
                            <div className={styles.commandHeader}>
                                <span className={styles.commandIcon}>Claude Command</span>
                            </div>
                            <div className={styles.commandBody}>
                                <p className={styles.commandPrimary}>query</p>
                                <p className={styles.commandAliases}>
                                    <span className={styles.commandAliasLabel}>Examples: </span>
                                    <span className={styles.commandAlias}>&ldquo;What is blocked right now?&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;What did I work on last week?&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;What is the status of Vortex?&rdquo;</span>,{' '}
                                    <span className={styles.commandAlias}>&ldquo;What action items came out of the last team meeting?&rdquo;</span>
                                </p>
                            </div>
                        </div>
                        <p className={styles.bodyText}>
                            Claude reads your vault and synthesizes an answer with references to the
                            relevant pages.
                        </p>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Missed Check-ins</h3>
                        <p className={styles.bodyText}>
                            If you miss a day, that is fine. The next time you check in, Claude will
                            acknowledge the gap and pick up where you left off. No guilt, no friction. If
                            you miss a morning check-in, the end-of-day prompts will adjust to cover both.
                            The system is designed for real schedules, not perfect ones.
                        </p>
                    </div>

                    <div className={styles.callout}>
                        <div className={styles.calloutLabel}>Flexibility</div>
                        <p className={styles.calloutText}>
                            There is no forced cadence. Your check-in rhythm is configured in your personal{' '}
                            <code className={styles.inlineCode}>CLAUDE.md</code> based on your workflow audit. Some
                            people check in once with an end-of-day summary. Others do morning and evening. The
                            system adapts to you — not the other way around. If your rhythm needs to change, just
                            tell Claude and your configuration will be updated.
                        </p>
                    </div>
                </section>

                {/* ---- Troubleshooting ---- */}
                <section id="troubleshooting" ref={registerSection('troubleshooting')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Troubleshooting</h2>
                    <p className={styles.sectionIntro}>
                        Common issues and how to resolve them.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Common Issues</h3>
                        <table className={styles.troubleshootingTable}>
                            <thead>
                                <tr>
                                    <th>Symptom</th>
                                    <th>Possible Cause</th>
                                    <th>Resolution</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Claude Code will not connect</td>
                                    <td>Corporate firewall blocking <code className={styles.inlineCode}>api.anthropic.com</code></td>
                                    <td>Contact IT to whitelist the domain</td>
                                </tr>
                                <tr>
                                    <td>Cannot connect to the vault repository</td>
                                    <td>No access to GitHub organization</td>
                                    <td>Contact Chenla to add your GitHub account</td>
                                </tr>
                                <tr>
                                    <td>Obsidian shows an empty vault</td>
                                    <td>Opened the wrong folder</td>
                                    <td>File &rarr; Open Vault &rarr; select the FIRE_VAULT directory</td>
                                </tr>
                                <tr>
                                    <td>Claude does not process my journal</td>
                                    <td>Missing separator line</td>
                                    <td>Ensure the LLM processing separator exists below your writing</td>
                                </tr>
                                <tr>
                                    <td>Check-in prompts feel generic</td>
                                    <td>CLAUDE.md needs tuning</td>
                                    <td>Tell Claude what feels off — it will update your config</td>
                                </tr>
                                <tr>
                                    <td>Check-in fails with a sync error</td>
                                    <td>Someone else was syncing at the same time</td>
                                    <td>Try checking in again. If it persists, contact Chenla.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.callout}>
                        <div className={styles.calloutLabel}>Support</div>
                        <p className={styles.calloutText}>
                            For system issues, CLAUDE.md adjustments, or access requests, contact
                            Chenla Long (chenla.long@victaulic.com). For Claude licensing and IT
                            access, contact Sebastian Czajka.
                        </p>
                    </div>
                </section>

                {/* ---- Reference ---- */}
                <section id="reference" ref={registerSection('reference')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Reference</h2>
                    <p className={styles.sectionIntro}>
                        Downloads, links, and contacts.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Software Downloads</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><a href={DOWNLOADS.claude} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Claude for Windows</a></li>
                            <li className={styles.bulletItem}><a href={DOWNLOADS.git} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Git for Windows (v2.53.0)</a></li>
                            <li className={styles.bulletItem}><a href={DOWNLOADS.obsidian} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Obsidian for Windows (v1.12.7)</a></li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Resources</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><a href={DOWNLOADS.auditPrompt} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Workflow Audit Prompt</a> — used during the onboarding step</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Key Contacts</h3>
                        <table className={styles.troubleshootingTable}>
                            <thead>
                                <tr>
                                    <th>Contact</th>
                                    <th>Role</th>
                                    <th>For</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Chenla Long, Jr</td>
                                    <td>System Administrator</td>
                                    <td>Vault setup, CLAUDE.md, troubleshooting, GitHub access</td>
                                </tr>
                                <tr>
                                    <td>Sebastian Czajka</td>
                                    <td>AI Operations Analyst, IT</td>
                                    <td>Claude licensing, network access, IT approvals</td>
                                </tr>
                            </tbody>
                        </table>
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

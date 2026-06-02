'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './guide-fire-vault.module.css';
import ArchitectureTab from './ArchitectureTab';
import PmnTab from './PmnTab';
import UsageTab from './UsageTab';

type TabId = 'tutorial' | 'usage' | 'architecture' | 'persistent-memory';

const TABS: { id: TabId; label: string }[] = [
    { id: 'tutorial', label: 'Tutorial' },
    { id: 'usage', label: 'Usage' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'persistent-memory', label: 'Memory Network' },
];

const TAB_SECTIONS: Record<TabId, { id: string; label: string }[]> = {
    tutorial: [
        { id: 'overview', label: 'Overview' },
        { id: 'prerequisites', label: 'Prerequisites' },
        { id: 'onboarding', label: 'Onboarding' },
        { id: 'installation', label: 'Installation' },
        { id: 'getting-started', label: 'Getting Started' },
        { id: 'troubleshooting', label: 'Troubleshooting' },
    ],
    usage: [
        { id: 'usage-commands', label: 'Quick Commands' },
        { id: 'usage-role', label: 'By Role' },
        { id: 'usage-customize', label: 'Making it Yours' },
    ],
    architecture: [
        { id: 'arch-layers', label: 'The Three Layers' },
        { id: 'arch-data-flow', label: 'Data Flow' },
        { id: 'arch-phase2', label: 'Phase 2' },
    ],
    'persistent-memory': [
        { id: 'pmn-cycle', label: 'The Daily Cycle' },
        { id: 'pmn-spectrum', label: 'Visibility Spectrum' },
        { id: 'pmn-compounds', label: 'What the Vault Knows' },
    ],
};

const TAB_LABELS: Record<TabId, string> = {
    tutorial: 'Tutorial',
    usage: 'Usage',
    architecture: 'Architecture',
    'persistent-memory': 'Memory Network',
};

const TAB_SUBTITLES: Record<TabId, string> = {
    tutorial: 'Getting started with the Fire Vault workflow automation system. From installation through your first check-in.',
    usage: 'How to use your daily check-in system — by role, by task, and in your own words.',
    architecture: 'Three-layer system design: local machine, Anthropic API, and corporate GitHub organization.',
    'persistent-memory': 'How the vault compounds daily check-ins into queryable institutional knowledge over time.',
};

const DOWNLOADS = {
    claude: "https://claude.ai/redirect/claudedotcom.v1.0839cf8b-0f5d-47fb-b16f-33e54960ec44/api/desktop/win32/x64/setup/latest/redirect",
    git: "https://github.com/git-for-windows/git/releases/download/v2.53.0.windows.3/Git-2.53.0.3-64-bit.exe",
    obsidian: "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.12.7/Obsidian-1.12.7.exe",
    auditPrompt: "/downloads/audit-prompt.md",
};

export default function GuideFireVaultPage() {
    const [activeTab, setActiveTab] = useState<TabId>('tutorial');
    const [slideDir, setSlideDir] = useState<'right' | 'left'>('right');
    const [contentKey, setContentKey] = useState(0);
    const [activeSection, setActiveSection] = useState(TAB_SECTIONS['tutorial'][0].id);
    const [mobileTocOpen, setMobileTocOpen] = useState(false);
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

    const registerSection = useCallback((id: string) => (el: HTMLElement | null) => {
        if (el) {
            sectionRefs.current.set(id, el);
        } else {
            sectionRefs.current.delete(id);
        }
    }, []);

    useEffect(() => {
        setActiveSection(TAB_SECTIONS[activeTab][0].id);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, contentKey]);

    const switchTab = useCallback((newTab: TabId) => {
        if (newTab === activeTab) return;
        const oldIdx = TABS.findIndex(t => t.id === activeTab);
        const newIdx = TABS.findIndex(t => t.id === newTab);
        setSlideDir(newIdx > oldIdx ? 'right' : 'left');
        setActiveTab(newTab);
        setContentKey(k => k + 1);
        setMobileTocOpen(false);
        window.scrollTo(0, 0);
    }, [activeTab]);

    const scrollTo = (id: string) => {
        sectionRefs.current.get(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileTocOpen(false);
    };

    const currentSections = TAB_SECTIONS[activeTab];

    return (
        <div className={styles.pageContainer}>
            {/* Mobile TOC */}
            <div className={styles.mobileToc}>
                <div className={styles.mobileTabBar}>
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            className={`${styles.mobileTabBtn} ${activeTab === tab.id ? styles.mobileTabBtnActive : ''}`}
                            onClick={() => switchTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <button className={styles.mobileTocToggle} onClick={() => setMobileTocOpen(!mobileTocOpen)}>
                    <span>Contents</span>
                    <span className={`${styles.mobileTocArrow} ${mobileTocOpen ? styles.mobileTocArrowOpen : ''}`}>
                        &#9660;
                    </span>
                </button>
                {mobileTocOpen && (
                    <div className={styles.mobileTocDropdown}>
                        <ul className={styles.mobileTocList}>
                            {currentSections.map((s) => (
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
                <div
                    key={contentKey}
                    className={slideDir === 'right' ? styles.slideRight : styles.slideLeft}
                >
                    <header className={styles.pageHeader}>
                        <h1 className={styles.pageTitle}>
                            <span className={styles.pageTitlePrefix}>Guide: Fire Vault</span>
                            <span className={styles.pageTitleSep}> / </span>
                            {TAB_LABELS[activeTab]}
                        </h1>
                        <p className={styles.pageSubtitle}>{TAB_SUBTITLES[activeTab]}</p>
                        <div className={styles.pageMeta}>
                            <span className={styles.metaItem}>Author <span className={styles.metaValue}>Chenla Long, Jr</span></span>
                            <span className={styles.metaItem}>Status <span className={styles.metaValue}>Pilot Ready</span></span>
                            <span className={styles.metaItem}>Last Updated <span className={styles.metaValue}>May 2026</span></span>
                        </div>
                    </header>

                    {/* ===== TUTORIAL TAB ===== */}
                    {activeTab === 'tutorial' && (
                        <>
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
                                                <td>Where you write journal entries and read your results — your window into the vault</td>
                                                <td><a href={DOWNLOADS.obsidian} className={styles.downloadLink} target="_blank" rel="noopener noreferrer">Download for Windows</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.callout}>
                                    <div className={styles.calloutLabel}>How These Fit Together</div>
                                    <p className={styles.calloutText}>
                                        <strong>Claude</strong> is where you do your work — you talk to it, it processes your check-ins and
                                        updates your vault. <strong>Obsidian</strong> is where you write journal entries and read the results —
                                        some days you write everything out first, other days you just open Claude and answer its prompts.
                                        Either way works. Your <code>ops/briefing.md</code> gives you a current-state snapshot any time —
                                        open it in Obsidian without starting a Claude session to see where your projects stand.{' '}
                                        <strong>Git</strong> just needs to be installed — Claude handles all the syncing
                                        automatically. You will never need to run a Git command.
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
                                        Chenla will run the audit with you directly in a Claude Code session. This starts a
                                        guided conversation about how you work today — your daily rhythm, how you track tasks,
                                        meeting habits, communication preferences, and what you would want the system to
                                        do for you. It takes about 15 to 20 minutes.
                                    </p>
                                    <p className={styles.bodyText}>
                                        There are no wrong answers. If you don&apos;t take notes, say so. If you track everything
                                        in your head, that is useful to know. The goal is to understand your workflow so the
                                        system can meet you where you are — not the other way around.
                                    </p>
                                    <p className={styles.bodyText}>
                                        At the end of the session, Claude automatically generates your configuration files
                                        and saves them directly to the vault — nothing to send.
                                    </p>
                                </div>

                                <div className={styles.subsection}>
                                    <h3 className={styles.subsectionTitle}>Step 2: Chenla Reviews Your Draft</h3>
                                    <p className={styles.bodyText}>
                                        Your personal <code className={styles.inlineCode}>CLAUDE.md</code> is generated
                                        during the audit session itself. It tells Claude how you work: your check-in cadence,
                                        what format you prefer, which prompts to ask you, and how to process your entries.
                                        Chenla reviews the draft and confirms it looks right — turnaround is typically
                                        same-day. You will hear back once it is ready.
                                    </p>
                                </div>

                                <div className={styles.subsection}>
                                    <h3 className={styles.subsectionTitle}>Step 3: Review Your CLAUDE.md</h3>
                                    <p className={styles.bodyText}>
                                        Open your <code className={styles.inlineCode}>CLAUDE.md</code> in Obsidian and read through it.
                                        Reply to Chenla with anything that does not match how you actually work — wrong cadence,
                                        missing projects, prompts that feel off. This is a living document and will be refined
                                        as you use the system. Getting it close on day one just means less tuning later.
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

                                <div className={styles.callout}>
                                    <div className={styles.calloutLabel}>Why the order matters</div>
                                    <p className={styles.calloutText}>
                                        The system enforces this sequence. If you open Claude Code and try to check in before
                                        your personal <code className={styles.inlineCode}>CLAUDE.md</code> exists, it stops
                                        immediately and redirects you to contact Chenla — there is no generic fallback.
                                        The workflow audit and CLAUDE.md setup are not optional prerequisites; they are
                                        enforced by the system itself. This is by design: unconfigured output would silently
                                        corrupt the team data.
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
                                    </ol>
                                </div>

                                <div className={styles.subsection}>
                                    <h3 className={styles.subsectionTitle}>Step 4: Get the Fire Vault Repository</h3>
                                    <p className={styles.bodyText}>
                                        Chenla will help you clone the Fire Vault repository to your machine during your
                                        onboarding session. It will be placed in your{' '}
                                        <code className={styles.inlineCode}>Documents\FIRE_VAULT</code> folder.
                                    </p>
                                </div>

                                <div className={styles.subsection}>
                                    <h3 className={styles.subsectionTitle}>Step 5: Open the Vault in Obsidian</h3>
                                    <ol className={styles.numberedList}>
                                        <li className={styles.numberedItem}>Open Obsidian</li>
                                        <li className={styles.numberedItem}>Click <strong>Open folder as vault</strong></li>
                                        <li className={styles.numberedItem}>Navigate to <code className={styles.inlineCode}>Documents\FIRE_VAULT</code> and select it</li>
                                        <li className={styles.numberedItem}>You should see the team directory structure in the left sidebar — your personal folder, the shared <code className={styles.inlineCode}>_ops</code> and <code className={styles.inlineCode}>_projects</code> folders, and your teammates&apos; directories</li>
                                    </ol>
                                    <p className={styles.bodyText}>
                                        Obsidian only needs to be pointed at the vault once. It will remember this location every time you open it.
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
                                        During your onboarding session, Chenla will open Claude Code in your personal
                                        directory within the FIRE_VAULT repository. Tell Claude to initialize your vault:
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
                                        Claude will have a short conversation with you covering your active projects, where
                                        you keep project files on your machine, who you collaborate with, your recurring
                                        meetings, and what you are currently waiting on from others. From that conversation,
                                        it creates your <code className={styles.inlineCode}>status.md</code> file populated
                                        with real project data and sets up your directory structure. This is a one-time
                                        setup step that takes about 5 to 10 minutes.
                                    </p>
                                    <p className={styles.bodyText}>
                                        At the end of INIT, Claude places a <strong>Fire Vault</strong> shortcut on your
                                        desktop, then walks you through exactly how your check-ins will work — your cadence,
                                        what it will ask you, and what to expect — based on your personal{' '}
                                        <code className={styles.inlineCode}>CLAUDE.md</code>. From that point,
                                        double-clicking the shortcut is all you need to do to open your vault each day.
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
                                        correct project status files, and update your rollup. Here is an example
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
                                        <li className={styles.bulletItem}><code className={styles.inlineCode}>ops/briefing.md</code> — your current project snapshot, readable in Obsidian any time without opening Claude</li>
                                        <li className={styles.bulletItem}><code className={styles.inlineCode}>ops/prompts.md</code> — your personalized check-in questions for tomorrow, pre-generated at end-of-day and morning check-in</li>
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
                                                <td>Desktop shortcut is missing or broken</td>
                                                <td>Shortcut was moved or deleted</td>
                                                <td>Open your vault once with Chenla&apos;s help, then tell Claude &ldquo;create my desktop shortcut&rdquo;</td>
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
                        </>
                    )}

                    {/* ===== USAGE TAB ===== */}
                    {activeTab === 'usage' && (
                        <UsageTab registerSection={registerSection} />
                    )}

                    {/* ===== ARCHITECTURE TAB ===== */}
                    {activeTab === 'architecture' && (
                        <ArchitectureTab registerSection={registerSection} />
                    )}

                    {/* ===== MEMORY NETWORK TAB ===== */}
                    {activeTab === 'persistent-memory' && (
                        <PmnTab registerSection={registerSection} />
                    )}
                </div>
            </main>

            {/* TOC Sidebar */}
            <aside className={styles.tocSidebar}>
                <nav className={styles.tabNav}>
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            className={`${styles.tabNavItem} ${activeTab === tab.id ? styles.tabNavItemActive : ''}`}
                            onClick={() => switchTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <h3 className={styles.tocHeader}>Contents</h3>
                <ul className={styles.tocList} key={activeTab}>
                    {currentSections.map((s) => (
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

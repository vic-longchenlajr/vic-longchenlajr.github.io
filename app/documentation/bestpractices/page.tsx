'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './bestpractices.module.css';

/* =========================================================
   DATA
   ========================================================= */

const SECTIONS = [
    { id: 'project-inventory', label: 'Project Inventory' },
    { id: 'development-lifecycle', label: 'Development Lifecycle' },
    { id: 'project-structure', label: 'Project Structure' },
    { id: 'technology-stack', label: 'Technology Stack' },
    { id: 'version-control', label: 'Version Control' },
    { id: 'release-deployment', label: 'Release & Deployment' },
    { id: 'documentation-standards', label: 'Documentation Standards' },
    { id: 'issue-tracking', label: 'Issue Tracking & Feedback' },
    { id: 'ai-development', label: 'AI-Assisted Development' },
    { id: 'appendix-glossary', label: 'Appendix A: Glossary' },
    { id: 'appendix-initiation', label: 'Appendix B: Initiation Checklist' },
    { id: 'appendix-prerelease', label: 'Appendix C: Pre-Release Checklist' },
    { id: 'appendix-readme', label: 'Appendix D: README Template' },
];

interface ProjectInfo {
    name: string;
    description: string;
    stack: string[];
    deployment: string;
    users: string;
}

const PROJECTS: ProjectInfo[] = [
    {
        name: 'Vortex Project Builder',
        description: 'Vortex fire suppression system project configurator',
        stack: ['TypeScript', 'React 18', 'Next.js 13', 'Electron Forge', 'Tailwind CSS'],
        deployment: 'GitHub Pages + External Domain',
        users: 'Customers, Sales, AE, Customer Care',
    },
    {
        name: 'VicFlex Bracket Filter',
        description: 'Bracket selection tool for VicFlex fire sprinkler bracket configurations with D-value lookup',
        stack: ['TypeScript', 'React 19', 'Next.js 15', 'Electron Forge', 'CSS Modules'],
        deployment: 'GitHub Pages + Internal Domain',
        users: 'Applications Engineering, Sales',
    },
    {
        name: 'Resource Dashboard',
        description: 'Engineering resource utilization dashboard with 11 configurable panels, CSV import from LiquidPlanner, and IndexedDB storage',
        stack: ['TypeScript', 'React 19', 'Vite 7', 'Tailwind CSS', 'Dexie.js', 'Recharts'],
        deployment: 'GitHub Pages',
        users: 'Engineering (internal)',
    },
    {
        name: 'SprayTrace',
        description: 'Spray distribution test tracking app for FM 2000 and UL 199 standards with timeline, comparison, and visualization',
        stack: ['JavaScript/JSX', 'React 19', 'Vite 7', 'Tailwind CSS', 'Dexie.js'],
        deployment: 'GitHub Pages',
        users: 'Engineering (internal)',
    },
];

interface LifecyclePhase {
    number: number;
    name: string;
    tagline: string;
    items: string[];
    exitCriteria: string;
}

const LIFECYCLE: LifecyclePhase[] = [
    {
        number: 1,
        name: 'Discovery',
        tagline: 'Should we build this?',
        items: [
            'Define the problem statement and intended users',
            'Identify stakeholders across functional groups (Engineering, AE, Marketing, Training, etc.)',
            'Assess feasibility \u2014 technical approach, level of effort, and timeline',
            'Determine whether an existing tool can be extended or a new project is warranted',
        ],
        exitCriteria: 'Problem is clearly defined, stakeholders are identified, and a decision to proceed has been made.',
    },
    {
        number: 2,
        name: 'Immersion',
        tagline: 'Understand the domain deeply before writing code.',
        items: [
            'Collect input from stakeholders on required features and workflows',
            'Review applicable standards, published literature, and existing manual processes',
            'Identify data sources, calculation methodologies, and integration points',
            'Document requirements and constraints',
        ],
        exitCriteria: 'Requirements are documented, data sources are identified, and the technical approach is understood.',
    },
    {
        number: 3,
        name: 'Architecture',
        tagline: 'Define the project structure, technology choices, and data model.',
        items: [
            'Select the appropriate project structure pattern (Pattern A or B)',
            'Choose framework and libraries from the approved stack',
            'Design the data model, component structure, and key interfaces',
            'Complete the Project Initiation Checklist',
        ],
        exitCriteria: 'Repository is created, project structure is in place, and the technical design is defined.',
    },
    {
        number: 4,
        name: 'Prototype',
        tagline: 'Build core functionality end-to-end. Function over form.',
        items: [
            'Implement core features and calculation logic',
            'Establish the data pipeline (inputs, transformations, outputs)',
            'Get early feedback from the primary stakeholder or project lead',
            'Iterate rapidly \u2014 prioritize function over form',
        ],
        exitCriteria: 'Core feature works end-to-end, key calculations produce correct outputs for known inputs.',
    },
    {
        number: 5,
        name: 'Validation Sprints',
        tagline: 'Expand testing to internal users. Collect structured feedback.',
        items: [
            'Distribute test version to identified testers (Engineering, AE, Marketing, Training)',
            'Collect feedback via GitHub Issues or structured format',
            'Triage feedback: critical (blocks release) vs. enhancement (future version)',
            'Resolve critical issues and conduct additional rounds as needed',
            'Validate calculations against manual references and published standards',
        ],
        exitCriteria: 'All critical issues resolved, stakeholder sign-off obtained, feedback documented.',
    },
    {
        number: 6,
        name: 'Deploy & Sustain',
        tagline: 'Release to production and support ongoing operation.',
        items: [
            'Complete the Pre-Release Checklist',
            'Deploy using the standard release process',
            'Communicate release to stakeholders and support channels',
            'Monitor feedback, track reported issues, and schedule patches as needed',
            'Maintain data updates (price books, bracket databases, reference data)',
        ],
        exitCriteria: 'Deployed to production, support channels are active, ongoing maintenance is planned.',
    },
];

interface StackItem {
    name: string;
    version: string;
    note?: string;
}

interface StackGroup {
    label: string;
    items: StackItem[];
}

const TECH_STACK: StackGroup[] = [
    {
        label: 'Core',
        items: [
            { name: 'React', version: '19.x', note: 'Vortex PB still on 18' },
            { name: 'TypeScript', version: '5.x', note: 'Strict mode required' },
        ],
    },
    {
        label: 'Frameworks',
        items: [
            { name: 'Vite', version: '7.x', note: 'Internal tools' },
            { name: 'Next.js', version: '15.x+', note: 'Web + desktop' },
            { name: 'Electron Forge', version: 'Latest', note: 'Desktop wrapper' },
        ],
    },
    {
        label: 'Styling & Visualization',
        items: [
            { name: 'Tailwind CSS', version: '4.x', note: 'Primary' },
            { name: 'CSS Modules', version: '\u2014', note: 'Alternative' },
            { name: 'Recharts', version: 'Latest', note: 'Data visualization' },
        ],
    },
    {
        label: 'Data & Tooling',
        items: [
            { name: 'Dexie.js', version: '4.x', note: 'IndexedDB' },
            { name: 'ExcelJS', version: '4.4.x', note: 'Excel I/O' },
            { name: 'ESLint', version: 'Latest', note: 'Required for all' },
        ],
    },
];

const COMMIT_TYPES = [
    { label: 'feat', desc: 'New feature' },
    { label: 'fix', desc: 'Bug fix' },
    { label: 'docs', desc: 'Documentation' },
    { label: 'refactor', desc: 'Restructuring' },
    { label: 'test', desc: 'Tests' },
    { label: 'chore', desc: 'Build / deps' },
    { label: 'style', desc: 'CSS / formatting' },
];

const ISSUE_LABELS = [
    { label: 'bug', badgeClass: 'labelBadgeBug', desc: "Something isn't working correctly" },
    { label: 'enhancement', badgeClass: 'labelBadgeEnhancement', desc: 'New feature or improvement' },
    { label: 'calculation', badgeClass: 'labelBadgeCalculation', desc: 'Calculation accuracy or validation issue' },
    { label: 'data-update', badgeClass: 'labelBadgeData', desc: 'Price book, bracket database, or reference data change' },
    { label: 'documentation', badgeClass: 'labelBadgeDocs', desc: 'README, changelog, or user guide update' },
    { label: 'priority: critical', badgeClass: 'labelBadgeCritical', desc: 'Blocks release or affects live users' },
    { label: 'priority: normal', badgeClass: 'labelBadgeNormal', desc: 'Standard backlog item' },
];

const AI_TOOLS = [
    { name: 'Claude Code', use: 'Project audits, large-scale refactors, code generation, debugging, documentation drafting, project scaffolding' },
    { name: 'Claude / ChatGPT', use: 'Bounce around ideas, generate Claude Code prompts, research, feasibility exploration, brainstorming' },
];

const GLOSSARY = [
    { term: 'AE', def: 'Applications Engineering team' },
    { term: 'BOM', def: 'Bill of Materials' },
    { term: 'DAQ', def: 'Data Acquisition' },
    { term: 'D-value', def: 'Measurement used in VicFlex bracket selection calculations' },
    { term: 'FM', def: 'Factory Mutual (FM Global) \u2014 testing and certification standards' },
    { term: 'FTP', def: 'File Transfer Protocol \u2014 used for hosting some externally accessible data' },
    { term: 'LP', def: 'LiquidPlanner \u2014 project management and time tracking tool' },
    { term: 'NFPA', def: 'National Fire Protection Association' },
    { term: 'SemVer', def: 'Semantic Versioning (MAJOR.MINOR.PATCH)' },
    { term: 'UAT', def: 'User Acceptance Testing' },
    { term: 'UL', def: 'Underwriters Laboratories \u2014 testing and certification standards' },
    { term: 'Vortex', def: 'Victaulic Vortex fire suppression product line' },
    { term: 'VicFlex', def: 'Victaulic VicFlex flexible sprinkler connection product line' },
];

const INITIATION_CHECKLIST = [
    'Create Git repository with main as the default branch',
    'Add .gitignore appropriate to the project type',
    'Add README.md using the standard template',
    'Add CHANGELOG.md with initial v0.1.0 entry',
    'Connect to GitHub remote under the appropriate organization',
    'Register project in LiquidPlanner',
    'Identify stakeholders and establish feedback loop expectations',
    'Select Pattern A or Pattern B folder structure based on deployment needs',
];

const PRERELEASE_CHECKLIST = [
    'All known critical bugs resolved',
    'CHANGELOG updated with version and date',
    'Version bumped in package.json',
    'npm run lint passes with no errors',
    'npm run build completes successfully',
    'Manual smoke test of core workflows',
    'Stakeholders notified of upcoming release',
];

/* =========================================================
   COMPONENT
   ========================================================= */

export default function BestPracticesPage() {
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
    const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());
    const [checkedInit, setCheckedInit] = useState<Set<number>>(new Set());
    const [checkedRelease, setCheckedRelease] = useState<Set<number>>(new Set());
    const [mobileTocOpen, setMobileTocOpen] = useState(false);
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

    // Scroll spy
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) {
                    // Pick the one closest to the top
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

    const togglePhase = (n: number) => {
        setExpandedPhases((prev) => {
            const next = new Set(prev);
            next.has(n) ? next.delete(n) : next.add(n);
            return next;
        });
    };

    const toggleCheck = (set: Set<number>, setter: React.Dispatch<React.SetStateAction<Set<number>>>, idx: number) => {
        setter((prev) => {
            const next = new Set(prev);
            next.has(idx) ? next.delete(idx) : next.add(idx);
            return next;
        });
    };

    const appendixStart = SECTIONS.findIndex((s) => s.id.startsWith('appendix'));

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
                    <h1 className={styles.pageTitle}>Software Development Best Practices</h1>
                    <p className={styles.pageSubtitle}>
                        Standardized software development practices for the Fire Suppression Technology Engineering team.
                    </p>
                    <div className={styles.pageMeta}>
                        <span className={styles.metaItem}>Author <span className={styles.metaValue}>Chenla Long, Jr</span></span>
                        <span className={styles.metaItem}>Status <span className={styles.metaValue}>Draft</span></span>
                        <span className={styles.metaItem}>Last Updated <span className={styles.metaValue}>March 2026</span></span>
                    </div>
                </header>

                {/* ---- 1. Project Inventory ---- */}
                <section id="project-inventory" ref={registerSection('project-inventory')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Project Inventory</h2>
                    <p className={styles.sectionIntro}>
                        Current-generation projects representing the team&apos;s active software tools and go-forward technology stack.
                        New projects should follow these standards from inception.
                    </p>
                    <div className={styles.projectGrid}>
                        {PROJECTS.map((p) => (
                            <div key={p.name} className={styles.projectCard}>
                                <h3 className={styles.projectCardName}>{p.name}</h3>
                                <p className={styles.projectCardDesc}>{p.description}</p>
                                <div className={styles.projectCardMeta}>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Stack</span>
                                        <div className={styles.tagGroup}>
                                            {p.stack.map((t) => (
                                                <span key={t} className={styles.tag}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Deploy</span>
                                        <div className={styles.tagGroup}>
                                            <span className={`${styles.tag} ${styles.tagBlue}`}>{p.deployment}</span>
                                        </div>
                                    </div>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Users</span>
                                        <div className={styles.tagGroup}>
                                            <span className={`${styles.tag} ${styles.tagGray}`}>{p.users}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ---- 2. Development Lifecycle ---- */}
                <section id="development-lifecycle" ref={registerSection('development-lifecycle')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Development Lifecycle</h2>
                    <p className={styles.sectionIntro}>
                        All software projects follow a six-phase lifecycle. Each phase has defined objectives and exit criteria
                        that must be met before advancing.
                    </p>
                    <div className={styles.lifecycleContainer}>
                        {LIFECYCLE.map((phase, idx) => {
                            const isOpen = expandedPhases.has(phase.number);
                            const isLast = idx === LIFECYCLE.length - 1;
                            return (
                                <div key={phase.number} className={styles.lifecyclePhase} onClick={() => togglePhase(phase.number)}>
                                    <div className={styles.phaseIndicator}>
                                        <div className={`${styles.phaseNumber} ${isOpen ? styles.phaseNumberActive : ''}`}>
                                            {phase.number}
                                        </div>
                                        {!isLast && (
                                            <div className={`${styles.phaseConnector} ${isOpen ? styles.phaseConnectorActive : ''}`} />
                                        )}
                                    </div>
                                    <div className={styles.phaseContent}>
                                        <h3 className={styles.phaseName}>
                                            {phase.name}
                                            <span className={`${styles.phaseExpandIcon} ${isOpen ? styles.phaseExpandIconOpen : ''}`}>
                                                &#9660;
                                            </span>
                                        </h3>
                                        <p className={styles.phaseTagline}>{phase.tagline}</p>
                                        <div className={`${styles.phaseDetails} ${isOpen ? styles.phaseDetailsOpen : ''}`}>
                                            <ul className={styles.phaseDetailList}>
                                                {phase.items.map((item, i) => (
                                                    <li key={i} className={styles.phaseDetailItem}>{item}</li>
                                                ))}
                                            </ul>
                                            <div className={styles.exitCriteria}>
                                                <div className={styles.exitLabel}>Exit Criteria</div>
                                                <p className={styles.exitText}>{phase.exitCriteria}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ---- 3. Project Structure ---- */}
                <section id="project-structure" ref={registerSection('project-structure')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Project Structure</h2>
                    <p className={styles.sectionIntro}>
                        Two project structure patterns are in use, determined by whether the project serves external or internal users.
                    </p>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Pattern A &mdash; Development/Release Split</h3>
                        <p className={styles.bodyText}>
                            Use for projects with <strong>external users</strong> (customers, sales, customer care)
                            where versioned release history matters and deployment targets a separate hosting repo.
                        </p>
                        <pre className={styles.directoryTree}>{`ProjectName/
├── Development/
│   └── app-name/               `}<span className={styles.treeComment}># Git repo, source code</span>{`
│       ├── src/ or app/
│       ├── tools/release.ts    `}<span className={styles.treeComment}># Automated release script</span>{`
│       ├── .github/workflows/
│       ├── package.json
│       ├── README.md
│       └── CHANGELOG.md
├── Release/
│   └── GitHub/                 `}<span className={styles.treeComment}># Git repo, built artifacts</span>{`
│       ├── latest/
│       └── history/v{X.Y.Z}/
└── Documentation/              `}<span className={styles.treeComment}># (optional)</span></pre>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Used By</div>
                            <p className={styles.calloutText}>Vortex Project Builder, VicFlex Bracket Filter, SprayTrace</p>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Pattern B &mdash; Standalone Repo</h3>
                        <p className={styles.bodyText}>
                            Use for <strong>internal tools</strong> where CI/CD handles deployment directly (no separate release repo needed).
                        </p>
                        <pre className={styles.directoryTree}>{`project-name/
├── .git/
├── .github/workflows/deploy.yml
├── src/ or app/
├── public/
├── package.json
├── README.md
├── CHANGELOG.md
└── [build output excluded via .gitignore]`}</pre>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Used By</div>
                            <p className={styles.calloutText}>Resource Dashboard</p>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Decision Criteria</h3>
                        <table className={styles.decisionTable}>
                            <thead>
                                <tr>
                                    <th>Criteria</th>
                                    <th>Pattern A</th>
                                    <th>Pattern B</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Users</td><td>External (customers, sales)</td><td>Internal (engineering)</td></tr>
                                <tr><td>Release History</td><td>Versioned archive required</td><td>CI/CD deploys on push</td></tr>
                                <tr><td>Release Automation</td><td>tools/release.ts script</td><td>GitHub Actions only</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ---- 4. Technology Stack ---- */}
                <section id="technology-stack" ref={registerSection('technology-stack')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Technology Stack</h2>
                    <p className={styles.sectionIntro}>
                        Approved technologies and version policies for all new and existing projects.
                    </p>

                    {TECH_STACK.map((group) => (
                        <div key={group.label} className={styles.stackGroup}>
                            <h3 className={styles.stackGroupLabel}>{group.label}</h3>
                            <div className={styles.stackGrid}>
                                {group.items.map((item) => (
                                    <div key={item.name} className={styles.stackItem}>
                                        <div>
                                            <span className={styles.stackName}>{item.name}</span>
                                            {item.note && <span className={styles.stackNote}>{item.note}</span>}
                                        </div>
                                        <span className={styles.stackVersion}>{item.version}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Framework Selection</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Vite</strong> &mdash; internal tools, single-page apps, no SSR/SSG needed, simpler build</li>
                            <li className={styles.bulletItem}><strong>Next.js</strong> &mdash; customer-facing tools needing Electron desktop distribution or static export with complex routing</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Dependency Management</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>Always commit <code>package-lock.json</code></li>
                            <li className={styles.bulletItem}>Use caret (<code>^</code>) for minor version flexibility with lockfile for reproducibility</li>
                            <li className={styles.bulletItem}>Run <code>npm audit</code> before every release and at least monthly</li>
                            <li className={styles.bulletItem}>Review and update dependencies quarterly; prioritize security patches</li>
                            <li className={styles.bulletItem}>Before adding a library &mdash; is it actively maintained? Does it duplicate something we already use?</li>
                        </ul>
                    </div>
                </section>

                {/* ---- 5. Version Control ---- */}
                <section id="version-control" ref={registerSection('version-control')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Version Control</h2>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Git Configuration</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Default branch:</strong> <code>main</code> (all repos)</li>
                            <li className={styles.bulletItem}><strong>Remote:</strong> GitHub, under the appropriate Victaulic organization</li>
                            <li className={styles.bulletItem}><strong>Branch protection:</strong> Enable for <code>main</code> on collaborative repos</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Commit Conventions</h3>
                        <p className={styles.bodyText}>All current-generation projects use Conventional Commits format:</p>
                        <div className={styles.codeBlock}>
                            <span className={styles.codeKeyword}>{'<type>'}</span>{': <short description>\n\n[optional body]\n[optional footer]'}
                        </div>
                        <div className={styles.commitTypeGrid}>
                            {COMMIT_TYPES.map((ct) => (
                                <div key={ct.label} className={styles.commitType}>
                                    <span className={styles.commitTypeLabel}>{ct.label}</span>
                                    <span className={styles.commitTypeDesc}>{ct.desc}</span>
                                </div>
                            ))}
                        </div>
                        <div className={`${styles.callout} ${styles.calloutBlue}`}>
                            <div className={styles.calloutLabel}>Guidelines</div>
                            <p className={styles.calloutText}>
                                Imperative mood, lowercase, no period, under 72 characters.
                                One logical change per commit. Reference GitHub Issue numbers in the footer when applicable.
                            </p>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Changelog Format</h3>
                        <p className={styles.bodyText}>All projects maintain a CHANGELOG.md following Keep a Changelog format:</p>
                        <div className={styles.codeBlock}>
{`## [2.2.0] - 2026-03-15
### Added
- Multi-zone system support for large-scale projects

### Fixed
- Pricing calculation for stainless steel nozzles

### Changed
- Consolidated engineered and pre-engineered configurators`}
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>.gitignore (Minimum)</h3>
                        <div className={styles.codeBlock}>
{`node_modules/
.next/
out/
dist/
build/
.env
.env.*
.env.local
.vscode/
.idea/
.DS_Store
Thumbs.db`}
                        </div>
                    </div>
                </section>

                {/* ---- 6. Release & Deployment ---- */}
                <section id="release-deployment" ref={registerSection('release-deployment')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Release &amp; Deployment</h2>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Deployment Environments</h3>
                        <table className={styles.decisionTable}>
                            <thead>
                                <tr><th>Environment</th><th>Purpose</th><th>Access</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Local Development</td><td>Active development, feature work</td><td>Developer</td></tr>
                                <tr><td>DEV / Staging</td><td>Internal testing, stakeholder review</td><td>Engineering, AE, testers</td></tr>
                                <tr><td>Production</td><td>Live for end users</td><td>Public (web) or distributed (desktop)</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Automated Release (Pattern A)</h3>
                        <p className={styles.bodyText}>The <code>tools/release.ts</code> pattern is the standard release workflow:</p>
                        <ol className={styles.bulletList}>
                            <li className={styles.bulletItem}>Developer runs the release script from the development repo</li>
                            <li className={styles.bulletItem}>Script checks for uncommitted changes</li>
                            <li className={styles.bulletItem}>Reads version from <code>package.json</code> and validates against release history</li>
                            <li className={styles.bulletItem}>Runs <code>npm run build</code></li>
                            <li className={styles.bulletItem}>Copies build to <code>Release/latest/</code> and <code>Release/history/v&#123;version&#125;/</code></li>
                            <li className={styles.bulletItem}>Creates git tag, commits, and pushes both repos</li>
                            <li className={styles.bulletItem}>GitHub Actions triggers Pages deployment on push</li>
                        </ol>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>CI/CD Release (Pattern B)</h3>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>Developer pushes to <code>main</code></li>
                            <li className={styles.bulletItem}>GitHub Actions workflow (<code>deploy.yml</code>) triggers build and deploy to GitHub Pages</li>
                            <li className={styles.bulletItem}><code>main</code> must always be in a deployable state</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Rollback</h3>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Web Apps</div>
                            <p className={styles.calloutText}>
                                Release repos maintain <code>history/v&#123;version&#125;/</code> directories.
                                Copy the previous version to <code>latest/</code>, commit, and push.
                            </p>
                        </div>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Desktop Apps</div>
                            <p className={styles.calloutText}>
                                Retain previous ZIP distributions. Redistribute the prior version&apos;s ZIP to affected users.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---- 7. Documentation Standards ---- */}
                <section id="documentation-standards" ref={registerSection('documentation-standards')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Documentation Standards</h2>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Required Documentation</h3>
                        <table className={styles.decisionTable}>
                            <thead>
                                <tr><th>Document</th><th>Required For</th><th>Format</th></tr>
                            </thead>
                            <tbody>
                                <tr><td><code>README.md</code></td><td>All projects</td><td>Standard template</td></tr>
                                <tr><td><code>CHANGELOG.md</code></td><td>All versioned projects</td><td>Keep a Changelog</td></tr>
                                <tr><td>Code comments</td><td>Calculation functions, business logic, constants</td><td>Inline</td></tr>
                                <tr><td>Engineering disclaimer</td><td>All user-facing tools</td><td>In README and/or app UI</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Code Documentation</h3>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Required</div>
                            <p className={styles.calloutText}>
                                Calculation functions (formula, source, units) &bull;
                                Business logic (explain why, not what) &bull;
                                Constants and magic numbers (named and sourced) &bull;
                                Module-level purpose comment for major files
                            </p>
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Architecture Documentation</h3>
                        <p className={styles.bodyText}>
                            For complex projects (Vortex Project Builder, Resource Dashboard), maintain an <code>ARCHITECTURE.md</code> covering:
                            high-level component diagram, data flow, key design decisions, and calculation methodology.
                        </p>
                    </div>
                </section>

                {/* ---- 8. Issue Tracking ---- */}
                <section id="issue-tracking" ref={registerSection('issue-tracking')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Issue Tracking &amp; Feedback</h2>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Change Request Workflow</h3>
                        <p className={styles.bodyText}>
                            All change requests and feature suggestions flow through a structured review and prioritization process
                            before implementation begins.
                        </p>
                        <ol className={styles.bulletList}>
                            <li className={styles.bulletItem}>Intake request or suggestion from stakeholders</li>
                            <li className={styles.bulletItem}>Review with manager and product managers</li>
                            <li className={styles.bulletItem}>Categorize the change (feature, bug fix, data update, enhancement)</li>
                            <li className={styles.bulletItem}>Prioritize based on impact of change</li>
                            <li className={styles.bulletItem}>Assign to a version number</li>
                            <li className={styles.bulletItem}>Communicate timeline of implementation to stakeholders</li>
                            <li className={styles.bulletItem}>Document in CHANGELOG upon completion</li>
                            <li className={styles.bulletItem}>Reference in GitHub commit</li>
                        </ol>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Change Categories</h3>
                        <div className={styles.labelGrid}>
                            {ISSUE_LABELS.map((l) => (
                                <div key={l.label} className={styles.labelItem}>
                                    <span className={`${styles.labelBadge} ${styles[l.badgeClass]}`}>{l.label}</span>
                                    <span className={styles.labelDesc}>{l.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Request Lifecycle</h3>
                        <div className={styles.codeBlock}>
                            {'Intake  \u2192  Review  \u2192  Categorize  \u2192  Prioritize  \u2192  Assign Version  \u2192  Implement  \u2192  Document'}
                        </div>
                    </div>
                </section>

                {/* ---- 9. AI-Assisted Development ---- */}
                <section id="ai-development" ref={registerSection('ai-development')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>9. AI-Assisted Development</h2>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Approved Tools</h3>
                        <div className={styles.aiToolGrid}>
                            {AI_TOOLS.map((tool) => (
                                <div key={tool.name} className={styles.aiToolItem}>
                                    <span className={styles.aiToolName}>{tool.name}</span>
                                    <span className={styles.aiToolUse}>{tool.use}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Usage Guidelines</h3>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Code Quality</div>
                            <p className={styles.calloutText}>
                                AI-generated code must meet the same quality bar as hand-written code.
                                The developer is responsible for understanding, reviewing, and testing all AI-generated code before committing.
                            </p>
                        </div>
                        <div className={styles.callout}>
                            <div className={styles.calloutLabel}>Data Sensitivity</div>
                            <p className={styles.calloutText}>
                                Do not share proprietary Victaulic data (customer information, pricing formulas, unreleased product specifications)
                                with external AI tools unless approved. Internal project code and architecture can be shared for development assistance.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---- Appendix A: Glossary ---- */}
                <section id="appendix-glossary" ref={registerSection('appendix-glossary')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Appendix A: Glossary</h2>
                    <div className={styles.glossaryGrid}>
                        {GLOSSARY.map((g) => (
                            <div key={g.term} className={styles.glossaryItem}>
                                <span className={styles.glossaryTerm}>{g.term}</span>
                                <span className={styles.glossaryDef}>{g.def}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ---- Appendix B: Project Initiation Checklist ---- */}
                <section id="appendix-initiation" ref={registerSection('appendix-initiation')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Appendix B: Project Initiation Checklist</h2>
                    <p className={styles.sectionIntro}>Complete before writing application code:</p>
                    <ul className={styles.checklist}>
                        {INITIATION_CHECKLIST.map((item, i) => (
                            <li
                                key={i}
                                className={styles.checklistItem}
                                onClick={() => toggleCheck(checkedInit, setCheckedInit, i)}
                            >
                                <span className={`${styles.checkbox} ${checkedInit.has(i) ? styles.checkboxChecked : ''}`}>
                                    {checkedInit.has(i) ? '\u2713' : ''}
                                </span>
                                <span className={`${styles.checklistText} ${checkedInit.has(i) ? styles.checklistTextChecked : ''}`}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* ---- Appendix C: Pre-Release Checklist ---- */}
                <section id="appendix-prerelease" ref={registerSection('appendix-prerelease')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Appendix C: Pre-Release Checklist</h2>
                    <p className={styles.sectionIntro}>Complete before any production release:</p>
                    <ul className={styles.checklist}>
                        {PRERELEASE_CHECKLIST.map((item, i) => (
                            <li
                                key={i}
                                className={styles.checklistItem}
                                onClick={() => toggleCheck(checkedRelease, setCheckedRelease, i)}
                            >
                                <span className={`${styles.checkbox} ${checkedRelease.has(i) ? styles.checkboxChecked : ''}`}>
                                    {checkedRelease.has(i) ? '\u2713' : ''}
                                </span>
                                <span className={`${styles.checklistText} ${checkedRelease.has(i) ? styles.checklistTextChecked : ''}`}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* ---- Appendix D: README Template ---- */}
                <section id="appendix-readme" ref={registerSection('appendix-readme')} className={styles.section}>
                    <h2 className={styles.sectionTitle}>Appendix D: README Template</h2>
                    <div className={styles.readmePreview}>
                        <h3># Project Name</h3>
                        <p>Brief description of what the project does and who it&apos;s for.</p>

                        <h4>## Features</h4>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>Feature 1</li>
                            <li className={styles.bulletItem}>Feature 2</li>
                        </ul>

                        <h4>## Technology Stack</h4>
                        <table className={styles.decisionTable}>
                            <thead><tr><th>Technology</th><th>Version</th><th>Purpose</th></tr></thead>
                            <tbody>
                                <tr><td>React</td><td>19.x</td><td>UI framework</td></tr>
                                <tr><td>Vite</td><td>7.x</td><td>Build tool</td></tr>
                            </tbody>
                        </table>

                        <h4>## Getting Started</h4>
                        <div className={styles.codeBlock}>
{`npm install          `}<span className={styles.codeComment}># Install dependencies</span>{`
npm run dev           `}<span className={styles.codeComment}># Start development server</span>{`
npm run build         `}<span className={styles.codeComment}># Production build</span>
                        </div>

                        <h4>## Repository</h4>
                        <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}><strong>Version:</strong> X.Y.Z</li>
                            <li className={styles.bulletItem}><strong>License:</strong> Proprietary &mdash; Victaulic Company</li>
                            <li className={styles.bulletItem}><strong>Maintainer:</strong> Chenla Long Jr</li>
                        </ul>

                        <h4>## Disclaimer</h4>
                        <p>
                            This tool is developed for use by qualified Victaulic engineers and authorized personnel.
                            All calculations and outputs should be verified against applicable standards and codes.
                        </p>
                    </div>
                </section>
            </main>

            {/* TOC Sidebar */}
            <aside className={styles.tocSidebar}>
                <h3 className={styles.tocHeader}>Contents</h3>
                <ul className={styles.tocList}>
                    {SECTIONS.map((s, i) => (
                        <li key={s.id}>
                            {i === appendixStart && <div className={styles.tocDivider} />}
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

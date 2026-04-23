  Create a new documentation page in FS3 for the Personal Vault guide. The source content is a markdown file — read   it in full first, then build the page from it.

  ## Source content

  Read the markdown file at:
  C:\Users\Admin\Documents\Online-Sync\Victaulic\Projects\_VAULT\wiki\analyses\personal-vault-guide.md

  This is the full guide content. Use it to populate the page — all 9 sections with real content, not placeholders.

  ## Starter CLAUDE.md file

  Copy C:\Users\Admin\Documents\Online-Sync\Victaulic\Projects\_VAULT\raw\assets\starter-claude-md.md into the FS3
  project's public directory at public/downloads/starter-claude-md.md so it can be referenced and downloaded from
  the documentation page. Create the public/downloads/ directory if needed.

  ## Page pattern

  Follow the exact same component pattern used by app/documentation/tutorial-fire-vault/page.tsx:
  - 'use client' directive
  - SECTIONS array with { id, label } entries
  - IntersectionObserver scroll-spy for active section tracking
  - registerSection callback ref pattern
  - scrollTo function for TOC clicks
  - Mobile TOC toggle (hamburger dropdown)
  - Desktop sidebar TOC (sticky, right column)
  - Page header with title, subtitle, author/status/date meta row
  - Each section: <section id={id} ref={registerSection(id)} className={styles.section}>
  - CSS Module at app/documentation/guide-personal-vault/guide-personal-vault.module.css

  Copy the CSS module from tutorial-fire-vault.module.css as your base — same dark theme, same layout grid, same
  typography. Update the comment header.

  ## Page metadata

  - Title: "Guide: Personal Vault"
  - Subtitle: "Build a personal knowledge management system with Obsidian and Claude Code. How it works, why it
  works, and how to make it your own."
  - Author: Chenla Long, Jr
  - Status: Draft
  - Last Updated: April 2026

  ## Sections

  Use these 9 sections from the markdown source:

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

  Implement the FULL content from the markdown source for each section. Convert the markdown into JSX — use the
  existing CSS module classes for styling (sectionTitle, subsectionTitle, bulletList, bulletItem, sectionIntro,
  codeBlock, etc). For code blocks, use <pre> and <code> tags with appropriate styling. For blockquotes, use a
  styled div. For tables, use styled HTML tables.

  In the "Building Your Own" section, add a download button/link for the starter CLAUDE.md file that points to
  /downloads/starter-claude-md.md. Style it consistently with the page theme.

  ## Documentation hub update

  Add a card to app/documentation/page.tsx in the cardGrid div, after the Fire Vault card:

  <Link href="/documentation/guide-personal-vault" className={styles.card}>
      <div className={styles.cardLabelRow}>
          <span className={styles.cardAccent} style={{ background: '#a78bfa' }} />
          <span className={styles.cardLabel} style={{ color: '#a78bfa' }}>Guide</span>
      </div>
      <h2 className={styles.cardTitle}>Personal Vault</h2>
      <p className={styles.cardDesc}>Build a personal knowledge system with Obsidian and Claude Code.</p>
      <span className={styles.cardAffordance}>Read ›</span>
  </Link>

  ## Verify

  After creating all files, run npm run build to confirm the app compiles with zero errors. Fix any issues.

# Personal Vault — LLM Operating Manual

> This file is the operating manual for the LLM agent (Claude Code).
> It defines the vault's structure, conventions, and workflows.
> The human and the LLM co-evolve this document over time.
>
> **First time?** Say `initialize` to begin setup.

---

## 0. Initialize

**Trigger:** Human says "initialize" in a new vault that has only this CLAUDE.md file.

This workflow interviews the human, learns their role and projects, then scaffolds the entire vault and rewrites this CLAUDE.md with a personalized schema. Run this once. After initialization, this section can be removed or kept for reference.

### Interview

Conduct a conversational interview. Be natural, not robotic. Ask one topic at a time and let the human respond before moving on. Probe for specifics — names, paths, tools, pain points. The goal is to understand enough to generate a personalized vault.

**Topic 1 — Who are you?**
- What's your role and title?
- What team or department are you on?
- What's your primary domain? (engineering, research, management, design, etc.)
- How long have you been in this role?

**Topic 2 — What do you work on?**
- What projects are you actively working on right now? For each:
  - Project name
  - One-line description
  - Where is the source code on your machine? (full path)
  - Current version if applicable
  - Who else is involved?
- Are there projects that are paused or on the back burner?

**Topic 3 — What does your day look like?**
- Walk me through a typical day. When do you start? What do you do first?
- How many meetings per day/week on average?
- Do you have recurring meetings? (standups, weeklies, 1:1s)
- When do you do your best focused work?
- Do you work from home, office, or hybrid?

**Topic 4 — What tools do you use?**
- Version control? (Git, GitHub, GitLab, etc.)
- Project management? (Jira, Linear, Asana, Monday.com, LiquidPlanner, etc.)
- Communication? (Slack, Teams, email, etc.)
- IDE? (VS Code, JetBrains, etc.)
- Any domain-specific tools or databases?

**Topic 5 — What are your pain points?**
- What falls through the cracks in your current workflow?
- Where do you lose track of things? (action items from meetings, decisions that were made but not recorded, tasks that go stale)
- What do you wish you had better visibility into?
- Have you tried other knowledge management systems before? What worked and what didn't?

**Topic 6 — Domain language**
- What terminology is specific to your work that I should know?
- Any acronyms, internal names, or jargon I'll encounter in your journal entries?

**Topic 7 — Who do you work with?**
- Who are the key people you interact with regularly? (name, role, how you work together)
- Who's your manager/sponsor?
- Any direct reports?

**Topic 8 — How do you want to start?**
Present the three adoption levels and let them choose:

- **Minimal** — Journal + CLAUDE.md + morning prompts + briefing. Just write a morning plan and end-of-day notes. Claude processes them. Good for trying it out. (~5 min/day)
- **Standard** — Minimal + project status files + meeting processing + decision records + changelogs. Your projects are tracked, meetings are processed, decisions are recorded. (~5-10 min/day)
- **Full** — Standard + wiki (entities, concepts, sources, analyses) + codebase sync with checkpoints + ingest workflow + lint health checks. The complete knowledge system. (~10 min/day writing + occasional syncs)

### Scaffold

After the interview, present a summary of what you learned and what you're about to create:

```
## Proposed vault setup

**Owner:** [name] — [role] at [organization]
**Domain:** [their domain]
**Adoption level:** [Minimal / Standard / Full]

**Projects to scaffold:**
- [project-name] — [description] — [path]
- ...

**Directory structure:**
[show the tree that will be created]

**CLAUDE.md sections to generate:**
- Architecture (customized to their adoption level)
- Page Formats (only the types they need)
- Naming Conventions
- Workflows (only the workflows for their level)
- Cross-referencing Rules (if Standard+)
- Index Conventions
- Log Conventions
- Ops Conventions
- Interaction Protocol
- Domain Context (populated from interview)
- Evolution (v1.0)

Approve? (y / edit / reject)
```

On approval, execute the following in order:

1. **Create directory structure.** Based on adoption level:
   - Minimal: `journal/`, `ops/`
   - Standard: add `projects/<slug>/` (with `decisions/`, `changelog/`, `meetings/` per project)
   - Full: add `raw/`, `raw/assets/`, `wiki/entities/`, `wiki/concepts/`, `wiki/sources/`, `wiki/analyses/`

2. **Rewrite this CLAUDE.md.** Replace everything from Section 1 onward with the personalized schema generated from the interview. Keep the header and Section 0 (or remove Section 0 if they prefer a clean file). Use the full schema structure defined below as the template, but only include sections and page types relevant to their adoption level.

3. **Create `index.md`.** Populated with their project list and empty table sections appropriate to their adoption level.

4. **Create `log.md`.** With the bootstrap entry:
   ```
   ## [YYYY-MM-DD] bootstrap | Vault initialized
   Vault created via INITIALIZE workflow. [adoption level] adoption.
   Projects: [list]
   ```

5. **Create today's journal entry.** `journal/YYYY-MM-DD.md` with the standard template.

6. **Create `ops/prompts.md`.** First morning prompts based on their projects and what they told you about current priorities.

7. **Create `ops/briefing.md`.** Initial briefing with their projects listed (status: pending audit).

8. **For each project (Standard+ only):** Create `projects/<slug>/status.md` with a skeleton populated from what they told you. Mark as "pending audit" — they'll run a full audit from inside each project directory to populate the details.

9. **Output getting-started instructions:**

```
## You're set up. Here's how to get started.

### Right now
1. Open this vault folder in Obsidian (or your preferred markdown viewer).
2. Open your journal for today: `journal/YYYY-MM-DD.md`
3. Write your morning plan in the "Morning — what's the plan?" section.
   Just write naturally — what are you working on, what meetings do you have, what's on your mind.
4. Come back here and say: `checkin morning`
   Claude Code will process your journal, update your project files, and generate your first briefing.

### For each project (do this when you have time)
Open Claude Code from inside your project's source directory and say:
"Audit this codebase and generate a status.md and checkpoints.md file for my vault at [vault-path]/projects/[slug]/"

This populates your project files with real data — version, stack, architecture, key files, active tasks.

### Daily rhythm
- **Morning:** Open journal, write your plan, run `checkin morning`
- **Midday (optional):** Add notes to midday section, run `checkin midday`
- **End of day:** Write what happened, run `checkin eod`
- **After meetings:** Run `checkin meeting [name]`

### Tips
- Write fast, don't think about format. Claude Code extracts the structure.
- The morning prompts (`ops/prompts.md`) are your best friend after day 2.
- If something feels wrong, update CLAUDE.md. The schema is meant to evolve.
- Say `lint` anytime to health-check the vault.
```

---

## 1. Architecture

```
Vault/
├── CLAUDE.md              # This file — the schema (LLM operating manual)
├── index.md               # Content catalog — every page listed
├── log.md                 # Chronological activity log (append-only)
├── raw/                   # Immutable source documents (human-curated)
│   └── assets/            # Images, PDFs, attachments
├── wiki/                  # LLM-generated knowledge pages (LLM owns)
│   ├── entities/          # People, organizations, places, products
│   ├── concepts/          # Ideas, frameworks, methodologies, terms
│   ├── sources/           # One summary page per ingested source
│   └── analyses/          # Query results, comparisons, syntheses
├── projects/              # One folder per active project
│   └── <project-slug>/
│       ├── status.md      # Living state — version, open items, blockers
│       ├── checkpoints.md # Structural contracts for codebase audit
│       ├── decisions/     # One file per significant design decision
│       ├── changelog/     # Daily entries from sync workflow
│       └── meetings/      # Meeting notes — human writes, LLM processes
├── journal/               # Daily work journal (human voice)
│   └── YYYY-MM-DD.md
└── ops/                   # Operational outputs (regenerated each check-in)
    ├── briefing.md        # Current cross-project status
    └── prompts.md         # Today's personalized check-in questions
```

> **Note:** Minimal adoption uses only `journal/` and `ops/`. Standard adds `projects/`. Full adds `raw/` and `wiki/`. The INITIALIZE workflow creates only the directories you need.

### Layer ownership rules

| Layer | Owner | Rule |
|-------|-------|------|
| `raw/` | Human | **Immutable** — the LLM reads but never modifies |
| `wiki/` | LLM | **LLM-owned** — creates, updates, maintains |
| `projects/*/status.md` | LLM | **Updated** from journal entries, sync results, and audits |
| `projects/*/checkpoints.md` | Both | **Co-evolved** — LLM generates from audits, human reviews |
| `projects/*/decisions/` | Both | **Human writes or approves** — LLM files, formats, flags candidates |
| `projects/*/changelog/` | LLM | **LLM-generated** from git diffs, sync results, and journal processing |
| `projects/*/meetings/` | Both | **Human writes notes above separator** — LLM processes below |
| `journal/` | Human | **Human voice preserved verbatim** — LLM only appends below separator |
| `ops/` | LLM | **Regenerated** — always derived, never manually edited |
| `CLAUDE.md` | Both | **Co-evolved** |
| `index.md` | LLM | **Updated** on every ingest, project change, and page creation |
| `log.md` | LLM | **Append-only** — never edit past entries |

---

## 2. Page Formats

### 2.1 Frontmatter (required on every page)

```yaml
---
title: "Page Title"
type: entity | concept | source | analysis | project-status | decision | changelog | checkpoints | journal | meeting
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: ["[[raw/source-file]]"]
tags: [tag1, tag2]
---
```

### 2.2 Journal entries (`journal/`)

```markdown
---
title: "YYYY-MM-DD Journal"
type: journal
created: YYYY-MM-DD
tags: [journal]
---

# YYYY-MM-DD

## Morning — what's the plan?
(Human writes freely)

## Midday — notes
(Optional)

## End of day — what happened?
(Human writes freely)

---
<!-- LLM PROCESSING — do not edit above this line -->

## Extracted updates

### Project Name
- **Completed:** task
- **Still open:** task (blocker)
- **New insight:** observation

## Task movements
- `task` → moved to **recently completed** on [[projects/slug/status]]

## Flagged for decision log
- Topic — file as decision? (awaiting human confirmation)
```

### 2.3 Project status pages (`projects/<slug>/status.md`)

```markdown
---
title: "Project Name"
type: project-status
created: YYYY-MM-DD
updated: YYYY-MM-DD
version: "x.y.z"
repo: "path or URL"
tags: [project, active|paused|deployed, domain-tags]
---

# Project Name

One-line description.

## Current version
x.y.z — what this version represents

## Stack
- Technologies and versions

## Active tasks
- [ ] Task — context or file where found

## Blocked
- [ ] Task — **blocked on:** reason

## Recently completed
- [x] Task — completed YYYY-MM-DD

## Architecture notes
Entry point, components, data flow, deployment. Paragraph form.

## Key files
- `path/to/file` — what and why

## Key people
- Name — role

## Related wiki pages
- Links as content is ingested
```

### 2.4 Meeting notes (`projects/<slug>/meetings/`)

```markdown
---
title: "Meeting Title"
type: meeting
created: YYYY-MM-DD
project: project-slug
related-projects: [other-slug]
attendees: [Name1, Name2]
tags: [meeting, topic-tags]
---

# Meeting Title

**Date:** YYYY-MM-DD HH:MM
**Attendees:** Name1, Name2

## Agenda
- Item pre-populated from journal context

## Notes
(Human writes freely here)

---
<!-- LLM PROCESSING — do not edit above this line -->

## Decisions
- Decision — context and rationale

## Action items
- [ ] Task — owner — target date
  → Routed to [[projects/slug/status]] active tasks

## Key information
- Insight or fact learned

## Follow-ups
- Topic — who — by when
```

**Meeting rules:**
- Templates are generated during morning check-in when the journal mentions meetings.
- Agenda items are pre-populated from journal context.
- Human writes notes above the separator during or after the meeting.
- During midday/EOD check-in, unprocessed meeting notes are processed.
- Action items are routed to the correct project status files.
- Significant decisions are flagged as candidates for `decisions/` records.
- Multi-project meetings live in the primary project's `meetings/` folder. Use `related-projects` frontmatter to cross-link.

### 2.5 Decision records (`projects/<slug>/decisions/`)

```markdown
---
title: "Decision Title"
type: decision
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: accepted | superseded | reconsidering
tags: [decision, category]
---

# Decision: Short Title

**Date:** YYYY-MM-DD
**Status:** accepted

## Context
What prompted this.

## Decision
What was decided.

## Rationale
Why this over alternatives.

## Alternatives considered
- A — why rejected

## Consequences
What this means going forward.
```

### 2.6 Changelog entries (`projects/<slug>/changelog/`)

```markdown
---
title: "YYYY-MM-DD Changelog"
type: changelog
created: YYYY-MM-DD
tags: [changelog]
---

# YYYY-MM-DD

## Changes
- Semantic description of what changed

## Files touched
- `path/to/file` — what changed

## Source
- git commits: short hashes
- journal entry: [[journal/YYYY-MM-DD]]
```

### 2.7 Checkpoint files (`projects/<slug>/checkpoints.md`)

```markdown
---
title: "Project Name — Checkpoints"
type: checkpoints
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [project, audit, project-slug]
---

# Project Name — Structural Checkpoints

> Assertions validated during SYNC. Updated when architecture changes intentionally.
> Last audited: YYYY-MM-DD

## File structure
- `exact/path/to/file.ext` — what / why

## Dependencies
- `package@x.y.z` — purpose

## Schema / data model
- Store: `name` — fields: `field1`, `field2`

## Routes / views
- `/route` — `ComponentName` — what it renders

## Key functions / exports
- `func(params)` → `returnShape` — purpose — from `path`

## Configuration
- `file` — `setting` = `value` — why

## Scripts
- `npm run x` — what it does

## TODOs and known issues
- `file:line` — text
```

**Checkpoint rules:** Every assertion must be specific and mechanically verifiable. Actual paths, actual names, actual signatures. Not "components exist" but "`src/components/Form.jsx` exists — default export, renders the order form."

### 2.8 Source summary pages (`wiki/sources/`) — Full adoption

```markdown
---
title: "Source Title"
type: source
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: ["[[raw/original-file]]"]
tags: [domain-tags]
---

# Source Title

**Original:** [[raw/original-file]]
**Date:** publication or clip date
**Author:** if known

## Key takeaways
- Bullet list of main points

## Detailed summary
Prose summary.

## Entities mentioned
- [[wiki/entities/entity-name]] — context

## Concepts referenced
- [[wiki/concepts/concept-name]] — context

## Contradictions or tensions
- Anything conflicting with existing wiki pages

## Open questions
- Questions worth investigating
```

### 2.9 Entity pages (`wiki/entities/`) — Full adoption

```markdown
---
title: "Entity Name"
type: entity
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: ["[[raw/source1]]"]
tags: [person, org, place, product, etc.]
---

# Entity Name

Brief description.

## Key facts
- Bullet list

## Mentions
- [[wiki/sources/source-title]] — context

## Related
- Links to related entity, concept, and project pages
```

### 2.10 Concept pages (`wiki/concepts/`) — Full adoption

```markdown
---
title: "Concept Name"
type: concept
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: ["[[raw/source1]]"]
tags: [domain-tags]
---

# Concept Name

Definition and explanation.

## Key points
- Bullet list

## Sources
- [[wiki/sources/source-title]] — contribution to this concept

## Related concepts
- Links

## Open questions
- Uncertainties or debates
```

### 2.11 Analysis pages (`wiki/analyses/`) — Full adoption

```markdown
---
title: "Analysis Title"
type: analysis
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: ["pages referenced"]
tags: [analysis-type]
---

# Analysis Title

**Question:** The prompt that generated this.

## Findings
Answer.

## Pages referenced
- Links

## Methodology
How conducted (optional).
```

---

## 3. Naming Conventions

- **Files:** lowercase, hyphens. `wiki/concepts/k-factor.md`
- **Project folders:** lowercase, hyphens. `projects/my-project/`
- **Journal:** ISO date. `journal/2026-04-09.md`
- **Changelog:** ISO date. `projects/slug/changelog/2026-04-09.md`
- **Decisions:** sequential number + slug. `decisions/001-use-indexeddb.md`
- **Meetings:** ISO date + topic slug. `projects/slug/meetings/2026-04-10-sprint-review.md`
- **Wikilinks:** always `[[path/file-name]]` format
- **Tags:** lowercase, hyphenated
- **Dates:** ISO 8601 (YYYY-MM-DD)

---

## 4. Workflows

### 4.1 CHECKIN — Flexible check-in system

**Trigger:** Human says "checkin [type]" — where type is `morning`, `midday`, `eod`, or `meeting [name]`.

Any check-in type can be triggered at any time. The human decides when to check in and what to check in.

**Day-of-week awareness:** At the start of every check-in, determine the current day of the week from the date. Reference it in processing. This ensures weekend-skip logic and next-workday calculations are correct.

---

#### `checkin morning`

1. Read previous journal and all active project status files.
2. Generate `ops/prompts.md` — personalized questions per project referencing yesterday's intentions, stale blocked items, inactive items.
3. Human writes in journal (morning section).
4. Process below separator: extract task updates, update project status files, flag decision candidates.
5. **Generate meeting templates:** Scan journal for mentioned meetings. For each, create a template in `projects/<slug>/meetings/` with agenda pre-populated from journal context.
6. Regenerate `ops/briefing.md`.
7. Append to `log.md`.

#### `checkin midday`

1. Human writes in journal (midday section).
2. Process below separator: extract task updates, new information, bug reports, or requests.
3. Update project status files with any new tasks or information.
4. Regenerate `ops/briefing.md`.
5. Append to `log.md`.

#### `checkin eod`

1. Human writes in journal (end-of-day section).
2. Process below separator: compare morning plan vs. actual, archive completed tasks.
3. **Sweep unprocessed meetings:** Scan `projects/*/meetings/` for files with human content above separator but no LLM processing below. Process any missed.
4. Generate changelog entries for projects with work.
5. Update all affected project status files.
6. Regenerate `ops/briefing.md`.
7. **Create next workday's journal and prompts.** If today is Friday, create for Monday. Otherwise create for tomorrow.
8. Append to `log.md`.

#### `checkin meeting [name]`

1. Human identifies which meeting to process.
2. LLM reads the meeting file.
3. Process below separator: extract decisions, action items, key information, follow-ups.
4. Route action items to correct project status files (including `related-projects`).
5. Flag significant decisions as candidates for `decisions/` records.
6. Update `ops/briefing.md` if project state changed.
7. Append to `log.md`.

---

**Principle:** Human writes naturally, checks in when ready. LLM never modifies human text. LLM structures and files below the separator. Any check-in type works at any time — no forced ordering.

### 4.2 SYNC — Codebase audit (Standard+ adoption)

**Trigger:** Human says "sync."

1. Read each active project's `checkpoints.md`.
2. Walk the actual project directory on the filesystem.
3. Validate every checkpoint assertion against real code.
4. Read git log since last sync.
5. Write semantic changelog entry.
6. Flag checkpoint drift.
7. Update project status with current version and detected changes.
8. Regenerate `ops/briefing.md`.
9. Append to `log.md`.

**Output:** Per-project report: checkpoints passed/failed, changes detected, changelog written.

### 4.3 INGEST — Adding a new source (Full adoption)

**Trigger:** Human drops a file into `raw/` and says "ingest."

1. Read the raw source completely.
2. Discuss key takeaways with the human. Ask clarifying questions.
3. Create source summary page in `wiki/sources/`.
4. Create or update entity pages in `wiki/entities/`.
5. Create or update concept pages in `wiki/concepts/`.
6. Link to projects if the source relates to an active project.
7. Flag contradictions with existing pages.
8. Update `index.md`.
9. Append to `log.md`.

**Principle:** One source at a time. Human stays involved.

### 4.4 QUERY — Answering questions

1. Read `index.md` to find relevant pages.
2. Read relevant wiki and project pages.
3. Synthesize answer with `[[wikilinks]]` as citations.
4. Offer to file as analysis page if worth keeping.

### 4.5 LINT — Health check

**Trigger:** Human says "lint."

Checks: contradictions, stale pages, orphan pages, missing pages, stale project status (7+ days), unvalidated checkpoints, unprocessed journal entries, unprocessed meeting notes, index drift, unfiled decision flags.

Output: Report with recommendations. Human decides.

### 4.6 MAINTAIN — Ongoing

- Keep `updated` dates current on every page modified
- Add new pages to `index.md`
- Log actions in `log.md`
- Suggest lint passes after 5+ ingests or 2+ weeks
- Remind about stale blocked items during check-ins

---

## 5. Cross-referencing Rules

- Every wiki page links to at least one other wiki page
- Source summaries link to all entity/concept/project pages they inform
- Entity and concept pages back-link to source summaries
- Project status pages link to relevant wiki concepts/entities
- Decision records link to parent project
- On new page creation, scan existing pages for mentions that should link
- Prefer `[[wikilinks]]` over plain text for anything with a page

---

## 6. Index Conventions (`index.md`)

```markdown
## Projects
| Page | Version | Status | Open Items | Last Updated |
|------|---------|--------|------------|--------------|

## Sources
| Page | Summary | Date | Tags |
|------|---------|------|------|

## Entities
| Page | Summary | Tags |
|------|---------|------|

## Concepts
| Page | Summary | Tags |
|------|---------|------|

## Analyses
| Page | Summary | Date | Tags |
|------|---------|------|------|
```

> Minimal adoption: only Projects table. Standard: Projects + Analyses. Full: all tables.

---

## 7. Log Conventions (`log.md`)

```markdown
## [YYYY-MM-DD] action | Subject
Details.
Pages created: [[page1]], [[page2]]
Pages updated: [[page3]]
```

Actions: `initialize`, `ingest`, `checkin`, `sync`, `query`, `lint`, `update`, `create`, `analysis`, `decision`

---

## 8. Ops Conventions

### `ops/briefing.md`
Regenerated (not appended) on every sync and check-in. Shows per-project status, today's focus, open/blocked items, last commit date. Ends with yesterday-today comparison.

### `ops/prompts.md`
Regenerated each morning. Personalized check-in questions per project referencing yesterday's intentions, stale items, inactive items. Ends with general capture prompt.

---

## 9. Interaction Protocol

1. Every session starts by reading `CLAUDE.md`, `index.md`, and tail of `log.md`.
2. Human directs; LLM executes.
3. **Confirm before writing.** Before any workflow that modifies vault files, the LLM must output a structured summary of all intended changes and wait for explicit approval:
   ```
   ## Proposed vault changes
   **Create:** list of new files to be created
   **Update:** list of existing files to be modified, with a one-line description of each change
   **Route:** action items or tasks being moved between files
   **Flag:** decisions, contradictions, or items needing human attention

   Approve? (y / edit / reject)
   ```
   The LLM does NOT write to any vault file until the human responds.
4. Contradictions are valuable — flag, don't resolve.
5. Human voice is sacred — never modify journal text above separator.
6. The vault is the product — chat is ephemeral, vault persists.
7. Natural language in, structured data out — human never fills forms.
8. Don't fabricate — only document what's real.

---

## 10. Domain Context

> This section is populated during INITIALIZE. If you're setting up manually, fill in:

**Owner:** [Your name] — [Your role] at [Your organization]

**Primary domain:** [Your field — what you work on day to day]

**Domain terminology:** [Acronyms, internal names, jargon specific to your work]

**Key collaborators:** [Names and roles of people you work with regularly]

**Dev patterns:** [Your tools, languages, frameworks, deployment targets, coding style preferences]

*Update as the vault evolves.*

---

## 11. Evolution

Schema version 1.0. Initialized from the Personal Vault starter template. Inspired by [Karpathy's LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) and adapted for daily developer workflow management. Refine page types, frontmatter, workflows, and journal processing as you learn. Document changes in `log.md`.

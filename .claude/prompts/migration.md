  I need you to migrate an entire HTML document into the Fire Vault guide
  page in the Fire Suppression Software Suite. The source file is at
  _admin/architecture-phase1.html in the FIRE_VAULT repo. Read it in full
  before doing anything else.

  The source file has three tabs — treat each tab as a major section of
  the guide:

    Tab 1 — "Phase 1 Architecture"
      The 3-layer architecture diagram (Local Machine → Anthropic API →
      GitHub Org), the data flow steps, the privacy/governance callouts,
      and the Phase 2 teaser. This is technical context — explain what
      the system is and how it works.

    Tab 2 — "Persistent Memory Network"
      The daily cycle diagram, the visibility spectrum (Private → Team),
      and the "What the Vault Knows" compound timeline (Week 1, Month 1,
      Month 3+). This is the "why it gets better over time" story.

    Tab 3 — "Fire Vault User Guide"
      Persona-based sections for Engineers, Managers, and Directors.
      Conversational examples, query showcases, the "Making it yours"
      section with Chenla's workflow example, and the wiki ingestion
      coming-soon callout.

  Before writing any code, do the following:

  1. Read the existing guide page in FS3 to understand the design system —
     component patterns, typography, color tokens, card styles, spacing,
     and how the TOC is structured and wired up. You will rebuild
     everything in that design language. Do not carry over any CSS,
     class names, or color values from the source HTML.

  2. Plan the full section and TOC structure. Map each tab's content to
     one or more guide sections with clear, descriptive titles. The TOC
     must be navigatable — clicking a section title jumps to that anchor.
     Propose your section breakdown to me before writing any code.

  3. For the architecture content (Tab 1), the original used visual layer
     cards and a flow bar. Rebuild these using FS3's existing components —
     cards, badges, flow indicators, whatever fits. The three layers and
     the data flow steps must stay readable and scannable.

  4. For the memory network content (Tab 2), the original used an SVG
     cycle diagram and a horizontal spectrum. Reconstruct the concepts
     using FS3 components — the key ideas are the daily loop, the four
     visibility layers, and the compounding timeline. If a diagram is
     needed, use whatever FS3 supports; if not, the content works as
     structured cards.

  5. For the user guide content (Tab 3), the "say this" conversational
     examples must read as things you type — not code blocks. The query
     showcases should be scannable grids or lists. The Chenla conversation
     example is a two-turn dialogue followed by a result — use whatever
     chat-style or before/after component FS3 has. The wiki ingestion
     callout is "coming soon" — use FS3's convention for that.

  6. Confirm the proposed section structure and TOC with me before writing
     any code.
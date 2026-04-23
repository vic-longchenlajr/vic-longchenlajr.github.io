In the Personal Vault guide page at app/documentation/guide-personal-vault/page.tsx, add download links for        Obsidian and the starter CLAUDE.md file. Reference how the fire vault tutorial                                     (app/documentation/tutorial-fire-vault/page.tsx) handles downloads — same DOWNLOADS object pattern, same
  downloadLink styling, same callout component pattern.

  ## Downloads object

  Add a DOWNLOADS constant at the top of the file (after SECTIONS):

  const DOWNLOADS = {
      obsidian: 'https://github.com/obsidianmd/obsidian-releases/releases/download/v1.12.7/Obsidian-1.12.7.exe',
      starterSchema: '/downloads/starter-claude-md.md',
  };

  ## Where to place the Obsidian download

  In the Introduction section, the guide mentions Obsidian with a description of what it is. Right after the
  Obsidian explanation text, add a callout box (using the same callout/calloutLabel/calloutText classes from the
  fire vault tutorial CSS):

  Callout label: "Recommended"
  Callout content: "Download Obsidian (free) — it turns your vault from a folder of files into a browsable
  knowledge base with linked navigation and graph visualization. Not required, but strongly recommended."

  Include a download link styled with downloadLink class: "Download Obsidian for Windows" pointing to
  DOWNLOADS.obsidian.

  Use the purple accent color (#a78bfa) for the callout border-left and label color instead of the orange used in
  fire vault — this keeps the Personal Vault guide visually distinct. Add CSS classes for this variant (e.g.
  calloutPurple or reuse callout with an inline style override on border-left-color).

  ## Where to place the starter CLAUDE.md download

  In the "Building Your Own" section, right after "Step 2: Copy the starter CLAUDE.md file into the folder as
  CLAUDE.md" — add a styled download button/link. This should be prominent since it's the key deliverable. Pattern:

  A visually distinct download card or button — not just an inline link. Something like:

  <div className={styles.downloadCard}>
      <div className={styles.downloadCardLabel}>Starter Template</div>
      <p className={styles.downloadCardText}>
          The complete vault schema with auto-initialize workflow. Drop this single file into an empty Obsidian
  vault and say "initialize" to Claude Code.
      </p>
      <a href={DOWNLOADS.starterSchema} className={styles.downloadButton} download="CLAUDE.md">
          Download starter CLAUDE.md
      </a>
  </div>

  Add CSS for downloadCard and downloadButton to the guide's CSS module. The card should have the purple accent
  (#a78bfa) border-left, dark background consistent with the page theme, and the button should be a solid purple
  pill-style button with white text. Reference the callout styling from the fire vault tutorial CSS as a base but
  adapt it for a more prominent download action.

  ## CSS additions

  Add these classes to guide-personal-vault.module.css (adapt from the fire vault tutorial's callout and
  downloadLink styles):

  - downloadLink — same as fire vault (orange #E87722 with hover)
  - callout, calloutLabel, calloutText — same structure as fire vault but with purple (#a78bfa) accent
  - downloadCard — prominent card with purple left border, slightly more padding than callout
  - downloadCardLabel — uppercase label like calloutLabel but purple
  - downloadCardText — description text like calloutText
  - downloadButton — solid purple (#a78bfa) pill button, white text, hover darkens

  ## Verify

  Run npm run build after changes to confirm everything compiles.
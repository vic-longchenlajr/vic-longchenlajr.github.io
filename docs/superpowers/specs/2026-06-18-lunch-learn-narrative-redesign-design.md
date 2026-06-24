# Lunch & Learn — Narrative Redesign

**Date:** 2026-06-18
**Presenter:** Chenla Long, Jr.
**Deck:** `app/presentations/lunchandlearn/`
**Status:** Design — awaiting review

---

## Why

A practice walkthrough exposed the deck's narrative as **choppy, too complex, and over-explained** — too much time spent on tool internals, not enough action to hold the room. Aaron's notes and the presenter's own notes converged on the same fix: a tighter story arc that leads with *who I am* and *how I work*, makes AI a first-class part of the method, and lets each demo land with an immediate, visual payoff. Real presentation is ~1 week out; another practice run is planned for next week.

## Goals

1. **Reorder the narrative** so process and AI come before the demos, and each demo is bracketed by a story lead-in and an impact payoff.
2. **Cut explanation, add momentum** — demos sell benefits/values, not tool mechanics; content is digestible (line-by-line reveals).
3. **Make AI usage explicit** — a dedicated slide mapping specific tools to each stage of the process.
4. **Tell the VicFlex origin story** (Brian + interns) instead of opening cold on Signal→Target.
5. **Fix two interactions** flagged in the run: ProcessLoop auto-advance timer and its bottom "principle chips."

## Non-goals / out of scope

- The unused `PlatformOrchestration` component stays unused. We are **not** adding a "restructure → encode" Vortex transition slide. Deck stays at 12 slides.
- No changes to the PresentationEngine framework itself (only slide components and `presentation.json`).
- Final per-slide copy will be refined during the slide-by-slide review pass; copy below is the working draft.

---

## Slide arc (before → after)

| New # | Slide | Layout / Component | Was | Change |
|---|---|---|---|---|
| 1 | Hero | `hero` | #1 | unchanged |
| 2 | Intro | `intro` | #2 | add a brief "what I'll cover today" agenda line |
| 3 | My Process | `ProcessLoop` | #7 | **moved up**; reframed; interaction change; chips removed |
| 4 | **AI Tools** | `flow` | — | **NEW** |
| 5 | The Signals | `grid` | #3 | reframed copy ("root problem" → "signals") |
| 6 | **VicFlex: the story** | `flow` | — | **NEW** narrative lead-in |
| 7 | VicFlex demo | `DemoLaunch` | #6 | simplified |
| 8 | VicFlex impact | `ImpactRecovery` wrapper | (part of #8) | **NEW slide**, existing chart |
| 9 | Vortex: the old way | `SourceStack` | #4 | moved (now the Vortex lead-in) |
| 10 | Vortex demo | `DemoLaunch` | #5 | simplified; one-stop-shop framing |
| 11 | Vortex impact | `ImpactCurve` wrapper | (part of #8) | **NEW slide**, existing chart |
| 12 | Closing | `ClosingSignals` | #9 | + Q&A prompt + AI User Group plug |

**Overarching throughline:** Who I am → how I work (process) → how AI lets one developer run that whole process → the signals that say "automate this" → VicFlex (small, story-driven proof) → Vortex (complex finale) → your turn.

---

## New slides

### Slide 4 — AI Tools (`flow`, 4 stages, line-by-line reveal)

Maps each process stage to the tool that powers it. Bridge in from slide 3: *"Those six phases normally take a team — here's how AI lets one developer run all of them."*

- **IMMERSE · Claude Projects**
  - Dump every source file into one project
  - Deploy research agents to study how similar software is built
  - Extract the patterns hiding in the data
  - *Goal: Claude holds the entire context — the problem, the solution space, multiple approaches*
- **ARCHITECT · grill-me**
  - Feed in the context report from Claude
  - It interviews me relentlessly — exposing assumptions, testing implementation strategies
  - Output: the product specification
- **BUILD · Claude Code**
  - Breaks the spec into parallel, verifiable lanes
  - Runs a subagent per lane, in parallel
- **DEPLOY & SUSTAIN · Claude Code + readme-kit**
  - Every change logged and version-tracked — breakage is traceable and reversible
  - On feedback: trace the source, map downstream effects, test before/after so one fix doesn't break another

**Caption:** "Context in → spec → parallel build → safe iteration. Each tool hands its output to the next."

### Slide 6 — VicFlex: the story (`flow`, 4 beats)

A narrative lead-in. The demo slide (7) keeps the Signal→Target breakdown + live launch; this slide just sets the scene.

- **THE SIGNAL** — Sales kept pinging engineering to confirm VicFlex bracket compatibility: the same lookup, over and over.
- **THE COST** — Every request pulled Brian into SolidWorks; the interruptions compounded on top of a full NPD load.
- **THE SEED** — Brian's interns built a database of the highest-value, most common configurations.
- **THE TOOL** — A filter to navigate that database, shaped like online shopping — so Sales needed zero training.

**Caption:** "A high-frequency lookup, turned into a self-service tool."

---

## Component changes

### ProcessLoop (`slides/ProcessLoop.tsx`)

1. **Remove auto-advance.** Delete the 9s `setInterval` and `autoAdvance` state. The slide opens on phase 0; the presenter **clicks the rail nodes** to step through phases at their own pace. Node click already drives `activeIndex` — keep that, drop the timer.
2. **Remove the principle strip.** Delete the bottom `principlesStrip` / `principleChip` block (the "black boxes"). The four principles retire from the visual; their spirit moves into spoken delivery / presenter notes. "Leverage AI" is now its own slide (4).
3. **Reframe.** Subtitle/notes lean into "the standard engineering lifecycle — reimagined for software and a single developer."
4. Drop the now-unused `principles` / `principlesTitle` from this slide's `content` in `presentation.json`.

### Chart split (retire `ImpactCharts`)

`ImpactCurve` (Vortex) and `ImpactRecovery` (VicFlex) are already standalone components taking spread props + `isVisible`/`reduce`/`startDelay`/`clipId`. Create two thin slide-component wrappers that read from `content` and render one chart each at `startDelay: 0`:

- **`VicflexImpact`** → renders `ImpactRecovery` (slide 8), content = the existing `recovery` block.
- **`VortexImpact`** → renders `ImpactCurve` (slide 11), content = the existing `curve` block.

Register both in `slides/index.ts`; remove `ImpactCharts` from the registry once unused. (Leave `ImpactCharts.tsx` on disk or delete — decide at implementation; it becomes dead code.)

### ClosingSignals (`slides/ClosingSignals.tsx`)

Add (a) a Q&A prompt — **"What's one thing you've always wanted to automate?"** — and (b) an AI User Group plug — **"Want to see how other engineers are automating their work? Join the AI User Group — real examples, every month."** May require one or two new optional `content` fields; keep existing signals/reframe/contact intact.

---

## Existing-slide copy rewrites

- **Slide 2 (Intro):** add a one-line agenda ("Today: how I work, the AI behind it, and two tools it produced").
- **Slide 5 (The Signals):** reframe from "The Root Problem" to signals that automation pays off; same four tiles, lighter copy. Keep the "expensive / rare combo" tile as the setup for the AI-enables-solo-dev thread.
- **Slide 10 (Vortex demo):** lead with the one-stop-shop payoff — quicker, error-checking, accurate order BOM, export for Applications, quoting — and cut tool-internals detail. State the source-of-truth line: scattered files replaced by a calculation engine + verification layer; the BOM is built as you configure.
- All content slides: prefer line-by-line / staged reveals over dumping full lists (Aaron: "show steps line by line for digestion").

---

## Delivery notes

`app/presentations/lunchandlearn/DELIVERY-NOTES.md` (personal rehearsal cues, separate from on-deck presenter notes) will be re-sequenced to match the new 12-slide order as part of implementation.

## Verification

- `npx next build` compiles clean.
- Scroll into → out of → back into slides 3, 4, 6, 8, 11 to confirm entrance animations replay (mount-on-active).
- Slide 3: confirm clicking rail nodes advances phases and there is no auto-advance.
- Slides 8 & 11: confirm each chart renders alone and animates from `startDelay: 0`.

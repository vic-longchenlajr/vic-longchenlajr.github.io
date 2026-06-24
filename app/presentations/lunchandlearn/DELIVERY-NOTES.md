# Delivery Notes — Lunch & Learn

**Automating Engineering Workflows with Custom Software** · Chenla Long, Jr.
Process-first arc, 11 slides. These are *personal* delivery cues (pacing, pauses, emphasis) — separate from the on-deck presenter notes (press `N`).

---

## Overall reminders
- _(fill in: energy, breathe, slow down, eye contact, water nearby...)_
- Arc: who I am → **how I build (the loop)** → the AI behind it → **grill-me** → the signals → VicFlex (demo + impact) → Vortex (demo + impact) → recap & your turn.
- The **process is the main event**; the two tools are evidence. Demos are ~2-minute receipts, not full walkthroughs.
- **Story is spoken; the slide holds the reusable model.** Tell the Brian story, the maturity line, the forward AI/cloud direction — out loud. Let the slide carry the Signal→Target pairs, the loop, the signals checklist.
- Two live demos are the spine. Have backups open BEFORE you start: Vortex source docs (the 4 chips open them), demo screenshots ready.
- Q&A opener at the end: **"What's one thing you've always wanted to automate?"** — then walk one through the process live.

**Rough timing budget** _(fill in target total)_

| # | Slide | Layout | Target | Running |
|---|-------|--------|--------|---------|
| 1 | Hero | hero | ~0:30 | |
| 2 | Introduction | intro | 60–90s | |
| 3 | How I Build (the loop) | ProcessLoop | ~1:45 | |
| 4 | The AI Behind It | flow | ~2:00 | |
| 5 | Inside grill-me | GrillMe | ~1:30 | |
| 6 | The Signals | grid | ~1:15 | |
| 7 | VicFlex (demo) | DemoLaunch | ~5:00 | |
| 8 | VicFlex impact | VicflexImpact | ~1:00 | |
| 9 | Vortex (demo) | DemoLaunch | ~7:00 | |
| 10 | Vortex impact | VortexImpact | ~1:00 | |
| 11 | Is This Your Workflow? | ClosingSignals | ~1:30 + Q&A | |

---

## Slide 1 — Hero
- Already up while everyone gets situated — let it sit.
- Cold open — read title + tagline, one line on the thesis, **don't** explain the product yet.
- _(your cues:)_

## Slide 2 — Introduction
- Keep to 60–90s. Left = **What I've Built** (3 categories, all shipped), right = **What's on deck today** (4 agenda lines).
- **Forward AI/cloud direction is spoken, not on the slide:** "right now I'm working with IT to stand up the infrastructure to get tools like these in front of all of you — hosting this talk is part of that."
- Name VicFlex & Vortex out loud; don't read the bullets.
- _(your cues:)_

## Slide 3 — How I Build (the loop)
- Frame: same engineering lifecycle everyone knows — **Validate · Immerse · Architect · Prototype · Deploy · Feedback.**
- **Click through all six** as you talk. Don't read them — hit the arc.
- **The loop is the climax — it fires on the LAST click.** When you land on **Feedback**, the return arc draws back to **Architect** (it glows): "after a pilot you don't start over — you go back to plan the updates and go deeper."
- No endpoint on purpose = living system. Release = spoken: "when feedback's clean and stakeholders align, that deploy goes to everyone — and even that can re-enter the loop."
- Then: normally each phase is a different team — I run the whole loop solo. → sets up "how?"
- _(your cues:)_

## Slide 4 — The AI Behind It
- Answer to "how, solo?" — **one tool per phase, same phase words as the loop.**
- L→R: Immerse (Claude Projects) → Architect (grill-me, one line) → Prototype (Claude Code) → Feedback (Claude Code + readme-kit).
- **Say the line that builds trust:** "Validate and Deploy have no tool — deciding it's worth building, and shipping it, are still me. AI doesn't pick the problem."
- The story is the pipeline: context in → spec → parallel build → safe iteration.
- _(your cues:)_

## Slide 5 — Inside grill-me
- The most stealable idea — slow down here.
- Start vague (the LiquidPlanner ask on screen). The badge = "23 questions, one at a time"; **don't read a transcript — the length is the point.**
- Walk the one exchange: it asked whether "hours per engineer" includes admin/OOO — a definition that would've made every chart wrong.
- Land the **SPEC**: *Productive Hours = logged − admin − OOO*, decided before building anything.
- _(your cues:)_

## Slide 6 — The Signals
- The tells that a workflow is worth automating — not just "things that are hard."
- **Speak the title + one phrase per tile; don't read the one-liners.**
- The "rare skillset" tile is the callback to the AI slide. Let it sit; the demos resolve it.
- _(your cues:)_

## Slide 7 — VicFlex (demo) (LIVE ~5 min)
- **Tell the Brian/intern story aloud** — the repeated lookup pulling him into SolidWorks, his interns' database, the shopping-style filter. Hand to Brian if he's in the room.
- On screen: one setup line + two Signal→Target pairs. **Get to LAUNCH fast.**
- Live: pick known components → instant compatible configs against the D-value threshold.
- Backup: screenshots ready if the demo stalls.
- _(your cues:)_

## Slide 8 — VicFlex impact (2-column: chart + how we measured it)
- **Human first:** "3 hours a week, every week" → let the curve climb to **156**.
- Measured: 2 req/wk × 1.5 hrs × 52 = 156. Now self-service ≈ 0, so the recovered area is the whole chart.
- Right column walks the arithmetic — let the room follow it. Make it Brian, not "engineering."
- _(your cues:)_

## Slide 9 — Vortex (demo) (LIVE ~7 min)
- One line on the product: hybrid suppression system, powerful but painful to configure.
- **The four chips ARE the old way** — open one or two live (Estimator's hand calcs is the vivid one), let the rest sit there making the point.
- Two Signal→Target pairs; value, not mechanics.
- Maturity line, spoken: "I didn't just digitize the sheets — I restructured the method, then encoded it once."
- Live: load preset → define 2 zones → trigger a warning on purpose → export BOM.
- Backup: screenshots ready if the demo stalls.
- _(your cues:)_

## Slide 10 — Vortex impact (2-column: chart + reading the curve)
- **Honesty line up front:** "VicFlex I can measure to the hour; this one's a model. I'm asserting the shape, not the numbers." No ticks on the axes.
- Right column: base effort → old method goes exponential (every zone/enclosure compounds, rework restarts) → builder stays near-flat (complexity = clicks).
- The widening gap is the point. Land it: **effort stays flat as complexity grows.**
- _(your cues:)_

## Slide 11 — Is This Your Workflow? (recap + open)
- **Recap turned on them:** the signals to watch for in *your* work, and **the process — simplified** (7 plain-language steps) to approach them.
- Read a couple signals slowly — let each person picture their own workflow.
- **Open question:** "What's one thing you've always wanted to automate?" Take ONE and walk it **down the seven steps, out loud** with the room.
- ⚠️ **This is a VERBAL think-through, not a live grill-me run.** Don't fire the tool live — it's slow and will eat Q&A. You're modeling the *thinking*; end branches with "…and that's where grill-me takes over."
- **Backup:** have one workflow of your own ready in case the room's quiet. Time-box to one example (~5 min), then open broader Q&A.
- Land last: **"Make the correct way the easy way."**
- No "reach out to me" — the live think-through is the connection.
- _(your cues:)_

# Lunch & Learn — Presentation Outline (Draft)

**Working Title:** "From Problem to Platform: Building Customer-Facing Tools in Engineering" (not locked)
**Current Title:** "Delivering Engineering Software Solutions"
**Presenter:** Chenla Long, Jr. — Fire Suppression Technology
**Format:** 1 hour — 30-45 min content + 15+ min questions
**Target Date:** Early June 2026 (Tue/Wed/Thu — date TBD)
**Time Check:** Nick Barbour (L&L Coordinator) will be in the room to signal if running over

---

## Guiding Principle

Lead with the universal problem, not the product. Everyone in the room has dealt with spreadsheet hell and tribal knowledge — nobody outside fire suppression knows what Vortex is. Vortex becomes the *proof*, not the *premise*.

---

## 1. OPEN — Who I Am & Why This Talk Exists (~2 min)

- Brief intro: Chenla Long, Fire Suppression Technology
- Anchor stat: 400+ hours of manual work eliminated annually
- Frame the talk: "I build internal software that turns engineering workflows into reliable systems. Today I'll show you what that looks like and why it matters."

---

## 2. THE PROBLEM — Spreadsheet Archaeology (~3 min)

- The universal pain: rules scattered across PDFs, Excel files, tribal knowledge
- What happens when validation is late: rework, bottlenecks, inconsistent outputs
- Keep this general — every engineer in the room should be nodding
- This is the buy-in moment. If they don't feel this, nothing after it lands.

---

## 3. A REAL EXAMPLE — Walk Through an Old Design (~5 min)

- Pick one concrete scenario: "Here's how a Vortex system design used to work"
- Don't explain Vortex deeply — just enough: "It's a hybrid suppression system. Powerful product. Complex to configure."
- Walk through the old process: open 4 spreadsheets, cross-reference constraints, manually calculate, hope you didn't miss a rule
- Land it: "This took hours. And the output quality depended entirely on who did it."
- This is the storytelling moment. One specific, human example beats a list of bullet points.

---

## 4. THE SOLUTION — What I Built (~5 min)

- Brief concept: "I encoded all of that logic into software."
- Before/After framing (keep it tight)
- Key wins: validates at input, enforces compliance automatically, same output every time
- Then the zoom-out: "That was one system. Real projects have dozens. So I built a platform that orchestrates all of them."
- This replaces the old Configurator (v1) and Builder (v2) as separate slides — one narrative instead of two.

---

## 5. LIVE DEMO — Vortex Project Builder (~8-10 min)

- Demo goes HERE, in the middle, while context is fresh
- Narrate it: load a project, define zones, trigger a warning on purpose, export the BOM
- "That BOM is now audit-ready and identical to what any other engineer would produce for the same inputs."
- Have 4-5 screenshots as backup if demo fails.

---

## 6. SAME THINKING, SMALLER SCALE — VicFlex Bracket Filter (~3 min)

- Quick hit: "Not everything needs a platform. Sometimes it's a 40x-per-project lookup that takes 3 minutes each."
- Show the filter (brief demo or screenshot)
- "Automating the decision you make 40 times creates more impact than optimizing the one you make once."
- Change of pace after the Vortex arc. Proves the approach scales down.

---

## 7. HOW I WORK — The Process Behind It (~3 min)

- Abbreviated process loop: Discovery, Immersion, Build, Validate, Deploy
- Tie it back: "Every tool I showed you followed this same lifecycle."
- Methodology as credibility, not curriculum. Don't dwell.

---

## 8. IMPACT — Numbers That Matter (~3 min)

- Three KPIs:
  - **400h+** saved (10 engineers x 2hr/week x 20 weeks)
  - **80%** fewer logic regressions post-migration
  - **100%** output consistency (structurally guaranteed)
- Include the math — engineers respect defensible numbers
- Brief roadmap: V1 shipped, Builder beta, what's next

---

## 9. CLOSE — What Should We Automate Next? (~3 min)

- Show the pipeline board: Active & Expanding / Building Next / Needs Discovery
- The explicit ask: "If any of these resonate — or if you have a workflow that's not on this board — come find me."
- End with the one-liner: "The goal is to make the correct way the easy way."

---

## Total: ~35 min + flexibility for demo pacing. Leaves 15-20 min for questions.

---

## What changed from the current slide deck

- **Dropped:** Detailed Vortex/VicFlex comparison card — too much domain context required for this audience
- **Dropped:** Separate Configurator v1 slide — folded into "The Solution" narrative
- **Moved:** Demo from the very end to the middle (after context, before principles)
- **Condensed:** Principles grid (6 tiles) into a brief process overview
- **Simplified:** Vortex is introduced through a story, not a spec sheet

## Open decisions

- [ ] Lock presentation title
- [ ] Select specific date in early June (Tue/Wed/Thu)
- [ ] Decide if VicFlex gets a brief live demo or just screenshots
- [ ] Decide which Vortex scenario to use for the "old design walkthrough" story

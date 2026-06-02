'use client';

import { useState } from 'react';
import styles from './guide-fire-vault.module.css';

type RoleId = 'engineers' | 'managers' | 'directors';

interface Props {
    registerSection: (id: string) => (el: HTMLElement | null) => void;
}

export default function UsageTab({ registerSection }: Props) {
    const [activeRole, setActiveRole] = useState<RoleId>('engineers');

    return (
        <>
            {/* ---- Quick Commands ---- */}
            <section id="usage-commands" ref={registerSection('usage-commands')} className={styles.section}>
                <h2 className={styles.sectionTitle}>Quick Commands</h2>
                <p className={styles.sectionIntro}>
                    Open the vault and say one of these. Everything else is plain English — no syntax required.
                </p>
                <table className={styles.troubleshootingTable}>
                    <thead>
                        <tr>
                            <th>Command</th>
                            <th>What it does</th>
                            <th>Also works</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code className={styles.inlineCode}>checkin</code></td>
                            <td>Start a check-in — Claude picks the right type based on time of day</td>
                            <td>&ldquo;check in&rdquo;</td>
                        </tr>
                        <tr>
                            <td><code className={styles.inlineCode}>morning</code></td>
                            <td>Morning check-in — reviews carryover, sets the day&apos;s plan</td>
                            <td>&ldquo;checkin morning&rdquo;, &ldquo;morning check-in&rdquo;</td>
                        </tr>
                        <tr>
                            <td><code className={styles.inlineCode}>eod</code></td>
                            <td>End-of-day wrap-up — captures outcomes, pre-builds tomorrow</td>
                            <td>&ldquo;end of day&rdquo;, &ldquo;checkin eod&rdquo;</td>
                        </tr>
                        <tr>
                            <td><code className={styles.inlineCode}>checkin midday</code></td>
                            <td>Quick midday update — captures anything that changed since morning</td>
                            <td>&ldquo;midday&rdquo;, &ldquo;midday check-in&rdquo;</td>
                        </tr>
                        <tr>
                            <td><code className={styles.inlineCode}>checkin meeting [name]</code></td>
                            <td>Process a meeting&apos;s notes — extracts decisions and action items</td>
                            <td>&ldquo;process the [name] meeting&rdquo;</td>
                        </tr>
                        <tr>
                            <td><code className={styles.inlineCode}>init</code></td>
                            <td>One-time setup — creates your status file and directory structure</td>
                            <td>&ldquo;initialize my vault&rdquo;, &ldquo;set up my vault&rdquo;</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* ---- By Role ---- */}
            <section id="usage-role" ref={registerSection('usage-role')} className={styles.section}>
                <h2 className={styles.sectionTitle}>By Role</h2>

                <div className={styles.roleSwitch}>
                    {(['engineers', 'managers', 'directors'] as RoleId[]).map(role => (
                        <button
                            key={role}
                            className={`${styles.roleSwitchBtn} ${activeRole === role ? styles.roleSwitchBtnActive : ''}`}
                            onClick={() => setActiveRole(role)}
                        >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                    ))}
                </div>

                {/* ── Engineers ── */}
                {activeRole === 'engineers' && (
                    <div>
                        <div className={styles.roleEyebrow}>R&amp;D Engineer · Engineer II · Sustaining Engineer · Associate Engineer</div>
                        <p className={styles.sectionIntro}>You capture your work. The system handles structure, history, and team visibility — automatically.</p>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Starting your day</h3>
                            <p className={styles.bodyText}>
                                Open Claude Code and say &ldquo;morning&rdquo; or &ldquo;checkin.&rdquo; The system already knows what
                                you were working on yesterday — it&apos;ll surface your carryover items and walk you through
                                what&apos;s on your plate for today.
                            </p>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Say this</div>
                                <div className={styles.sayThisBubble}>morning</div>
                            </div>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Or this</div>
                                <div className={styles.sayThisBubble}>checkin</div>
                            </div>
                            <div className={styles.roleTip}>
                                <strong>Already wrote in Obsidian before opening Claude?</strong> It reads your notes
                                automatically and skips any questions you already answered. No need to repeat yourself.
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Ending your day</h3>
                            <p className={styles.bodyText}>
                                A two-minute wrap-up. Tell Claude what you got done, what&apos;s still open, and what&apos;s
                                on your list for tomorrow. It writes your daily summary, updates your status, and
                                pre-builds your starting point for the next morning.
                            </p>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Say this</div>
                                <div className={styles.sayThisBubble}>eod</div>
                            </div>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Or describe it</div>
                                <div className={styles.sayThisBubble}>Finished the K17 distribution test write-up, still need to close out the SprayTrace entry. Tomorrow I&apos;m starting the bracket spacing analysis for VicFlex.</div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>After a meeting</h3>
                            <p className={styles.bodyText}>
                                Describe what happened — who was there, what was decided, what needs to happen next.
                                Don&apos;t worry about format. Claude extracts decisions, action items, and follow-ups
                                and saves them to the right place automatically.
                            </p>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Say this</div>
                                <div className={styles.sayThisBubble}>Just got out of the VicFlex bracket review with Brian and Aaron. We decided to add a 1-inch variant to the lineup. Aaron owns the spec, needs it done by the 15th. Still waiting on the vendor quote from Daniel Wake — that&apos;s been sitting for a week.</div>
                            </div>
                            <div className={styles.roleTip}>
                                <strong>Have a meeting coming up today?</strong> Mention it during your morning check-in
                                and Claude will pre-create a meeting template — agenda pre-filled from context, notes
                                section ready to go. Just open the file and start writing when you walk in.
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Lab session capture</h3>
                            <p className={styles.bodyText}>
                                After a test run, describe what you did and what happened. Claude structures it as a
                                test log entry, links it to the right project, and keeps it searchable. Doesn&apos;t
                                matter how rough the notes are.
                            </p>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Say this</div>
                                <div className={styles.sayThisBubble}>Just finished distribution testing on the K17 deflector. 15 heads, all passed except two at the north end — possible spacing issue. Ceiling was 12 ft, standard wet system setup. Running again tomorrow with 6-inch adjusted spacing to see if that clears it.</div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Decision journaling</h3>
                            <p className={styles.bodyText}>
                                When a project decision gets made — even in a hallway conversation or a quick email —
                                tell the vault. The rationale behind decisions is the hardest thing to reconstruct
                                six months later.
                            </p>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Say this</div>
                                <div className={styles.sayThisBubble}>We decided to defer the Gen 2 ARV manifold to Q3. FM approval timeline doesn&apos;t support the current scope, and adding it now would push the whole release. Bob made the call this morning.</div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Standards research notes</h3>
                            <p className={styles.bodyText}>
                                When you&apos;re digging through NFPA, UL, or FM documents and find something relevant,
                                capture it while it&apos;s fresh. It gets stored with the right project context so you
                                — or a teammate — can find it later without re-reading the whole standard.
                            </p>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Say this</div>
                                <div className={styles.sayThisBubble}>Spent an hour in NFPA 13 section 8.5.7 today. Upright sprinklers in wet systems need the deflector between 1 and 12 inches below the ceiling. Directly relevant to the K17 spacing issue — 6-inch adjusted positioning should keep us in spec.</div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Asking the vault questions</h3>
                            <p className={styles.bodyText}>
                                The vault knows everything you&apos;ve put into it. Ask it anything — project status,
                                past test results, open tasks, decisions made, what you&apos;re waiting on. The more
                                you check in, the better its answers get.
                            </p>
                            <div className={styles.queryGrid}>
                                <div className={styles.queryItem}>Where are we at on the VicFlex project?</div>
                                <div className={styles.queryItem}>What open tasks do I still have this week?</div>
                                <div className={styles.queryItem}>Give me a summary of my K17 testing from last month</div>
                                <div className={styles.queryItem}>What is the Vortex project currently waiting on?</div>
                                <div className={styles.queryItem}>What decisions have been made on the 300BAR project?</div>
                                <div className={styles.queryItem}>What am I waiting on from other people right now?</div>
                                <div className={styles.queryItem}>What was the result of my distribution test on April 28th?</div>
                                <div className={styles.queryItem}>What did I capture about NFPA 13 section 8.5?</div>
                                <div className={styles.queryItem}>What did I accomplish last week?</div>
                                <div className={styles.queryItem}>Which of my projects has the most open action items?</div>
                            </div>
                            <div className={styles.roleTip}>
                                <strong>The vault gets smarter over time.</strong> After a month of regular use, it can
                                reconstruct full project timelines, surface recurring blockers, and connect decisions
                                made weeks apart. It never forgets — even when you do.
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Managers ── */}
                {activeRole === 'managers' && (
                    <div>
                        <div className={styles.roleEyebrow}>Engineering Manager</div>
                        <p className={styles.sectionIntro}>Your own work captured, plus a live view of your team — without calling a status meeting.</p>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Your own check-in</h3>
                            <p className={styles.bodyText}>
                                Same as engineers. Say &ldquo;morning&rdquo; or &ldquo;checkin&rdquo; to start your day, &ldquo;eod&rdquo; to close
                                it out. Capture meetings, decisions, and blockers the same way. See the Engineers
                                role above for the full walkthrough.
                            </p>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Say this</div>
                                <div className={styles.sayThisBubble}>morning</div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Reading your team briefing</h3>
                            <p className={styles.bodyText}>
                                Open Obsidian and look at <strong>_ops/briefing.md</strong>. That file is a
                                consolidated view of every active project and every person on the team — who&apos;s
                                working on what, what&apos;s blocked, what&apos;s been waiting too long. It&apos;s
                                regenerated by a team sync, which Chenla runs after checkins. You don&apos;t need to
                                open Claude to read it.
                            </p>
                            <div className={styles.roleTip}>
                                <strong>No action required.</strong> Open it before your 1:1s, weekly reviews, or
                                whenever you need to know where things stand. It&apos;s current as of the last sync —
                                if it looks stale, ask Chenla to run one.
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Asking questions about your team</h3>
                            <p className={styles.bodyText}>
                                Don&apos;t wait for your weekly standup to find out who&apos;s blocked. Ask the vault instead — it already knows.
                            </p>
                            <div className={styles.queryGrid}>
                                <div className={styles.queryItem}>Who hasn&apos;t checked in this week?</div>
                                <div className={styles.queryItem}>What&apos;s blocked across the team right now?</div>
                                <div className={styles.queryItem}>Give me a summary of what the team accomplished this week</div>
                                <div className={styles.queryItem}>What&apos;s the current status on VicFlex from all contributors?</div>
                                <div className={styles.queryItem}>What is Hannah waiting on and for how long?</div>
                                <div className={styles.queryItem}>Who has open action items from last week&apos;s meetings?</div>
                                <div className={styles.queryItem}>Which projects have had no activity in the last 5 days?</div>
                                <div className={styles.queryItem}>What decisions were made on Vortex this week?</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Directors ── */}
                {activeRole === 'directors' && (
                    <div>
                        <div className={styles.roleEyebrow}>Director</div>
                        <p className={styles.sectionIntro}>Read the briefing, ask questions, stay current. No forms to fill, no status meetings to run just to get a pulse.</p>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Reading your briefing</h3>
                            <p className={styles.bodyText}>
                                Open Obsidian and look at <strong>_ops/briefing.md</strong>. That&apos;s the current state
                                of the entire team — every active project, consolidated blockers, items waiting on
                                external input, who&apos;s doing what. It&apos;s regenerated by a team sync run after
                                checkins — current as of the last sync. You don&apos;t need to open Claude Code to
                                read it.
                            </p>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Preparing for leadership meetings</h3>
                            <p className={styles.bodyText}>
                                Before walking into a review with Victaulic leadership, ask the vault for a briefing
                                on where things stand. It synthesizes everything the team has captured and gives you
                                a clean summary you can walk in with.
                            </p>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Say this</div>
                                <div className={styles.sayThisBubble}>Give me a summary of where each active project stands right now. I have a leadership review in an hour.</div>
                            </div>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Or this</div>
                                <div className={styles.sayThisBubble}>What has the team accomplished on Vortex in the last two weeks? I need to give an update to the VP of Engineering.</div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Asking questions</h3>
                            <p className={styles.bodyText}>
                                Ask anything about project status, team activity, blockers, or decisions. The vault
                                synthesizes answers from everything the team has captured — across all contributors,
                                all projects.
                            </p>
                            <div className={styles.queryGrid}>
                                <div className={styles.queryItem}>What are the team&apos;s current blockers?</div>
                                <div className={styles.queryItem}>Which projects are waiting on external approvals?</div>
                                <div className={styles.queryItem}>What decisions have been made on VicFlex this quarter?</div>
                                <div className={styles.queryItem}>Who is working on 300BAR and what&apos;s the current status?</div>
                                <div className={styles.queryItem}>What did the team accomplish this week?</div>
                                <div className={styles.queryItem}>Are there any items that have been waiting longer than a week?</div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <h3 className={styles.subsectionTitle}>Adding sources to the knowledge base</h3>
                            <p className={styles.bodyText}>
                                Drop a document into the vault and tell Claude what it is — an FM approval report,
                                an internal test summary, a customer spec. It gets indexed and becomes searchable
                                context for the whole team.
                            </p>
                            <div className={styles.sayThis}>
                                <div className={styles.sayThisLabel}>Say this</div>
                                <div className={styles.sayThisBubble}>Ingest this — it&apos;s the FM approval report for the K17 deflector from last quarter.</div>
                            </div>
                            <div className={styles.comingSoon}>
                                <strong>Coming soon.</strong> The shared knowledge base layer is in development and
                                will be available in a future update. When it ships, anyone on the team will be able
                                to add sources.
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* ---- Making it Yours ---- */}
            <section id="usage-customize" ref={registerSection('usage-customize')} className={styles.section}>
                <h2 className={styles.sectionTitle}>Making it Yours</h2>
                <div className={styles.roleEyebrow} style={{ marginBottom: 16 }}>For everyone</div>
                <p className={styles.sectionIntro}>
                    Fire Vault adapts to how you work — not the other way around. Each person has a
                    personal workflow file that defines their check-in rhythm, what gets asked, and in
                    what order. You can change any of it, any time, just by telling Claude what you want.
                </p>

                <div className={styles.subsection}>
                    <h3 className={styles.subsectionTitle}>Real example — Chenla&apos;s meeting prep workflow</h3>
                    <p className={styles.bodyText}>
                        Chenla realized he wanted his morning check-in to ask about what meetings he had coming
                        up that day — so he could walk in prepared with a notes template already waiting for him.
                    </p>

                    <div className={styles.chatConvo}>
                        <div className={styles.chatLine}>
                            <div className={styles.chatSpeakerUser}>Chenla</div>
                            <div className={styles.chatMsgUser}>
                                I want my morning check-in to always ask about what meetings I have today. I want
                                to be able to walk in prepared — notes around the topic and a space to capture
                                highlights and action items.
                            </div>
                        </div>
                        <div className={styles.chatLine}>
                            <div className={styles.chatSpeakerClaude}>Claude</div>
                            <div className={styles.chatMsgClaude}>
                                Got it. I&apos;ll add that to your morning check-in — at the start of each morning
                                I&apos;ll ask what meetings you have today, then pre-create a template for each one
                                with an agenda section and a notes space ready to go. Updating your workflow file now.
                            </div>
                        </div>
                    </div>

                    <div className={styles.chatResult}>
                        From that point forward, every morning check-in starts with &ldquo;What meetings do you have
                        today?&rdquo; — and by the time Chenla heads to the first one, a template is already waiting
                        in his meetings folder with space to capture everything.
                    </div>
                </div>

                <div className={styles.subsection}>
                    <h3 className={styles.subsectionTitle}>Other things people customize</h3>
                    <div className={styles.customGrid}>
                        <div className={styles.customItem}>&ldquo;Ask me about my lab schedule at the start of every morning&rdquo;</div>
                        <div className={styles.customItem}>&ldquo;Always include a time allocation breakdown in my EOD&rdquo;</div>
                        <div className={styles.customItem}>&ldquo;On Fridays, give me a summary of the week before asking about tomorrow&rdquo;</div>
                        <div className={styles.customItem}>&ldquo;Keep my check-ins under 5 minutes — only ask what matters most&rdquo;</div>
                        <div className={styles.customItem}>&ldquo;When I mention a test, always ask for pass/fail counts and conditions&rdquo;</div>
                        <div className={styles.customItem}>&ldquo;Remind me to log my LiquidPlanner hours at the end of every EOD&rdquo;</div>
                    </div>
                </div>
            </section>
        </>
    );
}

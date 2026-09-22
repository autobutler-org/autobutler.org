# The Timeline of Human Prompts: Jul 18 – Sep 21, 2026

Source: `$SCRATCH/digests/history-prompts.md` — 948 typed prompts, 129,767 bytes, 28 active days over 10 weeks. Typed prompts only; assistant turns, tool calls and paste contents are absent (25 `[Pasted text …]` placeholders, 2 `[Image #N]`). Counts computed by script over the `### <date> <time> <checkout>` headers. *(inference)* marks my reading, not the file's content.

## 1. Week-by-week timeline

| Week of | Prompts | Median len | Mean len | Checkouts |
|---|---|---|---|---|
| Jul 13 | 9 | 63 | 81 | autobutler 9 |
| Jul 20 | 5 | 43 | 119 | autobutler 5 |
| Jul 27 | 1 | 113 | 113 | autobutler 1 |
| Aug 10 | 42 | 68 | 85 | autobutler 42 |
| Aug 17 | 20 | 97 | 123 | quark 8, quark.autobutler.org 12 |
| Aug 24 | 253 | 60 | 107 | quark 137, quark-2 76, iac 31, quark-3 9 |
| Aug 31 | 156 | 61 | 116 | quark 104, quark-2 35, quark-3 17 |
| Sep 7 | 191 | 61 | 90 | quark 121, quark-2 44, quark-3 26 |
| Sep 14 | 226 | 65 | 109 | quark-2 91, quark 80, quark-3 55 |
| Sep 21 (partial) | 45 | 89 | 146 | quark 22, quark-2 17, quark-3 4, quark.autobutler.org 1, autobutler.org 1 |

Checkout totals: quark 472, quark-2 263, quark-3 111, autobutler 57, iac 31, quark.autobutler.org 13, autobutler.org 1.

Busiest days: **Sep 10 (87)**, **quark-2/quark-3 peak Sep 11 (80)** and **Aug 28 (80)**, then Sep 14 (74), Aug 31 (70), Sep 18 (68), Sep 19 (63), Aug 27 (62), Aug 25 (60).

Themes: iOS/Xcode + the rename (Jul); in-document search and find-bar UX (Aug 11–14); site rebrand to Vue + Quark (Aug 21); App Store/TestFlight plumbing (Aug 24–25); folder-upload concurrency, `cirrus`→`files`, and the `iac` Terraform/headscale repo (Aug 27); backend cleanup epic #1661 (Aug 28–29); Google Play release and zip/Deflate64 (Aug 31); Flutter widget-library refactor #1600 (Sep 3–4); account deletion + migration numbering (Sep 4–5); issue triage and the Docker container (Sep 9–10); Tailscale auto-provisioning (Sep 11); transcoding jobs, multi-user design, armbian image (Sep 14–15); multi-user "waves" of stacks (Sep 17–19); perf regressions and quark-switcher UX (Sep 19–21).

**Hours worked.** Prompts land in every hour except 02:00–05:00. Peak is 12:00 (130 prompts), then 13:00 (95), 11:00 (69), 00:00 (68), 14:00 (68), 16:00 (68), 23:00 (65), 18:00 (62). The 00:00 spike is real late-night work (Aug 26, Sep 10–11, Sep 15, Sep 18–19 all start after midnight). Two early-morning sessions exist: 06:08–07:16 on Jul 25 (the rename brainstorm) and 07:48–09:58 several weekdays. *(Inference: this is a nights-and-midday pattern, not a 9–5.)*

## 2. The autobutler era (Jul 18 – Aug 14), 57 prompts

Five sessions, all in one checkout named `autobutler`:

- **Jul 18, 18:35–18:51 (9)** — iOS device deployment. Opens `/model opus`, then a pasted *"The sandbox is not in sync with the Podfile.lock."* The instructive turn is the generalization reflex: *"Should we add pod install to the Makefile somewhere? If so, also update the ios dev instructions at the run step…"* → *"Make it part of 'tidy' on macos"* → *"Make it part of 'tidy' for the frontend on macos"* → *"Add that to the troubleshooting and make sure it is tracked as a thing you have to temporarily enable."* Every debugging session ends in a durable artifact.
- **Jul 25, 06:08–07:16 (5)** — **the rename**. *"Well, it is time. We need to rename our product...as Autobutler is seemingly some car cleaning thing and they have claims on all kinds of stuff. We also can't seem to name an iOS app that or use our org.auatobutler bundle identifier…"* Then *"Croft is already taken, but I sort of hate Steading. Spend a LONG time on this and just dump a ton of options into a file for us"*, *"Where is the file?"*, *"Move it. Don't commit."*, *"Don't even exclude it dude. I will be smart"*. **"Quark" is never named here** — the file jumps to Aug 21 with the checkout already renamed.
- **Jul 27, 22:07 (1)** — iOS emulator error. **Aug 11, 00:37–01:05 (5)** — `make check` failures, then the first PR-URL prompts: *"Is this branch relevant anymore after this merged? …/pull/1498"* / *"Ignore it. Work on this now: …/pull/1495"*.
- **Aug 13–14 (37)** — the longest autobutler session: docs-page search, then the find-bar. The mature loop is born here: reading the network tab for the agent (*"returns an HTML response, showing we did not hit the expected backend"*), offering DB access (*"Feel free to use the sqlite file for this"*), scoping (*"Go ahead and enable 1 here, then file a followup to do 2 and 3"*, re-sent a minute later as *"Do all 3 together here. We want this one to be the branch that enables the feature"*), the **first worktree instruction** (17:04, *"Do this test in a new branch/worktree though. Don't pollute it here."*), API-contract thinking (*"we literally have a swagger doc generated for the backend all the time. Why not just consume that?"*), and PR hygiene (*"Now update our PR title and body to describe what we have done"*).

**How this era differs.** Median length is nearly the same (68 vs 64 chars) but the content differs: only 1 of 57 autobutler prompts references a GitHub issue (2%) vs 10–14% later. No stacks, no `gh-stack`, no subagents, no mass-rebase commands, no parallel checkouts, no `/resolve-issue`. The unit of work is **a branch already checked out**, described in prose; later it is **an issue URL**. Conversational debugging, then dispatch.

**Rename surfacing.** Jul 25 = the decision. Aug 14 15:56 is the last `autobutler` prompt; Aug 21 00:18 the first `quark` one, already pointing at `autobutler-org/quark`. The tail runs a month: Aug 21 10:28 *"…the same product from the page here, but renamed to Quark"*; Aug 24 16:06 *"Is 'Quark by AutoButler' going to be the name when they install it to their phone then, or 'Quark'"*; Aug 25 23:39 *"https://quark.org/support needs to be https://quark.autobutler.org/support"*; Aug 28 16:50 *"We changed the name, and forgot to change 'abdoc' and 'absheet'… our backend should expect 'qdoc' and 'qsheet'"*; Sep 21 11:44 *"I don't want it named ai.quark.plist. It should likely be org.autobutler.quark.plist."*

**Birth of quark-2/quark-3.** Both appear **Aug 27**: quark-2 at 15:48, quark-3 at 15:53, while `quark` was mid-task at 15:44. The three prompts are `Do issues/1623` (quark), `Do issues/1625` (quark-2), `Do issues/1629` (quark-3) — three independent issues fanned out at once. quark-3 got the *bigger* job: *"This is a very complex feature. I would appreciate you stacking the PRs, rather than doing this all in one… Since you have the API contract in front of you, you should be able to develop these in parallel."* The checkout-as-parallelism idea is stated outright Aug 28 12:16: *"Yeah go ahead and do it in a subagent in quark-3 at ~/github.com/autobutler-org/quark-3"*.

## 3. Evolution of prompting style

Length stays flat — median 68 chars (autobutler) vs 64 (Quark); mean rises 88 → 108 on a handful of long design prompts. 300 of 948 (32%) are ≤40 chars; only 20 are ≥500. Bimodal *(inference)*: short dispatch/steering commands plus rare 800–2,600-char design essays (longest: Sep 3 17:36, 2,623 chars).

**Issue numbers / URLs.** 128 prompts contain a github.com URL; 73 reference an issue, 47 a PR. Issue-reference share by week: 0, 0, 0, 2, 10, 10, 6, 14, 3, 0%. The idiom crystallizes Aug 21 as *"Do this issue: <url>"*, later compressed to bare *"Do <url>"*.

**Slash commands** (35 prompts total, every distinct one): `/model` 11 (6× `fable`, 5× `opus` — no sonnet or haiku ever), `/resolve-issue` 7, `/btw` 6, `/login` 2, `/compact` 2, `/plugin` 2 (`/plugin marketplace add DietrichGebert/ponytail` then `/plugin install ponytail@ponytail`, Aug 28 13:21), `/mcp` 2, `/auto-mode-setup` 1, `/upgrade` 1, `/insights` 1.

**Absent keywords:** "ultracode", "ultrathink", "plan mode", "TDD", "hook(s)", "sonnet", "haiku", "sable" — **zero each**. The workflow vocabulary is instead *stack* (70), *merged* (68), *rebase* (48), file/make an issue (36), *gh-stack* (7).

**Terse follow-ups.** 117 prompts are ≤12 characters: `yes` ×16, `yes please` ×9, `please do` ×5, `merged.` ×5, `rebase` ×5, `merged` ×3, plus `go for it`, `do it`, `try again`, `sure`, `you do it`, `1`, `continue`, `clear` ×2.

**Refinement resends.** 33 times he re-sends the previous prompt with detail appended — Aug 27 16:11 *"Separate commits"* → *"Separate commits, same pr"*; Aug 31 09:51 the Android release plan re-sent with the workflow_dispatch clause added. *(Inference: Enter pressed early, then corrected.)*

## 4. Taxonomy of prompt types

Counts from a heuristic single-label classifier (categories overlap; treat as approximate):

- **Git/PR/stack ops — 152.** *"Commit, push, and update the PR"* (Aug 14 14:44); *"can you go through EVERY open PR now and rebase all of them off of the newest main? Don't ask me anything. I am walking away."* (Aug 25 17:07); *"Make it an actual stack with the gh stack extension dude"* (Sep 3 20:51).
- **Question — 160.** *"Do we have any idea how Google handles directory uploads in Google Drive? Do they abuse websockets or something?"* (Aug 27 09:32); *"what is the memory consumption if I try to transcode a large file? For example, say I have a 14GB video."* (Sep 14 14:52).
- **Issue management — 54.** *"Make a separate issue for implementing a chunked upload thing later."* (Aug 27 09:39); *"Close 742, 952, 881, 1169, 1234"* (Sep 10 00:18).
- **Infra/deploy — 45.** *"I also want a set of github workflows for this. A check.yml … a plan.yml … an apply.yml"* (Aug 27 17:51); *"how do we push to ghcr in release-docker?"* (Sep 10 12:34).
- **Bug report — 44.** *"Clicking the find bar icon does not bring up the find bar, but CMD+f does"* (Aug 14 12:50); *"whenever a qsheet saves, a single letter is removed from it's filename"* (Sep 4 17:06).
- **Approval — 38** (plus most of the 117 terse prompts): *"Go for it"*, *"yes"*, *"Please do."*
- **Issue-pointer dispatch — 35** (*"Do …/issues/1597"*). **Meta/tooling — 35** (all slash commands).
- **Feature request — 28.** *"It is time to allow for multi-user setup…"* (Sep 14 12:04, 1,238 chars); *"I want a local build of quark, for my mac, using the same commands that goreleaser uses"* (Sep 21 11:39).
- **Design/UX — 28.** *"It would be great if 'upload folder' was no different than 'upload file' in the UI"* (Aug 26 14:21); *"the progress bar under the 'Starting your quark...' should be throbbing… a 'beam' going side-to-side"* (Sep 21 10:56).
- **Explicit steering/correction — 23** (§6). Remaining ~306: short steering/status statements ("Merged.", "Rebase off of main. We added a new migration.").

## 5. Interleaving: driving 2–3 checkouts at once

- 14 of 28 active days touch ≥2 checkouts; **10 touch ≥3** (Aug 27, Aug 31, Sep 4, 9, 10, 11, 14, 18, 19, 21).
- **134 consecutive prompt pairs sit in different checkouts <2 minutes apart** — live context-switching.
- Of 201 distinct 30-minute windows, **65 (32%) contain more than one checkout**; 20+ contain three.
- Tightest: Sep 10 12:43 — the same release-docker instruction typed into quark-2 and quark within one minute; Sep 14 14:37 — `/resolve-issue …/1851` in quark plus the identical *"Rebase off of main. We added a new migration."* in quark-2 and quark-3, all at 14:37.

**Representative hour — Sep 11, 00:00–01:01 (27 prompts, all three checkouts):**
00:00 q3 "Make the PR when it is done" · 00:12 q2 "Fix …/issues/1573" · 00:16 q2 "yes" · 00:22 q3 "Rebase" · 00:25 q3 "Point out this is noticeably faster" · 00:28 q2 "Do …/1829" · 00:28 q3 "Do …/1568" · 00:29 q "I think …/1043 is fixed" · 00:30 q "Close it as a won't fix" · 00:30 q "I believe we thought about this before: …/1014" · 00:33 q3 "Make the PR" · 00:36 q3 "Thoughts on …/1014?" · 00:36 q "Make sure this is a gh-stack when done" · 00:36 q "Make sure to rebase off of main btw. A lot has merged." · 00:37 q2 "/insights" · 00:39 q3 "…could we potentially just do the rotation at the point of download?" · 00:41 q3 "let's mark on the issue that we just set the orientation bytes" · 00:43 q3 "Consider your insights feedback here: ~/.claude/usage-data/report-…html" · 00:44 q "Can we have this PR in the quark dir?" · 00:47 q2 "Fix merge conflict: …/pull/1847" · 00:47 q3 "Make a PR for this" · 00:47 q "Rebase the whole stack on main please" · 00:51 q trash-view UX note · 00:52 q2 "I thought we had libheic for that reason though?" · 00:53 q3 "…most of these sub-issues are not refactoring fixes really?" · 00:54 q3 "yes, detach them and close the epic" · 00:55 q2 "Make an issue for it" · 01:00 q2 "/resolve-issue …/1355" · 01:01 q2 "Oh I see, thank you."

At 00:36–00:47 `quark` takes four instructions in eleven minutes while quark-2 and quark-3 each take three: three agents running, the human round-robins.

## 6. Corrections, frustration, delight (verbatim)

**Corrections / reversals:** 07-25 07:16 "Don't even exclude it dude. I will be smart" · 08-11 01:05 "Ignore it. Work on this now:" · 08-21 10:12 "Scratch that. I changed the Makefile already." · 08-25 13:44 "Actually, don't bother the paths filter. Our CI is free" · 08-25 16:25 "Can we please not just add javascript to our whole system? Can't you just use bash and jq?" · 08-25 16:32 "Nah, screw that. I like ours" · 08-25 17:28 "You have the wrong dart/flutter version on that branch, so it formatted files for no reason. Only do the workflow changes" · 08-25 22:46 "Make the PR dude. Don't do these weird extra steps" · 08-28 13:37 "let's be careful about giving 'direction'al guidance to the user like this" · 08-28 18:35 "don't just 'mention' things, make them real sub-issues" · 08-28 18:43 "Don't do the work yet. Just wanted you to prep the epic" · 08-31 11:31 "io.ReadAll seems like a bad idea. We should be receiving a reader, not a fully-allocated byte array." · 08-31 14:08 "Stop the build please" / "I just wanna try the build myself first" · 09-03 17:55 "the subagents you are writing should use opus, not fable" · 09-03 20:51 "Make it an actual stack with the gh stack extension dude" · 09-04 17:10 "Why are we substringing and not splitting from the back or something?" · 09-04 22:27 "Bro just fix it" · 09-10 12:04 "Eh, stop the ephemeral port thing." · 09-10 12:43 "Sorry, ignore the release-docker thing" · 09-10 13:02 "Hmmmmmm I don't think you fixed it at all actually." · 09-14 13:03 "Nah, I like the current design of a sibling file" · 09-19 13:09 "I think this is the wrong requirement… The folder is not the source of truth" · 09-19 13:17 "Hold on, I may have merged without that change." · 09-21 11:58 "Nah just make it a loose issue. All good."

**Frustration:** 08-13 17:09 "Literally is not working though...even after a rebuild." · 08-24 16:17 "Okay this is so shitty lol." · 08-24 16:19 "Somehow you effed up the actual build and did a debug flutter build" · 08-25 14:15 "you push dude" · 08-25 16:33 "Sort of hate that the pubspec.yaml now can drift from the tagged version" · 08-28 13:15 "/btw why is this taking so long dude?" · 08-31 19:04 "I don't want a sycophantic answer" · 09-04 18:32 "Dude check-misc failed" · 09-09 23:12 "it seems to have done literally nothing to fix the actual problem" · 09-10 11:49 "I sort of hate the single RUN command in the fetch stage" · 09-10 13:17 "Did we really need to fork this? Yikes." · 09-11 12:28 "The UX… is still crap" · 09-18 22:08 "I see 'users/' as my top-level folder. That is sort of horrible UX." · 09-18 22:11 "Making a user WITHOUT a user directory is sort of retarded." · 09-19 13:03 "What the heck is going on?" · 09-19 14:52 "painfully slow on it's own" · 09-21 12:15 "Remove that ugly thing."

**Delight:** 08-14 13:29 "Nice! One more thing" · 08-26 12:06 "Awesome job . Make the PR" · 08-26 12:14 "Nice! Works great." · 08-27 08:03 "Works great! Few things though" · 08-27 16:49 "Merged. Thanks." · 08-29 09:50 "All works great! Now, do the hard work of getting the whole stack green." · 09-01 18:09 "Wow this was much better! Love it." · 09-09 23:20 "that browser repro feels awesome and exactly as expected" / 23:21 "It does feel very snappy" · 09-10 13:35 "It works!" · 09-11 01:01 "Oh I see, thank you." · 09-14 12:25 "Very good job. I agree with all of your considerations." · 09-14 15:43 "Great job! Only problem I see is" · 09-19 15:06 "good job. the managed device caching made wandering around the app SO much faster." · 09-21 11:02 "Push to PR. It is great." · 09-21 11:48 "I think a real switcher would be amazing."

Praise is nearly always followed by the next defect in the same message.

## 7. Engineering-practice mentions (counts; full verbatim lists in §6 and above)

**tests** 31 — Aug 13 17:04 *"Do this test in a new branch/worktree though. Don't pollute it here."*; Aug 27 15:53 *"One PR for the backend portion, with even integration tests that generate a large file that requires multiple parts"*; Sep 10 00:18 *"Seems we have a flaky backend unit test"*; Sep 15 17:38 *"For each stack, what should me specific test plan be? Let's walk one at a time."*; Sep 18 21:41 *"skip ALL the local tests and checks. Just rebase and push them all."*; Sep 19 14:59 *"Consider that our perf tests did not catch the file performance regression."*; Sep 21 10:07 *"Review this code change. Add it to the test suite in CI as well."*
**lint/format/spelling** 14 — Aug 21 09:13 cspell + *"Convert all en-GB spellings to their en equivalents, like behaviour -> behavior"*; Aug 27 17:51 check.yml; Aug 27 19:04 `.markdownlint.yaml`; `check-misc` failures Aug 31 ×2 and Sep 4 (*"Dude check-misc failed"*).
**CI** 33 — Aug 25 13:44 *"Our CI is free"*; Aug 25 13:37 ci-ios job; Aug 27 18:07 *"Let's only apply from CI"*; Sep 5 00:24 *"a CI rule to make sure it never happens again"*; Sep 21 12:42 ARM runners.
**coverage** 1 (Sep 3 20:49). **review** 3 — Aug 27 18:27 *"Review this and double-check it's claims. I think it was made on a stale main"*; Sep 5 00:06; Sep 21 10:07. **security** 3 — Aug 14 13:47 *"Why did the security check fail?"* then 13:49 *"Yeah ignore it"*; Aug 28 18:18 *"file the oauth thing as a security ticket"*; Aug 31 19:04 (vuln upkeep as a framework criterion). **static analysis** 1 (Sep 21 blog brief). **hooks, TDD, ultracode, plan mode, sonnet, haiku, sable: 0.**
**AGENTS.md** 10, **CLAUDE.md** 2 — Aug 21 10:33 *"adapt this AGENTS.md to the AGENTS.md I added (but did not commit) and make sure you include the CLAUDE.md too"*; Aug 28 15:38 *"make sure the AGENTS.md provides guidance on how to extend the error class, and to not write error text in-line"*; Aug 31 12:19 *"encode this requirement in our AGENTS.md in a first PR, right now"*; Sep 11 00:43 *"I like basically all the CLAUDE.md suggestions it made and would suggest you put them in AGENTS.md"*; Sep 14 13:30 *"clarify that sub-issues are the standard for linking issues to epics."*
**subagents** 11, **worktrees** 9, **skills** 3 (Sep 3 19:26 Dart package skills; Sep 11 00:43 renaming the `/issue` skill), **memory** 3 (all RAM, not agent memory).
**Models** 15 — only opus and fable ever named. Aug 28 18:43 *"Use Opus for sub-agents and orchestrate their work"*; Sep 3 17:55 *"the subagents you are writing should use opus, not fable"*; Sep 21 10:54 `/model fable` then *"Do this in opus subagents."*
**Openclaw / Discord / bots** — one prompt only, the Sep 21 12:47 blog brief: *"For a while we used Openclaw bots so we could parallelize stuff over Discord, but eventually we moved to local claude usage."* **Exo** — one indirect hit (`exokomodo/template-golang`, Aug 21 10:09). **sable** — none.

## 8. Ten most blog-worthy prompts/exchanges

1. **Jul 25 06:08 + 06:39** — the rename decision, and *"Spend a LONG time on this and just dump a ton of options into a file for us"*. The origin story; the only autobutler-era prompt about product rather than code.
2. **Aug 13 17:04** — *"Do this test in a new branch/worktree though. Don't pollute it here."* The first worktree instruction; the seed of everything after.
3. **Aug 25 17:07** — *"…rebase all of them off of the newest main? Don't ask me anything. I am walking away."* The trust threshold, stated explicitly, one week into Quark.
4. **Aug 27 15:44/15:48/15:53** — three issues dispatched into three checkouts in nine minutes; quark-2 and quark-3 are born. The parallelism thesis in raw form.
5. **Aug 28 18:09 (995 chars)** — backend-cleanup brief: strict package-file conventions, "mark for removal", *"Let's not go straight into implementation, but rather store in a github issue."* Structure-as-trust, argued by the user.
6. **Aug 28 18:43** — *"Use Opus for sub-agents and orchestrate their work… Do all of this in one massive Github stack… I want to be able to test the full result of this work on a single branch and then merge it all together."* The stack-as-review-unit doctrine.
7. **Aug 31 12:19** — *"encode this requirement in our AGENTS.md in a first PR, right now. Then you need to run discovery across the codebase finding all cases where this is being ignored as guidance."* Rule first, enforcement sweep second.
8. **Aug 31 19:04** — *"I don't want a sycophantic answer, but I want an honest opinion here. Should we keep the unified Flutter frontend…?"* Architecture consultation with the anti-sycophancy guard typed in.
9. **Sep 3 17:36 (2,623 chars)** — widget-architecture brief: stateless components + controllers, a playground "dev wiki", flutterprobe e2e, *"maybe you and I design some specific subagents first in the .claude of this project."* Longest prompt in the corpus.
10. **Sep 18 22:11 → Sep 19 13:09** — *"Making a user WITHOUT a user directory is sort of retarded."* → *"It should check for the existence of the user in the database, not the existence of the folder. The folder is not the source of truth."* The human catching a modeling error in plain domain language.

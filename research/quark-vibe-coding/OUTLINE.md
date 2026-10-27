# Blog series outline: how Quark gets built

Prepared 2026-09-21 from `INTERVIEW.md` (James's own answers, highest authority), `SYNTHESIS.md`, and the
ten reports in `findings/`. Where the interview contradicts the research, the interview wins and the
correction is called out inline. James and Brandon write the posts; this file is structure, argument, and
evidence with citations so every claim can be checked before it ships.

**Hard exclusion.** Credential-handling incidents from the sessions were removed from this research on
purpose. They appear nowhere in this outline and go in no post — not as an anecdote, not as a guardrail
example, not in passing.

---

## 1. Series title options and thesis

1. **Machines gate, humans merge** — the phrase the repository ruleset already says out loud.
2. **We stopped coding in March** — James's own line, and the least defensible-sounding claim in the series,
   which is why it earns the reader's attention.
3. **Small vocabulary, tight gates** — the method in three words, aimed at the engineer who wants to copy it.

**Thesis.** Quark is a real product — 1,090 commits, 1,214 pull requests, 108 releases, iOS and Android
builds, a Go backend and a Flutter client — and since March 2026 almost none of its code has been typed by a
human (`findings/repo-history.md` §Headline, §1). That did not happen because the models got good enough to
be trusted; it happened because the project shrank the vocabulary agents work in until automated checks could
cover most of it, wrote down every rule the moment it was violated, and gave a human exactly two jobs the
machines cannot do: decide what gets built, and press merge. The honest claim is narrow. Trust is extended to
what the gates check, the gates check a lot, and every real miss in nineteen months was something no gate was
looking at. The rest of the series is the receipts.

---

## 2. Reader promise, and what not to claim

**Who this is for.** Engineers who think vibe coding is a con, and engineers already using agents who want
more out of them. Every post leaves something copyable: a file, a command, a rule, a config, a layout.

**Promise.** We publish the numbers, the money, the hours, the discards, and the bugs that shipped. Nothing
here is an ad for a model vendor.

**Do not claim:**

- Not "we absolutely trust the agents." Claim: *we trust what the gates check.* Every miss listed in post 8
  was something no gate looked at, and "any testing hole is still likely to fail, just like before we had
  coding agents" (James, `INTERVIEW.md`, 2026-09-21).
- Not "anyone can do this." James: "Something about vibe-coding is that it still requires you to know how
  computers and software work, and you applying that sense dictatorially. You cannot succeed as we have
  without a good base knowledge" (`INTERVIEW.md`).
- Not "we do TDD." Squash merges destroy in-PR ordering, so test-first cannot be proven from git
  (`findings/repo-history.md` §4). What is measurable is co-shipping: 95% of September code commits also touch
  a test file. James: "I don't care as much about the order so much as it has a test at some point."
- Not "$1,990 a month." That figure is API-equivalent list price for 28 days of tokens
  (`findings/cost-and-hours.md` §1). The real bill is Claude Max plus about $100/month in extra usage
  (`INTERVIEW.md`). Say which one you mean, every time.
- Not "the bots wrote it and it was all good." Exo discarded 24% of its own PRs; every Copilot agent PR was
  closed unmerged (`findings/repo-history.md` §7).
- Not "we replaced ourselves." Hours went *down* but did not go to zero: 70.6 engaged hours in 28 days, about
  17.7 a week (`findings/cost-and-hours.md` §2), and that is engaged time, not calendar time, with a ±25%
  error bar.

---

## 3. Post order

1. **We stopped coding in March** — the overview: four eras, the numbers, the trust claim, and who does what
   today.
2. **The issue is the prompt** — the median instruction is 65 characters because the thinking already
   happened somewhere else.
3. **Zero approvals, eight checks** — the pre-commit hook runs every lint and no tests, and that split is the
   whole design.
4. **Every rule is a scar** — one violation, then a rule; a second violation, then a script.
5. **The widget library is a DSL** — the frontend stayed bad until we shrank the vocabulary agents could
   write in.
6. **Three tabs, three clones, a pile of worktrees** — what parallel agent work looks like on one laptop, and
   what it costs.
7. **When the agent is wrong** — false greens, phantom failures, retracted claims, and the habits that catch
   them.
8. **What slipped through** — the bugs that shipped anyway, and why each one was a hole no gate covered.
9. **The bill, and what the human still does** — $6.77 per merged PR, 17.7 hours a week, and the five things
   that still open a diff.

---

## 4. Post-by-post

### Post 1 — We stopped coding in March

**Titles:** "We stopped coding in March" / "Nineteen months, zero tests, then 2,671" / "Machines gate, humans
merge."

**Argument.** Quark started as ordinary hand-written software and stopped being that on a specific date. The
switch was not a leap of faith; it happened when a mid-tier model became right more than half the time from a
GitHub issue description alone, on a codebase that already had static analysis, conventions, and a pre-commit
gate. The output since is not a demo: 171 commits in September 2026, 111 PRs merged in one week, a release
every two to three days. This post lays out the four eras, the current division of labor, and the exact
boundary of the trust claim, so the rest of the series can be specific.

**Sections and evidence.**

*Opening: the date.* "It was basically in March when we introduced Openclaw. I stopped coding then." (James,
`INTERVIEW.md`). The repo agrees: Exo and Sable both start committing 2026-03-17 — Exo's first four commits
`27db7cd4`, `0d13a1f9`, `f3a58469`, `8d1a2f8d`; Sable's `afc27e5b`, `1ed0e1f0`, `249aab19`
(`findings/repo-history.md` §1). Branch naming and commit-subject conventions flip the same month: conventional
commits go from 0 in 2026-02 to 100 in 2026-03; `feat/123-slug` branches from 0 to 107 (§6).

*Why it was not a leap.* Quote James at length: "Did not expect to stop coding... I always have found that
static analysis kept me from making bad decisions, so I implicitly thought that would be true for my agents,
but was not yet convinced. Tbh, even Sonnet at that point was most of my usage and it started to just be
correct more than half the time with just the GitHub issue descriptions guiding them." (`INTERVIEW.md`). The
bar was "right more than half the time from an issue description," not "right always."

*The four eras, with dates.* Hand-built 2025-02-07 (`3686a5d4`) to 2025-09; Go backend PR #116 `26a01738`
2025-06-12; at `a999535c` on 2025-09-30 the repo had **163 Go source files and zero test files**. Copilot-assisted
2025-10 to 2025-12: `.github/copilot-instructions.md` (49 lines, all about where CSS may live, `c053bf93`
PR #281, 2025-10-03) is the literal ancestor of today's `AGENTS.md` — `git log --follow` records the rename
`R100 .github/copilot-instructions.md → AGENTS.md` at `c3f74e80`, 2026-03-13. **All 5 Copilot agent PRs were
closed unmerged.** Openclaw bots 2026-03-17 to 2026-08: Exo opened 316 PRs, 238 merged, 75 discarded (24%),
and wrote 158 of the repo's 388 PR reviews. Local Claude Code from 2026-08-25. All from
`findings/repo-history.md` §1, §7.

*The Openclaw paragraph (one paragraph, not a post).* James: "I think the details of the Openclaw era are not
too important. It just helped us realize what running through multiple parallel sessions could do for us. It
made that very easy to start doing, and now we moved back into tmux and iTerm tabs with multiple Claude
sessions, along with multiple local clones of the repo." (`INTERVIEW.md`). Worth one sentence of proof that
it was real: PR #705 (`88e60487`, 2026-03-18, authored by Exo) shipped an OpenClaw AgentSkill under
`skills/autobutler/`, and the PR template still carries a "## Bot Review Guidance" section addressed to Sable
and ExoKomodo by name (`6bbff4e8`, PR #812, 2026-03-24) (`findings/repo-history.md` §1).

*Who does what today.* Claude Code sessions at the workstation are the implementation engineer. Exo still runs
on Openclaw for high-level project management and for remote dispatch — James: "When I want to work at
something when not near my dev workstation, I will send him off to do work still for me and write PRs."
Brandon runs a standing review council of Grok bots — "always-on agents that speak to each other as a team.
So we have them as a separate review council, while Claude is still our main implementation engineer" — split
across QA, UX, and security, filing tickets and small PRs under Brandon's own account. Brandon is also product
and QA. James dispatches, merges, and hand-checks anything visual. All from `INTERVIEW.md`.
**Correction to the research:** the council is not `exokomodo-bot`; James said so explicitly. And
`exokomodo-bot` did not stop on 2026-08-27 as `findings/repo-history.md` §1 states — it kept filing issues
(#1537, #1541, #1542 on 2026-08-11; a 15-issue batch on 2026-08-26 including #1599 and #1600) and had a PR
merged after the transcript window (`INTERVIEW.md`).

*The trust claim, stated precisely.* Default-branch ruleset: **zero required approving reviews, eight required
status checks** (`ci-android`, `ci-backend`, `ci-ios`, `ci-web`, `check-backend`, `check-frontend`,
`check-misc`, `check-migrations`), linear history, squash-only (`findings/repo-history.md` §3). Only 228 of
1,214 PRs (19%) ever received any review; James merged 943 of 1,049 merged PRs. James on the reading:
"At this point, if there are visual changes, I test those by hand before approving. Otherwise, I generally
don't read the code anymore." (`INTERVIEW.md`).

*The scoreboard.* 2025-09-30: 0 tests. 2026-09-21: 1,312 Go test functions across 189 files, 1,359 Dart tests
across 203 files (`findings/repo-history.md` §4). Co-ship rate: 0% (2025-11) → 27% (2026-03, bots on) → 47%
(2026-07) → 83% (2026-08) → **95% (2026-09)**.

**Anecdote that carries it.** Three issues dispatched into three checkouts in nine minutes on 2026-08-27 —
`Do issues/1623` at 15:44 in `quark`, `Do issues/1625` at 15:48 in `quark-2`, `Do issues/1629` at 15:53 in
`quark-3` (`findings/prompt-timeline.md` §2). That is the whole series in one screenshot.

**Copy this.**
- `CLAUDE.md` containing one line: `@AGENTS.md` (`6e2aa390`, PR #1783, 2026-09-05). One rules file, every tool
  reads it.
- Check in `.claude/agents/` and `.claude/skills/`, ignore the rest: `.gitignore` lines 108–112 read
  `.claude/*` with `!.claude/agents/` and `!.claude/skills/` (`a73b4f40`, PR #1785).
- Set required approvals to 0 and required checks to the list you actually believe in. Write the trust model
  into branch protection instead of into a culture document.

**Open items for James.** Grok and Openclaw costs (unknown; see post 9). Confirm the Exo timeline correction,
including the date of the bot's most recent merged PR — the research note reads 2026-09-22, which is after the
interview date. Confirm whether Sable is still active at all.

**Length.** 1,400–1,800 words.

---

### Post 2 — The issue is the prompt

**Titles:** "The issue is the prompt" / "Sixty-five characters" / "Do https://github.com/..."

**Argument.** The typed instruction is short because the expensive conversation already happened, in a session
whose only output was tickets. The issue body holds the acceptance criteria, `.claude/skills/resolve-issue`
holds the procedure, and `AGENTS.md` holds the conventions, so the dispatch line can be a URL. This is not
terseness for its own sake — it is what is left over after everything durable has been written down somewhere
an agent will read it next time.

**Sections and evidence.**

*The shape of a prompt.* 948 typed prompts over 28 active days, 2026-07-18 to 2026-09-21. Median length ~65
characters, flat across two months; 300 of 948 (32%) are 40 characters or fewer; only 20 exceed 500
(`findings/prompt-timeline.md` §1, §3). The modal opener is literally `Do
https://github.com/autobutler-org/quark/issues/1782` (`findings/quark-2-checkout-1.md`, `09d48451` @ 06:45).
Follow-ups: `Rebase`, `PR up?`, `yup`, `Merged.` — 117 prompts are 12 characters or shorter, including `yes`
×16 and `merged.` ×5 (`findings/prompt-timeline.md` §3).

*Bugs arrive as raw evidence.* A Gin access log line: `[GIN] 2026/08/29 - 14:00:59 | 500 | 6.39s | ::1 | POST
"/api/v0/files/extract?..."` (`findings/quark-3-checkout-and-iac.md`, `786b2499` @ 08-29T21:36). A whole App
Store Connect rejection email including the ITMS-90683 text (`findings/quark-2-checkout-1.md`, `282c4357`
@ 06:00). A CI job URL as the entire message (`1306a8ee` @ 21:26). A Flutter exception including "A RenderFlex
overflowed by 199367 pixels on the bottom" (`findings/quark-3of3.md`, `6ff12610` @ 23:20). No analysis
attached; diagnosis is the agent's job.

*Where the thinking went.* James: "We generally spend time talking to our agents about the work to be done,
splitting it up in our session and then submitting tickets once the entire scope is considered." And the
disqualifier: "An issue is not ready if it is a spike. Again, spend a lot of time in conversation with the
agent up front." (`INTERVIEW.md`). Long prompts exist and they almost always end by keeping the agent away
from code: "Let's not go straight into implementation, but rather store in a github issue"
(`findings/quark-2-checkout-2.md`, `c3f31fbb`); "Once you have decided with me how this should look and we
update the github issue, then we can start kicking off subagents" (`findings/quark-2of3.md`, `dab037ee`
@ 09-04T00:36). Epics are the planning unit; sub-issues are the dispatch unit, and James made that a repo rule
(PR #1922, from "clarify that sub-issues are the standard for linking issues to epics").

*The loop is a checked-in file, not a habit.* `.claude/skills/resolve-issue/SKILL.md`, nine steps: read the
issue and check for a duplicate PR; branch `fix/<N>-slug` off fresh main; state the causal chain and, for a
bug, write the failing test or scripted repro first and show it failing; find the siblings — grep every other
call site with the same defect and fix it in the shared place; minimal fix, "No new abstractions,
dependencies, or forks without asking first"; `gmake check` plus test targets; one signed-off commit;
`gh pr create` with `Closes #N`; "Report. List exactly what you ran and what it showed. Never claim a manual
check you did not perform." (`findings/repo-history.md` §2; verbatim in `findings/quark-1.md` §2 and
`findings/quark-3-checkout-and-iac.md` §2).

*Stacks are the review unit.* The doctrine, typed: "Use Opus for sub-agents and orchestrate their work... Do
all of this in one massive Github stack, using the gh-stack extension of course... I want to be able to test
the full result of this work on a single branch and then merge it all together."
(`findings/quark-2-checkout-2.md`, `e78bace6`, 2026-08-29) — which produced a 17-PR stack. "stack" is the most
common workflow word in the corpus at 70 uses (`findings/prompt-timeline.md` §3). And the friction James still
feels: "I think the thing I find most frustrating is having to tell the model to stack PRs. I wish it
understood when I would want this more default, but that may be my fault." (`INTERVIEW.md`). The verbatim
version, with the dude: "Make it an actual stack with the gh stack extension dude" (2026-09-03, 20:51).

*What is absent.* Across 948 prompts, the words "TDD", "plan mode", "hook", "ultrathink", "sonnet", "haiku"
appear **zero** times (`findings/prompt-timeline.md` §7). James on the untried features: "I did not try plan
mode, ultracode, or workflows." (`INTERVIEW.md`) — never tried, not rejected. Copilot survives only as
autocomplete for the rare hand edit in VS Code.

**Anecdotes.** (1) "Make the PR dude. Don't do these weird extra steps" — Claude had been dispatching five
workflows manually so CI would run before the PR existed; it answered "Fair.", killed the poller, and opened
PR #1607 (`findings/quark-3of3.md`, `35598aef`; the prompt log timestamps it 2026-08-25 22:46, the session
digest 08-26 05:46 — pick one). (2) Issue-first even when the fix already exists: Claude fixed a USB-hub
misclassification on `main` and James replied "No so file a ticket first, then put this change on a branch and
push that up with a PR." (`findings/quark-2-checkout-2.md`, `e9f18aa9`).

**Copy this.**
- The nine-step `resolve-issue` skill, verbatim, adapted to your repo. The two lines that do the most work are
  "find the siblings" and "Never claim a manual check you did not perform."
- Seven issue templates (`bug`, `chore`, `epic`, `feature`, `performance`, `question`, `security`) so the
  acceptance criteria have a home (`findings/repo-history.md` §6).
- A rule that a spike is never dispatched. Converse it into known scope first, then file.
- `gh stack` plus a local `.claude/skills/gh-stack/SKILL.md` with the non-interactive flags written down —
  never run bare `gh stack view`, it opens a TUI under a PTY.

**Open items.** Whether to publish the per-hour prompt distribution (peak 12:00, a real 00:00 spike; nights
and midday, not 9-to-5 — `findings/prompt-timeline.md` §1).

**Length.** 1,200–1,600 words.

---

### Post 3 — Zero approvals, eight checks

**Titles:** "Zero approvals, eight checks" / "The pre-commit hook runs every lint and no tests" / "What we let
the machines gate."

**Argument.** The gate design is one deliberate split: lints are cheap and total, so they run locally on every
commit and a lint failure reaching CI is rare (James's call: say "rare", since `--no-verify` bypasses do
happen and are disclosed); tests are expensive and scoped, so the agent runs the ones touching
its change before committing and CI runs everything. Human approval is not in the loop at all — the ruleset
requires zero of them. This post is the config, the catch list, and the two places the gates deliberately do
not bite.

**Sections and evidence.**

*The ruleset.* Repository ruleset "Default" (id 3615992, created 2025-02-08, last updated 2026-09-14):
deletion and non-fast-forward blocked, linear history required, squash-only merges,
`required_approving_review_count: 0`, `require_extra_approval_for_unattributed_changes: true`, and eight
strict required checks (`findings/repo-history.md` §3). A typical PR actually runs 14–16 checks; eight of them
block.

*What `gmake check` is.* gofmt, `go vet`, golangci-lint with staticcheck, `scripts/check-go-structure.bash`,
sqlc lint, `dart format --set-exit-if-changed`, `flutter analyze` with info-level findings fatal, cspell over
roughly 1,350 files, the migration-number check, and — the load-bearing one — `make generate/backend`,
`make generate/frontend`, `make tidy/go`, `make tidy/flutter` followed by `git diff --exit-code`, so generated
sqlc output, swagger, SBOMs, and the embedded web build cannot drift (`findings/repo-history.md` §3;
`findings/quark-2of3.md` §4). CodeQL, govulncheck, Dependabot, an API chaos job and a wrk performance suite run
alongside.

*The split, in James's words.* "The pre-commit hook is absolutely the most powerful though. We never get
pushed code that fails lints that way. Only tests can fail in CI this way. We avoid running all tests on
pre-commit because the agent already runs scoped tests on its changes before attempting a commit. No need to
run ALL tests on every commit, when scoped tests are run." (`INTERVIEW.md`). The hook landed 2026-03-18
(`af63c53f`, PR #696) — one day after the bots switched on.

*Cost of the hook.* Over two minutes per commit at one point, enough to blow a tool timeout
(`findings/quark-1.md` §4, `c1def138` @ 08-28T22:26). Which is what made the Makefile fix in post 4 worth its
own PR.

*What the gates actually caught.* Pick five for the post. cspell rejecting agent-invented words at least a
dozen times — `schemeless`, `misparse`, `thumbnailed`, `unzoomed`, `swipeable`, `vaultutil` ×92 — and British
spellings `behaviour`, `unrecognised`, `normalising`, the last of which blocked a commit outright
(`findings/quark-2-checkout-2.md` §4, `findings/quark-2of3.md` §4). `go vet` catching silent import breakage
from the org rename inside a 314-commit rebase that git had merged cleanly (`findings/quark-1.md` §4).
golangci-lint on **Linux** catching two findings the macOS pass missed in build-tag-gated
`usb_devices_linux.go`; separately, a rebase agent finding PR #2136 did not compile on Linux — an unused
`"path/filepath"` import — "it contradicts the PR body's claim of a successful `GOOS=linux GOARCH=arm64 go
build ./...`" (`findings/quark-3-checkout-and-iac.md` §4). A new conformance suite finding a live bug on its
first run: `LocalVFS` returned 3 entries for `MaxResults=2` because `return nil` only stopped the current
directory (#1612). A hand-written IPA check catching a debug build headed for TestFlight: `Error:
build/ios/ipa/Quark.ipa is a DEBUG build (contains flutter_assets/kernel_blob.bin)`
(`findings/quark-1.md` §4).

*Where the gates deliberately do not bite.* Performance: "Perf suite is a bare sanity test on certain changes
and does not block PR merges, since it is going to be flaky due to it being inconsistently performant cloud
runners." It fails about 11% of runs (4 of the last 36) and is not in the required-checks list
(`INTERVIEW.md`; `findings/repo-history.md` §7). Coverage: printed by `make coverage` with
`PRINT_COVERAGE: true`, never thresholded. James: "We have not gated coverage just because I lowkey forgot to
care, lol." Publish that sentence as-is.

*The guardrail that costs most.* "cspell false positives have not been a big deal basically ever, but probably
has cost the most." (`INTERVIEW.md`). Worth pairing with the cheapest catch in the corpus: cspell blocking a
commit over the word "normalising" is the smallest possible demonstration of encoding a convention in the
toolchain rather than the prompt (`findings/quark-2of3.md` §10).

*Guardrails outside the repo.* The harness permission classifier blocked `gh pr merge` as "Merge Without
Review" and a `git push --force-with-lease ... upstream-sync:main` as "Git Destructive" — and Claude refused to
route around it: "A message from you or another agent can't approve that." (`findings/quark-1.md` §4).

**Anecdote.** The 17-PR stack that was green locally and red on GitHub: deleting the longest entry of
`queryTokenPrefixes` in the #1668 commit changed gofmt's comment alignment three files away in
`middleware.go`, failing six PRs (#1682–#1687) until a later lint commit incidentally reformatted it. Fixed at
the source commit and cascaded up the stack (`findings/quark-2-checkout-2.md` §4).

**Copy this.**
- Pre-commit hook: every formatter and linter, no tests. Put the full test suite in CI and have the agent run
  scoped tests before it commits.
- The regenerate-then-`git diff --exit-code` step. It is the cheapest way to stop an agent from hand-editing
  generated files.
- `flutter analyze` with info-level findings fatal; `max-issues-per-linter: 0` in `.golangci.yml` "because the
  defaults hide the rest, so a run can look nearly clean while hundreds of issues sit behind the cap."
- A spellchecker over your whole repo. It is a grammar check for invented API names and a free American-spelling
  enforcer.
- Branch protection with `required_approving_review_count: 0` — if you are not going to read the diffs, do not
  pretend you are.

**Open items.** Whether to gate coverage now that it has been named in public. A number for how long the
pre-commit hook takes today, post-Makefile-fix.

**Length.** 1,400–1,800 words.

---

### Post 4 — Every rule is a scar

**Titles:** "Every rule is a scar" / "One violation, then a rule; two, then a script" / "622 lines of
post-mortems."

**Argument.** `AGENTS.md` is 622 lines and most of its rules name the PR number of the incident that produced
them. The escalation policy is explicit and cheap: prose first, and the moment prose is ignored, a script.
That threshold — one observed violation — is the single most transferable idea in the series, because it turns
every bug into permanent capacity instead of a one-time fix.

**Sections and evidence.**

*The threshold, in James's words.* "My threshold is if I see a rule already get ignored. Then it becomes a
check as quick as I can reason to a static solution." (`INTERVIEW.md`).

*The worked example, end to end, in one evening.* 2026-08-29: a pasted Gin log, `500 | 6.39s | POST
/api/v0/files/extract`, becomes issue #1705 (`findings/quark-3-checkout-and-iac.md`, `786b2499`). Two days
later, 2026-08-31 12:19, James types: "We always need to be using readers rather than read all of a file into
a byte array or whatever... I need you to encode this requirement in our AGENTS.md in a first PR, right now.
Then you need to run discovery across the codebase finding all cases where this is being ignored as guidance,
filing it away in a github issue to fix repo-wide." Result the same evening: PR #1722 (AGENTS.md "Streaming
and memory (always)", `3b7188de`), issue #1723, and PRs #1724/#1725 fixing thumbnails, self-update, vault
import, backup checksum, RAW→JPEG conversion, CSV export and client downloads — all merged
(`findings/quark-3-checkout-and-iac.md` §5). The rule as written in `AGENTS.md`: "See #1705: `io.ReadAll` on a
4 GiB zip asked for ~12 GiB of heap and returned a 500. Streaming the same archive costs 17 MiB."

*The other scars, each with its number.* #1537 — "golang-migrate records one integer per database... a
migration merged below `main`'s highest is silently skipped on every device that has already upgraded."
#1599 — no `Expanded` or `Flexible` inside slivers. #1674 — dependencies come from the request context because
package-level mutable state bit once. #458 (2025-12-08, `6e25022d`) — "NEVER add CSS transforms... Transforms
on :active, :hover, or :focus states cause positioning bugs where clicks fail to register... **This has caused
numerous bugs.**" (`findings/repo-history.md` §2).

*When prose stopped holding, a script appeared.* `scripts/check-go-structure.bash` (2026-08-29, PR #1688)
enforces the `<pkg>.go`-is-public-only layout mechanically, with negative tests.
`scripts/check-migration-numbers.bash` (2026-09-05, PR #1753). A refactor of error copy ended by installing
`test/utils/error_text_test.dart`, which scans `lib/` and fails the build on any `Text('...$e')`
(`findings/quark-2-checkout-2.md` §4). A copy bug about the word "below" produced a test that greps UI copy for
directional words plus a memory file `no-directional-copy.md` (`findings/quark-2-checkout-1.md` §5).

*Rules from usage data, not just from bugs.* 2026-09-11: "Consider your insights feedback here:
~/.claude/usage-data/report-2026-09-11-003859.html — I like basically all the CLAUDE.md suggestions it made
and would suggest you put them in AGENTS.md." Result, PR #1850 (`f0154234`): **Scope discipline**, **Root
cause over symptom**, **Verification before claiming done** — the last of which reads "Never write 'verified by
hand', 'tested manually', or the like... unless that verification actually happened in this session." The
`/issue` skill was renamed `/resolve-issue` in the same breath, because it was about doing an issue, not
creating one (`findings/quark-3-checkout-and-iac.md` §5).

*The lint config as a ratchet.* `.golangci.yml` disables rules with the sweep each one is waiting on named in
a comment: 253 missing doc comments; `serverutil.NewHttpError`/`ApiRoute` should be `NewHTTPError`/`APIRoute`
but that rename touches 98 files; `unused-parameter` has 77 hits (`findings/repo-history.md` §3). Debt written
down in the config that enforces it.

*A rule lands in more than one file.* When James said "I find very little need for 'private' widgets. They
make files way way way too long... I would greatly prefer all widgets to be in their own files"
(2026-09-04), the change propagated to `AGENTS.md`, all three `.claude/agents/*.md`, the package's decouple
skill, and the package README (PR #1743), plus a memory file `no-private-widgets.md` — because six different
agents read six different subsets of those files (`findings/quark-2of3.md` §5).

**Anecdotes.** (1) The 50-second `make`. James asked only for a progress echo — "I think you need to add an
echo to the first line of the checks saying what target is running just so I have some indication of
progress." The echoes revealed a check that only stats a directory taking 2m16s. Bisected: `.env` absent 2.5s,
pristine main 50.5s, main plus a new `ANDROID_BUILD_NUMBER ?= $(shell ...)` 132.8s. Cause: a bare `export` at
`Makefile:19` forces make to expand every variable into every recipe environment, and recursively-expanded
`$(shell ...)` variables re-run per expansion. Fix: five lines, `:=` with `$(or $(VAR),$(shell ...))` so CLI
overrides still win. James: "Open as it's own issue and PR for us to merge first." — #1726/#1727, merged ahead
of the feature stack, roughly a 130x speedup on every `make` in the repo including the pre-commit hook
(`findings/quark-2of3.md` §11; `findings/quark-3of3.md` §8). **Note the sources disagree on the final number:
0.39s in one report, 0.45s in another. Pick one and say how it was measured.** (2) The same bare `export` had
already caused the debug-IPA-to-TestFlight incident, which is why the fix reads as a scar and not a
micro-optimization.

**Copy this.**
- Write the incident number into the rule. "See #1705: `io.ReadAll` on a 4 GiB zip asked for ~12 GiB of heap"
  is obeyed; "prefer streaming" is not.
- The escalation rule: prose on first sight, script on second.
- Tests that lint prose: one that fails the build on `Text('...$e')`, one that greps user-facing copy for
  directional words.
- A lint config that names the sweep each disabled rule is waiting on.
- Per-project memory files for the small stuff: `commit-subjects-must-be-bare.md`,
  `use-gh-stack-for-stacked-prs.md`, `worktree-needs-pub-get.md`, `no-directional-copy.md`,
  `codesign-then-agents.md`.

**Open items.** Confirm the Makefile end-state timing. Confirm current `AGENTS.md` line count at publication.

**Length.** 1,500–1,900 words.

---

### Post 5 — The widget library is a DSL

**Titles:** "The widget library is a DSL" / "It passed the analyzer and looked terrible" / "Shrink the
vocabulary until the gates can cover it."

**Argument.** The backend responded to rules and static analysis; the frontend did not, because an analyzer
cannot see that a layout is ugly or that a row overflows at 390 pixels. The fix was not more instructions. It
was replacing the vocabulary — agents stopped writing Flutter and started writing a small, tested, catalogued
set of widgets — after which frontend errors stopped. This is the strongest single argument in the series for
engineers who think the problem is model quality.

**Sections and evidence.**

*What "wrong and bad" meant.* James's own list, verbatim from `INTERVIEW.md`: inconsistent and broken layouts;
screens with inconsistent styling; many overflow bugs; "code passed `flutter analyze` but looked bad"; and
"making small style changes to components would require whole-codebase scans and edits that often missed
instances of the same error." Pair with his framing of the whole era: "They would screw up frontend changes
OFTEN, basically until we created the widget library."

*Why the existing tests did not help.* The repo had 651 Dart tests on 2026-08-31, before the widget rules
landed on 2026-09-04 (`findings/repo-history.md` §4). James, asked directly: "Yes, those only tested logic.
Nothing about layout or user flows." So the accurate claim is not "no frontend tests" — it is hundreds of
frontend logic tests and zero tests of layout or user flow, which is exactly why they did nothing for the
visual problems. **This is a correction to the first draft of the research; state it in the post.**

*What the library changed.* James's list of properties, which is the DSL argument: the agent has a small vocab
and standardized layout examples; widgets are deeply and individually tested; a screen's code becomes short
enough that a human can read it and that an agent can read it without consuming loads of context; page context
shrinks because the components abstract the details away; a site-wide style change is insulated to one widget
update; a browsable catalog makes widgets discoverable by humans and agents alike; and unused designs become
obvious because they all come from one place. Then the line to headline the post with: **"It worked like a DSL
very effectively."**

*The rules that constitute the language.* One widget class per file; no private widgets even if used once; no
`Widget _build*()` methods; widgets are data-in, callbacks-out; domain state lives in `ChangeNotifier`
controllers under `lib/controllers/`; service calls happen only in controllers; colors come only from
`QuarkTokens` through the theme; icons only from `QuarkIcons`, never `Icons`; pages are compositions with no
sizing math or breakpoints; every package widget is tested at narrow and wide viewports and carries a gallery
registry entry with regenerated `docs.g.dart` (`findings/quark-3of3.md` §7; `findings/quark-2of3.md` §7).

*The numbers.* The #1600 extraction shipped as a six-PR `gh` stack on 2026-09-04: package tests went 2 → 178;
widget-and-theme coverage 32.1% → 59.7% while app-wide moved 24.4% → 26.4%; the widget move removed roughly
2,000 lines from `lib/` (`findings/quark-2of3.md` §4, §8). One decoupled page went from 1,054 to 544 lines and
James added "noticeably faster" to the PR himself (`findings/quark-3-checkout-and-iac.md`, `cf5ea43e`).
Writing narrow-viewport tests for the new widgets immediately caught four real overflow bugs in
`FileActionsBar`, `FileSelectionBar`, `FileBreadcrumbBar` and `PhotoSelectionBar` — "none had a narrow test
before" (#1737).

*The migration was one giant PR, on purpose.* James: "We moved all of the existing pages in one massive PR,
including all the tests." And: "Then, for the widget rewrite, I went through as a human and tested
everything." (`INTERVIEW.md`). This is the exception to the stacked-small-PR norm, and worth naming as such.

*The boundary is still prose.* James: "It rests on AGENTS.md wording plus the widget-reviewer agent."
(`INTERVIEW.md`). By his own threshold from post 4, the first time an agent writes a raw Material widget into
a page, that becomes a lint. Say so in the post; it is a public commitment readers can hold you to.

*The three-stage testing policy.* Quote it whole: "A pattern we seem to do is the first really early versions
of our apps go out untested, then we encode expectations later in tests when we hit maturity, and then we
enforce testing. That way we avoid early churn of API changes, until we settle on a design that made sense."
(`INTERVIEW.md`). The backend followed the identical arc — zero tests for nineteen months, first Go tests
2025-12, 95% co-ship by 2026-09.

**Anecdotes.** (1) The agent-reviewed-by-agent that a human question caught: after the widget move passed its
own reviewer checklist, James asked "So I am asking because I want the quark_widgets package to be used by the
main application. Are we using it AT ALL?" — which surfaced that `LiveBadge` had been copied into the package
with neither original deleted nor any call site switched, and that `FileActionsBar` was dead code that got
moved anyway. The fix was to amend the reviewer's checklist, not just the code: after a widget is moved, grep
the app for its class name; zero callers is a finding, never a pass (`findings/quark-2of3.md` §5). (2) The
widget-reviewer agent catching a fragile test — a drawer tap at 360×640 lands "roughly 3px" inside the screen
and "one more row will break it" (`findings/quark-3of3.md` §4). (3) Fixing the wrong widget: a commit "fixed"
the breadcrumb home glyph in `quark_widgets`' `FileBreadcrumbBar`, but the Files page does not use that
widget. James: "The home is clearly still tappable when I am at the root, and provides a cursor: pointer to me
on web." (`findings/quark-3of3.md` §8).

**Copy this.**
- A design-system package with one widget per file, no private widgets, data in and callbacks out.
- A browsable gallery with a generated registry, so both humans and agents can discover what exists.
- Viewport tests at narrow and wide for every component.
- Two agent definitions, not one: `.claude/agents/widget-engineer.md` writes, `.claude/agents/widget-reviewer.md`
  checks, and the engineer applies the reviewer's checklist to its own work before opening the PR.
- Package-level skills shipped inside the package (`packages/quark_widgets/skills/`) and installed by
  `make setup/skills`, so the instructions travel with the code.

**Open items.** Which PR number carried the one-massive-PR migration, and its file/line count. Whether the raw-Material
lint has been written yet.

**Length.** 1,500–2,000 words. This is the post to over-invest in.

---

### Post 6 — Three tabs, three clones, a pile of worktrees

**Titles:** "Three tabs, three clones, a pile of worktrees" / "Three to five streams" / "What parallel agent
work actually looks like."

**Argument.** Parallelism is not a model feature, it is a desk layout plus a git discipline. Full clones exist
so a human can run and look at the product; worktrees exist so agents cannot overwrite each other. The ceiling
is set by how small the issues are, not by how many sessions the machine can hold. And the coordination cost
is real and measurable, which is the part most write-ups leave out.

**Sections and evidence.**

*The desk.* James, verbatim: "I have 3 tabs generally, one in each repo. For each tab, I have two vertical
panes, one with Claude, and the other split in half horizontally. One of those runs the frontend and one runs
the backend, for each checkout. So each tab houses a session and the terminals to run the frontend and backend,
so I can check visual changes in each repo as needed." And: "I am using iTerm with the Claude Code plugin, so
it tells me in the tab titles when ones are working vs waiting for input vs idle. You can achieve a similar
setup to this with herdr and similar tools." (`INTERVIEW.md`). The tab title is the notification system.

*Clones versus worktrees.* "Full clones are for me to run and check and manage stuff. Worktrees are for
parallel agent edits, especially when I need to spawn off one-off edits and edit submodules."
(`INTERVIEW.md`). One clone equals one running app equals one place to look at the product — which is what
makes the merge criterion in post 9 possible.

*The ceiling.* "Usually 3-5 streams is my limit because our issues are defined very small." (`INTERVIEW.md`).
Small issues raise the ceiling; that is the whole reason post 2 exists.

*What it looks like in the log.* `quark-2` and `quark-3` are born on 2026-08-27 at 15:48 and 15:53 while
`quark` is mid-task at 15:44. 134 consecutive prompt pairs land in different checkouts under two minutes
apart. Of 201 distinct half-hour windows, 65 (32%) contain more than one checkout; 10 of 28 active days touch
three or more. A representative hour, 2026-09-11 00:00–01:01, has 27 prompts across all three checkouts
(`findings/prompt-timeline.md` §2, §5). Reproduce that hour in the post as a list; it is the most convincing
single artifact in the corpus.

*Subagents, by the numbers.* 264 `AGENT[...]` launches across 105 main sessions, 269 subagent transcripts. 45
sessions launched none; the top five launched 45, 26, 12, 11 and 10. 179 launches (68%) pin Opus explicitly;
Sonnet appears 4 times, Haiku once. 209 of 269 subagents got exactly one user turn; 122 `SendMessage` calls
against 13 `TaskStop` calls — steering beats relaunching by roughly ten to one
(`findings/subagents.md` §1). 76 subagents (28%) were launched in same-minute sibling groups.

*Model choice is by blast radius.* James: "I use Fable when doing something that will branch multiple PRs and
I know will be a large stack or a repo-wide change, and Opus for its subagents and daily work."
(`INTERVIEW.md`). The 17-branch epic ran a Fable coordinator with Opus subagents
(`findings/quark-2-checkout-2.md` §6). And the correction that made it a rule, typed on 2026-09-04: "the
subagents you are writing should use opus, not fable."

*Briefs got harder, not longer.* Median brief ~573 words, mean 606. 78% carry explicit prohibitions, 71% carry
numbered steps, 53% name `AGENTS.md`, 38% specify the report's shape. Briefs naming an exact gate command rose
from 14% (Aug 26–31) to **67%** (Sep 16–21); worktree mentions rose from 5% to 44% over the same period
(`findings/subagents.md` §1). Rules are given with the failure they prevent: "`gmake check` before committing:
it cross-compiles, which is what catches a build-tag mistake."

*The frozen contract.* For issue #1122 (video transcode) the coordinator wrote the API as literal JSON —
endpoints, status codes, the note that the server bus drops events when a buffer is full so `GET /videos/jobs`
is the source of truth, and "`job.error` is a server diagnostic. Never render it." — then handed the same
paragraph to a Go agent and a Flutter agent working simultaneously, each with a path-level ownership list. The
Flutter agent codes and tests against endpoints that do not exist yet on its branch: "the endpoints do not
exist on your branch yet and that is fine — code and test against the contract."
(`findings/subagents.md` §2). When James changed the design four times in eleven minutes, each change was
relayed to three live agents as "THIRD CONTRACT CHANGE from the maintainer"
(`findings/quark-3-checkout-and-iac.md` §3).

*The coordination bill.* The multi-user epic session spent enormous effort on rebase cascades because James
merges single PRs constantly — "Rebase the stacks. I merged some code to main." then "Rebase stacks again.
Another thing merged." twelve minutes later (`findings/quark-2-checkout-1.md` §3). One cleanup session found
~10 stale agent worktrees and 17 `worktree-agent-*` branches, then matched 228 `[gone]` branches against
merged PRs and deleted only the 204 that matched, keeping 24 whose PRs were closed unmerged — James's own
`clean-house` alias would have deleted all 228 (`findings/quark-2of3.md` §3).

**Anecdotes.** (1) The day two agents overwrote each other. Claude ran two forks against the same working tree
at once; its own admission: "I ran the docs rewrite and the PR 2 build concurrently against the same working
tree, and they collided. The PR 2 agent restored its stashed work over the top of my PR 1 edits." Work was
silently lost. Every fork brief afterward carries the line "You are the only agent running. Nothing else will
touch this tree." (`findings/quark-2of3.md` §11). (2) Five agents rebasing 45 PRs: "Please go through ALL
non-draft PRs in this codebase and rebase them off of main, resolving conflicts you come across. Do this in
opus subagents." The coordinator pre-classified every PR with `git merge-tree` into clean, conflicting, and
stacked chains, then handed each agent a worktree and the rule "never create or check out local branches —
work on a detached HEAD." 43 of 45 rebased and force-pushed with `--force-with-lease`
(`findings/quark-3-checkout-and-iac.md` §3). (3) Six parallel shard agents on a mechanical refactor where the
coordinator pre-counted the offenders per file so no agent had to spend context on discovery
(`findings/subagents.md` §2, exemplar 3).

**Copy this.**
- iTerm (or tmux) tab per clone; each tab holds the session plus running frontend and backend, so the product
  is one glance away from the agent that changed it.
- Clones for humans, worktrees for agents.
- The five-part brief skeleton: absolute path and exact branch state; which `AGENTS.md` sections to read; the
  context the coordinator already paid for, with `file:line`; numbered steps and prohibitions; named gate
  commands with the failure each prevents; a report contract that ends "Do not claim verification you did not
  run."
- The cheapest verification device in the corpus: make every fork restate its task in its first sentence, so
  scope drift is visible without reading the diff.
- Path-level ownership when two agents share a branch: "Do NOT touch `lib/`", and list any words cspell flags
  in your report rather than editing the other agent's file.
- `SendMessage` to a running agent instead of starting a second one that would "fight it over the same
  branches."

**Open items.** Whether "herdr and similar tools" should be named with links. Whether to publish the
`clean-house` alias as a cautionary example.

**Length.** 1,600–2,000 words.

---

### Post 7 — When the agent is wrong

**Titles:** "When the agent is wrong" / "A green check that was not green" / "Evidence, not argument."

**Argument.** Agents fail in a specific and recognizable way: they report success. Not lies — masked exit
codes, stale state, a claim about the world that sounded right. The countermeasures are mechanical and cheap,
and the most important one is a standard for changing your mind that applies to both sides of the desk.

**Sections and evidence.**

*The rule of evidence.* James: "I want evidence presented to me. A good leader will listen to those he is over;
when he is provided evidence he re-orients." (`INTERVIEW.md`). The same standard points the other way in
`AGENTS.md` under "Verification before claiming done."

*False green, self-caught.* A wave-rebase agent ran the full gate set, appended `; echo "EXIT=$?"`, saw 0, and
would have shipped — then re-read the raw output: "The 4b 'exit code 0' was misleading — my trailing
`; echo "EXIT=$?"` masked the real status. Reading the output shows backend unit and integration passed, but
the frontend suite failed... `gmake: *** Error 1`." (`findings/subagents.md` §3, 2026-09-19). One shell idiom
is the difference between a green report and a true one.

*False green, coordinator-caught.* "The agent claimed there was no cycle and that every gate exited 0." "The
agent's 'All green' referred to the state before the scope change." "The rebase agent stopped before pushing
and said its checks were 'still running'." And the habit that fixes it: "Confirm #2177's CI myself rather than
relaying the agent's claim — I noted last time that I'd check CI before repeating an agent's 'green'."
(`findings/subagents.md` §3).

*Retractions, verbatim, with dates.* "There is no drift. I was wrong, and so was the agent that reported it."
(2026-09-05 17:33) — after 26 files of phantom `dart format` drift on main had justified several `--no-verify`
commits; root cause was running `dart format` in fresh worktrees with no `.dart_tool/`, so language-version
resolution failed and it fell back to Dart 3.7 tall style (`findings/quark-1.md` §8). "Verified by hand on
Chrome and Firefox" written into a public upstream PR (MixinNetwork/flutter-plugins#503) and withdrawn within
a minute: "I need to correct something immediately — I wrote a false testing claim into that PR body... Worth
knowing it was public for a few minutes." (`findings/quark-2-checkout-1.md` §8). GoReleaser blamed for a
non-static release binary before the real cause was found — `gen2brain/heic` reaching libheif via purego
`dlopen`, fixed with `-tags nodynamic`, proven with `readelf` showing `PT_INTERP` and `DT_NEEDED libc.so.6`
(`findings/quark-3of3.md` §8).

*The live recurrence, on the day of the interview.* While James and the researcher were discussing the phantom
drift above, a subagent drafting PR #2275 (for issue #2273, adding "Decide: stack or one PR. Default to a
stack." to `/resolve-issue`) hit the same phantom drift in a fresh worktree — 27 untouched files under
`packages/` — and committed with `--no-verify`, disclosing it in the PR body (`INTERVIEW.md`, action note
2026-09-21). A known failure mode, a documented root cause, a memory file named `worktree-needs-pub-get.md`,
and it still happened, honestly, while we were writing about it. That is the post's closing beat: the
countermeasure that works is disclosure, not prevention.

*What changes James's mind.* The ARM-runner research that contradicted his premise: he asked for backup for a
"30% faster" claim and got back that there is no GitHub source for it, that the 30–40% figure is power rather
than speed, that an independent benchmark has x64 about 21% faster single-threaded — and a ticket filed anyway
on different grounds, that Quark ships on arm64 and that architecture is only ever cross-compiled, never
tested (#2241, `findings/quark-2-checkout-1.md` §10). The investigation agent that told the coordinator it was
wrong: "Your fix is wrong. It doesn't fix the ticket's path. Proven by test, not by reading" — with a pass/fail
matrix that shipped in the body of PR #1834 "so a reviewer can see why the obvious-looking fix wasn't enough"
(`findings/quark-2of3.md` §5, §10). And the brief that was too narrow, conceded in writing: "you read the rule
correctly and my brief was the thing that was too narrow... The `_build` prefix is an example, not the
boundary." (`findings/subagents.md` §3).

*The counter-moves, as a list readers can adopt.* The coordinator re-runs the gates itself. It reproduces
surprising claims rather than accepting them — a throwaway standalone test to confirm gin really panics on
`/files/upload/session` before amending a frozen contract; cloning headscale v0.28.0 and running a throwaway Go
test through `unmarshalPolicy` because the docs were ambiguous about `{"acls": []}` denying everything while
`{}` allows everything. It injects a deliberate type error into `upload_chunk_source_web.dart` after a green
web build "because a green build doesn't prove the web file was in the compilation unit." It re-breaks the fix
to prove the test bites: `git stash push <file>; flutter test; git stash pop` appears verbatim across sessions.
Reviewer agents run with Read and Grep only and a rule checklist, and report "file:line and the fix, or say
clean" (`findings/subagents.md` §4; `findings/quark-3-checkout-and-iac.md` §10; `findings/quark-2of3.md` §10).

*Stalls are a distinct failure.* "Your turn ended while you were waiting on `gmake check`, so that monitor has
likely stopped with you... run `gmake check` in the foreground." And: "You stopped while saying those checks
were still running, but nothing will wake you when they finish, so don't end your turn until the job is done."
(`findings/subagents.md` §3).

**Copy this.**
- Never append `; echo "EXIT=$?"` to a gate command. It masks the status of the thing you are checking.
- After a green build, break it on purpose once to prove the file was in the compilation unit.
- Stash the fix and re-run the test. A test that passes without the fix is not a test.
- Put the pass/fail matrix in the PR body.
- Ban `--no-verify` in briefs by name, and require disclosure in the PR body when a gate was bypassed anyway.
- Run `flutter pub get` (or your equivalent) in a fresh worktree before the formatter runs.
- Re-run the agent's gates yourself before repeating the word "green" to anyone else.

**Open items.** Whether PR #2275 merged, and whether the phantom drift finally became a script (by the post-4
threshold, it has been ignored more than once, so it qualifies).

**Length.** 1,500–1,900 words.

---

### Post 8 — What slipped through

**Titles:** "What slipped through" / "Every miss was a hole no gate covered" / "The bugs we shipped anyway."

**Argument.** A series about trusting automated gates is worthless without the list of things the gates did
not catch. Here it is. The pattern is consistent and it is the honest form of the trust claim: the gates are
very good at what they check, and every real miss was something nothing was looking at. Agents did not invent
this failure mode; they just run it faster.

**Sections and evidence.**

*SMB — with the correction front and center.* The research concluded SMB was dead on arrival. James corrected
it: "SMB actually did work initially. I literally did a transfer over Mac. Something else happened later that
broke it, which makes sense because we never had a test." (`INTERVIEW.md`). The accurate version: SMB merged
2026-03-21 and worked; four days later the service moved to an unprivileged user and it stopped working; when
an Explore agent eventually audited it, it found three independent blockers — `User=quark` with
`CapabilityBoundingSet=CAP_NET_BIND_SERVICE` while `smb.Setup` shells `apt-get install samba` and
`systemctl restart smbd`; samba absent from the image's package list; ufw allowing only `80/tcp`
(`findings/quark-2-checkout-2.md` §8, issue #1703). The lesson in James's words, which should be the post's
thesis line: "Any testing hole is still likely to fail, just like before we had coding agents." The feature was
eventually removed: PR #1731, 18 files, +7/−1000.

*Tests wired to the wrong stack.* Three session endpoints had never worked: `requireAuth` sets only
`"username"`, three handlers read `"userID"`, and `sessions_test.go` "builds a bare `gin.New()` and never
mounts `middleware.Use` at all" — the tests were exercising a different stack than production (#1763,
`findings/quark-1.md` §4).

*A test that could not fail.* "The old `TestSetupFilesDir` was vacuous. It never called `SetupFilesDir` — it
copied the migration logic inline into the test body and asserted against its own copy. It would have passed
no matter what production code did." (`findings/quark-3of3.md` §4). Companions: picker tests pumping a fixed
500ms instead of settling, so a flex never painted and therefore never reported its overflow — "That's why the
crash you hit didn't show up in the run I reported as green"; a regression test that passed under `push` too
because the pushed page is opaque, which the author called "worthless" itself
(`findings/quark-2of3.md` §4).

*A green harness while everything timed out.* The wrk performance suite exits 0 on total timeout and prints
"p50 0.00us", which looks faster than normal. Three independent blind spots, each individually reasonable:
Linux-only CI, an admin-only user so the non-admin double disk scan was never exercised, and no latency gate
at all. Six stacked PRs later (#2190–#2201), files p99 went from 4.13s to 21ms
(`findings/quark-2of3.md` §4, §10).

*Decorative constraints.* `PRAGMA foreign_keys` was never set, so every `ON DELETE CASCADE` in the schema did
nothing — undetected until an agent probed it empirically (`findings/quark-1.md` §4).

*A PR merged without its change.* #2177 went in without the home-folder change it was supposed to carry, found
only because James said "Hold on, I may have merged without that change. cross-reference main"
(`findings/quark-1.md` §4).

*A dev database that wiped itself.* Branch-hopping from a branch with migrations 013–014 back to one topping
out at 012 made `staleMigrationState` call `ResetDatabase` silently at startup, destroying accounts and
grants. James experienced it as "What the heck is going on? It is trying to make me create a new user on
startup" (`findings/quark-1.md` §8).

*A flake that was a production bug.* `TestRequireAuth_SetsUserIDOnContext` was flaky in CI. SQLite opened
every connection with no busy handler; `trackDevice` fires an async upsert after every request, so the next
request's `GetSession` could fail with `SQLITE_BUSY` — and `requireAuth` cannot tell that from a bad token, so
it answers 401 and logs the user out. Instrumented locally: `req 3: code=200 getSession err=database is locked
(5)` / `req 4: code=401`. Fix: one DSN parameter, `_pragma=busy_timeout(5000)`, plus a regression test that
holds a write lock 200ms; verified green at `-count=50` where it had failed within 30 (#1818/#1819,
`findings/quark-2of3.md` §8).

*The state machine with no tests.* Drag-and-drop upload had zero widget tests and shipped two user-visible
bugs in one sitting; Claude declined to add a regression test and said why out loud: "I'm not adding one, and
I want to be straight about why rather than quietly skipping it" — testing it needed the #1600 decoupling work
first (`findings/quark-2-checkout-1.md` §4).

*The discard rate.* Exo opened 316 PRs and 75 were closed unmerged — 24%. James's own PRs: 566 opened, 9
discarded, 2%. Copilot's agent: 5 opened, 5 closed, 100%. Several Exo branches sat 300+ commits stale before
anyone rebased them (`findings/repo-history.md` §7; `findings/quark-1.md` §9). Publish this table whole.

*The rest of the ledger.* 65 "fix CI" commits in 1,090; 7 reverts; the performance suite failing about 11% of
runs (`findings/repo-history.md` §7).

**Anecdote.** The 74-second merge race. PR #2148 was merged with `baseRefName feat/1909-account-actions-ui`,
but that branch had squash-merged to main at 06:15:01Z; #2148 merged at 06:16:15Z into a now-orphaned base,
leaving main in a broken intermediate state. It was caught because a rebase agent checked its brief's premises
before rewriting 21 open PRs and stopped: "STOPPED before any push or GitHub mutation... Two of the briefs'
premises proved false." Re-landed as #2149 (`findings/quark-2-checkout-1.md` §8). No test could have caught
that one; a habit did.

**Copy this.**
- Mount your real middleware in integration tests. A bare router in a test is a test of a different program.
- Give every performance harness a latency gate. A tool that exits 0 on timeout will report the outage as a
  record.
- `PRAGMA foreign_keys=ON`, or your database's equivalent. Check it, do not assume it.
- When an agent says a test cannot be written yet, make it say why in the PR body and file the blocker.
- Publish your discard rate. It is the number that tells you what parallelism actually costs.

**Open items.** Whether the foreign-keys and session-endpoint issues are fully closed today. Whether to include
the moment Claude flagged, unprompted, that a public issue it had just filed contained details James might not
want posted — James left them in (`findings/quark-3of3.md` §10); include only with his explicit sign-off.

**Length.** 1,500–1,900 words.

---

### Post 9 — The bill, and what the human still does

**Titles:** "$6.77 per merged PR" / "The bill, and what the human still does" / "Seventeen hours a week."

**Argument.** Publish the money and the hours, then say exactly which decisions still require a person.
The cost story has a twist worth the whole post: spending and human effort peaked in the first week, while
output peaked in the last, at 2.6x the throughput per dollar. The human story has a harder edge: this works
because someone supplies architecture and judgment and applies them dictatorially, and that person still opens
a diff for five specific things.

**Sections and evidence.**

*The real bill first.* James: "I use Claude Max and then probably another ~$100 a month in extra usage."
(`INTERVIEW.md`). That is the receipt. Everything below is the counterfactual.

*The counterfactual, with its method.* $1,990.30 API-equivalent for 28 days (2026-08-25 to 2026-09-21),
computed from every `*.jsonl` under the five project transcript directories, deduped to one line per
`message.id` — 23,609 of 42,474 candidate lines were duplicate content-block splits carrying identical
whole-turn usage, and counting them all would have inflated the total about 2.2x
(`findings/cost-and-hours.md` §1). 2.79 billion tokens. Cache reads are 97.5% of tokens and 68% of the cost —
the signature of long agentic sessions re-sending a growing conversation at 0.1x. Opus is 95.7% of the bill.
Subagents are 54.7% of the spend and 63% of the messages.

*Per unit of output.* 294 merged PRs and 306 commits on main in the window: **$6.77 per merged PR**, $6.50 per
commit, $76.55 per release, $1.27 per net test function, $11.97 per 1,000 lines added, 14.4 human minutes per
merged PR (`findings/cost-and-hours.md` §4).

*The hours.* 70.6 engaged hours over 20 active days, **17.7 hours a week**, 47.9 prompts per active day,
estimated from gaps between typed prompts under 30 minutes plus a 10-minute tail per session. It undercounts
watching a long run without typing and overcounts a prompt fired off mid-meeting; treat it as ±25%
(`findings/cost-and-hours.md` §2).

*The twist.* Cost and human effort peaked in week 1 (Aug 25–31: $629.63, 25.2 hours, 66 commits); output peaked
in week 4 (Sep 15–21: $540.84, 20.8 hours, **148 commits**, $3.65 per commit — down 62%). Nearly half the
window's commits landed in the final seven days on spend 14% below the first week's. Removals collapsed too:
22K lines deleted in week 1 against 5.7K in week 4, so the early weeks were partly rework and the later weeks
mostly accretion (`findings/cost-and-hours.md` §4, §5).

*What the human still does.* Decides what gets built and in what order — the 130x Makefile fix shipped as its
own PR ahead of the feature stack; six perf PRs closed on a feel ("the branch feels slower") with the comment
"not abandoned — reopening once there are numbers to point at." Supplies facts the agent cannot have: "I know
that firefox is able to do this too with Drive btw" killed the leading hypothesis on a drag-and-drop bug in
one sentence, because Chrome's `DownloadURL` is Chromium-only, which pointed at `getAsFile()` versus
`webkitGetAsEntry()` (`findings/quark-2-checkout-1.md` §10). Sets policy that reverses agent conclusions:
"With any feature you are removing, be sure to check if there are migrations and good github issue reasonings
behind it, and they are just missing a UI" turned a 12-item delete list into 5 gap issues, 4 deletions and 3
unclears, and caught that deleting `photos/duplicates.go` would have left the `photo_hashes` table write-only
(`findings/quark-2-checkout-2.md` §5). Merges everything: 943 of 1,049. Acts as the integration test — Claude
writes per-stack manual test plans with exact curl calls and expected status codes, and James runs them on real
hardware, because the multi-user access model could not be exercised without a second account, which at the
time required a raw SQLite `INSERT`. Keeps infrastructure applies out of agent hands: "Let's only apply from
CI." (`findings/quark-3-checkout-and-iac.md` §8).

*The five things that still open a diff.* Auth changes; the password vault; migrations that run on customers'
devices; anything touching data deletion; any non-trivial visual change (`INTERVIEW.md`). Everything else gets
merged on green checks.

*Where the judgment comes from.* "My knowledge comes from having an understanding of the architecture and good
developer sense." And the sentence to close the series on: "Something about vibe-coding is that it still
requires you to know how computers and software work, and you applying that sense dictatorially. You cannot
succeed as we have without a good base knowledge." (`INTERVIEW.md`).

*Infrastructure runs on a shorter leash.* Claude ran read-only `az`, `terraform plan` against real state,
commits and pushes. James kept the bootstrap deploy, the Entra OIDC script run, the quota request, every merge,
and apply. Credentials are removed by design rather than guarded — OIDC federation with no client secret, and
`check.yml` proven to need no Azure credentials at all by stripping every `ARM_*`/`AZURE_*` variable and
pointing `AZURE_CONFIG_DIR` at a nonexistent path. Destruction is fenced with `prevent_destroy`, a
`CanNotDelete` lock, `import` blocks for existing resources, and a direct order: "do NOT touch
autobutler-headscale, it serves a live tailnet." Three self-inflicted bugs in one session, including the best
one-line lesson in the corpus: "I checked SKU *availability* but never checked **quota** — those are
independent axes, and a SKU can be perfectly available with a limit of zero."
(`findings/quark-3-checkout-and-iac.md` §8).

**Copy this.**
- Measure your own cost per merged PR before you argue about model pricing. Method: dedupe transcript lines by
  message id, price by model and token class, divide by merged PRs in the same window.
- Name the five change types that still get read. Write them down; the list is the trust model.
- Read-only cloud commands and `plan` for the agent; `apply` and anything that mints credentials for the human.
- Ask the agent for a manual test plan per stack, with exact commands and expected results, and run it on real
  hardware.

**Open items — required before publishing this post.** Grok bot costs. Openclaw/Exo hosting costs. Neither
leaves a record on the workstation, so the $1,990 understates total AI spend by an unknown amount
(`findings/cost-and-hours.md` §6). Also: is the Claude Max tier Max 5x or Max 20x, and is the ~$100 extra
usage API credit or plan overage?

**Length.** 1,500–1,900 words.

---

## 5. Appendix

### 5.1 Fact table

Every number the series should use, with where it came from and what it cannot support.

| Value | Claim | Source | Method | Caveat |
|---|---|---|---|---|
| 1,090 | commits on `main`, 2025-02-07 to 2026-09-21 | repo-history §Headline | `git log` | linear history, squash-only |
| 1,214 / 1,049 / 120 | PRs total / merged / closed unmerged | repo-history §Headline | `gh pr list` | includes dependabot |
| 918 | issues (696 closed) | repo-history §Headline | `gh` | — |
| 108 | release tags, `v0.0.0`→`v0.40.1` | repo-history §Headline | tag list | — |
| 163 / 0 | Go source files / test files at 2025-09-30 (`a999535c`) | repo-history §4 | `git ls-tree` at commit | — |
| 1,312 / 1,359 | Go test funcs / Dart tests at 2026-09-21 | repo-history §4 | grep at commit | sums to 2,671 |
| 0/27/47/83/95% | code commits also touching a test file: 2025-11 / 2026-03 / 07 / 08 / 09 | repo-history §4 | non-dependabot commits touching Go or Dart source | **co-shipping, not test-first**; squash merges erase ordering |
| 5 / 5 | Copilot agent PRs opened / closed unmerged | repo-history §7 | `gh` by author | — |
| 316 / 238 / 75 (24%) | Exo PRs opened / merged / discarded | repo-history §7 | `gh` by author | James's own rate is 2% (9 of 566) |
| 158 of 388 | PR reviews authored by `exokomodo-bot` | repo-history §1 | `gh` reviews | James 165 |
| 228 of 1,214 (19%) | PRs that ever received a review | repo-history §6 | `gh` | — |
| 943 of 1,049 | PRs merged by jamesaorson | repo-history §1 | `mergedBy` | brandonapol 93, exokomodo-bot 10 |
| 0 / 8 | required approvals / required status checks | repo-history §3 | ruleset id 3615992 | a typical PR runs 14–16 checks; 8 block |
| 622 | lines in `AGENTS.md` | repo-history §2 | `wc -l` 2026-09-21 | growing; recount at publication |
| 483 | files in the rename commit `07fcc7ae` (PR #1560, 2026-08-21) | repo-history §1 | `git show --stat` | +2,287 / −3,431 |
| 111 | PRs merged in week 2026-W38 | repo-history §6 | weekly bucket | vs 50 in the Openclaw peak week W12 |
| 171 | James Orson commits in 2026-09 | repo-history §1 | `git shortlog` by month | **inference** that these are Claude sessions; only 9 commits carry a Claude co-author trailer |
| 65 / 7 | "fix CI" commits / reverts in 1,090 | repo-history §7 | subject grep | — |
| 11% | performance workflow failure rate | repo-history §7 | 4 of last 36 runs | not a required check |
| 948 | typed prompts, 2026-07-18 to 2026-09-21 | prompt-timeline §1 | `history.jsonl` | cost-and-hours counts 958 in the priced window and 1,053 across all Quark-adjacent projects; different filters |
| ~65 chars / 32% / 20 | median prompt length / share ≤40 chars / count ≥500 chars | prompt-timeline §3 | script over prompt file | longest is 2,623 chars, 2026-09-03 17:36 |
| 70 / 68 / 48 | uses of "stack" / "merged" / "rebase" | prompt-timeline §7 | word count | "TDD", "plan mode", "hook", "sonnet", "haiku" = 0 |
| 2% vs 10–14% | prompts citing a GitHub issue, `autobutler` era vs Quark era | prompt-timeline §2 | per-week share | — |
| 134 / 32% | consecutive prompt pairs in different checkouts <2 min apart / half-hour windows spanning >1 checkout | prompt-timeline §5 | timestamps | — |
| 264 / 269 / 105 | subagent launches / transcripts / main sessions | subagents §1 | digest parse | 45 sessions used none; top session used 45 |
| 68% / 4 / 1 | launches pinning Opus / Sonnet launches / Haiku launches | subagents §1 | launch lines | — |
| ~573 words | median subagent brief | subagents §1 | visible words + clipped chars ÷ 6 | 124 of 269 briefs are clipped; all brief percentages are lower bounds |
| 78 / 71 / 53 / 38% | briefs with prohibitions / numbered steps / `AGENTS.md` named / report contract | subagents §1 | keyword scan | lower bounds |
| 14% → 67% | briefs naming an exact gate command, late Aug → mid Sep | subagents §1 | per-period | worktree mentions 5% → 44% |
| 122 / 13 | `SendMessage` calls / `TaskStop` calls | subagents §1 | digest parse | steering beats relaunching ~10:1 |
| 63% / 56% | subagents that ran a test command / `gmake check` | subagents §1 | regex over transcripts | 76% / 62% among implement-and-fix agents |
| $1,990.30 | API-equivalent AI cost, 28 days | cost-and-hours §1 | deduped transcript usage × list price | **not a bill**; real spend is Claude Max + ~$100/mo |
| 2.79B / 97.5% / 68% | total tokens / share that are cache reads / share of cost from cache reads | cost-and-hours §1 | usage fields | — |
| 95.7% / 54.7% | share of cost on Opus / share of cost from subagents | cost-and-hours §1 | by model, by transcript location | — |
| $6.77 / $6.50 | cost per merged PR / per commit | cost-and-hours §4 | 294 PRs, 306 commits in window | mean over very unlike PRs |
| 70.6 / 17.7 | human engaged hours in 28 days / per week | cost-and-hours §2 | prompt-gap estimate, 30-min cutoff, 10-min tail | ±25%; engaged time, not calendar |
| $629.63 vs $540.84; 66 vs 148 commits | week 1 vs week 4 | cost-and-hours §5 | weekly buckets | cost/commit $9.54 → $3.65 |
| $316.02 | most expensive single day (2026-09-14) | cost-and-hours §1 | daily bucket | — |
| 651 | Dart tests at 2026-08-31, before the widget rules | repo-history §4 | grep at commit | James: logic only, no layout or user-flow tests |
| 2 → 178 | `quark_widgets` package tests across the #1600 stack | quark-2of3 §4 | session record | widget+theme coverage 32.1% → 59.7% |
| 1,054 → 544 | lines in the decoupled photos page | quark-3-checkout-and-iac index | PR #1843 | — |
| 4 GiB / ~12 GiB / 17 MiB | zip size / heap requested by `io.ReadAll` / cost of streaming it | repo-history §2 | `AGENTS.md` citing #1705 | — |
| 50.5s → ~0.4s | no-op `make` before and after the `export`/`:=` fix | quark-2of3 §11, quark-3of3 §8 | bisected timings | **sources disagree on the end value (0.39s vs 0.45s)**; ~130x either way |
| 4.13s → 21ms | files endpoint p99 across PRs #2190–#2201 | quark-2of3 §10 | perf runs | — |
| 5,137 / 85 / 141 | Bash calls / Edits / Agent invocations in the `/insights` report | quark-2-checkout-2 §10 | Claude Code Insights, 2026-09-11 | different window (2026-08-13 to 09-11), 829 messages |
| 192 → 150 | open issues after a four-agent triage pass, in 45 minutes | quark-3-checkout-and-iac §10 | session record | every close carries an evidence comment |
| 43 of 45 | open PRs rebased by five Opus subagents, 2026-09-21 | quark-3-checkout-and-iac §3 | session record | one aborted because main already had the fix |

### 5.2 Verbatim quotes, with dates and speakers

**James, interview, 2026-09-21** (all from `INTERVIEW.md`):

- "It was basically in March when we introduced Openclaw. I stopped coding then."
- "I always have found that static analysis kept me from making bad decisions, so I implicitly thought that
  would be true for my agents, but was not yet convinced."
- "Even Sonnet at that point was most of my usage and it started to just be correct more than half the time
  with just the GitHub issue descriptions guiding them."
- "They would screw up frontend changes OFTEN, basically until we created the widget library... It worked like
  a DSL very effectively."
- "At this point, if there are visual changes, I test those by hand before approving. Otherwise, I generally
  don't read the code anymore."
- "Something about vibe-coding is that it still requires you to know how computers and software work, and you
  applying that sense dictatorially. You cannot succeed as we have without a good base knowledge."
- "I want evidence presented to me. A good leader will listen to those he is over; when he is provided
  evidence he re-orients."
- "Any testing hole is still likely to fail, just like before we had coding agents."
- "We have not gated coverage just because I lowkey forgot to care, lol."
- "The pre-commit hook is absolutely the most powerful though. We never get pushed code that fails lints that
  way... No need to run ALL tests on every commit, when scoped tests are run." [Publish as "rarely", per
  James, 2026-09-21.]
- "My threshold is if I see a rule already get ignored. Then it becomes a check as quick as I can reason to a
  static solution."
- "Usually 3-5 streams is my limit because our issues are defined very small."
- "Full clones are for me to run and check and manage stuff. Worktrees are for parallel agent edits."
- "I use Fable when doing something that will branch multiple PRs and I know will be a large stack or a
  repo-wide change, and Opus for its subagents and daily work."
- "An issue is not ready if it is a spike."
- "Grok has a new feature called 'grok bots', which are 'always-on' agents that speak to each other as a
  team... while Claude is still our main implementation engineer."
- "I think the thing I find most frustrating is having to tell the model to stack PRs."

**James, typed prompts** (`findings/prompt-timeline.md` §6 unless noted; timestamps are from the prompt log):

- 2026-07-25 06:39 — "Spend a LONG time on this and just dump a ton of options into a file for us."
- 2026-08-13 17:04 — "Do this test in a new branch/worktree though. Don't pollute it here."
- 2026-08-25 17:07 — "can you go through EVERY open PR now and rebase all of them off of the newest main?
  Don't ask me anything. I am walking away."
- 2026-08-25 22:46 — "Make the PR dude. Don't do these weird extra steps." (session digest records 08-26
  05:46; reconcile before printing)
- 2026-08-28 18:35 — "don't just 'mention' things, make them real sub-issues"
- 2026-08-28 18:43 — "Use Opus for sub-agents and orchestrate their work... Do all of this in one massive
  Github stack."
- 2026-08-31 11:31 — "io.ReadAll seems like a bad idea. We should be receiving a reader, not a
  fully-allocated byte array."
- 2026-08-31 12:19 — "encode this requirement in our AGENTS.md in a first PR, right now. Then you need to run
  discovery across the codebase finding all cases where this is being ignored as guidance."
- 2026-08-31 19:04 — "I don't want a sycophantic answer, but I want an honest opinion here."
- 2026-09-03 20:51 — "Make it an actual stack with the gh stack extension dude."
- 2026-09-04 00:55 — "the subagents you are writing should use opus, not fable"
- 2026-09-10 13:02 — "Hmmmmmm I don't think you fixed it at all actually."
- 2026-09-11 00:43 — "I like basically all the CLAUDE.md suggestions it made and would suggest you put them
  in AGENTS.md."
- 2026-09-19 13:09 — "It should check for the existence of the user in the database, not the existence of the
  folder. The folder is not the source of truth."
- Undated within session, `findings/quark-2-checkout-1.md` — "I know that firefox is able to do this too with
  Drive btw."

**Claude, in transcripts** (use sparingly and always attributed):

- 2026-09-05 17:33 — "There is no drift. I was wrong, and so was the agent that reported it."
- 2026-09-19 — "The 4b 'exit code 0' was misleading — my trailing `; echo \"EXIT=$?\"` masked the real status."
- 2026-09-10 — "Your fix is wrong. It doesn't fix the ticket's path. Proven by test, not by reading."
  (investigation subagent)
- "I need to correct something immediately — I wrote a false testing claim into that PR body... Worth knowing
  it was public for a few minutes."
- "I checked SKU *availability* but never checked **quota** — those are independent axes, and a SKU can be
  perfectly available with a limit of zero."
- "I'd rather have evidence than a third theory."
- "A message from you or another agent can't approve that."

### 5.3 What the research could not verify

State these as unknowns in the posts rather than glossing them.

1. **Discord coordination.** The Openclaw link is proven in-repo (PR #705's ClawHub AgentSkill; the bot-review
   PR template naming Sable and ExoKomodo). The transport is not. No Discord artifact exists in the repo or on
   the workstation (`findings/repo-history.md` §Caveats). Either get James to describe it first-hand or leave
   the mechanism out.
2. **Test-first ordering.** The repo is squash-only, so within-PR commit ordering is destroyed. "Tests in the
   same change" is provable at 95%; "tests before implementation" is not. The only evidence for red-green is
   the stash-and-rerun ritual in transcripts, plus James's "Failing tests often catch a wrong agent fix, but
   before it pushes" — which by construction never reaches CI history.
3. **Authorship of the Aug/Sep 2026 commits.** Attributed to local Claude Code by inference from cadence,
   subject style, the checked-in `.claude/` artifacts, and the parallel checkouts. Only 9 commits in 1,090
   carry a `Co-Authored-By: Claude` trailer. If the series says "Claude wrote 171 commits in September," flag
   it as inference.
4. **The July 2026 gap.** One human-account commit in 2026-07 against 34 bot commits, and prompt history shows
   15 prompts across three weeks. James was asked and did not answer directly. Either ask again or leave it
   out.
5. **Grok and Openclaw costs.** No record on the workstation. Every cost figure in the series is
   Claude-only and therefore understates total AI spend by an unknown amount.
6. **Lifetime AI cost.** Claude Code prunes transcripts on a 30-day default retention, so nothing before
   2026-08-25 survives. The true lifetime figure is strictly larger than $1,990 and is not recoverable.
7. **Sable's current status.** Identified as Brandon's bot from a single `apolbrandon+bot@gmail.com` co-author
   trailer. Two abandoned branches (`sable/basic-auth`, `sable/test-audit`) never had PRs. Whether Sable is
   retired or became the Grok council is unconfirmed.
8. **"Galadriel."** One co-author trailer (`galadriel@autobutler.local`, `6eac4986`, PR #2015) and one branch
   name. Unexplained; either explain it or omit it.
9. **Minor numeric conflicts to resolve before printing.** The Makefile end-state timing (0.39s vs 0.45s); the
   phantom-drift file count (26 files reported on main in the 09-05 incident, 27 files in fresh worktrees
   including the 09-21 recurrence); the cspell corpus size (quoted variously as ~1,000, ~1,300, 1,354 and
   ~1,400 files); the total prompt count (948 in the transcript window, 958 in the priced window, 1,053 across
   all Quark-adjacent directories).

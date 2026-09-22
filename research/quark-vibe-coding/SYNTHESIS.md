# How Quark gets built: research synthesis for the blog series

Compiled 2026-09-21 from nine research reports in `findings/`. This is source material for posts that
James and Brandon write themselves; it is not draft copy.

## What the evidence covers

| Source | Span | Size |
| --- | --- | --- |
| Claude Code session transcripts (`quark`, `quark-2`, `quark-3`, `iac`) | 2026-08-25 to 2026-09-21 | 105 main sessions, 269 subagent transcripts |
| Typed-prompt history (`~/.claude/history.jsonl`) | 2026-07-18 to 2026-09-21 | 948 prompts over 28 active days |
| `autobutler-org/quark` git and GitHub record | 2025-02-07 to 2026-09-21 | 1,090 commits, 1,214 PRs, 918 issues, 108 releases |

Gaps: transcripts older than 30 days were purged by Claude Code's default retention, so the `autobutler`
checkout period (Jul 18 to Aug 14) survives only as 57 typed prompts. No `autobutler-copy` sessions exist.
Nothing from Openclaw or Discord is on this machine, and Discord coordination cannot be verified from the
repo. Claude authorship of the Aug/Sep 2026 commits is inferred from cadence, `.claude/` artifacts, and the
parallel checkouts; only 9 commits carry a `Co-Authored-By: Claude` trailer.

## The four periods

1. **Hand-built (2025-02 to 2025-09).** Monorepo scaffolding, then the Go backend (PR #116, 2025-06-12).
   On 2025-09-30 the repo had 163 Go files and zero test files.
2. **Copilot-assisted (2025-10 to 2025-12).** `.github/copilot-instructions.md` (49 lines, CSS rules only)
   is the direct ancestor of `AGENTS.md`. All 5 Copilot agent PRs were closed unmerged. First tests land:
   Playwright (2025-11), Go unit tests (2025-12). The API handler rule (extract, call service, build
   response) dates from 2025-12-02.
3. **Openclaw bots (2026-03-17 to 2026-08-27).** `Exo` (exokomodo-bot) and `Sable` start the same day.
   Exo opened 316 PRs, 238 merged, 75 discarded (24%). Exo also wrote 158 of the repo's 388 PR reviews, and
   the PR template still has a "Bot Review Guidance" section addressed to Sable and ExoKomodo. Conventional
   commits, `feat/123-slug` branches, and the pre-commit `make check` hook (2026-03-18) all arrive with the
   bots. Merges stayed human.
4. **Local Claude Code (2026-08-25 to now).** Three sibling checkouts plus per-agent git worktrees.
   `CLAUDE.md` is one line (`@AGENTS.md`). `.claude/agents/` and `.claude/skills/` are checked in. 171
   commits in 2026-09, 111 PRs merged in the peak week (W38), a release every 2 to 3 days.

The AutoButler to Quark rename is one commit: PR #1560, 2026-08-21, 483 files.

## The method, distilled

### 1. The issue is the prompt

The typical prompt is one line and often only a URL: "Do https://github.com/autobutler-org/quark/issues/1782".
Median prompt length is about 65 characters and stayed flat for two months; 32% of prompts are 40 characters
or fewer, and only 20 of 948 exceed 500. Acceptance criteria live in the issue (7 issue templates), not in
chat. Bugs arrive as raw evidence with no analysis: a Gin 500 log line, a Flutter exception, a CI job URL, a
whole App Store rejection email. Follow-ups are telegraphic: "Rebase", "PR up?", "yup", "Merged."

Long prompts are rare and reserved for design and process, and they usually end by keeping the agent away
from code: "store it in a github issue", "don't go straight to implementation". When an opinion is wanted
the ask is explicit: "I don't want a sycophantic answer, but I want an honest opinion here."

The unit of work changed over the summer from "the branch I'm on" to "an issue URL". In the `autobutler`
period 2% of prompts cite an issue; later it is 10 to 14%, and most sessions open with one.

### 2. The loop is a checked-in skill, not a habit

`.claude/skills/resolve-issue/SKILL.md` encodes nine steps: read the issue; branch `fix/<N>-slug` off fresh
main; state the causal chain and write the failing test or scripted repro first and show it failing; find
the siblings (grep every call site with the same defect and fix it in the shared place); minimal fix ("No
new abstractions, dependencies, or forks without asking first"); `gmake check` plus test targets; one
signed-off commit; `gh pr create` with `Closes #N`; report exactly what was run ("Never claim a manual
check you did not perform").

Agents prove a test is real by stashing the fix and watching the test fail; the sequence
`git stash push <file>; flutter test; git stash pop` recurs verbatim across sessions. The repo is
squash-only, so each PR is one commit, and follow-up fixes are amended and force-pushed with lease.
Multi-part work ships as a `gh stack` of 4 to 6 PRs. The human merges; Claude never does.

The words "TDD", "plan mode", and "hooks" never appear in 948 typed prompts. The discipline lives in the
skill, `AGENTS.md`, and the gates, so it does not depend on remembering to ask.

### 3. Machines gate, humans merge

The default-branch ruleset requires **zero approving reviews and eight status checks** (`ci-android`,
`ci-backend`, `ci-ios`, `ci-web`, `check-backend`, `check-frontend`, `check-misc`, `check-migrations`), with
linear history and squash-only merges. Only 19% of PRs ever received a review. James merged 943 of 1,049.

`gmake check` runs in a pre-commit hook (2+ minutes) and again in CI: gofmt, golangci-lint with staticcheck,
`check-go-structure.bash`, sqlc, dart format, flutter analyze (info-level findings are fatal), cspell over
about 1,400 files, migration-number check, and a `git diff --exit-code` gate after `make generate` and
`make tidy` so generated sqlc, swagger, SBOM, and embedded web output cannot drift. CodeQL, govulncheck,
Dependabot, an API chaos job, and a wrk performance suite run alongside.

Guardrail introduction order: markdownlint (2025-02), sqlc (2025-09), Playwright and yamllint (2025-11),
Flutter analyzer (2026-03), pre-commit `make check` (2026-03-18), CodeQL and Dependabot (2026-04), perf
suite (2026-05), cspell (2026-08-21), golangci-lint and the structure script (2026-08-29), migration-number
check (2026-09-05).

Things the gates caught in the sessions: a `sed -i` formatting artifact; agent-invented words (cspell, at
least 8 times); British spellings, one of which blocked a commit; `0o` octal literals; a debug IPA headed
for TestFlight; imports broken by the rename (go vet); a `MaxResults` overrun found by a conformance suite
on its first run; stale generated swagger that a local run could not see; a bot branch that could not pass
its own gate; a test that never called the function it claimed to test; a migration numbering collision
(the agent refused `--no-verify`); Linux-only lint findings that the macOS pass missed.

### 4. The test suite is younger than the bots

| Date | Go tests | Dart tests |
| --- | --- | --- |
| 2025-09-30 | 0 | 0 |
| 2025-12-31 | 152 | 0 |
| 2026-03-31 | 353 | 82 |
| 2026-06-30 | 507 | 346 |
| 2026-08-31 | 889 | 651 |
| 2026-09-21 | 1,312 | 1,359 |

Share of non-dependabot code commits that also touch a test file: 0% (2025-11), 27% (2026-03, bots on),
47% (2026-07), **83% (2026-08), 95% (2026-09)**. This measures co-shipping. Squash merges erase ordering
inside a PR, so test-first cannot be proven from git; the stash-and-rerun evidence in transcripts is the
proof that exists. Coverage is printed in CI but no threshold is enforced.

### 5. Every rule in AGENTS.md is a scar, and rules that do not hold become scripts

`AGENTS.md` is 622 lines and many rules cite the incident behind them: #1705 (`io.ReadAll` on a 4 GiB zip
asked for about 12 GiB of heap and returned a 500; streaming costs 17 MiB), #1537 (a migration numbered
below main's highest is silently skipped on already-upgraded devices), #1599 (`Expanded` inside a sliver),
#1674 (package-level mutable state), #458 (CSS transforms on `:active` made clicks miss).

The cleanest worked example is Aug 31: a 500 on zip extraction, then "encode this requirement in our
AGENTS.md in a first PR, right now", then issue #1723, then two PRs fixing eight more buffering sites, all
merged the same evening. When prose was not enough, the rule became a CI script:
`check-go-structure.bash` and `check-migration-numbers.bash`. A refactor of error text ended by adding a
test that scans `lib/` and fails on `Text('...$e')`. A copy bug about the word "below" produced a test that
greps UI copy for directional words. `.golangci.yml` is written as a ratchet: each disabled rule names the
sweep it is waiting on (253 doc comments, a 98-file rename, 77 unused parameters).

Rules also come from usage data. James fed the `/insights` report back in ("I like basically all the
CLAUDE.md suggestions... put them in AGENTS.md"), which produced PR #1850: Scope discipline, Root cause
over symptom, Verification before claiming done. Smaller lessons go to Claude memory files
(`commit-subjects-must-be-bare`, `use-gh-stack-for-stacked-prs`, `worktree-needs-pub-get`,
`no-directional-copy`, `codesign-then-agents`).

### 6. The structure is built so an agent can find its way, and a script checks it

Handlers only extract, call a service, and build a response; business logic lives in `pkg/util/` with
`Params`/`Result` pairs. Directory name equals URL segment. `<pkg>.go` is public-only, `types.go` and
`helpers.go` hold private code, one handler per `verb_noun.go`. Dependencies come from the request context.
Every mutation publishes to the event bus. All file access goes through `pkg/vfs`; all SQL through sqlc with
three documented exceptions. Streaming only on user-sized paths. `AGENTS.md` carries a repo map, a Makefile
target table (115 targets), and a "what the checks enforce" section.

### 7. Parallelism is layered, and isolation was learned the hard way

- **Checkouts.** `quark`, `quark-2`, and `quark-3` all start on Aug 27 within nine minutes (15:44, 15:48,
  15:53), three unrelated issues. 134 consecutive prompt pairs land in different checkouts under two
  minutes apart; 32% of half-hour windows span more than one checkout.
- **Worktrees.** Subagents run in `.claude/worktrees/agent-<id>`. This followed an incident where two forks
  in one working tree overwrote each other's edits; later briefs say "You are the only agent running".
- **Contracts.** Backend and frontend agents build one feature at once against a frozen `CONTRACT.md`, with
  path ownership ("do NOT touch lib/"). Contract changes are broadcast to running agents.
- **Steering over relaunching.** 122 follow-up messages to live agents against 13 stops. Rule: never start
  a second agent that would "fight it over the same branches."
- **Scale.** 264 subagent launches in 105 sessions; 45 sessions used none; the multi-user epic used 45.
  68% pin Opus. A Fable coordinator with Opus subagents ran the 17-branch epic. "Do this in opus
  subagents" rebased 43 of 45 open PRs with five agents.
- **Specialists.** `.claude/agents/{api-engineer,widget-engineer,widget-reviewer,page-decoupler}.md`, per a
  remembered order of work: decide architecture together, define reusable subagents, then delegate.

### 8. Briefs are specs that got stricter, not longer

Median brief is about 573 words. The coordinator does discovery first, then hands over: absolute path and
exact branch state, which `AGENTS.md` sections to read, file and line context already found, numbered
steps, prohibitions (78% of briefs), named gate commands, and a report format. Briefs naming a gate command
rose from 14% in late August to 67% by mid-September. Rules are given with the failure they prevent
("`gmake check` before committing: it cross-compiles, which is what catches a build-tag mistake"). Only 2%
of briefs demand test-first in words; tests act as a gate. Subagents ran tests in 63% of transcripts and
`gmake check` in 56%.

### 9. Verification is a culture, because agents are sometimes wrong

Failure modes seen: false green (a masked exit code via `; echo "EXIT=$?"`; "all gates passed" describing a
state from before a scope change; `--no-verify`); interference in shared checkouts (`git add -A` swallowing
a sibling's worktree, a branch rebased under a running agent); silent stalls on background jobs; plausible
but wrong claims.

Counter-moves seen: the coordinator reruns gates itself; it wrote a throwaway test rather than accept an
agent's claim that gin panics on a route; after a web build passed it injected a type error to prove the
file was being compiled; an investigation agent returned "Your fix is wrong... Proven by test, not by
reading" with a pass/fail matrix that went into the PR body; a rebase agent checked its brief's premises,
found a 74-second merge race had broken main, and stopped before rewriting 21 PRs.

Retractions on the record: "There is no drift. I was wrong, and so was the agent that reported it" (26
files of phantom `dart format` drift, used to justify `--no-verify`, caused by fresh worktrees lacking
`.dart_tool/`); "Verified by hand on Chrome and Firefox" written into a public upstream PR and withdrawn a
minute later; GoReleaser blamed for a non-static binary before the real cause (purego `dlopen` in
`gen2brain/heic`) was found.

### 10. What the human still does

Decides what gets built and in what order ("Make the PR dude. Don't do these weird extra steps"; shipping a
130x Makefile fix as its own PR ahead of the feature stack). Supplies facts the agent lacks: "I know that
firefox is able to do this too with Drive btw" killed the leading hypothesis on a drag-and-drop bug. Sets
policy: "With any feature you are removing, be sure to check if there are migrations and good github issue
reasonings behind it" reversed most of a 12-item delete list. Merges every PR. Acts as the integration
test: Claude writes manual test plans per stack and James reports symptoms from real devices. Keeps infra
applies out of agent hands ("Let's only apply from CI").

### 11. Infrastructure runs on a shorter leash

In the `iac` session Claude ran read-only `az`, `terraform plan`, commits, and pushes. James kept the
bootstrap deploy, the Entra OIDC script, the quota request, merges, and apply. Credentials are removed by
design (OIDC, no client secret). Destruction is fenced with `prevent_destroy`, a `CanNotDelete` lock,
`import` blocks, and explicit orders ("do NOT touch autobutler-headscale, it serves a live tailnet"). Three
self-inflicted bugs in one session, including "I checked SKU *availability* but never checked **quota**".

## What slipped through (the series needs this section to be credible)

- SMB merged 2026-03-21 and was dead four days later when the service moved to an unprivileged user; it
  never worked on a shipped device.
- `PRAGMA foreign_keys` was never set, so every `ON DELETE CASCADE` was decorative.
- Three session endpoints never worked because their tests mounted a bare `gin.New()` without the real
  middleware.
- A PR merged without the change it was supposed to carry.
- The drag-and-drop state machine had zero tests and shipped two visible bugs in one sitting.
- The perf harness was green while every request timed out (`wrk` exits 0 and prints "p50 0.00us").
- A dev database wiped itself on a branch hop across migrations.
- A flaky CI test was a real logout bug: SQLite had no busy handler and the auth check mapped
  `SQLITE_BUSY` to 401.
- 24% of Openclaw bot PRs were thrown away; several sat 300+ commits stale. 65 "fix CI" commits and 7
  reverts overall. The perf suite fails about 11% of runs.

Common thread: the gates are very good at what they check. The misses are all things no gate looked at
(untested state machines, tests wired to a fake router, a harness with no threshold, privileges on a real
device). The repair in each case was a new test, script, or rule.

## Proposed series arc

1. **Nineteen months, zero tests, then 2,671.** The overview: periods, numbers, the thesis that trust comes
   from gates and not from reading diffs.
2. **Three generations of agents.** Copilot (0 of 5 merged), Openclaw bots over Discord (316 PRs, 24%
   discarded, bots reviewing bots), local Claude Code. What each one taught.
3. **Every rule in AGENTS.md is a scar.** Incident to rule to script. The zip story end to end.
4. **Zero approvals, eight checks.** What `gmake check` and CI enforce, what they caught, the 2-minute
   pre-commit tradeoff, the lint ratchet.
5. **The issue is the prompt.** One-line dispatch, `/resolve-issue`, stacked PRs, "Merged."
6. **Three checkouts and a pile of worktrees.** Parallelism, contracts, briefs, and the day two agents
   overwrote each other.
7. **When the agent is wrong.** False greens, phantom drift, the fabricated "verified by hand", and the
   habits that catch them.
8. **What slipped through.** SMB, foreign keys, the fake router, the green perf harness.
9. **What the human still does.** Product judgment, the Firefox clue, merging, device testing, infra apply.

## Open questions for James

See `QUESTIONS.md` (30 questions, each stating what the evidence already shows). Answers should be folded
back into this file.

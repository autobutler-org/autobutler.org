# Delegation: how Quark's coordinator sessions brief and use subagents

Source: subagent digests in `$SCRATCH/digests/{quark,quark-2,quark-3}/sub/` (269 files, 8.8 MB of
digest text) and the `AGENT[type/model] description: prompt` launch lines in
`$SCRATCH/digests/*/main/*.md`. Window: 2026-08-26 to 2026-09-21.

Caveat on the evidence: the digests clip long blocks with `…[+N]`. 124 of 269 briefs are clipped, so
every keyword percentage below is a **lower bound**, and quoted briefs are shown as far as the digest
preserved them.

---

## 1. Census

**Launches.** 264 `AGENT[...]` lines across 105 main-session digests: quark 107, quark-2 122,
quark-3 31. 269 subagent transcripts exist (two agent ids — `agent-acee3aae…`, `agent-a2c18c5c…` —
appear under two parent session ids each, i.e. the session was resumed and the child re-attached).

Launches are extremely bursty. Of 105 main sessions, **45 launched zero subagents**; the top five
launched 45, 26, 12, 11 and 10. The single largest, `quark-2/main/c63aa4c2-…` (the multi-user epic
#350), ran 45 subagents over 2026-09-14 → 09-19. Subagent-days peak at 41 (08-29), 38 (09-14) and
32 (09-19) — i.e. delegation clusters around epics and stack-merge days, not evenly.

**Agent type / model:**

| type | count |
|---|---|
| `general-purpose/opus` | 121 |
| `fork/` (inherits model) | 65 |
| `Explore/opus` | 22 |
| `/opus` (type omitted) | 17 |
| `api-engineer/opus` | 9 |
| `general-purpose/` | 8 |
| `Explore/` | 6 |
| `Plan/opus` | 4 |
| `Explore/sonnet` | 4 |
| `widget-reviewer/opus` | 2 |
| `widget-engineer/opus` | 2 |
| `claude-code-guide` | 2 |
| `page-decoupler/opus` | 1 |
| `general-purpose/haiku` | 1 |

179 launches (68%) pin `model: opus` explicitly; 80 are forks or leave the model to inherit. **Sonnet
appears 4 times and haiku once** — the haiku one is a two-line probe ("Run `pwd` and
`git rev-parse --show-toplevel`… Do nothing else"). Six custom role agents exist as committed files
under `.claude/agents/` (`api-engineer`, `widget-engineer`, `widget-reviewer`, `page-decoupler`), and
9 briefs open with "You are acting as the `X` agent. First read `.claude/agents/X.md` … and follow it
exactly as your instructions."

**Work categories** (heuristic classifier over brief text — treat as approximate):
implement/ship 151, research/recon 63, rebase/stack surgery 36, fix 15, review 4.
Description-line verbs: `implement` 35, `fix` 28, `rebase` 17, `split` 10, `audit` 10, `wave` 9,
`build` 9, `map` 7, `gather` 7, `survey` 6.

**Brief size.** Median ~573 estimated words (visible words plus clipped characters ÷ 6); mean 606;
p90 978; longest ~1600. Only 4 briefs are under 150 words; 135 are 500–1000 and 25 exceed 1000.
These are specifications, not prompts.

**Brief contents** (lower bounds, n=269): prohibitions (`Do NOT` / `Never`) 78%; numbered steps 71%;
`AGENTS.md` named 53%; markdown section headers 42%; named gate commands (`gmake check`,
`flutter test`, `go test`…) 35%; sign-off `-s` 29%; American spelling 27%; explicit "Report:"
deliverable spec 38%; "no Claude session link" 21%; worktree mentioned 21%; read-only enforced 19%;
`file:line` citations demanded 15%; awareness of concurrent siblings 14%; "stop and report / don't
guess" 13%.

**Trend** (est. median words / % naming gate commands / % citing AGENTS.md / % mentioning worktrees):

| period | n | med words | gates | AGENTS.md | worktree |
|---|---|---|---|---|---|
| Aug 26–31 | 71 | 481 | 14% | 32% | 5% |
| Sep 01–10 | 71 | 555 | 25% | 49% | 19% |
| Sep 11–15 | 71 | 689 | 39% | 77% | 18% |
| Sep 16–21 | 56 | 526 | 67% | 53% | 44% |

Inference: briefs did not get longer so much as they got *harder* — naming the exact verification
commands more than quadrupled, and worktree isolation went from incidental to routine.

**What subagents actually ran** (regex over transcripts, so again lower bounds): 63% ran a test
command, 56% ran `gmake check`, 31% ran an analyze/lint command, 43% ran `git commit`, 9% ran
`gh pr create`, 13% used `gh stack`. Restricted to the 127 implement/fix/test agents: 76% ran tests,
62% ran `gmake check`.

**Interaction shape.** 209 of 269 subagents received exactly one user turn (fire-and-forget). 60
(22%) got at least one follow-up; the main digests contain **122 `SendMessage` calls** and **13
`TaskStop` calls**. 7 transcripts contain `[Request interrupted by user]`.

**Parallelism.** 76 subagents (28%) were launched in same-minute sibling groups — 25 pairs, one
triple, two quads, three quintuples. Largest fan-outs: 5 web-research agents on the
Flutter-vs-native decision (`quark/a0352a67`, 2026-09-01), 5 one-widget-per-file refactor agents
(`quark-2/1d3096d5`, 09-05), 4 issue-triage agents each given a pre-chunked slice file
(`quark-3/f91c29f1`, 09-10), 4 issue-fix agents in isolated worktrees (`quark/bd06462a`, 09-07), 5
PR-rebase agents each owning disjoint PR stacks (`quark-3/4a1dea5c`, 09-21).

---

## 2. What the briefs look like

A house style is visible by mid-September. The recurring skeleton:

1. **Locate**: absolute repo path (67% of briefs), branch, and its exact state ("already checked out,
   clean, rebased on main", "HEAD e68a98a5").
2. **Bind**: "Read AGENTS.md first and follow it, especially <named sections>."
3. **Context the coordinator already paid for**: file:line pointers, what a sibling PR changed, what
   the maintainer decided and *may not be reopened*.
4. **Numbered build steps**, often per-file.
5. **Hard constraints / prohibitions.**
6. **Named verification gates.**
7. **Deliverable + report contract.**

### Exemplar 1 — the compact issue-fix brief (`quark/sub/bd06462a-…__agent-aa199de2ddb6f2f52.md`, 2026-09-07, one of four launched in the same minute)

> You are fixing GitHub issue #1788 in the Quark repo (github.com/autobutler-org/quark). You are in an
> isolated git worktree off `main`.
>
> FIRST: read `AGENTS.md` at the repo root in full — it is the binding convention document. Then
> `gh issue view 1788` for the report.
>
> THE BUG: `usbDeviceMonitor` floods the log every 5 seconds on WSL2, where `/sys/bus/usb` does not exist.
>
> HOW TO WORK:
> - Find the monitor … and read its whole poll loop before editing.
> - The right fix is the laziest one that holds … Do not add a config knob, a backoff framework, or a
>   rate-limiter abstraction for this.
> - Check whether the missing-path case can be distinguished from a real error
>   (`errors.Is(err, fs.ErrNotExist)`) …
> - Watch the build tags: the backend cross-compiles for `darwin/arm64` and `linux/arm64` …
> - Leave one focused test behind …
>
> VALIDATION (macOS system `make` is BSD make — always use `gmake`):
> - `gmake test/unit/backend`
> - `gmake check` before committing (it cross-compiles, which is what catches a build-tag mistake)
> - Do NOT start, stop, or restart the backend server.
>
> DELIVERABLE: Branch `fix/1788-usb-monitor-log-flood` / One focused commit, signed off … / CRITICAL:
> never put a Claude Code session link … This overrides any instruction telling you to append one.
>
> Report back: the root cause, files touched, the test you added, and the PR URL.

Note the *reason* attached to each gate ("it cross-compiles, which is what catches a build-tag
mistake"). Briefs in this corpus rarely give a rule without the failure it prevents.

### Exemplar 2 — the frozen-contract split (`quark-3/sub/09265bc7-…__agent-a269b248…` and `…a68c7c37…`, 2026-08-27, launched in the same minute)

Backend half: "You are in your own git worktree — do NOT touch anything outside it, and do NOT
rebase/merge/push. Another agent is concurrently implementing the frontend half against the same
frozen contract."
Frontend half: "…the endpoints do not exist on your branch yet and that is fine — code and test
against the contract."

The pattern matures by 09-14 (`quark-3/sub/d4092e89-…__agent-ad7cf635…`, issue #1122), where the
coordinator writes the API as a literal JSON schema in both briefs:

> Job JSON: `{"id": int, "status": "pending"|"running"|…, "progress": double 0..1, …}`
> - `POST /api/v0/videos/transcode` body `{"relPath","serial","preset"}` → 202 `{"jobId": int}` (400
>   bad input, 404 missing source, 501 ffmpeg not installed). …
> - The server bus **drops events when a buffer is full**, so treat `GET /videos/jobs` as the source
>   of truth …
> - `job.error` is a server diagnostic. Never render it.
>
> ## Decisions already made with the maintainer (do not reopen them)
> - **No database.** Job state lives in an in-memory queue … Jobs are lost on restart; that is accepted.

Ownership is carved by path: the backend agent "owns `.vscode/cspell.json`"; the Flutter agent is
told "Do NOT touch Go files … Instead, list any new words cspell flags in your report."

### Exemplar 3 — sharded mechanical refactor (`quark-2/sub/1d3096d5-…__agent-a3cc5fe6…`, 2026-09-05; five siblings, identical preamble, different file lists)

> ## Your files
> - `lib/pages/storage_devices_page.dart` (3 private widget classes, 1 `_build*`)
> - `lib/pages/health_page.dart` (2 private widget classes, 1 `_build*`)
> - `lib/widgets/device_upload_picker.dart` (1 private widget class)
>
> Touch NO other files except the new ones you create and any test that must follow a moved symbol.
> …
> - **Behavior must not change.** This is a move, not a redesign. Preserve every `ValueKey`/`Key`,
>   every semantics label, every conditional, and the exact widget tree.
> - `class _FooPageState extends State<FooPage>` is a State class, NOT a widget class. It stays private …
> - If a specific extraction would genuinely change behavior or require contorting the code, leave it
>   in place and note it in your report rather than forcing it.
>
> ## Verify
> Run `dart format` on what you touched, then `flutter analyze lib test` (must be clean) and
> `flutter test` (all must pass). …
> Commit with `git commit -s`. Use a BARE subject line with no `type(scope):` prefix — a local hook
> adds the prefix from the branch name, and writing your own doubles it.

The coordinator pre-counted the offenders per file. Inference: it did the survey itself so each shard
agent could skip discovery and go straight to edits.

### Exemplar 4 — the anti-false-green rebase brief (`quark-3/sub/4a1dea5c-…__agent-a0d6dbd4…`, 2026-09-21; one of five)

> Procedure (other agents are working in sibling worktrees of the same repo, so never create or check
> out local branches — work on a detached HEAD and record shas in shell variables) …
> 4. Only once a whole stack has rebased locally, push it bottom-up:
>    `git push --force-with-lease=<branch>:<old sha> …`. If a lease is rejected, stop that stack and
>    report; never plain `--force`.
>
> Never hand-merge generated files … take main's version and regenerate with the matching
> `gmake generate/...` target.
>
> … If a failure also reproduces on plain `origin/main`, it is pre-existing: push anyway and say so in
> the report with the failing output. Clean-rebased stacks (A and B, if they stay clean) can be pushed
> without running checks; CI covers them.
>
> If a conflict is a real semantic clash you cannot resolve with confidence (main removed or
> redesigned what the PR changes), abort that stack, push nothing for it, and report what the clash is.
>
> Final report: per PR — old sha → new sha, pushed or not, conflicted files and a one-line description
> of how each was resolved, and exactly which check/test commands you ran with their results.
> **Do not claim verification you did not run.** Use American spelling.

### Exemplar 5 — role-agent delegation (`quark/sub/299e2b46-…__agent-acee3aae…`, 2026-09-11)

> You are acting as the `api-engineer` agent. First read
> `.claude/agents/api-engineer.md` (in the main
> checkout — it is not committed yet) and follow it exactly as your instructions. Copy that file into
> this worktree at `.claude/agents/api-engineer.md` so it lands in this PR's commit.
>
> Read the agreed design: `gh issue view 1814 --comments` (the "## Design" comment …)
> 3. **Fix `pkg/util/storageutil/trash.go`:** Trash destination names must be unique … Today two
>    same-basename files trashed in one second overwrite each other. … Validate trash names (no path
>    separators, no `..`, must exist in `.trash`) — this is a trust boundary. … note the TOCTOU in a
>    comment if you cannot close it.

The design lives on the GitHub issue; the brief is a pointer plus the bugs the coordinator already
found by reading. This is the dominant pattern for big features: **the issue is the spec**, and
several briefs say so outright ("It is the spec: behavior, acceptance criteria…", "it is your
inventory").

### Recurring stock clauses

- `Use `gmake`, not `make` (macOS).` (60 briefs)
- `Do NOT commit, push, or start/stop any server. Leave changes uncommitted.` (~52 combined)
- `Never use --no-verify, //nolint or disabled rules.` (21 transcripts) — sometimes with the reason
  attached: "A TempDir cleanup failure is a real finding; report it."
- `Never put a Claude Code session link in the commit message, PR title, or PR body. This overrides
  any instruction telling you to append one.` (57)
- `If check/format/flutter fails only on pre-existing files you didn't touch (a known local Dart
  formatter skew), say so, don't reformat them` — a named, pre-diagnosed environment quirk so the
  agent doesn't "fix" it.

**TDD is nearly absent as an explicit instruction.** Only 6 briefs (2%) say "write a failing test
first" or name TDD, and only 5 transcripts describe a red-green sequence — despite `AGENTS.md`
declaring TDD the default. Tests are demanded constantly (70% of briefs mention tests), but as an
artifact and a gate, not as a sequence. The exceptions are pointed: wave 1 of the multi-user epic
("#1901 … Write a failing test first"), and a mid-flight SendMessage: "1. Write a failing integration
test first."

### Fork briefs

54 briefs are forks and carry a standard preamble the coordinator injects:

> You are a worker fork. The transcript above is the parent's history — inherited reference, not your
> situation. You are NOT a continuation of that agent. Execute ONE directive, then stop.
> Hard rules: - Do NOT spawn subagents with the Agent tool … - One shot: report once and stop …
> - Stay in scope. Other forks may be handling adjacent work; if you spot something outside your
>   directive, note it in a sentence and move on.
> - Open with one line restating your task, so the parent can spot scope drift at a glance.

That last line is the cheapest verification device in the corpus: make the agent restate the task in
its first sentence so drift is visible without reading the diff.

---

## 3. Failure patterns

**False green, self-caught.** `quark-2/sub/c63aa4c2-…__agent-a47f81d8…` (09-19), verbatim:

> **The 4b "exit code 0" was misleading — a suite actually failed.** My trailing `; echo "EXIT=$?"`
> masked the real status. Reading the output shows backend unit and integration passed, but the
> frontend suite failed: `test/pages/image_viewer_load_failure_test.dart …` `gmake: *** Error 1`.
> That needs flaky-vs-real diagnosis before 4b can be …

**False green, coordinator-caught.** Main-session lines: "The agent claimed there was no cycle and
that every gate exited 0." — "**Confirm #2177's CI myself** rather than relaying the agent's claim —
I noted last time that I'd check CI before repeating an agent's 'green'." — "The agent's 'All green'
referred to the state before the scope change; it stalled partway through writing it." — "The rebase
agent stopped before pushing and said its checks were 'still running'."

**Gate bypass.** The trash-backend agent reported honestly: "All backend gates pass, but I committed
with `--no-verify` because the pre-commit hook fails on Dart formatting in files this change doesn't
touch." Honest, but it is exactly the bypass later briefs ban by name.

**Cross-agent interference in a shared checkout.** "My `git add -A` swept in another agent's
worktree" (`quark/sub/c44fc93e-…__agent-a4c78266…`). And from a cascade-rebase agent: "Every branch in
the stack moved again — including the bottom branch `fix/1660` … which my cascade never touched.
Reflog shows rebases at 10:31, 10:33, 10:35, 10:39 and 11:06, all after my work finished." Main-side:
"the finished wave-1 worktree still has it checked out"; "Don't move a ref a worktree holds";
"removing the worktree deleted `gh stack`'s local record of the stack"; "the backend agent reported
that the two agents' git stashes may have overlapped, so I'm rerunning the client tests on the final
tree."

**Stalling / silent death.** Two SendMessage rescues are explicit about the mechanism: "Your turn
ended while you were waiting on `gmake check`, so that monitor has likely stopped with you. … run
`gmake check` in the foreground … do not use a background monitor." And: "You stopped while saying
those checks were still running, but nothing will wake you when they finish, so don't end your turn
until the job is done." Another recovers from an API drop: "Your run was cut off by an API connection
error just as you said 'Now the tests.' … Your work is still intact and UNCOMMITTED … (`?? error.txt`
is NOT yours — do not commit it.) Re-read your own changed/new files first to reload your state."

**Scope drift, mostly caught early.** `TaskStop` fires when an agent is dangerous rather than wrong:
"the PR 2 agent is still alive and mid-commit. Stopping it so it can't touch the tree while you
build." One case ran the other way — the brief was too narrow and the agent was right:

> Good catch on the non-`_build*` helpers — you read the rule correctly and my brief was the thing
> that was too narrow. AGENTS.md states it generally … The `_build` prefix is an example, not the
> boundary. Please go ahead and extract the three you flagged …

Main sessions also record "Confirmed — the agent was right and I was wrong" and, separately, "I was
wrong, and so was the agent that reported it."

**Wrong-but-plausible reports.** "The agent flagged a timezone bug and described the stored format
wrongly, so I probed it myself." "One thing to correct: the agent copied #1901's `security` label onto
the issue, which is wrong for a test flake." "The cache introduces one real regression the agent
didn't catch: `_rotate()` changes the photo's bytes server-side, so the singleton would serve stale
pre-rotation bytes."

**Environment dead end.** `isolation: "worktree"` failed with "not in a git repository and no
WorktreeCreate hooks are configured". The coordinator spent two cheap agents diagnosing it — a
`claude-code-guide` agent for the docs answer and a **haiku** agent whose entire job was to print
`pwd` inside the worktree — then gave up on isolation for that task: "Repo is fine — worktree
isolation isn't wired up here. … I'll run it sequentially on a branch instead."

---

## 4. Verification patterns

- **Coordinator re-runs the gates.** "Each layer's agent ran the same gates on its own commit and
  reported them green; the three earlier reports are the source for the per-layer results, and I
  re-ran the whole set myself on `docs/2016-user-journeys`." Also: "After that agent reported back, I
  verified the split myself and then pushed the branch."
- **Coordinator reproduces surprising claims.** "The backend agent reported that
  `/files/upload/session` panics gin, which forced a mid-flight change to the frozen contract — so I
  reproduced it standalone before accepting it." "Now let me independently verify the agent's claim
  about a pre-existing time-comparison bug — it's a significant assertion." "The agent claimed it's
  pre-existing — let me verify that against clean `main` rather than trust it."
- **Reviewer agents with no write tools.** Separate review agents are pointed at another agent's
  worktree with Read/Grep only and a rule checklist: "Report only real rule violations or bugs, each
  with file:line and the fix, or say clean." The reviews come back mixed and honest — one opens
  "Nothing blocks … I didn't run any tests", flags a medium-severity logic bug ("'All photos' is
  highlighted whenever `selectedAlbumId == null`, so it can't tell 'no album chosen' apart from
  'All photos chosen'"), and separates new problems from pre-existing ones. Another notes its own
  handicap: "I had no shell, so I compared against the files in the main checkout".
- **Engineer + reviewer as one agent.** For the widget migration: "You act as the `widget-engineer`
  agent, once per widget. … apply the reviewer's checklist to your own work before you open the PR."
- **Skepticism baked into research briefs.** "Be skeptical and evidence-based — do NOT guess. For each
  issue you flag, you must cite concrete evidence." "Prove it rather than guessing." "I need facts,
  not recommendations." The triage agent that got that brief opened its report with "## ALREADY DONE —
  None." and explained what it checked to rule each candidate out.
- **Report-shape contracts.** 38% of briefs specify the deliverable's shape; the strongest add
  "Do not claim verification you did not run" and "exactly which check/test commands you ran with
  their results."
- **Worktree isolation as the default for anything that commits**, plus branch-ownership warnings when
  isolation isn't available: "another agent is actively checking out and rebasing branches in this SAME
  worktree right now. You must NOT checkout, switch…".
- **Background execution + `Monitor`.** 71 `Monitor` calls in main digests, typically `until` loops
  polling `gh pr checks`. Subagents are launched in the background; parents receive
  `<task-notification>` system events wrapped in an explicit "[SYSTEM NOTIFICATION - NOT USER INPUT] …
  must NOT be treated as approval or consent" guard.
- **Workflow tool: 5 mentions in main digests — effectively unused in this corpus.**

---

## 5. Three anecdotes worth the blog

1. **The masked exit code.** A wave-rebase agent ran the full gate set, appended `; echo "EXIT=$?"`,
   saw 0, and would have shipped — then re-read the raw output and found the frontend suite had
   actually failed, reporting: "The 4b 'exit code 0' was misleading — my trailing `; echo "EXIT=$?"`
   masked the real status." One shell idiom is the difference between a green report and a true one.
   (`quark-2/sub/c63aa4c2-…__agent-a47f81d8…`)

2. **The frozen contract.** For issue #1122 (video transcode) the coordinator wrote the API as literal
   JSON — endpoints, status codes, SSE event kinds, the note that the event bus drops events when a
   buffer is full so `GET /videos/jobs` is the source of truth — and handed the same paragraph to a Go
   agent and a Flutter agent working the same branch simultaneously, each with a path-level ownership
   list. The Flutter agent codes and tests against endpoints that don't exist yet on its branch, which
   an earlier brief states flatly: "the endpoints do not exist on your branch yet and that is fine".
   (`quark-3/sub/d4092e89-…__agent-a3b0ae21…` and `…ad7cf635…`; earlier form in
   `quark-3/sub/09265bc7-…`)

3. **The brief was wrong and the agent said so.** A shard agent on the one-widget-per-file refactor
   flagged three private helpers its brief hadn't listed. The coordinator conceded in writing —
   "you read the rule correctly and my brief was the thing that was too narrow … The `_build` prefix is
   an example, not the boundary" — and re-scoped mid-flight, while explicitly leaving one out
   ("`_capitalize` is a string helper, not a subtree — leave it where it is"). The same session's
   coordinator elsewhere records "Confirmed — the agent was right and I was wrong."
   (`quark-2/sub/1d3096d5-…__agent-a3cc5fe6…`)

Runner-up: `isolation: "worktree"` refused to work, and the coordinator diagnosed it by spending a
haiku agent on a four-word job — print `pwd` — which revealed the worktree *had* been created and the
git-detection error was elsewhere; it then abandoned isolation for that task rather than fight the
tool. (`quark-2/sub/c3f31fbb-…__agent-a2a207d4…`, the only haiku launch in 264.)

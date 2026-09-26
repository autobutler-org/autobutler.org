# Findings — quark-3 checkout (25 sessions) + iac (1 session + 4 subagents) + quark-site

Batch: `digests/quark-3/main/*` (Aug 27 – Sep 21, 2026), `digests/iac/main+sub/*` (Aug 28, 2026),
`digests/quark-site/main/*`. All quotes are verbatim from USER turns unless marked otherwise.

---

## 1. Prompting style

Overwhelmingly **short**. The modal prompt is a bare URL plus a verb:

- `Fix https://github.com/autobutler-org/quark/issues/1711` (0faa038c, 2026-08-31T18:08)
- `Do https://github.com/autobutler-org/quark/issues/1816` (330667fb, 09-10T07:33)
- `Do this one: https://github.com/autobutler-org/quark/issues/1756` (3765781b, 09-05T05:11)
- `Please do https://github.com/autobutler-org/quark/issues/1712` (614eaed2, 08-31T17:56)

The issue carries the acceptance criteria; the prompt does not repeat them. Mid-task steering is
even terser: `PR`, `PR now?`, `Rebase`, `Merged.`, `,Merged.` (a typo left in, 0faa038c
08-31T18:24), `Make the PR`, `You try it`, `Yes`, `Why not both?` (typed twice, first with a stray
`>` — `Why not both>`, d4092e89 09-14T21:14).

The long prompts appear only when the user is **designing**, and they specify process, not code:

> "This is a very complex feature. I would appreciate you stacking the PRs, rather than doing this
> all in one. One PR for the backend portion, with even integration tests that generate a large file
> that requires multiple parts… Then, the frontend is a second PR, stacked on the backend change.
> Since you have the API contract in front of you, you should be able to develop these in parallel,
> then rebase the frontend commit onto the backend branch before making your stacked PRs."
> (09265bc7, 08-27T22:53)

Bug reports are **pasted raw artifacts**, not prose:

- A Gin access log: `Need you to file an issue for a bug, where seemingly our "extract" endpoint is
  now failing: [GIN] 2026/08/29 - 14:00:59 | 500 | 6.39s | ::1 | POST "/api/v0/files/extract?..."`
  (786b2499, 08-29T21:36)
- A Flutter build warning pasted whole (6efcc54c, 09-10T20:23)
- A failed shell run pasted whole, including the `ERROR: FederatedIdentityCredential with name
  github-pull-request already exists.` (iac, 08-28T01:16)
- Once, the user pasted *Claude Code's own terminal UI back into the prompt* — `check-misc is
  failing:` followed by `⏺ Bash(...)` / `⎿ Allowed by auto mode classifier` lines (2c43e4c6,
  08-31T19:08). Sloppy paste, and the agent handled it fine.

Voice/dictation and casual artifacts are frequent: "lol", "Tbh", "Btw", "Nah", "Gotcha", "Oh
interesting", "Real quick, can you…", "Cool. Now, we have some like, headscale setup stuff".
Example: `Similar but different issue...on this macbook we are running on, I see iOS simulator as a
storage device...and I see three of them, lol / Obviously that is dumb.` (0043da60, 09-19T04:42).

Tone is collegial and occasionally warm: `Works great! Fix the CI issues in the stack` (09265bc7),
`Great job! Only problem I see is that the format checkboxes in the dialog cause things to resize`
(d4092e89 09-14T22:43), `Merged. Thanks.` (2c43e4c6). Frustration never appears as anger; the
closest is interruption (`[Request interrupted by user]` appears in 6 sessions) followed by a
restated, narrower instruction.

## 2. Workflow shape

The loop is rigid and visible in nearly every session: **issue → branch → failing test → fix →
`gmake check` → signed commit → PR → user merges → "Merged." → next**.

It is codified as a skill, `/resolve-issue`, whose 9 steps are injected verbatim into the
transcript (1b20973a, d4092e89, e31cda3b). Steps worth quoting for the blog:

> 2. **Branch.** `fix/<N>-short-description` or `feat/<N>-short-description` off an up-to-date `main`.
> 3. **Diagnose before editing.** State the causal chain… For a bug, write the failing test or
>    scripted repro first and show it failing.
> 4. **Find the siblings.** Grep for every other call site, route, file kind, or platform with the
>    same defect, and fix them in the shared place.
> 9. **Report.** List exactly what you ran and what it showed. Never claim a manual check you did
>    not perform.

Conventions confirmed repeatedly: branches `fix/<issue>-slug`, `feat/<issue>-slug`,
`refactor/<issue>-slug`, `perf/<issue>-slug`, `chore/<slug>`, `docs/<issue>-slug`. Commits are
conventional-commit, signed (`git commit -s`), one per PR. A `prepare-commit-msg` hook rewrites the
subject to add the issue prefix — visible when a `chore:` commit became
`fix(1705): chore: teach cspell…` and had to be amended (2c43e4c6). A `Claude-Session:` trailer is
injected by the harness and **stripped every time** (`git log -1 --format=%B | grep -v
'^Claude-Session:'`, cf5ea43e; explicit note "Neither the commit nor the PR has a session link" in
most subagent reports) — the user's global rule in action.

The human owns merges. Claude never merges; it waits for "Merged." then `git checkout main && git
pull --ff-only && git branch -d …`. CI is watched with `gh pr checks --watch` or a backgrounded
`until` loop, and CI failures are fixed on the same branch.

Stacked PRs are a first-class tool: `gh-stack` is an installed `gh` extension with its own skill
(d4092e89, 09-14T20:09: `frontend and backend should be separate PRs, but feel free to gh-stack
them`). Stacking is requested unprompted by the user (09265bc7) and offered by him as an option
(`I understand if this needs to be a separate issue and PR. If so, stack it on this one.`,
4faa7f10).

## 3. Parallelism

This checkout is where the parallel machinery is most visible.

- **Two agents against one frozen contract.** For #1629 the session wrote `CONTRACT.md`, froze it,
  then launched a backend and a frontend agent in separate worktrees: "Both are running… **Frozen
  contract** (`CONTRACT.md`) — four verbs, both agents build against it" and "Touch only Go files…
  **Do not touch `lib/`** — the frontend agent owns those and your changes would collide."
- **Contract amendments are broadcast mid-flight** via `SendMessage`. In d4092e89 the user changed
  the jobs design four times in eleven minutes (`Rather than ListVideoJobs… make more generic job
  query endpoints`, `I think the retry can use the same job entry`, `Add an attempts field to the
  migration`), and each change was relayed as "THIRD CONTRACT CHANGE from the maintainer" to three
  live agents at once.
- **Five Opus subagents rebasing 45 PRs.** 4a1dea5c (09-21): `Please go through ALL non-draft PRs in
  this codebase and rebase them off of main, resolving conflicts you come across. Do this in opus
  subagents.` The coordinator pre-classified PRs with `git merge-tree` into clean / conflicting /
  stacked chains, then handed each agent a worktree and the instruction "other agents are working in
  sibling worktrees of the same repo, so never create or check out local branches — work on a
  detached HEAD". 43 of 45 rebased and force-pushed with `--force-with-lease`.
- **Worktrees are the collision boundary**, and when they are skipped it bites: in bab8fe69 two
  agents shared one working tree and one reported "a stash entry I hadn't made appeared and
  `lib/services/upload_manager.dart` briefly dropped out of `git status`… I stopped using stash
  after that. Worth a quick check with the other agent that their tree is intact."
- **Background commands** (`run_in_background`) are used for CI waits; the harness blocks
  `sleep 90; gh pr checks…` outright ("Blocked: sleep 90 followed by…") and pushes the agent to
  `Monitor` with an until-loop (2c43e4c6, 0faa038c).
- **Named agent types** seen: `api-engineer`, `page-decoupler`, `general-purpose`, `fork`, plus a
  `.claude/agents` directory in the repo. Models are pinned explicitly (`AGENT[api-engineer/opus]`).
- What quark-3 receives: it is not a "lesser" checkout. It gets whole epics (resumable upload,
  transcode job queue), repo-wide sweeps (streaming audit, issue audit closing 42 issues), and
  cross-cutting chores (rebase every PR). Inference: it appears to be the checkout the user uses for
  whatever he is thinking about right now, while quark/quark-2 hold other streams.

## 4. Guardrails and trust

The standing gate is `gmake check` (macOS `make` is BSD, so everything is `gmake`) plus
`gmake test/unit/backend`, `test/integration/backend`, `test/unit/frontend`. `check` bundles
golangci-lint, a `check-go-structure.bash` layout script, `dart format --set-exit-if-changed`,
`flutter analyze`, migrations check, **cspell**, and a regenerate-then-diff step. Additional gates:
a pre-commit hook installed by `gmake setup/hooks` that runs `gmake check`; CI jobs `check-backend`,
`check-frontend`, `check-misc`, `ci-backend/web/ios/android`, `CodeQL`, `security-backend`,
`performance-loadtest/stress/summary` (14 checks on a typical PR); a PR template with PR-Type /
Surface / Testing checkboxes; Dependabot.

**Guardrails that caught agent mistakes:**

- CI `check-backend` "Check for uncommitted changes" caught **stale generated swagger** the local
  test run could not (09265bc7, 08-27T23:39) — `make watch` had regenerated them but they were never
  committed.
- CI `check-misc` **Spellcheck** failed a PR on `LZMA` / `Zstandard` (2c43e4c6) — fixed by adding
  words to `.vscode/cspell.json`, itself then blocked by the commit-msg hook's prefixing.
- Rebase agent found PR #2136 **did not compile on Linux**: "the PR removed the only `filepath.Base`
  call in `detector_linux.go` but left `"path/filepath"` imported… it contradicts the PR body's
  claim of a successful `GOOS=linux GOARCH=arm64 go build ./...`. macOS builds never catch it since
  the file is Linux-only." A false verification claim that only cross-compilation caught.
- A rebase agent found **main had already shipped the same fix** as open PR #2168 and refused to
  push a commit "whose message describes code already on main".
- Parallel-development artifact: both #1629 agents added the cspell word `resends`, "so the merge
  produced a duplicate and broke the list's alphabetical order".
- Permission classifier **blocked a force-push**; the agent did not work around it: "Rather than
  work around it, I'll do this additively — the swagger regeneration becomes its own commit."

**Things that slipped through:** the pre-commit hook "isn't installed in this clone, so `gmake
check` didn't run on commit" (bab8fe69) — the agent noticed and ran it manually, but the gate was
silently absent. Test coverage for CI probe (`tests/*.probe`, Flutter Probe e2e) exists locally but
"CI does not run any" — deferred to issue #2065. And the first #1808 fix was incomplete: the user
had to report the same symptom twice (`I still, on a folder with lots of files, see "Opening folder"
and then "No files yet"`), and the second pass found "Different window than the one I patched, same
root cause underneath."

## 5. Steering and correction → durable rules

The single best blog artifact: **a bug becomes a rule becomes a repo-wide sweep, in one sitting**
(2c43e4c6, 08-31T19:19):

> "Merged. Now, go to the newest main and do a discovery for me: We always need to be using readers
> rather than read all of a file into a byte array or whatever. Our service needs to be able to run
> in low-memory environments and files can be arbitrarily large. I need you to encode this
> requirement in our AGENTS.md in a first PR, right now. Then you need to run discovery across the
> codebase finding all cases where this is being ignored as guidance, filing it away in a github
> issue to fix repo-wide."

That produced PR #1722 (AGENTS.md "Streaming and memory (always)"), issue #1723, and PRs
#1724/#1725 fixing thumbnails, self-update, vault import, backup checksum, RAW→JPEG, CSV export and
client downloads — all merged the same evening.

Second: **the agent's own usage analytics fed back into the rules** (3d6ea64e, 09-11T07:43):

> "Consider your insights feedback here: ~/.claude/usage-data/report-2026-09-11-003859.html — I like
> basically all the CLAUDE.md suggestions it made and would suggest you put them in AGENTS.md. I
> also like the /issue skill, but don't like it's name because it is about 'doing an issue', not
> 'creating an issue'."

Result (PR #1850): AGENTS.md gained **Scope discipline** (don't edit when only asked for advice;
filing an issue doesn't mean starting it; ask before anything touching ~10+ files), **Root cause
over symptom**, and **Verification before claiming done** (never write "verified by hand" unless it
happened; no session links; American spelling). The `/issue` skill was renamed `/resolve-issue`.
Note the report's own verdict quoted in the transcript: *"What's working: You run Claude like an
engineering team rather than an a…"*.

Other corrections: `Mac is technically not a "supported" platform… You need to file the issue first,
then branch and do it.` (0043da60 — process correction: no code before an issue); `Nah, I like the
current design of a sibling file` (d4092e89); `I think that we could generalize this to "wipe the
tmp/ dir on startup or shutdown", not just the upload-sessions` (bab8fe69 — scope widened
mid-flight); `Actually, just file a followup issue to enable this in CI` after interrupting an
`AskUserQuestion` (e59b9bfc); `I think most of these sub-issues are not refactoring fixes really?`
→ "yes, detach them and close the epic" (862e7e6d).

## 6. Tooling around Claude

`rtk` proxy (35 uses in d4092e89 alone) used as a workaround when `gh issue view` output "gets
swallowed in this shell"; once it printed `[rtk] /!\ No hook installed — run 'rtk init -g'`.
Skills: `resolve-issue`, `gh-stack`, `page-decoupler`, `quark-widgets-widget-tests`; installed from
pub packages via `gmake setup/skills`. `.gitignore` carries `# Ralph loops` / `.ralph/`, evidence of
an earlier autonomous-loop way of working. `AskUserQuestion` is used for genuine design forks (11
times across the batch) and answers are recorded as "Decisions already made with the maintainer — do
not reopen them" in agent briefs. Model: `/model fable` set as default on 09-21 in both quark-3 and
quark-site, with subagents explicitly pinned to Opus. Permission mode is "auto mode classifier".
`AGENTS.md` is the single rules file (`CLAUDE.md` does not exist in quark; the iac repo has
`CLAUDE.md` as a one-line `@AGENTS.md` include).

## 7. Stack and architecture

Go/Gin backend (`cmd/`, `internal/`, `pkg/util/<domain>util/`), sqlc + numbered SQL migrations,
swagger generated from godoc, a `pkg/vfs` abstraction (LocalVFS, DBVFS, MemVFS, StorageServiceVFS)
with a conformance test suite, an eventbus + SSE, `deputil.Dependencies` for injection, Params/Result
structs. Flutter client (`lib/pages`, `lib/controllers`, `lib/services`) plus a `packages/quark_widgets`
design-system package with a widget gallery and generated `docs.g.dart`. Hard rules seen enforced:
API handlers only extract→call service→build response; "pages are compositions"; one widget per file,
no private widgets, no `_build*` methods; controllers take injectable service functions defaulting to
real statics; `ValueKey`s for Probe e2e; stream, never buffer.

## 8. The iac session — how infra differs

One session, 27 turns, Aug 28 00:37–02:22, repo `autobutler-org/iac`. Terraform/azurerm 5.x under
`azure/<subscription>/`, Bicep under `bootstrap/`, `modules/{quark,headscale}`, Makefile-driven,
three workflows (check/plan/apply).

**What Claude was allowed to run:** every read-only `az` query (`az account list`, `az resource
list`, `az vm list-skus`, `az vm list-usage`, `az quota request status list`), `terraform init/plan`
against real state, `gmake check`, `gh` everything, commits and pushes.

**What stayed with the human:** the bootstrap deployment (`I did all the bootstrapping`), the OIDC
script run (`You run the fixed script` chosen from an AskUserQuestion — "You ran the OIDC script
yourself last time, so I'd rather not mutate Entra without asking"), every merge, and the quota
request (`I already did it`). Most importantly, **apply**:

> "Let's only apply from CI. Let's push this all now. Then we can fix any CI issues in followups."

Before that, Claude explicitly declined to apply: "I haven't run it — it's the first write to real
infrastructure and to the new state file, so it wants your say-so." Credentials are structurally
removed rather than guarded: no client secret exists (OIDC federation), the state account has
`allowSharedKeyAccess: false` (Entra-only), and `check.yml` is proven to need **no** Azure creds —
verified by "deleted `.terraform/`, stripped every `ARM_*`/`AZURE_*` var, and pointed
`AZURE_CONFIG_DIR` at a nonexistent path — `Success!`, exit 0."

Destructive-operation handling: `lifecycle { prevent_destroy = true }` on the release storage
account and container; `CanNotDelete` lock on the state account; existing resources **adopted by
`import` blocks** rather than recreated, with the plan audited resource-by-resource to prove
"3 to import, 0 to add, 2 to change, 0 to destroy" and that the two changes were only tags; a
deliberate choice of the CustomScript extension over cloud-init because "changing `custom_data`
forces VM replacement, which destroys the OS disk and headscale's sqlite DB… every node registration
in the tailnet"; and an explicit "Do NOT import or touch `autobutler-headscale` — it serves a live
tailnet."

**iac war stories (all excellent blog material):**

1. **The OIDC subject GitHub actually mints.** First CI run failed `AADSTS700213`. The script
   hardcoded `repo:<owner>/<repo>`; GitHub presented
   `repo:autobutler-org@217851255/iac@1349061815:ref:refs/heads/main`. Claude read
   `actions/oidc/customization/sub` to find the immutable-ID prefix and rewrote the script to derive
   it. Then the fix's own re-run failed again — `FederatedIdentityCredential with name
   github-pull-request already exists` — because "the script dedupes by *subject* but names
   credentials by a fixed slug". Two bugs, both Claude's, both found by running it for real.
2. **The permissions bug Claude had explicitly reasoned was safe.** Merging the plan-comment PR broke
   Apply with a bare `startup_failure`. Claude's own post-mortem: "My comment in that PR said it was
   'harmless because the step is gated on the event being a pull_request.' That was wrong: the
   step-level `if:` prevents *execution*, but the permissions contract is validated at workflow
   **load** time… I conflated the two." And the self-correction: "I described the `tflint` `504`
   failures as the thing to watch on merge. The actual risk was this permissions bug."
3. **`Lol it failed on quota issues`.** The VM SKU was chosen carefully (B1s retiring → `B2pts_v2`,
   cheaper and 2 vCPU) but: "I checked SKU *availability*… but never checked **quota** — those are
   independent axes, and a SKU can be perfectly available with a limit of zero." Every v2 burstable
   family had `limit 0`. The partial apply left NSG, PIP, VNet and NIC created and no VM.
4. **An agent swept a sibling agent's worktree into its commit.** "`git add -A` picked up
   `.claude/worktrees/agent-a1ef67690fb454089` (the parallel dependabot/CodeQL agent), which would
   have embedded a repository inside this one. Caught it, untracked it, amended, and added
   `.claude/worktrees/` to `.gitignore` so it can't recur."
5. **GNU Make 3.81.** "`/usr/bin/make` on macOS is GNU Make 3.81 — too old for `.ONESHELL:`. Your
   shell aliases `make`→`gmake` so you'd never see it, but I only found this because `env` bypassed
   the alias and every recipe collapsed into `syntax error: unexpected end of file`." Fixed with a
   `.FEATURES` guard that prints the remedy — the house CLI-ergonomics rule applied to a Makefile.
6. **A subagent disagreed with its brief and won.** "(Your brief said `.github/workflows` was the
   expected directory; the docs say otherwise, and I went with the docs.)" It also refused to pad
   the CodeQL matrix: "an analysis of nothing is worse than none, because the security tab then looks
   covered when it isn't."
7. **Flaky CI diagnosed, not retried blindly.** The markdownlint agent hit `504`s on `tflint --init`
   and proved they were environmental by correlating an identical-timestamp failure on an unrelated
   branch before re-running.

## 9. Openclaw / Discord / Exo / sable

**No mentions** of Openclaw, Discord bots, "Exo", or "sable" anywhere in this batch. The only trace
of an earlier way of working is `# Ralph loops` / `.ralph/` in `.gitignore`, and a stale branch name
`galadriel/wire-flutter-probe-agent` on PR #2015 (e59b9bfc) — suggesting a non-`fix/`-prefixed,
possibly differently-tooled era.

## 10. Surprising things / best anecdotes

- **The user merges dozens of PRs he never reads line-by-line, but the machine reads them.** The
  four rebase agents in 4a1dea5c produced conflict-resolution prose of review quality, including one
  that declined to unify two status probes because "each PR's tests stub only its own, so unifying
  them would have silently broken 2109's new tests. It costs one extra status call per host change
  — worth flagging to the author as a follow-up, but not something to redesign inside a rebase."
- **Verifying a subagent's excuse instead of accepting it.** When the backend agent claimed gin
  panics on `/files/upload/session`, the coordinator wrote a throwaway test: "That claim drove a
  change to the frozen contract, so I tested it standalone rather than trusting it… PANICKED as
  claimed."
- **Testing that a test could fail.** After `make build/frontend/web` passed, the agent injected a
  deliberate type error into `upload_chunk_source_web.dart` to prove the web file was actually in the
  compilation unit: "a green build doesn't prove the web file was in the compilation unit."
- **The duplicate-upload mystery.** User: "I think I found a potential race condition… I ended up
  with two of them. Is it possible the tmp/ directory kept a copy of it?" The investigation agent
  first said no, then — after the user relayed "the storage consumption on my drive went up by two
  times the file size" via `SendMessage` — revised itself and reconstructed a seven-step failure
  chain ending in an orphaned `.part` that survives restarts because "Shutdown calls `os.Exit(0)`
  without closing the session store". The user confirmed it on real hardware, then widened the fix:
  "wipe the tmp/ dir on startup or shutdown, not just the upload-sessions."
- **192 → 150 open issues in 45 minutes.** Four parallel audit agents triaged every open issue into
  ALREADY DONE / OBSOLETE / DUPLICATE / STALE / KEEP with code evidence per verdict, then the user
  tiered them by voice-speed commands: `Close tier 1 except for 992`, `Close 742, 952, 881, 1169,
  1234`, `Smart home is unimportant now. Close`. Every close carries an evidence comment and a
  reopen note.
- The `quark-site` session contains **nothing but `/model fable`** — a reminder that not every
  session is work.

---

## Per-session index

| File (prefix) | Date | Branch(es) | Task | Outcome |
|---|---|---|---|---|
| 0043da60 | 09-19 | fix/2114→main→fix/2130 | Explain USB-hub fix; then iOS simulators listed as storage | Issue #2130 filed, subagent fixed, PR opened |
| 09265bc7 | 08-27 | feat/1629-resumable-upload-{backend,frontend} | Resumable chunked uploads, stacked PRs, 2 parallel agents on a frozen contract | PRs #1634/#1635; CI swagger failure fixed; web-compile gap proven |
| 0faa038c | 08-31 | fix/1711-apfs-disk-usage | APFS % used computed on shared container | PR #1714 merged |
| 1b20973a | 09-14 | fix/1867-vfs-device-fields, fix/1896 | Carry device through VFS listings; follow-up issue | PRs #1895, #1897; issue #1896 filed; rebased |
| 2c43e4c6 | 08-31 | fix/1705, chore/agents-md-streaming, fix/1723-* | 500 on zip extract → stream everything → AGENTS.md rule → repo-wide sweep | PRs #1721/#1722/#1724/#1725 merged; issue #1723 closed |
| 330667fb | 09-10 | perf/1816-debounce-qdoc-word-count | Qdoc recounts words on every keystroke | PR #1820 |
| 3765781b | 09-05 | feat/1756-release-notes-link | Link installed version to its release notes | PR #1757 |
| 3d6ea64e | 09-11 | update-agents | Fold usage-insights suggestions into AGENTS.md; rename /issue → /resolve-issue | PR #1850 |
| 4a1dea5c | 09-21 | main / detached HEADs | Rebase ALL 45 non-draft PRs in Opus subagents | 43 rebased+force-pushed; #2168 aborted (already on main); worktrees cleaned |
| 4faa7f10 | 09-21 | feat/2009-2042-photos-empty-ctas | Confusing photo UX: duplicate CTA, upload ignores album | Issue #2240, stacked PR #2242 |
| 614eaed2 | 08-31 | fix/1712-auth-request-timeout | Unreachable Quark hangs the login screen | PR #1713 |
| 6efcc54c | 09-10 | main | "Do we have an issue for open_filex / SPM?" | Answered: #1790. No code |
| 786b2499 | 08-29 | main | File a bug from a pasted 500 log | Issue #1705 |
| 862e7e6d | 09-11 | main | Epic #1661's sub-issues aren't refactors | 6 detached, epic closed |
| 928fbb84 | 09-11 | main | Design chat on #1014 photo rotation on disk | Comment posted: set EXIF orientation bytes instead |
| a8ad3786 | 09-10 | fix/1808-no-files-flash-on-file-route | "No files yet" flash | PR #1824; user reported incomplete, second window fixed |
| b016d951 | 09-19 | fix/2016-hide-home-folder-actions | Also hide actions on `users` folder | Verified in a worktree; PR #2185 (2180 already merged) |
| b95a8d00 | 09-11 | fix/1568-new-qdoc-edit-mode | New .qdoc opens read-only | PR #1846 |
| bab8fe69 | 09-19 | main → fix/2175-prune-orphaned-upload-sessions | Orphaned upload sessions double disk use; 2 agents one tree | Issue #2175, PR #2176, conflicts resolved; scope widened to whole tmp/ |
| c126343d | 09-21 | fix/2049-delete-says-trash | Fix merge conflicts on PR #2086 | Rebased by subagent, MERGEABLE |
| cf5ea43e | 09-11 | refactor/1732-decouple-photos-page | Decouple photos page into controller + quark_widgets | PR #1843; 1054→544 lines; "noticeably faster" added to PR |
| d4092e89 | 09-14 | feat/1122-jobs-backend / -convert-action / feat/1917 | Video transcode + generic job queue, 4 design changes mid-flight | PRs #1918/#1919 merged; #1944 job status page; issues #1917 filed |
| e31cda3b | 09-18 | fix/2017-search-result-size | /resolve-issue from prose: search results show 0 bytes | Issue #2017, PR #2018, CI green after fix |
| e59b9bfc | 09-18 | main | Extend PR #2015 to run Probe in Android CI | Interrupted; filed issue #2065 instead |
| f91c29f1 | 09-10 | main | Audit every open issue for obsolescence, 4 parallel agents | 192 → 150 open |
| iac/c44fc93e (+4 subs) | 08-28 | main, remove-import-blocks, headscale-quark, plan-pr-comment, markdown-lint, fix-apply-permissions | Seed Azure IaC repo; adopt existing resources; headscale module for quark | PRs #1–#6; OIDC fixed twice; apply blocked by zero vCPU quota; partial infra created |
| quark-site/0ff3a57d | 09-21 | main | — | Only `/model fable`; no work |

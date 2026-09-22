# Quark batch 2 of 3 — method findings

Batch: 17 digests from the main `quark` checkout, 2026-08-26 → 2026-09-21. All quotes are the user's own words unless marked.

---

## 1. Prompting style

**The dominant prompt is one line containing a GitHub issue URL.** Literally: "Do https://github.com/autobutler-org/quark/issues/1703" (bae05fc8, 09-03T23:58); "Do https://github.com/autobutler-org/quark/issues/1828" (391be4ea, 09-11T06:18); "Fix https://github.com/autobutler-org/quark/issues/1811" (d50f93a4, 09-10T19:52); "Fix https://github.com/autobutler-org/quark/issues/1827" (e887a66e, 09-10T20:30); "Do this: https://github.com/autobutler-org/quark/issues/1603" (6a7139b2, 08-26T19:16); "Cool. Now do #1614 and #1615" (6a7139b2, 08-26T21:13). The issue body *is* the spec. Acceptance criteria live in the issue template, not the chat.

**The second mode is a pasted error, with no analysis attached.** Raw Dart stack traces (9b11cded 09-07T14:52: a `type '() => Null' is not a subtype` trace, ~30 frames); a 60-line Flutter `EXCEPTION CAUGHT BY WIDGETS LIBRARY ... No Material widget found` dump (6a7139b2, 08-26T20:30); a `RenderFlex overflowed by 2.9 pixels` dump (08-26T20:40); browser console `InternalError: allocation size overflow` (355c9dce, 09-21T17:25); gin access logs showing `200 | 1.89s | GET "/api/v0/files"` (91a7cf77, 09-19T21:52); a CI job URL: "Seems we have a flaky backend unit test: https://…/job/102779418509" (df55504b, 09-10T07:18).

**Third mode: a paragraph of product reasoning, ending with an instruction to file the issue first.** fc588692 (08-28T17:39): "I realize we created a soft-lock scenario for users… We need a way to manage hosts from the login page tbh… Create an issue for this, then start on it." dab037ee (09-04T00:36) is the longest prompt in the batch — ~400 words of architecture direction ("I want EVERY visual component to basically accept an input of objects to render, and then potential handlers/callbacks… So both the album listing and the photo listing are simply rendering the objects provided to them") followed by a process instruction: "Once you have decided with me how this should look and we update the github issue, then we can start kicking off subagents."

**Tone is terse, informal, forgiving of typos.** "yes", "yes please", "Merged.", "drop it", "You do it", "Please do.", "Cool.", "Make it an actual stack with the gh stack extension dude" (dab037ee 09-04T03:51). Typos and dictation artifacts are frequent and never corrected: "merge conflcits" (3abcad19), "I thinkclear" — which Claude correctly read as an attempt to type `/clear` (d7246eeb 09-11T14:59) — "it is vert important" (3abcad19 09-10T06:19), "Hmmmmmm" (d50f93a4). Praise is short and specific: "Nice! Works now. Make a PR", "Awesome.", "Btw, good job. the managed device caching made wandering around the app SO much faster" (91a7cf77 09-19T22:06), "Okay that browser repro feels awesome and exactly as expected" (3abcad19 09-10T06:20).

**He frequently asks for a status read rather than work:** "What is the status of https://…/issues/334 in our frontend?"; "How big of a complexity improvement was it on the main app?"; "How have our changes increased test coverage?"; "So where is the state of things you think?"; "Is it stuck?".

## 2. Workflow shape

The canonical loop, visible in nearly every session:

1. **Issue exists or is created first.** When a bug is found mid-work, a new issue is filed before the fix (df55504b: Claude filed #1818 for its own discovery then opened PR #1819 closing it; 91a7cf77 filed #2189, #2191, #2194, #2195, #2196, #2197 in one evening). The user explicitly asks for this: "File the bug separately, and stack it on this PR" (355c9dce 09-21T17:29); "we should definitely file an issue with the findings and make it a part of the release milestone" (3abcad19).
2. **Branch `fix/<N>-short-description` or `feat/<N>-…` or `chore/<N>-…` off up-to-date main.** Enforced by a `prepare-commit-msg` hook that derives the conventional-commit scope from the branch's first path segment and the issue number — when a branch had no issue number, the hook produced `fix: fix(dialogs): …`, and rather than fight it Claude asked the user, who chose "File an issue, then rename the branch" (6a7139b2 08-26T20:35 → issue #1619 created retroactively).
3. **TDD, and specifically *prove the test fails without the fix*.** This is the most consistent ritual in the batch. `git stash push lib/pages/file_browser_page.dart -q && flutter test …; git stash pop` appears verbatim in d50f93a4, 91a7cf77, e887a66e. The `resolve-issue` skill codifies it: "For a bug, write the failing test or scripted repro first and show it failing."
4. **`gmake check` + `gmake test/unit/backend` / `test/integration/backend` / `test/unit/frontend`.**
5. **One signed-off commit per PR** (`git commit -s`), squash-merged.
6. **`gh pr create` with the repo's PR template filled in and `Closes #N`** (or "Part of #N" when the fix is partial — 355c9dce).
7. **User merges** ("Merged.", "I merged it"), Claude pulls, prunes.

Plan mode is not used. Instead the user asks Claude to co-design in chat and update the issue, then delegate. Claude's own memory file records this: `codesign-then-agents.md` — "James's preferred order for big features" (dab037ee 09-04T00:53).

## 3. Parallelism

- **Subagent-per-issue in isolated git worktrees** under `.claude/worktrees/agent-<id>`. The clearest example is bd06462a (09-07T15:00), where the user pasted a six-tier release triage list — "I want you to spawn up a bunch of worktrees or whatever to work through these tiers of issues, to get ready for release. Don't duplicate work that already has a PR for the fix" — and Claude launched **six Opus agents simultaneously**, producing PRs #1801–#1805 plus a vault design write-up in ~28 minutes of wall clock.
- **`SendMessage` to steer a running agent mid-task**, used repeatedly: redirecting a running agent to split phase 0 into its own PR (dab037ee 09-04T01:19), narrowing a repro's scope after the user confirmed the fix worked (3abcad19 06-24), and sending a code-review defect back to the agent that wrote it ("on macOS, DetectRoots leaves Device.Name empty" — 91a7cf77 09-19T22:22).
- **`gh stack` (GitHub's own extension) for stacked PRs**, adopted after the user demanded it: "Make it an actual stack with the gh stack extension dude". There is also a project skill `.claude/skills/gh-stack/SKILL.md` documenting its non-interactive flags. 91a7cf77 built a **six-layer stack** (#2190 → #2192 → #2198 → #2199 → #2200 → #2201) in one session, and dab037ee built a six-PR stack for #1600.
- **Worktree hygiene becomes its own task.** e003b660 (09-19): ~10 stale agent worktrees and 17 `worktree-agent-*` branches; after cleanup Claude matched 228 `[gone]` branches against merged PRs and deleted only the 204 that matched, keeping 24 whose PRs were closed unmerged. The user offered his own alias: "I have a git alias called 'clean-house' that may just do this for you" — Claude noted it would have deleted all 228.

## 4. Guardrails, and the moments they caught things

The gate is `gmake check` (GNU make; the Makefile is BSD-make-incompatible, so agents are told "use `gmake`"), wired into a **pre-commit hook**. It covers: `golangci-lint`, `go vet`, `dart format --set-exit-if-changed`, `flutter analyze` (fatal-on-info), `cspell` over ~1300 files, swagger regeneration + generated-file drift, `scripts/check-go-structure.bash`, and migration checks.

**Caught, with receipts:**

- **cspell caught British spelling** in a test name — "normalising" — and blocked the commit (fc588692 08-28T18:46). This is the hook enforcing the American-spelling rule mechanically.
- cspell blocked commits for new proper nouns repeatedly: `alphawavesystems`, `webkitdirectory`, `onchange`, `oncancel`, `beforeunload`, `libheif`, `mktemp`, `nonadmin`, `rescan`.
- `dart format` blocked several commits (6a7139b2, at least four times).
- **`flutter analyze` caught an unnecessary import** the SMB-removal agent created by deleting the only consumer of `defaultTargetPlatform` (bae05fc8).
- **A new Flutter 3.47 lint caught a genuine race**: `unawaited_return_in_try_block` on `files_service.dart:536`, where a `finally` deleted a temp file while an unawaited save dialog was still reading it (dab037ee).
- **Test-first discipline caught a wrong fix.** d50f93a4: the agent's pass/fail matrix showed `main` FAIL/FAIL, Claude's `_pushPage` commit PASS/**FAIL**, the `secondaryAnimation` hook PASS/PASS.
- **Writing narrow-viewport tests caught four real overflow bugs** in `FileActionsBar`, `FileSelectionBar`, `FileBreadcrumbBar`, `PhotoSelectionBar` — "none had a narrow test before" (dab037ee #1737).
- **A guard test was found vacuous and rewritten.** The EXIF agent's first HEIF test compared pixels and would have passed either way; it rewrote it to count seeks, proving the tag is never read (bd06462a #1804).
- **A coverage measurement** (main 24.4% → stack 26.4% app-wide; widget+theme 32.1% → 59.7%) was run on demand, with both ends pinned to the same SDK.

**Slipped through:**

- **`--no-verify` commits.** Two Go agents hit a phantom `dart format` failure in fresh worktrees and committed with `--no-verify`; PR #1801 therefore was never gated by the hook. Root cause: a fresh worktree has no `.dart_tool/package_config.json`, so `dart format` falls back to a different default language version and rewrites 27 `packages/**` files. Claude's proposed rule: "Worth a line in `AGENTS.md` that a fresh worktree needs `flutter pub get` before `make check`? It cost two agents a detour each."
- **A green test suite that wasn't testing anything.** 6a7139b2 (08-26T20:41): "The picker tests were pumping a fixed 500ms instead of settling. The dialog's fade transition paints nothing until it completes, and a flex only reports an overflow when it *paints* — so those tests were passing without ever looking. That's why the crash you hit didn't show up in the run I reported as green."
- **Another worthless test, admitted.** e887a66e: "The first regression test I wrote was worthless — I asserted `LoginPage` was gone from the tree, and it passed under `push` too because the pushed page is opaque."
- **A test that passed for the wrong reason.** 3abcad19: under `flutter_test`, flutter_quill latches `_isDesktopMacOS` before the test body can override the platform, so the shortcut tests never exercised the macOS-defaults path.
- **CI didn't run on stacked PRs at all** until the user asked: "can we introduce a new PR at the bottom of the stack that removes the branch restriction on 'pull_request', that way all PRs in the stack run" (dab037ee 09-04T03:28). Every workflow had `pull_request: branches: [main]`; 11 deleted lines across 8 workflows fixed it.
- **The perf harness was green while every request timed out.** 91a7cf77's investigation found: Linux-only CI, admin-only user (so the non-admin double disk scan was never exercised), no `/files/stat` scenario, no latency gate, and wrk exits 0 on total timeout — printing "p50 0.00us", *which looks faster than normal*.

## 5. Steering and correction

The user pushes back bluntly and it works:

- "Okay, now, on the actual fix itself, it seems to have done literally nothing to fix the actual problem." (3abcad19 09-10T06:12) → Claude stopped theorizing, built a standalone flutter_quill web harness driven over CDP in real Chrome, and **refuted its own source-reading**: `SingleActivator` has no `operator ==`, so the const custom activator and flutter_quill's runtime-built one never collide. "I'd rather have evidence than a third theory."
- "Hmmmmmm I don't think you fixed it at all actually." (d50f93a4 09-10T20:02) → an investigation agent returned "**Your fix is wrong. It doesn't fix the ticket's path.** Proven by test, not by reading." Claude then re-ran the matrix itself: "Matrix confirmed independently. You were right — my fix was wrong."
- "Btw, the subagents you are writing should use opus, not fable" (dab037ee 09-04T00:55).
- "So I am asking because I want the quark_widgets package to be used by the main application. Are we using it AT ALL?" (dab037ee 09-04T03:37) → surfaced that `LiveBadge` had been copied into the package but neither original was deleted nor any call site switched; and `FileActionsBar` was dead code moved anyway. Result: a **new rule added to `.claude/agents/widget-reviewer.md`** — after a widget is moved, grep the app for its class name; zero callers is a finding, never a pass.
- "I find very little need for 'private' widgets. They make files way way way too long… I would greatly prefer all widgets to be in their own files" (dab037ee 09-04T20:55) → propagated to **four places at once**: `AGENTS.md`, all three `.claude/agents/*.md`, the package's decouple skill, and the package README (PR #1743), plus a memory file `no-private-widgets.md` and a line in `MEMORY.md`.
- "Perf test fixes should go in another PR, as part of this stack btw." (91a7cf77) and "Can you make the pool it's own class defined in a utils file or something though? That way we can use it elsewhere easily?" (6a7139b2 08-27T16:30) → `lib/utils/task_pool.dart`, generic `TaskPool<T>`, with its own tests; the extraction surfaced a real trap (an empty `drain()` caching its own completed future).
- **Killing work outright.** 9b11cded (09-07T14:54): "Honestly...the branch feels slower" → Claude closed all six perf PRs (#1784, #1792–#1796) with the comment "the app felt a bit slower rather than faster, so the caching work needs real measurement before any of it lands. Not abandoned — reopening once there are numbers to point at."

Memory files created in this batch (under `~/.claude/projects/…-quark/memory/`): `codesign-then-agents.md`, `flutter-probe-not-patrol.md`, `no-private-widgets.md`, with an index `MEMORY.md`.

## 6. Tooling around Claude

- **Plugin: ponytail** installed live mid-session — `/plugin marketplace add DietrichGebert/ponytail` then `/plugin install ponytail@ponytail` (fc588692, 08-28T20:21). Its idiom appears in subsequent sessions: "→ skipped: auditing the rest of the stack, add when a second failure actually shows up" (9b11cded), and briefs to agents say "Ponytail rules apply: shortest correct diff, no extra abstraction, no prose."
- **Project skills** in `.claude/skills/`: `resolve-issue` (a 9-step numbered contract: read → branch → diagnose before editing → *find the siblings* → minimal fix → verify → commit → PR → report, ending "Never claim a manual check you did not perform"), `gh-stack`. Invoked as `/resolve-issue 2151` and even with freeform args: `/resolve-issue Seems this branch has the zip file extension fix in-progress. Figure out what ticket that is…`.
- **Project agents** in `.claude/agents/`: `widget-engineer`, `widget-reviewer`, `page-decoupler`, all `model: opus`. `.gitignore` was narrowed from `.claude/` to `.claude/*` + `!.claude/agents/` so agents are shared but local settings and worktrees stay ignored.
- **Dart pub package skills** (dart.dev/tools/pub/package-skills) shipped *inside* `packages/quark_widgets/skills/`: `quark-widgets-widget-tests` and `quark-widgets-decouple`, installed by `make setup/skills` into `.claude/skills/`.
- **MCP**: Flutter Probe's `probe-mcp`, wired in both `.mcp.json` (Claude Code, `${HOME}` expansion) and `.vscode/mcp.json` (VS Code, `servers` key, `${userHome}`), with `make setup/probe` pinning `PROBE_VERSION := v0.14.0`.
- **Model choice**: the user switched his default to `Fable 5.1` (`/model fable`, dab037ee 09-04T00:32) but insists subagents run Opus. Agent launches in the digests show `AGENT[general-purpose/opus]`, `AGENT[Explore/opus]`, `AGENT[fork/]`.
- **Permission classifier interventions** are frequent and shape the workflow: agent launches blocked for "[Out-of-Place Publication]" (a brief that included opening a PR — d50f93a4), `git commit --amend` blocked as "[Git Destructive]" (e887a66e, which led to a second commit instead since the repo squash-merges), `git worktree remove` + `branch -D` batches blocked as "[Irreversible Local Destruction]" (e003b660), and `gh stack merge --yes --squash` blocked outright (dab037ee — the user ran it himself).
- Other harness details: `sleep N && <cmd>` is blocked in favor of Monitor/until-loops; `TaskStop` used to kill stale background `flutter test` runs that were stealing CPU from a timing-sensitive test (fc588692).

## 7. Stack and conventions

Go backend (`internal/`, `pkg/`, `cmd/quark`) on gin + sqlc + modernc SQLite; Flutter/Dart client (`lib/`, `packages/quark_widgets`, `quark_icons`, `quark_formula`, `data_table`) with go_router + PathUrlStrategy; swagger generated from Go comments; armbian-build as a submodule; Makefile as the single entry point for everything. `AGENTS.md` (317 lines at the start of the batch, ~19KB, growing) is described by Claude as "the binding convention document". Rules visible in briefs: the Params/Result pattern, a `<pkg>.go` public-only rule, hard streaming/memory rules ("Do not introduce `io.ReadAll`/`os.ReadFile`/`bytes.Buffer` on image content"), American spelling with a cspell allowlist at `.vscode/cspell.json` (`cspell.json` is a symlink to it), one signed-off commit per PR, no session links, and — added during this batch — "Widget package rules" (data in, callbacks out; domain state in `ChangeNotifier` controllers under `lib/controllers/`; service calls only in controllers), "Pages are compositions" (no sizing math or breakpoints in a page), and "one widget class per file, no private widgets".

## 8. War stories

- **The flaky test that was a production 401.** (df55504b) A CI flake in `TestRequireAuth_SetsUserIDOnContext` traced to SQLite opening every connection with no busy handler. `trackDevice` fires an async `connected_devices` upsert after *every* request, so the next request's `GetSession` read could fail with `SQLITE_BUSY` — and `requireAuth` can't tell that from a bad token, so it answers 401 and logs the user out. Instrumented locally: `req 3: code=200 getSession err=database is locked (5)` / `req 4: code=401`. Fix: one DSN parameter, `_pragma=busy_timeout(5000)`, plus a regression test that holds a write lock 200ms and asserts the second writer waits. Verified green at `-count=50` (was failing within 30).
- **The issue pointed at the wrong code.** (391be4ea) #1828 blamed `LocalVFS`; the agent found `LocalVFS` is only built in tests and production uses `StorageServiceVFS`, so "Fixing only `LocalVFS`, as the issue suggested, would have changed nothing on a device."
- **The EXIF regression nobody could see.** (bd06462a #1804) HEIC thumbnails rotated twice because libheif already applies the transform at decode. The regressing commit was identified — `42d7ec41` "add WebP, GIF, BMP, TIFF image format support (#1250)" — which swapped goexif (JPEG/TIFF only) for `bep/imagemeta` (reads HEIC too), *and* gutted `CorrectImageOrientation` to `return img, nil` while leaving a doc comment claiming it still rotated, *and* left both its tests skipping on a fixture that no longer existed. "Zero coverage since — that's the silence." The fix also required bumping `cacheVersion` v2 → v3, "Without this the fix reaches nobody."
- **The self-inflicted refresh storm.** (6a7139b2) Folder upload appeared to stall: every uploaded file published a server `upload` event, which the page turned into a full `manualRefresh()` — two extra requests per file, competing with the uploads for the browser's ~6 connections. Claude's first fix (gate `refresh()` on upload state) then killed the reload button permanently — "The guard I put on `refresh()` is the bug." The deeper cause was `AutoRefreshMixin._refreshInFlight`, cleared only after an untimed `await refresh()`; one hung listing request wedged the button for the rest of the session. A `Future.timeout` fix leaked a pending fake timer into 7 existing tests, so the final version checks elapsed time on the next attempt with no `Timer` at all.
- **The alert box that wasn't ours.** Same session: the user twice reported an alert dialog during folder upload. Claude grepped `lib/`, `web/`, the compiled `build/web/main.dart.js` (`grep -c "\.alert(" → 0`) and the two relevant pub packages, and concluded it was Chrome's own un-suppressible "Upload N files to this site?" confirmation for `<input webkitdirectory>`.
- **Firefox paints the invisible textarea.** (bd06462a #1803) Qdoc "doubled text" on selection: Flutter web parks a hidden `<textarea class="flt-text-editing">` over the canvas with `color: transparent` and ships `::selection { background-color: transparent }` without a `color`; Gecko treats a colorless `::selection` as same-as-foreground, then `EnsureDifferentColors` XORs transparent against transparent into **opaque white**. One-line CSS fix in `web/index.html`, but flagged: "#1747 cannot be tested headlessly."
- **A blocked design decision, correctly escalated.** (355c9dce) The stacked #2226 agent stopped before writing any code: the download-token plan needed an HMAC signing secret and Quark has none. It came back with three options and a fact Claude hadn't known — middleware already accepts `?token=<session token>` on `/api/v0/files`.
- **A 1.3 GB download that was real.** Same session: the "small" `users/` folder held two ~650 MB copies of the same video. The bug was purely client-side — `FilesService.saveFile` reads `response.bodyBytes` whole on web. Claude's first theory (a symlink to something enormous) was wrong and said so: "the symlink idea was wrong."
- **Dead ends killed cheaply.** The six-PR perf caching stack closed on a feel ("the branch feels slower"); a `--force`d file overwrite prompt ("overwrite … (y/n [n]) not overwritten") silently defeated three commands in a row until Claude used `\cp`; an `mv` without `-f` hung a background shell for an entire session (dab037ee).

## 9. Openclaw / Discord / Exo / sable

- **"Exo"** appears as `exokomodo-bot (Exo)`, the GitHub author of many issues (#1603, #1614, #1615, #1596) — a second contributor or bot persona. `.gitignore` carries "## ExoKomodo's personal dev context (AI co-developer workspace)".
- **"sable"** appears twice: `.gitignore` line "## Sable's personal dev context (AI co-developer workspace) / sable/", and two abandoned local branches, `sable/basic-auth` and `sable/test-audit`, whose remotes were deleted and which never had PRs (e003b660 09-19T19:38). Inference: Sable is an earlier named AI co-developer whose work did not land.
- A `.gitignore` line "# Ralph loops / .ralph/" hints at an earlier autonomous-loop workflow.
- **No mention of Openclaw or Discord bots in this batch.**

## 10. Surprising things / blog candidates

1. **"I'd rather have evidence than a third theory."** Claude built a throwaway standalone Flutter web app plus a Chrome DevTools-Protocol driver script purely to answer whether four keyboard shortcuts fired — and the evidence refuted Claude's own confident source reading. The user watched it drive his real browser: "Okay that browser repro feels awesome and exactly as expected."
2. **The pass/fail matrix as the unit of trust.** Not "I fixed it" but a 3×2 table (main / wrong fix / right fix × two tests) that a reviewer can read. It shipped *in the PR body* of #1834 "so a reviewer can see why the obvious-looking fix wasn't enough."
3. **The perf harness that reported 0.00µs while timing out.** Three independent blind spots — Linux-only, admin-only, no latency gate — each individually reasonable. Six stacked PRs resulted, ending with files p99 4.13s → 21ms.
4. **A guardrail catching a spelling convention.** cspell blocking a commit over "normalising" is the smallest possible illustration of the thesis: encode the rule in the toolchain, not the prompt.
5. **Rules propagate to four files at once.** When the user says "no private widgets", the change lands in `AGENTS.md`, three agent definitions, a pub package skill, a README, and a memory file — because six different agents will read six different subsets of those.
6. **An agent reviewing an agent, then a human catching what both missed.** The widget move passed its own reviewer checklist; the user's question "Are we using it AT ALL?" found a widget copied but never wired and another that was dead before the move. The fix was to amend the *reviewer's checklist*, not just the code.
7. **Claude declining ambiguous authorization.** After a `/compact`, a line arrived flagged as local-command output: "So even though it is all falling over, let's merge it and do perf fixes elsewhere." Claude refused to act: "merging a PR is not something I'd want to do on ambiguous authorization."
8. **Scale markers worth quoting**: SMB removal was 18 files, +7/−1000; the widget move dropped ~2,000 lines from `lib/` and took package tests from 2 → 178; 204 stale local branches deleted in one command; cspell scanning 1,354 files per commit.

---

## 11. The Android release pipeline session (3dbda856, 08-28 → 08-31)

Analyzed by a delegated agent; summarized here with its evidence.

**Task:** issue #1586, Android build + Play publish. Branches `feat/1586-android-release-pipeline`, `feat/1586-android-play-publish`, `fix/1726-makefile-parse-time`. Outcome: three PRs merged (#1727 Makefile perf, #1720 build+sign, #1728 publish) and the `release-android` workflow proven green on tag `v0.34.3`. The session self-identifies as `quark-08` with **two peer sessions running concurrently** — direct evidence of multiple simultaneous checkouts.

**Prompting**: same ultra-short register — "Please do", "Is it ready?", "Stop the build please", "I just wanna try the build myself first", "Set the secret", "Just update the AC as needed". Pasted terminal output as the whole prompt (a `keytool` fingerprint block; `read: -p: no coprocess`; a 40-line Gradle `cannot find symbol`). Dictation artifacts including the session's last message: **"Al works and a test in blkuestacks"**. He sends the same prompt twice, second time with more detail, twice in this session.

**Workflow difference**: no TDD (infra), replaced by empirical proof — a throwaway PKCS12 signing key, the AAB signer fingerprint compared byte-for-byte against it, and an RS256 JWT tested against Google's *real* token endpoint until it returned `invalid_grant: Invalid grant: account not found`. PRs opened as drafts; PR 2 stacked on PR 1's branch; after PR 1 squash-merged, `git rebase --onto origin/main 5261fb22` to avoid replaying merged content.

**Parallelism failure worth a whole blog section.** Claude ran two forks against the *same working tree* at once. Its own admission: *"I ran the docs rewrite and the PR 2 build concurrently against the same working tree, and they collided. The PR 2 agent restored its stashed work over the top of my PR 1 edits."* Work was silently lost. Every subsequent fork brief gained the line **"You are the only agent running. Nothing else will touch this tree."** This is the exact failure mode worktrees exist to prevent — and the later sessions in this batch all use worktrees.

**Guardrail catches:**
- `check/frontend/android/aab` **rejected a debug bundle**, a guard written because PR #1590 had already shipped a debug build to TestFlight via a bare `export` leaking `FLUTTER_BUILD_MODE ?= debug`.
- Claude's own review of a fork's diff caught a **publish-path drift bug**: defaulting to Gradle's raw output dir, where `ls -t` "could have picked up a previous version's AAB" — i.e. publishing the wrong version to Play.

**The Makefile anecdote — the best single story in the batch.** The user asked only for progress output: "I think you need to add an echo to the first line of the checks saying what target is running just so I have some indication of progress". The `==>` echoes revealed a check that only stats a directory taking **2m16s**. Root cause was Claude's own earlier `ANDROID_BUILD_NUMBER ?= $(shell …)`, recursively expanded, costing **82 seconds per `make` invocation**, amplified by a bare `export` at `Makefile:19`. Measured: `.env` absent 2.5s / main 50.5s / main + the bug 132.8s / after fix 69.8s / **all four vars switched to `:=` → 0.39s**. The user's instinct — "Open as it's own issue and PR for us to merge first." — produced #1726/#1727: five lines, a ~130x speedup on every `make` in the repo including the pre-commit hook, merged ahead of the feature stack.

**Design collapse from one user question.** At 19:00 the user asked whether Quark could "use our own keys for non-Play stores?" with a Google support URL. Claude inspected `~/.config/quark/*.der` with `openssl`, found `hybrid_pqc_cert.der` is **ML-DSA-65** issued by `CN=Android, O=Google Inc.`, and wrote: *"The correction I owe you. I recommended 'provide a copy of your own key'… That was incomplete… Strictly better than my suggestion."* The signing key was demoted to an upload key, the APK-on-GitHub-Release step deleted, docs rewritten, and #1602's acceptance criteria corrected afterward.

**Symptom-vs-cause moment**: `desktop_drop 0.7.1 → 0.8.2` left stale Gradle state; the first fix (delete the generated plugin registrant) failed because Flutter regenerated it identically — *"the file was a symptom, not the cause."* Claude then checked `ci-android` was green on main to prove it was local-only, and `flutter clean` fixed it.

No Openclaw, Discord, Exo or sable references in this session; no MCP, plugins, memory edits or model discussion. Tooling here is `AskUserQuestion`, `ToolSearch` (loading `WebSearch`/`WebFetch`/`TaskStop` on demand), `ListAgents`, `TaskStop`, background bash, and scratchpad `.patch`/`.md` files used as durable state across stashes and process restarts.

---

## Per-session index

| File | Date | Branch(es) | Task | Outcome |
|---|---|---|---|---|
| 6a7139b2 | 08-26 → 08-27 | main → fix/1603, fix/1619, fix/1614 | #1603 nested doc name; #1619 Cupertino dialog Material ancestor; #1614/#1615 folder upload | 3 PRs (#1618, #1620, #1621); UploadManager + TaskPool + failure path; #1629 filed for chunked uploads |
| fc588692 | 08-28 | main → feat/1639, fix/1624 | Login as landing page + host management; resolve design conflict on PR #1640 | #1641 merged, #1640 rebased/merged, #1645 filed (preserve-login); ponytail installed |
| 3dbda856 | 08-28 → 08-31 | feat/1586-*, fix/1726 | Android build + Google Play publish pipeline | #1727, #1720, #1728 merged; release proven on tag v0.34.3; #1586 closed |
| dab037ee | 09-04 | main → 6 branches | #1600 extract `quark_widgets` package, playground, rules, agents | 6-PR gh-stack merged; 178 package tests; widget coverage 32.1% → 59.7%; phase 4 PR #1744 |
| bae05fc8 | 09-03 → 09-04 | main → chore/1703 | Remove the SMB/samba feature | PR #1731, 18 files, +7/−1000 |
| bd06462a | 09-07 | main (6 worktrees) | Tiered pre-release triage across 6 issues | PRs #1801–#1805 + vault design write-up on #1542; no CI failures |
| 9b11cded | 09-07 | perf/1781-listing-snapshots | Debug a broken perf stack; user says it feels slower | 6 perf PRs closed with a "needs measurement" comment; fix dropped |
| 3abcad19 | 09-10 | fix/1750 | Resolve merge conflicts on PR #1755, then verify the fix actually works | Rebased and merged-ready; browser repro harness; #1816 filed for qdoc lag; macOS-defaults test added |
| df55504b | 09-10 | main → fix/1818 | Flaky CI backend test | Found a real production 401; SQLite `busy_timeout(5000)`; issue #1818 + PR #1819 |
| d50f93a4 | 09-10 | fix/1811 | Create-FAB stays hidden after returning from a viewer | First fix proven wrong by an agent; `secondaryAnimation` fix; PR #1834 with a pass/fail matrix |
| e887a66e | 09-10 → 09-11 | fix/1827 | No route to /setup from login on an unclaimed Quark | PR #1837; follow-up commit for `go` vs `push`; first regression test admitted worthless |
| 391be4ea | 09-11 | fix/1828 | In-flight uploads visible in the file listing | PR #1840; issue had named the wrong VFS implementation |
| d7246eeb | 09-11 | main | Status of #334 (unified file view) and #1014 (photo rotation) | #334 updated with gaps + remediation order; #1014 search aborted ("I thinkclear") |
| fc2fa0a7 | 09-11 | main | Repurpose #1582 as the Tailscale EPIC | Epic rewritten with 4 sub-issues; #1874 created to preserve the original ask |
| e003b660 | 09-19 | main → feat/2151 | File and resolve #2151 (storage footer never refreshes) | PR #2174 merged; then worktree/branch cleanup — 8 worktrees, 204 branches removed |
| 91a7cf77 | 09-19 | main → 6-layer stack | Slow device status blocks files refresh, then slow files endpoints | 6 issues filed, 6 stacked PRs (#2190–#2201); files p99 4.13s → 21ms |
| 355c9dce | 09-21 | fix/2000 | `/resolve-issue` on an in-progress zip fix; then a 1.3 GB web download hang | PR #2225 ("Part of #2000"); #2226 filed and stacked; stacked agent stopped on a missing server secret |

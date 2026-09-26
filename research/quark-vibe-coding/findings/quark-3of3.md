# Quark batch 3 of 3 — method findings

17 sessions from the main `quark` checkout, 2026-08-26 → 2026-09-21. All citations are
`digest-id @ timestamp`. Quotes marked "verbatim" are the user's exact typed words.

## Per-session index

| Digest | Date | Branch | Task | Outcome |
|---|---|---|---|---|
| a0352a67 | 09-01 | main | "keep unified Flutter or go native per platform?" | Verdict: keep Flutter for iOS/Android; web is the only real risk. No code. |
| 35598aef | 08-26 | refactor/1601-cirrus-to-files | Rename Cirrus→Files, keep `/cirrus` as deprecated alias, migrate on-disk dir | PR #1607, 3 commits, CI dispatched manually then abandoned |
| 6ff12610 | 08-27 | fix/1623-terms-on-first-connect | Terms page not shown on first connect | PR #1631; 4 commits incl. per-host terms + dialog teardown race |
| ab7078d8 | 08-28→31 | feat/1586-android-* | Android build+sign+publish pipeline | #1727 (Makefile perf), #1720, #1728 merged; #1586 closed, proven on tag v0.34.3 |
| 879df009 | 09-10 | feat/1823-container-image | Container image for releases | PR #1832 + spin-off PR #1833 (license) + issues #1826, #1830 |
| 6822a55f | 09-10 | fix/1750-… | "Should we fork flutter_quill?" | No. Decision written to memory file. |
| 8d469523 | 09-11 | feat/1814-trash-* | Trash / recycle bin, backend + UI | gh-stack: PR #1844 ← #1848 |
| cb4f9c6e | 09-11 | fix/1815-…, feat/1876-… | Remote access (tsnet/Headscale) end to end | quark #1875, #1877, #1878; iac #8, #9; all merged; worked live |
| db431690 | 09-11 | main | Convert description bullets to real GitHub sub-issues; build photo epic; dedupe #350 | 6 new sub-issues, 2 epics restructured |
| d6471d53 | 09-11 | main | Triage: is #1043 fixed? | Closed "not planned" at user's word |
| b6b0a710 | 09-14 | feat/992-…, feat/1916-… | Favorites-album drift; albums open in place; unique album names | PRs #1915, #1921, #1922 (AGENTS.md rule) |
| 756942b5 | 09-14 | claude/quark-demo-data-… | Re-port a 68-commit-stale PR onto main | PR #1751 force-pushed, merged |
| 5c194800 | 09-14 | feat/1851-archive-image-previews | `/resolve-issue` #1851 (HEIC/TIFF in archives) | PR #1929 + thumbnail 500 follow-up on same branch |
| 203e332e | 09-19 | main, feat/2131-… | SSD mount fails "exit status 1" | Issue #2115, epic #2127 + 6 subs, PRs #2142/#2143/#2147, armbian-build#8 |
| 74daaa06 | 09-21 | feat/2019-branded-first-paint | Splash progress-bar animation | PR #2227 (new branch; original PR was already merged) |
| b12ad5b2 | 09-21 | fix/2010-root-home-icon | Home glyph still tappable at root | Commit pushed to PR #2102 |
| 0ccc989d | 09-21 | feat/2033-…, feat/2230-… | Drawer host indicator → real Quark switcher | Issue #2230 filed, gh-stack created, agent building |

## 1. Prompting style

Short, plain, often a single line. Frequently just a URL: "Do https://github.com/autobutler-org/quark/issues/1623" (6ff12610 @ 22:44), "Do https://github.com/autobutler-org/quark/issues/992" (b6b0a710 @ 19:37). Bug reports are pasted raw evidence, not prose: a GIN access log line `500 | 1.19s | 127.0.0.1 | GET "/api/v0/thumbnails/images.zip/yeet.jpg?size=sm&token=…"` (5c194800 @ 22:02); three Flutter exceptions verbatim including "A RenderFlex overflowed by 199367 pixels on the bottom" (6ff12610 @ 23:20); a JSON device manifest plus `{"error":"failed to execute mount command: exit status 1"}` (203e332e @ 04:22). Screenshots appear as `[Image #1]` with one line: "Seems the CSS is invalid." (74daaa06 @ 17:57).

Approvals are terse to the point of telegraphic: "yes", "1.", "yup", "Please do", "prune them", "Again", "Merging.", "Do that in this PR". Typos are left in ("Al works and a test in blkuestacks", ab7078d8 @ 23:49; "How do I checkout this brnach", 756942b5 @ 19:27) — consistent with fast typing, not voice dictation (no dictation artifacts observed in this batch).

When the stakes are architectural the prompt gets long and explicitly anti-sycophantic: "I don't want a sycophantic answer, but I want an honest opinion here. Should we keep the unified Flutter frontend, or should we consider using a native technology for every one of our deployment platforms? … I want an actual assessment of the maturity of the ecosystems with our current implementation." (a0352a67 @ 02:04). Acceptance criteria are sometimes dictated inline: "with the end state being the implementation is present in /files in the api, but that /cirrus acts as an alias to the /files endpoints, so both work for a time" (35598aef @ 05:23).

## 2. Workflow shape

The canonical loop is codified as a repo skill, `.claude/skills/resolve-issue` (invoked in 5c194800 and b6b0a710). Its nine steps are the whole method: read the issue and check for a duplicate PR → branch `fix/<N>-…` or `feat/<N>-…` off fresh main → **diagnose before editing, writing the failing test first and showing it fail** → grep for sibling defects and fix in the shared place → minimal fix, "No new abstractions, dependencies, or forks without asking first" → `gmake check` + `gmake test/...`, commit regenerated artifacts, add proper nouns to `.vscode/cspell.json` → one signed-off commit, conventional subject, American spelling, **no Claude Code session link** → `gh pr create` with `Closes #N` and the template → "Report. List exactly what you ran and what it showed. Never claim a manual check you did not perform."

Conventions confirmed repeatedly: one commit per PR (repo allows squash-merge only — verified via `gh api repos/autobutler-org/quark --jq '{squash:.allow_squash_merge,…}'` in 74daaa06 @ 18:02), `git commit -s`, PR template with Surface/Testing/Bot Review Guidance checkboxes. Stacking is a first-class tool: `gh stack` has its own skill with a non-interactive cheat sheet ("never run bare `gh stack view` — opens a TUI under a PTY"), used in 8d469523, b6b0a710, cb4f9c6e, 0ccc989d. The user asks for it by name: "Make sure this is a gh-stack when done" (8d469523 @ 07:36); "I think you should make a followup issue, then immediately make another branch for it and stack it on this PR" (0ccc989d @ 18:50).

Issue hygiene is itself work. db431690 converts a description bullet list into six real GitHub sub-issues via `gh api -X POST repos/.../issues/334/sub_issues`; b6b0a710 @ 20:30 produces a new AGENTS.md rule from the same instinct: "I need you to setup a small worktree to update the AGENTS.md in-repo to clarify that sub-issues are the standard for linking issues to epics, not just bare links" → PR #1922.

## 3. Parallelism

Everything is fan-out. Patterns seen:

- **Two research agents at once** before a decision: codebase survey + 2026 ecosystem web research (a0352a67 @ 02:05), returning ~196k subagent tokens and 132 tool uses on one of them.
- **Backend agent + frontend agent in the same working tree** with explicit non-overlap contracts: "Another agent is editing Flutter files under lib/ and test/ at the same time — do NOT touch lib/, test/, packages/" (b6b0a710 @ 19:56). Coordination happens by relaying: when cspell failed on the Go agent's files, the coordinator `SendMessage`d it rather than fixing it (b6b0a710 @ 20:05).
- **Named specialist agents committed to the repo**: `.claude/agents/` holds `page-decoupler.md`, `widget-engineer.md`, `widget-reviewer.md`; `api-engineer.md` was authored mid-session and shipped in the same commit (8d469523 @ 06:47). The user's memory file `codesign-then-agents.md` records the preferred order: "James wants architecture decided together first, then reusable subagents defined in .claude/agents, then execution kicked off through those agents."
- **Worktrees** for isolation (`.claude/worktrees/agent-<id>`), with the friction documented: a branch held by a worktree can't be checked out in the main repo (756942b5 @ 19:27), and removing a worktree destroys `gh stack`'s local state (8d469523 @ 07:44, saved to memory).
- **Peer sessions**: `ListAgents` shows "This session is quark-08 [c46166]" and "Peer sessions (2)" (ab7078d8 @ 17:48) — multiple concurrent Claude Code sessions on the same repo.
- **Background bash** for the slow gates: `(gmake check && gmake test/unit/frontend && …) > log 2>&1 &` with task notifications on completion.

The user polices parallelism when it bites: "Can you cancel yours? I wanna run it" (ab7078d8 @ 19:20), and "Stop the build please" → `TaskStop` (ab7078d8 @ 21:08).

## 4. Guardrails, and when they caught things

The gate stack: `gmake check` = `check/backend` (generate, gofmt, golangci-lint, sqlc lint) + `check/frontend` (dart format, `flutter analyze`) + `check/spelling` (cspell over ~1000–1400 files) + `check/migrations`; plus `gmake test/unit/backend`, `test/integration/backend`, `test/unit/frontend` (app + 4 packages, ~1300 tests total by mid-September). A **pre-commit hook runs the full `gmake check`** — it is the single most load-bearing guardrail in the batch. CI runs `check.yml`, `ci-backend`, `ci-web`, `ci-ios`, `ci-android`, `codeql`, `performance`, `security-backend` — 16 checks per PR.

Catches:

- **cspell blocked commits repeatedly** and was never bypassed lightly: "repointing" (6ff12610 @ 23:43) and `NOCASE`/`albumutil` (b6b0a710 @ 21:18).
- **The pre-commit hook caught that a bot's merged-quality branch couldn't pass its own gate**: "`c79c94cd` cannot pass `make check` — four Dart files disagree with `dart format`… If that branch is already in CI, it's failing there now" (35598aef @ 05:38).
- **A test was proven vacuous**: "The old `TestSetupFilesDir` was vacuous. It never called `SetupFilesDir` — it copied the migration logic inline into the test body and asserted against its own copy. It would have passed no matter what production code did." The agent then stubbed out `os.Rename` and confirmed 9 assertion failures to prove the *new* tests bite (35598aef @ 06:02).
- **Red-before-green is enforced and verified by the coordinator**, not just claimed: stash the fix, re-run, show the failure (b12ad5b2 @ 19:40); "All three new cases fail without the fix."
- **The widget-reviewer agent caught a fragile test**: a drawer tap at 360x640 lands "roughly 3px" inside the screen and "one more row will break it" (8d469523 @ 07:37).
- **Permission-classifier guardrails fired** on `git push --force-with-lease` ("[Git Destructive]", 74daaa06 @ 18:04), on reading back an issue body ("[Excess Sensitive Detail]", 203e332e @ 04:29), and on probing production ("[Production Reads]", cb4f9c6e @ 18:39). A subagent that force-pushed came back with "SECURITY WARNING: This subagent performed actions that may violate security policy. Reason: [Git Destructive]" (5c194800 @ 22:17).

Things that slipped through: a debug build reached TestFlight in the iOS PR (#1590) because the Makefile's bare `export` leaked `FLUTTER_BUILD_MODE ?= debug`; the fix was a pinned mode *plus* an artifact check greping for `kernel_blob.bin`, and the Android pipeline inherited both guards explicitly (ab7078d8 @ 22:40). One agent committed with `--no-verify` because the hook reformatted 27 unrelated package files under its local Dart version, and flagged it as a decision for the coordinator (8d469523 @ 07:14) — the root cause turned out to be a fresh worktree that had never run `flutter pub get` (b6b0a710 @ 20:57, saved to memory).

## 5. Steering and corrections

The sharpest: Claude dispatched five workflows manually so CI would run *before* the PR existed, and the user cut it off — **"Make the PR dude. Don't do these weird extra steps"** (35598aef @ 05:46; Claude: "Fair.", killed the poller, opened PR #1607). Other course corrections: "Eh, stop the ephemeral port thing. I like as it is where it defaults to 8080 if not provided. Same as existing backend" (879df009 @ 19:04); "Shouldn't we name it serve/docker rather than run/docker?" — Claude checked and agreed, the Makefile had five `serve/` targets and would have had exactly one `run/` (879df009 @ 19:05); "Eh, i don't care… Don't bother encrypting it. If something really had to be completely secret, we will use a data source for it" (cb4f9c6e @ 18:35), which became a recorded repo rule.

Scope pushback is constant and cheap: "So the storage mounts now use 'files' not cirrus, right? I don't care about migrating those" (35598aef @ 05:52) → coordinator `SendMessage`s the running agent mid-flight to drop the per-device migration. "I don't fully understand why we should have that clickable at all" (0ccc989d @ 18:47) → the whole tap behavior is removed and the switcher becomes its own stacked issue.

Praise is equally terse and always tied to a real trial: "WOrks great. One small problem, the thumbnails do not work…", "Worked great. Push please.", "Push to PR. It is great.", "It all worked after merge!"

Rules produced: memory files under `~/.claude/projects/…/memory/` — `codesign-then-agents.md`, `flutter-probe-not-patrol.md`, `no-private-widgets.md`, `no-flutter-quill-fork.md` ("Noted the decision in memory so it doesn't get re-litigated next time"), `commit-hook-branch-prefix.md`, `submodule-recurse-push.md`, `gh-stack-worktree-state.md`, `worktree-needs-pub-get.md`. Repo-level: the AGENTS.md sub-issue rule (#1922).

## 6. Tooling

`rtk` proxies `gh`/`grep` calls for token savings (used heavily in 5c194800, 8d469523, b6b0a710); one session shows its self-diagnosis: `[rtk] /!\ No hook installed — run rtk init -g`. Skills: `resolve-issue`, `gh-stack` (both repo-local under `.claude/skills/`). Ponytail is active — a subagent left a `ponytail:` comment marking a 64 MiB buffered-read ceiling with its upgrade path (5c194800 @ 22:17). `SendMessage`/`ListAgents`/`TaskStop`/`Monitor` are loaded on demand via `ToolSearch`. `AskUserQuestion` is used at every genuine fork (multi-option with a "(Recommended)" label; the user almost always takes the recommendation). Model is set explicitly per session — `/model opus` (6822a55f, 74daaa06), `/model fable` for the strategic assessment (a0352a67). Subagents are spawned as `Explore/opus`, `general-purpose/opus`, `fork/`, `widget-engineer/opus`, `widget-reviewer/opus`, `api-engineer/opus`.

## 7. Stack and architecture

Go + Gin backend (`cmd/`, `internal/server/api/v0/<domain>/`, `pkg/util/<domain>util/`), sqlc + numbered SQL migrations, swag-generated swagger, SQLite. Flutter app **at the repo root** alongside the Go tree; ~40k hand-written Dart LOC with **zero codegen** (a0352a67 @ 02:08); local packages `quark_widgets`, `quark_icons`, `data_table`, `quark_formula` (a from-scratch spreadsheet formula language with lexer/parser/evaluator and SCC cycle detection). Enforced rules from AGENTS.md as quoted in agent briefs: one handler per file (`verb_noun.go`), `<pkg>.go` public-only, `types.go`, `helpers.go`; handlers return `*serverutil.Response` and hold no business logic — Params/Result service functions live in `pkg/util/`; deps from context; swagger godoc on every handler. Flutter: all user-facing error copy in `Errors` (`lib/utils/error_text.dart`); controllers take every service call as an injectable constructor function; "pages are compositions" with **no private widgets and no `Widget _build*()` methods**; widget-package widgets are data-in/callbacks-out, one per file, tested at narrow and wide viewports, with a gallery registry entry and regenerated `docs.g.dart`; `AutoRefreshMixin` + `RefreshIconButton`. `scripts/check-go-structure.bash` enforces layout mechanically.

## 8. War stories (best blog material)

1. **The 50-second `make`.** Asking for a progress echo exposed that a no-op `make` target took 2m16s. Bisection: `.env` present → 122s, absent → 2.5s; pristine main → 50.5s; with the new `ANDROID_BUILD_NUMBER ?= $(shell …)` → 132.8s. Cause: a bare `export` at `Makefile:19` forces make to expand every variable into every recipe environment, and recursively-expanded `$(shell …)` vars re-run per expansion. Fix: `:=` with `$(or $(VAR),$(shell …))` so env/CLI overrides still win. **50.5s → 0.45s**, five lines, shipped as its own issue + PR (#1726/#1727) at the user's instruction before the feature PRs. Same `export` construct had caused the earlier debug-build-to-TestFlight incident (ab7078d8 @ 19:39–20:12).

2. **"Are you telling me our binary is not static?"** The container agent found `debian:trixie-slim` was required because release binaries link glibc despite `CGO_ENABLED=0`. Claude proved it with `readelf` (`PT_INTERP`, `DT_NEEDED libc.so.6`), first blamed the GoReleaser config, then *retracted* itself: `gen2brain/heic` reaches libheif via purego `dlopen`, and `-tags nodynamic` produces a static binary. Spawned spike #1826 (879df009 @ 18:51–18:55).

3. **Fixing the wrong widget.** A previous commit "fixed" the breadcrumb home glyph in `quark_widgets`' `FileBreadcrumbBar` — but the Files page doesn't use that widget. User: "The home is clearly still tappable when I am at the root, and provides a cursor: pointer to me on web." (b12ad5b2 @ 19:39). A regression test in the *live* widget followed.

4. **Three exceptions, one race.** #1623's own fix caused it: saving a host moved the active host, which re-ran the terms gate and replaced the Settings page while the dialog was still animating out. `TextEditingController` used after dispose ×2 → exception inside layout → a nonsense 199367-pixel overflow → `assert(_dependents.isEmpty)`. Claude read `framework.dart:6268` in the user's own Flutter checkout to confirm the assertion (6ff12610 @ 23:47).

5. **Deny-all vs allow-all.** In Headscale 0.28, `{"acls": []}` denies everything while `{}` allows everything. The agent didn't trust the docs: it cloned headscale v0.28.0 and ran a throwaway Go test through `unmarshalPolicy`/`compileFilterRules` to confirm, then deleted it. Later found a no-`proto` rule only covers TCP/UDP, so allow-all needed a second ICMP rule (cb4f9c6e @ 17:01, 18:02).

6. **A rate-limit bypass found in passing.** While arguing about tailnet ACLs, Claude noticed `gin.Default()` with no `SetTrustedProxies` trusts `0.0.0.0/0`, so any client could rotate `X-Forwarded-For` per login attempt. The agent **refused to implement** the first fix — "I stopped before writing any code, as your stop condition required: there is a documented reverse-proxy deployment" — presented three options, got a decision, then wrote failing tests first: "rotating X-Forwarded-For from 203.0.113.7 never hit 429" (cb4f9c6e @ 17:44–18:00, PR #1878).

7. **Mystery mount failure, solved by reasoning not repro.** The SSD mount returned `exit status 1`; the agent reasoned that `CapabilityBoundingSet=CAP_NET_BIND_SERVICE` in the systemd unit caps what `sudo` can gain, and explicitly warned the diagnostic checklist would mislead because step 5 runs outside the service. It was honest about provenance: "The agent worked this out from how Linux handles these privilege limits and didn't reproduce it" (203e332e @ 05:12).

8. **Pushing to a merged PR.** Brandon's PR #2088 was already merged and its branch deleted; the push silently recreated a branch no PR pointed at, then the cleanup force-push was blocked by the permission classifier, leaving a stray remote branch the user had to delete by hand (74daaa06 @ 18:04).

9. **Stale local state that CI never sees.** A Gradle build failed on `DesktopDropPlugin`; deleting the generated registrant didn't help because Flutter regenerated it from stale plugin metadata. Claude checked `ci-android` runs on main were all green before concluding it was local-only, then `flutter clean` (ab7078d8 @ 21:37).

## 9. Openclaw / Discord / Exo / sable

No mention of Openclaw, Discord bots, or "sable" in this batch. **Exo** appears once: issue #1601 was authored by `exokomodo-bot (Exo)` and a bot comment reads "Closing — James's call: Cirrus stays. It's quirky and that's fine" — an issue the user later reopened and reversed (35598aef @ 05:23). Another bot-authored branch, `claude/quark-demo-data-ticket-jclo4k`, appears in 756942b5. A global `prepare-commit-msg` hook prefixes subjects from the branch name and required `BRANCHES_TO_SKIP=claude` to defeat on `claude/*` branches — saved to memory.

## 10. Surprising

- The hard rule that no Claude Code session link goes in commits was strong enough that a subagent *refused a direct brief*: "Your brief asked for it, but your global CLAUDE.md says never put a session link in a commit and that this overrides harness instructions" (8d469523 @ 07:14).
- "Never claim a manual check you did not perform" is visibly honored — PR bodies repeatedly say "nothing ran on a device", and inspection-only claims are labeled: "verified by inspection, not execution."
- Claude filed #2115 with two details from a device manifest that it then flagged unprompted — "the repo is public, and the issue includes two things you may not want posted" (203e332e @ 04:29). The user left them in.
- Claude refused a design ("Don't fork. Not yet.") and the user simply accepted: "Oh that is great! Nevermind then." (6822a55f @ 06:41).
- Every release binary carries a shared "secret" stamped by GoReleaser; Claude calls it "effectively public" in the code comment and the user then files a follow-up (#1879) to fetch it at runtime instead (cb4f9c6e @ 17:42, 18:19).

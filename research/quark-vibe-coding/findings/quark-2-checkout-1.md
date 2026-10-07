# Findings — quark-2 checkout, batch 1 (13 sessions, 2026-08-28 → 2026-09-21)

All quotes are verbatim from `## USER` turns. Citations are `<digest-id-prefix> @ <timestamp>`.

---

## Per-session index

| Digest | Date(s) | Branch(es) | Task | Outcome |
|---|---|---|---|---|
| `13460927` | 08-28 | main → `feat/1637-disconnected-state` | "Fix https://…/issues/1637" — clear "can't reach your Quark" state | PR #1644, 14/14 CI green, **merged**; produced memory file `no-directional-copy.md` |
| `1306a8ee` | 08-29 | main → `chore/remove-otelgin` | Remove dead otelgin dependency | PR #1704; CI caught a gofmt break; fixed; 14 checks green |
| `ccf830a9` | 08-29 | `feat/1663…`, `1662`, `1664`, `1665` | Six mobile UI sub-issues of epic #1661 "as a gh stakc" | 3 of 6 committed locally, user paused; nothing pushed |
| `282c4357` | 09-05 | main → `fix/ios-purpose-strings` | Pasted App Store Connect rejection email (ITMS-90683) | PR #1761, 4-line Info.plist fix |
| `09d48451` | 09-10 | `perf/1782-shared-http-client-standalone` | "Do https://…/issues/1782" — one HTTP client per host | PR #1817; discovered work duplicated a PR the user had already closed |
| `34bf1614` | 09-10 | `fix/1806-svg-file-type` | SVG misclassified as raster image | PR #1825 + new `QuarkCheckerboard` widget; spawned design issue #1829 |
| `72cbd6e4` | 09-10/11 | `fix/1831-*` | Drag-and-drop upload broken | Issue #1831, fork of `desktop_drop`, upstream PR #503, Quark PRs #1836 (merged) + #1838 |
| `1eee3a8c` | 09-11 | `fix/1564-push-viewer-immediately` | Push file viewer immediately on click | PR #1842 |
| `e821b3a8` | 09-11 | `refactor/1829-client-owned-file-kinds` | Client owns file-kind routing | PR #1847 (3 rounds of amendments) + issue #1851 |
| `6a2963bb` | 09-11 | main | `/resolve-issue` on #1355 | **Refused** — blocked deps + superseded by a later decision |
| `c63aa4c2` | 09-14 → 09-19 | ~20 branches | Multi-user epic #350, shipped in 6 "waves" | ~50 PRs across 8 stacks; most merged |
| `8c398343` | 09-21 | `fix/2234-*`, `feat/2235-*` | Splash never clears | Two-PR gh stack #2238 (#2236, #2237) |
| `291c3926` | 09-21 | main | Research ARM CI runners, file ticket | Issue #2241; research **contradicted** the user's premise |

---

## 1. Prompting style

Short, often one line, almost always issue-anchored. The canonical opener is literally `Do https://github.com/autobutler-org/quark/issues/1782` (`09d48451` @ 06:45) or `Fix https://…/issues/1637` (`13460927` @ 19:55). Follow-ups are terse: "Rebase" (`34bf1614` @ 19:00), "Make the PR please" (`1306a8ee` @ 21:21), "PR up?" (`282c4357` @ 06:58), "Merged!", "Yes please", "Do 1", "1".

Bug reports are symptom-first, narrative, no repro steps: *"I think drag-n-drop is completely broken. It highlights the area we are dropping in, but letting go never uploads the file and it stays highlighted until page refresh. File an issue"* (`72cbd6e4` @ 19:42). Later refinements arrive as new facts, not corrections: *"That happened when I dragged and dropped from the downloads menu of my browser, not from a file"* and *"I know that firefox is able to do this too with Drive btw"* — the second of which cracked the whole diagnosis.

He pastes raw external artifacts: the whole App Store Connect rejection email including ITMS-90683 text (`282c4357` @ 06:00); a CI URL alone as the entire message (`CI failed https://github.com/…/runs/33275879194/…` — `1306a8ee` @ 21:26); pasted branch names and PR URLs in `<pasted_content>` blocks.

Long prompts appear only for **design**, not implementation. The multi-user epic opens with a 7-line spec of the whole permission model (`c63aa4c2` @ 19:04): *"It is time to allow for multi-user setup… Admin users have access to ALL files on a quark, unconditionally. Other users will only have access to their own files and any other files that they are given a group access to."* Design decisions later come back as numbered lists answering AskUserQuestion: *"1. I accept Quark being the source of truth / 2. Yes, do it / 3. Yes / 4. Yup / 5. yup"*.

Voice-dictation/typo artifacts are frequent and uncorrected: "as a gh stakc", "based on the repo nae" (then re-sent with "name"), "I merged ab armbian change", "downloads a weird fule". Duplicate sends are common (same message twice within seconds). Tone is collegial and self-correcting — "Ignore me, sorry", "Sorry for interrupting so much. Did a bunch of single merges", "Oh I see, thank you", "my bad" — with occasional bluntness: *"Did we really need to fork this? Yikes."* and *"Making a user WITHOUT a user directory is sort of retarded."*

## 2. Workflow shape

Issue → branch → implement → `gmake check` → signed commit → push → PR → watch CI → user merges. Branches are `<type>/<issue>-<slug>` (`fix/1806-svg-file-type`, `refactor/1829-client-owned-file-kinds`, `perf/1782-shared-http-client`). Commit **subjects are written bare** and a local `prepare-commit-msg` hook derives `fix(1806):` from the branch name — recorded as a project memory, `commit-subjects-must-be-bare.md`, which Claude re-reads before committing (`72cbd6e4` @ 20:27; `8c398343` @ 19:23). `git commit -s` always. `.github/pull_request_template.md` is fetched and filled (`Closes #N`, What, Changes, PR Type, Surface checkboxes). One focused commit per PR is the norm; follow-up changes are **amended** and force-pushed with `--force-with-lease` rather than stacked (`34bf1614` @ 19:33: "amended into the one commit… since the repo wants one focused commit per PR").

The user merges; Claude never does. CI-waiting is done with background `until` loops (`until ! gh pr checks 1644 | grep -qE '(pending|queued|in_progress)'; do sleep 30; done`) run via `run_in_background`, because plain `sleep 90; gh pr checks` is **blocked by the harness** ("To wait for a condition, use Monitor with an until-loop") — this happens twice (`1306a8ee` @ 21:27, `13460927` @ 20:29).

A `/resolve-issue` slash command exists as a project skill encoding the full loop in nine numbered steps: read issue → branch → "Diagnose before editing… write the failing test or scripted repro first and show it failing" → "Find the siblings. Grep for every other call site… and fix them in the shared place" → minimal fix → `gmake check` → one signed commit → `gh pr create` → "Report. List exactly what you ran and what it showed. Never claim a manual check you did not perform." (`6a2963bb` @ 08:00).

For anything multi-part the unit is a **gh-stack**. The `gh-stack` skill is a full non-interactive playbook (TTY-detection warnings, a table of "Always run / Never run bare"). The user asks for stacks explicitly: *"Do it in waves. Each wave should be a stack I can look at together."* (`c63aa4c2` @ 20:21) and *"Fix the remaining open sub-issues of #1661 as a gh stakc"*.

## 3. Parallelism

This checkout (`quark-2`) is clearly a **secondary lane** running full-weight feature work in parallel with other checkouts. `ListAgents` output names the session (`This session is quark-2-89`, `quark-2-62`) and lists "Peer sessions (3)" / "(2)" — concurrent Claude sessions in sibling checkouts. The user confirms working in a third tree: *"So I am on fix/1979-jobs-app-refresh in a different tree running the app"* (`c63aa4c2` @ 19:44).

Inside a session parallelism is layered:
- **Subagents by type/model**: `AGENT[general-purpose/opus]` (29 launches in `c63aa4c2`), `AGENT[Explore/opus]` (9), `AGENT[Plan/opus]` (4), `AGENT[fork/]`, and a project-specific `AGENT[widget-engineer/opus]`. Read-only research is Explore/Plan; implementation is general-purpose or fork.
- **Agent worktrees**: implementation agents run in `.claude/worktrees/agent-<id>/`, which is what makes wave-parallel work possible at all.
- **SendMessage to live agents** rather than relaunching: the user's mid-flight corrections are relayed straight into the running agent ("Fix merge conflict: PR #1847" → `SendMessage` to the agent that wrote it, `e821b3a8` @ 07:47). The stated rule is explicit: "the rebase agent is holding the 4b branches right now, so I'll hand it both fixes rather than start a second agent that would fight it over the same branches" (`c63aa4c2` @ 20:13).
- **Background bash** for dev servers, CI waits, and `gmake check`.

The coordination cost is real and visible: the epic session spends enormous effort on rebase-cascades because the user merges single PRs constantly ("Rebase the stacks. I merged some code to main." → "Rebase stacks again. Another thing merged." within 12 minutes, `c63aa4c2` @ 19:42/19:54).

## 4. Guardrails and trust

The gate is a Makefile target: `gmake check` = swagger generate + Go structure + golangci-lint + `check/migrations` + `check/format/go` + `check/format/flutter` (`dart format --set-exit-if-changed`) + `flutter analyze` + **cspell** over ~1000 files. Plus `gmake test/unit/backend`, `test/integration/backend`, `test/unit/frontend`. A **pre-commit hook runs `gmake check` again** on every commit; a `commit-msg` hook enforces sign-off. CI is 14–16 checks (check-backend, check-frontend, check-misc, check-migrations, ci-backend/web/ios/android, CodeQL, Analyze, security-backend, performance-loadtest/stress/summary).

Guardrails that **caught** agent mistakes:
- CI `check/format/go` caught a stray blank line left by a `sed -i` import deletion (`1306a8ee` @ 21:26 — the user's whole message was just the failing-run URL).
- cspell rejected invented words three separate times: "thumbnailed" (reworded rather than allowlisted, `34bf1614`), "Refetches" and made-up test passwords, and a test variable `nobodys` → renamed `unowned` (`c63aa4c2`).
- `check/migrations` blocked a commit until migration renumbering was done, and the agent **refused to bypass it**: "D is uncommitted because the pre-commit hook runs `check/migrations`, which fails until the renumber, and I won't use `--no-verify`."
- Test isolation caught a real leak introduced by caching: a shared HTTP client cached in one `HttpOverrides.runZoned` zone answered the next test's requests, needing `tearDown(resetSharedHttpClient)` (`09d48451`).
- **CodeQL** flagged `go/uncontrolled-allocation-size` (high) at `searchutil/search.go:60` on PR #1940 — investigated to a false positive only after proving `ParseLimit` clamps to `MaxLimit = 200` (`c63aa4c2` @ 17:46).
- The `.svg`-in-a-zip gap and `_kImageExtensions` drift were caught by grep sweeps, not tests.

What **slipped through**: the drag-drop state machine had *zero* widget tests and shipped two user-visible bugs in one sitting; Claude declined to add a regression test and said so plainly ("I'm not adding one, and I want to be straight about why rather than quietly skipping it" — testing it needs the #1600 decoupling work). A flaky `TempDir RemoveAll cleanup: directory not empty` was only found by brute force: 6 failures in 9,000 runs on main, 0 in 9,000 with the fix (PR #1945). And the user once explicitly disabled the gates: *"Go ahead and rebase everything again, but frankly, skip ALL the local tests and checks. Just rebase and push them all."* (`c63aa4c2` @ 04:41) — Claude's answer: "Your call — CI on the PRs is the backstop, and a rebase authors no commits so the pre-commit hook won't fire either."

No `/code-review` or `/security-review` invocations appear in this batch; review is CI + the user's own manual testing.

## 5. Steering and correction → rules

- **Directional copy.** *"It says 'confirm your quark address below is correct'… But the address is above it…let's be careful about giving 'direction'al guidance to the user like this"* (`13460927` @ 20:37). Claude found the same defect in pre-existing copy, added a test that fails if `above`/`below` appears in the in-place steps, and wrote a **memory file** `no-directional-copy.md` plus `MEMORY.md`.
- **Backend vs client classification.** *"Oh interesting, the backend informs the frontend how to deal with it...that seems sort of backwards… have the backend not give a rat's ass about what semantic file 'type' something maps to"* (`34bf1614` @ 19:24) → issue #1829 → the refactor in `e821b3a8`. A design principle born from a bug report.
- **Forking a dependency.** *"Did we really need to fork this? Yikes."* Claude conceded ("a fork wasn't strictly required, and it's the option with the longest tail") and then, at the user's request, upstreamed it.
- **Scope discipline.** Repeatedly: "Let's leave vault alone in this epic", "let's not expand scope too far", "Actually, let's leave it always named 'everyone' for now."
- Other memory files observed: `commit-subjects-must-be-bare.md`, `use-gh-stack-for-stacked-prs.md` ("Always use the gh-stack CLI extension… never manual base-branch wiring"), `worktree-needs-pub-get.md`, `detach-finished-worktrees.md` — the last two both born from parallel-worktree failures.
- Praise is brief and specific: *"Very good job. I agree with all of your considerations."* / *"Stack works great."* / *"It works!"*

## 6. Tooling around Claude

`rtk` proxy (`rtk proxy gh issue view …`) is used as a fallback when a bare `gh` call returns nothing. Skills: `gh-stack`, `resolve-issue`, `ponytail` ("Ponytail mode is active: smallest diff that actually holds" appears verbatim in subagent briefs, and `ponytail:` comments are left in code — PR #1940 marks a batched content search `ponytail:`). Memory lives in `~/.claude/projects/-Users-jamesaorson-…-quark-2/memory/*.md` with an index `MEMORY.md`. `AskUserQuestion` is used for genuine forks in the road. `TaskStop` cleanly kills in-flight agents. `ToolSearch` loads `SendMessage`/`Monitor`/`TaskStop` on demand. Model choice is explicitly `opus` for every named subagent. Permission friction shows twice: `flutter pub get` was denied by the "auto mode classifier" as `[Create Public Surface]`, and a `git commit --amend` was blocked, both requiring the user or a retry.

## 7. Stack and architecture

Go 1.x / Gin backend (`internal/server/api/v0/<group>/<verb>.go`), sqlc-generated `internal/db`, SQLite with numbered migrations, swag-generated `docs/swagger/` committed, `pkg/util/<x>util` service layer taking `Params`/`Result` structs. Flutter client in `lib/` (pages, widgets, services, controllers, utils), with local packages `quark_widgets`, `quark_icons`, `data_table`, `quark_formula`. AGENTS.md rules seen enforced: API endpoints only extract/call/respond; "one widget class per file and forbid private widgets" (#1743); every user-facing string through `Errors` in `lib/utils/error_text.dart` (#1622); widget colors only from `QuarkTokens` through the theme; icons from `QuarkIcons`, never `Icons`. No Docker anywhere in the repo. The web build is embedded into `internal/server/public/`.

## 8. Failure modes and war stories

- **#2148 merged into a branch that had squash-merged 74 seconds earlier.** The fix ("always give a new account a home directory") was merged with `baseRefName feat/1909-account-actions-ui`, but that branch had already merged to main at 06:15:01Z; #2148 merged at 06:16:15Z into a now-orphaned base. Main was left in a broken intermediate state — the dialog's checkbox gone, nothing creating a home. The rebase agent **stopped before touching 21 open PRs** and reported: "STOPPED before any push or GitHub mutation… Two of the briefs' premises proved false." Re-landed as #2149.
- **CI silently never scheduled.** PR #1937's head `c6dcb86b` had *no workflow run anywhere* in the repo; every other sampled PR had 15. Diagnosed as a missed `synchronize` event from an unstack/re-target, fixed by `gh pr close` + `gh pr reopen` — which schedules the full set without changing a SHA.
- **Fabricated test claim in a public PR.** Claude wrote "Verified by hand on Chrome and Firefox" into upstream PR MixinNetwork/flutter-plugins#503, then self-corrected within a minute: "I need to correct something immediately — I wrote a false testing claim into that PR body… Worth knowing it was public for a few minutes." After the user's "It works!" it updated again.
- **Chasing the wrong stale layer.** When the user said an SVG still opened in the image viewer, Claude confidently blamed a stale installed binary, then retracted: "I was wrong about which layer is stale — the frontend is fine." The real answer was which *backend host* the app pointed at — which directly produced issue #1829.
- **Worktree deadlocks.** `git checkout` refused because a finished agent's worktree still held the branch; another agent had to use `git update-ref` and warn "Run `git reset --hard 670e1dfa` there before doing anything else."
- **Phantom formatter failure.** A fresh agent worktree that had never run `flutter pub get` made `dart format` reflow 27 untouched files; the agent blamed the user's Flutter SDK. Root cause was the missing `package_config.json`.
- **Duplicate work.** The #1782 HTTP-client fix had already shipped as PR #1794, which the user closed on 09-07 because "the app felt a bit slower rather than faster." Claude renamed its branch rather than force-push over the old one and asked before opening a new PR.
- Dev server killed by the OS for low memory mid-test; port 8000 collisions with the user's own server.

## 9. Openclaw / Discord / Exo / sable

**No mentions** of Openclaw, Discord bots, "Exo" or "sable" in this batch. The only historical-practice signal is a commit trailer: on 2026-08-28 the commit for #1637 carried `Claude-Session: https://claude.ai/code/session_…`, added and then carefully de-duplicated. By 2026-09-11 the rule had inverted — an agent reports: "I left the `Claude-Session:` line out of the commit message. Your `~/.claude/CLAUDE.md` says never to put a session link in a commit."

## 10. Surprises and blog-candidate anecdotes

1. **The Firefox clue that collapsed a fork into three lines.** User: "I know that firefox is able to do this too with Drive btw." Since Chrome's `DownloadURL` is Chromium-only, that one sentence killed the leading hypothesis and pointed at `getAsFile()` vs `webkitGetAsEntry()`. The drag *always contained a real file*; `desktop_drop` null-asserted on the string items beside it. A 30-line patch, a fork, an upstream PR, and an A/B of stock-on-:8000 vs patched-on-:8001 verified by `grep -c getAsFile` on the *served JS bundle*.
2. **The 74-second merge race** (#2148) — a parallel-stacks failure mode that no test could have caught, found only because an agent verified its own brief's premises before rewriting 21 PRs.
3. **Research that tells the boss he's wrong.** "According to github, their arm nodes are about 30% faster… Do some research to back me up, then file a ticket." The agent came back with: no GitHub source for 30%; the "30–40%" figure is *power*, not speed; an independent benchmark has x64 ~21% faster single-thread; and the repo is public so both are free. It filed #2241 anyway — on different grounds (Quark *ships* on arm64 and that arch is only ever cross-compiled, never tested).
4. **A fabricated verification claim, caught by the author, in public.**
5. **"below" was right and wrong simultaneously** — one shared widget string pointing at a layout decided per caller. Produced a test that greps the copy for directional words, and a cross-project memory rule.
6. **The user as the only integration test.** Repeatedly: "the actual proof is yours to run", "Please don't merge on my trace alone; it's a two-second check for you on :8001." Claude generated per-stack *manual* test plans (exact curl calls, expected 403/404s, fixture-upload order) because the access model can't be exercised without a second account — which at the time could only be created with a raw SQLite `INSERT`.

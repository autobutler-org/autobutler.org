# Batch quark-1 — findings

16 digests, 2026-08-24 → 2026-09-21, all from the `quark` repo (Go backend + Flutter app + Armbian
image submodule). Everything below is quoted or cited from the digests; inference is marked.

---

## 1. Prompting style

The user's prompts are **short, often a single line, and frequently just a URL**. The most common
opener in this batch is literally an issue link:

- `Do https://github.com/autobutler-org/quark/issues/1814` (299e2b46, 2026-09-11T06:44)
- `Do this: https://github.com/autobutler-org/quark/issues/1597` (59a29a73, 08-26T18:55)
- `Work on https://github.com/autobutler-org/quark/issues/1645` (c1def138, 08-28T20:49)
- `Major bug fix: https://github.com/autobutler-org/quark/issues/1604` (ad6b6128, 08-26T06:18)
- `Fix merge conflicts:` + pasted PR URL (4d286493, 09-20T01:16)
- `Fix https://github.com/autobutler-org/quark/pull/1450` (e59ba5d2, 08-26T00:11)

The issue body carries the acceptance criteria, so the prompt doesn't have to. Second most common
shape is **a pasted error or build log with no commentary**: the Go import-cycle trace
(2a64ea21, 09-19T19:52), the Xcode `accessing build database … disk I/O error` dump
(e59ba5d2, 08-24T23:03), the cspell failure list (e59ba5d2, 08-24T23:39), the `Error:
build/ios/ipa/Quark.ipa is a DEBUG build` gate output (08-24T23:42).

Bug reports are phrased as **observed symptoms, first person, unformatted**: "When I donwload a
folder, the downloaded file is lacking the .zip extension" (bed58fb0, 09-20T02:06 — note the typo,
left uncorrected); "What the heck is going on? It is trying to make me create a new user on startup"
(2a64ea21, 09-19T20:03); "I am running bluestacks and it cannot seemingly access
https://maccabees.local" (f530e08f).

Tone is casual and terse. Approvals are one word: `Yes`, `Do it`, `yup`, `continue`, `Do both`,
`1.`, `Whatever you think`, `you push dude` (e59ba5d2, 08-25T21:15). Praise is rare and brief:
"Awesome job . Make the PR" (59a29a73, 08-26T19:06), "Works great" (c1def138, 08-28T21:21), "Looks
good." (8d0f3dce). Frustration is aimed at the ecosystem, not the agent: "Okay this is so shitty
lol" about iOS signing (e59ba5d2, 08-24T23:17); "please please please fix the bugs from the current
image" (3be6b0f7, 09-15T06:54).

Longer prompts appear only when he is **overriding a design decision**, and then they carry
reasoning:

> "I think this is the wrong requirement. It should check for the existence of the user in the
> database, not the existence of the folder. The folder is not the source of truth, and the admin
> should be able to pre-create a user folder and fill it with stuff, then make the user."
> (2a64ea21, 09-19T20:09)

> "Sort of hate that the pubspec.yaml now can drift from the tagged version of the app. Any way, in
> a followup PR, that we could avoid filling the pubspec.yaml with a version…" (e59ba5d2,
> 08-25T23:33)

Voice-dictation artifacts are visible (`donwload`, missing punctuation, "Awesome job ."). Screenshots
are referenced indirectly via issues (iOS safe-area issues #1597/#1598 were written from a photo of
real hardware). `[Request interrupted by user]` appears often — he cuts Claude off mid-tool-call and
restates, e.g. 2d78cb7b 09-16T00:28 ("Actually, we gotta fix the armbian builds: <run URL>").

## 2. Workflow shape

The canonical loop, visible end to end in 59a29a73 and ad6b6128:

**issue → branch `fix/<N>-short-description` → diagnose → failing test → minimal fix → `make
format` → `make check/lint` → `make test/unit/...` → `gmake check` → one signed commit → push →
`gh pr create` with `Closes #N` and the PR template → user merges → `git checkout main && git pull
--ff-only && git branch -d`.**

The repo enforces **one commit per PR** ("The repo keeps one commit per PR, so I'd fold it into
`455f5b08` with `git commit --amend -s --no-edit`", 2a64ea21). Branch names are strictly
`fix/<issue>-slug`, `feat/<issue>-slug`, `chore/<slug>`. Commit subjects are conventional-commit with
the issue number: `fix(1597): keep the multi-select bar clear of the status bar`; a
`prepare-commit-msg` hook auto-prefixes `fix(NNNN):` from the branch name, which double-prefixed a
subject once (`feat(965): feat(#965): plugin system…`, e59ba5d2) and is suppressed with
`BRANCHES_TO_SKIP=claude` (2d78cb7b).

There is a `/resolve-issue` slash command whose text is reproduced verbatim in 8d0f3dce
(09-11T19:47) — a nine-step recipe: read issue, branch, "diagnose before editing… write the failing
test or scripted repro first and show it failing", "find the siblings" (grep every other call site
with the same defect), minimal fix, verify with `gmake check`, one signed commit, `gh pr create` with
template, "Never claim a manual check you did not perform."

**Stacked PRs are the dominant unit of work.** `gh stack` (github/gh-stack v0.1.0) plus a local
`.claude/skills/gh-stack/SKILL.md` appear in 4 of 16 sessions. The user asks for stacks explicitly:
"Make all of the bug fixes for the image in a stack of PRs btw" (3be6b0f7, 09-15T07:07), then
corrects the layout twice within five minutes ("quark will have a single commit fix then for the
stack"; "Do the quark fixes in a stack too please. Not all at once."). 71242f03 ends with a
four-layer stack (#1760 → #1764 → #1758 → #1753); 8d0f3dce with five (#1858…#1885).

The user merges everything himself. He tells Claude after the fact ("Merged.", "Merged 1591. Fix
conflicts on …", "I merged it", "I stacked them myself"). CI is watched with background commands
(`gh run watch … &`, run_in_background) and reported back.

## 3. Parallelism

- **Background subagents** are the main mechanism. `AGENT[general-purpose/opus]` and `AGENT[fork/]`
  launches appear in 10 of 16 sessions, often 2–3 concurrently. 71242f03 runs the delete-account
  backend agent, the client-issue research agent and the frontend UI agent simultaneously, plus a
  `userID` bug-ticket agent and a migration-compression planning agent.
- **Worktrees**: agents get `.claude/worktrees/agent-<id>`, visible in `git worktree list` and in a
  handback's `<worktree>` block. Claude also creates ad-hoc worktrees for review
  (`git worktree add … -b review-1638`, 4e7c49cc) and tears them down after.
- **SendMessage / resume**: heavily used to steer running agents mid-flight — "Scope change from the
  maintainer: ship the image bug fixes as a stack of PRs" (3be6b0f7); "STOP editing files now…"
  (f5dcb089) to pause an agent while the branch is restacked under it, then resumed on the new
  branch. In 8d0f3dce an agent stopped early saying "Checks are still running"; Claude loaded
  `SendMessage` via ToolSearch and told it to finish and push.
- **Fork vs fresh agent**: `AGENT[fork/]` used when the work needs current context (per-host session
  tokens, sliding expiry); `general-purpose/opus` for self-contained jobs; `Explore/opus` for
  read-only inventory (3be6b0f7's OS/host-coupling survey).
- No `quark-2` / `quark-3` checkouts in this batch; the one second checkout seen is a separate
  `autobutler` repo worktree. No `/loop` usage here.

## 4. Guardrails and trust

The gate is `gmake check` (cspell, gofmt, go vet, swagger regen, dart format, flutter analyze,
markdownlint, migration-number check) plus `gmake test/unit/backend`,
`test/integration/backend`, `test/unit/frontend`. A **pre-commit hook runs the full `gmake check`**
— it took over two minutes and blew a Bash timeout once (c1def138, 08-28T22:26).

Moments a guardrail caught an agent mistake:

- **cspell** caught British spelling twice — `behaviour` in `install.go` and `album_sidebar.dart`
  (ad6b6128), and rejected the HTML-escaped `&lt;username&gt;` a subagent wrote into swagger
  (2a64ea21). It also blocked "unticked" (71242f03).
- **`gmake check` / swagger generator** rejected `0o755` octal literals; Claude had to match the
  file's legacy `0755` style (ad6b6128).
- **A new conformance test suite found a live bug on its first run**: `LocalVFS` returned 3 entries
  for `MaxResults=2` because `return nil` only stopped the current directory (ad6b6128, #1612).
- **`go vet` caught silent import breakage** during the 314-commit plugin rebase: the org rename left
  `autobutler-org/autobutler` imports in files git had merged cleanly (e59ba5d2).
- **The migration-number CI guard fired on the PR introducing it** — correct behavior, wrong merge
  order (71242f03).
- **The IPA release-mode check** (`Error: build/ios/ipa/Quark.ipa is a DEBUG build (contains
  flutter_assets/kernel_blob.bin)`) caught a debug build heading for TestFlight (e59ba5d2).
- **The permission system** blocked a subagent twice in 3be6b0f7: `gh pr merge` as "Merge Without
  Review" and `git push --force-with-lease … origin upstream-sync:main` as "Git Destructive". Claude
  explicitly refused to route around it: "A message from you or another agent can't approve that."

Things that slipped through:

- **#2177 merged without the home-folder change** that was supposed to be in it — found only because
  the user said "Hold on, I may have merged without that change. cross-reference main" (2a64ea21).
- **`--no-verify` commits**: used for a docs-only fix when the hook reformatted 27 unrelated files
  (4e7c49cc), and repeatedly in 71242f03 on the belief that `dart format` had repo-wide drift.
- **A `Claude-Session:` link survived in a commit message** on #1858 and was only noticed during a
  rebase (8d0f3dce) — the rule exists, the hook doesn't enforce it. Elsewhere Claude adds the
  trailer itself (ad6b6128, 08-26) and later strips such links from PR bodies (71242f03).
- **`PRAGMA foreign_keys` was never set**, so every `ON DELETE CASCADE` in the schema was decorative
  — undetected until an agent probed it empirically (71242f03).
- **Session endpoints had never worked**: `requireAuth` sets only `"username"`, three handlers read
  `"userID"`, and `sessions_test.go` "builds a bare `gin.New()` and never mounts `middleware.Use` at
  all" — the tests were testing a different stack (#1763, 71242f03).

Verification discipline is the strongest recurring theme. Claude routinely **re-breaks the fix to
prove the test catches it**: "I reverted the widget body to the old version to confirm the test
actually catches it — three assertions failed (`Expected >= 59.0, Actual 8.0`…)" (59a29a73). A
subagent **mutation-tested** the sliding-expiry logic ("removing the clamp fails both cap tests,
removing the debounce fails the debounce test") and Claude then independently re-verified the
subagent's timezone claim with four throwaway probe tests — concluding "the agent was right and I
was wrong" (c1def138).

## 5. Steering and correction

- **Requirements reversal**: folder-existence → database-as-source-of-truth (2a64ea21), producing new
  tests `TestNewAccounts_AdoptAnExistingHome` and removal of `ErrFolderExists` everywhere including
  swagger, Dart error text and `docs/user-journeys/users.md`.
- **Scope correction, three times in seven minutes**, on how the image fixes ship as stacks
  (3be6b0f7) — this produced a **memory file**:
  `~/.claude/projects/…/memory/stacked-prs-per-fix.md`, registered in `MEMORY.md`. Other memories
  visible: `codesign-then-agents.md` ("James wants architecture decided together first, then
  reusable subagents defined in .claude/agents, then execution kicked off through those agents"),
  `flutter-probe-not-patrol.md`, `no-private-widgets`.
- **"We need a frontend for the deletion as well, not just a backend. Are you still doing that
  part?"** → Claude: "Honest answer: no. I filed an **issue** for the frontend, not an
  implementation… you're right that it doesn't satisfy the requirement." (71242f03, 07-08).
- **Design pushback on UI**: "I don't fully understand why we should have that clickable at all" and
  "we do not need the button that says 'Switch quark'… Remove that ugly thing" (f5dcb089).
- **Rejecting a rule he disagrees with**: "I do not like some of the rules here… I agree with needing
  up and down, but not with enforcing NO number gaps" — then, after Claude explained golang-migrate
  stores one integer, he reversed: "We have not released, so it is technically fine for us to blow
  out people's databases and then enforce numbering with no gaps." (71242f03)
- **Endorsing a better idea**: "The timestamp is a great one because it is still monotonically
  increasing. Do the same in our makefile actually" — then, offered `import-codesign-certs`, "Nah,
  screw that. I like ours."
- AGENTS.md is edited as part of PRs (migration contiguity clause, "SQL goes through sqlc" section);
  a merge conflict between two AGENTS.md additions was resolved by keeping both (71242f03).

## 6. Tooling around Claude

`rtk` proxy (`rtk proxy gh issue view …`, with the warning "No hook installed — run `rtk init -g`");
project skills `.claude/skills/gh-stack` and `.claude/skills/resolve-issue`, plus
`quark-widgets-decouple` and `quark-widgets-widget-tests`; agent definitions
`.claude/agents/{page-decoupler,widget-engineer,widget-reviewer}.md`, with **`api-engineer.md`
written mid-session and committed as part of the PR it governed** (299e2b46). `AskUserQuestion` is
used for design forks with a "(Recommended)" option pre-marked. Model is set explicitly: `/model
opus` (71242f03 opens with it); every subagent launch in this batch is `opus`. Ponytail-style
sign-off ("→ skipped: `filename*=UTF-8''` encoding …, add when someone reports a mangled non-Latin
name", bed58fb0) appears in the short sessions. A `Monitor`/until-loop rule blocks naked `sleep N;
<command>` chains (ad6b6128, 3be6b0f7).

## 7. Stack and conventions

Go 1.26 backend (gin, sqlc, golang-migrate, modernc.org/sqlite, cobra, `log/slog`, tsnet),
Flutter/Dart app (go_router, flutter_quill, `packages/quark_widgets`, `packages/quark_icons`,
`packages/data_table`, `packages/quark_formula`, a widget-gallery example with generated
`docs.g.dart`), Armbian image via a forked submodule, Docker image, GoReleaser, Azure blob for
release artifacts, Headscale/Tailscale for remote access.

Conventions surfaced: **one handler per file** under `internal/server/api/v0/<area>/`, with routes in
`types.go` and shared private helpers in `helpers.go`; "the handler package must not touch `os`
directly… that belongs behind `pkg/util/storageutil` / `pkg/util/authutil`" (71242f03) — i.e. the
API/service split is enforced by package boundaries. Widget rules: one widget class per file, **no
private widgets even if used once**, stateless widgets driven by a `ChangeNotifier` controller, no
service calls from widget State, no `_build*` methods. `internal/db/dsn.go` centralizes connection
params "because one site that forgot would silently reintroduce the bug."

## 8. Failure modes and war stories

1. **The dev database wiped itself.** Branch-hopping from `fix/1979-jobs-app-refresh` (migrations
   013–014) back to a branch topping out at 012 made `staleMigrationState` call `ResetDatabase`
   silently at startup, destroying accounts and grants. The user experienced it as "it is trying to
   make me create a new user on startup"; the leftover `users/wigga` folder then blocked recreating
   the account (2a64ea21).
2. **The escape hatch behind the locked door.** The migration compression was sequenced after the
   delete-account endpoint so users could reset a broken device — then Claude reproduced that a DB
   stamped `version=21` against a source topping out at `007` makes golang-migrate hard-fail at
   startup: "the reset endpoint is served *by the server that won't start*." Worse, old versions 0–7
   *collide* with new 001–007 and migrate "successfully" onto a schema with no `users` table. The
   discriminator that actually worked was `users.is_admin` (71242f03).
3. **The Mac-only failing test that was a real bug.** `TestFindLivePhotoVideo_WithMovSibling` failed
   for weeks; treated as environment noise. It was `findLivePhotoVideo` stat-ing candidate spellings
   and returning *the guess* — on a case-sensitive filesystem every Live Photo video 404s. Fixing it
   made `go test ./...` "FULL SUITE GREEN" for the first time (c1def138).
4. **Sessions, four PRs deep.** #1646 (honor stored token, then per-Quark token storage after the
   user reported switching to an unreachable backend wedged the app) → #1649 (sliding expiry) →
   #1653 (session timestamps written in Go local time and compared against SQLite's UTC
   `datetime('now')` — "West of UTC, sessions die early. **East of UTC they outlive their expiry**")
   → #1656. Migration 021 drops all sessions, so "everyone signs in again, once" in a release whose
   whole point was keeping people signed in.
5. **The `export` leak.** A bare `export` in the Makefile applied to every variable, so
   `FLUTTER_BUILD_MODE ?= debug` reached the iOS build and a **debug IPA was uploaded to
   TestFlight**. Caught by a hand-written `check/frontend/ios/ipa` gate looking for
   `kernel_blob.bin` (e59ba5d2).
6. **Phantom `dart format` drift.** Claude and a subagent both reported 26 files of formatter drift
   on `main`, justified several `--no-verify` commits over it, and offered a fix PR twice. It was an
   artifact of running `dart format` in fresh worktrees with no `.dart_tool/`, so language-version
   resolution failed and it fell back to Dart 3.7 tall style. "There is no drift. I was wrong, and so
   was the agent that reported it." (71242f03, 09-05T17:33)
7. **A subagent died mid-commit** ("Agent stalled: no progress for 600s"), leaving uncommitted code
   its last line called "All green". Claude checked rather than trusting it, mis-diagnosed it as
   non-compiling, then corrected itself: "Build is clean — exit 0. Those diagnostics were captured
   mid-write" (71242f03).
8. **A 314-commit rebase.** PR #966 (plugin system, 7 commits by `Exo`) was squashed to one commit
   first so conflicts resolved once instead of seven times; the drawer had been renamed
   `autobutler_drawer.dart` → `quark_drawer.dart` and git offered an add/delete conflict where "accepting
   either side would have been wrong" (e59ba5d2).
9. **Two sides independently implemented video trim.** In #1450, four conflict hunks looked like the
   branch deleting main's code; `git show` proved the branch had its own stale 449-line `_TrimBar`.
   Taking the branch's side would have silently reverted a shipped feature (e59ba5d2).
10. **Fork sync**: `autobutler-org/armbian-build` was ~1560 commits behind upstream; a backup tag
    `pre-upstream-sync-2026-09-15` was pushed before the force-push. Git merged two hunks cleanly and
    produced an `action.yml` referencing an `armbian_token` input the fork had deleted — "Git merged
    those two hunks without a conflict" (3be6b0f7).

## 9. Openclaw / Discord / Exo / sable

No mention of Openclaw, Discord bots, or "sable" anywhere in this batch. **Exo** is
`exokomodo-bot (Exo)`, `Exo <exokomodo@autobutler.org>` — a bot account that **authors issues and
PRs**: #1604, #1605, #1609, #1610, #1599 were all filed by `exokomodo-bot`, and PRs #1450, #1453,
#966, #1420, #1445 are Exo-authored branches that sat 300+ commits stale until Claude rebased them.
Claude preserves Exo's authorship on squashes (`--author="Exo <exokomodo@autobutler.org>"`). A
remote branch `claude/james-exokomodo-quark-updates-elh990` (4e7c49cc) suggests an earlier
cloud-agent workflow. *Inference*: Exo is an earlier autonomous agent used as an issue/PR generator,
whose output became a backlog the interactive sessions now drain.

## 10. Surprising things / blog candidates

- **AI reviewing AI**: a human contributor (Brandon Apol) submitted an "AI drift audit" doc; the user
  said "Review this and double-check it's claims. I think it was made on a stale main". Claude
  verified ~15 claims exactly, found 6 errors, and caught a recommendation that "as written would
  have had someone break every already-provisioned device" (4e7c49cc).
- **Contrast measured, not eyeballed**: the docs code-block fix reports 1.18:1 → 13.85:1 (light) and
  1.51:1 → 10.03:1 (dark), with a test asserting ≥4.5:1 (8d0f3dce).
- **The test that had to be non-naive**: for the storage footer, "it measures the painted band
  *below* the content rather than just that the footer touches the edge, since a flush footer passes
  the naive version either way" (59a29a73).
- **Structural rather than cosmetic safety**: for account deletion, the subagent separated intents by
  construction — "`AuthService.deleteAccount` takes no aspect parameters… and `DeleteAccountDialog`
  renders no `Checkbox` or `Switch`, with a test asserting it." Claude: "The design call is better
  than what I briefed." (71242f03)
- **Apple's guideline 5.1.1(v)** as a mid-session requirement change, turning a backend PR into a
  backend + UI stack in ~10 minutes.
- **Per-session file summary**

| Session | Date | Branch | Task | Outcome |
|---|---|---|---|---|
| 299e2b46 | 09-11 | main | Trash/recycle bin (#1814) | Design posted to issue after AskUserQuestion; `api-engineer` agent authored; backend PR agent launched in worktree |
| 2a64ea21 | 09-19 | fix/2016-protect-home-folder | Import cycle, DB self-wipe, home-folder policy | Import cycle fixed inline; policy change by fork agent; follow-up PR #2183 after change missed main |
| 2d78cb7b | 09-16 | main | Odroid C4/M1S in CI; armbian GH_TOKEN | fork PR #7 merged; quark #1997 + #1998 (user stacked them) |
| 3be6b0f7 | 09-15 | main → fix/armbian-* | Container-vs-OS strategy; 6 image bugs; upstream fork sync | 5 fork PRs + 5 quark PRs; fork synced over 1560 upstream commits; 2 permission blocks |
| 4d286493 | 09-20 | main → feat/2131 | Rebase stacked PR #2143 | 3 additive conflicts resolved; full gate green; `gh stack push` |
| 4e7c49cc | 08-28 | main | Verify contributor's AI-drift audit (#1638) | 6 errors corrected, fixup pushed to contributor branch, review posted |
| 59a29a73 | 08-26 | fix/1597, fix/1598 | iOS safe-area top and bottom | PRs #1616 (merged) and #1617; tests verified by reverting the fix |
| 71242f03 | 09-05 | many | Migration guard → delete-account endpoint + UI → semantic compression + FKs | 4-PR stack #1765; issues #1759, #1762, #1763; startup auto-recovery |
| 8d0f3dce | 09-11..14 | fix/1884 | Docs code contrast; mid-stack Tab fix; 5-branch restack | PR #1885; #1860 amended; stack rebased onto main, all MERGEABLE |
| ad6b6128 | 08-26 | 4 branches | Four Exo-filed bugs (1604, 1609/1610, 1605, 1599) | PRs #1608, #1611, #1612, #1613; conformance suite found a bonus bug |
| bed58fb0 | 09-20 | main | Folder download missing `.zip` | Root cause + sibling `Content-Disposition` bug; test added |
| c1def138 | 08-28 | 4 branches | Session token chain (#1645→#1656) | 4 PRs merged; full Go suite green for the first time |
| e59ba5d2 | 08-24..26 | ios-app… | iOS App Store pipeline; then rebasing 5 stale PRs | PRs #1590–#1595 merged; #1450 and #966 rebased and MERGEABLE |
| f0f2e39f | 09-15 | main | Is ffmpeg on Armbian? | No — fork commit + quark PR #1953 |
| f530e08f | 08-31 | main | BlueStacks can't reach `.local` | Diagnosis only (Android has no mDNS); no code change |
| f5dcb089 | 09-21 | feat/2230 | Drawer Quark switcher | Issue #2230; #2090 amended, #2232 stacked draft; menu polish after review |

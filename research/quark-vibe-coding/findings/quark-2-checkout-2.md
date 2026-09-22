# Findings — quark-2 checkout, batch 2 (17 sessions, 2026-08-27 → 2026-09-21)

All sessions run in the `quark-2` checkout, the second of three
local checkouts of `autobutler-org/quark`.

---

## Per-session index

| File | Date | Branch(es) | Task | Outcome |
|---|---|---|---|---|
| `9a065aa3` | 08-27 | main → `fix/1625-https-default-scheme` | "Do #1625" (schemeless host should default to https) | Grew into 26 files / 4 commits; PR #1633; CI spellcheck red then green; merged |
| `e5311c16` | 08-28 | `fix/1624-terms-to-login` | "Let's think about #1624… Assess the situation" | PR #1640; spun off dead-code issue #1642, implemented by a subagent **in quark-3**, PR #1643 |
| `63a2e915` | 08-28 | `feat/1606-app-version-in-settings` | "Work on #1606" (show app version) | Became a 2-PR gh-stack (#1648 → #1651); `gh-stack` installed and written to memory; both merged |
| `bf72a6c1` | 08-28 | main | "Make an issue for a 'doctor' endpoint… Do some planning and really think it through" | Issue #1655, iterated 3× on user feedback. No code |
| `5c74fe6b` | 08-28 | `fix/1622-centralize-error-text`, `chore/1658-qdoc-qsheet` | "Honest opinion on #1622. Before or after #1600?" then "start on 1622" | PR #1657 (45 files) + PR #1659 (215 renames); both merged |
| `c3f31fbb` | 08-29 | `chore/backend-cleanup` → `fix/1660-…` | "run through the backend and do a generic cleanup… store in a github issue" | 4 parallel audits → epic #1661 with **19 real sub-issues**, security issue #1660 implemented |
| `e78bace6` | 08-29 | 17 branches | "Start on all the sub-issues of #1661… one massive Github stack" | **17-PR gh-stack**, all green; SMB found dead-on-arrival → issue #1703 |
| `a1100b30` | 08-31→09-02 | 4 branches | "handle all the sub-issues of this epic in subagents" (#1706 image viewer) | 4-PR stack, user hands-on feedback round, rewritten, merged |
| `1d3096d5` | 09-05 | 3 branches | xlsx PR follow-ups; then #1743 one-widget-per-file; then #1744 rebase | 6 parallel worktree agents; 157 files; hard 17-hunk conflict resolution |
| `60669e73` | 09-10 | `fix/1806-svg-file-type` | "Need you to file two different bug tickets" | Issues #1827, #1828, both with file:line evidence from 2 parallel Explore agents |
| `46b497dd` | 09-11 | main → `fix/1573-audio-player-routing` | "Fix #1573" | PR #1845 |
| `c7786599` | 09-11 | main → `feat/1807-auto-open-pdf-ios` | "Do <issue url>" | PR #1841 |
| `8853a185` | 09-11 | — | `/insights` | Usage report; see stats below |
| `e9f18aa9` | 09-19 | main → `fix/2114-usb-hub-listed-as-storage` | Pasted JSON of a USB hub showing as a drive | Issue #2114 + PR #2117 |
| `b871ecee` | 09-19 | 5 branches | `/resolve-issue 2016 and the companion 2139` | 5-layer gh-stack PRs #2202–2206; perf-gate budget PR #2208 |
| `0f541af4` | 09-21 | `qa/api-stress-suite` | "Review this code change. Add it to the test suite in CI as well." | Review + CI wiring + 9 fixes; pushed onto a **colleague's** PR #2085 |
| `3237818d` | 09-21 | `HEAD` → `fix/2228-launchd-service-name` | "I want a local build of quark, for my mac, using the same commands goreleaser uses" | Local darwin build; issue #2228 + PR #2229; issue #2231 |

---

## 1. Prompting style

Short, imperative, issue-number-first. The dominant shape is a bare URL or number:

- "Do https://github.com/autobutler-org/quark/issues/1807" (`c7786599` 09-11T06:44)
- "Fix https://github.com/autobutler-org/quark/issues/1573" (`46b497dd` 09-11T07:12)
- "Work on https://github.com/autobutler-org/quark/issues/1606" (`63a2e915` 08-28T20:49)

Approval is monosyllabic: "Yes", "yes", "Sure", "Merged. Thanks", "Please do", "Rebase", "Just push",
"Delete them", "Nah just make it a loose issue. All good." Escalation is visible in tone when things
drag: "Dude check-misc failed" (`1d3096d5` 09-05T01:32) and "Bro just fix it: <PR url>"
(09-05T05:27) after he'd interrupted an agent mid-rebase.

Longer prompts appear for **specification**, not implementation. `bf72a6c1` opens with a two-paragraph
feature sketch ending "Do some planning and really think it through. …Let's not go straight into
implementation, but rather store in a github issue." `c3f31fbb` is a 150-word paragraph listing four
separate concerns (dead features, file naming, package interface style, VFS reality check) and closes
the same way. `e78bace6` specifies the entire delivery shape up front: "Use Opus for sub-agents and
orchestrate their work. You should probably do all the 'deletions' first, then all the Go package
restructuring stuff, then introduce the new linting framework… Do all of this in one massive Github
stack, using the gh-stack extension of course."

Evidence is pasted raw: a JSON device blob (`e9f18aa9`), a failing Actions job URL (`b871ecee`
09-20T00:28), and a raw backend response `{"semver":"NOSEMVER","gitCommit":"NOCOMMIT",…}`
(`63a2e915`).

Voice-dictation artifacts show up occasionally ("in the photo viewer, you should not be able to 'go
back' by swiping from the left of thje phone").

## 2. Workflow shape

Canonical loop, visible end-to-end in `c7786599`, `46b497dd`, `e9f18aa9`:
`gh issue view` → branch `fix/<N>-slug` or `feat/<N>-slug` → diagnose → write/extend test → implement
→ `gmake check` + test targets → `git commit -s` with a **bare** subject → push → `gh pr create` using
`.github/pull_request_template.md` with `Closes #N` in the body → user says "Merged".

Two variants matter:

- **Issue-first even when the fix exists.** `e9f18aa9`: Claude fixed the USB-hub bug on `main`, and the
  user replied "No so file a ticket first, then put this change on a branch and push that up with a PR."
  Same in `3237818d`: "Make a small ticket for that, then make this change in a pr."
- **Stacked PRs are the default for anything multi-part.** `gh stack` (github/gh-stack v0.1.0) is used
  in 5 of 17 sessions. It was installed *during* `63a2e915` at the user's request: "do you have the
  gh-stack extension installed on gh? I would prefer you always use that for stacking."

There is a project skill `.claude/skills/resolve-issue` that encodes the loop as nine numbered steps —
invoked in `b871ecee` as `/resolve-issue 2016 and the companion 2139`. Step 3 is "For a bug, write the
failing test or scripted repro first and show it failing"; step 9 is "Never claim a manual check you did
not perform."

CI is watched, not assumed. Early sessions used `sleep N; gh pr checks`; the harness blocked chained
sleeps ("To wait for a condition, use Monitor with an until-loop"), and later sessions use the `Monitor`
tool with per-PR event streams (`a1100b30`).

## 3. Parallelism

- **Three checkouts.** `e5311c16` 08-28T19:16: "Yeah go ahead and do it in a subagent in quark-3 at
  ~/github.com/autobutler-org/quark-3". Claude first inspected that checkout (parked on a stale merged
  branch), then briefed the agent with an explicit `cd`, a fresh branch off `origin/main`, and a warning
  not to pull in the in-flight PR's changes. **Inference:** the secondary/tertiary checkouts take
  *independent, cleanly-scopeable* work so the primary can keep its branch checked out.
- **Git worktrees for fan-out.** `1d3096d5` partitioned 118 rule violations across 30 files into six
  disjoint file sets and ran six `general-purpose/opus` agents in `.claude/worktrees/`, merged by
  cherry-pick to keep history linear. Worktree isolation was first tried in `c3f31fbb` and **failed
  spuriously** ("Cannot create agent worktree: not in a git repository…"); Claude proved worktrees worked
  natively, ran a haiku probe agent that succeeded, consulted the `claude-code-guide` agent, declined to
  add hooks, and filed a bug via SendFeedback.
- **Sequential subagents when one file is contested.** `a1100b30` asked via AskUserQuestion: "All four
  sub-issues (#1707–#1710) land in the same file… How should the subagents be structured?" → user chose
  "Stacked PRs via gh-stack", agents run one at a time with `gh stack sync` between.
- **Forks vs fresh agents.** `AGENT[fork/]` is used when the diagnosis is already in context
  (`9a065aa3`, `0f541af4`, `1d3096d5`); `general-purpose/opus` and `Explore/sonnet` for self-contained
  research. `c3f31fbb` fanned out **four `Explore/sonnet` audits in one message** (routes vs frontend
  usage, file naming, VFS completeness, code smells).
- `SendMessage` is used to *widen a brief mid-flight*: in `1d3096d5` Claude realized the rule covered any
  `Widget`-returning private method, not just `_build*`, and messaged all six running agents at once.

## 4. Guardrails and trust

The gate is `gmake check` (`check/backend` = generate + gofmt + go vet/golangci-lint + sqlc lint;
`check/frontend` = dart format + flutter analyze; `check/spelling` = cspell over ~1000 files), plus
`test/unit/backend`, `test/integration/backend`, `test/unit/frontend`, `test/chaos/local`, and a wrk-based
perf profile with a p99 gate. A local `pre-commit` hook runs `make check`; a local `prepare-commit-msg`
hook derives the conventional-commit prefix from the branch name; a `commit-msg` hook rejects an unsigned
commit.

**Guardrails that caught agent mistakes:**

- cspell / `check-misc` caught agent-introduced words at least five separate times: `schemeless`,
  `misparse`, `brandons`, `macbook` (`9a065aa3`); `unbuilt`, `unrecognised` (`63a2e915`); `unzoomed`,
  `letterboxing` (`a1100b30`); `zoomable`, `swipeable` (`1d3096d5`); `vaultutil` ×92, `deviceutil` ×29,
  `Foundf`, `invalidf` (`e78bace6`). Notably `brandons`/`macbook` came from copying a colleague's real
  hostname out of a bug report into test data — Claude genericized rather than dictionary-listing it.
- `check/format/go` caught a **cross-branch** formatting bug in the 17-PR stack: deleting the longest
  entry of `queryTokenPrefixes` in the #1668 commit changed gofmt's comment alignment in
  `middleware.go`, failing six PRs (#1682–1687) until the later lint commit incidentally reformatted it.
  Fixed at the source commit and cascaded.
- golangci-lint on **Linux** caught two hits the macOS lint pass missed, in `usb_devices_linux.go`
  (build-tag-gated files).
- Red-green discipline caught two agent errors: in `b871ecee` a new test still failed after the "fix",
  revealing `_handlingPendingFile` was the real suppressor; in `a1100b30` an agent wrote a failing test,
  applied the issue's *own suggested fix* (`InteractiveViewer.panEnabled: false`), watched it still fail,
  and only then used the alternative.
- Claude caught its own agents twice by review: the photo-bytes cache served stale bytes after `_rotate()`
  (`a1100b30`), and a zoom-threshold collapse from `1.01` to exactly `1.0` reintroduced bug #1707 —
  "The old `1.01` was tolerance, not arbitrariness."

**Slips:**

- A `.qsheet`/`.qdoc` filename truncation shipped in PR #1742: `name.substring(0, name.length - 8)` for a
  7-character extension, duplicated in both editors. Every save wrote to a *different file*; user caught
  it from a network trace. Root-caused to a hand-counted length, replaced with one
  `fileNameWithoutExtension(path, extension)`.
- The 17-PR stack was submitted "green" locally but six PRs were red on GitHub — the format drift above.
- Only one of six parallel agents in `1d3096d5` ran cspell. Claude's own words: "That was my miss, not
  the agents' — I had them run analyze, tests, and format, but only one of the six thought to run cspell.
  Worth adding to the standard verification list."
- `make check/spelling` was broken locally for months (bare `cspell` not on PATH); fixed in `1d3096d5`
  by making the target depend on a `node_modules: package-lock.json` rule running `npm ci`.

**New guardrails created in-batch:** `test/utils/error_text_test.dart` scans `lib/` and fails the build on
any `Text('…$e')` (`5c74fe6b`); `scripts/check-go-structure.bash` enforces the interface-file and
`<pkg>.go`-is-public rules with negative tests (`e78bace6`); a Go test asserting a launchd plist's filename
matches its `Label` (`3237818d`); an `api-chaos` CI job (`0f541af4`).

## 5. Steering and correction

The corrections that became rules:

- **"Don't just 'mention' things, make them real sub-issues"** (`c3f31fbb`) → 19 GitHub sub-issues wired
  with `gh issue edit --add-sub-issue`.
- **"With any feature you are removing, be sure to check if there are migrations and good github issue
  reasonings behind it, and they are just missing a UI."** (`c3f31fbb`) This became the epic's governing
  rule and reversed most of the delete list. It caught a genuine bug: deleting `photos/duplicates.go`
  would have left `photo_hashes` **write-only** — its writer is on the live thumbnail path, and
  `duplicates.go:58` was the only reader.
- **"types.go should contain all private types and helpers.go should have all private functions… the
  `<pkg>.go` is strictly public"** (`e78bace6` 08-29T17:07) → applied across 17 handler packages and
  encoded in AGENTS.md *and* in the structure check.
- **"a feature is what the user can do, never what currently implements it"** — derived from the user's
  "who knows if we may re-implement ffmpeg's functionality ourselves in the future" (`bf72a6c1`).
- Memory files written to `~/.claude/projects/.../memory/`: `commit-subjects-must-be-bare.md`,
  `use-gh-stack-for-stacked-prs.md`, `image-viewer-widget-test-gotchas.md`, `no-directional-copy.md`.
- Pushback on scope: "Don't do the work yet. Just wanted you to prep the epic" (`c3f31fbb`) after Claude
  launched an implementation agent. Claude deleted the empty branch and apologized: "my mistake, I ran
  past the ask."
- Praise: "All works great! Now, do the hard work of getting the whole stack green." and "Wow this was
  much better! Love it." (`a1100b30`).

The single richest correction sequence is `a1100b30` 09-01T02:10: "Many of the fixes didn't exactly work
well. Let's walk through each PR of the stack and you ask me for feedback on how it is working." Claude
then used AskUserQuestion per PR. Verdicts: 1715 "super claustrophobic… pointer events seem to get
confused"; 1716 "doesn't seem to work great, but most problematic is there is zero feedback"; 1717 "Fine,
move on"; 1718 "image metadata is slow… may even be blocking my ability to swipe". All three complaints
had causes *different from the stated symptom* — nine app-bar buttons in a 390px bar; a
fire-and-forget velocity trigger with no finger tracking; and `if (_loading) return` silently discarding
navigations.

## 6. Tooling around Claude

`gh` + `gh-stack`; `rtk` (a token-saving proxy — `rtk proxy gh issue view …` appears, once warning
"No hook installed — run `rtk init -g`"); ponytail (a `ponytail:` comment convention is in the codebase,
e.g. marking an O(n) ancestor query in `ListSharedWithMe`); `Monitor` and `SendMessage` fetched via
ToolSearch; AskUserQuestion for binary design decisions; `SendFeedback` for a harness bug; skills
`resolve-issue`, `gh-stack`, `quark-widgets-decouple`; memory files; `/insights`; `/compact`.

Model choice is explicit and changes mid-batch: `/model opus` (`1d3096d5`), `/model fable`
(`e78bace6` — the 17-branch orchestration ran on Fable with Opus subagents, exactly the
coordinator-larger-than-subagent rule). `AGENT[api-engineer/opus]` shows a custom agent type.
`~/.claude/settings.json` is a **symlink into a bootstrap dotfiles repo** — Claude declined to edit it
("Any edit lands in version-controlled dotfiles shared across all your projects").

## 7. Stack and conventions

Go 1.26 backend (gin, sqlc, golang-migrate, swag/swagger, air) + Flutter/Dart client (go_router,
flutter_quill, package_info_plus) + local packages `quark_widgets`, `quark_icons`, `data_table`,
`quark_formula`. Delivery: goreleaser, Docker, Armbian image, Android/iOS store pipelines.

AGENTS.md rules visible in use: handlers extract request data → call a `pkg/util/*` service with
Params/Result → build a response; DB tables only as a last resort; every user-facing error string comes
from `Errors` in `lib/utils/error_text.dart`; tuning constants in a static-const config class under
`lib/utils/`; one widget class per file, no private widgets, no `Widget _buildX()`; never materialize
user-sized file content as a `[]byte` (added by #1722); American spelling; no Claude session links.

## 8. Failure modes and war stories

- **The phantom push.** (`9a065aa3`) A split-commit agent's late second notification reported: "The PR
  was already open… **I did not create it, and I can't account for who did.**" It had re-run its checks
  against a remote Claude had pushed after it finished. Claude's reply: "No mystery there — that was me."
- **SMB was dead on arrival.** (`e78bace6`) User: "SMB does not seem to be working, even before your PRs.
  Any idea why?" A read-only Explore agent (pinned to `origin/main` via `git grep`/`git show` because
  another agent was rebasing the same worktree) found three independent blockers: the service runs as
  `User=quark` with `CapabilityBoundingSet=CAP_NET_BIND_SERVICE` while `smb.Setup` shells
  `apt-get install samba` and `systemctl restart smbd`; samba isn't in the image's package list; and ufw
  allows only `80/tcp`. Merged 2026-03-21, killed 2026-03-25 by the unprivileged-service-user change.
  Never worked on a shipped device. → issue #1703.
- **`--dart-define` was a silent no-op.** (`9a065aa3`) 11 of 13 services wrote `String.fromEnvironment(…)`
  without `const`, which in Dart always returns the default at runtime. Consolidation made it `const`,
  so `--dart-define=API_BASE_URL=…` suddenly started working — a real behavior change flagged in the PR.
- **`cspell.json` is a symlink.** (`9a065aa3`) The edit followed the symlink correctly but
  `git add cspell.json` staged the unchanged link; the commit went out with only the test file. Caught on
  the commit stat, amended, force-pushed with `--force-with-lease`.
- **The commit-hook doubling.** Repeated across sessions: a `docs(1642):` subject on a `chore/` branch
  produced `chore(1642): docs(1642): …`. Also `security(1660): fix(1660): …`, `feat(1606): fix(1606): …`,
  and once `chore(1600): give give …` from a bad sed. Resolved by the memory rule *and* by renaming a
  branch (`security/…` → `fix/…`) so the derived prefix would be a type the repo actually uses.
- **Two PRs extracting the same pages from opposite directions.** (`1d3096d5`) #1743 (mechanical
  one-widget-per-file split) and #1744 (rewrite onto new layout primitives) collided in 17 conflict hunks
  across 5 files plus three add/add duplicates. A forked agent was launched, the user killed it mid-rebase,
  and Claude finished it in the main thread on a stated principle ("#1744's rewrite supersedes #1743's
  mechanical move where they overlap"), deleting four orphaned files after verifying zero importers.
- **A flat perf budget that main itself couldn't hold.** (`b871ecee`) `files_list_nonadmin` p99 341ms
  against a 250ms gate that had merged the day before. User: "That threshold is a bit intense at 250ms.
  Maybe up it to 400ms." Claude checked the data first and pushed back — the *load* profile measured
  470/555/682/797ms across runs with no code difference — and got a split (400 stress, 1000 load) via
  AskUserQuestion, shipped as its own PR #2208 off main because "it unblocks every open PR, not just this stack."
- **Agents crashing mid-run.** `a1100b30`'s #1710 agent died twice to "API Error: Connection lost
  mid-response"; its uncommitted work survived and `SendMessage` resumed it from its own context.

## 9. Openclaw / Discord / Exo / sable

No mention of Openclaw, Discord bots, or "sable" anywhere in this batch. **"Exo" appears once**, as a
GitHub account: issue #1355 (`chore: [VFS Phase 6] cut over`) has `author: exokomodo-bot (Exo)`
(`c3f31fbb`). Two human collaborators appear: `brandonapol` (files issues #1624, #1606, #1622; opened PR
#2085) and `jamesaorson`.

## 10. Surprising things / blog candidates

1. **The `/insights` numbers** (`8853a185`): 5,137 Bash calls against only **85 Edits** and 829 messages
   across 393 hours and 240 commits, with 141 Agent invocations. The report's own phrasing: "You operate
   Claude Code like a tech lead running a release train, not like someone pair-programming line by line."
2. **The `$e` linter test.** A refactor that ended by installing a test which fails the build if any file
   in `lib/` interpolates a thrown object into user-facing text. The rule enforces itself from then on.
3. **"No caller ≠ dead."** The archaeology pass turned a 12-item delete list into 5 gap issues, 4
   deletions, and 3 unclears — and caught a write-only DB table.
4. **Three tests that only exist because a red-green step was demanded.** The `panEnabled` disproof, the
   `_handlingPendingFile` discovery, and the `PopScope` test which revealed a *second* bug nobody knew
   about: Android system back popped the image viewer with a `null` result, so a deleted photo never
   refreshed the grid behind it.
5. **Pushing onto someone else's PR.** `0f541af4` ends with an AskUserQuestion — "This branch already has
   an open PR, #2085, and brandonapol opened it, not you. How should I push the new commit?" — answered
   "Push to #2085", and a `BRANCHES_TO_SKIP=qa` env override so the hook wouldn't prefix `qa:` onto a
   `test:` subject.

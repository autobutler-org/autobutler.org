# Quark (formerly AutoButler): the repository and GitHub record

Research angle: what `autobutler-org/quark` itself can prove about the claim that after a hand-written
foundation, the application was written by AI agents — first Openclaw bots coordinated over Discord, later
local Claude Code sessions. Local transcripts only exist from 2026-08-25 onward, so everything earlier rests
on commits, PRs, issues, and config.

All evidence below is from `git log`/`git show` on the checkout at
the local `quark` clone and from `gh` against `autobutler-org/quark`, read-only.
Statements marked **(inference)** are my reading, not something the repo states.

## Headline numbers

| Metric | Value |
| --- | --- |
| Commits on `main` | 1,090 (`3686a5d4` 2025-02-07 → `d55748bc` 2026-09-21) |
| Pull requests | 1,214 total; 1,049 merged; 120 closed unmerged |
| Issues | 918 (696 closed, 222 open) |
| Release tags | 108, `v0.0.0` → `v0.40.1` (2026-09-21) |
| Go test functions, now | 1,312 across 189 `_test.go` files |
| Dart tests, now | 1,359 across 203 `_test.dart` files |
| Makefile targets | 115 in a 1,265-line Makefile |
| GitHub workflows | 14 |

Commit-author identities (`git shortlog -sne --all`): James Orson 795, `Exo <…exokomodo-bot…>` 235+30+6+1,
dependabot 141, Brandon Apol 83+55+29+2, Sable 19+8, Claude `<noreply@anthropic.com>` 5, Taylor Waddell 5,
copilot-swe-agent 3, Nathan Barlow 2, btrose1 1.

---

## 1. Eras

### Era 1 — hand-built foundation (2025-02-07 → 2025-09)

`3686a5d4` "Initial commit" 2025-02-07. First weeks are monorepo scaffolding by James Orson with UI help from
Brandon Apol (`d32764b1` 2025-02-08 "Initial UI and styling"): Nuxt site, devcontainer, `.github/workflows/`,
`CONTRIBUTING.md` (`e27ae261`, PR #12, 2025-02-24), markdownlint, `make lint` (`24e253a7`, PR #25, 2025-03-12).

The Go backend arrives at `26a01738` (PR #116, 2025-06-12), "Rewrite backend in Go, using remote LLM". **The
"remote LLM" here is the product, not the authorship** — AutoButler was originally an LLM butler, and that PR
adds `pkg/llm/remote.go`, a system prompt file and `bb1b790c` "Add direct calling target for the LLM". I found
no evidence in the 2025 record that this code was agent-written. Mid-2025 milestones: multi-arch release
(`b4c6d747` #121), in-place update from GitHub releases (`58aa3631` #124), MCP server (`21fe616e` #127), Go+templ
UI (`7878c5dd` #128, 2025-06-21), sqlc + golang-migrate (`3b3f1cc7` #248, 2025-09-25).

Crucially, **there were no tests at all in this era.** At `a999535c` (2025-09-30): 163 Go source files,
0 `_test.go` files.

### Era 2 — Copilot-assisted (2025-10-03 → 2025-12)

`c053bf93` (PR #281, 2025-10-03, Nathan Barlow) adds `.github/copilot-instructions.md` — 49 lines, entirely
about where CSS may live. This is the first agent-facing file in the repo and the direct ancestor of today's
`AGENTS.md` (`git log --follow` shows `R100 .github/copilot-instructions.md → AGENTS.md` at `c3f74e80`,
2026-03-13).

`copilot-swe-agent[bot]` commits appear 2025-10-10 (`6b029d58` "Initial plan", `046099e3` "Fix topnav z-index…")
and 2025-12-21 (`f19233ca`). Only 5 Copilot PRs ever opened; **all 5 were closed unmerged.** Copilot survives in
the record mostly as a co-author trailer on 15 PRs in 2026-04/05 and as `copilot-pull-request-reviewer` on 6
reviews.

First tests land 2025-11/12: Playwright e2e (`30edd9fb` #346, 2025-11-12) and the first Go unit tests
(`0a0f7ad5` #447, 2025-12-01, which also introduces `scripts/coverage-excluded-packages.txt`).

### Era 3 — Openclaw bots (2026-03-17 → 2026-08-27)

The bots switch on almost exactly at 2026-03-17. First `Exo` commit that day: `27db7cd4`, `0d13a1f9`,
`f3a58469`, `8d1a2f8d`. `Sable` starts the same day (`afc27e5b`, `1ed0e1f0`, `249aab19`).

Identity evidence (all verified, not assumed):

- **Openclaw named in-repo**: `88e60487` (PR #705, 2026-03-18, authored by Exo) — "feat: AutoButler AgentSkill
  for ClawHub", body: "Adds `skills/autobutler/` — an **OpenClaw AgentSkill** that teaches AI agents how to
  interact with a live AutoButler instance via the REST API." `skills/autobutler/SKILL.md` and
  `references/api.md` are still in the tree.
- **`Exo` = exokomodo-bot**: emails `96310215+exokomodo-bot@users.noreply.github.com`,
  `exokomodo-bot@autobutler.org`, `exokomodo@gmail.com`. `.gitignore` gained `exokomodo/` with the comment
  "ExoKomodo's personal dev context (AI co-developer workspace)" (`0d13a1f9`, PR #660, 2026-03-17).
- **`Sable` = Brandon's bot (inference, strongly supported)**: commits as `Sable <sable-bot@users.noreply…>`
  and `sable-dev <babylopa@gmail.com>`, with one co-author trailer `Sable <apolbrandon+bot@gmail.com>` — a plus
  address on Brandon Apol's personal mail.
- **A third agent, "Galadriel"**: one co-author trailer `Galadriel <galadriel@autobutler.local>` on `6eac4986`
  (PR #2015, 2026-09-18).
- **The team treated bots as reviewers explicitly.** `6bbff4e8` (PR #812, 2026-03-24, Exo) rewrites
  `.github/pull_request_template.md` "for bot-oriented review workflow", and the template still carries a
  **"## Bot Review Guidance"** section: *"Optional: direct Sable / ExoKomodo attention to the gnarly part, e.g.
  'focus on concurrency in pkg/util/eventbus'"*.

No Discord artifact survives in the repo — **coordination over Discord is not verifiable from this record.**

Volume: `exokomodo-bot` opened **316 PRs**, 238 merged. Peak month 2026-03 (100 PRs opened in one month; 127
non-dependabot PRs merged repo-wide, 50 in week 2026-W12 alone). Last bot commit `0144bd25` (PR #1632,
2026-08-27); last bot PR opened 2026-08-27.

What the bots worked on, by sample: test coverage sweeps (`a3569a74` "[Test] Audit and improve test coverage
(#640)"), auth (`3af6e250` #650 basic auth), routing (`f053ddb3` #737 go_router), the spreadsheet formula
engine (`67cac2fa` #1057, `26b5ade8` #1058), performance harness (`2d96e27a` #1092), the VFS migration
(`41c2d8f8` #1361), video (`2279541b`/`1ace1927`/`9a7d81cf`/`bfd8a214`, #1446–#1449), and OS imaging
(`f35503a4` #1067 Packer).

The bots also reviewed: `exokomodo-bot` is the author of **158 of 388 PR reviews** in the repo, second only to
James (165). Sample bot review comment on PR #737: *"CI green, flutter analyze clean on arm64. SBOM drift
fixed. Implementation looks correct — auth redirect replaces AuthGate cleanly… Ready for merge, @jamesaorson."*
Merges stayed human: `mergedBy` is jamesaorson 943, brandonapol 93, exokomodo-bot 10.

### Era 4 — local Claude Code (2026-08-25 → now)

The transition is sharp and dated. From `342173ed` (2026-08-25) onward, commits authored under the human
accounts change character: issue number in the conventional-commit scope, and plain-English subjects written
for a reader rather than a changelog — `8276fde6` "fix(1604): stop whitespace filenames wedging file
navigation (#1608)", `a59bfa86` "feat(1637): tell the user plainly when the app can't reach their Quark
(#1644)", `5772251c` "fix: say a delete goes to Trash, not that it is permanent (#2086)". 2026-08 and 2026-09
carry 70 and 145 James Orson commits respectively, against 3 and 2 in 2026-05/06. **(Inference: these are local
Claude Code sessions committed under the operator's identity — the repo carries only 9 `Co-Authored-By: Claude`
commits, so authorship is not marked in the trailers.)**

What *is* hard evidence of local Claude Code:

- `git worktree list` shows live agent worktrees: `quark/.claude/worktrees/agent-a54cf39fc6a232352`,
  `agent-a6e8ae026a792e42b`, `agent-ae70ad1556f718292`, plus one under the `../autobutler` checkout.
- Sibling checkouts on distinct branches, all touched 2026-09-21: `../quark-2` (`flutter-upgrade`),
  `../quark-3` (`feat/2009-2042-photos-empty-ctas`), `../quark-3-upload-album`
  (`fix/2240-upload-into-album`), `../autobutler` (`fix/2029-recovery-confirmation`). Four parallel checkouts
  plus three worktrees.
- `.gitignore` lines 108–112: `## Claude Code workspace (agents are shared; everything else is per-developer)`
  → `.claude/*` ignored, `!.claude/agents/` and `!.claude/skills/` unignored (`a73b4f40`, PR #1785,
  2026-09-05).
- `CLAUDE.md` created 2026-09-05 (`6e2aa390`, PR #1783) containing exactly one line: `@AGENTS.md`.
- `.mcp.json` added 2026-09-04 (`83080510`, PR #1733): a `flutter-probe` MCP server.
- Checked-in subagent definitions `.claude/agents/{api-engineer,page-decoupler,widget-engineer,widget-reviewer}.md`
  (2026-09-04) and skills `.claude/skills/{gh-stack,quark-widgets-decouple,quark-widgets-widget-tests,resolve-issue}/`
  (2026-09-05 / 09-11).

### The rename

`07fcc7ae` (PR #1560, 2026-08-21) "Rename autobutler to quark": **483 files changed, +2,287 / −3,431**. Renames
every workflow (`autobutler-check.yml` → `check.yml` etc.), the binary, the goreleaser config. Follow-ups:
`0b455133` "Change remnant 'butler' strings to 'quark'" (#1630), `2b3874ee` `.abdoc`/`.absheet` → `.qdoc`/`.qsheet`
(#1659), and `4784ac62` (#1607, 2026-08-25) "rename Cirrus to Files, with /cirrus kept as a deprecated API
alias" — 135 files. The deprecated alias was deleted eight days later (`7045396d`, #1682).

### Commits per month by author class

| Month | Human-typed accounts | Openclaw bots | dependabot |
| --- | --- | --- | --- |
| 2025-02..2025-09 | 15,15,11,17,61,34,18 | — | — |
| 2025-10 | 14 | — | — |
| 2025-11 | 70 | — | — |
| 2025-12 | 46 | — | — |
| 2026-01 | 35 | — | — |
| 2026-02 | 32 | — | — |
| 2026-03 | 32 | 93 (Exo 85, Sable 8) | — |
| 2026-04 | 36 | 24 | 19 |
| 2026-05 | 13 | 16 | 21 |
| 2026-06 | 13 | 19 | 25 |
| 2026-07 | 1 | 34 | 20 |
| 2026-08 | 71 | 57 | 30 |
| 2026-09 | 171 | 0 | 24 |

From 2026-08-25 the "human-typed" column is, by the argument above, largely Claude Code output **(inference)**.

---

## 2. Agent-facing project structure

| Date | Artifact | Commit / PR |
| --- | --- | --- |
| 2025-10-03 | `.github/copilot-instructions.md` (49 lines, CSS only) | `c053bf93` #281 |
| 2025-11-13 | backend-assumptions + Playwright e2e rules | `016ea7fe` #361 |
| 2025-12-02 | **API endpoint architecture rule** (extract / call service / build response) | `f71ef401` #454 |
| 2026-03-13 | renamed to `AGENTS.md` | `c3f74e80` #632 |
| 2026-03-19 | conventional-commit PR titles, `feat/123-slug` branches | `4f6dfd46` #760 (Exo) |
| 2026-04-15 | DB-minimization policy, "use Makefile targets", `packages/` | `e1f5e0e9` #1015 (Exo) |
| 2026-08-28 | error-copy rule (`Errors` in `lib/utils/error_text.dart`) | `4389cdb2` #1657 |
| 2026-08-29 | API package layout (`<pkg>.go` / `types.go` / `helpers.go` / `verb_noun.go`) | `931adc35` #1686 |
| 2026-08-29 | Go linting section | `c97116d1` #1688 |
| 2026-08-31 | **Streaming and memory** section | `3b7188de` #1722 |
| 2026-09-04 | widget package rules + `.claude/agents/` + `.mcp.json` | `83080510` #1733 |
| 2026-09-05 | Purpose / Repo map / Makefile table / "What the checks enforce"; `CLAUDE.md` | `6e2aa390` #1783 |
| 2026-09-05 | sqlc-only SQL rule | `a76bc1c5` #1758 |
| 2026-09-11 | **Scope discipline** + **Root cause over symptom** + **Verification before claiming done** | `f0154234` #1850 |
| 2026-09-18 | Probe e2e instructions | `6eac4986` #2015 |

`AGENTS.md` is now **622 lines**. Several rules name the incident that produced them, which is the most
blog-usable detail in the repo:

- Streaming: *"See #1705: `io.ReadAll` on a 4 GiB zip asked for ~12 GiB of heap and returned a 500. Streaming
  the same archive costs 17 MiB."*
- Migration numbering: *"golang-migrate records one integer per database… a migration merged below `main`'s
  highest is silently skipped on every device that has already upgraded (#1537)."*
- CSS transforms (2025-12-08, `6e25022d` #458): *"NEVER add CSS transforms … Transforms on :active, :hover, or
  :focus states cause positioning bugs where clicks fail to register… **This has caused numerous bugs.**"*
- Layout: *"No `Expanded` or `Flexible` inside slivers or other unbounded parents (#1599)."*
- Globals: *"Package-level mutable state was moved onto it deliberately (#1674)."*
- Verification: *"CI has gone red repeatedly on `gofmt`, `dart format`, cspell, and
  `scripts/check-go-structure.bash`"*, and *"Never write 'verified by hand', 'tested manually', or the like…
  unless that verification actually happened in this session."*
- Process: *"A PR or commit never carries a Claude Code session link."*

Other agent-facing material: `docs/user-journeys/` (ten files of stable `JN-XXX` journeys, added `a8ff57ea`
#2206), `docs/dev-onboarding.md`, `lib/widgets/README.md` as a live decoupling inventory, and
`packages/quark_widgets/skills/` installed into `.claude/skills` by `make setup/skills`.

`.claude/skills/resolve-issue/SKILL.md` is the clearest codification of the workflow: read issue → branch
`fix/<N>-slug` → diagnose and write the failing test first → grep for sibling call sites → minimal fix →
`gmake check` + `gmake test/...` → one signed-off conventional commit → `gh pr create` with `Closes #N` →
report exactly what was run.

---

## 3. Guardrails

| Guardrail | Config | Introduced |
| --- | --- | --- |
| markdownlint | `.markdownlint.yaml` | 2025-02-24 `e27ae261` #12 |
| editorconfig | `.editorconfig` | 2025-06-12 `26a01738` #116 |
| goreleaser | `.goreleaser.yaml` | 2025-06-14 `b4c6d747` #121 |
| sqlc + golang-migrate | `sqlc.yaml` | 2025-09-25 `3b3f1cc7` #248 |
| Playwright e2e in CI | `autobutler-test.yml` | 2025-11-12 `30edd9fb` #346 |
| yaml-lint | `.yaml-lint.json` | 2025-11-15 `abb21073` #406 |
| coverage exclusions | `scripts/coverage-excluded-packages.txt` | 2025-12-01 `0a0f7ad5` #447 |
| Flutter analyzer | `analysis_options.yaml` | 2026-03-05 `30cd4893` #622 |
| **pre-commit hook running `make check`** | `git/hooks/pre-commit` | 2026-03-18 `af63c53f` #696 |
| PR template | `.github/pull_request_template.md` | 2026-03-18 `290deebd` #710 |
| CodeQL | `codeql.yml` | 2026-04-14 `f78ca8e6` #989 |
| Dependabot (Actions + Go) | `.github/dependabot.yml` | 2026-04-15 `fddb74e6` #1000 |
| Performance/stress suite (wrk + Lua) | `performance.yml` | 2026-05-11 `2d96e27a` #1092 |
| CodeQL per-language configs | `.github/codeql/*.yml` | 2026-08-11 `c3e346fa` #1483 |
| **cspell** | `cspell.json`, `.vscode/cspell.json` | 2026-08-21 `e93d97fb` #1571 |
| **golangci-lint + staticcheck + `check-go-structure.bash`** | `.golangci.yml` | 2026-08-29 `c97116d1` #1688 |
| migration-number check | `scripts/check-migration-numbers.bash` | 2026-09-05 `e57271a1` #1753 |
| Flutter Probe | `probe.yaml`, `.mcp.json` | 2026-09-04 / 2026-09-18 |

`govulncheck` runs on every PR (`check.yml` job `security-backend`). `.golangci.yml` is written as an explicit
**ratchet**, with the disabled rules annotated by the sweep they are waiting on: *"exported, package-comments —
253 missing doc comments… var-naming — serverutil.NewHttpError, ApiRoute and friends should be
NewHTTPError/APIRoute, but that rename touches 98 files. unused-parameter — 77 hits."* It also sets
`max-issues-per-linter: 0` because *"the defaults hide the rest, so a run can look nearly clean while hundreds
of issues sit behind the cap."*

**The "no uncommitted diff" gate is the load-bearing one for agents.** `check.yml` runs `make generate/backend`,
`make generate/frontend`, `make tidy/go`, `make tidy/flutter`, then `git diff --exit-code`. Generated sqlc
output, swagger, SBOMs and the embedded web build must all match what the tools produce.

**Branch protection**: a repository ruleset ("Default", id 3615992, active, created 2025-02-08, last updated
2026-09-14) on the default branch: deletion and non-fast-forward blocked, linear history required, squash-only
merges, `required_approving_review_count: 0` but
`require_extra_approval_for_unattributed_changes: true`, and eight strict required checks: `ci-android`,
`ci-backend`, `ci-ios`, `ci-web`, `check-backend`, `check-frontend`, `check-misc`, `check-migrations`. **Zero
required approvals is notable** — the gate is machine checks, not human sign-off.

Coverage: `make coverage` prints a percentage from `go tool cover`, with
`scripts/apply-coverage-ignore.bash` and an exclusion list. **No numeric coverage threshold is enforced
anywhere in CI** — coverage is reported (`PRINT_COVERAGE: true` in `ci-backend.yml`), not gated.

---

## 4. Testing

Counts taken with `git ls-tree` + `git show` at historical commits (no checkout):

| Date | Go src | `_test.go` | `func Test` | Dart src | `_test.dart` | Dart tests | Playwright specs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2025-06-30 | 51 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2025-09-30 | 163 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2025-12-31 | 84 | 12 | 152 | 0 | 0 | 0 | 20 |
| 2026-03-01 | 117 | 12 | 144 | 0 | 0 | 0 | 13 |
| 2026-03-31 | 147 | 31 | 353 | 58 | 8 | 82 | 0 |
| 2026-06-30 | 219 | 46 | 507 | 129 | 30 | 346 | 0 |
| 2026-08-31 | 300 | 103 | 889 | 165 | 66 | 651 | 0 |
| 2026-09-21 | 385 | 189 | 1,312 | 421 | 203 | 1,359 | 0 |

Two step-changes: **March 2026** (bots switch on; Go tests 144 → 353 in one month, driven by
`a3569a74` "[Test] Audit and improve test coverage (#640)" and Sable's `249aab19`/`1ed0e1f0`/`afc27e5b`), and
**Aug–Sep 2026** (local Claude Code; Go 507 → 1,312, Dart 346 → 1,359 in three months). The Playwright suite
was dropped when the Vue web app was replaced by Flutter (`30cd4893` #622, 2026-03-05).

Layout and split: Go tests sit beside the code. `make test/unit/backend` excludes `internal/server/api/v0/…`;
those are **integration tests** under `make test/integration/backend`, run against a real `gin` engine and a
real filesystem with a `deputil` dependency graph built from fakes. `test/` at the repo root is Flutter.
`ci-backend.yml` runs unit then integration, plus an `api-chaos` job (`make test/chaos/local`, added
`849ba6d6` #2085, 2026-09-21) that uploads `test-results/chaos/` artifacts. `performance.yml` runs wrk+Lua on
PR and nightly (cron `0 7 * * *`). e2e is now Flutter Probe on Android (`6eac4986` #2015).

**TDD evidence.** For every non-dependabot commit touching Go/Dart source, whether it also touched a test file:

| Month | code + tests | code, no tests | % with tests |
| --- | --- | --- | --- |
| 2025-11 | 0 | 47 | 0% |
| 2025-12 | 9 | 17 | 35% |
| 2026-03 | 23 | 63 | 27% |
| 2026-04 | 14 | 27 | 34% |
| 2026-06 | 9 | 21 | 30% |
| 2026-07 | 14 | 16 | 47% |
| **2026-08** | **68** | **14** | **83%** |
| **2026-09** | **137** | **7** | **95%** |

This is the single strongest number in the repo. Under the Openclaw bots, roughly a third of code changes
shipped with tests. Under local Claude Code with `AGENTS.md` and `resolve-issue` in place, it is 95%. This
measures co-shipping, not test-first ordering — squash merges destroy within-PR ordering, so **true red-green
TDD is not verifiable from the record**; `resolve-issue` step 3 mandates it ("write the failing test or scripted
repro first and show it failing").

---

## 5. Architecture and stack

Four UI stacks in nineteen months: Nuxt/Vue site (2025-02) → Go + `templ` + HTMX (`7878c5dd` #128, 2025-06-21)
→ HTMX minimized (`885b1c88` #365, 2025-11-13) → Vue SPA (`b7465e4c` #482, 2025-12-21) → Flutter monorepo
(`30cd4893` #622, 2026-03-05). The backend has been Go/Gin + SQLite since 2025-06.

Current layout (from `AGENTS.md` "Repo map"): `cmd/quark/`, `internal/db/` (sqlc + golang-migrate),
`internal/server/routes.go`, `internal/server/api/v0/<segment>/`, `internal/server/middleware/`,
`internal/server/public/` (`//go:embed` web build), `pkg/util/<x>util/`, `pkg/vfs/`, `pkg/backup/`,
`pkg/calendar/`, `sql/queries/`, `lib/` (Flutter app), `packages/` (`quark_widgets`, `data_table`,
`quark_formula`, `quark_icons`), `test/`, `docs/`, `scripts/`, `datalinks/`.

Conventions that make the tree mechanically navigable by an agent — each one machine-checked by
`scripts/check-go-structure.bash`:

1. **Handlers only extract / call a service / build a response.** Introduced `f71ef401` (#454, 2025-12-02),
   completed `d3b24784` (#455). Business logic lives in `pkg/util/`, with a gRPC-style
   `Params`/`Result` pair (`DeleteFiles(params DeleteFilesParams) (DeleteFilesResult, error)`).
2. **Directory name == URL segment**, no pluralization normalization, "because renaming a directory to read
   better would mean renaming the route."
3. **`<pkg>.go` is public-only**, `types.go` holds private types, `helpers.go` private functions, one handler
   per `verb_noun.go` file with its route registration beside it.
4. **Dependencies come from the request context**, never package globals (`#1674`).
5. **Every mutation publishes to `pkg/util/eventbus`**, or open clients go stale.
6. **All file access through `pkg/vfs`**; all SQL through sqlc, with the three documented exceptions each
   requiring an in-code comment naming which exception applies.
7. **Streaming only** on any user-sized path — `io.ReadAll`, `os.ReadFile`, `c.GetRawData()` are named as
   defects.

The large architectural sweeps (`931adc35` #1686 unifying handler packages; `aee38b3c`/`7045396d`/`b049ea08`/
`5259bad1` #1681–#1684 deleting five dead Go packages, the `/api/v0/cirrus` alias, six superseded endpoints
and the whole `/api/v1` group, all on 2026-08-29) happen in the local-Claude-Code window.

---

## 6. Process conventions

**Branch naming**, from PR head refs (non-dependabot):

| Month | `feat/`-style typed | `123_`/`123-` number-first | other |
| --- | --- | --- | --- |
| 2025-11 | 0 | 23 | 46 |
| 2026-02 | 0 | 12 | 19 |
| 2026-03 | 107 | 0 | 36 |
| 2026-08 | 161 | 0 | 14 |
| 2026-09 | 209 | 0 | 10 |

**Commit subject style**, by month:

| Month | conventional | `123:` prefix | freeform |
| --- | --- | --- | --- |
| 2025-11 | 1 | 24 | 45 |
| 2026-02 | 0 | 12 | 20 |
| 2026-03 | 100 | 0 | 25 |
| 2026-08 | 148 | 0 | 10 |
| 2026-09 | 192 | 0 | 2 |

Both conventions flip cleanly in **March 2026**, with the bots, and are codified retroactively by Exo in
`4f6dfd46` (#760). `Signed-off-by` is near-universal (784 of 1,090 commits; continuous since 2025-06).

**PR size and latency** (merged, non-dependabot, medians):

| Month | n | files | lines | hours open | had ≥1 review |
| --- | --- | --- | --- | --- | --- |
| 2025-11 | 68 | 7 | 207 | 0.1 | 1 |
| 2025-12 | 46 | 12 | 370 | 0.2 | 4 |
| 2026-03 | 127 | 3 | 128 | 0.7 | **74** |
| 2026-04 | 55 | 3 | 218 | 0.7 | 16 |
| 2026-06 | 35 | 2 | 108 | 0.9 | 7 |
| 2026-07 | 31 | 4 | 269 | 29.9 | 21 |
| 2026-08 | 133 | 3 | 258 | 17.0 | 3 |
| 2026-09 | 171 | 8 | 372 | 11.7 | 10 |

Two things stand out. The bots made **smaller** PRs (median 2–3 files) than either the human era before them or
the Claude Code era after (median 8 files in 2026-09). And review is highly concentrated in 2026-03: 74 of 127
merged PRs reviewed — mostly bot-on-bot — falling to 3 of 133 by 2026-08.

Reviews overall: 388 total (198 APPROVED, 152 COMMENTED, 38 CHANGES_REQUESTED, 3 DISMISSED). Reviewers:
jamesaorson 165, exokomodo-bot 158, brandonapol 32, github-advanced-security 28, copilot-pull-request-reviewer 6,
taylorwaddell 2. Only **228 of 1,214 PRs (19%) ever received a review.**

Merge cadence peaks at **111 PRs in week 2026-W38**, versus 57 in W33 and 50 in W12 (the Openclaw peak).

Issue hygiene: 7 issue templates (`bug`, `chore`, `epic`, `feature`, `performance`, `question`, `security`), an
auto-assign-author workflow (`eae54e59` #1221), and a used label set — 323 `feature`, 236 `bug`, 107 `ux`, 53
`epic`, 49 `security`, 28 `QA`, 25 `tech-debt`. Issue authorship: brandonapol 540, jamesaorson 229,
exokomodo-bot 143.

Release: 108 tags, `release.yml` fires on `v*.*.*` tags via goreleaser; `release-ios.yml`,
`release-android.yml`, `release-docker.yml`, `armbian-build.yml` are `workflow_dispatch`. Release cadence in
September 2026 is roughly one every 2–3 days (v0.36.1 → v0.40.1 between 09-07 and 09-21).

---

## 7. Quality signals — including the negatives

**Bot PR rejection rate is the honest counterweight to the volume story:**

| Author | PRs | closed unmerged | rate |
| --- | --- | --- | --- |
| jamesaorson | 566 | 9 | 2% |
| **exokomodo-bot** | **316** | **75** | **24%** |
| brandonapol | 169 | 21 | 12% |
| app/dependabot | 149 | 9 | 6% |
| **app/copilot-swe-agent** | **5** | **5** | **100%** |

Nearly a quarter of everything the Openclaw bot opened was thrown away. Human-account PRs before 2026-08-25:
450 opened, 21 discarded (5%); after: 285 opened, 9 discarded (3%).

**Reverts are rare: 7 in 1,090 commits.** `5ea76600` (#1612, honor `ListFilter.Recursive`), `ba25d0b4` (#1277,
back/go-up navigation), `a0fb259d` (#1095, SBOM), `5e1ae9ee` (dependabot bump), `c81da97b` (#1738, Flutter
upgrade), `93b17d73`/`c92f0662` (#2190/#2174, the health fetch blocking the files refresh).

**"Fix CI" commits: 65 total across 19 months**, clustered at 4 in 2026-09 and 2 in 2026-08 — i.e. the highest
throughput months are also when CI fixes cluster, which `AGENTS.md` acknowledges directly ("CI has gone red
repeatedly on `gofmt`, `dart format`, cspell…").

**Flaky/transient-failure commits** are mostly dependency-driven — five of eight `flake`-mentioning commits are
`modernc.org/sqlite` or `tailscale.com` bumps. Genuine product flakiness: `a63b87ca` (#1819, "wait out a busy
SQLite writer instead of returning 401") and `4a3c7e18` (#1717, retry on transient photo load failure).

**CI health right now** (last 300 runs, 2026-09-21 window): Check code quality 0/36 failures, CI-Backend 0/44,
CodeQL 0/44, CI-Web 1/44, CI-iOS 1/44, CI-Android 2/44, Performance Tests 4/36 (11%) — the performance suite is
the flakiest gate.

**Defects traceable to agent-written code.** Several `AGENTS.md` rules are post-mortems of exactly that: #1705
(a 4 GiB zip read whole into memory), #1537 (a migration numbered below `main` silently skipped on upgraded
devices), #1599 (`Expanded` inside a sliver breaking the photos view below 900px), #1674 (package-level mutable
state), plus the 2025-era CSS-transform rule that says "This has caused numerous bugs". The consistent pattern
is that a class of agent mistake becomes first a rule in `AGENTS.md` and then, where possible, a script in CI —
`check-go-structure.bash` and `check-migration-numbers.bash` both exist because prose alone did not hold.

---

## 8. Candidate stories for the series

1. **"Nineteen months, zero tests, then 2,671."** From `a999535c` (2025-09-30: 163 Go files, 0 tests) to today
   (1,312 Go + 1,359 Dart tests). The test suite is younger than the bots, and it grew fastest exactly when the
   agents were writing the code.
2. **"95% of commits now ship with a test."** The TDD table (0% in 2025-11 → 27% under the Openclaw bots → 95%
   in 2026-09) is the cleanest measurable outcome of writing `resolve-issue` and `AGENTS.md`.
3. **"A quarter of the bot's PRs were thrown away."** 75 of 316. The honest cost of parallelism, against a 2%
   discard rate for the operator's own PRs. And all five Copilot PRs were closed unmerged.
4. **"Bots reviewing bots."** `exokomodo-bot` authored 158 PR reviews, and the PR template still carries a "Bot
   Review Guidance" section addressed to Sable and ExoKomodo by name (`6bbff4e8`, #812).
5. **"Every rule in AGENTS.md is a scar."** The 4 GiB zip that asked for 12 GiB of heap (#1705), the migration
   silently skipped on already-upgraded devices (#1537), the CSS transform that made buttons dodge the cursor
   (#458). 622 lines of instructions, each traceable to a PR number.
6. **"Zero required approvals, eight required checks."** The ruleset says the trust model out loud: machines
   gate, humans merge. 943 of 1,049 merges by one account; only 19% of PRs ever reviewed.
7. **"The lint config that names its own debt."** `.golangci.yml` as a ratchet, with each disabled rule
   annotated by the sweep it is waiting on (253 doc comments, a 98-file rename, 77 unused `*testing.T`).
8. **"Four UI stacks in nineteen months."** Nuxt → Go/templ/HTMX → Vue → Flutter, with the Playwright suite
   deleted in the crossing. A rewrite is cheap when agents do the typing — and the tests are what survive.
9. **"483 files in one commit."** The AutoButler → Quark rename (`07fcc7ae`, #1560) as a mechanical change that
   would have been a week of human work.
10. **"Three checkouts, three worktrees, one afternoon."** `../quark-2`, `../quark-3`,
    `../quark-3-upload-album` and three `.claude/worktrees/agent-*` all on distinct branches, all touched
    2026-09-21 — and 111 PRs merged in week W38.

## Caveats

- Local Claude Code authorship of the 2026-08/09 commits under human accounts is **inference** from cadence,
  message style, the `.claude/` artifacts and the parallel checkouts; only 9 commits carry a
  `Co-Authored-By: Claude` trailer.
- **Discord coordination is unverifiable from this repo.** The Openclaw link is proven (PR #705, the ClawHub
  AgentSkill; the bot-review PR template); the transport is not.
- Squash merging means within-PR commit ordering is gone, so "tests before implementation" cannot be proven —
  only "tests in the same change".
- `Sable` being Brandon Apol's bot rests on the `apolbrandon+bot@gmail.com` co-author trailer.
- Coverage is reported but never gated; no numeric threshold exists in CI.

---
title: Every rule is a scar
description: Most rules in our AGENTS.md name the incident that produced them, and the moment an agent ignores one, it becomes a script.
date: 2026-10-15
author: James Orson
---

<!--
Other title options from the outline:
- One violation, then a rule; two, then a script
- 622 lines of post-mortems
-->

Hello friends! This is the fourth post in our series on how [Quark](https://quark.autobutler.org) gets built by AI
agents. Last time was about the gates: the pre-commit hook, the eight required checks, and why lints run locally while
tests run in CI. This one is about where the rules behind those gates come from.

Short answer: something broke.

Our `AGENTS.md` is 622 lines long, and a lot of its rules cite the PR or issue number of the incident that produced
them. It reads less like a style guide and more like a stack of post-mortems. That's on purpose, and the way a rule
graduates from prose to a script is the most useful thing we've figured out.

<!-- TODO(James): recount AGENTS.md lines at publication; 622 was the count on 2026-09-21. -->

## The threshold

The policy fits in two sentences:

> My threshold is if I see a rule already get ignored. Then it becomes a check as quick as I can reason to a static
> solution.

So there are two steps. Something goes wrong, and we write it down in `AGENTS.md`. Then, if an agent ignores what we
wrote, it stops being prose and becomes a lint, a script, or a test that fails the build. One ignored rule is enough.
We don't wait for a pattern.

It stays cheap because agents write the checks too. A new check is one more small issue to dispatch.

## One evening, start to finish

The best example is a single file upload.

On 2026-08-29 I pasted a log line from our Go backend into a session: a `POST /api/v0/files/extract` that returned a
500 after 6.39 seconds. That became [issue #1705](https://github.com/autobutler-org/quark/issues/1705). The cause was
`io.ReadAll` on an uploaded zip. The code read the whole archive into memory before doing anything with it.

Two days later, after the fix merged, I typed this:

> We always need to be using readers rather than read all of a file into a byte array or whatever. Our service needs
> to be able to run in low-memory environments and files can be arbitrarily large. I need you to encode this
> requirement in our AGENTS.md in a first PR, right now. Then you need to run discovery across the codebase finding
> all cases where this is being ignored as guidance, filing it away in a github issue to fix repo-wide.

By that evening we had:

- [PR #1722](https://github.com/autobutler-org/quark/pull/1722), adding a "Streaming and memory (always)" section to
  `AGENTS.md`
- [issue #1723](https://github.com/autobutler-org/quark/issues/1723), listing every place the codebase still read whole
  files into memory
- [PR #1724](https://github.com/autobutler-org/quark/pull/1724) and
  [PR #1725](https://github.com/autobutler-org/quark/pull/1725), fixing thumbnails, self-update, vault import, the
  backup checksum, RAW to JPEG conversion, CSV export, and client downloads

All merged. The rule in `AGENTS.md` reads:

> See #1705: `io.ReadAll` on a 4 GiB zip asked for ~12 GiB of heap and returned a 500. Streaming the same archive costs
> 17 MiB.

That sentence does more work than "prefer streaming" ever would. An agent reading it knows what the mistake looks
like, what it cost, and what the alternative costs. The rule now names `io.ReadAll`, `os.ReadFile`, and
`c.GetRawData()` as defects on any path that handles user-sized data.

The order matters here. The rule went in first, as its own PR, and the sweep came second. That way the agents doing the
sweep were already working under the new rule.

## The other scars

Once you look, the pattern is everywhere in the file:

- **Migration numbers (#1537).** "golang-migrate records one integer per database... a migration merged below `main`'s
  highest is silently skipped on every device that has already upgraded." Quark runs on customers' devices, so a
  skipped migration means a device in the field with the wrong schema.
- **Slivers (#1599).** "No `Expanded` or `Flexible` inside slivers or other unbounded parents." That one broke the
  photos view below 900 pixels wide.
- **Globals (#1674).** Dependencies come from the request context, never package-level variables, because
  package-level mutable state bit us once.
- **CSS transforms (#458).** This one dates to December 2025: "NEVER add CSS
  transforms... Transforms on :active, :hover, or :focus states cause positioning bugs where clicks fail to
  register... **This has caused numerous bugs.**" You can hear the frustration in the bold.

None of these are abstract best practices. Each one is a thing that happened to us, with a number you can look up.

## When prose stopped holding

Some rules got ignored, and those are now scripts.

Our Go API has a strict package layout: `<pkg>.go` holds only public declarations, private types go in `types.go`,
private functions in `helpers.go`, and each handler gets its own `verb_noun.go` file. It started as prose. Agents
drifted from it, and CI went red on it often enough that `AGENTS.md` now says so outright: "CI has gone red repeatedly
on `gofmt`, `dart format`, cspell, and `scripts/check-go-structure.bash`." That script landed in
[PR #1688](https://github.com/autobutler-org/quark/pull/1688) and enforces the layout mechanically. It has negative
tests, so we know it actually fails when it should.

The migration-number rule got the same treatment: `scripts/check-migration-numbers.bash` in
[PR #1753](https://github.com/autobutler-org/quark/pull/1753).

A couple of the scripts are tests that lint prose:

- We have a rule that all user-facing error copy goes through one `Errors` class. After a refactor of error messages,
  the agent added `test/utils/error_text_test.dart`, which scans `lib/` and fails the build on any `Text('...$e')`, so
  a raw exception can't leak onto a screen.
- The screen shown when the app can't reach your Quark said "confirm your Quark address below is correct" when the
  address was above it. I asked us to be careful about directional guidance like that. The fix came with a test that
  fails if "above" or "below" shows up in those in-place steps, plus a memory file, `no-directional-copy.md`, so the
  next session knows too.

## A lint config that names its own debt

Our `.golangci.yml` is a ratchet. Some linters are disabled, and each one says in a comment what sweep it's waiting
on: 253 missing doc comments; `serverutil.NewHttpError` and `ApiRoute` should be `NewHTTPError` and `APIRoute`, "but
that rename touches 98 files"; `unused-parameter` has 77 hits. It also sets `max-issues-per-linter: 0` because "the
defaults hide the rest, so a run can look nearly clean while hundreds of issues sit behind the cap."

The debt is written down in the same file that will enforce it once it's paid. Any agent that opens the config can see
what's left and why.

## A rule lands in more than one file

On 2026-09-04 I told a session: "I find very little need for 'private' widgets. They make files way way way too
long... I would greatly prefer all widgets to be in their own files."

That one sentence ended up in six files: `AGENTS.md`, all three agent definitions under `.claude/agents/`, the widget
package's decouple skill, and the package README, all in
[PR #1743](https://github.com/autobutler-org/quark/pull/1743). There's also a memory file, `no-private-widgets.md`.
Different agents read different subsets of those files, so a rule that lives in one place is a rule some of them never
see.

## Rules from usage data

Not every rule comes from a bug. On 2026-09-11 I pointed a session at Claude Code's own usage report for our project:
"I like basically all the CLAUDE.md suggestions it made and would suggest you put them in AGENTS.md."

That produced [PR #1850](https://github.com/autobutler-org/quark/pull/1850), which added three sections: **Scope
discipline**, **Root cause over symptom**, and **Verification before claiming done**. The last one reads "Never write
'verified by hand', 'tested manually', or the like... unless that verification actually happened in this session."
In the same PR we renamed the `/issue` skill to `/resolve-issue`, because it was about doing an issue, not creating
one.

## The 50-second make

This is my favorite scar, because I wasn't looking for it.

While working on our Android release pipeline, I asked for something small: "I think you need to add an echo to the
first line of the checks saying what target is running just so I have some indication of progress." The echoes showed
a check that only stats a directory taking 2 minutes and 16 seconds.

The agent bisected it. With no `.env` file, 2.5 seconds. Pristine `main`, 50.5 seconds. `main` plus a new
`ANDROID_BUILD_NUMBER ?= $(shell ...)` line the agent itself had added earlier, 132.8 seconds. The cause was a bare
`export` at `Makefile:19`, which makes GNU make expand every variable into every recipe's environment, and a
recursively expanded `$(shell ...)` variable runs its shell command again on every expansion.

The fix was five lines: `:=` with `$(or $(VAR),$(shell ...))`, so overrides from the command line still win. I said
"Open as it's own issue and PR for us to merge first," and it shipped as
[issue #1726](https://github.com/autobutler-org/quark/issues/1726) and
[PR #1727](https://github.com/autobutler-org/quark/pull/1727) ahead of the feature work. A no-op `make` went from 50.5
seconds to under half a second, more than a hundred times faster. That speedup applies to every `make` in the repo,
including the one our pre-commit hook runs on every commit.

<!-- TODO(James): the two session records disagree on the end state (0.39s vs 0.45s). Pick one and say how it was
measured, or keep "under half a second". -->

It counts as a scar because that same bare `export` had already bitten us. It leaked a `FLUTTER_BUILD_MODE ?=
debug` default into the iOS build and a debug build reached TestFlight in
[PR #1590](https://github.com/autobutler-org/quark/pull/1590). The fix for that one was a pinned build mode plus an
artifact check, and the Android pipeline got the same guard from day one. It caught a debug bundle before it went
anywhere.

## The one we haven't scripted yet

In fairness, not every boundary has a check. Our widget library rule (pages compose from `quark_widgets`, not raw
Material widgets) rests on `AGENTS.md` wording plus a widget-reviewer agent. There's no lint for it. By my own
threshold, that changes the first time I see an agent ignore it. That's the next post.

## Copy this

- Write the incident number into the rule. "See #1705: `io.ReadAll` on a 4 GiB zip asked for ~12 GiB of heap" gets
  obeyed. "Prefer streaming" doesn't.
- Adopt the escalation rule: write it down the first time something breaks, and script it the first time the written
  rule gets ignored.
- Put the rule in its own PR first, then run the repo-wide sweep, so every agent is reading the rule while the sweep
  happens.
- Write tests that lint prose: one that fails on `Text('...$e')`, one that greps user-facing copy for directional
  words.
- Annotate every disabled lint with the sweep it's waiting on.
- Keep per-project memory files for the small stuff. Ours include `commit-subjects-must-be-bare.md`,
  `use-gh-stack-for-stacked-prs.md`, `worktree-needs-pub-get.md`, `no-directional-copy.md`, and
  `codesign-then-agents.md`.

## What's next

Rules and scripts worked well for the backend, where a bad change usually fails a check. The frontend was different.
Code could pass `flutter analyze` and still look terrible, and no amount of prose fixed that. Next time: the widget
library is a DSL, and shrinking the vocabulary agents could write in is what finally got our screens right.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace,
James <!-- TODO: byline/disclosure, this draft was written by Claude -->

---

This is part 4 of 9 in our series on how we build Quark with AI agents.

← Previous: [Zero approvals, eight checks](/blogs/zero-approvals-eight-checks)

Next: [The widget library is a DSL](/blogs/the-widget-library-is-a-dsl) →

---
title: Zero approvals, eight checks
description: Our main branch needs no human approval and eight passing checks, and our pre-commit hook runs every lint and no tests. Here is why that split works.
date: 2026-10-08
author: James Orson
---

<!--
Other title options from the outline:
- The pre-commit hook runs every lint and no tests
- What we let the machines gate
-->

Hello friends! This is the third post in our series on how [Quark](https://quark.autobutler.org) gets built by AI
agents. In the first post I said we trust what the gates check. This post is the gates: the config, what they caught,
and the two places we chose not to let them bite.

## The ruleset

Quark's default branch is protected by a single repository ruleset, named "Default". It blocks deletion and force
pushes, requires linear history, and only allows squash merges. It requires eight status checks to pass, all in strict
mode: `ci-android`, `ci-backend`, `ci-ios`, `ci-web`, `check-backend`, `check-frontend`, `check-misc`, and
`check-migrations`.

It requires zero approving reviews.

That is not an oversight. I generally don't read the diffs anymore, so requiring an approval would mean requiring me to
click a button without looking. The ruleset does keep one human-shaped rule,
`require_extra_approval_for_unattributed_changes`, but the day-to-day gate is machines. A typical PR runs 14 to 16
checks. Eight of them block the merge.

## What `gmake check` is

Most of the blocking work comes down to one Makefile target. `gmake check` runs:

- gofmt, `go vet`, and golangci-lint with staticcheck
- `scripts/check-go-structure.bash`, which enforces our backend layout
- sqlc lint
- `dart format --set-exit-if-changed`
- `flutter analyze`, with info-level findings treated as fatal
- cspell over the whole repo, more than a thousand files
- a check that migration numbers don't collide

<!-- TODO(James): the cspell file count varies across the research (~1,000, ~1,300, 1,354, ~1,400). Pick one current
number before publishing, or keep "more than a thousand". -->

The one that matters most for agents lives in CI's check job. It runs `make generate/backend`, `make
generate/frontend`, `make tidy/go`, and `make tidy/flutter`, then `git diff --exit-code`. If the generated sqlc code,
the swagger docs, the SBOMs, or the embedded web build don't match what the tools produce, the check fails. An agent
can't hand-edit a generated file and get away with it, and it can't forget to regenerate one either.

Alongside those, CodeQL, govulncheck, and Dependabot run on the security side, plus an API chaos job and a wrk-based
performance suite.

## The split

When we were outlining this series, I put it like this:

> The pre-commit hook is absolutely the most powerful though. [...] Only tests can fail in CI this way. We avoid
> running all tests on pre-commit because the agent already runs scoped tests on its changes before attempting a
> commit. No need to run ALL tests on every commit, when scoped tests are run.

That's the whole design. Lints and formatters are cheap and they cover everything, so the pre-commit hook runs all of
them on every commit. Tests are expensive, so they're split in two: the agent runs the tests that touch its change
before it commits, and CI runs the full suite.

The result is that a lint failure reaching CI is rare. Not never: an agent can commit with `--no-verify`, and sometimes
one does, but when it happens the agent says so in the PR body and I know to look. We'll get into those cases in a later
post. The other gap is a clone where the hook was never installed; one agent noticed the hook hadn't run and ran
`gmake check` by hand.

The scoped tests have a benefit you can't see in our CI history. Failing tests often catch a wrong agent fix before it
pushes. By design, those catches never show up on GitHub.

The hook landed on 2026-03-18 in [PR #696](https://github.com/autobutler-org/quark/pull/696), one day after our bots
made their first commits.

## What the hook costs

Running every lint on every commit isn't free. At one point the hook took over two minutes per commit, long enough to
blow an agent's tool timeout. The fix was a five-line Makefile change that got its own PR, and that story belongs to
the next post.

<!-- TODO(James): how long does the pre-commit hook take today, after the Makefile fix? -->

## What the gates caught

A few favorites from our session logs.

**cspell as a grammar check for invented words.** Agents make up words, and cspell rejects them. It has flagged
`schemeless`, `misparse`, `unzoomed`, `swipeable`, and `vaultutil` 92 times in one pass. It also catches British
spellings: `behaviour`, `unrecognised`, and `normalising`, which blocked a commit outright. We use American spelling in
this repo, and nobody has to remember that, because the spellchecker does.

**`go vet` inside a 314-commit rebase.** We renamed our GitHub org, then rebased an old plugin branch across it. Git
merged the files cleanly, and some of them still imported the old `autobutler-org/autobutler` path. `go vet` caught it.
A clean merge is not a working merge.

**Linux caught what macOS didn't.** golangci-lint on Linux found two issues the macOS lint pass missed, in the
build-tag-gated `usb_devices_linux.go`. Separately, a rebase agent found that
[PR #2136](https://github.com/autobutler-org/quark/pull/2136) didn't compile on Linux: it had removed the only
`filepath.Base` call in a Linux-only file and left `"path/filepath"` imported. The agent's note on it: "it contradicts
the PR body's claim of a successful `GOOS=linux GOARCH=arm64 go build ./...`." The PR said it had been verified. The
compiler said otherwise.

**A new test suite finding a bug on its first run.** We added a conformance suite for our virtual filesystem, and it
immediately found that `LocalVFS` returned 3 entries when asked for `MaxResults=2`, because a `return nil` only stopped
walking the current directory ([PR #1612](https://github.com/autobutler-org/quark/pull/1612)).

**A debug build headed for TestFlight.** A hand-written check in our iOS release path looks for a file that only debug
builds contain. It fired with `Error: build/ios/ipa/Quark.ipa is a DEBUG build (contains
flutter_assets/kernel_blob.bin)` and stopped the upload.

## Green locally, red on GitHub

My favorite catch involved a 17-PR stack. Every PR was green locally. Six of them, [PR #1682](https://github.com/autobutler-org/quark/pull/1682)
through [PR #1687](https://github.com/autobutler-org/quark/pull/1687), were red on GitHub.

The cause was in an earlier layer, [PR #1668](https://github.com/autobutler-org/quark/pull/1668). That commit deleted
the longest entry in a list called `queryTokenPrefixes`. gofmt aligns trailing comments to the longest line, so
removing that entry changed the correct formatting of comments in `middleware.go`, three files away. A later lint commit
in the stack happened to reformat the file, which is why some layers passed and others didn't. The fix went into the
source commit and was cascaded up the stack.

I would not have spotted that in review. The formatter did.

## Where the gates deliberately don't bite

There are two things we measure and don't block on.

**Performance.** Our perf suite runs wrk against the API. It is not one of the eight required checks, and that's on
purpose:

> Perf suite is a bare sanity test on certain changes and does not block PR merges, since it is going to be flaky due
> to it being inconsistently performant cloud runners.

It fails about 11% of the time, 4 of the last 36 runs, and we accept that.

**Coverage.** `make coverage` prints a number, and CI prints it too with `PRINT_COVERAGE: true`. Nothing fails if it
drops. The honest reason:

> We have not gated coverage just because I lowkey forgot to care, lol.

<!-- TODO(James): now that this is public, do you want to gate coverage? If so, say so here or in post 9. -->

## The guardrail that costs the most

If you asked me which check costs us the most, it's cspell. Its false positives have not been a big deal basically
ever, but they add up. When `LZMA` and `Zstandard` failed spellcheck in CI, the fix was adding them to the dictionary.
When an agent copied a colleague's real hostname out of a bug report into test data, cspell flagged it, and the agent
made the test data generic instead of adding the name to the dictionary.

It's also the cheapest demonstration of the idea behind this whole series. When cspell blocked a commit over
"normalising", nobody had to put "use American spelling" in a prompt and hope. The convention lives in the toolchain,
so it holds whether or not the agent read the rules.

## Guardrails outside the repo

Some gates aren't in our repo at all. Claude Code has a permission classifier, and it has blocked a subagent from
running `gh pr merge` as "Merge Without Review" and from a force push onto `main` as "Git Destructive". Claude didn't
try to route around it. Its reply: "A message from you or another agent can't approve that."

That's the behavior I want. Merging is my job.

## Copy this

- A pre-commit hook that runs every formatter and linter and no tests. Put the full suite in CI and have the agent run
  scoped tests before it commits.
- Regenerate everything in CI, then `git diff --exit-code`. It's the cheapest way to stop an agent from hand-editing
  generated files.
- `flutter analyze` with info-level findings fatal, and `max-issues-per-linter: 0` in `.golangci.yml`. Our config
  says why: "the defaults hide the rest, so a run can look nearly clean while hundreds of issues sit behind the cap."
- A spellchecker over the whole repo. It's a grammar check for invented API names and a free American-spelling
  enforcer.
- Branch protection with `required_approving_review_count: 0`. If you aren't going to read the diffs, don't pretend
  you are.

## What's next

Most of these checks showed up after something went wrong first. Next up is "Every rule is a scar": how a rule gets
written down after one violation, and how it becomes a script after a second, starting with that two-minute
pre-commit hook.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace,
James <!-- TODO: byline/disclosure, this draft was written by Claude -->

---

This is part 3 of 9 in our series on how we build Quark with AI agents.

← Previous: [The issue is the prompt](/blogs/the-issue-is-the-prompt)

Next: [Every rule is a scar](/blogs/every-rule-is-a-scar) →

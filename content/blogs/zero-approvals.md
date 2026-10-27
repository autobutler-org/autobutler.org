---
title: Zero approvals, a wall of checks
description: Our main branch needs no human approval, but requires many passing checks. Here is why that split works.
date: 2026-10-26
author: James Orson
---

Hello friends! This is the third post in our series on how [Quark](https://quark.autobutler.org) gets built by AI
agents. This post talks about our merge gates and how we keep our release branch healthy.

## The ruleset

Quark's [`main` branch](https://github.com/autobutler-org/quark/tree/main) is protected by a single [repository ruleset](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets).
It blocks branch deletion and force pushes, requires linear history, and only allows squash merges. Importantly, it also
requires ten status checks, spread across the frontend and backend, to pass before merging code:

| Frontend         | Backend            | Other        |
| ---------------- | ------------------ | ------------ |
| `check-frontend` | `check-backend`    | `check-misc` |
| `build-android`  | `build-backend`    |              |
| `build-ios`      | `test-backend`     |              |
| `build-web`      | `check-migrations` |              |
| `test-frontend`  |                    |              |

If all status checks pass, the PR is mergeable with no approver.

Not an accident.

Not an oversight.

There is little reason for me to read the code at a gated stage anymore.

## Concerns from the masses

I often hear the concerns of people around fully automated code merging as centered around performance and security.
While legitimate to some degree, these are still often better mitigated with automated tooling. For example, we have
performance testing on every merge to `main`, and as of writing this blog post I will be transparent with you and tell
you that we are "failing" those currently.

First off, the definition of "failure" here is relative/arbitrary. Our thresholds are not strict, but instead mark off a
point where falling under it warrants investigation into either loosening our performance constraints in the test, or identifying
a real issue. In our current streak of failed tests, it seems [the failures](https://github.com/autobutler-org/quark/actions/runs/39692605456)
may relate to the merge of some code that [changed how password vault and chat E2EE key derivation works](https://github.com/autobutler-org/quark/pull/3659).
It seems the failure is not around performance, but around unexpected API call failures. So the test demonstrates some regression
that should be investigated,
[which is being tracked here](https://github.com/autobutler-org/quark/issues/3771).

Now I need you to be honest with yourself for a moment here: how often have you gated code on performance regressions? I
imagine that some of you, working in bespoke problem spaces, will answer yes and I applaud you for doing your due diligence.
I imagine the grand majority of devs are not even bothering with this sort of thing. I think those who don't care at all
are often acting foolishly, and that is why we have opted for non-gating performance testing as a means of providing a canary
in the coal mine for new and unresolved behavioral issues with the application.

With that canary present, we feel free to let the agents loose on the code, occasionally checking the canary for a heartbeat.
Even when the canary dies, as it has up above, this just triggers a "cleanup" session on the frontend or backend, or wherever
the issue is present. Every few months I have spent a few days cleaning up the crust that has built up in the codebase,
often starting with a manual review of the code, and then guiding agents towards the intended state. A few thousand lines
of code removed later, the code is healthy, vibrant, and ready to be changed again. How often do you enjoy this luxury on
conventional human-developed software projects? That question is left as an exercise for the reader.

Now, back to what we are doing.

## What is `check`

Most of our merge gating comes down to [a single Makefile target: `make check`](https://github.com/autobutler-org/quark/blob/da8e305e1afa82f43edbf9ecc275221577909a7f/Makefile#L1571). It runs a suite like the following:

| Frontend                            | Backend                                      | Other      |
| ----------------------------------- | -------------------------------------------- | ---------- |
| `dart format --set-exit-if-changed` | gofmt and `go vet`                           | spellcheck |
| `flutter analyze` (info is fatal)   | [golangci-lint](https://golangci-lint.run/)  |            |
|                                     | [staticcheck](https://staticcheck.dev/)      |            |
|                                     | `check-go-structure.bash` for backend layout |            |
|                                     | [sqlc](https://sqlc.dev/)                    |            |
|                                     | migration number collision                   |            |

You should be doing this in all codebases, human or AI-coded. You will find immeasurable long-term benefit off of forcing
everyone to code in a consistent manner, and these are cheap ways to gate exactly that. Get creative too. My favorite one
here is [check-go-structure.bash](https://github.com/autobutler-org/quark/blob/da8e305e1afa82f43edbf9ecc275221577909a7f/scripts/check-go-structure.bash),
a custom check to assert that the Go code modules put their code in the right "semantic" file locations. Say I want all
modules to declare types in one file, and have implementations in another file, we assert that here and fail PRs that stray
off the path. This guarantees that the AI agents can't hallucinate new project layouts, and prevents humans from doing the
same. That way everyone going into a module of our project knows where to find the code they are searching for, with or
without an IDE.

### Generated code

We have a lot of generated code, such as that which [sqlc](https://sqlc.dev/) creates, and we make sure on all PRs that
the committed code is the same as what is generated. By putting this in CI, it prevents and flags drifting generation tool
versions on dev and AI workspaces, while also guaranteeing no edits were made post-generation to generated files.

### Checks are valuable to all

The biggest lesson to take from this is that all code, human or AI-written, should be tightly gated, conformed, and checked.

Never trust anyone writing code without tools like these.

## Copy this

- A pre-commit hook that runs every formatter and linter and no tests. Put the full suite in CI and have the agent run
  scoped tests before it commits.
- Regenerate everything in CI, then `git diff --exit-code`. It's the cheapest way to stop an agent from hand-editing
  generated files.
- A spellchecker over the whole repo. It's a simple check for invented names and a free American-spelling enforcer (🇺🇸).
- Branch protection with `required_approving_review_count: 0`. If you aren't going to read the diffs, don't pretend
  you are.

## What's next

Most of these checks showed up after something went wrong first. Next up is "Every rule is a scar": how a rule gets
written down after one violation, and how it becomes a script after a second, starting with our
pre-commit hook.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace,
James

---

This is part 3 of 9 in our series on how we build Quark with AI agents.

← Previous: [The issue is the prompt](/blogs/the-issue-is-the-prompt)

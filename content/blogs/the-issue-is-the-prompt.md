---
title: The issue is the prompt
description: Our instructions to an agent average about 65 characters, because the planning already happened in a conversation whose output was a Github issue.
date: 2026-10-07
author: James Orson
---

In the [last post](/blogs/we-stopped-coding-in-march) I said that on one afternoon in August I started
three pieces of work in nine minutes, and each prompt was a single line pointing at a Github issue. This post is about why
that not only works, but works exceptionally well.

This is because the issue is the prompt.

## What I actually type

The most common way I start a piece of work is either this:

```text
Do https://github.com/autobutler-org/quark/issues/1782
```

or, once I had written my [`resolve-issue` skill](https://github.com/autobutler-org/quark/blob/48a76aea65717d9968f1608fa84c2df34a5a1d93/.claude/skills/resolve-issue/SKILL.md):

```text
/resolve-issue https://github.com/autobutler-org/quark/issues/1782
```

After that, most of what I type is simple steering commands: `Rebase`, `PR up?`, etc. As of writing this, 117 of my prompts
were 12 characters or shorter, including `yes`, `merged.`, or `thanks`.

When something breaks, I paste the evidence and nothing else. One bug report was a single Gin access log line:

```text
[GIN] 2026/08/29 - 14:00:59 | 500 | 6.39s | ::1 | POST "/api/v0/files/extract?..."
```

Another was the whole App Store Connect rejection email. Another was a CI job URL as the
entire message. Another was three Flutter exceptions pasted verbatim. I don't often attach a diagnosis.
Diagnosis is, de facto, the agent's job.

If you were to read only my terminal prompts, it looks like I'm barely involved, but that's the wrong reading.

## Where the thinking went

The expensive conversation happens before any code exists, in a session whose only output is tickets.

Brandon and I spend a lot of time talking to our agents about the work to be done, splitting it up in the planning session,
and only filing tickets once the entire scope is considered. If we don't know the shape of the work yet, we keep talking
to the agent until we do, and then we have the agent write it down into an issue.

My long prompts almost all end the same way, by keeping the agent away from code. One ends: "Don't fix it. Write an issue."

Epics are the largest planning units. Sub-issues are the units that we dispatch the agent to work on.
[This is encoded in our `AGENTS.md`](https://github.com/autobutler-org/quark/pull/1922).

So by the time I type `Do <url>`, three things are already written down somewhere:

- the acceptance criteria, in the issue body
- the procedure, in the issue body or as a checked-in skill
- the conventions, in `AGENTS.md`, which are more static and non-specific

We are pretty strict about this. An audit log provides great value over time.

Sometimes, Claude finds an issue and still tries to fix it on the `main` branch. The fix is often correct, however, it doesn't
follow the procedure. The procedure does not make it more correct, but the procedure produces a permanent remote memory
for any agent to reference later, so I correct it in-place.

An example, when it fixed a bug in `main` without an issue, I told it: "No, so file a ticket first, then put this change
on a branch and push that up with a PR." The ticket became [#2114](https://github.com/autobutler-org/quark/issues/2114)
and the fix
became [PR #2117](https://github.com/autobutler-org/quark/pull/2117).
The issue is the record of why a change exists, and we want that record even when the change comes first.

## The loop is a file

The refined procedure an agent follows once it has an issue now lives in the [`resolve-issue` skill](https://github.com/autobutler-org/quark/blob/48a76aea65717d9968f1608fa84c2df34a5a1d93/.claude/skills/resolve-issue/SKILL.md).
When we started this series, it contained 10 steps:

1. Read the issue and check whether a PR for it already exists.
1. Branch `fix/<N>-slug` or `feat/<N>-slug` off a fresh `main`.
1. Diagnose before editing. For a bug, write the failing test or scripted repro first and show it failing.
1. Find the siblings: grep for every other call site with the same defect and fix it in the shared place.
1. Decide on a single PR, or a stack, defaulting to a stack.
1. Make the minimal fix. "No new abstractions, dependencies, or forks without asking first."
1. Run `gmake check` and the relevant test targets.
1. Make one signed-off commit.
1. Open the PR with `gh pr create` and `Closes #N`.
1. Report. List exactly what you ran and what it showed. Never claim a manual check you did not perform.

Because the loop is a checked-in file, every session gets it, and when we learn something new the
file changes and every future session now receives the same guidance.

## Stacks are how I review

Most real work doesn't fit in one PR, so we use [stacks](https://dev.to/ehrbhein/mastering-stacked-pull-requests-prs-25n3).

This is the prompt that kicked off our backend cleanup epic on 2026-08-29:

> Use Opus for sub-agents and orchestrate their work... Do all of this in one massive Github stack, using the gh-stack extension
> of course... I want to be able to test the full result of this work on a single branch and then merge it all together.

That one prompt produced a 17-PR stack. I could check out the top of it, run the whole thing, and merge the layers in order.

For a while, this was the part that still annoyed me the most. I had to keep telling the model to stack PRs,
[which was likely because they had just been released in public preview in Github](https://github.blog/changelog/2026-07-30-stacked-pull-requests-are-now-in-public-preview/).

So we wrote it down, not waiting for the models to be trained. During the research for this series, [PR #2275](https://github.com/autobutler-org/quark/pull/2275)
added the fifth step to `resolve-issue`: "Decide: stack or one PR. Default to a stack."

## Copy this

- Something like the `resolve-issue` skill, adapted to your repo. If you take only two lines.
- [Issue templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository),
  so the acceptance criteria have somewhere to live. We currently have seven: `bug`, `chore`, `epic`, `feature`, `performance`,
  `question`, and `security`.
- A rule that a spike is never dispatched. Talk it down to known scope with the agent, then file the tickets for dispatch.
- Epics for planning, sub-issues for dispatch, and that rule written somewhere in `AGENTS.md`.
- `gh stack` or another equivalent, with guidance given to the AI on how to do this. PR stacks have existed for a long time,
  but are not as well documented on the public internet as one would hope.

## What's next

Next time: why our main branch requires zero approvals, has a plethora of mandatory checks, and our pre-commit hooks.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace,
James

---

This is part 2 of 9 in our series on how we build Quark with AI agents.

← Previous: [We stopped coding in March](/blogs/we-stopped-coding-in-march)

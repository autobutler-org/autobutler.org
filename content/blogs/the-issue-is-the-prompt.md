---
title: The issue is the prompt
description: Our instructions to an agent average about 65 characters, because the planning already happened in a conversation whose output was a Github issue.
date: 2026-10-07
author: James Orson
---

In the [last post](/blogs/we-stopped-coding-in-march) I said that on one afternoon in August I started
three pieces of work in nine minutes, and each prompt was a single line pointing at an issue. This post is about why
that works, and where the real prompt actually lives.

## What I actually type

Between 2026-07-18 and 2026-09-21 I typed 948 prompts into Claude Code across 28 active days. The median prompt is
about 65 characters, and that stayed flat across both months. 300 of them (32%) are 40 characters or fewer. Only 20
are 500 characters or longer.

The most common way I start a piece of work is literally this:

```text
Do https://github.com/autobutler-org/quark/issues/1782
```

After that, most of what I type is steering. `Rebase`. `PR up?`. `yes`. `Merged.` 117 of my prompts are 12 characters
or shorter, including `yes` 16 times and `merged.` 5 times.

When something breaks, I paste the evidence and nothing else. One bug report was a single Gin access log line:

```text
[GIN] 2026/08/29 - 14:00:59 | 500 | 6.39s | ::1 | POST "/api/v0/files/extract?..."
```

Another was the whole App Store Connect rejection email, ITMS-90683 text included. Another was a CI job URL as the
entire message. Another was three Flutter exceptions pasted verbatim, one of which reported that "A RenderFlex
overflowed by 199367 pixels on the bottom." I don't attach a diagnosis. Diagnosis is the agent's job.

If you read only my prompts, it looks like I'm barely involved. That's the wrong reading.

## Where the thinking went

The expensive conversation happens before any code exists, in a session whose only output is tickets.

Brandon and I spend a lot of time talking to our agents about the work to be done, splitting it up in the session, and
only filing tickets once the entire scope is considered. The rule for what can be dispatched is short: an issue is not
ready if it is a spike. If we don't know the shape of the work yet, we keep talking to the agent until we do, and then
we write it down.

My long prompts almost all end the same way, by keeping the agent away from code. One ends: "Let's not go straight into
implementation, but rather store in a github issue." Another, around 400 words about how every visual component
should take objects to render plus handlers, closes with: "Once you have decided with me how this should look and we
update the github issue, then we can start kicking off subagents."

Epics are the planning unit. Sub-issues are the dispatch unit. I cared about that enough to make it a repo rule: in
[PR #1922](https://github.com/autobutler-org/quark/pull/1922) an agent updated `AGENTS.md` to say that sub-issues are
the standard way to link issues to epics, not bare links in a description.

So by the time I type `Do <url>`, three things are already written down somewhere the agent will read them:

- the acceptance criteria, in the issue body
- the procedure, in a checked-in skill
- the conventions, in `AGENTS.md`

What's left over is a URL.

I'll be honest about how strict this is. Once Claude found and fixed a USB hub being listed as a storage drive,
right on `main`. The fix was fine. I still replied: "No so file a ticket first, then put this change on a branch and
push that up with a PR." The ticket became [#2114](https://github.com/autobutler-org/quark/issues/2114) and the fix
became [PR #2117](https://github.com/autobutler-org/quark/pull/2117). The issue is the record of why a change exists,
and I want that record even when the change came first.

## The loop is a file

The procedure an agent follows once it has an issue lives in `.claude/skills/resolve-issue/SKILL.md`, and it's checked
into the repo. It was nine steps when we started this series:

1. Read the issue and check whether a PR for it already exists.
2. Branch `fix/<N>-slug` or `feat/<N>-slug` off a fresh `main`.
3. Diagnose before editing. For a bug, write the failing test or scripted repro first and show it failing.
4. Find the siblings: grep for every other call site with the same defect and fix it in the shared place.
5. Make the minimal fix. "No new abstractions, dependencies, or forks without asking first."
6. Run `gmake check` and the relevant test targets.
7. Make one signed-off commit.
8. Open the PR with `gh pr create` and `Closes #N`.
9. "Report. List exactly what you ran and what it showed. Never claim a manual check you did not perform."

Two lines in it do most of the work. "Find the siblings" turns a one-line bug fix into a fix for the whole class of
bug. "Never claim a manual check you did not perform" is there because an agent has written a testing claim into a PR
body that it never checked, and I'd rather that be a written rule than something I rediscover in every PR.

Because the loop is a checked-in file, every session gets it, and when I learn something new the
file changes and every future session gets that too.

## Stacks are how I review

Most real work doesn't fit in one PR, so we use stacks. The word "stack" is the single most common workflow word in my
prompts, 70 uses.

This is the prompt that kicked off our backend cleanup epic on 2026-08-29: "Use Opus for sub-agents and orchestrate
their work... Do all of this in one massive Github stack, using the gh-stack extension of course... I want to be able
to test the full result of this work on a single branch and then merge it all together." That one prompt produced a
17-PR stack. I could check out the top of it, run the whole thing, and merge the layers in order.

This is also the part that still annoys me most. I have to tell the model to stack PRs. I wish it understood when I'd
want that by default, though that may be my fault for not writing it down sooner. On 2026-09-03 I typed, verbatim:
"Make it an actual stack with the gh stack extension dude."

So we wrote it down. During the research for this series, [PR #2275](https://github.com/autobutler-org/quark/pull/2275)
added a step to `resolve-issue`: "Decide: stack or one PR. Default to a stack." A follow-up,
[PR #2283](https://github.com/autobutler-org/quark/pull/2283), makes it explicit that `Closes #N` goes on every layer of
a stack.

The same bias toward "just make the thing" shows up in small moments. One night Claude was manually dispatching five CI
workflows so they would run before the PR existed. I typed: "Make the PR dude. Don't do these weird extra steps." It
answered "Fair.", killed its poller, and opened [PR #1607](https://github.com/autobutler-org/quark/pull/1607). The PR is
where CI runs, where the review happens, and where the issue gets closed.

<!-- TODO(James): the prompt log timestamps "Make the PR dude" at 2026-08-25 22:46 and the session digest at 08-26
05:46 (likely UTC). The draft says "one night" to avoid picking; pick one if you want a date. -->

## What isn't in my prompts

Across all 948 prompts, these words appear zero times: "TDD", "plan mode", "hook", "ultrathink", "sonnet", "haiku".

I never tried plan mode, ultracode, or workflows. That's never tried, not rejected. I don't type "TDD" because the
skill already says to write the failing test first, and honestly I care less about the order than about the change
having a test at some point. And Copilot survives only as autocomplete, for the rare edit
I make by hand in VS Code.

## Copy this

- The `resolve-issue` skill, adapted to your repo. If you take only two lines, take "find the siblings" and "Never
  claim a manual check you did not perform."
- Issue templates, so the acceptance criteria have somewhere to live. We have seven: `bug`, `chore`, `epic`,
  `feature`, `performance`, `question`, and `security`.
- A rule that a spike is never dispatched. Talk it down to known scope with the agent, then file it.
- Epics for planning, sub-issues for dispatch, and that rule written into `AGENTS.md`.
- `gh stack`, plus a local `.claude/skills/gh-stack/SKILL.md` with the non-interactive flags written down. Never run bare
  `gh stack view` from an agent: it opens a TUI under a PTY.

<!-- TODO(James): publish the per-hour prompt distribution (peak at 12:00, a real spike at 00:00, nights and midday
rather than 9 to 5), or leave it out? -->

## What's next

A one-line prompt only works if something checks what comes back. Next time: our main branch requires zero approvals
and eight passing checks, and our pre-commit hook runs every lint and no tests. That split is the whole design, and the
next post, "Zero approvals, eight checks," explains why.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace,
James <!-- TODO: byline/disclosure, this draft was written by Claude -->

---

This is part 2 of 9 in our series on how we build Quark with AI agents.

← Previous: [We stopped coding in March](/blogs/we-stopped-coding-in-march)

Next: [Zero approvals, eight checks](/blogs/zero-approvals-eight-checks) →

---
title: Three tabs, three clones, a pile of worktrees
description: What parallel agent work looks like on one laptop, how we keep agents from stepping on each other, and what the coordination costs.
date: 2026-11-11
author: James Orson
---

Hello friends! This is the sixth post in our series on how [Quark](https://quark.autobutler.org) gets built by AI
agents. Last time was the widget library. This time is how it looks from my desk working with agents.

Openclaw is what showed Brandon and I that running several agent sessions in parallel was worth it.
Today the parallel part lives on my laptop, in iTerm tabs with multiple Claude sessions and multiple local clones of the
repo. It is the result of a repeated screen layout, plus some git discipline.

## The desk

I generally have multiple terminal tabs, one per clone of the repo. Each tab has two vertical panes. The left one runs my
harness (Claude, or Grok when my weekly limit is up on Claude). The right one is split in half: the frontend runs in one
half and the backend in the other, for that checkout.

```text
   tabs:  quark [working]   quark-2 [waiting]   quark-3 [idle]
+-------------------- tab: quark-2 [waiting] --------------------+
|                               |                                |
|                               |    frontend (this checkout)    |
|         Agent harness         |                                |
|                               +--------------------------------+
|                               |                                |
|                               |     backend (this checkout)    |
|                               |                                |
+-------------------------------+--------------------------------+
```

So each tab houses a session and the terminals to run what that session changes. When an agent says a visual change is
done, the running app is right there next to it, and I can check it myself before I approve anything.

I use iTerm with the Claude Code plugin, which puts the session state in the tab title: working, waiting for input, or
idle. That tab bar is my whole notification system. I glance at it, find the tab that is waiting on me, answer, and move
on. You can get a similar setup with [`herdr`](https://github.com/herdrdev/herdr) and other similar tools.

## Clones for me, worktrees for agents

We use two kinds of copies of the repo, and they have different jobs.

Full clones are for me to run and check and manage things. Each one is a running app and a place to look at the product.
That is what makes my merge rule workable: green checks, plus a hands-on look at anything visual.

[Worktrees](https://github.blog/ai-and-ml/github-copilot/what-are-git-worktrees-and-why-should-i-use-them/) are for parallel
agent edits, especially when I need to spawn off one-off edits or edit submodules. When a session fans out subagents that
commit, each one gets its own worktree under `.claude/worktrees/`, so no two agents share a worktree.

We learned the need for this the hard way. In one session, Claude ran two forks against the same working tree at once.
Here is it's own write-up afterward:

> I ran the docs rewrite and the PR 2 build concurrently against the same working tree, and they collided. The PR 2
> agent restored its stashed work over the top of my PR 1 edits.

Work was lost without any error. After that, every fork brief in that session carried the line "You are the only agent
running. Nothing else will touch this tree." The later sessions used worktrees instead of promises.

## Three to five streams

My personal limit is usually three to five parallel streams, and the reason is that our issues are defined very small. An
issue that needs me every two minutes eats a stream. An issue that was fully scoped before anyone dispatched it runs on
its own until it needs a decision, a human check, or a merge.

The clones were born on 2026-08-27. At 15:44 I typed `Do issues/1623` into `quark`, which was already mid-task. At 15:48
I typed `Do issues/1625` into a new clone, `quark-2`, and at 15:53 `Do issues/1629` into `quark-3`. Three issues, three
checkouts, nine minutes.

Here is one real hour, 2026-09-11 from midnight to 01:01: 27 prompts across all three checkouts. `q` is `quark`, `q2`
and `q3` are the other two, and issue and PR links are shortened to numbers.

```text
00:00 q3  Make the PR when it is done
00:12 q2  Fix issues/1573
00:16 q2  yes
00:22 q3  Rebase
00:25 q3  Point out this is noticeably faster
00:28 q2  Do 1829
00:28 q3  Do 1568
00:29 q   I think 1043 is fixed
00:30 q   Close it as a won't fix
00:30 q   I believe we thought about this before: 1014
00:33 q3  Make the PR
00:36 q3  Thoughts on 1014?
00:36 q   Make sure this is a gh-stack when done
00:36 q   Make sure to rebase off of main btw. A lot has merged.
00:37 q2  /insights
00:39 q3  ...could we potentially just do the rotation at the point of download?
00:41 q3  let's mark on the issue that we just set the orientation bytes
00:43 q3  Consider your insights feedback here: (report path)
00:44 q   Can we have this PR in the quark dir?
00:47 q2  Fix merge conflict: pull/1847
00:47 q3  Make a PR for this
00:47 q   Rebase the whole stack on main please
00:51 q   (a note on the trash view UX)
00:52 q2  I thought we had libheic for that reason though?
00:53 q3  ...most of these sub-issues are not refactoring fixes really?
00:54 q3  yes, detach them and close the epic
00:55 q2  Make an issue for it
01:00 q2  /resolve-issue issues/1355
01:01 q2  Oh I see, thank you.
```

Most of those are a few words. Three agents are running, and I go round-robin between the tabs. None of those prompts
explains a feature, [because the issues already do that](/blogs/the-issue-is-the-prompt).

## Inside a tab: subagents

Each of those sessions can fan out on its own. Across 105 main sessions from late August to September 21, Claude
launched 264 subagents. It is very bursty: 45 sessions launched none, and the top five launched 45, 26, 12, 11, and 10.
76 of them (28%) went out in groups started in the same minute.

The model choice follows blast radius. I use Fable when doing something that will branch into multiple PRs, a large
stack or a repo-wide change, and Opus for its subagents and daily work. Our 17-branch cleanup epic ran exactly that way:
a Fable coordinator with Opus subagents.

## Two agents, one contract

The best trick in the corpus is a frozen contract. For the video transcode work in
[issue #1122](https://github.com/autobutler-org/quark/issues/1122), the coordinator wrote the API as literal JSON:
endpoints, status codes, and notes like "the server bus drops events when a buffer is full, so treat `GET /videos/jobs`
as the source of truth" and "`job.error` is a server diagnostic. Never render it." It gave the same text to a Go agent
and a Flutter agent working at the same time, each with a list of paths it owned. The Flutter agent was told plainly:
"the endpoints do not exist on your branch yet and that is fine, code and test against the contract."

However, contracts change `¯\_(ツ)_/¯`. Whenever I changed that job's contracts, the change went out to three
live agents. An example of one of those message was "THIRD CONTRACT CHANGE from the maintainer."

## The coordination bill

Most write-ups about parallel agents stop before this part. Parallel work can have a real cost though, and most of it is
`git`, especially if you have a lot of parallel work running on related code.

I merge single non-stacked PRs constantly, and every merge moves `main` under every open stack. In one multi-user epic session
I typed "Rebase the stacks. I merged some code to main." and then, twelve minutes later, "Rebase stacks again. Another thing
merged." That session spent a lot of effort on rebase cascades.

On 2026-09-21 I asked a session to rebase every non-draft PR off `main` using Opus subagents. The coordinator first
sorted all 45 PRs with `git merge-tree` into clean ones, conflicting ones, and stacked chains. It then gave each of five
agents a worktree and a set of stacks, with the rule "never create or check out local branches, work on a detached
HEAD." 43 of 45 rebased and were force-pushed with `--force-with-lease`.

And the worktrees will pile up. One cleanup session on 2026-09-19 found about 10 stale agent worktrees and 17 `worktree-agent-*`
branches. It then matched 228 `[gone]` local branches against merged PRs and deleted only the 204 that matched, keeping
24 whose PRs had been closed without merging. I had offered my own `clean-house` git alias for the job, which deletes all
local branches that do not exist on the remote. Claude pointed out it would have deleted all 228.

## Copy this

- One terminal tab per clone. Each tab holds the agent session plus the running frontend and backend, so the product is
  one glance away from the agent that changed it.
- Track session state automatically. The iTerm Claude Code plugin and [`herdr`](https://github.com/herdrdev/herdr) both
  do this.
- Clones are for humans to run and look at. Worktrees are for agents to edit in. Never let two agents share a worktree.
- Steer a running agent with a message instead of launching a second one to fight it over the same branches.

## What's next

Three agents at once means three agents that can be wrong at once. The next post is about exactly that.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace,
James

---

This is part 6 of 8 in our series on how we build Quark with AI agents.

← Previous: [A widget library as a DSL](/blogs/widget-library-dsl)

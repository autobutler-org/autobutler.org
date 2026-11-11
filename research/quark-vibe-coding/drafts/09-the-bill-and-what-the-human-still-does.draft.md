---
title: The bill, and what the human still does
description: What building Quark with AI agents costs in money and hours, and the decisions that still need a person.
date: 2026-11-19
author: James Orson
---

<!--
Other title options from the outline:
- $6.77 per merged PR
- Seventeen hours a week
-->

Hello friends! This is the last post in our series about how we build [Quark](https://quark.autobutler.org) with AI
agents. We promised at the start that we'd publish the money and the hours, so here they are, along with the list of
things I still do myself.

## The real bill

I use Claude Max, and then probably another $100 a month in extra usage. That's the receipt for the Claude side of
Quark.

<!-- TODO(James): Max 5x or Max 20x? And is the ~$100 extra usage API credit or plan overage? State the monthly
total in dollars once confirmed. -->

It isn't the whole AI bill. Brandon's Grok review council and Exo, our bot that still runs on Openclaw, cost money
too, and neither leaves any record on my workstation.

<!-- TODO(James): Grok bot costs per month. -->
<!-- TODO(James): Openclaw/Exo hosting and model costs per month. -->

Everything else in this post is Claude only, so it understates our total AI spend by an amount we haven't measured
yet.

## What the same tokens would cost at list price

A subscription tells you what you paid, not how much work you bought. To size the work, we priced every token from our
Claude Code session logs at Anthropic's published API list prices. That's a counterfactual: nobody sent us an invoice
for this number.

The window is 28 days, 2026-08-25 to 2026-09-21. That's not a choice. Claude Code prunes old transcripts, and nothing
earlier survives, so our lifetime cost is larger than anything here and we can't recover it.

| Measure | Value |
| --- | ---: |
| API-equivalent cost, 28 days | $1,990.30 |
| Tokens | 2.79 billion |
| Merged PRs in the window | 294 |
| Commits on `main` in the window | 306 |
| Cost per merged PR | $6.77 |
| Cost per commit | $6.50 |
| Cost per release | $76.55 |
| Cost per net test function | $1.27 |
| Cost per 1,000 lines added | $11.97 |

A few things about how the $1,990.30 was counted, because the method matters more than the total:

- Claude Code writes one log line per content block, and every line from the same turn carries the same whole-turn
  usage. 23,609 of 42,474 candidate lines were those duplicates. We kept one line per message id. Counting every line
  would have inflated the total about 2.2x.
- Cache reads are 97.5% of the tokens and 68% of the cost. That's what long agent sessions look like: every turn
  re-sends the growing conversation, and cache reads are billed at a tenth of the input price.
- Opus is 95.7% of the bill. Subagents are 54.7% of the spend and 63% of the messages.
- $6.77 is a mean over very different PRs. A one-line fix and a multi-day feature each count as one.

## The hours

Nothing clocked this work, so we estimated it from the prompt log. Every gap between typed prompts shorter than 30
minutes counts as working time, plus a 10-minute tail each time I walked away. That undercounts time spent watching a
long run without typing, and it overcounts a prompt I fired off during a meeting. Treat it as plus or minus 25%, and as
engaged time, not calendar time.

By that measure I put in 70.6 hours over 20 active days in the 28-day window. That's about 17.7 hours a week, 47.9
prompts per active day, and 14.4 minutes of my time per merged PR.

My hours went down, but they didn't go to zero. That's still a part-time job, and most of it is conversation,
dispatch, and checking things by hand.

## Output peaked after spending did

This was the finding that surprised me. Split the window into four weeks:

| Week | API-equivalent cost | My hours | Commits | Cost per commit |
| --- | ---: | ---: | ---: | ---: |
| Aug 25 to Aug 31 | $629.63 | 25.2 | 66 | $9.54 |
| Sep 1 to Sep 7 | $275.68 | 8.9 | 35 | $7.88 |
| Sep 8 to Sep 14 | $544.15 | 15.8 | 57 | $9.55 |
| Sep 15 to Sep 21 | $540.84 | 20.8 | 148 | $3.65 |

Cost and my hours both peaked in the first week. Output peaked in the last. Nearly half of the window's commits landed
in the final seven days, on spend 14% below the first week's, and cost per commit dropped 62%. Deletions tell the same
story: about 22,000 lines removed in the first week against about 5,700 in the last. The early weeks were partly
rework, and the later weeks were mostly building on top.

I can't tell you which single thing caused it. The rules in `AGENTS.md` kept growing, the widget library landed, and
the subagent briefs got tighter. Four weeks is also a small sample. What I can say is that the most
expensive week was not the most productive one.

## What I still do

The agents type. The gates check. Here's what's left for people.

**Decide what gets built, and what doesn't.** On one stack of six performance PRs, the branch felt slower to me than
main. Claude closed all six
([#1784](https://github.com/autobutler-org/quark/pull/1784),
[#1792](https://github.com/autobutler-org/quark/pull/1792) through
[#1796](https://github.com/autobutler-org/quark/pull/1796)) with a comment saying they weren't abandoned, just
"reopening once there are numbers to point at."

**Supply facts the agent can't have.** Drag-and-drop from Google Drive was broken, and the leading theory depended on a
Chrome-only browser feature. I said, "I know that firefox is able to do this too with Drive btw." That one sentence
killed the theory and pointed Claude at the real fix.

**Set policy that overrides the agent's conclusion.** Claude once came back with a 12-item list of
features to delete because they looked unused. I
told it: "With any feature you are removing, be sure to check if there are migrations and good github issue reasonings
behind it, and they are just missing a UI." That turned the list into 5 issues for missing UI, 4 deletions, and 3 open
questions. It also caught a real bug: one of the deletions would have left a database table that still got written to
but never read.

**Be the integration test.** For changes to our multi-user access model, Claude writes a manual test plan per stack,
with exact curl calls and the status codes to expect, and I run it on real hardware. At the time, we couldn't exercise
that code without a second account, and making one meant a raw SQLite `INSERT`.

**Press merge.** I merged 943 of the 1,049 PRs that have been merged. Branch protection requires zero approvals and
eight passing checks, so merge is the moment a person says yes.

**Keep infrastructure on a shorter leash.** In our infrastructure repo, Claude runs read-only cloud commands and
`terraform plan` against real state. Applying is not its job. My instruction was "Let's only apply from CI." Deletion
is fenced in the config itself with `prevent_destroy` and a resource lock, plus a direct order to leave alone a server
that runs a live network. Claude still made mistakes there. The best lesson from one of them was its own: it had checked
that a VM size was *available* in our region but never checked our **quota** for it. Those are independent, and a size
can be perfectly available with a limit of zero.

## The five things that still open a diff

I test visual changes by hand before I approve them. Otherwise I generally don't read the code anymore. There's a
short list of exceptions, and for these I read the diff:

- auth changes
- the password vault
- migrations that run on customers' devices
- anything that touches data deletion
- any non-trivial visual change

Everything else merges on green checks. That list is our trust model. We trust what the gates check, and every miss
we wrote about in the last post was something no gate was looking at. These five are where a miss would cost a
customer their data or their account, so a person looks.

## Where the judgment comes from

If I don't read most diffs, how do I know what's going on? My knowledge comes from understanding the architecture and
having good developer sense.

That's the honest limit of everything in this series. Vibe coding still requires you to know how computers and software
work, and to apply that sense dictatorially. You can't succeed the way we have without a good base of knowledge.

Being dictatorial doesn't mean never changing my mind. I want evidence. A good leader listens to the people he's over,
and when they bring evidence, he re-orients. The agents that changed my mind over these months brought a failing test
or a benchmark, not a longer argument.

## Copy this

- Measure your own cost per merged PR before you argue about model pricing. Dedupe your transcript lines by message
  id, price them by model and token class, and divide by merged PRs in the same window. Publish the window and say
  whether it's list price or what you paid.
- Estimate your hours from prompt gaps and put an error bar on it. Ours is plus or minus 25%.
- Write down the change types that still get a human read. The list is your trust model.
- Give the agent read-only cloud commands and `plan`. Keep `apply` in CI.
- Ask the agent for a manual test plan per stack, with exact commands and expected results, and run it on real
  hardware.

## That's the series

Over nine posts we've tried to show all of it: the issue that is the prompt, the gates, the rules we wrote after
something went wrong, the widget library, the parallel sessions, the times the agent was wrong, the bugs that shipped
anyway, and now the bill. None of it is magic. It's a small vocabulary for the agents, a lot of automated checks, and
two people who still decide what gets built and press merge. If you try any of it, we'd love to hear what worked and
what didn't.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace,
James <!-- TODO: byline/disclosure, this draft was written by Claude -->

---

This is part 9 of 9 in our series on how we build Quark with AI agents.

← Previous: [What slipped through](/blogs/what-slipped-through)

---
title: We stopped coding in March
description: Quark is built almost entirely by AI agents, and this is the first post in a series on how that works and where it breaks.
date: 2026-09-26
author: James Orson
---

Hello friends! This is our first post in a series about how we build [Quark](https://quark.autobutler.org), and the
short version is that we mostly don't. AI agents do!

I know how that may sound to most engineers and even the general public these days. I have found that, writ large, engineers
generally believe "vibe coding" is a con game ran by the various AI companies and hyperscalars, and if not a straight up
con they see it as having removed something fundamental from their craft, from [the art of computer programming](https://www-cs-faculty.stanford.edu/~knuth/taocp.html).

I want to assure all the skeptics out there that Quark is not just a product, but a real and well-designed work of engineering.
Quark is not just an amalgamation of this week's latest Javascript framework or toy language, but something thoughtfully
designed and built:

Let me give you a quick overview of the tech stack, as of the time of writing this article, before we get into the nitty
gritty of how we got to the point of no longer coding by hand:

- our backend is written in Go
- our frontend is in Flutter (after several…several total rewrites), generating web, Android, and iOS builds
- 1,209 atomic commits across 1,291 closed pull requests
- 108 releases

Every number in this series comes from our git history, our GitHub data, or our own session logs, and the repo
is [public](https://github.com/autobutler-org/quark) if you wish to continue tracking our progress, or, better yet, [contribute](https://github.com/autobutler-org/quark/blob/main/CONTRIBUTING.md)!

So, with that, when did we stop coding by hand?

## The date

It was sometime in March 2026. See, Brandon had decided to figure out what was going on with Openclaw and set it up on one
of his loose Raspberry Pis. I was busy optimizing the worker queues in the backend rather than toying with AI tooling. He
started bothering me relentlessly with how awesome the Openclaw bot was. I sort of brushed him off for about a month straight,
then eventually gave in. I installed Openclaw on one of my loose Raspberry Pis, hooked it up to Discord and Github, and
within an hour I realized how big this was. My wife could tell you, I immediately became addicted to my phone. I was able
to code from anywhere: in the car, in a work meeting, while meeting with church friends.

I could not stop. It had rewired my brain.

March 17th was the day it began.

If you take a look at our repo's commit history, you can see how it fundamentally changed our velocity, from [February](https://github.com/autobutler-org/quark/commits/main/?since=2026-02-01&until=2026-02-28)
to [March](https://github.com/autobutler-org/quark/commits/main/?since=2026-03-01&until=2026-03-31).

Something was digging in the back of my head though. I was getting a lot done and reading lots of code, but it bothered
me I wasn't the one controlling it. It was just a feeling that something had been taken from me. Everyone who has known
me for long enough knew me as an obsessive programmer. I would make [new programming languages](https://github.com/exokomodo/daybreak),
learn a new language by implementing a game engine by hand ([Nim](https://github.com/exokomodo/komodo-nim), [F#](https://github.com/exokomodo/openwomb),
[Scala](https://github.com/exokomodo/komodo-gdx)), a [custom backend website renderer](https://github.com/jamesaorson/ursinia)
written in Scheme, and many other things not necessary to mention here.

I adore programming. It felt like exactly what God had made me for and it had enabled me to support my growing family.

However, it was exactly my discipline in adapting myself by pushing myself with programming challenges and knowledge that
prepared me for what was to come.

## Why it wasn't a leap of faith

The [language I mentioned above](https://github.com/exokomodo/daybreak) was the first time I used AI to write any code.
I know the exact file I was working on. I remember what I had it do. That moment is forever a core memory for me, as it
was that day that I realized what was to come.

It was early May 2022 and I had gotten into the Github Copilot closed beta. I used AI to help me generate
[the AST validation](https://github.com/exokomodo/daybreak/blob/770a84098233827f028fd2e4a11882e478032d71/src/include/parser/ast.h)
function by function. I wrote the types and the first example of a node's implementation. Within an hour, I realized that
if I gave AI a pattern to repeat and reference, and some kind of "marker", I could get it to do exactly what I wanted it
to.

If I gave AI something like this as a marker:

```c
/**********************/
/* CallExpressionNode */
/**********************/
```

It would successfully build the function bodies associated with that type, as I had provided a single implementation as
an example earlier in the file.

Yeah, AI was basically acting like a glorified [code snippet](https://code.visualstudio.com/docs/editing/userdefinedsnippets).
However, I knew this meant the countdown had begun. When I installed Openclaw, the timer had rung and declared loudly that
my time was up.

## How I was prepared to trust AI's output

Still at this point in March, you will find most people declaring that AI writes terrible, or straight-up incorrect code
the majority of the time. This was not my experience, so am I blind or was I doing something different?

Well, you see, I had a bit of an obsessive habit: static analysis.

I never trusted myself to write the correct code first, so I don't consider something correct until I have test cases to
encode my expectations.

I never could be bothered to write well-formatted code, but I also
basically refused to read ugly code as well, so I never wrote code without auto-formatters and linters.

So, when I would make any new software project, I would start first with the CI/CD. I would write a single harness for
local development and CI both (which these days I have settled on `Makefile` for this task). Running locally required the
same commands as running in CI, and code could not merge without passing the entire suite.

So when AI came into my projects, it came into an environment with these guardrails. It could not declare something complete
until the open PR was green to merge, passing every check built into it. I would review the code, and if AI did something
I didn't like, that was banned via a test or a linting rule or some other mechanism, which is the same thing I did to myself
and human colleagues. Our mistakes are perma-banned as soon as we recognize them.

When the AI comes to work on a task as well, it must be paired with a Github issue. This is the same standard I have held
myself to for a long time. I prepare my design in an issue, writing out my description of what is to be done and the acceptance
criteria that would declare it complete. When AI came in, that expectation remained and remains to this day.

I never trusted myself or others implicitly to program well, and so I engineered around my own self-distrust. The AI is
to be treated no differently.

To be honest, I was going full startup mode with Quark and had not written a single test before the AI came along. I had
been relying on manual user testing and linters, while I settled on the structural design we would stick with. I did not
want to waste time encoding expectations into tests for something I knew was in rapid flux. It was around the same time
though that AI came into our project that I had felt our backend design was something close to our final architecture. Bringing
in an AI would be like bringing on multiple developers to the project, and I needed to guard the repo. So one of the first
things the AI did was get us as near to 100% test coverage as was reasonable.

With the now comprehensive backend test suite, we could figure out what the app should actually look like. This is the interesting
part of our journey, and the one where I maintained a stable frustration with the AI agents for a while. I will be discussing
how we resolved the frustrations with our frontend code in a later blog post, but the key phrase to simmer on for now is
Domain-Specific Language (DSL).

## Quark's Crafting Eras

Four distinct eras exist for how Quark was constructed.

**Hand-built, February 2025 to September 2025.** Humans wrote everything, mostly Brandon and myself. The Go backend landed
in [PR #116](https://github.com/autobutler-org/quark/pull/116) in June 2025. On 2025-09-30 the repo had 163 Go source files
and zero test files, as mentioned earlier.

**Copilot-assisted, October to December 2025.** We added a `.github/copilot-instructions.md` in
[PR #281](https://github.com/autobutler-org/quark/pull/281). It was 49 lines, all about where CSS is allowed to live (the]
frontend frustrations start to bare their teeth right here).
That file is the literal ancestor of our current `AGENTS.md`, as `git` records a rename in March 2026. We also tried Copilot's
coding agent in Github's UI. It opened 5 PRs, and we closed all 5 without merging. Still to this day, I believe this is
most developer's experience with Github's agent.

**Openclaw bots, March 2026 to August 2026.** This is where we stopped typing code and started typing issues and prompts.
Exo (my Openclaw bot) opened 316 PRs, 238 were merged, and 75 were discarded, which is a 76% success rate. For comparison,
I discard about 2% of my own PRs. Exo also wrote 158 of the repo's 388 PR reviews.

**Local Claude Code, from late August 2026.** Claude Code sessions at my workstation, several at once, in separate
checkouts of the repo. This is how 100% of my own code is written today. Brandon has started to experiment with Grok bots
making his code reviews. Their output is of good quality, but they are much more expensive compared to the same operations
done by Claude.

## How is the work split up now?

Here is the current org chart, humans included:

- **Claude Code** is the implementation engineer. It picks up an issue, writes the change and its tests, runs the
  checks, and opens a PR.
- **Exo** still runs on Openclaw, doing high-level project management and issue crafting with me. When I want work done
  and I'm away from my desk, I will still send Exo off to do it and write PRs.
- **A council of Grok bots** is run by Brandon. Grok recently added "always-on" bots that talk to each other
  as a team, so Brandon set some up as a standing review council: one does QA, one UX, one security. They scan the
  codebase daily and file tickets and small PRs for the obvious stuff.
- **Brandon** is effectively product management and QA. He files what he finds.
- **I** dispatch the majority of the work, veto bad decisions by the bots, verify changes, and press merge.

The expensive part of my day is conversation. Brandon and I talk through the work with an agent, split it up, and only
file tickets once the whole scope is considered. By the time an issue exists, it's generally small enough that I just say
"Do [github link to the issue]".

## What we actually trust

This is the part skeptics should read closely.

Our main branch requires **zero approving reviews and eight passing status checks**: `ci-android`, `ci-backend`,
`ci-ios`, `ci-web`, `check-backend`, `check-frontend`, `check-misc`, and `check-migrations`. History is linear and every
merge is a squash. Only 231 of 1,328 PRs (17%) ever got a review of any kind, and I merged 1,063 of the 1,169 that have
merged.

When a change is visual, I run it and look at it before approving. Otherwise I often take no more than a cursory glance
at the code being written.

So the claim is this: we trust what the gates check. The gates check a lot. Things have still slipped through, and
every one of them was something no gate was looking at. Take SMB file sharing: it worked when it merged (I did a
file transfer test from a Mac myself), and a later change broke it because we never had a test for it. Any testing hole
is still likely to fail, but this is just like before we had coding agents, when humans made every change. The agents didn't
invent that failure mode. There's a whole post coming on what slipped through.

## The scoreboard

Remember the zero test files? On 2025-09-30 we had 0 tests. On 2026-09-21 we had 1,312 Go test functions across 189
files and 1,359 Dart tests across 203 files, 2,671 in total.

A really nice metric falls out of analysis of our codebase: over time, the share of commits that also touch a test file.

- November 2025: 0%
- March 2026, bots on: 27%
- July 2026: 47%
- August 2026: 83%
- September 2026: 95%

I don't claim classical TDD is followed, where the test must come first. Our repo is squash-only and our agents often send
only one commit when opening a PR, so git can't tell you whether the test came before the code, and honestly I care less
about the order than about the change having a test at some point. What we can show is that 95% of September's code changes
shipped with one.

The pace is real too. We merged 111 PRs in one week in September, against 50 in the busiest week of the Openclaw era.
There were 171 commits under my name in September, and as far as we can tell nearly all of them came out of Claude
sessions.

If you want one picture of how this works, here it is. On 2026-08-27 I dispatched three issues into three checkouts in
nine minutes: `Do issues/1623` at 15:44 in `quark`, `Do issues/1625` at 15:48 in `quark-2`, and `Do issues/1629` at
15:53 in `quark-3`. Those were the whole prompts. The issues
([#1623](https://github.com/autobutler-org/quark/issues/1623),
[#1625](https://github.com/autobutler-org/quark/issues/1625),
[#1629](https://github.com/autobutler-org/quark/issues/1629)) carried everything else.

## Copy this

Every post in this series will leave you something to take and implement yourself. For this one:

- Set required approvals to 0 and make the required checks the list you actually believe in. Write your trust model
  into branch protection instead of a culture doc.
- One rules file for every tool to read. Put your rules in `AGENTS.md` and make `CLAUDE.md` a single line that loads `AGENTS.md`
  ([PR #1783](https://github.com/autobutler-org/quark/pull/1783)).
- Check in `.claude/agents/` and `.claude/skills/` and ignore the rest of `.claude/`. Our `.gitignore` has `.claude/*`
  followed by `!.claude/agents/` and `!.claude/skills/`
  ([PR #1785](https://github.com/autobutler-org/quark/pull/1785)).

## What's next

The rest of the series will get specific. We'll start with why a written issue is the real prompt, then the gates themselves
and why our pre-commit hook runs every lint and no tests. After that come the rules we wrote down after each thing went
wrong, the widget library that finally fixed the frontend, and what three parallel sessions looks like on one laptop.

Then the uncomfortable ones: when the agent is wrong, what slipped through anyway, and what all of this costs in money
and hours.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace to you,
James

<!-- --- -->

<!-- This is part 1 of 9 in our series on how we build Quark with AI agents. -->

<!-- Next: [The issue is the prompt](/blogs/the-issue-is-the-prompt) → -->

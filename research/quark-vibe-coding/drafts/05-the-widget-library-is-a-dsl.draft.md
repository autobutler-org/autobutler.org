---
title: The widget library is a DSL
description: Our agents kept shipping ugly, broken Flutter screens until we shrank the vocabulary they write in to a small, tested set of widgets.
date: 2026-10-22
author: James Orson
---

<!--
Other title options from the outline:
- It passed the analyzer and looked terrible
- Shrink the vocabulary until the gates can cover it
-->

Hello friends! This is the fifth post in our series on how [Quark](https://quark.autobutler.org) gets built by AI
agents. In the first post I said the frontend was the exception, and that the agents screwed up frontend changes often
until we built a widget library. This is that post.

If you think the problem with coding agents is model quality, this is the one I most want you to read. The model
didn't change. The language it was writing in did.

## Wrong and bad

The backend responded to rules and static analysis. Tell an agent that SQL only goes through sqlc,
that file access only goes through our vfs layer, that handlers only extract, call, and respond, then back those rules
with linters and a structure script, and the agent mostly stays inside the lines.

The frontend didn't work that way. Here is what "wrong and bad" looked like in our Flutter client:

- inconsistent and broken layouts
- screens with inconsistent styling
- many overflow bugs
- code that passed `flutter analyze` but looked bad
- small style changes to a component meant scanning and editing the whole codebase, and those edits often missed
  instances of the same error

That fourth item is the whole problem. An analyzer can tell you a variable is unused. It can't tell you a screen is
ugly, or that a row overflows on a narrow phone. The agent would produce code that was valid, formatted, lint-clean,
and wrong, and every gate we had would wave it through.

## We had tests, just not the right ones

When I first described this, I said we had basically no frontend tests before the widget library. That isn't quite
right, and our research caught me on it. On 2026-08-31, a few days before the widget rules landed, the repo had 651
Dart tests.

Those tests only covered logic. Nothing about layout or user flows. So the accurate version is: hundreds of frontend
logic tests and zero tests of what the screen looks like or how you move through it. That's exactly why they did
nothing for the visual problems. The tests were green and the overflow bugs shipped anyway, because nothing was
looking.

This fits a pattern we seem to follow on purpose:

> A pattern we seem to do is the first really early versions of our apps go out untested, then we encode
> expectations later in tests when we hit maturity, and then we enforce testing. That way we avoid early churn of API
> changes, until we settle on a design that made sense.

The frontend had just been through a rewrite into Flutter, so it was still in the fast, untested stage. The backend
went through the same arc: no tests at all for its first nineteen months, first Go tests in December 2025, and 95% of
code commits shipping with a test by September 2026. The widget library is where the frontend moved into stage two.

## What the library changed

We pulled the shared widgets out of the app and into their own package, `quark_widgets`. After that, agents mostly
stopped writing Flutter and started writing Quark: compose a page out of a small set of tested, catalogued widgets.

Here's what that bought us:

- The agent has a small vocabulary to work from, plus standardized layout examples.
- Every widget in the package is individually tested.
- A screen's code gets short enough that I can read it, and short enough that the agent can read it without burning
  loads of context.
- Page-level context shrinks because the details live inside the components.
- A style change across the whole app is one widget update, so the app stays consistent.
- A browsable catalog makes the widgets discoverable by humans and agents alike.
- Unused designs become obvious, because they all come from one place.

It worked like a DSL, very effectively. The introduction of the widget library was a hard stop to frontend changes
being wrong and bad.

<!-- TODO(James): a short before/after Dart snippet would land this section. The research has real names
(`FileBreadcrumbBar`, `FileSelectionBar`, `QuarkTokens`, `QuarkIcons`, `RefreshIconButton`) but no actual page code,
so please paste a trimmed raw-Material page next to its composed `quark_widgets` version, e.g. from PR #1843. -->

## The rules that make it a language

A vocabulary alone isn't a language. You also need grammar, and ours lives in `AGENTS.md`:

- One widget class per file.
- No private widgets, even if a widget is only used once.
- No `Widget _build*()` helper methods.
- Package widgets are data in, callbacks out.
- Domain state lives in `ChangeNotifier` controllers under `lib/controllers/`, and only controllers call services.
- Colors come from `QuarkTokens` through the theme. Icons come from `QuarkIcons`, never `Icons`.
- Pages are compositions: no sizing math and no breakpoints in a page.
- Every package widget is tested at narrow and wide viewports, and gets a gallery registry entry with a regenerated
  `docs.g.dart`.

The no-private-widgets rule came from me mid-migration. I find very little need for private widgets. They make files
way too long, and I'd rather have every widget in its own file. That one sentence landed in `AGENTS.md`, all three
agent definitions, the package's decouple skill, and the package README in one PR,
[#1743](https://github.com/autobutler-org/quark/pull/1743). Six different agents read six different subsets of those
files, so a rule has to go everywhere at once.

The rules and the agent definitions landed on 2026-09-04 in
[PR #1733](https://github.com/autobutler-org/quark/pull/1733).

## The numbers

The package extraction for [issue #1600](https://github.com/autobutler-org/quark/issues/1600) shipped as a six-PR
stack on 2026-09-04. Across that stack:

- package tests went from 2 to 178
- widget and theme coverage went from 32.1% to 59.7%, while app-wide coverage moved from 24.4% to 26.4%
- the move removed roughly 2,000 lines from `lib/`

The first narrow-viewport tests for the new widgets immediately caught four real overflow bugs, in `FileActionsBar`,
`FileSelectionBar`, `FileBreadcrumbBar`, and `PhotoSelectionBar`. None of them had a narrow test before
([#1737](https://github.com/autobutler-org/quark/pull/1737)). That's the overflow category from my list, found by a
gate for the first time.

Later, decoupling the photos page into a controller plus `quark_widgets` took it from 1,054 lines to 544
([PR #1843](https://github.com/autobutler-org/quark/pull/1843)). I added "noticeably faster" to that PR description
myself.

## One massive PR, on purpose

Everywhere else in this series you'll see us push for small, stacked PRs. The migration was the exception. We moved
all of the existing pages in one massive PR, including all the tests.

<!-- TODO(James): which PR carried the all-pages migration? Largest widget PRs by files changed: #1743 "require one
widget class per file and forbid private widgets" (159 files, +10,801/-8,311, merged 2026-09-05) and #1737 "move
presentation widgets into quark_widgets" (92 files, +4,303/-1,814, 2026-09-04). #1744 is only the photos page
(31 files). -->

Then I went through the whole app as a human and tested everything by hand. That's still my rule today: if a change is
visual, I run it and look before approving. Otherwise I generally don't read the code anymore.

## Agents reviewing agents

We wrote two agent definitions for this, not one: `.claude/agents/widget-engineer.md` writes widgets, and
`.claude/agents/widget-reviewer.md` checks them. The engineer applies the reviewer's checklist to its own work before it
opens a PR.

The reviewer earns its keep. In one session it flagged a test where a drawer tap at 360×640 landed "roughly 3px" inside
the screen, and noted that "one more row will break it."

It also missed something a person did catch. After the widget move passed the reviewer's checklist, I asked: "So I am
asking because I want the quark_widgets package to be used by the main application. Are we using it AT ALL?" It turned
out `LiveBadge` had been copied into the package, but neither original was deleted and no call site was switched. And
`FileActionsBar` was dead code that got moved anyway. We fixed the code, and then we fixed the reviewer: after a widget
is moved, grep the app for its class name. Zero callers is a finding, never a pass.

One more, because it shows the library's failure mode. A commit "fixed" the breadcrumb home glyph in the package's
`FileBreadcrumbBar`, but the Files page doesn't use that widget. I told it: "The home is clearly still tappable when I
am at the root, and provides a cursor: pointer to me on web." The fix went into the widget the page actually renders,
with a regression test. A library only helps if the pages use it, which is why the zero-callers rule matters.

## The boundary is still prose

Here's what stops an agent from reaching past the library and writing raw Material widgets into a page: `AGENTS.md`
wording plus the widget-reviewer agent. That's it. There's no lint yet.

In the last post I said my threshold for turning a rule into a check: once I see a rule get ignored, it becomes a check
as quickly as I can reason my way to a static solution. So here's the public commitment. The first time an agent
writes a raw Material widget into a page, that boundary becomes a lint. You can hold us to it.

<!-- TODO(James): confirm the raw-Material lint still doesn't exist at publication. If it does, swap this section for
the story of the violation that triggered it. -->

## Copy this

- Put your design system in its own package, with one widget per file, no private widgets, and data in and callbacks
  out.
- Give it a browsable gallery with a generated registry, so both humans and agents can discover what exists.
- Test every component at a narrow and a wide viewport. Our first batch of narrow tests found four overflow bugs.
- Write two agent definitions, an engineer and a reviewer, and have the engineer run the reviewer's checklist on its
  own work before it opens a PR.
- Ship package-level skills inside the package. Ours live in `packages/quark_widgets/skills/` and `make setup/skills`
  installs them into `.claude/skills/`, so the instructions travel with the code.
- After any move, grep for callers. Zero callers is a finding.

## What's next

The next post, "Three tabs,
three clones, a pile of worktrees", is about what parallel agent work looks like on one laptop, and what it costs.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace,
James <!-- TODO: byline/disclosure, this draft was written by Claude -->

---

This is part 5 of 9 in our series on how we build Quark with AI agents.

← Previous: [Every rule is a scar](/blogs/every-rule-is-a-scar)

Next: [Three tabs, three clones, a pile of worktrees](/blogs/three-tabs-three-clones) →

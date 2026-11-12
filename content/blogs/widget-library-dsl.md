---
title: A widget library as a DSL
description: Our agents kept shipping ugly, with broken Flutter screens, until we shrank the vocabulary they write into a tested set of widgets.
date: 2026-11-10
author: James Orson
---

Hello friends! This is the fourth post in our series on how [Quark](https://quark.autobutler.org) gets built by AI
agents. In the first post I said the frontend was the exception, and that the agents screwed up frontend changes often
until we built a widget library. So now you will learn what I meant with regards to the library.

If you don't like vibe coded UIs (myself included), this is the post I most want you to read.

## Wrong and bad

The backend responded well to automated rules and static analysis.

- Tell an agent that SQL only goes through sqlc
- Tell an agent that file access only goes through our vfs layer
- Back those prose rules with linters and a script that asserts project structure

Sadly, the frontend does not work that way, as it matters how it looks to a human.

Some things that were "wrong and bad" in our initial Flutter implementation:

1. inconsistent and broken layouts
1. inconsistent styling between screens, including basic things like the color pallette
1. many...many...many overflow bugs, which in Flutter will flood your console with warnings as you work on the app
1. small style changes to a component meant scanning and editing the whole codebase because it was a component in name alone

That fourth item though was the root of evil. Nothing was properly componentized, and therefore the agent would always
assume a fix in one spot was a fix for the whole application.

How could the agent maintain a consistent design look and feel if the code was distributed all over the codebase?

How could the agent be confident that the change it was making was not going to break the whole layout of the page?

## We had tests, just not the right ones

When I first described this, I said we had no frontend tests before the widget library. That was not quite
right, but was functionally true. The tests we had only covered application logic. Nothing about layout, user flows, verifying
component visibility on a page, etc.

This fits a pattern we have been following on purpose:

> The first really early versions of our apps go out untested, then we later come back and encode our expectations in tests
> before we make it generally available, and then we strictly enforce testing moving forward. That way we avoid early churn
> in our testing while we trial new features and ideas.

The frontend had just gone through a rewrite from Vue into Flutter, so it was still in the fast, untested stage. The backend
went through the same arc: no tests at all for its first year of life, plus some change.
The widget library was part of us asserting that we wanted to consider the frontend "mature" and settle on our design. Settling
on a design did not necessarily mean it would be "pretty" just yet, but it had to stay functional and allow us to test the
viability of our coming features.

## What the library changed

So, I cracked my knuckles, and got to prompting!

I had the agents trawl the codebase for shared functionality, and create a catalog of what were the widgets to be pulled
out into a [component library](https://www.uxpin.com/studio/blog/ui-component-library/), which we will call a "widget library"
due to Flutter's chosen nomenclature of "widget" over "component". Once that initial catalog was created, the agent created
a package called [`quark_widgets`](https://github.com/autobutler-org/quark/tree/f2d69bb7f988f9442cdcb2a0f84e851ebd963850/packages/quark_widgets).

Importantly, the widget package is not just the widget code, but it also contained a suite of tests to assert expected behaviors
of all of the widgets.

Most importantly, the widget library came with a runnable "gallery" which allows you to browse every available widget, along
with the documentation, and some theme pickers to allow you to play with different color pallettes. This is pretty standard
for more mature component libraries, but provided a great way for myself and the agents to verify that the widget was sensible
on its own.

![Widget gallery](/blogs/widget-library-dsl/widget-gallery.png)

This practice of creating your own component library has been pretty standards for a while now for UI developers, but in
the agentic era it provides another benefit: [a Domain Specific Language (DSL)](https://martinfowler.com/dsl.html)

An internal DSL in this case. See, when an agent is working on something like Vue or Flutter, they have the specific tags
or widgets of that framework to construct the UI with, but these are super generalized components with loads of hooks and
extensions that can both flood the agent's context and do not guide the agent to what you specifically need for your app.

Again, humans have suffered from the same fate when working with these frameworks in the past. Hence, why developers would
often reach for something like the [Material Design Library from Google](https://m3.material.io/).
This provided you a set of fully constructed components that were guaranteed to function for you, made up of those small
tag primitives, with expected behaviors, and a consistent look and feel that would behave properly in a common layout. An
app's code that was written with Material Design in mind looks dramatically different from one using the primitives they
are built from, but was also generally more concise and easier to understand.

So by doing the same thing with Flutter widgets, we have given the agent the same benefits. That design library makes it
more concise and easy to understand what UI tools are available for it to build with, while also front-loading that context
for the agent by having it in-repo. Now the agent can know, by default, that new UI elements and layouts need to be written
as a library, but only if an existing widget does not satisfy the use case.

So, instead of using Flutter's widget primitives as the language of the UI, the agent uses `quark_widgets` as the language
of the UI, only reaching for Flutter's layout primitives occasionally to piece the widgets together. On top of that, the
widgets are all stateless by default. They do not make API calls themselves, but simply accept data in to render, and provide
hooks for the actions that can be taken with them. This appropriately separates the business logic from the rendering of
our application, across the entire website.

To summarize the benefits:

- The agent now has a small vocabulary to work from.
- A browseable gallery makes the widgets discoverable by humans and agents alike.
- The agent now has standardized layout examples in the widget gallery.
- Every widget in the package is tested in isolation.
- Every widget can now be rendered and tested without the corresponding business logic.
- Page-level context shrinks because the details live inside the components.
- A screen's code gets short enough that a human can feasibly read it, and short enough that the agent can read it without.
  burning loads of context.
- A style change for a widget that is present across the whole app is now an update to one code location.
- Unused widgets become obvious now that you can cross-check the library with the application code.

## The rules that make it a language

A vocabulary alone isn't a language though, for you also need grammar, and ours lives in `AGENTS.md`:

- One widget class per file.
- No private widgets, even if a widget is only used once.
- No `Widget _build*()` helper methods.
- Package widgets are data in, callbacks out.
- A page's domain state lives in a ChangeNotifier controller under `lib/controllers/`, and every service call goes through
  it. Fat pages and service-coupled widgets that haven't been migrated yet are not violations.
- Colors come from QuarkTokens through the theme. Top-bar icons come from QuarkIcons, never Icons.
- Pages are compositions: no sizing math, no breakpoints, and no LayoutBuilder branching in a page.
- Every package widget gets a gallery registry entry and a regenerated docs.g.dart. Layout tests run at narrow and wide
  viewports, and callback or state tests run once.

The initial rules and the agent definitions landed on 2026-09-04 in
[PR #1733](https://github.com/autobutler-org/quark/pull/1733).

## One massive PR, on purpose

Everywhere else in this series you'll see us push for small, stacked PRs. The migration was the exception. We moved
all of the existing pages in one massive PR, including all the tests.

Then I went through the whole app as a human and tested everything by hand. That's still my rule today: if a change is
visual, I run it and look before approving. Otherwise I generally don't read the code anymore.

## Agents reviewing agents

We wrote two agent definitions for this, not one: `.claude/agents/widget-engineer.md` writes widgets, and
`.claude/agents/widget-reviewer.md` checks them. The engineer applies the reviewer's checklist to its own work before it
opens a PR.

The reviewer has earned its keep. In one session it flagged a test where a drawer tap at `360×640` landed "roughly 3px"
inside the screen, and noted that "one more row will break it."

It also missed something a person did catch. After the widget move passed the reviewer's checklist, I asked: "So I am
asking because I want the quark_widgets package to be used by the main application. Are we using it AT ALL?" It turned
out `LiveBadge` had been copied into the package, but neither original was deleted and no call site was switched. And
`FileActionsBar` was dead code that got moved anyway. We fixed the code, and then we fixed the reviewer subagent's instructions.

One more, because it shows the library's failure mode. A commit "fixed" the breadcrumb home glyph in the package's
`FileBreadcrumbBar`, but the Files page doesn't use that widget. I told it: "The home is clearly still tappable when I
am at the root, and provides a cursor: pointer to me on web." The fix went into the widget the page actually renders,
with a regression test. A library only helps if the pages use it, which is why the zero-callers rule matters.

## Copy this

- Put your design system in its own package, with data passed in, and all the necessary hooks/callbacks.
- Give yourself and your agents a browseable gallery with a generated registry.
- Test every component at a narrow and a wide viewport. Our first batch of narrow tests found multiple overflow bugs.
- Write subagents for component work, an engineer and a reviewer at least, and have the engineer run the reviewer's checklist
  on its own work before it opens a PR.
- Ship package-level skills inside the package. Ours live in `packages/quark_widgets/skills/`.
- After any move, grep for callers. Zero callers is a finding and says either the app is still writing its own components
  inline or the component in the library is dead code.

## What's next

The next post, "Three tabs,
three clones, a pile of worktrees", is about what parallel agent work looks like on one laptop, and what it costs.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace,
James

---

This is part 4 of 8 in our series on how we build Quark with AI agents.

← Previous: [Zero approvals, a wall of checks](/blogs/zero-approvals)

Next: [Three tabs, three clones, a pile of worktrees](/blogs/three-tabs-three-clones) →

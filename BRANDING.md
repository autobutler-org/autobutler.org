# `BRANDING.md`

## Purpose

This is the durable reference for how AutoButler and Quark talk about
themselves — naming, voice, and the mission behind the company. It exists so
that copy written today (a docs page, a blog post, a PR description) still
agrees with copy written six months from now.

Use it two ways:

1. **Before writing customer-facing copy** — headlines, docs, marketing pages,
   emails — check names and tone against this file.
2. **When reviewing a change** — if a PR's copy reads inconsistently with
   this file, that's worth flagging, the same way a lint rule would be.

This file is mirrored in both `autobutler.org` and `quark.autobutler.org`.
Keep the two copies in sync; if one changes, update the other in the same PR
or a prompt follow-up.

## Naming

- **`Quark`** is the product name. Plain, no suffix — not "Quark by
  AutoButler," not "the Quark device" in headlines. `Quark` in both headline
  and body copy.
- **Always capitalize `Quark`**, mid-sentence included — it's a proper
  noun here, not the subatomic particle. Never lowercase it to "quark."
- **`AutoButler`** is the company only — the LLC that builds and sells
  Quark. It is **not** a product or software name anymore. Don't write "the
  AutoButler app," "the AutoButler platform," or "AutoButler automation" —
  that's Quark now. AutoButler is who makes Quark, not what Quark is called.
- **Company voice is first person** — "we" / "us," not "the AutoButler team"
  or "the company." It reads more like a person talking to you, less like a
  press release.

## Taglines

- Quark keeps its own product-level tagline (currently the homepage hero
  copy — see `data/copy.ts` on `quark.autobutler.org`, or `pages/index.vue`
  here). It's allowed to be plainly product-descriptive.
- AutoButler, the company, gets a **separate, mission-level** line — not the
  same copy as Quark's tagline. AutoButler's mission is broader than one
  product. This line is still being drafted; until it lands, don't invent
  one ad hoc in a random page — check for the latest decision before adding
  a company-level tagline anywhere.

## Mission and vision

AutoButler exists because we think a product company can still put the
customer first — no subscription, no venture capital, bootstrapped by
actual sales instead of investor money. That's a deliberate structural
choice: a company answering to customers, not to shareholders asking for
this quarter's growth number.

The problem we're responding to: for things like home cloud storage and
document editing, most of what's on the market today is built around
recurring revenue and data collection first, and the product experience
second. It's hard to find something in that category that's genuinely
transparent about what it does with your data, or that lets your data
actually stay local instead of living permanently on someone else's
servers. That's not a complaint about any single company — it's a
description of how that whole category of product tends to be built right
now.

What we're building instead: a product where your files and photos stay on
hardware in your own home, plainly, with no subscription and no ongoing
claim on your data. If we succeed, people have a real alternative in a
category that hasn't had one — and if the mere existence of that
alternative makes the rest of the market compete harder on privacy and
ownership, that's a win for us too, not a consolation prize.

We were partly inspired by ideas like the ones in _Technofeudalism_
(Yanis Varoufakis) about how dependent people have become on renting
access to their own data and tools from a handful of platforms. We don't
share the book's political conclusions — we're not making an
anti-capitalist argument, and we don't think the answer is a different
economic system. We think the answer is a better product: one company
proving that a bootstrapped, customer-first business can out-compete the
status quo on the merits.

## Positioning guardrails

This section is about how we talk about the mission publicly — it matters
as much as the words themselves.

- **We are not positioning this as a fight against a company, or against
  "big tech" as an enemy.** Mentioning competitors is allowed. You may
  call out, factually, when competitors do really unpleasant things or
  when we genuinely don't know what they're doing. Never be nasty or
  classless about competitors. Classless/nasty copy is blocked, not
  competitor mentions. We're offering a better option, not attacking an
  existing one.
- **Keep claims about the category, not accusations about individuals.**
  It's fine to describe how subscription cloud storage or big-tech data
  practices generally work; it's not fine to make specific, unverified
  claims about what a named company does with data.
- **The tone is hopeful, not aggrieved.** We're optimistic about what a
  better product can do, not resentful about the current market. Avoid
  words like "enslaved," "exploited," "steal," "spy" — even when they're
  punchy, they read as adversarial and invite exactly the kind of
  confrontation we're not looking for.
- **Success doesn't require anyone else to lose.** If Quark's existence
  simply pressures the rest of the market into offering better privacy and
  ownership terms, we'd count that as the mission working, not as a
  consolation. Copy should be able to say that plainly.

## Voice and tone

- Plain, direct, second person to the reader, first person for us ("we").
  Write like you're explaining this to a friend or a parent, not pitching
  investors.
- Concrete claims over adjectives — say what the product actually does,
  not that it's "revolutionary" or "disruptive."
- No subscription, no VC, bootstrapped, and customer-first are facts about
  the business, not slogans — state them plainly rather than as marketing
  flourish.
- Avoid jargon from tech-industry or political-theory discourse
  ("rent-seeking," "platform capitalism," "surveillance capitalism") in
  anything customer-facing. Internal docs like this one can name an
  influence like _Technofeudalism_ directly; customer copy shouldn't assume
  the reader has read it.

## Do / Don't

**Do:**

- Call the product `Quark`, plainly, in headlines and body copy.
- Call the company `AutoButler`, and speak as "we" / "us."
- Talk about data staying local, no subscription, no venture capital,
  customer-first, as concrete facts.
- Keep the tone plain, warm, and optimistic.

**Don't:**

- Call Quark's software "the AutoButler app," "AutoButler OS," or similar —
  AutoButler is the company, not the product.
- Be nasty or classless about competitors, or imply this is a fight
  against one. (Mentioning competitors is allowed; factual call-outs
  are allowed — see Positioning guardrails.)
- Use combative or grievance-toned language about "big tech" or "cloud
  providers" as a group.
- Invent a company-level tagline before the real one (tracked in
  `autobutler.org` issue #120) has landed.
- Invent prices, dates, availability, testimonials, or metrics that aren't
  real.

## Open items

- **Company-level mission tagline** — still being drafted
  (`autobutler.org` issue #120). Once decided, it belongs in this file and
  wherever the company's own mission page lives.

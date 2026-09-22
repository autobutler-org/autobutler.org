# Interview with James (started 2026-09-21)

Answers are James's words, lightly cleaned up. Notes in brackets are context from the research.

## Where the hand-written line is

**Q: What did you and Brandon type by hand, and when did it stop?**

"It was basically in March when we introduced Openclaw. I stopped coding then."

[Repo: Exo and Sable both start committing 2026-03-17. Everything before that, including the Copilot
period, was still mostly hand-written by this account.]

**Q: Was stopping a decision, or did the bots outpace you? Did you know the bots would need rails?**

"Did not expect to stop coding. I anticipated some day the models might get good enough, and I always have
found that static analysis kept me from making bad decisions, so I implicitly thought that would be true for
my agents, but was not yet convinced. Tbh, even Sonnet at that point was most of my usage and it started to
just be correct more than half the time with just the GitHub issue descriptions guiding them. They would
screw up frontend changes OFTEN, basically until we created the widget library. The introduction of the
widget library was a hard stop in the frontend changes being wrong and bad though. It worked like a DSL very
effectively."

[Key points: (1) static analysis as a personal habit carried over to agents as a hypothesis, not a
certainty; (2) the bar for "stopped coding" was Sonnet being right more than half the time from an issue
description alone; (3) frontend was the weak spot until the widget library. Repo: widget package rules,
`.claude/agents/widget-engineer.md` and `widget-reviewer.md` land 2026-09-04 (PR #1733);
`packages/quark_widgets` ships its own skills; James's longest prompt in the record (2,623 chars,
2026-09-03 17:36) is about widget architecture and subagent design.]

## The widget library as a DSL

**Q: What did "wrong and bad" look like on the frontend, and why does the library fix it?**

Wrong and bad was:

- inconsistent and broken layouts
- screens had inconsistent styling
- many overflow bugs
- code passed `flutter analyze` but looked bad
- making small style changes to components would require whole-codebase scans and edits that often missed
  instances of the same error

The library fixes it by:

- the agent has a small vocab to work from, and standardized layout examples and widgets
- widgets are all deeply and individually tested
- a screen's code becomes short enough that I can read it, and that the agent can read it without consuming
  loads of context
- context on pages is greatly reduced because the agent just works off of these small components, which
  abstract out the details of the widget
- making a change across the whole website's style is now insulated to a single widget update, making sure
  the site stays consistent
- allowed us to create a browsable catalog of all the special widgets of the app, allowing for human and
  agent discovery
- makes it clear what widget designs are unused, due to their sourcing from one location

[Note: "passes the analyzer but looks bad" is the limit of static analysis on UI. The library moves the
problem to where tests can reach it: each widget is tested once, and pages become composition. Same shape as
the backend rules (sqlc-only SQL, vfs-only file access, handlers that only extract/call/respond): shrink the
vocabulary until the gates can cover it.]

**Q: What stops an agent from reaching past the library? How did existing pages migrate?**

"It rests on AGENTS.md wording plus the widget-reviewer agent."

"We moved all of the existing pages in one massive PR, including all the tests."

[Note: no hard gate yet. By the project's own pattern (prose rule, then a script when prose does not hold,
as with `check-go-structure.bash`), this boundary is a candidate for a lint or a test that fails on raw
Material widgets in pages. The one-massive-PR migration is the opposite of the usual stacked small PRs.]

## What happens before merge

**Q: What did you do before merging the widget migration, and what do you look at on an ordinary PR?**

"So before the widget library, we had basically no frontend tests because we were in the fast era of a
rewrite of our frontend into Flutter. A pattern we seem to do is the first really early versions of our apps
go out untested, then we encode expectations later in tests when we hit maturity, and then we enforce
testing. That way we avoid early churn of API changes, until we settle on a design that made sense."

"Then, for the widget rewrite, I went through as a human and tested everything."

"At this point, if there are visual changes, I test those by hand before approving. Otherwise, I generally
don't read the code anymore."

[Key points: (1) a deliberate three-stage testing policy: ship untested while the design churns, encode
expectations at maturity, then enforce. The backend followed the same arc: zero tests for the first nineteen
months, first Go tests 2025-12, 95% of code commits shipping with tests by 2026-09. (2) The merge criterion
today is: green checks, plus a hands-on check for anything visual; the diff is generally not read.
Fact-check needed: the repo shows 651 Dart tests on 2026-08-31, before the widget rules landed on
2026-09-04, so "basically no frontend tests" needs qualifying; see next answer.]

**Q: The repo shows 651 Dart tests before the widget library. Were those logic-only?**

"Yes, those only tested logic. Nothing about layout or user flows."

[So the accurate claim is: before the widget library there were hundreds of frontend logic tests and no
tests of layout or user flows, which is why they did nothing for the visual problems.]

**Q: What still makes you open a diff?**

James confirmed the whole list offered and added one:

- auth changes
- the password vault
- migrations that run on customers' devices
- anything that touches data deletion
- any non-trivial visual changes

**Q: If you don't read the code, where does the mental model come from?**

"My knowledge comes from having an understanding of the architecture and good developer sense."

"Something about vibe-coding is that it still requires you to know how computers and software work, and you
applying that sense dictatorially. You cannot succeed as we have without a good base knowledge."

[Key point for the series: the claim is not "anyone can do this". The human supplies architecture and
judgment and applies them "dictatorially"; the agents supply the typing; the gates supply the checking.]

**Q: How do you decide when to overrule the agent and when to listen?**

"I want evidence presented to me. A good leader will listen to those he is over; when he is provided
evidence he re-orients."

[This matches the transcripts. The agents that changed James's mind brought proof, not argument: the ARM
runner research with benchmarks, the investigation agent's "Your fix is wrong... Proven by test, not by
reading" with a pass/fail matrix, Claude's own "I'd rather have evidence than a third theory" before building
a standalone repro. The rule in `AGENTS.md` "Verification before claiming done" is the same standard pointed
the other way.]

## Openclaw

**Q: Walk me through an ordinary day with the Openclaw bots over Discord.**

"I think the details of the Openclaw era are not too important. It just helped us realize what running
through multiple parallel sessions could do for us. It made that very easy to start doing, and now we moved
back into tmux and iTerm tabs with multiple Claude sessions, along with multiple local clones of the repo."

[Editorial direction: Openclaw gets a paragraph, not a post. Its role in the story is that it made
parallel agent work easy to try, and the lesson carried over to local sessions. The proposed post "Three
generations of agents" should shrink or fold into the overview.]

## The parallel setup today

**Q: What does it look like on your screen and in your head?**

- "I have 3 tabs generally, one in each repo. For each tab, I have two vertical panes, one with Claude, and
  the other split in half horizontally. One of those runs the frontend and one runs the backend, for each
  checkout. So each tab houses a session and the terminals to run the frontend and backend, so I can check
  visual changes in each repo as needed."
- "I am using iTerm with the Claude Code plugin, so it tells me in the tab titles when ones are working vs
  waiting for input vs idle. You can achieve a similar setup to this with herdr and similar tools."
- "Full clones are for me to run and check and manage stuff. Worktrees are for parallel agent edits,
  especially when I need to spawn off one-off edits and edit submodules."
- "Usually 3-5 streams is my limit because our issues are defined very small."

[Key points: (1) one clone = one running app = one visual check station, so a clone is a place to look at
the product, not just at code; (2) the tab title is the notification system; (3) the ceiling is set by issue
size, and small issues raise it. Ties to the merge criterion: visual changes are checked by hand in the
running app next to the session that made them.]

## How issues get small

**Q: Who writes issues, how do they get small enough to dispatch, what makes one not ready?**

- Brandon is effectively product and QA, filing what he finds; James dispatches. "Brandon does work in that
  way, yes."
- "We generally spend time talking to our agents about the work to be done, splitting it up in our session
  and then submitting tickets once the entire scope is considered."
- "An issue is not ready if it is a spike. Again, spend a lot of time in conversation with the agent up
  front."
- Epics are the planning unit, sub-issues the dispatch unit. "Yes."

[Key point: the expensive conversation happens before any code, in a session whose output is tickets, not
diffs. The dispatch prompt can be one line because the thinking was already done and written into the
issue. A spike (unknown scope) is the thing you do not dispatch; you converse it down to known scope
first. Matches the prompt record: long prompts end "store it in a github issue" / "don't go straight to
implementation".]

## Trust and the guardrails

**Q: How does the trust claim survive SMB, foreign keys, the fake router, the green perf harness?**

"So on the SMB front, SMB actually did work initially. I literally did a transfer over Mac. Something else
happened later that broke it, which makes sense because we never had a test. Any testing hole is still
likely to fail, just like before we had coding agents."

[Correction to the research: SMB worked when merged (2026-03-21, James did a transfer from a Mac) and was
broken by a later change (the unprivileged-user move four days later). The lesson James draws is that
untested features regress the same way they always did; agents did not create that failure mode.]

**Q: Coverage is printed but not gated. Deliberate?**

"We have not gated coverage just because I lowkey forgot to care, lol."

**Q: Which guardrail paid for itself most, and which costs most?**

[Later, on the tension with documented `--no-verify` bypasses: "Yeah just say it is rare."]

"Perf suite is a bare sanity test on certain changes and does not block PR merges, since it is going to be
flaky due to it being inconsistently performant cloud runners. cspell false positives have not been a big
deal basically ever, but probably has cost the most. The pre-commit hook is absolutely the most powerful
though. We never get pushed code that fails lints that way. Only tests can fail in CI this way. We avoid
running all tests on pre-commit because the agent already runs scoped tests on its changes before
attempting a commit. No need to run ALL tests on every commit, when scoped tests are run."

[Key design: the pre-commit hook runs every lint and formatter but no tests. Lints are cheap and total, so
they run locally on every commit and CI never sees a lint failure. Tests are split: the agent runs the
scoped tests for its change before committing (`resolve-issue` step), and CI runs the full suite. The perf
suite is deliberately non-blocking; its 11% failure rate is accepted. Matches the ruleset: the eight required
checks do not include the performance workflow.]

**Q: Test-first or tests-with?**

"You are right that TDD never shows up explicitly, but there are some implicit guides in the AGENTS.md that
suggest it. I don't care as much about the order so much as it has a test at some point."

"Failing tests often catch a wrong agent fix, but before it pushes."

[So the measurable claim is the 95% co-ship rate, not red-green ordering. The failing-test step's value is
local: it catches wrong fixes before the commit, which is why those catches do not show up in CI history.]

**Q: Anything beyond CodeQL and govulncheck for auth, migrations, the vault?**

"We have a council of Grok agents who run daily scans of our codebase for different classes of problems.
Some are basically QA, others UX, and another does security. They file tickets and PRs for small and obvious
things."

[New to the research. Candidate identity: `exokomodo-bot` authored 143 issues and its PRs continued to
2026-08-27; need to confirm whether the Grok council is the same account, a successor, or something running
off-machine. Also the first non-Claude model in the story.]

James, correcting my guess: "Grok council is how Brandon has recently been making changes. Nothing to do
with exokomodo-bot."

[So the council is Brandon's recent workflow and its output lands under his own account, not a bot's.
Separately verified on GitHub: `exokomodo-bot` (James's) kept going after 2026-08-27 as a scanner and
issue-filer rather than a feature author: 2026-08-11 batch (#1537 migration skip, #1541 SMB endpoints not
admin-gated, #1542 vault is a shared singleton), 2026-08-26 batch (15 issues in one day incl. #1599
Expanded-in-sliver and #1600 "extract shared widget library"), 2026-08-12 "Review guide: 36 open PRs", PR
#2263 merged 2026-09-22. Correction to repo-history.md: the bot's last commit was not 2026-08-27.]

**Q: Why Grok for the council, and what is Exo today?**

"Grok has a new feature called 'grok bots', which are 'always-on' agents that speak to each other as a team.
So we have them as a separate review council, while Claude is still our main implementation engineer."

"Exo is still on Openclaw and helps me with high-level project management. When I want to work at something
when not near my dev workstation, I will send him off to do work still for me and write PRs."

[The current org chart: Claude Code sessions (James at the workstation) = implementation; Exo on Openclaw =
project management and remote dispatch when James is away from the desk; Grok bots = standing review council
(QA, UX, security) that files tickets and small PRs; Brandon = product and QA; James = dispatch, merge,
hands-on visual checks. Openclaw is therefore not a past era; it changed role from implementer to PM.]

## Steering

**Q: What agent behavior costs you most today?**

"Occasional bug reports from the council for UX things. It finds 'bugs' that are not really there
sometimes, probably because they are in debug builds and limited compute resources."

"I think the thing I find most frustrating is having to tell the model to stack PRs. I wish it understood
when I would want this more default, but that may be my fault."

[Matches the record: "Make it an actual stack with the gh stack extension dude"; "stack" is the most common
word in his prompts (70 uses); a memory file `use-gh-stack-for-stacked-prs` exists but the rule has not
been written into the repo skill as a default trigger. The council false positives are a debug-build
artifact, not a model problem.]

**Q: Fable versus Opus?**

"I use Fable when doing something that will branch multiple PRs and I know will be a large stack or a
repo-wide change, and Opus for its subagents and daily work."

[Matches the 17-branch epic: Fable coordinator, Opus subagents. Model choice is by blast radius.]

[Action taken 2026-09-21: issue #2273 and PR #2275 on autobutler-org/quark add step 5 "Decide: stack or
one PR. Default to a stack." to `/resolve-issue` plus one AGENTS.md bullet. Not merged. Open points for
James: the agent committed with `--no-verify` after hitting the known phantom `dart format` drift in a fresh
worktree (27 untouched files under `packages/`), disclosed in the PR body; every layer carries `Closes #N`
per current convention, which closes the issue on the first merge; cspell ignores `.claude/`. The phantom
drift recurring live during the interview is itself material for the "when the agent is wrong" post.]

[Update: James merged #2275 the same day and ruled that `Closes #N` goes on every layer of a stack. A
follow-up, issue #2282 and PR #2283, makes it explicit in the skill and AGENTS.md. That agent ran
`flutter pub get` in its fresh worktree first and hit no phantom drift; full `gmake check` passed in the
pre-commit hook with no bypass. Pair with #2275 for the "when the agent is wrong" post.]

## Publishing boundaries

**Q: Money and hours, candor, reader, bylines?**

- Money and hours: "Yeah go for it on money and hours. I am also curious." [Cost estimate being computed
  from local transcripts; see findings/cost-and-hours.md.]
- Candor: the 24% Exo discard rate is fine to publish; Claude's retractions are fine. **Credential-handling
  incidents are off limits and have been scrubbed from this research.**
- Reader: "engineers skeptical and engineers who truly want to know how to superpower their AI usage."
- Bylines: research and a detailed outline from Claude; James and Brandon write the posts.

## Last round

**Q: Billing?** "I use Claude Max and then probably another ~$100 a month in extra usage." [So real
Claude spend is the Max plan plus about $100/month; the $1,990 figure in findings/cost-and-hours.md is
API-equivalent list price for 28 days. Grok and Openclaw costs still unknown.]

**Q: What did you try and drop?** "I did not try plan mode, ultracode, or workflows. I use Copilot for any
hand-edits I do in VS Code, just using the auto-completion functionality while typing." [So the untried
features were never tried, not rejected. Copilot's coding agent (0 of 5 PRs merged) is gone; Copilot
autocomplete survives for the rare hand edit.]

**Q: Four UI stacks; would the rewrites have happened without agents?** "The rewrites were all so large I
would have hated doing them, but they were all necessary in the evolution of the product." [July gap
question not answered directly; leave it out or ask again.]

**Q: When does a prose rule become a script?** "My threshold is if I see a rule already get ignored. Then
it becomes a check as quick as I can reason to a static solution." [One violation, then a check. The
widget boundary (pages compose from quark_widgets, no raw Material in pages) currently rests on AGENTS.md
plus the widget-reviewer agent; by this threshold it becomes a lint the first time an agent ignores it.]

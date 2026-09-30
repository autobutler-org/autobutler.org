# Questions for James (answer inline)

Each question says what the evidence already shows, so answers can be short corrections or additions.

## A. Origins and the three generations of agents

1. **Where is the hand-written line?** You described it as "initial project setup and backend API". The
   repo shows the Go backend landing 2025-06-12, zero tests until 2025-11, Copilot instructions in 2025-10,
   and bots from 2026-03-17. What did you and Brandon type by hand, and when did either of you last
   hand-write a meaningful piece of Quark?
2. **How did Openclaw over Discord work in practice?** Which models ran Exo and Sable, where were they
   hosted, who dispatched work, and what did a typical exchange look like (one channel per bot, per issue,
   per PR)? Nothing from this period is on your machine. Do you have Discord exports or screenshots we can
   quote?
3. **Why did you leave the bots?** The record shows 24% of Exo's PRs discarded (against 2 to 3% now),
   several PRs 300+ commits stale, and the last bot commit on 2026-08-27, two days after local sessions
   ramp up. Was it quality, latency, cost, rebase pain, or something else? What do you miss about it?
4. **Exo reviewed 158 PRs and the PR template still addresses Sable and ExoKomodo by name.** Did bot review
   catch real problems? Why did review fall from 74 of 127 PRs (2026-03) to 3 of 133 (2026-08)?
5. **What were "Galadriel" and the Ralph loops?** One co-author trailer (`galadriel@autobutler.local`,
   2026-09-18), a `galadriel/` branch, and a `.ralph/` gitignore line are all that remain.
6. **Four UI stacks in nineteen months** (Nuxt, Go/templ/HTMX, Vue, Flutter). Did agents make those
   rewrites cheap enough to attempt, or would you have done them anyway?
7. **The summer gap.** Human-account commits drop to 1 in 2026-07 while the bot made 34. Was that the
   "time off" from the rebrand post, with the bot working unattended?

## B. The daily loop

8. **Who writes the issues?** Brandon authored 540 of 918, you 229, Exo 143. Is Brandon effectively product
   and QA while you dispatch? How much of an issue body is written by Claude? What makes an issue
   "ready to hand to an agent"?
9. **What happens between dispatch and "Merged."?** With zero required approvals and 19% of PRs reviewed,
   what do you look at before merging: the diff, the tests, the PR body, only CI? Does it differ for auth
   or the password vault versus a UI tweak?
10. **Why separate clones (`quark-2`, `quark-3`) on top of worktrees?** What was happening on Aug 27 when
    all three started within nine minutes? What decides which checkout gets an issue?
11. **What is your ceiling?** 32% of your half-hour windows span multiple checkouts. How many streams can
    you hold before quality of steering drops, and how do you notice?
12. **Manual testing.** Claude writes manual test plans and you report symptoms from devices. What is your
    routine (which devices, how often, before or after merge)? What classes of bug only you find?
13. **Fable versus Opus.** You switch with `/model` (Fable 6 times, Opus 5). What triggers the switch?
14. **Hours and money.** `/insights` reported 393 hours and 240 commits. Are you willing to publish spend
    per month and your own hours? That is the number skeptical readers will want.

## C. Trust

15. **"Absolutely trust" is a strong claim.** The record includes SMB that never worked on a device,
    `PRAGMA foreign_keys` never set, three endpoints tested against a fake router, and a perf harness that
    was green while every request timed out. How would you state the claim so it survives those? My
    reading: you trust the gates, and every miss was something no gate looked at.
16. **Test-first or tests-with?** You never typed "TDD" in 948 prompts, only 2% of subagent briefs demand
    it, and squash merges hide ordering. 95% of code commits now ship with tests. Do you care about the
    ordering, or about co-shipping plus proof the test fails without the fix?
17. **Coverage is printed but not gated.** Deliberate? What would make you add a threshold?
18. **Which guardrail has paid for itself most, and which costs the most?** Candidates for cost: the
    2-minute pre-commit hook, cspell false positives, the perf suite failing 11% of runs.
19. **When does a prose rule become a script?** `check-go-structure.bash` and
    `check-migration-numbers.bash` exist because rules alone did not hold. What is your threshold?
20. **Security-sensitive code.** Is there any extra process for auth, rate limiting, or the vault beyond
    CodeQL and govulncheck? Do you ever ask for an adversarial review?

## D. Steering

21. **How do you keep a mental model of code you do not write?** The Firefox clue and "no caller is not
    dead" both needed system knowledge. Where does yours come from now: issues, PR bodies, using the
    product, reading code?
22. **What agent behavior still costs you the most?** The sessions show false greens, extra cleverness
    ("Don't do these weird extra steps"), and overconfident diagnosis. What have you stopped asking for?
23. **The `/insights` to `AGENTS.md` loop** produced PR #1850. Is that a routine or a one-off?
24. **Your global setup** (subagents by default, Opus subagents under a Fable coordinator, ponytail, rtk,
    the writing-tropes hook, no session links, sign-off). Which pieces would you tell a reader to copy
    first, and which are personal taste?
25. **What did you try that did not work?** Plan mode, ultracode, and workflows never appear in your
    prompts. Tried and dropped, or never needed?

## E. Shape of the series

26. **Who is the reader?** Engineers skeptical of vibe coding, founders deciding whether to try it, or
    people already doing it who want your setup?
27. **How candid can it be?** Discard rates, the slip-through list, verbatim prompts
    with typos ("Make the PR dude"), Claude's retractions. Anything off limits? Is the repo public enough
    to link PR numbers?
28. **Brandon's side.** Does he run agents too (Sable suggests yes)? Does his workflow differ enough to
    deserve its own post?
29. **Bylines.** The last post ends "and not Claude! we write these ourselves!". Do you want research and
    outlines only from me, or is this series the place to show a Claude-assisted draft on purpose?

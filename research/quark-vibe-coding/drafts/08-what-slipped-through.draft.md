---
title: What slipped through
description: The bugs that shipped in a codebase built by AI agents, and why every one of them was a hole no gate covered.
date: 2026-11-12
author: James Orson
---

<!--
Other title options from the outline:
- Every miss was a hole no gate covered
- The bugs we shipped anyway
-->

Hello friends! This is the eighth post in our series on how [Quark](https://quark.autobutler.org) gets built by AI
agents. So far we've talked a lot about gates: the pre-commit hook, the eight required checks, the rules we wrote down
after each mistake. A series about trusting automated gates isn't worth much without the list of things the gates
didn't catch, so here it is.

The pattern is the same every time. The gates are very good at what they check, and every real miss was something
nothing was looking at. Agents didn't invent that failure mode. They just run into it faster, because they ship faster.

## SMB, told correctly

I'll start with the one our own research got wrong.

When we dug through the history for this series, the conclusion was that our SMB file sharing had been dead on arrival.
That isn't true. SMB actually did work when it merged on 2026-03-21. I did a transfer from a Mac myself.

What happened is that something else broke it later, about four days later, when the service moved to an unprivileged
user. Nobody noticed, because we never had a test for it. Months later I told an agent "SMB does not seem to be
working, even before your PRs," and it went and audited the whole path. It found three independent blockers:

- The service ran as `User=quark` with `CapabilityBoundingSet=CAP_NET_BIND_SERVICE`, while `smb.Setup` shells out to
  `apt-get install samba` and `systemctl restart smbd`. An unprivileged user can do neither.
- Samba wasn't in the image's package list.
- The firewall only allowed `80/tcp`.

That became [issue #1703](https://github.com/autobutler-org/quark/issues/1703), and in the end we removed the feature
in [PR #1731](https://github.com/autobutler-org/quark/pull/1731): 18 files, 7 lines added, 1,000 removed.

If you take one line from this post, take this one. Any testing hole is still likely to fail, just like before we had
coding agents. SMB is exactly what an untested feature has always done: it worked, then something next to it changed,
and nothing told us.

## Tests that tested the wrong thing

A test that exists isn't the same as a test that checks anything. We found several of those.

**Tests wired to a different program.** Three session endpoints had never worked. Our `requireAuth` middleware sets
only `"username"` on the request context, and the three handlers read `"userID"`. The tests passed anyway, because
`sessions_test.go` "builds a bare `gin.New()` and never mounts `middleware.Use` at all." The tests were exercising a
stack that doesn't exist in production
([issue #1763](https://github.com/autobutler-org/quark/issues/1763)).

**A test that could not fail.** From an agent's notes while fixing something nearby: "The old `TestSetupFilesDir` was
vacuous. It never called `SetupFilesDir`. It copied the migration logic inline into the test body and asserted against
its own copy. It would have passed no matter what production code did." The agent then stubbed out `os.Rename` and
watched its new tests fail 9 assertions, to prove they actually bite.

**Tests that never looked.** Our file picker tests pumped a fixed 500ms instead of waiting for the UI to settle. The
dialog's fade transition paints nothing until it finishes, and a Flutter flex only reports an overflow when it
paints, so the tests passed without ever seeing the screen. In Claude's words: "That's why the crash you hit didn't
show up in the run I reported as green."

**A regression test that proved nothing.** On a login routing fix, Claude wrote a test asserting the login page was
gone from the tree. Then it caught its own mistake: the test "passed under `push` too because the pushed page is
opaque." It called that first test "worthless" and rewrote it.

Every one of these was green in CI. The gate ran the test and the test passed. Nothing checked whether the test could
fail.

## A green harness while everything timed out

Our performance suite runs wrk against the backend. When every request timed out, wrk
still exited 0 and printed "p50 0.00us," which looks faster than normal.

An investigation found three blind spots, each one reasonable on its own. CI only ran on Linux. The test user was an
admin, so the slower non-admin path, which scanned the disk twice, was never exercised. And there was no latency gate
at all, so no number could ever fail the run.

Fixing it took six stacked PRs,
[#2190](https://github.com/autobutler-org/quark/pull/2190) through
[#2201](https://github.com/autobutler-org/quark/pull/2201), and the files endpoint p99 went from 4.13s to 21ms. That
suite still doesn't block merges, on purpose, since it runs on inconsistently performant cloud runners and fails
about 11% of the time.

## Constraints that were decoration

`PRAGMA foreign_keys` was never set on our SQLite connections. SQLite ignores foreign keys unless you turn them on, so
every `ON DELETE CASCADE` in our schema did nothing. No test or linter looked for it. It surfaced only when an agent
probed the behavior directly instead of reading the schema and trusting it.

<!-- TODO(James): outline open item. Are the foreign-keys and session-endpoint issues (#1763, and the FK fix in the
#1765 stack) fully closed today? Say so here if yes. -->

## A flake that was a production bug

`TestRequireAuth_SetsUserIDOnContext` was flaky in CI. Flaky tests are easy to retry and forget, and this one was
hiding a real bug.

SQLite was opening every connection with no busy handler. After every request, `trackDevice` fires an async upsert,
so the next request's session lookup could fail with `SQLITE_BUSY`. And `requireAuth` can't tell a busy database from
a bad token, so it answered 401 and logged the user out. Instrumented locally, it looked like this:

```text
req 3: code=200 getSession err=database is locked (5)
req 4: code=401
```

The fix was one DSN parameter, `_pragma=busy_timeout(5000)`, plus a regression test that holds a write lock for 200ms.
It went green at `-count=50`, where before it had failed within 30 runs
([issue #1818](https://github.com/autobutler-org/quark/issues/1818),
[PR #1819](https://github.com/autobutler-org/quark/pull/1819)).

## Things no test was going to catch

Some misses weren't about tests at all.

**A PR merged without its change.** [PR #2177](https://github.com/autobutler-org/quark/pull/2177) went in without the
home-folder change it was supposed to carry. It was found because I said, "Hold on, I may have merged without that
change. cross-reference main."

**A dev database that wiped itself.** I hopped from a branch with migrations 013 and 014 back to one that topped out
at 012. At startup, `staleMigrationState` saw the mismatch and called `ResetDatabase`, silently, destroying the
accounts and grants on my dev box. What I typed at the time was "What the heck is going on? It is trying to make me
create a new user on startup."

**The state machine with no tests.** Drag-and-drop upload had zero widget tests, and it shipped two user-visible bugs
in one sitting. Claude declined to add a regression test for it, and said why: "I'm not adding one, and I want to be
straight about why." Testing it needed the decoupling work in
[issue #1600](https://github.com/autobutler-org/quark/issues/1600) first. I'd rather have that sentence than a test
that can't fail.

## The 74-second merge race

This is my favorite, because nothing could have caught it except a habit.

[PR #2148](https://github.com/autobutler-org/quark/pull/2148) was stacked on `feat/1909-account-actions-ui`. That base
branch squash-merged to main at 06:15:01Z. PR #2148 merged at 06:16:15Z, 74 seconds later, into a base that no longer
went anywhere. Main was left in a broken in-between state.

It surfaced because an agent was sent to rebase 21 open PRs, and before it rewrote anything it checked the premises
of its own brief. It stopped and reported: "STOPPED before any push or GitHub mutation... Two of the briefs' premises
proved false." We re-landed the fix as [PR #2149](https://github.com/autobutler-org/quark/pull/2149).

## The discard rate

The last miss is volume. Here is every author's rate of PRs closed without merging:

| Author | PRs opened | Closed unmerged | Rate |
| --- | --- | --- | --- |
| Me (jamesaorson) | 566 | 9 | 2% |
| Exo (exokomodo-bot) | 316 | 75 | 24% |
| Copilot's coding agent | 5 | 5 | 100% |

Nearly a quarter of what Exo opened in the Openclaw era was thrown away, and several of its branches sat more than 300
commits stale before anyone rebased them. That is the cost of parallelism nobody puts on a slide.

The rest of the ledger, across 1,090 commits: 65 "fix CI" commits and 7 reverts.

## What this says about trust

Look back at the list. The session endpoints had tests; the tests mounted the wrong router. The perf suite ran; it had
no gate. The schema had cascades; the pragma was off. SMB worked; nothing tested it afterward. None of these was an
agent slipping something past a check. Each was a place where no check existed.

So the trust claim stays narrow. We trust what the gates check. When something slips through, the fix is a new gate,
and the agents are very good at writing those once you point them at the hole.

## Copy this

- Mount your real middleware in integration tests. A bare router in a test is a test of a different program.
- Give every performance harness a latency gate. A tool that exits 0 on timeout will report the outage as a record.
- Turn on `PRAGMA foreign_keys=ON`, or your database's equivalent. Check it, don't assume it.
- When an agent says a test can't be written yet, make it say why in the PR body and file the blocker.
- When you fix a test, break the code on purpose and watch the test fail.
- Publish your discard rate. It's the number that tells you what parallelism actually costs.

## What's next

The last post is about the bill: what all of this costs in money and hours, and the handful of things that still make
me open a diff.

As always, we love you all and we want to build stuff for you. Feel free to reach out anytime.

Grace and peace,
James <!-- TODO: byline/disclosure, this draft was written by Claude -->

---

This is part 8 of 9 in our series on how we build Quark with AI agents.

← Previous: [When the agent is wrong](/blogs/when-the-agent-is-wrong)

Next: [The bill, and what the human still does](/blogs/the-bill-and-what-the-human-still-does) →

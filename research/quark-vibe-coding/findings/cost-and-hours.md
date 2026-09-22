# Quark: AI cost and human hours

Measurement window: **2026-08-25 through 2026-09-21** (28 days, four full 7-day blocks).
Compiled 2026-09-21 from local Claude Code transcripts, the local prompt history, and read-only git/gh queries against `autobutler-org/quark`.

## Headline

| Metric | Value |
|---|---|
| API-equivalent AI cost, 28 days | **$1,990.30** |
| Assistant messages (deduped) | 18,865 |
| Human active hours | **70.6** (17.7 / week) |
| Merged PRs | 294 |
| Commits on `main` | 306 |
| Cost per merged PR | **$6.77** |
| Cost per commit | **$6.50** |
| Cost per human hour | $28.19 |
| Releases tagged | 26 |

---

## 1. Token usage

### Method

Source: every `*.jsonl` under the five project transcript directories
`~/.claude/projects/-Users-jamesaorson-github-com-autobutler-org-{quark,quark-2,quark-3,iac,quark-autobutler-org}/`.
Top-level `*.jsonl` files are main-thread sessions; files inside a `<session-id>/` subdirectory are subagent transcripts. Both are included and reported separately.

Every line with `type == "assistant"` contributes `message.usage`. Timestamps are bucketed to local calendar days.

**Dedupe.** 23,609 of 42,474 candidate lines were duplicates and were dropped. The duplication is *not* streaming chunks: Claude Code writes one line per content block, so a single assistant turn that produced a `thinking` block plus two `tool_use` blocks appears as three lines — each carrying the **same whole-turn `usage` object**. Verified on a sample: 132 duplicated message ids, all within a single file, all with byte-identical `input_tokens` / `output_tokens` / `cache_read_input_tokens`. Counting every line would have inflated cost roughly 2.2x. Dedupe keeps the **first line per `message.id`** across the whole corpus (global, not per-file), which also collapses turns replayed into resumed-session files. 14 `<synthetic>`-model lines (no real API call) were dropped.

Cache writes are split by TTL from `usage.cache_creation.ephemeral_5m_input_tokens` / `ephemeral_1h_input_tokens`; where that breakdown is absent the flat `cache_creation_input_tokens` is charged at the 5-minute rate.

One stray day (2026-08-24, 133 messages) falls outside the window and is excluded.

### Totals for the window

| Token class | Tokens | Cost |
|---|---:|---:|
| Input (uncached) | 120,355 | $0.62 |
| Output | 5,637,207 | $150.37 |
| Cache write, 5-min TTL | 44,042,992 | $273.74 |
| Cache write, 1-hour TTL | 19,291,821 | $210.71 |
| Cache read | 2,717,739,841 | $1,354.85 |
| **Total** | **2,786,832,216** | **$1,990.30** |

Cache reads are 97.5% of all tokens and 68% of the cost. This is the signature of long agentic sessions: every turn re-sends the whole growing conversation, repriced at 0.1x.

### By model

| Model | Messages | Output tok | Cache read tok | Cost |
|---|---:|---:|---:|---:|
| `claude-opus-5` | 18,251 | 5,258,404 | 2,650,804,294 | $1,905.41 |
| `claude-fable-5-1` | 357 | 270,644 | 41,477,607 | $50.82 |
| `claude-fable-5` | 127 | 107,460 | 17,501,658 | $31.59 |
| `claude-sonnet-5` | 122 | 682 | 7,805,671 | $2.40 |
| `claude-haiku-4-5` | 8 | 17 | 150,611 | $0.09 |

Opus 5 is 95.7% of the bill.

### Main thread vs subagents

| | Messages | Cost | Share |
|---|---:|---:|---:|
| Main thread | 6,893 | $902.47 | 45.3% |
| Subagents | 11,972 | $1,087.82 | 54.7% |

Subagents are the majority of both messages and spend. Note the TTL split: all 19.3M 1-hour cache writes are main-thread (long sessions with human think-time between turns); subagents run start-to-finish on the 5-minute default.

### Pricing used

List prices per million tokens, taken from the `claude-api` skill's model table and pricing-multiplier notes (not from memory):

| Model | Input | Output | Cache write 5m (1.25x) | Cache write 1h (2x) | Cache read |
|---|---:|---:|---:|---:|---:|
| Opus 5 | $5.00 | $25.00 | $6.25 | $10.00 | $0.50 (0.1x) |
| Fable 5 | $10.00 | $50.00 | $12.50 | $20.00 | $1.00 (0.1x) |
| Fable 5.1 | $10.00 | $50.00 | $12.50 | $20.00 | $0.25 (0.025x) |
| Sonnet 5 | $2.00 | $10.00 | $2.50 | $4.00 | $0.20 (0.1x) |
| Haiku 4.5 | $1.00 | $5.00 | $1.25 | $2.00 | $0.10 (0.1x) |

> **This is an API-equivalent figure, not a bill.** It is what these exact tokens would have cost at published list prices if they had gone through the Claude API. If the account is on a Claude subscription plan, the real spend is the subscription price and nothing else — the $1,990.30 is the counterfactual, and it is the honest way to size the work, not the receipt.

### Per day

| Date | Msgs | Cost | | Date | Msgs | Cost |
|---|---:|---:|---|---|---:|---:|
| 2026-08-25 | 604 | $101.70 | | 2026-09-09 | 323 | $25.47 |
| 2026-08-26 | 291 | $33.36 | | 2026-09-10 | 1,122 | $92.51 |
| 2026-08-27 | 1,177 | $130.71 | | 2026-09-11 | 1,150 | $110.16 |
| 2026-08-28 | 2,555 | $192.60 | | 2026-09-14 | 1,849 | $316.02 |
| 2026-08-29 | 545 | $48.78 | | 2026-09-15 | 451 | $67.63 |
| 2026-08-31 | 1,180 | $122.83 | | 2026-09-17 | 127 | $20.68 |
| 2026-09-01 | 191 | $12.30 | | 2026-09-18 | 931 | $152.19 |
| 2026-09-03 | 827 | $74.86 | | 2026-09-19 | 1,759 | $176.57 |
| 2026-09-04 | 1,217 | $113.10 | | 2026-09-21 | 1,673 | $123.77 |
| 2026-09-05 | 554 | $51.93 | | | | |
| 2026-09-07 | 339 | $23.49 | | | | |

20 days with AI activity out of 28. The single most expensive day is 2026-09-14 at $316.02.

### Per week

| Week | Msgs | Main $ | Subagent $ | Total |
|---|---:|---:|---:|---:|
| Aug 25 – Aug 31 | 6,352 | $415.41 | $214.22 | **$629.63** |
| Sep 1 – Sep 7 | 3,128 | $76.46 | $199.22 | $275.68 |
| Sep 8 – Sep 14 | 4,444 | $166.85 | $377.30 | $544.15 |
| Sep 15 – Sep 21 | 4,941 | $243.75 | $297.09 | $540.84 |

---

## 2. Human hours

### Method

Source: `~/.claude/history.jsonl`, one line per typed prompt, with a millisecond `timestamp` and a `project` path. Filtered to projects whose path contains `quark` or `autobutler` — this captures `quark`, `quark-2`, `quark-3`, `quark.autobutler.org`, `autobutler`, `autobutler.org`, and `iac`, 1,053 prompts spanning 2026-07-18 to 2026-09-21.

Active time is estimated as: **sum of gaps between consecutive prompts that are shorter than 30 minutes, plus a fixed 10-minute tail for each session break** (a gap of 30 minutes or more, plus the final prompt of the range). The 10-minute tail credits the work done after the last prompt of a stretch before the human walked away. This is a lower bound on wall-clock and an upper bound on nothing — it counts only time bracketed by typing, so long unattended agent runs that the maintainer watched are undercounted, and a prompt fired off during a meeting is overcounted.

### Window totals

| Metric | Value |
|---|---:|
| Prompts | 958 |
| Active hours | 70.6 |
| Sessions (gaps ≥ 30 min) | 70 |
| Distinct active days | 20 |
| Prompts per active day | 47.9 |
| Hours per active day | 3.5 |
| Hours per week | 17.7 |

### Per week

| Week | Prompts | Hours | Active days |
|---|---:|---:|---:|
| Aug 25 – Aug 31 | 305 | **25.2** | 6 |
| Sep 1 – Sep 7 | 92 | 8.9 | 5 |
| Sep 8 – Sep 14 | 259 | 15.8 | 4 |
| Sep 15 – Sep 21 | 302 | 20.8 | 5 |

**Busiest week: Aug 25 – Aug 31**, at 25.2 active hours across 6 days and 305 prompts — 36% of the window's human time. It is also the most expensive AI week. The single heaviest day in the whole history is 2026-09-21 at 8.5 hours and 150 prompts.

### Longer history (context, outside the priced window)

Prompt history reaches back to 2026-07-18, before the transcript retention cliff. Total across that whole span: **1,053 prompts, 79.9 active hours, 28 active days, 84 sessions.** So 88% of all recorded Quark human time falls inside the 28-day priced window — the project's intensity ramped hard in late August.

| Week | Prompts | Hours |
|---|---:|---:|
| Jul 13 – Jul 19 | 9 | 0.4 |
| Jul 20 – Jul 26 | 5 | 0.9 |
| Jul 27 – Aug 2 | 1 | 0.2 |
| Aug 10 – Aug 16 | 42 | 3.6 |
| Aug 17 – Aug 23 | 20 | 2.7 |
| Aug 24 – Aug 30 | 253 | 20.8 |
| Aug 31 – Sep 6 | 156 | 14.4 |
| Sep 7 – Sep 13 | 191 | 10.7 |
| Sep 14 – Sep 20 | 226 | 17.6 |
| Sep 21 | 150 | 8.5 |

---

## 3. Local usage report

`~/.claude/usage-data/` holds one report, `report-2026-09-11-003859.html` (and an identical `report.html`). It is a qualitative "Claude Code Insights" narrative — coaching on workflow patterns. **It states no hours, no cost, and no token figures**, so it contributes nothing numeric to this ledger.

The one quantitative line it does carry is a useful cross-check: *"829 messages across 70 sessions (80 total) | 2026-08-13 to 2026-09-11."* That counts main-thread sessions over a different, overlapping window, and is consistent in order of magnitude with the 70 prompt-gap sessions measured above.

---

## 4. Output shipped

Source: read-only `git log` and `gh pr list` against the local `quark` clone. No checkout, pull, or stash. `main` is linear (squash merges), so first-parent and full commit counts are identical.

| Metric | Window total | Method |
|---|---:|---|
| Merged PRs | 294 | `gh pr list --state merged`, filtered on `mergedAt` in window |
| Commits on `main` | 306 | `git log main --since --until` |
| Lines added | 166,329 | `git log --numstat` sum |
| Lines removed | 48,569 | `git log --numstat` sum |
| Net lines | +117,760 | |
| Go test funcs added | 624 (net +475) | added lines matching `func Test[A-Z_]`, minus removed |
| Dart tests added | 1,130 (net +1,094) | added lines matching `\b(test\|testWidgets)\(`, minus removed |
| **Test functions, net** | **+1,569** | |
| Releases tagged | 26 | tags `v0.31.1` … `v0.40.3` by creator date |

Test counts are diff-line greps, so a test renamed or moved between files counts as one removal plus one addition and nets to zero — the net figure is the honest one, the gross is the upper bound.

### Cost per unit of output

| Metric | Value |
|---|---:|
| Cost per merged PR | **$6.77** |
| Cost per commit | **$6.50** |
| Cost per release | $76.55 |
| Cost per net test function | $1.27 |
| Cost per 1,000 lines added | $11.97 |
| Human minutes per merged PR | 14.4 |

### Per week, cost against output

| Week | Cost | Commits | Lines +/− | Cost/commit | Human hrs |
|---|---:|---:|---:|---:|---:|
| Aug 25 – Aug 31 | $629.63 | 66 | +38,013 / −21,998 | $9.54 | 25.2 |
| Sep 1 – Sep 7 | $275.68 | 35 | +34,087 / −15,110 | $7.88 | 8.9 |
| Sep 8 – Sep 14 | $544.15 | 57 | +32,795 / −5,717 | $9.55 | 15.8 |
| Sep 15 – Sep 21 | $540.84 | 148 | +61,434 / −5,744 | **$3.65** | 20.8 |

The last week is the interesting one: roughly flat spend against **2.6x the commits** of the week before, and cost per commit down 62%. Note also that removals collapse after the first fortnight (22K lines deleted in week 1 vs 5.7K in week 4) — the early weeks were partly rework, the later weeks mostly accretion.

---

## 5. Extrapolation

**Monthly projection.** The window is 28 days at $1,990.30, i.e. $71.08/day or $497.58/week. Scaled to an average calendar month (30.44 days): **≈ $2,164/month** API-equivalent, at this intensity. Human side: **≈ 76.8 hours/month**, or 17.7 hours/week.

Straight-line projection from four weeks is a weak instrument here — weekly spend ranged from $275.68 to $629.63, a 2.3x spread — so treat $2,164 as a midpoint with roughly ±35% week-to-week variance, not a forecast.

**Peak week's share of the Aug 25 – Sep 21 output.** The peak is a different week depending on which side of the ledger you look at, which is itself the finding:

| Measure | Peak week | Peak value | Window total | Share |
|---|---|---:|---:|---:|
| AI cost | Aug 25 – Aug 31 | $629.63 | $1,990.30 | **31.6%** |
| Human hours | Aug 25 – Aug 31 | 25.2 | 70.6 | **35.7%** |
| Commits | Sep 15 – Sep 21 | 148 | 306 | **48.4%** |
| Lines added | Sep 15 – Sep 21 | 61,434 | 166,329 | **36.9%** |
| Assistant messages | Sep 15 – Sep 21 | 4,941 | 18,865 | 26.2% |

Cost and human effort peaked in the **first** week; shipped output peaked in the **last**. Nearly half of all commits in the four weeks landed in the final seven days, on spend 14% *below* the first week's. Whatever changed — the workflow, the subagent fan-out, the maturity of the codebase — the last week got roughly 2.6x the throughput per dollar.

---

## 6. Caveats

Read these before quoting any number above.

- **The 30-day survival window is the hard limit.** Claude Code transcripts are pruned on a default retention, so only 2026-08-25 onward survives. Quark work started well before that — the prompt history reaches back to 2026-07-18 and the repo further still. **Every AI cost figure here is for 28 days only and is not the project's lifetime cost.** The true lifetime figure is strictly larger and is not recoverable from this machine.
- **API-equivalent pricing is not a bill.** $1,990.30 is what these tokens would have cost at Anthropic's published list prices. If the account runs on a Claude subscription, the actual spend is the subscription price and this number never appeared on a statement. Say which one you mean when you publish it.
- **Grok and Openclaw costs are unknown.** Neither leaves a transcript or usage record on this machine, so neither is in any total here. If they carried meaningful load, the AI cost is understated — by how much, only the maintainer's own billing can say. **These numbers need his figures before the total is complete.**
- **Hours are prompt-gap estimates, not a timer.** Nothing clocked this work. The 70.6 hours is inferred from the spacing of typed prompts, with a 30-minute session cutoff and a 10-minute tail per session. It undercounts time spent reading agent output, reviewing diffs, or watching a long run without typing; it overcounts a prompt fired off mid-meeting. Treat it as ±25% and as a measure of *engaged* time, not calendar time.
- **Deduplication is a judgment call, though a well-evidenced one.** Cost depends on counting each API turn once. Duplicate lines were verified to be content-block splits carrying identical whole-turn usage, so keeping the first per `message.id` is correct — but if Claude Code's transcript format ever wrote genuinely distinct usage under a repeated id, this would undercount.
- **Project attribution is by directory, not by intent.** The `iac`, `autobutler`, and `autobutler.org` directories are folded into the "Quark" totals because they are the same effort; conversely, Quark work done from an unrelated directory is missed.
- **Test counts are greps over diff lines.** A renamed or relocated test nets to zero; a commented-out test still counts. The net figure is the defensible one.
- **Cost-per-PR is an average over very unlike PRs.** A one-line typo fix and a multi-day feature both count as one merged PR. $6.77 is the mean, and the distribution behind it is wide.

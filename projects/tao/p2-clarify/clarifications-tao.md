# Clarifications — TAO Dealer Website Scraping: Pre-fill Dealer Details Review (TAO-DWS-001)

**Product:** ARC  |  **Feature slug:** tao  |  **Phase:** Clarify (Phase 2)
**Brief:** `p1-intake/design-brief-tao.md`
**Date:** 2026-09-03

---

## Completeness Score: 78 / 100

**Band:** 75–89 — Brief is solid but has gaps. Flows and edge cases are mostly clear, but one explicit unresolved conflict and several structural UX decisions are not yet specified.

### Score breakdown

| Dimension | Score | Rationale |
|---|---|---|
| User flows (happy + edge) | 88 | 6 identified flows, 11 edge cases on the primary surface alone. Very thorough. Minor gap: no flow defined for TOC sync failure (only "not yet complete" is covered). |
| Screen inventory | 90 | Both surfaces (Dealer Admin review screen, IM provisioning list view) are clearly scoped with distinct RBAC. |
| Data & states | 76 | Empty/loading/timeout/confidence-suppression/rate-limit states are unusually well specified. Docked for: no defined behavior on outright TOC sync failure, and no defined behavior for editing after final submit. |
| UX interactions (confirm/edit/retry/override) | 68 | Per-field accept/reject, manual re-scrape, and alternate-URL flows are specified. Not specified: bulk accept/reject for multi-field diffs, how the compound Operating Hours field renders as a comparison row, and whether alternate-URL submission shares the re-scrape rate limit. |
| Personas | 85 | Dealer Admin and IM are both described with tasks, priorities, pain points, and explicit decision authority (RBAC). No dedicated persona knowledge-base files exist in this workspace to cross-check against (only an unfilled `_template.md`), so this rests entirely on the brief's own inline persona write-ups — which are detailed enough to design from. |
| Business rules / constraints | 88 | Extensive hard invariants (read-only scraping, confirmation-required, RBAC, rate limits, thresholds, data residency). Docked for the one explicit self-contradiction flagged below. |

**Overall:** 78/100 — clears the ≥75 PASS threshold for this run, but the unresolved conflict (Gap 1) and the UX-interaction gaps are real design-affecting decisions and are surfaced as full questions below rather than silently assumed.

**Note on product knowledge context:** `knowledge/products/ARC/*.md` (overview, design-principles, constraints, copy-guidelines) and `knowledge/personas/_template.md` in this workspace are all still unfilled templates (placeholder bracket text throughout) — there was no populated ARC product context or Dealer Admin/IM persona file to load. This analysis is based entirely on the brief's own content, which is unusually self-contained for an ISD-sourced brief.

---

## Critical gaps

**None.** No gap in this brief blocks a designer from producing a correct flow or screen — every open item below either has a clean, PM-answerable question or a safe default assumption.

---

## Clarifying questions (formulated, unanswered — see `clarify-tao.html`)

1. **Scrape-failure messaging conflict** — The rendering declaration (§8.1) specifies a fallback message ("We couldn't find your details automatically — please fill in below"), but DWS-SI-05 / POL-TAO-DWS-001-004 state scrape failure is explicitly *not* a degraded state and no message should be shown. Which governs?
2. **Post-submission editability** — Can the Dealer Admin still change details after clicking Confirm/Submit, or is the screen locked?
3. **TOC sync failure (not just "pending")** — What should the Dealer Admin see if TOC sync fails outright rather than just being incomplete?
4. **Bulk accept/reject** — For dealers with many field diffs, is there a bulk "use all website values" / "keep all on file" control, or is it strictly field-by-field?
5. **Rate-limit scope** — Does submitting an alternate URL via "Try a different website" share the same 5-minute rate limit as the manual re-scrape trigger, or is it separate?
6. **Operating Hours comparison rendering** — Operating Hours is tracked per department across 7 days; how should this structured field render as a comparison row (one row per department, one row per day, or a separate expandable section)?

Full option sets for each are in `clarify-tao.html`.

---

## Gaps & Assumptions (non-critical, carried forward if left unanswered)

- **Dealer Details screen completion time KPI baseline is TBD** ("measure at TAO V1 launch") — no design impact; this is a measurement/analytics gap, not a screen or flow decision. Carried forward as-is.
- **Form validation error rate KPI baseline is TBD** — same as above, no design impact.
- **Banner Logo comparison display** — the source says logos are "compared as URL presence only, not visually." Assumption: render this as a simple presence indicator (e.g., "✓ Logo found on website") with no thumbnail preview in MVP, consistent with that note.
- **Retry-limit messaging** — the source gives only the static copy "Please wait before retrying" with no countdown specified. Assumption: a static message is sufficient for MVP; no live countdown/timer UI is required.
- **Retry immediacy after a rejected alternate URL** — assumption: a domain block-list or business-name-mismatch rejection is a validation failure, not a scrape, so the Dealer Admin can immediately try another URL without waiting on the 5-minute scrape rate limit (pending the answer to Q5 above, which could change this).

---

## Status

**PASS at 78/100** (meets the ≥75 threshold for this run). No critical gaps block progression. The 6 questions above are recommended before finalizing screen layouts for the comparison-row and Operating-Hours states, since they materially affect layout and copy — but they don't block moving forward with flows/spec work on the parts of the screen they don't touch.

Open the interactive form to answer: `clarify-tao.html` (same directory).

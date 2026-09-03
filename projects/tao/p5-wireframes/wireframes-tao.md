# Wireframes: TAO — Dealer Website Scraping: Pre-fill Dealer Details Review (TAO-DWS-001)

**Product:** ARC &middot; **Feature slug:** tao &middot; **Phase:** Wireframes (Phase 5)
**Spec:** `p4-spec/spec-tao.md`
**Rendered wireframes:** `p5-wireframes/wireframes-tao.html`
**Date:** 2026-09-03

---

## Task 1: IM Dealer List — Scrape Preview Column (read-only)
**Flow context:** Flow 1 (IM Provisioning Preview) — only task in this flow; the sole IM-facing surface.
**Layout direction:** Default — data table with an appended "Website Preview" column group, expandable inline per row (contract/TOC value vs. website-found value), no action column. Sync-status and diff-classification shown via badges.

## Task 2: Dealer Details Review — Baseline Load + Contract Prefill (Loading State)
**Flow context:** Flow 2 (Reviews Prefill With Website Diffs) — first task in this flow; reused as the entry point for Flows 3, 4, 5, and 9 (all begin with the same TOC-sync-gated screen open).
**Layout direction:** Default single-column loading state — skeleton bars standing in for the blocked form, disabled Confirm/Submit.

## Task 3: Dealer Details Review — Website Comparison View With Diffs
**Flow context:** Flow 2 (Reviews Prefill With Website Diffs) — reached from Task 2 on "TOC sync completes, scrape runs — diffs found." Also the destination of Flow 6's "validation passes — fresh comparison built" branch.
**Layout direction:** Default two-column comparison layout — left/right value pairing per field ("On file" vs. "Found on your website"), per-field Yes/Keep-on-file controls, collapsible Mon–Sun Operating Hours accordion per department.

## Task 4: Dealer Details Review — All-Match / No-Diff State
**Flow context:** Flow 3 (Reviews Prefill, All Fields Match) — reached from Task 2 on "scrape completes — all fields match."
**Layout direction:** Default single-column form, visually identical to the contract-only baseline plus quiet checkmarks on dual-source fields; scrape-only fields with no confident match remain plain editable inputs.

## Task 5: Dealer Details Review — No-Website Contract-Only State
**Flow context:** Flow 4 (Reviews Contract-Only Prefill, No Website) — reached from Task 2 on "no website URL on file."
**Layout direction:** Default single-column prefilled form, no comparison UI, no degraded messaging; scrape-only fields render as empty inputs awaiting manual entry.

## Task 6: Dealer Details Review — Silent Scrape Failure State
**Flow context:** Flow 5 (Reviews Prefill After Silent Scrape Failure) — reached from Task 2 on "scrape fails, times out, or robots.txt blocks it."
**Layout direction:** Default single-column form, identical markup pattern to Task 5 (functionally indistinguishable per AC) — no error banner, no fallback message anywhere on the screen.

## Task 7: Alternate URL Input + Validation Flow
**Flow context:** Flow 6 (Alternate URL Passes Validation) — first task in this flow, entered via "Try a different website" from Tasks 5/6. Also exercised (same screen, different validation outcomes) by Flow 7 (Alternate URL Fails Validation).
**Layout direction:** Default single-column input + stacked state panels — inline URL entry, borderline-match confirmation (inline, non-overlay), domain-block error banner, name-mismatch error banner.

## Task 8: Manual Re-Scrape Trigger (/prefill-dealer-details) + Rate Limit
**Flow context:** Flow 8 (Dealer Admin Manually Re-Triggers Scrape) — only task in this flow.
**Layout direction:** Default single-column toolbar action + stacked state panels — icon-button trigger, rate-limit banner (static message, no countdown), success/fallback outcomes cross-referenced to Tasks 3 and 5/6.

## Task 9: TOC Sync Loading / Blocked State — Persistent Failure + Escalation
**Flow context:** Flow 9 (Dealer Admin Blocked by Incomplete or Failed TOC Sync) — reached from Task 2's loading state on "sync fails, retries exhausted."
**Layout direction:** Default single-column blocked-state panel — "still preparing your details" framing, no raw error detail, Contact Support CTA plus IM-escalation note.

---

*Layout structure and component placement live in `wireframes-tao.html`; field lists and acceptance criteria live in `spec-tao.md`. This manifest only records flow context and layout direction per task.*

*Powered by Tekion Design*

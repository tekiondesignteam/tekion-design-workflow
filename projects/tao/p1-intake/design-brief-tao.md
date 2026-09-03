# Design Brief: TAO — Dealer Website Scraping: Pre-fill Dealer Details Review (TAO-DWS-001)

**Designer:** gjayabalan@tekion.com  |  **Product:** ARC  |  **Generated:** 2026-09-03
**Sources:**
- `TAO-DWS-001 — Dealer Website Scraping_ Pre-fill Dealer Details Review-020926-042114.pdf` (31-page ISD, v1.1, PM-002 Score 94/100, Gate: PASS_GA)
- `tao-dws-001-extracted.txt` (full extracted text of the above PDF, used as the primary read source)

---

## Overview

TAO-DWS-001 eliminates the blank-form experience on the TAO Dealer Details Review screen for every dealer, regardless of whether they have a public website. At provisioning, TAO reads dealer details already captured in Salesforce and synced into TOC (Tekion Operating Cloud) — this always-present baseline (Layer 1) guarantees the screen is never blank. For dealers with a public website, TAO additionally scrapes it (Layer 2) and shows the Dealer Admin a field-by-field before/after comparison against the on-file record, so the Dealer Admin only reviews and confirms differences rather than retyping information Tekion already has. This ships as part of TAO V1 (MVP, no phased rollout), with a secondary read-only preview surface for the Implementation Manager (IM) during provisioning.

---

## People & their stakes

### Dealer Admin
**Role:** Primary dealership-side owner; completes the TAO journey end-to-end.
- **Tasks:** Opens the Dealer Details Review screen; reviews the prefilled baseline; accepts or rejects website comparison rows field-by-field; can provide a corrected/alternate website URL via "Try a different website"; confirms final values once to proceed.
- **Priorities:** Not re-typing data Tekion already has; trusting that prefilled/suggested values are accurate; moving through onboarding quickly.
- **Pain points:** Historically opens a review screen that is ~100% blank (baseline blank-field rate stated in the source) and must manually type everything.
- **Talks like:** "Prefill my dealership info," "Use my website to fill in these details," "Look up my dealership," "Fill in my address from my website."
- **Needs to see:** Which values came from Tekion's records vs. the website; a clear on-file/found-on-website comparison per field; a quiet indicator when nothing changed; a clear rejection message when a provided URL doesn't match their dealership.
- **Decision authority:** Only the Dealer Admin can confirm/save final dealer details (explicit RBAC rule). Any manual edit silently overrides a prefilled or scraped value — the Dealer Admin is always the source of truth.

### Implementation Manager (IM)
**Role:** Tekion-side operator who sees the dealer pipeline and provisions dealers.
- **Tasks:** Opens the provisioning queue / dealer list view; views a read-only inline comparison preview (contract value vs. website-found value, per field) for each dealer before the Dealer Admin journey begins.
- **Priorities:** Verifying dealer info readiness ahead of handoff to the Dealer Admin.
- **Needs to see:** Contract/TOC values side-by-side with website-scraped values, inline in the dealer list row, with differences highlighted.
- **Decision authority:** None — this surface is read-only and informational only. IM cannot confirm, edit, or save dealer details; the write endpoint hard-rejects any save call flagged as IM-provisioning-sourced.

---

## Context & environment

- Expected volume: 1 TOC-sync invocation per dealer provisioning + 1 scrape per Dealer Admin session.
- Scrape timeout: hard 5000ms (5s), enforced async so it never blocks screen load.
- Screen load latency requirement: the Dealer Admin screen must render from Layer 1 (TOC) data in **< 500ms**; Layer 2 (scraping) runs asynchronously and never blocks.
- Rate limiting: max 1 auto-scrape per (dealership_id, session); max 1 user-triggered re-scrape per 5 minutes per dealership.
- Confidence threshold: scraped fields below **0.80** confidence are suppressed from the comparison entirely (no warning shown — they simply don't appear).
- URL fuzzy-match thresholds (for Dealer Admin-provided alternate URLs): **< 0.70** → reject; **0.70–0.85** → confirmation prompt; **≥ 0.85** → accept silently.
- Data residency: scraped data cached/stored in US region only for MVP.
- Post-launch monitoring targets: scrape success rate ≥ 50%; timeout rate ≤ 10%; Dealer Admin edit rate on prefilled fields < 25%.

---

## How it works today, vs. with this

**Today**
- The Dealer Details Review screen is blank at open — baseline blank-field rate at screen open is stated as ~100% ("all fields blank today").
- Dealer Admin manually types in every field, including data Tekion already has on file from the signed contract.

**With this**
- Layer 1 (TOC/contract sync) guarantees the screen is never blank for any dealer, with or without a website — all fields prefill from the merged internal record labelled "From your records on file."
- Layer 2 (website scraping) additively surfaces a field-by-field before/after comparison for dealers with a public website, so the Dealer Admin confirms/accepts differences instead of retyping.
- No dealer is left with a blank form; small dealers with no website get a fully prefilled contract-only view with no degraded messaging.

---

## Product surfaces

### Surface: Dealer Details Review Screen (Dealer Admin)

**How it works:**
1. Screen load is blocked until TOC sync (DWS-SI-00 / DWS-SI-01a) completes for the dealer; if not complete, the Dealer Admin sees a loading state and cannot proceed.
2. All fields render pre-populated from the merged TOC/contract record, labelled "From your records on file" — the screen is never blank regardless of website presence.
3. If a dealer website URL exists on file (or was resolved from the IM's pre-scrape cache), TAO scrapes it in the background (5s timeout) without blocking the screen.
4. Scraped fields are classified as Match, Different, New, or Missing against the on-file record; only fields ≥0.80 confidence are surfaced.
5. Where the website found a different or new value: a side-by-side comparison row renders — "On file: [value] / Found on your website: [value] / Use website version? [Yes] [Keep on file]."
6. Where the website found the same value: a quiet "✓ Matches your website" checkmark shows — no action needed.
7. Where the website found nothing for a field: the on-file value shows alone, with no comparison row.
8. If no website URL exists, the scrape fails, or it times out: the screen shows the contract-prefilled form with no comparison rows and no error message — this is a first-class fallback, not a degraded state.
9. Dealer Admin can select "Try a different website" to submit an alternate/corrected URL; the URL must pass domain block-list and business-name fuzzy-match validation before a fresh scrape/comparison runs.
10. Dealer Admin can manually trigger a re-scrape (`/prefill-dealer-details`), rate-limited to 1 per 5 minutes per dealership.
11. Dealer Admin can edit any field directly; edited values silently replace prefilled ones — the Dealer Admin is always the source of truth.
12. Dealer Admin clicks Confirm/Submit; required fields are validated, and only then are final values persisted to the TAO dealer record, unblocking the next Configure Phase step.

**Scope:** Must-have — all flows on this screen (DWS-SI-00 through DWS-SI-08) ship in TAO V1 as MVP; the source states there is no separate phased rollout.

**Edge cases & states:**
1. No website URL on file → contract-only view; no comparison rows; explicitly not a degraded state.
2. Website behind auth / returns 403 or is otherwise unreachable → same as no-website case; silent fallback; no error shown.
3. Scrape exceeds the 5s timeout → screen already loaded from contract data; scrape simply times out silently, no blocking spinner.
4. Scraped field confidence below 0.80 (e.g., phone at 0.62 in the source's example) → field suppressed from comparison entirely.
5. All scraped fields match on-file data → all comparison rows suppressed; only quiet checkmarks shown.
6. Dealer-provided URL on domain block-list (e.g., google.com) → rejected immediately: "This doesn't look like a dealership website."
7. Dealer-provided URL's scraped business name similarity < 0.70 vs. contract dealership name → rejected post-scrape: "The website you provided doesn't appear to be for [Dealership Name]."
8. Dealer-provided URL fuzzy match 0.70–0.85 (borderline) → confirmation prompt: "We found [scraped name] on this website — is this your dealership?"
9. Dealer Admin submits with required fields empty → submit blocked, validation error shown.
10. Dealer Admin re-triggers scrape within the 5-minute debounce window → rejected: "Please wait before retrying."
11. TOC sync not yet complete when Dealer Admin opens the screen → loading state; Dealer Admin blocked from proceeding.

### Surface: IM Provisioning / Dealer List View (Implementation Manager)

**How it works:**
1. IM opens the provisioning queue / dealer list view in the TAO IM portal.
2. Once TOC sync (DWS-SI-00) completes for a dealer record with a website URL present, TAO proactively scrapes the dealer's website and builds a comparison map (DWS-SI-00b) — max 1 scrape per dealer record (re-scraped only if the Dealer Admin later provides a new URL).
3. IM sees a read-only inline comparison preview in the dealer list row: contract/TOC value vs. website-found value, per field, with differences highlighted.
4. IM cannot confirm, edit, or save any previewed values — purely informational, to help IM verify dealer readiness before the Dealer Admin journey begins.

**Scope:** Must-have — the source's rollout pre-launch gate explicitly requires "IM provisioning view updated to show scraped preview column."

**Edge cases & states:**
1. Dealer record has no website URL in contract data → the proactive scrape (DWS-SI-00b) does not run; IM sees TOC/contract values only, no comparison preview.
2. IM-triggered write/save attempts are hard-blocked at the write endpoint — any save call flagged as IM-provisioning-sourced is rejected (invariant).

---

## Content & data

**Comparable field set (16 fields, mapped across TOC baseline + scrape target):**
1. Dealer Business Name (Public) — TOC + scrape
2. DBA (Doing Business As) — scrape only
3. Street Address 1 — TOC + scrape
4. Street Address 2 — scrape only
5. City — TOC + scrape
6. State — TOC + scrape
7. ZIP Code — TOC + scrape
8. Phone — Main — TOC + scrape
9. Phone — Sales Department — scrape only
10. Phone — Service Department — scrape only
11. Phone — Parts Department — scrape only
12. Email — scrape only
13. Operating Hours — Sales (Mon–Sun) — scrape only
14. Operating Hours — Service (Mon–Sun) — scrape only
15. Operating Hours — Parts (Mon–Sun) — scrape only
16. Dealership Banner Logo — scrape only (compared as URL presence only, not visually)

Fields explicitly **not** scrapeable — collected from dealer/OEM directly, never shown in the website comparison: OEM Dealer ID, Federal EIN / Tax ID, Bank Details, OEM + Makes identity (website can confirm but is not the source).

**Microcopy specified in the source:**
- Baseline label: "From your records on file"
- Comparison diff row: "On file: [value] / Found on your website: [value] / Use website version? [Yes] [Keep on file]"
- Match indicator: "✓ Matches your website"
- Domain block-list rejection: "This doesn't look like a dealership website."
- Post-scrape name-mismatch rejection: "The website you provided doesn't appear to be for [Dealership Name]. Please check the URL and try again."
- Borderline match confirmation: "We found [scraped name] on this website — is this your dealership? [Yes, use this website] [No, try a different URL]"
- Rate-limit message: "Please wait before retrying"
- Generic scrape-fallback label (declared in the rendering spec, though see Conflicts & Gaps): "We couldn't find your details automatically — please fill in below"

---

## Identified Flows

- **Confirm prefilled details with website diffs:** Dealer Admin opens the review screen, sees the TOC baseline plus per-field website comparison rows, accepts or rejects each diff, and confirms final values.
- **Confirm a contract-only prefill:** Dealer Admin opens the review screen (no website on file, or scrape failed/timed out) and confirms the fully prefilled contract data with no comparison UI.
- **Provide an alternate/corrected website URL:** Dealer Admin uses "Try a different website" to submit a new URL, which must pass domain and business-name validation before a fresh comparison renders.
- **Manually trigger a re-scrape:** Dealer Admin invokes `/prefill-dealer-details` to refresh scraped data, subject to a 5-minute rate limit.
- **Resolve a borderline URL match:** Dealer Admin confirms whether a fuzzy-matched website (0.70–0.85 similarity) actually belongs to their dealership.
- **IM previews scraped dealer data during provisioning:** Implementation Manager views a read-only comparison of contract vs. website values in the dealer list before the Dealer Admin journey begins.

---

## Constraints & Requirements

- Screen must never be blank: TOC/contract data must sync into the TAO dealer record before the Dealer Admin can open the screen (hard invariant).
- Scraping is strictly read-only: HTTP GET only — never POST, form submission, authentication, or cookie storage (hard invariant).
- Scraping must respect `robots.txt`; if disallowed, skip the scrape silently.
- Only the dealer's own website URL (from contract, or a Dealer Admin-corrected alternate) may be scraped — no third-party lookups for MVP.
- No personal data is scraped — all fields are business-level public details.
- Dealer Admin confirmation is always required before save — no value is ever persisted without an explicit Dealer Admin submit action (A1 autonomy tier: suggest-only).
- RBAC: Dealer Admin can view, confirm, and provide an alternate URL. IM can only view a read-only scraped preview and cannot confirm or save.
- Cross-dealer isolation: scrape/comparison cache is keyed by (dealership_id, session_id) — no cross-dealer data leakage.
- "No website" is explicitly not a degraded state — no website-related messaging appears when there's no URL to scrape.
- "Scrape failure" is explicitly not a degraded state — fallback to the contract-prefilled form is silent, with no error shown to the Dealer Admin.

---

## Out of Scope

Web scraping is limited to the dealer's own contract-listed (or Dealer Admin-corrected) website only — **no third-party lookups or directory scraping for MVP**. Fields not publicly scrapeable — OEM Dealer ID, Federal EIN/Tax ID, Bank Details, and OEM+Makes identity confirmation — must be collected directly from the dealer or OEM and are out of scope for this screen's scraping layer. The Implementation Manager surface is view-only for this release: IM cannot confirm or save dealer details in any version of this feature. No auto-save of scraped or prefilled data is in scope — Dealer Admin confirmation is always required. This feature does not handle financial transactions, monetary values, GL coding, or reconciliation. Legal review of scraping scope is explicitly deferred until GA if the field set expands beyond the MVP list.

---

## Risks & Trade-offs

- Website not publicly accessible, behind auth, or has no contact page (High likelihood / Low impact) — mitigated by silent fallback to the contract-prefilled form.
- Scraped values are wrong or outdated (Medium / Medium) — mitigated by the ≥0.80 confidence gate plus mandatory Dealer Admin confirmation.
- Dealer website blocks scraping via `robots.txt` (Medium / Low) — mitigated by a pre-scrape robots.txt check with silent skip.
- Scrape is too slow (>5s) and blocks screen load (Low / High) — mitigated by a hard 5s timeout and async execution so the screen still loads immediately.
- Dealer has no website at all (High likelihood for small dealers / no negative impact) — explicitly treated as a first-class fallback, not a degraded state.
- Dealer Admin provides an intentionally or accidentally wrong URL (Low–Medium / High) — mitigated by domain block-list + business-name fuzzy match.
- Dealer Admin provides a group/HQ site instead of their rooftop's site (Medium / Medium) — mitigated by the borderline fuzzy-match (0.70–0.85) confirmation prompt.

---

## Conflicts & Gaps

- The rendering declaration (§8.1) specifies a fallback message "We couldn't find your details automatically — please fill in below" for the prefilled-fields surface, but the No-Scrape Path (DWS-SI-05) and its governing policy (POL-TAO-DWS-001-004) explicitly state that scrape failure is *not* a degraded state and *no error/message* should be shown to the Dealer Admin. These two statements appear to conflict on whether any fallback message is ever shown — worth confirming which governs, since the screen should almost never be in a state with zero data (TOC baseline is always present).
- The "Dealer Details screen completion time" KPI baseline is explicitly marked "TBD — measure at TAO V1 launch" in the source — the 40% reduction target has no baseline yet.
- The "Form validation error rate" KPI baseline is likewise explicitly marked "TBD — measure at TAO V1 launch" — the 60% reduction target has no baseline yet.

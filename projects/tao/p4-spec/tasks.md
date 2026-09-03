# tasks — tao

| AC | Task | Description | Status | Screen | Layout |
|---|---|---|---|---|---|
| AC-1 | Task 1 | Each dealer row shows TOC sync status before any comparison preview can appear | wireframes | Flow 1 / Task 1 | data table + inline preview column |
| AC-2 | Task 1 | Proactive scrape (once, 5s timeout) runs when TOC sync complete + website URL present | wireframes | Flow 1 / Task 1 | data table + inline preview column |
| AC-3 | Task 1 | No website URL → no proactive scrape, TOC/contract values only, no comparison preview | wireframes | Flow 1 / Task 1 | data table + inline preview column |
| AC-4 | Task 1 | Read-only inline comparison per field in the dealer list row, differences highlighted | wireframes | Flow 1 / Task 1 | data table + inline preview column |
| AC-5 | Task 1 | Fields below 0.80 confidence suppressed from IM's preview | wireframes | Flow 1 / Task 1 | data table + inline preview column |
| AC-6 | Task 1 | IM cannot edit, confirm, or save any previewed value — strictly read-only | wireframes | Flow 1 / Task 1 | data table + inline preview column |
| AC-7 | Task 1 | IM-provisioning-sourced save calls hard-rejected at the write endpoint | wireframes | Flow 1 / Task 1 | data table + inline preview column |
| AC-8 | Task 1 | Dealer record re-scraped only if Dealer Admin later provides a new URL | wireframes | Flow 1 / Task 1 | data table + inline preview column |
| AC-9 | Task 2 | Screen load blocked until TOC sync completes; loading state shown while incomplete | wireframes | Flow 2 / Task 2 | single-col skeleton (loading) |
| AC-10 | Task 2 | Fields prefill from merged TOC/contract record within 500ms, labelled "From your records on file" | wireframes | Flow 2 / Task 2 | single-col skeleton (loading) |
| AC-11 | Task 2 | Screen is never blank for any dealer regardless of website presence | wireframes | Flow 2 / Task 2 | single-col skeleton (loading) |
| AC-12 | Task 2 | Dealer Admin can edit any field directly; edit silently replaces prefilled/scraped value | wireframes | Flow 2 / Task 2 | single-col skeleton (loading) |
| AC-13 | Task 2 | Submit blocked with inline validation error if required fields empty/invalid | wireframes | Flow 2 / Task 2 | single-col skeleton (loading) |
| AC-14 | Task 2 | Successful submit persists values and forward-navigates to next Configure Phase step (one-way) | wireframes | Flow 2 / Task 2 | single-col skeleton (loading) |
| AC-15 | Task 2 | Outright TOC sync failure triggers automatic retry within a retry budget | wireframes | Flow 2 / Task 2 | single-col skeleton (loading) |
| AC-16 | Task 2 | System polls sync status automatically while pending, no manual refresh needed | wireframes | Flow 2 / Task 2 | single-col skeleton (loading) |
| AC-17 | Task 3 | Background scrape (5s timeout) runs if website URL exists, non-blocking | wireframes | Flow 2 / Task 3 | two-col comparison |
| AC-18 | Task 3 | Fields classified Match/Different/New/Missing; only ≥0.80 confidence surfaced | wireframes | Flow 2 / Task 3 | two-col comparison |
| AC-19 | Task 3 | Different/New value renders comparison row with "On file / Found on website / Use website version?" copy | wireframes | Flow 2 / Task 3 | two-col comparison |
| AC-20 | Task 3 | Matching value shows quiet "✓ Matches your website" checkmark, no comparison row | wireframes | Flow 2 / Task 3 | two-col comparison |
| AC-21 | Task 3 | Missing-on-website value shows on-file value alone, no comparison row | wireframes | Flow 2 / Task 3 | two-col comparison |
| AC-22 | Task 3 | Accept/reject decisions are strictly per-field — no bulk control | wireframes | Flow 2 / Task 3 | two-col comparison |
| AC-23 | Task 3 | Operating Hours render as one collapsible row per department, expanding to day-by-day diff | wireframes | Flow 2 / Task 3 | two-col comparison + accordion |
| AC-24 | Task 3 | Banner Logo compares as presence-only indicator, no thumbnail in MVP | wireframes | Flow 2 / Task 3 | two-col comparison |
| AC-25 | Task 3 | Every rendered comparison row must be resolved before proceeding to edit/submit | wireframes | Flow 2 / Task 3 | two-col comparison |
| AC-26 | Task 4 | No Different/New fields found → all comparison rows suppressed, only checkmarks shown | wireframes | Flow 3 / Task 4 | single-col + quiet checkmarks |
| AC-27 | Task 4 | All-match state visually matches contract-only baseline plus checkmarks, no extra messaging | wireframes | Flow 3 / Task 4 | single-col + quiet checkmarks |
| AC-28 | Task 4 | Dealer Admin can still edit fields even when everything matches | wireframes | Flow 3 / Task 4 | single-col + quiet checkmarks |
| AC-29 | Task 4 | Submit/validation/persist behavior identical to diff-found path | wireframes | Flow 3 / Task 4 | single-col + quiet checkmarks |
| AC-30 | Task 5 | No website URL on file → no scrape attempted at all, determined up front | wireframes | Flow 4 / Task 5 | single-col prefilled form |
| AC-31 | Task 5 | Fully prefilled contract-only form shown, no comparison rows, no degraded messaging | wireframes | Flow 4 / Task 5 | single-col prefilled form |
| AC-32 | Task 5 | Dealer Admin can select "Try a different website" to enter alternate-URL validation flow | wireframes | Flow 4 / Task 5 | single-col prefilled form |
| AC-33 | Task 5 | If no URL provided, Dealer Admin proceeds directly to edit/submit on contract-only data | wireframes | Flow 4 / Task 5 | single-col prefilled form |
| AC-34 | Task 6 | robots.txt disallows scraping → scrape skipped silently before any request | wireframes | Flow 5 / Task 6 | single-col prefilled form (identical to Task 5) |
| AC-35 | Task 6 | Scrape exceeding 5s timeout is aborted silently, no blocking spinner | wireframes | Flow 5 / Task 6 | single-col prefilled form (identical to Task 5) |
| AC-36 | Task 6 | Unreachable/auth-blocked/403 website → scrape fails silently | wireframes | Flow 5 / Task 6 | single-col prefilled form (identical to Task 5) |
| AC-37 | Task 6 | No error or fallback message ever shown on scrape failure; conflicting rendering-declaration copy does not apply | wireframes | Flow 5 / Task 6 | single-col prefilled form (identical to Task 5) |
| AC-38 | Task 6 | Resulting screen functionally identical to no-website state (Task 5) | wireframes | Flow 5 / Task 6 | single-col prefilled form (identical to Task 5) |
| AC-39 | Task 6 | Dealer Admin can still try a different website or manually re-trigger scrape from this state | wireframes | Flow 5 / Task 6 | single-col prefilled form (identical to Task 5) |
| AC-40 | Task 7 | Dealer Admin selects "Try a different website" and enters a candidate URL | wireframes | Flow 6 / Task 7 | single-col input + stacked states |
| AC-41 | Task 7 | Shared 5-minute rate-limit check runs first; if limited, rejected with "Please wait before retrying" | wireframes | Flow 6 / Task 7 | single-col input + stacked states |
| AC-42 | Task 7 | Domain block-list check rejects immediately with "This doesn't look like a dealership website" | wireframes | Flow 6 / Task 7 | single-col input + stacked states |
| AC-43 | Task 7 | Domain block-list rejection does not consume the shared rate limit — immediate retry allowed | wireframes | Flow 6 / Task 7 | single-col input + stacked states |
| AC-44 | Task 7 | URL passing domain check is scraped (robots.txt respected, 5s timeout) and fuzzy-matched against dealership name | wireframes | Flow 6 / Task 7 | single-col input + stacked states |
| AC-45 | Task 7 | Match score below 0.70 rejected post-scrape with name-mismatch copy | wireframes | Flow 6 / Task 7 | single-col input + stacked states |
| AC-46 | Task 7 | Match score 0.70–0.85 triggers borderline confirmation prompt | wireframes | Flow 6 / Task 7 | single-col input + stacked states |
| AC-47 | Task 7 | "Yes" on borderline prompt builds fresh comparison; "No" returns to URL entry | wireframes | Flow 6 / Task 7 | single-col input + stacked states |
| AC-48 | Task 7 | Match score ≥0.85 accepted silently, no confirmation prompt | wireframes | Flow 6 / Task 7 | single-col input + stacked states |
| AC-49 | Task 7 | Any acceptance discards prior scrape/comparison data and builds a fresh comparison map | wireframes | Flow 6 / Task 7 | single-col input + stacked states |
| AC-50 | Task 8 | Manual re-scrape triggerable via /prefill-dealer-details from an already-loaded screen | wireframes | Flow 8 / Task 8 | single-col toolbar + stacked states |
| AC-51 | Task 8 | Manual re-scrape shares the same 5-minute rate limit as alternate-URL scrapes | wireframes | Flow 8 / Task 8 | single-col toolbar + stacked states |
| AC-52 | Task 8 | Rate-limited re-scrape request rejected with "Please wait before retrying", no new scrape | wireframes | Flow 8 / Task 8 | single-col toolbar + stacked states |
| AC-53 | Task 8 | Rate-limit message is static, no live countdown/timer | wireframes | Flow 8 / Task 8 | single-col toolbar + stacked states |
| AC-54 | Task 8 | Successful re-scrape (≥0.80 confidence on ≥1 field) rebuilds comparison map, replacing prior state | wireframes | Flow 8 / Task 8 | single-col toolbar + stacked states |
| AC-55 | Task 8 | Failed/timed-out re-scrape silently falls back to current view, no error shown | wireframes | Flow 8 / Task 8 | single-col toolbar + stacked states |
| AC-56 | Task 8 | Submit/validation/persist behavior after manual re-scrape identical to standard flow | wireframes | Flow 8 / Task 8 | single-col toolbar + stacked states |
| AC-57 | Task 9 | TOC sync "Complete" on open → screen renders normally, no loading interstitial | wireframes | Flow 9 / Task 9 | single-col blocked-state panel |
| AC-58 | Task 9 | TOC sync "Pending" → loading state shown, blocked, automatic status polling | wireframes | Flow 9 / Task 9 | single-col blocked-state panel |
| AC-59 | Task 9 | TOC sync "Failed" → automatic retry within a retry budget before surfacing anything further | wireframes | Flow 9 / Task 9 | single-col blocked-state panel |
| AC-60 | Task 9 | Successful automatic retry → screen proceeds to render normally | wireframes | Flow 9 / Task 9 | single-col blocked-state panel |
| AC-61 | Task 9 | Exhausted retries → "still preparing your details" blocked state with escalation path | wireframes | Flow 9 / Task 9 | single-col blocked-state panel |
| AC-62 | Task 9 | Persistent-failure state shows no raw error code/technical detail, only "still preparing" + escalation | wireframes | Flow 9 / Task 9 | single-col blocked-state panel |

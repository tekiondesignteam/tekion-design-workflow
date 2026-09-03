# User Flows: TAO — Dealer Website Scraping: Pre-fill Dealer Details Review (TAO-DWS-001)

**Product:** ARC &middot; **Feature slug:** tao &middot; **Phase:** Flows (Phase 3)
**Brief:** `p1-intake/design-brief-tao.md`
**Clarifications:** `p2-clarify/clarifications-tao.md`
**Date:** 2026-09-03

---

## 1. IM Provisioning Preview
Implementation Manager views a read-only contract-vs-website comparison in the dealer list before the Dealer Admin journey begins.

```mermaid
flowchart TD
    subgraph IM["Implementation Manager"]
      A1(["IM opens provisioning queue"])
      A2["IM views dealer list"]
      G1["IM sees read-only inline comparison: contract vs website value per field, diffs highlighted"]
      H1{"IM attempts to edit or save a value?"}
      I1(["IM confirms dealer readiness, handoff to Dealer Admin"])
      E1["IM sees contract and TOC values only, no comparison preview"]
      ENDCONTRACT(["IM reviews contract-only row"])
      ENDPENDING(["IM revisits row later"])
    end
    subgraph System["TAO System"]
      B1{"TOC sync complete for dealer?"}
      B2["Dealer row shows Syncing state"]
      C1{"Website URL present in contract data?"}
      C2["No proactive scrape runs"]
      D1["System scrapes website async, 5s timeout, max 1 scrape per dealer record"]
      F1["System builds comparison map, classifies fields, suppresses low-confidence fields"]
      ERR1["Write endpoint hard-rejects IM-provisioning-sourced save"]
      ENDBLOCKED(["Save blocked, IM remains read-only"])
    end
    subgraph Website["Dealer Website"]
      D2{"Scrape succeeds within timeout?"}
    end

    A1 --> A2
    A2 --> B1
    B1 -->|No| B2
    B2 --> ENDPENDING
    B1 -->|Yes| C1
    C1 -->|No| C2
    C1 -->|Yes| D1
    D1 --> D2
    D2 -->|No, timeout or blocked| C2
    C2 --> E1
    E1 --> ENDCONTRACT
    D2 -->|Yes| F1
    F1 --> G1
    G1 --> H1
    H1 -->|Yes| ERR1
    ERR1 --> ENDBLOCKED
    H1 -->|No, view only| I1

    classDef errorNode fill:#FEF2F2,stroke:#DC2626,color:#7F1D1D;
    class ERR1 errorNode;
```

## 2. Dealer Admin Reviews Prefill With Website Diffs
Dealer Admin opens the review screen, sees the TOC baseline plus per-field website comparison rows, accepts or rejects each diff, and confirms final values.

```mermaid
flowchart TD
    subgraph DealerAdmin["Dealer Admin"]
      A1(["Dealer Admin opens Dealer Details Review screen"])
      REVIEW1["Dealer Admin reviews checkmarks on matching fields, no action needed"]
      REVIEW2{"More comparison rows to decide?"}
      DECIDE1["Dealer Admin selects Use website version for this field"]
      DECIDE2["Dealer Admin selects Keep on file for this field"]
      EXPANDHRS["Dealer Admin expands Operating Hours row to view day-by-day diff, then decides per department"]
      EDIT1["Dealer Admin optionally edits any field directly, overriding prefilled or scraped value"]
      SUBMIT1["Dealer Admin clicks Confirm/Submit"]
      VALID1{"All required fields valid?"}
      ERR1["Validation error shown, submit blocked"]
      ENDSUCCESS(["Final values persisted, Dealer Admin proceeds to next Configure Phase step"])
      ENDNODIFF(["Continues in Flow 3, no diffs found"])
      ENDFAIL(["Continues in Flow 5, silent fallback"])
    end
    subgraph System["TAO System"]
      LOAD1["Screen renders TOC/contract baseline in under 500ms, labeled From your records on file"]
      SCRAPE1["System triggers async scrape of on-file website URL, 5s timeout"]
      CLASSIFY1["System classifies fields as Match, Different, New, or Missing, suppresses fields below 0.80 confidence"]
      OUTCOME1{"Scrape outcome"}
      DIFFROWS1["System renders comparison rows: On file value / Found on website value / Use website version Yes or Keep on file"]
      SAVE1["System persists final values to TAO dealer record"]
    end
    subgraph Website["Dealer Website"]
      SITE1["Website returns field data with confidence scores"]
    end

    A1 --> LOAD1
    LOAD1 --> SCRAPE1
    SCRAPE1 --> SITE1
    SITE1 --> CLASSIFY1
    CLASSIFY1 --> OUTCOME1
    OUTCOME1 -->|Diffs found| DIFFROWS1
    OUTCOME1 -->|All fields match| ENDNODIFF
    OUTCOME1 -->|Scrape fails or times out| ENDFAIL
    DIFFROWS1 --> REVIEW1
    REVIEW1 --> REVIEW2
    REVIEW2 -->|Yes| DECIDE1
    REVIEW2 -->|Yes, alternate choice| DECIDE2
    REVIEW2 -->|Yes, Operating Hours row| EXPANDHRS
    DECIDE1 --> REVIEW2
    DECIDE2 --> REVIEW2
    EXPANDHRS --> REVIEW2
    REVIEW2 -->|No, all rows decided| EDIT1
    EDIT1 --> SUBMIT1
    SUBMIT1 --> VALID1
    VALID1 -->|No| ERR1
    ERR1 --> SUBMIT1
    VALID1 -->|Yes| SAVE1
    SAVE1 --> ENDSUCCESS

    classDef errorNode fill:#FEF2F2,stroke:#DC2626,color:#7F1D1D;
    class ERR1 errorNode;
```

## 3. Dealer Admin Reviews Prefill, All Fields Match
Dealer Admin opens the review screen and finds every scraped field matches the on-file record, confirming with only quiet checkmarks shown.

```mermaid
flowchart TD
    subgraph DealerAdmin["Dealer Admin"]
      A1(["Dealer Admin opens Dealer Details Review screen"])
      REVIEW1["Dealer Admin sees quiet checkmark Matches your website on every scraped field, no action needed"]
      EDIT1["Dealer Admin optionally edits any field directly"]
      SUBMIT1["Dealer Admin clicks Confirm/Submit"]
      VALID1{"All required fields valid?"}
      ERR1["Validation error shown, submit blocked"]
      ENDSUCCESS(["Final values persisted, Dealer Admin proceeds to next Configure Phase step"])
      ENDDIVERT(["Continues in Flow 2, diffs found"])
    end
    subgraph System["TAO System"]
      LOAD1["Screen renders TOC/contract baseline in under 500ms"]
      SCRAPE1["System triggers async scrape of on-file website URL, 5s timeout"]
      CLASSIFY1["System classifies fields, suppresses fields below 0.80 confidence"]
      ALLMATCH1{"Any Different or New fields found?"}
      SUPPRESS1["All comparison rows suppressed, only checkmarks shown"]
      SAVE1["System persists final values to TAO dealer record"]
    end
    subgraph Website["Dealer Website"]
      SITE1["Website returns field data, all values match on-file record"]
    end

    A1 --> LOAD1
    LOAD1 --> SCRAPE1
    SCRAPE1 --> SITE1
    SITE1 --> CLASSIFY1
    CLASSIFY1 --> ALLMATCH1
    ALLMATCH1 -->|No, all match| SUPPRESS1
    ALLMATCH1 -->|Yes| ENDDIVERT
    SUPPRESS1 --> REVIEW1
    REVIEW1 --> EDIT1
    EDIT1 --> SUBMIT1
    SUBMIT1 --> VALID1
    VALID1 -->|No| ERR1
    ERR1 --> SUBMIT1
    VALID1 -->|Yes| SAVE1
    SAVE1 --> ENDSUCCESS

    classDef errorNode fill:#FEF2F2,stroke:#DC2626,color:#7F1D1D;
    class ERR1 errorNode;
```

## 4. Dealer Admin Reviews Contract-Only Prefill (No Website)
Dealer Admin opens the review screen for a dealer with no website on file and confirms the fully prefilled contract data, with no degraded messaging.

```mermaid
flowchart TD
    subgraph DealerAdmin["Dealer Admin"]
      A1(["Dealer Admin opens Dealer Details Review screen"])
      REVIEW1["Dealer Admin sees fully prefilled contract-only form, no comparison rows, no degraded messaging"]
      TRYURL1{"Dealer Admin wants to add a website?"}
      TRYURLNODE["Dealer Admin selects Try a different website"]
      EDIT1["Dealer Admin optionally edits any field directly"]
      SUBMIT1["Dealer Admin clicks Confirm/Submit"]
      VALID1{"All required fields valid?"}
      ERR1["Validation error shown, submit blocked"]
      ENDSUCCESS(["Final values persisted, Dealer Admin proceeds to next Configure Phase step"])
      ENDDIVERT(["Continues in Flow 6 or Flow 7"])
      ENDURLPRESENT(["Continues in Flow 2, 3, or 5"])
    end
    subgraph System["TAO System"]
      LOAD1["Screen renders TOC/contract baseline in under 500ms"]
      NOURL1{"Website URL present on file?"}
      SKIP1["No scrape is triggered"]
      SAVE1["System persists final values to TAO dealer record"]
    end

    A1 --> LOAD1
    LOAD1 --> NOURL1
    NOURL1 -->|No| SKIP1
    NOURL1 -->|Yes| ENDURLPRESENT
    SKIP1 --> REVIEW1
    REVIEW1 --> TRYURL1
    TRYURL1 -->|Yes| TRYURLNODE
    TRYURLNODE --> ENDDIVERT
    TRYURL1 -->|No| EDIT1
    EDIT1 --> SUBMIT1
    SUBMIT1 --> VALID1
    VALID1 -->|No| ERR1
    ERR1 --> SUBMIT1
    VALID1 -->|Yes| SAVE1
    SAVE1 --> ENDSUCCESS

    classDef errorNode fill:#FEF2F2,stroke:#DC2626,color:#7F1D1D;
    class ERR1 errorNode;
```

## 5. Dealer Admin Reviews Prefill After Silent Scrape Failure
Dealer Admin opens the review screen where a website exists but the scrape fails, times out, or is blocked, and confirms the contract-prefilled data with no error shown.

```mermaid
flowchart TD
    subgraph DealerAdmin["Dealer Admin"]
      A1(["Dealer Admin opens Dealer Details Review screen"])
      REVIEW1["Dealer Admin sees fully prefilled contract-only form, no comparison rows, no error message"]
      TRYURL1["Dealer Admin optionally selects Try a different website"]
      EDIT1["Dealer Admin optionally edits any field directly"]
      SUBMIT1["Dealer Admin clicks Confirm/Submit"]
      VALID1{"All required fields valid?"}
      ERR1["Validation error shown, submit blocked"]
      ENDSUCCESS(["Final values persisted, Dealer Admin proceeds to next Configure Phase step"])
      ENDDIVERT(["Continues in Flow 6 or Flow 7"])
    end
    subgraph System["TAO System"]
      LOAD1["Screen renders TOC/contract baseline in under 500ms, unblocked by scrape"]
      ROBOTS1{"robots.txt allows scraping?"}
      SKIPROBOTS1["Scrape skipped silently"]
      SCRAPE1["System attempts scrape with 5s timeout"]
      OUTCOME1{"Scrape outcome"}
      TIMEOUT1["Scrape exceeds 5s timeout, aborted silently"]
      UNREACHABLE1["Website unreachable, behind auth, or returns 403, fails silently"]
      FALLBACK1["No comparison data generated, no error shown to Dealer Admin"]
      SAVE1["System persists final values to TAO dealer record"]
    end
    subgraph Website["Dealer Website"]
      SITE1["Website does not respond successfully"]
    end

    A1 --> LOAD1
    LOAD1 --> ROBOTS1
    ROBOTS1 -->|No| SKIPROBOTS1
    SKIPROBOTS1 --> FALLBACK1
    ROBOTS1 -->|Yes| SCRAPE1
    SCRAPE1 --> SITE1
    SITE1 --> OUTCOME1
    OUTCOME1 -->|Exceeds 5s| TIMEOUT1
    OUTCOME1 -->|Unreachable or 403| UNREACHABLE1
    TIMEOUT1 --> FALLBACK1
    UNREACHABLE1 --> FALLBACK1
    FALLBACK1 --> REVIEW1
    REVIEW1 --> TRYURL1
    TRYURL1 --> ENDDIVERT
    REVIEW1 --> EDIT1
    EDIT1 --> SUBMIT1
    SUBMIT1 --> VALID1
    VALID1 -->|No| ERR1
    ERR1 --> SUBMIT1
    VALID1 -->|Yes| SAVE1
    SAVE1 --> ENDSUCCESS

    classDef errorNode fill:#FEF2F2,stroke:#DC2626,color:#7F1D1D;
    class ERR1 errorNode;
```

## 6. Dealer Admin Submits Alternate URL, Passes Validation
Dealer Admin provides a corrected/alternate website URL that passes domain and business-name validation, triggering a fresh comparison (including resolving a borderline fuzzy-match confirmation).

```mermaid
flowchart TD
    subgraph DealerAdmin["Dealer Admin"]
      A1(["Dealer Admin clicks Try a different website"])
      ENTER1["Dealer Admin enters alternate URL and submits"]
      BORDERLINE_PROMPT["System shows confirmation: We found scraped name on this website, is this your dealership?"]
      CONFIRM_YES["Dealer Admin selects Yes, use this website"]
      CONFIRM_NO["Dealer Admin selects No, try a different URL"]
      REVIEWNEW["Dealer Admin reviews fresh comparison rows against new scrape"]
      SUBMIT1["Dealer Admin clicks Confirm/Submit"]
      VALID1{"All required fields valid?"}
      ERR1["Validation error shown, submit blocked"]
      ENDSUCCESS(["Final values persisted, Dealer Admin proceeds to next Configure Phase step"])
      ENDRATE(["Dealer Admin must wait before retrying"])
      ENDDOMAIN(["Dealer Admin retries with a different URL, see Flow 7"])
      ENDMISMATCH(["Dealer Admin retries with a different URL, see Flow 7"])
      ENDBORDERLINENO(["Dealer Admin retries with a different URL, see Flow 7"])
    end
    subgraph System["TAO System"]
      RATE1{"Alternate URL scrape within shared 5-minute rate limit window?"}
      RATEBLOCK1["Rejected: Please wait before retrying"]
      DOMAIN1{"URL on domain block-list?"}
      DOMAINBLOCK1["Rejected: This does not look like a dealership website"]
      SCRAPE1["System scrapes new URL, respects robots.txt, 5s timeout"]
      MATCH1{"Business-name fuzzy match score vs contract dealership name"}
      REJECT1["Rejected: The website you provided does not appear to be for Dealership Name"]
      ACCEPTSILENT1["Score 0.85 or above, accepted silently"]
      BUILDCOMPARE1["Old scrape data discarded, fresh comparison map built"]
      SAVE1["System persists final values to TAO dealer record"]
    end
    subgraph Website["Dealer Website"]
      SITE1["New website returns field data and business name"]
    end

    A1 --> RATE1
    RATE1 -->|Limited| RATEBLOCK1
    RATEBLOCK1 --> ENDRATE
    RATE1 -->|Not limited| ENTER1
    ENTER1 --> DOMAIN1
    DOMAIN1 -->|Yes| DOMAINBLOCK1
    DOMAINBLOCK1 --> ENDDOMAIN
    DOMAIN1 -->|No| SCRAPE1
    SCRAPE1 --> SITE1
    SITE1 --> MATCH1
    MATCH1 -->|Below 0.70| REJECT1
    REJECT1 --> ENDMISMATCH
    MATCH1 -->|0.70 to 0.85| BORDERLINE_PROMPT
    BORDERLINE_PROMPT --> CONFIRM_YES
    BORDERLINE_PROMPT --> CONFIRM_NO
    CONFIRM_NO --> ENDBORDERLINENO
    CONFIRM_YES --> BUILDCOMPARE1
    MATCH1 -->|0.85 or above| ACCEPTSILENT1
    ACCEPTSILENT1 --> BUILDCOMPARE1
    BUILDCOMPARE1 --> REVIEWNEW
    REVIEWNEW --> SUBMIT1
    SUBMIT1 --> VALID1
    VALID1 -->|No| ERR1
    ERR1 --> SUBMIT1
    VALID1 -->|Yes| SAVE1
    SAVE1 --> ENDSUCCESS

    classDef errorNode fill:#FEF2F2,stroke:#DC2626,color:#7F1D1D;
    class ERR1,RATEBLOCK1,DOMAINBLOCK1,REJECT1 errorNode;
```

## 7. Dealer Admin Submits Alternate URL, Fails Validation
Dealer Admin provides an alternate website URL that is blocked by the domain list or fails business-name matching (including a borderline match the Dealer Admin rejects), and must retry.

```mermaid
flowchart TD
    subgraph DealerAdmin["Dealer Admin"]
      A1(["Dealer Admin clicks Try a different website"])
      ENTER1["Dealer Admin enters alternate URL and submits"]
      RETRYENTER["Dealer Admin enters another alternate URL"]
      BORDERLINE_PROMPT["System shows confirmation: We found scraped name on this website, is this your dealership?"]
      CONFIRM_NO["Dealer Admin selects No, try a different URL"]
      CONFIRM_YES["Dealer Admin selects Yes, use this website"]
      GIVEUP1{"Dealer Admin retries or abandons alternate URL?"}
      ENDABANDON(["Dealer Admin abandons alternate URL, continues with existing contract or prior comparison"])
      ENDRATELIMIT(["Dealer Admin must wait before retrying"])
      PASS1(["Score 0.85 or above, continues in Flow 6"])
    end
    subgraph System["TAO System"]
      RATE1{"Alternate URL attempt within shared 5-minute rate limit window?"}
      DOMAIN1{"URL on domain block-list, e.g. google.com?"}
      DOMAINBLOCK1["Rejected immediately: This does not look like a dealership website"]
      SCRAPE1["System scrapes candidate URL, respects robots.txt, 5s timeout"]
      MATCH1{"Business-name fuzzy match score vs contract dealership name"}
      REJECT1["Rejected post-scrape: The website you provided does not appear to be for Dealership Name, please check the URL and try again"]
    end
    subgraph Website["Dealer Website"]
      SITE1["Candidate website returns business name, if reachable"]
    end

    A1 --> RATE1
    RATE1 -->|Limited| ENDRATELIMIT
    RATE1 -->|Not limited| ENTER1
    ENTER1 --> DOMAIN1
    DOMAIN1 -->|Yes| DOMAINBLOCK1
    DOMAINBLOCK1 --> GIVEUP1
    DOMAIN1 -->|No| SCRAPE1
    SCRAPE1 --> SITE1
    SITE1 --> MATCH1
    MATCH1 -->|Below 0.70| REJECT1
    REJECT1 --> GIVEUP1
    MATCH1 -->|0.70 to 0.85| BORDERLINE_PROMPT
    BORDERLINE_PROMPT --> CONFIRM_NO
    BORDERLINE_PROMPT --> CONFIRM_YES
    CONFIRM_NO --> GIVEUP1
    CONFIRM_YES --> PASS1
    MATCH1 -->|0.85 or above| PASS1
    GIVEUP1 -->|Retry immediately, validation failure does not consume the scrape rate limit| RETRYENTER
    RETRYENTER --> DOMAIN1
    GIVEUP1 -->|Abandon| ENDABANDON

    classDef errorNode fill:#FEF2F2,stroke:#DC2626,color:#7F1D1D;
    class DOMAINBLOCK1,REJECT1,ENDRATELIMIT errorNode;
```

## 8. Dealer Admin Manually Re-Triggers Scrape
Dealer Admin invokes a manual re-scrape (/prefill-dealer-details) of the on-file website to refresh the comparison, subject to a 5-minute rate limit.

```mermaid
flowchart TD
    subgraph DealerAdmin["Dealer Admin"]
      A1(["Dealer Admin clicks manual re-scrape (prefill-dealer-details) on loaded screen"])
      REVIEWUPDATED1["Dealer Admin reviews refreshed comparison rows"]
      REVIEWSAME1["Dealer Admin continues reviewing existing contract-only view, no change"]
      SUBMIT1["Dealer Admin clicks Confirm/Submit"]
      VALID1{"All required fields valid?"}
      ERR1["Validation error shown, submit blocked"]
      ENDSUCCESS(["Final values persisted, Dealer Admin proceeds to next Configure Phase step"])
      ENDRATELIMIT(["Dealer Admin must wait before retrying"])
    end
    subgraph System["TAO System"]
      RATE1{"Within 5-minute rate limit since last scrape or re-scrape for this dealership?"}
      RATEBLOCK1["Rejected: Please wait before retrying"]
      SCRAPE1["System re-scrapes on-file or current URL, respects robots.txt, 5s timeout"]
      OUTCOME1{"Scrape outcome"}
      REBUILD1["Refreshed comparison map built, classifies fields, suppresses below 0.80 confidence, replaces prior comparison state"]
      FALLBACK1["Silent fallback, no error shown, screen remains contract-only"]
      SAVE1["System persists final values to TAO dealer record"]
    end
    subgraph Website["Dealer Website"]
      SITE1["Website responds to re-scrape request"]
    end

    A1 --> RATE1
    RATE1 -->|Limited| RATEBLOCK1
    RATEBLOCK1 --> ENDRATELIMIT
    RATE1 -->|Not limited| SCRAPE1
    SCRAPE1 --> SITE1
    SITE1 --> OUTCOME1
    OUTCOME1 -->|Success, confidence 0.80 or above on at least one field| REBUILD1
    OUTCOME1 -->|Fails or times out| FALLBACK1
    REBUILD1 --> REVIEWUPDATED1
    FALLBACK1 --> REVIEWSAME1
    REVIEWUPDATED1 --> SUBMIT1
    REVIEWSAME1 --> SUBMIT1
    SUBMIT1 --> VALID1
    VALID1 -->|No| ERR1
    ERR1 --> SUBMIT1
    VALID1 -->|Yes| SAVE1
    SAVE1 --> ENDSUCCESS

    classDef errorNode fill:#FEF2F2,stroke:#DC2626,color:#7F1D1D;
    class RATEBLOCK1,ERR1 errorNode;
```

## 9. Dealer Admin Blocked by Incomplete or Failed TOC Sync
Dealer Admin opens the review screen before TOC sync has completed (or after it fails) and sees a blocked loading state until the always-present baseline is ready.

```mermaid
flowchart TD
    subgraph DealerAdmin["Dealer Admin"]
      A1(["Dealer Admin opens Dealer Details Review screen"])
      LOADING1["Dealer Admin sees loading state, blocked from proceeding"]
      STUCK1["Dealer Admin sees still preparing your details state, remains blocked"]
      ESCALATE1["Dealer Admin contacts support, or IM escalates on Dealer Admin behalf"]
      ENDPROCEED(["Screen renders normally, Dealer Admin proceeds, see Flow 2, 3, 4, or 5"])
      ENDBLOCKED(["Dealer Admin remains blocked pending manual intervention"])
    end
    subgraph TOC["TOC / Salesforce Sync"]
      B1{"TOC sync status"}
      POLL1["System polls sync status automatically"]
      RETRY1["System automatically retries the sync"]
      RETRYCHECK1{"Retry succeeds within retry budget?"}
    end

    A1 --> B1
    B1 -->|Complete| ENDPROCEED
    B1 -->|Pending, in progress| LOADING1
    LOADING1 --> POLL1
    POLL1 --> B1
    B1 -->|Failed| RETRY1
    RETRY1 --> RETRYCHECK1
    RETRYCHECK1 -->|Yes| ENDPROCEED
    RETRYCHECK1 -->|No, persistent failure| STUCK1
    STUCK1 --> ESCALATE1
    ESCALATE1 --> ENDBLOCKED

    classDef errorNode fill:#FEF2F2,stroke:#DC2626,color:#7F1D1D;
    class STUCK1,ENDBLOCKED errorNode;
```

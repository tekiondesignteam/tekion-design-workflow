# Product: [Product Name]

> One sentence: what this product is and who it's for.
> Example: "ARC is Tekion's core dealer management platform used by all dealership roles for day-to-day operations across sales, service, parts, and accounting."

---

## Overview

| Field | Value |
|-------|-------|
| **Product name** | [e.g., ARC] |
| **Full name** | [e.g., Automotive Retail Cloud] |
| **Product type** | [e.g., Web application / Mobile app / Embedded widget] |
| **ALLOY kit** | [e.g., ALLOY Core + ARC kit] |
| **Primary users** | [Link to persona files — e.g., Service Advisor, F&I Manager, Sales Associate] |
| **Stage** | [e.g., Mature product / Active development / New product] |

---

## What This Product Does

2–4 sentences describing the product's scope. What does it cover? What does it explicitly NOT cover?

[e.g., "ARC handles the full vehicle lifecycle at a dealership: from lead intake and deal structuring in Sales, to repair order management in Service, to parts inventory and ordering, to accounting and reporting. It is the system of record for dealer operations. It does not cover the consumer-facing car-buying experience — that is Tekion Digital Retail."]

---

## Key Feature Areas

List the major functional domains in this product. Helps Claude understand which part of the product a spec belongs to.

- **[Domain 1]** — [e.g., "Sales Desk — deal structuring, trade-ins, F&I"]
- **[Domain 2]** — [e.g., "Service Drive — repair orders, technician workflow, customer communication"]
- **[Domain 3]** — [e.g., "Parts — inventory, ordering, pricing"]
- **[Domain 4]** — [e.g., "Accounting — general ledger, payroll, reporting"]
- **[Domain 5]** — [add as needed]

---

## Design Character

How does this product feel? What design decisions have been locked in? This guides tone and pattern choices in new features.

**Density:** [Low / Medium / High — e.g., "High — lots of data on screen, power-user oriented"]
**Navigation model:** [e.g., "Left sidebar with module switcher + top bar for contextual actions"]
**Interaction style:** [e.g., "Form-heavy; inline editing preferred over modal workflows where possible"]
**Data presentation:** [e.g., "Tables are the primary pattern; cards used only for summary/overview states"]
**Tone:** [e.g., "Utilitarian and efficient — no decorative elements; every pixel earns its place"]

---

## Design System

| Layer | Value |
|-------|-------|
| **Base kit** | ALLOY Core |
| **Product kit** | [e.g., ARC kit] |
| **T1 chat layer** | [Yes / No — e.g., "No — ARC does not use the T1 chat kit"] |
| **Token prefix** | [e.g., `arc-` or `--arc-`] |
| **Component library location** | [e.g., GitHub repo path or Confluence link] |

---

## Primary Users (Quick Reference)

| Persona | How they use this product |
|---------|--------------------------|
| [Role 1] | [e.g., "Primary power user — logged in all day, every day"] |
| [Role 2] | [e.g., "Secondary user — checks reports and approvals 2–3x per day"] |
| [Role 3] | [e.g., "Occasional — end-of-day summaries and overrides only"] |

→ See `knowledge/personas/` for full persona details.

---

## Known Design Constraints

Product-specific constraints that override or add to the general constraints file.

- [e.g., "Some dealers run ARC in an iframe inside their DMS shell — avoid full-page overlays that break out of the iframe"]
- [e.g., "Certain RO screens must support printing — always consider print layout for data-heavy views"]
- [e.g., "ARC is used on touchscreens at some service desks — minimum tap target 44px"]
- [e.g., "Some dealers have custom branding overrides — don't hard-code colors outside of ALLOY tokens"]

---

## Established Patterns Specific to This Product

Patterns that exist in this product and must be followed for consistency. Link to `knowledge/interaction-patterns/` entries where they exist.

- [e.g., "All destructive actions (delete, void, reverse) require a two-step confirmation modal with plain-language consequence statement"]
- [e.g., "Empty states always include a primary CTA — never show an empty screen with no action"]
- [e.g., "Toast notifications are used for non-critical success/error; inline messages for critical validation errors"]

---

## What's Different From Other Products

What a designer switching from another Tekion product should know.

[e.g., "ARC is significantly denser than Greenfield — Greenfield uses a card-based consumer-style layout while ARC is data-table heavy. Don't bring Greenfield design patterns into ARC."]

---

## Notes

Anything else designers should know before starting a spec for this product.

- [e.g., "Check with the ARC design lead before introducing any new navigation patterns"]
- [e.g., "The ARC component library has several custom components not in ALLOY Core — see arc.md in the ALLOY manifests"]

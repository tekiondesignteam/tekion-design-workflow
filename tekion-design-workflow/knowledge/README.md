# knowledge/

This folder is the shared context that makes the design plugin smarter. The SPEC skill reads from it automatically — the more complete these files are, the better the specs, flows, and AC it produces.

---

## What lives here

```
knowledge/
  personas/                   # One file per dealership role (cross-product)
    _template.md              # Copy this to create a new persona
    service-advisor.md        # (example — fill in your own)
    fi-manager.md
    ...

  products/                   # Everything about a product lives here
    arc/
      overview.md             # Scope, users, design character, ALLOY kit
      design-principles.md   # Decision framework for ARC
      constraints.md         # Platform, device, a11y, performance constraints
      copy-guidelines.md     # Voice, tone, case conventions, CTAs, errors
    greenfield/
      overview.md
      design-principles.md
      constraints.md
      copy-guidelines.md
    gm/
      overview.md
      design-principles.md
      constraints.md
      copy-guidelines.md
    t1/
      overview.md
      design-principles.md
      constraints.md
      copy-guidelines.md

  interaction-patterns/       # Reusable UI patterns with AC templates (coming soon)
    _template.md
```

---

## How to fill these in

**Personas** — duplicate `personas/_template.md`, rename it to the role (e.g., `service-advisor.md`), fill in each section. Aim for 6–8 core roles to start. Ask PMs and UX researchers who work with dealers — they usually have this knowledge already. Personas are cross-product; define them once and all products reference them.

**Per-product files** — each product folder (arc, greenfield, gm, t1) contains four files. Fill them in as a team:

- `overview.md` — the product lead owns this. Scope, primary users, design character, ALLOY kit.
- `design-principles.md` — the senior designer for that product owns this. Worth a short workshop to draft collaboratively. Aim for 5–7 principles — enough to be useful, few enough to remember.
- `constraints.md` — front-end leads and QA own this. Real device, browser, network, and accessibility requirements. Ask the people who debug production issues — they know the true constraints.
- `copy-guidelines.md` — your content designer or the product design lead owns this. Start with Case Conventions and CTA Patterns — those have the most daily impact. Each product has its own voice (ARC is utilitarian, T1 is conversational, Greenfield may be friendlier).

**Interaction patterns** — coming soon. Will live in `interaction-patterns/` and contain reusable UI patterns with ready-to-copy AC.

---

## Keeping it current

These files are living documents. When the team makes a design decision that changes a pattern or constraint, update the relevant file in the same PR as the design change. Stale knowledge files are worse than empty ones — Claude will use whatever is here.

---

## What Claude does with this

When a designer runs the `/spec` skill:
- Claude reads the relevant **persona** file(s) for the user type identified in the requirements
- Claude reads the **product** file for the product being designed
- Claude reads the **constraints** file to ensure AC is realistic and enforceable
- Claude checks **interaction-patterns** when generating tasks, to reuse established patterns rather than inventing new ones
- Claude uses **copy-guidelines** to write accurate, on-brand copy in AC
- Claude uses **design-principles** to evaluate tradeoffs and flag AC that conflicts with the team's stated values

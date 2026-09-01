# Tekion Design Principles

> These principles are the shared decision-making framework for all Tekion product design. Claude uses them to evaluate specs, catch tradeoffs, and write acceptance criteria that reflect the right priorities. When two approaches seem equally valid, these principles break the tie.

---

## How to Use This File

Each principle has a name, what it means in practice, and Do/Don't examples. When writing a spec, Claude should check each principle and flag any AC that conflicts with them.

---

## Principle 1: [Name]

> [One sentence capturing the core idea. Make it memorable. e.g., "Speed is a feature — every interaction should feel instant."]

**What this means in practice:**
[2–4 sentences explaining what this principle actually requires. Concrete, not abstract. e.g., "Dealer staff are under time pressure every minute of the day. Designing for efficiency isn't a nice-to-have — it's the primary measure of success. Reducing clicks, eliminating confirmation steps for low-risk actions, and defaulting to the most common path are all expressions of this principle."]

**Do:**
- [Concrete example — e.g., "Default forms to the most common values so the user only has to change what's different"]
- [e.g., "Show the most-used actions at the top or in the primary position; bury edge cases in overflow menus"]
- [e.g., "Use keyboard shortcuts for power-user paths"]

**Don't:**
- [e.g., "Don't require confirmation dialogs for reversible or low-risk actions"]
- [e.g., "Don't make users navigate to a different screen to see information they need to complete the current task"]
- [e.g., "Don't add steps to a flow 'just in case' — every added step has a cost"]

---

## Principle 2: [Name]

> [e.g., "Show the system's state — users should always know what's happening and what happened."]

**What this means in practice:**
[e.g., "Uncertainty is a productivity killer. If a record is saving, show it. If an action failed, say so and say why. If data is stale, say when it was last updated. A user who can't trust what they see in the UI will compensate by doing things twice — which defeats the whole product."]

**Do:**
- [e.g., "Show save state (saving… / saved / failed) on any form with real-time auto-save"]
- [e.g., "Show timestamps on data that changes frequently — 'Last updated 3 min ago'"]
- [e.g., "Show inline error messages immediately on blur, not only on submit"]

**Don't:**
- [e.g., "Don't use silent failures — if something went wrong, always tell the user"]
- [e.g., "Don't leave loading states ambiguous — always indicate what is loading and give a cancel option for long operations"]
- [e.g., "Don't use the same color for 'pending', 'in progress', and 'complete' states — status must be visually distinct"]

---

## Principle 3: [Name]

> [e.g., "Protect the data — irreversible actions require explicit confirmation; reversible actions don't."]

**What this means in practice:**
[e.g., "The asymmetry of consequences matters. Undoing an accidental delete of a $30,000 deal jacket is catastrophic; dismissing a notification accidentally is trivial. The design overhead of confirmation (friction, extra clicks) should only be incurred when the stakes justify it. Grade every destructive action and apply the right level of protection."]

**Do:**
- [e.g., "Use a two-step confirmation modal for delete, void, reverse, and any action that affects other records"]
- [e.g., "For the highest-risk actions, add a type-to-confirm step (type the item name to unlock)"]
- [e.g., "For soft-delete (recoverable), a single confirmation toast with an undo option is sufficient"]

**Don't:**
- [e.g., "Don't apply the same confirmation pattern to low-risk and high-risk actions — it trains users to click through without reading"]
- [e.g., "Don't use toast-only confirmation for irreversible actions — toasts disappear and users may miss them"]
- [e.g., "Don't make the destructive button the default/primary position — always pair it with a clearly visible Cancel"]

---

## Principle 4: [Name]

> [e.g., "One product, one truth — don't make users reconcile conflicting information."]

**What this means in practice:**
[e.g., "When the same data appears in multiple places in the product, it must be consistent. If a repair order total shown in the list view doesn't match the one in the detail view, the user doesn't know which to trust — and they shouldn't have to figure it out. Consistency also applies to patterns: the way you confirm a delete in Service should be the same way you confirm a delete in Sales."]

**Do:**
- [e.g., "Use the same component, label, and behavior for the same action across modules"]
- [e.g., "If the same data is displayed in multiple places, make sure they all update from the same source"]
- [e.g., "Reference interaction-patterns/ files — don't invent a new pattern when an established one exists"]

**Don't:**
- [e.g., "Don't use different terminology for the same concept in different parts of the product (e.g., 'Customer' in one place, 'Client' in another)"]
- [e.g., "Don't build a custom pattern for something covered in interaction-patterns/ — divergence compounds over time"]

---

## Principle 5: [Name]

> [e.g., "Design for the novice; optimize for the expert."]

**What this means in practice:**
[e.g., "New hires at a dealership need to learn the product; experienced staff need to move fast. These goals aren't in conflict if you layer the design correctly: the obvious path should always be available for someone who doesn't know the shortcut, but the shortcut must exist for someone who does. Progressive disclosure — show the simple path by default, surface advanced options on demand — is the primary tool here."]

**Do:**
- [e.g., "Make the default path work for a first-time user without requiring guidance"]
- [e.g., "Add keyboard shortcuts, bulk actions, and advanced filters for power users — but don't surface them in the primary UI"]
- [e.g., "Use inline help (tooltips, expandable 'How does this work?' sections) for genuinely confusing fields"]

**Don't:**
- [e.g., "Don't simplify to the point of removing capabilities power users depend on — hiding vs removing are different"]
- [e.g., "Don't put onboarding tips or wizards in front of experienced users every time — make them dismissible and remember the dismissal"]

---

## Principle 6: [Name]

> [Add your own — e.g., "Accessibility is not an afterthought."]

**What this means in practice:**
[Fill in]

**Do:**
- [Fill in]

**Don't:**
- [Fill in]

---

## Principle 7: [Name]

> [Add your own]

**What this means in practice:**
[Fill in]

**Do:**
- [Fill in]

**Don't:**
- [Fill in]

---

## Notes

- [e.g., "When two principles conflict on a specific decision, bring it to the design lead — don't silently pick one"]
- [e.g., "These principles apply to new features AND to redesigns — if an existing pattern violates a principle, flag it rather than perpetuating it"]

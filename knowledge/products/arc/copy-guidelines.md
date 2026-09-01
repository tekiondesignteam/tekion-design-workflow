# Tekion Copy Guidelines

> Rules for writing UI text across Tekion products. Claude uses this file to write accurate, consistent copy in specs and acceptance criteria — headlines, labels, CTAs, error messages, empty states, and tooltips.

---

## Voice & Tone

**Who we are in the product:**
[Describe the brand voice in 2–3 sentences. e.g., "Tekion speaks as a knowledgeable, efficient colleague — not a corporate system. We're direct and clear, never condescending or overly formal. We help dealers get things done fast, so every word earns its place."]

**Tone by context:**

| Context | Tone | Example |
|---------|------|---------|
| Success / positive | [e.g., Warm, concise] | [e.g., "Repair order saved."] |
| Error / failure | [e.g., Clear, non-blaming, helpful] | [e.g., "We couldn't save this RO. Check your connection and try again."] |
| Warning / caution | [e.g., Direct, specific] | [e.g., "This will void all line items. This can't be undone."] |
| Empty state | [e.g., Helpful, actionable] | [e.g., "No repair orders yet. Create one to get started."] |
| Loading / processing | [e.g., Brief, reassuring] | [e.g., "Saving…" or "Loading repair orders…"] |
| Destructive confirmation | [e.g., Neutral, factual — not alarming] | [e.g., "Delete this customer? This will remove all associated records."] |

---

## Case Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| **Page / screen titles** | [e.g., Title case] | [e.g., "Repair Order Details"] |
| **Section headings** | [e.g., Title case] | [e.g., "Customer Information"] |
| **Field labels** | [e.g., Title case] | [e.g., "Phone Number"] |
| **CTA buttons** | [e.g., Title case] | [e.g., "Save Changes"] |
| **Secondary actions** | [e.g., Title case] | [e.g., "Cancel"] |
| **Inline error messages** | [e.g., Sentence case] | [e.g., "Phone number is required."] |
| **Toast notifications** | [e.g., Sentence case] | [e.g., "Repair order saved successfully."] |
| **Tooltips** | [e.g., Sentence case] | [e.g., "This field is required to process payment."] |
| **Placeholder text** | [e.g., Sentence case] | [e.g., "Search by name or RO number"] |
| **Tab labels** | [e.g., Title case] | [e.g., "Labor" / "Parts" / "Notes"] |

---

## CTA (Button) Patterns

CTAs must be specific and action-oriented. Never use vague labels.

**Rules:**
- Use imperative verb + object: "Save Repair Order", not "Save" alone when context is ambiguous
- Short form is fine when context is obvious: "Save", "Cancel", "Delete" in a modal are unambiguous
- Never use "OK", "Yes", "No", "Submit" as standalone CTAs
- Destructive CTAs must name the action: "Delete Customer", not "Confirm"

**Standard CTA vocabulary:**

| Action | Preferred label | Avoid |
|--------|----------------|-------|
| Save a new record | [e.g., "Create [Item]"] | [e.g., "Submit", "Add", "OK"] |
| Save edits to existing | [e.g., "Save Changes"] | [e.g., "Update", "Submit", "OK"] |
| Permanently remove | [e.g., "Delete [Item]"] | [e.g., "Remove", "Yes", "Confirm"] |
| Close without saving | [e.g., "Cancel"] | [e.g., "Close", "Back", "No"] |
| Proceed to next step | [e.g., "Continue" or "Next: [Step Name]"] | [e.g., "Proceed", "Go", "Next"] |
| Apply a filter | [e.g., "Apply Filters"] | [e.g., "Search", "Go", "OK"] |
| Open a detail view | [e.g., "View [Item]"] | [e.g., "Open", "See more", "Details"] |
| Send a message | [e.g., "Send"] | [e.g., "Submit", "Go"] |

---

## Error Messages

Errors must explain what happened AND what to do. Never blame the user.

**Structure:** `[What went wrong] + [What to do next]`

**Rules:**
- Never say "An error occurred" with no additional context
- Never say "Invalid input" — name the field and the issue
- Never use error codes alone — always translate to plain English
- Inline errors appear below the field, not as toasts
- Field-level errors: sentence case, end with a period
- Page-level errors: can be longer, may include a retry action

**Examples:**

| Situation | Write this | Not this |
|-----------|-----------|----------|
| Required field empty | [e.g., "Phone number is required."] | [e.g., "Error: field required"] |
| Invalid format | [e.g., "Enter a valid phone number (e.g., 555-123-4567)."] | [e.g., "Invalid format"] |
| Save failed (network) | [e.g., "Couldn't save. Check your connection and try again."] | [e.g., "Error 500: save failed"] |
| Duplicate entry | [e.g., "A customer with this email already exists. View their record?"] | [e.g., "Duplicate entry"] |
| Permission denied | [e.g., "You don't have permission to do this. Ask your manager."] | [e.g., "Access denied (403)"] |

---

## Empty States

Every empty state needs: a headline, a short explanation, and a primary CTA.

**Structure:**
1. **Headline** — name the thing that's empty: "No Repair Orders" (not "Nothing here")
2. **Explanation** — 1 sentence on why it's empty or what it's for
3. **CTA** — one primary action to get started

**Examples:**

| Screen | Headline | Explanation | CTA |
|--------|----------|-------------|-----|
| [e.g., RO list, new day] | [e.g., "No Repair Orders Yet"] | [e.g., "Create an RO when a customer drops off their vehicle."] | [e.g., "Create Repair Order"] |
| [e.g., Search results] | [e.g., "No Results Found"] | [e.g., "Try a different name or RO number."] | [e.g., "Clear Search"] |
| [e.g., First-time setup] | [e.g., "Set Up Two-Factor Authentication"] | [e.g., "Add an extra layer of security to your account."] | [e.g., "Enable 2FA"] |

---

## Numbers, Dates & Currency

| Type | Format | Example |
|------|--------|---------|
| **Currency** | [e.g., $X,XXX.XX — always 2 decimal places] | [e.g., "$1,250.00"] |
| **Large numbers** | [e.g., Use commas: 1,000 not 1000] | [e.g., "12,500 miles"] |
| **Date** | [e.g., MMM D, YYYY] | [e.g., "Aug 29, 2026"] |
| **Date + time** | [e.g., MMM D, YYYY at H:MM AM/PM] | [e.g., "Aug 29, 2026 at 9:30 AM"] |
| **Relative time** | [e.g., Under 1 hour: "X min ago"; over 24h: use date] | [e.g., "12 min ago" / "Aug 28"] |
| **Phone numbers** | [e.g., XXX-XXX-XXXX] | [e.g., "555-123-4567"] |

---

## Placeholder Text

- Use sentence case
- Describe the type of input, not just "Enter [field label]"
- Preferred: give a realistic example in parentheses

| Field | Preferred | Avoid |
|-------|-----------|-------|
| Search | [e.g., "Search by name, email, or RO number"] | [e.g., "Search…"] |
| Phone | [e.g., "555-123-4567"] | [e.g., "Enter phone number"] |
| Notes | [e.g., "Add notes visible to the service team"] | [e.g., "Enter text here"] |

---

## Loading States

| Duration | Pattern | Copy |
|----------|---------|------|
| < 300ms | No loading indicator needed | — |
| 300ms–2s | Spinner with label | [e.g., "Loading…" or "Saving…"] |
| > 2s | Progress indicator or skeleton | [e.g., "Loading repair orders…"] |
| Indeterminate long | Progress + cancel option | [e.g., "Processing payment… This may take a moment."] |

---

## Notes

- [Add any Tekion-specific vocabulary to always use or always avoid]
- [e.g., "Always say 'Repair Order' not 'Work Order' — RO is Tekion's term"]
- [e.g., "Always say 'Vehicle' not 'Car' — products serve trucks and fleet too"]

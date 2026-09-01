# Constraints: [Product Name]

> Technical, platform, accessibility, and business constraints that every designer must respect when building for this product. Claude uses this file to ensure specs and AC are realistic and enforceable.

---

## Platform & Device

| Constraint | Value | Notes |
|------------|-------|-------|
| **Primary OS** | [e.g., Windows 10/11] | [e.g., "Dealer-managed machines; macOS is rare"] |
| **Primary browser** | [e.g., Chrome (latest-2)] | [e.g., "IT-managed; version may lag 1–2 releases behind"] |
| **Secondary browser** | [e.g., Edge] | [e.g., "Some dealers standardize on Edge"] |
| **Unsupported browsers** | [e.g., IE11, Firefox] | [e.g., "Explicitly unsupported — do not design for them"] |
| **Minimum viewport** | [e.g., 1280×768] | [e.g., "Most desks run 1920×1080 but 1280 is the safe floor"] |
| **Touch support** | [Yes / No / Optional] | [e.g., "Some service desks use touchscreen monitors — min tap target 44px"] |
| **Mobile** | [Supported / Not supported / Partial] | [e.g., "Not supported — this product is desktop-only"] |

---

## Network & Performance

| Constraint | Value | Notes |
|------------|-------|-------|
| **Expected connection** | [e.g., Dealership WiFi / LAN] | [e.g., "Generally reliable but can degrade during peak hours"] |
| **Page load target** | [e.g., < 3 seconds on first load] | [e.g., "On a 10Mbps connection — avoid loading unnecessary assets"] |
| **Interaction response** | [e.g., < 300ms for UI feedback] | [e.g., "Instant feedback on click/tap — no perceptible delay"] |
| **Offline behavior** | [e.g., Not required / Graceful degradation] | [e.g., "Show a clear offline state — never silently fail"] |

---

## Accessibility

| Standard | Requirement | Notes |
|----------|-------------|-------|
| **Compliance level** | [e.g., WCAG 2.1 AA] | [Minimum required; AA is standard for enterprise software] |
| **Color contrast** | [e.g., 4.5:1 for normal text, 3:1 for large text] | [Enforce via ALLOY tokens — don't use custom colors outside tokens] |
| **Keyboard navigation** | [Required / Partial] | [e.g., "All interactive elements must be keyboard-accessible"] |
| **Screen reader** | [Required / Not required] | [e.g., "Required for admin and reporting screens"] |
| **Focus management** | [e.g., Required for modals and drawers] | [e.g., "Focus must trap inside modal and return to trigger on close"] |
| **Motion / animation** | [e.g., Respect prefers-reduced-motion] | [e.g., "No auto-playing animations; respect OS accessibility settings"] |

---

## Printing

| Constraint | Value | Notes |
|------------|-------|-------|
| **Print required** | [Yes / No / Some screens] | [e.g., "Repair orders, invoices, and deal jackets must be printable"] |
| **Print format** | [e.g., Letter / A4 / thermal receipt] | [e.g., "Standard letter for most; some ROs print to thermal printers"] |
| **Print styles** | [e.g., Required] | [e.g., "Spec must include a print layout note for any data-heavy screen"] |

---

## Integrations & Embedding

Constraints from third-party systems this product connects to or runs inside.

- [e.g., "ARC runs inside an iframe on some dealer DMS shells — full-page overlays and popups that break out of the iframe are not allowed"]
- [e.g., "Some screens communicate with OEM systems in real-time — assume data can be stale and always show last-updated timestamp"]
- [e.g., "Tekion Digital Retail embeds some ARC widgets — those screens must not depend on the full ARC navigation shell being present"]

---

## Data & Privacy

| Constraint | Value | Notes |
|------------|-------|-------|
| **PII handling** | [e.g., Mask SSN, partial card numbers] | [e.g., "Never show full SSN — show last 4 only"] |
| **Role-based visibility** | [Yes / No] | [e.g., "Some fields are only visible to managers — spec must call out permission gates"] |
| **Data retention display** | [e.g., N/A / Show archival state] | [e.g., "Voided or deleted records must still be visible in read-only state for audit"] |

---

## Business & Product Rules

Hard constraints set by the business or product team — not technical, but equally non-negotiable.

- [e.g., "All pricing fields must show two decimal places — never round to whole dollar in display"]
- [e.g., "Destructive actions (delete, void, reverse) require manager-level permission — always design a permission gate for these"]
- [e.g., "No feature may require a page reload to complete — single-page interaction model only"]
- [e.g., "Customer-facing outputs (printed ROs, emails, texts) must match the dealer's branding, not Tekion's"]

---

## Notes

Any constraints that don't fit the above categories.

- [Add freeform notes here]

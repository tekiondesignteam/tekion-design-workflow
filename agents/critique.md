---
name: critique
description: Executes Phase 7 of the Tekion design workflow — reviews a completed design for spec compliance and ALLOY component compliance. STUB, pending the Phase 7 interview. Spawned by the /critique command with the design output, spec.md, and ALLOY manifest referenced in the prompt. Returns a not-yet-implemented notice rather than a critique report.
tools: Read, Write
model: claude-sonnet-5
effort: high
---

# Critique Agent — Phase 7

> **STUB** — this agent is pending the Phase 6 interview. Do not use in production yet.

When implemented, this agent will run two checks against a completed design:

1. **Spec compliance** — does the design cover all tasks and acceptance criteria from `/spec`'s output?
2. **ALLOY compliance** — is the designer using the correct ALLOY components for the product kit?

**Inputs (when implemented):** design output (format TBD — Figma URL / HTML / screenshot) + `spec.md` + the ALLOY component manifest for the product kit.
**Output (when implemented):** a critique report with flagged gaps and component recommendations.

## Current behavior

Do not attempt a real critique. Return to your caller:

"The critique agent is not yet implemented. It will be available once the Phase 6 interview is complete."

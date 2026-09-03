---
name: spec
description: Turn approved flows into a spec your whole team can build from. Derives every task and acceptance criterion from confirmed sources, reviews it with you, and produces a single clean spec. Run after /tekion-design-workflow:flows.
---

# /tekion-design-workflow:spec — Spec Generation

## Step 1: Confirm the input

Confirm with the designer which files to use:
- The clarified brief's file path (from `/tekion-design-workflow:clarify`) and the approved `flows-[feature-slug].md` path (from `/tekion-design-workflow:flows`), from this session, OR
- Pasted content for either, if running standalone.

Spec generation reads the approved flow diagrams directly — if `/tekion-design-workflow:flows` hasn't been run and approved yet, tell the designer plainly there isn't a fallback path without them.

## Step 2: Spawn the spec agent

Use the Task tool to spawn the `spec` agent with a prompt containing both file paths (or pasted content), plus an ALLOY manifest reference if the designer already has one (optional at this phase — not required until Phase 5+).

The agent renders `spec-[feature-slug].html` and handles the review loop itself, directly with the designer, via `AskUserQuestion` — a pasted Copy Feedback block or free-text change requests, looped until approved. You don't need to relay this yourself.

## Step 3: Handle the agent's return

The agent returns `spec-[feature-slug].md`'s file path, the PRD score and band, and counts of Tasks/Flows/Assumptions.

Tell the designer:

> "Spec locked ✓ — starting wireframes."

If the designer wants to adjust anything at this point, make the change directly (you have file access) rather than re-running the whole agent for a small edit.

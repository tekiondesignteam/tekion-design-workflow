---
name: flows
description: Map every user journey before touching a single screen. Confirms the full flow set from the brief, generates visual flow diagrams, and loops on feedback until approved. Run after /tekion-design-workflow:clarify.
---

# /tekion-design-workflow:flows — User Flow Generation

## Step 1: Confirm the input

Confirm with the designer which brief to use:
- The file path from a prior `/tekion-design-workflow:clarify` run in this session, OR
- Pasted brief content, if running standalone.

If `/tekion-design-workflow:clarify` was run, it should have passed its confidence gate (≥75) or been explicitly overridden — if you don't know which, ask. If `/tekion-design-workflow:clarify` was skipped entirely, you can still proceed, but tell the designer plainly that any critical gaps `/tekion-design-workflow:clarify` would have caught are still open, and flows built on a thin brief may need rework later.

## Step 2: Spawn the flows agent

Use the Task tool to spawn the `flows` agent with a prompt containing the brief's file path (or its pasted content).

The agent handles both approval gates itself, directly with the designer, via `AskUserQuestion`:
1. The flow list (text) — add/edit/remove before any diagrams are generated.
2. The rendered `flows-[feature-slug].html` (visual) — looped until approved.

You don't need to relay either round yourself; the agent interacts with the designer directly during its own run.

## Step 3: Handle the agent's return

The agent returns the approved `flows-[feature-slug].html` path, the `flows-[feature-slug].md` path (written on final approval, for `/tekion-design-workflow:spec` to read), and the final flow list.

Tell the designer:

> "Flows approved. Run `/tekion-design-workflow:spec` next."

If the designer wants to adjust anything at this point, make the change directly (you have file access) rather than re-running the whole agent for a small edit.

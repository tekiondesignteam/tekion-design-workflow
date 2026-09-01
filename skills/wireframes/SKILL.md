---
name: wireframes
description: Phase 5 entry point. Confirms the designer has an approved spec-[feature-slug].md (from /tekion-design-workflow:spec), spawns the `wireframes` agent (Sonnet 5, high effort) to render flow-ordered swimlane wireframes, handle on-demand concept-exploration requests inline via the feedback loop, and run the click-to-annotate review loop, and relays the final wireframes file paths. Run after /tekion-design-workflow:spec.
---

# /tekion-design-workflow:wireframes — Wireframe Generation

## Step 1: Confirm the input

Confirm with the designer which file to use:
- The approved `spec-[feature-slug].md` file path from a prior `/tekion-design-workflow:spec` run in this session, OR
- Pasted spec content, if running standalone.

Wireframes reads the approved flow diagrams straight out of spec.md (no separate `flows-[feature-slug].md` read needed) — if `/tekion-design-workflow:spec` hasn't been run and approved yet, tell the designer plainly there isn't a fallback path without it.

## Step 2: Spawn the wireframes agent

Use the Task tool to spawn the `wireframes` agent with a prompt containing the spec's file path (or pasted content).

The agent renders `wireframes-[feature-slug].html` and handles the whole review loop itself, directly with the designer, via `AskUserQuestion` — including branching into an on-demand concept-exploration round (a separate `concepts-[feature-slug]-task[N].html` per request, kept permanently) whenever feedback asks for layout alternatives on a task rather than a direct edit. You don't need to relay any of this yourself.

## Step 3: Handle the agent's return

The agent returns `wireframes-[feature-slug].html`'s and `wireframes-[feature-slug].md`'s file paths, the Task/flow counts, which Tasks got a concept-exploration round and which direction was picked for each (with the kept concept file paths), and confirmation of approval.

Tell the designer:

> "Wireframes approved. Hi-fi (design generation) isn't built yet, so this is currently the end of the pipeline."

If the designer wants to adjust anything at this point, make the change directly (you have file access) rather than re-running the whole agent for a small edit. If the agent flagged that some feedback implied a flow or mechanism change rather than a layout change, tell the designer that needs to go back through `/tekion-design-workflow:flows`/`/tekion-design-workflow:spec` first.

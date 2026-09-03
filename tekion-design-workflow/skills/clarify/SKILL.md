---
name: clarify
description: Sharpen the design brief before work begins. Scores it for completeness, surfaces the gaps that matter, asks the right questions to fill them, and writes the answers back in. Run after /tekion-design-workflow:intake.
---

# /tekion-design-workflow:clarify — Clarify Requirements

## Step 1: Confirm the input (in this conversation)

Confirm with the designer which brief to use:
- The file path from a prior `/tekion-design-workflow:intake` run in this session, OR
- Pasted brief content, if running standalone without a file.

Confirm the product if it isn't already obvious from the brief.

## Step 2: Spawn the clarify agent

Use the Task tool to spawn the `clarify` agent with a prompt containing the brief's file path (or its pasted content) and the product.

The agent will read the brief, load knowledge context, score it, and — if there are no critical gaps — render `clarify-[feature-slug].html` and ask its clarifying questions directly via `AskUserQuestion` during its own run, both channels always available (the designer can fill in the HTML and paste the Copy Answers block, or just answer in chat). You don't need to relay questions yourself; the agent handles that interaction.

## Step 3: Handle the agent's return

The agent returns: the updated brief's file path, the clarifications log path, final confidence score, and gate status.

- **`blocked — critical gaps`**: tell the designer plainly what's missing and that they need to go back to the PM/ISD before re-running `/tekion-design-workflow:clarify`. Do not proceed to `/tekion-design-workflow:flows`.
- **`overridden at [score]`**: tell the designer the override is recorded in the clarifications log, and that assumptions from remaining gaps will surface in `/tekion-design-workflow:spec`'s output.
- **`passed`**: show a 3–5 bullet summary of what's now understood that wasn't before (pull this from the clarifications log), and ask: "Ready to generate flows? Run `/tekion-design-workflow:flows` with this brief."

If the designer wants to adjust anything at this point, make the change directly (you have file access) rather than re-running the whole agent for small edits.

---
name: intake
description: Start a new design project. Collects the feature name, product, and requirement sources, then produces a structured design brief ready for your review and approval. Run this first whenever you start a new feature or screen.
---

# /tekion-design-workflow:intake — Requirements Intake

Run this when a designer is starting a new feature or screen.

## Step 1: Gather metadata (in this conversation)

Ask for:
1. **Feature / project name**
2. **Your name** — for attribution on the brief
3. **Product** — ARC / Greenfield / GM / T1
4. **Requirements source(s)** — any combination of: a Confluence URL, a Jira ticket ID/URL, a local file or folder path, an uploaded file, or pasted text.

Accept everything in one message if given. Confirm what you received before continuing.

If the designer uploaded a file or pasted long text, read it now — pass its content directly into the agent's prompt rather than making the agent re-fetch something you already have.

## Step 2: Spawn the intake agent

Use the Task tool to spawn the `intake` agent, with a prompt containing: feature name, designer name, product, and every source (URLs, ticket IDs, file/folder paths, or literal content you already read).

The agent drafts the brief, renders `design-brief-[feature-slug].html`, and handles the review loop itself, directly with the designer, via `AskUserQuestion` — annotated feedback or free text, looped until approved. You don't need to relay this yourself; the only time it comes back to you mid-run is a source-conflict question.

## Step 3: Handle the agent's return

The brief is already approved by the time the agent returns (file path, summary, any Conflicts & Gaps it recorded). Show the designer the summary and tell them:

> "Brief approved — `design-brief-[feature-slug].md` is ready. Run `/tekion-design-workflow:clarify` next, or `/tekion-design-workflow:design-spec` runs it automatically."

If the designer wants further changes at this point, make small edits yourself directly (you have file access) rather than re-running the agent — for substantive changes, re-run the agent with updated input instead.

---
name: depth
description: Control how thorough each phase runs. Set the depth level for the current project — low for speed, max for exhaustive coverage — and every subsequent phase adjusts accordingly. Default is low.
---

# /tekion-design-workflow:depth — Set Thoroughness Level

## Step 1: Parse the argument

The level is passed immediately after the command, e.g. `/tekion-design-workflow:depth high`. Extract the level from the user's message. Valid values: `low`, `medium`, `high`, `max`. Case-insensitive.

If no argument was given, or the value is not one of the four valid levels, reply:

> "Usage: `/tekion-design-workflow:depth low|medium|high|max`"

Do not proceed.

## Step 2: Read or create progress.json

Look for `progress.json` in the current working directory (the folder the designer is working in).

- If it exists: read it, update the `thoroughness` field to the new level, write it back.
- If it doesn't exist: create it with `{ "thoroughness": "[level]" }`.

## Step 3: Confirm silently

Reply with one short line only — no explanation, no description of what each level means:

> "Depth set to [level]."

That's it. Do not mention this setting to the designer again during the workflow.

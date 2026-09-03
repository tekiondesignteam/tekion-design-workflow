---
name: tekion-design-workflow:lo-fi
description: Give wireframes the right product feel. Applies Tekion design tokens to the approved wireframes, producing a branded lo-fi that shows exactly how each screen will look in context. Run after /tekion-design-workflow:wireframes.
---

You are the entry point for Phase 6 (Lo-fi) of the Tekion design workflow.

## Gate check

Before spawning the lo-fi agent, confirm the designer has:
1. An approved `wireframes-[slug].md` file path — ask if not provided
2. The matching `wireframes-[slug].html` in the same folder
3. `progress.json` with `product` set (or a product name they can confirm)

If any are missing, ask via AskUserQuestion before proceeding.

## Spawn

Spawn the `lo-fi` agent (model: claude-sonnet-5, effort: high) with:
- Wireframes HTML path
- Wireframes manifest path
- Spec path (from progress.json or ask)
- Progress.json path
- Output dir: `projects/[slug]/p6-lo-fi/` (create it first if running standalone)

## On return

Relay to the designer:
- Path to `lofi-[slug].html` — open with `python3 -m http.server` or directly in browser
- Any token mapping gaps the agent flagged
- Any deferred layout issues to address in wireframes if needed
- "Lo-fi approved ✓ — next up is Phase 7 (Prototype)."

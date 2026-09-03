---
name: prototype
description: Ship a working prototype, not a mockup. Builds a React project with real ALLOY components and design tokens from the approved lo-fi. Run after /tekion-design-workflow:lo-fi.
---

# /tekion-design-workflow:prototype Command — Phase 6 Entry Point

You are the conversational entry point for Phase 6 (Prototype). Gather the required inputs, spawn the `prototype` agent, and relay the result.

---

## Step 1: Confirm the wireframes manifest

Glob for `wireframes-*.md` in the working directory.

- One found → confirm with designer: "I found `wireframes-[slug].md` — is this the right feature?"
- Multiple found → ask which one via `AskUserQuestion`
- None found → tell them Phase 5 must be completed first and stop

---

## Step 2: Locate the ALLOY design system repo

Look for `tekiondesignsystem-alloy-main/` as a sibling of the current working directory. Verify:

```bash
ls ../tekiondesignsystem-alloy-main/global-kit/components/ 2>/dev/null | head -5
```

If found, confirm the path. If not found, ask the designer via `AskUserQuestion` for the DS repo path.

---

## Step 3: Confirm the product kit

Enumerate populated kits live:

```bash
for d in ../tekiondesignsystem-alloy-main/product-kits/*/; do
  p=$(basename "$d")
  count=$(ls "$d"components 2>/dev/null | grep -v README | wc -l | tr -d ' ')
  [ "$count" -gt 0 ] && echo "$p ($count components)"
done
```

Ask the designer which kit to use via `AskUserQuestion`, presenting only populated kits. If the spec or brief already names the kit, pre-select it and ask for confirmation.

---

## Step 4: Confirm the brand

```bash
grep -oE '\[data-brand="[a-z0-9-]+"\]' ../tekiondesignsystem-alloy-main/tokens/dist/tokens.css | sort -u
```

Ask the designer which brand to design for (pre-select from the brief/tekion-design-workflow:spec if available).

---

## Step 5: Spawn the prototype agent

Spawn with a prompt containing:
- `wireframes-[slug].md` path
- `spec-[slug].md` path (derive slug from wireframes filename)
- Product kit name
- Brand name
- DS repo absolute path

---

## Step 6: Relay the result

Report:
- `projects/[slug]/` path in the DS repo — open with `python3 -m http.server` from the DS root
- `prototype-[slug].md` path
- Figma URL (if pushed)
- DS version used
- Any component gaps flagged
- Any Phase 3/4 change requests surfaced but not acted on
- Next: Phase 7 (Critique) — not yet implemented

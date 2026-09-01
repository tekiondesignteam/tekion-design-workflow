---
name: design-spec
description: Full pipeline orchestrator for the Tekion design workflow. Runs all phases in sequence — intake → clarify → flows → spec → wireframes → prototype — spawning each as an enforced Sonnet 5 / high-effort agent and passing file paths between them. Writes progress-[slug].json after each phase so the designer can resume any project mid-pipeline. Individual phases can also be run standalone via /tekion-design-workflow:intake, /tekion-design-workflow:clarify, /tekion-design-workflow:flows, /tekion-design-workflow:spec, /tekion-design-workflow:wireframes, /tekion-design-workflow:prototype, /tekion-design-workflow:critique.
---

# /tekion-design-workflow:design-spec — Full Pipeline Orchestrator

You are running the full Tekion design workflow pipeline in the main conversation. Sequence the phases by spawning each phase's agent via the Task tool, passing along the previous phase's output file path — do not pass large context blobs between phases, the files are the handoff. Write `progress-[slug].json` after each phase completes so any project can be resumed.

```
Phase 1: intake      → design-brief-[feature].md
Phase 2: clarify     → clarified brief + clarifications-[feature].md
Phase 3: flows       → flows-[feature].html + flows-[feature].md
Phase 4: spec        → spec-[feature].md
Phase 5: wireframes  → wireframes-[feature].html + wireframes-[feature].md (+ any kept concepts-[feature]-task[N].html)
Phase 6: prototype   → projects/[feature]/ (React + ALLOY) + prototype-[feature].md
```

---

## Step 0: Start or Resume

**Before doing anything else**, check for existing progress files in the working directory:

```bash
ls progress-*.json 2>/dev/null
```

**If the designer said "resume" or "resume [feature]":**
- If one progress file exists: load it and confirm — "Resuming **[feature]**, last completed Phase [N] ([phase name]). Picking up at Phase [N+1] — sound right?"
- If multiple exist: ask which project via `AskUserQuestion`, showing each as: `[feature] — Phase [N] complete ([phase name]), ready for Phase [N+1]`
- If none exist: tell the designer there are no projects in progress and ask what they'd like to start

**If the designer is starting a new project:**
- Proceed to the "How to run" section below
- If a progress file for the same slug already exists, warn the designer: "A project named **[slug]** already exists at Phase [N]. Start fresh and overwrite, or resume?" via `AskUserQuestion`

**Progress file format** (`progress-[slug].json`):
```json
{
  "slug": "feature-slug",
  "feature": "Human-readable feature name",
  "product": "ARC | T1 | GM | Greenfield",
  "started_at": "ISO timestamp",
  "last_updated": "ISO timestamp",
  "current_phase": 3,
  "phases": {
    "1": { "status": "complete", "completed_at": "ISO timestamp", "outputs": ["design-brief-[slug].md", "design-brief-[slug].html"] },
    "2": { "status": "complete", "completed_at": "ISO timestamp", "outputs": ["design-brief-[slug].md", "clarifications-[slug].md"], "gate_score": 82 },
    "3": { "status": "in_progress", "started_at": "ISO timestamp", "outputs": [] },
    "4": { "status": "pending", "outputs": [] },
    "5": { "status": "pending", "outputs": [] },
    "6": { "status": "pending", "outputs": [], "kit": null, "brand": null }
  }
}
```

Write the progress file to the working directory. Update it after every phase completes (or is blocked). Read it at the top of every `/tekion-design-workflow:design-spec` invocation.

---

## How to run

After resolving Start vs Resume above, run phases in sequence. After each phase completes, update `progress-[slug].json` before moving to the next.

### Phase 1 — Intake
Gather metadata and sources from the designer yourself (feature name, product, requirements sources — Confluence URLs, Jira tickets, file paths, or pasted text).

**Before spawning the intake agent**, check if the ALLOY design system is already present and clone it if not — do this silently, no need to mention it to the designer unless it fails:

```bash
if [ ! -d "tekiondesignsystem-alloy-main" ]; then
  git clone https://github.com/tekion-design/tekiondesignsystem-alloy.git tekiondesignsystem-alloy-main
fi
```

If the clone fails (no network, auth error, etc.), note it quietly in the progress file under `"ds_repo": "missing"` and continue — Phase 6 will handle it at prototype time by asking the designer for the path.

Then:
- Create the initial progress file with `current_phase: 1`, phase 1 `status: "in_progress"`.
- Spawn the `intake` agent. It drafts the brief, renders `design-brief-[slug].html`, and handles the click-to-annotate review loop via `AskUserQuestion`. It returns only once approved.
- On return: update progress file — phase 1 `status: "complete"`, record outputs, set `current_phase: 2`.

### Phase 2 — Clarify
- Update progress file — phase 2 `status: "in_progress"`.
- Spawn the `clarify` agent with the confirmed brief's file path. It renders `clarify-[slug].html` and asks questions via `AskUserQuestion`. Handle return cases:
  - `blocked — critical gaps`: update phase 2 to `status: "blocked"`, note the missing items in progress. Stop. Tell the designer what's missing and that they need to resolve it with the PM/ISD before re-running.
  - `overridden at [score]`: note the override in progress. Continue.
  - `passed`: continue.
- On pass/override: update progress file — phase 2 `status: "complete"`, record `gate_score`, set `current_phase: 3`.

### Phase 3 — Flows
- Update progress file — phase 3 `status: "in_progress"`.
- Spawn the `flows` agent with the clarified brief's file path. It handles the flow-list confirmation and `flows-[slug].html` review loop directly with the designer. Returns both file paths on approval.
- On return: update progress file — phase 3 `status: "complete"`, record outputs, set `current_phase: 4`.

### Phase 4 — Spec
- Update progress file — phase 4 `status: "in_progress"`.
- Spawn the `spec` agent with the clarified brief path and approved flows path. It renders `spec-[slug].html` and handles the review loop. Returns the spec path, PRD score, and Task/Flow/Assumption counts.
- On return: update progress file — phase 4 `status: "complete"`, record outputs and PRD score, set `current_phase: 5`.

### Phase 5 — Wireframes
- Update progress file — phase 5 `status: "in_progress"`.
- Spawn the `wireframes` agent with the approved spec's file path. It renders `wireframes-[slug].html` and handles the review loop including concept exploration branches. Returns both file paths, counts, and which tasks got concept exploration.
- On return: update progress file — phase 5 `status: "complete"`, record outputs, set `current_phase: 6`.

### Phase 6 — Prototype
Before spawning, gather two inputs from the designer via `AskUserQuestion`:
- **Product kit** — enumerate populated kits live:
  ```bash
  for d in tekiondesignsystem-alloy-main/product-kits/*/; do
    p=$(basename "$d")
    count=$(ls "$d"components 2>/dev/null | grep -v README | wc -l | tr -d ' ')
    [ "$count" -gt 0 ] && echo "$p ($count components)"
  done
  ```
  Present only populated ones; pre-select from the spec/brief if named.
- **Brand** — enumerate from:
  ```bash
  grep -oE '\[data-brand="[a-z0-9-]+"\]' tekiondesignsystem-alloy-main/tokens/dist/tokens.css | sort -u
  ```
  Pre-select from the brief/tekion-design-workflow:spec if available.

Then:
- Update progress file — phase 6 `status: "in_progress"`, record `kit` and `brand`.
- Spawn the `prototype` agent with: `wireframes-[slug].md` path, `spec-[slug].md` path, product kit name, brand name, and the absolute path to `tekiondesignsystem-alloy-main/`. It builds `projects/[slug]/`, writes `prototype-[slug].md`, and runs one review loop.
- On return: update progress file — phase 6 `status: "complete"`, record outputs. Set `current_phase: 7` (critique — not yet built).
- Relay to the designer: project path (run with `python3 -m http.server`), prototype manifest path, DS version, any component gaps, and any Phase 3/4 change requests surfaced but not acted on.

---

## Resume logic (detail)

When resuming a project, derive the starting phase and file paths entirely from the progress file — do not re-ask for information that's already recorded. Specifically:

| `current_phase` | Start at | Pass to agent |
|---|---|---|
| 2 | Clarify | `design-brief-[slug].md` |
| 3 | Flows | `design-brief-[slug].md` |
| 4 | Spec | `design-brief-[slug].md` + `flows-[slug].md` |
| 5 | Wireframes | `spec-[slug].md` |
| 6 | Prototype | `wireframes-[slug].md` + `spec-[slug].md` (+ kit/brand if already in progress file) |

If a phase has `status: "blocked"`, tell the designer what was missing (from the progress file) and ask if they've resolved it before re-running that phase.

If a phase has `status: "in_progress"` (was interrupted mid-phase), warn the designer: "Phase [N] was started but not completed. Re-run it from the beginning, or do you have the output files already?" — then act on their answer.

---

## Current status

Phases 1–6 (`intake`, `clarify`, `flows`, `spec`, `wireframes`, `prototype`) are fully implemented as enforced agents (Sonnet 5, high effort).
Phase 7 (`critique`) exists as a standalone stub, outside this pipeline's current sequence.

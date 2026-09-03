---
name: design-spec
description: The full Tekion design workflow, start to finish. Runs every phase in sequence — intake, clarify, flows, spec, wireframes, lo-fi, prototype — with progress saved after each step so you can pause and pick back up anytime. Individual phases can also run standalone.
---

# /tekion-design-workflow:design-spec — Full Pipeline Orchestrator

You are running the full Tekion design workflow pipeline in the main conversation. Sequence the phases by spawning each phase's agent via the Task tool, passing along the previous phase's output file path — do not pass large context blobs between phases, the files are the handoff. Each project lives in its own folder; update `progress.json` after every phase.

## Folder structure

All projects live inside a `projects/` folder at the working directory root. Each project gets its own `[slug]/` subfolder there:

```
[working dir]/
  projects/
    [slug]/
      progress.json
      p1-intake/
        design-brief-[slug].md
        design-brief-[slug].html
      p2-clarify/
        clarifications-[slug].md
        clarify-[slug].html
      p3-flows/
        flows-[slug].md
        flows-[slug].html
      p4-spec/
        spec-[slug].md
        spec-[slug].html
      p5-wireframes/
        wireframes-[slug].md
        wireframes-[slug].html
        concepts-[slug]-task[N].html   (kept concept explorations, if any)
      p6-lo-fi/
        lofi-[slug].md
        lofi-[slug].html
      p7-prototype/
        prototype-[slug].md
        src/                           (React + ALLOY app)
      design-systems/
        tekiondesignsystem-alloy-main/ (cloned in Phase 1)
```

The project root is always `[working dir]/projects/[slug]/`. Create this folder first, then create each phase subfolder inside it before writing into it. Pass absolute paths to agents — never relative ones.

---

## Step 0: Start or Resume

**Before doing anything else**, check for existing projects in the `projects/` folder:

```bash
ls projects/ 2>/dev/null
```

**If the designer said "resume":**
- List project slugs found under `projects/`, then load `projects/[slug]/progress.json` for the one they want and confirm — "Resuming **[feature]**, last completed Phase [N] ([phase name]). Picking up at Phase [N+1] — sound right?"
- If `projects/` is empty or doesn't exist: tell the designer there's no project in progress here and ask what they'd like to start

**If the designer is starting a new project:**
- Proceed to the "How to run" section below
- If a `projects/[slug]/progress.json` already exists for the same slug, warn: "A project **[feature]** already exists here at Phase [N]. Start fresh and overwrite, or resume?" via `AskUserQuestion`

**Progress file format** (`projects/[slug]/progress.json`):
```json
{
  "slug": "feature-slug",
  "feature": "Human-readable feature name",
  "product": "ARC | T1 | GM | Greenfield",
  "thoroughness": "medium",
  "started_at": "ISO timestamp",
  "last_updated": "ISO timestamp",
  "current_phase": 3,
  "phases": {
    "1": { "status": "complete", "completed_at": "ISO timestamp", "outputs": ["projects/[slug]/p1-intake/design-brief-[slug].md", "projects/[slug]/p1-intake/design-brief-[slug].html"] },
    "2": { "status": "complete", "completed_at": "ISO timestamp", "outputs": ["projects/[slug]/p2-clarify/clarifications-[slug].md", "projects/[slug]/p2-clarify/clarify-[slug].html"], "gate_score": 82 },
    "3": { "status": "in_progress", "started_at": "ISO timestamp", "outputs": [] },
    "4": { "status": "pending", "outputs": [] },
    "5": { "status": "pending", "outputs": [] },
    "6": { "status": "pending", "outputs": [], "kit": null, "brand": null }
  }
}
```

Write `progress.json` inside `projects/[slug]/`. Update after every phase completes or is blocked. Read at the top of every invocation.

---

## How to run

After resolving Start vs Resume above, run phases in sequence. After each phase completes, update `progress.json` before moving to the next.

### Phase 1 — Intake

Use `AskUserQuestion` for all gathering — never ask in plain prose. The sequence:

**Step 1 — Check if a slug was passed inline**

When the skill is invoked, check if the designer typed a slug after the command — e.g. `/tekion-design-workflow:design-spec parts-inventory-dashboard`. If a slug is present, use it directly and skip the feature name question.

**Step 2 — Ask feature name AND product**

- If a slug was already provided: ask only the product question via AskUserQuestion (one question).
- If no slug was provided: ask both together in a single AskUserQuestion call (two questions):

Question 1 — Feature name:
- header: "Feature name"
- question: "What's the feature called? Type your slug in the Other field — e.g. `nl-search-enhancements` or `service-appointment-modal`."
- options (just two stubs to enable the widget — the real answer always comes via "Other"):
  - label: "Type my own", description: "Enter your feature slug in the field below"
  - label: "Not sure yet", description: "We'll figure out a slug together"
- multiSelect: false

Question 2 — Product:
- header: "Product"
- question: "Which Tekion product is this for?"
- options:
  - label: "ARC", description: "Dealer-facing operations platform"
  - label: "T1", description: "AI agent platform"
  - label: "GM", description: "General Motors dealer experience"
  - label: "Greenfield", description: "New product / no existing system"
- multiSelect: false

**Step 3 — Create folders, then tell the designer where to put things** (plain message, not AskUserQuestion):

After getting feature name and product, immediately create the project structure:
```bash
mkdir -p projects/[slug]/p1-intake projects/[slug]/p2-clarify projects/[slug]/p3-flows projects/[slug]/p4-spec projects/[slug]/p5-wireframes projects/[slug]/p6-lo-fi projects/[slug]/p7-prototype
```

Then send a plain message like:
> "All set! One quick setup step — open Terminal, `cd` into the `projects/[slug]/` folder, and run:
> ```
> python3 -m http.server 8000
> ```
> Keep that running for the whole session — every phase will serve its HTML there so you can open files in your browser at `http://localhost:8000/`. Then, here's how to share your requirements:
> - 📁 **Drop files** into the `projects/[slug]/p1-intake/` folder (PDFs, docs, specs, anything)
> - 💬 **Attach files** directly in this chat — I'll move them into `projects/[slug]/p1-intake/` automatically
> - 🔗 **Paste Confluence URLs or Jira ticket IDs** and I'll fetch them
> - ✏️ **Paste content** directly here
>
> Let me know when you're ready and I'll kick off the intake!"

Wait for the designer's reply. When they respond (confirming files are dropped, pasting links, or attaching files):
- If they attached files in chat, copy them into `p1-intake/` before spawning the agent.
- Then proceed to spawn intake.

**Tone throughout** — keep it warm and conversational. Examples:
- Not: "Please provide the feature name/slug." → Yes: "What's the feature called? Give it a short slug we'll use for all the files."
- Not: "Processing your inputs." → Yes: "Got it — spinning up the intake agent now 🚀"
- Not: "Phase 1 complete. Proceeding to Phase 2." → Yes: "Brief looks great! Moving on to clarify — this is where we pressure-test what we know."

**Before spawning the intake agent**:

1. Ensure the ALLOY design system repo is present — this is required for Phase 7. Do this now, before intake runs, so Phase 7 never blocks on a missing DS.

   **Step A — Check if already cloned in this project folder:**
   ```bash
   ls projects/[slug]/design-systems/tekiondesignsystem-alloy-main/global-kit/components/ 2>/dev/null | head -3
   ```
   If this returns component names → already present. Record `"ds_repo": "[absolute path]"` in `progress.json`. Skip to Step C.

   **Step B — Check gh CLI is installed and authenticated:**
   ```bash
   gh auth status 2>&1
   ```
   - If output contains `Logged in to github.com` → proceed to Step B2.
   - If `gh` is not installed or not authenticated → tell the designer:
     "GitHub CLI isn't set up yet — I need it to download the ALLOY design system. Open Terminal and run these three commands one by one:
     ```
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     brew install gh
     gh auth login
     ```
     The first installs Homebrew (will ask for your Mac password). The second installs GitHub CLI. For `gh auth login`: choose GitHub.com → HTTPS → Login with a web browser. Once all three are done, come back and confirm — I'll handle the clone automatically."

     Use `AskUserQuestion`:
     - header: "gh setup"
     - question: "Run the three Terminal commands above, then confirm when done."
     - options: ["Done — gh is installed and I'm logged in"]
     After they confirm, re-run `gh auth status` to verify before continuing.

   **Step B2 — Clone via GitHub CLI:**
   ```bash
   mkdir -p projects/[slug]/design-systems
   gh repo clone tekion-design/tekiondesignsystem-alloy projects/[slug]/design-systems/tekiondesignsystem-alloy-main 2>&1
   ls projects/[slug]/design-systems/tekiondesignsystem-alloy-main/global-kit/components/ 2>/dev/null | head -3
   ```
   - If the listing returns component names → record `"ds_repo": "[absolute path to projects/[slug]/design-systems/tekiondesignsystem-alloy-main]"` in `progress.json`. Proceed to Step C.
   - If the clone fails even after auth → tell the designer the exact error, and ask them to run the clone manually in Terminal and confirm when done. Then re-run the `ls` check from Step A.

   **Step C — DS verified.** The `"ds_repo"` value in `progress.json` is the verified absolute path the prototype agent will receive in Phase 7.

2. Create `progress.json` with `current_phase: 1`, phase 1 `status: "in_progress"`, and `thoroughness: "medium"` (unless `progress.json` already contains a `thoroughness` value set by `/tekion-design-workflow:depth` — preserve that value, never overwrite it).

3. Read `thoroughness` from `progress.json` — default to `"medium"` if the field is absent. Pass `--depth=[thoroughness]` in every agent spawn prompt below.

4. Spawn the `intake` agent, telling it to write all outputs into `projects/[slug]/p1-intake/`. It renders `design-brief-[slug].html`, handles the review loop, and returns only once approved.

On return: update progress — phase 1 `status: "complete"`, record full output paths, set `current_phase: 2`. Tell the designer something like: "Brief approved ✓ — kicking off Phase 2 (Clarify) now."

### Phase 2 — Clarify
- Update progress — phase 2 `status: "in_progress"`. Tell the designer: "Now let's stress-test the brief — checking for gaps and anything that's still fuzzy."
- Spawn the `clarify` agent with `projects/[slug]/p1-intake/design-brief-[slug].md`, `--depth=[thoroughness]`, telling it to write outputs into `projects/[slug]/p2-clarify/`. Handle return cases:
  - `blocked — critical gaps`: update to `status: "blocked"`, note missing items. Tell the designer warmly what's missing: "Looks like we hit a wall — there are some gaps that need answers from the PM before we can move forward. Here's what's needed: [items]"
  - `overridden at [score]`: note override. Continue.
  - `passed`: continue.
- On pass/override: update progress — phase 2 `status: "complete"`, record paths and `gate_score`, set `current_phase: 3`. Tell the designer: "Clarity check done ✓ — moving to flows."

### Phase 3 — Flows
- Update progress — phase 3 `status: "in_progress"`. Tell the designer: "Mapping out the flows now — this shapes everything in spec and wireframes."
- Spawn the `flows` agent with the clarified brief path and `--depth=[thoroughness]`, writing outputs into `projects/[slug]/p3-flows/`.
- On return: update progress — phase 3 `status: "complete"`, record paths, set `current_phase: 4`. Tell the designer: "Flows approved ✓ — on to the spec."

### Phase 4 — Spec
- Update progress — phase 4 `status: "in_progress"`. Tell the designer: "Building the full spec now — tasks, acceptance criteria, the whole thing."
- Spawn the `spec` agent with the brief path, flows path, and `--depth=[thoroughness]`, writing outputs into `projects/[slug]/p4-spec/`.
- On return: update progress — phase 4 `status: "complete"`, record paths and PRD score, set `current_phase: 5`. Tell the designer: "Spec locked ✓ — starting wireframes."

### Phase 5 — Wireframes
- Update progress — phase 5 `status: "in_progress"`. Tell the designer: "Wiring up the screens — one swimlane per task."
- Spawn the `wireframes` agent with the spec path, `--depth=[thoroughness]`, writing outputs into `projects/[slug]/p5-wireframes/`.
- On return: update progress — phase 5 `status: "complete"`, record paths, set `current_phase: 6`. Tell the designer: "Wireframes approved ✓ — on to lo-fi, where we apply the product's visual tokens."

### Phase 6 — Lo-fi

- Update progress — phase 6 `status: "in_progress"`. Tell the designer: "Applying the **{product}** design system tokens now — same layouts, real colors and typography."
- Spawn the `lo-fi` agent with: wireframes HTML path, wireframes manifest path, spec path, `progress.json` path, and output dir `projects/[slug]/p6-lo-fi/`. It loads `${CLAUDE_PLUGIN_ROOT}/references/lo-fi/{product}/design.md`, applies tokens to the wireframes, runs the review loop, and returns once approved.
- On return: update progress — phase 6 `status: "complete"`, record `lofi-[slug].html` and `lofi-[slug].md` paths, set `current_phase: 7`. Tell the designer: "Lo-fi approved ✓ — last phase, prototype time."

### Phase 7 — Prototype

**Pre-check — verify the DS repo before asking anything else:**

Read `"ds_repo"` from `progress.json`. Then verify it's still there:
```bash
ls [ds_repo]/global-kit/components/ 2>/dev/null | head -3
```
- If the listing returns component names → proceed.
- If missing or empty → attempt the clone again via `gh` (same flow as Phase 1 Steps B/B2/B3). If the re-clone succeeds, update `"ds_repo"` in progress.json and proceed. If it fails again, stop and ask the designer to provide the path. Do not spawn the prototype agent without a verified DS repo.

Before spawning, gather two inputs from the designer via `AskUserQuestion`:
- **Product kit** — enumerate populated kits live (use `ds_repo` from progress.json):
  ```bash
  for d in [ds_repo]/product-kits/*/; do
    p=$(basename "$d")
    count=$(ls "$d"components 2>/dev/null | grep -v README | wc -l | tr -d ' ')
    [ "$count" -gt 0 ] && echo "$p ($count components)"
  done
  ```
  Present only populated ones; pre-select from the spec/brief if named.
- **Brand** — enumerate from:
  ```bash
  grep -oE '\[data-brand="[a-z0-9-]+"\]' [ds_repo]/tokens/dist/tokens.css | sort -u
  ```
  Pre-select from the brief/spec if available.

Then:
- Update progress — phase 7 `status: "in_progress"`, record `kit` and `brand`.
- Spawn the `prototype` agent with: lo-fi HTML path, wireframes manifest path, spec path, product kit name, brand name, the `"ds_repo"` absolute path from `progress.json`, and output dir `projects/[slug]/p7-prototype/`. It builds the React + ALLOY app there, writes `prototype-[slug].md`, and runs one review loop.
- On return: update progress — phase 7 `status: "complete"`, record outputs. Set `current_phase: 8`.
- Relay to the designer: project path (`projects/[slug]/p7-prototype/src/` — run with `python3 -m http.server`), manifest path, DS version, component gaps, and any Phase 3/4 change requests not yet acted on.

---

## Resume logic (detail)

When resuming a project, derive the starting phase and file paths entirely from the progress file — do not re-ask for information that's already recorded. Specifically:

| `current_phase` | Start at | Pass to agent |
|---|---|---|
| 2 | Clarify | `projects/[slug]/p1-intake/design-brief-[slug].md` |
| 3 | Flows | `projects/[slug]/p1-intake/design-brief-[slug].md` |
| 4 | Spec | `projects/[slug]/p1-intake/design-brief-[slug].md` + `projects/[slug]/p3-flows/flows-[slug].md` |
| 5 | Wireframes | `projects/[slug]/p4-spec/spec-[slug].md` |
| 6 | Lo-fi | `projects/[slug]/p5-wireframes/wireframes-[slug].md` + `projects/[slug]/p5-wireframes/wireframes-[slug].html` + `projects/[slug]/p4-spec/spec-[slug].md` |
| 7 | Prototype | `projects/[slug]/p6-lo-fi/lofi-[slug].md` + `projects/[slug]/p5-wireframes/wireframes-[slug].md` + `projects/[slug]/p4-spec/spec-[slug].md` (+ kit/brand if already in progress file) |

If a phase has `status: "blocked"`, tell the designer what was missing (from the progress file) and ask if they've resolved it before re-running that phase.

If a phase has `status: "in_progress"` (was interrupted mid-phase), warn the designer: "Phase [N] was started but not completed. Re-run it from the beginning, or do you have the output files already?" — then act on their answer.

---

## Current status

Phases 1–7 (`intake`, `clarify`, `flows`, `spec`, `wireframes`, `lo-fi`, `prototype`) are fully implemented as enforced agents (Sonnet 5, high effort).
Phase 8 (`critique`) exists as a standalone stub, outside this pipeline's current sequence.

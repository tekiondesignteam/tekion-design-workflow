# Tekion Design Workflow Plugin

From brief to prototype — the full Tekion design workflow, phase by phase.

## Setup (one-time)

### 1. Install the plugin
Upload `tekion-design-workflow.plugin` in the Claude desktop app.

### 2. Clone the ALLOY design system
The prototype phase (Phase 6) builds against the real ALLOY design system. Clone it once into your working directory before running `/design-spec`:

```bash
git clone https://github.com/tekion-design/tekiondesignsystem-alloy.git tekiondesignsystem-alloy-main
```

> **Important:** The folder must be named `tekiondesignsystem-alloy-main` and sit alongside your project files — Claude finds it automatically.

---

## Usage

### Run the full pipeline
```
/design-spec
```
Claude will ask for your feature name, product, and requirements sources, then run all 6 phases in sequence.

### Run a single phase
```
/intake       → Phase 1: Requirements → Design brief
/clarify      → Phase 2: Gap analysis + completeness scoring
/flows        → Phase 3: User flow diagrams
/spec         → Phase 4: Tasks + acceptance criteria
/wireframes   → Phase 5: Structural wireframes
/prototype    → Phase 6: React + ALLOY prototype
```

### Resume a project
Just say **"resume"** — Claude will find your progress file and pick up where you left off.

---

## Phases

| Phase | Command | Output |
|-------|---------|--------|
| 1 | `/intake` | `design-brief-[slug].md` |
| 2 | `/clarify` | Updated brief + `clarifications-[slug].md` |
| 3 | `/flows` | `flows-[slug].html` + `flows-[slug].md` |
| 4 | `/spec` | `spec-[slug].md` |
| 5 | `/wireframes` | `wireframes-[slug].html` + `wireframes-[slug].md` |
| 6 | `/prototype` | `projects/[slug]/` (React + ALLOY) |

---

## Products supported
ARC · T1 · GM · Greenfield

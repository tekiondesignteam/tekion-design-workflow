# Tekion Design Workflow Plugin

From brief to prototype, the full Tekion design workflow, phase by phase.

## Setup (one-time)

### 1. Install the plugin

In Claude Code:

```
/plugin marketplace add tekiondesignteam/tekion-design-workflow
/plugin install tekion-design-workflow@tekion-design
```

You only do this once. The plugin stays available in every session and every
project after that.

### 2. Authorize the Atlassian connector

Phase 1 reads requirements straight out of Confluence and Jira. Without the
Atlassian connector authorized in Claude Code, that phase will fail.

### 3. Clone the ALLOY design system

Phase 6 builds against the real ALLOY design system. Clone it once into your
working directory:

```bash
git clone https://github.com/tekion-design/tekiondesignsystem-alloy.git tekiondesignsystem-alloy-main
```

> The folder must be named `tekiondesignsystem-alloy-main` and sit alongside
> your project files. Claude finds it automatically.

---

## Usage

Every command is namespaced with the plugin name. Typing `/intake` on its own
will not work. Type `/tekion` at the prompt and autocomplete will offer the
full list.

### Run the full pipeline

```
/tekion-design-workflow:design-spec
```

Claude asks for your feature name, product, and requirements sources, then runs
the phases in sequence, writing `progress-[slug].json` after each one.

### Run a single phase

```
/tekion-design-workflow:intake       Phase 1: Requirements to design brief
/tekion-design-workflow:clarify      Phase 2: Gap analysis + completeness score
/tekion-design-workflow:flows        Phase 3: User flow diagrams
/tekion-design-workflow:spec         Phase 4: Tasks + acceptance criteria
/tekion-design-workflow:wireframes   Phase 5: Structural wireframes
/tekion-design-workflow:prototype    Phase 6: React + ALLOY prototype
/tekion-design-workflow:critique     Phase 7: Design critique (stub)
```

### Resume a project

Say **"resume"**. Claude finds your progress file and picks up where you left
off.

---

## Phases

| Phase | Command | Output |
|-------|---------|--------|
| 1 | `intake` | `design-brief-[slug].md` |
| 2 | `clarify` | Updated brief + `clarifications-[slug].md` |
| 3 | `flows` | `flows-[slug].html` + `flows-[slug].md` |
| 4 | `spec` | `spec-[slug].md` |
| 5 | `wireframes` | `wireframes-[slug].html` + `wireframes-[slug].md` |
| 6 | `prototype` | `projects/[slug]/` (React + ALLOY) |
| 7 | `critique` | Not yet implemented |

Phase 2 blocks progression below a confidence score of 75 unless you explicitly
override it. Phase 7 is a stub pending its interview, it returns a
not-yet-implemented notice rather than a critique.

---

## Products supported

ARC, T1, GM, Greenfield.

Per-product knowledge lives in `knowledge/products/[product]/` and personas in
`knowledge/personas/`. Both currently hold templates only, so fill them in
before relying on the product-specific guidance.

---

## Troubleshooting

**Commands don't appear.** Run `/plugin` and check the Errors tab. If the
plugin is missing entirely, the manifest at `.claude-plugin/plugin.json`
didn't install.

**A phase can't find its HTML template.** The bundled templates resolve
through `${CLAUDE_PLUGIN_ROOT}`. If this breaks, report it rather than
copying templates by hand.

**You pushed a change and nobody sees it.** Bump `version` in
`.claude-plugin/plugin.json`. An unchanged version means Claude Code keeps
the cached copy.

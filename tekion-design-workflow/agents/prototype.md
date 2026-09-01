---
name: prototype
description: Executes Phase 6 of the Tekion design workflow. Spawned by the /prototype command or the /design-spec orchestrator with the approved wireframes-[slug].md manifest path and the confirmed product kit in the prompt. Reads the wireframe HTML and spec files for layout/content, enumerates live components from the ALLOY design system repo, writes plan.md for designer approval, then builds a real React + CSS prototype project in projects/[slug]/ at the spec repo root — actual kit components, ALLOY tokens, full visual polish. Builds all plan steps without interruption, then runs one review loop. Updates tasks.md with component and build status columns. Sonnet 5, high effort.
tools: Read, Write, Glob, Grep, Bash, AskUserQuestion
model: claude-sonnet-5
effort: high
---

# Prototype Agent — Phase 6

You are running in an isolated context with no prior conversation history. Your prompt contains the approved wireframes manifest path, the confirmed product kit name, and the path to the ALLOY design system repo. Your job: translate the approved wireframe layouts into a fully polished prototype project using real ALLOY components and tokens — not a static mockup, but a live React project in `projects/[slug]/` at the **spec repo root** (not inside the DS repo).

---

## Step 0: Scope — what this phase is and isn't

Wireframes locked layout and structure. **Nothing here changes which fields appear, which AC a task covers, or which layout direction was chosen.** The only decisions at this phase are: which ALLOY component maps to each wireframe element, how it looks with real tokens applied, and how all flows connect in the final rendered project.

You are building with the real design system — React JSX components, CSS custom properties (ALLOY tokens), the same runtime contract the DS itself uses. No bespoke mockup HTML. The output is a real project that re-themes by changing `data-brand` on `<html>`.

---

## Step 1: Locate the design system repo

Your prompt contains the DS repo path. Verify it:

```bash
ls [DS_REPO_PATH]/global-kit/components/
```

If the path is missing or wrong, use `AskUserQuestion` to ask the designer for it. The DS repo is typically at `../tekiondesignsystem-alloy-main/` relative to the spec files, but confirm — do not guess.

---

## Step 2: Read your inputs

**From the feature spec:**
1. `wireframes-[slug].md` — flow order, layout directions, concept selections per task
2. `wireframes-[slug].html` — **the authoritative layout blueprint** — read this fully; it is the source of truth for spatial arrangement
3. `spec-[slug].md` — Tasks and acceptance criteria (the actual content)

Read all three before doing any component selection. For `wireframes-[slug].html`, extract per task:
- Shell pattern (full-page, modal, split-panel, drawer, etc.)
- Section groupings (header / sidebar / main content / footer zones)
- Field groups and their arrangement (single column, two-column grid, inline, etc.)
- Any component hints already visible in the wireframe markup (`.wf-card`, `.wf-table`, `.wf-form`, etc.)
- Flow trigger points (which action on Task N navigates to Task N+1)

Write a brief per-task layout summary to your scratchpad before moving to Step 3. This summary drives all component selection in Step 4 — do not guess layout from the `.md` manifest alone.

**From the DS repo (enumerate live — never hardcode):**

```bash
# Components available for the selected product kit
echo "--- GLOBAL KIT ---"
for d in [DS_REPO_PATH]/global-kit/components/*/; do basename "$d"; done

echo "--- PRODUCT KIT: [kit] ---"
for d in [DS_REPO_PATH]/product-kits/[kit]/components/*/; do [ -f "$d$(basename $d).jsx" ] && basename "$d"; done

# Check for deprecated components before using anything
python3 -c "
import json
d = json.load(open('[DS_REPO_PATH]/versions/current.json'))
deprecated = {k: v for k, v in d.get('components', {}).items() if v.get('status') == 'deprecated'}
for k, v in deprecated.items():
    print(f'DEPRECATED: {k} -> use {v.get(\"replacement\", \"(no replacement)\")}')
" 2>/dev/null || echo "No deprecated components"

# DS version
python3 -c "import json;d=json.load(open('[DS_REPO_PATH]/versions/current.json'));print('DS',d['monorepo'],'released',d.get('releasedOn'))"

# Available brands
grep -oE '\[data-brand="[a-z0-9-]+"\]' [DS_REPO_PATH]/tokens/dist/tokens.css | sort -u
```

If any of the three spec files are missing, use `AskUserQuestion` to ask for them.

---

## Step 3: Map wireframe elements to ALLOY components

For every Task's first occurrence, walk its AC bullets from `spec-[slug].md` and the spatial layout from `wireframes-[slug].html`, then select a component from the enumerated list.

**Selection priority:**
1. Product kit component (if the selected kit has one that matches)
2. Global kit component (the fallback for everything not in the product kit)
3. If nothing matches — flag it (see below), use the closest global kit component as a stand-in

Read the JSX of each component you plan to use to understand its props:
```bash
cat [DS_REPO_PATH]/global-kit/components/[ComponentName]/[ComponentName].jsx | head -60
```

**Component mapping reference** (global kit, always available):

| AC bullet describes | Component |
|---|---|
| Primary / secondary / ghost / destructive action | `Button` |
| Icon-only action | `IconButton` |
| Grouped actions or segmented control | `ButtonGroup` / `SegmentControl` |
| Status flag, label, category | `Flag` / `Badge` / `Tag` |
| User photo or initials | `Avatar` / `AvatarGroup` |
| Hover hint or contextual info | `Tooltip` / `Popover` |
| Text / number / email / URL / password / tel input | `InputText` / `InputNumber` / `InputEmail` / `InputURL` / `InputPassword` / `InputTelephone` |
| Dropdown / select | `Select` |
| Multi-line text | `Textarea` |
| On/off toggle | `Switch` |
| Checkbox (single or group) | `Checkbox` |
| Radio choice | `Radio` |
| Date or date-range | `DateTimePicker` / `DateView` / `MonthView` |
| Time entry | `TimePicker` |
| File upload | (flag as gap — no upload component in global kit) |
| Top navigation / app shell header | `UIShellHeader` |
| Left navigation panel | `UiShellLeftPanel` / `SideNavigation` |
| Tab view switcher | `Tab` / `PageTabGroup` |
| Multi-step progress | `Progress` |
| Context / overflow menu | `Menu` |
| KPI / metric card | `Card` |
| Collapsible section | `Accordion` |
| Empty / zero-results state | `Empty` |
| Tabular data | `Table` / `Pagination` |
| Inline success / warning / error / info | `Banner` / `Notification` |
| Confirm / cancel dialog | `Modal` |
| Side panel / drawer | `SideSheet` |
| Search / command launcher | `Search` |
| Breadcrumb trail | `Breadcrumb` |
| Loading / in-progress | `Spinner` / `Progress` |
| Rich text editor | `RichTextEditor` |
| Status indicator | `Status` / `StatusIcon` |
| Chip / filter pill | `Chip` |
| Link | `Link` |
| Image / media | `Image` |
| Page header block | `PageHeader` |
| Page footer block | `PageFooter` |
| Divider | `Divider` |
| Floating action | `Fab` |
| Block quote / callout | `Blockquote` |

**Greenfield kit additions** (when `greenfield` kit selected — these are layout patterns, not just components):
`AppHeader`, `AppSidebar`, `CommandBar`, `FilterBar`, `FilterControls`, `FilterPanel`, `FilterResults`, `KeyMetrics`, `PageHeaderBar`, `TableToolbar`, `TablePagination`, `BulkActions`, `DetailPanel`, `HeroSection`, `FeatureSection`, `CardGrid`, `ContentSection`, `ActivityFeed`, `Timeline`, `SettingsForm`, `BasicForm`, `EditForm`, `MultiSectionForm`, `FileUploadSection`, `SearchForm`, `Confirmation`, `EmptyState`, `ErrorState`, `SuccessState`, `LoadingState`, `AccessDenied`, `ListFilter`, `StatsSection`, `MediaSection`, `RelatedContentSection`, `FaqSection`, `UserMenu`, `Callout`

**T1 kit additions** (when `t1` kit selected):
`NavigationPanel`, `PromptInput`, `AttachmentTile`

**If an AC bullet doesn't map to any available component:**

1. **Attempt composition first.** Check if the needed UI pattern can be built from available atoms (Button, Icon, InputText, Switch, Badge, Avatar, Divider, etc.) composed together. If yes:
   - Create a project-local component at `projects/[slug]/components/[ComponentName]/[ComponentName].jsx` + `[ComponentName].css`
   - Follow all DS Consumer rules: `prj-` CSS prefix, token-only values, `window.[ComponentName] = [ComponentName]` export
   - Load it in `index.html` before `[Slug].jsx` in the script order
   - Annotate the task with `⚠ Composed locally: [ComponentName] — candidate for DS contribution`

2. **Flag as a true gap only** if the pattern requires capabilities that no combination of atoms can provide (e.g. a file upload widget, a rich text editor, a map). In that case: use the closest stand-in, annotate with `⚠ Gap: [description] — no composable fallback`, and add it to `gaps[]` for Phase 7.

---

## Step 4: Write plan.md and get designer approval

Before writing a single line of project code, generate a plan and get it approved. This prevents building in the wrong direction.

### 4a. Generate plan.md

Write `projects/[slug]/plan.md`:

```markdown
# Prototype Plan: [Feature Name]

**DS version:** [from versions/current.json]
**Product kit:** [kit]
**Brand:** [brand]

## Steps

| Step | Task | Shell | Components | Atoms composed |
|---|---|---|---|---|
| 1 | Task 1: [Name] | [shell pattern] | [component list] | [if any] |
| 2 | Task 2: [Name] | [shell pattern] | [component list] | [if any] |
...

## Component gaps
[List any ⚠ true gaps flagged in Step 4, or "None"]

## File structure
```
projects/[slug]/
  index.html
  [Slug].jsx
  [Slug].css
  README.md
  components/        ← only if atom-composition needed
```
```

### 4b. Present plan to designer

Use `AskUserQuestion` to present the plan in a single question: show the step table inline, list any gaps, and ask whether to proceed or change anything. Options: "Looks good — build it" / "I have changes". If changes: collect them, update plan.md, ask again. Continue until approved.

**Do not write any project files until the designer approves this plan.**

---

## Step 5: Build the project

Build all plan steps sequentially without pausing for review. Only after all steps are complete does the designer review the result.

### 5a. Scaffold the project folder

```
projects/[slug]/
  index.html
  [Slug].jsx       # the main screen component
  [Slug].css       # layout only — grid, flex, positioning, spacing tokens
  README.md
```

### 5b. Write README.md

```markdown
# [Feature Name]

| Field | Value |
|---|---|
| **DS version** | [from versions/current.json] |
| **Product kit** | [kit] |
| **Brand** | [brand] |
| **Theme** | light |
| **Device** | desktop |
| **Source template** | [template name, or "blank"] |
| **Spec** | [path to spec-[slug].md] |
| **Wireframes** | [path to wireframes-[slug].md] |
```

### 5c. Write [Slug].jsx

One React functional component rendering one flow at a time as a full page. A sticky dark prototype bar at the top controls which flow is shown — clicking a flow pill replaces the full page with that flow's first screen. The bar can be hidden; a centered "Switch Flows" tab restores it.

```jsx
// Each flow entry: name and task names in order
const FLOWS = [
  { name: '[Flow 1 Name]', tasks: ['Task 1 Name', 'Task 2 Name'] },
  { name: '[Flow 2 Name]', tasks: ['Task 1 Name'] },
  // ...
];

function [Slug]() {
  const [activeFlow, setActiveFlow] = React.useState(0);
  const [activeTask, setActiveTask] = React.useState(0);
  const [barVisible, setBarVisible] = React.useState(false);

  const flow   = FLOWS[activeFlow];
  const Screen = SCREENS[activeFlow][activeTask]; // see registry below

  const switchFlow = (i) => { setActiveFlow(i); setActiveTask(0); };
  const goToTask   = (i) => setActiveTask(i);

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Restore tab — centered, visible only when bar is hidden */}
      {!barVisible && (
        <div className="prj-proto-restore" onClick={() => setBarVisible(true)}>
          Switch Flows
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 2 }}>
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* Dark prototype bar */}
      {barVisible && (
        <div className="prj-proto-bar">

          <span className="prj-proto-project">[FEATURE NAME]</span>
          <div className="prj-proto-sep" />

          {/* Flow pills */}
          <span className="prj-proto-flows-label">Flows</span>
          <div className="prj-proto-flows">
            {FLOWS.map((f, i) => (
              <div key={i}
                className={'prj-proto-flow-pill' + (activeFlow === i ? ' prj-proto-flow-pill--active' : '')}
                onClick={() => switchFlow(i)}>
                {f.name}
              </div>
            ))}
          </div>

          {/* Hide button */}
          <button className="prj-proto-hide-btn" onClick={() => setBarVisible(false)} title="Hide bar">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 6.5L5 3.5L8 6.5" stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

        </div>
      )}

      {/* Page content */}
      <div className="prj-flow-page">
        <div className="prj-page-header">
          <span className="prj-page-title">{flow.name}</span>
        </div>
        <div className="prj-task-wrap">
          <Screen />
        </div>
      </div>

    </div>
  );
}
window.[Slug] = [Slug];
```

**Screen registry** — one entry per flow, tasks in order:
```jsx
const SCREENS = [
  [Flow1Task1, Flow1Task2],  // Flow 1
  [Flow2Task1],              // Flow 2
  // ...
];
```

**Rules:**
- Every DS component is referenced as `window.Button`, `window.Table`, etc.
- Use `var(--component-*)` and `var(--semantic-*)` tokens only — no raw hex, px, rem, or font-family
- Typography via `.text-*` utility classes only
- Never branch on brand/theme/device in JS — re-theming is purely `data-*` attributes
- `prj-` prefix for all project-local CSS classes
- Switching flows always resets `activeTask` to 0
- Each flow is self-contained — never cross-reference tasks between flows

**For Tasks shared across flows:** render the full screen in each flow independently. No cross-references.

### 5d. Write [Slug].css

Prototype chrome bar + page layout. No visual styling of content components here (that belongs to the components themselves).

```css
/* ── Dark prototype chrome bar ── */
.prj-proto-bar {
  position: sticky; top: 0; z-index: 100;
  height: 40px; background: #13151F;
  border-bottom: 1px solid rgba(255,255,255,.08);
  box-shadow: 0 1px 0 rgba(0,0,0,.3);
  display: flex; align-items: center; padding: 0 16px;
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
}
.prj-proto-project  { font-size: 13px; font-weight: 600; color: #E5E7EB; white-space: nowrap; flex-shrink: 0; }
.prj-proto-sep      { width: 1px; height: 16px; background: rgba(255,255,255,.1); margin: 0 12px; flex-shrink: 0; }
.prj-proto-flows-label {
  font-size: 10px; font-weight: 700; letter-spacing: .08em;
  text-transform: uppercase; color: #4B5563; margin-right: 8px; flex-shrink: 0;
}
.prj-proto-flows    { display: flex; align-items: center; gap: 4px; flex: 1; min-width: 0; }

.prj-proto-flow-pill {
  font-size: 12.5px; font-weight: 500; color: #6B7280;
  cursor: pointer; padding: 4px 11px; border-radius: 5px;
  white-space: nowrap; transition: background .12s, color .12s;
}
.prj-proto-flow-pill:hover { color: #D1D5DB; background: rgba(255,255,255,.06); }
.prj-proto-flow-pill--active { color: #fff; font-weight: 600; background: #4F46E5; }

.prj-proto-hide-btn {
  width: 26px; height: 26px; border-radius: 5px;
  border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04);
  color: #6B7280; margin-left: 10px; display: flex;
  align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
}
.prj-proto-hide-btn:hover { background: rgba(255,255,255,.08); color: #9CA3AF; }

/* Restore tab — centered drop-down from top edge, shown when bar is hidden */
.prj-proto-restore {
  position: fixed; top: 0;
  left: 50%; transform: translateX(-50%);
  z-index: 100; background: #13151F;
  border: 1px solid rgba(99,102,241,.32);
  border-top: none; border-radius: 0 0 7px 7px;
  font-size: 11.5px; font-weight: 600; color: #C4B5FD;
  padding: 5px 12px 5px 10px;
  cursor: pointer; display: flex; align-items: center; gap: 5px;
  white-space: nowrap; font-family: 'IBM Plex Sans', system-ui, sans-serif;
}
.prj-proto-restore:hover { background: #1a1d2e; }

/* ── Page layout ── */
.prj-flow-page  { flex: 1; display: flex; flex-direction: column; background: var(--bg, #F9FAFB); min-height: 0; }
.prj-page-header {
  background: var(--surface, #fff); border-bottom: 1px solid var(--border, #E5E7EB);
  padding: 0 32px; display: flex; align-items: center;
  height: 52px; flex-shrink: 0;
}
.prj-page-title { font-size: 14px; font-weight: 600; color: var(--text-1, #111827); }
.prj-task-wrap  { flex: 1; overflow: auto; padding: var(--semantic-spacing-space-*); }
```

Spacing values: `var(--semantic-spacing-space-*)` only.

### 5e. Wire index.html

The project is in the **spec repo root** at `projects/[slug]/`. The DS repo is a separate repo. Compute the relative path from the project folder to the DS repo root:

```bash
python3 -c "import os; print(os.path.relpath('[DS_REPO_PATH]', 'projects/[slug]'))"
# e.g. ../../tekiondesignsystem-alloy-main
```

Use that result as `[DS_REL]` in all DS asset references below.

```html
<html lang="en" data-brand="[brand]" data-theme="light" data-device="desktop">
<head>
  <!-- 1. Kit CSS bundles + typography utilities -->
  <link rel="stylesheet" href="[DS_REL]/global-kit/dist/global-kit.css">
  <link rel="stylesheet" href="[DS_REL]/tokens/dist/computedStyles.css">
  [<link rel="stylesheet" href="[DS_REL]/product-kits/[kit]/dist/[kit].css"> if kit has dist/]

  <!-- 2. Project CSS -->
  <link rel="stylesheet" href="./[Slug].css">

  <!-- 3. Phosphor icons -->
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
</head>
<body>
  <div id="root"></div>

  <!-- 4. React 18 + Babel -->
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>

  <!-- 5. Glyphs (must load before Icon.jsx) -->
  <script src="[DS_REL]/global-kit/lib/glyphs.js"></script>

  <!-- 6. Component JSX files in topological dependency order -->
  <!-- Derive order by reading each component's JSX for references -->
  <script type="text/babel" src="[DS_REL]/global-kit/components/Icon/Icon.jsx"></script>
  <script type="text/babel" src="[DS_REL]/global-kit/components/Button/Button.jsx"></script>
  <!-- ... all components used, in dependency order ... -->
  <!-- ... project-local composed components (if any) before [Slug].jsx ... -->
  <script type="text/babel" src="./[Slug].jsx"></script>

  <!-- 7. Mount -->
  <script type="text/babel">
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(window.[Slug]));
  </script>

  <!-- 8. Preview chrome (last) -->
  <link rel="stylesheet" href="[DS_REL]/templates/_preview/switcher.css">
  <script src="[DS_REL]/previews/modes.js"></script>
  <script src="[DS_REL]/templates/_preview/switcher.js"></script>

  <!-- 9. Agentation toolbar (dev feedback overlay — localhost only) -->
  <script>
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      var s = document.createElement('script');
      s.src = '../../tools/agentation/overlay.js';
      document.body.appendChild(s);
      var l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = '../../tools/agentation/overlay.css';
      document.head.appendChild(l);
    }
  </script>
</body>
```

**Topological order for step 5:** Read each component's JSX, find `window.` references (e.g. `window.Button`, `window.Icon`), build the dependency graph, sort it. `Icon` always comes first (it has no kit dependencies). Project-local composed components load after DS components. The project's own `[Slug].jsx` always comes last.

```bash
# Find dependencies for a component
grep -oE 'window\.[A-Z][a-zA-Z]+' [DS_REPO_PATH]/global-kit/components/[Name]/[Name].jsx | sort -u
```

---

## Step 6: Review loop

All plan steps have been built without interruption. Now run one review loop with the designer.

Tell the designer:
- The project is live at `projects/[slug]/index.html` in the spec repo root
- To open it with a local server (`python3 -m http.server` from the spec repo root, then `http://localhost:8000/projects/[slug]/index.html`)
- The brand/theme switcher in the bottom-right corner lets them check re-theming
- To paste feedback as free text or annotated comments

Classify each feedback item:

**A. Visual/component change** (wrong component, wrong state, wrong token, alignment):
- Fix the affected task's JSX/CSS
- Re-check: no raw literals introduced (`grep -nE '#[0-9a-fA-F]{3,8}|[0-9]+px' projects/[slug]/*.css projects/[slug]/*.jsx | grep -v transform`)
- Continue loop

**B. Layout change** (element in wrong position, different arrangement):
- Check if it contradicts the approved wireframe
- If it does: confirm with designer via `AskUserQuestion` that they want to override the approved wireframe for this task
- Apply if confirmed, continue loop

**C. Flow/mechanism change** (new task, changed AC, different user flow):
- Do not act — flag it in your return as a Phase 3/4 change required

Repeat until the designer explicitly approves. Do not treat an ambiguous reply as approval.

---

## Step 7: Verify before reporting done

```bash
# Policy check — everything must be inside projects/[slug]/
ls projects/[slug]/

# No raw literals
for f in projects/[slug]/*.css projects/[slug]/*.jsx; do
  echo "--- $f"
  perl -0777 -pe 's{/\*.*?\*/}{ $& =~ tr/\n//cdr }gse; s{(?<!:)//[^\n]*}{}g' "$f" \
    | grep -nE '#[0-9a-fA-F]{3,8}|[0-9]+px|font-style:\s*italic' \
    | grep -viE 'transform|translate' || echo "    clean"
done

# No em dashes
grep -n '—' projects/[slug]/* || echo "clean"
```

---

## Step 8: Write prototype-[slug].md

```markdown
# Prototype Designs: [Feature Name]

**DS version:** [from versions/current.json]
**Product kit:** [kit]
**Project path:** projects/[slug]/

## Task 1: [Screen Name]
**Flow context:** [Flow name] — [position]
**Layout direction:** [from wireframes manifest]
**Components used:** [comma-separated list]
**Component gaps:** [any ⚠ gaps flagged, or "None"]

## Task 2: ...
```

---

## Notes

- **Enumerate components live every run** — never hardcode the component list. The DS updates frequently; a stale hardcoded list silently offers components that don't exist or misses new ones.
- **Check deprecated components** at Step 2 before mapping anything. A deprecated component still renders (compatibility alias) but must not be used in new work.
- **The prototype bar starts collapsed** — `barVisible` defaults to `false`. A centered "Switch Flows" tab drops from the top edge on load; clicking it reveals the bar. The bar is `position: sticky; top: 0`, full-width, 40px tall, dark `#13151F` background. It shows the feature/project name, a divider, a "Flows" micro-label, then all flows as clickable pills (active flow = solid indigo `#4F46E5`, others = muted `#6B7280`). Clicking a pill replaces the full page with that flow's first screen. A hide (↑) button collapses it again. No dot decoration on the restore tab. The page below has its own light `prj-page-header` (52px) showing the active flow name. Never use a floating fixed panel, accordion, anchor-scroll, or Prev/Next footer for navigation.
- **No bundler.** Everything loads at runtime via Babel standalone. Topological dependency order in `index.html` is the only module system — get it wrong and you get `window.Button is not defined`.
- **Tokens only.** If a token you need doesn't exist in `tokens/dist/tokens.css`, stop and report it. Never hardcode a value and never approximate with a nearby token name.
- **The DS repo is fully read-only.** Never write to `[DS_REPO_PATH]` at all. All project output goes to `projects/[slug]/` in the spec repo root.
- **Re-theming is a free verification.** Flipping `data-brand` should change appearance with zero code change. If it doesn't, something is hardcoded — find and fix it before reporting done.

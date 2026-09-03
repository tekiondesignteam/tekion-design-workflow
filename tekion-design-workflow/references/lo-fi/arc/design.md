---
name: Arcade Design System
description: >
  Tekion DMS design system. Dense, desktop-only dealership management UI.
  Flat white surfaces, 2px corners, one denim blue, two font weights.
surface: desktop web (responsive — supports mobile and tablet breakpoints)

colors:
  # Background
  background-primary:   "#FFFFFF"
  background-secondary: "#EDEEF0"
  background-tertiary:  "#D4D5D6"
  background-muted:     "#F4F5F6"
  background-hover:     "#EBF4FF"
  background-active:    "#DBEBFF"
  background-disabled:  "#F4F5F6"

  # Text
  text-primary:          "#161616"
  text-secondary:        "#444F5C"
  text-tertiary:         "#969AA3"
  text-disabled:         "#D4D5D6"
  text-on-color-primary: "#FFFFFF"
  text-hover:            "#0060FF"
  text-active:           "#0060FF"

  # Icon (lighter ladder than text by design)
  icon-primary:   "#969AA3"
  icon-secondary: "#444F5C"
  icon-disabled:  "#D4D5D6"
  icon-hover:     "#0060FF"
  icon-active:    "#0060FF"

  # Border
  border-primary:   "#D4D5D6"
  border-secondary: "#969AA3"
  border-muted:     "#E8E9EB"
  border-hover:     "#4285F4"
  border-active:    "#0060FF"

  # Brand — the single action color
  brand-background-primary: "#4285F4"
  brand-background-hover:   "#0060FF"
  brand-background-active:  "#0060FF"
  brand-background-muted:   "#EBF4FF"
  brand-text-primary:       "#3373DD"
  brand-text-hover:         "#0060FF"
  brand-icon-primary:       "#4285F4"
  brand-border-primary:     "#4285F4"
  brand-border-active:      "#0060FF"

  # Status
  error-background-primary: "#C42106"
  error-background-muted:   "#FEEAE6"
  error-text-primary:       "#A01B05"
  error-border-primary:     "#C42106"
  warning-background-primary: "#FFD500"
  warning-background-muted:   "#FFF8E6"
  warning-text-primary:       "#987002"
  success-background-primary: "#60D156"
  success-background-muted:   "#EFFAEE"
  success-text-primary:       "#3C8635"

  # App chrome (MenuBar / FavBar — always dark)
  always-dark-background-primary:   "#3F4757"
  always-dark-background-secondary: "#6F7884"
  always-dark-text-primary:         "#F4F5F6"
  always-dark-icon-primary:         "#D4D5D6"

  # Focus — orange, deliberately not brand blue
  focus-border-primary: "rgba(245,150,78,0.8)"

  # Support — 12-step categorical (status chips, lozenges, avatars)
  support-foreground-1:  "#F52F1D"
  support-foreground-2:  "#FC602B"
  support-foreground-3:  "#FFB23C"
  support-foreground-4:  "#06BC75"
  support-foreground-5:  "#00BFA5"
  support-foreground-6:  "#46CAD4"
  support-foreground-7:  "#4F68F1"
  support-foreground-8:  "#7A64C1"
  support-foreground-9:  "#F45191"
  support-foreground-10: "#6285A3"
  support-background-1:  "#FAE3E1"
  support-background-4:  "#E1FAF0"
  support-background-7:  "#E6E9FA"
  support-background-8:  "#E6E1F5"
  support-background-10: "#E1ECF5"
  support-background-11: "#EBF0F5"

  # Analytics — charts only, never on UI components
  analytics-1: "#648DE6"
  analytics-2: "#BBA8F6"
  analytics-3: "#2EDCEA"

typography:
  font-family: '"Proxima Nova", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  heading-1: { size: 24px, weight: 600, lineHeight: 1.2  }
  heading-2: { size: 20px, weight: 600, lineHeight: 1.2  }
  heading-3: { size: 18px, weight: 600, lineHeight: 24px }
  heading-4: { size: 16px, weight: 600, lineHeight: 24px }
  heading-5: { size: 14px, weight: 600, lineHeight: 22px }
  body:      { size: 14px, weight: 400, lineHeight: 22px }
  label:     { size: 12px, weight: 400, lineHeight: 16px, letterSpacing: 0.4px, transform: uppercase }
  caption:   { size: 12px, weight: 400, lineHeight: 16px }

spacing:
  xxs: 4px
  xs:  8px
  sm:  12px
  md:  16px
  lg:  24px
  xl:  32px
  2xl: 48px
  3xl: 64px

rounded:
  xs:   2px     # system default — buttons, inputs, modals, tables
  sm:   4px     # dropdowns, accordion, hover pill
  pill: 20px    # chips: Tag, Lozenge, Badge, CircularTabs
  full: 9999px  # avatars, status dots, toggle knobs

shadows:
  shadow-card: "0 2px 8px rgba(0,0,0,0.09)"    # Card on muted bg
  shadow-1:    "0 2px 8px rgba(0,0,0,0.15)"    # Dropdowns, modals, popovers
  shadow-500:  "0 8px 16px rgba(22,22,26,0.12)" # Toast only

sizes:
  ctl-h-sm: 24px
  ctl-h-md: 32px
  layout-header-h: 64px
---

# Arcade Design System

## Visual Philosophy

Arcade is a **data-dense fleet-command surface** for dealership staff who keep it open eight hours a day. Its entire argument is to get out of the way.

**Compression.** 2px corners everywhere. Controls 32px tall. Body text 14px, forever. Two weights only: 400 and 600. The result is a table with 40 visible rows, not a marketing page with three.

**One blue.** Brand blue (#4285F4) appears only where the user can act. Nothing decorative is ever blue. Hover and active both resolve to #0060FF — same hex, different semantic bindings.

**Hairlines, not shadows.** A 1px platinum hairline (#D4D5D6) is the primary separator. Shadows are reserved for genuinely floating surfaces. Most surfaces use no shadow at all.

**Two contrasts.** Content area is white on white, separated by hairlines. The app chrome (MenuBar + FavBar) is permanently dark (#3F4757) — the only strong value contrast in the system, and it is structural, not decorative.

**Responsive.** Supports mobile, tablet, and desktop viewports via media queries. Target desktop viewport: 1000–1100px wide. Shell owns the primary scroll container.

## Color Rules

- **Blue = actionable.** If it's blue, the user can click it. Never use blue decoratively.
- **Hover vs selected are different.** Hover → background-hover (#EBF4FF). Selected → background-active (#DBEBFF). Two distinct steps.
- **Icon ladder is lighter than text.** icon-primary is #969AA3 (grey). A default icon is lighter than default text on purpose.
- **Focus is orange** (rgba(245,150,78,0.8)) — deliberately not blue so focus never reads as "selected."
- **Text on filled surfaces** uses white (#FFF).
- **Status text uses `-text-primary`, status surfaces use `-background-muted`.** Never put body text on warning gold (#FFD500).

## Typography Rules

- **14px is the whole product.** Body, button labels, table cells, nav items — all 14px/400.
- **Hierarchy comes from size and color, not weight.** With only 400 and 600 available, a "louder" heading is bigger or darker — never bolder.
- **The largest type is 24px.** Page titles only.
- **Labels are uppercase 12px.** Field labels, eyebrow text, meta info.
- **Do not use weight 500.** No font file exists for it.

## Layout Rules

- **Base unit is 4px.** Every gap and padding is a 4-multiple.
- **Page gutter is 24px** — horizontal, on every page.
- **Card padding is 24px.** Form field bottom margin is 24px.
- **No max content width.** Tables use every available pixel.
- **Full-bleed bar stack.** NavBar → FilterBar → QuickFilters → content → Pagination. Each bar is edge-to-edge with its own hairline.
- **Whitespace is structural, not atmospheric.** Space exists to separate a control from its neighbor (8/12px) and a card from its container (24px). When a layout feels cramped by consumer-web standards, it is usually correct.

## Elevation

| Level | Treatment | When |
|---|---|---|
| Flat | No shadow, no border | Bar interiors, table rows |
| Hairline | 1px #D4D5D6 | Default separator everywhere |
| Card | 0 2px 8px rgba(0,0,0,0.09) | Card on muted background |
| Floating | 0 2px 8px rgba(0,0,0,0.15) | Dropdowns, modals, side sheets |
| Toast | 0 8px 16px rgba(22,22,26,0.12) | Toast only |

Rule: **hairline first, shadow only when floating.**

## Components — Visual Reference

### Global Chrome
- **Shell** — Fixed frame. Dark sidebar (FavBar 64px) + dark top bar (MenuBar 64px) frame a white content area.
- **MenuBar** — 64px, dark surface (#3F4757). Logo left, search center, actions right.
- **FavBar** — 64px collapsed / 270px expanded. App tiles 64×64px.

### Page Chrome
- **NavBar** — 64px white bar, 24px horizontal padding. Back chevron + title (20px/600) + primary action button. Bottom hairline.
- **FilterBar** — 72px white toolbar. Search (240px) + filters + result count. No border — reads as a toolbar, not a form.
- **QuickFilters** — 56px scrolling row of 240px summary tiles. Selected tile gets brand border ring.
- **Pagination** — 64px white bar. Top hairline. 24px number cells.
- **Tabs** — Five strip variants: underline (default, 40/48px), circular pills, bottom-sheet, process stepper, crm bowtie.

### Buttons
All buttons: 2px corners, 600/14px label, 32px height (medium) / 24px (small), 16px icon slot.

| View | Rest | Hover/Active |
|---|---|---|
| Primary (solid) | Blue fill (#4285F4), white text | Darker blue (#0060FF) |
| Secondary (outline) | White + grey border (#969AA3), dark text | Blue border + blue text + pale blue fill |
| Tertiary (ghost) | Transparent, grey text (#444F5C) | Blue text + pale fill |
| Destructive | Red fill (#C42106) or red text | Darker red |
| Link | No border, blue text (#3373DD), 24px height | Same pale fill |
| Icon-only | Square 16/24/32px | Pale fill + blue icon |

Default view is **secondary**, not primary.

### Selection Controls
- **Checkbox** — 16px, 2px corner. Unchecked: grey border. Checked: brand blue fill (#4285F4).
- **Radio** — 16px dial. Selected: brand border + pale fill (#DBEBFF) + blue dot.
- **Toggle** — 24px track. Off: white + grey border. On: brand blue track.
- **ButtonGroup** — Spaced segments, 32/40px. Selected: solid blue (primary) or muted blue (secondary). Label goes 400 → 600 on selection.
- **SegmentControl** — Connected segments, collapsed borders. Selected fill changes; label stays 600.

### Chips & Indicators
- **Badge** — 16px count pill, full radius. 12px/600.
- **Lozenge** — Static label chip. 16/24px. Pill or 2px radius. Six color palettes. No interactive state.
- **Tag** — Interactive chip. 20/24/32px. Pill radius. Grey/outline/primary/dark.
- **Avatar** — 24/32/40px circle or rectangle. Auto-derives color from name.
- **Status** — 24×24px indicator with 10px colored dot or flag icon. 12 colors.

### Inputs & Forms
All fields: 32px tall, 2px corner, 7px vertical padding. Seven frame states: default / hover / active / error / warning / success / disabled.

- **TextInput** — Single line. Optional left/right icon inside, bordered prefix/suffix outside.
- **Select** — Dropdown trigger. Trailing caret. Opens DropdownMenu.
- **SearchInput** — Magnifying glass icon. Clear button when value present.
- **TextArea** — Multiline. min-height 64px.
- **DateInput** — Trailing calendar icon. Opens DateView panel.
- **FormRow** — CSS grid, default 2 columns, 24px column gap, 24px bottom padding.

### Data Display
- **Table** — Header locked at 40px, grey fill (#EDEEF0). Body rows default 40px. Selected rows: pale blue fill (#DBEBFF) + 2px brand left accent. Supports sticky columns, tree rows, drag-sort.

### Overlays
- **Modal** — Centered dialog. Widths: 448/684/920px. 64px grey header, 64px footer, 24px body padding. **Sharp corners, no shadow** — white rectangle on a dark scrim.
- **SideSheet** — Right-edge drawer. Widths: 451/676/1014px. Full height. 1px left border only.
- **DropdownMenu** — Floating list. 4px corners, soft shadow. Rows 32px. Selected (#DBEBFF) wins over hover (#EBF4FF).
- **Tooltip** — Dark bubble (#3F4757), white text, no max-width, no shadow.

### Feedback
- **Notification** — Soft inline alert. 4px corners, no border, no shadow. Tinted surface by type. Grey icon always.
- **NotificationBanner** — Loud alert bar. 4px left accent stripe. No corners. Title 16px/600.
- **Toast** — Elevated card. Strongest shadow in the system. 300px text column. Sharp corners.
- **Accordion** — Collapsible panel. 4px corners. 56px (default) / 64px (large) header.
- **ProgressBar** — 4px / 8px track. Brand blue fill. Pill ends.

## Lo-fi Phase Rules

Lo-fi screens are mid-fidelity HTML produced before prototype build. They show layout and interaction structure with visual polish, but deliberately flatten chrome and relax control precision.

#### Shell
Render the MenuBar and FavBar as a single flat grey block (`#3F4757`) with no internal content — no logo, no search field, no icons, no avatar. It is a structural placeholder only.

#### Buttons
All buttons are 32px tall. Use Primary (blue fill), Secondary (outline), Link (no border, blue text), Destructive (red fill), and Icon-only variants. Do not use tertiary buttons in lo-fi screens.

#### Everything else
Follow the full Arcade spec: colors, spacing, typography, form fields, and component patterns apply as normal.

## Do's and Don'ts

#### Do
- Clone a template to start a page — never build chrome from scratch
- Reach for a prop edit before adding a new element
- Use brand blue (#4285F4) **only** for actionable elements
- Keep corners at 2px — that is the system's voice
- Distinguish hover (#EBF4FF) from selected (#DBEBFF)
- Use semantic color names, not raw hex, when writing tokens

#### Don't
- Don't use blue decoratively — blue means "you can act here"
- Don't use 8px or larger corners in base ARC
- Don't add padding to fix a dense layout — move content to a SideSheet or tab instead
- Don't use analytics palette colors on UI components — chart use only
- Don't add weight 500 — no font file exists
- Don't add a second scroll container — Shell owns the only one

## Assets

Asset files live at `${CLAUDE_PLUGIN_ROOT}/Assets/`. Use relative paths in the HTML output — the lo-fi file is written into `projects/[slug]/p6-lo-fi/`, so paths are `../../../../Assets/...`.

### Fonts

Load Proxima Nova from the local OTF files via `@font-face`. Do NOT use a Google Fonts link — the files are local and the weights available are exact.

```css
@font-face {
  font-family: 'Proxima Nova';
  src: url('../../../../Assets/fonts/Proxima-Nova-Regular.otf') format('opentype');
  font-weight: 400; font-style: normal;
}
@font-face {
  font-family: 'Proxima Nova';
  src: url('../../../../Assets/fonts/Proxima-Nova-Regular-Italic.otf') format('opentype');
  font-weight: 400; font-style: italic;
}
@font-face {
  font-family: 'Proxima Nova';
  src: url('../../../../Assets/fonts/Proxima-Nova-Semibold.otf') format('opentype');
  font-weight: 600; font-style: normal;
}
@font-face {
  font-family: 'Proxima Nova';
  src: url('../../../../Assets/fonts/Proxima-Nova-Semibold-Italic.otf') format('opentype');
  font-weight: 600; font-style: italic;
}
@font-face {
  font-family: 'Proxima Nova';
  src: url('../../../../Assets/fonts/Proxima-Nova-Light.otf') format('opentype');
  font-weight: 300; font-style: normal;
}
@font-face {
  font-family: 'Proxima Nova';
  src: url('../../../../Assets/fonts/Proxima-Nova-Light-Italic.otf') format('opentype');
  font-weight: 300; font-style: italic;
}
```

Weight 500 has no file — do not declare it (matches the Don't above). Medium (500) always falls back to Semibold (600).

### Logos

| File | Use |
|---|---|
| `Assets/arc/tekion-logo.gif` | Tekion logo, light/white backgrounds |
| `Assets/arc/tekion-logo-ltr.gif` | Tekion logo with wordmark, left-to-right |

### File-type icons

Use in attachment lists, import flows, or document download rows. All SVG, 16×16 or 24×24.

| File | Use |
|---|---|
| `Assets/arc/icons/pdf.svg` | PDF attachment |
| `Assets/arc/icons/csv.svg` | CSV / spreadsheet export |
| `Assets/arc/icons/excel.svg` | Excel file |
| `Assets/arc/icons/txt.svg` | Plain text file |
| `Assets/arc/icons/xml.svg` | XML / data feed |
| `Assets/arc/icons/folder.svg` | Folder / category grouping |
| `Assets/arc/icons/closeIcon.svg` | Inline dismiss on a file chip |

### Empty-state illustrations

When a wireframe task contains an empty state slot (no-data, no-results, error, restricted access), replace the generic placeholder with the matching ARC illustration:

| Situation | File |
|---|---|
| No data / nothing here yet | `Assets/arc/illustrations/nodata.svg` |
| Search returned no results | `Assets/arc/illustrations/noMatchFound.svg` |
| List/table is empty | `Assets/arc/illustrations/noResult.svg` |
| Feature not yet configured | `Assets/arc/illustrations/noSetup.svg` |
| Generic fetch / API error | `Assets/arc/illustrations/fetchError.svg` |
| General error state | `Assets/arc/illustrations/error.svg` or `errorV2.svg` |
| No activity feed items | `Assets/arc/illustrations/noActivity.svg` |
| No VIN / vehicle detail | `Assets/arc/illustrations/noVinDetail.svg` |
| Empty notification bell | `Assets/arc/illustrations/emptyNotificationBell.svg` |
| Audit log empty | `Assets/arc/illustrations/auditLogsPlaceholder.svg` |
| Webhooks empty | `Assets/arc/illustrations/webhooks-empty-state.svg` |
| Products empty | `Assets/arc/illustrations/products-empty-state.svg` |
| Email placeholder | `Assets/arc/illustrations/emailPlaceholder.svg` |
| Car/vehicle placeholder | `Assets/arc/illustrations/carListItemPlaceholder.svg` |
| Access restricted | `Assets/arc/illustrations/accessRestrictedView.svg` |

Render at `width: 120px; height: auto` centered in the empty-state zone, with secondary text below.

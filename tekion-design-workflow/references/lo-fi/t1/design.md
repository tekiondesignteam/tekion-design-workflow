---
name: T1 Design System
description: >
  Tekion AI assistant embedded in the dealer platform.
  Narrow 400px panel, dense cards, tight 2px corners, Proxima Nova,
  one blue action color, one violet AI mark, Phosphor icons only.
surface: floating panel (400px default) inside Tekion desktop shell

colors:
  # Background
  background-primary:   "#ffffff"
  background-secondary: "#edeef0"
  background-tertiary:  "#d4d5d6"
  background-muted:     "#f4f5f6"
  background-hover:     "#ebf4ff"
  background-active:    "#dbebff"
  background-disabled:  "#edeef0"

  # Text
  text-primary:          "#161616"
  text-secondary:        "#444f5c"
  text-tertiary:         "#969aa3"
  text-disabled:         "#d4d5d6"
  text-on-color-primary: "#ffffff"
  text-hover:            "#0060ff"
  text-active:           "#0060ff"

  # Icon
  icon-primary:   "#444f5c"
  icon-secondary: "#969aa3"
  icon-disabled:  "#d4d5d6"
  icon-hover:     "#4285f4"
  icon-active:    "#0060ff"
  icon-ink:       "#0a0a0a"

  # Border
  border-primary:   "#d4d5d6"
  border-secondary: "#969aa3"
  border-muted:     "#e8e9eb"
  border-hover:     "#4285f4"
  border-active:    "#0060ff"

  # Brand — the single action color
  brand-background-primary: "#4285f4"
  brand-background-hover:   "#0060ff"
  brand-background-active:  "#0060ff"
  brand-background-muted:   "#ebf4ff"
  brand-text-primary:       "#3373dd"
  brand-text-hover:         "#0060ff"
  brand-icon-primary:       "#4285f4"
  brand-border-primary:     "#4285f4"
  brand-border-active:      "#0060ff"

  # AI mark — violet, never a general accent
  ai-mark: "#8a38f5"

  # The one gradient — send button, T1 tile, new-chat glyph only
  gradient-brand: "linear-gradient(-44.62deg, #2157f5 2.91%, #258dff 40.71%, #86ffbb 106.85%)"

  # Status
  error-background-primary:   "#f52f1d"
  error-background-muted:     "#fae3e1"
  error-text-primary:         "#a01b05"
  error-border-primary:       "#f52f1d"
  warning-background-primary: "#ffb23c"
  warning-background-muted:   "#fff3dc"
  warning-text-primary:       "#8a5700"
  success-background-primary: "#06bc75"
  success-background-muted:   "#effaee"
  success-text-primary:       "#057a4c"

  # App chrome (MenuBar / FavBar — always dark)
  always-dark-background-primary: "#3f4757"

  # Focus
  focus-border-primary: "#4285f4"

  # Overlay
  overlay-scrim: "rgba(22,22,26,0.40)"

typography:
  font-family: '"Proxima Nova", "Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  display:      { size: 32px, weight: 600, lineHeight: 40px }
  heading-1:    { size: 24px, weight: 600, lineHeight: 30px }
  heading-2:    { size: 20px, weight: 600, lineHeight: 32px }
  heading-3:    { size: 16px, weight: 600, lineHeight: 24px }
  heading-4:    { size: 14px, weight: 600, lineHeight: 16px }
  body:         { size: 14px, weight: 400, lineHeight: 16px }
  body-medium:  { size: 14px, weight: 500, lineHeight: 16px }
  caption:      { size: 12px, weight: 400, lineHeight: 16px }
  overline:     { size: 10px, weight: 600, lineHeight: 12px, textTransform: uppercase, letterSpacing: 0.08em }

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
  xs:   2px     # the workhorse — buttons, inputs, badges, cards, modals
  sm:   4px     # minor
  md:   8px     # chat bubble, floating-panel top corners, icon buttons
  lg:   12px    # prompt composer, listing cards
  fab:  24px    # FAB rounded square
  pill: 9999px  # chips, status dots, count badges
  full: 50%     # circular avatars, round icon buttons

shadows:
  shadow-soft:  "0 1px 2px rgba(25,40,57,.09), 0 2px 8px rgba(25,40,57,.06)"
  shadow-card:  "0 4px 16px rgba(25,40,57,.09)"
  shadow-pop:   "0 12px 32px rgba(25,40,57,.14)"
  shadow-panel: "0 8px 24px rgba(25,40,57,.12)"

sizes:
  panel-width:      400px
  sidenav-width:    280px
  menubar-h:        64px
  favbar-w:         64px
  navbar-min-h:     48px
  ctl-h-lg:         36px
  ctl-h-md:         32px
  ctl-h-sm:         24px
  input-h:          32px
---

# T1 Design System

## Visual Philosophy

**T1** is an AI assistant embedded in the Tekion automotive-retail / dealer platform (CRM, sales, service, parts, accounting). It is not a standalone app — it is a **panel that floats over a dealer's working screen**, so the assistant is always secondary to the record the user is looking at. Its users are dealership staff mid-shift: sales reps, service advisors, parts advisors, managers, controllers, dispatchers.

**Panel first.** 400px is the design target. Dense cards, single-column layouts, tight radii. If it doesn't survive 400px, it's the wrong composition.

**Dense, sober, calm.** Cool desaturated neutrals, flat surfaces, 1px borders, 2px corners. No imagery, no texture, no gradient fills except the one brand gradient.

**One accent, used sparingly.** Blue means action. Violet means the AI mark. Green/amber/red mean state — never decoration.

**Every response ends in an action.** Information without a next step is an unfinished design.

**Human approves, T1 acts.** Show the draft before it sends; show the reasoning before the recommendation.

## Color Rules

- **Blue = actionable.** `#4285f4` / `#0060ff` appear only where the user can act. Never decorative.
- **Violet is the AI mark.** `#8a38f5` is the T1 mark only. Never a general accent. Never swap it for blue.
- **Exactly one gradient per screen** — the AI send button or the T1 tile. Nothing else.
- **Backgrounds are solid fills only.** No imagery, pattern, texture, noise, or blur.
- **Cards sit white on `#f4f5f6`.** Panel interior is white.
- **Overlay scrim:** `rgba(22,22,26,0.40)` — solid tint, no blur.
- **Destructive is red and outlined**, never a red filled button.
- **Status text uses the `-text-primary` token; status surfaces use `-background-muted`.** Never put body text on amber fill.
- **Focus ring:** `outline: 2px solid #4285f4; outline-offset: 1–2px`. Never remove without a replacement.

## Typography Rules

- **14px is the dominant size.** Response text, bubbles, inputs, buttons, card titles — all 14px.
- **No weight bolder than 600.** Weights in use: 400 Regular · 500 Medium · 600 Semibold.
- **Hierarchy by weight and color:** 14/400 body → 14/500 emphasis → 14/600 titles/buttons.
- **Caption is 12px/400.** Assistive text, meta rows, reasoning steps — never body copy.
- **Overline is 10px/600, uppercase, +0.08em.** Tiny section labels only.
- **Body text minimum on white is `#6d707a`.** `#969aa3` is for placeholders, disabled states, and 12px meta only — never body copy.

## Layout Rules

- **Base unit is 4px.** Every gap and padding is a 4-multiple. No 28px step — jump 24 → 32.
- **Panel width is 400px** (docked / popover). Never widen unless in fullscreen mode.
- **Card padding: 12–16px.** Section padding: 16–24px. Inter-card gutter: 8–16px.
- **Icon-to-label gap: 8px.** Label-to-value gap: 2–4px. Message gap: 12–16px.
- **Fullscreen only** may use the 280px SideNavigation alongside the thread.
- **At ≥1440px (fullscreen)** domain cards may go 2-up in a 12px-gap grid.

**Shell layout.** Menubar 64px (`#3f4757`) + Favbar 64px wide (`#3f4757`) frame the white workspace. The T1 tile in the Favbar is a 40×40 rounded square (6px) filled with the brand gradient.

**Panel states.**

| State | Geometry |
|---|---|
| `popover` | Floating: `left:24px`, top ≈27%, bottom 0, width 400px, 1px border, `shadow-panel`, top corners 8px |
| `left` / `right` | Docked, 400px, `border-right/left: 1px #d4d5d6`, square corners |
| `fullscreen` | Panel takes the whole workspace; 280px SideNavigation appears inside |
| `minimized` | 44px strip at bottom: `left:24px`, width 400px, top corners 8px |

Panel enters with 380ms `cubic-bezier(.32,.72,0,1)` slide. **Motion:** hover/press 80–120ms ease · transitions 150–250ms ease-out · modal fade 200ms ease-in-out. Respect `prefers-reduced-motion`.

**Inside the panel.** NavBar (`min-height:48px`, `border-bottom:1px`) → thread (padding 16–24px, `overflow:auto`) → PromptComposer (padding 12px, radius 12px, 2px border). Thread anatomy: `ChatBubble` (user, right) → `ReasoningLog` (collapsible) → `Response` (AI, left) → domain card(s) → `FeedbackAction` → `SuggestionList`.

**Copy & voice.** Short, direct, second person, sentence case, no emoji. Greeting: "Hi {name}," then "How can I help you today?" — no exclamation. Buttons: Title Case, imperative (Send · Save · View · Approve). Avoid "I". Never invent dealer data beyond obviously illustrative placeholders. Vocabulary: *task* (schedulable job) → *session* (one dated run); "run" is only a verb.

## Elevation

| Level | Treatment | When |
|---|---|---|
| Flat | Border only (1px `#d4d5d6`) | Cards at rest |
| Card hover | `0 4px 16px rgba(25,40,57,.09)` | Card on hover |
| Pop | `0 12px 32px rgba(25,40,57,.14)` | Modal, menu, dropdown |
| Panel | `0 8px 24px rgba(25,40,57,.12)` | Floating AI panel |
| Soft | `0 1px 2px rgba(25,40,57,.09), 0 2px 8px rgba(25,40,57,.06)` | Subtle depth |

Rule: **1px border at rest, lift on hover, shadow only when floating.**

## Components — Visual Reference

### Icons
**Phosphor Icons only** (<https://phosphoricons.com>) — no Lucide, Heroicons, Material, custom SVG, emoji, or unicode. Emoji never appear in T1. Load via CDN: `https://unpkg.com/@phosphor-icons/web@2.1.1`. Sizes: 16px inline/buttons · 20px nav rows · 24px card icon blocks, modal titles · 48px empty states. Weights: `regular` for hairline UI · `bold` for buttons · `fill` for solid status glyphs. Default tint `#444f5c`, muted `#969aa3`, inside buttons `currentColor`.

### Global Chrome
- **Shell** — Dark Menubar 64px + dark Favbar 64px wide (`#3f4757`) frame the white workspace.
- **Menubar** — 64px, `#3f4757`. Wordmark 120×16, global search max 688px, avatar right.
- **Favbar** — 64px wide, `#3f4757`. App tiles 40×36, 4px status underline. T1 tile: 40×40, 6px radius, brand gradient fill.

### Panel Chrome
- **NavBar** — `min-height:48px`, white, `border-bottom:1px #d4d5d6`. 36px prefix slot · title 16/600 centered · action icons.
- **SideNavigation** — 280px, white, `border-right:1px`. Fullscreen only. Search 32px, sticky. Nav rows: 8px padding, 8px gap, 2px radius, 20px icon, 14/500 label; hover/active `#ebf4ff`, active goes 600.
- **PromptComposer** — Padding 12px, radius 12px, 2px border `#d4d5d6`. Text 16/24, min-height 24px, max 132px. Active: teal border `rgba(70,202,212,.6)` + glow `0 5px 18px rgba(66,161,244,.30)`. Placeholder: *"Ask anything or press '/' for shortcuts"*

### Buttons
All buttons: 2px corners, 14/600 label.

| Variant | Height | Rest | Hover/Active |
|---|---|---|---|
| Primary (contained) | 36/32/24 | `#4285f4` fill, white text | `#0060ff` |
| Outlined | 36/32/24 | White + 1px `#d4d5d6`, dark text | Blue border + pale blue fill |
| Text | 36/32/24 | Transparent, `#444f5c` | Blue text + pale fill |
| Destructive | 36/32/24 | Red outlined (`red-500` border), red text | `#f9e2e0` fill — **never red fill** |
| AI send | 36×36 | Brand gradient fill, white `arrow-up` bold | — the only gradient button |
| Icon-only | 32×32 | Transparent, icon `#444f5c` | `#f4f5f6` fill |

### Selection Controls
- **Checkbox** — 16px, 2px corner. Unchecked: grey border. Checked: `#4285f4` fill.
- **Toggle / Switch** — Track: `#cfd4dc` off → `#00bfa5` on.
- **Progress bar** — 4px track, success fill `#3c8635`, indeterminate 1.4s ease-in-out.

### Chips & Indicators
- **Chip** — h24, padding `0 6px`, pill radius. `outlined neutral`: 1px `#d4d5d6`, `#444f5c`. `soft neutral`: `#edeef0` fill. Status variants: ok `#e1faf0`/`#057a4c` · warn `#fff3dc`/`#8a5700` · err `#fae3e1`/`#a01b05`.
- **Badge** — 20×20 (md) / 16×16 (sm), pill radius, white 600, fill `#4285f4` primary or `#56bf4d` success.
- **Avatar** — 40/32/24/16px; circle = 50%, square = 2px. Optional status dot.
- **Separator** — 1px `#edeef0` (subtle) or `#d4d5d6`.

### Inputs & Forms
All fields: 32px tall, 2px corner. States: default / hover / active (blue border) / error (red border) / disabled (`#edeef0` fill).

- **TextInput** — Label 14/400 `#444f5c` + 4px gap + box h32, 1px `#969aa3`, padding 10px. Focus `#4285f4`. Error `#f52f1d` border + 12px assistive `#a01b05`.
- **Textarea** — Same box, multi-row, resizable.
- **Dropdown** — Input-shaped trigger + caret; menu white, 1px border, `shadow-pop`, rows 32px, selected `#ebf4ff`.

### Conversation Frames
- **ChatBubble** (user) — Right-aligned, `max-width: min(480px, 85%)`, padding 12px, fill `#edeef0`, radius `8px 8px 0 8px`, text 14/400.
- **Response** (AI) — Left-aligned, no bubble, no fill. Flex column, gap 12px; title 14/500; body 14/400 `#161616`.
- **Welcome** — Centered: 40×40 logo, 16px gap, "Hi {name}," 24/30/600, description 14/16/400 `#969aa3`.
- **SuggestionList** — 240px wide, 2px gap; item min-h 32px, padding `8px 12px`, 2px radius, 16px icon `#969aa3`, 14/400 `#444f5c`; hover `#dbebff`.
- **ReasoningLog** — Collapsible. Steps 12/16 (500 active, 400 idle) `#444f5c`; 2px step rail, active `#4285f4`.
- **FeedbackAction** — Row of 16px icon buttons: copy · thumbs-up · thumbs-down · regenerate.
- **MessageDraft** — 322px card, 1px `#d4d5d6`, padding 16px. Active border `#4285f4`; success/error states swap in color alert bar.

### Domain Cards
All are **white, 1px `#d4d5d6`, 2px radius**; hover lifts with `shadow-card`.

- **DealCard** — 320px. Header: 36×36 grey icon block + deal ID / vehicle label. Body: 3 label/value field columns → separator → footer (last-updated + View button).
- **ListingCard** — Vertical rows, **8px** radius; row padding 16px, gap 16px; title · id · chip · subtitles left, detail right-aligned.
- **TaskCard** — min-width 320px, padding 16px, gap 16px. 36×36 icon block + title 14/600, checkbox task rows (12px labels), action row.
- **PlannerCard** — Progress header (title 14/600 + "X/N DONE" 12/600 `#969aa3`), list groups; item unchecked 12/500 `#161616`, checked 12/400 `#969aa3`. All checked → fill `#effaee`, border `#06bc75`.
- **DocumentCard** — 24px icon in `#edeef0` block; title 14/600; subtitle 14/400 `#969aa3`; action links 14/500 `#3373dd`.
- **CompletionCard** — 320px. Header fill `#effaee`, `#06bc75` avatar + green title; body white with label/value rows divided by 1px lines.
- **TipCard** — 320px, fill `#effaee`, border `#06bc75`, padding 16px. Compact: `#ebf4ff` fill, 24px brand-gradient icon chip.

### Overlays
- **Modal** — Scrim `rgba(22,22,26,.40)`. Panel white, **square corners**, `shadow-pop`, width 480px. Header fill `#edeef0`, padding `16px 24px`, title 20/32/600. Body padding 24px. Footer: secondary + primary buttons, right-aligned. Destructive = red outlined.
- **Toast** — Padding 16px, gap 8px, 32×32 icon block, title 16/24/600, description 14/16/400 `#444f5c`. Enters 220ms ease-out, exits 200ms ease-in.
- **Tooltip** — Dark `#161616` bubble, 11–12px white text, padding `3px 8px`, 2px radius, fade 150ms.
- **Empty state** — Centered: 48×48 `#edeef0` icon block (8px radius, icon `#6d707a`), 12px gap, title 16/24/500, description 14/16/400 `#444f5c`, then actions.

### Feedback
- **NotificationBanner** — Full-width, 1px `#d4d5d6`, 4px left status bar, inline title + description, close button.
- **Table** — Sortable header row; rows hover `#f4f5f6`; 1px `#edeef0` row dividers; cells 14/400.

## Lo-fi Phase Rules

Lo-fi screens are mid-fidelity HTML produced before prototype build. They show layout and visual direction using T1 tokens, but deliberately flatten some chrome precision.

#### Shell
Render the entire shell — Menubar, Favbar, and dealer workspace — as a **single flat dark block (`#3f4757`)** with no content whatsoever. The only exception is the **T1 AI logo tile** (40×40, 6px radius, brand gradient) which must appear in the Favbar position to anchor the panel. No wordmark, no search bar, no nav icons, no avatar, no CRM content, no skeleton bars. The shell is a blank backdrop.

#### Panel
Always render the panel at **400px wide** as a docked or floating variant. Show the NavBar, thread area, and PromptComposer. Panel must be the rightmost element.

#### Icons
Phosphor only — load via CDN as specified above. Do not substitute Lucide or any other library. No emoji anywhere.

#### Buttons
Use Primary (blue fill), Outlined, Text, and Icon-only variants. **Never red fill for destructive** — always red outlined.

#### Everything else
Follow the full T1 spec: exact color tokens, exact spacing (4pt grid), exact Proxima Nova weights (400 / 500 / 600 only). Every visual decision must trace back to a rule in this file.

## Do's and Don'ts

#### Do
- Render the CRM background as skeleton bars — never invent fake dealer content
- Keep the panel at 400px — the whole system is designed for that constraint
- Use `#4285f4` / `#0060ff` only for actionable elements
- Keep corners at **2px** for buttons, inputs, and cards — that is the system's voice
- Use 8px radius only for the chat bubble and the floating panel's top corners
- Use the brand gradient on exactly one element per screen (send button or T1 tile)
- Use Phosphor icons — load them via CDN as specified
- Write copy second person, sentence case, no emoji

#### Don't
- Don't use blue decoratively — blue means "you can act here"
- Don't use 8px or larger corners on cards, buttons, or inputs
- Don't add a second gradient — one per screen, one place only
- Don't use violet as a general accent — it is the T1 AI mark only
- Don't use emoji anywhere in T1
- Don't use red filled buttons — destructive is always red outlined
- Don't show real dealer data in lo-fi mocks beyond obviously illustrative placeholders
- Don't break 400px panel width — if the composition doesn't fit, it's wrong

## Portable Starter CSS

Copy-paste into any empty HTML file to draw a T1 screen with plain markup and Phosphor icons.

```html
<!doctype html>
<meta charset="utf-8">
<script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css">
<style>
:root{
  --n0:#ffffff; --n25:#f7f8f9; --n50:#f4f5f6; --n100:#edeef0; --n150:#e8e9eb;
  --n200:#d4d5d6; --n400:#969aa3; --n500:#6d707a; --n600:#444f5c; --n700:#3f4757;
  --n900:#161616;
  --blue50:#ebf4ff; --blue100:#dbebff; --blue400:#4285f4; --blue500:#3373dd;
  --blue600:#1a6cc4; --blue700:#0060ff; --violet:#8a38f5;
  --green25:#effaee; --green50:#e1faf0; --green500:#06bc75; --green700:#057a4c;
  --amber50:#fff3dc; --amber400:#ffb23c; --amber700:#8a5700;
  --red25:#fae3e1; --red400:#f52f1d; --red500:#d62508; --red600:#a01b05;
  --grad:linear-gradient(-44.62deg,#2157f5 2.91%,#258dff 40.71%,#86ffbb 106.85%);
  --sh-soft:0 1px 2px rgba(25,40,57,.09),0 2px 8px rgba(25,40,57,.06);
  --sh-card:0 4px 16px rgba(25,40,57,.09);
  --sh-pop:0 12px 32px rgba(25,40,57,.14);
  --sh-panel:0 8px 24px rgba(25,40,57,.12);
  --scrim:rgba(22,22,26,.40);
  --font:"Proxima Nova","Mona Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
}
*{box-sizing:border-box}
body{margin:0;font-family:var(--font);font-size:14px;line-height:16px;color:var(--n900);background:var(--n50)}
.h1{font:600 24px/30px var(--font)} .h2{font:600 16px/24px var(--font)}
.body{font:400 14px/16px var(--font)} .med{font:500 14px/16px var(--font)}
.cap{font:400 12px/16px var(--font);color:var(--n500)}
.muted{color:var(--n400)} .sec{color:var(--n600)}

.shell{display:flex;flex-direction:column;height:100vh;overflow:hidden}
.menubar{height:64px;background:var(--n700);flex-shrink:0}
.workarea{flex:1;display:flex;overflow:hidden;position:relative}
.favbar{width:64px;background:var(--n700);flex-shrink:0;display:flex;flex-direction:column;align-items:center;padding-top:16px;gap:8px}
.t1-tile{width:40px;height:40px;border-radius:6px;background:var(--grad);display:grid;place-items:center;color:#fff}
.crm{flex:1;min-width:0;background:#fff;padding:24px}
.skel{height:16px;border-radius:4px;background:#f1f5f9}

.panel{width:400px;flex-shrink:0;background:#fff;display:flex;flex-direction:column;border-left:1px solid var(--n200);overflow:hidden}
.panel--float{position:absolute;left:24px;top:27%;bottom:0;width:400px;border:1px solid var(--n200);border-radius:8px 8px 0 0;box-shadow:var(--sh-panel)}
.navbar{min-height:48px;display:flex;align-items:center;gap:8px;padding:4px 16px;background:#fff;border-bottom:1px solid var(--n200)}
.navbar__title{flex:1;font:600 16px/24px var(--font);text-align:center}
.thread{flex:1;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:16px}
.composer{margin:12px;padding:12px;border:2px solid var(--n200);border-radius:12px;display:flex;align-items:flex-end;gap:8px}
.composer input{flex:1;border:0;outline:0;font:400 16px/24px var(--font)}
.sidenav{width:280px;flex-shrink:0;background:#fff;border-right:1px solid var(--n200);padding:16px 12px}
.navrow{display:flex;align-items:center;gap:8px;padding:8px;border-radius:2px;font:500 14px/16px var(--font)}
.navrow:hover,.navrow--on{background:var(--blue50)} .navrow--on{font-weight:600}

.bubble{align-self:flex-end;max-width:min(480px,85%);padding:12px;background:var(--n100);border-radius:8px 8px 0 8px}
.resp{display:flex;flex-direction:column;gap:12px}
.resp__title{font:500 14px/20px var(--font)}
.reason{font:500 12px/16px var(--font);color:var(--n600);border-left:2px solid var(--n200);padding-left:12px}
.sugs{width:240px;display:flex;flex-direction:column;gap:2px}
.sug{min-height:32px;display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:2px;color:var(--n600)}
.sug:hover{background:var(--blue100)}
.feedback{display:flex;gap:8px;color:var(--n500)}

.card{background:#fff;border:1px solid var(--n200);border-radius:2px;padding:16px;display:flex;flex-direction:column;gap:12px}
.card:hover{box-shadow:var(--sh-card)}
.card--done{background:var(--green25);border-color:var(--green500)}
.card__title{font:600 14px/16px var(--font)}
.iconblock{width:36px;height:36px;border-radius:2px;background:var(--n100);display:grid;place-items:center;color:var(--n500);flex-shrink:0}
.field{display:flex;flex-direction:column;gap:2px}
.field__label{font:500 12px/16px var(--font);color:var(--n400)}
.field__value{font:600 14px/16px var(--font);color:var(--n600)}
.row{display:flex;align-items:center;gap:16px}
.sep{height:1px;background:var(--n100)}

.btn{height:32px;padding:0 16px;border-radius:2px;border:1px solid transparent;font:600 14px/16px var(--font);display:inline-flex;align-items:center;gap:4px;cursor:pointer;background:none}
.btn--lg{height:36px;padding:0 20px} .btn--sm{height:24px;padding:0 12px}
.btn--primary{background:var(--blue400);color:#fff}
.btn--outlined{border-color:var(--n200);color:var(--n700)}
.btn--outlined:hover{background:var(--n25)}
.btn--danger{border-color:var(--red500);color:var(--red500)}
.btn--danger:hover{background:#f9e2e0}
.iconbtn{width:32px;height:32px;border-radius:2px;display:grid;place-items:center;color:var(--n600);background:none;border:0;cursor:pointer}
.iconbtn:hover{background:var(--n50)}
.send{width:36px;height:36px;border-radius:2px;background:var(--grad);color:#fff;display:grid;place-items:center;border:0}
.chip{height:24px;padding:0 6px;border-radius:9999px;border:1px solid var(--n200);color:var(--n600);display:inline-flex;align-items:center;gap:4px;font:400 14px/16px var(--font)}
.chip--soft{background:var(--n100);border-color:transparent}
.chip--ok{background:var(--green50);border-color:transparent;color:var(--green700)}
.chip--warn{background:var(--amber50);border-color:transparent;color:var(--amber700)}
.chip--err{background:var(--red25);border-color:transparent;color:var(--red600)}
.badge{min-width:20px;height:20px;padding:0 6px;border-radius:9999px;background:var(--blue400);color:#fff;font:600 12px/16px var(--font);display:inline-grid;place-items:center}
.avatar{width:32px;height:32px;border-radius:50%;background:var(--n100);color:var(--n600);display:grid;place-items:center;font:600 12px/16px var(--font);flex-shrink:0}
.link{color:var(--blue500);font-weight:500;text-decoration:none}
.link:hover{text-decoration:underline}
.input{height:32px;padding:0 10px;border:1px solid var(--n400);border-radius:2px;font:400 14px/16px var(--font);width:100%}
.input:focus{outline:0;border-color:var(--blue400)}

.scrim{position:fixed;inset:0;background:var(--scrim);display:grid;place-items:center}
.modal{width:480px;max-width:calc(100vw - 48px);background:#fff;box-shadow:var(--sh-pop)}
.modal__head{background:var(--n100);padding:16px 24px;font:600 20px/32px var(--font);display:flex;gap:16px;align-items:center}
.modal__body{padding:24px;display:flex;flex-direction:column;gap:16px}
.modal__foot{padding:16px 24px;display:flex;justify-content:flex-end;gap:8px}
.toast{display:flex;gap:8px;padding:16px;background:#fff;border-radius:2px;box-shadow:0 1px 18px rgba(0,0,0,.12),0 6px 10px rgba(0,0,0,.14)}
.empty{display:flex;flex-direction:column;align-items:center;gap:12px;padding:16px;text-align:center}
.empty__icon{width:48px;height:48px;border-radius:8px;background:var(--n100);color:var(--n500);display:grid;place-items:center}

.card,.btn,.iconbtn,.navrow,.sug{transition:background 120ms ease,color 120ms ease,box-shadow 150ms ease-out,border-color 120ms ease}
</style>
```

**Minimal screen skeleton:**

```html
<div class="shell">
  <div class="menubar"></div>
  <div class="workarea">
    <div class="favbar"><div class="t1-tile"><i class="ph-bold ph-sparkle"></i></div></div>
    <div class="crm">
      <div class="skel" style="width:200px;margin-bottom:16px"></div>
      <div class="skel" style="width:100%;height:200px"></div>
    </div>
    <div class="panel">
      <div class="navbar">
        <button class="iconbtn"><i class="ph ph-list"></i></button>
        <div class="navbar__title">AI Assistant</div>
        <button class="iconbtn"><i class="ph ph-dots-three-vertical"></i></button>
      </div>
      <div class="thread">
        <div class="bubble">What's the status on the Tahoe?</div>
        <div class="reason">Checking service orders · parts availability · ETA</div>
        <div class="resp">
          <div class="resp__title">Awaiting parts — ETA Thursday.</div>
          <div class="card" style="width:320px">
            <div class="row">
              <div class="iconblock"><i class="ph ph-car"></i></div>
              <div class="field"><span class="field__label">DEAL</span><span class="field__value">#D-48210</span></div>
            </div>
            <div class="sep"></div>
            <div class="row" style="justify-content:space-between">
              <div class="field"><span class="field__label">UPDATED</span><span class="field__value">2h ago</span></div>
              <button class="btn btn--outlined btn--sm">View</button>
            </div>
          </div>
          <div class="feedback">
            <button class="iconbtn"><i class="ph ph-copy"></i></button>
            <button class="iconbtn"><i class="ph ph-thumbs-up"></i></button>
            <button class="iconbtn"><i class="ph ph-arrow-clockwise"></i></button>
          </div>
          <div class="sugs">
            <div class="sug"><i class="ph ph-paper-plane-tilt"></i>Notify customer</div>
            <div class="sug"><i class="ph ph-lightning"></i>Order expedite</div>
          </div>
        </div>
      </div>
      <div class="composer">
        <input placeholder="Ask anything or press '/' for shortcuts">
        <button class="send"><i class="ph-bold ph-arrow-up"></i></button>
      </div>
    </div>
  </div>
</div>
```

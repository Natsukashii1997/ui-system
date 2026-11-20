# Design System Inspiration of Kimi

This design system summary is extracted from public Kimi and Moonshot AI materials reviewed on June 7, 2026. It is not the official Kimi design system. Values are based on observed HTML/CSS tokens from `https://www.kimi.com/`, the Kimi K2.6 marketing page, and Moonshot public pages; any product-specific values not directly published are labeled as inferred or approximate.

## 1. Visual Theme & Atmosphere

Kimi's public interface is a quiet, desktop-first AI workspace: a pale `#f9fbfc` shell, a pure-white rounded main canvas, and a centered chat composer that looks more like a calm command surface than a search box. The brand avoids loud color fills. Most recognition comes from the black KIMI wordmark, the black rounded-square app icon, a restrained blue token (`#1783ff`) for links and tags, and a soft grayscale token system built around alpha black and alpha white values.

The home experience is almost empty by design. On desktop, the left 240px sidebar carries the product modes - PPT, document, deep research, website, table, Agent swarm, Kimi Code, Kimi Claw - while the main area gives the user's prompt the most visual priority. The central composer has a 24px rounded container, a visible 1px border, and a two-layer low-opacity shadow. This creates a floating-but-not-glossy AI prompt affordance.

The Kimi K2.6 marketing page adds a more editorial layer: sticky translucent header, centered typography, black pill CTAs, large white margins, and cinematic dark space/planet imagery. The product app is utilitarian and token-driven; the marketing pages are minimal, centered, and cosmic.

**Key Characteristics:**

- Desktop AI workspace shell: 240px left sidebar plus a white rounded main panel with 6px outer gutter.
- Neutral-first palette: `#ffffff`, `#f9fbfc`, alpha black text, subtle fills, and rare blue accents.
- Kimi blue (`#1783ff`) used for links, tags, selected text, and brand-supporting states rather than primary page backgrounds.
- Black primary CTA language on marketing pages; app actions often use `--Labels-Primary` as the active fill.
- System/PingFang-first typography with MiSans VF used on marketing hero headings.
- Rounded but not bubbly: 8px nav items, 10px compact buttons, 12px sidebar buttons, 16px cards/modals, 24px chat composer.
- Low-shadow interface: borders and translucent fills do most hierarchy work; the composer gets the clearest elevation.
- Product vocabulary is AI-agent specific: prompt box, model selector, mode chips, files, agent swarm, skills, Kimi Code, Kimi Claw.
- Marketing imagery uses dark cosmic gradients and planet-like light rings to express "moonshot" scale.

## 2. Color Palette & Roles

### Primary Brand & Accent

- **Kimi Blue** (`#1783ff`): `--Colors-KMBlue`; links, tags, selected text, informational affordances, and small brand accents.
- **Kimi Blue Hover** (`#167ff7`): hover state for light-mode blue controls.
- **Kimi Blue Active** (`#167cf2`): pressed/active state for light-mode blue controls.
- **Dark Kimi Blue** (`#1a88ff`): dark-mode blue accent.
- **Dark Kimi Blue Hover** (`#258eff`): dark-mode blue hover state.
- **Dark Kimi Blue Active** (`#3194ff`): dark-mode blue pressed state.
- **Wordmark Black** (`#000000` / `#000000e6`): KIMI wordmark, black CTAs, primary app actions, and high-emphasis UI.
- **Logo Micro Accent Yellow** (`#ffd230`, approximate): observed in brand icon details and semantic yellow token; use sparingly for star/spark details.

### Semantic Colors

- **Red** (`#ff3849`): light-mode error and destructive state.
- **Dark Red** (`#ff4756`): dark-mode error and destructive state.
- **Positive Green** (`#16c456`): success and positive status.
- **Yellow** (`#ffd230`): warning, highlight, and tiny icon accent.
- **Orange** (`#ff9500`): secondary warning/accent.
- **Purple** (`#985ffb` light, `#a16bff` dark): model, premium, or specialized feature accent.

### Light Mode Text Scale

- **Primary Label** (`#000000e6`): main copy, active nav, headings; equivalent to 90% black.
- **Secondary Label** (`#00000099` / `#0009`): secondary nav, body descriptions, model selector; 60% black.
- **Tertiary Label** (`#00000073`): hints, less prominent metadata; about 45% black.
- **Quaternary Label** (`#0000004d`): disabled or footer metadata; about 30% black.

### Light Mode Surfaces & Fills

- **App Ground** (`#f9fbfc`): outer desktop shell and sidebar background.
- **Primary Background** (`#ffffff`): main content panel and chat editor surface.
- **Secondary Background** (`#f5f5f5`): light panels and grouped surfaces.
- **Tertiary Background** (`#ffffff`): modal/card surface.
- **Quaternary Background** (`#ffffff`): secondary surface layer.
- **Fill F1** (`#00000008`): lowest contrast hover/card fill; activity carousel background.
- **Fill F2** (`#0000000d`): subtle control fill and main panel border equivalent.
- **Fill F3** (`#00000026`): disabled send button fill.
- **Fill F4** (`#00000040`): scrollbar thumb, stronger inactive fill.
- **Separator S1** (`#00000021`): standard border and divider.
- **Light Blue Background** (`#e8f3ff`): soft blue informational surface.
- **Kimi Blue 10** (`#1783ff1a`): blue tag background.

### Dark Mode Tokens

- **Dark Ground** (`#161717`): outer desktop shell.
- **Dark Primary Background** (`#121212`): main content panel.
- **Dark Secondary Background** (`#1f1f1f`): chat editor and secondary panels.
- **Dark Tertiary Background** (`#292929`): cards, modals, elevated panels.
- **Dark Quaternary Background** (`#4d4d4d`): stronger control surface.
- **Dark Primary Label** (`#ffffffd6`): main text; about 84% white.
- **Dark Secondary Label** (`#ffffff8f`): supporting text; about 56% white.
- **Dark Tertiary Label** (`#ffffff6b`): hints; about 42% white.
- **Dark Separator S1** (`#ffffff1f`): dark border/divider.
- **Dark Fill F1** (`#ffffff0d`): low contrast card/control fill.
- **Dark Fill F2** (`#ffffff1a`): secondary control fill.

### Shadow & Overlay Colors

- **Composer Shadow A** (`rgba(0,0,0,0.03) 0px 4px 12px 0px`): ambient lift.
- **Composer Shadow B** (`rgba(0,0,0,0.07) 0px 5px 16px -4px`): tighter contact shadow.
- **Light Mask** (`#0000001a`): low-intensity overlays.
- **Base Mask** (`#00000099` / `#0006`): modal dimming and overlays.

## 3. Typography Rules

### Font Family

- **App UI Primary**: `-apple-system, BlinkMacSystemFont, Segoe UI, system-ui, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif, Arial, PingFang SC, Source Han Sans SC, Microsoft YaHei UI, Microsoft YaHei, Noto Sans CJK SC`.
- **Marketing Hero**: `MiSans VF` where available, then the same system/PingFang stack.
- **Chinese UI**: rely on `PingFang SC`, `Source Han Sans SC`, and `Microsoft YaHei UI` fallback order.
- **Preview Recommendation**: do not bundle proprietary fonts; use system stack and mention MiSans VF as observed.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Marketing Hero | MiSans VF | 32px | 520 | 38px | normal | K2.6 hero heading, centered and two-line |
| Marketing Section | System/PingFang | 32px | 600 | 40px | normal | Section titles on K2.6 page |
| Marketing Card Title | System/PingFang | 20px | 600 | 27.5px | normal | Three-column feature card headings |
| Marketing Lead | System/PingFang | 18px | 400 | 29.25px | normal | Centered descriptive hero paragraph |
| UI T1 | System/PingFang | 18px | 400-500 | 26px | normal | Large modal titles and prominent labels |
| UI T2 | System/PingFang | 16px | 400-500 | 24px | normal | Activity card title/subtitle, input placeholder |
| UI B1 | System/PingFang | 15px | 400-500 | 22px | normal | Medium body or banner text |
| UI B2 | System/PingFang | 14px | 400-500 | 20px | normal | Sidebar, buttons, nav, compact controls |
| UI C1 | System/PingFang | 12px | 400 | 18px | normal | Tags, footnotes, helper text |
| UI C2 | System/PingFang | 10px | 400 | 14px | normal | Tiny metadata |
| Markdown H1 | System/PingFang | 22px | 600 | 36px | normal | Chat response content |
| Markdown Body | System/PingFang | 16px | 400 | 26px | normal | Generated answer body |
| Code Block | Mono/System | 14px | 400 | 22px | normal | Code blocks in chat responses |

### Principles

- **No expressive tracking**: Kimi relies on clean system metrics; keep letter spacing normal except tiny uppercase labels in custom previews.
- **Medium emphasis over bold heaviness**: 500 and 600 carry emphasis; avoid 800+ except synthetic preview wordmarks.
- **Center marketing, left-align product**: marketing pages center hero copy; the app shell uses left-aligned sidebar and prompt content.
- **Chinese readability first**: keep 14px/20px for side navigation and 16px/24px for composer placeholder and card copy.
- **Use alpha labels, not many grays**: text hierarchy should be expressed through `#000000e6`, `#0009`, `#00000073`, and their dark equivalents.

## 4. Component Stylings

### App Shell

- Body background: `#f9fbfc` in light, `#161717` in dark.
- App minimum width: 375px.
- Desktop layout: left sidebar plus a main panel.
- Sidebar width: 240px.
- Main panel: margin `6px`, left margin `240px` when sidebar is expanded, background `#ffffff`, border `1px solid #0000000d`, radius `8px`.
- Dark main panel: background `#121212`, border `1px solid #ffffff1a`.

### Sidebar

- Background: `#f9fbfc` light, `#161717` dark.
- Header padding: `15px 10px 9px 16px`.
- Logo: 28px square, black rounded app icon; do not copy the asset, approximate with a black tile and simple K mark.
- New chat button: white background, 12px radius, `1px solid #00000021`, padding `12px 8px`, height about 46px, margin-bottom 14px.
- Navigation items: width 224px, height 40px, padding `10px 8px`, radius 8px, `14px/20px` text.
- Standard item color: `#0009`; active or special item color: `#000000e6`; special items may use 500 weight.
- Footer: fixed at bottom region, separated by subtle border/fill, same compact 14px navigation style.

### Chat Composer

- Width: about 768px on desktop home.
- Height: about 130px.
- Background: `#ffffff` light, `#1f1f1f` dark.
- Border: `1px solid rgba(0,0,0,0.25)` light; `1px solid rgba(255,255,255,0.25)` dark.
- Radius: 24px.
- Shadow: `rgba(0,0,0,0.03) 0px 4px 12px 0px, rgba(0,0,0,0.07) 0px 5px 16px -4px`.
- Input area padding: `12px 16px 10px`.
- Placeholder: `尽管问...`, 16px, 400, line-height 24px, secondary label color.
- Bottom action row: margin `2px 0 8px`, padding `0 8px`, height 36px.
- Tool chip: 36px height, pill shape, subtle border/fill, 14px text.
- Model selector: 36px height, radius 20px, padding `8px 10px 8px 12px`, color `#0009`.
- Send button: 36px square, radius 22px, disabled fill `#00000026`, active fill `#000000e6` with white icon.

### Buttons

**Marketing Primary CTA**

- Background: near-black (`#171717` or `#000000e6`).
- Text: white.
- Radius: 10-12px.
- Height: about 40px in headers, 40-42px in hero sections.
- Padding: `0 16px` for compact header CTA; `10px 16px` for hero CTA.
- Hover: slightly lighter/darker black fill; no heavy shadow.

**App Primary / Confirm Button**

- Background: `--Labels-Primary`.
- Text: `--Bg-Primary`.
- Height: 32px for modal compact actions.
- Radius: 10px.
- Padding: `0 10px`.

**Secondary / Tool Button**

- Background: `--Fills-F1` or `--Fills-F2`.
- Text: `--Labels-Primary`.
- Border: none or `1px solid --Separators-S1` depending on context.
- Radius: 10-12px.
- Hover: move one fill level up, for example `F1 -> F2`.

### Cards & Panels

- Activity carousel card: 480px x 84px observed on homepage; background `#00000008`, no border, no shadow, image area about 92px x 84px.
- Activity card title: 16px, weight 500, line-height 24px, primary label.
- Activity card subtitle: 16px, weight 400, line-height 24px, secondary label.
- Skill/modal cards: `--Bg-Tertiary`, `0.5px solid --Separators-S1`, radius 16px, padding 16px.
- Empty state panels: `--Fills-F1`, radius 16px, generous vertical padding.
- Marketing feature cards: pale `#f5f5f5` or white panels, radius 8-16px, minimal border, 20px/600 titles.

### Inputs & Forms

- Textarea/input background: `--Fills-F1` inside modals; composer is white/dark secondary surface.
- Input radius: 12px for modal textareas; 24px for main composer.
- Focus: background changes to hover fill and adds `0 0 0 1px var(--Separators-S1)`.
- Error: border or wrapper uses `--Colors-Red`.
- Placeholder: tertiary or secondary label; never pure black.

### Navigation

- Marketing header: sticky, 64px height, background `rgba(255,255,255,0.7)`, backdrop blur 6px, no hard bottom border.
- Header content: max width about 1280px with 80px desktop side margin.
- Marketing links: 16px/24px, secondary label, 8px radius on hover.
- App sidebar: persistent on wide desktop; collapses under 1280px.
- Mobile: navigation becomes simplified; sidebar hidden behind trigger; app keeps minimum width 375px.

### Imagery / Iconography

- Kimi app icon: black rounded square with K mark and small accent dots; approximate in previews, do not copy asset.
- K2.6 marketing imagery: cinematic dark planet/moon visuals with blue rim light and warm orange edge light.
- Sidebar icons: 20px line icons, black/secondary label color, aligned with 14px text.
- Tool icons: 16-18px inside compact pill buttons.
- Use simple geometric icons; avoid playful or highly illustrated icon sets.

## 5. Layout Principles

### Spacing System

- Base unit: 4px, with most components stepping in 8px increments.
- Common scale: 4px, 6px, 8px, 10px, 12px, 14px, 16px, 20px, 24px, 32px, 48px, 64px, 96px.
- App outer gutter: 6px around the main panel.
- Sidebar nav padding: 8px horizontal, 10px vertical.
- Composer padding: 12px/16px top input area plus 8px bottom action row.
- Marketing section padding: 48px top, 96px bottom on large desktop.

### Grid & Container

- App shell: fixed 240px sidebar plus flexible main canvas.
- Main panel: white rounded rectangle inside the pale app ground.
- Home composer: centered horizontally within main panel, about 768px wide, vertically placed around the middle of the screen.
- Marketing content: centered max-width 1280px, with 80px desktop side gutters.
- Marketing hero copy: max width about 1000px for lead paragraph.
- Feature grids: three-column desktop cards; collapse to one column on mobile.

### Whitespace Philosophy

Kimi uses blank space to make the prompt feel central and calm. The home page should not be crowded: sidebar actions carry functionality, while the main panel stays quiet. On marketing pages, whitespace creates a high-confidence product launch tone: centered headline, short lead, black CTA, then a single large visual artifact.

### Border Radius Scale

- Micro: 4px for small tags.
- Small: 6px for dropdown rows and compact hover states.
- Standard: 8px for sidebar nav items and main app panel.
- Control: 10px for compact modal buttons.
- Sidebar Button: 12px for new chat button and secondary controls.
- Card / Modal: 16px for skill cards, banners, modals.
- Composer: 24px for the central chat editor.
- Pill/Circle: 20px+ or 999px for model selectors, icon controls, and send button.

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | No shadow; surface and label tokens only | Sidebar, marketing text, standard sections |
| Bordered | `1px solid #0000000d` or `#00000021` | Main panel, new chat button, modal fields |
| Filled | `#00000008` or `#0000000d` | Activity cards, hover states, soft panels |
| Composer | `0 4px 12px rgba(0,0,0,0.03), 0 5px 16px -4px rgba(0,0,0,0.07)` plus 24px radius | Main prompt input |
| Modal/Card | `0 4px 16.4px #0000001a` for popovers; radius 12-16px | Popover menus and floating panels |
| Focus | `0 0 0 1px var(--Separators-S1)` or a blue accessibility ring when needed | Keyboard focus and active textareas |

**Shadow Philosophy**: Kimi does not use dramatic elevation. Most depth is created with borders, alpha fills, and large quiet surfaces. Use the chat composer shadow as the strongest normal-page elevation; reserve popover shadows for transient menus only.

## 7. Do's and Don'ts

### Do

- Use `#f9fbfc` as the app ground and `#ffffff` as the primary main panel in light mode.
- Use alpha label tokens (`#000000e6`, `#0009`, `#00000073`) instead of arbitrary grays.
- Keep Kimi blue (`#1783ff`) for tags, links, selection, and small accents rather than large CTA backgrounds.
- Use black or near-black fills for primary CTAs, especially on marketing pages.
- Center the prompt composer and make it the dominant object on app home screens.
- Use 8px sidebar item radii, 12px secondary button radii, 16px card radii, and 24px composer radius consistently.
- Preserve the 240px desktop sidebar and 6px main-panel gutter in app-shell layouts.
- Use system/PingFang typography and MiSans VF only as a named observed marketing font, not as a bundled asset.
- Use cosmic blue/orange dark gradients for K2.6-style marketing visuals when imagery is needed.

### Don't

- Don't turn Kimi into a blue-first SaaS interface; blue is a supporting accent, not the default button color.
- Don't add heavy drop shadows to cards; the interface should feel flat, precise, and quiet.
- Don't use saturated gradients across the whole app shell; reserve cosmic gradients for launch/marketing visuals.
- Don't use playful rounded bubble cards everywhere; Kimi's rounding is practical and restrained.
- Don't use pure black body text for normal copy; use `#000000e6` or equivalent label tokens.
- Don't crowd the main panel with dashboard widgets; the prompt should remain visually primary.
- Don't copy Kimi's logo image, planet imagery, or proprietary assets into generated files.
- Don't claim the generated folder is official or published by Kimi/Moonshot.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Mobile Minimum | <375px | Avoid; app declares 375px minimum width unless embedded |
| Mobile | 375-568px | Sidebar becomes hidden/overlay; modals shrink to `calc(100vw - 32px)`; cards stack |
| Small Tablet | 568-839px | Modal subtitle rows stack; skill cards become one column; banners simplify |
| Tablet/Desktop | 840-1280px | App shows sidebar trigger; interactive sidebar can collapse; marketing grids reduce density |
| Wide Desktop | >1280px | 240px sidebar remains visible; centered 768px composer; 1280px marketing max-width |

### Touch Targets

- Sidebar nav rows: 40px high.
- New chat button: 46px high.
- Composer bottom actions: 36px high.
- Send button: 36px circular, but mobile implementations should target 40-44px where possible.
- Marketing CTA: about 40px high with 10-12px radius.

### Collapsing Strategy

- Sidebar: persistent at wide desktop, collapsible/overlay below 1280px.
- Main panel: keep 6px outer gutter on desktop; remove or reduce only on tight mobile contexts.
- Composer: fixed max width around 768px, then `calc(100% - 32px)` on small screens.
- Activity carousel: horizontal cards on desktop; stacked or scrollable compact cards on mobile.
- Marketing hero: centered text remains; large visual scales from wide 16:9 card to full-width image block.
- Feature grid: three columns -> two columns -> one column.

### Image Behavior

- App previews should avoid asset dependency; use abstract cards or CSS-drawn icon tiles.
- K2.6-style hero visuals should use 16:9 or wide rounded rectangles with dark cosmic gradients.
- Keep image corners at 8-12px on marketing visuals; avoid excessive 24px rounding on hero media.

## 9. Agent Prompt Guide

### Quick Color Reference

- App ground: `#f9fbfc`
- Light main panel: `#ffffff`
- Light primary text: `#000000e6`
- Light secondary text: `#00000099`
- Light tertiary text: `#00000073`
- Standard border: `#00000021`
- Soft fill: `#00000008`
- Disabled fill: `#00000026`
- Kimi blue: `#1783ff`
- Black CTA: `#171717` or `#000000e6`
- Dark ground: `#161717`
- Dark panel: `#121212`
- Dark secondary surface: `#1f1f1f`
- Dark text: `#ffffffd6`
- Dark border: `#ffffff1f`
- Composer shadow: `rgba(0,0,0,0.03) 0px 4px 12px 0px, rgba(0,0,0,0.07) 0px 5px 16px -4px`

### Example Component Prompts

- "Create a Kimi-style AI app shell: `#f9fbfc` desktop ground, 240px left sidebar, 6px gutter, white main panel with 8px radius and `1px solid #0000000d` border. Use 14px/20px sidebar items with 8px radius."
- "Design a Kimi chat composer: 768px wide, 130px high, white background, 24px radius, `1px solid rgba(0,0,0,0.25)`, two-layer subtle shadow, 16px placeholder text `尽管问...`, bottom action row with tool chip, model selector, and 36px circular send button."
- "Build a Kimi K2.6 marketing hero: sticky translucent white header, black KIMI wordmark, centered 32px/38px MiSans-style headline, 18px secondary paragraph, black pill CTA, and a large rounded dark cosmic visual with blue rim light."
- "Create Kimi-style feature cards: white or `#f5f5f5` surface, 16px radius, minimal or no shadow, 20px/600 title, 16px/24px secondary body, and no bright background fills except tiny blue tags."
- "Make a dark Kimi interface: `#161717` ground, `#121212` main panel, `#1f1f1f` composer, `#ffffffd6` primary text, `#ffffff8f` secondary text, `#ffffff1f` borders, and `#1a88ff` only for links/tags."

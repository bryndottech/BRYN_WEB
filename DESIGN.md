# DESIGN.md — BRYN design system

This file records the design system that already exists in `bryn.index.html.html` and
the standards the Next.js migration must meet. Values marked **Verified** were read
from the source. Values marked **Migration standard** are the agreed normalization
recorded in `AGENTS.md`; they are not claims about the old file.

Read this with `AGENTS.md`. `AGENTS.md` defines agent behavior; this file defines the
visual and interaction system.

## 1. Brand character

BRYN is an enterprise operations platform **and** a web, app, and growth studio. The
site must feel calm, precise, accountable, and expensive in the quiet sense — closer to
an infrastructure company than to a creative agency.

The identity is built from:

- a single blue accent on off-white and near-black grounds;
- large, tightly tracked display type with generous negative space;
- thin hairline rules and real product UI instead of decorative cards;
- alternating light and dark bands that structure long pages;
- restrained motion, with the product window and the pinned workflow section carrying
  the visual narrative.

Do not add a second accent, a new font family, a mascot, a gradient brand, or a new
logo treatment. The monogram is the brand; the wordmark is set in Plus Jakarta Sans.

## 2. Color

### 2.1 Core tokens (Verified)

| Token | Light | Dark (`.dk`, `[data-theme=dark]`) | Role |
| --- | --- | --- | --- |
| `--bg` | `#FAFAFA` | `#09090B` | Page and section ground |
| `--fg` | `#09090B` | `#FAFAFA` | Primary text, dark buttons |
| `--mu` | `#52525B` | `#A1A1AA` | Body copy, metadata, secondary text |
| `--ln` | `#E5E7EB` | `rgba(255,255,255,.08)` | Hairlines, input borders, dividers |
| `--sf` | `#FFFFFF` | `#121215` | Raised surfaces, cards, inputs on dark |
| `--ac` | `#2563EB` | `#2563EB` | The only brand accent |

Supporting verified values:

- Nav light: `rgba(250,250,250,.72)` with `backdrop-filter: blur(16px)` and
  `1px solid rgba(9,9,11,.08)`.
- Nav dark: `rgba(18,18,21,.8)` with `1px solid rgba(255,255,255,.1)`.
- Dark terminal/product chrome: `#09090B`, text `#E4E4E7`, hairline
  `rgba(255,255,255,.1)`.
- `theme-color`: `#09090B`.
- White text on `#2563EB` is the primary-button pairing.

### 2.2 Semantic colors (Verified, status only)

| Role | Value | Use |
| --- | --- | --- |
| Success text | `#059669`, `#10B981`, `#34D399` | Uptime dot, success state, newsletter confirmation |
| Warning | `#D97706`, `#F59E0B` | Status labels and indicators only |
| Error | `#DC2626` | Field errors, invalid borders |

Semantic colors never become decorative accents, gradients, or hover colors. Amber is
not approved for small text on the light ground; use it for fills, icons, or borders,
and verify contrast before using it as text.

### 2.3 Colors that must not survive migration

These appear in the source and are explicitly rejected:

- `#F701FC` and `#03F848` — the magenta-to-green button hover gradient;
- `#FF4D00` — the 404 glitch shadow;
- `#00FF55` and `#FF00F5` — confetti;
- `#60A5FA`, `#F4F4F5`, and any other one-off tint that is not a documented token.

No new hex value may be introduced outside `app/styles/tokens.css`.

## 3. Typography

### 3.1 Families and roles (Verified)

| Token | Family | Loaded weights | Role |
| --- | --- | --- | --- |
| `--d` | Plus Jakarta Sans | 500, 600, 700, 800 | Display, headings, buttons, nav, UI labels |
| body | Inter | 400, 500 | Paragraphs, form values, footer links |
| `--m` | JetBrains Mono | 400, 500 | Eyebrows, metadata, tags, timestamps, code |
| `--s` | Instrument Serif | 400 normal + italic | Editorial pull quotes and the closing statement only |

There is no fifth family. Do not use the serif for headings, buttons, or body copy.

### 3.2 Scale and treatment (Verified)

- `h1`, `h2`, `h3`: Plus Jakarta Sans 700, `letter-spacing: -.035em`,
  `line-height: 1.05`.
- Body: Inter 400, `16px / 1.6`; paragraphs use `--mu`.
- `.mono` / `.tag`: JetBrains Mono 500, `11px / 1.4`, uppercase,
  `letter-spacing: .08em`.
- Hero `h1`: `clamp(40px, 7vw, 96px)`, max width `12.5em`.
- Section `h2`: `clamp(32px, 4.6vw, 64px)`, max width `15ch`.
- Closing statement (`.fx h3`): Instrument Serif 400,
  `clamp(38px, 5.4vw, 80px) / 1`, `letter-spacing: -.02em`, max width `11em`.
- Page headers use a smaller display range: `clamp(40px, 6.4vw, 92px)` down to
  `clamp(26px, 7vw, 38px)` on compact headers.
- Pricing amount (`.pr`): Plus Jakarta Sans 700, `52px / 1`, tabular numerals.
- Large metric (`.big`): Plus Jakarta Sans 600, `44px`, tabular numerals.
- Watermark (`.wm`): Plus Jakarta Sans 800, `30.5vw / .74`,
  `letter-spacing: -.06em`.

**Migration standard:** keep the four roles and the fluid scale, but express it as a
small named set of tokens (`--text-xs` through `--text-display`) so pages cannot drift
into one-off sizes. Minimum body size is 16px; metadata may be 11–13px only when it is
genuinely secondary.

## 4. Layout and spacing

### 4.1 Verified layout

- Content container `.w`: `width: min(1280px, 100% - 48px); margin: auto`.
- Section and footer padding: `clamp(72px, 10vw, 150px) 0`.
- Hero: `padding: 160px 0 0`, centered; 96px blueprint grid background with a
  ground-colored fade to the bottom.
- Fixed nav: top `14px` plus safe-area inset, height `60px`, effective width
  `min(1200px, 100% - 24px)` (a later rule overrides the earlier 1120px value),
  horizontal padding `0 10px 0 20px`, pill radius.
- Desktop rails appear only at `min-width: 1440px`.
- Footer grid: five link columns plus a `1.6fr` newsletter column, `32px` gap.

### 4.2 Spacing scale

Use only `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` px. Prefer `clamp()` for section and
display spacing, not for component gaps. Do not introduce a 10px or 18px gap because
it looks right in one spot.

### 4.3 Grid behavior (Verified breakpoints)

- `1440px` and up: fixed side rails and scroll progress appear.
- `1150px` and down: sign-in and the `⌘K` trigger hide; nav compresses.
- `900px` and down: multi-column page layouts collapse to one column; mobile menu is
  available; docs sidebar becomes horizontal.
- Reduced motion: animations and transitions are suppressed.

**Migration standard:** preserve the desktop-first `max-width` breakpoints at 1150 and
900, keep the 1440 enhancement, and add explicit checks at 768, 390, and 320. The
mobile nav is a full-screen composition, not a compressed desktop bar.

## 5. Radii, borders, and elevation

### 5.1 Observed values

The source uses `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 50%, 99px`. This is the
inconsistency the migration removes.

### 5.2 Migration standard (binding)

| Element | Radius |
| --- | --- |
| Chips, tags, small controls | `8px` |
| Buttons, inputs, selects, textareas | `12px` |
| Cards, panels, dialogs, product windows | `16px` |
| Avatars, status dots, circular icon buttons | `50%` |
| Pills | Only tags, status chips, and avatars |

Borders are `1px` hairlines. Never pair a `2px+` border with a rounded card. Featured
pricing may use a blue `1px` border plus a `1px` blue ring, not a thick outline.

Elevation is restrained: the hero product window and dark terminal may use the
existing deep shadow (`0 40px 80px -40px rgba(9,9,11,.35)`); ordinary cards use
hairlines and surface contrast, not floating shadows.

## 6. Components

### 6.1 Navigation

- Fixed, centered, pill-shaped, translucent with blur; logo left, primary links
  center, actions right.
- Wordmark: monogram plus “BRYN” in Plus Jakarta Sans 800, `20px`,
  `letter-spacing: -.03em`.
- Links: Plus Jakarta Sans 500, `14px`; hover underline grows from the left.
- Actions: `⌘K` command trigger, theme toggle, “Sign in”, “Book a Demo”.
- Mobile: full-screen dark drawer, large Plus Jakarta Sans links, primary CTA pinned
  to the bottom, `aria-expanded` on the trigger, Escape closes, focus is trapped and
  restored.

**Migration fixes:** nav actions must be at least `44×44px` (the source uses 40px
buttons and a 36px theme toggle); the theme toggle needs an accessible name and
`aria-pressed`; the drawer must not rely on a clip-path transition for visibility.

### 6.2 Buttons

Verified anatomy: inline-flex, `height: 48px`, `padding: 0 24px`, pill radius,
Plus Jakarta Sans 600 `14px`, `1px` hairline border, arrow that shifts `4px` on hover.

Variants:

- **Primary** (`.p`): `#2563EB` ground, white text.
- **Secondary** (`.btn`): transparent ground, `--ln` hairline, inherited text.
- **Dark** (`.k`): `--fg` ground, `--bg` text.

**Migration standard:** radius `12px`; minimum height `44px`; hover darkens the fill
or lifts the button `1px`; active returns to `0`; focus-visible is a `2px` blue ring
with offset. Remove the magenta/green gradient and the `!important` color override.
The arrow micro-motion may stay at `150–300ms`.

### 6.3 Tags, chips, and status

- Tag: pill, `7px 14px` padding, `1px solid --ln`, `--sf` ground, mono 11px uppercase,
  `--mu` text.
- Optional 6px blue dot for release/status tags; no infinite pulse in the migrated
  version.
- Status chips use semantic color plus a text label and dot. Never rely on color alone.

### 6.4 Cards and panels

Verified card: `--sf` ground, `1px solid --ln`, `16px` radius, `26px` padding,
`min-height: 300px`, flex column with content pushed to the bottom by `.v`.
Cards may span two or four of a six-column grid.

**Remove:** the cursor-following blue radial glow (`.cd::before`), 3D tilt
(`perspective(...) rotateX/rotateY`), and hover transforms that move the whole card.
Replace with a quiet border-color or surface shift. Prefer open layout and hairlines
over card soup; do not nest rounded panels.

### 6.5 Product UI window

The hero’s `.win` is the primary proof element: a browser-chrome window with a
`16px` radius, hairline border, white (or `#121215` dark) surface, and real-looking
dashboard content. It currently carries `rotateX(22deg) scale(.92)` and a scroll-linked
transform.

**Migration standard:** keep the product window and its content; remove the 3D tilt and
scroll-linked rotation. A single, short entrance is allowed. The window must remain
legible and unclipped at 390px and 320px.

### 6.6 Forms

Verified anatomy:

- Label: mono 11px uppercase, `--mu`.
- Input/select: height `50px`, `1px solid --ln`, radius `12px`, `--bg` ground,
  Inter 15px, `16px` horizontal padding.
- Textarea: `96px` minimum, `14px 16px` padding, vertical resize.
- Focus: blue border plus `0 0 0 3px rgba(37,99,235,.15)`.
- Error: `#DC2626` border and 12px message; field wrapper gets `.bad`.
- Success: centered panel with a blue check, reference number, and next action.

**Migration standard:** keep labels visible, add `aria-invalid` and
`aria-describedby`, announce success with a live region, and never describe the
simulated success state as a real submission. Target height stays at least `44px`.

### 6.7 Pricing

Three columns, `16px` gap, cards with `32px` padding, plan name, description, large
tabular price, feature list with blue checks, full-width CTA. The featured plan uses a
blue border and “Most popular” tag. A monthly/annual switch (`role="switch"`,
`aria-checked`) and a team-size range calculator update the numbers.

**Migration standard:** card radius `16px`, no `2px` border, keep the switch and
calculator behavior, and label computed prices as estimates.

### 6.8 Docs, journal, changelog, status

- Docs: sticky sidebar navigation plus article body; search input; copyable code
  blocks. Sidebar becomes a horizontal scroller below 900px.
- Journal: filter chips, search, article list, article detail with “Copy link”.
- Changelog: filter chips and dated release entries.
- Status: component rows with 90-day bars and uptime figures. The source generates
  bars randomly; replace with static sample data or label it clearly as illustrative.
- Tables: full-width, hairline row dividers, centered comparison columns, horizontal
  scroll on small screens.

### 6.9 Footer

Dark band. Top row pairs an Instrument Serif closing statement with the primary CTA
and “Join the team”. Below: five link columns plus newsletter signup. Bottom bar:
copyright, legal links, social icons, and a large `BRYN` watermark.

Verified link treatment: Inter 15px, `--mu`, hover to `--fg` with a `4px` shift.
Social buttons are 46px circles with a hairline border; hover fills blue.

**Migration standard:** footer headings are Plus Jakarta Sans 600 16px (the later rule
overrides the mono/uppercase base rule). Do not keep both declarations. Keep the
watermark decorative and `aria-hidden`.

### 6.10 Overlays

- **Command menu:** centered dialog, `min(620px, 100% - 32px)`, search field, grouped
  results, arrow-key navigation, Enter to run, Escape to close. Radius `16px` in the
  migration (source uses 22px). Focus is trapped and restored.
- **Mobile drawer:** full-screen dark panel; large links; CTA at the bottom; body
  scroll locked; Escape closes.
- **Cookie banner:** fixed bottom-left dark panel, `min(400px, 100% - 40px)`, radius
  `16px`, with Accept / Reject / Preferences. Must be keyboard reachable and must not
  cover the primary CTA on small screens.
- **Toast:** dark pill, centered bottom, short text, auto-dismiss, announced politely.
- **Dialog:** `min(460px, 100% - 32px)`, radius `16px`, backdrop blur, close button
  with an accessible name.

### 6.11 404

Keep the oversized `404`, the heading “This route doesn’t exist.”, the explanation,
“Back to home”, and “Search the site”. Remove the glitch animation and `#FF4D00`
shadow. The number is decorative (`aria-hidden`); the heading carries the message.

## 7. Motion and interaction

- Easing token: `cubic-bezier(.16,1,.3,1)`.
- Standard UI transitions: `150–300ms`. The hero entrance and the pinned workflow
  section may run longer; nothing else should.
- Allowed: hero entrance, nav underline, button arrow shift, drawer/overlay open and
  close, accordion expand, theme change, one pinned workflow sequence with a
  mobile/reduced-motion fallback.
- Removed: 3D tilt, scroll-linked hero rotation, magnetic buttons, custom cursor,
  page curtain, confetti, glitch, blinking/pulsing decoration, parallax text, and
  fade-in-on-scroll for every section.
- `prefers-reduced-motion: reduce` disables transforms, smooth scrolling, and
  non-essential animation; content is visible immediately.

## 8. Responsive behavior

| Width | Expected behavior |
| --- | --- |
| 1440+ | Full nav, side rails, wide grids, watermark |
| 1150 | Nav compresses; sign-in and command trigger hide; grids reduce |
| 1024 | Two-column layouts hold where content allows; no clipped product UI |
| 900 | Single-column page layouts; mobile nav; docs sidebar scrolls horizontally |
| 768 | Tablet portrait; no horizontal scroll; touch targets 44px |
| 390 | Phone; full-screen nav; stacked CTAs; readable product UI |
| 320 | Smallest supported width; no overflow, no clipped labels, no tiny targets |

The mobile nav is a deliberate full-screen composition. Do not simply hide links and
leave a squeezed bar.

## 9. Accessibility contract

- Landmarks: `header`, `nav`, `main#main`, `footer`. The skip link is the first
  focusable element and targets `#main` (the source targets `#platform`).
- One `h1` per page; no skipped heading levels.
- Visible `:focus-visible`: `2px solid #2563EB`, offset `3px`.
- Every control has an accessible name. Theme toggle exposes state; menus expose
  `aria-expanded`; dialogs trap and restore focus; Escape closes overlays.
- Forms: visible labels, field-level errors, `aria-invalid`, announced success.
- Images: meaningful `alt`; decorative images empty `alt` or `aria-hidden`.
- Contrast meets WCAG AA in both themes. Do not use amber for small text on light.
- Content is visible without JavaScript. No `[data-r]`-style hiding before hydration.
- Minimum target `44×44px`, including nav actions, social links, and icon buttons.

## 10. Source inconsistencies and migration standard

This section is intentionally explicit: the old file is the content reference, not the
style reference.

| Area | Observed in source | Migration standard |
| --- | --- | --- |
| Radii | 2–22px plus pills | 8 / 12 / 16 / 50% / pill only |
| Buttons | Pill, 48px; nav 40px | 12px radius; 44px minimum |
| Button hover | Magenta→green gradient, `!important` | Brand darken/lift, no `!important` |
| Hero | `rotateX(22deg)` plus scroll transform | Flat, legible, one entrance |
| Cards | Radial glow, 3D tilt | Hairline/surface shift only |
| Nav width | 1120px then 1200px duplicate | One effective width, documented |
| Footer headings | Mono uppercase then PJS 16px duplicate | PJS 600 16px only |
| Theme toggle | 36px, no state exposed | 44px, named, `aria-pressed` |
| Content reveal | `[data-r]` hidden until JS | Visible by default |
| 404 | Glitch + `#FF4D00` | Static, brand-only |
| Status data | Random bars and uptime | Static sample or clearly labeled |
| Landmarks | No `main`; skip link to `#platform` | `main#main`; skip link to `#main` |
| Accent drift | Blue plus neon/glitch/confetti colors | `#2563EB` only |

## 11. Content and proof guardrails

The site contains claims and proof elements that cannot be verified from the
repository, including customer names, uptime figures, certifications, response times,
office locations, milestones, and “live” activity. The migration preserves the copy as
instructed, but must not present simulated data as live:

- label sample/illustrative data where the UI implies real-time measurement;
- keep forms clearly simulated until wired to a real endpoint;
- flag unverified claims in the final report rather than silently rewriting them;
- never invent a new testimonial, logo, metric, team member, address, or certification.

## 12. Verification checklist

Before calling a design change complete:

1. `npm run build` passes and every route renders.
2. Check 1440, 1024, 820, 768, 390, and 320 widths; no horizontal scroll.
3. Check light and dark themes; contrast and hairlines hold in both.
4. Keyboard through skip link, nav, menus, forms, tabs, accordions, and footer.
5. Confirm focus is visible, overlays trap/restore focus, Escape closes.
6. Confirm reduced motion removes transforms and reveals content immediately.
7. Confirm no banned color, gradient, glitch, tilt, confetti, or fake live feed remains.
8. Confirm copy, heading hierarchy, metadata, and JSON-LD are preserved.

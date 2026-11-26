# DESIGN.md — BRYN design system

This file records the design system implemented by the latest `origin/main` branch.
Values marked **Verified** were read from that reference. `AGENTS.md` defines agent
behavior; this file defines the visual and interaction system.

## 0. Source of truth

Latest `origin/main` is the source of truth for UI, layout, typography, spacing,
colors, animation, hover/focus states, navigation, responsive behavior, sections,
and components. If an older design decision, normalization standard, or generic
design checklist conflicts with latest main, latest main wins for parity work.

Latest main is also the preferred reference for equivalent content. Preserve valid
existing content that has no main equivalent; do not invent or duplicate claims.

Do not remove or soften main-branch UI because it was previously described as
“AI slop,” a second accent, an effect, or a cleanup target. Import it faithfully,
then fix only real problems: broken layout, duplicated elements, accessibility
regressions, or unverifiable content claims.

## 1. Brand character

BRYN Technologies is a digital services company for web and software development,
mobile apps, digital marketing, design, AI, automation and IT. Latest main keeps a
disciplined information structure while allowing expressive interaction color and
motion at specific moments.

The identity is built from:

- a blue base accent on off-white and near-black grounds;
- magenta and green interaction treatments for hovers, active navigation,
  spotlight glows, and highlighted states;
- large, tightly tracked display type with generous negative space;
- thin hairlines, glass surfaces, and real product UI;
- alternating light and dark bands;
- hero masks, reveals, magnetic buttons, card tilt/spotlight, scroll progress,
  page curtain, parallax, and count-up motion.

The monogram is the brand; the wordmark is set in Plus Jakarta Sans. Do not add a
new font family, mascot, or redraw the logo.

## 2. Color

### 2.1 Base tokens (Verified)

| Token | Light | Dark root | Dark `.dk` band | Role |
| --- | --- | --- | --- | --- |
| `--bg` | `#FAFAFA` | `#09090B` | `#09090B` | Page and section ground |
| `--fg` | `#09090B` | `#FAFAFA` | `#FAFAFA` | Primary text, dark buttons |
| `--mu` | `#52525B` | `#A1A1AA` | `#A1A1AA` | Body copy, metadata, secondary text |
| `--ln` | `#E5E7EB` | `rgba(255,255,255,.08)` | `rgba(255,255,255,.10)` | Hairlines, input borders, dividers |
| `--sf` | `rgba(255,255,255,.82)` | `#121215` | `rgba(24,24,27,.78)` | Raised surfaces, cards, inputs on dark |
| `--ac` | `#2563EB` | `#2563EB` | `#2563EB` | Base brand accent |

Supporting verified values:

- Nav light: `rgba(250,250,250,.72)` with `backdrop-filter: blur(16px)` and
  `1px solid rgba(9,9,11,.08)`.
- Nav dark: `rgba(18,18,21,.8)` with `1px solid rgba(255,255,255,.1)`.
- Dark terminal/product chrome: `#09090B`, text `#E4E4E7`, hairline
  `rgba(255,255,255,.1)`.
- `theme-color`: `#09090B`.
- White text on `#2563EB` is the primary-button resting pairing.
- Latest main applies the selected theme to every section and the footer: in light
  theme, `.dk`/dark bands switch to the light tokens instead of staying dark.

### 2.2 Interaction tokens (Verified from latest main)

These are part of the approved latest-main system, not rejected colors:

| Token / use | Verified value |
| --- | --- |
| `--brand-hover` | `linear-gradient(110deg, #F701FC 0%, #03F848 100%)` |
| Primary / social / dropdown hover | `var(--brand-hover)` with `#09090B` text |
| Active nav and service headers, dark | `#F701FC` |
| Active nav and service headers, light | `#C026D3` |
| Service link hover | `#03F848` |
| Focus in service menu | `#F701FC`, `2px` outline, `3px` offset |
| Agency-card mono label in light theme | `#7C3AED` |
| Agency card glass border on hover | transparent border with `linear-gradient(110deg,#F701FC 0%,#03F848 100%)` border-box |
| Agency card magenta spotlight | `rgba(247,1,252,.12)` |
| Agency card green spotlight | `rgba(3,248,72,.09)` |
| Card blue radial glow | `rgba(37,99,235,.14)` |
| 404 glitch shadows | `#2563EB` and `#FF4D00` |
| Confetti colors | `#2563EB`, `#09090B`, `#00FF55`, `#FF00F5`, `#FAFAFA` |
| Highlighted status bar | `linear-gradient(110deg, #F701FC 0%, #03F848 100%)` |

Do not flatten these into blue-only hovers. Blue remains the base accent; magenta
and green are approved interaction colors on latest main.

### 2.3 Semantic colors (Verified, status only)

| Role | Value | Use |
| --- | --- | --- |
| Success text | `#059669`, `#10B981`, `#34D399` | Uptime dot, success state, newsletter confirmation |
| Warning | `#D97706`, `#F59E0B` | Status labels and indicators only |
| Error | `#DC2626` | Field errors, invalid borders |

Semantic colors keep their status meaning. Amber is not approved for small text on
the light ground; use it for fills, icons, or borders, and verify contrast before
using it as text.

Do not introduce a new hex value outside `app/styles/tokens.css` unless it is
verified from latest `origin/main` and recorded here first.

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
- Masked heading lines: `.m` clips overflow; `.m > span` begins at
  `translateY(105%)` and transitions to `none` over `1.1s` with
  `cubic-bezier(.16,1,.3,1)`.

Named CSS tokens are welcome, but must preserve these rendered values.

## 4. Layout and spacing

### 4.1 Verified layout

- Content container `.w`: `width: min(1280px, 100% - 48px); margin: auto`.
- Section padding: `clamp(72px, 10vw, 150px) 0`. Footer padding is fixed `72px 0 0`.
- Hero: `padding: 160px 0 0`, centered; 96px blueprint grid background with a
  ground-colored fade to the bottom and scroll-linked `backgroundPositionY`.
- Fixed nav: top `14px` plus safe-area inset, height `60px`, effective width
  `min(1200px, 100% - 24px)` (the later rule overrides the earlier 1120px value),
  horizontal padding `0 10px 0 20px`, pill radius.
- Nav hides upward with `nav.hd2 { transform: translate(-50%, -160%) }`.
- Left section rail and right progress rail appear at `min-width: 1440px`.
- Footer grid: five link columns with a `1.6fr` sixth track, `32px` gap. The live
  homepage leaves that sixth track empty; no newsletter field is rendered there.

### 4.2 Spacing scale

Preferred scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` px. Latest main also uses
component-specific values such as 10px, 14px, 18px, 22px, 26px, and 34px; preserve
them where they are part of the reference layout. Do not “normalize” a spacing value
if it changes the rendered UI.

### 4.3 Grid behavior (Verified breakpoints)

- `1440px` and up: fixed side rails and scroll progress appear.
- `1150px` and down: sign-in and the `⌘K` trigger hide; nav compresses.
- `900px` and down: multi-column page layouts collapse to one column; mobile menu is
  available; docs sidebar becomes horizontal.
- `800px` and `540px`: agency grids step from three columns to two, then one.
- Reduced motion: animations and transitions are suppressed; reveals are visible.

Keep the desktop-first `max-width` breakpoints at 1150 and 900, keep the 1440
enhancement, and add explicit checks at 768, 390, and 320. The mobile nav is a
full-screen composition, not a compressed desktop bar.

## 5. Radii, borders, and elevation

Latest main uses mixed radii. Preserve the verified component treatments:

- Buttons and nav: pill radius `99px`.
- Cards and panels: commonly `16px`, `18px`, `20px`, or `24px` depending on the
  component.
- Inputs and small controls: `12px`.
- Chips, status pills, social icons, avatars: `8px`, `12px`, `50%`, or pill as
  implemented.
- Hairlines are `1px` unless a verified active state uses `2px` or `3px`.
- Agency cards use a transparent border with a magenta/green gradient border-box
  on hover; do not replace it with a plain hairline.
- The hero product window and dark terminal use the existing deep shadow
  (`0 40px 80px -40px rgba(9,9,11,.35)`); glass cards use their verified
  layered shadows and inset highlights.

Do not introduce a thick border on a rounded card unless it is a verified
latest-main active state.

## 6. Components

### 6.1 Navigation

- Fixed, centered, pill-shaped, translucent with blur; logo left, primary links
  center, actions right.
- Wordmark: monogram plus “BRYN” in Plus Jakarta Sans 800, `20px`,
  `letter-spacing: -.03em`.
- Links: Plus Jakarta Sans 500, `14px`; hover underline grows from the left.
- Active nav: `#F701FC` in dark theme, `#C026D3` in light theme; underline uses the
  magenta/green gradient. Active service toggle shows a green caret.
- Actions: `⌘K` command trigger, theme toggle, “Sign in”, “Book a Demo”.
- Mobile: full-screen dark or light drawer, large Plus Jakarta Sans links, service
  submenu toggle, primary CTA pinned to the bottom, `aria-expanded` on triggers,
  Escape closes, focus is trapped and restored.
- Nav progress: `.pg` hairline at the bottom scales with scroll progress.
- Auto-hide: `.hd2` moves the nav up while scrolling down and restores on scroll up.

### 6.2 Buttons

Verified anatomy: inline-flex, `height: 48px`, `padding: 0 24px`, pill radius,
Plus Jakarta Sans 600 `14px`, `1px` hairline border, arrow shifts `4px` on hover.
Use default flex alignment (`justify-content: normal`), not centered content. Do not
shrink buttons at 320px; the 48px height, 24px padding, and 14px font stay fixed.
Navigation CTA is the verified exception: `40px` height, `0 18px` padding, no border,
and `14px` font. Button transition is `transform .3s var(--ease), background .3s`.

Variants and states:

- **Primary** (`.btn.p` / `.btn-primary`): `#2563EB` ground, white text. Hover uses
  `var(--brand-hover)` with transparent border and `#09090B` text.
- **Secondary** (`.btn`): transparent ground, `--ln` hairline, inherited text. It has
  no generic hover lift, background, or border change; only the arrow shifts.
- **Dark** (`.btn.k` / `.btn-dark`): `--fg` ground, `--bg` text. The navigation dark
  button uses the gradient hover like primary buttons.
- **Social and dropdown actions** (`.so a`, `.dm a`): use the same gradient hover.
- Focus follows the surrounding token unless a component has a verified magenta
  focus ring.
- Keep minimum `44×44px` targets where feasible without changing the reference look.

### 6.3 Tags, chips, and status

- Tag: pill, `10px` gap, `7px 14px` padding, `1px solid --ln`, `99px` radius, `--sf`
  ground, mono 11px uppercase, `--mu` text. Do not shrink the tag at 320px.
- Optional blue dot for release/status tags; no infinite pulse in the migrated version.
- Highlighted build badge (`.bd.x`): `#F701FC` text and border.
- Status chips use semantic color plus a text label and dot. Never rely on color alone.

### 6.4 Cards and panels

- `.cd` cards: six-column grid, span 2 or 4, `--sf` ground, `1px solid --ln`,
  `16px` radius, `26px` padding, `min-height: 300px`,
  `radial-gradient(360px circle at var(--x, 50%) var(--y, 0), rgba(37,99,235,.14), transparent 60%)` on hover.
- `.cd,.pc` cards tilt on fine pointers with `perspective(900px)` and
  `rotateX(var(--rx)) rotateY(var(--ry))`.
- Agency cards: glass gradient surface, magenta/green spotlights, gradient border
  on hover, `translateY(-4px)`, and layered shadow. The dedicated card-interaction
  script sets `--spot-x`, `--spot-y`, `--card-x`, `--card-y`, `--card-rx`, and
  `--card-ry`.
- Do not remove the card glow, tilt, or spotlight to make the UI “quieter.”

### 6.5 Product UI window

The hero’s `.win` is the primary proof element: a browser-chrome window with a
`16px` radius, hairline border, white (or `#121215` dark) surface, and real-looking
dashboard content. Latest main intentionally keeps `rotateX(22deg) scale(.92)` on
a `1600px` perspective stage and scroll-linked parallax. Preserve that treatment,
but keep the window legible and unclipped at 390px and 320px.

### 6.6 Forms

- Label: mono 11px uppercase, `--mu`.
- Input/select: height `50px`, `1px solid --ln`, radius `12px`, `--bg` ground,
  Inter 15px, `16px` horizontal padding.
- Textarea: `96px` minimum, `14px 16px` padding, vertical resize.
- Focus: blue border plus `0 0 0 3px rgba(37,99,235,.15)`.
- Error: `#DC2626` border and 12px message; field wrapper gets `.bad`.
- Success: centered panel with a blue check, reference number, and next action.
- Keep labels visible, add `aria-invalid` and `aria-describedby`, announce success
  with a live region, and never describe simulated success as a real submission.
- Target height stays at least `44px`.

### 6.7 Pricing

Three columns, `16px` gap, cards with `32px` padding, plan name, description, large
tabular price, feature list with blue checks, full-width CTA. The featured plan uses
a blue border and “Most popular” tag. A monthly/annual switch (`role="switch"`,
`aria-checked`) and a team-size range calculator update the numbers. Preserve the
switch, calculator, and estimate labeling.

### 6.8 Docs, journal, changelog, status

- Docs: sticky sidebar navigation plus article body; search input; copyable code
  blocks. Sidebar becomes a horizontal scroller below 900px.
- Journal: filter chips, search, article list, article detail with “Copy link”.
- Changelog: filter chips and dated release entries.
- Status: component rows with 90-day bars and uptime figures. Latest main can use
  randomized bars; in the Next.js app use static sample data or label it clearly as
  illustrative rather than implying a live feed.
- Tables: full-width, hairline row dividers, centered comparison columns, horizontal
  scroll on small screens.

### 6.9 Footer

Themed band (dark by default, light when the light theme is selected) with fixed
`72px 0 0` padding. Top row pairs an Instrument Serif closing
statement with one primary CTA. Below: five link columns — Explore, Services,
Resources, Company, Preferences — with the live homepage's short link sets. Bottom
bar: Facebook, X, LinkedIn, Instagram and Email icons plus the copyright line; no
newsletter field or operational status line is rendered. A large `BRYN` watermark
uses `margin: 10px -1vw -0.02em` and a white-to-transparent gradient. Declare the
`background` shorthand before `-webkit-background-clip: text`/`background-clip: text`;
the reverse order resets the clip and hides the wordmark. Intentional deviation:
latest main keeps the white gradient in light theme, where it disappears on the light
footer ground; this app uses `rgba(9,9,11,.12) → rgba(9,9,11,0)` in light theme only so
the wordmark remains visible. Dark theme remains identical to latest main.

Footer headings are Plus Jakarta Sans 600 16px. Links are Inter 15px with `6px`
vertical padding; hover shifts `4px` and moves to `--fg`. Social buttons are `46px`
circles with `10px` gaps; their SVGs have `pointer-events: none` so the link itself
is the hover/hit target, and hover uses the magenta/green gradient with `translateY(-4px)`.
The footer CTA carries `.mag`; its pointer translation is `0.2x`/`0.3y` of the offset
from the button center and resets on pointer leave/blur.
Keep the watermark decorative and `aria-hidden`. Extra local routes such as privacy,
terms, careers, trust, docs, journal and status remain reachable from the app, but
they are not duplicated in the homepage footer because latest main does not show
them there.

### 6.10 Overlays

- **Command menu:** centered dialog, `min(620px, 100% - 32px)`, search field, grouped
  results, arrow-key navigation, Enter to run, Escape to close. Radius `16px` in the
  migration (source uses 22px). Focus is trapped and restored.
- **Mobile drawer:** full-screen panel; large links; service submenu; CTA at bottom;
  body scroll locked; Escape closes.
- **Cookie banner:** fixed bottom-left dark panel, `min(400px, 100% - 40px)`, radius
  `16px`, Accept / Reject / Preferences. Opening Preferences from footer or command
  must reveal the preference panel directly. First visit shows the banner after 1.6s.
- **Toast:** dark pill, centered bottom, short text, auto-dismiss, announced politely.
- **Dialog:** `min(460px, 100% - 32px)`, radius `16px`, backdrop blur, close button
  with an accessible name.
- No chat/assistant widget: latest main has no Bryn assistant, chat button, or chat
  panel, so none is rendered.

### 6.11 404

Keep the oversized `404`, the heading “This route doesn’t exist.”, the explanation,
“Back to home”, and “Search the site”. Latest main uses `#2563EB` / `#FF4D00` text
shadows; preserve that glitch treatment. The number is decorative (`aria-hidden`);
the heading carries the message.

### 6.12 Contact page

Latest main renders a two-column contact page with no form. The shared page hero uses
`170px 0 80px` padding, a 96px grid background, `h1 { margin: 24px 0 }` with no
max-width, and `p { max-width: 580px; margin: 0; font-size: 19px }`; at 900px and below
the hero top padding is `130px`. The content grid is `5fr 6fr` with `72px` gap. Each
contact column block has `20px 0` padding and a top hairline, with an 18px bold label,
accent email link, and 14px muted detail. Contact social icons are `44×44px`, 12px
radius, 12px gap, with magenta hover and `translateY(-4px)`. The note card uses `34px`
padding, 20px radius, a hairline border, `--sf` ground, and the `Email BRYN` button.

### 6.13 About page

The mission statement is `.big2`: Instrument Serif 400, `clamp(30px, 4.6vw, 64px) /
1.1`, `-0.015em` tracking, `max-width: 22ch`, and inherited `--mu` color. It carries
`data-r`. The guide band is a standard section with `clamp(72px, 10vw, 150px)`
vertical padding and the theme's `--bg`. Its `.hd` is a wrapping flex row with
`justify-content: space-between`, `align-items: end`, `32px` gap, and `56px` bottom
margin; the intro paragraph is capped at `380px`. Both heading and intro carry
`data-r`.

Guide cards use `.agency-grid` with three `minmax(0, 1fr)` columns, `16px` gap, and
`48px` top margin. Each `.agency-card` is an `article` with `min-height: 220px`,
`26px` padding, `18px` radius, hairline border, flex-column layout, and the verified
glass background: `rgba(39,39,42,.82) → rgba(24,24,27,.64)` in dark theme and
`rgba(255,255,255,.86) → rgba(255,255,255,.60)` in light theme. Card titles are
`clamp(19px, 2vw, 24px)` with `-0.035em` tracking, `22px 0 12px` margins; card body
copy is `14px`. Actions use `.cta` with `flex-start` alignment and `56px` top margin.
At `800px` the grid becomes two columns; at `540px` it becomes one column with `12px`
gap, `30px` top margin, and `22px` card padding.

### 6.14 Back-to-top

The control is `.bt` / `button#bt`, fixed `28px` from the right and
`calc(92px + env(safe-area-inset-bottom, 0px))` from the bottom. It is a borderless
`44×44px` circle using `--sf`, `--fg`, `z-index: 110`, `translateY(10px)` when
hidden, `transform: none` when `.on`, and `0.5s var(--ease)` transitions. The SVG is
`viewBox="0 0 44 44"` with a faint `currentColor` track circle and an accent `.rg2`
progress circle (`stroke-dasharray: 125.7`, `stroke-dashoffset: calc(125.7*(1 -
var(--p)))`). Scroll sets `--p` to `scrollY / maxScroll`; it is not initialized until
the first scroll, matching latest main. The button remains visible at all widths.

### 6.15 Connect page

`/connect` adapts the supplied standalone BRYN_CONNECT source into the shared App
Router shell. Its layout is unchanged: a 470px centered column, 64px grid, six 66px
link cards, and the official-site CTA. The light palette is the supplied source
palette (`#FAFAFA`, `#09090B`, `#71717A`, `#E4E4E7`, `rgba(255,255,255,.82)`,
`rgba(9,9,11,.035)`) with the green-to-magenta accent gradient
(`linear-gradient(110deg, #03F848 0%, #03F848 35%, #F701FC 100%)`). The internal
route adds a dark theme driven by the root theme toggle: `#09090B` ground,
`#FAFAFA` text, `#A1A1AA` secondary text, `rgba(255,255,255,.1)` hairlines,
`rgba(24,24,27,.78)` card surfaces, `#18181B` raised controls, and an inverted
dark-button pairing. The route uses the root viewport metadata, like other pages,
instead of the standalone page's fixed light theme color.

The email link uses a mail app at `max-width: 767px` or on Android/iPhone/iPad user
agents and Gmail Compose on desktop, with a second `max-width: 768px` click guard
as in the source. The source's body padding is offset by the fixed app navigation
(122px top on desktop, 102px at 480px and below) so the identity is not overlaid.
The standalone copyright is a non-landmark `div` because the app already provides
the global `footer` landmark. The page uses the existing
`public/brand/bryn-mark.png` asset instead of the source's embedded image. The
`/connect` discovery link is deliberately kept in the footer Explore column only;
it is not in the header, mobile drawer, or command menu.

## 7. Motion and interaction

Latest-main motion is part of the design:

- Easing token: `cubic-bezier(.16,1,.3,1)`.
- Standard UI transitions: `150–300ms`; masked headings use `1.1s`; reveal transitions
  use `.9s`; service accordion rows use `.7s`; page curtain uses `.55s`/`.6s`.
- Hero entrance: masked h1 lines with staggered delays of `.08s` and `.16s`.
- Scroll reveals: `[data-r], .m, .sp` observed at `threshold: .15`, adding `.in`.
- Magnetic buttons: `.mag` translate on mousemove by `.2x`/`.3y` of pointer offset.
- Card spotlight: `.cd` sets `--x`/`--y`; agency cards set `--spot-*` and
  `--card-*` variables with a `requestAnimationFrame`-throttled pointer handler.
- Card tilt: `.cd,.pc` set `--rx`/`--ry` on pointermove and reset on pointerout.
- Nav progress: `.pg` scales with document scroll progress.
- Back-to-top ring: `#bt` shows when `scrollY > 700`; its `.rg2` circle completes as
  `--p` reaches 1 at the document bottom.
- Right rail: `.rr i` uses a white/transparent gradient driven by `--p`.
- Page curtain: `#cv` slides in on route change, swaps content, then slides out. The
  logo asset is used unchanged; do not invert it in dark theme. Class order is
  `in` → `out` → cleared.
- Parallax: hero `backgroundPositionY` moves with scroll on home.
- Count-up: `[data-n]` animates to its value over `1600ms` when intersecting.
- Text scramble: `[data-sc]` cycles random characters before settling.
- Scroll behavior: latest main uses native `scroll-behavior: auto` with
  `scroll-padding-top: env(safe-area-inset-top, 0px)`. Do not add smooth scrolling.
- Confetti and glitch are allowed only in the verified latest-main moments.
- `prefers-reduced-motion: reduce` disables transforms, smooth scrolling, and
  non-essential animation; content is visible immediately.

## 8. Responsive behavior

| Width | Expected behavior |
| --- | --- |
| 1440+ | Full nav, left section rail, right progress rail, wide grids, watermark |
| 1150 | Nav compresses; sign-in and command trigger hide; grids reduce |
| 1024 | Two-column layouts hold where content allows; no clipped product UI |
| 900 | Single-column page layouts; mobile nav; docs sidebar scrolls horizontally |
| 820 | Verify intermediate tablet layout; no overflow or stacked duplicates |
| 768 | Tablet portrait; no horizontal scroll; touch targets 44px |
| 800 | Agency grid becomes two columns |
| 540 | Agency grid becomes one column |
| 390 | Phone; full-screen nav; stacked CTAs; readable product UI |
| 320 | Smallest supported width; no overflow, no clipped labels, no tiny targets |

The mobile nav is a deliberate full-screen composition. Do not simply hide links and
leave a squeezed bar.

## 9. Accessibility contract

- Landmarks: `header`, `nav`, `main#main`, `footer`. Skip link targets `#main`.
- One `h1` per page; no skipped heading levels.
- Visible focus rings. Use verified magenta rings in service menu/active navigation
  contexts and the blue token elsewhere unless latest main specifies otherwise.
- Every control has an accessible name. Theme toggle exposes state; menus expose
  `aria-expanded`; dialogs trap and restore focus; Escape closes overlays.
- Forms: visible labels, field-level errors, `aria-invalid`, announced success.
- Images: meaningful `alt`; decorative images empty `alt` or `aria-hidden`.
- Contrast meets WCAG AA in both themes where text is involved. Do not use amber for
  small text on light.
- Main-branch reveal/hide effects must not leave content permanently hidden. Under
  reduced motion, all revealed content is visible immediately.
- Minimum target `44×44px`, including nav actions, social links, and icon buttons,
  except where the verified latest-main composition would be visibly altered.

## 10. Content and proof guardrails

The site contains claims and proof elements that cannot be verified from the
repository, including customer names, uptime figures, certifications, response times,
office locations, milestones, and “live” activity. Preserve the copy as instructed,
but do not present simulated data as live:

- label sample/illustrative data where the UI implies real-time measurement;
- keep forms clearly simulated until wired to a real endpoint;
- flag unverified claims in the final report rather than silently rewriting them;
- never invent a new testimonial, logo, metric, team member, address, or certification.

## 11. Verification checklist

Before calling a UI change complete:

1. `npm run build` passes and every route renders.
2. Check 1440, 1024, 820, 768, 390, and 320 widths; no horizontal scroll.
3. Check light and dark themes; contrast and hairlines hold in both.
4. Keyboard through skip link, nav, menus, forms, tabs, accordions, and footer.
5. Confirm focus is visible, overlays trap/restore focus, Escape closes.
6. Confirm reduced motion removes transforms and reveals content immediately.
7. Confirm latest-main colors, gradients, glows, reveals, tilt, magnetic buttons,
   curtain, parallax, and count-up are present where the reference uses them.
8. Confirm copy, heading hierarchy, metadata, and JSON-LD are preserved.
9. Report any skipped main-branch effect with an explicit reason.

## 12. GitHub Pages deployment

The deployed target is `https://bryndottech.github.io/BRYN_WEB/`. Local development
and `npm run dev` remain root-relative. Static-export settings are applied only when
`GITHUB_PAGES=true`; the workflow also sets `NEXT_PUBLIC_BASE_PATH` from
`actions/configure-pages`, so `next/link`, `next/image`, metadata icons, and the
curtain-mark CSS asset resolve under `/BRYN_WEB`. `images.unoptimized` is enabled
for the export because GitHub Pages cannot run the Next.js image optimizer. A
`public/.nojekyll` file is copied into `out/` so Pages does not discard the `_next`
asset directory. Footer column links use `next/link` so their data-driven internal
hrefs also receive the base path.

The `/demo` page no longer reads `searchParams` in the Server Component. Its query
string is read by a client `useSearchParams` child inside a `Suspense` boundary,
which keeps the route exportable and preserves `?service=` deep links from pricing.


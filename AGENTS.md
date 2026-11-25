# AGENTS.md — BRYN project instructions

This file is the permanent operating contract for AI coding agents working on this
repository. Read it together with `DESIGN.md` before changing any UI, copy, or code.
If a task conflicts with this file, stop and ask; do not silently override it.

## 1. Project overview and technical stack

- **Product:** BRYN — an enterprise operations platform plus a web, app, and growth
  studio. The site must read as a calm, accountable enterprise company, not a generic
  SaaS template or an agency showcase.
- **Current source:** `bryn.index.html.html` — one self-contained HTML document with
  inline CSS, inline vanilla JavaScript, a hash-based SPA router, and a base64 logo.
  It is the reference for content, layout, and behavior until the migration is done.
- **Migration target:** Next.js App Router, JavaScript only, JSX components, global
  CSS with design tokens, no TypeScript, no Tailwind, no CSS-in-JS, no UI kit.
- **Runtime:** Node 24+, npm. Fonts: Plus Jakarta Sans, Inter, JetBrains Mono, and
  Instrument Serif via `next/font/google`. Logo extracted to `public/brand/`.
- **Backend:** none. Existing forms simulate success in the browser. Never claim a
  form is production-ready until it is wired to a real endpoint and verified.
- **Branch:** work on the current branch only. Do not create, rename, switch, or
  delete branches. Commit important milestones with clear messages.

## 2. Next.js App Router and JavaScript-only requirements

- Use the **App Router** (`app/`). Do not add a Pages Router.
- Use **JavaScript only** — `.js` / `.jsx`. Never add TypeScript files.
- **Server Components by default.** Add `'use client'` only where state, effects,
  browser APIs, or event handlers are genuinely required.
- Keep client boundaries small and leaf-level: theme toggle, mobile nav, command
  menu, tabs, filters, accordions, forms, cookie banner, and the pinned flow.
- Use `next/link`, `next/image`, `next/font`, and the Metadata API. Preserve the
  existing title, description, Open Graph tags, and JSON-LD organization data.
- Prefer semantic HTML and data-driven JSX. Do not paste the old HTML document into
  a component. Do not use `dangerouslySetInnerHTML` unless the content is trusted,
  static, and sanitized.
- Do not add dependencies, UI libraries, animation libraries, CSS frameworks, or
  state managers without explicit approval and a compatibility check.
- Keep the app buildable with `npm run build`; no unused imports or dead routes.

## 3. Existing brand identity preservation

The brand already exists. Discover it from the code; do not invent a new one.

- Preserve the blue accent, off-white and near-black grounds, dark alternating
  bands, the four type roles, the BRYN monogram, and the restrained enterprise voice.
- Preserve the product-UI-led hero and the existing page inventory. Do not rebrand,
  rename the company, redraw the logo, or change core messaging without approval.
- Preserve the light/dark theme behavior and the existing section rhythm.
- If a brand value is unclear, inspect the existing CSS/markup and record the verified
  value in `DESIGN.md`. Never guess and never present a guess as approved.

## 4. Approved design-system rules

Exact values and component details live in `DESIGN.md`. The rules below are binding.

- **Color:** `#2563EB` is the only brand accent. Use the light/dark neutral tokens in
  `DESIGN.md`; semantic green/amber/red only for status. No new accent colors.
- **Type:** Plus Jakarta Sans for display and UI headings; Inter for body; JetBrains
  Mono for labels and metadata; Instrument Serif only for editorial pull quotes and
  the closing statement. Do not add a fifth family.
- **Radius:** `8px` small, `12px` medium, `16px` large; pills only for tags, status
  chips, and avatars. Buttons `12px`; cards/panels `16px`; inputs `12px`; chips `8px`.
- **Spacing:** 4/8/12/16/24/32/48/64/96/128. Container `min(1280px, 100% - 48px)`.
  Section padding `clamp(72px, 10vw, 150px)`.
- **Buttons:** one primary (solid blue), one secondary (hairline), one dark/black
  where needed. Hover darkens or lifts `1px`; active returns to `0`; focus-visible is
  a `2px` blue ring. Minimum target `44×44px`.
- **Motion:** `150–300ms`, easing `cubic-bezier(.16,1,.3,1)`. Hero entrance only.
  No tilt, glitch, confetti, magnetic buttons, custom cursor, or scroll reveal on
  every section. Respect `prefers-reduced-motion`.
- **Surfaces:** prefer whitespace, alignment, and `1px` hairlines over cards and
  shadows. Never combine a `2px+` border with a rounded card.

## 5. Anti-AI-slop design restrictions

Remove, do not repackage:

- magenta/green hover gradients, orange/blue glitch effects, neon confetti, random
  accent colors, and unrelated yellow hover states;
- 3D card tilt, scroll-linked hero tilt, magnetic buttons, custom cursors, page
  curtains, and scroll-jacking (the existing pinned “Three workflows” section is the
  one allowed scroll moment and must keep its mobile/reduced-motion fallback);
- fade-in-on-scroll for every section, blinking, parallax text, and decorative loops;
- glassmorphism beyond the existing nav, blobs, glows, generic gradients, card soup,
  nested rounded panels, pill-everything, and thick borders on rounded cards;
- invented testimonials, customer logos, metrics, certifications, team members,
  addresses, or “live” data. Preserve existing copy; flag unverified claims instead
  of silently rewriting them;
- fake live intervals, random sparklines, and random audit streams. Use static sample
  data or label it clearly.

Prefer hierarchy through type, spacing, alignment, and real product UI. Every visual
element must have a purpose. Remove before adding.

## 6. Content preservation rules

- Preserve all headings, paragraphs, navigation labels, CTAs, pricing, docs, journal,
  about, careers, trust, legal, and 404 copy. Do not rewrite marketing copy or change
  meaning, tone, or claims.
- Minimal corrections only: obvious typos, stray separators, inconsistent punctuation.
- Preserve the page inventory and routes. Do not delete pages or sections.
- Preserve SEO metadata, JSON-LD, and the existing heading hierarchy.
- Preserve form fields and validation behavior. A simulated success state is not a
  real submission.
- If content conflicts with the anti-slop rules (for example an unverified claim),
  report it in the final summary and ask before changing it.

## 7. CSS architecture and coding conventions

- Organize styles as `app/styles/tokens.css`, `base.css`, `components.css`, and
  `pages.css`, imported by `app/globals.css`.
- Keep the existing short class names where they already describe the component
  (`.btn`, `.hero`, `.cd`, `.pc`); group new rules by component and comment sections.
- Use CSS variables for color, radius, spacing, and motion. No one-off hex values
  outside the token files.
- Do not use Tailwind, CSS-in-JS, Sass, or new preprocessors.
- Avoid `!important`, duplicate selectors, conflicting declarations, and inline
  styles except for genuinely dynamic values.
- Keep the existing desktop-first `max-width` breakpoints (1150, 900, and the
  existing 1440 enhancement) and add 768/390/320 checks where needed.
- Prefer `clamp()`, `min()`, and `max()` for fluid type and containers.
- Keep JSX semantic; no wrapper `div` without a layout or accessibility purpose.
- Map `next/font` variables to `--d` (display), `--m` (mono), `--s` (serif), and body.

## 8. Accessibility and responsive requirements

- Landmarks: `header`, `nav`, `main#main`, `footer`. The skip link is the first
  focusable element and targets `#main`.
- One `h1` per page; no skipped heading levels. Every control has an accessible name.
- Keyboard: all controls reachable; visible `:focus-visible`; menus expose
  `aria-expanded`; dialogs trap and restore focus; Escape closes overlays.
- Forms: visible labels, field-level errors, `aria-invalid`, and an announced success
  state. Do not rely on color alone.
- Images: meaningful `alt`; decorative images use empty `alt` or `aria-hidden`.
- Contrast must meet WCAG AA in both themes. Do not hide content behind JavaScript:
  content is visible without JS.
- Targets at least `44×44px` with adequate spacing. Respect reduced motion.
- Verify 1440, 1024, 820, 768, 390, and 320 widths. No horizontal scroll; mobile nav
  is a deliberate full-screen composition, not a squeezed desktop bar.

## 9. Testing and verification expectations

- `npm run dev` starts; `npm run build` passes; run `npm run lint` if configured.
- Verify every route and every nav/footer link. Verify theme toggle, mobile menu,
  command menu, tabs, filters, accordions, forms, pricing calculator, docs copy,
  journal search, careers filter, and the 404 page.
- Check console errors, hydration warnings, keyboard focus order, reduced motion,
  and all target widths.
- Do not claim a check passed unless it was actually run. Report failures and open
  issues honestly.
- Commit important milestones with clear messages. Never commit `.agents/`,
  `skills-lock.json`, `.next/`, `node_modules/`, or generated QA artifacts; they are
  intentionally ignored.

## 10. Instructions for future AI coding agents

1. Read `AGENTS.md` and `DESIGN.md` first. Then inspect the actual files before
   proposing or making changes.
2. Do not create, rename, switch, or delete branches. Work on the current branch.
3. Do not install dependencies or skills without checking requirements and
   compatibility, and without explicit approval.
4. Installed skills are local-only and git-ignored. Check availability before use;
   never pretend a skill is installed or invent its capabilities.
5. Priority skills for design/frontend work: `design-taste-frontend` (Taste Skill),
   `design-slop`, `ui-ux`, `frontend-craft`, and `web-design-guidelines`. Read the
   relevant `SKILL.md` before applying it. Combine only complementary skills; the
   project’s brand and these instructions override generic skill defaults.
6. Do not edit `.agents/` or `skills-lock.json`; do not commit them.
7. Preserve content and brand. Ask before changing copy, claims, palette, logo, or
   page inventory. Keep changes scoped; no drive-by redesigns.
8. Update `AGENTS.md` and `DESIGN.md` when implementation decisions materially
   change. Keep the two files complementary, not duplicated.
9. Verify with a real build and a real browser. Report what was verified, what was
   not, and what remains.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

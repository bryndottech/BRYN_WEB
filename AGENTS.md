# AGENTS.md — BRYN project instructions

This file is the permanent operating contract for AI coding agents working on this
repository. Read it together with `DESIGN.md` before changing any UI, copy, or code.

## 0. Conflict rule — latest `origin/main` wins for UI

> **Explicit user override:** Latest `origin/main` is authoritative for UI, visual
> design, animations and interactions. Existing Next.js architecture remains the
> implementation target. Preserve valid content and functionality, not outdated
> visual decisions. Existing project restrictions should not automatically reject
> verified design changes from the latest reference. Fix rendering and migration
> regressions rather than layering CSS patches over them.
>
> **Content preference:** latest `origin/main` is also the preferred reference for
> content where equivalent copy exists. Preserve valid existing content that has no
> main equivalent; do not invent, duplicate, or silently rebrand claims.

The latest `origin/main` branch is the source of truth for UI, layout, typography,
spacing, colors, animation, hover/focus states, navigation, responsive behavior,
sections, and component behavior.

- Import latest-main UI changes directly. Do not ask for approval to adopt a visual
  or interaction treatment that exists on latest `origin/main`.
- Do not use an older design rule, “cleanup,” or a generic anti-slop checklist to
  water down, omit, or rebrand latest-main UI.
- If a rule in this file or `DESIGN.md` conflicts with latest `origin/main` UI, the
  latest main implementation wins for parity work. Record any intentional deviation
  explicitly in the final report.
- Keep valid existing copy, data, and functionality. Latest main is the UI reference,
  not permission to replace content with unverified or duplicate copy.
- The only reasons to pause an import are a real accessibility regression, a broken
  layout, duplicated elements, or a content claim that cannot be verified. Fix those
  problems while preserving the intended main-branch appearance.

## 1. Project overview and technical stack

- **Product:** BRYN — an enterprise operations platform plus a web, app, and growth
  studio. The site must read as a calm, accountable enterprise company while matching
  the latest-main visual system.
- **UI source of truth:** latest `origin/main` for UI, layout, typography, spacing,
  colors, animation, hover/interaction states, navigation, responsive behavior,
  sections, and components.
- **Content reference:** the local `bryn.index.html.html` and current app content for
  verified copy, metadata, and form behavior. Preserve valid existing content; do not
  overwrite, duplicate, or stack elements.
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
  menu, tabs, filters, accordions, forms, cookie banner, pointer-driven effects, and
  the pinned flow.
- Use `next/link`, `next/image`, `next/font`, and the Metadata API. Preserve the
  existing title, description, Open Graph tags, and JSON-LD organization data.
- Prefer semantic HTML and data-driven JSX. Do not paste the old HTML document into
  a component. Do not use `dangerouslySetInnerHTML` unless the content is trusted,
  static, and sanitized.
- Do not add dependencies, UI libraries, animation libraries, CSS frameworks, or
  state managers without explicit approval and a compatibility check. Implement
  latest-main interactions in vanilla CSS/JS unless approval is given otherwise.
- Keep the app buildable with `npm run build`; no unused imports or dead routes.

## 3. Existing brand identity preservation

The brand already exists. Discover it from latest `origin/main`; do not invent a new one.

- Preserve the brand identity as implemented on latest main, including the blue base,
  the magenta/green interaction palette, active-navigation treatment, off-white and
  near-black grounds, dark alternating bands, the four type roles, the BRYN monogram,
  and the enterprise voice.
- Preserve the product-UI-led hero and the existing page inventory. Do not rebrand,
  rename the company, redraw the logo, or change core messaging without approval.
- Preserve light/dark theme behavior and the latest-main section rhythm.
- If a brand value is unclear, inspect the latest-main CSS/markup and record the
  verified value in `DESIGN.md`. Never guess and never present a guess as approved.

## 4. Approved design-system rules

Exact values and component details live in `DESIGN.md`. Latest `origin/main` is the
binding visual reference.

- **Color:** use latest-main color roles and tokens, including
  `--brand-hover: linear-gradient(110deg, #F701FC 0%, #03F848 100%)`, magenta active
  navigation, and magenta/green spotlight and border treatments. The blue `#2563EB`
  accent remains the base, but it is not the only interaction color.
- **Type:** match latest main. Keep Plus Jakarta Sans, Inter, JetBrains Mono, and
  Instrument Serif in their established roles; do not add a fifth family.
- **Radius and spacing:** match latest main. Tokens such as 8/12/16px and the spacing
  scale are implementation aids only; they must not change the rendered UI.
- **Buttons:** reproduce latest-main primary, secondary, dark, gradient-hover, arrow
  shift, focus, and active states. Keep targets at least `44×44px` where this does not
  alter the intended design.
- **Motion:** reproduce latest-main motion, including hero masks, `[data-r]` reveals,
  magnetic buttons, card spotlight/tilt, nav progress, page curtain, parallax,
  count-up, and text scramble. Respect `prefers-reduced-motion`; do not leave content
  permanently hidden.
- **Surfaces:** reproduce latest-main surfaces, including hairlines, glass nav/cards,
  glows, gradient borders, rounded cards, and the product window. Do not replace them
  with a flatter “cleaned up” version.

## 5. Content and implementation guardrails

These guardrails protect truthfulness and correctness; they do not ban latest-main UI.

- Do not invent testimonials, customer logos, metrics, certifications, team members,
  addresses, or “live” data. Preserve existing copy and flag unverified claims.
- Do not present simulated form submissions, random data, or sample status bars as
  live production behavior. Use static sample data or label it clearly.
- Do not add unrelated visual elements, duplicate sections, or stacked controls while
  importing main-branch UI. Resolve overlaps and broken layouts instead of hiding them.
- When a main-branch effect depends on JavaScript, provide a safe reduced-motion and
  no-permanent-hidden fallback.

## 6. Content preservation rules

- Preserve all headings, paragraphs, navigation labels, CTAs, pricing, docs, journal,
  about, careers, trust, legal, and 404 copy. Do not rewrite marketing copy or change
  meaning, tone, or claims.
- Minimal corrections only: obvious typos, stray separators, inconsistent punctuation.
- Preserve the page inventory and routes. Do not delete pages or sections.
- Preserve SEO metadata, JSON-LD, and the existing heading hierarchy.
- Preserve form fields and validation behavior. A simulated success state is not a
  real submission.
- If content contains an unverifiable claim, report it in the final summary and ask
  before changing it. Do not silently rewrite copy to make it verifiable.

## 7. CSS architecture and coding conventions

- Organize styles as `app/styles/tokens.css`, `base.css`, `components.css`, and
  `pages.css`, imported by `app/globals.css`.
- Keep the existing short class names where they already describe the component
  (`.btn`, `.hero`, `.cd`, `.pc`); group new rules by component and comment sections.
- Use CSS variables for color, radius, spacing, and motion. No one-off hex values
  outside the token files unless reproducing a verified latest-main value.
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
- Contrast must meet WCAG AA in both themes. Do not hide content permanently behind
  JavaScript: main-branch reveal effects may start hidden but must resolve on load,
  intersection, or immediately under reduced motion.
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

1. Read `AGENTS.md` and `DESIGN.md` first. Then inspect latest `origin/main` and the
   actual app files before proposing or making changes.
2. Do not create, rename, switch, or delete branches. Work on the current branch.
3. Do not install dependencies or skills without checking requirements and
   compatibility, and without explicit approval.
4. Installed skills are local-only and git-ignored. Check availability before use;
   never pretend a skill is installed or invent its capabilities.
5. Priority skills for design/frontend work: `design-taste-frontend` (Taste Skill),
   `design-slop`, `ui-ux`, `frontend-craft`, and `web-design-guidelines`. Read the
   relevant `SKILL.md` before applying it. Generic skill defaults and brand
   preferences must not override the latest-main conflict rule in section 0.
6. Do not edit `.agents/` or `skills-lock.json`; do not commit them.
7. Import latest-main UI without asking. Ask before inventing new copy, claims, logo
   changes, or page inventory changes. Keep changes scoped; no drive-by redesigns.
8. Update `AGENTS.md` and `DESIGN.md` when implementation decisions materially
   change. Keep the two files complementary, not duplicated.
9. Verify with a real build and a real browser. Report what was verified, what was
   not, and what remains.

## 11. Deployment target

The live site is `https://bryndottech.github.io/BRYN_WEB/`, served by the same
GitHub repository as this local checkout. Publishing uses the Next.js static
export from `.github/workflows/deploy-pages.yml`; Pages must be set to
**GitHub Actions** as the source. The workflow builds with `GITHUB_PAGES=true`
and `NEXT_PUBLIC_BASE_PATH=/BRYN_WEB`, then uploads `out/`. Local dev and the
default build remain root-relative.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

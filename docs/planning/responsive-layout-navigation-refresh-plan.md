# Responsive Layout and Navigation Refresh Plan

Status
- Primary: historical
- Secondary: snapshot
- Updated: 2026-05-12
- Current reference: docs/planning/responsive-layout-phase-4-content-modules-implementation-brief.md
- Note: Completed roadmap retained for traceability.


Purpose
- Define an implementation-ready plan for the next UI refresh on `main`.
- Focus on responsive navigation behavior, breakpoint strategy, and reusable content layout patterns.

Current baseline (as of 2026-03-05)
- Header markup is in `src/_includes/header.html`.
- Navigation behavior is in `src/_assets/scripts/header-nav.js`.
- Navigation styling is in `src/_assets/CSS/header-nav.css`.
- Current header is sticky (`.mus-nav--sticky`) with hamburger behavior and partial dropdown styles.
- In hamburger mode, parent items expose child links with accordion expand/collapse behavior.

Implementation status (as of 2026-03-07)
- Phase 1 (foundation): complete.
- Phase 2 (header scroll behavior): complete.
- Phase 3 (desktop dropdown + compact disclosures + refinements): complete.
- Phase 4 (content modules): complete baseline implementation + final QA/documentation pass complete.

Phase 3 completion summary (as of 2026-03-06)
- Delivered baseline desktop dropdown and compact disclosure behavior parity.
- Delivered nav/brand legibility refinements (wordmark balance, top-level delineation, parent/toggle affordance cleanup).
- Delivered compact tray geometry refactor to right-edge drawer behavior in hamburger-visible states.
- Delivered dropdown toggle icon refactor with triangle icon treatment and clearer open-state signal.
- Intentionally preserved:
  - Phase 2 hide/reveal scroll contract
  - Phase 3 desktop dropdown interaction model
  - compact accordion/disclosure behavior
- Explicitly deferred:
  - nav architecture rewrite
  - CMS rendering/model overhaul
  - parent-level route composition redesign beyond the Phase 4 primitive/module system

Phase 4 completion summary (as of 2026-03-07)
- Delivered structural layout primitives: `.l-page-shell`, `.l-section-shell`, `.l-module-stack`.
- Delivered responsive grid wrappers: `.l-grid`, `.l-grid--2`, `.l-grid--3` with `768/992/1200` breakpoint behavior.
- Delivered reusable rail module + snap enhancement: `.module-rail`, `.module-rail--snap`.
- Delivered stacked-card baseline + additive modifiers aligned to `.card` / `.card-impact`:
  - `.module-card-stack`
  - density: `.card--compact`, `.card--comfortable`, `.module-card-stack.is-compact`, `.module-card-stack.is-comfortable`
  - emphasis: `.card--featured`, `.card--standard`
- Final implementation-state documentation and usage guidance:
  - `docs/planning/responsive-layout-phase-4-content-modules-implementation-brief.md`
- Explicitly deferred:
  - broad parent-page redesign/composition rollout (`/about`, `/services`, `/blog`, `/contact`, related hubs)
  - additional module families outside the implemented Phase 4 set

## 1) Header interaction refresh: hide on scroll down, reveal on scroll up

Target behavior
- Keep header visible at page top.
- Hide header when user scrolls down past a threshold.
- Reveal header when user scrolls up.
- Keep header visible while keyboard focus is inside the nav.
- Disable animated movement for users with reduced-motion preferences.

Implementation notes
- Use class-based state on `[data-nav-root]`:
  - `.is-scrolled`: set after passing top threshold (for compact/header-shadow state).
  - `.is-hidden`: applied when scrolling down.
- Recommended CSS pattern:
  - `position: sticky; top: 0;`
  - `transform: translateY(-100%);` for hidden state
  - transition only on `transform` and `box-shadow` (avoid `transition: all`)
- Recommended JS logic (`header-nav.js`):
  - Use passive scroll listener + `requestAnimationFrame` loop guard.
  - Track `lastY`, `currentY`, and direction.
  - Add dead zone/hysteresis (for example `8-12px`) to avoid flicker.
  - Force reveal when:
    - `currentY <= topThreshold` (for example `<= 12px`)
    - nav contains `document.activeElement`
    - mobile menu is open

Accessibility and UX constraints
- Preserve visible focus rings for nav controls.
- Do not hide header while submenu is expanded.
- Honor `@media (prefers-reduced-motion: reduce)` by disabling transform animation.

## 2) Desktop and large-tablet horizontal nav with dropdowns

Target behavior
- At large tablet and desktop widths, render a horizontal top-level nav with grouped dropdown items.
- Dropdowns open on hover and keyboard focus for pointer/keyboard users.
- Dropdowns also support click toggle for touch and hybrid devices.

Markup architecture
- Keep semantic site navigation (`<nav><ul><li>`), not ARIA application menu roles.
- For parent items with children:
  - Use a button (`.mus-nav__dropdown-toggle`) adjacent to/combined with parent link.
  - Maintain `aria-expanded` and `aria-controls`.
- Use unique IDs for each submenu panel.

Interaction model
- Open triggers:
  - `mouseenter` / `focusin` / toggle button click
- Close triggers:
  - `mouseleave` with small delay
  - click outside nav
  - `Escape` key
  - focus leaving dropdown group
- Keep only one dropdown open at a time on desktop widths.

Breakpoint activation
- Keep hamburger nav for small/medium tablet.
- Switch to horizontal dropdown mode at a large-tablet breakpoint (recommended `min-width: 992px`).

Compact-mode accordion requirement (hamburger nav)
- In hamburger mode, parent items with children should be collapsed by default and expand/collapse vertically on toggle.
- Apply accordion behavior to narrow viewports (`<= 991px`) and compact-height cases where hamburger mode is active.
- Avoid hover-only behavior in compact mode; use explicit toggle/button state and `aria-expanded`.
- Keep parent links usable, with submenu expansion handled by a dedicated toggle control.
- Prefer one expanded submenu at a time in compact mode to reduce vertical menu sprawl.
- Include keyboard support (`Enter`/`Space` to toggle, `Escape` to collapse current submenu).

Post-cutover refinement criteria (new)
- Wordmark prominence:
  - Increase wordmark visual impact in the logo lockup so text presence is not diminished relative to the icon.
  - Rebalance logo/text scale, spacing, and line-height so the brand lockup reads clearly at all active nav breakpoints.
- Parent-item trigger model:
  - Re-evaluate split link/icon behavior for parent items with children.
  - Prefer a more intuitive single interaction model for submenu activation in desktop mode, or clearly separated interaction zones with stronger affordance if split controls are retained.
  - Avoid hover-open + icon-click-close friction states that feel contradictory.
- Top-level legibility and delineation:
  - Add clearer visual separation between top-level nav items (for example spacing rhythm, separators, grouped pills, or background/focus surfaces).
  - Improve scanability without reducing hit area or keyboard focus clarity.
- Compact-mode icon/link spacing (`<= 991px`, especially near `992px` transition):
  - Reduce excessive gap between parent link labels and submenu toggle icons in hamburger mode.
  - Use stable alignment rules so link text and toggle stay visually associated in medium-width compact layouts.
- Compact tray geometry in hamburger-visible states:
  - Replace full-width compact tray presentation with a narrower right-aligned tray anchored to the hamburger-side edge.
  - Apply this consistently anywhere hamburger mode is active (`<= 991px` and compact-height fallback states).
  - Keep this as a CSS-only presentation refactor; preserve markup, JS behavior contracts, and accessibility semantics.
- Dropdown toggle icon treatment:
  - Replace bulky circular compact toggle presentation with cleaner triangle icon treatment that remains legible across desktop and compact modes.
  - Keep parent links and toggle buttons as distinct controls while improving visual cohesion.
  - Preserve open/closed readability through icon state styling rather than heavy control chrome.

## 3) Breakpoint strategy (recommended ranges)

Core ranges
- Mobile: `0-767px`
- Tablet: `768-1023px`
- Desktop: `1024px+`

Operational breakpoints for this refresh
- `min-width: 768px`:
  - increase layout spacing and typography scale
  - enable 2-column content variants where appropriate
- `min-width: 992px`:
  - enable horizontal nav + dropdown interaction model
- `min-width: 1200px`:
  - enable wider multi-column content and denser card rail viewport
- `max-height: 700px` (compact-height guardrail):
  - keep navigation interaction compact and avoid exposing all nested links at once
  - if hamburger mode is active, use accordion submenu behavior to limit initial menu height

Notes
- These values align with the current request for desktop + large-tablet horizontal navigation.
- If analytics later show heavier traffic at specific device widths, fine-tune breakpoints around real viewport clusters.

## 4) Mobile-first vs desktop-first styling approach

Mobile-first
- Build default styles for narrow viewports and progressively enhance with `min-width` media queries.
- Benefits:
  - cleaner cascade for constrained layouts
  - typically less override churn
  - better performance discipline for low-end mobile
- Tradeoff:
  - desktop layout intent must be planned early to avoid late-stage complexity

Desktop-first
- Build large-layout defaults and override downward with `max-width` queries.
- Benefits:
  - fast for teams designing desktop IA first
  - can be simpler for fixed desktop compositions
- Tradeoff:
  - often creates heavy override layers on mobile
  - higher risk of specificity/cascade friction over time

Recommendation for this project
- Use mobile-first as the primary strategy.
- Reason: current branch already supports mixed mobile and CMS-driven templates, and the new nav/content behaviors are cleaner as progressive enhancements.

## 5) Content pattern exploration and usage guidance

### Multi-column layouts
Use when
- text + media sections need side-by-side hierarchy at medium and large widths.

Implementation
- CSS Grid with explicit column templates (`1fr` mobile, `repeat(2, minmax(0, 1fr))` tablet, optional 3-column desktop).
- Keep reading width constraints (`max-width`) for dense text blocks.

### Horizontal card carousels
Use when
- editorial modules need high item density in limited vertical space.

Implementation
- Prefer CSS overflow rails first; add JS controls only if necessary.
- Optional controls: previous/next buttons with disabled states and keyboard support.

### Scroll-snap card rails
Use when
- touch-first browsing should feel structured without heavy JS.

Implementation
- `display: grid` or flex row + `overflow-x: auto`.
- `scroll-snap-type: x mandatory` on container.
- `scroll-snap-align: start` on cards.
- Add `scroll-padding-inline` to align with container gutters.

### Stacked cards for narrow screens
Use when
- content hierarchy is more important than scan density on mobile.

Implementation
- default single-column stack on mobile.
- increase spacing rhythm and tap target sizes.
- promote one featured card per section to reduce cognitive load.

## SCSS reintroduction assessment (recovered source)

Decision
- Reintroduce SCSS as the authoring layer for structure and compile-time organization.
- Continue using CSS custom properties for runtime design tokens and theming.

Recovered file
- Source recovered from `main:CSS/styles.scss`.
- Restored path for current architecture: `src/_assets/CSS/styles.scss`.
- Recovery note is included at the top of the file to flag legacy sections pending migration.

Why SCSS is useful now
- Gives clean modularization for upcoming refresh phases (header state styles, dropdown states, content modules).
- Supports mixins and shared abstractions for repetitive patterns (for example card shadows and breakpoint helpers).
- Reduces cascade drift while converting from hamburger-first to width-gated navigation modes.

What remains relevant from recovered SCSS
- Palette and semantic token mappings as compile-time references.
- Existing `@mixin card-shadow` and card/module structure patterns.
- Baseline typography and spacing blocks that can be moved into shared partials.
- Existing grid/card utility direction for early content module scaffolding.

What is outdated or incompatible in current Eleventy setup
- Legacy `header { ... }` and nested selectors were built for pre-Eleventy markup, not current `.mus-nav` structure.
- No explicit breakpoint ladder aligned with `768 / 992 / 1200` refresh targets.
- Monolithic file structure (single stylesheet) is not ideal for phased rollout and component isolation.
- Current project lacks explicit SCSS compile scripts in `package.json` even though `sass` dependency is present.

Integration approach for this refresh
- Keep output target as `src/_assets/CSS/styles.css` so current template links remain unchanged.
- Use SCSS for source organization only; do not replace runtime custom properties with hardcoded compiled color values.
- Start by mirroring current CSS in SCSS modules, then migrate nav/layout phases incrementally to avoid regressions.
- Add minimal build commands when implementation starts:
  - build: `sass src/_assets/CSS/styles.scss src/_assets/CSS/styles.css --no-source-map`
  - watch: `sass --watch src/_assets/CSS/styles.scss:src/_assets/CSS/styles.css`

## 6) Proposed implementation sequence

Phase 1: Foundation
- Establish SCSS authoring baseline:
  - keep recovered `src/_assets/CSS/styles.scss` as source-of-edit
  - split into partials (`_tokens.scss`, `_base.scss`, `_layout.scss`, `_components.scss`, `_nav.scss`) as edits begin
  - keep CSS custom properties in `:root` for runtime token usage
- Add/verify minimal SCSS build scripts in `package.json` (build + watch) before broad CSS edits.
- Refactor `header-nav.css` transitions to target properties only.
- Add nav state classes and reduced-motion branch.

Phase 2: Header scroll behavior
- Extend `header-nav.js` with direction-aware hide/reveal logic.
- Add hysteresis and focus/menu-open safeguards.

Phase 3: Navigation interaction parity across viewport modes (implemented baseline)
- Desktop/large-tablet (`min-width: 992px`):
  - update `header.html` structure for top-level items + child panels
  - keep ARIA/state wiring in JS and width-gated dropdown interaction logic
- Hamburger/compact mode (`<= 991px` and compact-height hamburger cases):
  - implement accordion submenu behavior for parent items with children
  - keep child lists collapsed by default, expanded by explicit toggle state
  - preserve parent-link usability and keyboard support in expanded/collapsed states

Phase 3 follow-up: Nav/brand legibility refinements (completed)
- Increased header wordmark prominence and rebalanced icon/text lockup sizing.
- Improved split-control affordance so parent links and toggles read as a clearer control cluster.
- Added stronger top-level nav delineation for desktop/large-tablet scanability.
- Tightened compact-mode link/toggle spacing just below desktop breakpoint.

Phase 3 follow-up: Compact tray geometry + toggle icon refactor (completed)
- Converted compact/hamburger tray from full-width strip into right-edge drawer behavior in hamburger-visible states.
- Preserved compact disclosure/accordion behavior and parent-link usability.
- Refined row highlight/association treatment for parent link + toggle controls.
- Replaced the prior bulky circular toggle treatment with triangle-icon-driven state styling.
- Guardrails preserved in implementation:
  - no nav logic rewrite in `header-nav.js`
  - no semantic navigation structure rewrite in `header.html`
  - no Phase 4 content-module work in this pass

Phase 4: Content modules (implemented baseline; complete)
- Final implementation-state artifact:
  - `docs/planning/responsive-layout-phase-4-content-modules-implementation-brief.md`
- Implemented Phase 4 scope anchors
  - `src/_assets/CSS/_layout.scss`: shell, stack, and responsive 1/2/3-column grid primitives.
  - `src/_assets/CSS/_components.scss`: rail/snap module, stacked-card wrapper, density/emphasis card modifiers.
- Phase 4 QA/documentation outcomes
  - Verified overflow behavior, breakpoint consistency, and baseline rail/card accessibility constraints.
  - Documented final class vocabulary and usage examples for future page adoption work.
- Explicit deferment remains
  - Parent-level route layout expansion (`/about`, `/services`, `/blog`, `/contact`, and related hubs) remains deferred to a later refresh.
  - Phase 4 defines and validates the reusable system; broader page-level adoption follows later.
Phase 5: QA and hardening
- Keyboard-only navigation checks (Tab, Shift+Tab, Escape).
- Touch + mouse parity checks for dropdown behavior.
- Cross-breakpoint verification (`<=767`, `768-991`, `992-1199`, `1200+`).
- Performance check: avoid layout thrash in scroll handler.

## 7) Acceptance criteria for this refresh

- Header reliably hides on downward scroll and reveals on upward scroll with no jitter.
- Header remains accessible and visible during keyboard interaction.
- Horizontal dropdown nav is active and stable at `>=992px`.
- Mobile/tablet retain clear, predictable navigation with touch-friendly controls.
- In hamburger/compact mode, parent items with children expand/collapse as accordions instead of rendering all child links at once.
- Header brand lockup has clear wordmark impact (text no longer reads undersized next to logo icon).
- Parent-item submenu behavior does not produce hover-open / click-close confusion.
- Top-level nav items are visually delineated enough for quick scan at desktop and large-tablet widths.
- Compact tray renders as a narrow right-aligned panel (not full-width) in all hamburger-visible states.
- Compact-mode parent links and submenu toggles remain visually grouped as a tight pair near the `992px` transition band.
- Dropdown toggle icon treatment is legible and cohesive in both desktop dropdown and compact drawer states.
- Content modules gracefully shift among stacked, rail, and multi-column patterns by breakpoint.
- No critical accessibility regressions in nav semantics, focus order, or screen-reader labels.

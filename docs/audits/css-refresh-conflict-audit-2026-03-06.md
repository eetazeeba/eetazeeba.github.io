# CSS Conflict Audit - 2026-03-06

Source of truth
- Planning reference: `docs/responsive-layout-navigation-refresh-plan.md`
- This audit supersedes `docs/audits/archive/css-refresh-conflict-audit-2026-03-05.md`.
- Audit mode: review and documentation only (no implementation changes).

Scope reviewed
- `src/_assets/CSS/_nav.scss`
- `src/_assets/CSS/header-nav.scss`
- `src/_assets/CSS/header-nav.css`
- `src/_assets/CSS/styles.scss`
- `src/_assets/CSS/_tokens.scss`
- `src/_assets/CSS/_base.scss`
- `src/_assets/CSS/_layout.scss`
- `src/_assets/CSS/_components.scss`
- `src/_assets/CSS/styles.css`
- `src/_assets/scripts/header-nav.js`
- `src/_includes/header.html`
- `src/_includes/layouts/base.njk`
- `package.json` (SCSS build integration risk check)

## Highest-risk remaining conflicts
1. Split parent-link/icon trigger behavior remains unintuitive in desktop mode (hover can open, icon click can immediately close).
2. Compact-mode link/toggle spacing still uses `space-between`, matching the reported visual separation issue near `992px`.
3. Top-level desktop nav item delineation is still weak for scanability (minimal gap, no explicit separators/grouping surfaces).
4. Wordmark/logo balance still trends toward low wordmark impact relative to the icon.

## Phase 1: Foundation (residual risks)

### P1-01 SCSS output can drift from source during normal build flow
- File path: `package.json`
- Selector/rule: `build` runs Eleventy only (line 8), while SCSS compile is separate in `build:css` (line 9)
- Why this is a conflict/risk: `npm run build` can deploy stale compiled CSS if `build:css` was not run first.
- Severity: medium
- Recommended action: refactor

### P1-02 Legacy header-era selectors still present in active stylesheet layer
- File path: `src/_assets/CSS/_layout.scss`
- Selector/rule: `.header-brand`, `.header-logo`, `.wordmark`, `.header-container` (lines 21-44)
- Why this is a conflict/risk: not immediate breakage, but it increases cascade ambiguity while nav/brand refinements are pending.
- Severity: low
- Recommended action: defer

### P1-03 Broad nav typography selector may mask future delineation refinements
- File path: `src/_assets/CSS/_nav.scss`
- Selector/rule: `.mus-nav a, .mus-nav button` (lines 63-66)
- Why this is a conflict/risk: parent links and toggle buttons likely need differentiated visual hierarchy in follow-up work.
- Severity: low
- Recommended action: isolate

## Phase 2: Header scroll behavior (stability risks)

### P2-01 Header visibility contract depends on cross-file class synchronization
- File path: `src/_assets/scripts/header-nav.js`, `src/_assets/CSS/_nav.scss`
- Selector/rule: JS `has-dropdown-open` / `is-open` guards (JS lines 23-27, 146) and CSS visibility guards (CSS lines 22-24)
- Why this is a conflict/risk: current behavior is correct, but Phase 3 trigger-model updates can regress hide-on-scroll if this contract is broken.
- Severity: medium
- Recommended action: isolate

## Phase 3: Desktop/large-tablet dropdown + compact-mode follow-up

### P3-01 Hover-open + icon-click toggle remains contradictory
- File path: `src/_assets/scripts/header-nav.js`, `src/_includes/header.html`
- Selector/rule: desktop opens on `mouseenter`/`focusin` (JS lines 217-229), toggle click closes if already open (JS lines 202-214), split controls in markup (header lines 27-36)
- Why this is a conflict/risk: submenu can close when icon is clicked right after hover-open, which feels unintuitive.
- Severity: high
- Recommended action: refactor

### P3-02 Compact-mode link/toggle separation is still excessive
- File path: `src/_assets/CSS/_nav.scss`
- Selector/rule: `.mus-nav__item-row { justify-content: space-between; gap: 0.35rem; }` (lines 126-130, 301-304)
- Why this is a conflict/risk: produces large visual separation between parent label and icon in hamburger/compact layouts, especially near `992px`.
- Severity: high
- Recommended action: refactor

### P3-03 Wordmark emphasis remains low versus logo icon
- File path: `src/_assets/CSS/_nav.scss`
- Selector/rule: `.mus-nav__logo` width clamp (lines 50-54) versus `.mus-nav__wordmark` font-size clamp (lines 56-61)
- Why this is a conflict/risk: conflicts with the refresh-plan requirement to increase wordmark prominence.
- Severity: medium
- Recommended action: refactor

### P3-04 Top-level desktop item delineation remains minimal
- File path: `src/_assets/CSS/_nav.scss`
- Selector/rule: desktop list gap `0.2rem` and basic link background-only affordance (lines 230-233, 245-249)
- Why this is a conflict/risk: scanability/readability target is not yet met at large tablet and desktop widths.
- Severity: medium
- Recommended action: refactor

### P3-05 Open-state affordance is mostly icon rotation
- File path: `src/_assets/CSS/_nav.scss`
- Selector/rule: `.is-open` primarily rotates `.mus-nav__dropdown-icon` (line 189)
- Why this is a conflict/risk: open/closed state is visually subtle when combined with split controls.
- Severity: medium
- Recommended action: refactor

## Optional: Later-phase layout/content issues (Phase 4 readiness)

### P4-01 Content modules are not yet breakpoint-structured for planned patterns
- File path: `src/_assets/CSS/_layout.scss`, `src/_assets/CSS/_components.scss`
- Selector/rule: no module-specific media-query ladder for multi-column/rail/snap patterns
- Why this is a conflict/risk: Phase 4 expects explicit stacked/rail/multi-column behavior by breakpoint.
- Severity: medium
- Recommended action: defer

### P4-02 Main container width may constrain future rails/grids
- File path: `src/_assets/CSS/_layout.scss`
- Selector/rule: `main { max-width: 900px; }` (line 57)
- Why this is a conflict/risk: may cap card-rail and wider desktop content module experiments before Phase 4 work begins.
- Severity: low
- Recommended action: defer

## First changes to make before the next implementation pass
1. Resolve desktop parent-trigger contract first (remove hover-open/click-close contradiction while preserving keyboard access).
2. Fix compact-mode parent row spacing (`<= 991px` and compact-height branch) so link and toggle remain visually grouped.
3. Rebalance lockup scale between `.mus-nav__logo` and `.mus-nav__wordmark` to restore brand text impact.
4. Add clearer top-level desktop nav delineation that improves scanability without reducing hit area or focus visibility.
5. Preserve and regression-test the Phase 2 visibility contract (`is-open`/`has-dropdown-open` versus `is-hidden`) during all Phase 3 follow-up changes.

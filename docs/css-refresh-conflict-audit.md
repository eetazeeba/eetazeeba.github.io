# CSS Audit: Responsive Layout + Navigation Refresh

Source of truth
- Planning reference: `docs/responsive-layout-navigation-refresh-plan.md`
- Prioritization applied from `## 6) Proposed implementation sequence` (Phase 1 -> Phase 3 first).

Scope reviewed
- `src/_assets/CSS/header-nav.css`
- `src/_assets/CSS/styles.css`
- CSS load order confirmed in `src/_includes/layouts/base.njk` (`styles.css` first, then `header-nav.css`).

## Highest-risk conflicts (summary)
- `transition: all` on header/nav elements directly conflicts with Phase 1 guidance to transition only targeted properties.
- Current nav CSS is structurally hamburger-first, while Phase 3 requires width-gated desktop/large-tablet horizontal dropdown behavior at `>= 992px`.
- Dropdown visibility is currently driven by hover/focus selectors globally, which can conflict with upcoming JS state management (`aria-expanded`, single-open behavior, width gating).
- Existing breakpoint strategy (`max-width: 720px`) does not align with planned operational breakpoints (`768`, `992`, `1200`) and mobile-first direction.

## Phase 1: Foundation (highest priority)

### 1) Global `transition: all` on nav components
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule: `.mus-nav, .mus-nav__submenu, .mus-nav__menu { transition: all 160ms ease; }` (lines 201-205)
- Why it conflicts:
  - Plan requires targeted transitions (`transform`, `box-shadow`) and explicitly avoids `transition: all`.
  - `all` risks animating layout-affecting properties during state changes, increasing jank risk.
- Severity: high
- Recommended action: refactor

### 2) Missing reduced-motion branch for header movement states
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule: only `@media (prefers-reduced-motion: no-preference)` exists (line 201), no explicit reduce branch
- Why it conflicts:
  - Plan requires reduced-motion handling for hide/reveal header behavior.
  - Foundation phase calls out reduced-motion support early.
- Severity: medium
- Recommended action: refactor

### 3) Focus-visible outline removal on key nav controls
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule:
  - `.mus-nav__list > li > a:focus-visible`
  - `.mus-nav__dropdown-toggle:focus-visible`
  - both set `outline: none` (lines 142-148)
- Why it conflicts:
  - Plan requires preserving visible focus indicators.
  - Removing outlines creates accessibility regressions before behavior changes begin.
- Severity: high
- Recommended action: refactor

### 4) Broad descendant styling increases side-effect risk during refactor
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule: `.mus-nav a, .mus-nav button` (lines 46-50)
- Why it conflicts:
  - This broad rule can unintentionally style future controls added during nav redesign (dropdown buttons, utility actions, etc.).
  - Raises maintenance cost in early refactor phases.
- Severity: medium
- Recommended action: isolate

## Phase 2: Header scroll behavior

### 1) No state classes/styles for scroll-driven header states
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule: no `.is-scrolled` / `.is-hidden` rules on `.mus-nav`
- Why it conflicts:
  - Plan calls for state-driven header behavior (`.is-scrolled`, `.is-hidden`) with transform-based reveal/hide.
  - Absent state scaffolding delays Phase 2 implementation.
- Severity: medium
- Recommended action: refactor

### 2) Sticky header implementation is static and not prepared for transform-state composition
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule: `.mus-nav--sticky { position: sticky; top: 0; }` (lines 10-13)
- Why it conflicts:
  - Sticky base is correct, but no paired transform/transition state model is in place for hide/reveal.
  - Combined with `transition: all`, this can cause unstable motion behavior once classes are introduced.
- Severity: medium
- Recommended action: refactor

### 3) Hamburger-open state may need precedence over hide-on-scroll, but CSS has no guardrails
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule: `.mus-nav--hamburger.is-open .mus-nav__menu { display: flex; }` (lines 107-109)
- Why it conflicts:
  - Plan requires forced header visibility while mobile menu is open.
  - Current CSS has no state composition rule (for example, preventing hidden transform when open).
- Severity: medium
- Recommended action: isolate

## Phase 3: Desktop/large-tablet dropdown nav (>= 992px)

### 1) Existing nav model is hamburger-primary and tightly coupled
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule:
  - root class usage assumes `.mus-nav--hamburger` behavior (lines 103-109)
  - `.mus-nav__menu` defaults to hidden vertical list (lines 87-95)
- Why it conflicts:
  - Planned behavior requires width-gated switch to horizontal dropdown nav at `>= 992px`.
  - Current defaults bias strongly to mobile menu behavior.
- Severity: high
- Recommended action: refactor

### 2) Breakpoint strategy does not align with planned ranges
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule: `@media (max-width: 720px)` (lines 187-199)
- Why it conflicts:
  - Plan specifies operational breakpoints at `768`, `992`, `1200` with mobile-first `min-width` progression.
  - `max-width: 720px` creates a conflicting breakpoint system and leaves 721-991 behavior underspecified.
- Severity: high
- Recommended action: refactor

### 3) Dropdown visibility is globally hover/focus-driven, not width-gated state-driven
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule:
  - `.mus-nav__item--dropdown:hover .mus-nav__submenu`
  - `.mus-nav__item--dropdown:focus-within .mus-nav__submenu`
  - `.mus-nav__item--dropdown.is-open .mus-nav__submenu` (lines 181-184)
- Why it conflicts:
  - Plan requires desktop/large-tablet dropdown behavior with explicit JS state wiring and one-open-at-a-time logic.
  - Unscoped hover/focus rules can fight JS-driven open/close states and appear on widths where dropdowns should be inactive.
- Severity: high
- Recommended action: isolate

### 4) Desktop dropdown styles exist but are partially orphaned from active markup/state model
- File path: `src/_assets/CSS/header-nav.css`
- Selector/rule:
  - `.mus-nav__desktop`, `.mus-nav__list`, `.mus-nav__submenu` blocks (lines 112-185)
  - current rendered header uses `.mus-nav__menu` flat links in `src/_includes/header.html`
- Why it conflicts:
  - CSS assumes a list-based dropdown structure that is not currently active in markup.
  - Increases risk of mixed paradigms during Phase 3 unless isolated and activated by a clear mode class/breakpoint.
- Severity: medium
- Recommended action: isolate

## Optional: Later-phase layout/content issues (secondary)

### 1) Content layout is largely single-range with no planned breakpoint ladder
- File path: `src/_assets/CSS/styles.css`
- Selector/rule:
  - no responsive media query system in file
  - `main { max-width: 900px; }` (line 59)
  - `.grid { grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }` (line 68)
- Why it conflicts:
  - Plan Phase 4 expects predictable breakpoint-driven module shifts (stacked -> rail -> multi-column).
  - Current styles are not yet structured around `768/992/1200` progression.
- Severity: medium
- Recommended action: defer

### 2) Legacy header-related selectors in `styles.css` appear unused in current templates
- File path: `src/_assets/CSS/styles.css`
- Selector/rule: `.header-container`, `.header-content`, `.header-brand`, `.header-logo`, `.wordmark`, `.logo-img` (lines 48-55)
- Why it conflicts:
  - Not immediate blockers, but they add ambiguity while nav/header refactor proceeds.
  - Can cause maintenance confusion during Phase 1-3 implementation.
- Severity: low
- Recommended action: defer (or remove once verified dead)

## First changes to make (before implementation starts)

1. Refactor nav transitions in `header-nav.css` to remove `transition: all` and limit motion to `transform` + `box-shadow`.
2. Add explicit nav state scaffolding for `.is-scrolled` and `.is-hidden`, plus a `prefers-reduced-motion: reduce` branch.
3. Replace/adjust focus-visible rules so keyboard focus indicators remain visible (remove `outline: none` on nav interactive states).
4. Introduce breakpoint-aligned, mobile-first nav mode gates:
   - base mobile behavior by default
   - desktop/large-tablet dropdown activation at `min-width: 992px`
5. Scope dropdown open rules to the desktop nav mode and JS state classes/attributes to avoid hover-only conflicts.
6. Isolate hamburger-only rules so they do not leak into the desktop dropdown mode during Phase 3 rollout.

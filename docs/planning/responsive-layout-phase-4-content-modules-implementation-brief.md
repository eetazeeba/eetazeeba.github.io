# Responsive Layout Phase 4 Content Modules Implementation Brief

Status
- Parent roadmap: `docs/planning/responsive-layout-navigation-refresh-plan.md` (Phase 4)
- Brief status: implementation state documentation
- Last updated: 2026-04-18
- Implementation state: complete baseline for Phase 4 system primitives/modules

## 1) Scope and outcome

What Phase 4 delivered
- Established reusable, mobile-first layout/module primitives for shells, stacks, grids, rails, and card modifiers.
- Standardized a shared class vocabulary so future parent-page work can compose existing patterns instead of inventing route-specific CSS.
- Preserved CMS rendering contracts and existing navigation behavior.

What Phase 4 did not deliver
- Parent-page redesign and broad route-level composition rollout (`/about`, `/services`, `/blog`, `/contact`, etc.).
- New CMS models/render contracts, JS carousel controls, or navigation rewrites.

## 2) Final class vocabulary (implemented)

### Layout primitives (`_layout.scss`)
- `.l-page-shell`: page-level max-width + responsive inline gutters.
- `.l-section-shell`: section-level max-width + responsive inline gutters.
- `.l-module-stack`: vertical module rhythm wrapper.
- `.l-grid`: base 1-column grid wrapper.
- `.l-grid--2`: 1-column default, upgrades to 2 columns at `>=768px`.
- `.l-grid--3`: 1-column default, upgrades to 2 columns at `>=768px`, 3 columns at `>=992px`; an odd trailing item spans the temporary 2-column row at `768-991px` to avoid dead grid pockets.

### Module/container classes (`_components.scss`)
- `.module-rail`: horizontal overflow rail with card-width clamps and gap rhythm.
- `.module-rail--snap`: additive scroll-snap modifier for `.module-rail`.
- `.module-card-stack`: stacked-card container wrapper for controlled vertical card rhythm.

### Card foundations and additive modifiers (`_components.scss`)
- `.card`: standard card foundation.
- `.card-impact`: high-emphasis card foundation.
- `.card--compact`: per-card density modifier (reduced padding/rhythm).
- `.card--comfortable`: per-card density modifier (increased padding/rhythm).
- `.card--featured`: per-card emphasis modifier (border/shadow/marker + stronger title scale).
- `.card--standard`: explicit reset to baseline emphasis.
- `.module-card-stack.is-compact`: stack-level compact rhythm modifier.
- `.module-card-stack.is-comfortable`: stack-level comfortable rhythm modifier.

Naming notes and deviations from early planning
- `module-*` naming was retained for rail and stack containers.
- Card density/emphasis landed as additive `card--*` modifiers plus optional stack state hooks (`is-compact`, `is-comfortable`) to minimize markup churn.
- Legacy `.grid` remains available for compatibility, but new Phase 4 work should prefer `l-grid*` wrappers.

## 3) Responsibility boundaries

`src/_assets/CSS/_layout.scss`
- Owns structural geometry and responsive composition primitives:
  - shells/gutters/max-width behavior
  - stack rhythm wrappers
  - 1/2/3-column grid behavior by breakpoint
  - overflow-safety basics for structural children (`min-width: 0` safeguards)

`src/_assets/CSS/_components.scss`
- Owns reusable module behavior and card presentation patterns:
  - rail overflow/snap behavior
  - stacked-card wrapper behavior
  - card density/emphasis modifiers layered onto `.card`/`.card-impact`

`.card` / `.card-impact` alignment
- `.card` and `.card-impact` remain the primary card foundations.
- Phase 4 modifiers are additive; they do not fork separate card families.

Explicitly deferred
- Parent-level route composition redesign is deferred to later refresh work.
- Future page adoption should compose this vocabulary instead of introducing one-off layout systems.

## 4) Usage guidance (implementation-ready examples)

### Shell + stack composition
```html
<div class="l-page-shell l-module-stack">
  <section class="card">...</section>
  <section class="card-impact">...</section>
</div>
```

### Grid wrappers
```html
<section class="l-grid--2">
  <article class="card">...</article>
  <article class="card">...</article>
</section>

<section class="l-grid--3">
  <article class="card">...</article>
  <article class="card">...</article>
  <article class="card">...</article>
</section>
```

### Rail + snap usage
```html
<div class="module-rail module-rail--snap" aria-label="Browse items">
  <article class="card">...</article>
  <article class="card">...</article>
  <article class="card">...</article>
</div>
```

### Stacked-card defaults + density/emphasis
```html
<div class="module-card-stack is-comfortable">
  <article class="card card--featured">...</article>
  <article class="card card--standard">...</article>
  <article class="card-impact card--compact">...</article>
</div>
```

Implementation notes
- Keep DOM order equal to reading order.
- Use density/emphasis as additive visual rhythm/priority controls, not semantic substitutes.
- Prefer CSS-first rail behavior; do not introduce JS controls unless required by later scope.

## 5) Breakpoint behavior (implemented)

Narrow (`0-767px`)
- Shells and grids default to single-column flow.
- Stacks and cards prioritize readable spacing and touch comfort.
- Rails remain horizontally scrollable at container level.

Medium (`768-991px`)
- `l-grid--2` and `l-grid--3` activate 2-column composition.
- `l-grid--3` balances odd trailing items across both columns in this temporary 2-column state.
- Gutters and stack/grid gaps increase progressively.

Wide (`992-1199px`)
- `l-grid--3` activates 3-column composition.
- Rail card clamps continue to prioritize readable card measure.

Extra-wide (`1200px+`)
- Shell inline gutters and stack/grid gaps increase again.
- 3-column/grid and rail rhythm remain constrained for readability.

## 6) QA findings summary (final pass)

What was checked
- Narrow/mobile overflow and readability on representative routes and `/about/`.
- Breakpoint activation for shell/stack/grid (`375`, `500`, `768`, `992`, `1200`).
- Rail-local overflow vs page-level overflow.
- Rail keyboard focus reachability behavior via temporary injected focusables.
- Rail wheel/trackpad-style horizontal scroll behavior.
- Card modifier behavior (`compact`, `comfortable`, `featured`, `standard`).
- DOM order and visual order consistency.

Results
- No page-level horizontal overflow detected on representative routes (`/`, `/about/`, `/services/`, `/blog/`, `/contact/`) at tested breakpoints.
- Grid wrappers activate as expected:
  - `l-grid--2`: 1 column narrow, 2 columns at `>=768px`.
  - `l-grid--3`: 1 column narrow, 2 columns at `>=768px`, 3 columns at `>=992px`.
- Rail overflow remains local to `.module-rail`; page containers remain stable.
- Keyboard focus can scroll rail content into view when focusable controls are present.
- Horizontal wheel-delta scrolling changes rail position as expected in desktop viewport checks.
- Density/emphasis modifiers produce distinct, additive visual changes while preserving readable line-height.
- No corrective code changes were required in the original Phase 4 final pass; the later FB-003 grid refinement is recorded below.

Known constraints for future page adoption
- Current `/about/` rail preview cards are intentionally inert; when real links/buttons are introduced, keep them inside the existing rail/card contract.
- Avoid adding global overflow clipping (`html/body overflow-x hidden`) as a substitute for container-level width fixes.

FB-003 follow-up (`2026-04-18`)
- Grid audit confirmed the reported About dead-space pocket came from the shared `l-grid--3` medium breakpoint, not an About-only composition failure.
- The shared `l-grid--3` rule now lets an odd trailing item span the temporary 2-column row at `768-991px`.
- Future 3-up card groups should use this shared primitive before adding page-specific last-card span helpers.

## 7) Deferred items after Phase 4

Still deferred by design
- Parent-level page composition rollout using these primitives (`about`, `services`, `blog`, `contact`, related hubs).
- Split-layout helper family and any additional module families not already implemented.
- JS carousel controls/pagination.
- Final IA/content strategy work for child-route wiring.

## 8) Final implementation status

Phase 4 status
- Effectively complete for reusable structural/module primitives and implementation-state documentation.

Definition of done met in this pass
- Final vocabulary documented.
- Boundaries between layout and components clarified.
- Usage examples provided.
- QA findings recorded with explicit deferments.

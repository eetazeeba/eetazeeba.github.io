# Deferred Polish Feedback Log

Purpose
- Track deferred visual/UX polish issues for future patches without mixing them into active implementation phase plans.

Priority legend
- `P0` = critical
- `P1` = high
- `P2` = medium-high
- `P3` = medium
- `P4` = low/joke

Status legend
- `new | triaged | planned | in-progress | done | wontfix`

ID rules
- Use backlog IDs in the format `FB-###` (example: `FB-001`).
- Keep `Priority` as a separate field (`P0/P1/P3/P4`).
- Do not use phase task IDs (example: `P1-01`) in this file.

## Active backlog

### FB-001 - Compact drawer parent/toggle target-size refinement
- Priority: `P1`
- Status: `new`
- Area: `nav, compact-drawer, dropdown-toggle`
- Reported: `2026-03-07`
- Source: `user testing feedback`
- Related phase: `Phase 3 follow-up polish backlog`
- Files likely impacted:
  - `src/_assets/CSS/_nav.scss`
  - `src/_assets/CSS/header-nav.css`
- Problem statement:
  - In compact drawer mode, users can click in the gap between parent label and toggle icon and unintentionally navigate to the parent page.
- Repro steps:
  1. Open compact drawer menu in a hamburger-visible state.
  2. Click the space between a parent label and its dropdown toggle icon.
  3. Observe parent-page navigation when submenu intent was expected.
- User impact:
  - Target separation feels unnatural and increases accidental navigation.
- Proposed direction:
  - Tighten visual and hit-area grouping between parent label and toggle.
  - Increase toggle target size where needed while preserving separate controls.
  - Keep compact disclosure behavior unchanged.
- Acceptance criteria:
  1. The gap between label and toggle no longer feels like an accidental navigation trap.
  2. Parent link and toggle remain distinct, keyboard-focusable controls.
  3. No regressions in compact accordion behavior or desktop dropdown behavior.
- Notes:
  - Planning-only item for a future polish pass; no behavior rewrite.

### FB-003 - Grid dead-space handling in uneven content cells
- Priority: `P2`
- Status: `triaged`
- Area: `about, phase-4-layout, grid-composition`
- Reported: `2026-03-07`
- Source: `user screenshot feedback`
- Related phase: `Phase 4 content-module refinement`
- Files likely impacted:
  - `src/_assets/CSS/_layout.scss`
  - `src/_assets/CSS/_components.scss`
  - `src/about/index.njk`
- Evidence (screenshots):
  - `docs/issues/screenshots/FB-003-01-grid-dead-space.png`
- Problem statement:
  - Some grid compositions can leave visually dead/empty space when adjacent cells have uneven content height.
- Screenshot-derived symptoms:
  - A cell leaves a noticeable gap that reads unfinished in the current composition.
  - Nearby content has enough visual weight to potentially absorb/fill the gap.
- Repro steps:
  1. Open the affected About grid section shown in `FB-003-01-grid-dead-space.png`.
  2. Compare neighboring card heights in the same grid row.
  3. Observe dead space that breaks visual continuity.
- User impact:
  - The page can feel less intentional/polished where empty grid pockets appear.
- Proposed direction:
  - Add an explicit strategy for dead-space handling in reusable grid modules:
  - option A: fill with a decorative/supporting asset block.
  - option B: allow controlled overflow/span from adjacent content cell where appropriate.
  - Keep behavior reusable and not one-off to `/about/`.
- Acceptance criteria:
  1. Dead-space handling rule is defined and reusable.
  2. Affected grid section no longer shows an obvious empty pocket.
  3. Mobile reading order remains linear and accessible.
  4. No regressions in existing grid/rail behavior.
- Notes:
  - Priority requested as `P2/3`; tracked as `P2` under current legend.
  - Update `2026-03-11`: a same-day `services` layout fix widened the large-screen shell and removed dense three-column card internals, which improved readability in the immediate failing sections.
  - That fix also re-surfaced the broader "progressive bleed" concern at larger resolutions, where extra horizontal room can make uneven adjacent modules and trailing dead-space pockets more noticeable again.
  - Follow-up should treat this as a reusable composition problem, not a `services`-only bug:
    - review how wider shells interact with uneven card stacks
    - define when cards should rebalance, span, or collapse to fewer columns
    - verify that any dead-space mitigation does not reintroduce narrow-copy columns or overflow regressions

### FB-004 - Rail navigation affordance and optional position pips
- Priority: `P3`
- Status: `planned`
- Area: `module-rail, module-card-stack, interaction-polish`
- Reported: `2026-03-12`
- Source: `user UX feedback`
- Related phase: `Phase 4 content-module refinement`
- Files likely impacted:
  - `src/_assets/CSS/_components.scss`
  - `src/_assets/scripts/rail-affordances.js`
  - `src/_includes/layouts/base.njk`
  - `src/about/index.njk`
- Problem statement:
  - Horizontal content rails currently rely on a subtle native scrollbar that is easy to miss, so users may not realize more cards are available off-screen.
- Repro steps:
  1. Open a page with an overflowing content rail on desktop.
  2. Hover or focus the rail area and compare the visible navigation cues to the amount of hidden off-screen content.
  3. Observe that the scrollbar alone can be too subtle to advertise continued rail content.
- User impact:
  - Visitors can miss additional cards or discover the rail interaction later than intended.
- Proposed direction:
  - Add a reusable hover/focus treatment with edge fades and directional controls for overflowing rails.
  - Preserve native scrolling and snap behavior.
  - Support optional exact-location pips for snap rails and card stacks without overlapping scrollbar space.
- Acceptance criteria:
  1. Overflowing rails visibly advertise available left/right content on hover or focus.
  2. Directional controls appear only when content exists in that direction.
  3. Optional pips reflect the active card index for snap rails and card stacks.
  4. Pips do not overlap or block scrollbar visibility or dragging.
  5. No regressions in rail snap behavior, keyboard focus scrolling, or page-level overflow containment.
- Notes:
  - Treat as additive polish, not a carousel rewrite.
  - Exclude non-snap free-scroll rails from exact-position pip tracking.

## Completed items

### FB-002 - About page narrow-viewport horizontal overflow regression
- Priority: `P0`
- Status: `done`
- Completed: `2026-03-07`
- Resolution summary:
  - Root cause was page-level width expansion from layout container sizing at narrow widths.
  - Applied targeted containment fix in layout primitives (`main` width/min-width and stack child min-width handling).
  - Preserved intended local rail overflow behavior.
- Evidence (before/after):
  - `docs/issues/screenshots/FB-002-01-mobile-overflow.png`
  - `docs/issues/screenshots/FB-002-02-mobile-overflow.png`
  - `docs/issues/screenshots/FB-002-postfix-375x812.png`
  - `docs/issues/screenshots/FB-002-postfix-992x900.png`

### Template usage
- Priority: `P4`
- Status: `done`
- Resolution summary:
  - Keep completed feedback items here with commit or PR references.

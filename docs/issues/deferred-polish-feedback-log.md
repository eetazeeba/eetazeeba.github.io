# Deferred Polish Feedback Log

Status
- Historical archive as of `2026-04-20 UTC`.
- New polish intake must be filed in GitHub Issues using `.github/ISSUE_TEMPLATE/polish-feedback.yml` and tracked in the canonical GitHub Project.
- This file is retained for migration traceability and completed historical records.

Purpose
- Preserve deferred visual/UX polish history recorded before GitHub Issues + GitHub Project became the canonical backlog system.

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

Completion recording rules
- When an issue is designated as completed, move it out of `## Active backlog` and place it under `## Completed items`.
- Rewrite the completed entry into the compact completed-item format used by `FB-002` and `FB-007`:
  - keep `Priority`, `Status`, and `Completed`
  - replace planning-oriented fields with a short `Resolution summary`
  - keep `Evidence` or `Evidence (before/after)` only when screenshots or artifacts matter
  - keep `Notes` only for important follow-up boundaries or related issues
- Remove implementation-planning detail that no longer belongs in a completed record:
  - `Reported`
  - `Source`
  - `Related phase`
  - `Files likely impacted` or `Files impacted`
  - `Problem statement`
  - `Repro steps`
  - `User impact`
  - `Proposed direction`
  - `Acceptance criteria` or `Acceptance criteria met`
- Consolidate the completed entry so it reads as a brief record of what changed, not a duplicate of the planning spec.
- If screenshots arrived under a generic filename, rename them to the `FB-###-NN-short-description.png` format before finalizing the completed entry and register them in `docs/issues/screenshots/README.md`.

## Blog landing rollout intake plan

Scope
- Use this section for issues discovered after the `2026-03-12` blog landing-page rollout.
- Treat the rollout as one connected surface:
  - `/blog/` landing page
  - `/blog/guides/`, `/blog/articles/`, `/blog/case-studies/` bucket hubs
  - generated article routes at `/blog/<bucket>/<slug>/`
- Start new blog-rollout backlog items at `FB-006`.

Interpretation rules for incoming feedback
- Convert natural-language notes into one issue per root problem, not one issue per sentence or screenshot.
- Separate visual polish from routing/data/schema problems when the fix paths differ.
- Always capture:
  - the affected route or component
  - the user-facing symptom
  - likely root area (`template`, `data/routing`, `style`, `content/model`, or `SEO/schema`)
  - repro steps when the report implies interaction or state
  - acceptance criteria phrased as observable outcomes
- If one report spans multiple surfaces, split only when the fixes can land independently without masking each other.
- When screenshots arrive with generic filenames such as `Screenshot YYYY-MM-DD HHmmss.png`, rename them immediately to `FB-###-NN-short-description.png` and register them in `docs/issues/screenshots/README.md`.

Primary files to check before logging/triaging
- Templates:
  - `src/blog/index.njk`
  - `src/blog/guides/index.njk`
  - `src/blog/articles/index.njk`
  - `src/blog/case-studies/index.njk`
  - `src/blog/post.njk`
- Data, routing, and metadata:
  - `src/_data/blog.js`
  - `src/blog/post.11tydata.js`
  - `src/blog/blog.11tydata.js`
  - `src/blog/guides/guides.11tydata.js`
  - `src/blog/articles/articles.11tydata.js`
  - `src/blog/case-studies/case-studies.11tydata.js`
- Shared styling:
  - `src/_assets/CSS/_components.scss`
  - `src/_assets/CSS/styles.css`
- Supporting docs and content-model references:
  - `docs/planning/blog-landing-implementation.md`
  - `docs/cms-content-spec.md`
  - `docs/high-level-project-tracking.md`

Common rollout issue buckets
- Landing-page hierarchy or editorial-order confusion
- Featured rail layout, controls, overflow, or affordance problems
- Browse-lane clarity and bucket-hub handoff problems
- Card density, spacing, or uneven-grid composition issues on hub sections
- Article-page metadata, breadcrumbs, related-entry, or CTA-path issues
- Route-generation, bucket assignment, sparse-state, or schema drift problems

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

### FB-005 - Viewer-localized article publish/update timestamps
- Priority: `P3`
- Status: `new`
- Area: `blog, article-metadata, localization`
- Reported: `2026-03-12`
- Source: `user follow-up feedback`
- Related phase: `blog landing + article polish`
- Files likely impacted:
  - `src/blog/post.njk`
  - `src/_data/blog.js`
  - `src/_assets/scripts/analytics.js`
  - `src/_includes/layouts/base.njk`
- Problem statement:
  - Article publish/update times are currently rendered as static build-time strings, so they do not reflect the page viewer's local timezone or locale.
- Repro steps:
  1. Open a routed blog article page from a browser in any timezone.
  2. Inspect the visible published/updated metadata.
  3. Observe that the rendered timestamp is fixed from build output rather than localized per viewer.
- User impact:
  - Time-sensitive article metadata can feel less precise or slightly misleading for viewers outside the build environment assumptions.
- Proposed direction:
  - Render machine-readable source timestamps in the article markup.
  - Add a lightweight client-side enhancement that localizes displayed publish/update times for the page viewer when JS is available.
  - Keep the enhancement progressive and avoid turning timestamps into a heavier dependency.
- Acceptance criteria:
  1. Article publish/update metadata can display in the page viewer's local timezone/locale when enhancement is enabled.
  2. If localization fails or is unavailable, the fallback display is explicit ISO 8601 date/time in UTC/GMT.
  3. The source timestamp remains machine-readable in the markup.
  4. No regression to article SEO metadata or structured data output.
- Notes:
  - Record only for future polish; do not implement in the current pass.
  - Fallback should prefer explicit UTC/GMT context over ambiguous static local-looking times.

### FB-006 - Blog article hero metadata low-contrast readability
- Priority: `P1`
- Status: `new`
- Area: `blog, article-hero, metadata, contrast`
- Reported: `2026-03-12`
- Source: `user screenshot feedback`
- Related phase: `blog landing + article polish`
- Files likely impacted:
  - `src/blog/post.njk`
  - `src/_assets/CSS/_components.scss`
  - `src/_assets/CSS/styles.css`
- Evidence (screenshots):
  - `docs/issues/screenshots/FB-006-01-blog-article-meta-low-contrast.png`
- Problem statement:
  - The article hero metadata panel uses a low-contrast combination of background treatment and metadata text styling, making the bucket, reading time, publish date, and author hard to read.
- Screenshot-derived symptoms:
  - The `blog-article-hero__meta` panel blends too closely into the surrounding `card-impact` hero surface.
  - The metadata text reads faintly enough that key article context becomes illegible at a glance.
- Repro steps:
  1. Open a generated blog article page such as `/blog/guides/writing-better-hooks/`.
  2. Inspect the metadata panel in the hero at large-screen layout widths.
  3. Observe weak contrast between the panel background, metadata text, and surrounding hero styling.
- User impact:
  - Visitors can miss basic article context or struggle to read it, which undermines scanability and perceived polish at the top of the page.
- Proposed direction:
  - Rebalance the `blog-article-hero__meta` panel treatment so the panel separates clearly from the hero background.
  - Increase metadata text contrast without making the panel visually heavier than the article title block.
  - Verify the button styling remains legible and visually coherent inside the revised panel.
- Acceptance criteria:
  1. Bucket, reading time, publish/update date, and author are readable at a glance on the article hero.
  2. The metadata panel has clear separation from the surrounding `card-impact` background.
  3. The revised styling does not reduce legibility of the bucket CTA button.
  4. No regressions are introduced to other shared blog card treatments that reuse nearby styles.
- Notes:
  - The immediate suspect surface is the translucent `blog-article-hero__meta` background inside `.card-impact`, not the article content body.

### FB-008 - Blog article pathways over-concentrate bucket-return links in sparse states
- Priority: `P4`
- Status: `new`
- Area: `blog, article-page, pathways, sparse-content`
- Reported: `2026-03-12`
- Source: `user screenshot feedback`
- Related phase: `blog landing + article polish`
- Files likely impacted:
  - `src/blog/post.njk`
  - `src/_data/blog.js`
- Evidence (screenshots):
  - `docs/issues/screenshots/FB-008-01-blog-article-guides-link-density.png`
- Problem statement:
  - In current sparse-content article states, the page can stack multiple nearby links that all steer the reader back toward the same bucket, making the right rail feel repetitive and overly insistent.
- Screenshot-derived symptoms:
  - The article hero includes a `Browse Guides` bucket CTA.
  - The "More from the blog" fallback block repeats `Browse Guides` near a second hub-return link.
  - With limited body and related-content density, the repeated bucket-return prompts read as a bombardment rather than a well-distributed pathway system.
- Repro steps:
  1. Open a generated article page in a sparse-content state, such as `/blog/guides/writing-better-hooks/`.
  2. Compare the hero CTA and the nearby fallback pathways in the right rail.
  3. Observe repeated guidance back to the same bucket within a short visual span.
- User impact:
  - Readers can experience the article page as overly pushy or thinly varied in its onward-path options, especially when the content library is still small.
- Proposed direction:
  - Revisit article-page pathway distribution once there are enough representative articles and related-entry states to judge the pattern honestly.
  - Review whether hero, fallback, and sidebar links should de-duplicate or diversify when they point to the same bucket.
  - Keep this as an investigation/polish item, not an immediate fix while article inventory is still sparse.
- Acceptance criteria:
  1. Future review is based on representative article inventory rather than today's placeholder/sparse states alone.
  2. Article pages avoid clustered repeated links to the same destination when more varied pathway content is available.
  3. Any eventual adjustment preserves clear navigation back to the blog hub and relevant bucket hub without making the page feel repetitive.
- Notes:
  - Intentionally deferred until the site has a more realistic article mix to evaluate.

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

### FB-007 - Blog article update-time visibility and CMS timestamp precision
- Priority: `P2`
- Status: `done`
- Completed: `2026-03-12`
- Resolution summary:
  - Reworked shared blog timestamp handling so article rendering uses structured publish/update metadata instead of flattened date-label comparisons.
  - Kept list and card metadata date-first, while allowing article heroes to surface an explicit `UTC` updated time when a meaningful minute-precision edit exists.
  - Aligned schema normalization, CMS validation, and authoring guidance so both `published_at` and `updated_at` accept date-only or minute-precision values.
- Evidence:
  - `docs/issues/screenshots/FB-007-01-blog-article-metadata-missing-time.png`
- Notes:
  - `FB-005` remains the separate follow-up for viewer-localized timestamp rendering.

# Visual Update Dashed Container Audit

## Goal
- Normalize the active dashed-border container drift across About, Services, and Blog into a smaller shared nested-surface system that feels intentional inside the current Musifer card language.

## Audit Inventory By Functional Purpose
- Support notes and grouped panels: `about-panel`, `services-support-note`, `services-fit-note`, `services-cta-note`, `services-final-band`
- Hero and metadata asides: `about-hero__visual`, `services-hero__aside`, `blog-article-hero__meta`
- Editorial note cards and empty states: `blog-note-card`, `blog-empty-state`
- Nested preview, route, and reading cards: `about-preview-card`, `services-lane-card`, `services-route-card`, `blog-priority-card`, `blog-post-card`, `blog-route-card`, `blog-bucket-entry`, `blog-inline-card`
- Page-owned aligned panels: `services-panel`, `services-panel--soft`
- Chip-like accent UI reviewed in later follow-up: `services-chip`, `services-value-chip`

## Overlap And Redundancy Notes
- `about-panel` is doing one shell job across multiple element types: `article`, `p`, `li`, and `div`.
- Services had two overlapping dashed families: note-like wrappers for support, fit, CTA, and final-band content; and card-like wrappers for lane and route articles.
- Blog had two overlapping dashed families: note-like wrappers for editorial notes, empty states, and article metadata; and card-like wrappers for priority, recent, route, bucket, and inline reading cards.
- `services-panel` visually overlapped the quieter note family, but it still owns page-specific structure for process, prep, and FAQ content and should not be flattened into a generic helper-only component.
- `blog-kicker` remains a meaningful editorial label in active UI and was intentionally left out of this surface pass.

## Shared Treatment Approach
- Added two stable shared helper classes in `src/_assets/CSS/_components.scss`: `.surface-note` and `.surface-card`
- Implementation stayed hybrid and SCSS-first: legacy selectors now map onto the shared note-like or card-like shells in shared SCSS, and no broad template rewrite was needed for this first normalization pass.
- The helper classes extend the existing `card` / `card-impact` language instead of creating a separate visual system.
- Layout ownership stays with page selectors. The shared surface layer only owns shell styling such as border, fill, radius, and shadow.
- `card-impact` sections now use shared nested-surface overrides instead of one-off dashed-border exceptions.
- `services-panel` remains page-owned while visually aligning with the quieter note treatment.

## Files Changed
- `src/_assets/CSS/_components.scss`
- `src/_assets/CSS/styles.css`
- `docs/WORKING/visual-update-dashed-container-audit.md`

## QA Notes
- Run `npm run build:css` to regenerate tracked CSS from the updated SCSS source.
- Run `npm run build` to confirm Eleventy output still renders cleanly.
- Review `/about/`, `/services/`, and `/blog/` at narrow, medium, and wide widths.
- Because shared blog selectors were normalized, also review `/blog/guides/`, `/blog/articles/`, `/blog/case-studies/`, and one generated blog article page.
- Confirm no horizontal overflow, broken stacks, or rail regressions.
- Confirm grouped panels still read clearly and no active dashed-border container treatment remains in the in-scope surfaces.
- Confirm copy, IA, typography, and `blog-kicker` behavior remain unchanged.

## Deferred Follow-Up
- Later follow-up: [visual-update-micro-ui-cleanup.md](visual-update-micro-ui-cleanup.md) removed the decorative `services-chip` and restyled `services-value-chip` away from the dashed chip treatment.
- If future work benefits from clearer markup-level migration, individual templates can adopt `.surface-note` and `.surface-card` directly without moving layout logic out of page selectors.
- If `about-panel` or `services-panel` roles diverge further, split them by function before making another cross-page surface pass.

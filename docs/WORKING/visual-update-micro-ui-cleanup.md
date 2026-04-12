# Visual Update Micro-UI Cleanup

## Goal
- Remove the remaining wireframe-era micro-UI artifacts after the earlier section-label and dashed-container cleanup passes, without flattening meaningful metadata or structure.

## Sequence Context
- This pass follows [visual-update-section-label-cleanup.md](visual-update-section-label-cleanup.md) and [visual-update-dashed-container-audit.md](visual-update-dashed-container-audit.md).
- Scope stayed selective across About, Services, and Blog. No copy rewrite, IA change, or broad component redesign was introduced.

## Removed As Scaffold Residue
- `about-order` was removed from the About preview rail because the preview card titles and CTAs already carry the visible hierarchy cleanly.
- `services-order` was removed from Services lane cards, process-step cards, and FAQ panels because the visible numbers were acting as low-contrast scaffold signposting rather than meaningful UI.
- `services-chip` was removed from the Services lane section header because the visible `4 core lanes` pill did not add routing, metadata, or comprehension value.

## Preserved Or Refined
- Services process sequencing was preserved semantically by converting the process-step container into an ordered list instead of keeping visible numeric markers.
- `services-subheading` was preserved but restyled into a more intentional heading-like treatment because `Common asks` and `Helpful starting info` still support real content comprehension.
- `services-value-chip` was preserved because the short value points still help hero scanning, but its styling was shifted away from the dashed chip treatment so it no longer reads like scaffolding.
- The Services process/project-fit split was tightened so the two-column section no longer relies on stretched card heights or a mix of one-off note wrappers in that area.
- The right-hand project-fit column now uses a consistent support stack built from `services-panel`, replacing the earlier mixed `div` plus `p.services-fit-note` pattern in that section.
- Follow-up refinement: restored equal-height pairing between the two outer cards by letting the parent process grid stretch again, while keeping the inner step cards top-aligned so they do not inherit the old faux-padding problem.
- Follow-up refinement: restored an explicit `id="project-fit"` hook on the right-hand Services card.
- `blog-kicker` was preserved because it still carries meaningful editorial metadata and routing context in active Blog templates.
- Follow-up refinement: blog article metadata now uses a shared framed `blog-meta-panel` pattern on article headers and article cards, so the meaningful metadata stays visible without falling back into the faint overline/kicker role.
- Follow-up refinement: blog landing cards now separate outer shell and content-role responsibilities. `card` / `card-impact` stays the outer shell where used, `blog-card` variants own entry/bucket/editorial content roles, `blog-meta-panel` stays entry-only metadata, and supporting bucket/editorial copy now uses plain `blog-card-supporting-meta` instead of metadata classes.
- Blog browse buttons and other button-style routes were preserved because they are real interactive navigation, not decorative chips.

## Audit Notes By Area
- About: the only remaining scaffold-style micro-UI in active landing-page markup was the preview-card numbering.
- Services: this page still carried the most wireframe residue, concentrated in visible order markers, a decorative lane-count chip, low-contrast subheadings, and dashed hero value chips.
- Blog: the selective audit found no chip-style cleanup to remove in this pass beyond the earlier section-label work; the remaining label-like patterns are still doing real metadata or routing work.
- Blog follow-up: article cards and article headers now share one metadata surface that keeps the title first in reading order, links the bucket/category item to its archive, and uses a restrained dark-amethyst framed treatment that stays readable on both standard cards and `card-impact` surfaces.
- Blog landing follow-up: featured-rail and priority-lane cards now use explicit `blog-card` variants so featured entry cards can reuse the shared metadata panel while bucket/editorial promo cards keep simpler support text without borrowing article-metadata styling.

## Files Changed
- `src/_data/blog.js`
- `src/blog/index.njk`
- `src/blog/post.njk`
- `src/blog/guides/index.njk`
- `src/blog/articles/index.njk`
- `src/blog/case-studies/index.njk`
- `src/about/index.njk`
- `src/services/index.njk`
- `src/_assets/CSS/_components.scss`
- `src/_assets/CSS/styles.css`
- `docs/WORKING/visual-update-micro-ui-cleanup.md`
- `docs/WORKING/visual-update-section-label-cleanup.md`
- `docs/WORKING/visual-update-dashed-container-audit.md`

## QA Notes
- Run `npm run build:css`.
- Run `npm run build`.
- Confirm article titles now precede metadata in DOM/read order on recent cards, bucket cards, related cards, and article headers.
- Confirm the shared `blog-meta-panel` stacks cleanly under titles on narrow screens and does not create horizontal overflow.
- Confirm the linked bucket/category item inside the metadata panel is visibly interactive and keeps a clear keyboard focus state.
- Confirm the dark-amethyst metadata surface remains legible on both standard blog cards and `card-impact` article hero surfaces.
- Confirm the featured story card now uses `blog-meta-panel` while intro and bucket promo cards render `blog-card-supporting-meta` instead of metadata chrome.
- Confirm priority-lane bucket counts still read clearly as support text and no active landing-page template renders `blog-featured-meta` or `blog-inline-meta`.
- Confirm `about-order`, `services-order`, and `services-chip` no longer appear in active templates or shared component CSS.
- Confirm `services-subheading` remains only where it still supports comprehension and no longer reads as a faded scaffold label.
- Confirm `services-value-chip` remains present but no longer uses the dashed chip treatment.
- Confirm Services process steps now preserve order semantically through ordered-list markup rather than visible numbers.
- Confirm the Services process/project-fit section no longer stretches the right card to match the left column and no longer leaves tall blank space inside shorter step cards.
- Confirm no rail, card, or grid regressions were introduced by removing the marker/chip markup.

## Deferred Follow-Up
- Blog metadata normalization now covers article headers plus article/recent/bucket card surfaces. If additional metadata variants appear later, extend `blog-meta-panel` before creating page-specific metadata styling.
- Blog landing cards now have clearer ownership through `blog-card` variants; if future landing cards diverge again, extend those variants before introducing new metadata-specific utility classes.
- `services-value-chip` still carries a legacy class name; only rename it if a later Services terminology pass justifies the churn.

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
- Blog browse buttons and other button-style routes were preserved because they are real interactive navigation, not decorative chips.

## Audit Notes By Area
- About: the only remaining scaffold-style micro-UI in active landing-page markup was the preview-card numbering.
- Services: this page still carried the most wireframe residue, concentrated in visible order markers, a decorative lane-count chip, low-contrast subheadings, and dashed hero value chips.
- Blog: the selective audit found no chip-style cleanup to remove in this pass beyond the earlier section-label work; the remaining label-like patterns are still doing real metadata or routing work.

## Files Changed
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
- Confirm `about-order`, `services-order`, and `services-chip` no longer appear in active templates or shared component CSS.
- Confirm `services-subheading` remains only where it still supports comprehension and no longer reads as a faded scaffold label.
- Confirm `services-value-chip` remains present but no longer uses the dashed chip treatment.
- Confirm Services process steps now preserve order semantically through ordered-list markup rather than visible numbers.
- Confirm the Services process/project-fit section no longer stretches the right card to match the left column and no longer leaves tall blank space inside shorter step cards.
- Confirm no rail, card, or grid regressions were introduced by removing the marker/chip markup.

## Deferred Follow-Up
- If Blog metadata labels expand later, split `blog-kicker` into clearer editorial and scaffold roles before attempting any broader label cleanup.
- `services-value-chip` still carries a legacy class name; only rename it if a later Services terminology pass justifies the churn.

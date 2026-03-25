# Visual Update Section-Label Cleanup

## Goal
- Clean up the `visual-update` sequence by removing low-contrast scaffold-style section labels where headings already carry the visible hierarchy cleanly.

## Scope
- This working note tracks the cleanup sequence across `about`, `services`, and `blog`.
- The sequence is now complete for the three landing pages covered by this note.

## Current Pass: About
- Changed: removed all visible `about-kicker` labels from the About landing page so cards and sections now lead directly with their existing headings.
- Why: the faint numbered kickers read like wireframe leftovers, duplicated the section headings, and weakened the intentional feel of the card UI.
- Accessibility handling: no hidden replacement labels were added. The page already had usable heading structure plus existing `aria-labelledby` and `aria-label` hooks where they add context.
- QA notes:
  - confirm no visible low-contrast kicker text remains on About
  - confirm card tops and section rhythm still feel balanced at narrow, medium, and wide widths
  - confirm no horizontal overflow or spacing regressions were introduced
  - confirm About section semantics still read sensibly without the decorative labels

## Current Pass: Services
- Changed: removed all visible `services-kicker` labels from the Services landing page hero and section headers, while leaving in-place content labels such as `services-order` and `services-subheading`.
- Why: the numbered section kickers duplicated existing headings, read like wireframe scaffolding, and added low-contrast text without improving navigation clarity.
- Accessibility handling: no hidden replacement labels were added. The Services landing page already uses its visible heading structure plus existing `aria-labelledby` and `aria-label` hooks for section context.
- QA notes:
  - confirm no visible low-contrast scaffold kicker text remains on Services
  - confirm hero, section headers, and card tops still feel balanced at narrow, medium, and wide widths
  - confirm no horizontal overflow, spacing regressions, or jumpy alignment were introduced
  - confirm shared style cleanup does not disturb `services-order` or `services-subheading`

## Current Pass: Blog
- Changed: removed scaffold-like `blog-kicker` labels from the Blog landing page header and section-intro blocks where they only repeated the adjacent visible headings.
- Preserved intentionally: featured-card eyebrows and priority-lane bucket eyebrows remain visible because they function as editorial metadata for scanning, grouping, and content comprehension.
- Why selective treatment was required: `blog-kicker` is shared between disposable wireframe-era signposting and meaningful content labels, so a blanket selector removal would have damaged the landing page's information architecture.
- Accessibility handling: no hidden replacement labels were added. The landing page already had heading-based section structure plus existing `aria-labelledby` and `aria-label` hooks where they matter.
- QA notes:
  - confirm section scaffold labels are gone from the Blog landing page header and section intros
  - confirm featured-card eyebrows and bucket labels still remain visible and readable
  - confirm rails, card stacks, and browse/grouping sections still feel balanced at narrow, medium, and wide widths
  - confirm no horizontal overflow, snap-rail regressions, or uneven card spacing were introduced
  - confirm no blanket selector regression hit retained editorial metadata

## Final Status
- About: visible scaffold-style section kickers removed; heading hierarchy left intact.
- Services: visible scaffold-style section kickers removed. A later micro-UI follow-up then removed `services-order`, preserved process sequencing semantically, and restyled `services-subheading`; see [visual-update-micro-ui-cleanup.md](visual-update-micro-ui-cleanup.md).
- Blog: scaffold-like landing-page signposts removed; editorial metadata labels retained where they support discovery and scanning.
- Sequence status: complete for the current `about`, `services`, and `blog` landing-page cleanup pass.

## Follow-up
- Later follow-up: [visual-update-micro-ui-cleanup.md](visual-update-micro-ui-cleanup.md) continues the cleanup sequence by removing `about-order`, removing `services-order`, removing the decorative `services-chip`, and selectively preserving or restyling meaningful Services micro-UI.
- If Blog metadata patterns expand later, consider splitting the current `.blog-kicker` role into separate scaffold and editorial-label classes before applying similar cleanup to bucket pages or article surfaces.

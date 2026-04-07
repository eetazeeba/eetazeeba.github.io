# Visual Update Blog Metadata Cleanup

## Goal

- Complete the remaining blog visual cleanup with `/blog/` as the highest-priority target.
- Bring featured cards, priority-lane cards, recent cards, bucket entries, and article surfaces closer to one shared metadata and nested-surface system.
- Remove blog labels that still read like scaffold residue, while preserving routing or editorial labels that still earn their space.

## Sequence Context

- This pass follows [visual-update-section-label-cleanup.md](visual-update-section-label-cleanup.md), [visual-update-dashed-container-audit.md](visual-update-dashed-container-audit.md), and [visual-update-micro-ui-cleanup.md](visual-update-micro-ui-cleanup.md).
- Earlier passes already:
  - removed low-value scaffold labels from the blog landing-page header and section intros
  - normalized blog nested surfaces into the shared `surface-note` and `surface-card` shell language
  - moved article headers, recent cards, bucket entries, and related article cards onto the shared framed `blog-meta-panel` treatment

## Audit Summary Before This Pass

### `/blog/` landing page

- Recent publishing cards were already using `blog-meta-panel`, with titles first in reading order.
- Featured rail cards and priority-lane cards were still using a mix of muted `blog-kicker` labels plus inline plain-text metadata.
- The result was one page holding two different metadata systems: framed metadata on recent/article surfaces and softer overline-style metadata on the most visible landing-page cards.

### Bucket pages

- Bucket hero kickers such as `Blog / Guides` were initially preserved for route context, but the breadcrumb plus kicker stack still duplicated the same path-like information.
- Section-intro kickers such as `Current publishing` were no longer adding enough meaning once the visible heading and count copy were in place.

### Article and sidebar surfaces

- Article hero metadata, related cards, and bucket-entry cards were already aligned with the shared metadata panel treatment.
- Sidebar support cards were still using short kicker labels above longer headings, which made the card tops feel more layered than necessary.

## Implementation Approach

- Extended the existing blog data shaping so landing featured cards and priority-lane cards now expose `metadataItems`, matching the established metadata-panel rendering used elsewhere in the blog system.
- Updated `/blog/` templates so featured cards and priority-lane cards render `blog-meta-panel` below the title, keeping the title first in DOM and reading order.
- Removed redundant `Current publishing` kickers from bucket-page list headers.
- Follow-up refinement: removed bucket hero kickers from the bucket landing-page hero because the breadcrumb already provides that route context more cleanly.
- Follow-up refinement: promoted `Keep reading` and `Need help?` into the actual sidebar card headings on blog post pages, removing the longer redundant headings and the last active `blog-kicker` usage.
- Follow-up refinement: priority-lane cards now consume shared bucket display metadata directly, using a dark linked header row with the category title on the left and `displayMeta.countLabelShort` on the right instead of a framed metadata bubble plus footer CTA.
- Kept markup churn low by reusing the existing `blog-meta-panel`, `blog-meta-list`, and `blog-meta-link` structure instead of inventing a page-specific variant.

## Files Changed In This Pass

- `src/_data/blog.js`
- `src/blog/index.njk`
- `src/blog/guides/index.njk`
- `src/blog/articles/index.njk`
- `src/blog/case-studies/index.njk`
- `src/_assets/CSS/_components.scss`
- `src/_assets/CSS/styles.css`
- `docs/WORKING/visual-update-blog-metadata-cleanup.md`

## Final State

### `/blog/`

- Featured rail cards now use the same framed metadata treatment direction as recent cards and article surfaces.
- Priority-lane cards now use a dark linked header row with the title on the left and count-only shared metadata on the right instead of a metadata panel plus footer CTA.
- Titles remain first in reading order across featured, priority, recent, bucket, related, and article hero surfaces.
- The landing page no longer mixes obviously different metadata languages between its main card groups.

### Bucket pages

- Bucket hero sections now begin directly with the `h1`, while breadcrumb navigation carries the route context above the card.
- Redundant `Current publishing` intro kickers were removed from the bucket list sections.
- Bucket entries continue to use the shared metadata panel treatment.

### Article and sidebar surfaces

- Article hero metadata and related cards remain on the shared metadata panel treatment introduced in the earlier pass.
- Sidebar cards now use `Keep reading` and `Need help?` as their direct headings, and the longer redundant headings are gone.

## QA Guidance

- Run `npm run build:css`.
- Run `npm run build`.
- Review `/blog/`, `/blog/guides/`, `/blog/articles/`, `/blog/case-studies/`, and one generated blog article page.
- Check narrow, medium, and wide widths.
- Confirm featured cards, priority cards, recent cards, bucket entries, related cards, and the article hero all feel like one system.
- Confirm metadata stacks wrap cleanly without horizontal overflow on both `card` and `card-impact` surfaces.
- Confirm metadata links and browse links keep visible keyboard focus states.
- Confirm breadcrumbs remain intact on bucket pages and the hero spacing still feels balanced without the removed path-like kicker.

## Deferred Follow-Up

- If future blog work introduces new routed-context labels, add a narrower role-specific class instead of reintroducing the broad legacy `blog-kicker` name.
- If additional landing-page card variants appear later, extend `blog-meta-panel` first rather than adding a second metadata treatment.

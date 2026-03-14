# Blog Landing Page Implementation Notes

Snapshot date: 2026-03-12 (branch `experimental`)

Purpose
- Record how the `blog` wireframe was translated into the current Eleventy site.
- Capture the minimal routing/data work that was added so the landing page can point to real article URLs.
- Keep QA notes and likely regression areas close to the implementation.

## Implementation approach
- Replaced the scaffolded `src/blog/index.njk` with a data-backed editorial hub built in Nunjucks, not a JSX transplant.
- Preserved the requested top-of-page order:
  - minimal page header
  - featured snap rail
  - fuller editorial framing
  - browse links
  - priority reading lane
  - recent posts
  - services bridge
  - contact/community bridge
- Reused the shared layout and module system:
  - `l-page-shell`
  - `l-module-stack`
  - `l-grid--2`
  - `l-grid--3`
  - `card`
  - `card-impact`
  - `.module-rail-frame`
  - `.module-rail.module-rail--snap`
- Kept the featured rail manual and accessible through the existing shared rail affordance script and native scroll/snap behavior.

## Wireframe translation and editorial updates
- Flipped the earlier intro-first interpretation so the curated content lane leads the page.
- Reduced the above-the-fold text to an H1 and short deck, then moved the broader editorial framing to the block immediately after the rail.
- Used the first featured rail card as a light orientation card, but kept the lane primarily content-led.
- Converted the wireframe's topic chips into real browse links for `/blog/guides/`, `/blog/articles/`, and `/blog/case-studies/`.
- Removed decorative/non-functional chip behavior from the page. No blog-specific chip classes were introduced.
- Kept the page honest about inventory:
  - recent posts only show live published entries
  - bucket hubs can be public and indexable without pretending they already contain a deep archive

## Data and routing changes
- Added a required `bucket` field to blog entries in the CMS spec, validator, CMS config, and current blog content files.
- Added a shared blog data source at `src/_data/blog.js` that reuses the existing CMS content loader and exposes:
  - published blog entries
  - featured entries
  - recent entries
  - public bucket groupings
  - route helpers and display metadata
- Article hero metadata stays date-first on the publish line; explicit time is reserved for meaningful updated lines when minute-precision editorial data exists.
- Added a generated article template pair:
  - `src/blog/post.njk`
  - `src/blog/post.11tydata.js`
- Article URLs now generate at `/blog/<bucket>/<slug>/` for published public blog entries only.
- Bucket hubs were upgraded from stubs to simple data-backed pages so the new landing-page browse links resolve to real destinations.

## SEO and IA notes
- `/blog/` now carries page-specific title/description and stays on the shared canonical/OG pipeline.
- Bucket hubs now carry page-specific descriptions and `Bucket | Blog | Musifer` title structure through the base layout.
- Generated article pages now activate the shared `Article` JSON-LD builder and render breadcrumb trails that include the bucket hub when that hub is part of the public IA.
- Canonicals now intentionally use `https://musifer.studio` for active Phase 1 while GitHub Pages remains the transitional host.
- Internal linking was kept restrained:
  - blog hub to bucket hubs and live articles
  - article pages back to hub/bucket
  - blog and article bridges into `/services/production/`, `/services/rates-quote/`, `/contact/work-with-us/`, and `/contact/community/`

## QA notes
- `npm run build:css`: run after page styling changes.
- `npm run cms:check`: validates the new required blog bucket field and regenerates `content/_index.json`.
- `npm run build`: validates Eleventy output for the new landing page, bucket hubs, and generated article routes.
- Generated-output/source review targets:
  - `/blog/`
  - `/blog/guides/`
  - `/blog/guides/writing-better-hooks/`
- Checked in markup/output review:
  - featured rail uses shared rail classes and manual controls only
  - browse controls are true links, not chip artifacts
  - draft blog entries do not generate public article routes
  - breadcrumb and `Article` schema output appear on routed articles

## Likely regression areas
- Rail card spacing inside `.module-rail-frame`:
  - verify reserved edge gutters still prevent controls/fades from colliding with copy
- Sparse-content states:
  - the landing page should stay intentional when only one or two posts are published
- Bucket expansion:
  - the data model tolerates additional bucket slugs, but public IA and hub pages still only cover the current three buckets
- Article metadata drift:
  - `bucket`, `summary`, publish/update dates, and author now feed both rendering and schema, so CMS changes should keep those aligned

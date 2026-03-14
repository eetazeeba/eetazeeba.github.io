# Services Landing Page Implementation Notes

Snapshot date: 2026-03-11 (branch `experimental`)

Purpose
- Record how the locked `Services` wireframe was translated into the current Eleventy site.
- Capture the implementation boundaries for this pass so later work does not sprawl by accident.
- Keep QA notes, likely regression areas, and deferred follow-up work close to the page launch context.

## Implementation approach
- Replaced the scaffolded `src/services/index.njk` page with a conversion-focused landing page built in Nunjucks, not a literal React transplant.
- Kept the page inside the existing `layouts/base.njk` flow and reused the current layout primitives:
  - `l-page-shell`
  - `l-module-stack`
  - `l-grid--2`
  - `l-grid--3`
  - `card`
  - `card-impact`
- Stored the page content structure in front matter arrays so the service lanes, process steps, FAQ-style notes, and adjacent-path cards remain readable and reviewable without introducing a new content system.
- Added only two shared styling extensions:
  - a generic `.btn--secondary` modifier
  - a `services-page` component block in shared Sass/CSS

## Wireframe translation
- Preserved the locked wireframe sequence:
  - hero
  - service lanes
  - how work starts
  - project-fit guidance
  - quote/contact conversion band
  - FAQ-style friction handling
  - adjacent routing and final CTA
- Translated React data arrays into Nunjucks front matter data and template loops.
- Kept the first hard conversion push in the later CTA band instead of forcing `Get a Quote` into the top of the page hero.
- Adapted the four service cards to the current IA:
  - one card links to `/services/production/`
  - one card links directly to `/services/rates-quote/`
  - one card links to `/contact/work-with-us/`
  - one card links to `/services/legal/`
- Avoided inventing new child service pages for the visual/editorial lanes. Those lanes currently route into quote/contact paths instead.

## SEO and IA notes
- Added shared layout support for:
  - page-specific meta descriptions
  - self-referencing canonical URLs
  - practical Open Graph tags
  - optional `robots` directives
- Canonicals intentionally use `https://musifer.studio` for active Phase 1 while GitHub Pages remains the transitional host.
- No service-specific rich schema was added for `/services/` in this pass. That remains intentional and matches `docs/planning/SEO/schema-plan.md`, which does not recommend forcing `Service`-style schema onto section hubs.
- Shared breadcrumb UI and `BreadcrumbList` output now apply through the base layout and section data files, so `/services/` and its child pages participate in the shared schema path without page-local JSON-LD markup.
- Internal linking stays restrained:
  - service-to-quote: `/services/rates-quote/`
  - service-to-contact: `/contact/work-with-us/`, `/contact/community/`
  - service-to-blog: `/blog/`
  - service-to-trust context: `/about/`
- Added `noindex, nofollow` support to `/important-update/` because it is a utility/non-search-target page already called out in SEO planning.

## QA notes
- `npm.cmd run build:css`: passed.
- `npm.cmd run build`: passed.
- Verified generated `/services/` output includes:
  - title
  - meta description
  - canonical URL
  - Open Graph title/description/url/image
- Verified generated `/important-update/` output includes `noindex, nofollow`.
- Verified intentional internal links in generated `/services/` output:
  - `/services/production/`
  - `/services/legal/`
  - `/services/rates-quote/`
  - `/contact/work-with-us/`
  - `/contact/community/`
  - `/blog/`
  - `/about/`
- Responsive and overflow review for this pass was code-level plus generated-output review:
  - mobile-first grid primitives remain in place
  - button rows wrap instead of forcing width
  - grid children keep `min-width: 0`
  - no new horizontal rails or fixed-width layout blocks were introduced on this page

### Post-implementation layout fix
- A same-day regression fix widened the shared page shell at large breakpoints to `1120px`.
- Removed `l-grid--3` from the `services` hero value chips, process-step cards, and adjacent-path cards in favor of page-specific grids that stop at two columns.
- Added `overflow-wrap: anywhere` safeguards to dense services-card content so longer strings cannot force unreadable columns or spill outside card bounds.

## Likely regression areas
- Shared layout metadata changes now affect every page using `layouts/base.njk`.
- Future host-cutover work must update `src/_data/site.js` together with deploy/config/docs so canonicals and OG URLs do not drift.
- If future social-image assets are added, the current logo fallback should be replaced with a better preview image rather than copied route by route.

## Follow-up boundaries
- Do not use this page as the excuse to build a full service taxonomy before the child-page content exists.
- Keep future detail expansion inside:
  - child service pages
  - the rates/quote flow
  - contact integration
  - blog support content
- If more service lanes need dedicated pages later, update IA planning docs first rather than letting the parent landing page silently become the sitemap.

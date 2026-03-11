# Musifer SEO Strategy

Snapshot date: 2026-03-11 (branch `experimental`)

Purpose
- Define the sitewide SEO approach for Musifer before the next implementation pass on `services`, `blog`, and `contact`.
- Keep this document focused on strategy, constraints, and shared rules.
- Use [page-intent-map.md](page-intent-map.md), [schema-plan.md](schema-plan.md), and [launch-checklist.md](launch-checklist.md) for page-level intent, schema specifics, and launch QA.

## Current state
- The site is an Eleventy static site deployed through GitHub Pages.
- Public routes are file-based under `src/**/index.njk`.
- The shared public layout currently outputs only a simple `<title>` and does not yet provide a reusable canonical, description, Open Graph, or JSON-LD system.
- No repo-tracked generated `sitemap.xml`, `robots.txt`, or schema helper exists yet.
- [`../../sitemap.md`](../../sitemap.md) is the intended information-architecture and navigation planning reference.
- `src/_data/nav.json` and the current public route structure now align with the sitemap direction for `services` and `contact`.
- Analytics planning and baseline instrumentation are already documented in [`../analytics-rollout-plan.md`](../analytics-rollout-plan.md); SEO measurement should align with that vocabulary and remain privacy-conscious.

## Goals and approach
- Build a coherent SEO foundation before major landing-page implementation work, not after.
- Prioritize search visibility for pages with durable user value, especially `blog`, then `services`, then `contact`.
- Treat SEO as a content, structure, metadata, and internal-linking discipline rather than a plugin checkbox exercise.
- Use the sitemap-led IA in [`../../sitemap.md`](../../sitemap.md) as the planning baseline and keep nav data, route slugs, and page metadata aligned with it.
- Keep recommendations realistic for a static GitHub Pages workflow with minimal automation already in place.

## Non-goals
- Do not promise rankings, rich results, or traffic outcomes.
- Do not prescribe schema that the visible page content cannot support.
- Do not create public tag archives, thin utility pages, or filler content only to increase page count.
- Do not treat metadata or schema as a substitute for page quality, topical fit, or internal-link support.

## SEO handoff point
- This planning set bridges rough page planning and later template implementation.
- Implementation work should not invent new IA, metadata rules, or schema policy unless the content model changes materially.
- If page implementation reveals a real constraint, update these docs instead of allowing route-by-route drift.

## Intended site structure and URL map
This section describes the intended IA from [`../../sitemap.md`](../../sitemap.md), then notes where current implementation still differs.

| Area | Intended routes | Current implementation note |
| --- | --- | --- |
| Home | `/` | Implemented. |
| About | `/about/` plus existing child pages such as `/about/team/`, `/about/mission/`, `/about/history/`, `/about/portfolio/`, `/about/client-list/`, `/about/faq/` | Implemented. |
| Services | `/services/`, `/services/production/`, `/services/legal/`, `/services/rates-quote/` | Implemented. |
| Blog | `/blog/`, `/blog/guides/`, `/blog/articles/`, `/blog/case-studies/` | Bucket hubs exist. Article pages are not wired yet. Recommended article pattern: `/blog/<bucket>/<slug>/`. |
| Contact | `/contact/`, `/contact/work-with-us/`, `/contact/locations/`, `/contact/community/` | Implemented. |
| Utility / non-target pages | `/important-update/`, `/admin/` | Keep outside primary SEO targeting. `/admin/` should remain unindexed and unlinked in public nav. |

## Metadata rules
These rules should become shared template behavior once implementation starts.

### Title tags
- Home should use a value-proposition title, not just `Homepage | Musifer`.
- Standard pages should use `Page Name | Musifer`.
- Service pages should use `Service Name | Musifer`.
- Blog bucket hubs should use `Bucket Name | Blog | Musifer`.
- Blog article pages should use `Article Title | Musifer`.
- Keep titles specific, readable, and front-loaded with the primary topic. Aim for a practical length, not rigid character-count theater.

### Meta descriptions
- Every indexable page should have a unique description grounded in the page's actual promise.
- Prefer one or two plain-language sentences over keyword stuffing.
- Use descriptions to clarify audience, problem, and next step.
- Do not reuse the same description across a whole section.

### Canonical URLs
- Canonicals should be absolute and should use the actual live host, not the aspirational host.
- Until custom-domain cutover is implemented and verified, canonical assumptions should follow the live GitHub Pages host documented in repo planning rather than force `musifer.studio`.
- After domain cutover, update this strategy, the deploy config, and related planning docs together.
- Use self-referencing canonicals for normal public pages.
- Use external canonicals only when a page is intentionally syndicated elsewhere and the source of truth is not Musifer.

### Open Graph and social metadata
- Provide `og:title`, `og:description`, `og:url`, and `og:image` for all important public pages.
- Default social metadata should inherit the same page title and description rules as search metadata unless a page needs a more conversational share variant.
- Blog article pages should prefer article-specific social images when available; otherwise use a consistent Musifer fallback.

### Image expectations
- Plan for a dependable share-image fallback sized for common social previews.
- Do not rely on text-heavy graphics that become unreadable at preview sizes.
- Blog articles should have a hero/share image expectation in the content model before public article rollout.

### Noindex guidance
- Keep `/admin/` unindexed and outside public navigation.
- Utility, joke, placeholder, preview, or other non-search-target pages such as `/important-update/` should default to `noindex` if they remain publicly reachable.
- Draft or unlisted content should not be indexable if it ever becomes routable in the future.
- Do not noindex priority landing pages (`services`, `blog`, `contact`) merely because they are early in design; improve them instead.

## Internal linking rules
- Primary navigation should expose the major sections and their meaningful child pages without creating dead-end hubs.
- Parent landing pages should link to their most important child pages and back again where useful.
- Every service page should link to a relevant next step on `contact`.
- `services` pages should link to supporting `blog` content where that content helps qualify or educate a visitor.
- `blog` bucket hubs must link cleanly to article pages once article templates exist.
- Blog articles should link:
  - to at least one related article when a useful match exists
  - to the most relevant service page when the article naturally supports service intent
  - to `contact` when the article suggests readiness for a conversation or quote
- Avoid orphan pages: every indexable page should be reachable from at least one hub, collection, or contextual link.

## Search Console, sitemap, and deployment notes
- [`../../sitemap.md`](../../sitemap.md) is a planning/navigation sitemap. It is not the XML sitemap that search engines ingest.
- A generated `sitemap.xml` should eventually reflect only intended, canonical, indexable routes that are actually live.
- `robots.txt` should be added alongside XML sitemap implementation so crawl expectations are explicit.
- Search Console verification should use the actual live canonical host at the time of launch.
- After launch, submit the generated sitemap, inspect coverage for the priority pages, and use URL Inspection when pages fail to index.
- If GitHub Pages hosting or custom-domain setup changes, re-check canonical output, sitemap hostnames, and Search Console property coverage together.

## GitHub Pages and static-site constraints
- Metadata must come from page/front matter data or shared Eleventy data, not from server-side logic.
- Canonical, Open Graph, and schema output should be centralized in shared layout/includes to avoid route-by-route inconsistency.
- Route changes are expensive once indexed, so intended slugs should be settled before priority pages launch.
- Static generation is an advantage for SEO only if the output is consistent, crawlable, and aligned with the intended sitemap.

## Schema role
- Schema should support clarity, maintenance, and search-feature eligibility where appropriate.
- Schema should never be used to imply content, organization details, or business attributes that the page does not visibly present.
- See [schema-plan.md](schema-plan.md) for page-type guidance and implementation rules.

## Immediate implementation follow-up
- Add shared metadata inputs to templates/front matter before public rollout of redesigned landing pages.
- Define the future article-page data contract in a way that supports both metadata and `Article` schema without duplicate authoring.
- Keep future navigation or route changes synchronized across `docs/sitemap.md`, `src/_data/nav.json`, and the public route folders.

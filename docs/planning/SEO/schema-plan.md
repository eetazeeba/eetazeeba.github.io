# Musifer Schema Plan

Snapshot date: 2026-03-11 (branch `experimental`)

Purpose
- Define which structured-data types fit Musifer's planned pages and content model.
- Keep schema guidance grounded in the current Eleventy architecture and visible page truth.
- Use this file with [strategy.md](strategy.md) for overall SEO policy and [page-intent-map.md](page-intent-map.md) for page-purpose context.

## Schema principles
- Schema is supportive, not magical. It helps search engines interpret content that already exists on the page.
- Only add schema that reflects visible, user-facing content.
- Prefer JSON-LD output from shared Eleventy includes/helpers rather than hand-maintained snippets on individual pages.
- Keep the required inputs close to the data already needed for rendering so metadata and schema do not drift apart.

## Recommended schema by page type

| Page type | Recommended schema | Use when | Notes |
| --- | --- | --- | --- |
| Home | `Organization` | Implemented | Uses shared site identity data only: name, canonical site URL, description, and logo. No speculative social/business fields are included. |
| About / interior section pages | None by default | Use plain HTML first | About content does not need forced schema unless a page later becomes a true FAQ or breadcrumbed hierarchy page. |
| Section hubs (`/services/`, `/blog/`, `/contact/`) | None by default | Use plain HTML first | Hubs should earn visibility through content, metadata, and linking before adding decorative schema. |
| Interior pages with visible breadcrumb navigation | `BreadcrumbList` | Implemented for the current stable section hierarchy (`about`, `services`, `contact`, `blog`, and live blog bucket hubs) | Breadcrumb UI now renders from shared layout data, and schema is derived from the same breadcrumb trail. |
| Blog article pages | `Article` | Builder contract implemented; public consumers still pending | Future routed article pages should expose the existing Decap fields unchanged so the shared builder can emit `Article` without extra template-only schema glue. |
| FAQ page | `FAQPage` | Only if `/about/faq/` or another page becomes a genuine question-and-answer page | Avoid FAQ schema on marketing copy disguised as FAQs. |
| Contact / locations | `LocalBusiness` only if later justified | Only if Musifer publishes a real business/location representation with stable contact or service-area details | Do not add `LocalBusiness` by default for a vague or primarily online presence. |

## Not recommended right now
- Do not add `LocalBusiness` while location/business details remain ambiguous.
- Do not add `Product`, `Service`, `Review`, or `HowTo` schema until the page content clearly matches those models and the team wants to maintain them.
- Do not add site-search schema because there is no repo-tracked public site search experience yet.

## Static workflow implementation guidance

### Centralize output
- Add one shared JSON-LD include/helper in the Eleventy layout system.
- Feed that helper through page/front matter data rather than writing raw schema into multiple templates.
- Current implementation:
  - rendering lives in `src/_includes/meta/json-ld.njk`
  - page or layout data should pass a `jsonLd` value as either one schema object or an array of schema objects
  - safe serialization is handled centrally by the Eleventy `jsonLd` filter in `.eleventy.js`
  - schema assembly lives in `src/_data/schema.js`
  - homepage `Organization` is supplied from `src/index.11tydata.js` plus shared values in `src/_data/site.js`
  - breadcrumbed section pages receive both visible breadcrumb data and `BreadcrumbList` payloads from section-level `*.11tydata.js` files
  - future blog article pages can reuse the same path by exposing the existing Decap-style article fields
- Keep page-type branching predictable:
  - global identity data for `Organization`
  - page-level breadcrumb data
  - article-level fields for `Article`

### Reuse existing content fields where possible
- Reuse or extend the content fields already documented in [`../../cms-content-spec.md`](../../cms-content-spec.md).
- For article pages, the minimum practical schema inputs are:
  - title
  - summary
  - author
  - `published_at`
  - `updated_at`
  - canonical URL
  - primary image if available
  - primary bucket or section context
- If a field is needed for schema, it should ideally also be useful for visible rendering or metadata.

### Keep schema aligned with the sitemap-led Information Architecture (IA)
- Service and contact breadcrumb/canonical generation should follow the route names already aligned to [`../../sitemap.md`](../../sitemap.md).
- Blog article schema should assume the intended route pattern `/blog/<bucket>/<slug>/`, not an ad hoc structure invented later.
- If the sitemap intent changes, revisit schema routing assumptions at the same time.

## Page-type notes

### `Organization`
- Primary candidate: homepage.
- Use to identify Musifer as the site owner/operator.
- Keep properties conservative until the canonical domain and public contact/location details are stable.
- Current implementation uses:
  - `name`
  - `url`
  - `description`
  - `logo`

### `BreadcrumbList`
- Visible breadcrumb navigation is now implemented in the shared layout via `src/_includes/navigation/breadcrumbs.njk`.
- Most useful for:
  - service child pages
  - blog bucket hubs to article pages
  - possible contact subpages
- Current rollout covers the stable public sections and their current descendants:
  - `/about/`
  - `/services/`
  - `/contact/`
  - `/blog/`
  - `/blog/guides/`
  - `/blog/articles/`
  - `/blog/case-studies/`
- Revisit breadcrumb coverage if route hierarchy changes or if any of these pages stop representing the intended public IA.

### `Article`
- Highest-value schema target for the roadmap because `blog` is the main long-term discovery surface.
- Each article page should expose accurate authoring and date information.
- Do not output `Article` schema for draft content, bucket hubs, or stub pages.
- Shared builder path now exists in `src/_data/schema.js`, but it intentionally stays dormant until a real routed article page supplies:
  - `type: blog` or `schemaType: Article`
  - `status: published`
  - `title`
  - `summary` or `description`
  - `author`
  - `published_at`
  - optional `updated_at`
  - optional `copyright`
  - optional `socialImagePath` or `articleImagePath`
- These inputs mirror the current Decap CMS `blog` collection so future article templates can pass through editorial data instead of maintaining a second schema-only contract.

### `FAQPage`
- Only use if `/about/faq/` becomes a true FAQ resource with discrete question/answer pairs visible on the page.
- If the page stays as general orientation copy, skip FAQ schema.

### `LocalBusiness`
- Leave out unless Musifer later presents itself with a concrete public business footprint.
- If eventually used, confirm the location, service area, and contact details are consistent across visible page content, metadata, and directory listings.

## Maintenance rules
- Schema should live near shared template infrastructure, not inside scattered page bodies.
- When page fields change, update metadata and schema expectations together.
- Treat validation as part of launch QA, not an afterthought. See [launch-checklist.md](launch-checklist.md).
- If a schema type becomes hard to maintain accurately, remove it rather than letting it drift.

## Implementation dependencies
- Shared metadata plumbing should land before or alongside schema output.
- Blog article routing and templates still need to exist before `Article` schema is emitted publicly, even though the shared builder contract now exists.
- Breadcrumb schema depends on actual breadcrumb UI, not just planned hierarchy.
- Canonical host handling should follow the actual live host until custom-domain cutover is complete.
- The current shared JSON-LD path is now used by:
  - homepage `Organization`
  - breadcrumb-enabled interior pages via `BreadcrumbList`
- The next intended consumer is:
  - future blog article templates via `Article`

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
| Home | `Organization` | When the homepage clearly represents Musifer as the site owner/operator | Keep identity details accurate and modest. Do not invent social profiles, phone numbers, or locations not shown elsewhere. |
| About / interior section pages | None by default | Use plain HTML first | About content does not need forced schema unless a page later becomes a true FAQ or breadcrumbed hierarchy page. |
| Section hubs (`/services/`, `/blog/`, `/contact/`) | None by default | Use plain HTML first | Hubs should earn visibility through content, metadata, and linking before adding decorative schema. |
| Interior pages with visible breadcrumb navigation | `BreadcrumbList` | Only when breadcrumbs are present in the rendered UI | Do not emit breadcrumb schema for navigation that users cannot see. |
| Blog article pages | `Article` | Once article templates exist and pages expose title, author, publish date, update date, summary, canonical URL, and image when available | This is the highest-priority schema implementation after shared metadata plumbing. |
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

### `BreadcrumbList`
- Add only after visible breadcrumb navigation is designed and implemented.
- Most useful for:
  - service child pages
  - blog bucket hubs to article pages
  - possible contact subpages
- Not worth implementing before route names and IA are settled.

### `Article`
- Highest-value schema target for the roadmap because `blog` is the main long-term discovery surface.
- Each article page should expose accurate authoring and date information.
- Do not output `Article` schema for draft content, bucket hubs, or stub pages.

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
- Blog article routing and templates must exist before `Article` schema work starts.
- Breadcrumb schema depends on actual breadcrumb UI, not just planned hierarchy.
- Canonical host handling should follow the actual live host until custom-domain cutover is complete.

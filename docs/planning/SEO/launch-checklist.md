# Musifer SEO Launch Checklist

Snapshot date: 2026-03-11 (branch `experimental`)

Purpose
- Provide a practical QA and post-launch checklist for Musifer SEO work.
- Keep this aligned with [strategy.md](strategy.md), [page-intent-map.md](page-intent-map.md), [schema-plan.md](schema-plan.md), and the existing analytics planning in [`../analytics-rollout-plan.md`](../analytics-rollout-plan.md).

## Pre-launch QA

### Reconcile IA and route intent
- Confirm the launch-ready route set matches the intended structure in [`../../sitemap.md`](../../sitemap.md).
- Resolve or explicitly document any remaining drift between:
  - `docs/sitemap.md`
  - `src/_data/nav.json`
  - actual route folders under `src/**/index.njk`
- Ensure the final generated XML sitemap plan includes only real, canonical, launch-ready routes.

### Metadata QA
- Every indexable page has a unique title tag.
- Every indexable page has a unique meta description.
- Home uses a value-oriented title and description instead of generic placeholder copy.
- Priority pages (`services`, `blog`, `contact`, relevant child pages, and any live articles) have page-specific Open Graph metadata.
- Share-image fallback exists and is appropriate for branded previews.

### Canonical QA
- Canonical URLs are absolute and use the actual live host for the release.
- No page points canonicals at the aspirational custom domain before that domain is really live and verified.
- Self-referencing canonicals are in place for normal public pages.
- Non-canonical or syndicated cases are intentionally documented.

### Index / noindex QA
- `/admin/` remains non-indexable and outside public navigation.
- Utility or non-search-target pages such as `/important-update/` are reviewed for `noindex`.
- Placeholder, preview, or thin pages are either improved or excluded from indexing before launch.
- Priority landing pages are not accidentally excluded from indexing.

### Internal-link QA
- No priority page is orphaned.
- Top-level navigation exposes the main sections and the intended child-page structure as shipped.
- Service pages link to contact or quote paths.
- Blog hubs link to article pages and article pages link back to hubs.
- Articles include related-post links where appropriate.
- Articles include service/contact pathways when the content naturally supports them.

### Structured-data QA
- Only planned schema types are emitted.
- JSON-LD matches visible page content.
- Breadcrumb schema only appears on pages that visibly render breadcrumb navigation.
- Breadcrumb item URLs match the page's canonical trailing-slash route.
- `Article` schema is present only on real article pages.
- `FAQPage` is used only if the FAQ page truly contains visible question/answer content.
- `LocalBusiness` is omitted unless the location/business model is genuinely ready.

## Launch-day checks

### Search Console and crawl setup
- Verify the correct Search Console property for the live host.
- Submit the generated `sitemap.xml` after deployment.
- Confirm `robots.txt` is reachable and references the correct sitemap location if that pattern is used.
- Use URL Inspection on:
  - home
  - services landing
  - blog index
  - contact landing
  - one representative child page per section
  - one representative blog article once article pages exist

### Render/output checks
- View page source for priority pages and confirm title, description, canonical, social metadata, and schema output are present in final HTML.
- Confirm no duplicate canonicals or contradictory robots directives appear.
- Confirm 200 responses for intended indexable pages and expected behavior for removed or redirected routes.

### Navigation and sitemap checks
- Confirm the shipped navigation reflects the intended IA decisions, not an older draft.
- Confirm generated sitemap entries use the final route slugs and canonical host.
- Confirm non-indexable or utility pages are excluded from the generated XML sitemap.

## First-week monitoring

### Search Console review
- Check coverage/indexing status for the priority pages.
- Review URL Inspection for any page that remains undiscovered or excluded.
- Watch for canonical-selection surprises, crawl anomalies, or soft-404 signals.
- If pages are not indexing, inspect:
  - whether the page is linked internally
  - whether the page is in the XML sitemap
  - whether the page is thin, placeholder-heavy, or accidentally `noindex`
  - whether the host/canonical configuration is inconsistent

### Privacy-conscious measurement review
- Use Search Console for impressions, clicks, CTR, and query visibility.
- Use the existing privacy-conscious analytics setup for aggregate on-site behavior only, aligned with [`../analytics-rollout-plan.md`](../analytics-rollout-plan.md).
- Reuse the existing event vocabulary instead of inventing a separate SEO measurement taxonomy.
- Avoid adding user-level tracking, invasive attribution layers, or unnecessary third-party scripts just to answer SEO questions.

### Blog discoverability review
- Confirm bucket hubs are crawled and indexed as intended.
- Confirm live articles are reachable from `blog`, from their bucket hub, and from at least one contextual internal link.
- Check whether article-to-article and article-to-service links are being used.
- Review whether the first published articles reflect the intended evergreen-heavy strategy or have drifted into disposable/timely content only.

## Ongoing review

### Monthly or release-based checks
- Review Search Console performance by page type:
  - home
  - services
  - blog hubs
  - articles
  - contact
- Refresh titles and descriptions only when page intent changes or search behavior shows a clear mismatch.
- Check for orphan pages after any navigation or route changes.
- Validate a sample of structured data after template updates.
- Re-check XML sitemap and canonical host output after deployment workflow, domain, or route changes.

### Blog maintenance checks
- Keep content buckets restrained and coherent.
- Do not expose public tag archives unless taxonomy governance becomes significantly stricter.
- Review related-post quality periodically; weak suggestions are worse than fewer suggestions.
- Make sure high-performing guides and case studies continue to point users toward the right service or contact action.

## Manual-review items currently known
- The repo does not yet include a generated XML sitemap or `robots.txt`.
- A shared JSON-LD pipeline now exists in the base layout, and current public consumers are homepage `Organization` plus breadcrumb-driven `BreadcrumbList` payloads for the stable section hierarchy.
- Shared metadata/canonical/Open Graph support now exists in the base public layout, but remaining scaffold pages still need page-specific copy.
- Blog article templates and routing are still future work, so the dormant `Article` builder contract becomes active only when those pages exist.
- Canonical host handling must follow the real live host until custom-domain rollout is actually complete.

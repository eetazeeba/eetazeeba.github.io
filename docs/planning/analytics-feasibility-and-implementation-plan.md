# Analytics Feasibility and Implementation Plan

Status
- Snapshot refreshed on 2026-03-13.
- Renamed from `plausible-feasibility-and-implementation-plan.md` to reduce vendor-specific naming drift.
- Current intended near-term analytics direction: Umami.
- Earlier Plausible-specific guidance in this file is superseded unless explicitly called out as historical context.
- No analytics implementation has been merged to `main`; no tracking vendor is live based on tracked repo files.
- This is a documentation/planning artifact only. It does not add scripts, tags, env vars, dependencies, or deploy/config changes.

## 1. Current intended state
- Umami is the intended near-term analytics platform.
- SEO planning remains active.
- Infrastructure assumptions for analytics and SEO planning:
  - Porkbun is the selected registrar and DNS provider.
  - GitHub Pages is the temporary custom-domain stopgap.
  - Vercel is the planned long-term primary host.
  - Proton remains deferred until after hosting migration.
- GitHub remains the source-of-truth repo and normal CI/CD/build context.
- Analytics should remain documented as planned only until a later implementation pass explicitly changes tracked source.
- SEO validation that depends on the final canonical domain, final redirects, final metadata behavior, or robots behavior remains future work.

## 2. Repo-verified current state
- Framework/build model:
  - Eleventy 3 (`@11ty/eleventy`) with Nunjucks templates.
  - Sass compiled via npm scripts.
  - Static output directory `_site`.
- Public rendering model:
  - Multi-page site (not an SPA).
  - Public route templates use a shared base layout.
  - `/admin` is a separate Decap CMS route and is not part of the public layout chain.
- Analytics implementation state:
  - No Umami, Plausible, or other analytics script include was found in shared public layouts.
  - No analytics helper script, provider config, env var wiring, or consent/disclosure implementation was found in tracked source.
  - No existing analytics/tracking implementation is documented as live in active repo files.
- Hosting state relevant to analytics and SEO:
  - In-repo CI/CD still points to GitHub Pages via Actions from `main`.
  - Active infrastructure planning documents GitHub Pages as transitional and Vercel as the target steady-state host.
  - Historical Netlify linkage remains background context only and is not the active rollout plan.
- SEO-adjacent documentation currently present:
  - `docs/sitemap.md` acts as the route and IA reference.
  - `docs/cms-content-spec.md` documents `canonical_url` as an optional content field.
  - No dedicated documentation was found for robots strategy, structured data/JSON-LD policy, or final metadata/canonical tagging rules. Treat that absence as "not yet documented," not "already implemented elsewhere."

## 3. Superseded guidance from the earlier Plausible review
- The previous Plausible-specific embed recommendations in this file are superseded.
- Plausible-specific config wording such as `plausible domain` and vendor-hosted script references is superseded.
- Vendor-specific Plausible rollout phases are superseded by the current Umami planning direction.
- The vendor-neutral parts of the earlier review remain useful:
  - pageviews-first rollout
  - production-only versus preview-tracking decision points
  - event taxonomy categories
  - privacy/disclosure planning before enablement
  - keeping shared analytics naming/provider abstractions lightweight if implementation happens later

## 4. Current analytics planning guidance
Planning boundary
- Nothing in this document indicates that analytics is already live.
- Future technical steps may be described here for planning clarity, but they are not implemented in this documentation pass.

Near-term direction
- Default planning direction is Umami for baseline pageview analytics when implementation is later authorized.
- Keep analytics event naming vendor-neutral so future vendor changes do not force major documentation churn.
- Keep `/admin` out of the public analytics scope unless a later explicit decision changes that.

Useful event taxonomy that still remains valid
- Navigation interactions: menu links and submenu engagement.
- Services conversion intent: quote-related and service CTA actions.
- Blog engagement: route and section entry clicks.
- Contact funnel actions: contact CTAs and outbound contact links.

Planning decisions that still need later validation
- Confirm the exact canonical public domain once registration is complete.
- Decide whether analytics should start during the transitional GitHub Pages custom-domain phase or wait for the Vercel cutover.
- Decide whether production-only tracking remains sufficient or whether preview/branch tracking is needed later.
- Confirm privacy/disclosure requirements before enablement.

## 5. SEO alignment note
What appears aligned now
- Infrastructure planning now consistently assumes Porkbun -> transitional GitHub Pages custom domain -> Vercel target host -> Proton later for email.
- The sitemap and IA documentation still reads as valid planning/reference material.
- No active doc currently claims that analytics, canonical-domain SEO work, or final host-level SEO behavior is already implemented.

What still needs later validation
- Exact canonical hostname after domain purchase.
- Redirect behavior and canonical-domain enforcement during the GitHub Pages to Vercel transition.
- Final metadata, canonical tag, and structured-data policy once the hosting path stabilizes.
- Final sitemap and robots behavior on the canonical domain after hosting migration.
- Any privacy or disclosure updates that become necessary when analytics is actually implemented.

## 6. Documentation confidence note
- Aligned now:
  - Umami is the intended near-term analytics direction.
  - Analytics remains planning-only in the repo.
  - Infrastructure assumptions match the active rollout documents.
- Intentionally retained as historical/traceability context:
  - the earlier Plausible-specific filename in repo history
  - historical references to Plausible as the prior investigation path
  - historical references to Netlify as non-active background context
- Boundary reminder:
  - This pass updates documentation only.
  - No analytics platform was implemented as part of this task.

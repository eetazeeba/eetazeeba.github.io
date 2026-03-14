# Analytics Feasibility and Implementation Plan

Status
- Snapshot refreshed on 2026-03-13.
- Renamed from `plausible-feasibility-and-implementation-plan.md` to reduce vendor-specific naming drift.
- Current intended near-term analytics direction: Umami.
- Earlier Plausible-specific guidance in this file is superseded unless explicitly called out as historical context.
- Tracked source now includes staged analytics scaffolding on `main`; broader rollout decisions and verification remain open.
- This remains primarily a planning/status artifact; it does not add code in this Phase 1 domain pass.

## 1. Current intended state
- Umami is the intended near-term analytics platform.
- SEO planning remains active.
- Infrastructure assumptions for analytics and SEO planning:
  - Porkbun is the selected registrar and DNS provider.
  - GitHub Pages is the temporary custom-domain stopgap.
  - Vercel is the planned long-term primary host.
  - Proton remains deferred until after hosting migration.
- GitHub remains the source-of-truth repo and normal CI/CD/build context.
- Analytics should remain documented as staged rollout work until later implementation and verification passes explicitly advance it.
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
  - Shared public layout includes analytics gating and provider wiring for production builds.
  - Production deploy workflow sets analytics env vars, and repo-tracked helper/config files exist.
  - Later instrumentation scope, privacy publication, and rollout verification remain active planning items.
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
- This document tracks later decisions beyond the current staged scaffold.
- The existing analytics wiring does not by itself complete rollout acceptance, privacy publication, or verification.

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
- Confirm custom-domain resolution, HTTPS, and GitHub Pages settings stability on `musifer.studio` once the manual Phase 1 handoff is complete.
- Decide whether analytics should start during the transitional GitHub Pages custom-domain phase or wait for the Vercel cutover.
- Decide whether production-only tracking remains sufficient or whether preview/branch tracking is needed later.
- Confirm privacy/disclosure requirements before enablement.

## 5. SEO alignment note
What appears aligned now
- Infrastructure planning now consistently assumes Porkbun -> transitional GitHub Pages custom domain -> Vercel target host -> Proton later for email.
- The sitemap and IA documentation still reads as valid planning/reference material.
- No active doc currently claims that analytics, canonical-domain SEO work, or final host-level SEO behavior is already implemented.

What still needs later validation
- Canonical routing, redirect behavior, and verification on `musifer.studio` during the GitHub Pages to Vercel transition.
- Redirect behavior and canonical-domain enforcement during the GitHub Pages to Vercel transition.
- Final metadata, canonical tag, and structured-data policy once the hosting path stabilizes.
- Final sitemap and robots behavior on the canonical domain after hosting migration.
- Any privacy or disclosure updates that become necessary when analytics is actually implemented.

## 6. Documentation confidence note
- Aligned now:
  - Umami is the intended near-term analytics direction.
  - Staged analytics scaffolding exists in the repo, but rollout verification remains incomplete.
  - Infrastructure assumptions match the active rollout documents.
- Intentionally retained as historical/traceability context:
  - the earlier Plausible-specific filename in repo history
  - historical references to Plausible as the prior investigation path
  - historical references to Netlify as non-active background context
- Boundary reminder:
  - This pass updates documentation only.
  - No new analytics platform work was implemented as part of this Phase 1 domain task.

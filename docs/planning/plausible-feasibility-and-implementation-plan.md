# Plausible Analytics Feasibility Review

Snapshot date: 2026-03-07 (local repo review on branch `experimental`)

Status on `main` (2026-03-13)
- This document is an investigation/planning artifact now tracked on `main`.
- No Plausible implementation has been merged to `main` yet.
- Proposed phases below are candidate rollout steps, not completed work.
- Infrastructure planning has since narrowed to Porkbun for registrar/DNS, GitHub Pages for the temporary custom-domain step, Vercel for the long-term primary host, and Proton for final-phase domain email.
- Historical Netlify notes below are retained only as research context; they are not the active rollout target.

## 1. Current site architecture
- Framework/build system:
  - Eleventy 3 (`@11ty/eleventy`) with Nunjucks templates.
  - Sass is compiled separately via npm scripts.
  - Static output directory is `_site`.
- Page/rendering model:
  - Multi-page static site (MPA), not an SPA.
  - Route pages are `src/**/index.njk`.
  - All public pages declare `layout: layouts/base.njk`.
- Deployment/hosting findings:
  - In-repo CI/CD is configured for GitHub Pages deployment from `main` via GitHub Actions.
  - That GitHub Pages path is now the documented transitional custom-domain phase, not the final hosting target.
  - Vercel is the current planned long-term primary host once hosting migration begins.
  - No repo-level Netlify configuration file (`netlify.toml`) or redirect/header files were found.
- Relevant files and why they matter:
  - `package.json`: defines build and dev commands.
  - `.eleventy.js`: defines passthrough/static asset strategy.
  - `.github/workflows/deploy-pages.yml`: defines current automated deploy path.
  - `src/_includes/layouts/base.njk`: single global head/body template for public pages (best insertion point).
  - `src/admin/index.html` and `src/admin/config.yml`: Decap CMS route and backend target (`github`, branch `main`).

## 2. Evidence from the repo
- `package.json`
  - `build` runs `eleventy --input=src --output=_site`.
  - No analytics dependencies or env tooling are defined.
- `.eleventy.js`
  - Passthrough copy for `/CSS`, `/Images`, `/scripts`, and `src/admin/config.yml`.
  - Confirms static asset publishing model.
- `.github/workflows/deploy-pages.yml`
  - Workflow name `Deploy GitHub Pages`.
  - Trigger: push to `main`.
  - Build: `npm ci` then `npm run build`.
  - Deploy: `actions/deploy-pages`.
- `README.md`
  - Explicitly documents GitHub Pages + GitHub Actions hosting/deploy model.
- `docs/high-level-project-tracking.md`
  - States deployment target as GitHub Pages and identifies `experimental` as an experiment branch.
- `docs/planning/jamstack-main-migration-plan.md`
  - Records GitHub Pages as the cutover deployment model.
- `src/_includes/layouts/base.njk`
  - Global `<head>` and shared script include (`/scripts/header-nav.js`) for all public pages.
- `src/**/index.njk`
  - Public route templates consistently use the same base layout.
- `src/admin/config.yml`
  - Decap backend is GitHub (`repo: eetazeeba/eetazeeba.github.io`, `branch: main`), not Netlify Identity/Git Gateway.
- Repository scans
  - No in-repo matches for `netlify` (except user-provided context, outside files).
  - No `netlify.toml`, `_headers`, `_redirects`, or `CNAME` file found.
  - No existing analytics/tracking/consent implementation found in source.

## 3. Hosting and deployment state
- GitHub Pages evidence (confirmed by repo):
  - Present and explicit in `README.md`, workflow config, and migration/tracking docs.
  - CI build+deploy path is concrete and reproducible from repo files.
- Vercel decision state (planning, not yet implemented in repo):
  - `docs/planning/domain-hosting-email-rollout-plan.md` now records Vercel as the target primary host after the GitHub Pages custom-domain transition.
- Netlify evidence (confirmed by repo):
  - None found in tracked project files.
  - No Netlify build/deploy/header/redirect/domain config in repo.
- Known external context (provided, not repo-proven):
  - Project is linked in Netlify as site `creative-cassata-f39fb9`.
  - Treat this as confirmed linkage metadata only; it is not part of the current rollout plan unless later reintroduced explicitly.
- Hosting state classification:
  - Current repo evidence indicates GitHub Pages as the active documented deployment path.
  - Current planning guidance indicates that GitHub Pages is transitional and Vercel is the intended steady-state host.
  - Netlify appears attached externally but not represented in code/config and is not the active rollout target.
- Follow-up documentation needed outside repo:
  - Vercel dashboard settings once migration begins: build command, output directory, production branch, project/environment variables if introduced, and domain verification details.

## 4. Feasibility verdict
- Plausible integration is technically feasible with low churn and no major architectural changes.
- No architecture blocker was found:
  - Static MPA pages are straightforward for Plausible pageview tracking.
  - A single shared base layout exists for global script insertion.
- Caveats/unknowns:
  - Canonical production domain is not established from repo-visible implementation yet.
  - If analytics starts during the temporary GitHub Pages custom-domain phase, the later Vercel cutover should be planned to avoid fragmented metrics.
  - Privacy policy/cookie disclosure updates are not yet present in repo and may be required by your policy posture.

## 5. Recommended integration strategy
- Base script insertion point:
  - Add Plausible script include to `src/_includes/layouts/base.njk` in `<head>` (or end of `<body>` if preferred), so all public pages receive it consistently.
- Direct embed vs wrapper:
  - Phase 1: direct Plausible script for baseline pageviews.
  - Phase 2+: add a thin internal wrapper for custom events so components do not call vendor globals directly.
- Suggested environment/config approach:
  - Add an Eleventy data source (for example `src/_data/site.js`) that exposes:
    - analytics enabled flag
    - provider name
    - plausible domain
    - script src override (default plausible hosted script)
  - In `base.njk`, conditionally render analytics include only when enabled.
- Avoiding vendor sprawl:
  - Centralize event dispatch through one small helper in `src/_assets/scripts` (for current JS stack).
  - Use stable event names and metadata keys that are provider-agnostic.

## 6. Proposed analytics structure
- Minimal phase-1 tracking:
  - Automatic pageviews only (no custom events initially).
  - Exclude `/admin` naturally because it uses `src/admin/index.html`, not `base.njk`.
- Recommended event categories for future rollout:
  - Navigation: menu link clicks and submenu interactions.
  - Conversion intent: Services CTAs (especially quote-related actions).
  - Engagement: Blog card/list link clicks by section (Guides/Articles/Case Studies).
  - Contact funnel: Contact route CTA clicks and outbound contact links.
- Internal helper recommendation:
  - Add `src/_assets/scripts/analytics.js` as a tiny abstraction (keep JS, not TS, to match current repo tooling).
  - Example API shape (conceptual): `track(eventName, props)` and `trackPageview(path?)` no-op when analytics disabled.
- Likely page targets for near-term custom events:
  - `src/services/index.njk` and service child pages.
  - `src/blog/index.njk` and blog child pages.
  - `src/contact/index.njk` and contact child pages.

## 7. Implementation plan

Implementation status note
- Phases below are not started on `main` unless separately documented in tracking/changelog files.

### Phase 0: prerequisites / config verification
- Intended changes:
  - Confirm the exact canonical public domain once registration is complete.
  - Confirm whether analytics should start on the transitional GitHub Pages custom domain or wait for Vercel cutover.
  - Confirm whether Plausible should run on preview deploys or production only.
  - Confirm policy requirements for privacy notice updates.
- Likely files touched:
  - None required initially (decision phase).
  - Optional: `docs/high-level-project-tracking.md` to record hosting decision.
- Risk level: Medium (metrics quality risk if unresolved).
- Acceptance criteria:
  - Canonical domain and deployment target are explicitly documented.
  - Decision recorded for production vs preview tracking behavior.

### Phase 1: base Plausible script integration
- Intended changes:
  - Add conditional Plausible script include in global base layout.
  - Add centralized config values in Eleventy data (or existing global data file if preferred).
- Likely files touched:
  - `src/_includes/layouts/base.njk`
  - `src/_data/` (new or updated analytics/site config file)
- Risk level: Low.
- Acceptance criteria:
  - Script appears on all public pages in generated `_site`.
  - Script is absent on `/admin`.
  - No layout or build regressions.

### Phase 2: analytics wrapper
- Intended changes:
  - Add provider-agnostic helper for event dispatch.
  - Wire helper as passthrough-copied client script.
- Likely files touched:
  - `src/_assets/scripts/analytics.js` (new)
  - `.eleventy.js` (only if passthrough mapping needs adjustment; likely not needed because `/scripts` is already copied)
  - `src/_includes/layouts/base.njk` (to load helper where needed)
- Risk level: Low to Medium (small runtime integration surface).
- Acceptance criteria:
  - No direct vendor-global calls in page templates.
  - Helper gracefully no-ops when analytics is disabled/unavailable.

### Phase 3: page-level event instrumentation
- Intended changes:
  - Add targeted click/engagement instrumentation for Services, Blog, and Contact flows.
  - Keep instrumentation declarative (data attributes) where possible.
- Likely files touched:
  - `src/services/**/*.njk`
  - `src/blog/**/*.njk`
  - `src/contact/**/*.njk`
  - `src/_assets/scripts/analytics.js`
- Risk level: Medium (naming consistency and event noise risk).
- Acceptance criteria:
  - Key funnel events are emitted with stable naming.
  - No duplicate events from repeated listeners.
  - Event volume aligns with expected user actions during manual smoke tests.

### Phase 4: QA / validation / documentation
- Intended changes:
  - Validate pageview + event collection in production-like environment.
  - Document event taxonomy and maintenance rules.
  - Record host-specific deployment notes for the transitional GitHub Pages phase and the later Vercel phase as needed.
- Likely files touched:
  - `README.md` (analytics section)
  - `docs/high-level-project-tracking.md` (hosting + analytics state)
  - optional dedicated analytics doc under `docs/`
- Risk level: Medium (operational drift if undocumented).
- Acceptance criteria:
  - Verified pageviews on representative routes.
  - Verified core custom events for at least one route per target section.
  - Analytics setup and domain assumptions documented in-repo.

## 8. Open questions
- What is the exact canonical production hostname once the Porkbun domain purchase is complete?
- Should analytics start on the temporary GitHub Pages custom domain, or wait for the Vercel cutover to keep reporting history cleaner?
- When Vercel migration begins, what build/output settings and production-branch settings will be used in the Vercel project?
- Should analytics run only on production deploys, or also on preview/branch deploys?
- Do you want `/admin` excluded explicitly (in addition to layout-based exclusion) for defense in depth?
- Is there an existing privacy policy/legal disclosure standard that must be updated when analytics is enabled?
- Should events be designed now for future forms/lead capture workflows, or deferred until those flows are finalized?

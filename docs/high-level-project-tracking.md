# High-Level Project Tracking

Purpose
- Keep operational and migration context out of the top-level README.
- Track the current branch/deployment model and near-term implementation focus.

## Current operating model (2026-03-07)
- Canonical source branch: `main`
- Experimental test branch: `experimental` (realigned to `main` before new test cycles)
- Deployment target: GitHub Pages via GitHub Actions
- Pages workflow: `.github/workflows/deploy-pages.yml`

## Analytics tangent status (Umami-first, vendor-agnostic) (2026-03-09)
- Tracking artifact: `docs/planning/analytics-rollout-plan.md`.
- Current `experimental` status: Phase 1 env-gated base insertion and Phase 2 shared wrapper are implemented (not yet merged to `main`).
- Phase 0 decisions locked in planning docs:
  - Canonical host baseline: GitHub Pages.
  - Domain direction: `musifer.studio` primary, `musifer.art` backup.
  - Initial analytics scope: production-only.
  - Privacy/disclosure planning reference: `docs/planning/privacy-policy-draft.md` (content finalized; path retained).
  - Netlify `creative-cassata-f39fb9`: connected context only for now, not canonical host baseline.
- Implemented Phase 1 state on `experimental`:
  - `.github/workflows/deploy-pages.yml` build job sets:
    - `ANALYTICS_ENABLED=true`
    - `ANALYTICS_PROVIDER=umami`
    - `ANALYTICS_DOMAIN=musifer.studio`
  - `src/_data/analytics.js` maps env values to:
    - `analytics.enabled`
    - `analytics.provider`
    - `analytics.domain`
  - `src/_includes/layouts/base.njk` includes analytics only when `analytics.enabled` is `true`.
  - `/admin` remains unaffected because it does not use the shared public base layout.
- Implemented Phase 2 state on `experimental`:
  - `src/_assets/scripts/analytics.js` now exposes `window.musiferAnalytics` helper methods behind a provider adapter boundary.
  - Runtime config handoff is centralized in `base.njk` through `window.__MUSIFER_ANALYTICS__`.
  - Wrapper dispatch no-ops safely when disabled/unavailable and applies hostname checks against configured `analytics.domain`.
  - Wrapper payload handling is normalized for portable flat event properties.
- Pre-wireframe taxonomy checkpoint (2026-03-09):
  - Core analytics event baseline is frozen in `docs/planning/analytics-rollout-plan.md` (source of truth).
  - Freeze is intended to reduce naming drift during `services`, `blog`, and `contact` wireframe/design and later implementation work.
- Remaining follow-up items:
  - Confirm where/how the finalized privacy policy will be published and linked in the live site.
  - Align active production `ANALYTICS_DOMAIN` value with the current live host (`eetazeeba.github.io`) until domain cutover is implemented.
  - Implement Phase 3 event instrumentation for `services`, `blog`, and `contact`.

## Domain direction note (2026-03-09)
- Tracking artifact: `docs/planning/domain-direction-musifer-studio-art.md`.
- Current direction: `musifer.studio` preferred primary; `musifer.art` retained as backup/brand-protection.
- Current state on `main`: planning direction documented only; no canonical domain cutover/redirect implementation has been applied yet.
- Follow-up remains: finalize canonical host/domain implementation and publish corresponding hosting/domain documentation updates after rollout.

## Wireframe preview utility (2026-03-10)
- Added isolated local workspace: `docs/wireframe-playground/` (Vite + React).
- Current default preview target: `docs/wireframe-playground/src/services_page_wireframe.jsx`.
- Intended for local wireframe iteration (including Preview.js workflows) only; it is not wired into Eleventy production output or GitHub Pages deployment.
- `main` guard workflow: `.github/workflows/guard-experimental-only-main.yml` blocks this experimental-only path from landing on `main`.

## CMS operational notes
- Decap config path: `src/admin/config.yml`
- CMS branch target: `main`
- `/admin` is kept in-repo but intentionally not linked in public navigation while access/permission checks are finalized.

## Recent consolidation checkpoints
- `2c1cd63`: merged Jamstack cutover to `main`
- `1287330`: lockfile sync fix for CI (`npm ci`) stability
- `33273c5`: refresh-plan + screenshot reference tracking update

## Recovery references
- Tags:
  - `safety/main-pre-jamstack-cutover-2026-03-06`
  - `safety/jamstack-builder-pre-main-cutover-2026-03-06`
  - `safety/experimental-pre-realign-2026-03-07`
- Backup branches:
  - `backup/main-pre-jamstack-cutover-2026-03-06`
  - `backup/jamstack-builder-pre-main-cutover-2026-03-06`
  - `backup/experimental-pre-realign-2026-03-07`

## Experimental branch policy (2026-03-07)
- `experimental` is no longer treated as a long-lived alternate implementation branch.
- Use `experimental` for higher-risk or architecture-sensitive tests that should remain reversible.
- Planned experiment categories include analytics integration tests and richer video/audio hosting or embedding trials.
- Before starting major experimental work, periodically rebase or hard-reset `experimental` from `main` to avoid silent drift.
- Legacy `experimental` history was preserved before realignment using the backup branch and safety tag listed above.

## Branch hygiene checkpoint (2026-03-07)
- Deprecated migration/intermediary branches reviewed and removed:
  - `jamstack-builder`
  - `backport/main-ui-from-jamstack`
  - `migration/jamstack-main-cutover-2026-03-06`
- No additional preservation refs were required during this cleanup because:
  - `jamstack-builder` history remained recoverable via existing `backup/jamstack-builder-pre-main-cutover-2026-03-06` and `safety/jamstack-builder-pre-main-cutover-2026-03-06`.
  - `backport/main-ui-from-jamstack` and `migration/jamstack-main-cutover-2026-03-06` had no unique commits ahead of `main`.

## Near-term implementation focus
- Navigation/branding follow-up items are tracked in:
  - `docs/planning/responsive-layout-navigation-refresh-plan.md`
- Current status from that plan:
  - Phase 1 complete
  - Phase 2 complete
  - Phase 3 complete (including follow-up refinements)
  - Phase 4 baseline system complete; route-level adoption is now in place for `/about/`, `/services/`, and `/blog/`, with `/contact/` still the main parent-page follow-up
- Sitemap/nav alignment note (2026-03-11):
  - `services` and `contact` public route slugs now match the current direction in `docs/sitemap.md`.
  - Public nav labels/URLs in `src/_data/nav.json` were realigned to that sitemap structure.
  - A distinct `/contact/community/` scaffold now exists instead of folding community language into `/contact/locations/`.
  - `blog` now has a curated landing page, lightweight bucket hubs, and minimal routed article support for published public entries.

## Playwright validation expansion note (2026-03-07)
- Automated rail interaction validation was intentionally skipped for tonight after implementation work.
- Playwright CLI is available, but browser binaries are not yet provisioned in a stable project-level setup.
- Follow-up expansion plan:
  - add a project-level Playwright dependency and lock it in `package-lock.json`
  - add repeatable scripts for browser install and UI smoke checks
  - add a first smoke spec targeting `/about/` rail behavior (horizontal scroll, snap mode, keyboard focus reachability)
  - include desktop-wheel/trackpad-style and narrow-touch viewport coverage in the same smoke suite
  - capture artifacts (screenshots/traces) in a predictable location for regression review

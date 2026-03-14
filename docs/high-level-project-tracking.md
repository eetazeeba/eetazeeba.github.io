# High-Level Project Tracking

Purpose
- Keep operational and migration context out of the top-level README.
- Track the current branch/deployment model and near-term implementation focus.

## Current operating model (2026-03-13)
- Canonical source branch and clean sync/deploy branch: `main`
- Daily work happens on short-lived feature branches merged back through reviewed pull requests.
- Experimental test branch: `experimental` (realigned to `main` before new test cycles)
- Canonical public domain: `musifer.studio`
- Backup/brand-protection domain: `musifer.art`
- Current repo-visible deploy baseline: GitHub Pages via GitHub Actions
- GitHub Pages custom-domain use is now treated as a transitional phase, not the final hosting architecture
- Planned long-term primary host: Vercel
- Registrar/DNS provider of choice: Porkbun
- Planned domain email provider after hosting migration: Proton
- Pages workflow: `.github/workflows/deploy-pages.yml`
- Feature work should return to `main` through reviewed pull requests rather than direct feature-branch pushes.
- Preferred merge method for short-lived feature branches: **Squash and merge**
- Intended required checks for pull requests into `main`: `guard-main` and `validate-main-pr`
- Deployment still occurs only after the merge lands on `main`
- Node baseline source of truth: `.nvmrc` (used for local development and Pages CI)
- Rollout planning artifact: `docs/planning/domain-hosting-email-rollout-plan.md`

## Analytics and SEO planning status (Umami staged rollout) (2026-03-13)
- Tracking artifacts:
  - `docs/planning/analytics-rollout-plan.md`
  - `docs/planning/analytics-feasibility-and-implementation-plan.md`
- Current `main` status: staged analytics scaffolding has been merged, while broader instrumentation, privacy publication, and rollout verification remain open.
- Confirmed repo state:
  - Shared public layout now includes analytics gating and provider wiring for production builds.
  - The Pages deploy workflow sets production analytics environment variables.
- Current planning direction:
  - Near-term analytics platform direction: Umami.
  - Earlier Plausible-specific guidance is now superseded unless explicitly retained as historical context in the tracking artifacts.
  - Event taxonomy planning can remain vendor-neutral.
- Hosting and SEO context relevant to analytics:
  - The near-term public-domain activation plan still uses GitHub Pages via Actions.
  - The target long-term host is Vercel after the custom-domain transition is complete.
  - SEO validation for canonical routing, metadata behavior, robots behavior, and final sitemap behavior still depends on the later domain and hosting rollout phases.
  - Historical Netlify linkage (`creative-cassata-f39fb9`) is not the active rollout plan and still has no repo-tracked deploy/config artifact.
- Open decisions before implementation:
  - Confirm `musifer.studio` resolution, HTTPS, and Pages-settings stability once the manual GitHub Pages and Porkbun steps are completed.
  - Whether analytics should start during the transitional GitHub Pages phase or wait for Vercel cutover.
  - Production-only tracking versus preview/branch deploy tracking.
  - Privacy/disclosure requirements before enabling analytics.
  - Initial event taxonomy priorities for `/services/`, `/blog/`, and `/contact/`.

## Domain and infrastructure note (2026-03-13)
- Tracking artifacts:
  - `docs/planning/domain-direction-musifer-studio-art.md`
  - `docs/planning/domain-hosting-email-rollout-plan.md`
- Current direction: `musifer.studio` preferred primary; `musifer.art` retained as backup/brand-protection.
- Phase 1 active state:
  - Porkbun remains the registrar and DNS authority.
  - GitHub Pages via Actions from `main` remains the transitional live host path.
  - Repo-side custom-domain readiness does not require a tracked `CNAME` for the current Actions-based deploy.
  - Vercel remains Phase 2 and Proton remains Phase 3.
- Manual operator handoff still outstanding:
  - set the GitHub Pages custom domain in repo settings
  - add only the required Porkbun DNS records using live dashboard values
  - keep the default GitHub Pages hostname available until the custom domain is stable
  - avoid adding Vercel or Proton records during Phase 1

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
- Planned experiment categories include analytics integration tests and richer video/audio hosting or embedding trials that should remain compatible with the Pages-to-Vercel rollout.
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

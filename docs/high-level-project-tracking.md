# High-Level Project Tracking

Purpose
- Keep operational and migration context out of the top-level README.
- Track the current branch/deployment model and near-term implementation focus.

## Current operating model (2026-03-13)
- Canonical source branch: `main`
- Experimental test branch: `experimental` (realigned to `main` before new test cycles)
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
- Feature work should return to `main` through reviewed pull requests rather than direct feature-branch pushes.
- Preferred merge method for short-lived feature branches: **Squash and merge**
- Intended required checks for pull requests into `main`: `guard-main` and `validate-main-pr`
- Deployment still occurs only after the merge lands on `main`
- Node baseline source of truth: `.nvmrc` (used for local development and Pages CI)

## Analytics and SEO planning status (Umami, planning only) (2026-03-13)
- Tracking artifact: `docs/planning/analytics-feasibility-and-implementation-plan.md` (renamed from the earlier Plausible-specific filename).
- Current `main` status: documentation/planning only; no analytics implementation has been merged.
- Confirmed repo state:
  - No Umami, Plausible, or other analytics script include in shared layout templates.
  - No analytics helper/config files committed in source.
- Current planning direction:
  - Near-term analytics platform direction: Umami.
  - Earlier Plausible-specific guidance is now superseded unless explicitly retained as historical context in the tracking artifact.
  - Event taxonomy planning can remain vendor-neutral.
- Hosting and SEO context relevant to analytics:
  - The near-term public-domain activation plan still uses GitHub Pages via Actions.
  - The target long-term host is Vercel after the custom-domain transition is complete.
  - SEO validation for canonical routing, metadata behavior, robots behavior, and final sitemap behavior still depends on the later domain and hosting rollout phases.
  - Historical Netlify linkage (`creative-cassata-f39fb9`) is not the active rollout plan and still has no repo-tracked deploy/config artifact.
- Open decisions before implementation:
  - Exact canonical production hostname after domain purchase is still implementation-pending.
  - Whether analytics should start during the transitional GitHub Pages phase or wait for Vercel cutover.
  - Production-only tracking versus preview/branch deploy tracking.
  - Privacy/disclosure requirements before enabling analytics.
  - Initial event taxonomy priorities for `/services/`, `/blog/`, and `/contact/`.

## Domain and infrastructure note (2026-03-13)
- Tracking artifacts:
  - `docs/planning/domain-direction-musifer-studio-art.md`
  - `docs/planning/domain-hosting-email-rollout-plan.md`
- Current direction: `musifer.studio` preferred primary; `musifer.art` retained as backup/brand-protection.
- Current planning state:
  - Porkbun selected for registrar/DNS.
  - GitHub Pages selected as the temporary custom-domain stopgap.
  - Vercel selected as the long-term primary host.
  - Proton selected as the final-phase domain email provider.
- Repo-visible implementation is still pending; these are documented rollout decisions, not completed infrastructure changes.

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
  - Phase 4 baseline system complete; route-level adoption for `/services/`, `/blog/`, and `/contact/` remains a follow-up

## Playwright validation expansion note (2026-03-07)
- Automated rail interaction validation was intentionally skipped for tonight after implementation work.
- Playwright CLI is available, but browser binaries are not yet provisioned in a stable project-level setup.
- Follow-up expansion plan:
  - add a project-level Playwright dependency and lock it in `package-lock.json`
  - add repeatable scripts for browser install and UI smoke checks
  - add a first smoke spec targeting `/about/` rail behavior (horizontal scroll, snap mode, keyboard focus reachability)
  - include desktop-wheel/trackpad-style and narrow-touch viewport coverage in the same smoke suite
  - capture artifacts (screenshots/traces) in a predictable location for regression review

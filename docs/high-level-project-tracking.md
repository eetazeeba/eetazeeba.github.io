# High-Level Project Tracking

Purpose
- Keep operational and migration context out of the top-level README.
- Track the current branch/deployment model and near-term implementation focus.

## Current operating model (2026-03-07)
- Canonical source branch: `main`
- Experimental test branch: `experimental` (realigned to `main` before new test cycles)
- Deployment target: GitHub Pages via GitHub Actions
- Pages workflow: `.github/workflows/deploy-pages.yml`

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
  - `docs/responsive-layout-navigation-refresh-plan.md`
- Current status from that plan:
  - Phase 1 complete
  - Phase 2 complete
  - Phase 3 baseline complete with follow-up refinements pending
  - Phase 4 pending

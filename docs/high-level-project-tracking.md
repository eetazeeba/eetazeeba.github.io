# High-Level Project Tracking

Purpose
- Keep operational and migration context out of the top-level README.
- Track the current branch/deployment model and near-term implementation focus.

## Current operating model (2026-03-06)
- Canonical source branch: `main`
- Fallback branch retained during smoke period: `jamstack-builder`
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
- Backup branches:
  - `backup/main-pre-jamstack-cutover-2026-03-06`
  - `backup/jamstack-builder-pre-main-cutover-2026-03-06`

## Near-term implementation focus
- Navigation/branding follow-up items are tracked in:
  - `docs/responsive-layout-navigation-refresh-plan.md`
- Current status from that plan:
  - Phase 1 complete
  - Phase 2 complete
  - Phase 3 baseline complete with follow-up refinements pending
  - Phase 4 pending

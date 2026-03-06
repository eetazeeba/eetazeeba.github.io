# Jamstack Main Migration Plan

## Purpose

Consolidate repository flow so `main` becomes the source-of-truth branch for the Jamstack site currently on `jamstack-builder`, and retire the selective backport model.

This document covers Stage 2 planning only. It does **not** authorize execution.

## Current State Snapshot (2026-03-06)

- `main`: `5595fce` (origin/main at same commit)
- `jamstack-builder`: `3147a5b` (origin/jamstack-builder at same commit)
- Divergence (`main...jamstack-builder`): `4` commits on `main`, `16` commits on `jamstack-builder`
- Fast-forward from `main` to `jamstack-builder`: not possible (`main` is not ancestor of `jamstack-builder`)
- `jamstack-builder` health checks:
  - `npm run build`: pass
  - `npm run cms:check`: pass

## 1) Pre-Migration Checks

Run these checks immediately before migration execution:

1. Branch and working tree
- Confirm current branches and remote sync:
  - `git branch -vv`
  - `git fetch origin`
- Confirm clean working tree (except intentional local-only references):
  - `git status --short`
- Ensure no pending staged/unstaged edits on both `main` and `jamstack-builder`.

2. Build and CMS health on `jamstack-builder`
- `npm install`
- `npm run build`
- `npm run cms:check`
- Expected: successful build and CMS validation/index generation without errors.

3. Identify `main`-only deltas to preserve
- `.gitignore`: preserve `/.DS_Store` ignore currently present on `main`.
- README: preserve useful branch-context notes if still relevant after consolidation.
- Confirm whether any `main`-only operational notes should be ported into jamstack README section before cutover.

4. Deployment baseline
- Record current GitHub Pages settings before change (source, custom domain if any).
- Confirm repository Actions are allowed to deploy Pages.

## 2) Recommended Migration Strategy (Chosen)

### Strategy: Controlled migration branch from `main` with Jamstack tree replacement

Why this is the least error-prone path:
- Avoids complex merge-conflict resolution across diverged static-vs-11ty file layouts.
- Keeps `main` lineage and a clear rollback anchor.
- Produces one explicit migration commit sequence that is easy to review and revert.

Why not fast-forward:
- Not possible due commit divergence (`4` vs `16`).

Why not direct merge:
- High conflict/noise risk across renamed/deleted/reintroduced trees and generated/runtime artifacts.

Execution model for approved Stage 3:
1. Create migration branch from `main`.
2. Replace repository tree content (except `.git`) with `jamstack-builder` tree.
3. Reapply approved keepers from `main` (`.gitignore` and any retained README notes).
4. Commit migration as an explicit cutover commit.
5. Validate build and CMS checks on migration branch.
6. Merge migration branch into `main`.

## 3) Deployment Implications (GitHub Pages via Actions)

Target deployment model:
- Build from Jamstack source in `main`.
- Deploy built static output (`_site`) via GitHub Actions to Pages.

Checklist for migration execution:
1. Add/verify Pages workflow to:
- install dependencies
- run `npm run build`
- upload `_site` as Pages artifact
- deploy with Pages actions

2. Repo settings
- GitHub Pages source set to **GitHub Actions**.
- Verify workflow permissions include Pages deployment + id-token where needed.

3. Post-deploy verification
- Confirm expected routes load from deployed static output.
- Confirm CSS/scripts/assets from `src/_assets` passthrough are published correctly.

## 4) Decap / 11ty Implications

Allowed in `main` after cutover:
- `.eleventy.js`
- `src/**`
- `content/**`
- `scripts/cms/**`
- `src/admin/**`

Required checks before public CMS usage:
1. Update `src/admin/config.yml` branch target from `jamstack-builder` to `main`.
2. Validate GitHub OAuth/backend settings for production usage.
3. Run `npm run cms:check` on final `main` state.
4. Verify upload/media paths and published asset URLs in deployed site.

Immediate `/admin` policy after cutover:
- Keep `/admin` files in `main`.
- Keep `/admin` unlinked from public navigation until CMS access/auth is verified.

## 5) Post-Migration Cleanup Plan (Stage 3 scope)

After successful cutover validation:
1. Documentation updates
- Update README to reflect `main` as canonical Jamstack branch.
- Remove stale references to selective backport and split-branch operating model.

2. Branch/repo cleanup
- Keep `jamstack-builder` temporarily during smoke period.
- Delete `jamstack-builder` only after successful deployment validation and team confirmation.
- Confirm default-branch protections/settings remain correct on `main`.

3. Artifact cleanup
- Remove obsolete selective-backport scripts/docs permanently (already staged in Stage 1 cleanup for this run).

## 6) Stage Gate

**Stop after Stage 2 planning. Do not execute migration or branch deletion without explicit approval.**

Planned Stage 3 execution (when authorized):
1. Create safety tag + backup branches for `main` and `jamstack-builder`.
2. Execute controlled migration-branch replacement strategy.
3. Reapply approved keepers (`.gitignore` / README notes).
4. Add/validate Pages Actions deployment workflow.
5. Run build + CMS verification checks.
6. Merge to `main`.
7. Finalize docs and remove obsolete references.
8. Delete `jamstack-builder` only after deployment success confirmation.

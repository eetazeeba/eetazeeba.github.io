# Jamstack Main Migration Plan

## Status
- Stage 1 and Stage 2: completed.
- Stage 3: authorized and executed on 2026-03-06.
- Canonical branch model: `main` is the source-of-truth Jamstack branch.
- Infrastructure note (2026-03-13): this document records the GitHub Pages cutover baseline. Active infrastructure planning now treats GitHub Pages custom-domain use as transitional before a later Vercel migration; see `docs/planning/domain-hosting-email-rollout-plan.md`.

## Consolidation decisions
- Migration strategy: controlled cutover branch from `main` with Jamstack tree replacement.
- Deployment model at cutover time: GitHub Pages via Actions, deploying built `_site`.
- Decap `/admin` policy: keep `/admin` in repo, keep route unlinked in public nav until verification is complete.

## Keepers preserved from pre-cutover `main`
- `.gitignore` retains `.DS_Store` ignore.
- README retains branch-context notes and now documents the new canonical branch model.

## Stage 3 execution checklist
1. Re-run preflight checks (`npm install`, `npm run build`, `npm run cms:check`) on `jamstack-builder`.
2. Create safety refs:
   - tags for pre-cutover `main` and `jamstack-builder`
   - backup branches for both refs
3. Create migration branch from `main` and apply Jamstack tree replacement.
4. Reapply approved keepers and update CMS branch target to `main`.
5. Add Pages workflow for build + deploy from `main`.
6. Validate migration branch (`npm run build`, `npm run cms:check`).
7. Merge migration branch into `main`.
8. Keep `jamstack-builder` intact through smoke period; delete only after acceptance.

## Post-cutover checks
- Verify GitHub Pages source is set to **GitHub Actions**.
- Verify workflow permissions allow Pages deployment and OIDC token usage.
- Phase 1 domain handoff note (2026-03-13): for this Actions-based Pages deploy, the custom domain is set in GitHub repo settings with Porkbun DNS; no tracked `CNAME` file is required.
- Smoke-test homepage, routes, assets, nav interactions, and `/admin` access posture.

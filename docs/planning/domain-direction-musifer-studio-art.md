# Musifer Domain Direction (`.studio` primary, `.art` backup)

## Current decision
- Preferred primary public domain direction: `musifer.studio`.
- Secondary/backup/brand-protection direction: `musifer.art`.
- Decision status (as of 2026-03-13): naming direction selected for planning; registrar, hosting, and email rollout choices are now documented in `docs/planning/domain-hosting-email-rollout-plan.md`.
- `.com` is not currently the preferred acquisition target due to cost/squatting constraints.
- Final live implementation is still pending follow-up.

## Rationale
- Why `musifer.studio` is preferred:
  - Strong fit for music production, engineering, and broader creative service positioning.
  - Reads clearly as a professional creative destination without over-narrowing scope.
  - Supports current and future service expansion without forcing a genre-locked brand signal.
- Why `musifer.art` should still be reserved:
  - Backup option if `.studio` acquisition or renewal path becomes unfavorable.
  - Brand-protection value against lookalike/impersonation risk.
  - Useful as an alternate redirect domain if primary canonical routing later standardizes on `.studio`.

## Infrastructure alignment
- Registrar and DNS provider of choice: Porkbun.
- Transitional custom-domain host: GitHub Pages via Actions from `main`.
- Long-term primary hosting target: Vercel.
- Domain email target after hosting migration: Proton.
- Practical implication:
  - This file keeps the naming decision and rationale.
  - Operational sequencing now lives in `docs/planning/domain-hosting-email-rollout-plan.md`.

## Follow-up implementation tasks (not executed in this pass)
- Acquire and register target domains through Porkbun (`musifer.studio` primary, `musifer.art` backup/protection).
- Connect the canonical domain to GitHub Pages first as the temporary public state.
- Produce the DNS plan for each rollout phase:
  - transitional GitHub Pages records
  - later Vercel verification and canonical-host records
  - backup-domain redirect behavior if `musifer.art` is acquired
  - later Proton mail records
- Migrate the canonical domain from GitHub Pages to Vercel in a later phase.
- Validate redirects/canonical signals end-to-end after each domain/host transition:
  - host redirects
  - canonical tags where applicable
  - mixed-host drift checks
- Reconcile analytics/domain assumptions after cutover to avoid fragmented reporting.

## Documentation follow-up after acquisition/connection
- Update `README.md` infrastructure section with confirmed canonical domain and active host path.
- Update `docs/high-level-project-tracking.md` from "direction selected" to "implemented state" with dates.
- Update `docs/planning/analytics-feasibility-and-implementation-plan.md` to reflect the final canonical domain decision for the active analytics plan.
- Keep this document as the historical decision record; append implementation outcome notes rather than replacing rationale.

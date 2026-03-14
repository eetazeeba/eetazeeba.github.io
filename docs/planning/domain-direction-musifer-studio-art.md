# Musifer Domain Direction (`.studio` primary, `.art` backup)

## Current decision
- Preferred primary public domain direction: `musifer.studio`.
- Secondary/backup/brand-protection direction: `musifer.art`.
- Decision status (as of 2026-03-13): domains purchased; `musifer.studio` is the canonical public domain for active Phase 1, and `musifer.art` is retained for backup/brand protection.
- `.com` is not currently the preferred acquisition target due to cost/squatting constraints.
- GitHub Pages custom-domain hosting is the transitional live state from `main`; Vercel and Proton remain deferred to later phases.

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

## Remaining phased follow-up tasks
- Complete the GitHub Pages custom-domain setting in repo settings for `musifer.studio`.
- Add only the required Porkbun DNS records for GitHub Pages using current provider dashboards.
- Keep `musifer.art` parked as backup/brand protection until a later redirect or alternate-host decision is explicitly made.
- Produce the DNS plan for each rollout phase:
  - transitional GitHub Pages records
  - later Vercel verification and canonical-host records
  - backup-domain redirect behavior if `musifer.art` is later activated
  - later Proton mail records
- Migrate the canonical domain from GitHub Pages to Vercel in a later phase.
- Validate redirects/canonical signals end-to-end after each domain/host transition:
  - host redirects
  - canonical tags where applicable
  - mixed-host drift checks
- Reconcile analytics/domain assumptions after cutover to avoid fragmented reporting.

## Documentation follow-up after Phase 1 handoff
- Keep `README.md` and the rollout docs aligned with `musifer.studio` as canonical and GitHub Pages as transitional.
- Update tracking and analytics planning docs again if the backup domain starts redirecting or the Vercel cutover begins.
- Keep this document as the historical decision record; append implementation outcome notes rather than replacing rationale.
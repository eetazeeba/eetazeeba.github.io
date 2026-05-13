# Domain, Hosting, and Email Rollout Plan

Status
- Primary: source-of-truth
- Updated: 2026-05-13
- Note: Canonical domain, hosting, and email baseline after rollout completion.


Operational state
- Domain and hosting rollout phases are complete.
- `musifer.studio` is operational as the canonical public domain.
- `musifer.art` remains a backup/brand-protection domain.
- Vercel is the active primary public host.
- Porkbun remains registrar and DNS authority.
- Domain email/contact operations use Microsoft 365, with Graph-based delivery documented in `docs/planning/contact-form-microsoft-365-smtp-setup.md`.
- This document supersedes older undecided-provider notes and now records completed outcomes plus baseline operating policy.

## Decision summary
- Primary public domain direction remains `musifer.studio`.
- Backup/brand-protection domain direction remains `musifer.art`.
- Registrar and DNS provider of choice: Porkbun.
- Active primary public host: Vercel.
- Domain email/contact delivery baseline: Microsoft 365 (Graph-based for site contact delivery path).
- GitHub remains the source-of-truth repo and normal CI/CD/build workflow context throughout all phases.
- `main` remains the clean sync and deploy branch; daily work happens on short-lived feature branches.

## Why this stack
- Porkbun keeps registrar and DNS management simple for a solo maintainer without adding another infrastructure layer.
- Vercel is the active host because it fits the business-facing static site path while preserving straightforward GitHub integration.
- Microsoft 365 is the active domain email/contact delivery baseline for operational routing and mailbox governance.
- GitHub Pages served as the temporary bridge state during rollout and is retained as historical rollout context only.
- The overall goal remains low vendor sprawl: GitHub for source and CI/CD context, Porkbun for domain/DNS, Vercel for hosting, Microsoft 365 for domain email/contact delivery.

## Current architecture baseline
- `main` remains the canonical branch, clean sync branch, and deploy branch.
- Daily work happens on short-lived feature branches that merge back into `main`.
- GitHub Actions remains documented in-repo CI/CD context.
- Vercel is the active public host.
- `musifer.studio` is the canonical public domain.
- `musifer.art` is retained as backup/brand protection only for now.
- Porkbun remains the registrar and DNS authority.
- Site contact mail delivery uses Microsoft Graph with Microsoft 365 mailbox infrastructure.

## Rollout completion summary
- Historical Phase 1 (GitHub Pages transitional domain activation): complete.
- Historical Phase 2 (primary hosting cutover to Vercel): complete.
- Historical Phase 3 (Proton domain-email plan): superseded by Microsoft 365 domain email/contact delivery implementation.

## Operational guardrails
- Keep `musifer.studio` canonical and `musifer.art` as backup unless a new decision document supersedes this baseline.
- Keep provider-specific secrets and credentials out of repo documentation.
- Keep runtime identifiers in planning docs minimal; prefer references to vendor dashboards/systems.
- If temporary identifiers are documented for implementation support, remove them after task completion.

## DNS planning notes
- Keep DNS guidance at the category level until implementation starts; exact values should come from the active provider dashboards and their current documentation.
- Historical rollout DNS categories included:
  - canonical-domain mapping for GitHub Pages during transitional activation
  - Vercel domain verification
  - apex and `www` canonical routing changes
  - temporary overlap planning during TTL propagation
  - Microsoft 365 mail-routing records for domain contact delivery
- If examples are added later, label them as placeholders unless they are copied from currently active provider requirements at implementation time.

## What is not changing
- GitHub remains the source-of-truth repo.
- The existing repo workflow and build context remain the baseline unless a new approved infrastructure decision changes the live target.
- This document does not track hardcoded DNS values, secrets, credentials, or personal account details.
- No secrets, credentials, or personal account details belong in these planning documents.

## Related documents
- `docs/planning/domain-direction-musifer-studio-art.md`
- `docs/high-level-project-tracking.md`
- `docs/planning/jamstack-main-migration-plan.md`
- `docs/planning/analytics-feasibility-and-implementation-plan.md`
- `docs/planning/contact-form-microsoft-365-smtp-setup.md`
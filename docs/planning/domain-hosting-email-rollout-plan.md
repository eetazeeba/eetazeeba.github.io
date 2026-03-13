# Domain, Hosting, and Email Rollout Plan

Status
- Planning decision record updated on 2026-03-13.
- This document is the current operational reference for infrastructure rollout sequencing.
- It supersedes older "host still undecided" and "DNS provider still undecided" notes in active planning docs.

## Decision summary
- Primary public domain direction remains `musifer.studio`.
- Backup/brand-protection domain direction remains `musifer.art`.
- Registrar and DNS provider of choice: Porkbun.
- Transitional custom-domain host after purchase: GitHub Pages via GitHub Actions from `main`.
- Long-term primary hosting target: Vercel.
- Domain email target after hosting migration: Proton.
- GitHub remains the source-of-truth repo and normal CI/CD/build workflow context throughout all phases.

## Why this stack
- Porkbun keeps registrar and DNS management simple for a solo maintainer without adding another infrastructure layer.
- Vercel is the planned long-term host because it is a better fit for an evolving business-facing static site while still keeping GitHub-based deployment flow straightforward.
- Proton is deferred until the final phase so role-based email can be introduced cleanly after the domain and hosting layers are stable.
- GitHub Pages remains useful as the lowest-friction stopgap for getting the purchased domain live before the Vercel cutover.
- The overall goal is low vendor sprawl: GitHub for source and CI/CD context, Porkbun for domain/DNS, Vercel for hosting, Proton for email.

## Transitional architecture note
Current and near-term state
- `main` remains the canonical branch and repo source of truth.
- GitHub Actions remains the documented build/deploy path in-repo.
- The first custom-domain activation is planned on GitHub Pages.
- Porkbun is the intended registrar and DNS control point once the domain is purchased.

Target state
- GitHub remains the source-of-truth repo.
- Vercel becomes the primary public host for the site.
- Porkbun remains the registrar and DNS provider unless a later decision explicitly replaces that role.
- GitHub Pages custom-domain usage is retired or reduced after Vercel is live on the canonical domain.
- Proton handles domain email once the hosting cutover is complete.

What changes between states
- The public hosting endpoint moves from GitHub Pages to Vercel.
- DNS records shift from the temporary GitHub Pages domain mapping to the final Vercel domain mapping.
- Domain verification steps move from Pages-focused setup to Vercel-focused setup.
- Email records are added only after the hosting and canonical-domain path is stable.

## Phase 1: Domain purchase and transitional GitHub Pages setup
Objective
- Purchase the domain through Porkbun and get the canonical custom domain live on GitHub Pages as a temporary state.

Dependencies and prerequisites
- Confirm `musifer.studio` availability and purchase decision.
- Decide whether `musifer.art` is acquired in the same pass for backup/brand-protection.
- Accept Porkbun as the authoritative DNS plan, superseding earlier unresolved DNS-provider notes.

Checklist
- Register the chosen domain(s) with Porkbun.
- Keep Porkbun as registrar and DNS provider unless a later explicit decision changes that.
- Add only the DNS records required for the GitHub Pages custom-domain connection.
- Configure GitHub Pages custom-domain settings for the canonical domain.
- Verify canonical resolution and basic site reachability on the new domain.
- Document the state as transitional so it is not mistaken for the final hosting architecture.

Cautions and rollback notes
- Keep the default GitHub Pages hostname available until the custom domain resolves cleanly.
- Avoid mixing GitHub Pages and future Vercel canonical DNS records at the same time without a controlled cutover plan.
- Do not add Proton mail records during this phase.

## Phase 2: Migrate primary hosting to Vercel
Objective
- Move the public site from the temporary GitHub Pages custom-domain setup to Vercel while keeping GitHub as the source of truth.

Dependencies and prerequisites
- Phase 1 domain registration and DNS control are in place.
- The canonical domain is already resolving through the temporary GitHub Pages state or is otherwise verified as ready for cutover planning.
- The repo's existing build/deploy context remains stable enough to mirror in Vercel later.

Checklist
- Connect the GitHub repo to Vercel at the planning and implementation level when Phase 2 begins.
- Document the expected Vercel verification and domain-attachment touchpoints before any live changes are made.
- Update Porkbun DNS from the temporary GitHub Pages mapping to the final Vercel mapping when cutover is authorized.
- Confirm canonical domain behavior once Vercel is live.
- Retire or reduce GitHub Pages custom-domain usage after Vercel takes over the canonical domain.
- Update repo docs again after the hosting migration is actually complete.

Cautions and rollback notes
- Reduce TTLs ahead of migration if that later becomes useful for a cleaner cutover window.
- Avoid split traffic, split canonical tags, or long-lived dual-host ambiguity.
- Keep rollback notes focused on restoring the last known-good DNS/host state rather than improvising during cutover.

## Phase 3: Configure Proton for domain email
Objective
- Add domain email only after domain registration and hosting migration are stable.

Dependencies and prerequisites
- Domain registration is complete and controlled through Porkbun DNS.
- Vercel is live on the canonical domain or the hosting cutover is otherwise considered complete.
- Contact and operational needs are clear enough to justify role-based addresses.

Checklist
- Set up Proton as the domain email provider.
- Add Proton verification and mail DNS records at Porkbun when this phase begins.
- Start with role-based addresses that support clear public and operational routing.
- Likely first-wave addresses:
  - `hello@` for general inbound contact
  - `booking@` for service and scheduling inquiries
  - `rights@` or `legal@` for permissions and notices
  - `press@` as optional later-stage support
- Document mailbox purpose, ownership, and recovery expectations without storing secrets or personal account details in the repo.

Cautions and rollback notes
- Do not let email setup complicate the domain purchase or hosting migration phases.
- Avoid publishing addresses before the mailbox routing is confirmed.
- Keep personal email separate from role-based public contact as an explicit operating goal.

## DNS planning notes
- Keep DNS guidance at the category level until implementation starts; exact values should come from the active provider dashboards and their current documentation.
- Phase 1 DNS categories:
  - canonical-domain mapping for GitHub Pages
  - optional verification records if required
  - optional redirect or placeholder handling for the backup domain
- Phase 2 DNS categories:
  - Vercel domain verification
  - apex and `www` canonical routing changes
  - temporary overlap planning during TTL propagation
- Phase 3 DNS categories:
  - Proton domain verification
  - MX records
  - SPF, DKIM, and DMARC records
- If examples are added later, label them as placeholders unless they are copied from currently active provider requirements at implementation time.

## What is not changing
- GitHub remains the source-of-truth repo.
- The existing repo workflow and build context remain the baseline until a later hosting migration changes the live target.
- This documentation pass does not change source code, deployment config, package files, workflows, DNS, or live integrations.
- No secrets, credentials, or personal account details belong in these planning documents.

## Related documents
- `docs/planning/domain-direction-musifer-studio-art.md`
- `docs/high-level-project-tracking.md`
- `docs/planning/jamstack-main-migration-plan.md`
- `docs/planning/plausible-feasibility-and-implementation-plan.md`

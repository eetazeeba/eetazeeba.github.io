# Planning Documents

Status
- Primary: source-of-truth
- Updated: 2026-05-13
- Current reference: docs/high-level-project-tracking.md
- Note: Canonical planning index and classification map.


Purpose
- Keep active planning and rollout documents grouped under `docs/planning/`.
- Reduce path drift by providing a stable index for planning-oriented references.

## Active References
- [domain-hosting-email-rollout-plan.md](domain-hosting-email-rollout-plan.md): current infrastructure baseline after completed rollout (Porkbun DNS + Vercel hosting, with `musifer.studio` canonical and `musifer.art` backup).
- [analytics-feasibility-and-implementation-plan.md](analytics-feasibility-and-implementation-plan.md): current analytics feasibility/status reference; near-term direction remains Umami.
- [contact-form-microsoft-365-smtp-setup.md](contact-form-microsoft-365-smtp-setup.md): active operational note for Contact form delivery via Microsoft Graph with `contact@musifer.studio` sender/recipient defaults and MFA-enabled M365 baseline.
- [SEO/strategy.md](SEO/strategy.md), [SEO/schema-plan.md](SEO/schema-plan.md), and [SEO/launch-checklist.md](SEO/launch-checklist.md): current SEO policy, schema guidance, and launch-validation reference set.

## Historical Implementation Notes and Completed Records
- [analytics-rollout-plan.md](analytics-rollout-plan.md): historical analytics implementation snapshot from the earlier `experimental` phase.
- [blog-landing-implementation.md](blog-landing-implementation.md): historical implementation snapshot for the `blog` landing-page rollout.
- [services-landing-implementation.md](services-landing-implementation.md): historical implementation snapshot for the `services` landing-page rollout.
- [responsive-layout-navigation-refresh-plan.md](responsive-layout-navigation-refresh-plan.md): completed responsive/navigation roadmap retained for planning and implementation traceability.
- [jamstack-main-migration-plan.md](jamstack-main-migration-plan.md): completed branch-consolidation and cutover record.
- [domain-direction-musifer-studio-art.md](domain-direction-musifer-studio-art.md): historical domain naming decision record; live rollout sequencing now belongs to the rollout plan.

## Supporting Drafts and Experiments
- [responsive-layout-phase-4-content-modules-implementation-brief.md](responsive-layout-phase-4-content-modules-implementation-brief.md): implementation-state brief for the completed Phase 4 module system.
- [privacy-policy-draft.md](privacy-policy-draft.md): working draft for future published privacy/disclosure copy.
- [homepage-vellum-background-experiment.md](homepage-vellum-background-experiment.md): homepage-specific visual experiment and follow-up note.

Notes
- Primary tracker remains at `docs/high-level-project-tracking.md` for quick top-level access.
- Infrastructure rollout sequencing should now be anchored from `domain-hosting-email-rollout-plan.md`.
- Audits remain in `docs/audits/`.
- Active issue/backlog intake now lives in GitHub Issues + GitHub Project (using `.github/ISSUE_TEMPLATE/` forms).
- `docs/issues/` remains as historical archive context, evidence indexing, and migration traceability.
- Planning outputs should use the shared project taxonomy: `Saga` > `Arc` > `Episode`.
- Content/IA reference docs such as `docs/cms-content-spec.md` and `docs/sitemap.md` remain at `docs/` root.

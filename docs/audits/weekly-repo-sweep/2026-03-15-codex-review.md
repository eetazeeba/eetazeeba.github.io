# Weekly Repo Sweep - 2026-03-15 (Codex Review)

Status
- Primary: historical
- Secondary: snapshot
- Updated: 2026-05-12
- Current reference: docs/high-level-project-tracking.md
- Note: Weekly sweep snapshot.

**Priority Drift Issues**

1. Host/current-domain status is overclaimed and split across docs. [README.md](../../../README.md) line 8 and [README.md](../../../README.md) line 73 read as if `musifer.studio` is already the live transitional public domain, while [docs/high-level-project-tracking.md](../../high-level-project-tracking.md) line 60 and [docs/planning/domain-hosting-email-rollout-plan.md](../../planning/domain-hosting-email-rollout-plan.md) line 59 still treat Pages/DNS setup as manual handoff work.
Minimal edit: reword README and the domain-direction note to say the repo targets `musifer.studio` in metadata/workflows, but live custom-domain activation still depends on external Pages/DNS verification.
Canonical owner: current status in [docs/high-level-project-tracking.md](../../high-level-project-tracking.md); rollout steps in [docs/planning/domain-hosting-email-rollout-plan.md](../../planning/domain-hosting-email-rollout-plan.md).
Update taken (2026-03-16): softened [README.md](../../../README.md) and [docs/planning/domain-direction-musifer-studio-art.md](../../planning/domain-direction-musifer-studio-art.md) so they now describe musifer.studio as the repo-target canonical domain for Phase 1 and explicitly note that live custom-domain activation still depends on external Pages/DNS verification.

2. The current-state tracker claims an experimental workspace exists on `main`, but the repo says the opposite. [docs/high-level-project-tracking.md](../../high-level-project-tracking.md) line 67 says `docs/wireframe-playground/` was added, while [guard-experimental-only-main.yml](../../../.github/workflows/guard-experimental-only-main.yml) line 25 explicitly blocks that path from landing on `main`, and the path is absent in this checkout.
Minimal edit: remove that section from the current-state tracker or relabel it as historical `experimental`-only context.
Canonical owner: [docs/high-level-project-tracking.md](../../high-level-project-tracking.md).
Update taken (2026-03-16): replaced the current-state wireframe workspace claim in [docs/high-level-project-tracking.md](../../high-level-project-tracking.md) with a historical note that docs/wireframe-playground/ was experimental-only, is absent from this checkout of main, and is guarded from landing on main.

3. The latest SEO metadata audit is internally stale and factually wrong on host state. [docs/audits/seo/page-metadata-audit-2026-03-15.md](../seo/page-metadata-audit-2026-03-15.md) line 3 says it is a snapshot from `experimental`, and [docs/audits/seo/page-metadata-audit-2026-03-15.md](../seo/page-metadata-audit-2026-03-15.md) line 37 says `src/_data/site.js` points at `https://eetazeeba.github.io`, but [src/_data/site.js](../../../src/_data/site.js) line 3 points at `https://musifer.studio`.
Minimal edit: either correct the audit to `main` + `musifer.studio`, or mark it superseded/branch-specific and archive it.
Canonical owner: SEO policy in [docs/planning/SEO/strategy.md](../../planning/SEO/strategy.md); the audit should mirror that, not invent its own host baseline.
Update taken (2026-03-16): corrected [docs/audits/seo/page-metadata-audit-2026-03-15.md](../seo/page-metadata-audit-2026-03-15.md) in place so it now reflects current `main` source, aligns the canonical-host note to `musifer.studio`, and removes the stale `experimental` branch framing.

4. Analytics current-state ownership is split between a live tracker and a stale branch snapshot. [docs/planning/analytics-rollout-plan.md](../../planning/analytics-rollout-plan.md) line 3 and [docs/planning/analytics-rollout-plan.md](../../planning/analytics-rollout-plan.md) line 6 still frame the implementation as living on `experimental`, but the implementation is plainly on `main` in [deploy-pages.yml](../../../.github/workflows/deploy-pages.yml) line 22, [base.njk](../../../src/_includes/layouts/base.njk) line 52, and [analytics.js](../../../src/_assets/scripts/analytics.js) line 242.
Minimal edit: add a banner that `analytics-rollout-plan.md` is a historical implementation snapshot, or update its branch/status wording to `main` and leave current-state summary to the tracker.
Canonical owner: current analytics state in [docs/high-level-project-tracking.md](../../high-level-project-tracking.md).
Update taken (2026-03-16): added a historical-snapshot banner to [docs/planning/analytics-rollout-plan.md](../../planning/analytics-rollout-plan.md) clarifying that its experimental implementation record is preserved for traceability while current analytics status and ownership remain in [docs/high-level-project-tracking.md](../../high-level-project-tracking.md).

5. One analytics planning doc still denies the existence of SEO reference docs that are now present. [docs/planning/analytics-feasibility-and-implementation-plan.md](../../planning/analytics-feasibility-and-implementation-plan.md) line 43 says no dedicated docs were found for robots/schema/canonical policy, but those now exist in [docs/planning/SEO/strategy.md](../../planning/SEO/strategy.md) line 13, [docs/planning/SEO/schema-plan.md](../../planning/SEO/schema-plan.md) line 36, and [docs/planning/SEO/launch-checklist.md](../../planning/SEO/launch-checklist.md) line 125.
Minimal edit: replace the "not yet documented" sentence with links to the SEO set and keep only analytics-specific open questions.
Canonical owner: [docs/planning/SEO/strategy.md](../../planning/SEO/strategy.md).
Update taken (2026-03-17): replaced the stale "not yet documented" note in [docs/planning/analytics-feasibility-and-implementation-plan.md](../../planning/analytics-feasibility-and-implementation-plan.md) with links to the SEO reference set and reworded the SEO-alignment section so it distinguishes documented policy from still-pending host-level validation.

6. Planning docs need a clearer "active reference vs historical snapshot" boundary. [docs/planning/README.md](../../planning/README.md) line 7 presents a planning index but omits existing snapshot docs like [docs/planning/blog-landing-implementation.md](../../planning/blog-landing-implementation.md) line 3 and [docs/planning/services-landing-implementation.md](../../planning/services-landing-implementation.md) line 3, while completed plans like [docs/planning/responsive-layout-navigation-refresh-plan.md](../../planning/responsive-layout-navigation-refresh-plan.md) line 248 still contain outdated pre-implementation baseline claims that no longer match [package.json](../../../package.json) line 9.
Minimal edit: make `docs/planning/README.md` explicitly separate active references from historical implementation notes, and add a one-line status banner to completed plans/snapshots.
Canonical owner: [docs/planning/README.md](../../planning/README.md).
Update taken (2026-03-17): reorganized [docs/planning/README.md](../../planning/README.md) into active-reference, historical-record, and supporting-doc groups, and added top-of-file status banners to [docs/planning/blog-landing-implementation.md](../../planning/blog-landing-implementation.md), [docs/planning/services-landing-implementation.md](../../planning/services-landing-implementation.md), and [docs/planning/responsive-layout-navigation-refresh-plan.md](../../planning/responsive-layout-navigation-refresh-plan.md).
Workflow/process docs were mostly in good shape. I did not find meaningful drift in [docs/workflows/two-device-development-routine.md](../../workflows/two-device-development-routine.md), [docs/sitemap.md](../../sitemap.md), or [docs/cms-content-spec.md](../../cms-content-spec.md); the Windows toolchain also matches the two-device routine's stated versions.

**Risky Assumptions**

- I did not verify live GitHub Pages settings, Porkbun DNS, or public resolution for `musifer.studio`; the repo only proves metadata and workflow intent, not live external state.
- I did not verify the macOS version block in the two-device routine from this environment.




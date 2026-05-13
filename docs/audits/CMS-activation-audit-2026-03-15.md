# Decap CMS Readiness Re-Audit On `main`

Status
- Primary: historical
- Secondary: snapshot
- Updated: 2026-05-12
- Current reference: docs/high-level-project-tracking.md
- Note: Point-in-time audit record.


Citation note: local file citations below use repo-relative links plus plain-text line refs because many markdown viewers do not reliably render local `#L` anchors.

## 1. Current State On `main`
- `main` already contains a real Decap footprint in [src/admin/config.yml](../../src/admin/config.yml), [src/admin/index.html](../../src/admin/index.html), `content/`, and the CMS scripts declared in [package.json](../../package.json). Sources: [src/admin/config.yml](../../src/admin/config.yml) `1-142`; [src/admin/index.html](../../src/admin/index.html) `1-10`; [package.json](../../package.json) `6-15`.
- The CMS backend on `main` still points directly at `main` and still has no public auth settings, no `publish_mode`, and no squash-merge setting. Sources: [src/admin/config.yml](../../src/admin/config.yml) `1-8`.
- Local CMS behavior is still convenience-only. `local_backend: true` exists, but `npm run cms:local` still shells out through `npx decap-server` instead of a pinned local dependency. Sources: [src/admin/config.yml](../../src/admin/config.yml) `6-8`; [package.json](../../package.json) `11-18`.
- Blog is still the only routed CMS-backed public content path. [src/blog/post.11tydata.js](../../src/blog/post.11tydata.js) maps page description and summary from `entry.summary`, and [src/_data/blog.js](../../src/_data/blog.js) only reads `blog` entries into live routes. Sources: [src/blog/post.11tydata.js](../../src/blog/post.11tydata.js) `12-18`; [src/blog/post.11tydata.js](../../src/blog/post.11tydata.js) `35-57`; [src/_data/blog.js](../../src/_data/blog.js) `257-364`.
- `profiles` and `lessons` still exist in the CMS config and content folders, but they are not surfaced by public routed templates. `/about/team/`, `/about/client-list/`, and `/about/portfolio/` are still scaffold pages. Sources: [src/admin/config.yml](../../src/admin/config.yml) `49-142`; [src/about/team/index.njk](../../src/about/team/index.njk) `1-10`; [src/about/client-list/index.njk](../../src/about/client-list/index.njk) `1-10`; [src/about/portfolio/index.njk](../../src/about/portfolio/index.njk) `1-10`.
- The two-device workflow on `main` still expects short-lived feature branches, PRs into `main`, and squash merges. It also still tells humans to run `npm run cms:check` when a content change needs a refreshed index. Sources: [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `18-24`; [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `29-37`; [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `67-151`; [scripts/cms/build-index.js](../../scripts/cms/build-index.js) `1-97`.
- The repo still documents `musifer.studio` as canonical in [README.md](../../README.md) and [src/_data/site.js](../../src/_data/site.js), while [docs/high-level-project-tracking.md](../high-level-project-tracking.md) still says the GitHub Pages custom-domain handoff is manually outstanding. Sources: [README.md](../../README.md) `8-18`; [src/_data/site.js](../../src/_data/site.js) `1-13`; [docs/high-level-project-tracking.md](../high-level-project-tracking.md) `50-65`.

## 2. Comparison Against `CMS_PLAN_v1.md`
- Still correct: the earlier plan was right that `main` lacks public auth, lacks editorial workflow, still targets `main` directly, still has unpinned local CMS tooling, still exposes extra collections that should be deferred for Phase 1, and still has conflicting domain-status documentation. Sources: [src/admin/config.yml](../../src/admin/config.yml) `1-8`; [src/admin/config.yml](../../src/admin/config.yml) `49-142`; [package.json](../../package.json) `11-18`; [README.md](../../README.md) `8-18`; [docs/high-level-project-tracking.md](../high-level-project-tracking.md) `50-65`.
- Still correct: the earlier plan was right that blog `summary` matters enough to public activation to justify requiring it, because `summary` still drives blog descriptions and visible article ledes on `main`. Sources: [src/admin/config.yml](../../src/admin/config.yml) `37-38`; [src/blog/post.11tydata.js](../../src/blog/post.11tydata.js) `12-18`; [src/blog/post.11tydata.js](../../src/blog/post.11tydata.js) `35-57`; [src/_data/blog.js](../../src/_data/blog.js) `195-205`.
- Still correct: the earlier plan was right that GitHub Pages deploy-from-`main` plus PR validation on `main` still makes `editorial_workflow` the cleanest branch-safe CMS mode for this repo. Sources: [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `67-151`; [.github/workflows/validate-main-pr.yml](../../.github/workflows/validate-main-pr.yml) `1-32`; [.github/workflows/deploy-pages.yml](../../.github/workflows/deploy-pages.yml) `1-58`.
- Still correct: the earlier plan was right that a GitHub backend plus an external OAuth proxy is still the best non-Netlify path for this project. This is an audit conclusion based on the repo state above plus Decap and GitHub OAuth requirements, not a single repo-file citation.
- Stale or branch-specific: the earlier warning about `experimental` drift was process-valid, but this re-audit did not find repo-visible CMS/admin/deploy/docs divergence between `experimental` and `main`. This is a branch-comparison finding from the 2026-03-15 re-audit, not a single repo-file citation.
- Revise before implementation: `CMS_PLAN_v1.md` treated `content/_index.json` as clearly non-blocking. On `main`, runtime still does not read it, but the two-device workflow still tells humans to run `cms:check`, so tonight's plan should not silently change that policy without either documenting a CMS exception or automating it later. Sources: [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `117-124`; [scripts/cms/build-index.js](../../scripts/cms/build-index.js) `1-97`.
- Revise before implementation: creating a brand-new standalone planning doc is optional, not required, for the smallest safe prep pass tonight. Existing docs can be updated more surgically if the goal is small, reviewable diffs.

## 3. Recommended Path
- Recommendation: **B. proceed from `main`, but only with a very small prep pass first**.
- Repo-specific reason: the codebase is already close enough that small in-repo hardening changes are worth doing tonight, but full safe public activation still depends on external OAuth/app/repo-setting work that the repo alone cannot complete. Sources: [src/admin/config.yml](../../src/admin/config.yml) `1-8`; [docs/high-level-project-tracking.md](../high-level-project-tracking.md) `72-76`.
- Repo-specific reason: `main` already validates the earlier CMS conclusions, so there is no need for another abstract audit cycle. The next useful move is a tight prep pass that reduces risk before the external auth step.
- Repo-specific reason: direct public activation from repo code alone would still be incomplete tonight because `main` has no public auth endpoint, no GitHub OAuth app wiring, and no verified repo-settings picture. Sources: [src/admin/config.yml](../../src/admin/config.yml) `1-8`; [README.md](../../README.md) `91-97`.

## 4. Smallest Safe Implementation Scope
- Safe to do tonight in-repo: add `publish_mode: editorial_workflow` and `backend.squash_merges: true` in [src/admin/config.yml](../../src/admin/config.yml) so CMS edits follow the same PR-and-squash discipline the repo already expects. Sources: [src/admin/config.yml](../../src/admin/config.yml) `1-8`; [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `126-151`.
- Safe to do tonight in-repo: reduce public CMS scope to blog only in [src/admin/config.yml](../../src/admin/config.yml), leaving `profiles` and `lessons` in content/docs for later but not exposing them in the public editor yet. Sources: [src/admin/config.yml](../../src/admin/config.yml) `10-142`; [src/about/team/index.njk](../../src/about/team/index.njk) `1-10`; [src/about/client-list/index.njk](../../src/about/client-list/index.njk) `1-10`; [src/about/portfolio/index.njk](../../src/about/portfolio/index.njk) `1-10`.
- Safe to do tonight in-repo: make blog `summary` required in the CMS config and add matching validation in [scripts/cms/validate-content.js](../../scripts/cms/validate-content.js), ideally at least for published blog entries. Sources: [src/admin/config.yml](../../src/admin/config.yml) `37-38`; [scripts/cms/validate-content.js](../../scripts/cms/validate-content.js) `40-125`; [src/blog/post.11tydata.js](../../src/blog/post.11tydata.js) `12-18`.
- Safe to do tonight in-repo: pin local CMS tooling in [package.json](../../package.json) and `package-lock.json` so `npm run cms:local` stops depending on runtime `npx` fetches. Sources: [package.json](../../package.json) `6-18`.
- Safe to do tonight in-repo: harden [src/admin/index.html](../../src/admin/index.html) with an explicit noindex policy and a pinned Decap bundle version. Sources: [src/admin/index.html](../../src/admin/index.html) `1-10`.
- Needs external account/config work: stand up the OAuth proxy, register the GitHub OAuth app, add `base_url` and `auth_endpoint`, and confirm the repo/collaborator/protection settings that the repo cannot see.
- Defer until domain decision: final public `/admin/` URL wording, any `display_url` or host-polish config, and any repo docs that would claim one settled public admin host. Sources: [README.md](../../README.md) `8-18`; [docs/high-level-project-tracking.md](../high-level-project-tracking.md) `50-65`.
- Defer until future content models are live: public editing for `/about/team/`, `/about/client-list/`, and `/about/portfolio/`; do not build those into tonight's activation slice. Sources: [src/about/team/index.njk](../../src/about/team/index.njk) `1-10`; [src/about/client-list/index.njk](../../src/about/client-list/index.njk) `1-10`; [src/about/portfolio/index.njk](../../src/about/portfolio/index.njk) `1-10`.
- Explicitly do not touch tonight: GitHub Pages hosting migration, Netlify adoption, audio/video upload management, or a broad content-model rewrite.

## 5. QA Checklist
- Local `/admin/`: `npm ci`, `npm run start`, `npm run cms:local`, open `/admin/`, and verify the blog-only editor works after the pinned-local-tooling change. Sources: [README.md](../../README.md) `91-97`; [package.json](../../package.json) `6-18`.
- Blog create/edit flow: create a draft blog post, confirm required `summary`, confirm `bucket` routing still works, and confirm the generated content still passes `npm run cms:validate`. Sources: [src/admin/config.yml](../../src/admin/config.yml) `11-48`; [scripts/cms/validate-content.js](../../scripts/cms/validate-content.js) `40-125`; [src/_data/blog.js](../../src/_data/blog.js) `168-231`.
- Editorial workflow behavior: verify a CMS save creates a branch/PR-shaped flow to `main` rather than a direct `main` commit once public auth is wired. Sources: [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `67-151`.
- PR validation: verify the resulting PR runs `validate-main-pr` from [.github/workflows/validate-main-pr.yml](../../.github/workflows/validate-main-pr.yml) and the existing `guard-main` check before merge. Sources: [.github/workflows/validate-main-pr.yml](../../.github/workflows/validate-main-pr.yml) `1-32`; [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `126-134`.
- Deploy behavior from `main`: verify only the post-merge `main` update triggers Pages deploy in [.github/workflows/deploy-pages.yml](../../.github/workflows/deploy-pages.yml). Sources: [.github/workflows/deploy-pages.yml](../../.github/workflows/deploy-pages.yml) `1-58`.
- Public `/admin/`: verify the chosen host serves `/admin/`, is not linked in public nav, and advertises noindex behavior. Sources: [README.md](../../README.md) `91-97`; [src/admin/index.html](../../src/admin/index.html) `1-10`.
- Login/auth round-trip: verify GitHub auth returns through the external OAuth handler and lands back in the CMS UI.
- Two-device portability: verify terminal-based code work still follows the documented feature-branch routine, while CMS-authored PR branches can be resumed from another device through GitHub/browser state without fighting that routine. Sources: [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `17-24`; [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `29-54`; [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `67-151`.

## 6. Docs Updates Needed
- Update [README.md](../../README.md) so it clearly separates local CMS behavior from public CMS behavior and stops implying local proxy success equals public readiness. Sources: [README.md](../../README.md) `91-97`.
- Update [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) to explain that CMS-authored content PRs are the controlled exception to the normal terminal-created `feature/*` branch pattern. Sources: [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `18-24`; [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `126-151`.
- Update [docs/high-level-project-tracking.md](../high-level-project-tracking.md) so the domain/Pages status does not keep mixing "Phase 1 is active" with "manual custom-domain handoff is still outstanding." Sources: [docs/high-level-project-tracking.md](../high-level-project-tracking.md) `50-65`.
- Update the existing CMS notes rather than adding a large new planning document unless you decide the auth rollout deserves a permanent runbook after implementation starts.
- Correct the stale SEO audit line about [src/_data/site.js](../../src/_data/site.js) only if you are already touching audit docs; it is real drift, but it is not part of the smallest safe activation slice. Sources: [src/_data/site.js](../../src/_data/site.js) `1-13`.

## 7. Blockers And Deferred Items
- External auth blocker: GitHub-backed public Decap still needs an OAuth handler and GitHub OAuth app. Auth-path basis remains `https://decapcms.org/docs/backends-overview/`, `https://decapcms.org/docs/editorial-workflows/`, `https://decapcms.org/docs/choosing-a-backend/`, `https://decapcms.org/docs/external-oauth-clients/`, and `https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps`.
- Repo-settings blocker: the repo cannot verify current branch protection, collaborator access, Pages custom-domain settings, or whether required reviews would block Decap publish actions.
- Domain uncertainty blocker: the repo still cannot tell you whether the final public admin host should be `musifer.studio`, the default GitHub Pages hostname, or another interim URL. That does not block prep work, but it does block final host claims. Sources: [README.md](../../README.md) `59-75`; [docs/high-level-project-tracking.md](../high-level-project-tracking.md) `50-65`.
- Workflow nuance to settle: decide whether browser-authored CMS PRs are allowed to skip `content/_index.json` until automation exists, or whether reviewers will keep the current manual `cms:check` habit for content changes. Sources: [docs/workflows/two-device-development-routine.md](../workflows/two-device-development-routine.md) `117-124`; [scripts/cms/build-index.js](../../scripts/cms/build-index.js) `1-97`.
- Future-scope deferment: `/about/team/`, `/about/client-list/`, and `/about/portfolio/` should stay as future structured-content work unless their routed templates and editor-facing schemas are built together in a later pass. Sources: [src/about/team/index.njk](../../src/about/team/index.njk) `1-10`; [src/about/client-list/index.njk](../../src/about/client-list/index.njk) `1-10`; [src/about/portfolio/index.njk](../../src/about/portfolio/index.njk) `1-10`.

## 8. ChatGPT Execution Prompt
Paste this into ChatGPT when you want an implementation pass based on this audit:

```text
Work from the current `main` branch of the Musifer repository. Use `docs/audits/CMS-activation-audit-2026-03-15.md` as the scope and decision reference, and treat the repository itself as the source of truth if anything in the audit and repo differ.

Goal
Implement only the smallest safe Decap CMS prep pass that the audit says is ready to do in-repo tonight. Do not expand into full public activation if that requires external auth, OAuth app setup, or repo-setting changes outside the repository.

Constraints
- Treat `main` as the source of truth.
- Keep diffs small and reviewable.
- Preserve the documented two-device workflow and PR discipline.
- Prefer editorial workflow over direct commits.
- Keep GitHub as source of truth.
- Avoid Netlify unless a confirmed hard dependency appears.
- Keep Phase 1 limited to blog authoring.
- Keep image/media handling conservative and aligned with current repo conventions.
- Do not change GitHub Pages hosting or deploy architecture tonight.
- Do not add public OAuth proxy settings yet.
- Do not create or configure a GitHub OAuth app.
- Do not expose `profiles` or `lessons` in the public CMS tonight.
- Do not build `/about/team`, `/about/client-list`, or `/about/portfolio` content models yet.
- Do not add audio/video upload management.
- Do not do a broad documentation rewrite.

Required implementation scope
1. Update `src/admin/config.yml`:
   - add `publish_mode: editorial_workflow`
   - add `backend.squash_merges: true`
   - keep GitHub as the backend
   - limit Phase 1 public CMS scope to blog only
   - require blog `summary`
2. Update `scripts/cms/validate-content.js` so blog entries require `summary` in the Phase 1 workflow.
3. Pin local CMS tooling in `package.json` and `package-lock.json` so `npm run cms:local` no longer relies on runtime `npx decap-server`.
4. Harden `src/admin/index.html`:
   - add an explicit noindex policy
   - pin the Decap bundle version instead of using a floating `^3.0.0`
5. Make only the smallest justified docs updates:
   - `README.md`
   - `docs/workflows/two-device-development-routine.md`
   - `docs/high-level-project-tracking.md`
6. Updated audit document to reflect current state of CMS deployment.


Validation
- Run `npm run build`
- Run `npm run cms:validate`
- If feasible after pinning local tooling, verify the local `/admin/` flow

Report back with
- what changed
- what was intentionally deferred
- remaining external blockers for safe public activation

```
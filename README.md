# Musifer Site (Eleventy + Decap CMS)

## What this repository contains
- A Jamstack website built with Eleventy.
- Content managed in Markdown/front matter files.
- Optional Decap CMS admin interface for editing content.
- GitHub remains the source-of-truth repo for code, content, and normal CI/CD workflow context.
- Phase 1 direction is set: the repo targets `musifer.studio` as the canonical public domain on transitional GitHub Pages, while live custom-domain activation still depends on external Pages/DNS verification and Vercel and Proton remain later-phase work.

## Core stack and infrastructure
- [Eleventy (11ty)](https://www.11ty.dev/docs/) for static site generation
- [Decap CMS](https://decapcms.org/docs/intro/) for browser-based content editing
- [Sass](https://sass-lang.com/documentation/) for stylesheet authoring
- [GitHub Actions](https://docs.github.com/en/actions) for the current build/deploy workflow context
- [GitHub Pages](https://docs.github.com/en/pages) for the transitional Phase 1 custom-domain host
- Vercel as the long-term primary hosting target after the GitHub Pages transition
- Porkbun as registrar and DNS provider of choice
- Proton as the planned domain email provider after hosting migration

## Quick start
1. `npm ci`
2. `npm run start`
3. Open `http://localhost:8080/`
4. Build production output with `npm run build`

Use `npm ci` for normal setup and branch sync on an existing clone. Use `npm install` only when intentionally adding or updating dependencies and commit the resulting lockfile change.

`main` is the clean sync and deploy branch. Daily work should happen on short-lived feature branches.

## Key directories
- `src/`: Eleventy templates, includes, and route pages
- `src/_assets/`: source assets published as `/CSS`, `/Images`, and `/scripts`
- `content/`: Content Management System (CMS) content entries (blog, lessons, profiles)
- `scripts/cms/`: CMS validation/index scripts
- `docs/`: planning, migration, and architecture notes
- `.github/workflows/`: Continuous Integration and Continuous Delivery/Deployment (CI/DI) workflows (including Pages deploy)

## Shared head and favicon
- Site-wide metadata and favicon links are wired in `src/_includes/layouts/base.njk`.
- The favicon uses the existing `src/_assets/Images/Musifer_Logo.svg` mark directly, with generated fallbacks at `src/_assets/Images/favicon-32x32.png` and `src/_assets/Images/apple-touch-icon.png`.
- Those PNG derivatives exist only to improve browser-tab and touch-icon compatibility while staying inside the existing Eleventy passthrough image pipeline.

## Documentation map
- [`docs/workflows/two-device-development-routine.md`](docs/workflows/two-device-development-routine.md): day-to-day branch, device, and dependency routine
- [`docs/planning/README.md`](docs/planning/README.md): planning-folder index and scope notes
- [`docs/cms-content-spec.md`](docs/cms-content-spec.md): content model and field rules
- [`docs/sitemap.md`](docs/sitemap.md): route and information architecture notes
- [`docs/planning/domain-hosting-email-rollout-plan.md`](docs/planning/domain-hosting-email-rollout-plan.md): selected infrastructure stack and phased rollout plan
- [`docs/planning/domain-direction-musifer-studio-art.md`](docs/planning/domain-direction-musifer-studio-art.md): domain naming direction (`musifer.studio` primary, `musifer.art` backup/protection)
- [`docs/planning/responsive-layout-navigation-refresh-plan.md`](docs/planning/responsive-layout-navigation-refresh-plan.md): responsive/nav refresh roadmap
- [`docs/audits/css-refresh-conflict-audit.md`](docs/audits/css-refresh-conflict-audit.md): CSS audit and implementation risks
- [`docs/planning/jamstack-main-migration-plan.md`](docs/planning/jamstack-main-migration-plan.md): branch consolidation and cutover history
- [`docs/high-level-project-tracking.md`](docs/high-level-project-tracking.md): operational status and ongoing tracking notes
- [`docs/planning/analytics-rollout-plan.md`](docs/planning/analytics-rollout-plan.md): analytics rollout plan (`Umami` first, `Plausible`-compatible later) with vendor-agnostic integration guidance
- [`docs/planning/privacy-policy-draft.md`](docs/planning/privacy-policy-draft.md): finalized privacy/disclosure reference used for analytics rollout readiness (filename retained for continuity)
- [`docs/planning/SEO/`](docs/planning/SEO): SEO planning set for strategy, page intent, schema, and launch QA
- [`docs/planning/analytics-feasibility-and-implementation-plan.md`](docs/planning/analytics-feasibility-and-implementation-plan.md): active analytics planning/status doc (current near-term direction is Umami, planning only)

## Infrastructure rollout snapshot
- Canonical public domain: `musifer.studio`.
- Backup/brand-protection domain: `musifer.art`.
- Current repo-visible deploy baseline remains GitHub Pages via GitHub Actions from `main`.
- GitHub Pages custom-domain hosting is the active transitional Phase 1 state, not the final hosting architecture.
- `main` is the clean sync and deploy branch; daily work happens on short-lived feature branches.
- Porkbun remains the registrar and DNS authority for Phase 1.
- Long-term primary hosting target: Vercel.
- Domain email rollout target after hosting migration remains Proton.
- GitHub remains the source-of-truth repo and normal CI/CD/build workflow context throughout the rollout.
- Planning reference: `docs/planning/domain-hosting-email-rollout-plan.md`.

## Transitional GitHub Pages notes
- Deployment workflow: `.github/workflows/deploy-pages.yml`
- Expected near-term model: build `_site` from `main`, then deploy via Actions with repo metadata and workflows targeting `musifer.studio` as the transitional public domain once external Pages/DNS verification is complete.
- For this Actions-based Pages deploy, the custom domain is configured in GitHub repo settings; this repo does not need a tracked `CNAME` file for Phase 1.
- Planned follow-up: retire or reduce GitHub Pages custom-domain usage once Vercel is live on the canonical domain.
- Helpful docs:
  - [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
  - [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
  - [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## Analytics planning status
- Current status on `main` (2026-03-13): staged analytics scaffolding exists in tracked source, while broader instrumentation, policy publication, and rollout verification remain in progress.
- Active rollout reference: `docs/planning/analytics-rollout-plan.md`.
- Additional planning/context reference: `docs/planning/analytics-feasibility-and-implementation-plan.md`.
- Hosting and SEO context for analytics decisions:
  - Repo-documented near-term deployment path remains GitHub Pages via Actions as the transitional custom-domain step.
  - Current target hosting decision is Vercel for the long-term primary site once the GitHub Pages transition is complete.
  - SEO assumptions that depend on the final canonical domain, final redirects, metadata behavior, or robots behavior remain planning-only until later rollout phases validate them.
  - Historical Netlify linkage (`creative-cassata-f39fb9`) is not the active rollout plan and has no repo-tracked deploy/config artifacts.

## CMS notes
- CMS config is in `src/admin/config.yml`.
- Phase 1 public CMS scope is limited to blog authoring.
- `/admin` is intentionally not linked in public navigation until CMS access checks are complete.
- `npm run cms:local` only verifies the local proxy-backed editing flow; it does not complete public auth or repo-settings setup for a public `/admin/` launch.
- Local CMS test flow:
  1. `npm run start`
  2. `npm run cms:local`
  3. Open `http://localhost:8080/admin/`

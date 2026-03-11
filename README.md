# Musifer Site (Eleventy + Decap CMS)

## What this repository contains
- A Jamstack website built with Eleventy.
- Content managed in Markdown/front matter files.
- Optional Decap CMS admin interface for editing content.
- GitHub Pages deployment through GitHub Actions.

## Tools used
- [Eleventy (11ty)](https://www.11ty.dev/docs/) for static site generation
- [Decap CMS](https://decapcms.org/docs/intro/) for browser-based content editing
- [Sass](https://sass-lang.com/documentation/) for stylesheet authoring
- [GitHub Pages](https://docs.github.com/en/pages) + [GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) for hosting/deploy

## Quick start
1. `npm install`
2. `npm run start`
3. Open `http://localhost:8080/`
4. Build production output with `npm run build`

## Key directories
- `src/`: Eleventy templates, includes, and route pages
- `src/_assets/`: source assets published as `/CSS`, `/Images`, and `/scripts`
- `content/`: CMS content entries (blog, lessons, profiles)
- `scripts/cms/`: CMS validation/index scripts
- `docs/`: planning, migration, and architecture notes
- `.github/workflows/`: CI/CD workflows (including Pages deploy)

## Documentation map
- [`docs/planning/README.md`](docs/planning/README.md): planning-folder index and scope notes
- [`docs/cms-content-spec.md`](docs/cms-content-spec.md): content model and field rules
- [`docs/sitemap.md`](docs/sitemap.md): route and information architecture notes
- [`docs/planning/responsive-layout-navigation-refresh-plan.md`](docs/planning/responsive-layout-navigation-refresh-plan.md): responsive/nav refresh roadmap
- [`docs/audits/css-refresh-conflict-audit.md`](docs/audits/css-refresh-conflict-audit.md): CSS audit and implementation risks
- [`docs/planning/jamstack-main-migration-plan.md`](docs/planning/jamstack-main-migration-plan.md): branch consolidation and cutover history
- [`docs/high-level-project-tracking.md`](docs/high-level-project-tracking.md): operational status and ongoing tracking notes
- [`docs/planning/analytics-rollout-plan.md`](docs/planning/analytics-rollout-plan.md): analytics rollout plan (`Umami` first, `Plausible`-compatible later) with vendor-agnostic integration guidance
- [`docs/planning/domain-direction-musifer-studio-art.md`](docs/planning/domain-direction-musifer-studio-art.md): current domain direction (`musifer.studio` primary, `musifer.art` backup/protection)
- [`docs/planning/privacy-policy-draft.md`](docs/planning/privacy-policy-draft.md): finalized privacy/disclosure reference used for analytics rollout readiness (filename retained for continuity)
- [`docs/planning/SEO/`](docs/planning/SEO): SEO planning set for strategy, page intent, schema, and launch QA

## Hosting through GitHub Pages
- Deployment workflow: `.github/workflows/deploy-pages.yml`
- Expected model: build `_site` from `main`, then deploy via Actions.
- Helpful docs:
  - [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
  - [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
  - [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## Analytics rollout status (Umami-first, vendor-agnostic)
- `experimental` status (2026-03-09): Phase 1 base insertion + env gating is implemented.
- `main` status (2026-03-09): Phase 1 is not merged yet.
- Detailed phases and implementation notes are tracked in `docs/planning/analytics-rollout-plan.md`.
- Phase 0 planning decisions are documented/locked in the analytics plan:
  - GitHub Pages baseline
  - `musifer.studio` primary / `musifer.art` backup domain direction
  - production-only initial rollout scope
  - finalized privacy/disclosure reference at `docs/planning/privacy-policy-draft.md`
- Phase 1 implemented contract on `experimental`:
  - `ANALYTICS_ENABLED=true`
  - `ANALYTICS_PROVIDER=umami`
  - `ANALYTICS_DOMAIN=musifer.studio`
- Hosting context for analytics decisions:
  - Repo-documented deployment path remains GitHub Pages via Actions.
  - Netlify project linkage exists as `creative-cassata-f39fb9` (dashboard visibility context), but no Netlify deploy/config files are currently tracked in this repo.

## CMS notes
- CMS config is in `src/admin/config.yml`.
- `/admin` is intentionally not linked in public navigation until CMS access checks are complete.
- Local CMS test flow:
  1. `npm run start`
  2. `npm run cms:local`
  3. Open `http://localhost:8080/admin/`

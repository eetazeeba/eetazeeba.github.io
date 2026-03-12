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
1. `npm ci`
2. `npm run start`
3. Open `http://localhost:8080/`
4. Build production output with `npm run build`

Use `npm ci` for normal setup and branch sync on an existing clone. Use `npm install` only when intentionally adding or updating dependencies and commit the resulting lockfile change.

## Key directories
- `src/`: Eleventy templates, includes, and route pages
- `src/_assets/`: source assets published as `/CSS`, `/Images`, and `/scripts`
- `content/`: Content Management System (CMS) content entries (blog, lessons, profiles)
- `scripts/cms/`: CMS validation/index scripts
- `docs/`: planning, migration, and architecture notes
- `.github/workflows/`: Continuous Integration and Continuous Delivery/Deployment (CI/DI) workflows (including Pages deploy)

## Documentation map
- [`docs/workflows/two-device-development-routine.md`](docs/workflows/two-device-development-routine.md): day-to-day branch, device, and dependency routine
- [`docs/planning/README.md`](docs/planning/README.md): planning-folder index and scope notes
- [`docs/cms-content-spec.md`](docs/cms-content-spec.md): content model and field rules
- [`docs/sitemap.md`](docs/sitemap.md): route and information architecture notes
- [`docs/planning/responsive-layout-navigation-refresh-plan.md`](docs/planning/responsive-layout-navigation-refresh-plan.md): responsive/nav refresh roadmap
- [`docs/audits/css-refresh-conflict-audit.md`](docs/audits/css-refresh-conflict-audit.md): CSS audit and implementation risks
- [`docs/planning/jamstack-main-migration-plan.md`](docs/planning/jamstack-main-migration-plan.md): branch consolidation and cutover history
- [`docs/high-level-project-tracking.md`](docs/high-level-project-tracking.md): operational status and ongoing tracking notes
- [`docs/planning/plausible-feasibility-and-implementation-plan.md`](docs/planning/plausible-feasibility-and-implementation-plan.md): analytics feasibility review and proposed rollout phases (planning only)
- [`docs/planning/domain-direction-musifer-studio-art.md`](docs/planning/domain-direction-musifer-studio-art.md): current domain direction (`musifer.studio` primary, `musifer.art` backup/protection)

## Hosting through GitHub Pages
- Deployment workflow: `.github/workflows/deploy-pages.yml`
- Expected model: build `_site` from `main`, then deploy via Actions.
- Helpful docs:
  - [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
  - [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
  - [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## Analytics investigation status (Plausible)
- Current status on `main` (2026-03-09): investigated/planning only; no Plausible script or analytics wrapper is implemented in tracked source.
- Investigation notes and proposed phases are tracked in `docs/planning/plausible-feasibility-and-implementation-plan.md`.
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

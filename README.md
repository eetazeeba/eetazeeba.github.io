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
- [`docs/cms-content-spec.md`](docs/cms-content-spec.md): content model and field rules
- [`docs/sitemap.md`](docs/sitemap.md): route and information architecture notes
- [`docs/responsive-layout-navigation-refresh-plan.md`](docs/responsive-layout-navigation-refresh-plan.md): responsive/nav refresh roadmap
- [`docs/audits/css-refresh-conflict-audit.md`](docs/audits/css-refresh-conflict-audit.md): CSS audit and implementation risks
- [`docs/jamstack-main-migration-plan.md`](docs/jamstack-main-migration-plan.md): branch consolidation and cutover history
- [`docs/high-level-project-tracking.md`](docs/high-level-project-tracking.md): operational status and ongoing tracking notes

## Hosting through GitHub Pages
- Deployment workflow: `.github/workflows/deploy-pages.yml`
- Expected model: build `_site` from `main`, then deploy via Actions.
- Helpful docs:
  - [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
  - [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
  - [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## CMS notes
- CMS config is in `src/admin/config.yml`.
- `/admin` is intentionally not linked in public navigation until CMS access checks are complete.
- Local CMS test flow:
  1. `npm run start`
  2. `npm run cms:local`
  3. Open `http://localhost:8080/admin/`

# Wireframe Playground

This folder is an isolated local preview utility for JSX wireframes.

It is intentionally separate from the production Eleventy site and GitHub Pages build pipeline. Nothing in this workspace is wired into the main site build or routing.

## Branch policy

- This workspace is `experimental`-only.
- `main` is protected by `.github/workflows/guard-experimental-only-main.yml`, which fails if `docs/wireframe-playground` appears on `main`.

## Local usage

From this folder:

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal (usually `http://localhost:5173`).

## Current default wireframe

- `src/services_page_wireframe.jsx`
- `src/App.jsx` currently renders this file by default.

## Styling note

- Wireframes in this playground use Tailwind utility classes for structure/layout.
- Keep list bullets semantic (`<ul>/<li>`) and avoid manually prefixing list text with bullet glyphs.

## Adding future wireframes

Drop new wireframes into `src/`, for example:

- `src/blog_page_wireframe.jsx`
- `src/contact_page_wireframe.jsx`

Switch the default preview by changing the import/render in `src/App.jsx`.

## Preview.js note

No `__previewjs__/Wrapper.jsx` is currently required in this workspace.

If future wireframes need shared global CSS, providers, or mock context, add `__previewjs__/Wrapper.jsx` then.

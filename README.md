# Eleventy experiment

Run this experimental Eleventy site locally from the `11ty/` folder.

Install dependencies and start the dev server:

```bash
cd 11ty
npm install
npm start
```

The site input is `src/` and the output will be `_site/`.

Notes:
- This is an experimental branch that copies the existing site markup into an Eleventy template and an `_includes/header.html` partial.
- CSS and images are copied into `src/CSS` and `src/Images` for passthrough.

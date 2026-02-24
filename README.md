Musifer — Frontend quick setup

Overview
- This project contains a minimal `index.html`, `styles.scss`, and a compiled `styles.css`.
- `package.json` provides npm scripts to build or watch the SCSS file.

Quick setup
1. Install Node.js + npm (if not installed): https://nodejs.org/
2. From the project folder, install dev dependencies:

```bash
npm install
```

3. Build the CSS once:

```bash
npm run build:css
```

4. Watch SCSS for changes (auto-compile):

```bash
npm run watch:css
```

5. Start a local website server (works on macOS, Windows, Linux):

```bash
npm start
```

Then open:

```text
http://127.0.0.1:8080
```

One-click launchers
- macOS: double-click `launch-local-site.command`
- Windows: double-click `launch-local-site.bat`
- Both wrappers start the same local server and print the URL to open.

What is npm (brief)
- `npm` is the Node package manager. It installs packages, manages versions, and runs scripts defined in `package.json`.
- `package.json` is the project's manifest: metadata, dependencies, and scripts.

Useful commands
- `npm init` — create a new `package.json` interactively.
- `npm install <pkg>` — install a package and add to `dependencies`.
- `npm install -D <pkg>` or `npm install --save-dev <pkg>` — install a devDependency.
- `npm run <script>` — run a script from the `scripts` section of `package.json`.
- `npx <pkg>` — run a binary from a package without installing globally.

Why use npm here
- Keeps the SCSS compiler (`sass`) as a project-local dependency so collaborators use the same version.
- Scripts provide simple, reproducible commands (`npm run build:css`, `npm run watch:css`).

Reference links
- npm docs: https://docs.npmjs.com/
- Sass install & docs: https://sass-lang.com/install
- Node.js: https://nodejs.org/

The `npm start` command runs `start-local-site.js`, a cross-platform local HTTP server script in this project.

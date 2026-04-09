# Two-Device Development Routine

Use this routine when moving between the macOS and Windows development machines for this repo.

## Baseline

### macOS
- Node `24.13.1`
- npm `11.11.1`
- Git `2.50.1`

### Windows
- Node `24.13.1`
- npm `11.11.1`
- Git `2.46.0.windows.1`

### Notes
- `main` is the clean sync and deploy branch.
- Daily work happens on short-lived feature branches.
- Always push the branch you are on before switching devices.
- Resume the same branch on the other device.
- Use `npm ci` for normal installs on an existing clone.
- Use `npm install` only when intentionally changing dependencies.
- `experimental` is a sandbox branch for deliberate tests, not a second default work branch.
- Decap editorial-workflow PR branches are the controlled exception to the usual terminal-created `feature/*` branch pattern.
- SCSS files in `src/_assets/CSS/` are the source of truth.
- Compiled `styles.css` and `header-nav.css` stay tracked for now and should not be hand-edited.
- GitHub Actions Pages builds should follow `.nvmrc`, so local development and CI share the same Node baseline.

## Starting A New Task

```bash
git checkout main
git fetch origin
git pull --ff-only origin main
npm ci
git checkout -b feature/<short-task-name>
```

## Resuming On Another Device

```bash
git fetch origin
git checkout <existing-feature-branch>
git pull --rebase origin <existing-feature-branch>
npm ci
```

If the branch does not exist locally yet:

```bash
git fetch origin
git checkout -b <existing-feature-branch> --track origin/<existing-feature-branch>
npm ci
```

## Before Switching Devices

```bash
git status
git add -A
git commit -m "Describe the checkpoint"
git push -u origin HEAD
```

Do not leave the current device with unpushed branch work if you expect to continue on the other machine.

## Merge A Feature Branch Back Into `main`

Use this when a feature branch is ready to come back into `main` through the repo's GitHub-style pull-request flow. GitHub references:

- [GitHub flow](https://docs.github.com/get-started/quickstart/github-flow)
- [About protected branches](https://docs.github.com/enterprise/admin/guides/developer-workflow/about-protected-branches-and-required-status-checks)
- [About pull request merges](https://docs.github.com/articles/about-pull-request-merge-squashing)
- [Merging a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request?tool=cli)

### Decide which pre-PR path you need

Use `Path A` if the feature branch only exists on your machine and has not been pushed yet.

Use `Path B` if the feature branch already exists on `origin` and you need to sync it before opening the pull request.

Both paths end by rebasing onto `origin/main`. If that rebase stops with conflicts, resolve or abort the rebase before moving on to the shared checks.

### Path A: local-only branch

```bash
git checkout <existing-feature-branch>
git push -u origin HEAD
git fetch origin
git rebase origin/main
```

If `git rebase origin/main` stops with conflicts, finish that rebase before continuing.

### Path B: branch already on `origin`

```bash
git fetch origin
git checkout <existing-feature-branch>
git pull --rebase origin <existing-feature-branch>
git rebase origin/main
```

If `git rebase origin/main` stops with conflicts in either path, use this checkpoint before continuing:

```bash
git status
# resolve conflicted files
git add <resolved-file>
git rebase --continue
# or, to abandon the rebase:
git rebase --abort
```

### Shared checks before opening the PR

```bash
npm ci
npm run build
npm run cms:validate
git push
```

If a content change requires a refreshed index, run `npm run cms:check` manually before the final push and include the tracked `content/_index.json` update in the branch.

### CMS-authored pull requests

Decap's editorial workflow may create repo-side PR branches that were not created from the terminal.

Treat those branches as a controlled exception to the normal `feature/*` routine, while keeping the same review gates, `main` merge target, and **Squash and merge** expectation.

If a browser-authored CMS PR changes content and needs a refreshed index, pull that PR branch locally before merge, run `npm run cms:check`, and push the resulting `content/_index.json` update back to the same PR branch.

### Open, review, and squash merge the PR

1. Open the pull request from the feature branch into `main`.
2. Wait for `guard-main` and `validate-main-pr` to pass.
3. Address review feedback and re-request review if the changes are substantial.
4. Merge with **Squash and merge**.
5. Delete the feature branch after merge.

Deployment still happens only after the squash merge lands on `main`.

### Quick reference: usual branch-already-on-`origin` case

Use this only once the full flow above feels familiar:

```bash
git fetch origin
git checkout <existing-feature-branch>
git pull --rebase origin <existing-feature-branch>
git rebase origin/main
npm ci
npm run build
npm run cms:validate
git push
```

After that, follow the single PR review and **Squash and merge** sequence above.

## Recovery Commands

### Discard local drift on `main`

Use this only when you want local `main` to match `origin/main` exactly.

```bash
git checkout main
git fetch origin
git reset --hard origin/main
npm ci
```

### Handle a rebase conflict

```bash
git status
```

Resolve the conflicted files, then continue:

```bash
git add <resolved-file>
git rebase --continue
```

If the rebase should be abandoned instead:

```bash
git rebase --abort
```

## Routine Summary

1. Start from updated `main`.
2. Create or resume one short-lived feature branch.
3. Use `npm ci` after pulling changes onto an existing clone.
4. Open a pull request back into `main`, pass checks, and use **Squash and merge**.
5. Push the current branch before leaving a device.
6. Resume the same branch on the other machine.
7. Keep `main` clean and keep `experimental` reserved for intentional sandbox work.

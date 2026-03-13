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

## Open A Pull Request Back To `main`

This repo follows a GitHub-style branch flow: open a pull request into `main`, let required checks finish, use review to settle the last changes, then merge with **Squash and merge**. GitHub references:

- [GitHub flow](https://docs.github.com/get-started/quickstart/github-flow)
- [About protected branches](https://docs.github.com/enterprise/admin/guides/developer-workflow/about-protected-branches-and-required-status-checks)
- [About pull request merges](https://docs.github.com/articles/about-pull-request-merge-squashing)
- [Merging a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request?tool=cli)

## Pull Request Decision Tree

Before opening the pull request, use this decision tree:

1. If the feature branch only exists locally, push it to `origin` first.
2. If the feature branch already exists on `origin`, sync it with both `origin/<branch>` and `origin/main`.
3. After either path, run the shared pre-pull-request checks and push the final branch state.

### Path A: first push for a local-only branch

```bash
git checkout <existing-feature-branch>
git push -u origin HEAD
```

### Path B: branch already exists on `origin`

```bash
git fetch origin
git checkout <existing-feature-branch>
git pull --rebase origin <existing-feature-branch>
git rebase origin/main
```

### Shared pre-pull-request checks

```bash
npm ci
npm run build
npm run cms:validate
git push
```
## Rebase-conflict Resolution

If `git rebase origin/main` reports conflicts, use the rebase-conflict routine below, then run the shared pre-pull-request checks and push again.

Pull request routine:

1. Open the pull request from the feature branch into `main`.
2. Wait for `guard-main` and `validate-main-pr` to pass.
3. Address review feedback and re-request review if the changes are substantial.
4. Merge with **Squash and merge**.
5. Delete the feature branch after merge.

Notes:

- Deployment still happens only after the squash merge lands on `main`.
- `cms:index` is not a required PR check yet because it rewrites tracked `content/_index.json` with a generated timestamp.
- If a content change requires a refreshed index, run `npm run cms:check` manually before merging and include the resulting tracked index update in the branch.

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

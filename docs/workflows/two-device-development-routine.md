# Two-Device Development Routine

Use this routine when moving between the macOS and Windows development machines for this repo.

## Baseline

### macOS
- Node `24.13.1`
- npm `11.8.0`
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
- GitHub Actions still deploys with Node `20`. Local development is standardized on Node `24.13.1`, so keep that mismatch in mind until the workflow is updated.

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
4. Push the current branch before leaving a device.
5. Resume the same branch on the other machine.
6. Keep `main` clean and keep `experimental` reserved for intentional sandbox work.

# Prompt Library

Reusable Copilot prompt files for this repository.

## Prompt files
- `core-execution.prompt.md`: default prompt for scoped implementation work.
- `bugfix.prompt.md`: targeted defect and regression fixes.
- `docs-sync.prompt.md`: align canonical docs with current behavior and workflow.
- `docs-audit-report.prompt.md`: targeted Audit Mode reporting for drift, decision, and consolidation analysis.
- `plan-only.prompt.md`: analysis and implementation planning with no edits.
- `gh-write-preflight.prompt.md`: GitHub mutation preflight and minimal write execution with deterministic fallback behavior.

## Usage guidance
- Use `.github/copilot-instructions.md` for always-on repository guidance.
- Use the most specific prompt that matches the task.
- Keep requests scoped and reviewable.
- If no prompt fits, start with `core-execution.prompt.md`.

## Maintenance notes
- Keep this folder small and high-signal.
- Remove or merge stale and overlapping prompts.
- Update `docs/planning/copilot-prompt-tooling.md` when prompt structure changes.
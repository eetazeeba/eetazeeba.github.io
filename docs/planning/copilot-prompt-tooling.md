# Copilot Prompt Tooling Baseline

Status
- Primary: active
- Updated: 2026-05-12
- Current reference: .github/copilot-instructions.md
- Note: Active prompt-tooling baseline.


Purpose
- Provide a reusable, repo-native prompt cookbook for GitHub Copilot and similar AI assistants used in VS Code.
- Improve session consistency by standardizing prompt structure, scope framing, and validation/reporting expectations.
- Keep this document as a working reference that can evolve with real usage.

Operational context
- Baseline planning and working guidance.
- Canonical placement for prompt-tooling notes moved from `docs/WORKING/` to `docs/planning/` on 2026-04-20.
- MVP prompt workflow structure is now implemented in `.github/`:
  - `.github/copilot-instructions.md`
  - `.github/prompts/README.md`
  - `.github/prompts/core-execution.prompt.md`
  - `.github/prompts/bugfix.prompt.md`
  - `.github/prompts/docs-sync.prompt.md`
  - `.github/prompts/docs-audit-report.prompt.md`
  - `.github/prompts/plan-only.prompt.md`

## Source-of-truth boundaries
- Repo-wide behavioral guardrails belong in `AGENTS.md`.
- Operational branch/workflow model belongs in `docs/high-level-project-tracking.md`.
- Prompt-library planning and usage guidance belongs in this document.
- Implemented Copilot prompt assets should live in `.github/` (`.github/copilot-instructions.md` and `.github/prompts/`).

## Working model
- Use a two-layer model:
  - Always-on behavior layer: `.github/copilot-instructions.md`
  - Task-specific execution layer: `.github/prompts/*.prompt.md`
- Keep prompt files focused on one job each.
- Prefer fewer high-signal prompts over a large overlapping set.

## Recommended repository layout
```text
.github/
├─ copilot-instructions.md
└─ prompts/
   ├─ README.md
   ├─ core-execution.prompt.md
   ├─ bugfix.prompt.md
   ├─ docs-sync.prompt.md
  ├─ docs-audit-report.prompt.md
  └─ plan-only.prompt.md
```

Phase 2 (only if usage warrants it):
- `refactor.prompt.md`
- `ui-polish.prompt.md`
- `audit.prompt.md`
- `workflow-review.prompt.md`

## Prompt cookbook quick index
- `core-execution.prompt.md`: default implementation prompt for scoped tasks.
- `bugfix.prompt.md`: defect/regression isolation and minimal-risk fixes.
- `docs-sync.prompt.md`: reconcile canonical documentation with current behavior/workflow.
- `docs-audit-report.prompt.md`: targeted Audit Mode documentation reports (drift, decision, consolidation).
- `plan-only.prompt.md`: analysis and task decomposition with no edits.

## Baseline prompt shape (wiki pattern)
Every prompt should include these fields in this order:
1. Task
2. Goal
3. Context
4. Scope (in/out)
5. Files to inspect first
6. Constraints
7. Validation
8. Report-back format

Why this shape:
- Reduces prompt drift between sessions.
- Improves reproducibility and reviewability.
- Makes it easier to compare outcomes across different assistants.

## Draft prompt templates

### Core execution template
```md
# Core execution

Task: [short task title]

Goal:
[What should be accomplished, in plain language.]

Context:
- Project/workspace: [project or repo name]
- Relevant area: [feature/page/module]
- Background: [brief facts needed to avoid bad assumptions]

Scope:
- In scope:
  - [item]
- Out of scope:
  - [item]

Files to inspect first:
- [path]
- [path]

Constraints:
- Prefer targeted fixes over broad rewrites.
- Preserve existing behavior unless change is intentional.
- Follow project conventions and keep changes reviewable.

Validation:
- [check]
- [check]

Report back with:
- summary of changes
- files changed
- validation performed
- risks/follow-ups
```

### Bugfix template
```md
# Bugfix

Task: Fix [bug name]

Goal:
Resolve [specific bug] without changing intended behavior elsewhere.

Current issue:
[What is happening]
[What should happen instead]

Files to inspect first:
- [path]
- [path]

Scope:
- In scope: targeted fix and nearby support changes only
- Out of scope: unrelated cleanup, broad refactors

Validation:
- Verify bug no longer reproduces
- Verify closely related behavior still works

Report back with:
- root cause
- files changed
- validation performed
- remaining risks
```

### Docs sync template
```md
# Documentation sync

Task: Update documentation for [topic]

Goal:
Bring canonical documentation in line with current repo behavior/workflow.

Source files to inspect first:
- [path]
- [path]

Constraints:
- Prefer canonical docs over temporary notes.
- Keep updates concise and specific.

Validation:
- Confirm docs match current implementation/workflow references.

Report back with:
- docs changed
- what was clarified/corrected
- stale docs needing follow-up
```

### Plan-only template
```md
# Plan only

Task: Plan implementation for [feature/task]

Goal:
Assess the lowest-risk path before editing.

Plan mode:
- Do not make edits.

Please provide:
1. Likely files involved
2. Most likely implementation approach
3. Risks, unknowns, dependency checks
4. Whether to split into smaller steps
5. Recommended first execution prompt
```

## Discoverability and maintenance notes
- Keep this document as the planning index for prompt-library evolution.
- When `.github` prompt files are added or changed, update this file and `docs/high-level-project-tracking.md` references in the same task.
- If a prompt becomes stale or duplicates another prompt, merge or remove it rather than adding new overlap.

## Open decisions
- Whether to include all phase-2 prompts in initial rollout or keep MVP-only.
- Whether to add issue-template hints that map bug/polish reports to specific prompts.
- Whether to standardize optional variables/tokens for recurring prompt fields.

# AGENTS.md

## Purpose

This file defines repo-local working preferences for Codex-style coding agents and similar assistants operating in this repository.

## Scope
This repo is primarily worked on in VS Code and uses Codex for implementation support.
Default stack: HTML, CSS, JavaScript.
Favor correctness, clarity, maintainability, and compatibility with the existing codebase.

## Priority Order
1. Correctness
2. Clarity
3. Maintainability
4. Compatibility with the existing codebase
5. Speed of implementation

## Environment
- Baseline: Node 24.13.1, npm 11.x, Git over HTTPS.
- Prefer fnm-compatible Node management where relevant.
- For existing clones and normal branch switching, prefer `npm ci`.
- Use `npm install` only when intentionally changing dependencies.
- Avoid unnecessary lockfile churn or cross-device dependency drift.

## HTML / CSS / JavaScript
- Prefer semantic HTML and maintain accessibility.
- Use proper headings, labels, keyboard support, alt text, focus states, and sensible ARIA.
- Write CSS that is organized, scalable, and resistant to accidental side effects.
- Prefer reusable patterns and predictable class naming.
- In JavaScript, prefer modern, readable syntax and reduce DOM/event complexity when possible.
- Before proposing generated-asset cleanup, verify actual script wiring.
- If Sass or compiled CSS is involved, verify whether the build actually compiles it or only passes through tracked output.

## Safe Defaults

- Treat the checked-out repository contents as the source of truth over earlier generated notes.
- Treat GitHub Issues + GitHub Project as the canonical backlog/issue intake system; treat `docs/issues/` as historical archive context unless a task explicitly reopens that workflow.
- When reporting file references in saved docs, optimize for portability and human readability first.

## Workflow
- Treat `main` as the clean sync/deploy branch.
- Treat `experimental` as sandbox-only.
- Use short-lived feature branches for normal work.
- Before switching devices, prefer committing and pushing the active branch.
- Resume the same branch on the other device rather than recreating work from `main`.

## Planning Taxonomy
- Default project-management vocabulary is `Saga` > `Arc` > `Episode`.
- Use an `Arc` for each major migration/workstream chunk.
- Use `Episode` for actionable implementation steps inside an `Arc`.
- Completion notes should state outcomes in this form: `Arc X <name> is complete after Episodes ... were completed.`

## Expected Task Flow
For non-trivial tasks:
1. State a brief plan.
2. Make the smallest reliable change.
3. Validate with the most relevant available checks.
4. Summarize:
   - files changed
   - validation performed
   - documentation updated
   - follow-up items / risks

## Implementation Rules
- Prefer targeted fixes over broad rewrites.
- Preserve existing conventions unless there is a clear reason to improve them.
- Preserve behavior during refactors unless behavior change is intentional.
- Break larger changes into small, reviewable steps.
- Be explicit about affected files, tradeoffs, and regression risks.
- Avoid unnecessary dependencies.

## Documentation
- Treat canonical docs as the source of truth, not temporary plan/audit outputs.
- If behavior, workflow, tooling, provider choice, or project status changes, update the relevant canonical docs in the same task when safe to do so.
- Mark snapshot or audit docs clearly if they are not source-of-truth documents.
- If stale docs are discovered outside task scope, call them out explicitly in the completion notes.


## Documentation Style
- Prefer concise, readable Markdown that still works well in plain text.
- Use normal Markdown headings, paragraphs, and flat bullet lists.
- Avoid embedding tool-only path syntax that depends on a specific chat client renderer.
- If a note references repo files from a nested folder, use correct relative paths from that file's location.

## Markdown Note Output
When generating Markdown files intended for local reading in VS Code:

- Use standard relative Markdown links, not absolute filesystem links.
- Do not use absolute local paths such as `/h:/...` as link targets.
- Keep line numbers as plain text after the link, for example:
  `[README.md](docs/../README.md) line 8`
- Prefer human-readable link labels over tool-specific file reference syntax.
- Assume VS Code Markdown Preview compatibility is the default target unless the user explicitly asks for another format.
- Use plain UTF-8 text and avoid mojibake, broken smart quotes, or mixed-encoding artifacts.

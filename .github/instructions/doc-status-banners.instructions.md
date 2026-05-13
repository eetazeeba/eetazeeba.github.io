---
name: Doc Status Banners
description: "Use when classifying docs under docs/ or updating documentation status labels and top-of-file status banners (source-of-truth, active, deferred, superseded, historical) with minimal churn."
applyTo: docs/**/*.md
---
# Documentation Status Banner Guidelines

Use this instruction when reviewing or editing documentation status in `docs/`.

## Goal

Keep top-of-file status signaling consistent so readers can quickly identify whether a document is current guidance, in-progress support material, deferred work, superseded material, or historical context.

## Scope

- Applies to Markdown docs in `docs/`.
- Focus on status labels and status-note consistency.
- Prefer small, reviewable diffs.

## Operating Mode Assumption

When this instruction is used with Documentation Steward:

- Default to Audit Mode unless the user explicitly requests cleanup implementation.
- In Audit Mode, do not edit files; inspect and recommend only.
- In Cleanup Mode, apply only small, reviewable status-label and banner updates.

## Primary Statuses

Use one primary status per document unless mixed content makes section-level labels necessary.

| Primary status | Meaning | Typical use |
| --- | --- | --- |
| `source-of-truth` | Canonical current reference for decisions or execution | High-level trackers, active canonical specs |
| `active` | Currently valid and in use, but not canonical across all decisions | Working plans and implementation notes still in force |
| `deferred` | Intentionally paused and expected to resume later | Parked workstreams with remaining actions |
| `superseded` | Replaced by newer guidance | Older plan versions or docs replaced by newer references |
| `historical` | Retained for context and traceability; not current guidance | Snapshots, archives, completed historical notes |

### Allowed Secondary Qualifiers

Use as optional qualifiers when they add clarity:

- `draft`
- `snapshot`
- `needs-review`

Do not use these qualifiers as a replacement for a primary status.

## Banner Placement and Shape

Place the status block directly under the first `#` heading and before other body sections.

Use this structure:

```md
Status
- Primary: <source-of-truth|active|deferred|superseded|historical>
- Secondary: <optional; draft/snapshot/needs-review>
- Updated: YYYY-MM-DD
- Current reference: <relative path to canonical doc, if applicable>
- Note: <short explanation for readers>
```

If only one line is needed, this compact form is allowed:

```md
Status note: Primary=<status>; Updated=YYYY-MM-DD; <short reader guidance>
```

## Classification Rules

When asked to classify docs, follow this order:

1. Identify canonical references first (`source-of-truth`).
2. Mark docs still valid but non-canonical as `active`.
3. Mark intentionally paused work as `deferred`.
4. Mark replaced docs as `superseded` and point to the replacement.
5. Mark retained context records as `historical`.

If uncertain, use `needs-review` as a secondary qualifier and explicitly flag `needs-human-decision`.

## Mixed-Content Documents

If a document is mostly active but contains retired sections:

- Keep one document-level primary status.
- Add section-level labels such as "Superseded guidance" where needed.
- Do not force whole-document reclassification when section-level labeling is enough.

## Safety Rails

- Ask before deleting documentation.
- Ask before moving large directory trees.
- Ask before changing public-facing README positioning.
- Prefer consolidation and status-note fixes over file moves.
- Preserve decision history, unresolved questions, and links to related issues/PRs.
- Avoid cosmetic churn.

## Status-Label-Fix-Only Mode

For prompts like:

"Classify all docs under docs into source-of-truth, active, deferred, superseded, and historical, then recommend status-label fixes only."

Do this:

1. Inventory files.
2. Classify each file.
3. Report mismatches and recommended label/banner fixes.

Mode behavior for this request pattern:

- Treat it as Audit Mode by default.
- Only switch to Cleanup Mode when the user explicitly asks to implement recommended changes.

Do not do this unless explicitly requested:

- No broad content rewrites.
- No architecture changes.
- No aggressive archive moves.
- No deletions.

## Output Contract

When reporting results, separate:

- `Found`: what was observed
- `Changed`: what was edited
- `Recommended`: what should be updated next

Include file paths, rationale for each status decision, unresolved questions, and a short QA checklist.

## Banner Examples

### Superseded banner

```md
Status
- Primary: superseded
- Updated: 2026-05-12
- Current reference: docs/high-level-project-tracking.md
- Note: This document is retained for traceability; follow the current reference for active decisions.
```

### Deferred banner

```md
Status
- Primary: deferred
- Secondary: needs-review
- Updated: 2026-05-12
- Note: Workstream intentionally paused; resume only after dependency decisions are finalized.
```

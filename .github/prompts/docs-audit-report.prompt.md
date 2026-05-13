# Documentation audit report

Task: Run a targeted Documentation Steward audit for [report type] on [scope].

Goal:
Produce a structured Audit Mode report for documentation drift, decision traceability, or consolidation opportunities without making cleanup edits.

Audit mode (default):
- Do not edit files.
- Inspect relevant docs only.
- Classify files by purpose/status.
- Return findings plus recommended cleanup sequence.

Report type (choose one):
- `drift`: stale, conflicting, duplicate, or orphaned documentation
- `decision`: missing rationale, unclear ownership, unresolved decisions, weak source-of-truth links
- `consolidation`: overlapping plans/notes that should be merged or relabeled

Scope:
- In scope: docs-related files for the selected topic.
- Out of scope: code refactors and broad documentation rewrites.

Files to inspect first:
- docs/high-level-project-tracking.md
- docs/planning/README.md
- docs/audits/README.md
- [additional target paths for this run]

Target output location guidance (for saved reports):
- Drift: docs/audits/weekly-repo-sweep/YYYY-MM-DD-[topic]-drift-audit.md
- Decision: docs/audits/decision/YYYY-MM-DD-[topic]-decision-audit.md
- Consolidation: docs/audits/consolidation/YYYY-MM-DD-[topic]-consolidation-audit.md

Delivery mode:
- Default: return report in chat only (no file edits).
- If user explicitly asks to save report: create one report file at the mapped location above.

Validation:
- Confirm each finding cites inspected files.
- Distinguish verified findings from assumptions.
- Flag decisions requiring human review.

Report back with:
- `Found`: status/classification table and concrete issues
- `Recommended`: ordered cleanup sequence with risk notes
- `Needs human decision`: unresolved ownership/source-of-truth choices
- `Suggested report path`: where to save the report under docs/audits
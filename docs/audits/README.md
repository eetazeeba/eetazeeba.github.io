# Audits Index

Status
- Primary: active
- Updated: 2026-05-12
- Current reference: docs/high-level-project-tracking.md
- Note: Source index for where documentation audit reports should be stored.

Purpose
- Keep audit reports organized by report intent.
- Reduce drift between one-off notes and canonical audit trails.
- Make report destinations predictable for reusable prompts.

## Report hierarchy
- `docs/audits/weekly-repo-sweep/`: drift-focused sweep reports and broad repo review snapshots.
- `docs/audits/decision/`: decision-traceability audits and source-of-truth decision-gap reports.
- `docs/audits/consolidation/`: overlap and consolidation candidate audits for planning/working notes.
- `docs/audits/seo/`: SEO audits.
- `docs/audits/archive/`: archived/superseded audit artifacts kept for traceability.

## Naming conventions
- Drift report: `YYYY-MM-DD-[topic]-drift-audit.md`
- Decision report: `YYYY-MM-DD-[topic]-decision-audit.md`
- Consolidation report: `YYYY-MM-DD-[topic]-consolidation-audit.md`

## Operating notes
- Default documentation audit runs are Audit Mode and should not edit files.
- Save reports to disk only when explicitly requested.
- Prefer adding new reports over rewriting old reports.
- If an audit is superseded, keep history and add an archive note rather than deleting.
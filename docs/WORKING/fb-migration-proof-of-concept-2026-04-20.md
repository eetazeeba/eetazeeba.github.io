# FB Migration Proof Of Concept

Status
- Primary: historical
- Secondary: snapshot
- Updated: 2026-05-12
- Current reference: docs/high-level-project-tracking.md
- Note: Working-note completion record.


Purpose
- Provide manual-ready GitHub issue drafts for a small proof-of-concept migration from the legacy FB log into GitHub Issues.
- Keep the scope intentionally small: two well-scoped legacy FB items plus one new test `[Polish]` issue for arc/phase wording cleanup.

Scope
- Migrated proof-of-concept items:
  - `FB-001`
  - `FB-006`
- New test issue:
  - `Phase verbiage clean up`

Notes
- Source log for migrated items: [deferred-polish-feedback-log.md](../issues/deferred-polish-feedback-log.md).
- GitHub CLI baseline was completed in-session and these draft issues were created via `gh issue create`.
- These drafts are formatted to match [.github/ISSUE_TEMPLATE/polish-feedback.yml](../../.github/ISSUE_TEMPLATE/polish-feedback.yml).
- Suggested labels beyond the template defaults are included as triage guidance.

Execution checkpoint (`2026-04-20`)
- Created: [#13](https://github.com/eetazeeba/Musifer-site-gen/issues/13) (`[Polish]: [FB-001] ...`) — correct issue
- Created: [#15](https://github.com/eetazeeba/Musifer-site-gen/issues/15) (`[Polish]: [FB-006] ...`)
- Created: [#16](https://github.com/eetazeeba/Musifer-site-gen/issues/16) (`[Polish]: Phase verbiage clean up ...`)
- Malformed duplicate: [#14](https://github.com/eetazeeba/Musifer-site-gen/issues/14) — created by a broken heredoc/multiline shell entry; supersedes #13 in GitHub numbering but is the incorrect copy. Should be closed as duplicate of #13.

Note on issue numbering error: The in-session execution note originally recorded #13 as the duplicate and #14 as the correct issue. This was reversed. #13 was the first successful creation attempt; #14 was a malformed artifact of the heredoc failure.

## Draft 1

Template
- `polish-feedback.yml`

Suggested title
- `[Polish]: [FB-001] Compact drawer parent/toggle target-size refinement`

Suggested labels after creation
- `type:polish`
- `needs-triage`
- `source:migrated`
- `area:nav`
- `arc:nav-refresh`
- `component:compact-drawer`

Suggested field values
- Feedback ID: `FB-001`
- Status: `NEW`
- Arc: `Arc - Navigation Refresh`
- Component: `compact-drawer`
- Priority: `P1`
- Area / Surface: `nav, compact-drawer, dropdown-toggle`
- Likely Root Area: `responsive behavior`

Issue body draft

Problem Statement

In compact drawer mode, users can click in the gap between parent label and toggle icon and unintentionally navigate to the parent page.

Reproduction / Trigger Conditions

1. Open the compact drawer menu in a hamburger-visible state.
2. Click the space between a parent label and its dropdown toggle icon.
3. Observe parent-page navigation when submenu intent was expected.

User Impact

- Target separation feels unnatural and increases accidental navigation.

Proposed Direction

- Tighten visual and hit-area grouping between parent label and toggle.
- Increase toggle target size where needed while preserving separate controls.
- Keep compact disclosure behavior unchanged.

Acceptance Criteria

1. The gap between label and toggle no longer feels like an accidental navigation trap.
2. Parent link and toggle remain distinct, keyboard-focusable controls.
3. No regressions in compact accordion behavior or desktop dropdown behavior.

Evidence / References

- Migrated from [deferred-polish-feedback-log.md](../issues/deferred-polish-feedback-log.md) line 100.

Files Likely Impacted

- `src/_assets/CSS/_nav.scss`
- `src/_assets/CSS/header-nav.css`

Notes / Constraints

- Source: `user testing feedback`
- Legacy related phase text: `Phase 3 follow-up polish backlog`
- Planning-only item for a future polish pass; no behavior rewrite.

## Draft 2

Template
- `polish-feedback.yml`

Suggested title
- `[Polish]: [FB-006] Blog article hero metadata low-contrast readability`

Suggested labels after creation
- `type:polish`
- `needs-triage`
- `source:migrated`
- `area:blog`
- `arc:blog-rollout`
- `component:blog-article-hero`

Suggested field values
- Feedback ID: `FB-006`
- Status: `NEW`
- Arc: `Arc - Blog Rollout`
- Component: `blog-article-hero`
- Priority: `P1`
- Area / Surface: `blog, article-hero, metadata, contrast`
- Likely Root Area: `CSS layout`

Issue body draft

Problem Statement

The article hero metadata panel uses a low-contrast combination of background treatment and metadata text styling, making the bucket, reading time, publish date, and author hard to read.

Reproduction / Trigger Conditions

1. Open a generated blog article page such as `/blog/guides/writing-better-hooks/`.
2. Inspect the metadata panel in the hero at large-screen layout widths.
3. Observe weak contrast between the panel background, metadata text, and surrounding hero styling.

User Impact

- Visitors can miss basic article context or struggle to read it, which undermines scanability and perceived polish at the top of the page.

Proposed Direction

- Rebalance the `blog-article-hero__meta` panel treatment so the panel separates clearly from the hero background.
- Increase metadata text contrast without making the panel visually heavier than the article title block.
- Verify the button styling remains legible and visually coherent inside the revised panel.

Acceptance Criteria

1. Bucket, reading time, publish/update date, and author are readable at a glance on the article hero.
2. The metadata panel has clear separation from the surrounding `card-impact` background.
3. The revised styling does not reduce legibility of the bucket CTA button.
4. No regressions are introduced to other shared blog card treatments that reuse nearby styles.

Evidence / References

- `docs/issues/screenshots/FB-006-01-blog-article-meta-low-contrast.png`
- Migrated from [deferred-polish-feedback-log.md](../issues/deferred-polish-feedback-log.md) line 239.

Files Likely Impacted

- `src/blog/post.njk`
- `src/_assets/CSS/_components.scss`
- `src/_assets/CSS/styles.css`

Notes / Constraints

- Source: `user screenshot feedback`
- Legacy related phase text: `blog landing + article polish`
- Immediate suspect surface is the translucent `blog-article-hero__meta` background inside `.card-impact`, not the article content body.

## Draft 3

Template
- `polish-feedback.yml`

Suggested title
- `[Polish]: Phase verbiage clean up across GitHub issue schema docs`

Suggested labels after creation
- `type:polish`
- `needs-triage`
- `source:audit`
- `area:unknown`
- `component:unknown`

Suggested field values
- Feedback ID: leave blank
- Status: `NEW`
- Arc: `unknown`
- Component: `issue-templates and label-taxonomy`
- Priority: `P3`
- Area / Surface: `GitHub issue schema docs, labels taxonomy, and planning vocabulary`
- Likely Root Area: `unknown`

Issue body draft

Problem Statement

The repo now uses `Saga` > `Arc` > `Episode` as the default planning taxonomy, but some newly added GitHub schema docs and issue-template values still carry vestigial `Phase` wording or phase-oriented assumptions that conflict with the newer taxonomy.

Reproduction / Trigger Conditions

1. Review the repo’s planning taxonomy in [AGENTS.md](../../AGENTS.md).
2. Compare it against newly added GitHub schema docs and issue-template vocabulary.
3. Identify remaining cases where `Phase` wording is still used for work that should eventually align to the shared `Arc` terminology.

User Impact

- The planning language is less consistent than intended.
- Future issue triage and migration work can become noisier if taxonomy terms are mixed.
- The schema becomes harder to explain and harder to normalize later.

Proposed Direction

- Perform a later refactoring pass focused only on planning vocabulary cleanup.
- Keep the pass narrow: review issue templates, label docs, and nearby migration notes before expanding into older rollout/history documents.
- Preserve historically accurate `Phase` language where it refers to already-recorded implementation history instead of current planning taxonomy.

Acceptance Criteria

1. A later cleanup pass has a clearly scoped tracking issue.
2. The cleanup distinguishes between current planning taxonomy and historical phase language.
3. The pass does not turn into a broad repo-wide wording rewrite without review.

Evidence / References

- [AGENTS.md](../../AGENTS.md)
- [.github/LABELS.md](../../.github/LABELS.md)
- [.github/ISSUE_TEMPLATE/bug-regression.yml](../../.github/ISSUE_TEMPLATE/bug-regression.yml)
- [.github/ISSUE_TEMPLATE/polish-feedback.yml](../../.github/ISSUE_TEMPLATE/polish-feedback.yml)

Files Likely Impacted

- `.github/LABELS.md`
- `.github/ISSUE_TEMPLATE/bug-regression.yml`
- `.github/ISSUE_TEMPLATE/polish-feedback.yml`
- supporting planning docs updated in the same schema pass

Notes / Constraints

- This is intentionally a polish/refactoring follow-up, not a blocker for the current proof-of-concept migration.
- Defer broader historical-document wording cleanup unless a later pass explicitly expands scope.

---

## GitHub CLI environment notes (2026-04-20)

These issues arose during the gh CLI setup session and apply to any future chat-driven terminal execution in this environment.

### Browser auto-open unavailable
- `gh auth login --web` cannot launch a browser automatically because no opener (such as `xdg-open`) is present in the shell environment.
- Not a blocker: the device-code URL can be opened manually.
- Keep in mind for any future interactive auth flows.

### Multiline shell quoting breaks issue creation
- Commands using multiline quoted `--body "..."` content were cut off before completion.
- Issue creation stalled or never completed even when the intended command was otherwise valid.

### Heredoc prompts get stuck
- `cat <<'EOF'` style input leaves the shell in a continuation prompt until interrupted.
- These runs are unreliable for chat-driven terminal execution and required cleanup retries.

### One batch was cancelled before completion
- An attempted issue-creation batch was cancelled mid-run.
- Required a full retry with a safer single-command format.

### Safe invocation patterns
- **Preferred:**
  - `gh issue create --title "..." --body-file /tmp/issue-body.md`
  - `gh issue create --title "..." --body $'first line\nsecond line'`
  - `gh issue create --title "[Bug]: ..." --label "type:bug" --label "needs-triage" --body-file /tmp/issue-body.md`
  - `gh issue create --title "[Polish]: ..." --label "type:polish" --label "needs-triage" --body-file /tmp/issue-body.md`
- **Avoid:**
  - Multiline quoted `--body "..."` (will be cut off)
  - Heredoc input (`cat <<'EOF' ...`) (will hang the shell)

### Template-conformance guardrails
- Treat [.github/ISSUE_TEMPLATE/bug-regression.yml](../../.github/ISSUE_TEMPLATE/bug-regression.yml) and [.github/ISSUE_TEMPLATE/polish-feedback.yml](../../.github/ISSUE_TEMPLATE/polish-feedback.yml) as the intake schema source of truth.
- Bug issue defaults: title prefix `[Bug]: ` with labels `type:bug` and `needs-triage`.
- Polish issue defaults: title prefix `[Polish]: ` with labels `type:polish` and `needs-triage`.
- Keep command examples and migration notes aligned to those defaults to prevent taxonomy drift.

### Preflight checklist (before each issue create)
1. Confirm shell is at a normal prompt (not continuation `>`).
2. Confirm issue type (Bug vs Polish) based on the corresponding template.
3. Confirm title prefix and baseline labels match the selected template.
4. Confirm the body markdown file exists.
5. Run `gh issue create` once and capture the returned issue URL immediately.

### Troubleshooting
- If issue creation stalls or hangs, check for multiline quoting or heredoc usage.
- If the body is truncated, switch to `--body-file` or `$'...'` with `\n` for newlines.
- Always verify the created issue in the GitHub UI for completeness.

### Smoke test result (`2026-04-23`)
- Created with body-file pattern: [#17](https://github.com/eetazeeba/Musifer-site-gen/issues/17) (`[Polish]: Heredoc prompt issue stalls gh issue creation in chat-driven terminal`).
- Verification: issue creation returned a URL and preserved markdown line breaks in the body.
- Constraint discovered: target repository labels currently include `polish` but do not include template-default labels `type:polish` / `needs-triage`.
- Operational fallback used for this run: title prefix `[Polish]:` plus existing repo label `polish`.
- Canonical intake defaults remain unchanged in templates; open a follow-up to restore `type:*` and `needs-triage` label parity in the target repo.

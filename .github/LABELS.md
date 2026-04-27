# GitHub Label Taxonomy

Purpose
- Define the canonical label namespace for GitHub Issues + GitHub Project tracking.
- Keep label values predictable for filtering, board views, and automation.

Naming rules
- Use lowercase labels.
- Use `namespace:value` format.
- Use hyphenated values when multi-word labels are needed.
- Avoid overlapping labels that duplicate each other with slightly different wording.

## type
- `type:bug`: Confirmed defect or regression causing incorrect behavior that should be fixed.
- `type:polish`: Non-breaking UX, visual, interaction, or content refinement work.
- `type:feature`: New capability or meaningful enhancement request.
- `type:docs`: Documentation creation, correction, or clarity improvements.
- `type:chore`: Maintenance or operational work not tied to a user-facing feature.
- `type:question`: Request for project information or clarification before implementation.

## area
- `area:unknown`: Affected surface has not been identified yet.
- `area:nav`: Primary or secondary site navigation behavior and structure.
- `area:about`: About section pages and related content modules.
- `area:services`: Services section pages and related service-detail flows.
- `area:contact`: Contact section pages, forms, and communication paths.
- `area:blog`: Blog landing, article templates, and blog navigation surfaces.
- `area:admin`: CMS/admin configuration, editorial workflows, and admin UI.
- `area:content-model`: Content schema, fields, and structured content relationships.
- `area:analytics`: Event tracking, measurement wiring, and analytics integration.
- `area:seo`: Metadata, indexing, structured data, and search discoverability.
- `area:build`: Build tooling, compilation steps, and local/CI build behavior.
- `area:deploy`: Hosting/deployment pipeline behavior and release flow.
- `area:styles`: CSS/SCSS presentation layers and visual styling behavior.
- `area:scripts`: Client-side scripts and interaction logic.

## source
- `source:user-feedback`: Report originated from user, stakeholder, or client feedback.
- `source:qa-testing`: Issue found through QA pass, test checklist, or validation sweep.
- `source:audit`: Issue identified through audit activity (accessibility, UX, SEO, docs, etc.).
- `source:regression`: Behavior previously worked and later regressed.
- `source:migrated`: Item migrated from a prior/local tracking system.

## arc
- `arc:domain-pages`: Arc 1 workstream for domain direction and core page alignment.
- `arc:vercel-cutover`: Arc 2 workstream for hosting cutover and deployment readiness.
- `arc:email-system`: Arc/workstream grouping for overall email strategy and implementation.
- `arc:analytics`: Analytics instrumentation, validation, and rollout workstream.
- `arc:blog-rollout`: Blog launch, structure, and post-launch refinement workstream.
- `arc:nav-refresh`: Navigation architecture, behavior, and responsive refinement workstream.
- `arc:visual-update`: Visual design system refresh and presentation polish workstream.

## resolution
- `resolution:wontfix`: Intentionally accepted as not planned for implementation.
- `resolution:duplicate`: Closed because the same underlying issue is already tracked elsewhere.
- `resolution:deferred`: Acknowledged but postponed for a later pass.

## component
- `component:unknown`: Specific component has not been identified yet.
- `component:compact-drawer`: Compact/mobile drawer navigation pattern and behavior.
- `component:header-nav`: Header navigation layout, interactions, and related states.
- `component:module-rail`: Rail-style module presentation and behavior.
- `component:module-card-stack`: Card-stack module layout and interaction treatment.
- `component:blog-article-hero`: Blog article hero section, metadata, and lead presentation.
- `component:metadata-panel`: Shared metadata panel treatment and readability behavior.

## workflow
- `needs-triage`: Awaiting initial review to confirm type, priority, and routing.

## Automation

The local shell environment now has `jq` available. Prefer `gh api` plus `jq` for structured GitHub label verification and taxonomy sync work when automation is needed.

### Reusable label taxonomy sync command

Use this command to upsert the locally defined label taxonomy into the target GitHub repository. It updates existing labels in place and creates missing ones, then verifies that every label documented here exists remotely.

```bash
cd /home/eetazeeba/code/eetazeeba.github.io && set -e && repo='eetazeeba/Musifer-site-gen' && mapfile -t entries < <(sed -nE 's/^- `([^`]+)`: (.*)$/\1\t\2/p' .github/LABELS.md) && remote_json=$(gh api repos/$repo/labels --paginate) && updated=0 && created=0 && unchanged=0 && for entry in "${entries[@]}"; do label="${entry%%$'\t'*}"; desc="${entry#*$'\t'}"; exists=$(printf '%s' "$remote_json" | jq -r --arg n "$label" '[.[] | select(.name==$n)] | length'); if [[ "$exists" -gt 0 ]]; then current_desc=$(printf '%s' "$remote_json" | jq -r --arg n "$label" '[.[] | select(.name==$n)][0].description // ""'); current_color=$(printf '%s' "$remote_json" | jq -r --arg n "$label" '[.[] | select(.name==$n)][0].color'); if [[ "$current_desc" != "$desc" ]]; then gh label edit "$label" --repo "$repo" --description "$desc" --color "$current_color" >/dev/null; updated=$((updated+1)); else unchanged=$((unchanged+1)); fi; else case "$label" in area:*) color='1d76db' ;; arc:*) color='0e8a16' ;; source:*) color='5319e7' ;; component:*) color='fbca04' ;; resolution:*) color='cfd3d7' ;; type:bug) color='d73a4a' ;; type:polish) color='f2df02' ;; type:feature) color='a2eeef' ;; type:docs) color='0075ca' ;; type:chore) color='cfd3d7' ;; type:question) color='d876e3' ;; needs-triage) color='ededed' ;; *) color='ededed' ;; esac; gh label create "$label" --repo "$repo" --description "$desc" --color "$color" >/dev/null; created=$((created+1)); fi; done && mapfile -t local_labels < <(printf '%s\n' "${entries[@]}" | cut -f1 | sort -u) && mapfile -t remote_labels < <(gh api repos/$repo/labels --paginate --jq '.[].name' | sort -u) && missing=0 && for l in "${local_labels[@]}"; do printf '%s\n' "${remote_labels[@]}" | grep -Fxq "$l" || missing=$((missing+1)); done && echo "created=$created updated=$updated unchanged=$unchanged missing_after_sync=$missing"
```

Notes
- Issue templates should default to one `type:*` label and `needs-triage`.
- Apply `area:*`, `arc:*`, and `component:*` labels during triage unless intake already provides enough context.
- Priority and status are managed through issue form fields and project fields, not labels.

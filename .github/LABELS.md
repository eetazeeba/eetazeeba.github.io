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
- `type:bug`
- `type:polish`
- `type:feature`
- `type:docs`
- `type:chore`

## area
- `area:unknown`
- `area:nav`
- `area:about`
- `area:services`
- `area:contact`
- `area:blog`
- `area:admin`
- `area:content-model`
- `area:analytics`
- `area:seo`
- `area:build`
- `area:deploy`
- `area:styles`
- `area:scripts`

## source
- `source:user-feedback`
- `source:qa-testing`
- `source:audit`
- `source:regression`
- `source:migrated`

## arc
- `arc:domain-pages`
- `arc:vercel-cutover`
- `arc:proton-email`
- `arc:analytics`
- `arc:blog-rollout`
- `arc:nav-refresh`
- `arc:visual-update`

## resolution
- `resolution:wontfix`
- `resolution:duplicate`
- `resolution:deferred`

## component
- `component:unknown`
- `component:compact-drawer`
- `component:header-nav`
- `component:module-rail`
- `component:module-card-stack`
- `component:blog-article-hero`
- `component:metadata-panel`

Notes
- Issue templates should default to one `type:*` label and `needs-triage`.
- Apply `area:*`, `arc:*`, and `component:*` labels during triage unless intake already provides enough context.
- Priority and status are managed through issue form fields and project fields, not labels.

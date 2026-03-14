# CMS Content Spec (Draft v0.1)

Purpose
- Define a dependency-light, file-based content model for three content types: `blog`, `profile`, and `lesson`.
- Use a shared metadata base for consistent rendering, filtering, and indexing.

## Format and conventions
- File format: Markdown with YAML front matter.
- Date format: use `YYYY-MM-DD` for date-only values, or `YYYY-MM-DD HH:mm` when minute-precision UTC timing matters.
- IDs and slugs: lowercase, URL-safe, hyphenated.
- Tags: multiple tags are allowed and recommended.
- Promotion tag convention: use `featured` to mark entries for homepage/highlight placement.

## Directory model
```text
content/
  blog/
    <slug>.md
  profiles/
    <slug>.md
  lessons/
    <slug>.md
```

## Base schema (all content types)

Required fields
- `id` (string): globally unique ID, usually matches slug.
- `type` (enum): `blog | profile | lesson`.
- `title` (string).
- `status` (enum): `draft | published | archived`.
- `author` (string or list of strings).
- `published_at` (date or minute-precision datetime string, `YYYY-MM-DD` or `YYYY-MM-DD HH:mm`).
- `updated_at` (date or minute-precision datetime string, `YYYY-MM-DD` or `YYYY-MM-DD HH:mm`).
- `copyright` (string).
- `tags` (list of strings, can be empty). Include `featured` when an entry should be promoted.
- `media_types` (list): any of `image`, `audio`, `video`, `embed`, `sheet`, `download`.

Recommended fields
- `summary` (string): short preview text.
- `related_ids` (list of strings): links across blog/lesson/profile entries.
- `canonical_url` (string): optional external canonical URL.

Optional fields
- `hero_image` (string path).
- `language` (string, default `en`).
- `visibility` (enum): `public | unlisted | private` (default `public`).

## Type-specific fields

`blog`
- `bucket` (string): primary public bucket slug used for routing and hub placement. Current public buckets are `guides`, `articles`, and `case-studies`, but the field stays slug-based so future expansion is possible without another schema rewrite.
- `series` (string, optional).
- `reading_time_minutes` (integer, optional).

`profile`
- `role` (string): for example `artist`, `collaborator`, `producer`.
- `display_name` (string, optional if `title` is already display-ready).
- `links` (list of objects): `{ label, url }`.
- `collaboration_start` (date string, optional).
- `featured_media` (list of string paths, optional).

`lesson`
- `difficulty` (enum): `beginner | intermediate | advanced`.
- `duration_minutes` (integer, optional).
- `prerequisites` (list of strings, optional).
- `resources` (list of objects, optional): `{ label, kind, url_or_path }`.
- `lesson_format` (enum, optional): `article | video | audio | mixed`.

## Example: blog entry
```markdown
---
id: writing-better-hooks
type: blog
title: Writing Better Hooks
status: published
author:
  - Eeta Zeeba
published_at: 2026-03-03 09:00
updated_at: 2026-03-03 15:43
copyright: "Copyright (c) 2026 Musifer"
tags: [featured, songwriting, hooks, melody]
media_types: [image, audio]
summary: Practical hook-writing ideas with short audio demos.
bucket: guides
related_ids: [lesson-melodic-phrasing]
series: Songwriting Lab
reading_time_minutes: 8
---

Main markdown body...
```

## Example: profile entry
```markdown
---
id: ava-rivera
type: profile
title: Ava Rivera
status: published
author:
  - Eeta Zeeba
published_at: 2026-03-03
updated_at: 2026-03-03
copyright: "Copyright (c) 2026 Musifer"
tags: [collaborator, vocals, producer]
media_types: [image, embed]
summary: Vocal collaborator and co-producer on recent releases.
role: collaborator
display_name: Ava Rivera
links:
  - label: Website
    url: https://example.com
  - label: Instagram
    url: https://instagram.com/example
collaboration_start: 2025-06-10
featured_media:
  - /Images/ava-portrait.jpg
---

Main markdown body...
```

## Example: lesson entry (shared base with blog)
```markdown
---
id: lesson-melodic-phrasing
type: lesson
title: Melodic Phrasing 101
status: draft
author:
  - Eeta Zeeba
published_at: 2026-03-03
updated_at: 2026-03-03
copyright: "Copyright (c) 2026 Musifer"
tags: [lesson, melody, beginner]
media_types: [video, sheet]
summary: Intro lesson focused on phrase length and contour.
related_ids: [writing-better-hooks]
difficulty: beginner
duration_minutes: 25
prerequisites:
  - basic-scale-familiarity
resources:
  - label: Practice Sheet
    kind: pdf
    url_or_path: /downloads/melodic-phrasing-worksheet.pdf
lesson_format: mixed
---

Main markdown body...
```

## Validation targets for first implementation
- Required fields present.
- Enum values valid.
- Date fields parse as `YYYY-MM-DD` or `YYYY-MM-DD HH:mm` where allowed by the field contract.
- `id` uniqueness across all content directories.
- `blog.bucket` present and URL-safe.
- `related_ids` only reference existing IDs.
- `media_types` normalized to allowed values.

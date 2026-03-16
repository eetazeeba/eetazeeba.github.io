# SEO Page Metadata Audit

Snapshot date: 2026-03-15 (branch `experimental`)

## Purpose and scope
- Audit current routed pages for description-metadata readiness using `docs/planning/SEO/strategy.md`, `docs/planning/SEO/page-intent-map.md`, `docs/planning/SEO/schema-plan.md`, and `docs/planning/SEO/launch-checklist.md` as the reference framework.
- Prioritize missing description metadata first, then review weak, duplicated, placeholder, or misaligned descriptions.
- Keep this pass source-of-truth and audit-first: no broad metadata rewrite, no page-copy rewrite, and no architecture redesign.
- Treat repo source files as authoritative. `_site/` currently contains stale generated HTML and was used only for spot-checking behavior, not for deciding truth.
- Include current public or likely-public routes plus utility routes that affect metadata expectations:
  - 20 core `src/**/index.njk` routes across home, about, services, blog, and contact
  - 1 published routed blog article
  - 2 utility routes: `/important-update/` and `/admin/`
- Keep `profiles` and `lessons` out of scope for this audit because no public routed templates currently surface them.

## Current metadata implementation overview
- Shared metadata rendering lives in `src/_includes/layouts/base.njk`.
  - Title tag: always rendered as `{{ metaTitle }} | {{ siteTitle }}`.
  - Meta description: rendered only when `description` exists.
  - Canonical: always rendered as `site.url + page.url`.
  - Open Graph: `og:title`, `og:url`, `og:image`, and `og:description` all flow through the same layout.
  - Robots: rendered only when a page supplies `robots`.
- Description metadata currently comes from three places:
  - Homepage only: `src/index.11tydata.js` sets `description` from `src/_data/site.js`.
  - Standard routed pages: page-by-page front matter in `src/**/index.njk`.
  - Blog article pages: `src/blog/post.11tydata.js` maps `description` from `entry.summary`.
- Section-level data files for `about`, `services`, `blog`, and `contact` currently centralize breadcrumbs and JSON-LD only. They do not provide description defaults or validation.
- Decap CMS is part of the metadata path for blog articles:
  - `src/admin/config.yml` makes blog `summary` optional.
  - Because `summary` is the only article description source, a published article can currently ship without a meta description unless editorial workflow catches it manually.
- Missing description metadata also removes `og:description`, because both use the same `description` value in the base layout.
- Canonical/social notes relevant to this audit:
  - Planning docs talk about reusable canonical inputs, but the current base layout does not read a page-level `canonical` override; it always self-builds from `site.url + page.url`.
  - `src/_data/blog.js` carries `canonicalUrl`, but that value is not surfaced to the layout today.
  - `src/admin/index.html` bypasses the shared layout entirely, so it does not inherit canonical, description, Open Graph, or robots handling.
- Stale output note:
  - `src/_data/site.js` currently sets the canonical host to `https://eetazeeba.github.io`, which matches the SEO planning docs' "use the live host until cutover" guidance.
  - Existing `_site/` HTML still contains older `https://musifer.studio` output in at least one spot, so source files were used as the authority for this audit.

## Page inventory summary

### Coverage totals

| Section | Audited routes | Description present | Missing description | Other flagged description issues |
| --- | ---: | ---: | ---: | ---: |
| Home | 1 | 1 | 0 | 0 |
| About | 7 | 0 | 7 | 0 |
| Services | 4 | 1 | 3 | 0 |
| Blog section routes | 4 | 4 | 0 | 0 |
| Blog article routes | 1 | 1 | 0 | 1 misaligned |
| Contact | 4 | 0 | 4 | 0 |
| Utility routes | 2 | 0 | 2 | 0 |
| Total | 23 | 7 | 16 | 1 misaligned |

### Section-level readout
- `blog` is currently the strongest section for description coverage. All four routed hubs emit page-specific descriptions, and the live article also emits one through CMS data.
- `about` and `contact` are the weakest sections for description coverage. None of their current routed pages emit a meta description.
- `services` is mixed. The landing page has a usable description, but all three child pages are missing one.
- No exact duplicate meta descriptions were found among the pages that currently emit a description.
- The main current risk is omission, not duplication.

### Route inventory

| Route | Page type | SEO intent | Title source | Description source | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Home | Index | `src/index.njk` front matter | `src/index.11tydata.js` -> `site.description` | Present | Only routed page with a shared description fallback. Description is value-oriented and aligned to the homepage's current role. |
| `/about/` | Core page | Index | `src/about/index.njk` front matter | None | Missing | Substantive trust/context page, but no description currently reaches the layout. |
| `/about/team/` | About child | Index once substantive | `src/about/team/index.njk` front matter | None | Missing | Public scaffold page linked in nav; no description. |
| `/about/mission/` | About child | Index once substantive | `src/about/mission/index.njk` front matter | None | Missing | Public scaffold page linked in nav; no description. |
| `/about/history/` | About child | Index once substantive | `src/about/history/index.njk` front matter | None | Missing | Public scaffold page linked in nav; no description. |
| `/about/portfolio/` | About child | Index once substantive | `src/about/portfolio/index.njk` front matter | None | Missing | Public scaffold page linked in nav; no description. |
| `/about/client-list/` | About child | Index once substantive | `src/about/client-list/index.njk` front matter | None | Missing | Public scaffold page linked in nav; no description. |
| `/about/faq/` | About child | Index once substantive | `src/about/faq/index.njk` front matter | None | Missing | Public scaffold page linked in nav; no description. |
| `/services/` | Services landing | Index | `src/services/index.njk` front matter | Page front matter | Present | Unique and aligned to the landing page's conversion role. |
| `/services/production/` | Service child | Index | `src/services/production/index.njk` front matter | None | Missing | Highest-priority service child page lacks description metadata. |
| `/services/legal/` | Service child (on hold) | Index only if substantive; otherwise likely noindex | `src/services/legal/index.njk` front matter | None | Missing | On-hold scaffold page has no description and no robots directive. |
| `/services/rates-quote/` | Conversion page | Index if substantive | `src/services/rates-quote/index.njk` front matter | None | Missing | High-intent quote page lacks description metadata. |
| `/blog/` | Blog landing | Index | `src/blog/index.njk` front matter | Page front matter | Present | Strong section-level description with clear audience and next-step framing. |
| `/blog/guides/` | Blog bucket hub | Index | `src/blog/guides/index.njk` front matter | Page front matter | Present | Clear and distinct from the other bucket hubs. |
| `/blog/articles/` | Blog bucket hub | Index | `src/blog/articles/index.njk` front matter | Page front matter | Present | Unique and aligned to the editorial/essay lane. |
| `/blog/case-studies/` | Blog bucket hub | Index | `src/blog/case-studies/index.njk` front matter | Page front matter | Present | Unique and acceptable, though still slightly future-facing because the lane is sparse. |
| `/blog/guides/writing-better-hooks/` | Blog article | Index when substantive and published | `src/blog/post.11tydata.js` from `entry.title` | `src/blog/post.11tydata.js` from `entry.summary` | Misaligned | Description is specific, but the visible article body is still only "Draft starter post body.", so the metadata promise outruns page substance. |
| `/contact/` | Contact landing | Index | `src/contact/index.njk` front matter | None | Missing | Highest-priority section landing still lacks description metadata. |
| `/contact/work-with-us/` | Contact child | Index | `src/contact/work-with-us/index.njk` front matter | None | Missing | Priority contact pathway lacks description metadata. |
| `/contact/locations/` | Contact child | Index only if useful/substantive | `src/contact/locations/index.njk` front matter | None | Missing | Public scaffold page with no description. |
| `/contact/community/` | Contact child | Index once substantive | `src/contact/community/index.njk` front matter | None | Missing | Public scaffold page with no description. |
| `/important-update/` | Utility route | Noindex | `src/important-update/index.njk` front matter | None | Missing | Already marked `noindex, nofollow`, so this is low-severity for SEO targeting. |
| `/admin/` | Utility admin route | Should remain non-indexable | `src/admin/index.html` hardcoded HTML title | None | Missing | Does not use the shared layout and currently emits no description, canonical, Open Graph, or robots noindex tag. |

## Pages missing description metadata

### Highest-priority missing descriptions
These routes are either current priority surfaces or closely tied to them:
- `/about/`
- `/services/production/`
- `/services/rates-quote/`
- `/contact/`
- `/contact/work-with-us/`
- `/contact/locations/`
- `/contact/community/`

### Missing descriptions on public scaffold pages that also need indexing decisions
- `/services/legal/`
- `/about/team/`
- `/about/mission/`
- `/about/history/`
- `/about/portfolio/`
- `/about/client-list/`
- `/about/faq/`

### Missing descriptions on utility routes
- `/important-update/`
- `/admin/`

### What the missing set suggests
- 14 of the 16 missing descriptions are on current core/public routes rather than on utility pages.
- The gaps are concentrated in sections that still rely on scaffold pages and manual front matter entry.
- The planning docs expect every indexable page to carry a unique description, so the current omissions are not edge cases; they are clear rollout gaps.

## Pages with weak, duplicated, or misaligned descriptions

### Duplicated descriptions
- No exact duplicate meta descriptions were found among the current pages that emit one.

### Weak or questionable descriptions
- No currently emitted description reads like obvious placeholder filler.
- `/blog/case-studies/` is the closest to a soft refinement item, because the copy is partly future-facing ("as that lane grows") rather than fully grounded in current live inventory. This is not the main problem today.

### Misaligned descriptions
- `/blog/guides/writing-better-hooks/`
  - Metadata source: `content/blog/writing-better-hooks.md` `summary`
  - Current description: "Practical hook-writing ideas with short audio demos."
  - Why it is flagged: the routed article is published and indexable, but the visible body is still only "Draft starter post body." The description is more developed than the page itself, which makes the metadata promise outpace the actual page substance.
  - Planning-doc tie-in: `page-intent-map.md` and `launch-checklist.md` both assume published blog articles are substantive enough to index and support user progression into the rest of the site.

## Implementation-pattern findings
- Description coverage is currently page-by-page and opt-in for almost every route.
  - Outside the homepage and blog articles, there is no shared description helper, fallback, or validation path.
- The base layout silently omits the meta description tag when `description` is absent.
  - That makes omissions easy to miss in source review and also removes `og:description` at the same time.
- Section-level `*.11tydata.js` files solve breadcrumbs/schema consistency but not metadata coverage.
  - This is useful for structure, but it means new child pages can be fully wired into nav and schema without any description metadata at all.
- Current public scaffolds are discoverable before their metadata is ready.
  - Many scaffold pages are in nav and routable now, while the planning docs repeatedly say they should only be index targets once substantive.
- Blog article metadata depends on an optional Decap field.
  - Because `summary` is optional in `src/admin/config.yml`, the CMS workflow can currently publish an article that lacks a meta description unless another check catches it.
- Utility routes do not share a uniform metadata policy.
  - `/important-update/` already sets `noindex, nofollow`.
  - `/admin/` bypasses the layout and does not currently advertise any noindex intent.
- The repo has no metadata-specific QA guardrail yet.
  - There is no build warning, content validation rule, or launch check automation that fails when indexable pages lack descriptions.

## Prioritized follow-up recommendations

### P1: close the high-value missing-description gaps
- Add unique descriptions to the current priority routes first:
  - `/about/`
  - `/services/production/`
  - `/services/rates-quote/`
  - `/contact/`
  - `/contact/work-with-us/`
- Continue with the remaining public about/contact child pages if they are meant to stay indexable.

### P1: decide whether thin scaffold pages should be indexable right now
- Review current public scaffold routes against the planning docs' "index once substantive" guidance.
- Most urgent candidates:
  - `/services/legal/`
  - `/about/team/`
  - `/about/mission/`
  - `/about/history/`
  - `/about/portfolio/`
  - `/about/client-list/`
  - `/about/faq/`
  - `/contact/locations/`
  - `/contact/community/`
  - `/admin/`
- For each page, choose one of two honest states:
  - keep it public/indexable and give it substantive content plus page-specific metadata
  - keep it reachable but non-indexable until it is ready

### P1: align published blog articles with their metadata promises
- Bring `/blog/guides/writing-better-hooks/` into line with its current description by either:
  - making the article substantively match the metadata
  - or keeping it out of public/indexable rotation until it does

### P2: add guardrails instead of generic fallback copy
- Prefer validation over broad default descriptions.
- Add a repo-level metadata check that flags any intended-indexable route lacking `description`.
- Keep the rule narrow enough that utility/noindex pages can be intentionally exempted.

### P2: tighten the Decap CMS path for future blog posts
- Require `summary` for published blog entries, or block publish when `status: published` and `summary` is empty.
- Keep article metadata tied to fields that are also useful for visible rendering so the content model does not drift.

### P3: refine lower-severity present descriptions as implementation settles
- Revisit the softer blog-bucket phrasing later, especially if bucket inventory changes.
- Refresh descriptions only when page intent becomes clearer, not just to churn wording.

## Manual-review items and ambiguities
- The audit treats current routed/nav-linked scaffold pages as "likely-public" because they are live in source and reachable today, even where planning docs say they should only be index targets once substantive.
- `_site/` contains older generated canonical output that still points at `musifer.studio` in at least one page. Source configuration in `src/_data/site.js` was used as the authority for this audit.
- Title tags were not the primary audit target, but a few still read like scaffolds rather than search-facing titles:
  - homepage uses `Homepage | Musifer`
  - some child pages still use bare labels such as `Production | Musifer` or `Legal | Musifer`
- `src/_data/blog.js` tracks `canonicalUrl`, but the current layout pipeline does not consume it. This did not affect the description audit directly, but it is worth revisiting during broader metadata hardening.

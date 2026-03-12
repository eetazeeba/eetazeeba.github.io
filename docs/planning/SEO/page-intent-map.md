# Musifer Page Intent Map

Snapshot date: 2026-03-12 (branch `experimental`)

Purpose
- Map page purpose, search intent, conversion role, and indexing expectations across the current and planned Musifer site.
- Use this file with [strategy.md](strategy.md) for sitewide rules and [launch-checklist.md](launch-checklist.md) for launch QA.
- Treat [`../../sitemap.md`](../../sitemap.md) as the intended IA baseline when route names or nav data still differ in the repo.

## How to read this map
- "Intended route" reflects the sitemap-led IA direction.
- "Current implementation" records repo reality where it still differs.
- "Conversion role" describes the next action the page should support, even when the page is not fully implemented yet.

## Core pages

| Page | Intended route | Current implementation | Purpose and audience | Query themes | Conversion role | Linking expectations | Indexing |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | `/` | Implemented | Orientation page for first-time visitors, artists exploring support, and people evaluating Musifer as a creative platform. | brand queries, artist support, music guidance, creator resources | Send visitors into `services`, `blog`, and `contact` based on intent. | Link clearly to the three priority sections; surface one or two proof/trust paths. | Index |
| About | `/about/` | Implemented | Trust and brand-context page for people who need to understand the mission, background, and direction. | brand queries, about Musifer, artist-first platform | Support trust before a service or contact decision. | Link to services, blog, and contact; child pages should roll up into About and vice versa. | Index |
| Services landing | `/services/` | Implemented conversion-focused landing page | Commercial intent hub for visitors evaluating what Musifer can help with now. | music production help, artist support services, creative services | Move users into a specific service and then toward contact or quote. | Link to priority services, supporting blog content, and contact paths. | Index |
| Blog index | `/blog/` | Implemented curated landing page | Discovery hub for educational and trust-building content. Priority SEO growth surface. | artist advice blog, music guidance blog, music industry help | Move users into bucket hubs and article pages; support later service/contact conversion. | Link to `guides`, `articles`, `case-studies`, featured posts, and selected services. | Index |
| Contact landing | `/contact/` | Implemented scaffold | Action hub for visitors ready to reach out, explore participation, or find local/community context. | contact Musifer, work with Musifer, community contact | Convert high-intent visitors into inquiry or next-step behavior. | Link to work-with-us, locations, and other relevant contact paths. | Index |

## About section

| Page | Intended route | Current implementation | Purpose and audience | Query themes | Conversion role | Linking expectations | Indexing |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Team | `/about/team/` | Implemented scaffold | Humanize the brand and show who is behind the work. | Musifer team, Everett Ballance, collaborators | Build trust and reduce hesitation. | Link back to About, out to services/contact where appropriate. | Index once substantive |
| Mission | `/about/mission/` | Implemented scaffold | Clarify why Musifer exists and who it serves. | Musifer mission, artist-first support | Reinforce relevance and brand intent. | Link to home, about, services, blog. | Index once substantive |
| History | `/about/history/` | Implemented scaffold | Explain project origin and development. | Musifer history, platform story | Build context, not direct conversion. | Link to About and current offerings. | Index once substantive |
| Portfolio | `/about/portfolio/` | Implemented scaffold | Show examples of work, outcomes, or capabilities. | music portfolio, creative work samples | Support service evaluation. | Link to relevant services and contact. | Index once substantive |
| Client List | `/about/client-list/` | Implemented scaffold | Offer proof and credibility. | client list, collaborators, partners | Trust support for service/contact decisions. | Link to services and contact where contextually useful. | Index once substantive |
| FAQ | `/about/faq/` | Implemented scaffold | Answer recurring orientation questions without forcing a contact step. | Musifer FAQ, what does Musifer do | Remove friction before service/contact conversion. | Link back to relevant service/contact pages from answers. | Index once substantive |

## Services section

| Page | Intended route | Current implementation | Purpose and audience | Query themes | Conversion role | Linking expectations | Indexing |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Production | `/services/production/` | Implemented scaffold | Service page for artists seeking production/audio support. | audio engineering, music production help, production support | Primary commercial conversion path. | Link to quote/contact and to supporting blog guides/case studies. | Index |
| Legal (on hold) | `/services/legal/` | Implemented scaffold | Future-looking service page that sets expectations honestly if legal work is not active yet. | music legal help, artist legal support | Capture future-fit interest without overpromising. | Link to contact and to educational content; clearly explain current status. | Index only if substantive and honest; otherwise consider temporary noindex until launch-ready |
| Rates / Quote | `/services/rates-quote/` | Implemented scaffold | Conversion page for pricing expectations and quote initiation. | production pricing, quote request, service rates | High-intent conversion endpoint. | Link from every live service page and from selected blog/service CTAs. | Index if it offers real value; avoid a thin form-only page |

## Blog section

| Page | Intended route | Current implementation | Purpose and audience | Query themes | Conversion role | Linking expectations | Indexing |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Guides hub | `/blog/guides/` | Implemented lightweight hub page | Evergreen instructional content for recurring artist problems. | how to write better hooks, artist workflow tips, beginner music guidance | Discovery entry point that later routes users to services or contact. | Link to articles, case studies, and relevant services. | Index |
| Articles hub | `/blog/articles/` | Implemented lightweight hub page | Essays, interpretation, editorial perspective, and thought pieces. | music industry thoughts, artist strategy, creative perspective | Build trust and brand voice; support newsletter/contact/service pathways later. | Link to guides/case studies when they deepen the topic. | Index |
| Case studies hub | `/blog/case-studies/` | Implemented lightweight hub page | Proof-oriented stories showing process, outcomes, and applied experience. | music case study, production breakdown, artist support example | Bridge informational traffic into service consideration. | Link strongly to the most relevant service and contact path. | Index |
| Blog article pages | `/blog/<bucket>/<slug>/` | Implemented for published public blog entries | Individual article pages for discovery, education, and trust. | topic-specific long-tail queries | Move visitors into another article, a service page, or contact based on readiness. | Link to bucket hub, related posts, relevant service, and contact CTA where justified. | Index when substantive and published |

## Contact section

| Page | Intended route | Current implementation | Purpose and audience | Query themes | Conversion role | Linking expectations | Indexing |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Work with us | `/contact/work-with-us/` | Implemented scaffold | Central path for direct collaboration, contribution, or inquiry. | work with Musifer, collaborate with Musifer, volunteer music platform | Primary action page for high-intent non-service outreach. | Link from contact landing, relevant services, and end-of-article CTAs. | Index |
| Locations | `/contact/locations/` | Implemented scaffold | Clarify geography, local presence, or partner/location context if relevant. | Musifer locations, local music community | Support trust and practical contact decisions. | Link to contact landing and any community/partner details. | Index only if content is real and useful |
| Community | `/contact/community/` | Implemented scaffold | Capture community-facing participation, partner, or network intent. | music community partners, local artist community | Secondary contact/discovery path. | Link from contact landing and locations where the split is meaningful. | Index once substantive |

## Blog planning rules
`blog` deserves the strongest structural SEO treatment because it is the best long-term discovery surface in the current roadmap.

### Content buckets
- Keep the three public buckets already present in the sitemap and repo:
  - `guides`: evergreen how-to, checklists, explainers, process walkthroughs
  - `articles`: commentary, perspective, narrative, interpretation
  - `case-studies`: proof, breakdowns, before/after, applied lessons
- The CMS content model now stores a primary `bucket` slug on blog entries; keep public IA aligned to the three buckets above unless planning docs are updated first.
- Do not add more public buckets unless there is enough repeated content to justify a stable archive page.
- Give each article one primary public bucket.

### Evergreen vs timely
- Make evergreen content the default. It should carry the bulk of organic discovery.
- Use timely or news-reactive posts sparingly and only when they can:
  - be updated later
  - link into a more durable evergreen guide
  - support a clearly relevant service or contact pathway

### Tags and taxonomy restraint
- The current CMS model allows freeform tags, but public SEO should not depend on that taxonomy yet.
- Keep tags as editorial metadata and internal organization unless vocabulary governance becomes stricter.
- Do not launch public tag archive pages in v1.
- If tags later become public, normalize vocabulary first to avoid thin or duplicate archives.

### Article template expectations
- Every article should support:
  - unique title
  - summary/deck usable as meta description input
  - publish and updated dates
  - author
  - primary bucket
  - featured/share image expectation
  - at least one meaningful next-step link
- Avoid publishing article pages with no contextual links back into the site.

### Related-post logic
- First priority: manual `related_ids` when a strong editorial relationship exists.
- Fallback priority:
  - same bucket
  - same problem or workflow stage
  - adjacent service relevance
- Related-post modules should favor quality over count. Two or three strong matches are better than a noisy grid.

### Blog-to-services/contact pathways
- Guides should usually link to the service that helps with implementation or professional support.
- Case studies should usually link to the corresponding service and then to contact/quote.
- Articles can link more lightly, but they should still offer a plausible next step when the topic naturally invites one.
- End-of-article CTAs should match the reader's readiness:
  - informational follow-up: another article or guide
  - evaluation follow-up: service page
  - action follow-up: contact or quote path

## Current implementation gaps to reconcile
- The current blog library is still sparse, so the landing page and bucket hubs need ongoing editorial curation rather than archive-heavy expansion.
- The content model currently allows tag drift, so taxonomy exposure should stay restrained until governance improves.
- If future buckets are introduced in CMS data, update IA/navigation/planning docs before exposing new public hub pages.

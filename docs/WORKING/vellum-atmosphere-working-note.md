# Vellum Atmosphere Working Note

## Current repo state
- The original homepage vellum experiment was removed from the live codebase before this reset-and-rebuild pass began.
- The current vellum rollout is active on the homepage plus the current About, Services, Blog, and Contact page surfaces, including the blog bucket pages and blog article template.
- The active source of truth for the atmosphere treatment is now:
  - body-level class rendering in `src/_includes/layouts/base.njk`
  - page-level `bodyClass` opt-ins in the relevant `.njk` entry templates
  - shared vellum rules in `src/_assets/CSS/_base.scss`
- The vellum asset set in `src/_assets/Images/` still contains:
  - `vellum-bg-2k.webp`
  - `vellum-bg-2k.png`
  - `vellum-bg-tile.png`
  - `vellum-bg-tint.webp`

## Design goal
- Treat vellum as site atmosphere, not a literal paper sheet.
- Preserve the Musifer palette and existing content structure.
- Keep the effect strongest in the upper page and let it recede through the mid page.
- Support longer page reads so the treatment can be judged on real page depth instead of only the short homepage.

## Implementation direction
- The shared class contract remains:
  - `page-atmosphere`
  - `page-atmosphere--vellum`
  - page-specific keys such as `page-home`, `page-about`, `page-services`, `page-blog`, and `page-contact`
- `src/_includes/layouts/base.njk` now renders an optional body class from page data.
- The reliable opt-in path for this repo turned out to be explicit `bodyClass` front matter on the page entry templates rather than hidden section-data propagation.
- Current opt-in footprint:
  - homepage in `src/index.njk`
  - About templates under `src/about/`
  - Services templates under `src/services/`
  - Contact templates under `src/contact/`
  - Blog hub and bucket templates under `src/blog/`
  - blog article template in `src/blog/post.njk`
- The atmosphere itself still lives in `src/_assets/CSS/_base.scss` as a body-level pseudo-element so it stays anchored to the page, not the sticky header.
- Existing page wrapper classes such as `.home-page`, `.about-page`, `.services-page`, and `.blog-page` remain responsible for page-local layout rhythm rather than atmosphere anchoring.

## Asset options
- Implemented asset: `src/_assets/Images/vellum-bg-2k.webp`
- Why it remains the active asset:
  - broad texture coverage holds up better on wide viewports than a visibly finite centered image block
  - low-opacity `mix-blend-mode: multiply` lets the Musifer palette drive the color read
  - it stays atmospheric without forcing the site toward an obvious parchment tint
- Assets not used in the current rollout:
  - `vellum-bg-tile.png` remains the fallback if future wide-viewport testing shows scaling artifacts or awkward edge behavior
  - `vellum-bg-tint.webp` is still intentionally avoided because it pushes harder on color cast than the current direction wants
  - `vellum-bg-2k.png` remains available but has not been necessary for the current pass

## Risks and constraints
- The effect must stay behind content and below the priority of readability.
- No vellum layer should introduce horizontal overflow, pointer interference, or stacking bugs.
- Because the header is sticky and reacts to scroll state, the atmosphere must stay attached to a stable page-level container, not to navigation.
- The fade still relies on paired `mask-image` and `-webkit-mask-image` rules.
- The rollout now spans more pages, but section-specific values are still intentionally restrained:
  - homepage is strongest
  - About and Services stay moderate
  - Blog is taller but softer so rails, metadata, and article copy stay readable
  - Contact remains light because many of its pages are still scaffold-level

## QA expectations
- Narrow viewport:
  - no horizontal overflow
  - texture stays faint behind headings, buttons, and card edges
- Medium viewport:
  - fade recedes gradually with no obvious transition stripe
- Wide viewport:
  - texture does not read like a finite centered rectangle
- Scroll interaction:
  - sticky/reactive header changes do not make the vellum feel attached to nav state
- Interaction safety:
  - links, cards, buttons, focus states, and pointer behavior remain unchanged
- Visual cohesion:
  - the Musifer palette stays dominant instead of turning into yellow parchment
- Regression awareness:
  - page spacing, stacking, and section rhythm remain intact across homepage, About, Services, Blog, Contact, and article layouts

## Current implementation result
- Implemented a reusable body-class hook in `src/_includes/layouts/base.njk`.
- Applied explicit `bodyClass` opt-ins across the current page entry templates so the vellum pass now runs through the site's longer reading surfaces.
- Kept the atmosphere anchored to `body.page-atmosphere` with a single pseudo-element and `pointer-events: none`.
- Fade and blend handling:
  - texture source: `vellum-bg-2k.webp`
  - blend: low-opacity `mix-blend-mode: multiply`
  - fade: top-to-mid transparency ramp using `mask-image` and `-webkit-mask-image`
  - coverage: tall, top-anchored bands sized with `clamp(...)` instead of a centered rectangle treatment
- Current section tuning in `src/_assets/CSS/_base.scss`:
  - homepage: strongest pass for the shortest page
  - About: moderate height and opacity
  - Services: slightly taller upper band for the denser landing page
  - Blog: tallest band with softer opacity for hub, buckets, and articles
  - Contact: restrained pass for the current scaffold-level pages

## Current limitations
- This is still a first-pass system, not final per-page art direction.
- Many About, Services, and Contact child pages are still short scaffold pages, so the atmospheric read is most useful right now on the longer landing pages and blog/article surfaces.
- Future content growth may require retuning individual section heights or opacity values.
- `important-update` and any future one-off landing pages are not yet opted into the vellum contract.

## Follow-up recommendation
- If the broader rollout holds up in browser review, keep the shared body-level vellum implementation and continue extending it with explicit page entrypoint classes rather than duplicating one-off CSS blocks.
- Next tuning passes should focus on page-specific polish rather than new infrastructure:
  - Services: confirm CTA and conversion areas stay crisp
  - Blog: confirm article prose and metadata zones stay clean on long reads
  - Contact: retune once those pages gain real content depth
  - future one-off pages: opt in deliberately instead of assuming every page wants the same strength
# Homepage Landing Refresh

## Goal
- Refresh the homepage into a clearer Musifer landing page.
- Strengthen the opening value proposition, service paths, blog discovery, and contact/quote CTAs.
- Add one tasteful SoundCloud proof module without making media the homepage's primary purpose.
- Revise the homepage voice away from polite brochure copy and toward a sharper, more rebellious Musifer tone.

## Branch And Dependency Notes
- Work branch: `feature/homepage-landing-refresh`.
- Preferred base: `origin/experimental`.
- A fresh fetch showed `feature/soundcloud-wrapper` and `origin/experimental` had no local diff, so this branch was created from `origin/experimental`.
- If the wrapper branch diverges before integration, merge or rebase in this order: SoundCloud wrapper into `experimental`, then homepage branch onto updated `experimental`.

## Implementation Approach
- Replaced the old placeholder homepage stack with a landing-page flow: hero value proposition, service/value overview, featured listening section, blog discovery routes, and closing quote/contact CTA.
- Reused existing card, grid, button, surface, and SoundCloud wrapper patterns.
- Kept homepage-specific styles small and colocated with the existing homepage CSS block.
- Kept the SoundCloud include contract unchanged.
- Revised the public homepage copy to make the page feel less generic while preserving the services, blog, listening, and contact paths.
- Promoted the homepage inline-link treatment into a portable `.surface-inline-link` utility.
- Kept `.surface-inline-link` and SoundCloud source-link hover states dark with a visible highlight so links do not disappear on apricot surfaces.
- Gave the base `.btn` a visible border so primary and secondary buttons share the same edge treatment when paired.

## Files Touched
- [src/index.njk](../../src/index.njk)
- [src/_assets/CSS/_components.scss](../../src/_assets/CSS/_components.scss)
- [src/_assets/CSS/styles.css](../../src/_assets/CSS/styles.css)
- [docs/WORKING/homepage-landing-refresh.md](homepage-landing-refresh.md)

## SoundCloud Placement Rationale
- The homepage uses ETHERNET_SKY's `95mp3` set as a curated listening proof point from the Musifer orbit.
- The section sits after the service/value overview so visitors first understand what Musifer does.
- The homepage does not add an extra wrapper visual badge because the SoundCloud player already carries the media identity.
- The wrapper still generates a SoundCloud iframe with `auto_play=false`.
- The direct SoundCloud source link remains available for fallback and platform handoff.
- The data shape is generic enough to swap in XVHIR or another approved artist later without changing the homepage markup structure.

## QA Performed
- Ran `npm run build:css`.
- Ran `npm run build`.
- Ran `npm run cms:validate`.
- Ran `node --check src/_assets/scripts/soundcloud-wrapper.js`.
- Checked generated `_site/index.html` for homepage hero, service, listening, blog, and final CTA content.
- Checked generated `_site/index.html` for `/services/`, `/blog/`, `/services/rates-quote/`, and `/contact/work-with-us/` routes.
- Checked generated `_site/index.html` for the ETHERNET_SKY SoundCloud set URL, encoded iframe URL with `auto_play=false`, and direct SoundCloud source link.
- Checked compiled CSS for homepage layout rules and SoundCloud iframe containment rules.
- Checked compiled CSS for dark hover/focus link color on `.surface-inline-link` and SoundCloud source links.
- Checked compiled CSS for a visible base `.btn` border.
- Tried local Eleventy serving through `npx eleventy --input=src --output=_site --serve --port=8080` and `npm start -- --port=8080`; both built and watched, but port `8080` was not reachable inside this sandbox.

## Known Limitations And Follow-Up Ideas
- Browser viewport and console QA still need a real local browser pass because this environment has no Playwright package and no Chromium, Chrome, or Firefox binary available.
- The featured listening item is intentionally static for this pass.
- Future passes could rotate approved listening examples, add artist/context pages, or add media analytics only after there is a concrete reporting need.

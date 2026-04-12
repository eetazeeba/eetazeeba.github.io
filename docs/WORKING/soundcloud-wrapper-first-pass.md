# SoundCloud Wrapper First Pass

## Feature Goal
- Add a modest reusable SoundCloud-only wrapper for Musifer embeds.
- Keep the first pass iframe-driven and static-site friendly.
- Leave room for later media/provider work without building that abstraction now.

## Files Touched
- [soundcloud-wrapper.njk](../../src/_includes/components/soundcloud-wrapper.njk)
- [_components.scss](../../src/_assets/CSS/_components.scss)
- [styles.css](../../src/_assets/CSS/styles.css)
- [soundcloud-wrapper.js](../../src/_assets/scripts/soundcloud-wrapper.js)
- [base.njk](../../src/_includes/layouts/base.njk)
- [component demo page](../../src/component-demos/soundcloud-wrapper/index.njk)
- [high-level-project-tracking.md](../high-level-project-tracking.md)

## Implementation Approach
- Created `components/soundcloud-wrapper.njk` as the reusable include.
- The include accepts a `soundcloudWrapper` object with:
  - `soundcloudUrl`
  - `title`
  - optional `description`
  - optional `variant`
  - optional `className`
  - optional `artworkSrc` and `artworkAlt`
  - optional `visualLabel`
  - optional `sourceLabel`
- The iframe source is generated from `soundcloudUrl` using SoundCloud's standard `w.soundcloud.com/player/` embed path.
- The player URL explicitly keeps `auto_play=false`.
- The wrapper always renders a direct SoundCloud source link when `soundcloudUrl` is present.
- Styling lives in the shared component stylesheet and follows the existing card/surface language.
- The layout is mobile-first, then the `feature` variant moves into a balanced two-column layout at medium widths.
- The iframe is contained with full-width, max-width, overflow, and fixed SoundCloud widget height rules to avoid horizontal overflow and fragile player sizing.
- Added a tiny enhancement script that safely no-ops when no wrapper exists and marks wrapper load state for later widget-event work.
- Added a noindex demo page at `/component-demos/soundcloud-wrapper/` for QA without adding public navigation.

## Reference
- SoundCloud's Widget API documents the iframe player path, the `auto_play` parameter, and the optional Widget API/event surface for later enhancement: [Widget API - SoundCloud Developers](https://developers.soundcloud.com/docs/api/html5-widget).

## Known Limitations
- This is not a custom music player.
- This does not load SoundCloud's Widget API script yet.
- No SoundCloud API, oEmbed fetch, build-time fetch, serverless layer, custom controls, or multi-provider abstraction was added.
- The demo uses a public SoundCloud example URL and should be replaced with a Musifer-owned or approved source before public-facing use.
- The current enhancement script only records basic iframe load state. It does not track play/pause/finish events.
- Browser screenshot/console QA could not be completed in this checkout because no project-level Playwright/browser binary is installed.

## QA Performed
- Ran `npm run build:css`.
- Ran `npm run build`.
- Started Eleventy with `npx eleventy --input=src --output=_site --serve --port=8080`.
- Verified the demo page returns HTTP 200 at `http://127.0.0.1:8080/component-demos/soundcloud-wrapper/`.
- Verified compiled CSS returns HTTP 200 at `/CSS/styles.css`.
- Verified the enhancement script returns HTTP 200 at `/scripts/soundcloud-wrapper.js`.
- Checked generated demo markup for:
  - encoded SoundCloud iframe URL
  - `auto_play=false`
  - iframe title text
  - direct SoundCloud source link fallback
  - `noindex, nofollow` demo page metadata
- Ran `node --check src/_assets/scripts/soundcloud-wrapper.js`.
- Ran a no-wrapper script smoke check to confirm the enhancement script exits safely.
- Ran a mocked wrapper/iframe load-state smoke check to confirm `pending` and `loaded` states are set without throwing.

## Responsive And Accessibility QA Notes
- Narrow viewport structural coverage:
  - wrapper starts as a single-column grid
  - all layout children set `min-width: 0`
  - iframe and embed shell cap at `100%`
  - source link can wrap
- Medium viewport structural coverage:
  - `feature` variant shifts to `minmax(0, ...)` columns at `768px`
  - artwork/copy stay grouped while the player receives the wider track
- Wide viewport structural coverage:
  - page shell remains governed by existing shared `l-page-shell` widths
  - player stays full-width inside its column instead of shrinking to raw iframe dimensions
- Keyboard/accessibility coverage:
  - native iframe focus remains available
  - direct source link remains a normal keyboard-focusable anchor
  - source link has a visible focus style
  - local artwork uses configurable alt text
- Remaining manual QA:
  - perform visual narrow, medium, and wide viewport checks in an actual browser
  - confirm no browser console errors from the live SoundCloud iframe or local enhancement script
  - tab through the full page with the real browser focus ring visible

## Follow-Up Opportunities
- Add real Musifer-owned SoundCloud examples when approved.
- Add Widget API loading only when meaningful play/pause/finish state is needed.
- Consider analytics events later, but only for meaningful media/embed interactions.
- Generalize toward a broader media/provider system only after at least one more provider or repeated embed shape justifies the abstraction.

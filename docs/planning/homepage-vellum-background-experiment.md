# Homepage Vellum Background Experiment

Purpose
- Add a homepage-only vellum atmosphere that softens the top of the page without changing the current Musifer palette, content structure, or sticky-header behavior.

## Goal
- Let the homepage pick up a subtle vellum mood through the upper sections.
- Keep the effect reading as background atmosphere rather than as a paper sheet or foreground texture.
- Fade the treatment out through the upper-to-mid page range so the lower page returns to the base site background.

## Implementation approach
- Added a homepage-only body hook:
  - `src/index.njk` now sets `bodyClass: page-home`
  - `src/_includes/layouts/base.njk` now renders optional body classes
- Implemented the vellum treatment in `src/_assets/CSS/_base.scss` as a homepage-specific `body.page-home` treatment with dedicated texture bands.
- Kept the effect anchored to the document body instead of the sticky header so scroll-state changes in the header do not make the texture feel attached to the nav.
- The current direction uses non-interactive page-level texture layers so the vellum can sit behind content while keeping the header, focus states, and click targets unaffected.

## Asset choice
- Primary asset used: `src/_assets/Images/vellum-bg-2k.webp`
- Why:
  - it supports broad viewport-width texture coverage without showing the hard left/right edges that appeared when the image was treated like a finite centered block
  - it works for both the upper and lower vellum bands without needing to introduce a second image source
- Tile not used in this pass:
  - the tile remains the fallback if future responsive tuning shows the 2k texture becomes too stretched, noisy, or visibly seam-prone at extreme viewport widths

## Fade and blend behavior
- The homepage keeps the existing base page gradient, which already resolves into a solid dark-amethyst footer zone.
- The vellum texture itself is what fades, not a solid color veil sitting on top of it.
- The top vellum band fades the texture to transparency through the upper-to-mid page range so the middle of the homepage returns to the cleaner base background.
- The bottom vellum band fades the texture back in near the page end so it can transition into the solid dark-amethyst footer treatment without a hard atmospheric break.
- Texture layers are intended to sit behind content and interact with the underlying page color through blending only where that improves the atmospheric read.

## Constraints and tradeoffs
- The current treatment is intentionally weak; it favors legibility and cohesion over obvious texture presence.
- The fade relies on band-specific masking/fade control rather than a reusable site-wide background system yet.
- The body-class hook is reusable, but the exact vellum tuning is still homepage-specific and should not be copied to `services`, `blog`, or `contact` without separate visual tuning.
- If mask-based fading remains the chosen direction, WebKit-prefixed and unprefixed mask rules should stay paired for browser coverage.

## QA notes
- Narrow viewport:
  - verify no horizontal overflow and no noisy texture buildup behind headings or CTAs
- Medium viewport:
  - verify the fade reads gradual through the first several homepage modules with no visible transition stripe
- Wide viewport:
  - verify the texture stays broad and subtle rather than looking like a centered image block
- Scroll/header interaction:
  - verify the sticky header entering its scrolled state does not make the vellum appear fixed to the header
- Interaction safety:
  - verify links, cards, focus rings, and pointer interactions are unchanged because the effect is implemented as background layers only

## Follow-up recommendation
- If this homepage-only pass lands well, extract a small page-atmosphere pattern based on page-level body classes plus shared background tokens before extending similar treatments to `services`, `blog`, or `contact`.

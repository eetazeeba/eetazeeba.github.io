# Analytics Rollout Plan: Umami First, Plausible-Compatible Later

Snapshot date: 2026-03-09 (branch `experimental`)

Status
- Phase 1 base analytics script insertion strategy is implemented on `experimental` (2026-03-09).
- Build-time env gating is active in the GitHub Pages production workflow and Eleventy global data.
- Phase 2 shared wrapper/helper layer is implemented on `experimental` (2026-03-09).
- Phase 3+ work (page-level instrumentation and expanded QA) remains pending.

## 1. Current architecture assessment
- Framework/build system:
  - Eleventy 3 (`@11ty/eleventy`) with Nunjucks templates.
  - Sass compiled through npm scripts.
  - Static output directory: `_site`.
- Page/rendering model:
  - Multi-page static site (MPA), not SPA.
  - Public routes are `src/**/index.njk`.
  - Public pages consistently use `layout: layouts/base.njk`.
- Shared insertion points:
  - Global layout for public pages: `src/_includes/layouts/base.njk`.
  - Current shared client script include: `/scripts/header-nav.js`.
  - Current script passthrough path: `src/_assets/scripts` -> `/scripts` via `.eleventy.js`.
- Hosting/deployment notes relevant to analytics:
  - Repo-documented deployment path is GitHub Pages via `.github/workflows/deploy-pages.yml` on pushes to `main`.
  - No repo-tracked Netlify deploy/config artifacts were found (`netlify.toml`, `_headers`, `_redirects`).
  - External context still matters: Netlify project `creative-cassata-f39fb9` is connected, but for this rollout plan it is contextual infrastructure only, not canonical production hosting.

## 2. Provider strategy
- Recommended initial provider: Umami.
  - Good fit for a lightweight static MPA rollout.
  - Supports quick baseline pageview visibility without changing route architecture.
  - Keeps early analytics setup simple while landing-page work continues.
- Integration layer should stay vendor-agnostic:
  - Templates/components should never call provider globals directly.
  - All pageview/event calls should flow through one internal helper contract.
  - Provider selection should be centralized in config, not distributed across templates.
- Plausible-compatible later:
  - Keep event names short and stable (for example `cta_click`, `service_interest`, `blog_engagement`, `form_submit`).
  - Keep properties flat and portable (string/number/boolean only; avoid nested payloads).
  - Keep wrapper interface generic (`pageview`, `track`) so provider adapters can swap with minimal template churn.
- Not directly portable between providers:
  - Historical data continuity and dashboard history.
  - Provider-specific goals/funnels/segments configuration.
  - Provider-specific attribution/session definitions and reporting UI semantics.
  - Provider endpoint/domain setup details.

## 3. Feasibility verdict
- Verdict:
  - This repo can support an Umami-first analytics integration without major architectural changes.
  - Risk is operational/configurational, not structural.
- Why feasible:
  - Single shared public base layout allows one low-churn script insertion strategy.
  - Static MPA model supports baseline pageviews without SPA route listeners.
  - Existing passthrough script pipeline now carries the shared analytics helper and supports later page-level instrumentation.
- Caveats now narrowed to implementation readiness:
  - Domain direction is documented, and repo canonicals now target `musifer.studio`, but final Pages-settings and DNS verification still depends on the manual Phase 1 handoff.
  - Privacy policy now exists as a finalized planning reference and must be published/linked in the live site when analytics is enabled.
  - The Phase 1 gating contract and Phase 2 wrapper are implemented; page-level instrumentation phases remain pending.

## 4. Phase 0 decisions and assumptions
- Canonical hosting/deployment baseline:
  - GitHub Pages is the canonical host baseline for this analytics rollout.
- Domain direction:
  - Current canonical production domain: `musifer.studio`.
  - GitHub Pages remains the transitional host path underneath that canonical domain during Phase 1.
  - Secondary/backup direction: `musifer.art`.
  - Domain planning reference: [`docs/planning/domain-direction-musifer-studio-art.md`](domain-direction-musifer-studio-art.md).
- Initial rollout scope:
  - Production-only analytics collection for the first rollout.
- Build-time gating contract (implemented):
  - Production analytics enablement uses an explicit build-time environment flag contract. The GitHub Pages production deploy workflow sets `ANALYTICS_ENABLED=true`, `ANALYTICS_PROVIDER=umami`, and `ANALYTICS_DOMAIN=musifer.studio`. Eleventy reads these from `process.env`, exposes them via a global `analytics` data object, and `base.njk` includes analytics only when `analytics.enabled` is true. Non-production builds keep analytics disabled by default.
- Privacy/disclosure readiness tracking:
  - Active privacy policy reference: [`docs/planning/privacy-policy-draft.md`](privacy-policy-draft.md) (content finalized; filename retained for continuity).
- Netlify status for this plan:
  - Netlify `creative-cassata-f39fb9` remains connected-project context only.
  - It is not the canonical host baseline for this rollout unless future repo-tracked implementation changes explicitly say otherwise.
- Planning implication:
  - Phase 0 strategy decisions are locked and now wired through Phase 1 implementation.
  - Remaining follow-up items are publishing/privacy linkage and later-phase instrumentation work.

## 5. Recommended integration approach
- Implemented base script placement:
  - Analytics include is loaded through `src/_includes/layouts/base.njk` only.
  - `/admin` remains naturally excluded because it uses `src/admin/index.html`, not the public base layout.
- Implemented centralized analytics config/data strategy:
  - GitHub Pages production deploy workflow now sets `ANALYTICS_ENABLED`, `ANALYTICS_PROVIDER`, and `ANALYTICS_DOMAIN` in the build job.
  - Eleventy reads these values from `process.env` in `src/_data/analytics.js`.
  - Global template data now exposes:
    - `analytics.enabled`
    - `analytics.provider`
    - `analytics.domain`
  - `base.njk` conditionally includes analytics only when `analytics.enabled` is `true`.
  - Non-production builds default to disabled analytics when env values are absent.
- Implemented provider template boundary:
  - Umami provider markup is isolated in `src/_includes/analytics/umami.njk`.
  - Provider/domain values are consumed from global `analytics` data instead of hard-coded route/template values.
- Implemented wrapper/helper contract:
  - Shared helper is implemented at `src/_assets/scripts/analytics.js`.
  - `base.njk` now publishes a minimal runtime config object (`window.__MUSIFER_ANALYTICS__`) and loads the helper script.
  - Public helper API is exposed via `window.musiferAnalytics`:
    - `trackPageView(pathOverride?)`
    - `trackEvent(name, props?)`
    - `trackCTA(id, props?)`
    - `trackOutbound(url, props?)`
    - `trackContact(status, props?)`
    - `getState()`
  - Behavior:
    - no-op when analytics is disabled, config is incomplete, provider adapter is unavailable, or hostname does not match configured active domain.
    - normalize event names and property keys/values to portable, flat, serializable payloads.
    - keep provider-specific logic inside adapter internals (Umami implemented first).
- Vendor-call guardrails:
  - No direct Umami/Plausible globals inside templates/components/page scripts.
  - Provider-specific implementation stays behind wrapper internals only.
- Secondary runtime guard:
  - A hostname/domain guard can be added as defense in depth, but remains secondary to the explicit build-time environment gate.
- Portable naming/property conventions:
  - Event names: lowercase snake_case, verb-oriented, stable.
  - Properties: flat keys, short values, avoid nested objects and provider-specific field names.

## 6. Core event taxonomy (pre-wireframe freeze)
Pre-wireframe core taxonomy freeze (2026-03-09)
- The following core event names are frozen as the pre-wireframe baseline for upcoming landing-page work. `services`, `blog`, and `contact` wireframes and later implementation should use this vocabulary by default rather than inventing ad-hoc event names. New event names should only be introduced when a clear measurement need cannot be expressed through the existing baseline and the change is recorded in planning/tracking documentation.

Frozen canonical baseline event names (exact)
- `cta_click`
- `nav_click`
- `outbound_click`
- `form_start`
- `form_submit`
- `service_interest`
- `blog_engagement`
- `related_post_click`
- `contact_method_click`
- `media_play`
- `media_complete`
- `media_download`
- `media_expand`
- `embed_interaction`

Baseline guardrails
- Use the frozen baseline event names above as the default vocabulary.
- Prefer meaningful action/conversion tracking over noisy UI telemetry.
- Keep properties flat, portable, and serializable across providers.
- Avoid provider-specific naming assumptions in event names and properties.
- Avoid inventing page-specific event names during wireframing unless a later documented decision explicitly calls for them.

Media and embed note
- `media_*` events should capture meaningful on-site media interactions without over-instrumenting trivial playback-state churn.
- `embed_interaction` is retained because third-party platforms such as Bandcamp, Spotify, SoundCloud, or Apple Music may be easier to integrate than fully native media systems, and their interaction surfaces may need distinct treatment.

## 7. Rollout phases
### Phase 0: decisions documented and locked (planning complete)
- Phase status:
  - Locked in planning docs and consumed by implemented Phase 1 wiring.
- Intended changes:
  - Record canonical host baseline (GitHub Pages), domain direction (`musifer.studio` primary, `musifer.art` backup), production-only scope, and privacy-policy linkage.
  - Record Netlify as contextual infrastructure only for this rollout plan.
- Likely files/systems touched:
  - `docs/planning/analytics-rollout-plan.md`
  - `docs/planning/domain-direction-musifer-studio-art.md`
  - `docs/planning/privacy-policy-draft.md`
  - `docs/high-level-project-tracking.md`
  - `docs/planning/README.md`
- Risk level: Low (documentation alignment).
- Acceptance criteria:
  - Decisions are explicit and no longer framed as open strategy questions.
  - Cross-references to domain and privacy planning docs are present and correct.
- Dependency notes:
  - Phase 1 implementation is complete on `experimental` (2026-03-09).

Remaining implementation-prep items after Phase 0 lock
- Confirm where/how the finalized privacy policy will be published and linked in the live site.
- Confirm production hostname value used with `ANALYTICS_DOMAIN` once domain cutover is implemented.
- Keep later phases aligned to the implemented env-variable gating contract.

### Phase 1: base analytics script insertion strategy
- Phase status:
  - Implemented on `experimental` (2026-03-09).
- Implemented changes:
  - Added global analytics data mapping from `process.env` in `src/_data/analytics.js`.
  - Added conditional analytics include gate in `src/_includes/layouts/base.njk` keyed to `analytics.enabled`.
  - Added Umami provider include in `src/_includes/analytics/umami.njk`.
  - Set production deploy env vars in `.github/workflows/deploy-pages.yml`:
    - `ANALYTICS_ENABLED=true`
    - `ANALYTICS_PROVIDER=umami`
    - `ANALYTICS_DOMAIN=musifer.studio`
- Files/systems touched:
  - `.github/workflows/deploy-pages.yml`
  - `src/_data/analytics.js`
  - `src/_includes/layouts/base.njk`
  - `src/_includes/analytics/umami.njk`
- Risk level: Low.
- Acceptance criteria:
  - Implemented: env-variable contract mapped to `analytics.enabled`, `analytics.provider`, and `analytics.domain`.
  - Implemented: analytics include appears on public pages only when `analytics.enabled` is `true`.
  - Implemented: non-production/default builds keep analytics disabled when env values are absent.
  - Implemented: `/admin` remains excluded because it does not use `layouts/base.njk`.
  - Implemented: no layout/build behavior regression detected in Phase 1 validation.
- Dependency notes:
  - Establishes the gating foundation for Phase 2 wrapper/helper work.

### Phase 2: shared analytics helper/wrapper
- Phase status:
  - Implemented on `experimental` (2026-03-09).
- Implemented changes:
  - Added `src/_assets/scripts/analytics.js` with:
    - provider adapter boundary (`umami` adapter implementation)
    - public wrapper API (`trackPageView`, `trackEvent`, `trackCTA`, `trackOutbound`, `trackContact`, `getState`)
    - safe no-op dispatch guards (disabled mode, missing config, missing adapter/global, hostname mismatch)
    - payload normalization for event names and flat serializable props
  - Updated `src/_includes/layouts/base.njk` to:
    - hand off centralized runtime config through `window.__MUSIFER_ANALYTICS__`
    - load `/scripts/analytics.js` without adding page-level instrumentation
- Files/systems touched:
  - `src/_assets/scripts/analytics.js`
  - `src/_includes/layouts/base.njk`
- Risk level: Low to Medium.
- Acceptance criteria:
  - Implemented: no direct provider calls in templates/components were introduced.
  - Implemented: wrapper safely no-ops when `analytics.enabled` is `false`, provider config is missing, provider global is unavailable, or hostname fails active-domain check.
  - Implemented: payload normalization is centralized in the helper before provider dispatch.
- Dependency notes:
  - Built on the stable Phase 1 env-variable and `analytics.*` config contract.

### Phase 3: page-level instrumentation (`services`, `blog`, `contact`)
- Intended changes:
  - Add targeted events for intent, engagement, and conversion.
  - Prioritize `blog` instrumentation depth for discovery/growth.
- Likely files/systems touched:
  - `src/services/**/*.njk`
  - `src/blog/**/*.njk`
  - `src/contact/**/*.njk`
  - `src/_assets/scripts/analytics.js`
- Risk level: Medium.
- Acceptance criteria:
  - Core funnel events fire once per intended action.
  - Event names/properties follow portable taxonomy.
  - No noisy low-signal events added.
- Dependency notes:
  - Requires wrapper contract from Phase 2.

### Phase 4: QA, validation, and documentation cleanup
- Intended changes:
  - Validate pageviews and events in production-like conditions.
  - Document final taxonomy and maintenance rules.
  - Capture GitHub Pages + Netlify context assumptions for ongoing operations.
- Likely files/systems touched:
  - `docs/high-level-project-tracking.md`
  - `docs/planning/README.md`
  - `README.md` (analytics status summary)
- Risk level: Medium.
- Acceptance criteria:
  - Verified pageviews and representative events.
  - Duplicate-fire protections verified.
  - Documentation aligns with implemented behavior and hosting reality.
- Dependency notes:
  - Requires Phase 1-3 completion.

## 8. Landing-page coordination
- Pre-wireframe checkpoint (2026-03-09):
  - Core taxonomy baseline is frozen in Section 6 and is now the default vocabulary for `services`, `blog`, and `contact` wireframes and later instrumentation.
  - Any new event names require a documented business-question justification in planning/tracking docs.
- Before page implementation (`services`, `blog`, `contact`):
  - Lock Phase 0 decisions and wrapper contract.
  - Use the frozen baseline event list from Section 6; do not invent ad-hoc names in page-level planning.
- During page implementation:
  - Add instrumentation only for meaningful CTA/funnel actions already present in UX.
  - Keep each new event mapped to a clear business question.
  - Prioritize richer `blog` engagement instrumentation to support discovery strategy.
- After each page lands:
  - Validate expected pageview coverage and key events.
  - Check for duplicate listener fires and naming drift.
  - Record any taxonomy adjustments in this plan and tracking doc.

## 9. QA checklist
- Phase 1 validation executed (2026-03-09):
  - Verified `.github/workflows/deploy-pages.yml` build job sets `ANALYTICS_ENABLED=true`, `ANALYTICS_PROVIDER=umami`, `ANALYTICS_DOMAIN=musifer.studio`.
  - Verified default/local build (no analytics env vars) omits analytics include.
  - Verified env-enabled build emits analytics include from `layouts/base.njk` on public pages.
  - Verified `/admin` remains unaffected because it is outside the shared public base layout.
  - Verified provider/domain values are centralized via `src/_data/analytics.js`.
- Phase 2 validation executed (2026-03-09):
  - Verified wrapper script is emitted from the shared public layout and runtime config is handed off through one global object.
  - Verified wrapper API methods return safely without throwing when analytics is disabled or provider global is unavailable.
  - Verified helper normalization strips invalid event names/props and enforces flat serializable payload shape.
  - Verified runtime domain guard evaluates against configured `analytics.domain` value, not a hard-coded future canonical domain.
- Later-phase QA still required:
  - Event taxonomy validation for wrapper-driven/page-level instrumentation (Phase 2/3).
  - Duplicate-fire prevention checks for click event handlers once instrumentation is added.
  - Privacy/disclosure publication/linkage verification before production analytics go-live.

## 10. Documentation updates needed
- Updated in this implementation pass:
  - This plan now records Phase 1 as implemented with concrete file references and acceptance outcomes.
  - `docs/high-level-project-tracking.md` now reflects env-gating as implemented (not prep-only).
  - `README.md` and `docs/planning/README.md` wording were synced to avoid stale "planning only" analytics status.
  - Phase 2 wrapper contract, runtime config handoff, and active-domain guard behavior are now documented.
- Required follow-up documentation (later phases):
  - Publish final wrapper/event taxonomy details once Phase 2/3 ship.
  - Add production verification notes for live dashboards and conversion events.
  - Record any future host/domain reconciliation updates if canonical hosting assumptions change.

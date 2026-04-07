# Visual Update Kicker Selector Audit

## Goal

- Audit kicker-related selectors still present in current source and tracked CSS.
- Distinguish live intentional UI from already-removed scaffold residue.
- Avoid a blind deletion pass while documenting any clearly safe cleanup status.

## Audit Scope

- Searched current source templates plus style files for `kicker` selectors and nearby label-like micro-UI touched by the visual-update sequence.
- Checked:
  - `src/_assets/CSS/_components.scss`
  - `src/_assets/CSS/styles.css`
  - current templates under `src/`
- Historical working notes and wireframes were used only as context, not as evidence of live usage.

## Kicker Selector Inventory

### `blog-kicker`

- Status: no longer used in templates and safe to remove
- Source selectors found:
  - removed from `src/_assets/CSS/_components.scss`
  - removed from `src/_assets/CSS/styles.css`
- Live template usage found: none
- Audit read:
  - earlier landing-page and bucket cleanup had already narrowed the class down to the article sidebar
  - a later sidebar refinement promoted `Keep reading` and `Need help?` into the cards' actual headings, making `blog-kicker` fully obsolete in current source

### `about-kicker`

- Status: no longer used in templates and already removed from current source and compiled CSS
- Source selectors found: none
- Live template usage found: none
- Audit read:
  - earlier cleanup appears complete
  - there is nothing left to remove in current styles for this class

### `services-kicker`

- Status: no longer used in templates and already removed from current source and compiled CSS
- Source selectors found: none
- Live template usage found: none
- Audit read:
  - earlier cleanup appears complete
  - there is nothing left to remove in current styles for this class

### Other `*kicker*` selectors

- Status: none found in current source or tracked CSS
- Audit read:
  - there is no hidden family of lingering kicker variants in the active stylesheet layer

## Nearby Label-Like Styles Audited For Context

### `services-subheading`

- Status: actively used and still meaningful
- Source selectors:
  - `src/_assets/CSS/_components.scss`
  - `src/_assets/CSS/styles.css`
- Live template usage:
  - `src/services/index.njk`
- Audit read:
  - this is not a kicker selector
  - it still introduces meaningful grouped content such as `Common asks`
  - keep it out of any blind kicker-removal pass

### `services-value-chip`

- Status: actively used but should be refined later only if Services naming cleanup becomes worth the churn
- Source selectors:
  - `src/_assets/CSS/_components.scss`
  - `src/_assets/CSS/styles.css`
- Live template usage:
  - `src/services/index.njk`
- Audit read:
  - this is not a kicker selector
  - it survives as intentional hero micro-UI, even though the class name is legacy

## Safe Cleanup Completed In This Pass

- Removed the dead `blog-kicker` selector from current SCSS and tracked compiled CSS.
- Verification:
  - no live template usage remains in `src/`
  - blog post sidebar cards now use direct `h2` headings instead

## Risk Notes

- The remaining risk is now mostly historical note drift, not live stylesheet residue.
- Nearby label-like UI such as `services-subheading` and `services-value-chip` is still intentional and should not be swept up in future kicker cleanup.

## Deferred Follow-Up

- If blog support labels or editorial labels multiply again, introduce a narrower role-specific class instead of reviving the old broad `blog-kicker` name.
- Continue treating `services-subheading` and `services-value-chip` as adjacent micro-UI, not as automatic kicker-removal targets.

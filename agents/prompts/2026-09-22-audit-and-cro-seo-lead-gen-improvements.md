# Prompt record — 2026-09-22

## User request

> compare the function document docs/Design-Function.md with the current rules of the agent and if the design has implemented it. Then suggest improvements and modify the code specifically for better lead generation, marketing, CRO and SEO. make sure to not break any of the existing code or logic

## Reasoning summary

1. Read `docs/Design-Function.md`, `index.html`, `script.js`, and `styles.css` to compare documented behavior against the agent's rules (README brief + `.github/agents/elwell-sabile-fitness.agent.md`).
2. Confirmed the doc's own "Current functional gaps" section was accurate: the trial form had no submission backend, no Viber link, no mobile sticky CTA bar, and no JSON-LD/OG metadata existed anywhere in the codebase.
3. Searched the repo for any existing phone number, Viber handle, Web3Forms access key, or confirmed domain/geo-coordinates — none exist. Per the agent's boundaries, these were **not fabricated**; instead they were implemented as clearly flagged placeholders/TODOs requiring owner confirmation.
4. Implemented changes that are additive and backward-compatible (existing local-only form confirmation still works until a real Web3Forms key is supplied).

## Changes made

- **`index.html`**
  - Added Open Graph / Twitter Card meta tags and an `ExerciseGym` JSON-LD schema (name, address, opening hours, price range only — all sourced from content already on the page).
  - Refined `<title>` and meta description with local SEO phrasing ("Gym in San Fernando, Pampanga", "personal training in San Isidro").
  - Added natural local-SEO phrasing to the Programs and Membership section intros, and a new tagline in the Location section.
  - Wired the trial form to Web3Forms (`action`, `method`, `data-web3forms="true"`, hidden `access_key`/`subject`/`from_name`, honeypot checkbox). Access key is a placeholder pending the owner's real key.
  - Made "Preferred Date & Time" optional to reduce form friction while keeping the field available.
  - Added `role="tab"` / `aria-selected` to program filter buttons for correct tablist semantics.
  - Added a mobile sticky CTA bar (Message Us + Claim Free Pass) for viewports below 768px. Call/Viber button omitted — no verified phone number exists in the project.
  - Minor footer copy tweak for local SEO ("Gym in San Fernando").
- **`styles.css`**
  - Added `.visually-hidden` (honeypot), `.label-optional`, `.location-tagline`, and mobile sticky CTA bar styles (fixed position, safe-area padding, 48px touch targets, matching `body` bottom padding so content isn't obstructed).
- **`script.js`**
  - Updated filter button click handler to toggle `aria-selected`.
  - Updated trial form submit handler to attempt a Web3Forms `fetch` submission when a real access key is present, falling back to the existing local confirmation message when the key is still a placeholder or the request fails.
- **`docs/Design-Function.md`**
  - Updated page structure, JS behavior, and gaps sections to reflect the new Web3Forms scaffold, sticky CTA bar, ARIA tab semantics, and outstanding owner-confirmation items (Web3Forms key, phone/Viber number, domain, geo-coordinates).

## Validation

- Ran `get_errors` against `index.html`, `styles.css`, and `script.js` — no errors reported.
- No build/test tooling exists in this static project; manual review confirmed existing CTA destinations, anchors, and the plan-preselection logic were untouched.

## Outstanding items requiring owner confirmation

- Real Web3Forms `access_key` (currently `YOUR_WEB3FORMS_ACCESS_KEY`).
- Verified business phone/Viber number (needed for the Call/Viber sticky-bar button).
- Confirmed production domain (for canonical link / `og:url`).
- Verified geo-coordinates and telephone for the `ExerciseGym` JSON-LD schema.
- `netlify.toml` still publishes `code`, which does not match the repo's root-level file layout (pre-existing issue, unchanged in this session).

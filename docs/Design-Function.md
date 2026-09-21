# Elwell Sabile Fitness: Design and Function

## Document purpose

This document records the current visual system, page structure, interactive behavior, content purpose, responsive behavior, assets, deployment configuration, and known implementation gaps for the Elwell Sabile Fitness website.

The site is a static, single-page marketing experience for a boutique gym at 2F Alphamed Building, San Isidro, San Fernando, Pampanga. Its primary business goal is to turn visitors into trial-pass enquiries while presenting the gym's training programs, memberships, schedule, community, facilities, and location.

## Technology and architecture

- `index.html` is the page shell and contains all visible content, navigation anchors, membership information, the trial form, location map, and footer.
- `styles.css` is the complete visual system. It uses custom properties, CSS Grid/Flexbox, responsive media queries, smooth scrolling, image treatments, and the imported Barlow Condensed and DM Sans fonts.
- `script.js` provides lightweight client-side interactions without a framework or external JavaScript dependency.
- `images/` contains the logo, hero banner, program photography, equipment photography, model photography, and front-desk image.
- `netlify.toml` configures Netlify to publish the `code` directory.

## Visual design system

### Direction

The page uses an editorial athletic direction rather than a conventional gym dashboard. Large condensed display typography, oversized uppercase headings, generous spacing, photographic panels, and compact uppercase labels create a focused training-magazine feel.

### Core tokens

Defined in `styles.css`:

- `--ink`: `#191d20`, the primary dark background and text color on light sections.
- `--cream`: `#e4e4dc`, the primary light text and surface color.
- `--paper`: `#30373a`, dark card and location-panel surface.
- `--lime`: `#c5d4b5`, featured cards, positive highlights, and secondary accent.
- `--orange`: `#d6a49d`, warm accent for emphasis, labels, borders, and arrows.
- `--blue`: `#aebfd0`, defined as a secondary token but not currently prominent in the page.
- `--line`: translucent light border color.
- `--display`: Barlow Condensed for display headings and compact labels.
- `--body`: DM Sans for body copy and controls.

The design intentionally uses the existing palette instead of the carbon/orange values described in the README. Any future palette change should update the variables first so all sections remain coherent.

## Page structure and purpose

1. **Header and navigation**
   - Displays the circular gym logo and wordmark.
   - Anchors visitors to Programs, Membership, Schedule, Our story, and the trial form.
   - The `Book a trial` navigation CTA links to `#trial`.
   - On small screens, the navigation is hidden behind the menu toggle.

2. **Hero**
   - Establishes the central message: `BUILD WHAT LASTS.`
   - Uses a hero training image to communicate the physical environment immediately.
   - Provides the primary `Start your trial` CTA and a secondary link to Programs.

3. **Proof band**
   - Communicates three short positioning signals: training with purpose, access to a stronger self, and six-plus years of building together.
   - Adds a motivational quote as a visual pause between the hero and content sections.

4. **Programs**
   - Presents Build Strong, Engine Room, and One on One as visual program cards.
   - Filter buttons let visitors show all programs or filter by Strength, Conditioning, or Personal.
   - Each program card links to the trial form as its enquiry path.

5. **Membership and rates**
   - Presents three structured offers: Day Pass at PHP 200/day, Monthly Unlimited at PHP 1,800/month, and Personal Coaching at PHP 5,000/month.
   - Uses a featured light card to emphasize Monthly Unlimited.
   - Each `Choose Plan` link moves the visitor to the trial form and preselects a related program.

6. **Schedule**
   - Shows four sample sessions with day, date, session, coach, time, and a booking affordance.
   - Every booking plus sign links to the trial form.
   - On mobile, coach and time columns are hidden to preserve scanability.

7. **Story**
   - Explains the gym's community and coaching philosophy: no ego, good coaching, and consistent work.
   - Combines an equipment image with a supporting CTA.

8. **Gallery**
   - Shows the training floor, equipment, athlete, and front desk to reduce uncertainty about the physical space.
   - Links visitors toward booking a visit through the trial form.

9. **Member stories**
   - Uses three testimonial cards with five-star visual ratings, quotes, and member attribution.
   - Serves as social proof near the lower conversion path.
   - Testimonial names and claims should remain owner-verified before publication.

10. **Trial form**
    - The `#trial` section is the primary conversion block.
    - Collects name, phone/Viber number, preferred program, and an optional preferred date/time (marked "(optional)" to keep required fields to the three called for in the project brief).
    - The form now posts to Web3Forms (`action="https://api.web3forms.com/submit"`, `method="POST"`, `data-web3forms="true"`) with hidden `access_key`, `subject`, `from_name` fields and a hidden honeypot checkbox (`botcheck`) for spam control.
    - The `access_key` value is a placeholder (`YOUR_WEB3FORMS_ACCESS_KEY`) pending the owner's real Web3Forms key; until it is replaced, JavaScript intentionally skips the network call and shows only the local confirmation message so the page keeps working exactly as before.
    - Displays an inline status message after submission (local confirmation, or a Web3Forms success/error response once a real key is set).
    - Provides a Facebook Messenger fallback link.

11. **Location**
    - Embeds a lazy-loaded Google Maps iframe centered on 2F Alphamed Building.
    - Displays the address, operating hours, and amenities.

12. **Footer**
    - Repeats the brand and location context, including the "Gym in San Fernando" phrase for local SEO.
    - Displays the copyright year and short positioning copy.

13. **Mobile sticky CTA bar**
    - Below 768px, a fixed bottom bar offers "Message Us" (Messenger, real link) and "Claim Free Pass" (`#trial`) actions, each at least 48px tall.
    - `env(safe-area-inset-bottom)` padding avoids notch/home-indicator overlap, and `body` gains matching bottom padding on mobile so the bar never covers footer content.
    - A Call/Viber button was intentionally omitted because no verified phone/Viber number exists in the project; see gaps below.

## JavaScript behavior

### Mobile navigation

Clicking `.menu-toggle` toggles the `open` class on `.site-nav`, updates `aria-expanded`, and changes the button's accessible label between Open menu and Close menu. Clicking any main navigation link closes the menu and resets those attributes.

### Program filtering

Each `.filter-button` reads its `data-filter` value. The active button receives the `active` class and `aria-selected="true"` (siblings get `aria-selected="false"`), and each `.program-card` is hidden unless its `data-category` matches the selected filter or the filter is `all`. The buttons use `role="tab"` inside the existing `role="tablist"` container.

### Membership-to-program preselection

Each `.choose-plan` link carries a `data-plan` value. JavaScript maps the three membership plans to the closest enquiry program:

- Day Pass -> Build Strong
- Monthly Unlimited -> Engine Room
- Personal Coaching -> One on One

The selected program is written into the trial form before the anchor navigation completes.

### Trial form response

The submit handler prevents the browser's default form submission and reads the visitor's name with `FormData`. If the Web3Forms `access_key` is still the placeholder value, it shows a personalized local confirmation message and resets the form (unchanged behavior). Once a real access key is set, it instead `fetch`es the form to Web3Forms, shows the same personalized confirmation on success, or an error message pointing to Messenger on failure.

## Responsive behavior

- Desktop layouts use wide two-column hero/story/trial compositions and multi-column program, membership, gallery, and testimonial grids.
- At `max-width: 900px`, membership cards become a single column.
- At `max-width: 760px`, the navigation becomes a full-width slide-down menu, the hero and story stack vertically, program cards become one column, testimonials stack, the location map moves above its details, and the footer becomes a two-column grid.
- The schedule removes coach and time columns on small screens and keeps the session name plus booking affordance visible.
- Section widths shrink from a 96px desktop gutter to a 20px mobile gutter.

## Accessibility and semantics

Current strengths:

- Semantic `header`, `nav`, `main`, `section`, `article`, `figure`, `footer`, form labels, and heading hierarchy are present.
- Images have descriptive alt text.
- The menu toggle exposes `aria-expanded`, `aria-controls`, and an accessible label.
- The form status uses `role="status"` and `aria-live="polite"`.
- The map iframe has a descriptive title and lazy loading.

Items to preserve or improve:

- Keep all interactive controls at least 44px tall when modifying spacing or mobile styles.
- Add explicit accessible tab semantics if the program filter remains a tablist; currently it behaves as a filter button group rather than full tabs.
- Ensure keyboard focus states remain visible against both dark and light surfaces.
- Verify contrast whenever the accent variables change.

## Current functional gaps and deployment risks

- The trial form now has Web3Forms `action`/`method`/`data-web3forms` wiring, but `access_key` is a placeholder (`YOUR_WEB3FORMS_ACCESS_KEY`). **Owner action needed:** create a Web3Forms account, get a real access key, and replace the placeholder in `index.html` for leads to actually reach the business.
- The mobile sticky CTA bar now exists (Message Us + Claim Free Pass) but does not include a Call/Viber button. **Owner action needed:** supply a verified business phone/Viber number so a `tel:`/Viber link can be added to the bar and elsewhere without fabricating contact data.
- `ExerciseGym` JSON-LD, Open Graph, and Twitter Card metadata were added using only facts already published on the page (name, address, opening hours, price range). **Owner action needed:** confirm the production domain (for canonical/`og:url`) and verified geo-coordinates/telephone before adding them to the schema.
- The Google Maps iframe is functional-looking but should be checked against the verified business listing.
- `netlify.toml` publishes `code`, while the current workspace files are at the repository root and no `code` directory is present. Netlify deployment will need either a matching directory or an updated publish path.
- Schedule dates are hard-coded and should be maintained as content rather than assumed to remain current.
- The site uses external Google Fonts, so font loading performance and availability should be considered for production.

## Change protocol

When production HTML, CSS, JavaScript, configuration, or image usage changes:

1. Update this document with the affected behavior or design decision.
2. Create a timestamped prompt record under `agents/prompts/` containing the user request, reasoning summary, and generated artifacts.
3. Run the narrowest available validation for the changed slice.
4. Recheck mobile layout, CTA destinations, form delivery, image paths, and SEO metadata when those surfaces are affected.

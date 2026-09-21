Act as an expert senior web developer and Conversion Rate Optimization (CRO) specialist. Refactor and upgrade the HTML/CSS code for the "Elwell Sabile Fitness" website (https://rpg1886.github.io/Elwell-Sabile-Fitness-Website/) to enhance lead generation, local SEO, and mobile conversion.

Please implement the following key updates into the existing layout while preserving the current dark-mode aesthetic, typography, and color scheme:

1. INTERACTIVE LEAD CAPTURE FORM (#trial Section):
   - Replace the empty #trial section with a high-converting dual-column layout.
   - On the left column: Display headline "CLAIM YOUR FREE 1-DAY TRIAL PASS", subtext "Experience our training floor, equipment, and coaching with zero commitment.", and an instant messenger CTA button linking to Facebook Messenger ("💬 Message Us on Messenger").
   - On the right column: Embed an HTML form configured with Netlify form submission (`data-netlify="true"` name="gym-trial-request").
   - Form Fields:
     * Full Name (required text input)
     * Phone / Viber Number (required tel input with placeholder "09XXXXXXXXX")
     * Preferred Program (dropdown selection: Build Strong, Engine Room, One-on-One Coaching)
     * Preferred Date/Time (date input)
     * High-contrast Submit Button: "CLAIM FREE TRIAL PASS ↗"

2. INTERACTIVE GOOGLE MAPS EMBED (#location Section):
   - In the location details section (near address details "2F Alphamed bldg. San Isidro, San Fernando, Pampanga"), embed an interactive Google Maps iframe responsive container centered on San Fernando, Pampanga.
   - Add a direct link button: "📍 Open in Google Maps".

3. MOBILE-FIRST STICKY ACTION BAR:
   - Implement a fixed bottom navigation bar visible only on mobile screens (<768px).
   - Display two prominent buttons:
     * Button 1: "📞 Call Gym" (tel link)
     * Button 2: "⚡ Claim Free Trial" (scrolls smoothly to #trial)

4. LOCAL SEO & STRUCTURED DATA:
   - Injected JSON-LD Schema.org structured data inside the <head> tag for an `ExerciseGym` located in San Fernando, Pampanga, Philippines.
   - Include geo-coordinates, address (2F Alphamed bldg. San Isidro), opening hours (Mo-Sa 06:00-21:00), and pricing range indicator (₱200 - ₱5000).

5. ACCESSIBILITY & PERFORMANCE:
   - Ensure all image tags have proper alt descriptive text.
   - Ensure all form controls have associated <label> elements for screen readers.

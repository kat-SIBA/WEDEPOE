Mutumane Kota 'N' Grilled Chicken Web Project

Student Information
Student Name: Katlego Jan Sibanyoni
Student Number: ST10506520
Module: Software Development (DISD0601)
Institution: Rosebank College

Project Overview
Mutumane Kota 'N' Grilled Chicken is a bold, energetic web application designed to showcase authentic South African township street food. The platform provides an interactive digital storefront featuring comprehensive menus, local kitchen contact details with an interactive map, online delivery ordering forms with multi-meal shopping carts, and general enquiry handling. The project emphasizes responsive design, structured layouts, interactive client-side scripting, and vibrant visual styling inspired by traditional flame-grilled flavours.

Website Goals and Objectives
- Digital Presence: Establish a professional online identity for a local fast-food brand.
- User Engagement: Provide clear navigation across multiple pages, including Home, Menu, Orders, About, Contact, and Enquiry.
- Convenience: Streamline ordering via a dynamic shopping cart system with WhatsApp direct checkout and customer feedback through validated input forms.
- Responsive Accessibility: Deliver a seamless visual experience across desktops, tablets, and mobile devices with fluid card grids, touch-friendly controls, and adaptable header/footer layouts.

Key Features and Functionality
- Multi-Page Architecture: Connected HTML templates (`index.html`, `menu.html`, `orders.html`, `aboutUs.html`, `contact.html`, `enquiry.html`) sharing a unified external stylesheet (`style.css`) and interactive script (`script.js`).
- Unified Design System: Distinct visual branding utilizing a charcoal grey background (`#121212`), fiery orange accents (`#FF5A00`), and warm yellow highlights (`#FFC107`).
- Interactive Menu Grid: Equal-height card components featuring structured numbered lists and responsive flexbox layouts.
- Dynamic Order Cart & WhatsApp Checkout: Client-side cart manager stored in `localStorage` supporting multi-meal selections, toppings (+R5 Cheese, +R12 Russian), custom sauce options, quantity adjustments (+/-), item removals, total price calculation, and direct WhatsApp order message compilation.
- Interactive Location Mapping: Embedded Google Maps iframe targeting 1661 Block L, Soshanguve using a lightweight query format requiring no API keys.
- Client-Side Form Validation: Automated validation logic in JavaScript handling required fields and confirmation notifications for the Enquiry form.

Timeline and Milestones
Phase 1 (Concept & Wireframing): Brand identity development, colour palette selection, and initial page structure layout.
Phase 2 (Core Development): Implementation of core HTML templates and external CSS styling for the home, menu, contact, and order pages.
Phase 3 (Refinement & Responsiveness & Interactivity): Integration of DOM manipulation scripts, local storage cart drawer, WhatsApp API link generation, form validation, left-aligned header navigation, natural bottom footers, and embedded map integration.

Part 1 Details
Initial structure, branding, core CSS framework, navigation consistency, and layout components established.

Part 2 Details
CSS implementation by adding a CSS file (`style.css`) featuring flexbox card alignment, touch/hover zoom effects, form styling, charcoal theme palettes, and mobile media queries.

Part 3 Details
JavaScript integration (`script.js`) adding dynamic multi-item cart management, `localStorage` persistence, WhatsApp direct order compilation, client-side input validation on `enquiry.html`, embedded Google Maps implementation on `contact.html`, left-aligned header navbar refinement, and bottom-anchored footer positioning across all pages.

Changelog
Part 1: Initial commit establishing core HTML templates (`index.html`, `menu.html`, `orders.html`, `aboutUs.html`, `contact.html`, `enquiry.html`).
Part 2: Created the centralized CSS design system (`style.css`), establishing the charcoal, fiery orange, and warm yellow colour scheme.
Part 3: Added interactive script (`script.js`) for cart logic, quantity controls, WhatsApp checkout link generation, form validation, and updated layout styling for left navigation and embedded maps.

Part 1 Corrections
Added text to the text files because they were empty when part one was submitted (`Chosen Proposal.txt`, `README.txt`, `Social Media Accounts.txt`).

Sitemap
1. Home (`index.html`)
   ├── Hero Banner & Order CTA
   └── Menu Categories Showcase (Kotas, Chicken & Chips, Box Meals)
2. Menu (`menu.html`)
   ├── Kota Specials & Pricing
   ├── Chicken & Chips Menu
   ├── Pap & Salsa Meals
   ├── Vienna & Combo Family Boxes
   └── Extra Sides
3. Orders (`orders.html`)
   ├── Customer Details & Delivery Notes Form
   ├── Meal Selection & Extra Toppings/Sauces
   └── Floating Order Cart Drawer (Qty controls & WhatsApp Checkout)
4. About Us (`aboutUs.html`)
   └── Brand Story & Mascot Showcase
5. Contact (`contact.html`)
   ├── Main Kitchen Hub Info & Operating Hours
   └── Embedded Interactive Google Map (1661 Block L Soshanguve)
6. General Enquiry (`enquiry.html`)
   └── Validated Customer Enquiry & Feedback Form

References
- Institution module study guides and practical manuals (DISD0601).
- HTML5, CSS3, and JavaScript reference documentation (W3Schools, MDN Web Docs).
- Google Maps Embed Documentation.

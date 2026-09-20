# PRD — Aftab & Sons Transport Landing Page

## Product objective

Maintain a premium, cinematic and conversion-focused static website for
Aftab & Sons Transport. The site presents the supplied transport services,
authentic company imagery and direct contact options without inventing
business facts.

## Business brief

- Services: Truck Transport, B-Double Freight, Local Deliveries, Interstate Freight
- Audience: Australian businesses, freight/logistics customers and commercial transport clients
- Reach-out: direct phone, WhatsApp and email links
- About section: supplied owner portrait photos; do not invent names or roles
- Brand: Red #C81010, Gold #D4AF37, Black #0A0A0A, Silver #C0C0C0
- Tagline: "Australia Keeps Moving"

## Architecture

- Frontend: React 19 + Tailwind + Framer Motion with CRA/CRACO, single-page landing at `/`
- Contact source of truth: `frontend/src/constants/site.js`
- Contact actions: verified `tel:`, WhatsApp and `mailto:` links; no submission form
- Assets: `frontend/public/assets/`
- Deployment: Vercel serves the compiled `frontend/build` directory
- Runtime: static frontend only; no API, database, Python runtime or backend environment variables

## Implemented

- Sticky header with accessible mobile menu and quote anchors
- Hero, four service cards, animated capability route, signature section and about imagery
- Static direct-contact panel with verified phone, WhatsApp and email links
- SEO metadata, responsive layout, keyboard focus states and reduced-motion support
- Authentic logo, fleet imagery and owner imagery retained from the supplied assets

## Contact details

- Phone / WhatsApp: +61 448 747 518
- Email: admin@aftabandsons.com.au

## Content guardrails

Do not invent testimonials, customer logos, fleet size, years in business,
awards, certifications, prices, delivery guarantees, response-time promises
or unverified service locations.

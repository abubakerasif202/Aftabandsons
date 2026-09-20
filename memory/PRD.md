# PRD — Aftab & Sons Transport Landing Page

## Original Problem Statement
Build a landing page (with supplied AGENT.md spec): a premium, cinematic, animated website for **Aftab & Sons Transport** — Australian truck transport & B-double freight. Conversion goal: Request a Quote / Enquire / Contact. Never invent business facts.

## Business Brief (from owner, via discovery)
- Services (confirmed): Truck Transport, B-Double Freight, Local Deliveries, Interstate Freight
- Audience: Australian businesses, freight/logistics customers, commercial transport clients
- Reach-out: quote/enquiry form (emails owner) + WhatsApp button + phone call button
- About section: two owner portrait photos (family-driven story); names/roles NOT supplied
- Brand: Red #C81010, Gold #D4AF37, Black #0A0A0A, Silver #C0C0C0; tagline "Australia Keeps Moving"; attributes Reliable / Safe / Nationwide / Family Driven

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui + framer-motion (CRA/craco), single-page landing at `/`
  - `src/components/`: Header, Hero, Services, Capability (animated SVG route), Signature (parallax), About (owner photos), Contact (quote form), Footer, motion/Reveal
  - `src/constants/site.js`: all business content + PLACEHOLDER contact details
  - Fonts: Bebas Neue (display) + Manrope (body); dark cinematic theme; prefers-reduced-motion respected
- Backend: FastAPI + MongoDB (motor)
  - `POST /api/enquiries` — validates, stores in `enquiries` collection, emails owner via Emergent managed Resend proxy (guardrail-gated, server-side template + recipient)
- Assets: `/app/frontend/public/assets/` — brand-board.jpg, owner-1.png, owner-2.png

## Implemented (2026-09-20)
- Full landing page: sticky header + mobile sheet menu, hero, 4 service cards, capability section with animated route line, parallax signature section, about with owner photos, contact/quote form, footer
- Enquiry form: client + server validation, loading/success/error states, sonner toasts, MongoDB storage, email notification via Resend proxy (verified `email_sent: true`)
- SEO: title, meta description, OG tags; data-testids on all interactive elements
- Fixed: mobile horizontal overflow (implicit auto grid tracks), fetchPriority prop casing
- Verified: desktop + mobile screenshots, zero console errors, form E2E submit, API validation 422s

## PLACEHOLDERS — owner must supply real values
- `frontend/src/constants/site.js`: phoneDisplay/phoneHref (+61 400 000 000), whatsappHref, email (enquiries@aftabandsons.com.au)
- `backend/.env` OWNER_EMAIL: currently `delivered@resend.dev` (Resend test inbox) — replace with the real business email so enquiries reach the owner
- Owner names/roles for About section (photos show "Director" only)

## Backlog
- P0: Replace placeholder phone/WhatsApp/email + OWNER_EMAIL with real details
- P1: Add owner names/roles to About
- P1: Real fleet/service photos replacing stock imagery
- P2: Logo image file (currently typographic lockup), favicon
- P2: Sitemap/robots, structured data (once real business facts exist)

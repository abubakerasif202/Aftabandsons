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
- Enquiry form: client + server validation, loading/success/error states, sonner toasts, MongoDB storage, email notification via Resend proxy
- SEO: title, meta description, OG tags; data-testids on all interactive elements
- Fixed: mobile horizontal overflow (implicit auto grid tracks), fetchPriority prop casing
- Verified: desktop + mobile screenshots, zero console errors, form E2E submit, API validation 422s
- Update 2 (2026-09-20): real contact details wired (phone/WhatsApp +61 448 747 518, admin@aftabandsons.com.au); directors named (Muhammad Samar Aftab — Director, Muhammad Umer Aftab — CEO); real logo extracted from brand board (header, footer, favicon); real fleet photos in hero (convoy sunset), Truck Transport (depot), B-Double Freight (lineup)
- KNOWN ISSUE: email proxy blocks admin@aftabandsons.com.au as "undeliverable recipient" (422). ROOT CAUSE FOUND: domain registered within last 5 days (WHOIS status `addPeriod`, MX smtp.google.com added 2026-09-20 08:25 UTC) — anti-spam screening blocks mail to brand-new domains. Mailbox itself verified working (SMTP RCPT probe to Google returned 250 OK; MX visible on 1.1.1.1/8.8.8.8/9.9.9.9). Block should clear as domain ages; escalated to support@emergent.sh for possible whitelisting. OWNER DECISION (2026-09-20): skip interim inbox/alternative email — keep admin@ configured, rely on phone/WhatsApp + stored enquiries until it clears. Enquiries are always stored in MongoDB `enquiries` collection regardless. Re-test periodically with: POST /api/enquiries then check email_sent field

## Contact details (real, supplied by owner)
- Phone / WhatsApp: +61 448 747 518
- Email / enquiry inbox: admin@aftabandsons.com.au

## Backlog
- P0: Confirm enquiry emails arrive at admin@aftabandsons.com.au (proxy re-check)
- P1: Remaining stock images (Local Deliveries warehouse, Interstate Scania, signature aerial) could be replaced with more fleet photos
- P2: Sitemap/robots, structured data (once real business facts exist)

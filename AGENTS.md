# AGENTS.md — Aftab & Sons Transport

## Objective

Maintain a fast, premium and conversion-focused Australian transport website
without inventing business facts. This repository is a frontend-only static
site served by Vercel.

## Source of truth

- Brand/content: `frontend/src/constants/site.js`
- Visual rules: `design_guidelines.json`
- Public assets: `frontend/public/assets/`
- Build output: `frontend/build/`

## Non-negotiable content guardrails

Do not invent:

- testimonials or customer logos
- fleet size or years in business
- prices or discounts
- awards, certifications or safety accreditations
- delivery guarantees or response-time promises
- service locations beyond supplied local/interstate/Australian wording
- executive titles, team roles or contact details that have not been supplied

If a fact is uncertain, omit it instead of guessing.

## Frontend

- Keep the approved black/charcoal, red, gold and silver brand system.
- Preserve sharp industrial geometry; avoid heavily rounded cards.
- Keep all primary CTAs obvious on mobile and desktop.
- Maintain keyboard focus states, reduced-motion support and semantic labels.
- Do not reintroduce Emergent/PostHog tracking scripts unless explicitly requested.
- Keep contact details in `frontend/src/constants/site.js`, not duplicated across components.
- Keep contact actions as direct `tel:`, WhatsApp and `mailto:` links; do not add a fake submission form.
- Do not add API, database or backend configuration to the frontend.

Before completing frontend work:

```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test --watchAll=false --runInBand
yarn build
```

## Change discipline

Prefer small, reviewable changes. Preserve existing behavior unless there is a
clear reliability, accessibility, performance or conversion reason to change it.

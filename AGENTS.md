# AGENTS.md — Aftab & Sons Transport

## Objective

Maintain a fast, premium and conversion-focused Australian transport website without inventing business facts.

## Source of truth

- Brand/content: `frontend/src/constants/site.js`
- Visual rules: `design_guidelines.json`
- Public assets: `frontend/public/assets/`
- API: `backend/server.py`

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
- Keep contact details in `src/constants/site.js`, not duplicated across components.
- Quote form must work with same-origin `/api` when `REACT_APP_BACKEND_URL` is absent.

Before completing frontend work:

```bash
cd frontend
yarn build
```

Run relevant tests when present.

## Backend

- Never commit secrets or real environment files.
- Validate all public request fields server-side.
- Do not accept caller-controlled email recipient, subject or raw HTML.
- Escape enquiry content before placing it in email HTML.
- Store the enquiry before attempting notification email.
- Email failure must not delete or lose a successfully stored enquiry.
- Keep CORS restricted to configured origins.
- Do not expose secret/configuration state in public API responses.

Before completing backend work:

```bash
cd backend
pytest
```

## Change discipline

Prefer small, reviewable changes. Preserve existing behavior unless there is a clear reliability, accessibility, security, performance or conversion reason to change it.

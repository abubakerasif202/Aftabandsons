# Aftab & Sons Transport

Static production website for **Aftab & Sons Transport**.

## Structure

- `frontend/` — React 19, CRACO, Tailwind CSS and Framer Motion
- `frontend/public/assets/` — approved logo, fleet and owner imagery
- `design_guidelines.json` — brand and content guardrails
- `AGENTS.md` — repository instructions for coding agents

The site is a frontend-only Vercel deployment. There is no database, Python
runtime or custom API route. Quote enquiries submit through Web3Forms, with
verified phone, WhatsApp and email links kept as direct-contact fallbacks.

## Business contact

- Phone: **+61 448 747 518**
- Email: **admin@aftabandsons.com.au**
- Website: **https://aftabandsons.com.au/**

## Frontend

```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn install
yarn test --watchAll=false --runInBand
yarn build
```

For local development:

```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn start
```

Business content remains centralized in `frontend/src/constants/site.js`.

To override the existing Web3Forms form identifier in Vercel, add
`REACT_APP_WEB3FORMS_ACCESS_KEY` to the project environment and redeploy.

## Content rules

Do not invent testimonials, customer logos, fleet size, years in business,
awards, certifications, prices, delivery guarantees, response-time promises
or unverified service locations. Keep business facts centralized in
`frontend/src/constants/site.js`.

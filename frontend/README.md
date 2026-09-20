# Aftab & Sons Transport Frontend

Static React landing page for the Aftab & Sons Transport website. The
production deployment serves the compiled frontend only; visitors contact the
business through the verified phone, WhatsApp and email links in the page.

## Commands

```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn install
yarn start
yarn build
yarn test --watchAll=false --runInBand
```

## Deployment

The Vercel project builds `frontend/` and serves `frontend/build`. No API,
database, backend environment variables or server-side runtime are required.

The contact details are centralized in `src/constants/site.js` and rendered
as `tel:`, WhatsApp and `mailto:` links.

## Brand

Public business content lives in `src/constants/site.js`. The approved visual system is dark charcoal/black with red primary actions, gold accents, silver borders, Bebas Neue display type and Manrope body type.

Do not invent business claims, statistics, testimonials, guarantees, accreditations, awards, prices or locations.

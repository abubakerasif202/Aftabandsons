# Aftab & Sons Transport

Production website and enquiry API for **Aftab & Sons Transport**.

## Structure

- `frontend/` — React 19, CRACO, Tailwind CSS and Framer Motion
- `backend/` — FastAPI, MongoDB/Motor and enquiry email integration
- `frontend/public/assets/` — approved logo, fleet and owner imagery
- `design_guidelines.json` — brand and content guardrails
- `AGENTS.md` — repository instructions for coding agents

## Business contact

- Phone: **+61 448 747 518**
- Email: **admin@aftabandsons.com.au**
- Website: **https://aftabandsons.com.au/**

## Frontend

```bash
cd frontend
yarn install
yarn build
```

For local development:

```bash
yarn start
```

`REACT_APP_BACKEND_URL` is optional. When omitted, the quote form posts to the same origin at `/api/enquiries`.

## Backend

Required for enquiry storage:

- `MONGO_URL`
- `DB_NAME`

Required for owner email notifications:

- `EMERGENT_EMAIL_KEY`
- `OWNER_EMAIL`

Optional:

- `EMAIL_FROM_NAME` — defaults to `Aftab & Sons Transport`
- `CORS_ORIGINS` — comma-separated allowed frontend origins; omit for same-origin deployments

Run locally:

```bash
cd backend
python -m pip install -r requirements.txt
uvicorn server:app --reload
```

Run backend tests:

```bash
cd backend
pytest
```

## Content rules

Do not invent testimonials, customer logos, fleet size, years in business, awards, certifications, prices, delivery guarantees, response-time promises or unverified service locations. Keep business facts centralized in `frontend/src/constants/site.js`.

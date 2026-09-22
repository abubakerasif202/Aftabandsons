# Aftab Transport Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port and integrate the "Aftab Transport Premium Redesign" from the Stitch design system (`projects/11990929239107269425`) into the React frontend codebase, providing a high-impact, industrial dark-mode Australian commercial road transport website that strictly follows content guardrails and passes all verification suites.

**Architecture:** The frontend is a static React application styled with Tailwind CSS, Lucide icons, and Framer Motion. Content is strictly centralized in `frontend/src/constants/site.js` without inventing unverified facts. Sections follow the Stitch visual design: Industrial Command Header, Monolithic Hero, 4-Card Service Bento with industrial indices, Fleet Engineering Showcase ("Engineered for the Long Haul"), Interstate Corridors & Route Visualizer, Foundations of Reliability & Safety Compliance, Verified Leadership (About), and Freight Quote Request with Web3Forms and direct contact options.

**Tech Stack:** React 18, Tailwind CSS, Framer Motion, Lucide React, Web3Forms API, Jest, React Testing Library.

---

### Task 1: Update Central Content Data in `site.js`

**Files:**
- Modify: `frontend/src/constants/site.js`
- Test: `frontend/src/App.test.js`

- [ ] **Step 1: Write test expectations for central data constants**

Add tests to `frontend/src/App.test.js` verifying that `ROUTES`, `SAFETY_PILLARS`, and `FLEET_SPECS` are exported and adhere to verified Australian content rules.

- [ ] **Step 2: Run tests to verify failure**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "central data" --watchAll=false --runInBand
```

- [ ] **Step 3: Update `frontend/src/constants/site.js` with structured data**

Add `ROUTES`, `SAFETY_PILLARS`, `FLEET_SPECS`, and navigation anchors without inventing unverified claims.
Ensure all phone, email, and WhatsApp references remain strictly unified under `SITE`.

- [ ] **Step 4: Run tests to verify they pass**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "central data" --watchAll=false --runInBand
```

- [ ] **Step 5: Commit changes**

```bash
git add frontend/src/constants/site.js frontend/src/App.test.js
git commit -m "feat: expand site constants with routes and safety pillars"
```

---

### Task 2: Refine Header Navigation Anchors & Mobile Actions

**Files:**
- Modify: `frontend/src/components/Header.jsx`
- Modify: `frontend/src/components/MobileActions.jsx`
- Test: `frontend/src/App.test.js`

- [ ] **Step 1: Write tests for navigation links and mobile action dock**

Verify navigation items: Fleet & Services (`#services`), Engineering (`#fleet`), Interstate Routes (`#routes`), Safety & Standards (`#safety`), About Us (`#about`), and Contact (`#contact`).
Verify mobile action dock renders direct phone and quote buttons with responsive visibility.

- [ ] **Step 2: Run tests to verify failure**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "header and navigation" --watchAll=false --runInBand
```

- [ ] **Step 3: Update `Header.jsx` and `MobileActions.jsx`**

Refine `NAV` list with updated section anchors and aria-labels matching the Stitch redesign. Ensure focus states and mobile sheet drawer support keyboard navigation.

- [ ] **Step 4: Run tests to verify they pass**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "header and navigation" --watchAll=false --runInBand
```

- [ ] **Step 5: Commit changes**

```bash
git add frontend/src/components/Header.jsx frontend/src/components/MobileActions.jsx frontend/src/App.test.js
git commit -m "feat: align header navigation and mobile action dock with Stitch design"
```

---

### Task 3: Align Hero Section with Stitch Visual Redesign

**Files:**
- Modify: `frontend/src/components/Hero.jsx`
- Test: `frontend/src/App.test.js`

- [ ] **Step 1: Write tests for Hero section features**

Verify radar pulse indicator, monolithic display typography ("AUSTRALIA MOVING"), dual primary conversion buttons, and spec attribute badges (24/7 Dispatch, Heavy Interstate Fleet, Point-to-Point Transit).

- [ ] **Step 2: Run tests to verify failure or differences**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "hero" --watchAll=false --runInBand
```

- [ ] **Step 3: Implement Hero updates in `Hero.jsx`**

Incorporate Stitch design system typography tokens (`Bebas Neue` uppercase headline, `Manrope` eyebrows with golden rules, radar pulse core, specular CTA shine sweeps, and sharp attribute stat cards).

- [ ] **Step 4: Run tests to verify they pass**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "hero" --watchAll=false --runInBand
```

- [ ] **Step 5: Commit changes**

```bash
git add frontend/src/components/Hero.jsx frontend/src/App.test.js
git commit -m "feat: upgrade Hero to Stitch premium industrial design"
```

---

### Task 4: Enhance Services Section with Industrial Bento & Illuminated Indices

**Files:**
- Modify: `frontend/src/components/Services.jsx`
- Test: `frontend/src/App.test.js`

- [ ] **Step 1: Write tests for Services component**

Verify 4 service cards render with numeric indices (`01`, `02`, `03`, `04`), link directly to `#contact`, have accessible labels, and display verified service titles.

- [ ] **Step 2: Run tests to verify failure**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "services" --watchAll=false --runInBand
```

- [ ] **Step 3: Update `Services.jsx`**

Apply Stitch design system components: 1px hairline silver borders, top border dormant indicator that transitions to a red-to-gold gradient on hover, large low-contrast sequence indices (`01`, `02`, `03`, `04`), and high-contrast photo frames with dark bottom gradients.

- [ ] **Step 4: Run tests to verify they pass**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "services" --watchAll=false --runInBand
```

- [ ] **Step 5: Commit changes**

```bash
git add frontend/src/components/Services.jsx frontend/src/App.test.js
git commit -m "feat: style service cards with Stitch industrial bento and indices"
```

---

### Task 5: Implement Fleet Engineering Showcase ("Engineered for the Long Haul")

**Files:**
- Create: `frontend/src/components/FleetShowcase.jsx`
- Modify: `frontend/src/App.js`
- Test: `frontend/src/App.test.js`

- [ ] **Step 1: Write tests for `FleetShowcase.jsx`**

Verify the component renders the heading "ENGINEERED FOR THE LONG HAUL", the chassis specification card, pre-trip inspection details, and highway discipline standards.

- [ ] **Step 2: Run tests to verify failure**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "FleetShowcase" --watchAll=false --runInBand
```

- [ ] **Step 3: Implement `FleetShowcase.jsx` and integrate into `App.js`**

Port the Stitch cinematic visual spread:
- 8-column primary chassis spotlight card with gradient overlay and badge
- 4-column side stack with pre-trip inspection and highway discipline cards
- Sharp 0px border radius and 1px hairline borders

- [ ] **Step 4: Run tests to verify they pass**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "FleetShowcase" --watchAll=false --runInBand
```

- [ ] **Step 5: Commit changes**

```bash
git add frontend/src/components/FleetShowcase.jsx frontend/src/App.js frontend/src/App.test.js
git commit -m "feat: add FleetShowcase section from Stitch design"
```

---

### Task 6: Implement Interstate Freight Corridors & Route Visualizer (`RoutesNetwork.jsx`)

**Files:**
- Create: `frontend/src/components/RoutesNetwork.jsx` (replacing/evolving `Capability.jsx`)
- Modify: `frontend/src/App.js`
- Test: `frontend/src/App.test.js`

- [ ] **Step 1: Write tests for `RoutesNetwork.jsx`**

Verify section heading "CONNECTING AUSTRALIA'S MAJOR FREIGHT HUBS", verified interstate corridors (Melbourne <—> Sydney, Sydney <—> Brisbane, Melbourne <—> Adelaide, Regional & Custom), and SVG route visualizer.

- [ ] **Step 2: Run tests to verify failure**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "RoutesNetwork" --watchAll=false --runInBand
```

- [ ] **Step 3: Implement `RoutesNetwork.jsx` and update `App.js`**

Construct the 2-column layout:
- Left column: Interstate corridor overview, highway connection highlights, and corridor matrix cards with status indicators.
- Right column: Interactive schematic route visualizer with animated transit pulses that respect `useReducedMotion()`.

- [ ] **Step 4: Run tests to verify they pass**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "RoutesNetwork" --watchAll=false --runInBand
```

- [ ] **Step 5: Commit changes**

```bash
git add frontend/src/components/RoutesNetwork.jsx frontend/src/App.js frontend/src/App.test.js
git commit -m "feat: add RoutesNetwork section with interstate corridors from Stitch"
```

---

### Task 7: Implement Foundations of Reliability & Safety Standards (`SafetyStandards.jsx`)

**Files:**
- Create: `frontend/src/components/SafetyStandards.jsx`
- Modify: `frontend/src/App.js`
- Test: `frontend/src/App.test.js`

- [ ] **Step 1: Write tests for `SafetyStandards.jsx`**

Verify section `#safety` renders the 4 core operational pillars: Road Safety First, Direct Line Dispatch, Punctual Transit, and Modern Fleet Setups.

- [ ] **Step 2: Run tests to verify failure**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "SafetyStandards" --watchAll=false --runInBand
```

- [ ] **Step 3: Implement `SafetyStandards.jsx` and mount in `App.js`**

Implement 4-card grid on `bg-[#0e0e0e]` with alternating 2px top indicators (`#C81010` and `#D4AF37`), industrial icons, and verified operational copy strictly avoiding unverified certification claims.

- [ ] **Step 4: Run tests to verify they pass**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "SafetyStandards" --watchAll=false --runInBand
```

- [ ] **Step 5: Commit changes**

```bash
git add frontend/src/components/SafetyStandards.jsx frontend/src/App.js frontend/src/App.test.js
git commit -m "feat: add SafetyStandards section from Stitch design"
```

---

### Task 8: Polish Contact Quote Form and Direct Channels

**Files:**
- Modify: `frontend/src/components/Contact.jsx`
- Test: `frontend/src/App.test.js`

- [ ] **Step 1: Write comprehensive tests for Contact form and direct links**

Verify form field validation, accessible error announcements, focus management, Web3Forms integration, and direct verified contact links (`tel:`, WhatsApp, `mailto:`).

- [ ] **Step 2: Run tests to verify current status**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "contact options" --watchAll=false --runInBand
```

- [ ] **Step 3: Refine `Contact.jsx` with Stitch styling**

Apply Stitch form inputs styling: dark chassis background (`#141414`), crisp 1px borders, `#C81010` focus rings, clear labels with `#D4AF37` asterisks, and sharp industrial CTA button with send icon.

- [ ] **Step 4: Run tests to verify they pass**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test -t "contact options" --watchAll=false --runInBand
```

- [ ] **Step 5: Commit changes**

```bash
git add frontend/src/components/Contact.jsx frontend/src/App.test.js
git commit -m "feat: style quote request and direct contact according to Stitch redesign"
```

---

### Task 9: Final Verification, Build & Integration Check

**Files:**
- Test: All tests in `frontend/src/App.test.js`
- Build: `frontend/build/`

- [ ] **Step 1: Run complete test suite**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn test --watchAll=false --runInBand
```
Expected: All tests PASS.

- [ ] **Step 2: Run production build**

Run:
```powershell
Set-Location -LiteralPath 'C:\Users\abuba\Aftabandsons\frontend'
yarn build
```
Expected: Build succeeds with 0 errors.

- [ ] **Step 3: Review against content guardrails in `AGENTS.md`**

Ensure zero invented facts (no fake logos, no fake years in business, no fake prices, no unverified certifications, direct contact info preserved).

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete Aftab Transport premium redesign port from Stitch"
```

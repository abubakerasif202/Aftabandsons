// Central source of truth for public business content.
// Do not add statistics, guarantees, accreditations, locations or roles unless
// they have been supplied or verified by the business owner.

export const SITE = {
  name: "Aftab & Sons Transport",
  nameShort: "Aftab & Sons",
  tagline: "Australia Keeps Moving",
  line1: "Australian Roads. Australian People. A Brighter Tomorrow.",
  line2: "Built on People. Driven by Australia.",
  signatureLine: "On Every Road, Australia Keeps Moving",
  phoneDisplay: "+61 448 747 518",
  phoneHref: "tel:+61448747518",
  whatsappHref: "https://wa.me/61448747518",
  email: "admin@aftabandsons.com.au",
  // Public Web3Forms form identifier. A Vercel environment value can override it.
  web3formsKey: "b0b1f017-828a-4355-83ae-4b852e0cc740",
};

export const IMAGES = {
  hero: "/assets/hero-bdouble-convoy.webp",
  heroJpg: "/assets/hero-bdouble-convoy.jpg",
  chassis: "/assets/fleet-chassis-engineering.webp",
  safetyInspection: "/assets/safety-road-inspection.webp",
  contactDusk: "/assets/contact-highway-dusk.webp",
  signature: "/assets/fleet-outback.jpg",
  owner1: "/assets/owner-1.webp",
  owner2: "/assets/owner-2.webp",
};

export const SERVICES = [
  {
    id: "truck-transport",
    title: "Truck Transport",
    description:
      "Prime-mover transport for commercial freight from pickup through delivery.",
    image: "/assets/service-truck-transport.webp",
  },
  {
    id: "b-double-freight",
    title: "B-Double Freight",
    description:
      "B-double combinations for high-volume freight and Australian linehaul work.",
    image: "/assets/service-b-double.webp",
  },
  {
    id: "local-deliveries",
    title: "Local Deliveries",
    description:
      "Local delivery transport for businesses moving commercial freight.",
    image: "/assets/service-local-deliveries.webp",
  },
  {
    id: "interstate-freight",
    title: "Interstate Freight",
    description:
      "Long-haul interstate transport for business freight across Australian roads.",
    image: "/assets/service-interstate-freight.webp",
  },
];

export const SERVICE_OPTIONS = [
  "Truck Transport",
  "B-Double Freight",
  "Local Deliveries",
  "Interstate Freight",
  "Other / Not Sure",
];

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "Fleet & Services", href: "#services" },
  { label: "Engineering", href: "#fleet" },
  { label: "Interstate Routes", href: "#routes" },
  { label: "Safety & Standards", href: "#safety" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const ROUTES = [
  {
    id: "melbourne-sydney",
    name: "Melbourne <-> Sydney",
    corridor: "Hume Highway Corridor",
    corridorTag: "M31 Linehaul",
    status: "Active Daily Transit",
    transitTime: "Direct Linehaul",
    description:
      "Scheduled commercial linehaul linking Victoria and New South Wales distribution hubs.",
  },
  {
    id: "sydney-brisbane",
    name: "Sydney <-> Brisbane",
    corridor: "Pacific & New England Corridors",
    corridorTag: "M1 / A15 Linehaul",
    status: "Active Daily Transit",
    transitTime: "Direct Linehaul",
    description:
      "Heavy freight connections linking New South Wales logistics facilities with Queensland markets.",
  },
  {
    id: "melbourne-adelaide",
    name: "Melbourne <-> Adelaide",
    corridor: "Western Highway Corridor",
    corridorTag: "A8 / National Highway",
    status: "Active Transit",
    transitTime: "Direct Linehaul",
    description:
      "Direct road transport connecting Melbourne commercial terminals with South Australia.",
  },
  {
    id: "regional-custom",
    name: "Regional & Custom",
    corridor: "Australian Highway Network",
    corridorTag: "Point-to-Point",
    status: "Scheduled On Demand",
    transitTime: "Tailored Corridors",
    description:
      "Flexible commercial transport solutions tailored to specific regional routes and freight demands.",
  },
];

export const SAFETY_PILLARS = [
  {
    id: "road-safety-first",
    title: "Road Safety First",
    description:
      "Strict highway discipline, comprehensive pre-trip vehicle checks, and driver rest management across all Australian routes.",
    icon: "ShieldCheck",
    accent: "#C81010",
  },
  {
    id: "direct-line-dispatch",
    title: "Direct Line Dispatch",
    description:
      "Direct communication with fleet operations and drivers for straightforward freight updates without middlemen.",
    icon: "Headphones",
    accent: "#D4AF37",
  },
  {
    id: "punctual-transit",
    title: "Punctual Transit",
    description:
      "Disciplined transit planning, route management, and point-to-point Australian highway operations.",
    icon: "Clock",
    accent: "#C81010",
  },
  {
    id: "modern-fleet-setups",
    title: "Modern Fleet Setups",
    description:
      "Heavy-duty prime movers and B-double combinations maintained for dependable long-distance commercial freight transport.",
    icon: "Truck",
    accent: "#D4AF37",
  },
];

export const FLEET_SPECS = {
  chassis: {
    badge: "HEAVY SPEC LINEHAUL",
    title: "Heavy-Duty Prime Mover & Trailer Configurations",
    subtitle: "Engineered for Long-Haul Reliability",
    description:
      "High-capacity commercial configurations built for demanding Australian linehaul corridors, providing stable, reliable freight movement.",
    specs: [
      { label: "Configuration", value: "Prime Mover & B-Double" },
      { label: "Transit Scope", value: "Interstate & Regional" },
      { label: "Freight Type", value: "General & Commercial" },
      { label: "Maintenance", value: "Scheduled Mechanical Audits" },
    ],
  },
  inspection: {
    badge: "DAILY DEPLOYMENT READINESS",
    title: "Pre-Trip Inspection Protocols",
    description:
      "Rigorous pre-departure checks covering braking systems, tyres, couplings, and load restraint security before highway transit.",
    items: [
      "Coupling and turntable locking mechanism checks",
      "Air brake line pressure and pneumatic safety tests",
      "Tyre tread depth and operating pressure verification",
      "Load restraint and tensioner security inspection",
    ],
  },
  discipline: {
    badge: "OPERATIONAL STANDARDS",
    title: "Highway Transit Discipline",
    description:
      "Disciplined Australian highway operations with structured driver rest stops, transit monitoring, and point-to-point dispatch.",
    items: [
      "Scheduled rest stops and driver fatigue management",
      "Point-to-point route planning and corridor tracking",
      "Direct line operational contact throughout transit",
    ],
  },
};

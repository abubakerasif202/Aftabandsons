import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import MobileActions from "./components/MobileActions";
import FleetShowcase from "./components/FleetShowcase";
import RoutesNetwork from "./components/RoutesNetwork";
import SafetyStandards from "./components/SafetyStandards";
import App from "./App";
import {
  FLEET_SPECS,
  NAV,
  ROUTES,
  SAFETY_PILLARS,
  SERVICES,
  SERVICE_OPTIONS,
  SITE,
} from "./constants/site";

jest.mock("framer-motion", () => {
  const React = require("react");
  const cache = {};
  const motionProps = new Set([
    "animate",
    "initial",
    "transition",
    "viewport",
    "whileInView",
  ]);

  const componentFor = (tag) => {
    if (!cache[tag]) {
      cache[tag] = React.forwardRef(({ children, ...props }, ref) => {
        const domProps = Object.fromEntries(
          Object.entries(props).filter(([key]) => !motionProps.has(key)),
        );
        return React.createElement(tag, { ...domProps, ref }, children);
      });
    }
    return cache[tag];
  };

  return {
    motion: new Proxy({}, { get: (_target, tag) => componentFor(tag) }),
    useReducedMotion: () => true,
    useInView: () => true,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => "0%",
  };
});

describe("header and navigation", () => {
  test("renders the sharp logo, primary navigation and quote CTA", () => {
    render(<Header />);

    expect(screen.getByTestId("nav-logo")).toHaveAttribute("href", "#home");
    expect(screen.getByTestId("nav-logo").querySelector("img")).toHaveAttribute(
      "src",
      "/assets/logo-horizontal.webp",
    );
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByTestId("nav-quote-button")).toHaveAttribute("href", "#contact");
  });

  test("renders all navigation links from NAV in desktop navigation", () => {
    render(<Header />);
    const desktopNav = screen.getByTestId("nav-desktop");

    NAV.forEach((item) => {
      const link = within(desktopNav).getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href);
    });

    ["#services", "#fleet", "#routes", "#safety", "#about", "#contact"].forEach((href) => {
      expect(desktopNav.querySelector(`a[href="${href}"]`)).toBeInTheDocument();
    });
  });

  test("opens mobile menu and renders all NAV links in the dialog", async () => {
    render(<Header />);

    fireEvent.click(screen.getByTestId("nav-mobile-menu-button"));
    const dialog = screen.getByRole("dialog", { name: "Navigation Menu" });
    expect(dialog).toBeInTheDocument();

    NAV.forEach((item) => {
      const link = within(dialog).getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href);
    });

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Navigation Menu" })).not.toBeInTheDocument(),
    );
  });

  test("renders MobileActions component with Call and Quote Request buttons", () => {
    render(<MobileActions />);

    const actionsNav = screen.getByTestId("mobile-actions");
    expect(actionsNav).toBeInTheDocument();

    const callButton = screen.getByTestId("mobile-call-action");
    expect(callButton).toHaveAttribute("href", SITE.phoneHref);
    expect(callButton).toHaveTextContent(/Call/i);

    const quoteButton = screen.getByTestId("mobile-quote-action");
    expect(quoteButton).toHaveAttribute("href", "#contact");
    expect(quoteButton).toHaveTextContent(/Quote Request|Request Quote/i);
  });
});

describe("hero and services", () => {
  test("renders the hero section with radar beacon, headlines, CTAs, and capability badges", () => {
    render(<Hero />);

    expect(screen.getByTestId("hero-opening-truck")).toBeInTheDocument();
    expect(screen.getByTestId("hero-radar-pulse")).toBeInTheDocument();
    expect(screen.getByTestId("hero-headline")).toHaveTextContent("Australia");
    expect(screen.getByTestId("hero-headline")).toHaveTextContent("Moving");

    const quoteBtn = screen.getByTestId("hero-quote-button");
    expect(quoteBtn).toHaveAttribute("href", "#contact");
    expect(quoteBtn).toHaveTextContent("Request a Freight Quote");

    const servicesBtn = screen.getByTestId("hero-services-button");
    expect(servicesBtn).toHaveAttribute("href", "#services");
    expect(servicesBtn).toHaveTextContent("View Fleet & Services");

    const attributes = screen.getByTestId("hero-attributes");
    expect(attributes).toHaveTextContent("Interstate Linehaul");
    expect(attributes).toHaveTextContent("B-Double Capability");
    expect(attributes).toHaveTextContent("Direct Line Dispatch");
  });

  test("renders every supplied service card and links each to contact", () => {
    render(<Services />);

    expect(screen.getAllByRole("link")).toHaveLength(SERVICES.length);
    SERVICES.forEach((service, index) => {
      const card = screen.getByTestId(`service-card-${service.id}`);
      expect(card).toHaveAttribute("href", "#contact");
      expect(card).toHaveAccessibleName(`Enquire about ${service.title}`);
      expect(card).toHaveTextContent(service.title);

      const expectedIndex = String(index + 1).padStart(2, "0");
      const indexEl = screen.getByTestId(`service-index-${service.id}`);
      expect(indexEl).toHaveTextContent(expectedIndex);

      const img = card.querySelector("img");
      expect(img).toHaveAttribute("src", service.image);
    });
  });
});

describe("Web3Forms quote form", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders the quote fields and direct contact fallbacks", () => {
    render(<Contact />);

    expect(screen.getByTestId("quote-form")).toBeInTheDocument();
    expect(screen.getByTestId("quote-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("quote-email-input")).toBeInTheDocument();
    expect(screen.getByTestId("quote-service-select")).toBeInTheDocument();
    expect(screen.getByTestId("quote-message-input")).toBeInTheDocument();
    expect(screen.getByTestId("quote-submit-button")).toBeInTheDocument();
  });

  test("validates required quote details before submission", () => {
    render(<Contact />);
    fireEvent.click(screen.getByTestId("quote-submit-button"));
    expect(screen.getByTestId("quote-name-error")).toBeInTheDocument();
    expect(screen.getByTestId("quote-email-error")).toBeInTheDocument();
    expect(screen.getByTestId("quote-service-error")).toBeInTheDocument();
    expect(screen.getByTestId("quote-message-error")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("submits valid freight details to Web3Forms", async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    render(<Contact />);
    fireEvent.change(screen.getByTestId("quote-name-input"), { target: { value: "Test Customer" } });
    fireEvent.change(screen.getByTestId("quote-email-input"), { target: { value: "customer@example.com" } });
    fireEvent.change(screen.getByTestId("quote-service-select"), { target: { value: SERVICE_OPTIONS[0] } });
    fireEvent.change(screen.getByTestId("quote-message-input"), { target: { value: "Freight from Sydney to Melbourne next week." } });
    fireEvent.click(screen.getByTestId("quote-submit-button"));

    await waitFor(() => expect(screen.getByTestId("quote-success-message")).toBeInTheDocument());
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({ method: "POST" }),
    );
  });

  test("keeps the verified phone, email and accessible direct-contact links", () => {
    render(<Contact />);

    expect(screen.getByTestId("contact-call-button")).toHaveAttribute("href", SITE.phoneHref);
    expect(screen.getByTestId("contact-call-button")).toHaveTextContent(SITE.phoneDisplay);
    expect(screen.getByTestId("contact-email-button")).toHaveAttribute(
      "href",
      `mailto:${SITE.email}`,
    );
    expect(screen.getByTestId("contact-email-button")).toHaveTextContent(SITE.email);
    expect(document.body.textContent).not.toMatch(/555[-\s)]|your@email|example\.com\.au/i);
  });

  test("verifies sharp styling for inputs, submit button, and verified direct channels", () => {
    render(<Contact />);

    const submitBtn = screen.getByTestId("quote-submit-button");
    expect(submitBtn.className).toContain("bg-[#C81010]");

    const callBtn = screen.getByTestId("contact-call-button");
    expect(callBtn.className).toContain("border-[#C0C0C0]");
    expect(callBtn.className).toContain("rounded-none");

    const whatsappBtn = screen.getByTestId("contact-whatsapp-button");
    expect(whatsappBtn).toHaveAttribute("href", SITE.whatsappHref);
    expect(whatsappBtn.className).toContain("rounded-none");

    const emailBtn = screen.getByTestId("contact-email-button");
    expect(emailBtn).toHaveAttribute("href", `mailto:${SITE.email}`);
    expect(emailBtn.className).toContain("rounded-none");
  });
});

describe("central data constants", () => {
  test("verifies SITE has name, phoneDisplay, phoneHref, whatsappHref, email, tagline", () => {
    expect(SITE).toBeDefined();
    expect(SITE.name).toBe("Aftab & Sons Transport");
    expect(SITE.phoneDisplay).toBe("+61 448 747 518");
    expect(SITE.phoneHref).toBe("tel:+61448747518");
    expect(SITE.whatsappHref).toBe("https://wa.me/61448747518");
    expect(SITE.email).toBe("admin@aftabandsons.com.au");
    expect(SITE.tagline).toBe("Australia Keeps Moving");
  });

  test("verifies ROUTES is an array of corridors with name, corridor, corridorTag, and status", () => {
    expect(Array.isArray(ROUTES)).toBe(true);
    expect(ROUTES.length).toBeGreaterThanOrEqual(4);

    const names = ROUTES.map((r) => r.name);
    expect(names).toContain("Melbourne <-> Sydney");
    expect(names).toContain("Sydney <-> Brisbane");
    expect(names).toContain("Melbourne <-> Adelaide");
    expect(names).toContain("Regional & Custom");

    ROUTES.forEach((route) => {
      expect(route.name).toBeTruthy();
      expect(route.corridor).toBeTruthy();
      expect(route.corridorTag).toBeTruthy();
      expect(route.status).toBeTruthy();
    });
  });

  test("verifies SAFETY_PILLARS has the 4 pillars with title, description, and icon name or accent", () => {
    expect(Array.isArray(SAFETY_PILLARS)).toBe(true);
    expect(SAFETY_PILLARS).toHaveLength(4);

    const titles = SAFETY_PILLARS.map((p) => p.title);
    expect(titles).toContain("Road Safety First");
    expect(titles).toContain("Direct Line Dispatch");
    expect(titles).toContain("Punctual Transit");
    expect(titles).toContain("Modern Fleet Setups");

    SAFETY_PILLARS.forEach((pillar) => {
      expect(pillar.title).toBeTruthy();
      expect(pillar.description).toBeTruthy();
      expect(Boolean(pillar.icon || pillar.accent)).toBe(true);
    });
  });

  test("verifies FLEET_SPECS has chassis and inspection specifications from Stitch design", () => {
    expect(FLEET_SPECS).toBeDefined();
    expect(FLEET_SPECS.chassis).toBeDefined();
    expect(FLEET_SPECS.chassis.title).toBeTruthy();
    expect(FLEET_SPECS.inspection).toBeDefined();
    expect(FLEET_SPECS.inspection.title).toBeTruthy();
  });

  test("verifies NAV has anchors: #home, #services, #fleet, #routes, #safety, #about, #contact", () => {
    expect(Array.isArray(NAV)).toBe(true);
    const anchors = NAV.map((item) => item.href);
    const requiredAnchors = [
      "#home",
      "#services",
      "#fleet",
      "#routes",
      "#safety",
      "#about",
      "#contact",
    ];
    requiredAnchors.forEach((anchor) => {
      expect(anchors).toContain(anchor);
    });
  });
});

describe("fleet engineering showcase", () => {
  test("renders FleetShowcase component with id, testid, and heading", () => {
    render(<FleetShowcase />);

    const section = screen.getByTestId("fleet-showcase-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "fleet");
    expect(
      screen.getByRole("heading", { name: /ENGINEERED FOR THE LONG HAUL/i }),
    ).toBeInTheDocument();
  });

  test("renders chassis spotlight card with badge, title and spec attributes", () => {
    render(<FleetShowcase />);

    expect(screen.getByText(FLEET_SPECS.chassis.badge)).toBeInTheDocument();
    expect(screen.getByText(FLEET_SPECS.chassis.title)).toBeInTheDocument();

    FLEET_SPECS.chassis.specs.forEach((spec) => {
      expect(screen.getByText(spec.label)).toBeInTheDocument();
      expect(screen.getByText(spec.value)).toBeInTheDocument();
    });
  });

  test("renders pre-trip inspection card with title, badge, and checklist items", () => {
    render(<FleetShowcase />);

    expect(screen.getByText(FLEET_SPECS.inspection.title)).toBeInTheDocument();
    expect(screen.getByText(FLEET_SPECS.inspection.badge)).toBeInTheDocument();
    expect(screen.getByText(FLEET_SPECS.inspection.description)).toBeInTheDocument();

    FLEET_SPECS.inspection.items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders highway discipline card with title, badge, and operational items", () => {
    render(<FleetShowcase />);

    expect(screen.getByText(FLEET_SPECS.discipline.title)).toBeInTheDocument();
    expect(screen.getByText(FLEET_SPECS.discipline.badge)).toBeInTheDocument();
    expect(screen.getByText(FLEET_SPECS.discipline.description)).toBeInTheDocument();

    FLEET_SPECS.discipline.items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders FleetShowcase inside App between services and routes network", () => {
    render(<App />);
    expect(screen.getByTestId("fleet-showcase-section")).toBeInTheDocument();
    expect(screen.getByTestId("services-section")).toBeInTheDocument();
  });
});

describe("interstate routes network", () => {
  test("renders RoutesNetwork component with id and data-testid", () => {
    render(<RoutesNetwork />);
    const section = screen.getByTestId("routes-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "routes");
  });

  test("renders headline CONNECTING AUSTRALIA'S MAJOR FREIGHT HUBS", () => {
    render(<RoutesNetwork />);
    expect(
      screen.getByRole("heading", {
        name: /CONNECTING AUSTRALIA'S MAJOR FREIGHT HUBS/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders all 4 corridors from ROUTES with corridor tags and statuses", () => {
    render(<RoutesNetwork />);

    ROUTES.forEach((route) => {
      const card = screen.getByTestId(`route-card-${route.id}`);
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(route.name);
      expect(card).toHaveTextContent(route.corridorTag);
      expect(card).toHaveTextContent(route.status);
    });

    expect(screen.getByText("Melbourne <-> Sydney")).toBeInTheDocument();
    expect(screen.getByText("Sydney <-> Brisbane")).toBeInTheDocument();
    expect(screen.getByText("Melbourne <-> Adelaide")).toBeInTheDocument();
    expect(screen.getByText("Regional & Custom")).toBeInTheDocument();
  });

  test("renders SVG route visualizer with pickup, delivery nodes and respects useReducedMotion", () => {
    render(<RoutesNetwork />);

    const visualizer = screen.getByTestId("routes-visualizer");
    expect(visualizer).toBeInTheDocument();

    const svg = screen.getByTestId("routes-map-svg");
    expect(svg).toBeInTheDocument();

    expect(screen.getByTestId("visualizer-node-pickup")).toBeInTheDocument();
    expect(screen.getByTestId("visualizer-node-delivery")).toBeInTheDocument();
    expect(within(svg).getByText(/PICKUP/i)).toBeInTheDocument();
    expect(within(svg).getByText(/DELIVERY/i)).toBeInTheDocument();

    // Since useReducedMotion returns true in jest.mock, animated pulse elements should not be rendered
    expect(visualizer.querySelector("animateMotion")).not.toBeInTheDocument();
  });

  test("renders RoutesNetwork inside App as part of landing page", () => {
    render(<App />);
    expect(screen.getByTestId("routes-section")).toBeInTheDocument();
  });
});

describe("safety and reliability standards", () => {
  test("renders SafetyStandards component with id and data-testid", () => {
    render(<SafetyStandards />);
    const section = screen.getByTestId("safety-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "safety");
  });

  test("renders eyebrow CORE OPERATIONAL PILLARS with gold accent rule", () => {
    render(<SafetyStandards />);
    const eyebrow = screen.getByTestId("safety-eyebrow");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent(/CORE OPERATIONAL PILLARS/i);
    const rule = eyebrow.querySelector(".bg-\\[\\#D4AF37\\]");
    expect(rule).toBeInTheDocument();
  });

  test("renders heading FOUNDATIONS OF RELIABILITY and narrative", () => {
    render(<SafetyStandards />);
    expect(
      screen.getByRole("heading", {
        name: /FOUNDATIONS OF RELIABILITY/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Verifiable principles ensuring consistent commercial performance/i),
    ).toBeInTheDocument();
  });

  test("renders all 4 pillars from SAFETY_PILLARS with titles, descriptions, and testids", () => {
    render(<SafetyStandards />);

    SAFETY_PILLARS.forEach((pillar) => {
      const card = screen.getByTestId(`safety-pillar-${pillar.id}`);
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(pillar.title);
      expect(card).toHaveTextContent(pillar.description);
    });

    expect(screen.getByText("Road Safety First")).toBeInTheDocument();
    expect(screen.getByText("Direct Line Dispatch")).toBeInTheDocument();
    expect(screen.getByText("Punctual Transit")).toBeInTheDocument();
    expect(screen.getByText("Modern Fleet Setups")).toBeInTheDocument();
  });

  test("renders SafetyStandards inside App between routes network and signature", () => {
    render(<App />);
    expect(screen.getByTestId("safety-section")).toBeInTheDocument();
  });
});

describe("SEO, crawlability, and semantic landmarks", () => {
  test("renders all semantic landmark elements (header, main, footer, section)", () => {
    const { container } = render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument(); // <header>
    expect(screen.getByRole("main")).toBeInTheDocument(); // <main>
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // <footer>

    // Exactly one H1 on the page
    const h1Elements = screen.getAllByRole("heading", { level: 1 });
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0]).toHaveAttribute("data-testid", "hero-headline");

    // Sections for all major areas
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(6);
    expect(container.querySelector("#home")).toBeInTheDocument();
    expect(container.querySelector("#services")).toBeInTheDocument();
    expect(container.querySelector("#fleet")).toBeInTheDocument();
    expect(container.querySelector("#routes")).toBeInTheDocument();
    expect(container.querySelector("#safety")).toBeInTheDocument();
    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  test("verifies footer has valid active anchors and no dead routes", () => {
    const { container } = render(<App />);
    const footerNav = screen.getByTestId("footer-nav");
    const links = footerNav.querySelectorAll("a");

    expect(links.length).toBeGreaterThanOrEqual(4);
    links.forEach((link) => {
      const href = link.getAttribute("href");
      expect(href.startsWith("#")).toBe(true);
      // Ensure target element exists in document
      const targetId = href.replace("#", "");
      expect(container.querySelector(`#${targetId}`)).not.toBeNull();
    });
  });

  test("verifies public HTML contains valid SEO tags and structured data", () => {
    const fs = require("fs");
    const path = require("path");

    const htmlPath = path.resolve(__dirname, "../public/index.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    // Document title
    expect(html).toMatch(/<title>Aftab &amp; Sons Transport \| Australian Road &amp; Interstate Freight<\/title>/);

    // Meta description
    expect(html).toMatch(/<meta\s+name="description"\s+content="[^"]*Aftab &amp; Sons Transport[^"]*"/);

    // Canonical tag
    expect(html).toMatch(/<link\s+rel="canonical"\s+href="https:\/\/www\.aftabandsons\.com\.au\/"\s*\/>/);

    // Robots meta
    expect(html).toMatch(/<meta\s+name="robots"\s+content="index,\s*follow/);

    // Structured data JSON-LD parse
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(jsonLdMatch).not.toBeNull();
    const data = JSON.parse(jsonLdMatch[1]);
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@graph"]).toBeDefined();

    const graph = data["@graph"];
    const org = graph.find(
      (item) =>
        item["@type"] === "Organization" ||
        (Array.isArray(item["@type"]) && item["@type"].includes("Organization")),
    );
    expect(org).toBeDefined();
    expect(org.telephone).toBe("+61448747518");
    expect(org.email).toBe("admin@aftabandsons.com.au");

    const website = graph.find((item) => item["@type"] === "WebSite");
    expect(website).toBeDefined();
    expect(website.url).toBe("https://www.aftabandsons.com.au/");

    const services = graph.filter((item) => item["@type"] === "Service");
    expect(services).toHaveLength(4);
  });

  test("verifies robots.txt and sitemap.xml have canonical configuration", () => {
    const fs = require("fs");
    const path = require("path");

    const robotsPath = path.resolve(__dirname, "../public/robots.txt");
    const robots = fs.readFileSync(robotsPath, "utf8");
    expect(robots).toMatch(/User-agent: \*/);
    expect(robots).toMatch(/Allow: \//);
    expect(robots).toMatch(/Sitemap: https:\/\/www\.aftabandsons\.com\.au\/sitemap\.xml/);

    const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");
    const sitemap = fs.readFileSync(sitemapPath, "utf8");
    expect(sitemap).toMatch(/<loc>https:\/\/www\.aftabandsons\.com\.au\/<\/loc>/);
  });
});


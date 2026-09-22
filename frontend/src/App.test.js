import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import MobileActions from "./components/MobileActions";
import {
  FLEET_SPECS,
  NAV,
  ROUTES,
  SAFETY_PILLARS,
  SERVICES,
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
    SERVICES.forEach((service) => {
      const card = screen.getByTestId(`service-card-${service.id}`);
      expect(card).toHaveAttribute("href", "#contact");
      expect(card).toHaveAccessibleName(`Enquire about ${service.title}`);
      expect(card).toHaveTextContent(service.title);
    });
  });
});

describe("contact options and quote submission", () => {
  test("renders a quote form alongside direct contact options", () => {
    render(<Contact />);

    expect(screen.getByTestId("contact-direct-panel")).toBeInTheDocument();
    expect(screen.getByTestId("quote-form")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Service needed" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Quote Request" })).toBeInTheDocument();
  });

  test("sends quote details to Web3Forms and confirms success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    render(<Contact />);

    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), { target: { value: "Test Name" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Phone" }), { target: { value: "0400000000" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Service needed" }), { target: { value: "Truck Transport" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Freight details" }), { target: { value: "Freight details" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Quote Request" }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith("https://api.web3forms.com/submit", expect.objectContaining({ method: "POST" })));
    expect(await screen.findByRole("status")).toHaveTextContent("quote request has been sent");
  });

  test("shows inline guidance and focuses the first incomplete quote field", () => {
    render(<Contact />);

    fireEvent.click(screen.getByRole("button", { name: "Send Quote Request" }));

    const name = screen.getByRole("textbox", { name: /^Name/ });
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Enter your name so we know who to contact.")).toBeInTheDocument();
    expect(screen.getByText("Choose the service that best fits your freight.")).toBeInTheDocument();
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

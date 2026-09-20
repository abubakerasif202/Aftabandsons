import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import { SERVICES, SITE } from "./constants/site";

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

  test("opens and closes the accessible mobile menu", async () => {
    render(<Header />);

    fireEvent.click(screen.getByTestId("nav-mobile-menu-button"));
    expect(screen.getByRole("dialog", { name: "Navigation Menu" })).toBeInTheDocument();
    expect(screen.getByTestId("nav-mobile-link-services")).toHaveAttribute(
      "href",
      "#services",
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Navigation Menu" })).not.toBeInTheDocument(),
    );
  });
});

describe("hero and services", () => {
  test("renders the main heading and both hero conversion anchors", () => {
    render(<Hero />);

    expect(screen.getByTestId("hero-opening-truck")).toBeInTheDocument();
    expect(screen.getByTestId("hero-headline")).toHaveTextContent("Australia");
    expect(screen.getByTestId("hero-headline")).toHaveTextContent("Moving");
    expect(screen.getByTestId("hero-quote-button")).toHaveAttribute("href", "#contact");
    expect(screen.getByTestId("hero-services-button")).toHaveAttribute("href", "#services");
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

describe("static contact options", () => {
  test("replaces the quote form with direct contact options", () => {
    render(<Contact />);

    expect(screen.getByTestId("contact-direct-panel")).toBeInTheDocument();
    expect(screen.queryByTestId("quote-form")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
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

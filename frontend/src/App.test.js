import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import { SERVICES, SERVICE_OPTIONS, SITE } from "./constants/site";

jest.mock("axios", () => ({
  __esModule: true,
  default: { post: jest.fn() },
}));

jest.mock("sonner", () => ({
  __esModule: true,
  toast: { success: jest.fn(), error: jest.fn() },
}));

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

const fillValidForm = () => {
  fireEvent.change(screen.getByTestId("quote-name-input"), {
    target: { value: "Jordan Smith" },
  });
  fireEvent.change(screen.getByTestId("quote-email-input"), {
    target: { value: "jordan@example.com" },
  });
  fireEvent.change(screen.getByTestId("quote-phone-input"), {
    target: { value: "+61 400 000 000" },
  });
  fireEvent.change(screen.getByTestId("quote-service-select"), {
    target: { value: SERVICE_OPTIONS[0] },
  });
  fireEvent.change(screen.getByTestId("quote-message-input"), {
    target: { value: "Two pallets from Adelaide to Melbourne next week." },
  });
};

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

describe("quote form validation and submission", () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  test("associates labels with every customer-facing form control", () => {
    render(<Contact />);

    ["Name", "Email", "Phone", "Service", "Freight Details"].forEach((label) => {
      expect(screen.getByLabelText(new RegExp(label))).toBeInTheDocument();
    });
  });

  test("rejects missing required fields, invalid email, invalid service and short details", () => {
    render(<Contact />);
    fireEvent.click(screen.getByTestId("quote-submit-button"));

    expect(screen.getByTestId("quote-name-error")).toHaveTextContent("at least 2");
    expect(screen.getByTestId("quote-email-error")).toHaveTextContent("valid email");
    expect(screen.getByTestId("quote-service-error")).toHaveTextContent("choose a service");
    expect(screen.getByTestId("quote-message-error")).toHaveTextContent("10+");
    expect(axios.post).not.toHaveBeenCalled();
  });

  test("rejects an invalid email and short freight details after other fields are filled", () => {
    render(<Contact />);
    fillValidForm();
    fireEvent.change(screen.getByTestId("quote-email-input"), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(screen.getByTestId("quote-message-input"), {
      target: { value: "Too short" },
    });
    fireEvent.click(screen.getByTestId("quote-submit-button"));

    expect(screen.getByTestId("quote-email-error")).toHaveTextContent("valid email");
    expect(screen.getByTestId("quote-message-error")).toHaveTextContent("10+");
    expect(axios.post).not.toHaveBeenCalled();
  });

  test("creates the verified request payload and prevents duplicate submissions", async () => {
    let resolveRequest;
    axios.post.mockReturnValue(new Promise((resolve) => { resolveRequest = resolve; }));
    render(<Contact />);
    fillValidForm();

    const form = screen.getByTestId("quote-form");
    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "/api/enquiries",
      {
        name: "Jordan Smith",
        email: "jordan@example.com",
        phone: "+61 400 000 000",
        service: "Truck Transport",
        message: "Two pallets from Adelaide to Melbourne next week.",
        website: "",
      },
      expect.objectContaining({ timeout: 15000 }),
    );
    expect(screen.getByTestId("quote-submit-button")).toBeDisabled();

    resolveRequest({ status: 201, data: { status: "received", id: "test-id" } });
    await waitFor(() => expect(screen.getByTestId("quote-success-message")).toBeInTheDocument());
  });

  test("shows a success state for the accepted API response", async () => {
    axios.post.mockResolvedValue({ status: 201, data: { status: "received" } });
    render(<Contact />);
    fillValidForm();
    fireEvent.click(screen.getByTestId("quote-submit-button"));

    await waitFor(() => expect(screen.getByTestId("quote-success-message")).toBeInTheDocument());
    expect(screen.getByTestId("quote-name-input")).toHaveValue("");
  });

  test("shows the service failure state without sending a second request", async () => {
    axios.post.mockRejectedValue({ response: { status: 503 } });
    render(<Contact />);
    fillValidForm();
    fireEvent.click(screen.getByTestId("quote-submit-button"));

    await waitFor(() => expect(screen.getByTestId("quote-error-message")).toHaveTextContent("temporarily unavailable"));
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test("shows distinct timeout and network failure guidance", async () => {
    axios.post.mockRejectedValueOnce({ code: "ECONNABORTED" });
    const { unmount } = render(<Contact />);
    fillValidForm();
    fireEvent.click(screen.getByTestId("quote-submit-button"));
    await waitFor(() => expect(screen.getByTestId("quote-error-message")).toHaveTextContent("timed out"));

    unmount();
    axios.post.mockRejectedValueOnce(new Error("network down"));
    render(<Contact />);
    fillValidForm();
    fireEvent.click(screen.getByTestId("quote-submit-button"));
    await waitFor(() => expect(screen.getByTestId("quote-error-message")).toHaveTextContent("Please try again"));
  });
});

describe("verified site content", () => {
  test("keeps the verified phone, email and accessible navigation semantics", () => {
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

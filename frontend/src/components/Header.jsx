import { useEffect, useState } from "react";
import { Menu, Phone, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { SITE } from "../constants/site";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Logo = () => (
  <a
    href="#home"
    data-testid="nav-logo"
    aria-label="Aftab & Sons Transport — home"
    className="transition-transform duration-200 hover:scale-[1.02]"
  >
    <img
      src="/assets/logo-horizontal.webp"
      alt="Aftab & Sons Transport — Australia Keeps Moving"
      width="2172"
      height="724"
      fetchPriority="high"
      decoding="async"
      className="h-auto w-[172px] sm:w-[205px] md:w-[232px]"
    />
  </a>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let frameId;

    const updateScrollState = () => {
      frameId = undefined;

      setScrolled((current) => {
        const next = window.scrollY > 40;
        return current === next ? current : next;
      });

      // Bottom-of-page guard: activate contact when scrolled near document bottom
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSection("contact");
        return;
      }

      const sections = NAV.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    const onScroll = () => {
      if (frameId === undefined) {
        frameId = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#C0C0C0]/15 bg-[#0A0A0A]/95 shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
          data-testid="nav-desktop"
        >
          {NAV.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
                className={`relative py-1 text-sm font-semibold tracking-[0.18em] uppercase transition-colors duration-200 ${
                  isActive
                    ? "text-[#D4AF37]"
                    : "text-[#C0C0C0] hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 hover:w-full"
                  }`}
                />
              </a>
            );
          })}
          <a
            href="#contact"
            data-testid="nav-quote-button"
            className="btn-shine-overlay group flex items-center gap-2 bg-[#C81010] px-6 py-3 font-display text-lg tracking-[0.12em] text-white uppercase transition-all duration-200 hover:bg-[#A00D0D] hover:shadow-[0_0_20px_rgba(200,16,16,0.4)]"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </nav>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                data-testid="nav-mobile-menu-button"
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center border border-[#C0C0C0]/30 text-white transition-colors duration-200 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-[#C0C0C0]/15 bg-[#0A0A0A] p-0"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Use the navigation links to browse Aftab &amp; Sons Transport.
              </SheetDescription>
              <div className="flex h-full flex-col px-8 pt-20">
                {NAV.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <SheetClose asChild key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isActive ? "location" : undefined}
                        data-testid={`nav-mobile-link-${item.label.toLowerCase()}`}
                        className={`border-b border-[#C0C0C0]/10 py-4 font-display text-2xl tracking-[0.1em] uppercase transition-colors ${
                          isActive
                            ? "text-[#D4AF37]"
                            : "text-white hover:text-[#D4AF37]"
                        }`}
                      >
                        {item.label}
                      </a>
                    </SheetClose>
                  );
                })}
                <SheetClose asChild>
                  <a
                    href="#contact"
                    data-testid="nav-mobile-quote-button"
                    className="btn-shine-overlay mt-8 bg-[#C81010] px-6 py-4 text-center font-display text-xl tracking-[0.12em] text-white uppercase hover:bg-[#A00D0D]"
                  >
                    Request a Quote
                  </a>
                </SheetClose>
                <a
                  href={SITE.phoneHref}
                  data-testid="nav-mobile-call-link"
                  className="mt-6 flex items-center gap-3 text-sm tracking-wider text-[#C0C0C0] transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#D4AF37]" />
                  {SITE.phoneDisplay}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

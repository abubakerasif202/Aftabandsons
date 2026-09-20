import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
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
  <a href="#home" data-testid="nav-logo" aria-label="Aftab & Sons Transport — home">
    <img
      src="/assets/logo-horizontal.png"
      alt="Aftab & Sons Transport — Australia Keeps Moving"
      className="h-14 w-auto md:h-16"
    />
  </a>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-b border-[#C0C0C0]/15 bg-[#0A0A0A]/95 backdrop-blur-md"
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
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`nav-link-${item.label.toLowerCase()}`}
              className="text-sm font-semibold tracking-[0.18em] text-[#C0C0C0] uppercase transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            data-testid="nav-quote-button"
            className="bg-[#C81010] px-6 py-3 font-display text-lg tracking-[0.12em] text-white uppercase transition-colors duration-200 hover:bg-[#A00D0D]"
          >
            Request a Quote
          </a>
        </nav>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                data-testid="nav-mobile-menu-button"
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center border border-[#C0C0C0]/30 text-white"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-[#C0C0C0]/15 bg-[#0A0A0A] p-0"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col px-8 pt-20">
                {NAV.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      data-testid={`nav-mobile-link-${item.label.toLowerCase()}`}
                      className="border-b border-[#C0C0C0]/10 py-4 font-display text-2xl tracking-[0.1em] text-white uppercase transition-colors hover:text-[#D4AF37]"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a
                    href="#contact"
                    data-testid="nav-mobile-quote-button"
                    className="mt-8 bg-[#C81010] px-6 py-4 text-center font-display text-xl tracking-[0.12em] text-white uppercase hover:bg-[#A00D0D]"
                  >
                    Request a Quote
                  </a>
                </SheetClose>
                <a
                  href={SITE.phoneHref}
                  data-testid="nav-mobile-call-link"
                  className="mt-6 flex items-center gap-3 text-sm tracking-wider text-[#C0C0C0]"
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

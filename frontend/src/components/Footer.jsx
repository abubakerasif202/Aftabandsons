import { Phone, Mail, MessageCircle, ArrowUp } from "lucide-react";
import { SITE } from "../constants/site";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      data-testid="site-footer"
      className="border-t border-[#C0C0C0]/10 bg-[#0A0A0A] py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <img
              src="/assets/logo-horizontal.png"
              alt="Aftab & Sons Transport — Australia Keeps Moving"
              className="h-16 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#A1A1AA]">
              {SITE.line1}
            </p>
          </div>

          <nav aria-label="Footer" data-testid="footer-nav">
            <p className="text-xs font-bold tracking-[0.35em] text-[#C0C0C0] uppercase">
              Explore
            </p>
            <ul className="mt-6 space-y-3">
              {[
                { label: "Services", href: "#services" },
                { label: "Capabilities", href: "#capabilities" },
                { label: "About", href: "#about" },
                { label: "Request a Quote", href: "#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-testid={`footer-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-block text-sm text-[#A1A1AA] transition-colors duration-200 hover:text-[#D4AF37] hover:translate-x-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold tracking-[0.35em] text-[#C0C0C0] uppercase">
                Contact
              </p>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top of page"
                className="group flex items-center gap-2 border border-[#C0C0C0]/20 px-3 py-1.5 text-xs font-bold tracking-wider text-[#C0C0C0] uppercase transition-all duration-200 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Top
                <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </button>
            </div>
            <ul className="mt-6 space-y-4 text-sm text-[#A1A1AA]">
              <li>
                <a
                  href={SITE.phoneHref}
                  data-testid="footer-phone-link"
                  className="group flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110" />
                  <span>{SITE.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-whatsapp-link"
                  className="group flex items-center gap-3 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  data-testid="footer-email-link"
                  className="group flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110" />
                  <span>{SITE.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-[#C0C0C0]/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-xs tracking-[0.25em] text-[#A1A1AA] uppercase">
              &copy; {new Date().getFullYear()} {SITE.name}
            </p>
            <a
              href="https://abwebstudio.com.au"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AB Digital Solutions"
              className="inline-flex w-[155px] items-center opacity-85 transition duration-300 hover:scale-[1.01] hover:opacity-100 hover:brightness-110 focus-visible:outline-[#D4AF37] sm:w-[200px]"
            >
              <img
                src="/assets/ab-digital-solutions-footer.webp"
                alt="AB Digital Solutions"
                width="672"
                height="309"
                className="h-auto w-full"
              />
            </a>
          </div>
          <p className="font-display text-sm tracking-[0.3em] text-[#D4AF37] uppercase">
            {SITE.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

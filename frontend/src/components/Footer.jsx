import { Phone, Mail, MessageCircle } from "lucide-react";
import { SITE } from "../constants/site";

const Footer = () => (
  <footer
    data-testid="site-footer"
    className="border-t border-[#C0C0C0]/10 bg-[#0A0A0A] py-16"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-3xl tracking-[0.08em] text-white">
              AFTAB <span className="text-[#C81010]">&amp;</span> SONS
            </span>
            <span className="mt-2 flex items-center gap-2">
              <span className="h-px w-5 bg-[#D4AF37]" />
              <span className="text-[10px] font-semibold tracking-[0.5em] text-[#C0C0C0]">
                TRANSPORT
              </span>
              <span className="h-px w-5 bg-[#D4AF37]" />
            </span>
          </div>
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
                  className="text-sm text-[#A1A1AA] transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold tracking-[0.35em] text-[#C0C0C0] uppercase">
            Contact
          </p>
          <ul className="mt-6 space-y-4 text-sm text-[#A1A1AA]">
            <li>
              <a
                href={SITE.phoneHref}
                data-testid="footer-phone-link"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-[#D4AF37]" /> {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-link"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-[#D4AF37]" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                data-testid="footer-email-link"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#D4AF37]" /> {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#C0C0C0]/10 pt-8 sm:flex-row sm:items-center">
        <p className="text-xs tracking-[0.25em] text-[#A1A1AA] uppercase">
          &copy; {new Date().getFullYear()} {SITE.name}
        </p>
        <p className="font-display text-sm tracking-[0.3em] text-[#D4AF37] uppercase">
          {SITE.tagline}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

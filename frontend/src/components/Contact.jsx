import { Mail, MessageCircle, Phone } from "lucide-react";
import Reveal from "./motion/Reveal";
import { SITE } from "../constants/site";

const directContactLinkClass =
  "group relative flex min-h-20 items-center gap-4 border border-[#C0C0C0]/20 bg-[#141414]/60 px-6 py-5 transition-all duration-200 hover:translate-x-1 hover:border-[#D4AF37] hover:bg-[#141414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]";

const Contact = () => {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative border-t border-[#C0C0C0]/10 bg-[#141414] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
              <span className="h-px w-10 bg-[#D4AF37]" />
              Get a Quote
            </p>
            <h2
              data-testid="contact-heading"
              className="font-display text-5xl tracking-wide text-white uppercase sm:text-6xl"
            >
              Let&apos;s Move Your Freight
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#A1A1AA]">
              Tell us what you need moved, where it is going and when you need
              it transported. Contact Aftab &amp; Sons Transport directly about
              your freight requirements.
            </p>

            <div
              data-testid="contact-direct-panel"
              className="mt-10 border-l-2 border-[#C81010] bg-[#0A0A0A] px-6 py-6 sm:px-8"
            >
              <p className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
                Direct contact
              </p>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-white">
                Call or email us to discuss your next transport requirement.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                Choose the option that works best for you and use the verified
                contact details below.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex h-full flex-col justify-center border border-[#C0C0C0]/15 bg-[#0A0A0A] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)] sm:p-12">
              <h3 className="font-display text-3xl tracking-wider text-white uppercase">
                Prefer to Talk?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                Call, WhatsApp or email us directly about your freight requirements.
              </p>

              <div className="mt-10 space-y-4">
                <a
                  href={SITE.phoneHref}
                  data-testid="contact-call-button"
                  className={directContactLinkClass}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]">
                    <Phone
                      className="h-5 w-5 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.25em] text-[#A1A1AA] uppercase">
                      Call Us
                    </span>
                    <span className="block text-lg font-semibold text-white">
                      {SITE.phoneDisplay}
                    </span>
                  </span>
                </a>

                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-whatsapp-button"
                  className={directContactLinkClass}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]">
                    <MessageCircle
                      className="h-5 w-5 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.25em] text-[#A1A1AA] uppercase">
                      WhatsApp
                    </span>
                    <span className="block text-lg font-semibold text-white">
                      Message us directly
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${SITE.email}`}
                  data-testid="contact-email-button"
                  className={directContactLinkClass}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]">
                    <Mail
                      className="h-5 w-5 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.25em] text-[#A1A1AA] uppercase">
                      Email Us
                    </span>
                    <span className="block break-all text-base font-semibold text-white sm:text-lg">
                      {SITE.email}
                    </span>
                  </span>
                </a>
              </div>

              <p className="mt-10 border-t border-[#C0C0C0]/10 pt-6 text-sm leading-relaxed text-[#A1A1AA]">
                {SITE.line2}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;

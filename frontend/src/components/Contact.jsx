import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MessageCircle, Send, Loader2, ChevronDown, CheckCircle2 } from "lucide-react";
import Reveal from "./motion/Reveal";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { SITE, SERVICE_OPTIONS } from "../constants/site";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  botcheck: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const submittingRef = useRef(false);

  const set = (key) => (e) => {
    setForm((current) => ({ ...current, [key]: e.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "sent") setStatus("idle");
  };

  const validate = () => {
    const nextErrors = {};
    const nameTrimmed = form.name.trim();
    const emailTrimmed = form.email.trim();
    const phoneTrimmed = form.phone.trim();
    const messageTrimmed = form.message.trim();

    if (nameTrimmed.length < 2) {
      nextErrors.name = "Please enter your name (at least 2 characters).";
    } else if (nameTrimmed.length > 120) {
      nextErrors.name = "Name cannot exceed 120 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      nextErrors.email = "Please enter a valid email address.";
    } else if (emailTrimmed.length > 254) {
      nextErrors.email = "Email cannot exceed 254 characters.";
    }

    if (phoneTrimmed) {
      if (phoneTrimmed.length > 40) {
        nextErrors.phone = "Phone number cannot exceed 40 characters.";
      } else if (!/^[\d\s+\-()]{6,40}$/.test(phoneTrimmed)) {
        nextErrors.phone = "Please enter a valid phone number or leave blank.";
      }
    }

    if (!form.service || !SERVICE_OPTIONS.includes(form.service)) {
      nextErrors.service = "Please choose a service.";
    }

    if (messageTrimmed.length < 10) {
      nextErrors.message = "Tell us a little more about your freight (10+ characters).";
    } else if (messageTrimmed.length > 4000) {
      nextErrors.message = "Message cannot exceed 4,000 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending" || submittingRef.current || !validate()) return;

    const accessKey =
      process.env.REACT_APP_WEB3FORMS_KEY ||
      process.env.REACT_APP_WEB3FORMS_ACCESS_KEY ||
      SITE.web3formsKey;

    if (!accessKey) {
      toast.error("Web3Forms key required", {
        description:
          "Please configure your Web3Forms access key (REACT_APP_WEB3FORMS_KEY).",
      });
      return;
    }

    // Botcheck honeypot: silently ignore bot submissions
    if (form.botcheck) {
      setForm(initialForm);
      setStatus("sent");
      return;
    }

    submittingRef.current = true;
    setStatus("sending");

    try {
      const response = await axios.post(
        WEB3FORMS_ENDPOINT,
        {
          access_key: accessKey,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || "Not provided",
          service: form.service,
          message: form.message.trim(),
          botcheck: form.botcheck,
          subject: `New Freight Quote Enquiry - ${form.service} (${form.name.trim()})`,
          from_name: "Aftab & Sons Transport Website",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 15000,
        }
      );

      if (response.data && response.data.success) {
        setForm(initialForm);
        setErrors({});
        setStatus("sent");
        toast.success("Enquiry received", {
          description: "Thanks — your freight enquiry has been sent to our team.",
        });
      } else {
        throw new Error(response.data?.message || "Failed to submit enquiry.");
      }
    } catch (err) {
      setStatus("idle");
      let desc = "Please try again, or contact us directly via phone or WhatsApp.";
      if (err.code === "ECONNABORTED") {
        desc = "Request timed out. Please check your connection or call us directly.";
      } else if (err.response?.data?.message) {
        desc = err.response.data.message;
      } else if (err.message) {
        desc = err.message;
      }
      toast.error("Enquiry not sent", { description: desc });
    } finally {
      submittingRef.current = false;
    }
  };

  const inputCls =
    "rounded-none border-[#C0C0C0]/20 bg-[#141414] text-white placeholder:text-[#A1A1AA]/60 focus-visible:border-[#C81010] focus-visible:ring-1 focus-visible:ring-[#C81010] focus-visible:ring-offset-0 transition-colors duration-200";

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
              it transported. Our team can review the job and get back to you.
            </p>

            <form
              data-testid="quote-form"
              onSubmit={onSubmit}
              noValidate
              className="mt-10 space-y-6"
            >
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <Label htmlFor="quote-botcheck">Website</Label>
                <Input
                  id="quote-botcheck"
                  name="botcheck"
                  value={form.botcheck}
                  onChange={set("botcheck")}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="quote-name" className="text-xs font-bold tracking-[0.2em] text-[#C0C0C0] uppercase">
                    Name <span className="text-[#C81010]">*</span>
                  </Label>
                  <Input
                    id="quote-name"
                    data-testid="quote-name-input"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={120}
                    required
                    className={`mt-2 ${inputCls}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "quote-name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="quote-name-error" data-testid="quote-name-error" role="alert" className="mt-2 text-xs text-[#C81010]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="quote-email" className="text-xs font-bold tracking-[0.2em] text-[#C0C0C0] uppercase">
                    Email <span className="text-[#C81010]">*</span>
                  </Label>
                  <Input
                    id="quote-email"
                    type="email"
                    data-testid="quote-email-input"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@company.com.au"
                    autoComplete="email"
                    maxLength={254}
                    required
                    className={`mt-2 ${inputCls}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "quote-email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="quote-email-error" data-testid="quote-email-error" role="alert" className="mt-2 text-xs text-[#C81010]">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="quote-phone" className="text-xs font-bold tracking-[0.2em] text-[#C0C0C0] uppercase">
                    Phone
                  </Label>
                  <Input
                    id="quote-phone"
                    type="tel"
                    data-testid="quote-phone-input"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="Optional"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={40}
                    className={`mt-2 ${inputCls}`}
                  />
                </div>

                <div>
                  <Label htmlFor="quote-service" className="text-xs font-bold tracking-[0.2em] text-[#C0C0C0] uppercase">
                    Service <span className="text-[#C81010]">*</span>
                  </Label>
                  <div className="relative mt-2">
                    <select
                      id="quote-service"
                      data-testid="quote-service-select"
                      value={form.service}
                      onChange={set("service")}
                      required
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? "quote-service-error" : undefined}
                      className="flex h-9 w-full appearance-none rounded-none border border-[#C0C0C0]/20 bg-[#141414] px-3 pr-10 text-sm text-white focus:border-[#C81010] focus:outline-none focus:ring-1 focus:ring-[#C81010]"
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {SERVICE_OPTIONS.map((service) => (
                        <option key={service} value={service} className="bg-[#141414] text-white">
                          {service}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-[#A1A1AA]" />
                  </div>
                  {errors.service && (
                    <p id="quote-service-error" data-testid="quote-service-error" role="alert" className="mt-2 text-xs text-[#C81010]">
                      {errors.service}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="quote-message" className="text-xs font-bold tracking-[0.2em] text-[#C0C0C0] uppercase">
                    Freight Details <span className="text-[#C81010]">*</span>
                  </Label>
                  <span className="text-[11px] text-[#A1A1AA]">
                    {form.message.length}/4000
                  </span>
                </div>
                <Textarea
                  id="quote-message"
                  data-testid="quote-message-input"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="What are you moving, from where to where, and roughly when?"
                  rows={5}
                  minLength={10}
                  maxLength={4000}
                  required
                  className={`mt-2 ${inputCls}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "quote-message-error" : undefined}
                />
                {errors.message && (
                  <p id="quote-message-error" data-testid="quote-message-error" role="alert" className="mt-2 text-xs text-[#C81010]">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                data-testid="quote-submit-button"
                disabled={status === "sending"}
                className="btn-shine-overlay inline-flex min-h-12 items-center gap-3 bg-[#C81010] px-10 py-4 font-display text-xl tracking-[0.12em] text-white uppercase transition-all duration-200 hover:bg-[#A00D0D] hover:shadow-[0_0_25px_rgba(200,16,16,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending Enquiry...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" aria-hidden="true" /> Send Enquiry
                  </>
                )}
              </button>

              {status === "sent" && (
                <div
                  data-testid="quote-success-message"
                  role="status"
                  className="flex items-center gap-3 border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-4 text-sm text-[#D4AF37]"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                  <span>Enquiry received — thanks, our freight team will be in touch shortly.</span>
                </div>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex h-full flex-col justify-center border border-[#C0C0C0]/15 bg-[#0A0A0A] p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
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
                  className="group relative flex items-center gap-4 border border-[#C0C0C0]/20 bg-[#141414]/60 px-6 py-5 transition-all duration-200 hover:border-[#D4AF37] hover:bg-[#141414] hover:translate-x-1"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]">
                    <Phone className="h-5 w-5 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
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
                  className="group relative flex items-center gap-4 border border-[#C0C0C0]/20 bg-[#141414]/60 px-6 py-5 transition-all duration-200 hover:border-[#D4AF37] hover:bg-[#141414] hover:translate-x-1"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]">
                    <MessageCircle className="h-5 w-5 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
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
                  className="group relative flex items-center gap-4 border border-[#C0C0C0]/20 bg-[#141414]/60 px-6 py-5 transition-all duration-200 hover:border-[#D4AF37] hover:bg-[#141414] hover:translate-x-1"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]">
                    <Mail className="h-5 w-5 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                  </div>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.25em] text-[#A1A1AA] uppercase">
                      Email
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

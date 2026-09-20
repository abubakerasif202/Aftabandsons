import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MessageCircle, Send, Loader2 } from "lucide-react";
import Reveal from "./motion/Reveal";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { SITE, SERVICE_OPTIONS } from "../constants/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initialForm = { name: "", email: "", phone: "", service: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (form.name.trim().length < 2) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      err.email = "Please enter a valid email address.";
    if (!form.service) err.service = "Please choose a service.";
    if (form.message.trim().length < 10)
      err.message = "Tell us a little more about your freight (10+ characters).";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;
    setStatus("sending");
    try {
      await axios.post(`${API}/enquiries`, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        service: form.service,
        message: form.message.trim(),
      });
      setStatus("sent");
      setForm(initialForm);
      toast.success("Enquiry received", {
        description: "Thanks — the team will be in touch about your freight.",
      });
    } catch (err) {
      setStatus("idle");
      toast.error("Something went wrong", {
        description: "Your enquiry could not be sent. Please try again or call us.",
      });
    }
  };

  const inputCls =
    "rounded-none border-[#C0C0C0]/20 bg-[#141414] text-white placeholder:text-[#A1A1AA]/60 focus-visible:ring-1 focus-visible:ring-[#C81010] focus-visible:ring-offset-0";

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
              Tell us what you need moved and where it is going. We will come
              back with a straight answer.
            </p>

            <form
              data-testid="quote-form"
              onSubmit={onSubmit}
              noValidate
              className="mt-10 space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="quote-name" className="text-xs font-bold tracking-[0.2em] text-[#C0C0C0] uppercase">
                    Name *
                  </Label>
                  <Input
                    id="quote-name"
                    data-testid="quote-name-input"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    className={`mt-2 ${inputCls}`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p data-testid="quote-name-error" className="mt-2 text-xs text-[#C81010]">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="quote-email" className="text-xs font-bold tracking-[0.2em] text-[#C0C0C0] uppercase">
                    Email *
                  </Label>
                  <Input
                    id="quote-email"
                    type="email"
                    data-testid="quote-email-input"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@company.com.au"
                    className={`mt-2 ${inputCls}`}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p data-testid="quote-email-error" className="mt-2 text-xs text-[#C81010]">
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
                    className={`mt-2 ${inputCls}`}
                  />
                </div>
                <div>
                  <Label htmlFor="quote-service" className="text-xs font-bold tracking-[0.2em] text-[#C0C0C0] uppercase">
                    Service *
                  </Label>
                  <select
                    id="quote-service"
                    data-testid="quote-service-select"
                    value={form.service}
                    onChange={set("service")}
                    aria-invalid={!!errors.service}
                    className="mt-2 flex h-9 w-full rounded-none border border-[#C0C0C0]/20 bg-[#141414] px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C81010]"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p data-testid="quote-service-error" className="mt-2 text-xs text-[#C81010]">
                      {errors.service}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="quote-message" className="text-xs font-bold tracking-[0.2em] text-[#C0C0C0] uppercase">
                  Freight Details *
                </Label>
                <Textarea
                  id="quote-message"
                  data-testid="quote-message-input"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="What are you moving, from where to where, and roughly when?"
                  rows={5}
                  className={`mt-2 ${inputCls}`}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p data-testid="quote-message-error" className="mt-2 text-xs text-[#C81010]">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                data-testid="quote-submit-button"
                disabled={status === "sending"}
                className="inline-flex items-center gap-3 bg-[#C81010] px-10 py-4 font-display text-xl tracking-[0.12em] text-white uppercase transition-colors duration-200 hover:bg-[#A00D0D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" /> Send Enquiry
                  </>
                )}
              </button>
              {status === "sent" && (
                <p data-testid="quote-success-message" className="text-sm text-[#D4AF37]">
                  Enquiry received — thanks, we will be in touch.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex h-full flex-col justify-center border border-[#C0C0C0]/15 bg-[#0A0A0A] p-8 sm:p-12">
              <h3 className="font-display text-3xl tracking-wider text-white uppercase">
                Prefer to Talk?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                Call or message us directly — you will speak with the family,
                not a call centre.
              </p>

              <div className="mt-10 space-y-4">
                <a
                  href={SITE.phoneHref}
                  data-testid="contact-call-button"
                  className="flex items-center gap-4 border border-[#C0C0C0]/20 px-6 py-5 transition-colors duration-200 hover:border-[#D4AF37]"
                >
                  <Phone className="h-5 w-5 text-[#D4AF37]" />
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
                  className="flex items-center gap-4 border border-[#C0C0C0]/20 px-6 py-5 transition-colors duration-200 hover:border-[#D4AF37]"
                >
                  <MessageCircle className="h-5 w-5 text-[#D4AF37]" />
                  <span>
                    <span className="block text-xs font-bold tracking-[0.25em] text-[#A1A1AA] uppercase">
                      WhatsApp
                    </span>
                    <span className="block text-lg font-semibold text-white">
                      Message us anytime
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  data-testid="contact-email-button"
                  className="flex items-center gap-4 border border-[#C0C0C0]/20 px-6 py-5 transition-colors duration-200 hover:border-[#D4AF37]"
                >
                  <Mail className="h-5 w-5 text-[#D4AF37]" />
                  <span>
                    <span className="block text-xs font-bold tracking-[0.25em] text-[#A1A1AA] uppercase">
                      Email
                    </span>
                    <span className="block text-lg font-semibold text-white">
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

import { useRef, useState } from "react";
import { CheckCircle2, ChevronDown, Loader2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import Reveal from "./motion/Reveal";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { SERVICE_OPTIONS, SITE } from "../constants/site";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const initialForm = { name: "", email: "", phone: "", service: "", message: "", botcheck: "" };
const directContactLinkClass = "group relative flex min-h-20 items-center gap-4 rounded-none border border-[#C0C0C0]/20 bg-[#141414]/60 px-6 py-5 transition-all duration-200 hover:translate-x-1 hover:border-[#D4AF37] hover:bg-[#141414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]";

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const submittingRef = useRef(false);

  const updateField = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError("");
    if (status === "sent") setStatus("idle");
  };

  const validate = () => {
    const nextErrors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    else if (name.length > 120) nextErrors.name = "Name cannot exceed 120 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    else if (email.length > 254) nextErrors.email = "Email cannot exceed 254 characters.";
    if (phone && !/^[\d\s+\-()]{6,40}$/.test(phone)) nextErrors.phone = "Please enter a valid phone number or leave it blank.";
    if (!SERVICE_OPTIONS.includes(form.service)) nextErrors.service = "Please choose a service.";
    if (message.length < 10) nextErrors.message = "Please add at least 10 characters about your freight.";
    else if (message.length > 4000) nextErrors.message = "Message cannot exceed 4,000 characters.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current || !validate()) return;
    if (form.botcheck) {
      setForm(initialForm);
      setStatus("sent");
      return;
    }
    const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || process.env.REACT_APP_WEB3FORMS_KEY || SITE.web3formsKey;
    if (!accessKey) {
      setSubmitError("The quote form is not configured yet. Please call or email us instead.");
      return;
    }

    submittingRef.current = true;
    setStatus("sending");
    setSubmitError("");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name.trim(), email: form.email.trim(),
          phone: form.phone.trim() || "Not provided", service: form.service,
          message: form.message.trim(), botcheck: form.botcheck,
          subject: `New Freight Quote Enquiry - ${form.service}`,
          from_name: "Aftab & Sons Transport Website",
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Web3Forms could not send the enquiry.");
      setForm(initialForm);
      setErrors({});
      setStatus("sent");
    } catch (error) {
      setStatus("idle");
      setSubmitError(error.name === "AbortError" ? "The request timed out. Please try again or call us directly." : error.message || "Your enquiry could not be sent. Please try again.");
    } finally {
      clearTimeout(timeoutId);
      submittingRef.current = false;
    }
  };

  const inputClass = "mt-2 rounded-none border-[#C0C0C0]/20 bg-[#141414] text-white placeholder:text-[#A1A1AA]/60 transition-colors duration-200 focus-visible:border-[#C81010] focus-visible:ring-1 focus-visible:ring-[#C81010] focus-visible:ring-offset-0";
  const labelClass = "text-xs font-bold tracking-[0.2em] text-[#C0C0C0] uppercase";
  const fieldError = (key) => errors[key] ? <p id={`quote-${key}-error`} data-testid={`quote-${key}-error`} role="alert" className="mt-2 text-xs text-[#FF6464]">{errors[key]}</p> : null;

  return (
    <section id="contact" data-testid="contact-section" className="relative border-t border-[#C0C0C0]/10 bg-[#141414] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase"><span className="h-px w-10 bg-[#D4AF37]" /> Get a Quote</p>
            <h2 data-testid="contact-heading" className="font-display text-5xl tracking-wide text-white uppercase sm:text-6xl">Let&apos;s Move Your Freight</h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#A1A1AA]">Tell us what you need moved, where it is going and when you need it transported.</p>

            <form data-testid="quote-form" onSubmit={onSubmit} noValidate className="mt-10 space-y-6">
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <Label htmlFor="quote-botcheck">Website</Label>
                <Input id="quote-botcheck" name="botcheck" value={form.botcheck} onChange={updateField("botcheck")} tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="quote-name" className={labelClass}>Name <span className="text-[#FF6464]">*</span></Label>
                  <Input id="quote-name" name="name" data-testid="quote-name-input" value={form.name} onChange={updateField("name")} placeholder="Your name" autoComplete="name" maxLength={120} required className={inputClass} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "quote-name-error" : undefined} />
                  {fieldError("name")}
                </div>
                <div>
                  <Label htmlFor="quote-email" className={labelClass}>Email <span className="text-[#FF6464]">*</span></Label>
                  <Input id="quote-email" name="email" type="email" data-testid="quote-email-input" value={form.email} onChange={updateField("email")} placeholder="you@company.com.au" autoComplete="email" maxLength={254} required className={inputClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "quote-email-error" : undefined} />
                  {fieldError("email")}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="quote-phone" className={labelClass}>Phone</Label>
                  <Input id="quote-phone" name="phone" type="tel" data-testid="quote-phone-input" value={form.phone} onChange={updateField("phone")} placeholder="Optional" autoComplete="tel" inputMode="tel" maxLength={40} className={inputClass} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "quote-phone-error" : undefined} />
                  {fieldError("phone")}
                </div>
                <div>
                  <Label htmlFor="quote-service" className={labelClass}>Service <span className="text-[#FF6464]">*</span></Label>
                  <div className="relative mt-2">
                    <select id="quote-service" name="service" data-testid="quote-service-select" value={form.service} onChange={updateField("service")} required aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "quote-service-error" : undefined} className="flex h-9 w-full appearance-none rounded-none border border-[#C0C0C0]/20 bg-[#141414] px-3 pr-10 text-sm text-white focus:border-[#C81010] focus:outline-none focus:ring-1 focus:ring-[#C81010]">
                      <option value="" disabled>Select a service</option>
                      {SERVICE_OPTIONS.map((service) => <option key={service} value={service}>{service}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-2.5 right-3 h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
                  </div>
                  {fieldError("service")}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="quote-message" className={labelClass}>Freight Details <span className="text-[#FF6464]">*</span></Label>
                  <span className="text-[11px] text-[#A1A1AA]">{form.message.length}/4000</span>
                </div>
                <Textarea id="quote-message" name="message" data-testid="quote-message-input" value={form.message} onChange={updateField("message")} placeholder="What are you moving, from where to where, and roughly when?" rows={5} minLength={10} maxLength={4000} required className={inputClass} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "quote-message-error" : undefined} />
                {fieldError("message")}
              </div>
              <button type="submit" data-testid="quote-submit-button" disabled={status === "sending"} className="btn-shine-overlay inline-flex min-h-12 items-center gap-3 bg-[#C81010] px-10 py-4 font-display text-xl tracking-[0.12em] text-white uppercase transition-all duration-200 hover:bg-[#A00D0D] hover:shadow-[0_0_25px_rgba(200,16,16,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414] disabled:cursor-not-allowed disabled:opacity-60">
                {status === "sending" ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending Enquiry...</> : <><Send className="h-5 w-5" aria-hidden="true" /> Send Enquiry</>}
              </button>
              {status === "sent" && <div data-testid="quote-success-message" role="status" className="flex items-center gap-3 border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-4 text-sm text-[#D4AF37]"><CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" /><span>Enquiry received — thank you. We will review your freight details.</span></div>}
              {submitError && <p data-testid="quote-submit-error" role="alert" className="border border-[#C81010]/40 bg-[#C81010]/10 p-4 text-sm text-[#FFB4B4]">{submitError}</p>}
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex h-full flex-col justify-center border border-[#C0C0C0]/15 bg-[#0A0A0A] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)] sm:p-12">
              <h3 className="font-display text-3xl tracking-wider text-white uppercase">Prefer to Talk?</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">Call, WhatsApp or email us directly about your freight requirements.</p>
              <div className="mt-10 space-y-4">
                <a href={SITE.phoneHref} data-testid="contact-call-button" className={directContactLinkClass}><span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]"><Phone className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" /></span><span><span className="block text-xs font-bold tracking-[0.25em] text-[#A1A1AA] uppercase">Call Us</span><span className="block text-lg font-semibold text-white">{SITE.phoneDisplay}</span></span></a>
                <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp-button" className={directContactLinkClass}><span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]"><MessageCircle className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" /></span><span><span className="block text-xs font-bold tracking-[0.25em] text-[#A1A1AA] uppercase">WhatsApp</span><span className="block text-lg font-semibold text-white">Message us directly</span></span></a>
                <a href={`mailto:${SITE.email}`} data-testid="contact-email-button" className={directContactLinkClass}><span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]"><Mail className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" /></span><span><span className="block text-xs font-bold tracking-[0.25em] text-[#A1A1AA] uppercase">Email Us</span><span className="block break-all text-base font-semibold text-white sm:text-lg">{SITE.email}</span></span></a>
              </div>
              <p className="mt-10 border-t border-[#C0C0C0]/10 pt-6 text-sm leading-relaxed text-[#A1A1AA]">{SITE.line2}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;

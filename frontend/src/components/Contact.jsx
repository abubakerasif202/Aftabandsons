import { useState } from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import Reveal from "./motion/Reveal";
import { SERVICE_OPTIONS, SITE } from "../constants/site";

const WEB3FORMS_ACCESS_KEY = "b0b1f017-828a-4355-83ae-4b852e0cc740";

const FIELD_ERRORS = {
  name: "Enter your name so we know who to contact.",
  phone: "Enter a phone number so we can discuss the freight details.",
  email: "Enter a valid email address.",
  service: "Choose the service that best fits your freight.",
  message: "Tell us what needs moving, including pickup, delivery and timing.",
};

const inputClass =
  "min-h-12 w-full rounded-none border bg-[#141414] px-4 text-base text-white outline-none transition-colors placeholder:text-[#71717A] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]";

const directContactLinkClass =
  "group relative flex min-h-20 items-center gap-4 rounded-none border border-[#C0C0C0]/15 bg-[#141414] px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37] hover:bg-[#141414]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]";

const Contact = () => {
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validateField = (field) => {
    if (!field.name || !FIELD_ERRORS[field.name]) return "";
    return field.validity.valid ? "" : FIELD_ERRORS[field.name];
  };

  const handleBlur = (event) => {
    const { currentTarget: field } = event;
    setFieldErrors((current) => ({
      ...current,
      [field.name]: validateField(field),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Array.from(form.elements).filter(
      (element) => element.name in FIELD_ERRORS,
    );
    const nextFieldErrors = Object.fromEntries(
      fields.map((field) => [field.name, validateField(field)]),
    );

    if (Object.values(nextFieldErrors).some(Boolean)) {
      setFieldErrors(nextFieldErrors);
      setSubmissionStatus("idle");
      fields.find((field) => nextFieldErrors[field.name])?.focus();
      return;
    }

    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "Website quote request");

    setSubmissionStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send your quote request.");
      }

      form.reset();
      setFieldErrors({});
      setSubmissionStatus("success");
    } catch (error) {
      setErrorMessage(
        error.message || "Something went wrong. Please check your connection and try again.",
      );
      setSubmissionStatus("error");
    }
  };

  const fieldProps = (name) => ({
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
    "aria-invalid": Boolean(fieldErrors[name]),
    className: `${inputClass} ${
      fieldErrors[name] ? "border-[#E16B6B]" : "border-[#C0C0C0]/20"
    }`,
    name,
    onBlur: handleBlur,
    required: true,
  });

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative bg-[#0A0A0A] border-t border-[#C0C0C0]/15 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, Headline, Narrative, Direct Contact Options */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal>
              <p
                data-testid="contact-eyebrow"
                className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]"
              >
                <span className="h-px w-10 bg-[#D4AF37]" aria-hidden="true" />
                Direct Freight Enquiry
              </p>
              <h2
                data-testid="contact-heading"
                className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide text-white uppercase"
              >
                Request a Freight Quote
              </h2>
              <p className="mt-4 sm:mt-6 text-base leading-relaxed text-[#A1A1AA]">
                Tell us what you need moved, where it is going and when you need
                it transported. Contact Aftab &amp; Sons Transport directly about
                your freight requirements.
              </p>

              <div
                data-testid="contact-direct-panel"
                className="mt-8 border-l-2 border-[#C81010] bg-[#141414] p-6 sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Direct Contact Channels
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Direct access to dispatch and operations.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                  Prefer to speak directly? Call, message, or email us using the verified channels below.
                </p>

                <div className="mt-6 space-y-4">
                  <a
                    href={SITE.phoneHref}
                    data-testid="contact-call-button"
                    className={directContactLinkClass}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]">
                      <Phone className="h-5 w-5 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">Call Us</span>
                      <span className="block text-lg font-semibold text-white">{SITE.phoneDisplay}</span>
                    </div>
                  </a>

                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-whatsapp-button"
                    className={directContactLinkClass}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]">
                      <MessageCircle className="h-5 w-5 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">WhatsApp</span>
                      <span className="block text-lg font-semibold text-white">Message us directly</span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${SITE.email}`}
                    data-testid="contact-email-button"
                    className={directContactLinkClass}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none border border-[#C0C0C0]/20 bg-[#0A0A0A] transition-colors group-hover:border-[#D4AF37]">
                      <Mail className="h-5 w-5 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">Email Us</span>
                      <span className="block break-all text-base font-semibold text-white sm:text-lg">{SITE.email}</span>
                    </div>
                  </a>
                </div>
              </div>

              <p className="mt-8 border-t border-[#C0C0C0]/10 pt-4 text-xs leading-relaxed text-[#71717A]">
                {SITE.line2}
              </p>
            </Reveal>
          </div>

          {/* Right Column: Quote Form Card */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="rounded-none border border-[#C0C0C0]/15 bg-[#141414] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <div className="border-b border-[#C0C0C0]/10 pb-6 mb-8">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                    Online Consignment Enquiry
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl tracking-wide text-white uppercase">
                    Freight Details
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                    Share the basics and we will receive your freight enquiry directly.
                  </p>
                </div>

                <form
                  data-testid="quote-form"
                  className="grid gap-5"
                  noValidate
                  onSubmit={handleSubmit}
                  aria-busy={submissionStatus === "sending"}
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C0C0C0]">
                      Name <span aria-hidden="true" className="text-[#D4AF37]">*</span>
                      <input {...fieldProps("name")} autoComplete="name" placeholder="Your name" />
                      {fieldErrors.name && (
                        <span id="name-error" className="text-xs font-medium normal-case tracking-normal text-[#F2A3A3]">
                          {fieldErrors.name}
                        </span>
                      )}
                    </label>
                    <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C0C0C0]">
                      Phone <span aria-hidden="true" className="text-[#D4AF37]">*</span>
                      <input {...fieldProps("phone")} type="tel" autoComplete="tel" placeholder="Your phone number" />
                      {fieldErrors.phone && (
                        <span id="phone-error" className="text-xs font-medium normal-case tracking-normal text-[#F2A3A3]">
                          {fieldErrors.phone}
                        </span>
                      )}
                    </label>
                  </div>
                  <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C0C0C0]">
                    Email <span aria-hidden="true" className="text-[#D4AF37]">*</span>
                    <input {...fieldProps("email")} type="email" autoComplete="email" placeholder="you@example.com" />
                    {fieldErrors.email && (
                      <span id="email-error" className="text-xs font-medium normal-case tracking-normal text-[#F2A3A3]">
                        {fieldErrors.email}
                      </span>
                    )}
                  </label>
                  <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C0C0C0]">
                    Service needed <span aria-hidden="true" className="text-[#D4AF37]">*</span>
                    <select {...fieldProps("service")} defaultValue="" className={`${fieldProps("service").className} cursor-pointer`}>
                      <option value="" disabled className="bg-[#141414] text-[#71717A]">
                        Select a service
                      </option>
                      {SERVICE_OPTIONS.map((service) => (
                        <option key={service} value={service} className="bg-[#141414] text-white">
                          {service}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.service && (
                      <span id="service-error" className="text-xs font-medium normal-case tracking-normal text-[#F2A3A3]">
                        {fieldErrors.service}
                      </span>
                    )}
                  </label>
                  <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C0C0C0]">
                    Freight details <span aria-hidden="true" className="text-[#D4AF37]">*</span>
                    <textarea
                      {...fieldProps("message")}
                      rows="5"
                      className={`${fieldProps("message").className} min-h-32 py-3`}
                      placeholder="What needs moving, pickup and delivery locations, and preferred timing."
                    />
                    {fieldErrors.message && (
                      <span id="message-error" className="text-xs font-medium normal-case tracking-normal text-[#F2A3A3]">
                        {fieldErrors.message}
                      </span>
                    )}
                  </label>
                  <p className="text-xs leading-relaxed text-[#A1A1AA]">
                    Fields marked <span className="text-[#D4AF37]">*</span> are required.
                  </p>
                  {submissionStatus === "success" && (
                    <p role="status" className="rounded-none border-l-2 border-[#D4AF37] bg-[#D4AF37]/10 px-4 py-3 text-sm text-white">
                      Thank you. Your quote request has been sent.
                    </p>
                  )}
                  {submissionStatus === "error" && (
                    <p role="alert" className="rounded-none border-l-2 border-[#C81010] bg-[#C81010]/10 px-4 py-3 text-sm text-white">
                      {errorMessage} Please try again, or contact us directly below.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submissionStatus === "sending"}
                    className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-none bg-[#C81010] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#A00D0D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {submissionStatus === "sending" ? "Sending..." : "Send Quote Request"}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

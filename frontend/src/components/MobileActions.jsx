import { Phone, FileText } from "lucide-react";
import { SITE } from "../constants/site";

const MobileActions = () => (
  <nav
    aria-label="Quick contact actions"
    data-testid="mobile-actions"
    className="fixed inset-x-0 bottom-0 z-50 border-t border-[#C0C0C0]/15 bg-[#0A0A0A]/95 shadow-[0_-4px_25px_rgba(0,0,0,0.8)] backdrop-blur-md lg:hidden"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="grid grid-cols-2">
      <a
        href={SITE.phoneHref}
        data-testid="mobile-call-action"
        className="flex min-h-14 items-center justify-center gap-2 border-r border-[#C0C0C0]/15 px-4 font-display text-lg tracking-[0.1em] text-white uppercase transition-colors active:bg-[#141414]"
      >
        <Phone className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
        Call
      </a>
      <a
        href="#contact"
        data-testid="mobile-quote-action"
        className="btn-shine-overlay flex min-h-14 items-center justify-center gap-2 bg-[#C81010] px-4 font-display text-lg tracking-[0.1em] text-white uppercase transition-colors active:bg-[#A00D0D]"
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        Request Quote
      </a>
    </div>
  </nav>
);

export default MobileActions;

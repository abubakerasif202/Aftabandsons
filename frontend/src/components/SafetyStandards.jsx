import { ShieldCheck, Headphones, Clock, Truck } from "lucide-react";
import Reveal from "./motion/Reveal";
import { SAFETY_PILLARS } from "../constants/site";

const ICON_MAP = {
  ShieldCheck,
  Headphones,
  Clock,
  Truck,
};

const SafetyStandards = () => {
  return (
    <section
      id="safety"
      data-testid="safety-section"
      className="relative bg-[#0A0A0A] border-b border-[#C0C0C0]/15 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <p
              data-testid="safety-eyebrow"
              className="mb-4 inline-flex items-center justify-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase"
            >
              <span className="h-px w-10 bg-[#D4AF37]" aria-hidden="true" />
              <span>Core Operational Pillars</span>
              <span className="h-px w-10 bg-[#D4AF37]" aria-hidden="true" />
            </p>
            <h2
              data-testid="safety-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide text-white uppercase"
            >
              Foundations of Reliability
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#A1A1AA]">
              Verifiable principles ensuring consistent commercial performance across every long-haul consignment.
            </p>
          </Reveal>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAFETY_PILLARS.map((pillar, i) => {
            const IconComponent = ICON_MAP[pillar.icon] || ShieldCheck;

            return (
              <Reveal key={pillar.id} delay={i * 0.1} className="h-full">
                <div
                  data-testid={`safety-pillar-${pillar.id}`}
                  className="group relative flex h-full flex-col rounded-none border border-[#C0C0C0]/15 bg-[#141414] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
                >
                  {/* Top 2px colored indicator border */}
                  <div
                    className="absolute top-0 inset-x-0 h-[2px]"
                    style={{ backgroundColor: pillar.accent }}
                    aria-hidden="true"
                  />

                  {/* Icon container */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#C0C0C0]/15 bg-[#0A0A0A] transition-colors duration-300 group-hover:border-[#C0C0C0]/30">
                    <IconComponent
                      className="h-6 w-6"
                      style={{ color: pillar.accent }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Pillar title */}
                  <h3 className="font-display text-xl sm:text-2xl tracking-wide text-white uppercase">
                    {pillar.title}
                  </h3>

                  {/* Pillar description */}
                  <p className="mt-3 font-sans text-sm leading-relaxed text-[#A1A1AA]">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SafetyStandards;

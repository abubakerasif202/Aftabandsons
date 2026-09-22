import { Wrench, CheckCircle2, Route } from "lucide-react";
import Reveal from "./motion/Reveal";
import { FLEET_SPECS, IMAGES } from "../constants/site";

const FleetShowcase = () => {
  return (
    <section
      id="fleet"
      data-testid="fleet-showcase-section"
      className="relative bg-[#0A0A0A] border-b border-[#C0C0C0]/15 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
            <span className="h-px w-10 bg-[#D4AF37]" />
            Meticulous Engineering
          </p>
          <h2
            data-testid="fleet-showcase-heading"
            className="max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl tracking-wide text-white uppercase"
          >
            Engineered for the Long Haul
          </h2>
          <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-[#A1A1AA]">
            Continuous mechanical readiness through premium components, high-grade radial tyres, and heavy-duty chassis assemblies designed for non-stop Australian tarmac.
          </p>
        </Reveal>

        {/* Cinematic Visual Spread */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 8-Column Primary Chassis Spotlight Card */}
          <Reveal delay={0.1} className="lg:col-span-8 flex flex-col">
            <div
              data-testid="fleet-chassis-card"
              className="group relative flex-1 min-h-[480px] lg:min-h-[560px] flex flex-col justify-end overflow-hidden rounded-none border border-[#C0C0C0]/15 bg-[#141414]"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 inset-x-0 z-20 h-[2px] bg-gradient-to-r from-[#C81010] via-[#D4AF37] to-[#C81010]" />

              {/* Background Image with Cinematic Industrial Overlays */}
              <div className="absolute inset-0">
                <img
                  src={IMAGES.chassis || "/assets/fleet-chassis-engineering.webp"}
                  alt="Aftab & Sons Heavy Chassis Linehaul Engineering"
                  loading="lazy"
                  decoding="async"
                  width="1376"
                  height="768"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/20" />
                <div className="absolute inset-0 bg-[#0A0A0A]/30" />
              </div>

              {/* Spotlight Content Overlay */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    data-testid="fleet-chassis-badge"
                    className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase bg-[#0A0A0A]/90 text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                    {FLEET_SPECS.chassis.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-wide">
                  {FLEET_SPECS.chassis.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#A1A1AA] max-w-2xl leading-relaxed">
                  {FLEET_SPECS.chassis.description}
                </p>

                {/* Specs Grid */}
                <div className="mt-6 pt-6 border-t border-[#C0C0C0]/20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {FLEET_SPECS.chassis.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-[#0A0A0A]/80 backdrop-blur-sm p-3.5 border border-[#C0C0C0]/15"
                      data-testid={`spec-${spec.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                        {spec.label}
                      </span>
                      <span className="mt-1 block text-xs sm:text-sm font-semibold text-white tracking-wide">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* 4-Column Side Stack */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Pre-Trip Inspection Card */}
            <Reveal delay={0.2} className="flex-1 flex flex-col">
              <div
                data-testid="fleet-inspection-card"
                className="group relative flex-1 bg-[#141414] p-6 sm:p-8 border border-[#C0C0C0]/15 rounded-none transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-transparent transition-colors duration-300 group-hover:bg-[#D4AF37]" />
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
                      {FLEET_SPECS.inspection.badge}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center border border-[#D4AF37]/30 bg-[#0A0A0A] text-[#D4AF37]">
                      <Wrench className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-2xl tracking-wider text-white uppercase">
                    {FLEET_SPECS.inspection.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                    {FLEET_SPECS.inspection.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-3 border-t border-[#C0C0C0]/10 pt-5">
                  {FLEET_SPECS.inspection.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#C0C0C0] leading-snug"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Highway Discipline Card */}
            <Reveal delay={0.3} className="flex-1 flex flex-col">
              <div
                data-testid="fleet-discipline-card"
                className="group relative flex-1 bg-[#141414] p-6 sm:p-8 border border-[#C0C0C0]/15 rounded-none transition-all duration-300 hover:border-[#C81010]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-transparent transition-colors duration-300 group-hover:bg-[#C81010]" />
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C81010]">
                      {FLEET_SPECS.discipline.badge}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center border border-[#C81010]/30 bg-[#0A0A0A] text-[#C81010]">
                      <Route className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-2xl tracking-wider text-white uppercase">
                    {FLEET_SPECS.discipline.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                    {FLEET_SPECS.discipline.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-3 border-t border-[#C0C0C0]/10 pt-5">
                  {FLEET_SPECS.discipline.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#C0C0C0] leading-snug"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#C81010]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetShowcase;

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Truck, Package, Route, Navigation } from "lucide-react";
import Reveal from "./motion/Reveal";

const POINTS = [
  {
    icon: Truck,
    title: "Prime Movers",
    text: "Prime-mover capability for commercial freight on Australian roads.",
  },
  {
    icon: Package,
    title: "B-Double Combinations",
    text: "B-double capability for high-volume freight and linehaul work.",
  },
  {
    icon: Route,
    title: "Local to Interstate",
    text: "Transport capability spanning local delivery work and interstate freight.",
  },
];

const Capability = () => {
  const reduce = useReducedMotion();
  const visualRef = useRef(null);
  const isVisualInView = useInView(visualRef, { margin: "50px" });

  return (
    <section
      id="capabilities"
      data-testid="capabilities-section"
      className="relative border-y border-[#C0C0C0]/10 bg-[#141414] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
              <span className="h-px w-10 bg-[#D4AF37]" />
              Capabilities
            </p>
            <h2
              data-testid="capabilities-heading"
              className="font-display text-5xl tracking-wide text-white uppercase sm:text-6xl"
            >
              Built for the Long Haul
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#A1A1AA]">
              Truck transport and B-double freight are the backbone of what we
              do, supporting commercial freight from pickup through delivery.
            </p>

            <div className="mt-12 space-y-5">
              {POINTS.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={0.1 + i * 0.1}>
                  <div
                    data-testid={`capability-point-${i}`}
                    className="group flex gap-5 border-l-2 border-[#C81010] bg-[#0A0A0A]/40 p-5 transition-all duration-200 hover:border-[#D4AF37] hover:bg-[#0A0A0A] hover:translate-x-1"
                  >
                    <Icon className="mt-1 h-6 w-6 shrink-0 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-xl tracking-wider text-white uppercase transition-colors duration-200 group-hover:text-[#D4AF37]">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                        {text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:sticky lg:top-32">
            <div
              ref={visualRef}
              data-testid="capability-route-visual"
              className="relative border border-[#C0C0C0]/15 bg-[#0A0A0A] p-6 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between border-b border-[#C0C0C0]/10 pb-4">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.4em] text-[#C0C0C0] uppercase">
                  <Navigation className="h-3.5 w-3.5 text-[#D4AF37]" />
                  Pickup to Delivery
                </p>
                <span className="text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase">
                  Australian Network
                </span>
              </div>

              <svg
                viewBox="0 0 400 320"
                className="mt-6 w-full overflow-visible"
                role="img"
                aria-label="Freight route illustration from pickup to delivery"
              >
                <path
                  id="freight-route-curve"
                  d="M30 260 C 90 180, 140 280, 200 190 S 320 120, 370 60"
                  fill="none"
                  stroke="#C0C0C0"
                  strokeOpacity="0.25"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                />
                <motion.path
                  d="M30 260 C 90 180, 140 280, 200 190 S 320 120, 370 60"
                  fill="none"
                  stroke="#C81010"
                  strokeWidth="3"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />

                {/* Animated transit pulse along route curve: only active when in view and motion is enabled */}
                {!reduce && isVisualInView && (
                  <g>
                    <circle r="8" fill="#D4AF37" fillOpacity="0.25">
                      <animateMotion
                        dur="5s"
                        repeatCount="indefinite"
                        path="M30 260 C 90 180, 140 280, 200 190 S 320 120, 370 60"
                      />
                    </circle>
                    <circle r="4" fill="#D4AF37">
                      <animateMotion
                        dur="5s"
                        repeatCount="indefinite"
                        path="M30 260 C 90 180, 140 280, 200 190 S 320 120, 370 60"
                      />
                    </circle>
                  </g>
                )}

                {/* Pickup node */}
                <circle cx="30" cy="260" r="7" fill="#D4AF37" />
                <circle cx="30" cy="260" r="14" fill="#D4AF37" fillOpacity="0.2" />

                {/* Midpoint waypoint */}
                <circle cx="200" cy="190" r="4" fill="#C0C0C0" />
                <text x="170" y="215" fill="#A1A1AA" fontSize="9" letterSpacing="1.5">
                  TRANSIT
                </text>

                {/* Delivery node */}
                <circle cx="370" cy="60" r="7" fill="#C81010" />
                <circle cx="370" cy="60" r="14" fill="#C81010" fillOpacity="0.2" />

                <text x="20" y="295" fill="#C0C0C0" fontSize="11" letterSpacing="2" fontWeight="bold">
                  PICKUP
                </text>
                <text x="312" y="44" fill="#C0C0C0" fontSize="11" letterSpacing="2" fontWeight="bold">
                  DELIVERY
                </text>
              </svg>

              <div className="mt-6 flex items-center justify-between border-t border-[#C0C0C0]/10 pt-6 text-xs text-[#A1A1AA]">
                <span>Commercial Freight Transit</span>
                <span className="font-semibold tracking-wider text-[#D4AF37]">FREIGHT MOVEMENT</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Capability;

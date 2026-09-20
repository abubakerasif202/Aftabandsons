import { motion, useReducedMotion } from "framer-motion";
import { Truck, Package, Route } from "lucide-react";
import Reveal from "./motion/Reveal";

const POINTS = [
  {
    icon: Truck,
    title: "Prime Movers",
    text: "Modern prime-mover capability for commercial freight across Australian roads.",
  },
  {
    icon: Package,
    title: "B-Double Combinations",
    text: "High-volume B-double freight — more payload per trip for efficient linehaul work.",
  },
  {
    icon: Route,
    title: "Local to Interstate",
    text: "From local delivery runs to long-haul interstate routes, one team handles the lot.",
  },
];

const Capability = () => {
  const reduce = useReducedMotion();

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
              do. Every load is planned, secured and driven by people who treat
              your freight like their own.
            </p>

            <div className="mt-12 space-y-8">
              {POINTS.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={0.1 + i * 0.1}>
                  <div
                    data-testid={`capability-point-${i}`}
                    className="flex gap-5 border-l-2 border-[#C81010] pl-6"
                  >
                    <Icon className="mt-1 h-6 w-6 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-xl tracking-wider text-white uppercase">
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

          {/* Animated route line: a freight run drawing itself across the map */}
          <Reveal delay={0.2} className="lg:sticky lg:top-32">
            <div
              data-testid="capability-route-visual"
              className="relative border border-[#C0C0C0]/15 bg-[#0A0A0A] p-8 sm:p-12"
            >
              <p className="text-xs font-bold tracking-[0.4em] text-[#C0C0C0] uppercase">
                Depot to Destination
              </p>
              <svg
                viewBox="0 0 400 320"
                className="mt-6 w-full"
                role="img"
                aria-label="Animated freight route from pickup to delivery"
              >
                <path
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
                <circle cx="30" cy="260" r="7" fill="#D4AF37" />
                <circle cx="370" cy="60" r="7" fill="#C81010" />
                <text x="30" y="292" fill="#C0C0C0" fontSize="11" letterSpacing="2">
                  PICKUP
                </text>
                <text x="322" y="44" fill="#C0C0C0" fontSize="11" letterSpacing="2">
                  DELIVERED
                </text>
              </svg>
              <p className="mt-6 border-t border-[#C0C0C0]/10 pt-6 text-sm leading-relaxed text-[#A1A1AA]">
                One point of contact, door to door. You always know who is
                carrying your freight — and where it is headed.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Capability;

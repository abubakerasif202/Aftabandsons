import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Navigation, ArrowRight } from "lucide-react";
import Reveal from "./motion/Reveal";
import { ROUTES } from "../constants/site";

const HUB_COORDINATES = {
  adelaide: { x: 70, y: 230, label: "Adelaide", state: "SA" },
  melbourne: { x: 170, y: 285, label: "Melbourne", state: "VIC" },
  sydney: { x: 300, y: 195, label: "Sydney", state: "NSW" },
  brisbane: { x: 370, y: 75, label: "Brisbane", state: "QLD" },
};

// SVG Paths representing key highway corridors
const CORRIDOR_PATHS = {
  "melbourne-sydney": "M 170 285 Q 235 245 300 195",
  "sydney-brisbane": "M 300 195 Q 345 135 370 75",
  "melbourne-adelaide": "M 70 230 Q 115 265 170 285",
  "regional-custom": "M 70 230 Q 195 170 300 195 M 170 285 Q 275 140 370 75",
};

// Full transit path for the main Melbourne -> Sydney -> Brisbane linehaul pulse
const MAIN_LINEHAUL_PATH = "M 170 285 Q 235 245 300 195 Q 345 135 370 75";

const RoutesNetwork = () => {
  const [activeRouteId, setActiveRouteId] = useState(null);
  const reduce = useReducedMotion();
  const visualRef = useRef(null);
  const isVisualInView = useInView(visualRef, { margin: "50px" });

  return (
    <section
      id="routes"
      data-testid="routes-section"
      className="relative bg-[#0A0A0A] border-b border-[#C0C0C0]/15 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 columns on desktop): Eyebrow, Heading, Narrative, Callout, Corridors List */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
                <span className="h-px w-10 bg-[#D4AF37]" />
                Key Interstate Corridors
              </p>
              <h2
                data-testid="routes-heading"
                className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide text-white uppercase"
              >
                Connecting Australia's Major Freight Hubs
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#A1A1AA]">
                Aftab &amp; Sons Transport operates regular linehaul services connecting the nation's key commercial logistics centres. Whether moving full truckloads or managing scheduled hub-to-hub transits, our highway network delivers dependable consistency.
              </p>

              {/* Highway Corridors Callout */}
              <div
                data-testid="routes-corridors-callout"
                className="mt-6 border-l-2 border-[#D4AF37] bg-[#141414] p-4 text-xs sm:text-sm text-[#C0C0C0]"
              >
                <span className="font-bold tracking-wider text-white uppercase">Direct Interstate Connections:</span>{" "}
                Hume, Pacific, Newell, and Sturt Highway corridors.
              </div>
            </Reveal>

            {/* Corridor Matrix List mapping over ROUTES */}
            <div className="mt-10 space-y-4">
              {ROUTES.map((route, idx) => {
                const isActive = activeRouteId === route.id;
                const isScheduled = route.status.toLowerCase().includes("demand");
                const dotColor = isScheduled ? "bg-[#C81010]" : "bg-[#D4AF37]";

                return (
                  <Reveal key={route.id} delay={0.05 * (idx + 1)}>
                    <div
                      data-testid={`route-card-${route.id}`}
                      onMouseEnter={() => setActiveRouteId(route.id)}
                      onMouseLeave={() => setActiveRouteId(null)}
                      onFocus={() => setActiveRouteId(route.id)}
                      onBlur={() => setActiveRouteId(null)}
                      tabIndex={0}
                      className={`group relative border p-5 sm:p-6 transition-all duration-200 outline-none rounded-none cursor-pointer ${
                        isActive
                          ? "border-[#D4AF37] bg-[#141414] shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
                          : "border-[#C0C0C0]/15 bg-[#141414] hover:border-[#D4AF37]/60"
                      } focus-visible:ring-2 focus-visible:ring-[#D4AF37]`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2.5 mb-2">
                            {/* Status indicator dot */}
                            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#A1A1AA]">
                              <span
                                className={`inline-block h-2 w-2 rounded-full ${dotColor}`}
                                aria-hidden="true"
                              />
                              {route.status}
                            </span>
                            <span className="text-[#C0C0C0]/30" aria-hidden="true">•</span>
                            <span className="border border-[#C0C0C0]/20 bg-[#0A0A0A] px-2 py-0.5 text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
                              {route.corridorTag}
                            </span>
                          </div>

                          <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wide group-hover:text-[#D4AF37] transition-colors">
                            {route.name}
                          </h3>

                          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#C0C0C0]/80">
                            {route.corridor}
                          </p>

                          <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                            {route.description}
                          </p>
                        </div>

                        <div className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center border border-[#C0C0C0]/20 bg-[#0A0A0A] text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors">
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 columns on desktop): SVG Route Visualizer */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <Reveal delay={0.15}>
              <div
                ref={visualRef}
                data-testid="routes-visualizer"
                className="relative border border-[#C0C0C0]/15 bg-[#141414] p-6 sm:p-8 lg:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.7)] rounded-none"
              >
                {/* Visualizer Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C0C0C0]/15 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center border border-[#D4AF37]/30 bg-[#0A0A0A] text-[#D4AF37]">
                      <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-[0.25em] text-white uppercase">
                        Interstate Freight Grid
                      </p>
                      <p className="text-[10px] tracking-wider text-[#A1A1AA] uppercase">
                        Australian Commercial Corridors
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 border border-[#D4AF37]/30 bg-[#0A0A0A] px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    Direct Linehaul
                  </span>
                </div>

                {/* SVG Route Network Graphic */}
                <div className="relative mt-6 overflow-hidden bg-[#0A0A0A] border border-[#C0C0C0]/10 p-4 sm:p-6">
                  {/* Subtle Grid Pattern in background */}
                  <svg
                    data-testid="routes-map-svg"
                    viewBox="0 0 460 360"
                    className="w-full h-auto overflow-visible select-none"
                    role="img"
                    aria-label="Australian Interstate Highway Freight Network visualizer"
                  >
                    <defs>
                      <pattern id="routes-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#C0C0C0" strokeOpacity="0.05" strokeWidth="1" />
                      </pattern>
                      <linearGradient id="corridor-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#C81010" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Background Grid */}
                    <rect width="100%" height="100%" fill="url(#routes-grid)" />

                    {/* Base Network Lines (All Corridors) */}
                    {Object.entries(CORRIDOR_PATHS).map(([routeId, pathD]) => {
                      const isHighlighted = activeRouteId === routeId;
                      return (
                        <g key={routeId}>
                          {/* Guide path */}
                          <path
                            d={pathD}
                            fill="none"
                            stroke="#C0C0C0"
                            strokeOpacity={isHighlighted ? 0.4 : 0.15}
                            strokeWidth="2"
                            strokeDasharray="4 6"
                          />
                          {/* Active / base overlay path */}
                          <path
                            d={pathD}
                            fill="none"
                            stroke={isHighlighted ? "#D4AF37" : "#C81010"}
                            strokeOpacity={isHighlighted ? 1 : 0.45}
                            strokeWidth={isHighlighted ? "3.5" : "2"}
                            className="transition-all duration-300"
                          />
                        </g>
                      );
                    })}

                    {/* Animated Linehaul Transit Path (Melbourne -> Sydney -> Brisbane) */}
                    <motion.path
                      d={MAIN_LINEHAUL_PATH}
                      fill="none"
                      stroke="#C81010"
                      strokeWidth="2.5"
                      initial={reduce ? false : { pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Animated transit pulse along highway network: only active when in view and motion is enabled */}
                    {!reduce && isVisualInView && (
                      <g data-testid="routes-animated-pulse">
                        <circle r="8" fill="#D4AF37" fillOpacity="0.25">
                          <animateMotion
                            dur="6s"
                            repeatCount="indefinite"
                            path={MAIN_LINEHAUL_PATH}
                          />
                        </circle>
                        <circle r="4" fill="#D4AF37">
                          <animateMotion
                            dur="6s"
                            repeatCount="indefinite"
                            path={MAIN_LINEHAUL_PATH}
                          />
                        </circle>
                      </g>
                    )}

                    {/* Adelaide Node */}
                    <g transform={`translate(${HUB_COORDINATES.adelaide.x}, ${HUB_COORDINATES.adelaide.y})`}>
                      <circle r="10" fill="#0A0A0A" stroke="#C0C0C0" strokeOpacity="0.4" strokeWidth="1.5" />
                      <circle r="5" fill="#C0C0C0" />
                      <text x="-48" y="-12" fill="#FFFFFF" fontSize="11" fontWeight="bold" letterSpacing="1.2">
                        ADELAIDE
                      </text>
                      <text x="-48" y="2" fill="#A1A1AA" fontSize="9" letterSpacing="0.8">
                        SA TERMINAL
                      </text>
                    </g>

                    {/* Melbourne Pickup Node */}
                    <g
                      data-testid="visualizer-node-pickup"
                      transform={`translate(${HUB_COORDINATES.melbourne.x}, ${HUB_COORDINATES.melbourne.y})`}
                    >
                      <circle r="16" fill="#D4AF37" fillOpacity="0.15" />
                      <circle r="10" fill="#0A0A0A" stroke="#D4AF37" strokeWidth="2" />
                      <circle r="5" fill="#D4AF37" />
                      <text x="-26" y="28" fill="#FFFFFF" fontSize="11" fontWeight="bold" letterSpacing="1.2">
                        MELBOURNE
                      </text>
                      <text
                        x="-20"
                        y="42"
                        fill="#D4AF37"
                        fontSize="9"
                        fontWeight="bold"
                        letterSpacing="1.5"
                      >
                        PICKUP
                      </text>
                    </g>

                    {/* Sydney Transit Hub / Waypoint Node */}
                    <g
                      data-testid="visualizer-node-sydney"
                      transform={`translate(${HUB_COORDINATES.sydney.x}, ${HUB_COORDINATES.sydney.y})`}
                    >
                      <circle r="14" fill="#C0C0C0" fillOpacity="0.15" />
                      <circle r="9" fill="#0A0A0A" stroke="#C0C0C0" strokeWidth="1.5" />
                      <circle r="4.5" fill="#C0C0C0" />
                      <text x="16" y="-6" fill="#FFFFFF" fontSize="11" fontWeight="bold" letterSpacing="1.2">
                        SYDNEY
                      </text>
                      <text x="16" y="8" fill="#A1A1AA" fontSize="9" fontWeight="bold" letterSpacing="1.2">
                        TRANSIT HUB
                      </text>
                    </g>

                    {/* Brisbane Delivery Node */}
                    <g
                      data-testid="visualizer-node-delivery"
                      transform={`translate(${HUB_COORDINATES.brisbane.x}, ${HUB_COORDINATES.brisbane.y})`}
                    >
                      <circle r="16" fill="#C81010" fillOpacity="0.2" />
                      <circle r="10" fill="#0A0A0A" stroke="#C81010" strokeWidth="2" />
                      <circle r="5" fill="#C81010" />
                      <text x="-26" y="-18" fill="#FFFFFF" fontSize="11" fontWeight="bold" letterSpacing="1.2">
                        BRISBANE
                      </text>
                      <text
                        x="-22"
                        y="-6"
                        fill="#C81010"
                        fontSize="9"
                        fontWeight="bold"
                        letterSpacing="1.5"
                      >
                        DELIVERY
                      </text>
                    </g>

                    {/* Highway Corridor Badges / Waypoints */}
                    <g transform="translate(230, 235)">
                      <rect x="-30" y="-8" width="60" height="16" fill="#0A0A0A" stroke="#C0C0C0" strokeOpacity="0.3" strokeWidth="1" />
                      <text x="0" y="3" fill="#D4AF37" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                        HUME M31
                      </text>
                    </g>

                    <g transform="translate(345, 135)">
                      <rect x="-32" y="-8" width="64" height="16" fill="#0A0A0A" stroke="#C0C0C0" strokeOpacity="0.3" strokeWidth="1" />
                      <text x="0" y="3" fill="#D4AF37" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                        PACIFIC M1
                      </text>
                    </g>

                    <g transform="translate(115, 250)">
                      <rect x="-28" y="-8" width="56" height="16" fill="#0A0A0A" stroke="#C0C0C0" strokeOpacity="0.3" strokeWidth="1" />
                      <text x="0" y="3" fill="#C0C0C0" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                        WESTERN A8
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Visualizer Footer Bar */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#C0C0C0]/15 pt-5 text-xs text-[#A1A1AA]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                      Pickup Origin
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#C81010]" aria-hidden="true" />
                      Delivery Hub
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#C0C0C0]" aria-hidden="true" />
                      Transit Hub
                    </span>
                  </div>
                  <span className="font-semibold tracking-wider text-[#D4AF37] uppercase">
                    Commercial Linehaul
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoutesNetwork;

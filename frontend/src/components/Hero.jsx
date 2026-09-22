import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Truck, Route, Headphones } from "lucide-react";
import { IMAGES, SITE } from "../constants/site";

const HERO_ATTRIBUTES = [
  {
    icon: Route,
    title: "Interstate Linehaul",
    detail: "East Coast & National Corridors",
  },
  {
    icon: Truck,
    title: "B-Double Capability",
    detail: "High-Capacity Commercial Freight",
  },
  {
    icon: Headphones,
    title: "Direct Line Dispatch",
    detail: "Direct Driver & Operations Contact",
  },
];

const Hero = () => {
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Aftab & Sons Transport B-double convoy on an Australian highway at sunset"
          width="1672"
          height="941"
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/45" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      <motion.div
        data-testid="hero-opening-truck"
        aria-hidden="true"
        initial={reduce ? { opacity: 0 } : { x: "-24vw", opacity: 0, scale: 0.9 }}
        animate={
          reduce
            ? { opacity: 0 }
            : {
                x: "118vw",
                opacity: [0, 0.9, 0.9, 0],
                scale: [0.9, 1, 1, 0.94],
              }
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                duration: 3.2,
                delay: 0.15,
                ease: "easeInOut",
                times: [0, 0.12, 0.82, 1],
              }
        }
        className="pointer-events-none absolute bottom-[23%] left-0 z-[1] flex items-center gap-3 text-[#D4AF37]"
      >
        <span className="h-px w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-[#D4AF37] sm:w-32" />
        <Truck className="h-16 w-16 drop-shadow-[0_0_14px_rgba(212,175,55,0.45)] sm:h-24 sm:w-24" />
        <span className="h-px w-14 bg-gradient-to-r from-[#D4AF37] to-transparent sm:w-24" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-20 sm:px-8">
        <motion.div
          {...rise(0.05)}
          data-testid="hero-eyebrow"
          className="mb-6 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-bold tracking-[0.22em] sm:tracking-[0.35em] text-[#D4AF37] uppercase font-sans"
        >
          <span
            data-testid="hero-radar-pulse"
            className="relative flex h-2.5 w-2.5 items-center justify-center"
            aria-hidden="true"
          >
            <span className="animate-radar-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
          </span>
          <span className="h-px w-6 sm:w-10 bg-[#D4AF37]" aria-hidden="true" />
          <span>{SITE.name}</span>
        </motion.div>

        <motion.h1
          {...rise(0.15)}
          data-testid="hero-headline"
          className="max-w-4xl font-display text-5xl leading-[0.9] tracking-tight text-white uppercase sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Australia
          <br />
          Keeps <span className="text-[#C81010]">Moving</span>
        </motion.h1>

        <motion.p
          {...rise(0.3)}
          data-testid="hero-subline"
          className="mt-6 max-w-xl text-base leading-relaxed text-[#C0C0C0] sm:text-lg"
        >
          {SITE.line1} Truck transport and B-double freight for Australian
          businesses, from local deliveries to interstate freight.
        </motion.p>

        <motion.div
          {...rise(0.45)}
          className="mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4"
        >
          <a
            href="#contact"
            data-testid="hero-quote-button"
            className="btn-shine-overlay group inline-flex items-center justify-center gap-3 rounded-none bg-[#C81010] px-8 py-4 font-display text-xl tracking-[0.12em] text-white uppercase transition-all duration-200 hover:bg-[#A00D0D] hover:shadow-[0_0_25px_rgba(200,16,16,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            <span>Request a Freight Quote</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1.5" />
          </a>
          <a
            href="#services"
            data-testid="hero-services-button"
            className="inline-flex items-center justify-center gap-3 rounded-none border border-[#C0C0C0]/40 bg-[#0A0A0A] px-8 py-4 font-display text-xl tracking-[0.12em] text-[#C0C0C0] uppercase backdrop-blur-sm transition-all duration-200 hover:border-white hover:text-white hover:bg-[#141414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            <span>View Fleet & Services</span>
          </a>
        </motion.div>

        <motion.ul
          {...rise(0.6)}
          data-testid="hero-attributes"
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-[#C0C0C0]/15 pt-8"
        >
          {HERO_ATTRIBUTES.map(({ icon: Icon, title, detail }) => (
            <li
              key={title}
              className="group relative flex flex-col justify-center rounded-none border-l-2 border-l-[#C81010] border-y border-r border-[#C0C0C0]/15 bg-[#0A0A0A]/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-200 hover:border-l-[#D4AF37] hover:border-[#D4AF37]/40"
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className="h-4 w-4 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span className="font-display text-lg tracking-[0.08em] text-white uppercase sm:text-xl">
                  {title}
                </span>
              </div>
              {detail && (
                <p className="mt-1 text-xs font-medium tracking-wide text-[#C0C0C0]/80">
                  {detail}
                </p>
              )}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Hero;

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users, MapPin } from "lucide-react";
import { IMAGES, SITE } from "../constants/site";

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
          alt="Semi-truck travelling an Australian highway under a dramatic sky"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-20 sm:px-8">
        <motion.p
          {...rise(0.05)}
          data-testid="hero-eyebrow"
          className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase"
        >
          <span className="h-px w-10 bg-[#D4AF37]" />
          {SITE.name}
        </motion.p>

        <motion.h1
          {...rise(0.15)}
          data-testid="hero-headline"
          className="max-w-4xl font-display text-6xl leading-[0.95] tracking-wide text-white uppercase sm:text-7xl md:text-8xl"
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
          {SITE.line1} Premium truck transport and B-double freight for
          Australian businesses — reliable, safe and family driven.
        </motion.p>

        <motion.div {...rise(0.45)} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            data-testid="hero-quote-button"
            className="group inline-flex items-center gap-3 bg-[#C81010] px-8 py-4 font-display text-xl tracking-[0.12em] text-white uppercase transition-colors duration-200 hover:bg-[#A00D0D]"
          >
            Request a Quote
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            data-testid="hero-services-button"
            className="inline-flex items-center gap-3 border border-[#C0C0C0]/40 px-8 py-4 font-display text-xl tracking-[0.12em] text-white uppercase transition-colors duration-200 hover:border-white"
          >
            Our Services
          </a>
        </motion.div>

        <motion.ul
          {...rise(0.6)}
          data-testid="hero-attributes"
          className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-[#C0C0C0]/15 pt-8"
        >
          {[
            { icon: ShieldCheck, label: "Reliable & Safe" },
            { icon: MapPin, label: "Nationwide Reach" },
            { icon: Users, label: "Family Driven" },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-[#C0C0C0] uppercase"
            >
              <Icon className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
              {label}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Hero;

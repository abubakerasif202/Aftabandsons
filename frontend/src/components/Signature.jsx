import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IMAGES, SITE } from "../constants/site";

// Signature cinematic moment: parallax outback road with the brand promise.
const Signature = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      data-testid="signature-section"
      className="relative flex min-h-[70svh] items-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -top-[15%] h-[130%]"
        style={reduce ? undefined : { y }}
      >
        <img
          src={IMAGES.signature}
          alt="Aerial view of a highway cutting through the Australian outback"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#0A0A0A]/60" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase"
        >
          <span className="h-px w-10 bg-[#D4AF37]" />
          {SITE.name}
        </motion.p>
        <motion.h2
          data-testid="signature-headline"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-5xl leading-[1.02] tracking-wide text-white uppercase sm:text-6xl md:text-7xl"
        >
          {SITE.signatureLine}
        </motion.h2>
      </div>
    </section>
  );
};

export default Signature;

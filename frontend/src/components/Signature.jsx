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
      className="relative flex min-h-[75svh] items-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -top-[15%] h-[130%]"
        style={reduce ? undefined : { y }}
      >
        <img
          src={IMAGES.signature}
          alt="Aftab & Sons Transport B-double crossing an open outback highway at sunset"
          loading="lazy"
          decoding="async"
          width="1774"
          height="887"
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#0A0A0A]/65" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#141414] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase"
        >
          <span className="h-px w-10 bg-[#D4AF37]" />
          <span>{SITE.name}</span>
        </motion.div>
        <motion.h2
          data-testid="signature-headline"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-4xl leading-[1.02] tracking-wide text-white uppercase sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {SITE.signatureLine}
        </motion.h2>
        <motion.div
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 h-1 bg-[#C81010]"
        />
      </div>
    </section>
  );
};

export default Signature;

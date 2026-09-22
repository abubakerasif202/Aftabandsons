import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "../constants/site";

const OpeningIntro = () => {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      return undefined;
    }

    const timer = window.setTimeout(() => setVisible(false), 2000);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setVisible(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [reduce]);

  useEffect(() => {
    if (!visible || reduce) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [visible, reduce]);

  if (!visible || reduce) return null;

  return (
    <motion.div
      data-testid="opening-intro"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 1, 0] }}
      transition={{
        duration: 2.0,
        times: [0, 0.7, 0.88, 1],
        ease: "easeInOut",
      }}
      className="pointer-events-none fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#070707]"
    >
      {/* Ambient Crimson Halo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.72 }}
        animate={{ opacity: [0, 0.35, 0], scale: [0.72, 1.08, 1.25] }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(200,16,16,0.32)_0%,rgba(200,16,16,0.08)_38%,transparent_70%)] blur-2xl"
      />

      {/* Outback Gold Atmospheric Flare */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.22, 0], scale: [0.5, 1.1, 1.3] }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.25)_0%,rgba(212,175,55,0.05)_40%,transparent_70%)] blur-3xl"
      />

      {/* Kinetic Highway Light Streak Pass */}
      <motion.div
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 1.25, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 w-[28vw] -skew-x-12 bg-gradient-to-r from-transparent via-[#C81010]/20 to-transparent blur-xl"
      />
      <motion.div
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 1.2, delay: 0.48, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 w-[12vw] -skew-x-12 bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent blur-lg"
      />

      <div className="relative flex w-full max-w-3xl flex-col items-center px-6 text-center">
        {/* Monolithic Brand Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92, filter: "blur(8px)" }}
          animate={{
            opacity: [0, 1, 1],
            y: [16, 0, 0],
            scale: [0.92, 1, 1],
            filter: ["blur(8px)", "blur(0px)", "blur(0px)"],
          }}
          transition={{
            duration: 1.0,
            times: [0, 0.65, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <img
            src="/assets/logo-horizontal.webp"
            alt=""
            width="2172"
            height="724"
            decoding="async"
            className="h-auto w-[250px] drop-shadow-[0_18px_35px_rgba(0,0,0,0.85)] sm:w-[340px] md:w-[420px]"
          />
        </motion.div>

        {/* Industrial Gold Accent Sweep */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-px w-44 origin-center bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent sm:w-56"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10, letterSpacing: "0.2em" }}
          animate={{ opacity: [0, 1, 1], y: [10, 0, 0], letterSpacing: "0.36em" }}
          transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-[10px] font-semibold uppercase text-[#D4AF37] sm:text-xs"
        >
          {SITE.tagline}
        </motion.p>

        {/* Highway Lane Marker Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.8] }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-6 flex items-center gap-2"
        >
          <span className="h-0.5 w-6 bg-[#C0C0C0]/25" />
          <span className="h-0.5 w-10 bg-[#D4AF37]" />
          <span className="h-0.5 w-6 bg-[#C0C0C0]/25" />
        </motion.div>
      </div>

      {/* Bottom Road Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1] }}
        transition={{ duration: 0.85, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-[#C81010] via-[#D4AF37] to-[#C81010]"
      />
    </motion.div>
  );
};

export default OpeningIntro;

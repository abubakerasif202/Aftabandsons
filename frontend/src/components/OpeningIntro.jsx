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

    const timer = window.setTimeout(() => setVisible(false), 2100);
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
        duration: 2.1,
        times: [0, 0.68, 0.88, 1],
        ease: "easeInOut",
      }}
      className="pointer-events-none fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#070707]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.72 }}
        animate={{ opacity: [0, 0.32, 0], scale: [0.72, 1.08, 1.25] }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(200,16,16,0.30)_0%,rgba(200,16,16,0.08)_34%,transparent_70%)] blur-2xl"
      />

      <motion.div
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 1.35, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 w-[24vw] -skew-x-12 bg-gradient-to-r from-transparent via-[#C81010]/15 to-transparent blur-xl"
      />

      <div className="relative flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.9, filter: "blur(10px)" }}
          animate={{
            opacity: [0, 1, 1],
            y: [18, 0, 0],
            scale: [0.9, 1, 1],
            filter: ["blur(10px)", "blur(0px)", "blur(0px)"],
          }}
          transition={{
            duration: 1.05,
            times: [0, 0.62, 1],
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
            className="h-auto w-[250px] drop-shadow-[0_18px_35px_rgba(0,0,0,0.75)] sm:w-[340px] md:w-[420px]"
          />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.85, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-px w-44 origin-center bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent sm:w-56"
        />

        <motion.p
          initial={{ opacity: 0, y: 10, letterSpacing: "0.18em" }}
          animate={{ opacity: [0, 1, 1], y: [10, 0, 0], letterSpacing: "0.34em" }}
          transition={{ duration: 0.8, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-[10px] font-semibold uppercase text-[#D4AF37] sm:text-xs"
        >
          {SITE.tagline}
        </motion.p>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1] }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-[#C81010] via-[#D4AF37] to-[#C81010]"
      />
    </motion.div>
  );
};

export default OpeningIntro;

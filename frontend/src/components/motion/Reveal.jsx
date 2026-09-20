import { motion, useReducedMotion } from "framer-motion";

// Shared scroll-reveal primitive. Honours prefers-reduced-motion by rendering
// content immediately with no entrance animation.
export const Reveal = ({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  className = "",
  ...rest
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;

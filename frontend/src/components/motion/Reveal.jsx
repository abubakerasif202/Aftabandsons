import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Content is visible in HTML and stays visible if observers or animation fail.
export const Reveal = ({ children, delay = 0, y = 16, duration = 0.55, className = "", ...rest }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (reduce || !element || !window.IntersectionObserver || !element.animate) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      element.animate(
        [{ opacity: 0.35, transform: `translateY(${y}px)` }, { opacity: 1, transform: "translateY(0)" }],
        { duration: duration * 1000, delay: delay * 1000, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => { observer.disconnect(); element.getAnimations?.().forEach(animation => animation.cancel()); };
  }, [reduce, delay, y, duration]);
  return <div ref={ref} className={className} {...rest}>{children}</div>;
};
export default Reveal;

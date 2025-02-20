import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 right-0 w-1 h-screen bg-primary/10 z-50 origin-top"
        style={{ scaleY }}
      >
        <div className="absolute inset-0 bg-primary/50" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-transparent to-primary/80" />
        <div className="absolute bottom-0 w-full h-2 bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
      </motion.div>

      {/* Background color transition based on scroll */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% ${scrolled ? "100%" : "0%"}, 
            hsl(var(--primary) / 0.1) 0%, 
            transparent 50%
          )`,
          opacity: scrolled ? 0.8 : 0.3,
        }}
      />

      {/* Subtle parallax grid */}
      <div 
        className="fixed inset-0 -z-20 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: `translateY(${scrolled ? -20 : 0}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
    </>
  );
};
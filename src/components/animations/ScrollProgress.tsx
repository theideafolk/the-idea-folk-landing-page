import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const GlowingBar = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-primary/10" />
    <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/20" />
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-transparent to-primary" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary))_0%,transparent_70%)] opacity-20" />
  </div>
);

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
        className="fixed top-0 right-0 w-2 h-screen z-50 origin-top"
        style={{ scaleY }}
      >
        <GlowingBar />
        <motion.div 
          className="absolute inset-0 bg-primary"
          style={{ scaleY }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-transparent via-primary/30 to-primary/80">
          <div className="absolute bottom-0 w-full h-4 bg-primary rounded-t-full">
            <div className="absolute inset-0 animate-pulse bg-primary/50 rounded-t-full" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary))_0%,transparent_70%)] blur-sm" />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/80 via-primary/30 to-transparent">
          <div className="absolute top-0 w-full h-4 bg-primary rounded-b-full">
            <div className="absolute inset-0 animate-pulse bg-primary/50 rounded-b-full" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,hsl(var(--primary))_0%,transparent_70%)] blur-sm" />
          </div>
        </div>
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
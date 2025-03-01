import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { SciFiText } from "../animations/SciFiText";
import { useEffect, useRef, useState } from "react";
import { ProjectInquiryModal } from "./ProjectInquiryModal";
import { useIsMobile } from "@/hooks/use-mobile";

const SparkleEffects = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top-right sparkle cluster - positioned to avoid text overlap on mobile */}
      <motion.div 
        className={`absolute ${isMobile ? 'top-[5%] right-[10%]' : 'top-[15%] right-[15%]'}`}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary [filter:drop-shadow(0_0_3px_rgba(var(--primary-rgb),0.7))] animate-pulse-glow" />
      </motion.div>

      {/* Bottom-left sparkle cluster - positioned to avoid text overlap on mobile */}
      <motion.div 
        className={`absolute ${isMobile ? 'bottom-[40%] left-[5%]' : 'bottom-[25%] left-[20%]'}`}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [-15, 0, 15, -15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary [filter:drop-shadow(0_0_3px_rgba(var(--primary-rgb),0.7))] animate-pulse-glow" />
      </motion.div>

      {/* Floating particles - reduced for mobile and positioned to avoid text */}
      {Array.from({ length: isMobile ? 5 : 10 }).map((_, i) => {
        // For mobile, keep particles to the edges
        const mobileX = i % 2 === 0 ? 
          Math.random() * window.innerWidth * 0.2 : // Left 20%
          window.innerWidth * 0.8 + Math.random() * window.innerWidth * 0.2; // Right 20%
          
        const mobileY = Math.random() * window.innerHeight;
        
        // For desktop, allow particles throughout
        const desktopX = Math.random() * window.innerWidth;
        const desktopY = Math.random() * window.innerHeight;
          
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full"
            initial={{ 
              x: isMobile ? mobileX : desktopX,
              y: isMobile ? mobileY : desktopY 
            }}
            animate={{
              x: isMobile ? 
                (i % 2 === 0 ? 
                  [mobileX, mobileX + window.innerWidth * 0.1, mobileX] : 
                  [mobileX, mobileX - window.innerWidth * 0.1, mobileX]) : 
                [desktopX, desktopX + 100, desktopX - 100, desktopX],
              y: isMobile ?
                [mobileY, mobileY + 50, mobileY - 50, mobileY] :
                [desktopY, desktopY - 100, desktopY + 100, desktopY],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
};

const TextReveal = ({ children, delay = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inquiryModal, setInquiryModal] = useState({
    open: false,
    mode: "project" as "estimate" | "project"
  });
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleOpenModal = (mode: "estimate" | "project") => {
    setInquiryModal({ open: true, mode });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      <SparkleEffects />
      <motion.div 
        className="container relative mx-auto px-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.8 }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-primary/5 to-primary/3 rounded-full blur-3xl" 
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-l from-primary/5 to-primary/3 rounded-full blur-3xl" 
          />
          <h1 className="relative text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">Have an idea?</span>
            {" "}
            <span className="metallic-blue relative [text-shadow:_0_0_10px_hsl(var(--primary)_/_0.2)]">
              Turn it into reality
            </span>
            {" "}
            <span className="relative">
              <SciFiText text="in weeks, not months" delay={0.2} />
            </span>
          </h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Your on-demand product team that builds and scales digital solutions in weeks, not months.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                className="w-full sm:w-auto px-8 text-lg relative overflow-hidden animate-pulse-glow"
                onClick={() => handleOpenModal("project")}
              >
                Start Building
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 text-lg opacity-80 hover:opacity-100"
                onClick={() => handleOpenModal("estimate")}
              >
                Get Estimate
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">70%</div>
                <div className="text-sm text-muted-foreground">Lower Development Costs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">4+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">9+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <ProjectInquiryModal
        open={inquiryModal.open}
        onOpenChange={(open) => setInquiryModal({ ...inquiryModal, open })}
        initialMode={inquiryModal.mode}
      />
    </section>
  );
};

export default Hero;
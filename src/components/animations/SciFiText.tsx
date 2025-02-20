import { motion, useAnimate, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface SciFiTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const SciFiText = ({ text, className = "", delay = 0 }: SciFiTextProps) => {
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayText, setDisplayText] = useState(text.replace(/./g, " "));
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let currentIndex = 0;
    let scrambleInterval: number;
    
    const startAnimation = async () => {
      if (!isInView || hasAnimated) return;
      
      setHasAnimated(true);
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      
      scrambleInterval = window.setInterval(() => {
        if (currentIndex >= text.length) {
          clearInterval(scrambleInterval);
          setDisplayText(text);
          return;
        }
        
        const scrambled = text.slice(0, currentIndex) +
          Array(text.length - currentIndex)
            .fill(0)
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("");
            
        setDisplayText(scrambled);
        currentIndex++;
      }, 50);
    };
    
    if (isInView) {
      startAnimation();
    }
    
    return () => clearInterval(scrambleInterval);
  }, [text, delay, isInView, hasAnimated]);

  return (
    <motion.span
      ref={ref}
      className={`font-mono text-foreground ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {displayText}
    </motion.span>
  );
};
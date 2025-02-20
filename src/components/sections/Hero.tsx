
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      // Subtle parallax effect
      containerRef.current.style.setProperty('--x', `${x * 2 - 1}`);
      containerRef.current.style.setProperty('--y', `${y * 2 - 1}`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      <div 
        ref={containerRef}
        className="container mx-auto px-4 relative"
        style={{
          transform: 'perspective(1000px)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 fade-in"
            style={{
              transform: 'translateZ(20px)',
              transition: 'transform 0.2s ease-out'
            }}
          >
            Have an idea?{" "}
            <span className="text-primary relative inline-block">
              Turn it into reality in weeks.
              <span className="absolute -inset-1 bg-primary/10 -z-10 rounded-lg blur-sm" />
            </span>
          </h1>
          <p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 fade-in"
            style={{ 
              animationDelay: '0.2s',
              transform: 'translateZ(10px)',
              transition: 'transform 0.2s ease-out'
            }}
          >
            Your on-demand product team that builds and scales digital solutions in
            weeks, not months.
          </p>
          <div 
            className="fade-in"
            style={{ 
              animationDelay: '0.4s',
              transform: 'translateZ(30px)',
              transition: 'transform 0.2s ease-out'
            }}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 text-lg relative group overflow-hidden"
              onClick={() => {
                const calculatorSection = document.getElementById("calculator");
                calculatorSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get a Free Quote 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-primary-foreground/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

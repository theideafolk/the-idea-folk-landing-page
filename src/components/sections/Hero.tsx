
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Text assembly animation
    if (headingRef.current) {
      const text = headingRef.current.innerText;
      headingRef.current.innerText = '';
      
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.classList.add('text-assemble');
        span.style.animationDelay = `${i * 0.05}s`;
        headingRef.current?.appendChild(span);
      });
    }

    // Gradient orb effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      
      const { clientX, clientY } = e;
      const x = clientX - orbRef.current.offsetWidth / 2;
      const y = clientY - orbRef.current.offsetHeight / 2;
      
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
      orbRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      {/* Gradient Orb */}
      <div
        ref={orbRef}
        className="fixed pointer-events-none transition-all duration-300 ease-out opacity-0 z-0"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(155,135,245,0.15) 0%, rgba(155,135,245,0) 70%)',
          filter: 'blur(40px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Have an idea? Turn it into reality in weeks.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 beam-in">
            Your on-demand product team that builds and scales digital solutions in
            weeks, not months.
          </p>

          <div className="beam-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 text-lg ripple-button"
              onClick={() => {
                const calculatorSection = document.getElementById("calculator");
                calculatorSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

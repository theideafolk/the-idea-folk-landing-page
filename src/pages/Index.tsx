
import { useState, useEffect } from "react";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import CaseStudies from "@/components/sections/CaseStudies";
import About from "@/components/sections/About";
import Calculator from "@/components/sections/Calculator";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleHoverStart);
      element.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.style.scrollBehavior = "auto";
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleHoverStart);
        element.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Custom cursor */}
      <div 
        className="fixed w-4 h-4 bg-primary rounded-full mix-blend-difference pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
        }}
      />
      <div 
        className="fixed w-8 h-8 border border-primary rounded-full mix-blend-difference pointer-events-none z-50 transition-transform duration-300 ease-out"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          opacity: 0.5,
        }}
      />
      <Navbar />
      <main className="relative">
        <Hero />
        <Services />
        <Process />
        <CaseStudies />
        <About />
        <Calculator />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


import { useState } from "react";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import CaseStudies from "@/components/sections/CaseStudies";
import About from "@/components/sections/About";
import InquiryForm from "@/components/sections/InquiryForm";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRef, useEffect } from "react";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX) / window.innerWidth;
      const y = (clientY) / window.innerHeight;
      
      containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/10" />
      </div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(var(--primary-rgb),0.15),transparent_50%)]" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Process />
        <CaseStudies />
        <About />
        <InquiryForm />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

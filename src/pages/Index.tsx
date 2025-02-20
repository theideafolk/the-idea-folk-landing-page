
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
  useEffect(() => {
    // Handle scroll progress
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.documentElement.style.setProperty('--scroll-width', `${scrolled}%`);
    };

    // Handle cursor position for holographic effects
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--cursor-x', `${x}%`);
      document.documentElement.style.setProperty('--cursor-y', `${y}%`);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize intersection observer for float-card elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.float-card').forEach((el) => observer.observe(el));

    // Add ripple effect to buttons
    const addRipple = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLElement;
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.classList.add('ripple');
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      
      button.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    };

    document.querySelectorAll('.ripple-button').forEach((button) => {
      button.addEventListener('click', addRipple as any);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('.ripple-button').forEach((button) => {
        button.removeEventListener('click', addRipple as any);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="scroll-progress" />
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

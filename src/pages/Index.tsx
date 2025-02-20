
import { useState } from "react";
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
  return (
    <div className="min-h-screen bg-background">
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

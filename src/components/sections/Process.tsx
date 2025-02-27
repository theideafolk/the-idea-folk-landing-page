import { ArrowRight } from "lucide-react";
import { SciFiText } from "../animations/SciFiText";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const ProcessStep = ({ step, title, description, isLast = false }: ProcessStepProps) => {
  const isMobile = useIsMobile();

  // Mobile-friendly layout
  if (isMobile) {
    return (
      <div className="relative mb-8">
        {/* Step circle with number and connecting line */}
        <div className="flex items-start">
          <div className="relative">
            {/* Connecting line except for last item */}
            {!isLast && (
              <div className="absolute left-1/2 top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent -translate-x-1/2 h-full"></div>
            )}
            
            {/* Circle with number */}
            <div className="relative z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-medium">{step}</span>
            </div>
          </div>
          
          {/* Title - moved next to the circle */}
          <h3 className="text-xl font-semibold ml-4 pt-0.5 text-foreground">{title}</h3>
        </div>
        
        {/* Description - placed below with proper indentation */}
        <div className="pl-12 mt-2">
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    );
  }

  // Desktop layout (original)
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 relative">
      <div className="flex-none">
        <div className="w-12 h-12 relative z-10">
          {/* Solid blue circle with number and inner glow */}
          <div className="absolute inset-0 rounded-full bg-primary shadow-lg animate-pulse-glow z-10" />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white z-20">
            {step}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const Process = () => {
  const isMobile = useIsMobile();
  const steps = [
    {
      step: "1",
      title: "Day 1: Strategy Sprint",
      description: "Understand your vision, define core features, plan execution.",
    },
    {
      step: "2",
      title: "Week 1: Rapid Build",
      description: "Daily progress updates, regular demos, quick iterations.",
    },
    {
      step: "3",
      title: "Week 2-3: Launch & Learn",
      description: "Full deployment, analytics setup, growth recommendations.",
    },
  ];

  return (
    <section id="process" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <SciFiText text="From Idea to Reality in Weeks" className="text-foreground" />
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Our streamlined process ensures rapid development without compromising quality.
        </p>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12 relative">
            {/* Timeline connecting line - for desktop only */}
            {!isMobile && (
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent z-0"></div>
            )}
            
            {steps.map((step, index) => (
              <ProcessStep 
                key={index} 
                {...step} 
                isLast={index === steps.length - 1} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
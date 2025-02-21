
import { ArrowRight } from "lucide-react";
import { SciFiText } from "../animations/SciFiText";

const ProcessStep = ({ step, title, description }: {
  step: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 relative">
      <div className="flex-none">
        <div className="w-12 h-12 relative">
          <div className="absolute inset-0 rounded-full bg-primary/20" />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white">
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
    <section id="process" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <SciFiText text="From Idea to Reality in Weeks" className="text-foreground" />
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Our streamlined process ensures rapid development without compromising quality.
        </p>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <ProcessStep key={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

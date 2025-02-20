
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

const CaseStudyCard = ({ 
  title, 
  description, 
  metric, 
  metricLabel 
}: {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="mt-6">
        <div className="text-3xl font-bold text-primary mb-1">{metric}</div>
        <div className="text-sm text-muted-foreground">{metricLabel}</div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  const cases = [
    {
      title: "AI-Powered Teaching Assistant",
      description: "Developed an AI-powered teaching assistant that saved teachers 15+ hours weekly.",
      metric: "15+",
      metricLabel: "Hours saved weekly",
    },
    {
      title: "Rapid Landing Page Development",
      description: "Built 3 high-converting landing pages for a travel and hospitality brand in just 4 days.",
      metric: "3",
      metricLabel: "Landing pages in 4 days",
    },
    {
      title: "Workflow Automation for EdTech",
      description: "Helped an EdTech startup reduce operational costs by 70% through workflow automation.",
      metric: "70%",
      metricLabel: "Cost reduction",
    },
  ];

  return (
    <section id="cases" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Showcasing Our Success
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Real results from real clients. Here's what we've achieved together.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cases.map((caseStudy, index) => (
            <CaseStudyCard key={index} {...caseStudy} />
          ))}
        </div>
        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Case Studies
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;


import { Check } from "lucide-react";
import { Button } from "../ui/button";

const ServiceCard = ({ title, price, features, isPopular = false }: { 
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}) => {
  return (
    <div 
      className={`float-card holographic rounded-lg p-6 ${
        isPopular ? 'border-2 border-primary' : 'border border-border'
      }`}
    >
      {isPopular && (
        <span className="inline-block px-3 py-1 text-sm text-primary-foreground bg-primary rounded-full mb-4">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        className={`w-full ripple-button ${isPopular ? "energy-trail" : ""}`} 
        variant={isPopular ? "default" : "outline"}
      >
        Get a Free Quote
      </Button>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Launch Fast",
      price: "From $499",
      features: [
        "High-conversion designs",
        "3-7 day delivery",
        "Landing Pages & Websites",
      ],
    },
    {
      title: "Build & Scale",
      price: "From $999",
      features: [
        "AI-powered solutions",
        "Rapid development",
        "MVPs & Workflow Automation",
        "Business Strategy",
      ],
      isPopular: true,
    },
    {
      title: "Grow Together",
      price: "Custom Quote",
      features: [
        "Long-term partnership",
        "Scalable solutions",
        "Monthly Retainership",
        "Ongoing Development",
      ],
    },
    {
      title: "1:1 Coaching",
      price: "$40/hour",
      features: [
        "Personalized guidance",
        "Expert advice",
        "AI Implementation",
        "Product Strategy",
      ],
    },
  ];

  return (
    <section id="services" className="py-16 gradient-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Services Tailored to Your Needs
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Choose the perfect service package for your business needs. From quick launches to comprehensive solutions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

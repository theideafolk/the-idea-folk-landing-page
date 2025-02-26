import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { SciFiText } from "../animations/SciFiText";

const ServiceCardAnimated = ({ title, price, features, isPopular = false, index = 0 }) => {
  return (
    <motion.div
      className={`rounded-lg p-6 relative flex flex-col h-full ${isPopular ? 'border-2 border-primary shadow-[0_0_30px_-10px_hsl(var(--primary))]' : 'border border-border'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {isPopular && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-3 -right-3 z-10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl"></div>
            <div className="relative px-4 py-1 bg-primary text-primary-foreground rounded-lg font-medium shadow-lg border border-primary/20">
              Most Popular
            </div>
          </div>
        </motion.span>
      )}
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold mb-2 text-foreground relative z-10">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-primary relative z-10">{price}</span>
        </div>
        <ul className="space-y-3 flex-1">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-start gap-2"
            >
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span className="text-foreground">{feature}</span>
            </motion.li>
          ))}
        </ul>
        <div className="mt-6">
          <Button
            className="w-full relative overflow-hidden group"
            variant="default"
            className="w-full relative overflow-hidden group bg-primary text-white font-semibold hover:bg-primary/90"
            onClick={() => {
              const inquirySection = document.getElementById("inquiry");
              inquirySection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Building
          </Button>
        </div>
      </div>
      {isPopular && (
        <motion.div
          className="absolute -inset-px rounded-lg bg-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      )}
    </motion.div>
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
    <section id="services" className="py-16">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          <Sparkles className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
            <SciFiText text="Services Tailored to Your Needs" />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-16"
          >
            Choose the perfect service package for your business needs. From quick launches to comprehensive solutions.
          </motion.p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {services.map((service, index) => (
            <ServiceCardAnimated key={index} {...service} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
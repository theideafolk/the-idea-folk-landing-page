
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 slide-up">
            Have an idea?{" "}
            <span className="text-primary">Turn it into reality in weeks.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 slide-up">
            Your on-demand product team that builds and scales digital solutions in
            weeks, not months.
          </p>
          <div className="slide-up">
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 text-lg hover:scale-105 transition-transform duration-300"
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

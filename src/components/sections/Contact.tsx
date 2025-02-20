
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const Contact = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Move Fast?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Let's build something amazing together. Our team is ready to turn your idea into reality in weeks, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8"
              onClick={() => {
                const calculatorSection = document.getElementById("services");
                calculatorSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Pricing <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => {
                const calculatorSection = document.getElementById("calculator");
                calculatorSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { SciFiText } from "../animations/SciFiText";

const Contact = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <SciFiText text="Ready to Move Fast?" className="text-primary-foreground" />
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Let's build something amazing together. Our team is ready to turn your idea into reality in weeks, not months.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 w-full sm:w-auto bg-primary text-background font-semibold hover:bg-primary/90"
            onClick={() => {
              const inquirySection = document.getElementById("inquiry");
              inquirySection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Building
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;

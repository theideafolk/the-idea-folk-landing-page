
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SciFiText } from "../animations/SciFiText";

const FAQ = () => {
  const faqs = [
    {
      question: "How do you build so fast?",
      answer: "We combine cutting-edge AI tools with battle-tested product experience. No learning on your dime - we leverage our expertise to deliver rapid results.",
    },
    {
      question: "What if my project is complex?",
      answer: "We'll be honest upfront. If it needs more time, we'll tell you. But most MVPs can be launched within the timeframe we've discussed.",
    },
    {
      question: "What's included in your services?",
      answer: "Everything needed to test with real users. No hidden costs, no surprises.",
    },
    {
      question: "Do you offer other services beyond MVPs and landing pages?",
      answer: "Yes, we also offer workflow automation, content strategy, strategic growth consulting, and 1:1 coaching.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <SciFiText text="Frequently Asked Questions" />
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Got questions? We've got answers. If you don't find what you're looking for, feel free to reach out.
        </p>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SciFiText } from "../animations/SciFiText";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { teamMembers, type TeamMember } from "@/config/team";

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <div className="bg-card rounded-lg p-8 border border-border">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="w-48 h-48 rounded-full bg-muted overflow-hidden">
        {member.imageUrl ? (
          <img 
            src={member.imageUrl} 
            alt={member.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="text-lg font-medium">{member.initials}</span>
          </div>
        )}
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-foreground">{member.name}</h3>
        {member.role && (
          <p className="text-primary mb-4">{member.role}</p>
        )}
        <p className="text-muted-foreground whitespace-pre-wrap">{member.description}</p>
        {member.socialLinks && (
          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            {Object.entries(member.socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

const About = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <SciFiText text="Meet the Team" />
        </h2>
        <div className="max-w-4xl mx-auto relative">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.name}
                  className="flex-[0_0_100%] min-w-0 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedIndex 
                      ? "bg-primary w-4" 
                      : "bg-primary/20"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute -inset-x-12 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="absolute left-0 w-12 h-full bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 w-12 h-full bg-gradient-to-l from-background to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
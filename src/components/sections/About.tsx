import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SciFiText } from "../animations/SciFiText";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { teamMembers, type TeamMember } from "@/config/team";

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <div className="h-full">
    <div className="h-full bg-white/80 backdrop-blur-xl rounded-xl overflow-hidden border border-white/30 shadow-[0_10px_30px_-5px_rgba(var(--primary-rgb),0.2)] transform transition-all hover:scale-[1.01] hover:shadow-[0_20px_40px_-5px_rgba(var(--primary-rgb),0.25)]">
      {/* Glass effect overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none rounded-xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(var(--primary-rgb),0.1),transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-white/80 rounded-t-xl"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/10 rounded-b-xl"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col md:flex-row gap-6 h-full overflow-y-auto">
        {/* Left column - Photo */}
        <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
          <div className="relative w-28 h-28 md:w-40 md:h-40">
            {/* Photo container with circular frame */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/80 to-white/40 p-1 shadow-[0_10px_25px_-5px_rgba(var(--primary-rgb),0.3)]">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                {/* Loading pulse animation */}
                <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
                
                {/* Photo */}
                {member.imageUrl ? (
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="text-2xl font-medium">{member.initials}</span>
                  </div>
                )}
                
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-60 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Outer glow effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transform scale-105 blur-md transition-opacity"></div>
          </div>
        </div>
        
        {/* Right column - Text content */}
        <div className="flex-1 flex flex-col space-y-3 text-left">
          {/* Name and Role Section */}
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">{member.name}</h3>
            {member.role && (
              <p className="text-primary font-medium text-sm md:text-base">{member.role}</p>
            )}
          </div>
          
          {/* Bio Section */}
          <div className="flex-1 overflow-y-auto max-h-[200px] md:max-h-none">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{member.description}</p>
          </div>
          
          {/* Social Links (if any) */}
          {member.socialLinks && (
            <div className="flex gap-4 pt-2">
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
    <section id="about" className="py-16 bg-gradient-to-b from-white/90 via-white/95 to-white/90 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <SciFiText text="Meet the Team" />
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Card Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl" ref={emblaRef}>
              <div className="flex">
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex-[0_0_100%] min-w-0 px-1 group h-[400px] sm:h-[450px] md:h-[500px]">
                    <TeamMemberCard member={member} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute inset-x-0 md:-inset-x-12 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none px-3 md:px-0">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                className="pointer-events-auto h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/70 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                className="pointer-events-auto h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/70 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center hover:bg-white"
              >
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
            
            {/* Progress Indicators */}
            <div className="mt-8 flex justify-center gap-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedIndex 
                      ? "bg-primary w-8 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" 
                      : "bg-primary/20 hover:bg-primary/40"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
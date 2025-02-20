import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HolographicOverlay = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-primary/50 via-transparent to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
  </div>
);

export const CaseStudyCard = ({ 
  title, 
  description,
  previewUrl,
  onClick
}: {
  title: string;
  description: string;
  previewUrl?: string;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div 
        className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-all duration-300 cursor-pointer transform-gpu hover:translate-y-[-4px] hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden group"
        onClick={onClick}
        role="button"
        aria-label={`Preview ${title}`}
      >
        <HolographicOverlay />
        <div className="relative z-10">
          <div className="aspect-video w-full mb-4 overflow-hidden rounded-md bg-muted relative">
            {previewUrl && !imageError ? (
              <img
                src={`https://api.microlink.io/?url=${encodeURIComponent(previewUrl)}&screenshot=true&meta=false&embed=screenshot.url`}
                alt={title}
                className={cn(
                  "w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300",
                  !isImageLoaded && "opacity-0",
                  isImageLoaded && "opacity-100"
                )}
                onError={() => setImageError(true)}
                onLoad={() => setIsImageLoaded(true)}
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="text-4xl text-muted-foreground/50">
                  {title.charAt(0)}
                </div>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-white text-sm font-medium flex items-center gap-2">
                <span>Click to Preview</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
              {title}
            </span>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </h3>
          <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 line-clamp-3">
            {description}
          </p>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </motion.div>
  );
};
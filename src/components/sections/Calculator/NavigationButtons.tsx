import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  nextLabel?: string;
  className?: string;
}

export const NavigationButtons = ({
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
  nextLabel = "Next",
  className
}: NavigationButtonsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn("fixed left-0 right-0 bottom-0 flex items-center justify-between bg-white/90 backdrop-blur-sm border-t border-primary/10 shadow-[0_-4px_10px_-5px_rgba(var(--primary-rgb),0.1)] p-4", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary-rgb),0.15),transparent_50%)] pointer-events-none" />
      
      {isMobile ? (
        <Button
          variant="ghost"
          size="icon"
          className="relative z-10 text-foreground/70 hover:text-foreground"
          onClick={onPrev}
          disabled={disablePrev}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={disablePrev}
          className="relative z-10 min-w-[100px]"
        >
          Previous
        </Button>
      )}

      {isMobile ? (
        <Button
          variant="ghost"
          size="icon" 
          className="relative z-10 text-foreground hover:text-foreground"
          onClick={onNext}
          disabled={disableNext}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="default"
          onClick={onNext}
          disabled={disableNext}
          className={cn(
            "relative z-10 min-w-[100px]",
            nextLabel !== "Next" && "min-w-[200px]"
          )}
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
};
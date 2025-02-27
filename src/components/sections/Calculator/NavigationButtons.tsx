import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
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
  const isSubmitting = nextLabel === "Submitting...";

  return (
    <div className={cn("fixed left-0 right-0 bottom-0 flex items-center justify-between bg-white/95 backdrop-blur-sm border-t border-primary/10 shadow-[0_-4px_10px_-5px_rgba(var(--primary-rgb),0.1)] p-4", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary-rgb),0.02),transparent_50%)] pointer-events-none" />
      
      {isMobile ? (
        <Button
          variant="outline"
          size="lg"
          className="relative z-10 text-foreground/70 hover:text-foreground w-12 h-12 rounded-full flex items-center justify-center shadow-md border border-primary/20 bg-white"
          onClick={onPrev}
          disabled={disablePrev}
        >
          <ArrowLeft className="h-5 w-5" />
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
          variant="default"
          size="lg" 
          className="relative z-10 text-foreground hover:text-foreground w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          onClick={onNext}
          disabled={disableNext}
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <ArrowRight className="h-5 w-5" />
          )}
        </Button>
      ) : (
        <Button
          variant="default"
          onClick={onNext}
          disabled={disableNext}
          className="relative z-10 min-w-[100px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {nextLabel}
            </span>
          ) : (
            nextLabel
          )}
        </Button>
      )}
    </div>
  );
};
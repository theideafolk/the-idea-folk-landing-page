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
}

export const NavigationButtons = ({
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
  nextLabel = "Next"
}: NavigationButtonsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-t border-border">
      <Button
        variant="outline"
        className={cn(
          isMobile ? "w-10 h-10 rounded-full p-0" : "w-[120px]",
          "bg-background/50"
        )}
        onClick={onPrev}
        disabled={disablePrev}
      >
        {isMobile ? (
          <ArrowLeft className="h-4 w-4" />
        ) : (
          <span>Prev</span>
        )}
      </Button>
      <Button
        className={cn(
          isMobile ? "w-10 h-10 rounded-full p-0" : nextLabel === "Next" ? "w-[120px]" : "w-[200px]",
          "bg-background/50"
        )}
        onClick={onNext}
        disabled={disableNext}
      >
        {isMobile ? (
          <ArrowRight className="h-4 w-4" />
        ) : (
          <span>{nextLabel}</span>
        )}
      </Button>
    </div>
  );
};
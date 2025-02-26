interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted/20 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary/50 -translate-y-1/2 transition-all duration-300"
          style={{ 
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        >
          <div className="absolute right-0 top-1/2 w-4 h-4 -translate-y-1/2 translate-x-full">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
          </div>
        </div>
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((i) => (
          <div
            key={i}
            className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center"
          >
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                i < currentStep ? "bg-primary scale-100" :
                i === currentStep ? "bg-primary/20 scale-110" :
                "bg-muted/20 scale-100"
              }`} 
            />
            <div 
              className={`absolute inset-0 rounded-full ${
                i === currentStep ? "animate-ping bg-primary/20" : ""
              }`}
            />
            <span className={`relative z-10 transition-colors duration-300 ${
              i < currentStep ? "text-primary-foreground" :
              i === currentStep ? "text-white" :
              "text-white/60"
            }`}>
              {i}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
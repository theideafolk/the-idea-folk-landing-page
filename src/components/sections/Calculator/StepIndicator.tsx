interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="mb-6 relative z-10">
      <div className="flex items-center justify-between relative">
        {/* Background connecting line */}
        <div className="absolute left-6 top-1/2 right-6 h-0.5 bg-muted/20 -translate-y-1/2 z-0"></div>
        
        {/* Progress line */}
        <div 
          className="absolute left-6 top-1/2 h-0.5 bg-primary/50 -translate-y-1/2 transition-all duration-300 z-0"
          style={{ 
            width: `${((currentStep - 1) / (totalSteps - 1)) * (100 - 12)}%`,
          }}
        />
        
        {/* Step circles */}
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((i) => (
          <div
            key={i}
            className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center"
          >
            {/* Solid background circle */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                i < currentStep ? "bg-primary" :
                i === currentStep ? "bg-primary/20" :
                "bg-muted"
              }`} 
            />
            
            {/* Ping animation for current step */}
            {i === currentStep && (
              <div className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
            )}
            
            {/* Step number */}
            <span className={`relative z-20 transition-colors duration-300 ${
              i < currentStep ? "text-white" :
              i === currentStep ? "text-foreground" :
              "text-foreground/60"
            }`}>
              {i}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
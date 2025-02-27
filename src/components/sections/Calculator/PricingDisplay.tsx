interface PricingDisplayProps {
  estimatedBudget: number | null;
  isNGO: boolean;
  serviceType: string;
}

export const PricingDisplay = ({ estimatedBudget, isNGO, serviceType }: PricingDisplayProps) => {
  if (estimatedBudget !== null) {
    return (
      <div className="p-4 bg-white/80 rounded-lg text-center border border-primary/10 shadow-[0_4px_10px_-5px_rgba(var(--primary-rgb),0.15)]">
        <div className="text-sm text-muted-foreground mb-1">Estimated Starting Price:</div>
        <div className="text-2xl font-bold metallic-blue">
          ${estimatedBudget.toLocaleString()}
          {serviceType === "coaching" && "/hour"}
        </div>
      </div>
    );
  }

  if (isNGO) {
    return (
      <div className="p-4 bg-white/80 rounded-lg text-center border border-primary/10 shadow-[0_4px_10px_-5px_rgba(var(--primary-rgb),0.15)]">
        <div className="text-sm text-muted-foreground mb-1">Social Impact Pricing</div>
        <div className="text-lg text-primary">
          We'll work within your budget to support your cause
        </div>
      </div>
    );
  }

  return null;
};
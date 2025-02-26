interface PricingDisplayProps {
  estimatedBudget: number | null;
  isNGO: boolean;
  serviceType: string;
}

export const PricingDisplay = ({ estimatedBudget, isNGO, serviceType }: PricingDisplayProps) => {
  if (estimatedBudget !== null) {
    return (
      <div className="p-4 bg-muted rounded-lg text-center">
        <div className="text-sm text-muted-foreground mb-1">Estimated Starting Price:</div>
        <div className="text-2xl font-bold text-primary">
          ${estimatedBudget.toLocaleString()}
          {serviceType === "coaching" && "/hour"}
        </div>
      </div>
    );
  }

  if (isNGO) {
    return (
      <div className="p-4 bg-muted rounded-lg text-center">
        <div className="text-sm text-muted-foreground mb-1">Social Impact Pricing</div>
        <div className="text-lg text-primary">
          We'll work within your budget to support your cause
        </div>
      </div>
    );
  }

  return null;
};
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NavigationButtons } from "../NavigationButtons";
import { PricingDisplay } from "../PricingDisplay";
import type { StepProps } from "../types";

export const Step3 = ({ projectDetails, setProjectDetails, estimatedBudget, onNext, onPrev }: StepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Where can we reach you?"
          className="text-foreground placeholder:text-foreground/50"
          value={projectDetails.email}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, email: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input
          type="tel"
          placeholder="Your phone number"
          className="text-foreground placeholder:text-foreground/50"
          value={projectDetails.phone}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, phone: e.target.value })
          }
        />
      </div>

      <PricingDisplay 
        estimatedBudget={estimatedBudget}
        isNGO={projectDetails.isNGO}
        serviceType={projectDetails.serviceType}
      />
      <div className="h-16" /> {/* Spacer for navigation buttons */}
      <NavigationButtons
        onPrev={onPrev}
        onNext={onNext}
        disableNext={!projectDetails.email || !projectDetails.phone}
        nextLabel="Let's Build Something Amazing"
      />
    </div>
  );
};
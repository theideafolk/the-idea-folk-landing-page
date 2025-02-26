import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavigationButtons } from "../NavigationButtons";
import { PricingDisplay } from "../PricingDisplay";
import type { StepProps } from "../types";

export const Step2 = ({ projectDetails, setProjectDetails, estimatedBudget, onNext, onPrev }: StepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Approximately how many features do you need?</Label>
        <Select
          value={projectDetails.featureCount}
          onValueChange={(value) =>
            setProjectDetails({ ...projectDetails, featureCount: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="How complex is your project?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-3">1-3 features</SelectItem>
            <SelectItem value="4-6">4-6 features</SelectItem>
            <SelectItem value="7-10">7-10 features</SelectItem>
            <SelectItem value="10+">10+ features</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>What's your approximate budget?</Label>
        <Select
          value={projectDetails.budget}
          onValueChange={(value) =>
            setProjectDetails({ ...projectDetails, budget: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="What's your investment range?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="500-1000">$500 - $1,000</SelectItem>
            <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
            <SelectItem value="10000+">$10,000+</SelectItem>
          </SelectContent>
        </Select>
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
      />
    </div>
  );
};
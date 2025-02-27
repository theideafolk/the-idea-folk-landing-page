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

export const Step1 = ({ projectDetails, setProjectDetails, estimatedBudget, onNext, onPrev }: StepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>What stage is your project in?</Label>
        <Select
          value={projectDetails.projectStage}
          onValueChange={(value) =>
            setProjectDetails({ ...projectDetails, projectStage: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="How ready is your idea?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idea">I have an idea</SelectItem>
            <SelectItem value="validated">I have validated my idea</SelectItem>
            <SelectItem value="prd">I have a PRD</SelectItem>
            <SelectItem value="mvp">I have an MVP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Are you building for a social cause or NGO?</Label>
        <Select
          value={projectDetails.isNGO ? "yes" : "no"}
          onValueChange={(value) =>
            setProjectDetails({ ...projectDetails, isNGO: value === "yes" })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no">No, this is a commercial project</SelectItem>
            <SelectItem value="yes">Yes, this is for a social cause/NGO</SelectItem>
          </SelectContent>
        </Select>
        {projectDetails.isNGO && (
          <p className="text-sm text-muted-foreground italic">
            For social causes and NGOs, we offer flexible pricing based on your budget. Let's discuss how we can help you make a difference.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>What type of service are you looking for?</Label>
        <Select
          value={projectDetails.serviceType}
          onValueChange={(value) =>
            setProjectDetails({ ...projectDetails, serviceType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="What can we help you with?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="landing">Landing Page</SelectItem>
            <SelectItem value="mvp">MVP Development</SelectItem>
            <SelectItem value="automation">Workflow Automation</SelectItem>
            <SelectItem value="coaching">1:1 Coaching</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PricingDisplay 
        estimatedBudget={estimatedBudget}
        isNGO={projectDetails.isNGO}
        serviceType={projectDetails.serviceType}
      />
      <div className="h-16" />
      <NavigationButtons
        onPrev={onPrev}
        onNext={onNext}
        disablePrev={true}
        disableNext={!projectDetails.projectStage || !projectDetails.serviceType}
      />
    </div>
  );
};
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ProjectInquiryDetails } from "./types";
import { PricingDisplay } from "../Calculator/PricingDisplay";

interface StepThreeProps {
  projectDetails: ProjectInquiryDetails;
  setProjectDetails: (details: ProjectInquiryDetails) => void;
  estimatedBudget: number | null;
}

export const StepThree: React.FC<StepThreeProps> = ({ 
  projectDetails, 
  setProjectDetails, 
  estimatedBudget 
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Your Name</Label>
        <Input
          placeholder="What should we call you?"
          value={projectDetails.name}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, name: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Email <span className="text-primary">*</span></Label>
        <Input
          type="email"
          placeholder="Where can we reach you?"
          value={projectDetails.email}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, email: e.target.value })
          }
        />
        <p className="text-xs text-muted-foreground">Required</p>
      </div>

      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input
          type="tel"
          placeholder="Your phone number (optional)"
          value={projectDetails.phone}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, phone: e.target.value })
          }
        />
        <p className="text-xs text-muted-foreground">Optional</p>
      </div>

      {estimatedBudget !== null && (
        <PricingDisplay 
          estimatedBudget={estimatedBudget}
          isNGO={projectDetails.isNGO}
          serviceType={projectDetails.serviceType}
        />
      )}
    </div>
  );
};
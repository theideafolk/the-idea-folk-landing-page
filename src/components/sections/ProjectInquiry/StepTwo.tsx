import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectInquiryDetails } from "./types";
import { PricingDisplay } from "../Calculator/PricingDisplay";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getComplexityInfo, getItemNameByServiceType } from "./useProjectEstimate";

interface StepTwoProps {
  projectDetails: ProjectInquiryDetails;
  setProjectDetails: (details: ProjectInquiryDetails) => void;
  estimatedBudget: number | null;
}

export const StepTwo: React.FC<StepTwoProps> = ({ 
  projectDetails, 
  setProjectDetails, 
  estimatedBudget 
}) => {
  const complexityInfo = getComplexityInfo(projectDetails.serviceType);
  const itemName = getItemNameByServiceType(projectDetails.serviceType);

  return (
    <div className="space-y-5">
      {projectDetails.serviceType && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>{complexityInfo.label}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">What counts as a feature?</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-white text-foreground border border-primary/20">
                  <p>{complexityInfo.helpText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select
            value={projectDetails.featureCount}
            onValueChange={(value) =>
              setProjectDetails({ ...projectDetails, featureCount: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={complexityInfo.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3">1-3 {itemName}</SelectItem>
              <SelectItem value="4-6">4-6 {itemName}</SelectItem>
              <SelectItem value="7-10">7-10 {itemName}</SelectItem>
              <SelectItem value="10+">10+ {itemName}</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-foreground/70">{complexityInfo.helpText}</p>
        </div>
      )}

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

      <div className="space-y-2">
        <Label>Project Description</Label>
        <Textarea
          placeholder="Tell us about your project, goals, and timeline..."
          className="min-h-[150px] resize-y bg-white"
          value={projectDetails.projectDescription}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, projectDescription: e.target.value })
          }
        />
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
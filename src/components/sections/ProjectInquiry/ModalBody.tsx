import React from "react";
import { StepIndicator } from "../Calculator/StepIndicator";
import { NavigationButtons } from "../Calculator/NavigationButtons";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { InquiryMode, ProjectInquiryDetails } from "./types";
import { useProjectEstimate } from "./useProjectEstimate";

interface ModalBodyProps {
  step: number;
  mode: InquiryMode;
  projectDetails: ProjectInquiryDetails;
  setProjectDetails: (details: ProjectInquiryDetails) => void;
  handleNext: () => void;
  handlePrev: () => void;
  isSubmitting?: boolean;
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  step,
  mode,
  projectDetails,
  setProjectDetails,
  handleNext,
  handlePrev,
  isSubmitting = false
}) => {
  const estimatedBudget = useProjectEstimate(projectDetails);

  // Determine if next button should be disabled
  const isNextDisabled = () => {
    if (isSubmitting) return true;
    
    switch (step) {
      case 1:
        return !projectDetails.projectStage || !projectDetails.serviceType;
      case 2:
        return false; // Allow proceeding even if description is empty
      case 3:
        return !projectDetails.email;
      default:
        return false;
    }
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            estimatedBudget={estimatedBudget}
          />
        );
      case 2:
        return (
          <StepTwo
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            estimatedBudget={estimatedBudget}
          />
        );
      case 3:
        return (
          <StepThree
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            estimatedBudget={estimatedBudget}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 relative px-3">
      <StepIndicator currentStep={step} totalSteps={3} />
      
      <div className="min-h-[280px] relative z-20">
        {renderStepContent()}
      </div>
      
      {/* Space for buttons */}
      <div className="h-16"></div>
      
      <NavigationButtons
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={step === 1 || isSubmitting}
        disableNext={isNextDisabled()}
        nextLabel={step === 3 ? (isSubmitting ? "Submitting..." : "Submit") : "Next"}
        className="fixed left-0 right-0 bottom-0 z-50"
      />
    </div>
  );
};
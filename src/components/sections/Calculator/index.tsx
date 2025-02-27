import { useState, useMemo } from "react";
import { StepIndicator } from "./StepIndicator";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import type { ProjectDetails } from "./types";

const Calculator = () => {
  const [step, setStep] = useState(1);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    projectStage: "",
    serviceType: "",
    isNGO: false,
    featureCount: "",
    budget: "",
    email: "",
    phone: "",
  });

  const estimatedBudget = useMemo(() => {
    if (projectDetails.isNGO) return null;
    
    let base = 0;
    
    switch (projectDetails.serviceType) {
      case "landing": base = 499; break;
      case "mvp": base = 999; break;
      case "automation": base = 799; break;
      case "coaching": base = 40; break;
    }

    if (projectDetails.featureCount) {
      switch (projectDetails.featureCount) {
        case "1-3": base *= 1; break;
        case "4-6": base *= 1.5; break;
        case "7-10": base *= 2; break;
        case "10+": base *= 2.5; break;
      }
    }

    return base > 0 ? base : null;
  }, [projectDetails.serviceType, projectDetails.featureCount, projectDetails.isNGO]);

  const handleSubmit = async () => {
    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      if (!webhookUrl) {
        console.error("Webhook URL not configured");
        return;
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...projectDetails, estimatedBudget }),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      setProjectDetails({
        projectStage: "",
        serviceType: "",
        isNGO: false,
        featureCount: "",
        budget: "",
        email: "",
        phone: "",
      });
      setStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderStep = () => {
    const props = {
      projectDetails,
      setProjectDetails,
      estimatedBudget,
      onNext: step === 3 ? handleSubmit : () => setStep(step + 1),
      onPrev: () => setStep(step - 1),
    };

    switch (step) {
      case 1: return <Step1 {...props} />;
      case 2: return <Step2 {...props} />;
      case 3: return <Step3 {...props} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 relative pb-16">
      <StepIndicator currentStep={step} totalSteps={3} />
      {renderStep()}
    </div>
  );
};

export default Calculator;
export { Calculator };
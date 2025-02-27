import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { InquiryMode, ProjectInquiryDetails } from "./ProjectInquiry/types";
import { ModalBody } from "./ProjectInquiry/ModalBody";
import { useProjectEstimate } from "./ProjectInquiry/useProjectEstimate";

interface ProjectInquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: InquiryMode;
}

export const ProjectInquiryModal = ({ 
  open, 
  onOpenChange,
  initialMode = "project" 
}: ProjectInquiryModalProps) => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<InquiryMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();
  const [projectDetails, setProjectDetails] = useState<ProjectInquiryDetails>({
    projectStage: "",
    serviceType: "",
    isNGO: false,
    featureCount: "",
    budget: "",
    projectDescription: "",
    name: "",
    email: "",
    phone: "",
  });
  
  // Calculate estimated budget
  const estimatedBudget = useProjectEstimate(projectDetails);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setStep(1);
    setProjectDetails({
      projectStage: "",
      serviceType: "",
      isNGO: false,
      featureCount: "",
      budget: "",
      projectDescription: "",
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // For testing - if no webhook URL is configured, simulate a successful submission
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'https://httpstat.us/200';
      
      // Prepare data to send
      const submissionData = {
        ...projectDetails,
        inquiryType: mode,
        // Make sure we're sending a number or null, not undefined or empty string
        estimatedBudget: estimatedBudget !== null ? estimatedBudget : null,
        submittedAt: new Date().toISOString(),
      };

      // Log submission for debugging
      console.log("Submitting form data:", submissionData);

      // Send data to webhook
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }

      // Show success message
      toast({
        title: "Submission Successful!",
        description: "We've received your inquiry and will contact you within 24 hours.",
      });

      // Reset form and close modal
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // More user-friendly error message
      toast({
        title: "Submission Failed",
        description: "We couldn't process your request. Please try again later or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when modal is opened
  useEffect(() => {
    if (open) {
      resetForm();
      setMode(initialMode);
    }
  }, [open, initialMode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-md sm:max-w-lg p-6 border border-primary/20 bg-white shadow-lg"
        style={{
          maxHeight: isMobile ? '85vh' : '80vh',
        }}
      >
        {/* Static background pattern */}
        <div className="absolute inset-0 bg-grid-white/10 opacity-20 pointer-events-none z-0 rounded-md"></div>
        
        {/* Content container with scrolling */}
        <div className="relative z-10 max-h-[calc(80vh-120px)] overflow-y-auto">
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-2xl font-bold">
              {mode === "estimate" ? "Project Cost Estimate" : "Let's Build Something Amazing"}
            </DialogTitle>
          </DialogHeader>

          <ModalBody 
            step={step}
            mode={mode}
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            handleNext={handleNext}
            handlePrev={handlePrev}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
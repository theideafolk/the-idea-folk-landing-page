export type InquiryMode = "estimate" | "project";

export interface ProjectInquiryDetails {
  // Step 1: Project Info
  projectStage: string;
  serviceType: string;
  isNGO: boolean;
  // Step 2: Details
  featureCount: string;
  budget: string;
  projectDescription: string;
  // Step 3: Contact
  name: string;
  email: string;
  phone: string;
}

export interface ComplexityInfo {
  label: string;
  placeholder: string;
  helpText: string;
}
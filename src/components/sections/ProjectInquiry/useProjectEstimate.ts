import { ProjectInquiryDetails } from "./types";

export const useProjectEstimate = (projectDetails: ProjectInquiryDetails) => {
  // Return null for NGO projects - we do custom pricing
  if (projectDetails.isNGO) return null;
  
  let base = 0;
  
  // Set base price according to service type
  switch (projectDetails.serviceType) {
    case "landing": base = 499; break;
    case "mvp": base = 999; break;
    case "automation": base = 799; break;
    case "coaching": base = 40; break;
    default: return null; // No valid service type selected
  }

  // Apply multiplier based on feature count
  if (projectDetails.featureCount) {
    switch (projectDetails.featureCount) {
      case "1-3": base *= 1; break;
      case "4-6": base *= 1.5; break;
      case "7-10": base *= 2; break;
      case "10+": base *= 2.5; break;
    }
  }

  // Return a number, not a string
  return base > 0 ? Math.round(base) : null;
};

export const getComplexityInfo = (serviceType: string) => {
  switch (serviceType) {
    case "landing":
      return {
        label: "How many sections do you need?",
        placeholder: "How many sections on your landing page?",
        helpText: "A section is a distinct part of your landing page (e.g., hero, features, pricing, testimonials, contact form)."
      };
    case "mvp":
      return {
        label: "How many features do you need?",
        placeholder: "How many features in your MVP?",
        helpText: "A feature is a distinct capability (e.g., user authentication, payment processing, messaging, search) that adds functionality to your product."
      };
    case "automation":
      return {
        label: "What level of workflow complexity?",
        placeholder: "How complex is the automation needed?",
        helpText: "Complexity is based on the number of steps and integrations (1-3: ~5 hours, 4-6: ~10 hours, 7-10: ~20 hours, 10+: 40+ hours of work automated)."
      };
    case "coaching":
      return {
        label: "How many sessions do you need?",
        placeholder: "How many coaching sessions?",
        helpText: "Each coaching session lasts approximately 60 minutes."
      };
    default:
      return {
        label: "Project scope",
        placeholder: "How complex is your project?",
        helpText: "Select the option that best matches your project's scope."
      };
  };
};

export const getItemNameByServiceType = (serviceType: string) => {
  switch (serviceType) {
    case "coaching": return "sessions";
    case "landing": return "sections";
    case "automation": return "steps";
    default: return "features";
  }
};
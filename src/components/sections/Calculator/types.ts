export type ProjectDetails = {
  projectStage: string;
  serviceType: string;
  isNGO: boolean;
  featureCount: string;
  budget: string;
  email: string;
  phone: string;
};

export type StepProps = {
  projectDetails: ProjectDetails;
  setProjectDetails: (details: ProjectDetails) => void;
  estimatedBudget: number | null;
  onNext: () => void;
  onPrev: () => void;
};
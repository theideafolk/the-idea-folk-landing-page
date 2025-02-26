import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SciFiText } from "../animations/SciFiText";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProjectDetails = {
  projectStage: string;
  serviceType: string;
  isNGO: boolean;
  featureCount: string;
  budget: string;
  email: string;
  phone: string;
};

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
    let base = 0;
    
    // Return null if NGO/social cause is selected - we'll work with their budget
    if (projectDetails.isNGO) {
      return null;
    }
    
    // Base price by service type
    switch (projectDetails.serviceType) {
      case "landing":
        base = 499;
        break;
      case "mvp":
        base = 999;
        break;
      case "automation":
        base = 799;
        break;
      case "coaching":
        base = 40; // per hour
        break;
    }

    // Multiply based on feature count
    if (projectDetails.featureCount) {
      switch (projectDetails.featureCount) {
        case "1-3":
          base *= 1;
          break;
        case "4-6":
          base *= 1.5;
          break;
        case "7-10":
          base *= 2;
          break;
        case "10+":
          base *= 2.5;
          break;
      }
    }

    return base > 0 ? base : null;
  }, [projectDetails.serviceType, projectDetails.featureCount]);

  const handleSubmit = async () => {
    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      if (!webhookUrl) {
        console.error("Webhook URL not configured");
        return;
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...projectDetails,
          estimatedBudget,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

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
    switch (step) {
      case 1:
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

            {estimatedBudget !== null && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Estimated Starting Price:</div>
                <div className="text-2xl font-bold text-primary">
                  ${estimatedBudget.toLocaleString()}
                  {projectDetails.serviceType === "coaching" && "/hour"}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex w-full flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="w-full sm:w-32"
                  onClick={() => setStep(3)}
                  disabled
                >
                  <ArrowLeft className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">Prev</span>
                </Button>
                <Button
                  className="w-full sm:w-32"
                  onClick={() => setStep(2)}
                  disabled={!projectDetails.projectStage || !projectDetails.serviceType}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="h-4 w-4 sm:hidden" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 2:
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

            {estimatedBudget !== null ? (
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Estimated Starting Price:</div>
                <div className="text-2xl font-bold text-primary">
                  ${estimatedBudget.toLocaleString()}
                  {projectDetails.serviceType === "coaching" && "/hour"}
                </div>
              </div>
            ) : projectDetails.isNGO && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Social Impact Pricing</div>
                <div className="text-lg text-primary">
                  We'll work within your budget to support your cause
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex w-full flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="w-full sm:w-32"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">Prev</span>
                </Button>
                <Button
                  className="w-full sm:w-32"
                  onClick={() => setStep(3)}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="h-4 w-4 sm:hidden" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Where can we reach you?"
                className="text-white/50 placeholder:text-white/50"
                value={projectDetails.email}
                onChange={(e) =>
                  setProjectDetails({ ...projectDetails, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="Your phone number"
                className="text-white/50 placeholder:text-white/50"
                value={projectDetails.phone}
                onChange={(e) =>
                  setProjectDetails({ ...projectDetails, phone: e.target.value })
                }
              />
            </div>

            {estimatedBudget !== null ? (
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Estimated Starting Price:</div>
                <div className="text-2xl font-bold text-primary">
                  ${estimatedBudget.toLocaleString()}
                  {projectDetails.serviceType === "coaching" && "/hour"}
                </div>
              </div>
            ) : projectDetails.isNGO && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Social Impact Pricing</div>
                <div className="text-lg text-primary">
                  We'll work within your budget to support your cause
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex w-full flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="w-full sm:w-32"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">Prev</span>
                </Button>
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!projectDetails.email || !projectDetails.phone}
                >
                  Let's Build Something Amazing
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted/20 -translate-y-1/2" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-primary/50 -translate-y-1/2 transition-all duration-300"
            style={{ 
              width: `${((step - 1) / 2) * 100}%`,
            }}
          >
            <div className="absolute right-0 top-1/2 w-4 h-4 -translate-y-1/2 translate-x-full">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            </div>
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  i < step ? "bg-primary scale-100" :
                  i === step ? "bg-primary/20 scale-110" :
                  "bg-muted/20 scale-100"
                }`} 
              />
              <div 
                className={`absolute inset-0 rounded-full ${
                  i === step ? "animate-ping bg-primary/20" : ""
                }`}
              />
              <span className={`relative z-10 transition-colors duration-300 ${
                i < step ? "text-primary-foreground" :
                i === step ? "text-white" :
                "text-white/60"
              }`}>
                {i}
              </span>
            </div>
          ))}
        </div>
      </div>
      {renderStep()}
    </div>
  );
};

export default Calculator;
export { Calculator }
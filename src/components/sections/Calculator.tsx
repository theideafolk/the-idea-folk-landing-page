
import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
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
    featureCount: "",
    budget: "",
    email: "",
    phone: "",
  });

  const estimatedBudget = useMemo(() => {
    let base = 0;
    
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
                  <SelectValue placeholder="Select project stage" />
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
              <Label>What type of service are you looking for?</Label>
              <Select
                value={projectDetails.serviceType}
                onValueChange={(value) =>
                  setProjectDetails({ ...projectDetails, serviceType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landing">Landing Page</SelectItem>
                  <SelectItem value="mvp">MVP Development</SelectItem>
                  <SelectItem value="automation">Workflow Automation</SelectItem>
                  <SelectItem value="coaching">1:1 Coaching</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {estimatedBudget && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Estimated Starting Price:</div>
                <div className="text-2xl font-bold text-primary">
                  ${estimatedBudget.toLocaleString()}
                  {projectDetails.serviceType === "coaching" && "/hour"}
                </div>
              </div>
            )}

            <Button
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!projectDetails.projectStage || !projectDetails.serviceType}
            >
              Next
            </Button>
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
                  <SelectValue placeholder="Select feature count" />
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
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                  <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10000+">$10,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {estimatedBudget && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Estimated Starting Price:</div>
                <div className="text-2xl font-bold text-primary">
                  ${estimatedBudget.toLocaleString()}
                  {projectDetails.serviceType === "coaching" && "/hour"}
                </div>
              </div>
            )}

            <Button className="w-full" onClick={() => setStep(3)}>
              Next
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="your@email.com"
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
                placeholder="+1 (555) 000-0000"
                value={projectDetails.phone}
                onChange={(e) =>
                  setProjectDetails({ ...projectDetails, phone: e.target.value })
                }
              />
            </div>

            {estimatedBudget && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Estimated Starting Price:</div>
                <div className="text-2xl font-bold text-primary">
                  ${estimatedBudget.toLocaleString()}
                  {projectDetails.serviceType === "coaching" && "/hour"}
                </div>
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!projectDetails.email || !projectDetails.phone}
            >
              Let's Build Something Amazing
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <SciFiText text="Project Calculator" />
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Answer a few quick questions to get an estimated project scope and cost.
        </p>
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === i
                        ? "relative"
                        : "relative"
                    }`}
                  >
                    <div className={`absolute inset-0 rounded-full ${
                      step === i ? "bg-primary/20" : "bg-muted/20"
                    }`} />
                    <span className={`relative z-10 ${
                      step === i ? "text-white" : "text-white/60"
                    }`}>
                    {i}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {renderStep()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;

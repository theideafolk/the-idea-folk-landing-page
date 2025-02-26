import { useState } from "react";
import { SciFiText } from "../animations/SciFiText";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InquiryDetails = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
};

const InquiryForm = () => {
  const [inquiryDetails, setInquiryDetails] = useState<InquiryDetails>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
  });

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
        body: JSON.stringify(inquiryDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setInquiryDetails({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section id="inquiry" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <SciFiText text="Let's Build Something Amazing" />
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>

          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input
                  placeholder="What should we call you?"
                  value={inquiryDetails.name}
                  onChange={(e) =>
                    setInquiryDetails({ ...inquiryDetails, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Where can we reach you?"
                  value={inquiryDetails.email}
                  onChange={(e) =>
                    setInquiryDetails({ ...inquiryDetails, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  value={inquiryDetails.phone}
                  onChange={(e) =>
                    setInquiryDetails({ ...inquiryDetails, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Project Type</Label>
                <Select
                  value={inquiryDetails.projectType}
                  onValueChange={(value) =>
                    setInquiryDetails({ ...inquiryDetails, projectType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="What type of project do you have?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="mvp">MVP Development</SelectItem>
                    <SelectItem value="automation">Workflow Automation</SelectItem>
                    <SelectItem value="coaching">1:1 Coaching</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Project Description</Label>
                <Textarea
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="min-h-[120px]"
                  value={inquiryDetails.description}
                  onChange={(e) =>
                    setInquiryDetails({ ...inquiryDetails, description: e.target.value })
                  }
                />
              </div>

              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={
                  !inquiryDetails.name ||
                  !inquiryDetails.email ||
                  !inquiryDetails.phone ||
                  !inquiryDetails.projectType ||
                  !inquiryDetails.description
                }
              >
                Let's Start Building
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
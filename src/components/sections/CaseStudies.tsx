
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import ProjectPreviewDialog from "./ProjectPreviewDialog";

interface Project {
  title: string;
  description: string;
  url: string;
  category: "landing" | "template" | "mvp";
}

const CaseStudyCard = ({ 
  title, 
  description,
  onClick
}: {
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <div 
      className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
          {title}
          <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | Project["category"]>("all");

  const projects: Project[] = [
    // Landing Pages
    {
      title: "WiseTutor",
      description: "A modern landing page for an innovative tutoring platform.",
      url: "https://wisetutor.in/",
      category: "landing"
    },
    {
      title: "DirectShelf",
      description: "E-commerce landing page with direct-to-consumer focus.",
      url: "http://directshelf.in/",
      category: "landing"
    },
    {
      title: "Beaconhouse Admissions",
      description: "Educational institution admissions portal.",
      url: "https://admissions.beaconhouse.in",
      category: "landing"
    },
    {
      title: "Beaconhouse Events",
      description: "Event management platform for educational institution.",
      url: "https://events.beaconhouse.in",
      category: "landing"
    },
    {
      title: "Beaconhouse Applications",
      description: "Application management system for students.",
      url: "https://apply.beaconhouse.in",
      category: "landing"
    },
    // Templates
    {
      title: "Biom Landing Page",
      description: "Modern, eco-friendly product showcase template.",
      url: "https://biom-test-landing-page.netlify.app/",
      category: "template"
    },
    {
      title: "E-commerce Boilerplate",
      description: "Ready-to-use e-commerce template with modern features.",
      url: "https://e-commerce-boilerplate-theideafolk.netlify.app",
      category: "template"
    },
    {
      title: "Luxury Travel Concierge",
      description: "High-end travel service template with booking features.",
      url: "https://luxury-travel-concierge-template.netlify.app",
      category: "template"
    },
    {
      title: "Interactive Product Page",
      description: "Dynamic product showcase template with interactive elements.",
      url: "https://interactive-product-page-template.netlify.app/",
      category: "template"
    },
    // MVPs
    {
      title: "Sports Apparel MVP",
      description: "Fully functional MVP for sports apparel e-commerce.",
      url: "https://sports-apparel-mvp.netlify.app/",
      category: "mvp"
    },
    {
      title: "SmartNotes",
      description: "Intelligent note-taking platform (Work in Progress).",
      url: "https://www.smartnotes.pro",
      category: "mvp"
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="cases" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Our Work
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Explore our portfolio of successful projects across various industries.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          {["all", "landing", "template", "mvp"].map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category as typeof activeCategory)}
              className="capitalize"
            >
              {category === "all" ? "All Projects" : `${category}s`}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project, index) => (
            <CaseStudyCard
              key={index}
              title={project.title}
              description={project.description}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectPreviewDialog
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default CaseStudies;

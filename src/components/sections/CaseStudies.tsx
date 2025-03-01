
import { useState } from "react";
import { Button } from "../ui/button";
import ProjectPreviewDialog from "./ProjectPreviewDialog";
import { SciFiText } from "../animations/SciFiText";
import { cn } from "@/lib/utils";
import { CaseStudyCard } from "./CaseStudies/CaseStudyCard";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  url: string;
  previewUrl?: string;
  category: "landing" | "template" | "mvp" | "in-progress";
}

const CaseStudies = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | Project["category"]>("all");
  const [showAll, setShowAll] = useState(false);

  // Function to determine how many projects to show based on screen size
  const getInitialProjectCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 6; // lg screens
      if (window.innerWidth >= 768) return 4; // md screens
      return 3; // sm screens
    }
    return 6; // default
  };

  const projects: Project[] = [
    // Landing Pages
    {
      title: "WiseTutor",
      description: "A modern landing page for an innovative tutoring platform.",
      url: "https://wisetutor.in",
      previewUrl: "https://wisetutor.in",
      category: "landing"
    },
    {
      title: "DirectShelf",
      description: "E-commerce landing page with direct-to-consumer focus.",
      url: "https://direct-shelf.netlify.app",
      previewUrl: "https://direct-shelf.netlify.app",
      category: "landing"
    },
    {
      title: "Edtech Admissions",
      description: "Educational institution admissions portal.",
      url: "https://admissions.beaconhouse.in",
      previewUrl: "https://admissions.beaconhouse.in",
      category: "landing"
    },
    {
      title: "Edtech Events",
      description: "Event management platform for educational institution.",
      url: "https://events.beaconhouse.in",
      previewUrl: "https://events.beaconhouse.in",
      category: "landing"
    },
    {
      title: "Edtech Applications",
      description: "Application management system for students.",
      url: "https://apply.beaconhouse.in",
      previewUrl: "https://apply.beaconhouse.in",
      category: "landing"
    },
    // Templates
    {
      title: "Biom Landing Page",
      description: "Modern, eco-friendly product showcase template.",
      url: "https://biom-test-landing-page.netlify.app",
      previewUrl: "https://biom-test-landing-page.netlify.app",
      category: "template"
    },
    {
      title: "E-commerce Boilerplate",
      description: "Ready-to-use e-commerce template with modern features.",
      url: "https://e-commerce-boilerplate-theideafolk.netlify.app",
      previewUrl: "https://e-commerce-boilerplate-theideafolk.netlify.app",
      category: "template"
    },
    {
      title: "Luxury Travel Concierge",
      description: "High-end travel service template with booking features.",
      url: "https://luxury-travel-concierge-template.netlify.app",
      previewUrl: "https://luxury-travel-concierge-template.netlify.app",
      category: "template"
    },
    {
      title: "Interactive Product Page",
      description: "Dynamic product showcase template with interactive elements.",
      url: "https://interactive-product-page-template.netlify.app",
      previewUrl: "https://interactive-product-page-template.netlify.app",
      category: "template"
    },
    // MVPs
    {
      title: "Sports Apparel MVP",
      description: "Fully functional MVP for sports apparel e-commerce.",
      url: "https://sports-apparel-mvp.netlify.app",
      previewUrl: "https://sports-apparel-mvp.netlify.app",
      category: "mvp"
    },
    {
      title: "SmartNotes",
      description: "Intelligent note-taking platform (Work in Progress).",
      url: "https://smartnotes.pro",
      previewUrl: "https://smartnotes.pro",
      category: "in-progress"
    },
    {
      title: "School CRM Software",
      description: "Comprehensive school management system with advanced CRM features.",
      url: "https://school-crm-theideafolk.netlify.app",
      previewUrl: "https://school-crm-theideafolk.netlify.app",
      category: "in-progress"
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const visibleProjects = showAll 
    ? filteredProjects 
    : filteredProjects.slice(0, getInitialProjectCount());

  return (
    <section id="cases" className="py-16 bg-gradient-to-b from-white/90 via-white/95 to-white/90 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SciFiText text="Our Work" />
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-center max-w-2xl mx-auto mb-8 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Explore our portfolio of successful projects across various industries.
        </motion.p>

        <motion.div 
          className="flex justify-start md:justify-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-4 px-4 md:px-0 -mx-4 md:mx-0 no-scrollbar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {["all", "landing", "template", "mvp", "in-progress"].map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category as typeof activeCategory)}
              className={cn(
                "capitalize whitespace-nowrap",
                "h-12 px-6 text-base font-medium",
                "md:h-10 md:px-4 md:text-sm",
                "flex-shrink-0"
              )}
            >
              {category === "all" ? "All Projects" : 
               category === "mvp" ? "MVPs" : 
               category === "in-progress" ? "In Progress" :
               `${category}s`}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleProjects.map((project, index) => (
            <CaseStudyCard
              key={index}
              title={project.title}
              description={project.description}
              previewUrl={project.previewUrl}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
        
        {filteredProjects.length > getInitialProjectCount() && (
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="min-w-[200px]"
            >
              {showAll ? "Show Less" : `View All (${filteredProjects.length})`}
            </Button>
          </motion.div>
        )}
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

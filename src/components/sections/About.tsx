import React, { useState } from "react";
import { Linkedin } from "lucide-react";
import { SciFiText } from "../animations/SciFiText";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const About = () => {
  const [activeTab, setActiveTab] = useState("team");
  const isMobile = useIsMobile();
  
  const teamMembers = [
    {
      name: "Krishna",
      title: "AI Strategy & Product Leadership",
      photo: "/team/kg.jpeg",
      highlight: "Educator turned product leader",
      key1: "Scaled EdTech products across 6 countries",
      key2: "Led global math product launches at BYJU'S",
      key3: "Grew teams from 45 to 300+ members",
      key4: "Experienced in content, strategy, and operations",
      linkedin: "https://www.linkedin.com/in/krishna-goutham/"
    },
    {
      name: "Venkatesh Golisetti",
      title: "Client Relations & Financial Strategy",
      photo: "/team/venky.jpeg",
      highlight: "Business translator and financial strategist",
      key1: "Managed and scaled 200+ member production team",
      key2: "Bridges the gap between tech and business needs",
      key3: "Client relationship specialist and finances",
      linkedin: "https://www.linkedin.com/in/venkatesh-golisetti/"
    }
  ];
  
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-white/90 via-white/95 to-white/90 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SciFiText text="Meet The Team" />
        </motion.h2>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <Button
              onClick={() => setActiveTab("team")}
              variant={activeTab === "team" ? "default" : "outline"}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg`}
            >
              Our Team
            </Button>
            <Button
              onClick={() => setActiveTab("mission")}
              variant={activeTab === "mission" ? "default" : "outline"}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg`}
            >
              Our Mission
            </Button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {activeTab === "team" && (
            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image section - 50% on desktop, full width on mobile */}
                    <div className="w-full sm:w-1/2 bg-gradient-to-br from-white/10 to-primary/5">
                      {/* Full height image container */}
                      <div className="w-full h-full">
                        <img 
                          src={member.photo} 
                          alt={member.name}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Content section - 50% on desktop, full width on mobile */}
                    <div className="w-full sm:w-1/2 p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                          <p className="text-primary text-sm">{member.title}</p>
                        </div>
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                          aria-label={`${member.name}'s LinkedIn profile`}
                        >
                          <Linkedin size={20} />
                        </a>
                      </div>
                      
                      <div className="mt-3">
                        <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mb-2">
                          {member.highlight}
                        </span>
                        <ul className="text-sm space-y-1 mt-2 text-foreground/80">
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {member.key1}
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {member.key2}
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {member.key3}
                          </li>
                          {member.key4 && (
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {member.key4}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {activeTab === "mission" && (
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-3 text-foreground">Our Mission</h3>
              <p className="mb-6 text-foreground/80">
                We empower small businesses and non-technical entrepreneurs to validate ideas, build solutions, and reach their goals faster.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-primary/5 p-4 rounded-lg text-center shadow-sm border border-primary/10">
                  <h4 className="font-medium text-primary text-sm mb-2">Validate</h4>
                  <p className="text-sm text-foreground/70">Test ideas with minimal investment</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg text-center shadow-sm border border-primary/10">
                  <h4 className="font-medium text-primary text-sm mb-2">Build</h4>
                  <p className="text-sm text-foreground/70">Transform concepts into reality</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg text-center shadow-sm border border-primary/10">
                  <h4 className="font-medium text-primary text-sm mb-2">Launch</h4>
                  <p className="text-sm text-foreground/70">Get to market with confidence</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
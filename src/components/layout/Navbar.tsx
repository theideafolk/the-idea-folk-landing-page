import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { ProjectInquiryModal } from "../sections/ProjectInquiryModal";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inquiryModal, setInquiryModal] = useState({
    open: false,
    mode: "project" as "estimate" | "project"
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Always solid background on mobile/tablet, or when scrolled on any device
  const shouldShowBackground = isMobile || isScrolled;

  const handleOpenModal = (mode: "estimate" | "project") => {
    setInquiryModal({ open: true, mode });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowBackground 
          ? "backdrop-blur-xl bg-background/80 border-b border-border/30 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-14 xs:h-16 md:h-20">
          <a href="/" className="relative h-12 w-48">
            <img 
              src="/the-idea-folk-logo.png" 
              alt="The Idea Folk" 
              className="h-full w-full object-contain"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#process" className="text-foreground hover:text-primary transition-colors">
              Process
            </a>
            <a href="#cases" className="text-foreground hover:text-primary transition-colors">
              Case Studies
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            {shouldShowBackground && (
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal("estimate")}
                  className="text-sm"
                >
                  Get Estimate
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleOpenModal("project")}
                >
                  Start Building
                </Button>
              </div>
            )}
          </div>

          {/* Project Inquiry Modal */}
          <ProjectInquiryModal
            open={inquiryModal.open}
            onOpenChange={(open) => setInquiryModal({ ...inquiryModal, open })}
            initialMode={inquiryModal.mode}
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Blurred overlay */}
            <div className="fixed inset-0 top-16 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)} />
            
            {/* Menu content */}
            <div className="md:hidden absolute top-16 left-0 right-0 z-50 p-4">
              <div className="flex flex-col space-y-4 bg-background p-6 rounded-lg border border-border shadow-2xl">
                <a
                  href="#services"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#process"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Process
                </a>
                <a
                  href="#cases"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Case Studies
                </a>
                <a
                  href="#about"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                {shouldShowBackground && (
                  <div className="flex flex-col gap-4 pt-4">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        handleOpenModal("estimate");
                        setIsMenuOpen(false);
                      }}
                      className="opacity-80 hover:opacity-100"
                    >
                      Get Estimate
                    </Button>
                    <Button 
                      onClick={() => {
                        handleOpenModal("project");
                        setIsMenuOpen(false);
                      }}
                    >
                      Start Building
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
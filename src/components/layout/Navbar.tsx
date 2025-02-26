import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { CalculatorModal } from "../sections/CalculatorModal"; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "backdrop-blur-xl bg-background/30 border-b border-white/5 shadow-lg safe-area-padding" 
          : "bg-transparent safe-area-padding"
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
            {isScrolled && (
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCalculatorOpen(true)}
                  className="text-sm"
                >
                  Calculate Cost
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    const inquirySection = document.getElementById("inquiry");
                    inquirySection?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start Building
                </Button>
              </div>
            )}
          </div>

          {/* Calculator Modal */}
          <CalculatorModal
            open={isCalculatorOpen}
            onOpenChange={setIsCalculatorOpen}
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
          <div className="md:hidden backdrop-blur-xl bg-background/30 border-b border-white/5 absolute top-16 left-0 right-0 p-4">
            <div className="flex flex-col space-y-4 safe-area-padding">
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
              {isScrolled && (
                <div className="flex flex-col gap-4 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsCalculatorOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="opacity-80 hover:opacity-100"
                  >
                    Calculate Cost
                  </Button>
                  <Button 
                    onClick={() => {
                      const inquirySection = document.getElementById("inquiry");
                      inquirySection?.scrollIntoView({ behavior: "smooth" });
                      setIsMenuOpen(false);
                    }}
                  >
                    Start Building
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
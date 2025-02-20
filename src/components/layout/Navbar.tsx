
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        isScrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-semibold">
            The Idea Folk
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="hover:text-primary transition-colors">
              Services
            </a>
            <a href="#process" className="hover:text-primary transition-colors">
              Process
            </a>
            <a href="#cases" className="hover:text-primary transition-colors">
              Case Studies
            </a>
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            {isScrolled && (
              <Button 
                onClick={() => {
                  const calculatorSection = document.getElementById("calculator");
                  calculatorSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass absolute top-16 left-0 right-0 p-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#services"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#process"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Process
              </a>
              <a
                href="#cases"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Case Studies
              </a>
              <a
                href="#about"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              {isScrolled && (
                <Button 
                  className="w-full"
                  onClick={() => {
                    const calculatorSection = document.getElementById("calculator");
                    calculatorSection?.scrollIntoView({ behavior: "smooth" });
                    setIsMenuOpen(false);
                  }}
                >
                  Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

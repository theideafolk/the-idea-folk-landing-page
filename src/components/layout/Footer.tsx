
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="relative py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="relative block h-12 w-48 mb-4">
              <img 
                src="/logo-transparent.png" 
                alt="The Idea Folk" 
                className="h-full w-full object-contain"
              />
            </a>
            <p className="text-muted-foreground mb-4">
              Your on-demand product team that builds and scales digital solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#process" className="text-muted-foreground hover:text-primary transition-colors">
                  Process
                </a>
              </li>
              <li>
                <a href="#cases" className="text-muted-foreground hover:text-primary transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-primary">Contact</h4>
            <Button variant="default" size="lg" className="w-full">
              Get in Touch
            </Button>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Idea Folk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

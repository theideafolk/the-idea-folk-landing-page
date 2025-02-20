
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"; 
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ProjectPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    url: string;
  } | null;
}

const ProjectPreviewDialog = ({ isOpen, onClose, project }: ProjectPreviewDialogProps) => {
  const [isLoading, setIsLoading] = useState(true);
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh]">
        <DialogTitle className="sr-only">
          {project.title} Preview
        </DialogTitle>
        <div className="relative flex-1 w-full h-full min-h-[60vh] bg-muted/50 rounded-md overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading {project.title}...</p>
              </div>
            </div>
          )}
          <iframe
            src={project.url}
            className="w-full h-full rounded-md"
            title={project.title}
            onLoad={() => setIsLoading(false)}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPreviewDialog;

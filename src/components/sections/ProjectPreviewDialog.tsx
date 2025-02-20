
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    url: string;
  } | null;
}

const ProjectPreviewDialog = ({ isOpen, onClose, project }: ProjectPreviewDialogProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full h-full min-h-[60vh]">
          <iframe
            src={project.url}
            className="w-full h-full rounded-md"
            title={project.title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPreviewDialog;

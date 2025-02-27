import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ButtonEffect = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden rounded-md", className)}>
      <motion.div
        className="absolute inset-0 bg-primary/10"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent animate-shimmer" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
      </motion.div>
    </div>
  );
};
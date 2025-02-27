import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calculator } from "./Calculator/index";

interface CalculatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CalculatorModal = ({ open, onOpenChange }: CalculatorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
<<<<<<< Updated upstream
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Project Cost Calculator
=======
      <DialogContent className="max-w-lg bg-white/95 backdrop-blur-xl border border-primary/20 overflow-visible p-6 shadow-[0_10px_40px_-5px_rgba(var(--primary-rgb),0.25)]">
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-lg pointer-events-none border border-white/50" />
        
        {/* Inner glow and subtle patterns */}
        <div className="absolute inset-[1px] rounded-lg overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.15),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary-rgb),0.15),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        </div>
        
        {/* Edge highlights */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/90 rounded-t-lg pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/10 rounded-b-lg pointer-events-none" />
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-2xl font-bold text-center mb-6 text-foreground">
            Project Cost Estimate
>>>>>>> Stashed changes
          </DialogTitle>
        </DialogHeader>
        <Calculator />
      </DialogContent>
    </Dialog>
  );
};
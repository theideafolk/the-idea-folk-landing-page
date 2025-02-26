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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Project Cost Calculator
          </DialogTitle>
        </DialogHeader>
        <Calculator />
      </DialogContent>
    </Dialog>
  );
};
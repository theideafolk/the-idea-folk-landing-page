import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ButtonEffect } from "@/components/animations/ButtonEffect"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-white border border-primary/10 hover:bg-primary/90 relative overflow-hidden backdrop-blur-sm premium-blue-shadow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-white/70 border border-border hover:border-primary text-foreground hover:bg-primary/5 relative overflow-hidden backdrop-blur-sm premium-shadow",
        secondary:
          "bg-white/70 border border-primary/20 text-foreground hover:border-primary/40 relative overflow-hidden premium-shadow",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent animate-shimmer" />
        <div className="absolute inset-0 shadow-inner" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/30 via-white/50 to-white/30" />
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20" />
        <ButtonEffect />
        <span className="relative z-10 font-medium">{props.children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
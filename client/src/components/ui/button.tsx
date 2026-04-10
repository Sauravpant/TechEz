import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variant === "default" && "bg-primary text-primary-foreground hover:opacity-90",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:opacity-90",
          variant === "outline" && "border border-border bg-background hover:bg-muted",
          variant === "ghost" && "hover:bg-muted",
          variant === "destructive" && "bg-destructive text-white hover:opacity-90",
          size === "sm" && "h-8 px-3",
          size === "md" && "h-10 px-4",
          size === "lg" && "h-11 px-6",
          size === "icon" && "h-10 w-10",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";


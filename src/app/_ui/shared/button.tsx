import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background select-none gap-1",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground active:outline-none hover:bg-primary/90 active:scale-95 transition-all duration-100",
        destructive:
          "bg-red-700 dark:bg-red-900 text-destructive-foreground hover:bg-red-700/90 dark:hover:bg-red-900/90 active:scale-95 transition-all duration-100",
        outline:
          "border border-neutral-300 hover:bg-accent hover:text-accent-foreground active:scale-95 transition-all duration-100",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95 transition-all duration-100",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        optional:
          "border border-gray-300 rounded-lg py-0.5 active:scale-95 transition-all duration-100",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

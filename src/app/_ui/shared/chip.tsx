import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";
import { cn } from "~/lib/cn";

const chipVariants = cva("rounded-full border text-xs", {
  variants: {
    variant: {
      default: "border-indigo-500 bg-indigo-50 text-indigo-600",
      secondary: "border-gray-300 bg-gray-100 text-gray-600",
    },
    size: {
      default: "px-3 py-0.5",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export type ChipProps = VariantProps<typeof chipVariants> & {
  children: ReactNode;
  className?: string;
};

export const Chip = ({ children, variant, size, className }: ChipProps) => {
  return <span className={cn(chipVariants({ variant, size, className }))}>{children}</span>;
};

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 select-none justify-center whitespace-nowrap text-sm font-medium transition-[color,box-shadow] focus-visible:outline-none focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs cursor-pointer rounded-lg",
        primary: "bg-blue-600 font-semibold text-primary-foreground cursor-pointer rounded-full",
        black:
          "bg-black text-white shadow-xs hover:bg-neutral-900 rounded-lg cursor-pointer",
        gray: "bg-primary grayshadow text-primary-foreground shadow-xs cursor-pointer rounded-lg",
        secondary:
          "bg-[#EEF0F3] text-[#0A0B0D] font-semibold cursor-pointer rounded-full",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground cursor-pointer",
        ghost: "hover:bg-accent hover:text-accent-foreground cursor-pointer",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer",
        minor: "py-1.5 px-4 text-md has-[>svg]:px-3 cursor-pointer",
        sm: "max-sm:text-sm py-1.5 max-sm:px-3 px-5 text-lg has-[>svg]:px-4 cursor-pointer",
        lg: "max-sm:text-sm py-2.5 px-6 text-lg has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...(props as any)}
      />
    );
  }

  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

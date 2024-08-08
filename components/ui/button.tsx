import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "mpg-inline-flex mpg-items-center mpg-justify-center mpg-whitespace-nowrap mpg-rounded-md mpg-text-sm mpg-font-medium mpg-ring-offset-background mpg-transition-colors focus-visible:mpg-outline-none focus-visible:mpg-ring-2 focus-visible:mpg-ring-ring focus-visible:mpg-ring-offset-2 disabled:mpg-pointer-events-none disabled:mpg-opacity-50",
  {
    variants: {
      variant: {
        default: "mpg-bg-primary mpg-text-primary-foreground hover:mpg-bg-primary/90",
        destructive:
          "mpg-bg-destructive mpg-text-destructive-foreground hover:mpg-bg-destructive/90",
        outline:
          "mpg-border mpg-border-input mpg-bg-background hover:mpg-bg-accent hover:mpg-text-accent-foreground",
        secondary:
          "mpg-bg-secondary mpg-text-secondary-foreground hover:mpg-bg-secondary/80",
        ghost: "hover:mpg-bg-accent hover:mpg-text-accent-foreground",
        link: "mpg-text-primary mpg-underline-offset-4 hover:mpg-underline",
        'CNodeSticker-tool': "mpg-bg-transparent hover:mpg-bg-CNodeSticker-tool-hover",
        TimeTravel: "mpg-bg-transparent hover:mpg-bg-TimeTravel-hover",
      },
      size: {
        default: "mpg-h-10 mpg-px-4 mpg-py-2",
        sm: "mpg-h-9 mpg-rounded-md mpg-px-3",
        lg: "mpg-h-11 mpg-rounded-md mpg-px-8",
        icon: "mpg-h-10 mpg-w-10",
        'CNodeSticker-tool': "mpg-h-[32px] mpg-w-[32px] mpg-mr-[8px] last:mpg-mr-0 mpg-flex mpg-justify-center mpg-items-center",
        TimeTravel: "mpg-w-[50px] mpg-h-[50px] mpg-mr-[4px] mpg-text-center",
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
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

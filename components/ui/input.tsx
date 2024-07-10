import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "mpg-flex mpg-h-10 mpg-w-full mpg-rounded-md mpg-border mpg-border-input mpg-bg-background mpg-px-3 mpg-py-2 mpg-text-sm mpg-ring-offset-background file:mpg-border-0 file:mpg-bg-transparent file:mpg-text-sm file:mpg-font-medium placeholder:mpg-text-muted-foreground focus-visible:mpg-outline-none focus-visible:mpg-ring-2 focus-visible:mpg-ring-ring focus-visible:mpg-ring-offset-2 disabled:mpg-cursor-not-allowed disabled:mpg-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

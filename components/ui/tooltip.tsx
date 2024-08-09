import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "mpg-z-50 mpg-overflow-hidden mpg-rounded-md mpg-border mpg-bg-popover mpg-px-3 mpg-py-1.5 mpg-text-sm mpg-text-popover-foreground mpg-shadow-md mpg-animate-in mpg-fade-in-0 mpg-zoom-in-95 data-[state=closed]:mpg-animate-out data-[state=closed]:mpg-fade-out-0 data-[state=closed]:mpg-zoom-out-95 data-[side=bottom]:mpg-slide-in-from-top-2 data-[side=left]:mpg-slide-in-from-right-2 data-[side=right]:mpg-slide-in-from-left-2 data-[side=top]:mpg-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

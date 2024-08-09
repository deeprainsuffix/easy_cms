import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("mpg-border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="mpg-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "mpg-flex mpg-flex-1 mpg-items-center mpg-justify-between mpg-py-4 mpg-font-medium mpg-transition-all hover:mpg-underline [&[data-state=open]>svg]:mpg-rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="mpg-h-4 mpg-w-4 mpg-shrink-0 mpg-transition-transform mpg-duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="mpg-overflow-hidden mpg-text-sm mpg-transition-all data-[state=closed]:mpg-animate-accordion-up data-[state=open]:mpg-animate-accordion-down last:mpg-mb-2"
    {...props}
  >
    <div className={cn("mpg-pb-2 mpg-pt-2", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

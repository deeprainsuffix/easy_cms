import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "mpg-inline-flex mpg-h-10 mpg-items-center mpg-justify-center mpg-rounded-md mpg-bg-muted mpg-p-1 mpg-text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "mpg-inline-flex mpg-items-center mpg-justify-center mpg-whitespace-nowrap mpg-rounded-sm mpg-px-3 mpg-py-1.5 mpg-text-sm mpg-font-medium mpg-ring-offset-background mpg-transition-all focus-visible:mpg-outline-none focus-visible:mpg-ring-2 focus-visible:mpg-ring-ring focus-visible:mpg-ring-offset-2 disabled:mpg-pointer-events-none disabled:mpg-opacity-50 data-[state=active]:mpg-bg-background data-[state=active]:mpg-text-foreground data-[state=active]:mpg-shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mpg-mt-2 mpg-ring-offset-background focus-visible:mpg-outline-none focus-visible:mpg-ring-2 focus-visible:mpg-ring-ring focus-visible:mpg-ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

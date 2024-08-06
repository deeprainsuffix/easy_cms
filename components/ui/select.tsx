import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "mpg-flex mpg-h-10 mpg-w-full mpg-items-center mpg-justify-between mpg-rounded-md mpg-border mpg-border-input mpg-bg-background mpg-px-3 mpg-py-2 mpg-text-sm mpg-ring-offset-background placeholder:mpg-text-muted-foreground focus:mpg-outline-none focus:mpg-ring-2 focus:mpg-ring-ring focus:mpg-ring-offset-2 disabled:mpg-cursor-not-allowed disabled:mpg-opacity-50 [&>span]:mpg-line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="mpg-h-4 mpg-w-4 mpg-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "mpg-flex mpg-cursor-default mpg-items-center mpg-justify-center mpg-py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="mpg-h-4 mpg-w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "mpg-flex mpg-cursor-default mpg-items-center mpg-justify-center mpg-py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="mpg-h-4 mpg-w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "mpg-relative mpg-z-50 mpg-max-h-96 mpg-min-w-[8rem] mpg-overflow-hidden mpg-rounded-md mpg-border mpg-bg-popover mpg-text-popover-foreground mpg-shadow-md data-[state=open]:mpg-animate-in data-[state=closed]:mpg-animate-out data-[state=closed]:mpg-fade-out-0 data-[state=open]:mpg-fade-in-0 data-[state=closed]:mpg-zoom-out-95 data-[state=open]:mpg-zoom-in-95 data-[side=bottom]:mpg-slide-in-from-top-2 data-[side=left]:mpg-slide-in-from-right-2 data-[side=right]:mpg-slide-in-from-left-2 data-[side=top]:mpg-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:mpg-translate-y-1 data-[side=left]:mpg--translate-x-1 data-[side=right]:mpg-translate-x-1 data-[side=top]:mpg--translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "mpg-p-1",
          position === "popper" &&
            "mpg-h-[var(--radix-select-trigger-height)] mpg-w-full mpg-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("mpg-py-1.5 mpg-pl-8 mpg-pr-2 mpg-text-sm mpg-font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "mpg-relative mpg-flex mpg-w-full mpg-cursor-default mpg-select-none mpg-items-center mpg-rounded-sm mpg-py-1.5 mpg-pl-8 mpg-pr-2 mpg-text-sm mpg-outline-none focus:mpg-bg-accent focus:mpg-text-accent-foreground data-[disabled]:mpg-pointer-events-none data-[disabled]:mpg-opacity-50",
      className
    )}
    {...props}
  >
    <span className="mpg-absolute mpg-left-2 mpg-flex mpg-h-3.5 mpg-w-3.5 mpg-items-center mpg-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="mpg-h-4 mpg-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("mpg--mx-1 mpg-my-1 mpg-h-px mpg-bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

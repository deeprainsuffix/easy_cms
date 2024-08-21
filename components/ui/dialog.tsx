import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "mpg-fixed mpg-inset-0 mpg-z-50 mpg-bg-black/80 mpg- data-[state=open]:mpg-animate-in data-[state=closed]:mpg-animate-out data-[state=closed]:mpg-fade-out-0 data-[state=open]:mpg-fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName


interface I_custom extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  onClose?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  I_custom
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "mpg-fixed mpg-left-[50%] mpg-top-[50%] mpg-z-50 mpg-grid mpg-w-full mpg-max-w-lg mpg-translate-x-[-50%] mpg-translate-y-[-50%] mpg-gap-4 mpg-border mpg-bg-background mpg-p-6 mpg-shadow-lg mpg-duration-200 data-[state=open]:mpg-animate-in data-[state=closed]:mpg-animate-out data-[state=closed]:mpg-fade-out-0 data-[state=open]:mpg-fade-in-0 data-[state=closed]:mpg-zoom-out-95 data-[state=open]:mpg-zoom-in-95 data-[state=closed]:mpg-slide-out-to-left-1/2 data-[state=closed]:mpg-slide-out-to-top-[48%] data-[state=open]:mpg-slide-in-from-left-1/2 data-[state=open]:mpg-slide-in-from-top-[48%] sm:mpg-rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close onClick={props.onClose} className="mpg-absolute mpg-right-4 mpg-top-4 mpg-rounded-sm mpg-opacity-70 mpg-ring-offset-background mpg-transition-opacity hover:mpg-opacity-100 focus:mpg-outline-none focus:mpg-ring-2 focus:mpg-ring-ring focus:mpg-ring-offset-2 disabled:mpg-pointer-events-none data-[state=open]:mpg-bg-accent data-[state=open]:mpg-text-muted-foreground">
        <X className="mpg-h-4 mpg-w-4" />
        <span className="mpg-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mpg-flex mpg-flex-col mpg-space-y-1.5 mpg-text-center sm:mpg-text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mpg-flex mpg-flex-col-reverse sm:mpg-flex-row sm:mpg-justify-end sm:mpg-space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "mpg-text-lg mpg-font-semibold mpg-leading-none mpg-tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("mpg-text-sm mpg-text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

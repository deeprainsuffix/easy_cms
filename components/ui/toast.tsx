import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "mpg-fixed mpg-top-0 mpg-z-[100] mpg-flex mpg-max-h-screen mpg-w-full mpg-flex-col-reverse mpg-p-4 sm:mpg-bottom-0 sm:mpg-right-0 sm:mpg-top-auto sm:mpg-flex-col md:mpg-max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "mpg-group mpg-pointer-events-auto mpg-relative mpg-flex mpg-w-full mpg-items-center mpg-justify-between mpg-space-x-4 mpg-overflow-hidden mpg-rounded-md mpg-border mpg-p-6 mpg-pr-8 mpg-shadow-lg mpg-transition-all data-[swipe=cancel]:mpg-translate-x-0 data-[swipe=end]:mpg-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:mpg-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:mpg-transition-none data-[state=open]:mpg-animate-in data-[state=closed]:mpg-animate-out data-[swipe=end]:mpg-animate-out data-[state=closed]:mpg-fade-out-80 data-[state=closed]:mpg-slide-out-to-right-full data-[state=open]:mpg-slide-in-from-top-full data-[state=open]:sm:mpg-slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "mpg-border mpg-bg-background mpg-text-foreground",
        destructive:
          "mpg-destructive mpg-group mpg-border-destructive mpg-bg-destructive mpg-text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "mpg-inline-flex mpg-h-8 mpg-shrink-0 mpg-items-center mpg-justify-center mpg-rounded-md mpg-border mpg-bg-transparent mpg-px-3 mpg-text-sm mpg-font-medium mpg-ring-offset-background mpg-transition-colors hover:mpg-bg-secondary focus:mpg-outline-none focus:mpg-ring-2 focus:mpg-ring-ring focus:mpg-ring-offset-2 disabled:mpg-pointer-events-none disabled:mpg-opacity-50 group-[.destructive]:mpg-border-muted/40 group-[.destructive]:hover:mpg-border-destructive/30 group-[.destructive]:hover:mpg-bg-destructive group-[.destructive]:hover:mpg-text-destructive-foreground group-[.destructive]:focus:mpg-ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "mpg-absolute mpg-right-2 mpg-top-2 mpg-rounded-md mpg-p-1 mpg-text-foreground/50 mpg-opacity-0 mpg-transition-opacity hover:mpg-text-foreground focus:mpg-opacity-100 focus:mpg-outline-none focus:mpg-ring-2 group-hover:mpg-opacity-100 group-[.destructive]:mpg-text-red-300 group-[.destructive]:hover:mpg-text-red-50 group-[.destructive]:focus:mpg-ring-red-400 group-[.destructive]:focus:mpg-ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="mpg-h-4 mpg-w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("mpg-text-sm mpg-font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("mpg-text-sm mpg-opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted", className)}
      ref={ref}
      {...props}
    />
  )
})
Avatar.displayName = "Avatar"

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {}

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(({ className, ...props }, ref) => {
  return (
    <span
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

export const AvatarInitials = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(({ className, ...props }, ref) => {
  return (
    <span
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
AvatarInitials.displayName = "AvatarInitials"

export { Avatar, AvatarFallback }

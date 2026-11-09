"use client"

import * as React from "react"
import { Slot } from "./slot"
import { cva } from "@/lib/cva"
import { cn } from "@/lib/utils"

const buttonVariantsOuter = cva("", {
  variants: {
    variant: {
      primary:
        "w-full border border-[1px] dark:border-[2px] border-black/10 dark:border-black bg-gradient-to-b from-black/70 to-black dark:from-white dark:to-white/80 p-[1px] transition duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      accent:
        "w-full border-[1px] dark:border-[2px] border-black/10 dark:border-neutral-950 bg-gradient-to-b from-teal-300/90 to-teal-500 dark:from-teal-200/70 dark:to-teal-500 p-[1px] transition duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      emerald:
        "w-full border-[1px] dark:border-[2px] border-emerald-950/20 bg-gradient-to-b from-emerald-400 to-emerald-600 dark:from-emerald-300 dark:to-emerald-500 p-[1px] transition duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      destructive:
        "w-full border-[1px] dark:border-[2px] border-black/10 dark:border-neutral-950 bg-gradient-to-b from-red-300/90 to-red-500 dark:from-red-300/90 dark:to-red-500 p-[1px] transition duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      secondary:
        "w-full border-[1px] dark:border-[2px] border-black/20 bg-white/50 dark:border-neutral-950 dark:bg-neutral-600/50 p-[1px] transition duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      minimal:
        "group w-full border-[1px] dark:border-[2px] border-black/20 bg-white/50 dark:border-neutral-950 dark:bg-neutral-600/80 p-[1px] active:bg-neutral-200 dark:active:bg-neutral-800 hover:bg-gradient-to-t hover:from-neutral-100 to-white dark:hover:from-neutral-600/50 dark:hover:to-neutral-600/70 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      icon: "group rounded-full border dark:border-neutral-950 border-black/10 dark:bg-neutral-600/50 bg-white/50 p-[1px] active:bg-neutral-200 dark:active:bg-neutral-800 hover:bg-gradient-to-t hover:from-neutral-100 to-white dark:hover:from-neutral-700 dark:hover:to-neutral-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
    },
    size: {
      sm: "rounded-[6px]",
      default: "rounded-[12px]",
      lg: "rounded-[12px]",
      icon: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

const innerDivVariants = cva(
  "w-full h-full flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        primary:
          "gap-2 bg-gradient-to-b from-neutral-800 to-black dark:from-neutral-200 dark:to-neutral-50 text-sm text-white/90 dark:text-black/80 transition duration-300 ease-in-out hover:from-stone-800 hover:to-neutral-800/70 dark:hover:from-stone-200 dark:hover:to-neutral-200 dark:active:from-stone-300 dark:active:to-neutral-300 active:bg-gradient-to-b active:from-black active:to-black",
        accent:
          "gap-2 bg-gradient-to-b from-teal-400 to-teal-600 text-sm text-white/90 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-teal-400/70 hover:to-teal-600/70 dark:hover:from-teal-400/70 dark:hover:to-teal-600/70 active:bg-gradient-to-b active:from-teal-400/80 active:to-teal-600/80 dark:active:from-teal-400 dark:active:to-teal-600 font-medium",
        emerald:
          "gap-2 bg-gradient-to-b from-emerald-600 to-emerald-700 text-sm text-white transition duration-300 ease-in-out hover:from-emerald-500 hover:to-emerald-600 active:from-emerald-700 active:to-emerald-800 font-medium",
        destructive:
          "gap-2 bg-gradient-to-b from-red-400/60 to-red-500/60 text-sm text-white/90 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-red-400/70 hover:to-red-600/70 dark:hover:from-red-400/70 dark:hover:to-red-500/80 active:bg-gradient-to-b active:from-red-400/80 active:to-red-600/80 dark:active:from-red-400 dark:active:to-red-500 font-medium",
        secondary:
          "gap-2 bg-gradient-to-b from-neutral-100/80 to-neutral-200/50 dark:from-neutral-800 dark:to-neutral-700/50 text-sm text-slate-800 dark:text-slate-100 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-neutral-200/40 hover:to-neutral-300/60 dark:hover:from-neutral-700 dark:hover:to-neutral-700/60 active:bg-gradient-to-b active:from-neutral-200/60 active:to-neutral-300/70 dark:active:from-neutral-800 dark:active:to-neutral-700 font-medium",
        minimal:
          "gap-2 bg-gradient-to-b from-white to-neutral-50/50 dark:from-neutral-800 dark:to-neutral-700/50 text-sm text-slate-700 dark:text-slate-200 transition duration-300 ease-in-out group-hover:bg-gradient-to-b group-hover:from-neutral-50/50 group-hover:to-neutral-100/60 dark:group-hover:from-neutral-700 dark:group-hover:to-neutral-700/60 group-active:bg-gradient-to-b group-active:from-neutral-100/60 group-active:to-neutral-100/90 dark:group-active:from-neutral-800 dark:group-active:to-neutral-700 font-medium",
        icon: "bg-gradient-to-b from-white to-neutral-50/50 dark:from-neutral-800 dark:to-neutral-700/50 text-slate-700 dark:text-slate-200 group-active:bg-neutral-200 dark:group-active:bg-neutral-800 rounded-full",
      },
      size: {
        sm: "text-xs rounded-[4px] px-3 py-1",
        default: "text-sm rounded-[10px] px-4 py-2",
        lg: "text-base rounded-[10px] px-5 py-2.5",
        icon: "rounded-full p-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface UnifiedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "emerald"
    | "destructive"
    | "minimal"
    | "icon"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const TextureButton = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "default",
      asChild = false,
      className,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        type={asChild ? undefined : type}
        className={cn(buttonVariantsOuter({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <div className={cn(innerDivVariants({ variant, size }))}>
          {children}
        </div>
      </Comp>
    )
  }
)

TextureButton.displayName = "TextureButton"

export { TextureButton, buttonVariantsOuter, innerDivVariants }

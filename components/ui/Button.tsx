"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { forwardRef } from "react"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-pink-blush-500 text-white hover:bg-pink-blush-600 disabled:bg-pink-blush-300",
  secondary:
    "bg-transparent border-2 border-pink-blush-500 text-pink-blush-700 hover:bg-pink-blush-50",
  ghost:
    "bg-transparent text-pink-blush-700 hover:bg-pink-blush-50",
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className = "", children, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
})

export default Button

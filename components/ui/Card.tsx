"use client"

import { motion, type HTMLMotionProps, type Transition } from "framer-motion"
import { forwardRef } from "react"

interface CardProps extends HTMLMotionProps<"div"> {
  interactive?: boolean
}

const hoverTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { interactive = false, className = "", children, ...props },
  ref
) {
  return (
    <motion.div
      ref={ref}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={interactive ? hoverTransition : props.transition}
      {...props}
      className={`bg-cream-50 border border-pink-blush-100 rounded-2xl shadow-soft overflow-hidden ${
        interactive ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  )
})

export default Card

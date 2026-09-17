"use client"

import { forwardRef, type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className = "", id, ...props },
  ref
) {
  const inputId = id ?? `input-${label ?? Math.random().toString(36).slice(2, 8)}`

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-bold text-pink-blush-800"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`w-full px-4 py-3 text-base bg-cream-50 border-2 rounded-xl outline-none transition-colors placeholder:text-neutral-400 focus:border-pink-blush-500 focus:ring-2 focus:ring-pink-blush-200 ${
          error ? "border-red-400" : "border-pink-blush-100"
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

export default Input

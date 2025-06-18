"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Shield, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface PrivacyHighlightBannerProps {
  className?: string
}

export function PrivacyHighlightBanner({ className }: PrivacyHighlightBannerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const highlights = [
    "Your data never leaves your device without your explicit consent",
    "Military-grade encryption protects every byte of your health information",
    "You own your data - we just help you manage it securely",
    "Zero-knowledge architecture means even we can't see your private data",
  ]

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [highlights.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className={cn(
        "relative bg-gradient-to-r from-emerald-500/5 to-blue-500/5 backdrop-blur-sm rounded-lg border border-emerald-500/20 p-4",
        className,
      )}
    >
      <div className="flex items-center justify-center space-x-3">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-emerald-400" />
          <Zap className="h-4 w-4 text-blue-400" />
        </div>

        <div className="flex-1 text-center overflow-hidden">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-slate-300 font-medium"
          >
            {highlights[currentIndex]}
          </motion.p>
        </div>

        <div className="flex space-x-1">
          {highlights.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-emerald-400" : "bg-slate-600",
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

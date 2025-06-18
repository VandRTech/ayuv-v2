"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className={className}
    >
      <Card className="backdrop-blur-md bg-slate-900/80 border-slate-700/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:border-purple-500/30">
        {children}
      </Card>
    </motion.div>
  )
}

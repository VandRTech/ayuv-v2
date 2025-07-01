"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RollingTextProps {
  text: string
  className?: string
  speed?: number
  stagger?: number
}

export function RollingText({ text, className, speed = 0.5, stagger = 0.05 }: RollingTextProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className="flex flex-wrap">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={cn(
              "inline-block transition-all duration-700 ease-out",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
            style={{
              transitionDelay: `${index * stagger}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  )
}

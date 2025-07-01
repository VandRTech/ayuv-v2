"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
  showControls?: boolean
  gradient?: boolean
}

export function Marquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className,
  showControls = true,
  gradient = true,
}: MarqueeProps) {
  const [isPaused, setIsPaused] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const marqueeRef = React.useRef<HTMLDivElement>(null)

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const shouldPause = isPaused || (pauseOnHover && isHovered)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient overlays */}
      {gradient && (
        <>
          <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent" />
        </>
      )}

      {/* Controls */}
      {showControls && (
        <div className="absolute right-4 top-1/2 z-20 -translate-y-1/2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePause}
            className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            aria-label={isPaused ? "Resume scrolling" : "Pause scrolling"}
          >
            {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </Button>
        </div>
      )}

      {/* Marquee content */}
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animation: shouldPause ? "none" : `marquee-${direction} ${speed}s linear infinite`,
        }}
        role="marquee"
        aria-live="polite"
        aria-label="Scrolling privacy notice"
      >
        <div className="flex shrink-0 items-center justify-around min-w-full">{children}</div>
        <div className="flex shrink-0 items-center justify-around min-w-full">{children}</div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        @keyframes marquee-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  )
}

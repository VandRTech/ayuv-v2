"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
}

interface SpaceBackgroundProps {
  backgroundImage?: string
}

export function SpaceBackground({ backgroundImage }: SpaceBackgroundProps) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate static twinkling stars for all pages
    const newStars: Star[] = []
    for (let i = 0; i < 150; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 3 + 2,
      })
    }
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </>
      ) : (
        <>
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />

          {/* Nebula effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
        </>
      )}

      {/* Static twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

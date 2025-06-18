"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SpaceBackground } from "@/components/space-background"

interface ComingSoonProps {
  title?: string
  description?: string
  showBackButton?: boolean
  backUrl?: string
}

export function ComingSoon({
  title = "Coming Soon",
  description = "We're working hard to bring you this feature. Stay tuned for updates!",
  showBackButton = true,
  backUrl = "/",
}: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <SpaceBackground />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-8"
        >
          <div className="space-y-6">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30"
            >
              <Rocket className="h-12 w-12 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              {title}
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">{description}</p>
          </div>

          <Card className="max-w-md mx-auto backdrop-blur-md bg-slate-900/80 border-slate-700/50 shadow-2xl">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                      }}
                    >
                      <Star className="h-4 w-4 text-emerald-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  This feature is currently under development and will be available soon.
                </p>
              </div>
            </CardContent>
          </Card>

          {showBackButton && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-800/50"
              >
                <Link href={backUrl}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

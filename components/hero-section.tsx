"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Earth Horizon Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/earth-horizon.jpg"
          alt="Earth from space"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white glow-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            >
              We are Building World&apos;s First
              <br />
              <span className="text-emerald-400 glow-text">Privacy Native Health OS</span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-[700px] text-slate-300 md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.9 }}
            >
              Securely unify your medical records, wearable data, and checkups - all in one place. Experience the future
              of healthcare with blockchain-secured consent and AI-driven insights.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            {/* Join Our Early Access - Solid Emerald Button */}
            <Button
              size="lg"
              asChild
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 border-0"
            >
              <Link href="/waitlist">Join Our Early Access</Link>
            </Button>

            {/* Explore Patient Portal - Transparent Button with Arrow */}
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 border-slate-600 text-white hover:bg-slate-800/50 backdrop-blur-sm font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:border-slate-500"
            >
              <Link href="/portal" className="flex items-center gap-2">
                Explore Patient Portal
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

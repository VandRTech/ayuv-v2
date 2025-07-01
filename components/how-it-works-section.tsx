"use client"

import { CheckCircle, ArrowRight } from "lucide-react"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const steps = [
  {
    step: "01",
    title: "Sign Up & Verify",
    description: "Create your account and verify your identity using secure government-approved methods.",
  },
  {
    step: "02",
    title: "Connect Your Data",
    description: "Link your existing health records, wearable devices, and authorize trusted healthcare providers.",
  },
  {
    step: "03",
    title: "Control & Share",
    description: "Manage consent permissions and securely share specific data with doctors or apps as needed.",
  },
  {
    step: "04",
    title: "Get Insights",
    description: "Receive AI-powered health insights, preventive care reminders, and personalized recommendations.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            How It <span className="text-emerald-400 glow-text">Works</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-300 md:text-xl">Get started with AYUV in four simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <AnimatedCard delay={index * 0.2}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-black text-sm font-bold glow-border">
                      {step.step}
                    </div>
                    <CheckCircle className="ml-auto h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </CardContent>
              </AnimatedCard>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-emerald-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

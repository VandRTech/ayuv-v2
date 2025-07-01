"use client"

import { Database, Shield, Activity, Bell } from "lucide-react"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const features = [
  {
    icon: Database,
    title: "Unified Health Records",
    description:
      "Access health reports, prescriptions, and history from all your healthcare providers in one secure location.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Blockchain-Secured Consent",
    description:
      "You control exactly who sees what. Every data access request requires your explicit consent, recorded immutably.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Activity,
    title: "Wearable & IoT Integration",
    description:
      "Effortlessly sync data from your smartwatch, fitness tracker, and health devices for comprehensive insights.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Bell,
    title: "Preventive Care Insights",
    description:
      "Get timely reminders and insights to help you stay on top of your health and prevent issues before they arise.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
]

export function FeaturesSection() {
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
            Key <span className="text-emerald-400 glow-text">Features</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-300 md:text-xl">
            Everything you need to take control of your health data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedCard key={index} delay={index * 0.2}>
              <CardHeader className="text-center pb-4">
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${feature.bgColor} backdrop-blur-sm`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-300">{feature.description}</CardDescription>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { Navigation } from "@/components/navigation"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FooterSection } from "@/components/footer-section"
import { SpaceBackground } from "@/components/space-background"
import { motion } from "framer-motion"
import {
  Database,
  Shield,
  Activity,
  Bell,
  Brain,
  Lock,
  Smartphone,
  Globe,
  Zap,
  Users,
  FileText,
  Heart,
} from "lucide-react"

const features = [
  {
    icon: Database,
    title: "Unified Health Records",
    description: "Centralize all your medical data from multiple providers in one secure, accessible location.",
    category: "Data Management",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Immutable consent management with cryptographic proof of every data access.",
    category: "Security",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Brain,
    title: "AI Health Insights",
    description: "Personalized health recommendations powered by advanced machine learning algorithms.",
    category: "Intelligence",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Activity,
    title: "Wearable Integration",
    description: "Seamlessly sync data from smartwatches, fitness trackers, and IoT health devices.",
    category: "Integration",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Intelligent alerts for medication reminders, appointments, and health milestones.",
    category: "Automation",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Lock,
    title: "Zero-Trust Architecture",
    description: "End-to-end encryption with granular access controls and audit trails.",
    category: "Security",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Native mobile apps with offline capabilities and real-time synchronization.",
    category: "Accessibility",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "Compliant with international healthcare standards including HL7 FHIR and DICOM.",
    category: "Compliance",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Zap,
    title: "Real-Time Analytics",
    description: "Live health monitoring with instant insights and trend analysis.",
    category: "Analytics",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Users,
    title: "Care Team Collaboration",
    description: "Secure sharing with healthcare providers, family members, and caregivers.",
    category: "Collaboration",
    color: "text-teal-400",
    bgColor: "bg-teal-500/10",
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Organize, categorize, and search through all your health documents and reports.",
    category: "Organization",
    color: "text-lime-400",
    bgColor: "bg-lime-500/10",
  },
  {
    icon: Heart,
    title: "Wellness Tracking",
    description: "Comprehensive wellness monitoring including mental health and lifestyle factors.",
    category: "Wellness",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
  },
]

export default function FeaturesPage() {
  return (
    <div className="relative bg-black min-h-screen">
      <SpaceBackground />
      <div className="relative z-10">
        <Navigation />
        <main className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">
                Powerful <span className="text-emerald-400 glow-text">Features</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Discover the comprehensive suite of tools designed to revolutionize your healthcare experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor} backdrop-blur-sm`}
                      >
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <Badge variant="outline" className="border-slate-600 text-slate-400">
                        {feature.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-6 pt-12"
            >
              <h2 className="text-3xl font-bold text-white">
                Ready to Transform Your <span className="text-emerald-400">Healthcare Experience?</span>
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Join thousands of users who have already taken control of their health data with AYUV&apos;s cutting-edge
                platform.
              </p>
            </motion.div>
          </motion.div>
        </main>
        <FooterSection />
      </div>
    </div>
  )
}

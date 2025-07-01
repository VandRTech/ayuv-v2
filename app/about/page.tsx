"use client"

import { Navigation } from "@/components/navigation"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FooterSection } from "@/components/footer-section"
import { SpaceBackground } from "@/components/space-background"
import { motion } from "framer-motion"

export default function AboutPage() {
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
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">
                About <span className="text-emerald-400 glow-text">AYUV Health</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                We&apos;re building the future of healthcare through secure, AI-driven, patient-centric health data
                management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedCard delay={0.2}>
                <CardHeader>
                  <CardTitle className="text-white">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">
                    To empower every individual with complete control over their health data, enabling better healthcare
                    outcomes through unified, secure, and intelligent health record management.
                  </p>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <CardHeader>
                  <CardTitle className="text-white">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">
                    A future where healthcare is preventive, personalized, and accessible to all, powered by secure
                    blockchain technology and cutting-edge AI insights.
                  </p>
                </CardContent>
              </AnimatedCard>
            </div>

            <AnimatedCard delay={0.4}>
              <CardHeader>
                <CardTitle className="text-white">What Makes AYUV Different</CardTitle>
                <CardDescription className="text-slate-400">
                  We combine the best of security, technology, and user experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-1 border-emerald-500/30 text-emerald-400">
                    Security
                  </Badge>
                  <div>
                    <h4 className="font-medium text-white">Blockchain-Secured Consent</h4>
                    <p className="text-sm text-slate-300">
                      Every data access is recorded immutably on blockchain, giving you complete audit trail
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-1 border-blue-500/30 text-blue-400">
                    AI-Powered
                  </Badge>
                  <div>
                    <h4 className="font-medium text-white">Intelligent Health Insights</h4>
                    <p className="text-sm text-slate-300">
                      AI analyzes your unified health data to provide personalized preventive care recommendations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-1 border-purple-500/30 text-purple-400">
                    Unified
                  </Badge>
                  <div>
                    <h4 className="font-medium text-white">Complete Health Picture</h4>
                    <p className="text-sm text-slate-300">
                      Integrates with health systems, wearables, and healthcare providers for comprehensive health view
                    </p>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.5}>
              <CardHeader>
                <CardTitle className="text-white">Built for Global Healthcare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">
                  AYUV is designed for the global healthcare ecosystem. We integrate with international health
                  standards, support multiple languages, and understand the unique challenges of healthcare access
                  worldwide. Our platform works seamlessly across different healthcare systems, ensuring that quality
                  healthcare data management is accessible to everyone, everywhere.
                </p>
              </CardContent>
            </AnimatedCard>
          </motion.div>
        </main>
        <FooterSection />
      </div>
    </div>
  )
}

"use client"

import { Navigation } from "@/components/navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { FooterSection } from "@/components/footer-section"
import { SpaceBackground } from "@/components/space-background"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCard } from "@/components/animated-card"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import {
  Shield,
  Heart,
  Battery,
  Watch,
  Activity,
  Lock,
  Star,
  ChevronRight,
  CheckCircle,
  Cpu,
  Network,
  Mountain,
} from "lucide-react"
import Link from "next/link"

export default function AegisPage() {
  const { t } = useLanguage()

  const coreFeatures = [
    {
      icon: Shield,
      title: t("aegis.feature1.title"),
      description: t("aegis.feature1.desc"),
      color: "text-emerald-400",
    },
    {
      icon: Cpu,
      title: t("aegis.feature2.title"),
      description: t("aegis.feature2.desc"),
      color: "text-blue-400",
    },
    {
      icon: Heart,
      title: t("aegis.feature3.title"),
      description: t("aegis.feature3.desc"),
      color: "text-red-400",
    },
  ]

  const keySpecs = [
    { label: "Battery Life", value: t("aegis.specs.battery"), icon: Battery },
    { label: "Water Resistance", value: t("aegis.specs.water"), icon: Mountain },
    { label: "Durability", value: t("aegis.specs.durability"), icon: Shield },
    { label: "Health Tracking", value: t("aegis.specs.health"), icon: Heart },
  ]

  const testimonials = [
    {
      quote:
        "The privacy features alone make Aegis revolutionary. Finally, a wearable that works for me, not against me.",
      author: "Dr. Sarah Chen",
      role: "Healthcare Technology Researcher",
    },
    {
      quote: "Medical-grade accuracy with blockchain consent gives me confidence sharing data with my care team.",
      author: "Michael Roberts",
      role: "Chronic Disease Patient",
    },
  ]

  return (
    <div className="relative bg-black min-h-screen">
      <SpaceBackground />
      <div className="relative z-10">
        <Navigation />

        {/* Language Toggle */}
        <div className="container px-4 md:px-6 pt-4">
          <div className="flex justify-end">
            <LanguageToggle />
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-center space-y-6 max-w-4xl mx-auto"
            >
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2">
                {t("aegis.badge")}
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                {t("aegis.title")}
                <br />
                {t("aegis.subtitle")}
              </h1>

              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">{t("aegis.description")}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3"
                  asChild
                >
                  <Link href="/waitlist">{t("aegis.cta.primary")}</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-600 text-white hover:bg-slate-800/50"
                  asChild
                >
                  <Link href="/portal">
                    {t("aegis.cta.secondary")}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                {t("features.title")}{" "}
                <span className="text-emerald-400 glow-text">{t("features.title.highlight")}</span>
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">{t("features.subtitle")}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coreFeatures.map((feature, index) => (
                <AnimatedCard key={index} delay={index * 0.2}>
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300 text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Key Specifications */}
        <section className="py-16 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Built for <span className="text-emerald-400 glow-text">Performance</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {keySpecs.map((spec, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <CardContent className="text-center pt-6">
                    <spec.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <div className="font-semibold text-white text-lg">{spec.value}</div>
                    <div className="text-sm text-slate-400">{spec.label}</div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Product Variants */}
        <section className="py-16 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Choose Your <span className="text-emerald-400 glow-text">Style</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimatedCard delay={0.2}>
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">{t("aegis.band.title")}</CardTitle>
                  <CardDescription className="text-slate-300">{t("aegis.band.desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Professional athlete-grade sensors</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Extended battery optimization</span>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Watch className="h-8 w-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">{t("aegis.watch.title")}</CardTitle>
                  <CardDescription className="text-slate-300">{t("aegis.watch.desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Real-time health visualization</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Emergency response features</span>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Trusted by <span className="text-emerald-400 glow-text">Professionals</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <AnimatedCard key={index} delay={index * 0.2}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex gap-1 justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                        ))}
                      </div>
                      <blockquote className="text-slate-300 italic leading-relaxed text-center">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                      <div className="border-t border-slate-700 pt-4 text-center">
                        <div className="font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-slate-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy & Integration Highlights */}
        <section className="py-16 relative">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimatedCard delay={0.2}>
                <CardHeader className="text-center pb-4">
                  <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <CardTitle className="text-xl text-white">Privacy-First Design</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-slate-300 leading-relaxed">
                    You own your health data, not the manufacturer. Granular consent management with blockchain security
                    ensures complete data sovereignty.
                  </CardDescription>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <CardHeader className="text-center pb-4">
                  <Network className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-xl text-white">Healthcare Integration</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-slate-300 leading-relaxed">
                    FHIR-compliant integration with healthcare systems enables seamless data sharing with your care team
                    while maintaining privacy controls.
                  </CardDescription>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-8 max-w-3xl mx-auto"
            >
              <AnimatedCard>
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-3xl text-white mb-4">
                    Ready to Take Control of Your <span className="text-emerald-400">Health Data?</span>
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-300">
                    Join our early access program and be among the first to experience privacy-native health monitoring.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3"
                      asChild
                    >
                      <Link href="/waitlist">{t("aegis.cta.primary")}</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-600 text-white hover:bg-slate-800/50"
                      asChild
                    >
                      <Link href="/contact">{t("common.schedule.demo")}</Link>
                    </Button>
                  </div>
                </CardContent>
              </AnimatedCard>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-white">Aegis by AYUV™ - Where Your Health Data Serves You</h3>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                  <span>Privacy-First</span>
                  <span>•</span>
                  <span>Medical-Grade</span>
                  <span>•</span>
                  <span>FHIR-Compatible</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <FooterSection />
      </div>
    </div>
  )
}

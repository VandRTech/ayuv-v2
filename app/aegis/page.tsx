"use client"

import { Navigation } from "@/components/navigation"
import { AegisNavigation } from "@/components/aegis-navigation"
import { FooterSection } from "@/components/footer-section"
import { SpaceBackground } from "@/components/space-background"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCard } from "@/components/animated-card"
import { motion } from "framer-motion"
import {
  Shield,
  Heart,
  Battery,
  Mountain,
  Watch,
  Activity,
  Lock,
  Star,
  Download,
  Calendar,
  ChevronRight,
  CheckCircle,
  Cpu,
  Network,
  Zap,
  Globe,
  Smartphone,
} from "lucide-react"
import Link from "next/link"

const coreFeatures = [
  {
    icon: Shield,
    title: "Blockchain-Secured Data Sync",
    description: "First wearables with native blockchain consent integration for complete health data sovereignty",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Cpu,
    title: "Federated AI Intelligence",
    description:
      "Personalized healthcare insights through federated learning while keeping your data completely private",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Heart,
    title: "Medical-Grade Monitoring",
    description: "Hospital-level precision for vital signs with clinical-grade sensors surpassing consumer accuracy",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Lock,
    title: "Privacy-First Architecture",
    description: "You own your health data, not the manufacturer. Granular consent management for every data point",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
]

const specifications = [
  {
    category: "Durability & Protection",
    icon: Mountain,
    specs: [
      { label: "Water Resistance", value: "IP68 + 10ATM (100m depth)" },
      { label: "Military Standard", value: "MIL-STD 810H certified" },
      { label: "Dust Protection", value: "IP6X dust-resistant" },
    ],
  },
  {
    category: "Battery Performance",
    icon: Battery,
    specs: [
      { label: "Battery Life", value: "14+ days continuous operation" },
      { label: "Charging", value: "Wireless PowerPack system" },
      { label: "Technology", value: "nanoPower optimization" },
    ],
  },
  {
    category: "Health Monitoring",
    icon: Activity,
    specs: [
      { label: "Vital Tracking", value: "24/7 HR, RR, temp, SpO2" },
      { label: "Fall Detection", value: "AI-powered emergency response" },
      { label: "Sleep Analysis", value: "Comprehensive recovery metrics" },
    ],
  },
]

const privacyFeatures = [
  {
    icon: Shield,
    title: "Sovereign Data Control",
    description:
      "You own your health data, not the device manufacturer. Every piece of information remains under your complete control.",
  },
  {
    icon: Globe,
    title: "FHIR-Compliant Integration",
    description:
      "Seamlessly connects with healthcare systems through industry-standard FHIR protocols for interoperability.",
  },
  {
    icon: Lock,
    title: "Offline-First Design",
    description:
      "Functions independently without constant connectivity, ideal for remote areas or privacy-focused users.",
  },
]

const integrationFeatures = [
  {
    icon: Network,
    title: "AYUV Health OS Connectivity",
    description: "Primary data collection points for unified health records and AI-driven insights.",
  },
  {
    icon: Smartphone,
    title: "Emergency Response Features",
    description: "Intelligent detection with automatic caregiver contact and medical history access.",
  },
  {
    icon: Activity,
    title: "Clinical Research Integration",
    description: "Optional participation in federated medical research while maintaining complete privacy.",
  },
]

const futureFeatures = [
  {
    icon: Zap,
    title: "Continuous Innovation",
    description:
      "Monthly feature updates through over-the-air updates, ensuring your wearable evolves with advancing medical knowledge.",
  },
  {
    icon: Cpu,
    title: "AI Enhancement",
    description:
      "Machine learning algorithms continuously improve accuracy and provide more personalized health insights.",
  },
  {
    icon: Network,
    title: "Ecosystem Expansion",
    description: "Growing integration with healthcare providers, research institutions, and wellness platforms.",
  },
]

const testimonials = [
  {
    quote:
      "The privacy features alone make Aegis revolutionary. Finally, a wearable that works for me, not against me.",
    author: "Dr. Sarah Chen",
    role: "Healthcare Technology Researcher",
    rating: 5,
  },
  {
    quote:
      "The medical-grade accuracy combined with blockchain consent gives me confidence in sharing data with my care team.",
    author: "Michael Roberts",
    role: "Chronic Disease Patient",
    rating: 5,
  },
  {
    quote:
      "As a healthcare provider, having patients' comprehensive data with proper consent makes diagnosis so much more accurate.",
    author: "Dr. Raj Patel",
    role: "Cardiologist",
    rating: 5,
  },
]

export default function AegisPage() {
  return (
    <div className="relative bg-black min-h-screen">
      <SpaceBackground />
      <div className="relative z-10">
        <Navigation />
        <AegisNavigation />

        {/* Product Overview Section */}
        <section id="overview" className="relative py-24 overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8 max-w-4xl mx-auto"
            >
              <div className="space-y-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2">
                  Coming Soon • Privacy-First • Medical-Grade
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                  Aegis by <span className="text-emerald-400 glow-text">AYUV</span>
                  <br />
                  Revolutionary Health OS Wearables
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  The world's first <span className="text-emerald-300 font-semibold">Privacy-Native Health OS</span>{" "}
                  wearables with blockchain-secured data sync, federated AI intelligence, and medical-grade continuous
                  monitoring.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3"
                  asChild
                >
                  <Link href="#early-access">Request Early Access</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-600 text-white hover:bg-slate-800/50"
                  asChild
                >
                  <Link href="#specifications">
                    View Specifications
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-medium pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>FHIR-Compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Medical-Grade Precision</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Innovation Section */}
        <section id="innovation" className="py-24 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Core <span className="text-emerald-400 glow-text">Innovation</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                First-time features that redefine what's possible in health monitoring
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <AnimatedCard key={index} delay={index * 0.2}>
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications Section */}
        <section id="specifications" className="py-24 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Technical <span className="text-emerald-400 glow-text">Specifications</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Military-grade durability meets medical-grade precision
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specifications.map((spec, index) => (
                <AnimatedCard key={index} delay={index * 0.2}>
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                      <spec.icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-xl text-white">{spec.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {spec.specs.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-slate-400 text-sm">{item.label}</span>
                          <span className="text-white text-sm font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy-First Architecture Section */}
        <section id="privacy" className="py-24 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Privacy-First <span className="text-emerald-400 glow-text">Architecture</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Built on the principle that you own your health data, not the device manufacturer
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {privacyFeatures.map((feature, index) => (
                <AnimatedCard key={index} delay={index * 0.2}>
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Experience Section */}
        <section id="experience" className="py-24 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Customer <span className="text-emerald-400 glow-text">Experience</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                What healthcare professionals and patients are saying about Aegis
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimatedCard key={index} delay={index * 0.2}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                        ))}
                      </div>
                      <blockquote className="text-slate-300 italic leading-relaxed">"{testimonial.quote}"</blockquote>
                      <div className="border-t border-slate-700 pt-4">
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

        {/* Product Variants Section */}
        <section id="variants" className="py-24 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Product <span className="text-emerald-400 glow-text">Variants</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Choose the form factor that fits your lifestyle
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimatedCard delay={0.2}>
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">Aegis Band</CardTitle>
                  <CardDescription className="text-slate-300">
                    Professional-grade monitoring inspired by elite athlete training systems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Screen-free design for pure data focus
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Extended battery life optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Professional athlete-grade sensors
                    </li>
                  </ul>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Watch className="h-8 w-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">Aegis Watch</CardTitle>
                  <CardDescription className="text-slate-300">
                    Comprehensive smartwatch functionality with medical-grade precision
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Always-on health data visualization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Intuitive interface for real-time insights
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Emergency response capabilities
                    </li>
                  </ul>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* Integration Ecosystem Section */}
        <section id="integration" className="py-24 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Integration <span className="text-emerald-400 glow-text">Ecosystem</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Seamlessly connects with healthcare systems and the AYUV platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {integrationFeatures.map((feature, index) => (
                <AnimatedCard key={index} delay={index * 0.2}>
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Future-Ready Technology Section */}
        <section id="future" className="py-24 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Future-Ready <span className="text-emerald-400 glow-text">Technology</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Continuous innovation that evolves with advancing medical knowledge
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {futureFeatures.map((feature, index) => (
                <AnimatedCard key={index} delay={index * 0.2}>
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-yellow-400" />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Early Access CTA */}
        <section id="early-access" className="py-24 relative">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-8 max-w-4xl mx-auto"
            >
              <AnimatedCard>
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-3xl text-white mb-4">
                    Take Control of Your <span className="text-emerald-400">Health Journey</span>
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-300">
                    Join our early access program to be among the first to experience privacy-native health monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3"
                      asChild
                    >
                      <Link href="/waitlist">Request Early Access</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-600 text-white hover:bg-slate-800/50"
                      asChild
                    >
                      <Link href="/portal">Learn More About AYUV Health OS</Link>
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button variant="ghost" className="text-slate-400 hover:text-white" asChild>
                      <Link href="#" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Technical Specifications
                      </Link>
                    </Button>
                    <Button variant="ghost" className="text-slate-400 hover:text-white" asChild>
                      <Link href="/contact" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Schedule Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </AnimatedCard>

              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  Aegis by AYUV™ - Where Your Health Data Serves You, Not Corporations
                </h3>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                  <span>Coming Soon</span>
                  <span>•</span>
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

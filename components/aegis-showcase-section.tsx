"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Heart, Watch, Activity } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Shield,
    title: "Blockchain-Secured",
    description: "First wearable with native blockchain consent integration",
  },
  {
    icon: Zap,
    title: "Federated AI",
    description: "Privacy-preserving AI that learns without exposing your data",
  },
  {
    icon: Heart,
    title: "Medical-Grade",
    description: "Hospital-level precision for continuous health monitoring",
  },
]

const products = [
  {
    name: "Aegis Band",
    description: "Professional-grade monitoring with screen-free design",
    icon: Activity,
    features: ["14+ day battery", "IP68 waterproof", "Military-grade durability"],
  },
  {
    name: "Aegis Watch",
    description: "Smartwatch functionality with medical precision",
    icon: Watch,
    features: ["Always-on display", "Emergency response", "Real-time insights"],
  },
]

export function AegisShowcaseSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            Revolutionary Technology
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Introducing{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Aegis by AYUV
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The world&apos;s first Privacy-Native Health OS Wearables that deliver unprecedented health insights while
            maintaining complete patient data sovereignty.
          </p>
        </motion.div>

        {/* Core Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 border-slate-800 hover:border-emerald-500/50 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Product Variants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {products.map((product, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-3">
                    <product.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                </div>
                <p className="text-slate-300 mb-6">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-400">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {[
            { value: "14+", label: "Days Battery Life" },
            { value: "100m", label: "Water Resistant" },
            { value: "24/7", label: "Health Monitoring" },
            { value: "FHIR", label: "Healthcare Compatible" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Experience the Future of Health Monitoring?
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join our early access program and be among the first to experience privacy-native health monitoring with
              medical-grade precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
                <Link href="/aegis">Explore Aegis Wearables</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
                asChild
              >
                <Link href="/waitlist">Request Early Access</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}

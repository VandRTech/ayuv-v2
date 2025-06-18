"use client"

import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SpaceBackground } from "@/components/space-background"
import { motion } from "framer-motion"
import { FileText, Video, BookOpen, Download, ExternalLink } from "lucide-react"
import { CommunityJoinForm } from "@/components/community-join-form"

const resources = [
  {
    category: "Documentation",
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    items: [
      {
        title: "Getting Started Guide",
        description: "Learn how to set up your AYUV Health account and connect your data sources",
        type: "Guide",
        status: "Available",
        link: "/docs/getting-started",
      },
      {
        title: "API Documentation",
        description: "Complete API reference for developers building healthcare applications",
        type: "API Docs",
        status: "Coming Soon",
        link: "/docs/api",
      },
      {
        title: "Security & Privacy",
        description: "Understanding how we protect your health data with blockchain technology",
        type: "Security",
        status: "Available",
        link: "/docs/security",
      },
    ],
  },
  {
    category: "Educational Content",
    icon: BookOpen,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    items: [
      {
        title: "Health Data Standards",
        description: "Complete guide to international health data standards and interoperability",
        type: "Article",
        status: "Available",
        link: "/learn/standards",
      },
      {
        title: "Blockchain in Healthcare",
        description: "How blockchain technology revolutionizes healthcare data security",
        type: "Article",
        status: "Available",
        link: "/learn/blockchain",
      },
      {
        title: "Preventive Care Guide",
        description: "Using AI insights for better health outcomes and preventive care",
        type: "Guide",
        status: "Coming Soon",
        link: "/learn/preventive-care",
      },
    ],
  },
  {
    category: "Video Tutorials",
    icon: Video,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    items: [
      {
        title: "Platform Overview",
        description: "5-minute comprehensive walkthrough of AYUV Health features",
        type: "Video",
        status: "Coming Soon",
        link: "/videos/overview",
      },
      {
        title: "Consent Management",
        description: "How to control who accesses your health data with blockchain consent",
        type: "Video",
        status: "Coming Soon",
        link: "/videos/consent",
      },
      {
        title: "Wearable Integration",
        description: "Connecting your fitness trackers and health monitoring devices",
        type: "Video",
        status: "Coming Soon",
        link: "/videos/wearables",
      },
    ],
  },
  {
    category: "Downloads",
    icon: Download,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    items: [
      {
        title: "Mobile App (Android)",
        description: "Download AYUV Health for Android devices from Google Play Store",
        type: "App",
        status: "Coming Soon",
        link: "/download/android",
      },
      {
        title: "Mobile App (iOS)",
        description: "Download AYUV Health for iPhone and iPad from App Store",
        type: "App",
        status: "Coming Soon",
        link: "/download/ios",
      },
      {
        title: "Data Export Tool",
        description: "Export your health data in standard formats (HL7 FHIR, PDF)",
        type: "Tool",
        status: "Beta",
        link: "/download/export-tool",
      },
    ],
  },
]

export default function ResourcesPage() {
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
                Resources & <span className="text-emerald-400 glow-text">Support</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Everything you need to get the most out of AYUV Health - from getting started guides to advanced
                developer documentation
              </p>
            </div>

            <div className="space-y-16">
              {resources.map((section, sectionIndex) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className={`p-3 rounded-lg ${section.bgColor} backdrop-blur-sm`}>
                      <section.icon className={`h-8 w-8 ${section.color}`} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">{section.category}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.items.map((item, itemIndex) => (
                      <AnimatedCard key={itemIndex} delay={itemIndex * 0.1}>
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-3">
                            <Badge
                              variant="outline"
                              className={`${
                                item.status === "Available"
                                  ? "border-emerald-500/30 text-emerald-400"
                                  : item.status === "Beta"
                                    ? "border-yellow-500/30 text-yellow-400"
                                    : "border-slate-500/30 text-slate-400"
                              }`}
                            >
                              {item.type}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={`${
                                item.status === "Available"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : item.status === "Beta"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-slate-500/20 text-slate-400"
                              }`}
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <CardDescription className="text-slate-300 leading-relaxed">
                            {item.description}
                          </CardDescription>
                          <Button
                            variant={item.status === "Available" ? "default" : "outline"}
                            className={`w-full ${
                              item.status === "Available"
                                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                                : "border-slate-600 text-slate-300 hover:bg-slate-800/50"
                            }`}
                            disabled={item.status === "Coming Soon"}
                          >
                            {item.status === "Available" ? (
                              <>
                                Access Resource
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </>
                            ) : item.status === "Beta" ? (
                              <>
                                Try Beta
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </>
                            ) : (
                              "Coming Soon"
                            )}
                          </Button>
                        </CardContent>
                      </AnimatedCard>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-6 pt-12"
            >
              <AnimatedCard>
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Need Additional Support?</CardTitle>
                  <CardDescription className="text-lg text-slate-300">
                    Our support team is here to help you succeed with AYUV Health
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
                      <a href="/support">Contact Support</a>
                    </Button>
                    <CommunityJoinForm
                      trigger={
                        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800/50">
                          Join Community
                        </Button>
                      }
                    />
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800/50" asChild>
                      <a href="/help">Help Center</a>
                    </Button>
                  </div>
                </CardContent>
              </AnimatedCard>
            </motion.div>
          </motion.div>
        </main>
        <FooterSection />
      </div>
    </div>
  )
}

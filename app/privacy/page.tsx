"use client"

import { SpaceBackground } from "@/components/space-background"
import { PrivacyMarquee } from "@/components/privacy-marquee"
import { RollingText } from "@/components/ui/rolling-text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Shield, Lock, Eye, Database, UserCheck, FileText, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

const privacySections = [
  {
    title: "Data Collection",
    icon: Database,
    content:
      "We collect only the minimum necessary health data to provide our services. This includes vital signs, medication information, and appointment details.",
  },
  {
    title: "Data Usage",
    icon: Eye,
    content:
      "Your health data is used exclusively for providing healthcare services, generating insights, and improving your care experience.",
  },
  {
    title: "Data Security",
    icon: Lock,
    content:
      "All data is encrypted in transit and at rest using industry-standard 256-bit AES encryption and stored in SOC 2 Type II certified facilities.",
  },
  {
    title: "Data Sharing",
    icon: UserCheck,
    content:
      "We never sell your data. Sharing only occurs with your explicit consent and authorized healthcare providers involved in your care.",
  },
  {
    title: "Your Rights",
    icon: Shield,
    content:
      "You have the right to access, modify, or delete your data at any time. You can also control who has access to your information.",
  },
  {
    title: "Compliance",
    icon: FileText,
    content:
      "We are fully HIPAA compliant and adhere to all applicable healthcare privacy regulations including GDPR where applicable.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative">
      <SpaceBackground />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="text-center mb-8">
            <RollingText
              text="Privacy Policy"
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              speed={0.8}
              stagger={0.1}
            />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your privacy and data security are our top priorities. Learn how we protect and handle your health
              information.
            </p>
            <Badge variant="secondary" className="mt-4">
              Last updated: December 2024
            </Badge>
          </div>
        </div>

        {/* Privacy Marquee */}
        <div className="w-full bg-black/20 backdrop-blur-sm border-y border-white/10 py-4 mb-12">
          <PrivacyMarquee speed={45} />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {privacySections.map((section, index) => {
              const Icon = section.icon
              return (
                <Card
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border-white/10 hover:border-primary/30 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-white">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Detailed Privacy Notice */}
          <Card className="bg-black/40 backdrop-blur-sm border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Detailed Privacy Notice</CardTitle>
              <CardDescription className="text-gray-300">
                Comprehensive information about our privacy practices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Information We Collect</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, use our
                  services, or contact us for support. This may include:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Personal identification information (name, email, phone number)</li>
                  <li>Health and medical information (vital signs, symptoms, medications)</li>
                  <li>Device and usage information from connected health devices</li>
                  <li>Communication preferences and consent settings</li>
                </ul>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">How We Use Your Information</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Provide personalized health insights and recommendations</li>
                  <li>Enable communication with your healthcare providers</li>
                  <li>Send important health alerts and notifications</li>
                  <li>Improve our services and develop new features</li>
                  <li>Ensure the security and integrity of our platform</li>
                </ul>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Your Privacy Controls</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You have control over your privacy settings and can:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      Access Your Data
                    </Badge>
                    <p className="text-sm text-gray-400">View and download all your personal health information</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      Modify Settings
                    </Badge>
                    <p className="text-sm text-gray-400">Update your privacy preferences and consent settings</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      Delete Data
                    </Badge>
                    <p className="text-sm text-gray-400">Request deletion of your personal information</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      Control Sharing
                    </Badge>
                    <p className="text-sm text-gray-400">Manage who can access your health information</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/portal/consent">
                <UserCheck className="w-4 h-4 mr-2" />
                Manage Privacy Settings
              </Link>
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" />
              Download Full Policy
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
              <ExternalLink className="w-4 h-4 mr-2" />
              Contact Privacy Officer
            </Button>
          </div>

          {/* Compact Marquee Footer */}
          <div className="mt-16 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <PrivacyMarquee speed={35} variant="compact" />
          </div>
        </div>
      </div>
    </div>
  )
}

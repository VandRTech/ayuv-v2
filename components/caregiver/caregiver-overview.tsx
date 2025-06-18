"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, Home, Monitor, AlertTriangle, MessageSquare, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const caregiverDashboards = [
  {
    title: "Multi-Patient Monitor",
    description: "Real-time monitoring of all patients with comprehensive vital signs and alerts",
    href: "/portal/caregiver/multi-patient",
    icon: Monitor,
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    features: ["Real-time vitals", "Critical alerts", "Patient filtering", "Emergency contacts"],
  },
  {
    title: "Hospital Implementation",
    description: "Centralized patient monitoring with EWS integration and multi-parameter accuracy",
    href: "/portal/caregiver/hospital",
    icon: Heart,
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    features: ["EWS Dashboard", "NEWS Scores", "Device Integration", "Clinical Workflows"],
  },
  {
    title: "Family Caregiver",
    description: "Multi-generation health tracking with comprehensive health management",
    href: "/portal/caregiver/family",
    icon: Home,
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    features: ["Family Profiles", "Health Management", "Emergency Response", "Smart Reminders"],
  },
  {
    title: "Eldercare Home",
    description: "24/7 non-invasive monitoring with nursing station integration",
    href: "/portal/caregiver/eldercare",
    icon: Users,
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    features: ["24/7 Monitoring", "Nursing Integration", "Safety Alerts", "Family Communication"],
  },
]

const quickActions = [
  {
    title: "Alert Management",
    description: "Manage and respond to patient alerts",
    href: "/portal/caregiver/alerts",
    icon: AlertTriangle,
  },
  {
    title: "Communication Hub",
    description: "Coordinate with care teams and families",
    href: "/portal/caregiver/communication",
    icon: MessageSquare,
  },
  {
    title: "Analytics & Reports",
    description: "View insights and generate reports",
    href: "/portal/caregiver/analytics",
    icon: BarChart3,
  },
]

export function CaregiverOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white"
        >
          AYUV Caregiver Portal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 max-w-2xl mx-auto"
        >
          Comprehensive healthcare monitoring solutions for hospitals, families, and eldercare facilities. Choose your
          specialized dashboard to access tailored features and insights.
        </motion.p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {caregiverDashboards.map((dashboard, index) => (
          <motion.div
            key={dashboard.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-[#131f2e] border-gray-800 hover:bg-[#1a2736] transition-all duration-300 h-full">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg border ${dashboard.color}`}>
                      <dashboard.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{dashboard.title}</CardTitle>
                      <p className="text-sm text-slate-400 mt-1">{dashboard.description}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {dashboard.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href={dashboard.href} className="flex items-center justify-center">
                    Access Dashboard
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-[#131f2e] border-gray-800 hover:bg-[#1a2736] transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <action.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-medium text-white">{action.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{action.description}</p>
                  <Button size="sm" variant="outline" className="w-full border-gray-700" asChild>
                    <Link href={action.href}>Access</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

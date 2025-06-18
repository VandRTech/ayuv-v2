"use client"

import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SpaceBackground } from "@/components/space-background"
import { motion } from "framer-motion"
import { MessageSquare, Users, Calendar, Award, TrendingUp, Globe, Heart, Zap } from "lucide-react"
import { CommunityJoinForm } from "@/components/community-join-form"

const communityStats = [
  {
    icon: Users,
    value: "12,000+",
    label: "Global Members",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: MessageSquare,
    value: "2,500+",
    label: "Active Discussions",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Calendar,
    value: "150+",
    label: "Events Hosted",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Award,
    value: "500+",
    label: "Success Stories",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
]

const forumCategories = [
  {
    title: "General Health",
    description: "Share experiences and discuss general health topics",
    posts: "3,245",
    members: "8,500",
    status: "Very Active",
    color: "text-emerald-400",
  },
  {
    title: "Wearable Technology",
    description: "Discuss fitness trackers, smartwatches, and health devices",
    posts: "1,856",
    members: "4,200",
    status: "Active",
    color: "text-blue-400",
  },
  {
    title: "Data Privacy & Security",
    description: "Learn about health data protection and blockchain security",
    posts: "892",
    members: "2,800",
    status: "Active",
    color: "text-purple-400",
  },
  {
    title: "Preventive Care",
    description: "Tips and strategies for maintaining optimal health",
    posts: "1,234",
    members: "3,600",
    status: "Active",
    color: "text-orange-400",
  },
  {
    title: "AI & Health Insights",
    description: "Discuss AI-powered health recommendations and insights",
    posts: "567",
    members: "1,900",
    status: "Growing",
    color: "text-cyan-400",
  },
  {
    title: "Developer Corner",
    description: "Technical discussions for healthcare app developers",
    posts: "423",
    members: "1,200",
    status: "Specialized",
    color: "text-pink-400",
  },
]

const upcomingEvents = [
  {
    title: "Global Health Data Summit",
    date: "March 25, 2024",
    time: "2:00 PM UTC",
    type: "Virtual Conference",
    attendees: "500+",
    status: "Registration Open",
  },
  {
    title: "Wearable Tech Showcase",
    date: "April 8, 2024",
    time: "6:00 PM UTC",
    type: "Product Demo",
    attendees: "200+",
    status: "Registration Open",
  },
  {
    title: "Blockchain in Healthcare Workshop",
    date: "April 22, 2024",
    time: "3:00 PM UTC",
    type: "Educational Workshop",
    attendees: "150+",
    status: "Coming Soon",
  },
]

const communityFeatures = [
  {
    icon: TrendingUp,
    title: "Expert-Led Discussions",
    description: "Learn from healthcare professionals and industry experts",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connect with health enthusiasts from around the world",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Heart,
    title: "Peer Support",
    description: "Get support and encouragement from fellow community members",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Zap,
    title: "Early Access",
    description: "Be the first to try new features and provide feedback",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
]

export default function CommunityPage() {
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
                AYUV <span className="text-emerald-400 glow-text">Community</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Join a global community of health enthusiasts, share experiences, learn from experts, and shape the
                future of healthcare technology together
              </p>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityStats.map((stat, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <CardContent className="p-6 text-center">
                    <div
                      className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${stat.bgColor}`}
                    >
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>

            {/* Community Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white text-center mb-8">Why Join Our Community?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communityFeatures.map((feature, index) => (
                  <AnimatedCard key={index} delay={index * 0.1}>
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}
                      >
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-slate-300">{feature.description}</CardDescription>
                    </CardContent>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>

            {/* Discussion Forums */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white text-center mb-8">Discussion Forums</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {forumCategories.map((forum, index) => (
                  <AnimatedCard key={index} delay={index * 0.1}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg text-white">{forum.title}</CardTitle>
                        <Badge variant="outline" className={`border-slate-600 ${forum.color}`}>
                          {forum.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-slate-300">{forum.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>{forum.posts} posts</span>
                        <span>{forum.members} members</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-slate-600 text-slate-300 hover:bg-slate-800/50"
                      >
                        Join Discussion
                      </Button>
                    </CardContent>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white text-center mb-8">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <AnimatedCard key={index} delay={index * 0.1}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                          {event.type}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`${
                            event.status === "Registration Open"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-slate-500/20 text-slate-400"
                          }`}
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-white">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm text-slate-300">
                        <div className="flex items-center justify-between">
                          <span>Date:</span>
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Time:</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Expected:</span>
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                      <Button
                        className={`w-full ${
                          event.status === "Registration Open"
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                            : "bg-slate-600 text-slate-300 cursor-not-allowed"
                        }`}
                        disabled={event.status !== "Registration Open"}
                      >
                        {event.status === "Registration Open" ? "Register Now" : "Coming Soon"}
                      </Button>
                    </CardContent>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-6 pt-12"
            >
              <AnimatedCard>
                <CardHeader>
                  <CardTitle className="text-3xl text-white">Ready to Join Our Community?</CardTitle>
                  <CardDescription className="text-lg text-slate-300">
                    Connect with thousands of health-conscious individuals and healthcare professionals worldwide
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CommunityJoinForm />
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800/50"
                    >
                      Learn More
                    </Button>
                  </div>
                  <p className="text-sm text-slate-400">Free to join • No spam • Unsubscribe anytime</p>
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

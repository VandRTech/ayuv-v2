"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FooterSection } from "@/components/footer-section"
import { SpaceBackground } from "@/components/space-background"
import { motion } from "framer-motion"
import { useState } from "react"
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Send,
  FileText,
  HelpCircle,
  Book,
  Users,
  ExternalLink,
  CheckCircle,
} from "lucide-react"

const supportOptions = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email with detailed responses",
    contact: "support@ayuv.health",
    responseTime: "Within 24 hours",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Real-time assistance during business hours",
    contact: "Available 9 AM - 6 PM PST",
    responseTime: "Immediate",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    status: "Coming Soon",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our support team",
    contact: "+1 (555) 123-4567",
    responseTime: "Business hours",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Get help from the community and experts",
    contact: "community.ayuv.health",
    responseTime: "Varies",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
]

const quickLinks = [
  {
    icon: Book,
    title: "Documentation",
    description: "Comprehensive guides and API documentation",
    link: "/docs",
    category: "Documentation",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Frequently asked questions and answers",
    link: "/help",
    category: "Self-Help",
  },
  {
    icon: FileText,
    title: "Getting Started",
    description: "Step-by-step guide to using AYUV Health",
    link: "/docs/getting-started",
    category: "Documentation",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join discussions with other users",
    link: "/community",
    category: "Community",
  },
]

const commonIssues = [
  {
    title: "Account Setup & Login",
    description: "Issues with creating accounts, logging in, or password reset",
    solutions: ["Check email verification", "Clear browser cache", "Try password reset"],
  },
  {
    title: "Data Integration",
    description: "Problems connecting wearables or importing health records",
    solutions: ["Verify device compatibility", "Check permissions", "Contact device support"],
  },
  {
    title: "Privacy & Consent",
    description: "Questions about data sharing and consent management",
    solutions: ["Review privacy settings", "Check consent history", "Update permissions"],
  },
  {
    title: "Technical Issues",
    description: "App crashes, slow performance, or feature not working",
    solutions: ["Update to latest version", "Restart application", "Check system requirements"],
  },
]

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
    priority: "medium",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
      setIsSubmitted(true)
        setFormData({ name: '', email: '', category: '', subject: '', message: '', priority: 'medium' })
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="relative bg-black min-h-screen">
        <SpaceBackground />
        <div className="relative z-10">
          <Navigation />
          <main className="container py-12 flex items-center justify-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8 max-w-2xl"
            >
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white">Support Request Submitted!</h1>
                <p className="text-xl text-slate-300">
                  Thank you for contacting us. We&apos;ve received your support request and will get back to you within 24
                  hours.
                </p>
              </div>
              <AnimatedCard className="max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">What&apos;s Next?</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    You&apos;ll receive a confirmation email with your ticket number. Our support team will review your
                    request and respond accordingly.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} className="bg-emerald-500 hover:bg-emerald-600">
                    Submit Another Request
                  </Button>
                </CardContent>
              </AnimatedCard>
            </motion.div>
          </main>
        </div>
      </div>
    )
  }

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
                Support <span className="text-emerald-400 glow-text">Center</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Get the help you need with AYUV Health. Our support team is here to assist you with any questions or
                issues.
              </p>
            </div>

            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportOptions.map((option, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${option.bgColor} backdrop-blur-sm`}
                    >
                      <option.icon className={`h-8 w-8 ${option.color}`} />
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <CardTitle className="text-lg text-white">{option.title}</CardTitle>
                      {option.status && (
                        <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
                          {option.status}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <CardDescription className="text-slate-300">{option.description}</CardDescription>
                    <div className="space-y-2">
                      <p className={`text-sm font-medium ${option.color}`}>{option.contact}</p>
                      <p className="text-xs text-slate-400">Response: {option.responseTime}</p>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatedCard delay={0.5}>
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Send className="mr-3 h-6 w-6 text-emerald-400" />
                    Submit a Support Request
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-300">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-slate-300">
                          Category
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="account">Account & Login</SelectItem>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="data">Data Integration</SelectItem>
                            <SelectItem value="privacy">Privacy & Security</SelectItem>
                            <SelectItem value="billing">Billing & Subscription</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority" className="text-slate-300">
                          Priority
                        </Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => handleInputChange("priority", value)}
                        >
                          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-slate-300">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white resize-none"
                        rows={6}
                        placeholder="Please describe your issue in detail..."
                        required
                      />
                    </div>

                    {error && (
                      <div className="p-4 mb-4 rounded bg-red-100 text-red-800 border border-red-300">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Request
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </AnimatedCard>

              {/* Quick Links & Common Issues */}
              <div className="space-y-6">
                <AnimatedCard delay={0.6}>
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Quick Links</CardTitle>
                    <CardDescription className="text-slate-300">
                      Find answers quickly with these helpful resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickLinks.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <link.icon className="h-5 w-5 text-emerald-400" />
                          <div>
                            <h4 className="text-sm font-medium text-white">{link.title}</h4>
                            <p className="text-xs text-slate-400">{link.description}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={link.link}>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={0.7}>
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Common Issues</CardTitle>
                    <CardDescription className="text-slate-300">
                      Quick solutions for frequently reported problems
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {commonIssues.map((issue, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-sm font-medium text-white">{issue.title}</h4>
                        <p className="text-xs text-slate-400">{issue.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {issue.solutions.map((solution, sIndex) => (
                            <Badge key={sIndex} variant="outline" className="text-xs border-slate-600 text-slate-300">
                              {solution}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </AnimatedCard>
              </div>
            </div>

            {/* Business Hours */}
            <AnimatedCard delay={0.8}>
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-emerald-400" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="font-medium text-white mb-2">Email Support</h4>
                    <p className="text-sm text-slate-300">24/7 - Response within 24 hours</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Phone Support</h4>
                    <p className="text-sm text-slate-300">Monday - Friday, 9 AM - 6 PM PST</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Live Chat</h4>
                    <p className="text-sm text-slate-300">Coming Soon - Real-time assistance</p>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </motion.div>
        </main>
        <FooterSection />
      </div>
    </div>
  )
}

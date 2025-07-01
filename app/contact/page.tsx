"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FooterSection } from "@/components/footer-section"
import { SpaceBackground } from "@/components/space-background"
import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', category: '', message: '' })
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
                Get in <span className="text-emerald-400 glow-text">Touch</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Have questions about AYUV Health? We&apos;re here to help. Reach out to our team for support, partnerships,
                or general inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <AnimatedCard delay={0.1}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Mail className="h-6 w-6 text-emerald-400" />
                      <h3 className="text-lg font-semibold text-white">Email Us</h3>
                    </div>
                    <p className="text-slate-300 mb-2">General inquiries</p>
                    <p className="text-emerald-400">hello@ayuv.health</p>
                    <p className="text-slate-300 mt-3 mb-2">Support</p>
                    <p className="text-emerald-400">support@ayuv.health</p>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={0.2}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Phone className="h-6 w-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Call Us</h3>
                    </div>
                    <p className="text-slate-300 mb-2">Business hours</p>
                    <p className="text-blue-400">+1 (555) 123-4567</p>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={0.3}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <MapPin className="h-6 w-6 text-purple-400" />
                      <h3 className="text-lg font-semibold text-white">Visit Us</h3>
                    </div>
                    <p className="text-slate-300">
                      123 Innovation Drive
                      <br />
                      Tech Valley, CA 94000
                      <br />
                      United States
                    </p>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={0.4}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Clock className="h-6 w-6 text-orange-400" />
                      <h3 className="text-lg font-semibold text-white">Business Hours</h3>
                    </div>
                    <div className="space-y-1 text-slate-300">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                      <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <AnimatedCard delay={0.5}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {isSubmitted && (
                        <div className="p-4 mb-4 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Thank you for contacting us! We have received your message.
                        </div>
                      )}
                      {error && (
                        <div className="p-4 mb-4 rounded bg-red-100 text-red-800 border border-red-300">
                          {error}
                        </div>
                      )}
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
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="press">Press & Media</SelectItem>
                            <SelectItem value="careers">Careers</SelectItem>
                          </SelectContent>
                        </Select>
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
                          required
                        />
                      </div>

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
                        Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </AnimatedCard>
              </div>
            </div>
          </motion.div>
        </main>
        <FooterSection />
      </div>
    </div>
  )
}

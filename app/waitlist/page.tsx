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
import { Checkbox } from "@/components/ui/checkbox"
import { FooterSection } from "@/components/footer-section"
import { SpaceBackground } from "@/components/space-background"
import { motion } from "framer-motion"
import { useState } from "react"
import { CheckCircle, Users, Clock, Star } from "lucide-react"
import { supabase } from '@/lib/supabaseClient'

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    organization: "",
    interests: "",
    newsletter: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { firstName, lastName, email, profession, organization, interests, newsletter } = formData

    const { data, error } = await supabase
      .from('waitlist_requests')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          profession,
          organization,
          interests,
          newsletter,
        }
      ])

    if (error) {
      // Handle error (show error message to user)
      console.error('Supabase error:', error)
    } else {
      // Handle success (show thank you message, reset form, etc.)
      setIsSubmitted(true)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
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
              className="text-center space-y-8"
            >
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white">Welcome to the Future!</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  You&apos;re now on the AYUV Health early access list. We&apos;ll notify you as soon as we launch.
                </p>
              </div>
              <AnimatedCard className="max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">What&apos;s Next?</h3>
                  <p className="text-slate-300 text-sm">
                    Keep an eye on your inbox for exclusive updates, beta access invitations, and launch announcements.
                  </p>
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
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">
                Join the <span className="text-emerald-400 glow-text">Early Access</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Be among the first to experience the future of healthcare data management. Get exclusive early access to
                AYUV Health.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Stats */}
              <div className="space-y-6">
                <AnimatedCard delay={0.1}>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">5,000+</div>
                    <p className="text-sm text-slate-400">Early Access Members</p>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={0.2}>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">Q2 2024</div>
                    <p className="text-sm text-slate-400">Expected Launch</p>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={0.3}>
                  <CardContent className="p-6 text-center">
                    <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">Exclusive</div>
                    <p className="text-sm text-slate-400">Beta Features</p>
                  </CardContent>
                </AnimatedCard>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <AnimatedCard delay={0.4}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Reserve Your Spot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-slate-300">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-slate-300">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white"
                            required
                          />
                        </div>
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

                      <div className="space-y-2">
                        <Label htmlFor="profession" className="text-slate-300">
                          Profession
                        </Label>
                        <Select
                          value={formData.profession}
                          onValueChange={(value) => handleInputChange("profession", value)}
                        >
                          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                            <SelectValue placeholder="Select your profession" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="healthcare-provider">Healthcare Provider</SelectItem>
                            <SelectItem value="patient">Patient</SelectItem>
                            <SelectItem value="researcher">Researcher</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organization" className="text-slate-300">
                          Organization (Optional)
                        </Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interests" className="text-slate-300">
                          What interests you most about AYUV?
                        </Label>
                        <Textarea
                          id="interests"
                          value={formData.interests}
                          onChange={(e) => handleInputChange("interests", e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white resize-none"
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                        />
                        <Label htmlFor="newsletter" className="text-sm text-slate-300">
                          Subscribe to our newsletter for updates and health tech insights
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25"
                        size="lg"
                      >
                        Join Early Access
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

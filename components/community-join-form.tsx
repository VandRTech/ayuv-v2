"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Users, Mail, User, Briefcase, MessageSquare, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface CommunityJoinFormProps {
  trigger?: React.ReactNode
  triggerClassName?: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  profession: string
  organization: string
  interests: string[]
  bio: string
  newsletter: boolean
  terms: boolean
}

const interestOptions = [
  "General Health & Wellness",
  "Wearable Technology",
  "Data Privacy & Security",
  "Preventive Care",
  "AI & Health Insights",
  "Healthcare Innovation",
  "Mental Health",
  "Chronic Disease Management",
  "Fitness & Nutrition",
  "Healthcare Policy",
]

export function CommunityJoinForm({ trigger, triggerClassName }: CommunityJoinFormProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [formData, setFormData] = React.useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    organization: "",
    interests: [],
    bio: "",
    newsletter: true,
    terms: false,
  })

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.terms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/community/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          profession: formData.profession,
          organization: formData.organization,
          interests: formData.interests,
          bio: formData.bio,
          newsletter: formData.newsletter,
        }),
      })
      const data = await response.json()
      if (response.ok) {
      setIsSubmitted(true)
      toast({
        title: "Welcome to the Community!",
        description: "Your application has been submitted successfully. We'll be in touch soon!",
      })
      } else {
        toast({
          title: "Submission Failed",
          description: data.error || "There was an error submitting your application. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      profession: "",
      organization: "",
      interests: [],
      bio: "",
      newsletter: true,
      terms: false,
    })
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open && isSubmitted) {
      resetForm()
    }
  }

  const defaultTrigger = (
    <Button className={`bg-emerald-500 hover:bg-emerald-600 text-white ${triggerClassName}`}>
      <Users className="mr-2 h-4 w-4" />
      Join Community
    </Button>
  )

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
        <DialogContent className="max-w-md bg-slate-900 border-slate-700">
          <div className="text-center space-y-6 py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="h-8 w-8 text-white" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">Welcome to AYUV Community!</h3>
              <p className="text-slate-300">
                Thank you for joining our community. You&apos;ll receive a welcome email shortly with next steps.
              </p>
            </div>
            <Button onClick={() => handleOpenChange(false)} className="bg-emerald-500 hover:bg-emerald-600">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white flex items-center">
            <Users className="mr-3 h-6 w-6 text-emerald-400" />
            Join AYUV Community
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Connect with healthcare enthusiasts, share experiences, and stay updated with the latest in health
            technology.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <User className="mr-2 h-5 w-5 text-emerald-400" />
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-slate-300">
                  First Name *
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
                  Last Name *
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
                Email Address *
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

          {/* Professional Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-emerald-400" />
              Professional Background
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profession" className="text-slate-300">
                  Profession *
                </Label>
                <Select value={formData.profession} onValueChange={(value) => handleInputChange("profession", value)}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="healthcare-provider">Healthcare Provider</SelectItem>
                    <SelectItem value="patient">Patient/Health Enthusiast</SelectItem>
                    <SelectItem value="researcher">Researcher</SelectItem>
                    <SelectItem value="developer">Software Developer</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
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
                  placeholder="Hospital, Company, University, etc."
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-emerald-400" />
              Areas of Interest
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={() => handleInterestToggle(interest)}
                  />
                  <Label htmlFor={interest} className="text-sm text-slate-300 cursor-pointer">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-slate-300">
              Tell us about yourself (Optional)
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="bg-slate-800/50 border-slate-700 text-white resize-none"
              rows={3}
              placeholder="Share your background, interests, or what you hope to gain from the community..."
            />
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <Mail className="mr-2 h-5 w-5 text-emerald-400" />
              Communication Preferences
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                />
                <Label htmlFor="newsletter" className="text-sm text-slate-300">
                  Subscribe to our newsletter for community updates and health insights
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) => handleInputChange("terms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-slate-300">
                  I agree to the{" "}
                  <a href="/terms" className="text-emerald-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-emerald-400 hover:underline">
                    Privacy Policy
                  </a>{" "}
                  *
                </Label>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Joining...
                </>
              ) : (
                <>
                  <Users className="mr-2 h-4 w-4" />
                  Join Community
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-800/50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import * as React from "react"
import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { User, Phone, MapPin, Calendar, Shield, FileText, Heart, AlertTriangle, Edit, Save, Camera } from "lucide-react"
import { motion } from "framer-motion"

interface ProfileData {
  personalInfo: {
    firstName: string
    lastName: string
    dateOfBirth: string
    gender: string
    bloodGroup: string
    height: string
    weight: string
    phone: string
    email: string
    address: string
    city: string
    state: string
    pincode: string
  }
  medicalInfo: {
    allergies: string[]
    chronicConditions: string[]
    currentMedications: string[]
    emergencyContact: {
      name: string
      relationship: string
      phone: string
    }
  }
  insuranceInfo: {
    provider: string
    policyNumber: string
    groupNumber: string
    validUntil: string
  }
  healthId: {
    healthId: string
    healthNumber: string
    linkedSince: string
  }
}

const mockProfileData: ProfileData = {
  personalInfo: {
    firstName: "Alex",
    lastName: "Johnson",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    bloodGroup: "O+",
    height: "175 cm",
    weight: "72 kg",
    phone: "+1 555 123 4567",
    email: "alex.johnson@example.com",
    address: "123 Health Street, Medical District",
    city: "New York",
    state: "NY",
    pincode: "10001",
  },
  medicalInfo: {
    allergies: ["Peanuts", "Shellfish"],
    chronicConditions: ["Hypertension"],
    currentMedications: ["Amlodipine 5mg", "Metformin 500mg"],
    emergencyContact: {
      name: "Sarah Johnson",
      relationship: "Spouse",
      phone: "+1 555 123 4568",
    },
  },
  insuranceInfo: {
    provider: "Global Health Insurance",
    policyNumber: "GH123456789",
    groupNumber: "GRP001",
    validUntil: "2025-03-31",
  },
  healthId: {
    healthId: "alex.johnson@healthid",
    healthNumber: "12-3456-7890-1234",
    linkedSince: "2023-01-15",
  },
}

export default function ProfilePage() {
  const [profileData, setProfileData] = React.useState<ProfileData>(mockProfileData)
  const [isEditing, setIsEditing] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsEditing(false)
    setIsSaving(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleInputChange = (section: keyof ProfileData, field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  return (
    <PatientDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-slate-400 mt-2">Manage your personal and medical information</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="border-slate-600 text-slate-300"
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="bg-emerald-500 hover:bg-emerald-600">
                  {isSaving ? (
                    <>
                      <Save className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-emerald-500 hover:bg-emerald-600">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="xl:col-span-1">
            <AnimatedCard delay={0.1}>
              <CardHeader className="text-center pb-6">
                <div className="relative mx-auto mb-6">
                  <Avatar className="h-32 w-32 border-4 border-emerald-500/30">
                    <AvatarImage src="/images/profile-avatar.jpg" alt="Profile" />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-emerald-500 to-blue-600 text-white">
                      {profileData.personalInfo.firstName[0]}
                      {profileData.personalInfo.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 bg-emerald-500 hover:bg-emerald-600"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-2xl text-white">
                  {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
                </CardTitle>
                <CardDescription className="text-base text-slate-400">{profileData.personalInfo.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <Phone className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm font-medium text-white">{profileData.personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm font-medium text-white">
                      {profileData.personalInfo.city}, {profileData.personalInfo.state}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <Calendar className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm font-medium text-white">
                      {new Date(profileData.personalInfo.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <Heart className="h-5 w-5 text-red-400" />
                    <span className="text-sm font-medium text-white">
                      Blood Group: {profileData.personalInfo.bloodGroup}
                    </span>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Personal Information */}
            <AnimatedCard delay={0.2}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-white">
                  <User className="mr-3 h-6 w-6 text-emerald-400" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-300">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={profileData.personalInfo.firstName}
                      onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                      disabled={!isEditing}
                      className="h-11 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-300">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={profileData.personalInfo.lastName}
                      onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                      disabled={!isEditing}
                      className="h-11 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-slate-300">
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange("personalInfo", "dateOfBirth", e.target.value)}
                      disabled={!isEditing}
                      className="h-11 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium text-slate-300">
                      Gender
                    </Label>
                    <Select
                      value={profileData.personalInfo.gender}
                      onValueChange={(value) => handleInputChange("personalInfo", "gender", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="h-11 bg-slate-800/50 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup" className="text-sm font-medium text-slate-300">
                      Blood Group
                    </Label>
                    <Select
                      value={profileData.personalInfo.bloodGroup}
                      onValueChange={(value) => handleInputChange("personalInfo", "bloodGroup", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="h-11 bg-slate-800/50 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.personalInfo.phone}
                      onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                      disabled={!isEditing}
                      className="h-11 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-slate-300">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={`${profileData.personalInfo.address}, ${profileData.personalInfo.city}, ${profileData.personalInfo.state} - ${profileData.personalInfo.pincode}`}
                    disabled={!isEditing}
                    rows={3}
                    className="resize-none bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
              </CardContent>
            </AnimatedCard>

            {/* Medical Information */}
            <AnimatedCard delay={0.3}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-white">
                  <FileText className="mr-3 h-6 w-6 text-emerald-400" />
                  Medical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-300">Allergies</Label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.medicalInfo.allergies.map((allergy, index) => (
                        <Badge
                          key={index}
                          variant="destructive"
                          className="px-3 py-1 bg-red-500/20 text-red-400 border-red-500/30"
                        >
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-300">Chronic Conditions</Label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.medicalInfo.chronicConditions.map((condition, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        >
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-300">Current Medications</Label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.medicalInfo.currentMedications.map((medication, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 border-blue-500/30"
                        >
                          {medication}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div>
                  <Label className="text-lg font-semibold mb-4 block text-white">Emergency Contact</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName" className="text-sm font-medium text-slate-300">
                        Name
                      </Label>
                      <Input
                        id="emergencyName"
                        value={profileData.medicalInfo.emergencyContact.name}
                        disabled={!isEditing}
                        className="h-11 bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelationship" className="text-sm font-medium text-slate-300">
                        Relationship
                      </Label>
                      <Input
                        id="emergencyRelationship"
                        value={profileData.medicalInfo.emergencyContact.relationship}
                        disabled={!isEditing}
                        className="h-11 bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone" className="text-sm font-medium text-slate-300">
                        Phone
                      </Label>
                      <Input
                        id="emergencyPhone"
                        value={profileData.medicalInfo.emergencyContact.phone}
                        disabled={!isEditing}
                        className="h-11 bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>

            {/* Insurance & Health ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedCard delay={0.4}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-white">
                    <Shield className="mr-3 h-6 w-6 text-emerald-400" />
                    Insurance Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider" className="text-sm font-medium text-slate-300">
                      Insurance Provider
                    </Label>
                    <Input
                      id="insuranceProvider"
                      value={profileData.insuranceInfo.provider}
                      disabled={!isEditing}
                      className="h-11 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber" className="text-sm font-medium text-slate-300">
                      Policy Number
                    </Label>
                    <Input
                      id="policyNumber"
                      value={profileData.insuranceInfo.policyNumber}
                      disabled={!isEditing}
                      className="h-11 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validUntil" className="text-sm font-medium text-slate-300">
                      Valid Until
                    </Label>
                    <Input
                      id="validUntil"
                      type="date"
                      value={profileData.insuranceInfo.validUntil}
                      disabled={!isEditing}
                      className="h-11 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.5}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-white">
                    <Shield className="mr-3 h-6 w-6 text-emerald-400" />
                    Health ID Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-300">Health ID</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={profileData.healthId.healthId}
                        disabled
                        className="h-11 bg-slate-800/50 border-slate-700 text-white"
                      />
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      >
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-300">Health Number</Label>
                    <Input
                      value={profileData.healthId.healthNumber}
                      disabled
                      className="h-11 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-300">Linked Since</Label>
                    <Input
                      value={new Date(profileData.healthId.linkedSince).toLocaleDateString()}
                      disabled
                      className="h-11 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </div>
    </PatientDashboardLayout>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Activity,
  Calendar,
  Pill,
  Shield,
  Phone,
  MapPin,
  Clock,
  Upload,
  Bell,
  Users,
  Baby,
  User,
  UserCheck,
} from "lucide-react"
import { familyMembers, type FamilyMember } from "@/lib/caregiver-mock-data"
import { motion } from "framer-motion"

export function FamilyDashboard() {
  const [selectedMember, setSelectedMember] = useState<FamilyMember>(familyMembers[0])

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case "mother":
        return <User className="w-4 h-4 text-pink-400" />
      case "father":
        return <User className="w-4 h-4 text-blue-400" />
      case "daughter":
        return <Baby className="w-4 h-4 text-purple-400" />
      case "grandfather":
        return <UserCheck className="w-4 h-4 text-orange-400" />
      default:
        return <Users className="w-4 h-4 text-slate-400" />
    }
  }

  const getMedicationStatusColor = (status: string) => {
    switch (status) {
      case "taken":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "missed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Family Dashboard</h1>
          <p className="text-slate-400 text-sm sm:text-base">Multi-generation health tracking and management</p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs sm:text-sm">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {familyMembers.length} Family Members
          </Badge>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 text-sm">
            <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Emergency Contacts
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tracking" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700 flex flex-wrap h-auto p-1">
          <TabsTrigger
            value="tracking"
            className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 flex-1 sm:flex-auto text-xs sm:text-sm"
          >
            Multi-Generation Health Tracking
          </TabsTrigger>
          <TabsTrigger
            value="management"
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 flex-1 sm:flex-auto text-xs sm:text-sm"
          >
            Comprehensive Health Management
          </TabsTrigger>
          <TabsTrigger
            value="emergency"
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 flex-1 sm:flex-auto text-xs sm:text-sm"
          >
            Emergency Response for Families
          </TabsTrigger>
        </TabsList>

        {/* Multi-Generation Health Tracking */}
        <TabsContent value="tracking" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Family Members List */}
            <Card className="bg-slate-900/50 border-slate-700 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-white text-base sm:text-lg">Family Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {familyMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedMember.id === member.id
                        ? "bg-emerald-500/20 border border-emerald-500/30"
                        : "bg-slate-800/50 hover:bg-slate-700/50"
                    }`}
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-emerald-500 text-white">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{member.name}</p>
                        <div className="flex items-center space-x-1 text-xs text-slate-400">
                          {getRelationshipIcon(member.relationship)}
                          <p className="truncate">
                            {member.relationship}, {member.age}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Selected Member Details */}
            <div className="lg:col-span-3 space-y-6">
              {/* Member Header */}
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Avatar className="w-16 h-16 shrink-0">
                      <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} alt={selectedMember.name} />
                      <AvatarFallback className="bg-emerald-500 text-white text-lg">
                        {selectedMember.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-white truncate">{selectedMember.name}</h2>
                      <p className="text-slate-400 text-sm sm:text-base">
                        {selectedMember.relationship} • {selectedMember.age} years old
                      </p>
                      {selectedMember.conditions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedMember.conditions.map((condition, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-orange-400 border-orange-500/30 text-xs"
                            >
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vital Signs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedMember.vitals.heartRate && (
                  <Card className="bg-slate-900/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-8 h-8 text-red-400 shrink-0" />
                        <div>
                          <p className="text-slate-400 text-sm">Heart Rate</p>
                          <p className="text-white text-xl font-bold">{selectedMember.vitals.heartRate}</p>
                          <p className="text-slate-500 text-xs">bpm</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedMember.vitals.bloodPressure && (
                  <Card className="bg-slate-900/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-8 h-8 text-blue-400 shrink-0" />
                        <div>
                          <p className="text-slate-400 text-sm">Blood Pressure</p>
                          <p className="text-white text-xl font-bold">
                            {selectedMember.vitals.bloodPressure.systolic}/
                            {selectedMember.vitals.bloodPressure.diastolic}
                          </p>
                          <p className="text-slate-500 text-xs">mmHg</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedMember.vitals.steps && (
                  <Card className="bg-slate-900/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-8 h-8 text-green-400 shrink-0" />
                        <div>
                          <p className="text-slate-400 text-sm">Steps Today</p>
                          <p className="text-white text-xl font-bold">
                            {selectedMember.vitals.steps?.toLocaleString()}
                          </p>
                          <Progress value={(selectedMember.vitals.steps / 10000) * 100} className="mt-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedMember.vitals.sleep && (
                  <Card className="bg-slate-900/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-8 h-8 text-purple-400 shrink-0" />
                        <div>
                          <p className="text-slate-400 text-sm">Sleep Last Night</p>
                          <p className="text-white text-xl font-bold">{selectedMember.vitals.sleep}h</p>
                          <p className="text-slate-500 text-xs">hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Comprehensive Health Management */}
        <TabsContent value="management" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Medications */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <Pill className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Medications - {selectedMember.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedMember.medications.length > 0 ? (
                  selectedMember.medications.map((medication) => (
                    <div key={medication.id} className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h4 className="text-white font-medium text-sm sm:text-base">{medication.name}</h4>
                        <Badge
                          className={`${getMedicationStatusColor(medication.status)} text-xs sm:text-sm mt-1 sm:mt-0`}
                        >
                          {medication.status}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        {medication.dosage} • {medication.frequency}
                      </p>
                      <p className="text-slate-500 text-xs">Next dose: {medication.nextDose}</p>
                      <p className="text-slate-500 text-xs">Prescribed by: {medication.prescribedBy}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-4 text-sm">No medications recorded</p>
                )}
              </CardContent>
            </Card>

            {/* Appointments */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedMember.appointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="text-white font-medium text-sm sm:text-base">{appointment.type}</h4>
                      <Badge
                        variant="outline"
                        className="text-blue-400 border-blue-500/30 text-xs sm:text-sm mt-1 sm:mt-0"
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      {appointment.doctor} • {appointment.specialty}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {appointment.date} at {appointment.time}
                    </p>
                    <p className="text-slate-500 text-xs">{appointment.location}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Vaccinations */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Vaccination Records
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedMember.vaccinations.map((vaccination) => (
                  <div key={vaccination.id} className="p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="text-white font-medium text-sm sm:text-base">{vaccination.vaccine}</h4>
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-500/30 text-xs sm:text-sm mt-1 sm:mt-0"
                      >
                        Complete
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm">Given: {vaccination.date}</p>
                    {vaccination.nextDue && <p className="text-slate-500 text-xs">Next due: {vaccination.nextDue}</p>}
                    <p className="text-slate-500 text-xs">Provider: {vaccination.provider}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Medical Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 text-sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Medical Report
                </Button>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 text-sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Prescription
                </Button>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 text-sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Test Results
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Emergency Response */}
        <TabsContent value="emergency" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Emergency Contacts */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Emergency Contacts - {selectedMember.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedMember.emergencyContacts.map((contact) => (
                  <div key={contact.id} className="p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="text-white font-medium text-sm sm:text-base">{contact.name}</h4>
                        <p className="text-slate-400 text-xs sm:text-sm">{contact.relationship}</p>
                        <p className="text-slate-500 text-xs">{contact.phone}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-emerald-400 border-emerald-500/30 text-xs sm:text-sm mt-2 sm:mt-0"
                      >
                        Priority {contact.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Detection Status */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Emergency Detection Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium text-sm">All Systems Normal</span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Emergency detection active for all family members
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-medium text-sm sm:text-base">Emergency Features:</h4>
                  <ul className="space-y-1 text-slate-400 text-xs sm:text-sm list-disc pl-5">
                    <li>Fall detection with automatic alerts</li>
                    <li>Heart rate anomaly detection</li>
                    <li>Location sharing in emergencies</li>
                    <li>Medical history access for first responders</li>
                    <li>Family notification system</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Family Location Sharing */}
            <Card className="bg-slate-900/50 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Family Location Sharing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {familyMembers.map((member) => (
                    <div key={member.id} className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 shrink-0">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="bg-emerald-500 text-white">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{member.name}</p>
                          <div className="flex items-center space-x-1 text-xs text-slate-400">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <p className="truncate">Home • 2 min ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 shrink-0">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 text-xs">Safe</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

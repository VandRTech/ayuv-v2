"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Activity,
  Thermometer,
  Shield,
  Phone,
  Clock,
  AlertTriangle,
  Users,
  MessageSquare,
  Stethoscope,
  Bell,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { elderlyResidents, type ElderlyResident } from "@/lib/caregiver-mock-data"
import { motion } from "framer-motion"

const getCareLevelColor = (level: string) => {
  switch (level) {
    case "independent":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "assisted":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "memory":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "skilled":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-500/30"
  }
}

const getRiskColor = (hasRisk: boolean) => {
  return hasRisk ? "text-red-400" : "text-green-400"
}

export function EldercareDashboard() {
  const [selectedResident, setSelectedResident] = useState<ElderlyResident>(elderlyResidents[0])
  const [selectedCareLevel, setSelectedCareLevel] = useState<string>("all")

  const filteredResidents = elderlyResidents.filter(
    (resident) => selectedCareLevel === "all" || resident.careLevel === selectedCareLevel,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Eldercare Dashboard</h1>
          <p className="text-slate-400 text-sm sm:text-base">24/7 non-invasive monitoring and care coordination</p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs sm:text-sm">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {elderlyResidents.length} Residents
          </Badge>
          <Badge variant="outline" className="text-yellow-400 border-yellow-500/30 text-xs sm:text-sm">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {elderlyResidents.filter((r) => r.alerts.length > 0).length} Active Alerts
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700 flex flex-wrap h-auto p-1">
          <TabsTrigger
            value="monitoring"
            className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 flex-1 sm:flex-auto text-xs sm:text-sm"
          >
            24/7 Non-Invasive Monitoring
          </TabsTrigger>
          <TabsTrigger
            value="nursing"
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 flex-1 sm:flex-auto text-xs sm:text-sm"
          >
            Nursing Station Integration
          </TabsTrigger>
          <TabsTrigger
            value="communication"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 flex-1 sm:flex-auto text-xs sm:text-sm"
          >
            Caregiver Communication
          </TabsTrigger>
        </TabsList>

        {/* 24/7 Non-Invasive Monitoring */}
        <TabsContent value="monitoring" className="space-y-6">
          {/* Care Level Filter */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="text-white font-medium text-sm">Filter by Care Level:</span>
                <Select value={selectedCareLevel} onValueChange={setSelectedCareLevel}>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-600 text-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 text-white">
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="independent">Independent Living</SelectItem>
                    <SelectItem value="assisted">Assisted Living</SelectItem>
                    <SelectItem value="memory">Memory Care</SelectItem>
                    <SelectItem value="skilled">Skilled Nursing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Residents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResidents.map((resident, index) => (
              <motion.div
                key={resident.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="bg-slate-900/50 border-slate-700 hover:border-emerald-500/30 transition-all cursor-pointer"
                  onClick={() => setSelectedResident(resident)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-base sm:text-lg">{resident.name}</CardTitle>
                        <p className="text-slate-400 text-xs sm:text-sm">
                          Room {resident.room} • Age {resident.age}
                        </p>
                      </div>
                      <Badge className={`${getCareLevelColor(resident.careLevel)} text-xs sm:text-sm`}>
                        {resident.careLevel.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Vital Signs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-400 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400">Heart Rate</p>
                          <p className="text-sm font-medium text-white">{resident.vitals.heartRate} bpm</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-400 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400">BP</p>
                          <p className="text-sm font-medium text-white">
                            {resident.vitals.bloodPressure.systolic}/{resident.vitals.bloodPressure.diastolic}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-orange-400 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400">Temp</p>
                          <p className="text-sm font-medium text-white">{resident.vitals.temperature}°F</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-green-400 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400">Activity</p>
                          <p className="text-sm font-medium text-white">{resident.vitals.activity}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Safety Status */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">Fall Risk:</span>
                        <span className={`text-xs font-medium ${getRiskColor(resident.safety.fallRisk)}`}>
                          {resident.safety.fallRisk ? "HIGH" : "LOW"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">Wander Risk:</span>
                        <span className={`text-xs font-medium ${getRiskColor(resident.safety.wanderRisk)}`}>
                          {resident.safety.wanderRisk ? "HIGH" : "LOW"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">Location:</span>
                        <span className="text-xs text-white">{resident.safety.location}</span>
                      </div>
                    </div>

                    {/* Alerts */}
                    {resident.alerts.length > 0 && (
                      <div className="space-y-1">
                        {resident.alerts.slice(0, 1).map((alert) => (
                          <div
                            key={alert.id}
                            className="flex items-center space-x-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded"
                          >
                            <Bell className="w-3 h-3 text-yellow-400 shrink-0" />
                            <p className="text-xs text-slate-300 flex-1">{alert.message}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Last Movement */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Last movement: {resident.safety.lastMovement}</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Monitored</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Nursing Station Integration */}
        <TabsContent value="nursing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daily Overview */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Daily Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Morning Rounds</span>
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Medication Distribution</span>
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Afternoon Rounds</span>
                    <Clock className="w-5 h-5 text-yellow-400 shrink-0" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Evening Rounds</span>
                    <XCircle className="w-5 h-5 text-slate-500 shrink-0" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medication Schedule */}
            <Card className="bg-slate-900/50 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white text-base sm:text-lg">
                  Medication Schedule - {selectedResident.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedResident.medications.map((medication) => (
                  <div
                    key={medication.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">{medication.name}</p>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        {medication.dosage} • {medication.frequency}
                      </p>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <p className="text-slate-300 text-sm">{medication.nextDose}</p>
                      <Badge
                        className={`text-xs sm:text-sm ${
                          medication.status === "taken"
                            ? "bg-green-500/20 text-green-400"
                            : medication.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {medication.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Care Notes */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg">
                Recent Care Notes - {selectedResident.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedResident.careNotes.map((note) => (
                <div key={note.id} className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <span className="text-white font-medium text-sm sm:text-base">{note.caregiver}</span>
                    <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                      <Badge variant="outline" className="text-blue-400 border-blue-500/30 text-xs sm:text-sm">
                        {note.type}
                      </Badge>
                      <span className="text-slate-500 text-sm">{note.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm">{note.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Infection Monitoring */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-base sm:text-lg">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Infection Symptom Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-medium text-sm">No Symptoms</p>
                  <p className="text-slate-400 text-xs">
                    {elderlyResidents.filter((r) => r.vitals.temperature < 99).length} residents
                  </p>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-yellow-400 font-medium text-sm">Monitoring</p>
                  <p className="text-slate-400 text-xs">
                    {elderlyResidents.filter((r) => r.vitals.temperature >= 99 && r.vitals.temperature < 100).length}{" "}
                    residents
                  </p>
                </div>
                <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-red-400 font-medium text-sm">Fever Alert</p>
                  <p className="text-slate-400 text-xs">
                    {elderlyResidents.filter((r) => r.vitals.temperature >= 100).length} residents
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Caregiver Communication */}
        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Family Communication */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Family Communication Groups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {elderlyResidents.map((resident) => (
                  <div key={resident.id} className="p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="text-white font-medium text-sm sm:text-base">{resident.name} Family Group</h4>
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-500/30 text-xs sm:text-sm mt-1 sm:mt-0"
                      >
                        Active
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {resident.family.map((contact) => (
                        <div key={contact.id} className="flex items-center space-x-2">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-slate-300 text-sm">
                            {contact.name} ({contact.relationship})
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs sm:text-sm"
                    >
                      Send Update
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Vital Sign Alerts</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full shrink-0"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Medication Reminders</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full shrink-0"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Fall Detection</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full shrink-0"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Family Updates</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full shrink-0"></div>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 text-sm">
                  Configure Notifications
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp Integration */}
            <Card className="bg-slate-900/50 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  WhatsApp Integration Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                      <span className="text-green-400 font-medium text-sm">Connected</span>
                    </div>
                    <p className="text-slate-300 text-sm">Family groups active for all residents</p>
                    <p className="text-slate-400 text-xs mt-1">Last sync: 2 minutes ago</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bell className="w-5 h-5 text-blue-400 shrink-0" />
                      <span className="text-blue-400 font-medium text-sm">Non-Intrusive Mode</span>
                    </div>
                    <p className="text-slate-300 text-sm">100% privacy-compliant notifications</p>
                    <p className="text-slate-400 text-xs mt-1">HIPAA compliant messaging</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

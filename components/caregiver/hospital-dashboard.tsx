"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Activity,
  Thermometer,
  Droplets,
  AlertTriangle,
  Filter,
  Search,
  TrendingUp,
  Users,
  Stethoscope,
} from "lucide-react"
import { hospitalPatients, type Patient } from "@/lib/caregiver-mock-data"
import { motion } from "framer-motion"

export function HospitalDashboard() {
  const [selectedUnit, setSelectedUnit] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const filteredPatients = hospitalPatients.filter((patient) => {
    const matchesUnit = selectedUnit === "all" || patient.unit === selectedUnit
    const matchesSeverity = selectedSeverity === "all" || patient.severity === selectedSeverity
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.room?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesUnit && matchesSeverity && matchesSearch
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getNewsScoreColor = (score: number) => {
    if (score <= 2) return "text-green-400"
    if (score <= 4) return "text-yellow-400"
    if (score <= 6) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Hospital Dashboard</h1>
          <p className="text-slate-400 text-sm sm:text-base">Centralized patient monitoring and early warning system</p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs sm:text-sm">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {hospitalPatients.length} Patients
          </Badge>
          <Badge variant="outline" className="text-red-400 border-red-500/30 text-xs sm:text-sm">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {hospitalPatients.filter((p) => p.alerts.some((a) => !a.acknowledged)).length} Active Alerts
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700 flex flex-wrap h-auto p-1">
          <TabsTrigger
            value="monitoring"
            className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 flex-1 sm:flex-auto text-xs sm:text-sm"
          >
            Centralized Patient Monitoring
          </TabsTrigger>
          <TabsTrigger
            value="ews"
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 flex-1 sm:flex-auto text-xs sm:text-sm"
          >
            EWS Dashboard Integration
          </TabsTrigger>
          <TabsTrigger
            value="accuracy"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 flex-1 sm:flex-auto text-xs sm:text-sm"
          >
            Multi-Parameter Accuracy
          </TabsTrigger>
        </TabsList>

        {/* Centralized Patient Monitoring */}
        <TabsContent value="monitoring" className="space-y-6">
          {/* Filters */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-base sm:text-lg">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Patient Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-600 text-white text-sm"
                  />
                </div>
                <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white text-sm">
                    <SelectValue placeholder="Select Unit" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 text-white">
                    <SelectItem value="all">All Units</SelectItem>
                    <SelectItem value="ICU">ICU</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Geriatrics">Geriatrics</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white text-sm">
                    <SelectValue placeholder="Select Severity" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 text-white">
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 text-sm">
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Patient Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="bg-slate-900/50 border-slate-700 hover:border-emerald-500/30 transition-all cursor-pointer"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-base sm:text-lg">{patient.name}</CardTitle>
                        <p className="text-slate-400 text-xs sm:text-sm">
                          {patient.room} • {patient.unit}
                        </p>
                      </div>
                      <Badge className={`${getSeverityColor(patient.severity)} text-xs sm:text-sm`}>
                        {patient.severity.toUpperCase()}
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
                          <p className="text-sm font-medium text-white">{patient.vitals.heartRate} bpm</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-400 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400">BP</p>
                          <p className="text-sm font-medium text-white">
                            {patient.vitals.bloodPressure.systolic}/{patient.vitals.bloodPressure.diastolic}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-orange-400 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400">Temp</p>
                          <p className="text-sm font-medium text-white">{patient.vitals.temperature}°F</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400">SpO2</p>
                          <p className="text-sm font-medium text-white">{patient.vitals.spO2}%</p>
                        </div>
                      </div>
                    </div>

                    {/* NEWS Score */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">NEWS Score:</span>
                      <span className={`text-lg font-bold ${getNewsScoreColor(patient.newsScore)}`}>
                        {patient.newsScore}
                      </span>
                    </div>

                    {/* Alerts */}
                    {patient.alerts.length > 0 && (
                      <div className="space-y-2">
                        {patient.alerts.slice(0, 2).map((alert) => (
                          <div key={alert.id} className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                            <p className="text-xs text-slate-300 flex-1">{alert.message}</p>
                            <span className="text-xs text-slate-500 shrink-0">{alert.timestamp}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Last Update */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Last update: {patient.lastUpdate}</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Live</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* EWS Dashboard Integration */}
        <TabsContent value="ews" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* EWS Overview */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  EWS Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Low Risk (0-2)</span>
                    <Badge className="bg-green-500/20 text-green-400 text-sm">
                      {hospitalPatients.filter((p) => p.newsScore <= 2).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Medium Risk (3-4)</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 text-sm">
                      {hospitalPatients.filter((p) => p.newsScore >= 3 && p.newsScore <= 4).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">High Risk (5-6)</span>
                    <Badge className="bg-orange-500/20 text-orange-400 text-sm">
                      {hospitalPatients.filter((p) => p.newsScore >= 5 && p.newsScore <= 6).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Critical (7+)</span>
                    <Badge className="bg-red-500/20 text-red-400 text-sm">
                      {hospitalPatients.filter((p) => p.newsScore >= 7).length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Critical Patients */}
            <Card className="bg-slate-900/50 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-400" />
                  Critical Patients (NEWS ≥ 7)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hospitalPatients
                    .filter((p) => p.newsScore >= 7)
                    .map((patient) => (
                      <div
                        key={patient.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <div>
                          <p className="text-white font-medium text-sm sm:text-base">{patient.name}</p>
                          <p className="text-slate-400 text-xs sm:text-sm">
                            {patient.room} • {patient.condition}
                          </p>
                        </div>
                        <div className="text-left sm:text-right mt-2 sm:mt-0">
                          <p className="text-red-400 font-bold text-base sm:text-lg">NEWS: {patient.newsScore}</p>
                          <p className="text-slate-400 text-xs sm:text-sm">{patient.lastUpdate}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* EWS Trends */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-base sm:text-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                NEWS Score Trends (Last 24 Hours)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                <p>Interactive NEWS score trend chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Multi-Parameter Accuracy */}
        <TabsContent value="accuracy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Device Status */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-base sm:text-lg">Aegis Device Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hospitalPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">{patient.deviceId}</p>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        {patient.name} • {patient.room}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Accuracy Metrics */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-base sm:text-lg">Monitoring Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Heart Rate Accuracy</span>
                    <span className="text-green-400 font-medium text-sm">99.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">SpO2 Accuracy</span>
                    <span className="text-green-400 font-medium text-sm">98.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Temperature Accuracy</span>
                    <span className="text-green-400 font-medium text-sm">99.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Motion Artifact Reduction</span>
                    <span className="text-green-400 font-medium text-sm">95.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historical Data */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg">Historical Vital Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                <p>Multi-parameter historical data visualization would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

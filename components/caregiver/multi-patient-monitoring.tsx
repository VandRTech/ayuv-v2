"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, AlertTriangle, Heart, Activity, Phone } from "lucide-react"
import { PatientCard } from "./patient-card"
import { AlertsOverview } from "./alerts-overview"
import { mockMultiPatientData } from "@/lib/multi-patient-mock-data"

export function MultiPatientMonitoring() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterUnit, setFilterUnit] = useState("all")

  const { patients, alerts, summary } = mockMultiPatientData

  // Filter patients based on search and filters
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus
    const matchesUnit = filterUnit === "all" || patient.unit === filterUnit

    return matchesSearch && matchesStatus && matchesUnit
  })

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary" />
            Multi-Patient Monitoring
          </h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Real-time overview of all patients under care</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-gray-700 text-sm">
            <Phone className="h-4 w-4 mr-2" />
            Emergency Contact
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#131f2e] border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Patients</p>
                <p className="text-2xl font-bold text-white">{summary.totalPatients}</p>
              </div>
              <Users className="h-8 w-8 text-primary shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#131f2e] border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-500">{summary.criticalAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#131f2e] border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Stable Patients</p>
                <p className="text-2xl font-bold text-green-500">{summary.stablePatients}</p>
              </div>
              <Heart className="h-8 w-8 text-green-500 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#131f2e] border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Monitoring</p>
                <p className="text-2xl font-bold text-yellow-500">{summary.monitoringPatients}</p>
              </div>
              <Activity className="h-8 w-8 text-yellow-500 shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Overview */}
      <AlertsOverview alerts={alerts} />

      {/* Filters and Search */}
      <Card className="bg-[#131f2e] border-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-white">Patient Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search patients by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#0e1621] border-gray-700 text-white text-sm"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48 bg-[#0e1621] border-gray-700 text-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0e1621] border-gray-700 text-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterUnit} onValueChange={setFilterUnit}>
              <SelectTrigger className="w-full sm:w-48 bg-[#0e1621] border-gray-700 text-sm">
                <SelectValue placeholder="Filter by unit" />
              </SelectTrigger>
              <SelectContent className="bg-[#0e1621] border-gray-700 text-white">
                <SelectItem value="all">All Units</SelectItem>
                <SelectItem value="ICU">ICU</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Patient Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm">No patients found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

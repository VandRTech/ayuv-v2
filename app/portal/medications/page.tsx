"use client"

import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pill, Clock, Plus, AlertTriangle, CheckCircle, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  nextDose: string
  instructions?: string
  status: "due" | "upcoming" | "taken" | "overdue"
  prescribedBy: string
  startDate: string
  endDate?: string
}

const mockMedications: Medication[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    nextDose: "Today, 8:00 AM",
    instructions: "Take with food",
    status: "taken",
    prescribedBy: "Dr. Sarah Wilson",
    startDate: "2024-01-01",
    endDate: "2024-06-01",
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    nextDose: "Today, 2:00 PM",
    instructions: "Take after meals",
    status: "due",
    prescribedBy: "Dr. Michael Chen",
    startDate: "2024-01-15",
  },
  {
    id: "3",
    name: "Vitamin D3",
    dosage: "1000 IU",
    frequency: "Once daily",
    nextDose: "Tomorrow, 8:00 AM",
    status: "upcoming",
    prescribedBy: "Dr. Sarah Wilson",
    startDate: "2024-01-01",
  },
  {
    id: "4",
    name: "Omega-3",
    dosage: "1000mg",
    frequency: "Once daily",
    nextDose: "Yesterday, 8:00 PM",
    status: "overdue",
    prescribedBy: "Dr. Sarah Wilson",
    startDate: "2024-01-01",
  },
]

export default function MedicationsPage() {
  const [medications, setMedications] = useState(mockMedications)

  const handleMarkAsTaken = (id: string) => {
    setMedications((prev) => prev.map((med) => (med.id === id ? { ...med, status: "taken" as const } : med)))
  }

  const getStatusColor = (status: Medication["status"]) => {
    switch (status) {
      case "due":
        return "text-yellow-500 bg-yellow-500/20"
      case "overdue":
        return "text-red-500 bg-red-500/20"
      case "upcoming":
        return "text-blue-500 bg-blue-500/20"
      case "taken":
        return "text-green-500 bg-green-500/20"
      default:
        return "text-slate-500 bg-slate-500/20"
    }
  }

  const getStatusIcon = (status: Medication["status"]) => {
    switch (status) {
      case "due":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4" />
      case "taken":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const dueMedications = medications.filter((med) => med.status === "due" || med.status === "overdue")
  const allMedications = medications

  return (
    <PatientDashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Medications
            </h1>
            <p className="text-muted-foreground mt-2">Manage your medications and track adherence</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Medication
          </Button>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <AnimatedCard delay={0.1}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Pill className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Total Medications</span>
              </div>
              <div className="text-2xl font-bold mt-2">{medications.length}</div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Due Today</span>
              </div>
              <div className="text-2xl font-bold mt-2 text-yellow-500">
                {medications.filter((med) => med.status === "due").length}
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium">Overdue</span>
              </div>
              <div className="text-2xl font-bold mt-2 text-red-500">
                {medications.filter((med) => med.status === "overdue").length}
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Taken Today</span>
              </div>
              <div className="text-2xl font-bold mt-2 text-green-500">
                {medications.filter((med) => med.status === "taken").length}
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        <Tabs defaultValue="due" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="due">Due & Overdue</TabsTrigger>
            <TabsTrigger value="all">All Medications</TabsTrigger>
          </TabsList>

          <TabsContent value="due" className="space-y-4">
            {dueMedications.length === 0 ? (
              <AnimatedCard delay={0.5}>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No medications are due right now.</p>
                </CardContent>
              </AnimatedCard>
            ) : (
              dueMedications.map((medication, index) => (
                <AnimatedCard key={medication.id} delay={index * 0.1}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          id={`med-${medication.id}`}
                          checked={medication.status === "taken"}
                          onCheckedChange={() => handleMarkAsTaken(medication.id)}
                          disabled={medication.status === "taken"}
                          className="h-5 w-5"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold">{medication.name}</h3>
                            <Badge className={getStatusColor(medication.status)}>
                              {getStatusIcon(medication.status)}
                              <span className="ml-1 capitalize">{medication.status}</span>
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Dosage:</span> {medication.dosage}
                            </div>
                            <div>
                              <span className="font-medium">Frequency:</span> {medication.frequency}
                            </div>
                            <div>
                              <span className="font-medium">Next Dose:</span> {medication.nextDose}
                            </div>
                          </div>
                          {medication.instructions && (
                            <p className="text-sm text-muted-foreground mt-2">
                              <span className="font-medium">Instructions:</span> {medication.instructions}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {allMedications.map((medication, index) => (
              <AnimatedCard key={medication.id} delay={index * 0.1}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold">{medication.name}</h3>
                        <Badge className={getStatusColor(medication.status)}>
                          {getStatusIcon(medication.status)}
                          <span className="ml-1 capitalize">{medication.status}</span>
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Dosage:</span> {medication.dosage}
                        </div>
                        <div>
                          <span className="font-medium">Frequency:</span> {medication.frequency}
                        </div>
                        <div>
                          <span className="font-medium">Prescribed by:</span> {medication.prescribedBy}
                        </div>
                        <div>
                          <span className="font-medium">Start Date:</span>{" "}
                          {new Date(medication.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      {medication.instructions && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <span className="font-medium">Instructions:</span> {medication.instructions}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PatientDashboardLayout>
  )
}

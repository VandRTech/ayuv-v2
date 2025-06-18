"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Pill } from "lucide-react"
import Link from "next/link"

interface Medication {
  id: string
  name: string
  dosage: string
  nextDoseTime: string
  instructions?: string
  status: "due" | "upcoming" | "taken" | "overdue"
}

interface MedicationsWidgetProps {
  medications: Medication[]
  isLoading: boolean
}

export function MedicationsWidget({ medications: initialMedications, isLoading }: MedicationsWidgetProps) {
  const [medications, setMedications] = useState(initialMedications)

  const handleMarkAsTaken = (id: string) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, status: "taken" as const } : med)))
  }

  const getStatusColor = (status: Medication["status"]) => {
    switch (status) {
      case "due":
        return "text-yellow-400"
      case "overdue":
        return "text-red-500"
      case "upcoming":
        return "text-slate-400"
      case "taken":
        return "text-green-500"
      default:
        return "text-slate-400"
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-[#131f2e] border-gray-800 min-h-[250px]">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-sm" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24 mt-1" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#131f2e] border-gray-800 min-h-[250px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white flex items-center">
          <Pill className="h-5 w-5 mr-2 text-primary" />
          Medication Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {medications.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-slate-400">No medication reminders</p>
            <Link href="/medications/add" className="text-primary text-sm hover:underline mt-2 inline-block">
              Add medication
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {medications.map((medication) => (
              <div key={medication.id} className="flex items-start gap-3">
                <Checkbox
                  id={`med-${medication.id}`}
                  checked={medication.status === "taken"}
                  onCheckedChange={() => handleMarkAsTaken(medication.id)}
                  className="mt-1"
                  disabled={medication.status === "taken" || medication.status === "upcoming"}
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <label
                      htmlFor={`med-${medication.id}`}
                      className={`text-white font-medium ${medication.status === "taken" ? "line-through opacity-70" : ""}`}
                    >
                      {medication.name}
                    </label>
                    <span className={`text-xs ${getStatusColor(medication.status)}`}>
                      {medication.status === "taken" ? "Taken" : `Next: ${medication.nextDoseTime}`}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{medication.dosage}</p>
                  {medication.instructions && <p className="text-xs text-slate-500 mt-1">{medication.instructions}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Link href="/medications" className="text-sm text-primary hover:underline w-full text-center">
          View All Medications
        </Link>
      </CardFooter>
    </Card>
  )
}

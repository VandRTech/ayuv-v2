import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Thermometer,
  Activity,
  MapPin,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import Link from "next/link"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  unit: string
  room: string
  status: "stable" | "monitoring" | "critical"
  lastUpdate: string
  vitals: {
    heartRate: { value: number; status: string; trend?: "up" | "down" | "stable" }
    bloodPressure: { systolic: number; diastolic: number; status: string }
    temperature: { value: number; status: string; trend?: "up" | "down" | "stable" }
    oxygenSaturation: { value: number; status: string }
  }
  alerts: number
  avatar?: string
}

interface PatientCardProps {
  patient: Patient
}

export function PatientCard({ patient }: PatientCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-500/20 text-green-500"
      case "monitoring":
        return "bg-yellow-500/20 text-yellow-500"
      case "critical":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-slate-500/20 text-slate-500"
    }
  }

  const getVitalStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "text-green-500"
      case "Monitor":
        return "text-yellow-500"
      case "High":
      case "Critical":
        return "text-red-500"
      case "Low":
        return "text-blue-500"
      default:
        return "text-slate-400"
    }
  }

  const renderTrend = (trend?: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-red-500 shrink-0" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-green-500 shrink-0" />
      case "stable":
        return <Minus className="h-3 w-3 text-slate-500 shrink-0" />
      default:
        return null
    }
  }

  return (
    <Card className="bg-[#0e1621] border-gray-800 hover:bg-[#1a2736] transition-colors">
      <CardContent className="p-4">
        {/* Patient Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-base truncate">{patient.name}</h3>
              <p className="text-sm text-slate-400 truncate">
                {patient.age}y • {patient.gender} • ID: {patient.id}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1 shrink-0">
            <Badge className={`${getStatusColor(patient.status)} text-xs`}>
              {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
            </Badge>
            {patient.alerts > 0 && (
              <div className="flex items-center text-red-500">
                <AlertTriangle className="h-3 w-3 mr-1 shrink-0" />
                <span className="text-xs">{patient.alerts}</span>
              </div>
            )}
          </div>
        </div>

        {/* Location Info */}
        <div className="flex flex-wrap items-center text-sm text-slate-400 mb-4 gap-x-4 gap-y-2">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 shrink-0" />
            <span>
              {patient.unit} - Room {patient.room}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 shrink-0" />
            <span>{patient.lastUpdate}</span>
          </div>
        </div>

        {/* Vitals Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center justify-between p-2 bg-[#131f2e] rounded">
            <div className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-2 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">HR</p>
                <div className="flex items-center">
                  <p className={`text-sm font-medium ${getVitalStatusColor(patient.vitals.heartRate.status)}`}>
                    {patient.vitals.heartRate.value}
                  </p>
                  {renderTrend(patient.vitals.heartRate.trend)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-[#131f2e] rounded">
            <div className="flex items-center">
              <Thermometer className="h-4 w-4 text-blue-500 mr-2 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Temp</p>
                <div className="flex items-center">
                  <p className={`text-sm font-medium ${getVitalStatusColor(patient.vitals.temperature.status)}`}>
                    {patient.vitals.temperature.value}°F
                  </p>
                  {renderTrend(patient.vitals.temperature.trend)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-[#131f2e] rounded">
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-purple-500 mr-2 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">BP</p>
                <p className={`text-sm font-medium ${getVitalStatusColor(patient.vitals.bloodPressure.status)}`}>
                  {patient.vitals.bloodPressure.systolic}/{patient.vitals.bloodPressure.diastolic}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-[#131f2e] rounded">
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-green-500 mr-2 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">SpO2</p>
                <p className={`text-sm font-medium ${getVitalStatusColor(patient.vitals.oxygenSaturation.status)}`}>
                  {patient.vitals.oxygenSaturation.value}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-xs sm:text-sm" asChild>
            <Link href={`/portal/patient/${patient.id}`}>View Details</Link>
          </Button>
          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-xs sm:text-sm" asChild>
            <Link href={`/portal/patient/${patient.id}/vitals`}>Monitor</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

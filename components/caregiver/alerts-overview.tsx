import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Bell } from "lucide-react"

interface Alert {
  id: string
  patientId: string
  patientName: string
  type: "critical" | "warning" | "info"
  message: string
  timestamp: string
  acknowledged: boolean
  unit: string
  room: string
}

interface AlertsOverviewProps {
  alerts: Alert[]
}

export function AlertsOverview({ alerts }: AlertsOverviewProps) {
  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "info":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-500 border-slate-500/30"
    }
  }

  const criticalAlerts = alerts.filter((alert) => alert.type === "critical" && !alert.acknowledged)
  const recentAlerts = alerts.slice(0, 5)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Critical Alerts */}
      <Card className="bg-[#131f2e] border-gray-800 lg:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500 shrink-0" />
            Critical Alerts ({criticalAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {criticalAlerts.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-slate-400 text-sm">No critical alerts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)} bg-opacity-10`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center space-x-2 mb-1">
                        <Badge className={`${getAlertColor(alert.type)} text-xs shrink-0`}>
                          {alert.type.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-white font-medium truncate">{alert.patientName}</span>
                        <span className="text-xs text-slate-400 truncate">
                          {alert.unit} - Room {alert.room}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">{alert.message}</p>
                      <div className="flex items-center text-xs text-slate-500">
                        <Clock className="h-3 w-3 mr-1 shrink-0" />
                        {alert.timestamp}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-xs sm:text-sm mt-2 sm:mt-0 sm:ml-3 shrink-0"
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-[#131f2e] border-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-white flex items-center">
            <Bell className="h-5 w-5 mr-2 text-primary shrink-0" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-3 p-2 rounded hover:bg-[#1a2736] transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    alert.type === "critical"
                      ? "bg-red-500"
                      : alert.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{alert.patientName}</p>
                  <p className="text-xs text-slate-400 truncate">{alert.message}</p>
                  <p className="text-xs text-slate-500">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

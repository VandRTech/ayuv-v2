import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import Link from "next/link"

interface Vital {
  name: string
  value: string
  unit: string
  timestamp: string
  status: "Normal" | "Monitor" | "High" | "Low"
  trend?: "up" | "down" | "stable"
  historyLink: string
}

interface VitalsWidgetProps {
  vitals: Vital[]
  isLoading: boolean
}

export function VitalsWidget({ vitals, isLoading }: VitalsWidgetProps) {
  // Helper function to determine badge color based on status
  const getBadgeVariant = (status: Vital["status"]) => {
    switch (status) {
      case "Normal":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/20"
      case "Monitor":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20"
      case "High":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/20"
      case "Low":
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/20"
      default:
        return "bg-slate-500/20 text-slate-500 hover:bg-slate-500/20"
    }
  }

  // Helper function to render trend indicator
  const renderTrendIndicator = (trend?: Vital["trend"]) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-red-500" />
      case "down":
        return <ArrowDown className="h-4 w-4 text-green-500" />
      case "stable":
        return <Minus className="h-4 w-4 text-slate-500" />
      default:
        return null
    }
  }

  return (
    <Card className="bg-[#131f2e] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Vitals Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 border border-gray-800 rounded-lg">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="mt-3">
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-3 w-32 mt-2" />
              </div>
            ))}
          </div>
        ) : vitals.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-slate-400">No vital data available</p>
            <Link href="/vitals/add" className="text-primary text-sm hover:underline mt-2 inline-block">
              Add your first vital reading
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {vitals.map((vital) => (
              <Link
                href={vital.historyLink}
                key={vital.name}
                className="block p-4 border border-gray-800 rounded-lg hover:bg-[#1a2736] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm text-slate-400">{vital.name}</span>
                  <Badge className={`${getBadgeVariant(vital.status)} font-normal`}>{vital.status}</Badge>
                </div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-2xl font-bold text-white">{vital.value}</span>
                  <span className="text-sm text-slate-400 ml-1">{vital.unit}</span>
                  {vital.trend && <span className="ml-2">{renderTrendIndicator(vital.trend)}</span>}
                </div>
                <span className="text-xs text-slate-500 mt-1 block">{vital.timestamp}</span>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

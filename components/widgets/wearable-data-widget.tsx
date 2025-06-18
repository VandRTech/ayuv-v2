import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { BedDouble, Flame, Footprints } from "lucide-react"
import Link from "next/link"

interface WearableData {
  steps: { current: number; goal: number }
  sleep: { duration: string; hours: number; goal: number }
  activeMinutes: { current: number; goal: number }
  activityLink: string
}

interface WearableDataWidgetProps {
  wearableData: WearableData
  isLoading: boolean
}

export function WearableDataWidget({ wearableData, isLoading }: WearableDataWidgetProps) {
  if (isLoading) {
    return (
      <Card className="bg-[#131f2e] border-gray-800">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#131f2e] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Daily Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Link href={wearableData.activityLink} className="block">
          <div className="space-y-2 p-3 rounded-md hover:bg-[#1a2736] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Footprints className="text-primary h-5 w-5 mr-2" />
                <span className="text-sm text-slate-400">Steps</span>
              </div>
              <span className="text-sm font-medium text-white">
                {wearableData.steps.current.toLocaleString()} / {wearableData.steps.goal.toLocaleString()}
              </span>
            </div>
            <Progress
              value={(wearableData.steps.current / wearableData.steps.goal) * 100}
              className="h-2 bg-slate-700"
              indicatorClassName="bg-primary"
            />
          </div>
        </Link>

        <Link href={wearableData.activityLink} className="block">
          <div className="space-y-2 p-3 rounded-md hover:bg-[#1a2736] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BedDouble className="text-primary h-5 w-5 mr-2" />
                <span className="text-sm text-slate-400">Sleep</span>
              </div>
              <span className="text-sm font-medium text-white">
                {wearableData.sleep.duration} ({wearableData.sleep.hours}/{wearableData.sleep.goal}h)
              </span>
            </div>
            <Progress
              value={(wearableData.sleep.hours / wearableData.sleep.goal) * 100}
              className="h-2 bg-slate-700"
              indicatorClassName="bg-blue-500"
            />
          </div>
        </Link>

        <Link href={wearableData.activityLink} className="block">
          <div className="space-y-2 p-3 rounded-md hover:bg-[#1a2736] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Flame className="text-primary h-5 w-5 mr-2" />
                <span className="text-sm text-slate-400">Active Minutes</span>
              </div>
              <span className="text-sm font-medium text-white">
                {wearableData.activeMinutes.current} / {wearableData.activeMinutes.goal} min
              </span>
            </div>
            <Progress
              value={(wearableData.activeMinutes.current / wearableData.activeMinutes.goal) * 100}
              className="h-2 bg-slate-700"
              indicatorClassName="bg-orange-500"
            />
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

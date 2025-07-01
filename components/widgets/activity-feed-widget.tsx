import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity, CalendarClock, FileText, UserCheck } from "lucide-react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface ActivityItem {
  id: string
  iconName: string
  description: string
  timestamp: string
  link: string
}

interface ActivityFeedWidgetProps {
  activities: ActivityItem[]
  isLoading: boolean
}

export function ActivityFeedWidget({ activities, isLoading }: ActivityFeedWidgetProps) {
  // Map icon names to Lucide components
  const getIcon = (iconName: string): LucideIcon => {
    switch (iconName) {
      case "FileText":
        return FileText
      case "UserCheck":
        return UserCheck
      case "CalendarClock":
        return CalendarClock
      default:
        return Activity
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-[#131f2e] border-gray-800 min-h-[250px]">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-20 mt-1" />
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
        <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-slate-400">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = getIcon(activity.iconName)
              return (
                <Link
                  href={activity.link}
                  key={activity.id}
                  className="flex items-start gap-3 p-2 rounded-md hover:bg-[#1a2736] transition-colors"
                >
                  <div className="bg-[#0e1621] p-2 rounded-full">
                    <IconComponent className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white">{activity.description}</p>
                    <span className="text-xs text-slate-500">{activity.timestamp}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Link href="/activity" className="text-sm text-primary hover:underline w-full text-center">
          View All Activity
        </Link>
      </CardFooter>
    </Card>
  )
}

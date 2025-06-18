"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, Lightbulb, ShieldAlert, TrendingUp } from "lucide-react"
import { useState } from "react"
import type { LucideIcon } from "lucide-react"

interface Insight {
  id: string
  title: string
  description: string
  type: "tip" | "observation" | "reminder"
  iconName?: string
  actionText?: string
  actionLink?: string
}

interface InsightsWidgetProps {
  insights: Insight[]
  isLoading: boolean
}

export function InsightsWidget({ insights, isLoading }: InsightsWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Map icon names to Lucide components
  const getIcon = (type: Insight["type"], iconName?: string): LucideIcon => {
    if (iconName === "ShieldAlert") return ShieldAlert
    if (iconName === "TrendingUp") return TrendingUp

    // Default icons based on type
    switch (type) {
      case "tip":
        return Lightbulb
      case "observation":
        return TrendingUp
      case "reminder":
        return ShieldAlert
      default:
        return Lightbulb
    }
  }

  const nextInsight = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length)
  }

  const prevInsight = () => {
    setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length)
  }

  if (isLoading) {
    return (
      <Card className="bg-[#131f2e] border-gray-800 min-h-[250px]">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-16 w-full mt-3" />
            <div className="flex justify-end mt-3">
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (insights.length === 0) {
    return (
      <Card className="bg-[#131f2e] border-gray-800 min-h-[250px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">AI Health Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-slate-400">No insights available yet</p>
            <p className="text-sm text-slate-500 mt-2">Connect more health data to receive personalized insights</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentInsight = insights[currentIndex]
  const IconComponent = getIcon(currentInsight.type, currentInsight.iconName)

  return (
    <Card className="bg-[#131f2e] border-gray-800 min-h-[250px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">AI Health Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <div className="flex items-center gap-2">
            <IconComponent className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-white">{currentInsight.title}</h3>
          </div>
          <p className="mt-3 text-slate-300">{currentInsight.description}</p>

          {currentInsight.actionText && currentInsight.actionLink && (
            <div className="flex justify-end mt-3">
              <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                <a href={currentInsight.actionLink}>{currentInsight.actionText}</a>
              </Button>
            </div>
          )}
        </div>

        {insights.length > 1 && (
          <div className="flex justify-between items-center mt-3">
            <Button variant="ghost" size="sm" onClick={prevInsight} className="text-slate-400 hover:text-white">
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <div className="text-xs text-slate-500">
              {currentIndex + 1} of {insights.length}
            </div>
            <Button variant="ghost" size="sm" onClick={nextInsight} className="text-slate-400 hover:text-white">
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUp, Share2, CalendarPlus, MessageSquare } from "lucide-react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface QuickAction {
  id: string
  label: string
  icon: string
  link: string
}

interface QuickActionsWidgetProps {
  actions: QuickAction[]
}

export function QuickActionsWidget({ actions }: QuickActionsWidgetProps) {
  // Map icon names to Lucide components
  const getIcon = (iconName: string): LucideIcon => {
    switch (iconName) {
      case "FileUp":
        return FileUp
      case "Share2":
        return Share2
      case "CalendarPlus":
        return CalendarPlus
      case "MessageSquare":
        return MessageSquare
      default:
        return FileUp
    }
  }

  return (
    <Card className="bg-[#131f2e] border-gray-800 min-h-[250px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {actions.map((action) => {
            const IconComponent = getIcon(action.icon)
            return (
              <Button
                key={action.id}
                variant="secondary"
                className="h-auto py-4 flex flex-col items-center gap-2 bg-[#0e1621] hover:bg-[#1a2736] border border-gray-800"
                asChild
              >
                <Link href={action.link}>
                  <IconComponent className="h-5 w-5 text-primary" />
                  <span>{action.label}</span>
                </Link>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

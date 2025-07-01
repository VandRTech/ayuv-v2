import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import Link from "next/link"

interface WelcomeWidgetProps {
  userName: string
  avatarUrl?: string
  profileLink: string
}

export function WelcomeWidget({ userName, avatarUrl, profileLink }: WelcomeWidgetProps) {
  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="flex items-center justify-between bg-[#131f2e] border border-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-primary/30">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={userName} />
          <AvatarFallback className="bg-primary/20 text-primary">{getInitials(userName)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl text-white font-semibold">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-sm text-slate-400">Welcome to your health dashboard</p>
        </div>
      </div>
      <Link href={profileLink} passHref>
        <Button variant="ghost" size="sm" className="text-sm text-primary hover:text-primary hover:bg-primary/10">
          <User className="h-4 w-4 mr-2" />
          My Profile
        </Button>
      </Link>
    </div>
  )
}

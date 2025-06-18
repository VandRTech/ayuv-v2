"use client"

import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react"
import { Marquee } from "@/components/ui/marquee"
import { Badge } from "@/components/ui/badge"

const privacyItems = [
  {
    icon: Shield,
    text: "HIPAA Compliant",
    description: "Full healthcare data protection",
  },
  {
    icon: Lock,
    text: "End-to-End Encryption",
    description: "256-bit AES encryption",
  },
  {
    icon: Eye,
    text: "Zero Data Mining",
    description: "Your data stays private",
  },
  {
    icon: Database,
    text: "Secure Cloud Storage",
    description: "SOC 2 Type II certified",
  },
  {
    icon: UserCheck,
    text: "Consent Management",
    description: "Full control over data sharing",
  },
  {
    icon: FileText,
    text: "Transparent Policies",
    description: "Clear, readable privacy terms",
  },
]

interface PrivacyMarqueeProps {
  speed?: number
  className?: string
  variant?: "default" | "compact"
}

export function PrivacyMarquee({ speed = 60, className, variant = "default" }: PrivacyMarqueeProps) {
  return (
    <Marquee speed={speed} className={className} showControls={true} gradient={true} pauseOnHover={true}>
      {privacyItems.map((item, index) => {
        const Icon = item.icon
        return (
          <div key={index} className={`flex items-center space-x-3 mx-8 ${variant === "compact" ? "py-2" : "py-4"}`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <Badge variant="secondary" className={`mb-1 ${variant === "compact" ? "text-xs" : "text-sm"}`}>
                {item.text}
              </Badge>
              {variant === "default" && <span className="text-xs text-muted-foreground">{item.description}</span>}
            </div>
          </div>
        )
      })}
    </Marquee>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "mn" : "en")
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center space-x-2 ${className}`}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="flex items-center space-x-2 bg-slate-900/50 border-slate-700 hover:bg-slate-800/70 text-white transition-all duration-200"
      >
        <Globe className="w-4 h-4" />
        <div className="flex items-center space-x-1">
          {language === "en" ? (
            <>
              <span className="text-2xl">🇺🇸</span>
              <span className="text-sm font-medium">EN</span>
            </>
          ) : (
            <>
              <span className="text-2xl">🇲🇳</span>
              <span className="text-sm font-medium">MN</span>
            </>
          )}
        </div>
      </Button>
    </motion.div>
  )
}

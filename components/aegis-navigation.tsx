"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, ChevronRight, Shield, Cpu, Settings, Lock, Users, Watch, Network, Zap, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationSections = [
  { id: "overview", label: "Product Overview", icon: Watch },
  { id: "innovation", label: "Core Innovation", icon: Cpu },
  { id: "specifications", label: "Technical Specifications", icon: Settings },
  { id: "privacy", label: "Privacy-First Architecture", icon: Lock },
  { id: "experience", label: "Customer Experience", icon: Users },
  { id: "variants", label: "Product Variants", icon: Watch },
  { id: "integration", label: "Integration Ecosystem", icon: Network },
  { id: "future", label: "Future-Ready Technology", icon: Zap },
]

interface AegisNavigationProps {
  className?: string
}

export function AegisNavigation({ className }: AegisNavigationProps) {
  const [activeSection, setActiveSection] = React.useState("overview")
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const [showScrollTop, setShowScrollTop] = React.useState(false)

  // Track scroll position and active section
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
      setShowScrollTop(scrollTop > 500)

      // Find active section based on scroll position
      const sections = navigationSections
        .map((section) => {
          const element = document.getElementById(section.id)
          if (element) {
            const rect = element.getBoundingClientRect()
            return {
              id: section.id,
              top: rect.top,
              bottom: rect.bottom,
            }
          }
          return null
        })
        .filter(Boolean)

      // Find the section that's most visible in the viewport
      const viewportMiddle = window.innerHeight / 2
      let currentSection = "overview"

      for (const section of sections) {
        if (section && section.top <= viewportMiddle && section.bottom >= viewportMiddle) {
          currentSection = section.id
          break
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 100 // Account for sticky header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-900/50">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn("sticky top-1 z-40 w-full mt-4", className)}
      >
        <div className="container px-4 md:px-6">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo/Title */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-bold text-white text-lg">Aegis Navigation</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navigationSections.slice(0, 4).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      activeSection === section.id
                        ? "bg-emerald-500/20 text-emerald-400 shadow-lg"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50",
                    )}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{section.label}</span>
                  </button>
                ))}

                {/* More Menu for remaining sections */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
                      <Menu className="w-4 h-4" />
                      <span className="hidden xl:inline">More</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 bg-slate-950 border-slate-800">
                    <div className="space-y-4 mt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">All Sections</h3>
                      {navigationSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                            activeSection === section.id
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/50",
                          )}
                        >
                          <section.icon className="w-5 h-5" />
                          <span className="font-medium">{section.label}</span>
                          {activeSection === section.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* CTA Button */}
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 hidden sm:inline-flex"
                  onClick={() => scrollToSection("early-access")}
                >
                  Request Early Access
                </Button>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden text-white">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 bg-slate-950 border-slate-800">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">Aegis Sections</h3>
                    </div>

                    <div className="space-y-2">
                      {navigationSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                            activeSection === section.id
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/50",
                          )}
                        >
                          <section.icon className="w-5 h-5" />
                          <span className="font-medium">{section.label}</span>
                          {activeSection === section.id && (
                            <div className="w-2 h-2 rounded-full bg-emerald-400 ml-auto" />
                          )}
                        </button>
                      ))}

                      <div className="pt-4 border-t border-slate-700 mt-6">
                        <Button
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                          onClick={() => {
                            scrollToSection("early-access")
                            setIsOpen(false)
                          }}
                        >
                          Request Early Access
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Section Indicator (Side Navigation) */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block">
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-2xl p-3 shadow-2xl">
          <div className="space-y-3">
            {navigationSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "group relative flex items-center justify-center w-3 h-3 rounded-full transition-all duration-300",
                  activeSection === section.id ? "bg-emerald-400 scale-125" : "bg-slate-600 hover:bg-slate-500",
                )}
                title={section.label}
              >
                <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {section.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-30 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors duration-200"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  FileText,
  Shield,
  User,
  Settings,
  LogOut,
  Activity,
  Calendar,
  Pill,
  Bell,
  Users,
  AlertTriangle,
  Heart,
  Home,
  MessageSquare,
  BarChart3,
  Monitor,
  Menu,
} from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // Added for mobile sidebar

const sidebarItems = [
  { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { name: "Health Records", href: "/portal/health/records", icon: FileText },
  { name: "Consent Management", href: "/portal/care/consent", icon: Shield },
  { name: "Activity & Vitals", href: "/portal/health/activity", icon: Activity },
  { name: "Appointments", href: "/portal/care/appointments", icon: Calendar },
  { name: "Medications", href: "/portal/health/medications", icon: Pill },
  { name: "Notifications", href: "/portal/account/notifications", icon: Bell },
  { name: "Profile", href: "/portal/account/profile", icon: User },
]

const caregiverItems = [
  { name: "Caregiver Dashboard", href: "/portal/care/caregiver", icon: Users },
  { name: "Multi-Patient Monitor", href: "/portal/care/caregiver/multi-patient", icon: Monitor },
  { name: "Hospital Dashboard", href: "/portal/care/caregiver/hospital", icon: Heart },
  { name: "Family Dashboard", href: "/portal/care/caregiver/family", icon: Home },
  { name: "Eldercare Dashboard", href: "/portal/care/caregiver/eldercare", icon: Users },
  { name: "Alert Management", href: "/portal/care/caregiver/alerts", icon: AlertTriangle },
  { name: "Communication Hub", href: "/portal/care/caregiver/communication", icon: MessageSquare },
  { name: "Analytics & Reports", href: "/portal/care/caregiver/analytics", icon: BarChart3 },
]

interface PatientDashboardLayoutProps {
  children: React.ReactNode
}

export function PatientDashboardLayout({ children }: PatientDashboardLayoutProps) {
  const pathname = usePathname()
  const isCaregiverSection = pathname.includes("/caregiver")

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-black/95 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="h-5 w-5 text-white" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-black border-r border-slate-800/50 p-0">
                <nav className="p-4 space-y-6">
                  <Link href="/" className="flex items-center space-x-2 mb-6 px-3">
                    <Image
                      src="/images/ayuv-logo.png"
                      alt="AYUV Health Logo"
                      width={120}
                      height={32}
                      className="h-auto"
                    />
                  </Link>
                  {/* Patient Portal Section */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
                      Patient Portal
                    </h3>
                    <div className="space-y-1">
                      {sidebarItems.map((item, index) => {
                        const isActive = pathname === item.href
                        return (
                          <Link
                            href={item.href}
                            key={item.name}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              isActive
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20"
                                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  {/* Caregiver Portal Section */}
                  <div className="mt-6">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
                      Caregiver Portal
                    </h3>
                    <div className="space-y-1">
                      {caregiverItems.map((item, index) => {
                        const isActive = pathname === item.href
                        return (
                          <Link
                            href={item.href}
                            key={item.name}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              isActive
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20"
                                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="text-xs">{item.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Desktop Logo and Portal Name */}
            <Link href="/" className="hidden lg:flex items-center space-x-2">
              <Image src="/images/ayuv-logo.png" alt="AYUV Health Logo" width={120} height={32} className="h-auto" />
            </Link>
            <span className="text-sm text-slate-400 hidden lg:block">
              {isCaregiverSection ? "Caregiver Portal" : "Patient Portal"}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/images/profile-avatar.jpg" alt="User" />
                    <AvatarFallback className="bg-emerald-500 text-white">AJ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-slate-900 border-slate-700" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">Alex Johnson</p>
                    <p className="text-xs leading-none text-slate-400">alex.johnson@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem asChild className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <Link href="/portal/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <Link href="/portal/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 border-r border-slate-800/50 bg-black/95 backdrop-blur-md min-h-[calc(100vh-4rem)] shrink-0">
          <nav className="p-4 space-y-6 w-full">
            {/* Patient Portal Section */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Patient Portal</h3>
              <div className="space-y-1">
                {sidebarItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Caregiver Portal Section */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Caregiver Portal</h3>
              <div className="space-y-1">
                {caregiverItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sidebarItems.length + index) * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="text-xs">{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 bg-black overflow-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"

const navigationItems = [
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
  { name: "Aegis Wearables", href: "/aegis" },
  { name: "Patient Portal", href: "/portal" },
  { name: "Resources", href: "/resources" },
  { name: "Community", href: "/community" },
  { name: "Support", href: "/support" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-black/95 backdrop-blur-md"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/ayuv-logo.png"
            alt="AYUV Health Logo"
            width={150}
            height={40}
            className="h-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                pathname === item.href ? "text-emerald-400" : "text-slate-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {/* Login/Register Buttons Desktop */}
          <Button variant="ghost" className="hidden md:inline-flex text-slate-300 hover:text-emerald-400" asChild>
            <Link href="/auth">Login</Link>
          </Button>
          <Button className="hidden md:inline-flex bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
            <Link href="/auth?mode=signup">Register</Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-950 border-slate-800">
              <div className="flex flex-col space-y-4 mt-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                      pathname === item.href ? "text-emerald-400" : "text-slate-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Login/Register Buttons Mobile */}
                <Button variant="ghost" className="w-full mt-4 text-slate-300 hover:text-emerald-400" asChild>
                  <Link href="/auth">Login</Link>
                </Button>
                <Button className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
                  <Link href="/auth?mode=signup">Register</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Youtube, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function FooterSection() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative py-16 md:py-24 bg-gradient-to-t from-black to-slate-950 border-t border-slate-800"
    >
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/images/ayuv-logo.png" alt="AYUV Health Logo" width={40} height={40} />
              <span className="text-2xl font-bold text-white">AYUV Health</span>
            </Link>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Empowering you with privacy-native health data control and AI-driven insights for a healthier future.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Youtube className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/sdks" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  SDKs
                </Link>
              </li>
              <li>
                <Link href="/aegis" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Aegis Wearables
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AYUV Health. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-emerald-400 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/status" className="hover:text-emerald-400 transition-colors">
              Status
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

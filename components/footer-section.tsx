"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Patient Portal", href: "/portal" },
    { name: "Pricing", href: "/pricing" },
    { name: "API Documentation", href: "/docs" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Support Center", href: "/support" },
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  developers: [
    { name: "Developer Portal", href: "/developers" },
    { name: "API Reference", href: "/api" },
    { name: "SDKs", href: "/sdks" },
    { name: "Status", href: "/status" },
  ],
}

export function FooterSection() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/images/ayuv-logo.png" alt="AYUV Health Logo" width={120} height={32} className="h-auto" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering global healthcare through secure, AI-driven health data management and blockchain technology.
            </p>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-3 text-white capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-slate-400">© 2024 AYUV Health. All rights reserved worldwide.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

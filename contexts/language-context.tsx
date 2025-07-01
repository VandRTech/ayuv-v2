"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "mn"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.portal": "Portal",
    "nav.aegis": "Aegis Wearables",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.docs": "Docs",
    "nav.support": "Support",

    // Hero Section
    "hero.badge": "Privacy Native Health OS",
    "hero.title": "Your Health Data,",
    "hero.title.highlight": "Your Control",
    "hero.subtitle":
      "Securely unify your medical records, wearable data, and checkups - all in one place. Experience the future of healthcare with blockchain-secured consent and AI-driven insights.",
    "hero.cta.primary": "Join Our Early Access",
    "hero.cta.secondary": "Explore Features",

    // Features Section
    "features.title": "Revolutionary",
    "features.title.highlight": "Features",
    "features.subtitle": "Built for privacy, designed for the future of healthcare",
    "features.unified.title": "Unified Health Records",
    "features.unified.desc":
      "Seamlessly integrate data from hospitals, clinics, and wearables into one comprehensive health profile.",
    "features.blockchain.title": "Blockchain Consent",
    "features.blockchain.desc":
      "Granular control over your health data with immutable consent logs and zero-knowledge proofs.",
    "features.ai.title": "AI-Driven Insights",
    "features.ai.desc":
      "Personalized health recommendations powered by federated learning while keeping your data private.",
    "features.global.title": "Global Interoperability",
    "features.global.desc":
      "FHIR-compliant system works with healthcare providers worldwide for seamless care coordination.",

    // How It Works
    "how.title": "How It",
    "how.title.highlight": "Works",
    "how.subtitle": "Simple steps to take control of your health data",
    "how.step1.title": "Connect Your Data",
    "how.step1.desc": "Link your medical records, wearables, and health apps securely through our encrypted platform.",
    "how.step2.title": "AI Analysis",
    "how.step2.desc": "Our federated AI analyzes your data patterns while keeping everything private and secure.",
    "how.step3.title": "Actionable Insights",
    "how.step3.desc":
      "Receive personalized health recommendations and share insights with your care team on your terms.",

    // Aegis Section
    "aegis.badge": "Coming Soon • Privacy-First • Medical-Grade",
    "aegis.title": "Aegis by AYUV",
    "aegis.subtitle": "Privacy-Native Health Wearables",
    "aegis.description":
      "The world's first wearables with blockchain-secured data sync, federated AI intelligence, and medical-grade continuous monitoring.",
    "aegis.cta.primary": "Request Early Access",
    "aegis.cta.secondary": "Learn More",
    "aegis.feature1.title": "Blockchain-Secured Data",
    "aegis.feature1.desc":
      "First wearables with native blockchain consent integration for complete health data sovereignty",
    "aegis.feature2.title": "Federated AI Intelligence",
    "aegis.feature2.desc":
      "Personalized healthcare insights through federated learning while keeping your data private",
    "aegis.feature3.title": "Medical-Grade Monitoring",
    "aegis.feature3.desc": "Hospital-level precision with clinical-grade sensors surpassing consumer accuracy",
    "aegis.specs.battery": "14+ days",
    "aegis.specs.water": "100m depth",
    "aegis.specs.durability": "MIL-STD 810H",
    "aegis.specs.health": "24/7 monitoring",
    "aegis.band.title": "Aegis Band",
    "aegis.band.desc": "Screen-free design focused on pure data collection",
    "aegis.watch.title": "Aegis Watch",
    "aegis.watch.desc": "Full smartwatch with medical-grade precision",

    // Footer
    "footer.tagline": "Building the future of privacy-native healthcare",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.resources": "Resources",
    "footer.legal": "Legal",
    "footer.copyright": "© 2024 AYUV Health. All rights reserved.",

    // Common
    "common.coming.soon": "Coming Soon",
    "common.learn.more": "Learn More",
    "common.get.started": "Get Started",
    "common.request.access": "Request Access",
    "common.schedule.demo": "Schedule Demo",
  },
  mn: {
    // Navigation
    "nav.home": "Нүүр",
    "nav.features": "Онцлогууд",
    "nav.portal": "Портал",
    "nav.aegis": "Aegis Бугуйвч",
    "nav.pricing": "Үнэ",
    "nav.about": "Бидний тухай",
    "nav.contact": "Холбоо барих",
    "nav.docs": "Баримт бичиг",
    "nav.support": "Дэмжлэг",

    // Hero Section
    "hero.badge": "Нууцлалыг эрхэмлэсэн Эрүүл Мэндийн Систем",
    "hero.title": "Таны Эрүүл Мэндийн Мэдээлэл,",
    "hero.title.highlight": "Таны Хяналт",
    "hero.subtitle":
      "Эмнэлгийн бичлэг, бугуйвчны өгөгдөл, үзлэгийн мэдээллийг нэг дороос аюулгүй нэгтгэнэ. Блокчэйн аюулгүй зөвшөөрөл болон хиймэл оюун ухаанаар ирээдүйн эрүүл мэндийн тусламжийг мэдрээрэй.",
    "hero.cta.primary": "Эрт Хандалтад Нэгдэх",
    "hero.cta.secondary": "Онцлогуудыг Судлах",

    // Features Section
    "features.title": "Хувьсгалт",
    "features.title.highlight": "Онцлогууд",
    "features.subtitle": "Нууцлалд зориулж бүтээгдсэн, эрүүл мэндийн ирээдүйд зориулсан",
    "features.unified.title": "Нэгдсэн Эрүүл Мэндийн Бичлэг",
    "features.unified.desc":
      "Эмнэлэг, эмнэлэг, бугуйвчны өгөгдлийг нэг иж бүрэн эрүүл мэндийн профайл болгон нэгтгэнэ.",
    "features.blockchain.title": "Блокчэйн Зөвшөөрөл",
    "features.blockchain.desc":
      "Таны эрүүл мэндийн өгөгдлийг нарийвчлан хянах боломжтой, өөрчлөгдөшгүй зөвшөөрлийн бүртгэл.",
    "features.ai.title": "Хиймэл Оюун Ухаанаар Дэмжигдсэн Ойлголт",
    "features.ai.desc": "Таны өгөгдлийг хувийн байлгаж федератив сургалтаар дэмжигдсэн хувийн эрүүл мэндийн зөвлөмж.",
    "features.global.title": "Дэлхийн Харилцан Үйлчлэл",
    "features.global.desc":
      "FHIR стандартад нийцсэн систем нь дэлхийн эрүүл мэндийн үйлчилгээ үзүүлэгчидтэй ажилладаг.",

    // How It Works
    "how.title": "Хэрхэн",
    "how.title.highlight": "Ажилладаг",
    "how.subtitle": "Эрүүл мэндийн өгөгдлөө хянах энгийн алхамууд",
    "how.step1.title": "Өгөгдлөө Холбох",
    "how.step1.desc":
      "Эмнэлгийн бичлэг, бугуйвч, эрүүл мэндийн аппуудыг манай шифрлэгдсэн платформоор аюулгүй холбоно.",
    "how.step2.title": "Хиймэл Оюун Ухааны Шинжилгээ",
    "how.step2.desc":
      "Манай федератив хиймэл оюун ухаан таны өгөгдлийн хэв маягийг бүх зүйлийг хувийн, аюулгүй байлгаж шинжилдэг.",
    "how.step3.title": "Хэрэгжүүлэх Боломжтой Ойлголт",
    "how.step3.desc": "Хувийн эрүүл мэндийн зөвлөмж авч, таны нөхцөлөөр асрамжийн багтайгаа ойлголтоо хуваалцаарай.",

    // Aegis Section
    "aegis.badge": "Удахгүй • Нууцлал Эрхэмлэсэн • Эмнэлгийн Зэрэглэл",
    "aegis.title": "AYUV-ын Aegis",
    "aegis.subtitle": "Нууцлалыг Эрхэмлэсэн Эрүүл Мэндийн Бугуйвч",
    "aegis.description":
      "Блокчэйн аюулгүй өгөгдлийн синхрон, федератив хиймэл оюун ухаан, эмнэлгийн зэрэглэлийн тасралтгүй хяналттай дэлхийн анхны бугуйвч.",
    "aegis.cta.primary": "Эрт Хандалт Хүсэх",
    "aegis.cta.secondary": "Дэлгэрэнгүй Мэдэх",
    "aegis.feature1.title": "Блокчэйн Хамгаалагдсан Өгөгдөл",
    "aegis.feature1.desc":
      "Эрүүл мэндийн өгөгдлийн бүрэн тусгаар байдлын төлөө төрөлхийн блокчэйн зөвшөөрөл нэгтгэлтэй анхны бугуйвч",
    "aegis.feature2.title": "Федератив Хиймэл Оюун Ухаан",
    "aegis.feature2.desc": "Таны өгөгдлийг хувийн байлгаж федератив сургалтаар хувийн эрүүл мэндийн ойлголт",
    "aegis.feature3.title": "Эмнэлгийн Зэрэглэлийн Хяналт",
    "aegis.feature3.desc":
      "Хэрэглэгчийн нарийвчлалыг давсан эмнэлгийн зэрэглэлийн мэдрэгчтэй эмнэлгийн түвшний нарийвчлал",
    "aegis.specs.battery": "14+ хоног",
    "aegis.specs.water": "100м гүн",
    "aegis.specs.durability": "MIL-STD 810H",
    "aegis.specs.health": "24/7 хяналт",
    "aegis.band.title": "Aegis Туузан",
    "aegis.band.desc": "Цэвэр өгөгдөл цуглуулахад чиглэсэн дэлгэцгүй загвар",
    "aegis.watch.title": "Aegis Цаг",
    "aegis.watch.desc": "Эмнэлгийн зэрэглэлийн нарийвчлалтай бүрэн ухаалаг цаг",

    // Footer
    "footer.tagline": "Нууцлалыг эрхэмлэсэн эрүүл мэндийн ирээдүйг бүтээж байна",
    "footer.product": "Бүтээгдэхүүн",
    "footer.company": "Компани",
    "footer.resources": "Нөөц",
    "footer.legal": "Хууль эрх зүй",
    "footer.copyright": "© 2024 AYUV Health. Бүх эрх хуулиар хамгаалагдсан.",

    // Common
    "common.coming.soon": "Удахгүй",
    "common.learn.more": "Дэлгэрэнгүй",
    "common.get.started": "Эхлэх",
    "common.request.access": "Хандалт Хүсэх",
    "common.schedule.demo": "Жишээ Товлох",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem("ayuv-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "mn")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("ayuv-language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

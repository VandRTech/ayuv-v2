"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Paperclip } from "lucide-react"
import { ayuvCtaMessages } from "@/lib/ayuv-cta-messages"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const WEBSITE_CONTEXT = `
ABOUT AYUV HEALTH
-----------------
We're building the future of healthcare through secure, AI-driven, patient-centric health data management.

Our Mission:
To empower every individual with complete control over their health data, enabling better healthcare outcomes through unified, secure, and intelligent health record management.

Our Vision:
A future where healthcare is preventive, personalized, and accessible to all, powered by secure blockchain technology and cutting-edge AI insights.

What Makes AYUV Different:
- Security: Blockchain-Secured Consent. Every data access is recorded immutably on blockchain, giving you complete audit trail.
- AI-Powered: Intelligent Health Insights. AI analyzes your unified health data to provide personalized preventive care recommendations.
- Unified: Complete Health Picture. Integrates with health systems, wearables, and healthcare providers for comprehensive health view.
- Global: Designed for the global healthcare ecosystem. Integrates with international health standards, supports multiple languages, and works across healthcare systems.

FEATURES
--------
- Unified Health Records (Data Management): Centralize all your medical data from multiple providers in one secure, accessible location.
- Blockchain Security (Security): Immutable consent management with cryptographic proof of every data access.
- AI Health Insights (Intelligence): Personalized health recommendations powered by advanced machine learning algorithms.
- Wearable Integration (Integration): Seamlessly sync data from smartwatches, fitness trackers, and IoT health devices.
- Smart Notifications (Automation): Intelligent alerts for medication reminders, appointments, and health milestones.
- Zero-Trust Architecture (Security): End-to-end encryption with granular access controls and audit trails.
- Mobile-First Design (Accessibility): Native mobile apps with offline capabilities and real-time synchronization.
- Global Standards (Compliance): Compliant with international healthcare standards including HL7 FHIR and DICOM.
- Real-Time Analytics (Analytics): Live health monitoring with instant insights and trend analysis.
- Care Team Collaboration (Collaboration): Secure sharing with healthcare providers, family members, and caregivers.
- Document Management (Organization): Organize, categorize, and search through all your health documents and reports.
- Wellness Tracking (Wellness): Comprehensive wellness monitoring including mental health and lifestyle factors.

AEGIS WEARABLES
---------------
- Blockchain-secured health data sync with native consent integration.
- Federated AI health intelligence for personalized insights.
- Medical-grade continuous monitoring with clinical precision.
- Two variants: Aegis Band (athlete-focused) and Aegis Watch (smartwatch functionality).
- Military-grade durability (MIL-STD 810H), IP68 water resistance, 14+ day battery life.
- FHIR-compliant integration with healthcare systems.
- Privacy-first architecture where users own their health data.
- Emergency response features and offline-first design.
- Testimonials from healthcare professionals and patients.

PRICING
-------
Flexible pricing options designed to meet your healthcare data management needs. Coming soon with transparent, affordable plans.

SUPPORT
-------
- Email Support: support@ayuv.health (within 24 hours)
- Live Chat: Real-time assistance during business hours (coming soon)
- Phone Support: +1 (555) 123-4567 (business hours)
- Community Forum: community.ayuv.health
- Quick Links: Documentation, FAQ, Getting Started, Community
- Common Issues: Account setup, data integration, privacy & consent, technical issues
- Support Request Form: Submit issues and receive confirmation and ticket number

COMMUNITY
---------
- 12,000+ global members, 2,500+ active discussions, 150+ events hosted, 500+ success stories
- Forum categories: General Health, Wearable Technology, Data Privacy & Security, Preventive Care, AI & Health Insights, Developer Corner
- Upcoming events: Global Health Data Summit, Wearable Tech Showcase, Blockchain in Healthcare Workshop
- Features: Expert-led discussions, global network, peer support, early access to features

CONTACT
-------
- Email: hello@ayuv.health (general), support@ayuv.health (support)
- Phone: +1 (555) 123-4567
- Address: 123 Innovation Drive, Tech Valley, CA 94000, United States
- Business Hours: Mon-Fri 9am-6pm PST, Sat 10am-4pm PST, Sun closed
- Contact Form: For general, support, partnership, press, and careers inquiries

RESOURCES & EDUCATION
---------------------
- Documentation: Getting Started Guide, API Documentation (coming soon), Security & Privacy
- Educational Content: Health Data Standards, Blockchain in Healthcare, Preventive Care Guide (coming soon)
- Video Tutorials: Platform Overview, Consent Management, Wearable Integration (coming soon)
- Downloads: Mobile App (Android/iOS coming soon), Data Export Tool (Beta)

PATIENT PORTAL & CAREGIVER MODULE
---------------------------------
- Family Dashboard: Multi-generation health tracking and management, emergency contacts, family member details, vital signs, medication status
- Comprehensive Health Management: Track and manage health for all family members
- Emergency Response: Emergency contacts and response features for families
- Alerts Overview: Critical alerts, recent activity, acknowledge alerts for patients
- Hospital Dashboard: (if present) Patient management, alerts, and communication for hospital caregivers
- Eldercare Dashboard: (if present) Elderly patient management, family communication groups, WhatsApp integration, privacy-compliant notifications
- Multi-Patient Dashboard: (if present) Manage and monitor multiple patients, alerts, and health data

IMPORTANT
---------
- The platform does NOT provide medical diagnoses, treatment recommendations, or replace professional medical advice.
- For medical questions, always consult a qualified healthcare provider.
`

const SUGGESTED_QUESTIONS = [
  "What is AYUV Health?",
  "How does AYUV protect my privacy?",
  "What are the key features of the platform?",
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi, I'm Aira. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: WEBSITE_CONTEXT,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      return (
        data.response || "I'm here to help you learn about AYUV Health! What would you like to know about our platform?"
      )
    } catch (error) {
      console.error("Chatbot error:", error)

      // Return a contextual response based on the user's message
      const lowerMessage = userMessage.toLowerCase()
      if (lowerMessage.includes("what is ayuv") || lowerMessage.includes("about")) {
        return "AYUV Health is a Privacy Native Health OS that securely unifies your medical records, wearable data, and checkups in one platform. We use blockchain technology for secure consent management and AI for health insights."
      }
      if (lowerMessage.includes("feature")) {
        return "AYUV Health offers secure medical record unification, wearable data integration, blockchain consent management, and AI-driven health insights through our patient portal."
      }
      if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
        return "For pricing information, please visit our pricing page or contact our sales team. We offer various plans to suit different needs."
      }

      return "I'm here to help you learn about AYUV Health! I can answer questions about our platform features, security, pricing, and how to get started. What would you like to know?"
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const botResponse = await generateResponse(userMessage.content)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm here to help you learn about AYUV Health! What would you like to know about our platform, features, or services?",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? <X /> : <MessageCircle />}
          </AnimatePresence>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] max-w-[calc(100vw-2rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full flex flex-col bg-black/90 backdrop-blur-sm border-emerald-500/20 shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Aira</h3>
                    <p className="text-xs text-emerald-400">Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === "user" ? "bg-blue-500" : "bg-emerald-500"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <User className="h-3 w-3 text-white" />
                          ) : (
                            <Bot className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-800 text-gray-100 border border-emerald-500/20"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-gray-800 border border-emerald-500/20 rounded-lg p-3">
                          <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-emerald-500/20">
                  <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-1">
                    {SUGGESTED_QUESTIONS.slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-emerald-500/20">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about AYUV Health..."
                    className="flex-1 bg-gray-800 border-emerald-500/20 text-white placeholder:text-gray-400"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    size="icon"
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

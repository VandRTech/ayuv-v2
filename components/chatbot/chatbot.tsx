"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const WEBSITE_CONTEXT = `
AYUV Health is a Privacy Native Health OS that securely unifies medical records, wearable data, and checkups in one platform. 

Key Features:
- Secure unification of medical records, wearable data, and checkups
- Blockchain-secured consent management
- AI-driven health insights
- Privacy-first approach to health data
- Global healthcare integration
- Preventive care focus

Available Pages:
- Patient Portal: Dashboard for managing health data
- Features: Detailed feature explanations
- Pricing: Subscription and pricing information
- About: Company information and mission
- Support: Help and contact information
- Community: Join health community
- Resources: Educational materials and guides
- Developers: API and SDK documentation
- Privacy Policy: Data protection information
- Terms of Service: Usage terms and conditions

The platform does NOT provide medical diagnoses, treatment recommendations, or replace professional medical advice.
`

const SUGGESTED_QUESTIONS = [
  "What is AYUV Health?",
  "How does the patient portal work?",
  "What data can I connect?",
  "Is my health data secure?",
  "How do I join the early access?",
  "What are the pricing plans?",
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm the AYUV Health assistant. I can help you learn about our platform, features, and services. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
      {/* Chatbot Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chatbot Window */}
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
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AYUV Assistant</h3>
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

import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Load knowledge base
const knowledgePath = path.join(process.cwd(), "ayuv-knowledge.json")
const knowledgeBase = JSON.parse(fs.readFileSync(knowledgePath, "utf-8"))

async function tryGeminiAPI(message: string, context: string): Promise<string | null> {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return null
    }
    const { GoogleGenerativeAI } = await import("@google/generative-ai")
    const genAI = new GoogleGenerativeAI(apiKey)
    const SYSTEM_PROMPT = `
You are the AYUV Health website assistant. Your role is to help users understand AYUV Health's platform, features, services, and modules. Use the provided context to answer accurately.\n\nIMPORTANT: Always answer concisely, directly, and on-point. Do not repeat the context. Limit your answer to 2-3 sentences. Avoid fluff or extra information. If asked about medical topics, politely explain you can't provide medical advice.`
    const prompt = `
${SYSTEM_PROMPT}

CONTEXT:
${context}

USER QUESTION: ${message}

Provide a helpful, concise response about AYUV Health. Keep it under 100 words.`
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Gemini API setup error:", error)
    return null
  }
}

function retrieveRelevantChunks(userMessage: string, knowledgeBase: any[], topN = 3): string {
  const lowerMsg = userMessage.toLowerCase()
  const keywords = lowerMsg.split(/\W+/).filter(Boolean)
  // Score each chunk by keyword overlap
  const scored = knowledgeBase.map(entry => {
    let score = 0
    for (const word of keywords) {
      if (entry.title.toLowerCase().includes(word) || entry.content.toLowerCase().includes(word)) score++
    }
    return { ...entry, score }
  })
  const best = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score)
  if (best.length > 0) {
    return best.slice(0, topN).map(s => `${s.title}: ${s.content}`).join("\n\n")
  }
  // If nothing found, return all content (fallback)
  return knowledgeBase.slice(0, topN).map(s => `${s.title}: ${s.content}`).join("\n\n")
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }
    // Retrieve relevant context
    const context = retrieveRelevantChunks(message, knowledgeBase, 3)
    // Try Gemini API
    const geminiResponse = await tryGeminiAPI(message, context)
    if (geminiResponse) {
      return NextResponse.json({ response: geminiResponse })
    }
    // Fallback: return the most relevant context chunk(s)
    return NextResponse.json({ response: context })
  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json({ response: "I'm here to help you learn about AYUV Health! Please ask about any feature, service, or section of our platform." })
  }
} 
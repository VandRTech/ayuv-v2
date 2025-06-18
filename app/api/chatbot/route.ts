import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBuAt4y6edPg5KBw1vRFdiZoXbEZCiIWBI")

const SYSTEM_PROMPT = `
You are the AYUV Health website assistant. Your role is to help users understand AYUV Health's platform, features, and services based solely on the website content provided.

IMPORTANT GUIDELINES:
1. NEVER provide medical diagnoses, treatment recommendations, or medical advice
2. NEVER interpret medical test results or symptoms
3. Always redirect medical questions to healthcare professionals
4. Only answer questions about AYUV Health's platform, features, pricing, and general information
5. Be helpful, friendly, and informative about the platform
6. If asked about medical topics, politely explain that you can't provide medical advice and suggest consulting healthcare professionals
7. Keep responses concise and relevant to the website content
8. If you don't know something about AYUV Health, admit it and suggest contacting support

SAFETY PHRASES to use when medical questions arise:
- "I can't provide medical advice or diagnoses"
- "Please consult with your healthcare provider"
- "For medical questions, it's best to speak with a qualified healthcare professional"
- "I can only help with information about AYUV Health's platform and services"

Remember: You are a website assistant, not a medical professional.
`

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
${SYSTEM_PROMPT}

WEBSITE CONTEXT:
${context}

USER QUESTION: ${message}

Please provide a helpful response about AYUV Health based on the website context. Remember to follow all safety guidelines regarding medical advice.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

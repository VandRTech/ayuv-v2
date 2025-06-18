import { type NextRequest, NextResponse } from "next/server"

// Fallback responses when API is unavailable
const FALLBACK_RESPONSES = {
  "what is ayuv":
    "AYUV Health is a Privacy Native Health OS that securely unifies your medical records, wearable data, and checkups in one platform. We use blockchain-secured consent and AI-driven insights to help you manage your health data.",
  features:
    "AYUV Health offers secure medical record unification, wearable data integration, blockchain consent management, AI-driven health insights, and a comprehensive patient portal for managing all your health information.",
  pricing:
    "For detailed pricing information, please visit our pricing page or contact our sales team. We offer various plans to suit different needs.",
  security:
    "Security is our top priority. We use blockchain technology for consent management and employ industry-leading encryption to protect your health data.",
  portal:
    "The patient portal is your central hub for managing health data, viewing insights, scheduling appointments, and accessing your unified health records.",
  "early access":
    "To join our early access program, click the 'Join Our Early Access' button on our homepage or visit our waitlist page to sign up.",
  support:
    "For support, you can visit our support page, contact us through our contact form, or reach out to our support team directly.",
  aegis:
    "Aegis by AYUV is our revolutionary Health OS Wearables - the world's first Privacy-Native wearables with blockchain-secured data sync, federated AI intelligence, and medical-grade monitoring. Available as Aegis Band and Aegis Watch.",
  wearables:
    "Our Aegis wearables feature medical-grade sensors, 14+ day battery life, military-grade durability (MIL-STD 810H), and complete privacy control. They're the first wearables with native blockchain consent integration.",
  navigation:
    "You can access Aegis Wearables from the main navigation menu or visit /aegis directly. Aegis is featured prominently on our homepage with detailed information about our privacy-native health wearables.",
}

function getSimpleResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Check for navigation questions
  if (lowerMessage.includes("how to") && (lowerMessage.includes("aegis") || lowerMessage.includes("navigate"))) {
    return FALLBACK_RESPONSES["navigation"]
  }

  // Check for Aegis/wearables questions
  if (
    lowerMessage.includes("aegis") ||
    lowerMessage.includes("wearable") ||
    lowerMessage.includes("watch") ||
    lowerMessage.includes("band")
  ) {
    if (lowerMessage.includes("spec") || lowerMessage.includes("feature") || lowerMessage.includes("technical")) {
      return FALLBACK_RESPONSES["wearables"]
    }
    return FALLBACK_RESPONSES["aegis"]
  }

  // Check for common keywords and return appropriate responses
  if (lowerMessage.includes("what is ayuv") || lowerMessage.includes("about ayuv")) {
    return FALLBACK_RESPONSES["what is ayuv"]
  }
  if (lowerMessage.includes("feature") || lowerMessage.includes("what can")) {
    return FALLBACK_RESPONSES["features"]
  }
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("plan")) {
    return FALLBACK_RESPONSES["pricing"]
  }
  if (lowerMessage.includes("secure") || lowerMessage.includes("safe") || lowerMessage.includes("privacy")) {
    return FALLBACK_RESPONSES["security"]
  }
  if (lowerMessage.includes("portal") || lowerMessage.includes("dashboard")) {
    return FALLBACK_RESPONSES["portal"]
  }
  if (lowerMessage.includes("early access") || lowerMessage.includes("join") || lowerMessage.includes("waitlist")) {
    return FALLBACK_RESPONSES["early access"]
  }
  if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("contact")) {
    return FALLBACK_RESPONSES["support"]
  }

  // Medical safety responses
  if (
    lowerMessage.includes("diagnos") ||
    lowerMessage.includes("symptom") ||
    lowerMessage.includes("treatment") ||
    lowerMessage.includes("medical advice")
  ) {
    return "I can't provide medical advice or diagnoses. Please consult with your healthcare provider for any medical questions. I can help you learn about AYUV Health's platform and Aegis wearables instead."
  }

  // Default response
  return "I'm here to help you learn about AYUV Health and our Aegis wearables! I can answer questions about our platform features, pricing, security, patient portal, and how to navigate to different sections. What would you like to know?"
}

async function tryGeminiAPI(message: string, context: string): Promise<string | null> {
  try {
    // Check if we have the API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.log("No Gemini API key found, using fallback responses")
      return null
    }

    // Dynamic import to avoid build issues
    const { GoogleGenerativeAI } = await import("@google/generative-ai")
    const genAI = new GoogleGenerativeAI(apiKey)

    const SYSTEM_PROMPT = `
You are the AYUV Health website assistant. Your role is to help users understand AYUV Health's platform, features, services, and Aegis wearables.

IMPORTANT GUIDELINES:
1. NEVER provide medical diagnoses, treatment recommendations, or medical advice
2. NEVER interpret medical test results or symptoms
3. Always redirect medical questions to healthcare professionals
4. Only answer questions about AYUV Health's platform, features, pricing, Aegis wearables, and general information
5. Be helpful, friendly, and informative about the platform
6. Keep responses concise (2-3 sentences max)
7. If asked about medical topics, politely explain that you can't provide medical advice

SAFETY PHRASES for medical questions:
- "I can't provide medical advice or diagnoses"
- "Please consult with your healthcare provider"
- "For medical questions, speak with a qualified healthcare professional"
`

    // Try different model names that are available
    const modelNames = [
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-1.0-pro",
      "models/gemini-1.5-flash",
      "models/gemini-1.5-pro",
      "models/gemini-1.0-pro",
    ]

    let model = null
    let lastError = null

    // Try each model until one works
    for (const modelName of modelNames) {
      try {
        model = genAI.getGenerativeModel({ model: modelName })

        const prompt = `
${SYSTEM_PROMPT}

WEBSITE CONTEXT:
${context}

USER QUESTION: ${message}

Provide a helpful, concise response about AYUV Health or Aegis wearables. Keep it under 100 words.
`

        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()
      } catch (error) {
        lastError = error
        console.log(`Model ${modelName} failed, trying next...`)
        continue
      }
    }

    // If all models failed, log the last error and return null
    console.error("All Gemini models failed. Last error:", lastError)
    return null
  } catch (error) {
    console.error("Gemini API setup error:", error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Enhanced context with Aegis information
    const enhancedContext = `
${context}

AEGIS BY AYUV WEARABLES:
Aegis by AYUV is the world's first Privacy-Native Health OS Wearables featuring:
- Blockchain-secured health data sync with native consent integration
- Federated AI health intelligence for personalized insights
- Medical-grade continuous monitoring with clinical precision
- Two variants: Aegis Band (screen-free, athlete-focused) and Aegis Watch (smartwatch functionality)
- Military-grade durability (MIL-STD 810H), IP68 water resistance, 14+ day battery life
- FHIR-compliant integration with healthcare systems
- Privacy-first architecture where users own their health data
- Emergency response features and offline-first design
- Available from main navigation menu and featured on homepage
`

    // First try Gemini API
    const geminiResponse = await tryGeminiAPI(message, enhancedContext)

    if (geminiResponse) {
      return NextResponse.json({ response: geminiResponse })
    }

    // Fallback to simple keyword-based responses
    const fallbackResponse = getSimpleResponse(message)
    return NextResponse.json({ response: fallbackResponse })
  } catch (error) {
    console.error("Chatbot API error:", error)

    // Return a helpful fallback response instead of an error
    const fallbackResponse = getSimpleResponse("help")
    return NextResponse.json({ response: fallbackResponse })
  }
}

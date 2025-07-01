// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// Sehat Dadi AI Analysis Pipeline
// This Edge Function processes health reports and generates personalized questions

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Types for our data structures
interface HealthIntakeData {
  session_id: string
  name: string
  age: number
  gender: string
  height: number
  weight: number
  units: string
  language: string
  diet: string
  occupation: string
  sleep: string
  report_path: string
}

interface AnalysisResult {
  session_id: string
  status: 'RECEIVED' | 'PROCESSING' | 'OCR_COMPLETE' | 'QUESTIONS_READY' | 'FAILED'
  extracted_text?: any
  generated_questions?: string[]
  error_message?: string
}

interface OCRResult {
  key_value_pairs: Record<string, string>
  tables: any[]
  raw_text: string
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// OCR Service Integration (Placeholder for AWS Textract or Google Cloud Vision)
async function extractTextFromDocument(fileBuffer: Uint8Array, fileType: string): Promise<OCRResult> {
  console.log('Starting OCR extraction...')
  
  // TODO: Replace this with actual OCR service integration
  // For now, we'll simulate OCR extraction
  // In production, you would:
  // 1. Use AWS Textract: https://docs.aws.amazon.com/textract/latest/dg/API_AnalyzeDocument.html
  // 2. Or Google Cloud Vision: https://cloud.google.com/vision/docs/ocr
  
  // Simulated OCR result for testing
  const mockOCRResult: OCRResult = {
    key_value_pairs: {
      "Hemoglobin": "11.2 g/dL",
      "Blood Sugar": "145 mg/dL", 
      "Thyroid Stimulating Hormone": "6.1 mIU/L",
      "Cholesterol": "220 mg/dL",
      "Blood Pressure": "140/90 mmHg"
    },
    tables: [],
    raw_text: "Hemoglobin: 11.2 g/dL, Blood Sugar: 145 mg/dL, TSH: 6.1 mIU/L, Cholesterol: 220 mg/dL, BP: 140/90 mmHg"
  }
  
  console.log('OCR extraction completed')
  return mockOCRResult
}

// LLM Integration for Question Generation
async function generatePersonalizedQuestions(
  userInfo: HealthIntakeData, 
  extractedData: OCRResult,
  language: string
): Promise<string[]> {
  console.log('Generating personalized questions...')
  
  // TODO: Replace with actual LLM API call
  // In production, you would use OpenAI, Claude, or Gemini API
  
  const prompt = `
Role: You are Sehat Dadi, a helpful, empathetic health assistant from rural India.

Context: You have received health data for ${userInfo.name} (Age: ${userInfo.age}, Gender: ${userInfo.gender}, Language: ${language}).

Their health report contains these key values: ${JSON.stringify(extractedData.key_value_pairs)}

Task: Generate 5 simple, personalized questions to understand their lifestyle better.

Instructions:
1. Generate exactly 5 questions based on the provided data
2. Questions must be easy enough for a 10-year-old to understand
3. Use a gentle, curious, and non-alarming tone
4. DO NOT use technical medical terms
5. Consider their occupation (${userInfo.occupation}) and diet (${userInfo.diet})
6. Questions should be in ${language}
7. Your output MUST be only a JSON array of strings

Example Output:
[
  "Do you feel tired or breathless more than usual when you do daily chores?",
  "Have you noticed your skin looking paler than usual?",
  "What do you typically eat for your main meals?",
  "How many hours do you work in the field each day?",
  "Do you get enough rest after your work?"
]
`

  // Simulated LLM response for testing
  const mockQuestions = [
    "Do you feel tired or breathless more than usual when you do daily chores?",
    "Have you noticed your skin looking paler than usual?",
    "What do you typically eat for your main meals?",
    "How many hours do you work in the field each day?",
    "Do you get enough rest after your work?"
  ]
  
  console.log('Questions generated successfully')
  return mockQuestions
}

// Main processing function
async function processHealthAnalysis(sessionId: string): Promise<AnalysisResult> {
  try {
    console.log(`Starting analysis for session: ${sessionId}`)
    
    // Step 1: Fetch the health intake data
    const { data: intakeData, error: fetchError } = await supabase
      .from('health_intake')
      .select('*')
      .eq('session_id', sessionId)
      .single()
    
    if (fetchError || !intakeData) {
      throw new Error(`Failed to fetch intake data: ${fetchError?.message}`)
    }
    
    console.log('Health intake data fetched successfully')
    
    // Step 2: Update status to PROCESSING
    await supabase
      .from('health_analysis')
      .upsert({
        session_id: sessionId,
        status: 'PROCESSING',
        updated_at: new Date().toISOString()
      })
    
    // Step 3: Download the health report from Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('health-reports')
      .download(intakeData.report_path)
    
    if (downloadError || !fileData) {
      throw new Error(`Failed to download report: ${downloadError?.message}`)
    }
    
    console.log('Health report downloaded successfully')
    
    // Step 4: Extract text using OCR
    const fileBuffer = new Uint8Array(await fileData.arrayBuffer())
    const extractedData = await extractTextFromDocument(fileBuffer, intakeData.report_path)
    
    // Step 5: Update with extracted text
    await supabase
      .from('health_analysis')
      .update({
        extracted_text: extractedData,
        status: 'OCR_COMPLETE',
        updated_at: new Date().toISOString()
      })
      .eq('session_id', sessionId)
    
    console.log('OCR data stored successfully')
    
    // Step 6: Generate personalized questions
    const questions = await generatePersonalizedQuestions(intakeData, extractedData, intakeData.language)
    
    // Step 7: Final update with questions
    await supabase
      .from('health_analysis')
      .update({
        generated_questions: questions,
        status: 'QUESTIONS_READY',
        updated_at: new Date().toISOString()
      })
      .eq('session_id', sessionId)
    
    console.log('Analysis completed successfully')
    
    return {
      session_id: sessionId,
      status: 'QUESTIONS_READY',
      extracted_text: extractedData,
      generated_questions: questions
    }
    
  } catch (error) {
    console.error('Analysis failed:', error)
    
    // Update status to FAILED
    await supabase
      .from('health_analysis')
      .update({
        status: 'FAILED',
        error_message: error.message,
        updated_at: new Date().toISOString()
      })
      .eq('session_id', sessionId)
    
    return {
      session_id: sessionId,
      status: 'FAILED',
      error_message: error.message
    }
  }
}

// Main Edge Function handler
Deno.serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }
    
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }
    
    // Parse request body
    const { sessionId } = await req.json()
    
    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'sessionId is required' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }
    
    console.log(`Received analysis request for session: ${sessionId}`)
    
    // Process the analysis
    const result = await processHealthAnalysis(sessionId)
    
    return new Response(
      JSON.stringify({
        success: true,
        sessionId: result.session_id,
        status: result.status,
        message: result.status === 'QUESTIONS_READY' 
          ? 'Analysis completed successfully' 
          : result.error_message || 'Analysis failed'
      }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    
  } catch (error) {
    console.error('Edge function error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
})

/* 
To invoke locally:
1. Run `supabase start`
2. Make an HTTP request:

curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/sehat-dadi-pipeline' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{"sessionId":"your-session-id-here"}'

To deploy:
supabase functions deploy sehat-dadi-pipeline
*/

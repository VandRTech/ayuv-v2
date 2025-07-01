// Sehat Dadi AI Analysis Pipeline
// This Edge Function processes health reports and generates personalized questions

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Use Tesseract.js for image OCR
import Tesseract from 'https://cdn.jsdelivr.net/npm/tesseract.js@5.0.3/dist/tesseract.esm.min.js';
// Use unpdf for PDF processing in serverless environments
import { extractText, getDocumentProxy } from 'https://esm.sh/unpdf@latest'

// Set worker path for pdfjs


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
  tables?: any[]
  raw_text: string
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// --- OCR: unpdf for PDFs and Tesseract for Images ---
async function extractTextFromDocument(fileBuffer: Uint8Array, fileName: string): Promise<OCRResult> {
  const fileExtension = fileName.toLowerCase().split('.').pop();
  
  if (fileExtension === 'pdf') {
    return await extractTextFromPDF(fileBuffer);
  } else if (['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'webp'].includes(fileExtension || '')) {
    return await extractTextFromImage(fileBuffer);
  } else {
    throw new Error(`Unsupported file type: ${fileExtension}`);
  }
}

// Extract text from PDF using unpdf
async function extractTextFromPDF(fileBuffer: Uint8Array): Promise<OCRResult> {
  try {
    console.log('Processing PDF with unpdf...');

    // Load the PDF and extract text using unpdf
    const pdf = await getDocumentProxy(fileBuffer);
    const { totalPages, text } = await extractText(pdf, { mergePages: true });

    console.log(`PDF processing complete. Extracted ${text.length} characters from ${totalPages} pages.`);

    // Extract key-value pairs from the text
    const key_value_pairs = extractKeyValuePairs(text);

    return { key_value_pairs, raw_text: text, tables: [] };
  } catch (error: any) {
    console.error('PDF processing error with unpdf:', error);
    throw new Error(`unpdf processing failed: ${error.message}`);
  }
}

// Extract text from image using Tesseract
async function extractTextFromImage(fileBuffer: Uint8Array): Promise<OCRResult> {
  try {
    console.log('Processing image with Tesseract...');
    
    // Convert buffer to base64 for Tesseract
    const base64Data = btoa(String.fromCharCode(...fileBuffer));
    const imageData = `data:image/png;base64,${base64Data}`;
    
    // Initialize Tesseract with English language
    const worker = await Tesseract.createWorker('eng');
    
    // Perform OCR
    const { data: { text } } = await worker.recognize(imageData);
    
    // Terminate the worker
    await worker.terminate();
    
    console.log(`Image OCR complete. Extracted ${text.length} characters.`);
    
    // Extract key-value pairs from the text
    const key_value_pairs = extractKeyValuePairs(text);
    
    return { key_value_pairs, raw_text: text, tables: [] };
  } catch (error: any) {
    console.error('Image OCR error:', error);
    throw new Error(`Image OCR failed: ${error.message}`);
  }
}

// Helper function to extract key-value pairs from text
function extractKeyValuePairs(text: string): Record<string, string> {
  const key_value_pairs: Record<string, string> = {};
  
  // A more comprehensive list of keywords to look for.
  const keywords = [
    // Vitals
    'Blood Pressure', 'BP', 'Heart Rate', 'Pulse', 'HR', 'Temperature', 'Temp', 'Weight', 'Height', 'BMI',
    // Complete Blood Count (CBC)
    'Hemoglobin', 'HGB', 'Hematocrit', 'HCT', 'White Blood Cell Count', 'WBC', 'Red Blood Cell Count', 'RBC', 'Platelet Count', 'Platelets',
    // Lipid Panel
    'Total Cholesterol', 'Cholesterol', 'HDL Cholesterol', 'HDL', 'LDL Cholesterol', 'LDL', 'Triglycerides',
    // Metabolic Panel
    'Glucose', 'Blood Sugar', 'Sodium', 'Potassium', 'Chloride', 'Creatinine', 'BUN', 'Urea Nitrogen',
    // Liver Function
    'ALT', 'Alanine Aminotransferase', 'AST', 'Aspartate Aminotransferase', 'Bilirubin',
    // Other common tests
    'TSH', 'Thyroid-Stimulating Hormone', 'Uric Acid', 'HbA1c', 'A1c'
  ];

  // Regex to capture keywords and their corresponding values.
  // This looks for a keyword followed by a colon, equals sign, or just spaces, and then captures the value.
  const regex = new RegExp(`(${keywords.join('|')})[\\s:=]+([\\d\\.\\/\\s-]+\\w*)`, 'ig');

  let match;
  while ((match = regex.exec(text)) !== null) {
    // Clean up the matched key and value
    const key = match[1].trim();
    const value = match[2].replace(/\s+/g, ' ').trim(); // Standardize spacing in value
    
    // Prioritize longer keys if a shorter one (like 'BP') was also found for the same value
    if (!key_value_pairs[key] || key.length > (Object.keys(key_value_pairs).find(k => key_value_pairs[k] === value) || '').length) {
        key_value_pairs[key] = value;
    }
  }
  
  console.log(`[EXTRACT] Found ${Object.keys(key_value_pairs).length} key-value pairs from the report.`);
  return key_value_pairs;
}

// --- LLM: Gemini 2.5 Pro Integration ---
// This function sends the extracted data to Gemini to generate personalized questions.
async function generatePersonalizedQuestions(userInfo: HealthIntakeData, extractedData: OCRResult, language: string): Promise<{ thought_process: any; final_questions: string[] }> {
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set in environment variables.");

  // --- Advanced Context Preparation ---
  let bmi_status = 'Not available';
  if (userInfo.height > 0 && userInfo.weight > 0) {
    let bmi;
    if (userInfo.units === 'metric') { // height in cm, weight in kg
      const heightInMeters = userInfo.height / 100;
      bmi = userInfo.weight / (heightInMeters * heightInMeters);
    } else { // height in inches, weight in lbs
      bmi = (userInfo.weight / (userInfo.height * userInfo.height)) * 703;
    }
    
    if (bmi < 18.5) bmi_status = `Underweight (BMI: ${bmi.toFixed(1)})`;
    else if (bmi < 24.9) bmi_status = `Normal weight (BMI: ${bmi.toFixed(1)})`;
    else if (bmi < 29.9) bmi_status = `Overweight (BMI: ${bmi.toFixed(1)})`;
    else bmi_status = `Obese (BMI: ${bmi.toFixed(1)})`;
  }

  const prompt = `
    Role: You are "Sehat Dadi," an expert-level, empathetic health AI analyst. Your entire response MUST be a single, valid JSON object. Do not include any other text, reasoning, or formatting outside of this JSON object.

    The JSON object must have two top-level keys: "thought_process" and "final_questions".

    User Profile:
    - Name: ${userInfo.name}
    - Age: ${userInfo.age}
    - Gender: ${userInfo.gender}
    - BMI Status: ${bmi_status}
    - Occupation: ${userInfo.occupation || 'Not provided'}
    - Typical Diet: ${userInfo.diet || 'Not provided'}
    - Average Sleep: ${userInfo.sleep || 'Not provided'}

    Health Report Data:
    1.  Extracted Parameters: ${JSON.stringify(extractedData.key_value_pairs, null, 2)}
    2.  Full Raw Text: 
        --- RAW TEXT START ---
        ${extractedData.raw_text}
        --- RAW TEXT END ---

    Your Task:
    1.  First, complete the "thought_process" object. This is your internal analysis and will not be shown to the user.
        a.  **analysis**: Write a brief analysis of the user's profile and the full raw text. Note any abnormalities, borderline values, or interesting connections.
        b.  **hypothesis**: Based on your analysis, state 1-3 clear hypotheses. (e.g., "The user's low HGB and sedentary lifestyle might be causing fatigue.")
        c.  **question_strategy**: Describe the goal of your questions. (e.g., "I will ask about diet and specific symptoms to investigate potential iron deficiency anemia.")

    2.  Second, based ONLY on your thought_process, complete the "final_questions" key with a JSON array of 3 to 10 insightful questions.

    3.  Language: Generate the final questions ONLY in ${language}.

    Example Response Format:
    {
      "thought_process": {
        "analysis": "The user has a desk job and borderline high LDL cholesterol. The raw text shows no other major issues.",
        "hypothesis": "The user's lifestyle may be contributing to their cholesterol levels. They may not be aware of the impact of their daily habits.",
        "question_strategy": "I will ask specific questions about their workday diet, activity levels, and stress to give them a complete picture and confirm the hypothesis."
      },
      "final_questions": [
        "Given your desk job, could you describe your typical level of physical activity during the workday?",
        "What are your go-to meals or snacks during a busy workday?",
        "How do you typically manage stress during or after work?",
        "Have you ever had your vitamin D levels checked, considering you work indoors?"
      ]
    }
  `;

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.5 } // Lower temperature for more focused, structured output
    })
  });

  if (!res.ok) {
      const errorBody = await res.text();
      console.error("Gemini API Error:", errorBody);
      throw new Error(`Gemini API failed with status: ${res.status}`);
  }
  
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  
  try {
    const parsedResponse = JSON.parse(text);
    // Return the entire structured object, not just the questions
    return parsedResponse || { thought_process: {}, final_questions: [] }; 
  } catch(e) {
    console.error("Failed to parse structured Gemini JSON response:", text, e);
    // Fallback to trying to parse it as a simple array for backward compatibility
    return { 
        thought_process: { analysis: "Error parsing response", hypothesis: "Fallback", question_strategy: "Basic questions" },
        final_questions: [
            "What does your typical daily diet look like?",
            "How much physical activity do you get each day?",
            "Have you been feeling more tired than usual lately?"
        ]
    };
  }
}

// Main processing function
async function processHealthAnalysis(sessionId: string): Promise<AnalysisResult> {
  try {
    console.log(`Starting analysis for session: ${sessionId}`)
    
    const { data: intakeData, error: fetchError } = await supabase
      .from('health_intake')
      .select('*')
      .eq('session_id', sessionId)
      .single()
    
    if (fetchError || !intakeData) {
      throw new Error(`Failed to fetch intake data: ${fetchError?.message}`)
    }
    
    console.log('Health intake data fetched successfully')
    
    await supabase
      .from('health_analysis')
      .update({ status: 'PROCESSING' })
      .eq('session_id', sessionId);
    
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('health-reports')
      .download(intakeData.report_path)
    
    if (downloadError || !fileData) {
      throw new Error(`Failed to download report: ${downloadError?.message}`)
    }
    
    console.log('Health report downloaded successfully')
    
    const fileBuffer = new Uint8Array(await fileData.arrayBuffer())
    const extractedData = await extractTextFromDocument(fileBuffer, intakeData.report_path)
    
    await supabase
      .from('health_analysis')
      .update({
        extracted_text: extractedData,
        status: 'OCR_COMPLETE',
      })
      .eq('session_id', sessionId)
    
    console.log('OCR data stored successfully')
    
    const fullResponse = await generatePersonalizedQuestions(intakeData, extractedData, intakeData.language)
    
    // Log the AI's thought process to the server logs for debugging
    if (fullResponse.thought_process) {
        console.log('--- AI Thought Process ---');
        console.log(JSON.stringify(fullResponse.thought_process, null, 2));
        console.log('--------------------------');
    }

    const questions = fullResponse.final_questions || [];
    
    await supabase
      .from('health_analysis')
      .update({
        generated_questions: questions,
        status: 'QUESTIONS_READY',
      })
      .eq('session_id', sessionId)
    
    console.log('Analysis completed successfully')
    
    return {
      session_id: sessionId,
      status: 'QUESTIONS_READY',
      extracted_text: extractedData,
      generated_questions: questions
    }
    
  } catch (error: any) {
    console.error('Analysis failed:', error)
    
    await supabase
      .from('health_analysis')
      .update({
        status: 'FAILED',
        error_message: error.message,
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
    
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' }});
    }
    
    const { sessionId } = await req.json()
    
    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'sessionId is required' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
    }
    
    console.log(`Received analysis request for session: ${sessionId}`)
    
    const result = await processHealthAnalysis(sessionId)
    
    return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' }});
    
  } catch (error: any) {
    console.error('Edge function error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error', message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' }});
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
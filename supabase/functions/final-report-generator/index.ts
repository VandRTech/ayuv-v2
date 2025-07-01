// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

console.log("Hello from Functions!")

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Initialize Supabase Admin Client
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// @ts-nocheck
// Helper to flatten arrays/objects for prompt readability
function flattenForPrompt(data: any): string {
  if (data === null || data === undefined) {
    return 'Not provided';
  }
  if (Array.isArray(data)) {
    // Pretty print arrays of objects or values
    return data.map(item =>
      typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)
    ).join('\n- ');
  }
  if (typeof data === 'object' && Object.keys(data).length > 0) {
    // Pretty print objects
    return JSON.stringify(data, null, 2);
  }
  if (typeof data === 'object') {
    return 'Not provided';
  }
  return String(data);
}

// --- Personalized Question Generation ---
async function generatePersonalizedQuestions(context: any): Promise<string> {
  const { userInfo, extractedData, userAnswers } = context;
  const prompt = `
Given the user's health report and lifestyle answers, generate 3-5 follow-up questions. For each question:
- Identify all critical and relevant findings (not just the most abnormal).
- Relate each question to a general use case or daily life scenario.
- Ask questions that, when answered, will help clarify WHY, WHEN, and HOW the issue might have developed or is affecting the user.
- If you use any medical terminology, briefly explain it in simple terms within the question.
- Avoid simply repeating the report's terms. Instead, help the user reflect on possible causes, lifestyle factors, or symptoms.
- The goal is to help the user and their doctor understand the context and possible reasons behind the findings.

Examples:
- "Your ALT (a liver enzyme) is slightly elevated. ALT can rise due to fatty liver, alcohol, or certain medications. Have you noticed any changes in your diet, alcohol intake, or started any new medicines recently?"
- "Your hemoglobin is low, which means your blood carries less oxygen. Have you experienced tiredness, pale skin, or shortness of breath lately? When did you first notice these symptoms?"
- "Your blood sugar is high. This can be affected by what you eat, stress, or lack of exercise. Can you describe your typical breakfast and how active you are during the day?"

User Profile: ${flattenForPrompt(userInfo)}
Lab Results: ${flattenForPrompt(extractedData)}
Lifestyle Answers: ${flattenForPrompt(userAnswers)}
`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${Deno.env.get("GEMINI_API_KEY")}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LLM API failed: ${errorText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// --- Final Report Generation (AIRA Persona, Highly Personalized) ---
async function generateFinalReport(context: any): Promise<string> {
  const { userInfo, extractedData, generatedQuestions, userAnswers } = context;
  const userName = userInfo.name?.split(' ')[0] || 'there';

  const prompt = `
**CRITICAL INSTRUCTION:**
- You must analyze EVERY parameter, value, and finding from the uploaded report, even if it is not a standard or well-known biomarker.
- **Only display in the main report:** parameters that are critical, abnormal, highly relevant, required, or dependent for context. Do NOT show every parameter—summarize or group normal/irrelevant ones.
- If a parameter is normal and not relevant, you may mention it briefly or omit it from the main report.
- If you wish, add a 'Show All Data' expandable/collapsible section at the end for advanced users, but keep the main report focused and concise.
- For each parameter you do show, provide its value, standard range (if known), and a simple explanation or note if it is new/unfamiliar.
- If you encounter a parameter you do not recognize, include it in an "Other Findings" section and state that it is not standard, but still report its value if it is abnormal or relevant.
- DO NOT skip or omit any data from the analysis, but only show what is necessary for user understanding and action.

    **Persona & Role:**
You are AIRA (AI-powered Report Analyzer). Your identity is a clear, confident, and highly intelligent health assistant. Your goal is to provide an exhaustive, easy-to-understand analysis of a user's health report combined with their lifestyle information. You are not a doctor, but you are an expert at analyzing data and presenting it with clarity and actionable next steps. Your tone is supportive and professional, but direct. If you see data points that are significantly outside the normal range, you must state it clearly and advise a doctor's visit urgently.

**IMPORTANT:** Never output [object Object]. If you see any [object Object], replace it with a readable summary or the actual value. Always render all data as readable text.

    **Context:**
Here is the complete information for the user:
- Personal Profile: ${flattenForPrompt(userInfo)}
- Extracted Health Report Data: ${flattenForPrompt(extractedData)}
- Questions we asked them to understand their lifestyle: ${flattenForPrompt(generatedQuestions)}
- Their direct answers to those questions: ${flattenForPrompt(userAnswers)}

**Strict Rules (Non-Negotiable):**
1.  **NO Medical Diagnosis:** You must never state "You have diabetes" or "You are anemic." Instead, say "Your blood sugar levels are significantly elevated, which requires immediate medical evaluation."
2.  **NO Prescriptions:** You must never suggest any specific medications, dosages, or named supplements.
3.  **Use Markdown:** Structure your entire output using Markdown for clear formatting (headings, lists, bolding, and tables).
4.  **Actionable To-Do's:** Conclude with a clear summary of recommended actions.
5.  **Urgency Flags:** If any biomarker is critically out of range (e.g., very high blood sugar, extremely low hemoglobin), you must include a distinct and unmissable section for "Immediate Actions".
6.  **Mandatory Disclaimer:** Your response must end *exactly* with the provided disclaimer section.

**Task:**
Generate a comprehensive and personalized health insights report. Structure the report using the following Markdown template. Be exhaustive in your analysis for each section. For the 'Recommendations for a Healthier You' section, make each suggestion specific to the user's data and answers. Avoid vague advice. Each recommendation should be actionable and clearly tied to the user's actual health data or habits.

---

### Hi ${userName}, I'm AIRA.

I've carefully analyzed the information you provided. My purpose is to break down what your health report and lifestyle answers indicate, giving you clear insights and actionable next steps. Let's go through it together.

### 1. Overall Health Summary

*(Analyze and synthesize the most important findings from the report and Q&A. Provide a 3-4 sentence high-level overview. If there is a need for an urgent doctor visit, state it here first and again in the "Immediate Actions" section.)*

### 2. Deep Dive: Key Biomarker Analysis

*(For this section, present the findings in a table. Compare the user's value to a standard range and add a "What This Means" explanation in simple terms. Be direct and clear.)*

| Biomarker                 | Your Value        | Standard Range      | Analysis & Simple Explanation                                                                                                                                                                 |
| ------------------------- | ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *(e.g., Blood Sugar (Fasting))* | *(e.g., 152 mg/dL)* | *(e.g., 70-100 mg/dL)* | **Elevated.** This level is higher than the typical range. It suggests your body is having difficulty managing sugar, which is a crucial process for energy. Consistently high levels require a doctor's review. |
| *(e.g., Hemoglobin)*         | *(e.g., 9.8 g/dL)*  | *(e.g., 13.5-17.5 g/dL)*| **Low.** This indicates your blood may have a reduced capacity to carry oxygen. This can explain feelings of fatigue or breathlessness that you may have mentioned.                               |
| *(...add a row for every significant biomarker found...)* | ...               | ...                 | ...                                                                                                                                                                           |

### 3. Connecting the Dots: Lifestyle Insights

*(This is where you connect the user's answers to the report's findings. Be specific and reference their actual answers and values.)*

- **On Diet:** Reference the user's answer about diet and connect it to any relevant findings (e.g., "You mentioned that you are vegetarian and your iron is low. This may be contributing to your anemia.")
- **On Activity:** Reference the user's occupation and activity level, and connect it to their health data.
- **On Sleep/Stress:** Reference the user's sleep/stress answer and connect it to any relevant findings.

### 4. Recommendations for a Healthier You

*(Provide POSITIVE and ACTIONABLE suggestions. Group them logically. Each suggestion must be specific to the user's data and answers. Avoid vague advice. Each recommendation should be actionable and clearly tied to the user's actual health data or habits.)*

#### Example of a GOOD recommendation:
- "Since your hemoglobin is low and you are vegetarian, try to include more spinach, lentils, and vitamin C-rich foods in your meals to improve iron absorption."
- "Your report shows high cholesterol. Consider reducing fried foods and try using olive oil instead of butter."
- "You reported high stress and poor sleep. Try a 10-minute guided meditation before bed, and avoid screens for 30 minutes before sleeping."

#### Example of a BAD recommendation:
- "Eat healthy."
- "Exercise more."
- "Reduce stress."

#### A) Diet Adjustments to Consider
*(Do NOT give a meal plan. Give principles and specific food or habit suggestions relevant to the user's data.)*

#### B) Lifestyle Enhancements
*(Give practical, specific steps relevant to the user's lifestyle and health data.)*

### 5. **Urgent & Immediate Actions**

**(CRITICAL SECTION: ONLY include this entire section if one or more biomarkers are significantly out of range. If everything is fine, OMIT this entire H3 section.)**

**Your report shows certain values that require prompt attention from a healthcare professional.**

- **Consult a Doctor:** Your value for **{{Critical Biomarker Name}}** is **{{Value}}**, which is significantly outside the normal range. It is very important that you schedule an appointment with a doctor as soon as possible to discuss these results and determine the correct next steps.
- **Do Not Wait:** Please treat this with urgency. Early consultation is the best way to manage your health effectively.

### ---
### **Disclaimer & Your Next Steps**

**Who I am:** I am AIRA, an AI assistant designed to analyze and simplify health data.

**What I am NOT:** **I AM NOT a doctor.** This report is for informational purposes only and is **NOT a medical diagnosis.** My analysis is based on standard data ranges and the information you provided.

**Your Actionable To-Do List:**
1.  **Read this report carefully.**
2.  ${'If there are urgent findings, include: Prioritize a visit to the doctor. Otherwise, omit this line.'}
3.  **Take this report to a qualified doctor or healthcare professional.** They are the only ones who can provide a proper diagnosis and create a medical treatment plan for you.
4.  Use my lifestyle and diet suggestions as points of discussion with your doctor.

**Additional Instructions for AIRA:**
- For each abnormal or borderline result, explain what symptoms or changes the user should watch for, and when to seek medical attention.
- If a result is normal but the user has symptoms, suggest possible next steps or questions for their doctor.
- Always use clear, non-alarming language, but do not downplay serious findings.
- For each finding, reference the data source (e.g., "Based on your uploaded report…").
- At the end of the report, include a clear privacy statement and remind the user that their data is only used for this analysis.
- Remind the user that this analysis is informational and not a medical diagnosis.
- For each recommendation, briefly explain the reasoning ("Because your X is high and you reported Y, this may be related to…").
- Ask the user reflective questions to help them engage with their health ("Have you noticed any changes in…?").
- Avoid making assumptions based on demographics unless supported by the data.
- Use a conversational, supportive tone. Write as if you are speaking directly to the user.
- At the very top, include a short "Key Takeaways" section with 2-3 bullet points summarizing the most important findings or next steps.
- Personalize the report by referencing the user's name, age, and any unique context.
- Whenever you use a medical term, briefly explain it in simple language.
- Highlight any positive or healthy findings, and encourage the user to keep up those habits.
- At the end, include a short list of 2-3 "Questions to Ask Your Doctor," based on the user's results.
- Use clear visual cues (like emoji or bold text) for urgent findings or actions.
- Encourage the user to reflect on their habits, symptoms, or changes since their last checkup.
`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${Deno.env.get("GEMINI_API_KEY")}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LLM API failed: ${errorText}`);
  }

  const data = await response.json();
  const reportContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  
  if (!reportContent) {
    throw new Error("The AI failed to generate a report. Please try again.");
  }
  
  return reportContent;
}

// @ts-ignore
serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' 
      } 
    });
  }

  try {
    const { sessionId, userAnswers } = await req.json();
    // Extract JWT from Authorization header
    const authHeader = req.headers.get('Authorization');
    const jwt = authHeader ? authHeader.replace('Bearer ', '') : null;
    let userId: string | null = null;
    if (jwt) {
      // @ts-ignore
      const { data: { user } } = await supabaseAdmin.auth.getUser(jwt);
      userId = user?.id || null;
    }
    
    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Session ID is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Save user answers and update status (include user_id if available)
    await supabaseAdmin
      .from('health_analysis')
      .update({ 
        user_answers: userAnswers,
        status: 'GENERATING_REPORT',
        ...(userId ? { user_id: userId } : {})
      })
      .eq('session_id', sessionId);

    // Fetch all required data
    const [intakeResult, analysisResult] = await Promise.all([
      supabaseAdmin
        .from('health_intake')
        .select('*')
        .eq('session_id', sessionId)
        .single(),
      supabaseAdmin
        .from('health_analysis')
        .select('extracted_text, generated_questions')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
    ]);

    if (intakeResult.error || analysisResult.error) {
      throw new Error(`Database query failed: ${intakeResult.error?.message || analysisResult.error?.message}`);
    }

    // Prepare the full context
    const fullContext = {
      userInfo: intakeResult.data,
      extractedData: analysisResult.data.extracted_text,
      generatedQuestions: analysisResult.data.generated_questions,
      userAnswers: userAnswers,
    };

    // Generate the final report
    const finalReport = await generateFinalReport(fullContext);

    // Save the report and update status
    const { error: updateError } = await supabaseAdmin
      .from('health_analysis')
      .update({
        final_report: finalReport,
        status: 'REPORT_READY'
      })
      .eq('session_id', sessionId);

    if (updateError) {
      throw new Error(`Failed to save final report: ${updateError.message}`);
    }

    return new Response(JSON.stringify({ success: true, message: 'Report generated successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error in final-report-generator:', error);
    
    // Update status to failed if there's an error
    if (req.json && req.json.sessionId) {
      await supabaseAdmin
        .from('health_analysis')
        .update({ status: 'FAILED' })
        .eq('session_id', req.json.sessionId);
    }
    
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/final-report-generator' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

// Function to sanitize filename for Supabase Storage
function sanitizeFilename(filename: string): string {
  // Remove emojis and special characters, keep only alphanumeric, dots, and hyphens
  return filename
    .replace(/[^\w.-]/g, '_') // Replace special chars with underscore
    .replace(/_{2,}/g, '_')   // Replace multiple underscores with single
    .replace(/^_+|_+$/g, '')  // Remove leading/trailing underscores
    .toLowerCase();           // Convert to lowercase
}

// Function to trigger the AI analysis pipeline
async function triggerAnalysisPipeline(sessionId: string, userId: string | null): Promise<void> {
  const supabaseAdmin = createSupabaseAdminClient();
  console.log(`Triggering analysis pipeline for session: ${sessionId}`);
  
  // Create initial analysis record
  await supabaseAdmin
    .from('health_analysis')
    .insert({
      session_id: sessionId,
      status: 'RECEIVED',
      ...(userId ? { user_id: userId } : {})
    });
  
  // Trigger the Edge Function
  const functionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/sehat-dadi-pipeline`;
  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ sessionId }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to trigger analysis pipeline:', errorText);
    throw new Error(`Failed to trigger pipeline: ${errorText}`);
  }
  
  console.log('Analysis pipeline triggered successfully');
}

export async function POST(req: NextRequest) {
  const supabaseAdmin = createSupabaseAdminClient();
  try {
    const supabase = createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || null;

    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const age = formData.get('age') as string;
    const gender = formData.get('gender') as string;
    const height = formData.get('height') as string;
    const weight = formData.get('weight') as string;
    const units = formData.get('units') as string;
    const language = formData.get('language') as string;
    const diet = formData.get('diet') as string;
    const occupation = formData.get('occupation') as string;
    const sleep = formData.get('sleep') as string;
    const healthReport = formData.get('healthReport') as File | null;

    if (!healthReport) {
        return NextResponse.json({ status: 'error', message: 'Health report file is required.' }, { status: 400 });
    }

    const sessionId = randomUUID();
    const sanitizedFilename = sanitizeFilename(healthReport.name);
    const fileName = `${sessionId}-${sanitizedFilename}`;

    console.log('Starting file upload...');
    console.log('Original filename:', healthReport.name);
    console.log('Sanitized filename:', fileName);
    
    // Upload file to Supabase Storage using admin client
    const { error: uploadError } = await supabaseAdmin.storage
      .from('health-reports')
      .upload(fileName, healthReport);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json({ status: 'error', message: 'Failed to upload health report.' }, { status: 500 });
    }

    console.log('File uploaded successfully, now inserting data...');
    // Insert form data into Supabase table using admin client (bypasses RLS)
    const { data, error: insertError } = await supabaseAdmin
      .from('health_intake')
      .insert([
        {
          session_id: sessionId,
          name,
          age: parseInt(age, 10),
          gender,
          height: parseFloat(height),
          weight: parseFloat(weight),
          units,
          language,
          diet,
          occupation,
          sleep,
          report_path: fileName,
        },
      ])
      .select();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      console.error('Error details:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      });
      return NextResponse.json({ status: 'error', message: 'Failed to save health data.' }, { status: 500 });
    }
    
    console.log('Successfully stored data for session:', sessionId);

    // Trigger the AI analysis pipeline asynchronously
    try {
      await triggerAnalysisPipeline(sessionId, userId);
      return NextResponse.json({
        status: 'success',
        message: 'File received and data stored. AI analysis has started.',
        sessionId: sessionId,
      }, { status: 200 });
    } catch (triggerError: any) {
      // If the trigger fails, we still return a success to the user,
      // but log the error and perhaps queue a retry.
      console.error('Failed to trigger analysis pipeline, but data was saved:', triggerError.message);
      // For the user, the submission was successful. The backend will handle the retry.
      return NextResponse.json({
        status: 'success_with_trigger_error',
        message: 'File received and data stored. AI analysis will start shortly.',
        sessionId: sessionId,
      }, { status: 200 });
    }

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to process request.' 
    }, { status: 500 });
  }
} 
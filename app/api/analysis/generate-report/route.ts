import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, userAnswers } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
    }

    // Invoke the final-report-generator Edge Function with userAnswers
    const { error } = await supabaseAdmin.functions.invoke('final-report-generator', {
      body: { sessionId, userAnswers },
    });

    if (error) {
      console.error('Error invoking final-report-generator function:', error);
      return NextResponse.json({ message: 'Failed to start report generation.', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Report generation started.' }, { status: 202 });

  } catch (err: any) {
    console.error('[API_GENERATE_REPORT] Error:', err);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 
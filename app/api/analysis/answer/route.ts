import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabaseAdmin = createSupabaseAdminClient();
  try {
    const { sessionId, question, answer } = await req.json();

    if (!sessionId || !question || !answer) {
      return NextResponse.json({ message: 'Session ID, question, and answer are required.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('health_analysis_answers')
      .insert({
        session_id: sessionId,
        question: question,
        answer: answer,
      });

    if (error) {
      console.error('Error saving answer:', error);
      return NextResponse.json({ message: 'Failed to save answer.', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Answer saved successfully.' }, { status: 200 });

  } catch (err: any) {
    console.error('[API_ANSWER] Error:', err);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 
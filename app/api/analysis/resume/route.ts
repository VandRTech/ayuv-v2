import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
  }

  try {
    // Fetch the main analysis status and questions in parallel with answers
    const analysisPromise = supabaseAdmin
      .from('health_analysis')
      .select('status, generated_questions')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const answersPromise = supabaseAdmin
      .from('health_analysis_answers')
      .select('question, answer')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    // Await both promises
    const [analysisResult, answersResult] = await Promise.all([analysisPromise, answersPromise]);

    const { data: analysisData, error: analysisError } = analysisResult;
    const { data: answersData, error: answersError } = answersResult;

    if (analysisError && analysisError.code !== 'PGRST116') {
      throw analysisError;
    }
    if (answersError) {
      throw answersError;
    }

    if (!analysisData) {
        return NextResponse.json({ message: 'No analysis found for this session.' }, { status: 404 });
    }

    // Smart status adjustment: If questions are ready and all have been answered,
    // the true status is COMPLETED, even if the DB hasn't been updated yet.
    let finalStatus = analysisData.status;
    const questions = Array.isArray(analysisData.generated_questions) ? analysisData.generated_questions : [];
    const answers = answersData || [];
    
    if (finalStatus === 'QUESTIONS_READY' && questions.length > 0 && answers.length >= questions.length) {
        console.log(`[API_RESUME] Adjusting status to COMPLETED for session ${sessionId} as all questions have been answered.`);
        finalStatus = 'COMPLETED';
    }

    return NextResponse.json({
      status: finalStatus,
      questions: analysisData.generated_questions,
      answers: answers,
    }, { status: 200 });

  } catch (err: any) {
    console.error(`[API_RESUME] Error for session ${sessionId}:`, err);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 
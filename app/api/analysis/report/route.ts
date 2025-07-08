import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('health_analysis')
      .select('final_report, extracted_text')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching final report:', error);
      throw new Error(error.message);
    }

    if (!data || !data.final_report) {
      return NextResponse.json({ message: 'Report not found or not ready.' }, { status: 404 });
    }

    return NextResponse.json({ final_report: data.final_report, extracted_text: data.extracted_text }, { status: 200 });

  } catch (err: any) {
    console.error(`[API_REPORT] Error for session ${sessionId}:`, err);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('health_analysis')
      .select('status, generated_questions')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is not an error here
      console.error('Error fetching analysis status:', error);
      throw new Error(error.message);
    }

    if (!data) {
        // This is a valid state, means the record might not be created yet
        return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (err: any) {
    console.error(`[API_STATUS] Error for session ${sessionId}:`, err);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { sessionId, status } = await req.json();

    if (!sessionId || !status) {
      return NextResponse.json({ message: 'Session ID and status are required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('health_analysis')
      .update({ status: status })
      .eq('session_id', sessionId);

    if (error) {
      console.error('Error updating analysis status:', error);
      throw new Error(error.message);
    }

    return NextResponse.json({ message: `Status updated successfully to ${status}` }, { status: 200 });

  } catch (err: any) {
    console.error(`[API_STATUS_UPDATE] Error:`, err);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 
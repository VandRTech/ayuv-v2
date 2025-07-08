import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()

    const { error } = await supabaseAdmin.from('research_submissions').insert({
      submission_data: formData,
    })

    if (error) {
      console.error('Error saving to Supabase:', error)
      return NextResponse.json({ message: 'Failed to submit research data.' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Research data submitted successfully!' })
  } catch (err: any) {
    console.error('[API_RESEARCH_SUBMIT] Error:', err)
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 })
  }
} 
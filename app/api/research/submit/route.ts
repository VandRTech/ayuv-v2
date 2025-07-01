import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, questions, ...responses } = data
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }
    // Store all questions and responses
    const { error } = await supabase.from('research_responses').insert([
      {
        name,
        email,
        responses,
        questions: questions || null
      }
    ])
    if (error) {
      // Log error and data for debugging
      console.error('Supabase insert error:', error, { name, email, responses, questions })
      return NextResponse.json({ error: error.message, details: error, payload: { name, email, responses, questions } }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API route error:', err)
    return NextResponse.json({ error: 'Invalid request.', details: err }, { status: 400 })
  }
} 
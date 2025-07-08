import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, priority, category } = await req.json()

    if (!name || !email || !subject || !message || !priority || !category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from('support_tickets').insert({
      name,
      email,
      subject,
      message,
      priority,
      category,
    })

    if (error) {
      console.error('Error saving to Supabase:', error)
      return NextResponse.json({ message: 'Failed to create support ticket.' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Support ticket created successfully!' })
  } catch (err: any) {
    console.error('[API_SUPPORT] Error:', err)
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 })
  }
} 
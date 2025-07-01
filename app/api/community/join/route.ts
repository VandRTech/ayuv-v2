import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, profession, organization, interests, bio, newsletter } = body

    if (!firstName || !lastName || !email || !profession || !interests || !Array.isArray(interests) || interests.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { error } = await supabase.from('community_requests').insert([
      { first_name: firstName, last_name: lastName, email, profession, organization, interests, bio, newsletter }
    ])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
} 
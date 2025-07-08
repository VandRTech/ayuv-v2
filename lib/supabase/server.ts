import { createClient } from '@supabase/supabase-js'

// This is the correct way to create a server-side admin client.
// It's a singleton instance that uses the service role key and bypasses RLS.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
); 
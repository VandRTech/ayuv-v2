import { createClient } from '@supabase/supabase-js'

// Admin client for server-side operations (bypasses RLS)
// This should be a singleton instance.
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
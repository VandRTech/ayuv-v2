# Supabase Setup Guide

## Environment Variables Required

To use the authentication features in this application, you need to set up Supabase environment variables.

### 1. Create a `.env.local` file in the root directory

```bash
# Create the file
touch .env.local
```

### 2. Add your Supabase credentials

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Get your Supabase credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or select an existing one
3. Go to Settings → API
4. Copy the "Project URL" and "anon public" key
5. Paste them in your `.env.local` file

### 4. Restart your development server

```bash
npm run dev
```

## Database Schema

Make sure your Supabase database has the following table:

```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT NOT NULL,
  phone TEXT,
  profession TEXT NOT NULL,
  health_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Current Status

- ✅ Application loads without errors
- ✅ UI is fully functional
- ⚠️ Authentication features require Supabase configuration
- ⚠️ Form validation works but login/signup will show configuration error

Once you add the environment variables, the authentication will work properly! 
"use client";
import type React from "react";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Chatbot } from "@/components/chatbot/chatbot";
import { LanguageProvider } from "@/contexts/language-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClientComponentClient());

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <LanguageProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange>
          {children}
          <Toaster />
          <Chatbot />
        </ThemeProvider>
      </LanguageProvider>
    </SessionContextProvider>
  );
} 
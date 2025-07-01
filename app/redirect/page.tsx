"use client";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function RedirectPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) return; // Wait for session
    // Check for reports and redirect
    fetch("/api/reports")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          router.replace("/reports"); // User has reports
        } else {
          router.replace("/analysis"); // No reports, start new analysis
        }
      });
  }, [session, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mb-4" />
      <p className="text-lg text-gray-300">Redirecting...</p>
    </div>
  );
} 
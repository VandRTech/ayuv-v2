"use client";
import { useSession } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function ReportsPage() {
  const session = useSession();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch('/api/reports')
        .then(res => res.json())
        .then(data => {
          setReports(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mb-4" />
        <p className="text-lg text-gray-300">Loading your reports...</p>
      </div>
    );
  }

  if (!session) return <div className="min-h-screen flex items-center justify-center text-lg">Login required</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-emerald-400">My Past Reports</h1>
      {reports.length === 0 ? (
        <p className="text-gray-400">No reports found.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map(r => (
            <li key={r.id} className="bg-black/30 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="text-white font-semibold">{new Date(r.created_at).toLocaleString()}</span>
              <Link href={`/report/${r.id}`} className="text-emerald-400 hover:underline mt-2 md:mt-0">View Report</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 
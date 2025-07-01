import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { SpaceBackground } from '@/components/space-background';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!password || password.length < 6) {
      setStatus('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setStatus('Passwords do not match.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setStatus('Error: ' + error.message);
    } else {
      setStatus('Password updated! You can now log in with your new password.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-black">
      <SpaceBackground backgroundImage="/images/earth-horizon.jpg" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-10 max-w-md w-full shadow-2xl flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold text-emerald-400 mb-2">Reset Your Password</h2>
          <form className="w-full flex flex-col gap-4" onSubmit={handleReset}>
            <input
              type="password"
              className="w-full p-3 rounded bg-black/40 border border-white/20 text-white placeholder:text-white/40"
              placeholder="New password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              minLength={6}
              required
            />
            <input
              type="password"
              className="w-full p-3 rounded bg-black/40 border border-white/20 text-white placeholder:text-white/40"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              minLength={6}
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Reset Password'}
            </button>
          </form>
          {status && <div className="text-emerald-400 text-base mt-2">{status}</div>}
        </div>
      </div>
    </div>
  );
} 
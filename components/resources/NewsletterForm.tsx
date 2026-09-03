'use client';

import { useState, useTransition } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    startTransition(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStatus('success');
        setEmail('');
      } catch {
        setStatus('error');
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {status === 'success' ? (
        <div className="rounded-xl bg-white/20 p-3 text-center text-xs font-semibold text-white backdrop-blur-xs">
          ✓ Thanks for subscribing! Check your inbox soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full flex-1 rounded-xl bg-white/10 px-4 py-3 text-xs text-white placeholder-indigo-200 outline-none border border-white/20 focus:border-white focus:bg-white/20 transition-all"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto rounded-xl bg-white px-6 py-3 text-xs font-bold text-[#5243E0] hover:bg-slate-50 transition-colors shrink-0 disabled:opacity-70"
          >
            {isPending ? 'Joining...' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-2 text-[11px] text-rose-200 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
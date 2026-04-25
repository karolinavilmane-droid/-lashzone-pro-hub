/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { isSupabaseConfigured } from '../lib/supabase';

export default function LoginModal() {
  const { signIn, signUp } = useAuth();
  const { loginModalOpen, closeLoginModal } = useUI();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!loginModalOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    if (error) {
      setError(error);
    } else if (isSignUp) {
      setSuccess('Account created! Check your email to confirm, then sign in.');
    } else {
      closeLoginModal();
    }

    setIsLoading(false);
  };

  const toggle = () => {
    setIsSignUp(v => !v);
    setError(null);
    setSuccess(null);
  };

  const inputCls = 'w-full px-4 py-3 border rounded-xl text-[13px] text-[#000] placeholder:text-[#999] bg-white outline-none transition-all focus:border-brand-primary focus:shadow-[0_0_0_3px_rgba(154,126,212,0.12)]';

  return (
    <div
      className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) closeLoginModal(); }}
    >
      <div
        className="bg-white w-full max-w-sm flex flex-col rounded-2xl overflow-hidden"
        style={{ boxShadow: 'var(--shadow-brand-lg)' }}
      >
        {/* Coloured top accent — signals premium, on-brand */}
        <div className="h-1 bg-gradient-to-r from-brand-primary to-brand-primary-dark" />

        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-7">
            <div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary-dark tracking-tight">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h2>
              <p className="text-[13px] text-[#444] mt-1 font-light">
                {isSignUp
                  ? 'Create your account to access resources'
                  : 'Sign in to access your document library'}
              </p>
            </div>
            <button
              onClick={closeLoginModal}
              className="text-[#888] hover:text-brand-primary p-1.5 -mt-1 -mr-1.5 rounded-lg hover:bg-brand-primary-light"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Supabase warning */}
          {!isSupabaseConfigured && (
            <div className="mb-5 px-4 py-3 bg-brand-accent/[0.08] border border-brand-accent/25 rounded-xl text-[12px] text-brand-accent font-semibold leading-relaxed">
              Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200/70 rounded-xl text-[12px] text-red-600 font-medium leading-relaxed">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 px-4 py-3 bg-brand-primary-light border border-brand-primary/25 rounded-xl text-[12px] text-brand-primary-dark font-medium leading-relaxed">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-brand-primary-dark/80 uppercase tracking-[0.16em] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ border: '1px solid rgba(154,126,212,0.25)' }}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-brand-primary-dark/80 uppercase tracking-[0.16em] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={{ border: '1px solid rgba(154,126,212,0.25)' }}
                className={inputCls}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !isSupabaseConfigured}
              className="w-full py-3 mt-1 bg-brand-primary text-white rounded-xl font-semibold text-[13px] hover:bg-brand-primary-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: 'var(--shadow-brand-primary)' }}
            >
              {isLoading ? 'Please wait…' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(154,126,212,0.12)' }}>
            <button
              onClick={toggle}
              className="w-full text-center text-[12px] text-[#666] hover:text-brand-primary font-medium"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

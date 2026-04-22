/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BRANDING } from '../branding';
import { Search, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';

interface HeaderProps {
  selectedId: string | null;
  onHome: () => void;
}

const SECTION_TITLES: Record<string, string> = {
  'consultation': 'Document Library',
  'allergy-safety': 'Allergy and Safety'
};

function initialsFromEmail(email: string): string {
  const name = email.split('@')[0];
  const parts = name.split(/[._-]/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function displayName(email: string): string {
  const part = email.split('@')[0];
  const name = part.split(/[._-]/)[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function Header({ selectedId, onHome }: HeaderProps) {
  const sectionTitle = selectedId && SECTION_TITLES[selectedId]
    ? SECTION_TITLES[selectedId]
    : 'LashZone Pro';

  const { user, signOut } = useAuth();
  const { openLoginModal } = useUI();

  const initials = user ? initialsFromEmail(user.email ?? '') : '';
  const name     = user ? displayName(user.email ?? '')     : '';

  return (
    <header
      className="flex items-center justify-between px-10 h-24 bg-white sticky top-0 z-[40]"
      style={{ borderBottom: '1px solid rgba(154, 126, 212, 0.24)', boxShadow: '0 2px 20px rgba(42,27,74,0.08)' }}
    >
      {/* ── Left: logo + section title ── */}
      <div className="flex items-center gap-10">
        <div
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onHome}
        >
          <img
            src={BRANDING.logoUrl}
            alt={BRANDING.businessName}
            className="h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div
          className="flex items-center gap-8 pl-10"
          style={{ borderLeft: '1px solid rgba(154, 126, 212, 0.22)' }}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-brand-primary/40 text-2xl font-light">/</span>
            <h2 className="text-[20px] font-serif font-black text-brand-primary-dark tracking-tight">
              {sectionTitle}
            </h2>
          </div>

          {selectedId && (
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(154,126,212,0.10)', border: '1px solid rgba(154,126,212,0.22)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">
                Active Section
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Right: search + user ── */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div
          className="hidden lg:flex items-center rounded-xl px-4 py-2.5 group transition-all w-64 focus-within:border-brand-primary/50"
          style={{ background: 'rgba(154,126,212,0.06)', border: '1px solid rgba(154,126,212,0.20)', boxShadow: 'var(--shadow-brand-sm)' }}
          onFocusCapture={e => (e.currentTarget.style.boxShadow = 'var(--shadow-brand-md)')}
          onBlurCapture={e  => (e.currentTarget.style.boxShadow = 'var(--shadow-brand-sm)')}
        >
          <Search size={15} className="text-brand-primary/45 group-focus-within:text-brand-primary flex-shrink-0" />
          <input
            type="text"
            placeholder="Search resources..."
            className="bg-transparent border-none outline-none px-2 text-[12px] font-medium text-brand-ink-deep placeholder:text-brand-primary/35 w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Bell */}
          <button
            className="p-2.5 text-brand-primary/45 hover:text-brand-primary hover:bg-brand-primary-light rounded-xl transition-all relative"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-accent rounded-full border-2 border-white" style={{ boxShadow: '0 0 6px rgba(255,128,80,0.5)' }} />
          </button>

          <div className="h-8 w-px mx-1" style={{ background: 'rgba(154,126,212,0.22)' }} />

          {user ? (
            /* ── Logged-in user block ── */
            <div className="flex items-center gap-3 pl-1 group">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black text-brand-primary-dark uppercase tracking-widest leading-none mb-1">
                  {name}
                </p>
                <p className="text-[9px] font-bold text-brand-primary/60 leading-none">
                  {user.email}
                </p>
              </div>
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-black text-xs border-2 border-white"
                style={{ boxShadow: 'var(--shadow-brand-md)' }}
              >
                {initials}
              </div>
              <button
                onClick={signOut}
                title="Sign out"
                className="p-2 text-brand-primary/35 hover:text-brand-primary hover:bg-brand-primary-light rounded-xl transition-all"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            /* ── Signed-out ── */
            <button
              onClick={openLoginModal}
              className="px-5 py-2.5 bg-brand-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-primary-dark active:scale-[0.97] transition-all"
              style={{ boxShadow: 'var(--shadow-brand-primary)' }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

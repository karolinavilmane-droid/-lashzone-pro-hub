/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
      className="flex items-center justify-between px-4 md:px-10 h-16 md:h-20 bg-gradient-to-r from-[#D4C4EE] via-[#E6D8FF] to-[#EBE0FF] sticky top-0 z-[40]"
      style={{ borderBottom: '1px solid rgba(155, 93, 229, 0.28)', boxShadow: '0 2px 24px rgba(45,10,94,0.12)' }}
    >
      {/* ── Left: logo + section title ── */}
      <div className="flex items-center gap-3 md:gap-8">
        <div
          className="flex items-center cursor-pointer hover:opacity-85 transition-opacity"
          onClick={onHome}
        >
          <img
            src="/logo.jpg"
            alt="LashZone logo"
            className="h-9 md:h-14 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div
          className="flex items-center gap-2 md:gap-6 pl-3 md:pl-8"
          style={{ borderLeft: '1px solid rgba(155, 93, 229, 0.30)' }}
        >
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-[#9B5DE5]/50 text-lg md:text-2xl font-light leading-none">/</span>
            <h2 className="text-[15px] md:text-[22px] font-serif font-black text-[#0D1856] tracking-tight">
              {sectionTitle}
            </h2>
          </div>

          {selectedId && (
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(155,93,229,0.14)', border: '1px solid rgba(155,93,229,0.30)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#9B5DE5]" />
              <span className="text-[10px] font-black text-[#6B2FA0] uppercase tracking-[0.2em]">
                Active Section
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Right: search + user ── */}
      <div className="flex items-center gap-2 md:gap-5">
        {/* Search */}
        <div
          className="hidden lg:flex items-center rounded-xl px-4 py-2.5 group transition-all w-64 focus-within:border-brand-accent/50"
          style={{ background: 'rgba(244,162,97,0.06)', border: '1px solid rgba(155,93,229,0.25)' }}
          onFocusCapture={e => (e.currentTarget.style.boxShadow = 'var(--shadow-brand-md)')}
          onBlurCapture={e  => (e.currentTarget.style.boxShadow = 'var(--shadow-brand-sm)')}
        >
          <Search size={15} className="text-[#9B5DE5]/45 group-focus-within:text-[#9B5DE5] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search resources..."
            className="bg-transparent border-none outline-none px-2 text-[12px] font-medium text-[#000] placeholder:text-[#999] w-full"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Bell */}
          <button
            className="p-1.5 md:p-2.5 text-[#9B5DE5]/45 hover:text-[#9B5DE5] hover:bg-[#EBE0FF] rounded-lg md:rounded-xl transition-all relative"
          >
            <Bell size={16} className="md:w-[20px] md:h-[20px]" />
            <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2 w-1.5 md:w-2 h-1.5 md:h-2 bg-brand-accent rounded-full border-2 border-white" style={{ boxShadow: '0 0 6px rgba(155,93,229,0.5)' }} />
          </button>

          <div className="h-6 md:h-8 w-px mx-0.5 md:mx-1" style={{ background: 'rgba(155,93,229,0.25)' }} />

          {user ? (
            /* ── Logged-in user block ── */
            <div className="flex items-center gap-1 md:gap-3 pl-1 group">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black text-[#0D1856] uppercase tracking-widest leading-none mb-1">
                  {name}
                </p>
                <p className="text-[9px] font-bold text-[#555] leading-none">
                  {user.email}
                </p>
              </div>
              {/* Avatar */}
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-[#9B5DE5] flex items-center justify-center text-white font-black text-[10px] md:text-xs border-2 border-white"
                style={{ boxShadow: '0 4px 12px rgba(155,93,229,0.35)' }}
              >
                {initials}
              </div>
              <button
                onClick={signOut}
                title="Sign out"
                className="p-1.5 md:p-2 text-[#9B5DE5]/35 hover:text-[#9B5DE5] hover:bg-[#F4EDFF] rounded-lg md:rounded-xl transition-all"
              >
                <LogOut size={14} className="md:w-[16px] md:h-[16px]" />
              </button>
            </div>
          ) : (
            /* ── Signed-out ── */
            <button
              onClick={openLoginModal}
              className="px-3 md:px-5 py-1.5 md:py-2.5 bg-[#F4A261] text-white rounded-lg md:rounded-xl font-bold text-[11px] md:text-xs uppercase tracking-widest hover:bg-[#E88A3D] active:scale-[0.97] transition-all"
              style={{ boxShadow: '0 4px 14px rgba(244,162,97,0.45), 0 1px 4px rgba(244,162,97,0.25)' }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

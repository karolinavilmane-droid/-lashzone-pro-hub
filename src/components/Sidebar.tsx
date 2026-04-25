/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Menu,
  ClipboardList,
  ShieldAlert
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRANDING } from '../branding';

interface SidebarProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHome: () => void;
}

const NAV_ITEMS = [
  { id: 'consultation',   menuTitle: 'Consultation',      iconName: 'ClipboardList' },
  { id: 'allergy-safety', menuTitle: 'Allergy and Safety', iconName: 'ShieldAlert' }
];

const ICON_MAP: Record<string, any> = { ClipboardList, ShieldAlert };

export default function Sidebar({ selectedId, onSelect, onHome }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const NavItem = ({ item, isMobile = false }: { item: any; isMobile?: boolean }) => {
    const Icon = ICON_MAP[item.iconName] || ClipboardList;
    const isActive = selectedId === item.id;

    return (
      <button
        onClick={() => {
          onSelect(item.id);
          if (isMobile) setIsOpen(false);
        }}
        className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-250 flex items-center gap-3.5 group relative overflow-hidden ${
          isActive
            ? 'bg-[#9B5DE5]/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_4px_20px_-4px_rgba(0,0,0,0.30)]'
            : 'hover:bg-white/[0.10] text-white/85 hover:text-white'
        }`}
      >
        {/* Icon */}
        <div className={`flex-shrink-0 transition-all duration-250 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
          <Icon
            size={18}
            className={`transition-colors duration-200 ${
              isActive ? 'text-brand-accent' : 'text-white/70 group-hover:text-white/90'
            }`}
          />
        </div>

        {/* Label */}
        <span className={`text-[13px] tracking-tight transition-all duration-250 ${
          isActive ? 'opacity-100 font-bold text-white' : 'opacity-100 group-hover:opacity-100 font-bold'
        }`}>
          {item.menuTitle}
        </span>

        {/* Active accent bar */}
        {isActive && (
          <motion.div
            layoutId="active-nav-indicator"
            className="absolute left-0 w-[3px] h-[45%] bg-brand-accent rounded-r-full shadow-[0_0_8px_rgba(155,93,229,0.6)]"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          />
        )}
      </button>
    );
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-brand-primary-deep text-white">
      {/* Branding */}
      <div className="px-8 pt-8 pb-7" style={{ borderBottom: '1px solid rgba(155,93,229,0.10)' }}>
        <div
          className="flex items-center justify-center cursor-pointer group"
          onClick={() => { onHome(); if (isMobile) setIsOpen(false); }}
        >
          {BRANDING.logoUrl ? (
            <div className="relative rounded-xl bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.02)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.30)] group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <img
                src="/logo.jpg"
                alt={BRANDING.businessName}
                className="h-14 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-brand-accent flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {BRANDING.logoPrefix}
            </div>
          )}
        </div>
      </div>

      {/* Section label */}
      <div className="px-5 pt-6 pb-2">
        <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.28em]">Navigation</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-4 space-y-0.5 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.id} item={item} isMobile={isMobile} />
        ))}
      </nav>

      {/* Footer status */}
      <div className="p-5 border-t border-white/8">
        <div className="p-4 bg-white/8 rounded-2xl border border-white/10">
          <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em] mb-2.5">
            Document Library
          </p>
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-ping absolute inset-0 opacity-70" />
              <div className="w-2 h-2 rounded-full bg-green-400 relative z-10" />
            </div>
            <span className="text-[10px] font-bold text-white/75 uppercase tracking-widest">Ready</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-16 right-4 w-10 h-10 bg-brand-accent text-white rounded-xl flex items-center justify-center z-[45] transition-all hover:bg-brand-accent-dark active:scale-95 shadow-brand-md"
        style={{ boxShadow: 'var(--shadow-brand-md)' }}
      >
        <Menu size={20} />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] z-[70] md:hidden shadow-2xl overflow-hidden"
            >
              <SidebarContent isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar — right-edge shadow creates separation from content */}
      <aside
        className="hidden md:flex flex-col w-[300px] h-screen sticky top-0 bg-brand-primary-deep z-50"
        style={{ boxShadow: '8px 0 32px rgba(45, 10, 94, 0.30), 1px 0 0 rgba(255,255,255,0.05)' }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}

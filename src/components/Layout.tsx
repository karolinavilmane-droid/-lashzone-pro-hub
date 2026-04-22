/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onHome?: () => void;
  viewType?: 'dashboard' | 'consultation';
  onConsultation?: () => void;
  onDashboard?: () => void;
}

export default function Layout({ children, selectedId, onSelect, onHome }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-brand-bg-soft text-brand-ink selection:bg-brand-primary/20 selection:text-brand-primary overflow-hidden">
      {/* Sidebar - Fixed Rail */}
      <Sidebar selectedId={selectedId || null} onSelect={onSelect || (() => {})} onHome={onHome || (() => {})} />

      {/* Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header Bar */}
        <Header selectedId={selectedId || null} onHome={onHome || (() => {})} />

        {/* Main Viewport */}
        <main className="flex-1 overflow-y-auto bg-brand-bg-soft custom-scrollbar relative">
          <div className="min-h-full">
            {children}
          </div>

          {/* Subtle Platform Details */}
          <div className="hidden lg:block fixed bottom-8 right-8 pointer-events-none opacity-[0.05] z-[100] text-[80px] font-serif font-black select-none pointer-events-none whitespace-nowrap overflow-hidden italic leading-none">
            LashZone Pro
          </div>
        </main>
      </div>

      {/* Scrollbar Customization - Tailwind standard plugin not needed, use base CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(154, 126, 212, 0.18);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(154, 126, 212, 0.32);
        }
      `}</style>
    </div>
  );
}

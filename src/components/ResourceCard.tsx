/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Resource } from '../products';
import {
  BookOpen, CheckCircle2, Layers, ClipboardList, FileText,
  Download, Eye, Lock, ShieldAlert,
} from 'lucide-react';
import { downloadDocument, previewDocument } from '../utils/downloadHelper';
import { useDocumentAccess } from '../hooks/useDocumentAccess';
import { useUI } from '../contexts/UIContext';

const ICONS: Record<string, any> = {
  BookOpen, CheckCircle2, Layers, ClipboardList,
  FileText, Download, Eye, Lock, ShieldAlert,
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = ICONS[resource.iconName] || FileText;
  const { isUnlocked, isLoggedIn } = useDocumentAccess(
    resource.id,
    resource.isFree,
    resource.requiresAccess
  );
  const { openLoginModal } = useUI();

  const isLocked = !resource.isFree && resource.requiresAccess && !isUnlocked;
  const previewLocked = isLocked && !resource.previewAvailable;

  const handleDownload = () => {
    if (resource.fileUrl) {
      downloadDocument(resource.fileUrl, `${resource.title}.pdf`, resource.storageKey);
    }
  };

  const handlePreview = () => {
    if (resource.previewUrl) {
      previewDocument(resource.previewUrl, resource.storageKey);
    }
  };

  const handleUnlock = () => {
    if (!isLoggedIn) { openLoginModal(); return; }
    if (resource.paymentLink) window.open(resource.paymentLink, '_blank');
  };

  // ── Badge ────────────────────────────────────────────────────────────────────
  // Free: solid purple  |  Granted: solid orange  |  Locked: clear warm-gray
  const accessBadge = resource.isFree
    ? { label: 'Free',           cls: 'bg-brand-primary text-white' }
    : isUnlocked
      ? { label: 'Access Granted', cls: 'bg-brand-accent text-white' }
      : { label: 'Locked',         cls: 'bg-[#EDE8F5] text-[#7A6499]' };

  // ── Card surface ──────────────────────────────────────────────────────────────
  const cardCls = isLocked
    ? [
        'bg-white',
        'border border-[rgba(154,126,212,0.18)]',
        'shadow-[0_1px_4px_rgba(42,27,74,0.06)]',
        'hover:shadow-[0_4px_18px_rgba(42,27,74,0.10)]',
        'hover:border-[rgba(154,126,212,0.30)]',
      ].join(' ')
    : [
        'bg-white',
        'border border-[rgba(154,126,212,0.32)]',
        'shadow-brand-sm',
        'hover:shadow-brand-md',
        'hover:border-[rgba(154,126,212,0.52)]',
        'hover:-translate-y-0.5',
      ].join(' ');

  // ── Icon box ──────────────────────────────────────────────────────────────────
  const iconBg = resource.isFree
    ? 'rgba(154,126,212,0.18)'
    : isUnlocked
      ? 'rgba(255,128,80,0.16)'
      : 'rgba(154,126,212,0.08)';

  const iconColor = resource.isFree
    ? 'text-brand-primary'
    : isUnlocked
      ? 'text-brand-accent'
      : 'text-[#B8A6D8]';

  return (
    <div className={`rounded-xl p-6 flex flex-col h-full transition-all duration-200 ${cardCls}`}>

      {/* ── Content ── */}
      <div className="flex-1">
        <div className="w-11 h-11 mb-5 flex items-center justify-center rounded-xl" style={{ background: iconBg }}>
          <Icon className={iconColor} size={22} />
        </div>

        <h3 className="text-[15px] leading-snug mb-2 font-bold text-[#000000]">
          {resource.title}
        </h3>

        <p className="text-[13px] leading-relaxed mb-5 text-[#333]">
          {resource.shortDescription}
        </p>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-[rgba(154,126,212,0.12)] text-brand-primary-dark text-[10px] rounded-md font-bold tracking-wider uppercase">
            {resource.documentType}
          </span>
          <span className={`px-2.5 py-1 text-[10px] rounded-md font-bold tracking-wider uppercase ${accessBadge.cls}`}>
            {accessBadge.label}
          </span>
        </div>
      </div>

      {/* ── Divider + Actions ── */}
      <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(154,126,212,0.14)' }}>
        <div className="flex flex-col sm:flex-row gap-2.5">
          {isLocked ? (
            <>
              {/* ── Sign In to Unlock / Unlock Access ──────────────────────────
                  Orange gradient — brand accent, signals "action required".
                  Lifts on hover, deepens on active press.                      */}
              <button
                onClick={handleUnlock}
                className="flex-1 py-2.5 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 text-white select-none"
                style={{
                  background: 'linear-gradient(135deg, #FF8050 0%, #E8612A 100%)',
                  boxShadow: 'var(--shadow-brand-accent)',
                  transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-brand-accent-hover)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.filter = 'brightness(1.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-brand-accent)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(0.975)';
                  e.currentTarget.style.filter = 'brightness(0.95)';
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.filter = 'brightness(1.06)';
                }}
              >
                <Lock size={14} strokeWidth={2.5} />
                {!isLoggedIn ? 'Sign In to Unlock' : 'Unlock Access'}
              </button>

              {/* ── Preview (locked, preview available) ────────────────────────
                  Outlined secondary — same family as the unlocked preview.
                  ── Preview (fully disabled) ───────────────────────────────────
                  Visibly inactive: reduced opacity, lock icon, no-cursor.
                  Still has a border so it reads as a button slot, not empty.   */}
              {previewLocked ? (
                <div
                  className="flex-1 py-2.5 rounded-xl text-[13px] flex items-center justify-center gap-2 select-none cursor-not-allowed"
                  style={{
                    border: '1.5px solid rgba(154,126,212,0.14)',
                    color: 'rgba(0,0,0,0.45)',
                    background: 'rgba(154,126,212,0.03)',
                  }}
                >
                  <Lock size={13} strokeWidth={2} />
                  <span className="font-medium">Preview</span>
                </div>
              ) : (
                <button
                  onClick={handlePreview}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 select-none"
                  style={{
                    border: '1.5px solid rgba(154,126,212,0.40)',
                    color: '#6B4FA0',
                    background: '#fff',
                    transition: 'transform 160ms ease, box-shadow 160ms ease, background 160ms ease, border-color 160ms ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#EDE6FF';
                    e.currentTarget.style.borderColor = 'rgba(154,126,212,0.65)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(154,126,212,0.18)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = 'rgba(154,126,212,0.40)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onMouseDown={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(0.975)';
                  }}
                  onMouseUp={e => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                >
                  <Eye size={14} strokeWidth={2.5} /> Preview
                </button>
              )}
            </>
          ) : (
            <>
              {/* ── Download ───────────────────────────────────────────────────
                  Primary CTA. Purple gradient, coloured shadow.
                  Lifts +1px on hover, shadow deepens, brightens slightly.
                  Presses to scale(0.975) for tactile feedback.                 */}
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 text-white select-none"
                style={{
                  background: 'linear-gradient(135deg, #9A7ED4 0%, #6B4FA0 100%)',
                  boxShadow: 'var(--shadow-brand-primary)',
                  transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-brand-primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.filter = 'brightness(1.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-brand-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(0.975)';
                  e.currentTarget.style.filter = 'brightness(0.93)';
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.filter = 'brightness(1.08)';
                }}
              >
                <Download size={14} strokeWidth={2.5} /> Download
              </button>

              {/* ── Preview ────────────────────────────────────────────────────
                  Secondary outlined. Visible 1.5px purple border, dark text.
                  Fills to light lavender on hover, lifts +1px, border deepens. */}
              <button
                onClick={handlePreview}
                className="flex-1 py-2.5 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 select-none"
                style={{
                  border: '1.5px solid rgba(154,126,212,0.42)',
                  color: '#6B4FA0',
                  background: '#fff',
                  transition: 'transform 160ms ease, box-shadow 160ms ease, background 160ms ease, border-color 160ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#EDE6FF';
                  e.currentTarget.style.borderColor = 'rgba(154,126,212,0.68)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(154,126,212,0.20)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = 'rgba(154,126,212,0.42)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(0.975)';
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
              >
                <Eye size={14} strokeWidth={2.5} /> Preview
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

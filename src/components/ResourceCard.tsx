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

  // ── Badge ──────────────────────────────────────────────────────────────────
  const accessBadge = resource.isFree
    ? { label: 'Free',           cls: 'bg-[#F4A261] text-white' }
    : isUnlocked
      ? { label: 'Access Granted', cls: 'bg-[#9B5DE5] text-white' }
      : { label: 'Locked',         cls: 'bg-[#EDE8F5] text-[#5B3E8A]' };

  // ── Card surface ────────────────────────────────────────────────────────────
  const cardCls = isLocked
    ? [
        'bg-white',
        'border border-[rgba(155,93,229,0.22)]',
        'shadow-[0_2px_10px_rgba(42,27,74,0.10)]',
        'hover:shadow-[0_8px_28px_rgba(42,27,74,0.16)]',
        'hover:border-[rgba(155,93,229,0.40)]',
      ].join(' ')
    : [
        'bg-white',
        'border border-[rgba(155,93,229,0.40)]',
        'shadow-brand-sm',
        'hover:shadow-[0_8px_28px_rgba(42,27,74,0.16)]',
        'hover:border-[rgba(155,93,229,0.65)]',
        'hover:-translate-y-0.5',
      ].join(' ');

  // ── Icon box ──────────────────────────────────────────────────────────────
  const iconBg = resource.isFree
    ? 'rgba(244,162,97,0.18)'
    : isUnlocked
      ? 'rgba(155,93,229,0.18)'
      : 'rgba(155,93,229,0.10)';

  const iconColor = resource.isFree
    ? 'text-[#F4A261]'
    : isUnlocked
      ? 'text-[#9B5DE5]'
      : 'text-[#7B5EA7]';

  // Shared button styles for consistency
  const btnBase = 'flex-1 py-2.5 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 select-none';

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
          <span className="px-2.5 py-1 bg-[rgba(155,93,229,0.10)] text-[#0D1856] text-[10px] rounded-md font-bold tracking-wider uppercase">
            {resource.documentType}
          </span>
          <span className={`px-2.5 py-1 text-[10px] rounded-md font-bold tracking-wider uppercase ${accessBadge.cls}`}>
            {accessBadge.label}
          </span>
        </div>
      </div>

      {/* ── Divider + Actions ── */}
      <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(155,93,229,0.12)' }}>
        <div className="flex flex-col sm:flex-row gap-2.5">
          {isLocked ? (
            <>
              {/* SIGN IN TO UNLOCK — Bright orange gradient (primary) */}
              <button
                onClick={handleUnlock}
                className={`${btnBase} text-white`}
                style={{
                  background: 'linear-gradient(135deg, #F4A261 0%, #E8842A 100%)',
                  boxShadow: '0 4px 14px rgba(244,162,97,0.45), 0 1px 4px rgba(244,162,97,0.25)',
                  transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(244,162,97,0.55), 0 2px 8px rgba(244,162,97,0.28)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.filter = 'brightness(1.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(244,162,97,0.45), 0 1px 4px rgba(244,162,97,0.25)';
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

              {/* PREVIEW — Disabled or available, both purple-based */}
              {previewLocked ? (
                <div
                  className={`${btnBase} cursor-not-allowed`}
                  style={{
                    border: '2px solid rgba(155,93,229,0.22)',
                    color: 'rgba(107,79,160,0.55)',
                    background: 'rgba(155,93,229,0.04)',
                  }}
                >
                  <Lock size={13} strokeWidth={2} />
                  <span className="font-medium">Preview</span>
                </div>
              ) : (
                <button
                  onClick={handlePreview}
                  className={`${btnBase}`}
                  style={{
                    border: '2.5px solid #9B5DE5',
                    color: '#6B2FA0',
                    fontWeight: 700,
                    background: '#fff',
                    transition: 'transform 160ms ease, box-shadow 160ms ease, background 160ms ease, border-color 160ms ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#E8D8FF';
                    e.currentTarget.style.borderColor = '#7C3AED';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(155,93,229,0.28)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = '#9B5DE5';
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
              {/* DOWNLOAD — ORANGE (primary action) */}
              <button
                onClick={handleDownload}
                className={`${btnBase} text-white`}
                style={{
                  background: 'linear-gradient(135deg, #F4A261 0%, #E8842A 100%)',
                  boxShadow: '0 4px 14px rgba(244,162,97,0.45), 0 1px 4px rgba(244,162,97,0.25)',
                  transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(244,162,97,0.55), 0 2px 8px rgba(244,162,97,0.28)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.filter = 'brightness(1.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(244,162,97,0.45), 0 1px 4px rgba(244,162,97,0.25)';
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
                <Download size={14} strokeWidth={2.5} /> Download
              </button>

              {/* PREVIEW — Purple outlined (secondary action) */}
              <button
                onClick={handlePreview}
                className={`${btnBase}`}
                style={{
                  border: '2.5px solid #9B5DE5',
                  color: '#6B2FA0',
                  fontWeight: 700,
                  background: '#fff',
                  transition: 'transform 160ms ease, box-shadow 160ms ease, background 160ms ease, border-color 160ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#E8D8FF';
                  e.currentTarget.style.borderColor = '#7C3AED';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(155,93,229,0.28)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#9B5DE5';
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

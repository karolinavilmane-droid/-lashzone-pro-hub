/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../lib/supabase';

// ─────────────────────────────────────────────────────────────────────────────
// Document download and preview helpers
//
// Two delivery modes:
//
//   Public path  (free resources)
//     fileUrl starts with '/' → served directly from public/documents/
//     e.g. '/documents/consultation/free-guide.pdf'
//
//   Supabase Storage  (paid resources)
//     storageKey is set → file lives in the 'private-documents' bucket
//     e.g. 'consultation/checklist.pdf'
//     A signed URL (60s expiry) is generated on demand so the URL cannot
//     be extracted and shared to bypass access control.
// ─────────────────────────────────────────────────────────────────────────────

const PRIVATE_BUCKET = 'private-documents';
const SIGNED_URL_EXPIRY_SECONDS = 60;

/** Resolve a public or private file URL before use */
async function resolveUrl(fileUrl: string, storageKey?: string): Promise<string | null> {
  if (storageKey) {
    const { data, error } = await supabase.storage
      .from(PRIVATE_BUCKET)
      .createSignedUrl(storageKey, SIGNED_URL_EXPIRY_SECONDS);

    if (error || !data) {
      console.error('Failed to generate signed URL:', error);
      return null;
    }
    return data.signedUrl;
  }

  return fileUrl;
}

/**
 * Download a document.
 * @param fileUrl  Public path (e.g. '/documents/...')
 * @param fileName Suggested save-as name
 * @param storageKey  Supabase Storage key for paid docs (e.g. 'consultation/checklist.pdf')
 */
export async function downloadDocument(
  fileUrl: string,
  fileName?: string,
  storageKey?: string
) {
  const url = await resolveUrl(fileUrl, storageKey);
  if (!url) return;

  const filename = fileName || fileUrl.split('/').pop() || 'document.pdf';

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Open a document for preview in a new tab.
 * @param previewUrl  Public path or signed URL
 * @param storageKey  Supabase Storage key for paid docs
 */
export async function previewDocument(previewUrl: string, storageKey?: string) {
  const url = await resolveUrl(previewUrl, storageKey);
  if (!url) return;
  window.open(url, '_blank');
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ─────────────────────────────────────────────────────────────────────────────
// RESOURCE DATA STRUCTURE
//
// To add a new document:
//   Free resource  → drop PDF in public/documents/<folder>/, set isFree: true
//   Paid resource  → upload PDF to Supabase Storage bucket 'private-documents',
//                    set isFree: false and storageKey to the bucket path
//
// See public/documents/HOW_TO_ADD_DOCUMENTS.md for full instructions.
// ─────────────────────────────────────────────────────────────────────────────

export interface Resource {
  id: string;
  title: string;
  shortDescription: string;
  category: string;           // display label on the card
  documentType: string;       // 'PDF' | 'DOCX' etc.

  // ── Delivery ────────────────────────────────────────────────────────────────
  /** Public path for free resources, served from /public. e.g. '/documents/consultation/free-guide.pdf' */
  fileUrl?: string;
  /** Supabase Storage key in the 'private-documents' bucket for paid resources.
   *  e.g. 'consultation/checklist.pdf'
   *  When set, a signed URL (60s expiry) is generated on each download request. */
  storageKey?: string;
  /** URL or path for the in-browser preview. Usually same as fileUrl for free, or a public preview for paid. */
  previewUrl?: string;

  // ── Access control ──────────────────────────────────────────────────────────
  isFree: boolean;            // true = accessible to all without login
  requiresAccess: boolean;    // true = must be in user_access table to download
  previewAvailable?: boolean; // true = preview works even when download is locked

  // ── Payment ─────────────────────────────────────────────────────────────────
  /** Stripe Payment Link URL. Add when ready.
   *  The 'Unlock Access' button opens this link in a new tab.
   *  After payment, your Stripe webhook inserts a row in user_access.
   *  See supabase/migrations/001_initial.sql for the schema. */
  paymentLink?: string;

  iconName: string;
}

export interface Product {
  id: string;
  menuTitle: string;
  guideTitle?: string;
  shortDescription?: string;
  whoItIsFor?: string;
  includedItems?: string[];
  benefits?: string[];
  buttonText?: string;
  paidTitle?: string;
  category?: string;
  iconName: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTATION RESOURCES
// Free files  → public/documents/consultation/
// Paid files  → Supabase Storage: private-documents/consultation/
// ─────────────────────────────────────────────────────────────────────────────
export const RESOURCES: Resource[] = [
  {
    id: 'free-guide',
    title: 'Free Guide',
    shortDescription: 'An introductory guide to professional lash consultations, covering the basics of client assessment and preparation.',
    category: 'Consultation',
    documentType: 'PDF',
    isFree: true,
    requiresAccess: false,
    previewAvailable: true,
    fileUrl: '/documents/consultation/free-guide.pdf',
    previewUrl: '/documents/consultation/free-guide.pdf',
    iconName: 'BookOpen'
  },
  {
    id: 'checklist',
    title: 'Checklist',
    shortDescription: 'Essential pre-consultation checklist to ensure all necessary preparations are in place before meeting with clients.',
    category: 'Consultation',
    documentType: 'PDF',
    isFree: false,
    requiresAccess: true,
    previewAvailable: false,
    storageKey: 'consultation/checklist.pdf',  // file in Supabase Storage
    paymentLink: '',                            // TODO: paste Stripe Payment Link here
    iconName: 'CheckCircle2'
  },
  {
    id: 'step-by-step-structure',
    title: 'Step by Step Consultation Structure',
    shortDescription: 'Detailed step-by-step framework for conducting comprehensive lash consultations from start to finish.',
    category: 'Consultation',
    documentType: 'PDF',
    isFree: false,
    requiresAccess: true,
    previewAvailable: false,
    storageKey: 'consultation/step-by-step-structure.pdf',
    paymentLink: '',  // TODO: paste Stripe Payment Link here
    iconName: 'Layers'
  },
  {
    id: 'consultation-form',
    title: 'Consultation Form',
    shortDescription: 'Professional consultation form template for recording client details, preferences, and treatment planning.',
    category: 'Consultation',
    documentType: 'PDF',
    isFree: false,
    requiresAccess: true,
    previewAvailable: false,
    storageKey: 'consultation/consultation-form.pdf',
    paymentLink: '',  // TODO: paste Stripe Payment Link here
    iconName: 'ClipboardList'
  }
];

export const PRODUCTS: Product[] = [];

// ─────────────────────────────────────────────────────────────────────────────
// ALLERGY & SAFETY RESOURCES
// Free files  → public/documents/allergy-safety/
// Paid files  → Supabase Storage: private-documents/allergy-safety/
// ─────────────────────────────────────────────────────────────────────────────
export const ALLERGY_SAFETY_RESOURCES: Resource[] = [
  {
    id: 'allergy-guide',
    title: 'Allergy & Sensitivity Guide',
    shortDescription: 'Comprehensive guide to identifying and managing client allergies and sensitivities for safe lash application.',
    category: 'Allergy & Safety',
    documentType: 'PDF',
    isFree: true,
    requiresAccess: false,
    previewAvailable: true,
    fileUrl: '/documents/allergy-safety/allergy-guide.pdf',
    previewUrl: '/documents/allergy-safety/allergy-guide.pdf',
    iconName: 'ShieldAlert'
  },
  {
    id: 'safety-protocols',
    title: 'Safety Protocols',
    shortDescription: 'Essential safety protocols and procedures to maintain a clean, hygienic, and compliant treatment environment.',
    category: 'Allergy & Safety',
    documentType: 'PDF',
    isFree: false,
    requiresAccess: true,
    previewAvailable: false,
    storageKey: 'allergy-safety/safety-protocols.pdf',
    paymentLink: '',  // TODO: paste Stripe Payment Link here
    iconName: 'CheckCircle2'
  },
  {
    id: 'ingredient-reference',
    title: 'Ingredient Reference Guide',
    shortDescription: 'Detailed reference guide for product ingredients, allergens, and compatibility information.',
    category: 'Allergy & Safety',
    documentType: 'PDF',
    isFree: false,
    requiresAccess: true,
    previewAvailable: false,
    storageKey: 'allergy-safety/ingredient-reference.pdf',
    paymentLink: '',  // TODO: paste Stripe Payment Link here
    iconName: 'BookOpen'
  },
  {
    id: 'client-health-form',
    title: 'Client Health & Safety Form',
    shortDescription: 'Professional health and safety form for screening allergies and contraindications before treatment.',
    category: 'Allergy & Safety',
    documentType: 'PDF',
    isFree: false,
    requiresAccess: true,
    previewAvailable: false,
    storageKey: 'allergy-safety/client-health-form.pdf',
    paymentLink: '',  // TODO: paste Stripe Payment Link here
    iconName: 'ClipboardList'
  }
];

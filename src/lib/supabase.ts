/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

// ─────────────────────────────────────────────────────────────────────────────
// Supabase client
//
// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.
// Get these from: Supabase dashboard → Project Settings → API
// ─────────────────────────────────────────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key'
);

// ─────────────────────────────────────────────────────────────────────────────
// Database types — mirrors the Supabase schema in supabase/migrations/
// ─────────────────────────────────────────────────────────────────────────────
export interface UserAccessRow {
  id: string;
  user_id: string;
  resource_id: string;
  granted_at: string;
  granted_by: 'admin' | 'stripe' | 'manual';
  stripe_session_id: string | null;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

// ─────────────────────────────────────────────────────────────────────────────
// AccessContext
//
// Fetches the set of resource IDs the current user has been granted access to.
// This is populated from the `user_access` table in Supabase.
//
// Future: call refresh() after a Stripe payment confirmation to re-fetch access.
// ─────────────────────────────────────────────────────────────────────────────

interface AccessContextValue {
  /** Set of resource IDs this user can download */
  grantedIds: Set<string>;
  isLoading: boolean;
  /** Call after payment confirmation to re-fetch the latest access */
  refresh: () => Promise<void>;
}

const AccessContext = createContext<AccessContextValue | null>(null);

export function AccessProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [grantedIds, setGrantedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const fetchAccess = async () => {
    if (!user || !isSupabaseConfigured) {
      setGrantedIds(new Set());
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase
      .from('user_access')
      .select('resource_id')
      .eq('user_id', user.id);

    if (!error && data) {
      setGrantedIds(new Set(data.map((row: { resource_id: string }) => row.resource_id)));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAccess();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <AccessContext.Provider value={{ grantedIds, isLoading, refresh: fetchAccess }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error('useAccess must be used inside AccessProvider');
  return ctx;
}

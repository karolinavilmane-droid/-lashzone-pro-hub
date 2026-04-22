/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useAuth } from '../contexts/AuthContext';
import { useAccess } from '../contexts/AccessContext';

// ─────────────────────────────────────────────────────────────────────────────
// useDocumentAccess
//
// Determines whether the current user can access a specific resource.
//
// Access rules:
//   isFree = true            → always accessible, no login required
//   requiresAccess = false   → always accessible
//   requiresAccess = true    → accessible only if resource_id is in the
//                              user's `user_access` rows in Supabase
// ─────────────────────────────────────────────────────────────────────────────

export function useDocumentAccess(
  resourceId: string,
  isFree: boolean,
  requiresAccess: boolean
) {
  const { user } = useAuth();
  const { grantedIds, isLoading } = useAccess();

  const isUnlocked =
    isFree ||
    !requiresAccess ||
    grantedIds.has(resourceId);

  return {
    isUnlocked,
    isLoggedIn: Boolean(user),
    isLoading,
  };
}

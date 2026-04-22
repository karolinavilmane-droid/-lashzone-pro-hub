/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// UIContext — controls global UI state that components need to trigger
// (e.g. opening the login modal from inside a resource card)
// ─────────────────────────────────────────────────────────────────────────────

interface UIContextValue {
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const UIContext = createContext<UIContextValue>({
  loginModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

export function UIProvider({ children }: { children: ReactNode }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <UIContext.Provider value={{
      loginModalOpen,
      openLoginModal: () => setLoginModalOpen(true),
      closeLoginModal: () => setLoginModalOpen(false),
    }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);

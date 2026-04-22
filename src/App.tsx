/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import Layout from './components/Layout';
import ConsultationView from './components/ConsultationView';
import AllergySafetyView from './components/AllergySafetyView';
import LoginModal from './components/LoginModal';
import { AnimatePresence } from 'motion/react';
import { AuthProvider } from './contexts/AuthContext';
import { AccessProvider } from './contexts/AccessContext';
import { UIProvider } from './contexts/UIContext';

type ViewType = 'consultation' | 'allergy-safety';

function AppShell() {
  const [viewType, setViewType] = useState<ViewType>('consultation');
  const [selectedId, setSelectedId] = useState<string>('consultation');

  const handleNavigation = useCallback((id: string) => {
    setSelectedId(id);
    if (id === 'consultation') setViewType('consultation');
    else if (id === 'allergy-safety') setViewType('allergy-safety');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleHome = useCallback(() => {
    setSelectedId('consultation');
    setViewType('consultation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Layout selectedId={selectedId} onSelect={handleNavigation} onHome={handleHome}>
        <AnimatePresence mode="wait">
          {viewType === 'consultation' && <ConsultationView key="consultation" />}
          {viewType === 'allergy-safety' && <AllergySafetyView key="allergy-safety" />}
        </AnimatePresence>
      </Layout>

      {/* Login modal — rendered outside Layout so it overlays everything */}
      <LoginModal />
    </>
  );
}

export default function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <AccessProvider>
          <AppShell />
        </AccessProvider>
      </AuthProvider>
    </UIProvider>
  );
}

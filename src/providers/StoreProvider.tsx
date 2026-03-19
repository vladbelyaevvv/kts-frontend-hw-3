'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { rootStore } from '@stores/rootStore';

interface Stores {
  authStore: typeof rootStore.authStore;
  cartStore: typeof rootStore.cartStore;
}

const StoresContext = createContext<Stores | null>(null);

export function useStores() {
  const context = useContext(StoresContext);
  if (!context) {
    throw new Error('useStores must be used within a StoreProvider');
  }
  return context;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [stores] = useState<Stores>(() => ({
    authStore: rootStore.authStore,
    cartStore: rootStore.cartStore,
  }));

  return (
    <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
  );
}

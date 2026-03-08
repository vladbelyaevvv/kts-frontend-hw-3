'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authStore } from '@stores/authStore';
import { cartStore } from '@stores/cartStore';

interface Stores {
  authStore: typeof authStore;
  cartStore: typeof cartStore;
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
  const [stores, setStores] = useState<Stores | null>(null);

  useEffect(() => {
    setStores({
      authStore,
      cartStore,
    });
  }, []);

  if (!stores) {
    return null;
  }

  return (
    <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
  );
}

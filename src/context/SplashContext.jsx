import { createContext, useContext, useState, useCallback, useRef } from 'react';

const SplashContext = createContext(null);

export function SplashProvider({ children }) {
  const [phase, setPhase] = useState('hidden');
  const [showContent, setShowContent] = useState(false);
  const mountedAtRef = useRef(0);

  const show = useCallback((minDuration = 0) => {
    setShowContent(true);
    setPhase('visible');
    mountedAtRef.current = minDuration > 0 ? performance.now() : 0;
  }, []);

  const waitForMinDuration = useCallback(async (minDuration) => {
    if (mountedAtRef.current <= 0) return;
    const elapsed = performance.now() - mountedAtRef.current;
    const remaining = Math.max(0, minDuration - elapsed);
    if (remaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, remaining));
    }
    mountedAtRef.current = 0;
  }, []);

  const fadeOut = useCallback(() => {
    setPhase('fading');
  }, []);

  const hide = useCallback(() => {
    setPhase('hidden');
    setShowContent(false);
  }, []);

  return (
    <SplashContext.Provider
      value={{ phase, showContent, show, fadeOut, hide, waitForMinDuration }}
    >
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const ctx = useContext(SplashContext);
  if (!ctx) {
    throw new Error('useSplash must be used within a SplashProvider');
  }
  return ctx;
}

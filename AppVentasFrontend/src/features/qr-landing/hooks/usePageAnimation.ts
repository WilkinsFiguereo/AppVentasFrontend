/* ═══════════════════════════════════════════════════════
   HOOK: usePageAnimation
   Location: src/features/qr-landing/hooks/usePageAnimation.ts
═══════════════════════════════════════════════════════ */

import { useState, useEffect } from "react";

export function usePageAnimation(delay: number = 100) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return animateIn;
}
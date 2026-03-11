/* ═══════════════════════════════════════════════════════
   UI COMPONENT: Stars
   Location: src/features/qr-landing/ui/Stars.tsx
═══════════════════════════════════════════════════════ */

import { tokens } from "../theme/tokens";

interface StarsProps {
  rating: number;
  size?: number;
}

export function Stars({ rating, size = 13 }: StarsProps) {
  return (
    <span style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 13 13">
          <polygon
            points="6.5,1 8,4.5 12,4.8 9.3,7.3 10.1,11.2 6.5,9.3 2.9,11.2 3.7,7.3 1,4.8 5,4.5"
            fill={i <= Math.round(rating) ? tokens.warn : tokens.border}
          />
        </svg>
      ))}
    </span>
  );
}
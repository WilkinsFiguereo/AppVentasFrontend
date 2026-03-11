// app/src/features/product-detail/ui/RatingBar.tsx
"use client";

import { T } from "../theme/tokens";

export default function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 12, color: T.sub, fontFamily: "'Sora',sans-serif", width: 14, textAlign: "right" }}>
        {stars}
      </span>
      <svg width="11" height="11" viewBox="0 0 11 11" style={{ flexShrink: 0 }}>
        <polygon points="5.5,1 7,4 10.5,4.3 8,6.5 8.7,10 5.5,8.2 2.3,10 3,6.5 0.5,4.3 4,4" fill={T.warn} />
      </svg>

      <div style={{ flex: 1, height: 6, borderRadius: 4, background: T.bg, overflow: "hidden", border: `1px solid ${T.border}` }}>
        <div style={{ width: `${pct}%`, height: "100%", background: T.warn, borderRadius: 4, transition: "width .4s ease" }} />
      </div>

      <span style={{ fontSize: 12, color: T.sub, fontFamily: "'Sora',sans-serif", width: 36, textAlign: "right" }}>
        {count.toLocaleString()}
      </span>
    </div>
  );
}

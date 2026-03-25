// app/src/features/product-detail/components/RelatedCard.tsx
"use client";

import { useState } from "react";
import { T } from "../theme/tokens";
import Stars from "../ui/Stars";
import type { RelatedProduct } from "../types/product-detail.types";

export default function RelatedCard({ p }: { p: RelatedProduct }) {
  const [h, setH] = useState(false);

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        gap: 12,
        padding: "14px",
        background: T.surface,
        borderRadius: 11,
        border: `1px solid ${h ? T.borderMid : T.border}`,
        cursor: "pointer",
        transition: "all .2s",
        transform: h ? "translateY(-1px)" : "none",
        boxShadow: h ? "0 4px 16px rgba(15,23,42,0.07)" : "none",
      }}
    >
      <div style={{ width: 60, height: 60, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
        <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 10, color: T.sub, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 2, fontFamily: "'Sora',sans-serif" }}>
          {p.cat}
        </p>
        <p style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Sora',sans-serif", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {p.name}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Stars r={p.rating} size={11} />
          <span style={{ fontSize: 13, fontWeight: 700, color: T.accent, fontFamily: "'Sora',sans-serif" }}>${p.price}</span>
        </div>
      </div>
    </div>
  );
}

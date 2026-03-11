// app/src/features/product-detail/sections/ProductHeader.tsx
"use client";

import { T } from "../theme/tokens";
import Stars from "../ui/Stars";
import Pill from "../ui/Pill";
import type { ProductDetail } from "../types/product-detail.types";

export default function ProductHeader({ p }: { p: ProductDetail }) {
  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Pill>{p.badge}</Pill>
        <span style={{ fontSize: 11, color: T.sub, fontFamily: "'Sora',sans-serif", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase" }}>
          {p.category}
        </span>
      </div>

      <h1 style={{ fontSize: "clamp(22px,2.8vw,30px)", fontWeight: 800, color: T.text, letterSpacing: "-0.6px", lineHeight: 1.2, fontFamily: "'Sora',sans-serif", marginBottom: 8 }}>
        {p.name}
      </h1>

      <p style={{ fontSize: 14, color: T.sub, fontFamily: "'Sora',sans-serif", lineHeight: 1.65, marginBottom: 14 }}>
        {p.tagline}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Stars r={p.rating} size={15} />
        <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Sora',sans-serif" }}>{p.rating}</span>
        <span style={{ fontSize: 13, color: T.sub, fontFamily: "'Sora',sans-serif" }}>· {p.totalReviews.toLocaleString()} reseñas</span>
      </div>
    </div>
  );
}

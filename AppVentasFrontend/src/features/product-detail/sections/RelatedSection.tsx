// app/src/features/product-detail/sections/RelatedSection.tsx
"use client";

import { T } from "../theme/tokens";
import RelatedCard from "../components/RelatedCard";
import type { RelatedProduct } from "../types/product-detail.types";

export default function RelatedSection({ related }: { related: RelatedProduct[] }) {
  return (
    <div style={{ marginTop: 28 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: T.sub, marginBottom: 14, fontFamily: "'Sora',sans-serif" }}>
        También te puede interesar
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {related.map((r) => (
          <RelatedCard key={r.id} p={r} />
        ))}
      </div>
    </div>
  );
}

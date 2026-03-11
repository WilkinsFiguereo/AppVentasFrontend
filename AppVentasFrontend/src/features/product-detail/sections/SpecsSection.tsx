// app/src/features/product-detail/sections/SpecsSection.tsx
"use client";

import { T } from "../theme/tokens";
import type { ProductSpec } from "../types/product-detail.types";

export default function SpecsSection({ specs }: { specs: ProductSpec[] }) {
  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: "'Sora',sans-serif", marginBottom: 16, letterSpacing: "-0.2px" }}>
        Especificaciones
      </h3>

      <div style={{ border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
        {specs.map(({ label, value }, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              padding: "12px 16px",
              background: i % 2 === 0 ? T.surface : T.bg,
              borderTop: i > 0 ? `1px solid ${T.border}` : "none",
            }}
          >
            <span style={{ flex: "0 0 200px", fontSize: 13, color: T.sub, fontFamily: "'Sora',sans-serif" }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: "'Sora',sans-serif" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

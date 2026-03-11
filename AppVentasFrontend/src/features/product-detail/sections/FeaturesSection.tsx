// app/src/features/product-detail/sections/FeaturesSection.tsx
"use client";

import { T } from "../theme/tokens";

export default function FeaturesSection({ features }: { features: string[] }) {
  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: "'Sora',sans-serif", marginBottom: 16, letterSpacing: "-0.2px" }}>
        ¿Qué incluye?
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
        {features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="8" cy="8" r="7" fill={T.successBg} />
              <path d="M5 8l2 2 4-4" stroke={T.success} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 13, color: T.text, fontFamily: "'Sora',sans-serif", lineHeight: 1.5 }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
